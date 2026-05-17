import { Router, type IRouter } from "express";
  import { supabase } from "@workspace/db";
  import {
    CreateReviewBody, CreateReviewParams, ListProductReviewsParams,
    AddToWishlistParams, RemoveFromWishlistParams,
    CreateConciergeBookingBody, SubscribeNewsletterBody, GetScentRecommendationsBody,
  } from "@workspace/api-zod";

  const router: IRouter = Router();

  function getUserFromSession(req: { cookies?: { userId?: string } }): number | null {
    const userId = req.cookies?.userId;
    return userId ? parseInt(userId, 10) : null;
  }

  function mapProduct(p: Record<string, unknown>) {
    return { ...p, price: Number(p.price), originalPrice: p.original_price ? Number(p.original_price) : null, averageRating: null, reviewCount: 0 };
  }

  router.get("/products/:slug/reviews", async (req, res): Promise<void> => {
    const params = ListProductReviewsParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const { data: product } = await supabase.from("products").select("id").eq("slug", params.data.slug).maybeSingle();
    if (!product) { res.status(404).json({ error: "Product not found" }); return; }

    const { data: reviews } = await supabase.from("reviews").select("*").eq("product_id", product.id);
    res.json((reviews || []).map((r: Record<string, unknown>) => ({ ...r, createdAt: r.created_at })));
  });

  router.post("/products/:slug/reviews", async (req, res): Promise<void> => {
    const params = CreateReviewParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const parsed = CreateReviewBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const userId = getUserFromSession(req as { cookies?: { userId?: string } });
    const { data: product } = await supabase.from("products").select("id").eq("slug", params.data.slug).maybeSingle();
    if (!product) { res.status(404).json({ error: "Product not found" }); return; }

    const { data: review, error } = await supabase.from("reviews").insert({
      product_id: product.id, user_id: userId ?? null, rating: parsed.data.rating,
      comment: parsed.data.comment ?? null, reviewer_name: parsed.data.reviewerName ?? null,
    }).select().single();

    if (error || !review) { res.status(500).json({ error: "Failed to create review" }); return; }
    res.status(201).json({ ...review, createdAt: review.created_at });
  });

  router.get("/wishlist", async (req, res): Promise<void> => {
    const userId = getUserFromSession(req as { cookies?: { userId?: string } });
    if (!userId) { res.json([]); return; }

    const { data: items } = await supabase.from("wishlist").select("*, products(*)").eq("user_id", userId);
    res.json((items || []).map((item: Record<string, unknown>) => ({
      ...item, createdAt: item.created_at,
      product: item.products ? mapProduct(item.products as Record<string, unknown>) : undefined,
    })));
  });

  router.post("/wishlist/:productId", async (req, res): Promise<void> => {
    const params = AddToWishlistParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const userId = getUserFromSession(req as { cookies?: { userId?: string } });
    if (!userId) { res.status(401).json({ error: "Login required" }); return; }

    const { data: item, error } = await supabase.from("wishlist").insert({ user_id: userId, product_id: params.data.productId }).select("*, products(*)").single();
    if (error || !item) { res.status(500).json({ error: "Failed to add to wishlist" }); return; }

    res.status(201).json({ ...item, createdAt: item.created_at, product: item.products ? mapProduct(item.products as Record<string, unknown>) : undefined });
  });

  router.delete("/wishlist/:productId", async (req, res): Promise<void> => {
    const params = RemoveFromWishlistParams.safeParse(req.params);
    if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

    const userId = getUserFromSession(req as { cookies?: { userId?: string } });
    if (!userId) { res.status(401).json({ error: "Login required" }); return; }

    await supabase.from("wishlist").delete().eq("user_id", userId).eq("product_id", params.data.productId);
    res.sendStatus(204);
  });

  router.get("/scent-finder/questions", async (_req, res): Promise<void> => {
    res.json([
      { id: "mood", question: "What mood do you want your fragrance to evoke?", options: [{ value: "romantic", label: "Romantic & Sensual" }, { value: "fresh", label: "Fresh & Energizing" }, { value: "mysterious", label: "Mysterious & Intense" }, { value: "elegant", label: "Elegant & Refined" }] },
      { id: "occasion", question: "When will you primarily wear this fragrance?", options: [{ value: "day", label: "Daytime & Office" }, { value: "evening", label: "Evening & Events" }, { value: "special", label: "Special Occasions" }, { value: "everyday", label: "Everyday Wear" }] },
      { id: "notes", question: "Which scent family appeals to you most?", options: [{ value: "woody", label: "Woody & Earthy (Oud, Sandalwood)" }, { value: "floral", label: "Floral & Powdery (Rose, Jasmine)" }, { value: "oriental", label: "Oriental & Spicy (Amber, Musk)" }, { value: "fresh", label: "Fresh & Citrus (Bergamot, Lemon)" }] },
      { id: "intensity", question: "How intense do you prefer your fragrance?", options: [{ value: "light", label: "Light & Subtle" }, { value: "moderate", label: "Moderate & Balanced" }, { value: "strong", label: "Strong & Long-lasting" }, { value: "intense", label: "Intense & Commanding" }] },
    ]);
  });

  router.post("/scent-finder/recommend", async (req, res): Promise<void> => {
    const parsed = GetScentRecommendationsBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const { data: products } = await supabase.from("products").select("*").eq("category", "Perfume").limit(4);
    res.json((products || []).map((p: Record<string, unknown>) => mapProduct(p)));
  });

  router.get("/boutiques", async (_req, res): Promise<void> => {
    const { data } = await supabase.from("boutiques").select("*");
    res.json((data || []).map((b: Record<string, unknown>) => ({ ...b, lat: Number(b.lat), lng: Number(b.lng) })));
  });

  router.post("/concierge/bookings", async (req, res): Promise<void> => {
    const parsed = CreateConciergeBookingBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const d = parsed.data;
    const { data: booking, error } = await supabase.from("concierge_bookings").insert({
      name: d.name, email: d.email, phone: d.phone ?? null, service: d.service,
      preferred_date: d.preferredDate, preferred_time: d.preferredTime ?? null, notes: d.notes ?? null,
    }).select().single();

    if (error || !booking) { res.status(500).json({ error: "Failed to create booking" }); return; }
    res.status(201).json({ ...booking, createdAt: booking.created_at });
  });

  router.post("/newsletter/subscribe", async (req, res): Promise<void> => {
    const parsed = SubscribeNewsletterBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    await supabase.from("newsletter_subscribers").upsert({ email: parsed.data.email, name: parsed.data.name ?? null }, { onConflict: "email" });
    res.json({ message: "Thank you for subscribing to Shamim Forever." });
  });

  export default router;
  