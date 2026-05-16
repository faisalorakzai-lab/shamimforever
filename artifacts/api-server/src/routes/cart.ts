import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, productsTable } from "@workspace/db";
import { AddToCartBody, UpdateCartItemBody, UpdateCartItemParams, RemoveCartItemParams } from "@workspace/api-zod";

const router: IRouter = Router();

// Session-based cart (stored in memory, keyed by cookie session)
const carts = new Map<string, { productId: number; quantity: number; engravingText?: string }[]>();

function getSessionId(req: { cookies?: { userId?: string; sessionId?: string } }): string {
  return req.cookies?.userId || req.cookies?.sessionId || "guest";
}

async function buildCartResponse(items: { productId: number; quantity: number; engravingText?: string }[]) {
  if (items.length === 0) return { items: [], subtotal: 0, itemCount: 0 };

  const products: (typeof productsTable.$inferSelect)[] = [];
  for (const item of items) {
    const [p] = await db.select().from(productsTable).where(eq(productsTable.id, item.productId));
    if (p) products.push(p);
  }

  const productMap = new Map(products.map((p) => [p.id, p]));

  let subtotal = 0;
  let itemCount = 0;
  const cartItems = items.map((item) => {
    const product = productMap.get(item.productId);
    if (product) {
      subtotal += Number(product.price) * item.quantity;
      itemCount += item.quantity;
    }
    return {
      productId: item.productId,
      quantity: item.quantity,
      engravingText: item.engravingText ?? null,
      product: product ? {
        ...product,
        price: Number(product.price),
        originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
        averageRating: null,
        reviewCount: 0,
      } : undefined,
    };
  });

  return { items: cartItems, subtotal, itemCount };
}

router.get("/cart", async (req, res): Promise<void> => {
  const sessionId = getSessionId(req as { cookies?: { userId?: string; sessionId?: string } });
  const items = carts.get(sessionId) ?? [];
  const cart = await buildCartResponse(items);
  res.json(cart);
});

router.post("/cart/items", async (req, res): Promise<void> => {
  const parsed = AddToCartBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const sessionId = getSessionId(req as { cookies?: { userId?: string; sessionId?: string } });
  const items = carts.get(sessionId) ?? [];

  const existingIndex = items.findIndex((i) => i.productId === parsed.data.productId);
  if (existingIndex >= 0) {
    items[existingIndex].quantity += parsed.data.quantity;
  } else {
    items.push({
      productId: parsed.data.productId,
      quantity: parsed.data.quantity,
      engravingText: parsed.data.engravingText ?? undefined,
    });
  }

  carts.set(sessionId, items);
  const cart = await buildCartResponse(items);
  res.json(cart);
});

router.patch("/cart/items/:productId", async (req, res): Promise<void> => {
  const params = UpdateCartItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateCartItemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const sessionId = getSessionId(req as { cookies?: { userId?: string; sessionId?: string } });
  const items = carts.get(sessionId) ?? [];

  const index = items.findIndex((i) => i.productId === params.data.productId);
  if (index >= 0) {
    if (parsed.data.quantity === 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = parsed.data.quantity;
    }
  }

  carts.set(sessionId, items);
  const cart = await buildCartResponse(items);
  res.json(cart);
});

router.delete("/cart/items/:productId", async (req, res): Promise<void> => {
  const params = RemoveCartItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const sessionId = getSessionId(req as { cookies?: { userId?: string; sessionId?: string } });
  const items = carts.get(sessionId) ?? [];
  const filtered = items.filter((i) => i.productId !== params.data.productId);
  carts.set(sessionId, filtered);

  const cart = await buildCartResponse(filtered);
  res.json(cart);
});

export default router;
