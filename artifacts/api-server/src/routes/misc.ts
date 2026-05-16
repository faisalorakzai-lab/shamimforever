import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, reviewsTable, wishlistTable, boutiquesTable, conciergeBookingsTable, newsletterTable, productsTable } from "@workspace/db";
import {
  CreateReviewBody,
  CreateReviewParams,
  ListProductReviewsParams,
  AddToWishlistParams,
  RemoveFromWishlistParams,
  CreateConciergeBookingBody,
  SubscribeNewsletterBody,
  GetScentRecommendationsBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

function getUserFromSession(req: { cookies?: { userId?: string } }): number | null {
  const userId = req.cookies?.userId;
  return userId ? parseInt(userId, 10) : null;
}

// Reviews
router.get("/products/:slug/reviews", async (req, res): Promise<void> => {
  const params = ListProductReviewsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db.select({ id: productsTable.id }).from(productsTable).where(eq(productsTable.slug, params.data.slug));
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const reviews = await db.select().from(reviewsTable).where(eq(reviewsTable.productId, product.id));
  res.json(reviews.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })));
});

router.post("/products/:slug/reviews", async (req, res): Promise<void> => {
  const params = CreateReviewParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = CreateReviewBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const userId = getUserFromSession(req as { cookies?: { userId?: string } });
  const [product] = await db.select({ id: productsTable.id }).from(productsTable).where(eq(productsTable.slug, params.data.slug));
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const [review] = await db.insert(reviewsTable).values({
    productId: product.id,
    userId: userId ?? null,
    rating: parsed.data.rating,
    comment: parsed.data.comment ?? null,
    reviewerName: parsed.data.reviewerName ?? null,
  }).returning();

  res.status(201).json({ ...review, createdAt: review.createdAt.toISOString() });
});

// Wishlist
router.get("/wishlist", async (req, res): Promise<void> => {
  const userId = getUserFromSession(req as { cookies?: { userId?: string } });
  if (!userId) {
    res.json([]);
    return;
  }

  const items = await db.select().from(wishlistTable).where(eq(wishlistTable.userId, userId));
  const enriched = await Promise.all(items.map(async (item) => {
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, item.productId));
    return {
      ...item,
      createdAt: item.createdAt.toISOString(),
      product: product ? { ...product, price: Number(product.price), originalPrice: product.originalPrice ? Number(product.originalPrice) : null, averageRating: null, reviewCount: 0 } : undefined,
    };
  }));

  res.json(enriched);
});

router.post("/wishlist/:productId", async (req, res): Promise<void> => {
  const params = AddToWishlistParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const userId = getUserFromSession(req as { cookies?: { userId?: string } });
  if (!userId) {
    res.status(401).json({ error: "Login required" });
    return;
  }

  const [item] = await db.insert(wishlistTable).values({ userId, productId: params.data.productId }).returning();
  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, item.productId));

  res.status(201).json({
    ...item,
    createdAt: item.createdAt.toISOString(),
    product: product ? { ...product, price: Number(product.price), originalPrice: product.originalPrice ? Number(product.originalPrice) : null, averageRating: null, reviewCount: 0 } : undefined,
  });
});

router.delete("/wishlist/:productId", async (req, res): Promise<void> => {
  const params = RemoveFromWishlistParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const userId = getUserFromSession(req as { cookies?: { userId?: string } });
  if (!userId) {
    res.status(401).json({ error: "Login required" });
    return;
  }

  await db.delete(wishlistTable)
    .where(sql`${wishlistTable.userId} = ${userId} AND ${wishlistTable.productId} = ${params.data.productId}`);

  res.sendStatus(204);
});

// Scent Finder
router.get("/scent-finder/questions", async (_req, res): Promise<void> => {
  res.json([
    {
      id: "mood",
      question: "What mood do you want your fragrance to evoke?",
      options: [
        { value: "romantic", label: "Romantic & Sensual" },
        { value: "fresh", label: "Fresh & Energizing" },
        { value: "mysterious", label: "Mysterious & Intense" },
        { value: "elegant", label: "Elegant & Refined" },
      ],
    },
    {
      id: "occasion",
      question: "When will you primarily wear this fragrance?",
      options: [
        { value: "day", label: "Daytime & Office" },
        { value: "evening", label: "Evening & Events" },
        { value: "special", label: "Special Occasions" },
        { value: "everyday", label: "Everyday Wear" },
      ],
    },
    {
      id: "notes",
      question: "Which scent family appeals to you most?",
      options: [
        { value: "woody", label: "Woody & Earthy (Oud, Sandalwood)" },
        { value: "floral", label: "Floral & Powdery (Rose, Jasmine)" },
        { value: "oriental", label: "Oriental & Spicy (Amber, Musk)" },
        { value: "fresh", label: "Fresh & Citrus (Bergamot, Lemon)" },
      ],
    },
    {
      id: "intensity",
      question: "How intense do you prefer your fragrance?",
      options: [
        { value: "light", label: "Light & Subtle" },
        { value: "moderate", label: "Moderate & Balanced" },
        { value: "strong", label: "Strong & Long-lasting" },
        { value: "intense", label: "Intense & Commanding" },
      ],
    },
  ]);
});

router.post("/scent-finder/recommend", async (req, res): Promise<void> => {
  const parsed = GetScentRecommendationsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  // Return featured perfume products as recommendations
  const products = await db.select().from(productsTable)
    .where(eq(productsTable.category, "Perfume"))
    .limit(4);

  res.json(products.map((p) => ({ ...p, price: Number(p.price), originalPrice: p.originalPrice ? Number(p.originalPrice) : null, averageRating: null, reviewCount: 0 })));
});

// Boutiques
router.get("/boutiques", async (_req, res): Promise<void> => {
  const boutiques = await db.select().from(boutiquesTable);
  res.json(boutiques.map((b) => ({ ...b, lat: Number(b.lat), lng: Number(b.lng) })));
});

// Concierge
router.post("/concierge/bookings", async (req, res): Promise<void> => {
  const parsed = CreateConciergeBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [booking] = await db.insert(conciergeBookingsTable).values({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    service: parsed.data.service,
    preferredDate: parsed.data.preferredDate,
    preferredTime: parsed.data.preferredTime ?? null,
    notes: parsed.data.notes ?? null,
  }).returning();

  res.status(201).json({ ...booking, createdAt: booking.createdAt.toISOString() });
});

// Newsletter
router.post("/newsletter/subscribe", async (req, res): Promise<void> => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    await db.insert(newsletterTable).values({ email: parsed.data.email, name: parsed.data.name ?? null });
  } catch {
    // Already subscribed is fine
  }

  res.json({ message: "Thank you for subscribing to Shamim Forever." });
});

export default router;
