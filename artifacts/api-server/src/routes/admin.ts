import { Router, type IRouter } from "express";
  import { supabase } from "@workspace/db";
  import { ListCustomersQueryParams, GetCustomerParams, CreateDiscountBody, GetRevenueDataQueryParams } from "@workspace/api-zod";

  const router: IRouter = Router();

  router.get("/admin/stats", async (_req, res): Promise<void> => {
    const [{ data: allOrders }, { data: allUsers }, { data: topProducts }, { data: recentOrdersRaw }] = await Promise.all([
      supabase.from("orders").select("total_amount, payment_status, status, created_at"),
      supabase.from("users").select("id"),
      supabase.from("products").select("*").eq("is_bestseller", true).limit(5),
      supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
    ]);

    const orders = (allOrders || []) as Record<string, unknown>[];
    const paidOrders = orders.filter((o) => o.payment_status === "paid");
    const totalRevenue = paidOrders.reduce((s, o) => s + Number(o.total_amount), 0);
    const pendingOrders = orders.filter((o) => o.status === "pending").length;

    const { data: lowStockRaw } = await supabase.from("products").select("id").lt("stock", 5);

    const monthMap: Record<string, number> = {};
    for (const o of paidOrders) {
      const label = new Date(o.created_at as string).toLocaleString("en-US", { month: "short" });
      monthMap[label] = (monthMap[label] || 0) + Number(o.total_amount);
    }
    const revenueByMonth = Object.entries(monthMap).map(([month, revenue]) => ({ month, revenue }));

    res.json({
      totalRevenue,
      totalOrders: orders.length,
      totalCustomers: (allUsers || []).length,
      pendingOrders,
      lowStockProducts: (lowStockRaw || []).length,
      revenueByMonth,
      ordersByStatus: {},
      topProducts: (topProducts || []).map((p: Record<string, unknown>) => ({ ...p, price: Number(p.price), originalPrice: p.original_price ? Number(p.original_price) : null, averageRating: null, reviewCount: 0 })),
      recentOrders: (recentOrdersRaw || []).map((o: Record<string, unknown>) => ({ ...o, totalAmount: Number(o.total_amount), createdAt: o.created_at, items: [] })),
    });
  });

  router.get("/admin/customers", async (req, res): Promise<void> => {
    const params = ListCustomersQueryParams.safeParse(req.query);
    const search = params.success ? params.data.search : undefined;

    let q = supabase.from("users").select("*").order("created_at", { ascending: false }).limit(50);
    if (search) q = q.ilike("email", `%${search}%`);
    const { data: users } = await q;

    const customers = await Promise.all((users || []).map(async (user: Record<string, unknown>) => {
      const { data: orders } = await supabase.from("orders").select("total_amount").eq("user_id", user.id);
      const orderList = (orders || []) as Record<string, unknown>[];
      return {
        id: user.id, email: user.email, name: user.name, phone: user.phone ?? null, role: user.role,
        orderCount: orderList.length,
        totalSpent: orderList.reduce((s, o) => s + Number(o.total_amount), 0),
        createdAt: user.created_at,
      };
    }));

    res.json(customers);
  });

  router.get("/admin/customers/:id", async (req, res): Promise<void> => {
    const params = GetCustomerParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const { data: user } = await supabase.from("users").select("*").eq("id", params.data.id).maybeSingle();
    if (!user) { res.status(404).json({ error: "Customer not found" }); return; }

    const { data: orders } = await supabase.from("orders").select("total_amount").eq("user_id", user.id);
    const orderList = (orders || []) as Record<string, unknown>[];

    res.json({
      id: user.id, email: user.email, name: user.name, phone: user.phone ?? null, role: user.role,
      orderCount: orderList.length,
      totalSpent: orderList.reduce((s, o) => s + Number(o.total_amount), 0),
      createdAt: user.created_at,
    });
  });

  router.get("/admin/discounts", async (_req, res): Promise<void> => {
    const { data: discounts } = await supabase.from("discounts").select("*");
    res.json((discounts || []).map((d: Record<string, unknown>) => ({
      ...d, value: Number(d.value),
      minOrderAmount: d.min_order_amount ? Number(d.min_order_amount) : null,
      expiresAt: d.expires_at ?? null,
    })));
  });

  router.post("/admin/discounts", async (req, res): Promise<void> => {
    const parsed = CreateDiscountBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const data = parsed.data;
    const { data: discount, error } = await supabase.from("discounts").insert({
      code: data.code.toUpperCase(), type: data.type, value: String(data.value),
      min_order_amount: data.minOrderAmount ? String(data.minOrderAmount) : null,
      max_uses: data.maxUses ?? null, expires_at: data.expiresAt ?? null,
    }).select().single();

    if (error || !discount) { res.status(500).json({ error: "Failed to create discount" }); return; }
    res.status(201).json({ ...discount, value: Number(discount.value), minOrderAmount: discount.min_order_amount ? Number(discount.min_order_amount) : null, expiresAt: discount.expires_at ?? null });
  });

  router.get("/admin/revenue", async (req, res): Promise<void> => {
    const params = GetRevenueDataQueryParams.safeParse(req.query);
    const period = params.success ? params.data.period : "monthly";

    const { data: orders } = await supabase.from("orders").select("total_amount, created_at").order("created_at", { ascending: false });

    const monthMap: Record<string, { revenue: number; orders: number }> = {};
    for (const o of ((orders || []) as Record<string, unknown>[])) {
      const label = new Date(o.created_at as string).toLocaleString("en-US", { month: "short", year: "numeric" });
      if (!monthMap[label]) monthMap[label] = { revenue: 0, orders: 0 };
      monthMap[label].revenue += Number(o.total_amount);
      monthMap[label].orders += 1;
    }

    const data = Object.entries(monthMap).slice(0, 12).map(([label, v]) => ({ label, revenue: v.revenue, orders: v.orders }));
    res.json({ period: period ?? "monthly", total: data.reduce((s, d) => s + d.revenue, 0), data });
  });

  export default router;
  