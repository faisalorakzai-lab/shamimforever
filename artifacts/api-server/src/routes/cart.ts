import { Router, type IRouter } from "express";
  import { supabase } from "@workspace/db";
  import { AddToCartBody, UpdateCartItemBody, UpdateCartItemParams, RemoveCartItemParams } from "@workspace/api-zod";

  const router: IRouter = Router();

  const carts = new Map<string, { productId: number; quantity: number; engravingText?: string }[]>();

  function getSessionId(req: { cookies?: { userId?: string; sessionId?: string } }): string {
    return req.cookies?.userId || req.cookies?.sessionId || "guest";
  }

  async function buildCartResponse(items: { productId: number; quantity: number; engravingText?: string }[]) {
    if (items.length === 0) return { items: [], subtotal: 0, itemCount: 0 };
    const ids = items.map((i) => i.productId);
    const { data: products } = await supabase.from("products").select("id, price, name, images, original_price").in("id", ids);
    const productMap = new Map((products || []).map((p: Record<string, unknown>) => [p.id as number, p]));

    let subtotal = 0; let itemCount = 0;
    const cartItems = items.map((item) => {
      const p = productMap.get(item.productId) as Record<string, unknown> | undefined;
      if (p) { subtotal += Number(p.price) * item.quantity; itemCount += item.quantity; }
      return { productId: item.productId, quantity: item.quantity, engravingText: item.engravingText ?? null, product: p ? { ...p, price: Number(p.price), originalPrice: p.original_price ? Number(p.original_price) : null, averageRating: null, reviewCount: 0 } : undefined };
    });

    return { items: cartItems, subtotal, itemCount };
  }

  router.get("/cart", async (req, res): Promise<void> => {
    const sessionId = getSessionId(req as { cookies?: { userId?: string; sessionId?: string } });
    res.json(await buildCartResponse(carts.get(sessionId) ?? []));
  });

  router.post("/cart/items", async (req, res): Promise<void> => {
    const parsed = AddToCartBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const sessionId = getSessionId(req as { cookies?: { userId?: string; sessionId?: string } });
    const items = carts.get(sessionId) ?? [];
    const idx = items.findIndex((i) => i.productId === parsed.data.productId);
    if (idx >= 0) items[idx].quantity += parsed.data.quantity;
    else items.push({ productId: parsed.data.productId, quantity: parsed.data.quantity, engravingText: parsed.data.engravingText ?? undefined });
    carts.set(sessionId, items);
    res.json(await buildCartResponse(items));
  });

  router.patch("/cart/items/:productId", async (req, res): Promise<void> => {
    const params = UpdateCartItemParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const parsed = UpdateCartItemBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const sessionId = getSessionId(req as { cookies?: { userId?: string; sessionId?: string } });
    const items = carts.get(sessionId) ?? [];
    const idx = items.findIndex((i) => i.productId === params.data.productId);
    if (idx >= 0) { if (parsed.data.quantity === 0) items.splice(idx, 1); else items[idx].quantity = parsed.data.quantity; }
    carts.set(sessionId, items);
    res.json(await buildCartResponse(items));
  });

  router.delete("/cart/items/:productId", async (req, res): Promise<void> => {
    const params = RemoveCartItemParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const sessionId = getSessionId(req as { cookies?: { userId?: string; sessionId?: string } });
    const items = (carts.get(sessionId) ?? []).filter((i) => i.productId !== params.data.productId);
    carts.set(sessionId, items);
    res.json(await buildCartResponse(items));
  });

  export default router;
  