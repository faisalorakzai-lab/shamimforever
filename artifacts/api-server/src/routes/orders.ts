import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, ordersTable, orderItemsTable, productsTable, paymentProofsTable } from "@workspace/db";
import {
  CreateOrderBody,
  GetOrderParams,
  UpdateOrderStatusParams,
  UpdateOrderStatusBody,
  TrackOrderParams,
  SubmitPaymentProofBody,
  ListOrdersQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function getUserFromSession(req: { cookies?: { userId?: string } }): number | null {
  const userId = req.cookies?.userId;
  return userId ? parseInt(userId, 10) : null;
}

async function getOrderWithItems(orderId: number) {
  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, orderId));
  if (!order) return null;

  const items = await db.select().from(orderItemsTable).where(eq(orderItemsTable.orderId, orderId));
  const productIds = items.map((i) => i.productId);
  const products = productIds.length > 0
    ? await db.select().from(productsTable).where(eq(productsTable.id, productIds[0]))
    : [];

  const productMap = new Map(products.map((p) => [p.id, p]));

  return {
    ...order,
    totalAmount: Number(order.totalAmount),
    discountAmount: Number(order.discountAmount ?? 0),
    createdAt: order.createdAt.toISOString(),
    items: items.map((item) => {
      const product = productMap.get(item.productId);
      return {
        ...item,
        unitPrice: Number(item.unitPrice),
        product: product ? { ...product, price: Number(product.price), originalPrice: product.originalPrice ? Number(product.originalPrice) : null } : undefined,
      };
    }),
  };
}

router.get("/orders", async (req, res): Promise<void> => {
  const userId = getUserFromSession(req as { cookies?: { userId?: string } });
  const params = ListOrdersQueryParams.safeParse(req.query);

  let query = db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));

  if (userId) {
    const orders = await db.select().from(ordersTable).where(eq(ordersTable.userId, userId)).orderBy(desc(ordersTable.createdAt));
    const enriched = await Promise.all(orders.map((o) => getOrderWithItems(o.id)));
    res.json(enriched.filter(Boolean));
    return;
  }

  const orders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt)).limit(50);
  const enriched = await Promise.all(orders.map((o) => getOrderWithItems(o.id)));
  res.json(enriched.filter(Boolean));
});

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const userId = getUserFromSession(req as { cookies?: { userId?: string } });
  const { items, shippingAddress, paymentMethod, notes, guestEmail } = parsed.data;

  // Calculate total
  let totalAmount = 0;
  const productIds = items.map((i) => i.productId);

  // Get products to validate and calculate prices
  const products: (typeof productsTable.$inferSelect)[] = [];
  for (const pid of productIds) {
    const [p] = await db.select().from(productsTable).where(eq(productsTable.id, pid));
    if (p) products.push(p);
  }

  const productMap = new Map(products.map((p) => [p.id, p]));

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      res.status(400).json({ error: `Product ${item.productId} not found` });
      return;
    }
    totalAmount += Number(product.price) * item.quantity;
  }

  const [order] = await db.insert(ordersTable).values({
    userId: userId ?? null,
    guestEmail: guestEmail ?? null,
    status: "pending",
    totalAmount: String(totalAmount),
    currency: "PKR",
    paymentStatus: "pending",
    paymentMethod: paymentMethod ?? "manual",
    shippingAddress: shippingAddress as Record<string, string>,
    notes: notes ?? null,
  }).returning();

  // Insert order items
  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) continue;
    await db.insert(orderItemsTable).values({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: String(product.price),
      engravingText: item.engravingText ?? null,
    });
  }

  const enriched = await getOrderWithItems(order.id);
  res.status(201).json(enriched);
});

router.get("/orders/track/:trackingNumber", async (req, res): Promise<void> => {
  const params = TrackOrderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.trackingNumber, params.data.trackingNumber));
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json({
    trackingNumber: order.trackingNumber,
    status: order.status,
    estimatedDelivery: null,
    updates: [
      { timestamp: order.createdAt.toISOString(), message: "Order placed", location: null },
      ...(order.status !== "pending" ? [{ timestamp: order.updatedAt.toISOString(), message: `Order ${order.status}`, location: "Pakistan" }] : []),
    ],
  });
});

router.get("/orders/:id", async (req, res): Promise<void> => {
  const params = GetOrderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const order = await getOrderWithItems(params.data.id);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json(order);
});

router.patch("/orders/:id", async (req, res): Promise<void> => {
  const params = UpdateOrderStatusParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateOrderStatusBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updateData: Record<string, unknown> = { status: parsed.data.status };
  if (parsed.data.trackingNumber) updateData.trackingNumber = parsed.data.trackingNumber;
  if (parsed.data.paymentStatus) updateData.paymentStatus = parsed.data.paymentStatus;

  await db.update(ordersTable).set(updateData).where(eq(ordersTable.id, params.data.id));

  const order = await getOrderWithItems(params.data.id);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json(order);
});

router.post("/payments/verify", async (req, res): Promise<void> => {
  const parsed = SubmitPaymentProofBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.insert(paymentProofsTable).values({
    orderId: parsed.data.orderId,
    paymentMethod: parsed.data.paymentMethod,
    amount: String(parsed.data.amount),
    senderName: parsed.data.senderName,
    senderPhone: parsed.data.senderPhone ?? null,
    transactionId: parsed.data.transactionId ?? null,
    screenshotUrl: parsed.data.screenshotUrl ?? null,
    notes: parsed.data.notes ?? null,
  });

  // Update order payment status to "under_review"
  await db.update(ordersTable).set({ paymentStatus: "under_review" }).where(eq(ordersTable.id, parsed.data.orderId));

  res.json({ message: "Payment proof submitted. Admin will verify and approve your order.", orderId: parsed.data.orderId });
});

export default router;
