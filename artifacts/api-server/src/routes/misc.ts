import { Router, type IRouter } from "express";
import { supabase } from "@workspace/db";
import { CreateReviewBody, ListProductReviewsParams, CreateReviewParams } from "@workspace/api-zod";

const router: IRouter = Router();

function getUserFromSession(req: { cookies?: { userId?: string } }): number | null {
  const userId = req.cookies?.userId;
  return userId ? parseInt(userId, 10) : null;
}

router.get("/products/:slug/reviews", async (req, res): Promise<void> => {
  const params = ListProductReviewsParams.safeParse(req.params);
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

  const { data: product } = await supabase.from("products").select("id").eq("slug", params.data.slug).maybeSingle();
  if (!product) { res.status(404).json({ error: "Product not found" }); return; }

  const { data: reviews } = await supabase.from("reviews").select("*").eq("product_id", (product as Record<string, unknown>).id).order("created_at", { ascending: false });
  res.json(reviews || []);
});

router.post("/products/:slug/reviews", async (req, res): Promise<void> => {
  const userId = getUserFromSession(req as { cookies?: { userId?: string } });
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const paramsParsed = CreateReviewParams.safeParse(req.params);
  if (!paramsParsed.success) { res.status(400).json({ error: paramsParsed.error.message }); return; }

  const parsed = CreateReviewBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

  const { data: product } = await supabase.from("products").select("id").eq("slug", paramsParsed.data.slug).maybeSingle();
  if (!product) { res.status(404).json({ error: "Product not found" }); return; }

  const { data: review, error } = await supabase.from("reviews").insert({
    product_id: (product as Record<string, unknown>).id,
    user_id: userId,
    rating: parsed.data.rating,
    comment: parsed.data.comment ?? null,
  }).select().single();

  if (error || !review) { res.status(500).json({ error: "Failed to create review" }); return; }
  res.status(201).json(review);
});

router.post("/discounts/validate", async (req, res): Promise<void> => {
  const body = req.body as Record<string, unknown>;
  if (!body.code || typeof body.code !== "string") { res.status(400).json({ error: "code is required" }); return; }
  const code = body.code;
  const orderAmount = typeof body.orderAmount === "number" ? body.orderAmount : Number(body.orderAmount ?? 0);
  const { data: discount } = await supabase.from("discounts").select("*").eq("code", code.toUpperCase()).maybeSingle();

  if (!discount) { res.status(404).json({ error: "Invalid discount code" }); return; }
  const d = discount as Record<string, unknown>;

  if (d.expires_at && new Date(d.expires_at as string) < new Date()) {
    res.status(400).json({ error: "Discount code has expired" }); return;
  }
  if (d.min_order_amount && orderAmount < Number(d.min_order_amount)) {
    res.status(400).json({ error: `Minimum order amount is ${d.min_order_amount}` }); return;
  }

  const discountAmount = d.type === "percentage"
    ? orderAmount * (Number(d.value) / 100)
    : Number(d.value);

  res.json({
    valid: true,
    code: d.code,
    type: d.type,
    value: Number(d.value),
    discountAmount: Math.min(discountAmount, orderAmount),
  });
});

router.get("/search", async (req, res): Promise<void> => {
  const q = typeof req.query.q === "string" ? req.query.q : "";
  if (!q) { res.json({ products: [], categories: [] }); return; }

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from("products").select("id, name, slug, price, images, category").ilike("name", `%${q}%`).limit(10),
    supabase.from("categories").select("id, name, slug").ilike("name", `%${q}%`).limit(5),
  ]);

  res.json({
    products: (products || []).map((p: Record<string, unknown>) => ({ ...p, price: Number(p.price) })),
    categories: categories || [],
  });
});

const STATIC_BOUTIQUES = [
  { id: 1, name: "Shamim Forever — Karachi", address: "Dolmen Mall, Shop No. 118, Ground Floor, Tariq Rd, Delhi CHS P.E.C.H.S.", city: "Karachi", country: "Pakistan", phone: "+92 21 3529 8686", email: "Team@shamimforever.com", openingHours: "Mon–Sun 11:00–22:00", lat: 24.8763, lng: 67.0601 },
  { id: 2, name: "Shamim Forever — Lahore", address: "Shop no G-32, Dolmen Mall, Sector A DHA Phase 6", city: "Lahore", country: "Pakistan", phone: "+92 42 3576 8686", email: "lahore@shamimforever.com", openingHours: "Mon–Sun 11:00–21:00", lat: 31.4726, lng: 74.3843 },
  { id: 3, name: "Shamim Forever — Islamabad", address: "Giga Mall, Sector F DHA Phase II", city: "Islamabad", country: "Pakistan", phone: "+92 51 2826 868", email: "Islamabad@shamimforever.com", openingHours: "Mon–Sun 11:00–21:00", lat: 33.5434, lng: 72.9836 },
  { id: 4, name: "Shamim Forever — Peshawar", address: "HBK Hyper Market Main Ring Road Achini Road, Achini Payan", city: "Peshawar", country: "Pakistan", phone: "+92 91 5700 868", email: "peshawar@shamimforever.com", openingHours: "Mon–Sun 11:00–21:00", lat: 33.9884, lng: 71.5386 },
];

router.get("/boutiques", async (_req, res): Promise<void> => {
  const { data } = await supabase.from("boutiques").select("*").order("id", { ascending: true });
  res.json(data && data.length > 0 ? data : STATIC_BOUTIQUES);
});

router.get("/banners", async (_req, res): Promise<void> => {
  const { data } = await supabase.from("banners").select("*").eq("is_active", true).order("created_at", { ascending: false });
  res.json(data || []);
});

router.get("/settings", async (_req, res): Promise<void> => {
  const { data } = await supabase.from("settings").select("*");
  const map: Record<string, unknown> = {};
  for (const s of ((data || []) as Record<string, unknown>[])) {
    map[s.key as string] = s.value;
  }
  res.json(map);
});

router.patch("/admin/settings", async (req, res): Promise<void> => {
  const updates = req.body as Record<string, unknown>;
  for (const [key, value] of Object.entries(updates)) {
    await supabase.from("settings").upsert({ key, value: String(value) }, { onConflict: "key" });
  }
  const { data } = await supabase.from("settings").select("*");
  const map: Record<string, unknown> = {};
  for (const s of ((data || []) as Record<string, unknown>[])) {
    map[s.key as string] = s.value;
  }
  res.json(map);
});

router.post("/admin/banners", async (req, res): Promise<void> => {
  const { title, subtitle, imageUrl, link, isActive } = req.body as Record<string, unknown>;
  const { data: banner, error } = await supabase.from("banners").insert({
    title, subtitle: subtitle ?? null, image_url: imageUrl, link: link ?? null, is_active: isActive ?? true,
  }).select().single();
  if (error || !banner) { res.status(500).json({ error: "Failed to create banner" }); return; }
  res.status(201).json(banner);
});

router.patch("/admin/banners/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  const upd: Record<string, unknown> = {};
  const b = req.body as Record<string, unknown>;
  if (b.title !== undefined) upd.title = b.title;
  if (b.subtitle !== undefined) upd.subtitle = b.subtitle;
  if (b.imageUrl !== undefined) upd.image_url = b.imageUrl;
  if (b.link !== undefined) upd.link = b.link;
  if (b.isActive !== undefined) upd.is_active = b.isActive;

  const { data: banner } = await supabase.from("banners").update(upd).eq("id", id).select().single();
  if (!banner) { res.status(404).json({ error: "Banner not found" }); return; }
  res.json(banner);
});

router.delete("/admin/banners/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  await supabase.from("banners").delete().eq("id", id);
  res.status(204).send();
});

export default router;
