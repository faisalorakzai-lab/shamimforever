import { Router, type IRouter } from "express";
import { eq, desc, ilike, sql } from "drizzle-orm";
import { db, ordersTable, usersTable, productsTable, discountsTable } from "@workspace/db";
import {
  ListCustomersQueryParams,
  GetCustomerParams,
  CreateDiscountBody,
  GetRevenueDataQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/admin/stats", async (_req, res): Promise<void> => {
  const [revenueResult] = await db
    .select({ total: sql<string>`coalesce(sum(${ordersTable.totalAmount}), 0)` })
    .from(ordersTable)
    .where(eq(ordersTable.paymentStatus, "paid"));

  const [orderCount] = await db.select({ count: sql<string>`count(*)` }).from(ordersTable);
  const [customerCount] = await db.select({ count: sql<string>`count(*)` }).from(usersTable);
  const [pendingCount] = await db.select({ count: sql<string>`count(*)` }).from(ordersTable).where(eq(ordersTable.status, "pending"));
  const [lowStockCount] = await db.select({ count: sql<string>`count(*)` }).from(productsTable).where(sql`${productsTable.stock} < 5`);

  const revenueByMonth = await db
    .select({
      month: sql<string>`to_char(${ordersTable.createdAt}, 'Mon')`,
      revenue: sql<string>`coalesce(sum(${ordersTable.totalAmount}), 0)`,
    })
    .from(ordersTable)
    .groupBy(sql`to_char(${ordersTable.createdAt}, 'Mon'), date_trunc('month', ${ordersTable.createdAt})`)
    .orderBy(sql`date_trunc('month', ${ordersTable.createdAt}) desc`)
    .limit(6);

  const topProducts = await db.select().from(productsTable).where(eq(productsTable.isBestseller, true)).limit(5);
  const recentOrders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt)).limit(5);

  res.json({
    totalRevenue: Number(revenueResult.total),
    totalOrders: Number(orderCount.count),
    totalCustomers: Number(customerCount.count),
    pendingOrders: Number(pendingCount.count),
    lowStockProducts: Number(lowStockCount.count),
    revenueByMonth: revenueByMonth.map((r) => ({ month: r.month, revenue: Number(r.revenue) })),
    ordersByStatus: {},
    topProducts: topProducts.map((p) => ({ ...p, price: Number(p.price), originalPrice: p.originalPrice ? Number(p.originalPrice) : null, averageRating: null, reviewCount: 0 })),
    recentOrders: recentOrders.map((o) => ({
      ...o,
      totalAmount: Number(o.totalAmount),
      createdAt: o.createdAt.toISOString(),
      items: [],
    })),
  });
});

router.get("/admin/customers", async (req, res): Promise<void> => {
  const params = ListCustomersQueryParams.safeParse(req.query);
  const search = params.success ? params.data.search : undefined;

  const users = search
    ? await db.select().from(usersTable).where(ilike(usersTable.email, `%${search}%`)).orderBy(desc(usersTable.createdAt)).limit(50)
    : await db.select().from(usersTable).orderBy(desc(usersTable.createdAt)).limit(50);

  const customers = await Promise.all(users.map(async (user) => {
    const [orderStats] = await db
      .select({
        count: sql<string>`count(*)`,
        total: sql<string>`coalesce(sum(${ordersTable.totalAmount}), 0)`,
      })
      .from(ordersTable)
      .where(eq(ordersTable.userId, user.id));

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      orderCount: Number(orderStats.count),
      totalSpent: Number(orderStats.total),
      createdAt: user.createdAt.toISOString(),
    };
  }));

  res.json(customers);
});

router.get("/admin/customers/:id", async (req, res): Promise<void> => {
  const params = GetCustomerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, params.data.id));
  if (!user) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }

  const [orderStats] = await db
    .select({
      count: sql<string>`count(*)`,
      total: sql<string>`coalesce(sum(${ordersTable.totalAmount}), 0)`,
    })
    .from(ordersTable)
    .where(eq(ordersTable.userId, user.id));

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    role: user.role,
    orderCount: Number(orderStats.count),
    totalSpent: Number(orderStats.total),
    createdAt: user.createdAt.toISOString(),
  });
});

router.get("/admin/discounts", async (_req, res): Promise<void> => {
  const discounts = await db.select().from(discountsTable);
  res.json(discounts.map((d) => ({
    ...d,
    value: Number(d.value),
    minOrderAmount: d.minOrderAmount ? Number(d.minOrderAmount) : null,
    expiresAt: d.expiresAt ? d.expiresAt.toISOString() : null,
  })));
});

router.post("/admin/discounts", async (req, res): Promise<void> => {
  const parsed = CreateDiscountBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [discount] = await db.insert(discountsTable).values({
    code: data.code.toUpperCase(),
    type: data.type,
    value: String(data.value),
    minOrderAmount: data.minOrderAmount ? String(data.minOrderAmount) : null,
    maxUses: data.maxUses ?? null,
    expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
  }).returning();

  res.status(201).json({
    ...discount,
    value: Number(discount.value),
    minOrderAmount: discount.minOrderAmount ? Number(discount.minOrderAmount) : null,
    expiresAt: discount.expiresAt ? discount.expiresAt.toISOString() : null,
  });
});

router.get("/admin/revenue", async (req, res): Promise<void> => {
  const params = GetRevenueDataQueryParams.safeParse(req.query);
  const period = params.success ? params.data.period : "monthly";

  const data = await db
    .select({
      label: sql<string>`to_char(${ordersTable.createdAt}, 'Mon YYYY')`,
      revenue: sql<string>`coalesce(sum(${ordersTable.totalAmount}), 0)`,
      orders: sql<string>`count(*)`,
    })
    .from(ordersTable)
    .groupBy(sql`to_char(${ordersTable.createdAt}, 'Mon YYYY'), date_trunc('month', ${ordersTable.createdAt})`)
    .orderBy(sql`date_trunc('month', ${ordersTable.createdAt}) desc`)
    .limit(12);

  const total = data.reduce((sum, d) => sum + Number(d.revenue), 0);

  res.json({
    period: period ?? "monthly",
    total,
    data: data.map((d) => ({ label: d.label, revenue: Number(d.revenue), orders: Number(d.orders) })),
  });
});

export default router;
