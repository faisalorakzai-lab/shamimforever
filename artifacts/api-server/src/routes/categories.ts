import { Router, type IRouter } from "express";
  import { supabase } from "@workspace/db";
  import { CreateCategoryBody } from "@workspace/api-zod";

  const router: IRouter = Router();

  router.get("/categories", async (_req, res): Promise<void> => {
    const { data } = await supabase.from("categories").select("*");
    res.json(data || []);
  });

  router.post("/categories", async (req, res): Promise<void> => {
    const parsed = CreateCategoryBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const { data, error } = await supabase.from("categories").insert(parsed.data).select().single();
    if (error || !data) { res.status(500).json({ error: "Failed to create category" }); return; }
    res.status(201).json(data);
  });

  export default router;
  