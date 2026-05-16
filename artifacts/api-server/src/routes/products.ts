import { Router, type IRouter } from "express";
import { eq, ilike, gte, lte, desc, asc, and, sql, inArray } from "drizzle-orm";
import { db, productsTable, reviewsTable } from "@workspace/db";
import {
  ListProductsQueryParams,
  CreateProductBody,
  GetProductParams,
  UpdateProductParams,
  UpdateProductBody,
  DeleteProductParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

// Helper to add review stats to products
async function withReviewStats(products: (typeof productsTable.$inferSelect)[]) {
  const productIds = products.map((p) => p.id);
  if (productIds.length === 0) return products;

  const reviews = await db
    .select({
      productId: reviewsTable.productId,
      avg: sql<string>`avg(${reviewsTable.rating})`,
      count: sql<string>`count(*)`,
    })
    .from(reviewsTable)
    .where(inArray(reviewsTable.productId, productIds))
    .groupBy(reviewsTable.productId);

  const reviewMap = new Map(reviews.map((r) => [r.productId, r]));

  return products.map((p) => {
    const r = reviewMap.get(p.id);
    return {
      ...p,
      price: Number(p.price),
      originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
      averageRating: r ? Math.round(Number(r.avg) * 10) / 10 : null,
      reviewCount: r ? Number(r.count) : 0,
    };
  });
}

router.get("/products", async (req, res): Promise<void> => {
  const params = ListProductsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { category, search, minPrice, maxPrice, sort, page = 1, limit = 12 } = params.data;

  const conditions = [];
  if (category) conditions.push(eq(productsTable.category, category));
  if (search) conditions.push(ilike(productsTable.name, `%${search}%`));
  if (minPrice) conditions.push(gte(productsTable.price, String(minPrice)));
  if (maxPrice) conditions.push(lte(productsTable.price, String(maxPrice)));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  let orderBy;
  switch (sort) {
    case "price_asc": orderBy = asc(productsTable.price); break;
    case "price_desc": orderBy = desc(productsTable.price); break;
    case "name_asc": orderBy = asc(productsTable.name); break;
    case "name_desc": orderBy = desc(productsTable.name); break;
    default: orderBy = desc(productsTable.createdAt);
  }

  const offset = (Number(page) - 1) * Number(limit);

  const [products, countResult] = await Promise.all([
    db.select().from(productsTable).where(whereClause).orderBy(orderBy).limit(Number(limit)).offset(offset),
    db.select({ count: sql<string>`count(*)` }).from(productsTable).where(whereClause),
  ]);

  const enriched = await withReviewStats(products);
  res.json({ products: enriched, total: Number(countResult[0].count), page: Number(page), limit: Number(limit) });
});

router.get("/products/featured", async (_req, res): Promise<void> => {
  const products = await db.select().from(productsTable).where(eq(productsTable.isFeatured, true)).limit(8);
  const enriched = await withReviewStats(products);
  res.json(enriched);
});

router.get("/products/bestsellers", async (_req, res): Promise<void> => {
  const products = await db.select().from(productsTable).where(eq(productsTable.isBestseller, true)).limit(8);
  const enriched = await withReviewStats(products);
  res.json(enriched);
});

router.get("/products/new-arrivals", async (_req, res): Promise<void> => {
  const products = await db.select().from(productsTable).where(eq(productsTable.isNewArrival, true)).limit(8);
  const enriched = await withReviewStats(products);
  res.json(enriched);
});

router.get("/products/:slug", async (req, res): Promise<void> => {
  const params = GetProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db.select().from(productsTable).where(eq(productsTable.slug, params.data.slug));
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const [enriched] = await withReviewStats([product]);
  res.json(enriched);
});

router.post("/products", async (req, res): Promise<void> => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [product] = await db.insert(productsTable).values({
    name: data.name,
    slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now(),
    description: data.description,
    price: String(data.price),
    originalPrice: data.originalPrice ? String(data.originalPrice) : null,
    category: data.category,
    categoryId: data.categoryId,
    stock: data.stock ?? 0,
    sku: data.sku,
    images: data.images ?? [],
    isFeatured: data.isFeatured ?? false,
    isBestseller: data.isBestseller ?? false,
    isNewArrival: data.isNewArrival ?? false,
    hasEngravingOption: data.hasEngravingOption ?? false,
    scentNotes: data.scentNotes,
    ingredients: data.ingredients,
    usageInstructions: data.usageInstructions,
  }).returning();

  const [enriched] = await withReviewStats([product]);
  res.status(201).json(enriched);
});

router.patch("/products/:slug", async (req, res): Promise<void> => {
  const params = UpdateProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const updateData: Record<string, unknown> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.price !== undefined) updateData.price = String(data.price);
  if (data.originalPrice !== undefined) updateData.originalPrice = String(data.originalPrice);
  if (data.category !== undefined) updateData.category = data.category;
  if (data.stock !== undefined) updateData.stock = data.stock;
  if (data.images !== undefined) updateData.images = data.images;
  if (data.isFeatured !== undefined) updateData.isFeatured = data.isFeatured;
  if (data.isBestseller !== undefined) updateData.isBestseller = data.isBestseller;
  if (data.isNewArrival !== undefined) updateData.isNewArrival = data.isNewArrival;
  if (data.hasEngravingOption !== undefined) updateData.hasEngravingOption = data.hasEngravingOption;
  if (data.scentNotes !== undefined) updateData.scentNotes = data.scentNotes;

  const [product] = await db.update(productsTable).set(updateData).where(eq(productsTable.slug, params.data.slug)).returning();
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const [enriched] = await withReviewStats([product]);
  res.json(enriched);
});

router.delete("/products/:slug", async (req, res): Promise<void> => {
  const params = DeleteProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  await db.delete(productsTable).where(eq(productsTable.slug, params.data.slug));
  res.sendStatus(204);
});

export default router;
