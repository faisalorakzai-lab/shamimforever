import { Router, type IRouter } from "express";
  import { supabase } from "@workspace/db";
  import { CreateOrderBody, GetOrderParams, UpdateOrderStatusParams, UpdateOrderStatusBody, TrackOrderParams, SubmitPaymentProofBody } from "@workspace/api-zod";

  const router: IRouter = Router();

  function getUserFromSession(req: { cookies?: { userId?: string } }): number | null {
    const userId = req.cookies?.userId;
    return userId ? parseInt(userId, 10) : null;
  }

  async function getOrderWithItems(orderId: number) {
    const { data: order } = await supabase.from("orders").select("*").eq("id", orderId).maybeSingle();
    if (!order) return null;

    const { data: items } = await supabase.from("order_items").select("*").eq("order_id", orderId);
    const itemList = (items || []) as Record<string, unknown>[];
    const productIds = [...new Set(itemList.map((i) => i.product_id as number))];

    const products: Record<number, Record<string, unknown>> = {};
    if (productIds.length > 0) {
      const { data: prods } = await supabase.from("products").select("*").in("id", productIds);
      for (const p of ((prods || []) as Record<string, unknown>[])) products[p.id as number] = p;
    }

    return {
      ...order,
      totalAmount: Number(order.total_amount),
      discountAmount: Number(order.discount_amount ?? 0),
      createdAt: order.created_at,
      items: itemList.map((item) => {
        const p = products[item.product_id as number];
        return { ...item, unitPrice: Number(item.unit_price), product: p ? { ...p, price: Number(p.price), originalPrice: p.original_price ? Number(p.original_price) : null } : undefined };
      }),
    };
  }

  router.get("/orders", async (req, res): Promise<void> => {
    const userId = getUserFromSession(req as { cookies?: { userId?: string } });
    let q = supabase.from("orders").select("id").order("created_at", { ascending: false }).limit(50);
    if (userId) q = q.eq("user_id", userId);
    const { data: refs } = await q;
    const enriched = await Promise.all((refs || []).map((o: Record<string, unknown>) => getOrderWithItems(o.id as number)));
    res.json(enriched.filter(Boolean));
  });

  router.post("/orders", async (req, res): Promise<void> => {
    const parsed = CreateOrderBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const userId = getUserFromSession(req as { cookies?: { userId?: string } });
    const { items, shippingAddress, paymentMethod, notes, guestEmail } = parsed.data;

    const { data: products } = await supabase.from("products").select("id, price").in("id", items.map((i) => i.productId));
    const productMap = new Map((products || []).map((p: Record<string, unknown>) => [p.id as number, p]));

    let totalAmount = 0;
    for (const item of items) {
      const p = productMap.get(item.productId);
      if (!p) { res.status(400).json({ error: `Product ${item.productId} not found` }); return; }
      totalAmount += Number(p.price) * item.quantity;
    }

    const { data: order, error } = await supabase.from("orders").insert({
      user_id: userId ?? null, guest_email: guestEmail ?? null, status: "pending",
      total_amount: String(totalAmount), currency: "PKR", payment_status: "pending",
      payment_method: paymentMethod ?? "manual", shipping_address: shippingAddress, notes: notes ?? null,
    }).select().single();

    if (error || !order) { res.status(500).json({ error: "Failed to create order" }); return; }

    for (const item of items) {
      const p = productMap.get(item.productId);
      if (!p) continue;
      await supabase.from("order_items").insert({ order_id: order.id, product_id: item.productId, quantity: item.quantity, unit_price: String(p.price), engraving_text: item.engravingText ?? null });
    }

    res.status(201).json(await getOrderWithItems(order.id as number));
  });

  router.get("/orders/track/:trackingNumber", async (req, res): Promise<void> => {
    const params = TrackOrderParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const { data: order } = await supabase.from("orders").select("*").eq("tracking_number", params.data.trackingNumber).maybeSingle();
    if (!order) { res.status(404).json({ error: "Order not found" }); return; }

    res.json({
      trackingNumber: order.tracking_number, status: order.status, estimatedDelivery: null,
      updates: [
        { timestamp: order.created_at, message: "Order placed", location: null },
        ...(order.status !== "pending" ? [{ timestamp: order.updated_at, message: `Order ${order.status}`, location: "Pakistan" }] : []),
      ],
    });
  });

  router.get("/orders/:id", async (req, res): Promise<void> => {
    const params = GetOrderParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }
    const order = await getOrderWithItems(params.data.id);
    if (!order) { res.status(404).json({ error: "Order not found" }); return; }
    res.json(order);
  });

  router.patch("/orders/:id", async (req, res): Promise<void> => {
    const params = UpdateOrderStatusParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const parsed = UpdateOrderStatusBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const upd: Record<string, unknown> = { status: parsed.data.status };
    if (parsed.data.trackingNumber) upd.tracking_number = parsed.data.trackingNumber;
    if (parsed.data.paymentStatus) upd.payment_status = parsed.data.paymentStatus;

    await supabase.from("orders").update(upd).eq("id", params.data.id);
    const order = await getOrderWithItems(params.data.id);
    if (!order) { res.status(404).json({ error: "Order not found" }); return; }
    res.json(order);
  });

  router.post("/payments/verify", async (req, res): Promise<void> => {
    const parsed = SubmitPaymentProofBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    await supabase.from("payment_proofs").insert({
      order_id: parsed.data.orderId, payment_method: parsed.data.paymentMethod, amount: String(parsed.data.amount),
      sender_name: parsed.data.senderName, sender_phone: parsed.data.senderPhone ?? null,
      transaction_id: parsed.data.transactionId ?? null, screenshot_url: parsed.data.screenshotUrl ?? null, notes: parsed.data.notes ?? null,
    });

    await supabase.from("orders").update({ payment_status: "under_review" }).eq("id", parsed.data.orderId);
    res.json({ message: "Payment proof submitted. Admin will verify and approve your order.", orderId: parsed.data.orderId });
  });

  export default router;
  