import { Router, type IRouter } from "express";
  import { supabase } from "@workspace/db";
  import { ListProductsQueryParams, CreateProductBody, GetProductParams, UpdateProductParams, UpdateProductBody, DeleteProductParams } from "@workspace/api-zod";

  const router: IRouter = Router();

  function mapProduct(p: Record<string, unknown>, reviewStats?: { avg: number; count: number }) {
    return { ...p, price: Number(p.price), originalPrice: p.original_price ? Number(p.original_price) : null, averageRating: reviewStats ? Math.round(reviewStats.avg * 10) / 10 : null, reviewCount: reviewStats ? reviewStats.count : 0 };
  }

  async function withReviews(products: Record<string, unknown>[]) {
    if (products.length === 0) return [];
    const ids = products.map((p) => p.id as number);
    const { data: reviews } = await supabase.from("reviews").select("product_id, rating").in("product_id", ids);
    const rmap = new Map<number, { sum: number; count: number }>();
    for (const r of ((reviews || []) as Record<string, unknown>[])) {
      const pid = r.product_id as number;
      if (!rmap.has(pid)) rmap.set(pid, { sum: 0, count: 0 });
      const cur = rmap.get(pid)!;
      cur.sum += r.rating as number;
      cur.count += 1;
    }
    return products.map((p) => {
      const r = rmap.get(p.id as number);
      return mapProduct(p, r ? { avg: r.sum / r.count, count: r.count } : undefined);
    });
  }

  router.get("/products", async (req, res): Promise<void> => {
    const params = ListProductsQueryParams.safeParse(req.query);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const { category, search, minPrice, maxPrice, sort, page = 1, limit = 12 } = params.data;
    const offset = (Number(page) - 1) * Number(limit);
    const tags = (req.query.tags as string) || undefined;

    let q = supabase.from("products").select("*", { count: "exact" });
    if (category) q = q.eq("category", category);
    if (search) q = q.ilike("name", `%${search}%`);
    if (minPrice) q = q.gte("price", String(minPrice));
    if (maxPrice) q = q.lte("price", String(maxPrice));
    if (tags) {
      const tagList = tags.split(",").map(t => t.trim());
      q = q.contains("tags", tagList);
    }

    switch (sort) {
      case "price_asc": q = q.order("price", { ascending: true }); break;
      case "price_desc": q = q.order("price", { ascending: false }); break;
      case "name_asc": q = q.order("name", { ascending: true }); break;
      case "name_desc": q = q.order("name", { ascending: false }); break;
      default: q = q.order("created_at", { ascending: false });
    }

    const { data: products, count } = await q.range(offset, offset + Number(limit) - 1);
    const enriched = await withReviews((products || []) as Record<string, unknown>[]);
    res.json({ products: enriched, total: count ?? 0, page: Number(page), limit: Number(limit) });
  });

  router.get("/products/featured", async (_req, res): Promise<void> => {
    const { data } = await supabase.from("products").select("*").eq("is_featured", true).limit(8);
    res.json(await withReviews((data || []) as Record<string, unknown>[]));
  });

  router.get("/products/bestsellers", async (_req, res): Promise<void> => {
    const { data } = await supabase.from("products").select("*").eq("is_bestseller", true).limit(8);
    res.json(await withReviews((data || []) as Record<string, unknown>[]));
  });

  router.get("/products/new-arrivals", async (_req, res): Promise<void> => {
    const { data } = await supabase.from("products").select("*").eq("is_new_arrival", true).limit(8);
    res.json(await withReviews((data || []) as Record<string, unknown>[]));
  });

  router.get("/products/:slug", async (req, res): Promise<void> => {
    const params = GetProductParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const { data: product } = await supabase.from("products").select("*").eq("slug", params.data.slug).maybeSingle();
    if (!product) { res.status(404).json({ error: "Product not found" }); return; }

    const [enriched] = await withReviews([product as Record<string, unknown>]);
    res.json(enriched);
  });

  router.post("/products", async (req, res): Promise<void> => {
    const parsed = CreateProductBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const d = parsed.data;
    const { data: product, error } = await supabase.from("products").insert({
      name: d.name, slug: d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now(),
      description: d.description, price: String(d.price),
      original_price: d.originalPrice ? String(d.originalPrice) : null,
      category: d.category, category_id: d.categoryId, stock: d.stock ?? 0, sku: d.sku,
      images: d.images ?? [], is_featured: d.isFeatured ?? false, is_bestseller: d.isBestseller ?? false,
      is_new_arrival: d.isNewArrival ?? false, has_engraving_option: d.hasEngravingOption ?? false,
      scent_notes: d.scentNotes, ingredients: d.ingredients, usage_instructions: d.usageInstructions, tags: d.tags ?? [],
    }).select().single();

    if (error || !product) { res.status(500).json({ error: "Failed to create product" }); return; }
    const [enriched] = await withReviews([product as Record<string, unknown>]);
    res.status(201).json(enriched);
  });

  router.patch("/products/:slug", async (req, res): Promise<void> => {
    const params = UpdateProductParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const parsed = UpdateProductBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const d = parsed.data;
    const upd: Record<string, unknown> = {};
    if (d.name !== undefined) upd.name = d.name;
    if (d.description !== undefined) upd.description = d.description;
    if (d.price !== undefined) upd.price = String(d.price);
    if (d.originalPrice !== undefined) upd.original_price = String(d.originalPrice);
    if (d.category !== undefined) upd.category = d.category;
    if (d.stock !== undefined) upd.stock = d.stock;
    if (d.images !== undefined) upd.images = d.images;
    if (d.isFeatured !== undefined) upd.is_featured = d.isFeatured;
    if (d.isBestseller !== undefined) upd.is_bestseller = d.isBestseller;
    if (d.isNewArrival !== undefined) upd.is_new_arrival = d.isNewArrival;
    if (d.hasEngravingOption !== undefined) upd.has_engraving_option = d.hasEngravingOption;
    if (d.tags !== undefined) upd.tags = d.tags;
    if (d.scentNotes !== undefined) upd.scent_notes = d.scentNotes;

    const { data: product } = await supabase.from("products").update(upd).eq("slug", params.data.slug).select().single();
    if (!product) { res.status(404).json({ error: "Product not found" }); return; }

    const [enriched] = await withReviews([product as Record<string, unknown>]);
    res.json(enriched);
  });

  router.delete("/products/:slug", async (req, res): Promise<void> => {
    const params = DeleteProductParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    await supabase.from("products").delete().eq("slug", params.data.slug);
    res.sendStatus(204);
  });

  export default router;
  