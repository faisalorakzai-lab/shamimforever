import { Router, type IRouter } from "express";
  import { supabase } from "@workspace/db";
  import { RegisterUserBody, LoginUserBody, UpdateProfileBody } from "@workspace/api-zod";
  import { createHash } from "crypto";

  const router: IRouter = Router();

  function hashPassword(password: string): string {
    return createHash("sha256").update(password + process.env.SESSION_SECRET).digest("hex");
  }

  function getUserFromSession(req: { cookies?: { userId?: string } }): number | null {
    const userId = req.cookies?.userId;
    return userId ? parseInt(userId, 10) : null;
  }

  function mapUser(u: Record<string, unknown>) {
    return { id: u.id, email: u.email, name: u.name, role: u.role, phone: u.phone ?? null, address: u.address ?? null, createdAt: u.created_at };
  }

  router.post("/auth/register", async (req, res): Promise<void> => {
    const parsed = RegisterUserBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const { email, password, name } = parsed.data;

    const { data: existing } = await supabase.from("users").select("id").eq("email", email).maybeSingle();
    if (existing) { res.status(400).json({ error: "Email already registered" }); return; }

    const { data: user, error } = await supabase
      .from("users")
      .insert({ email, name, password_hash: hashPassword(password), role: email === process.env.ADMIN_EMAIL ? "admin" : "customer" })
      .select()
      .single();

    if (error || !user) { res.status(500).json({ error: "Failed to create user", detail: error?.message }); return; }

    res.cookie("userId", String(user.id), { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ token: String(user.id), user: mapUser(user) });
  });

  router.post("/auth/login", async (req, res): Promise<void> => {
    const parsed = LoginUserBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const { email, password } = parsed.data;
    const { data: user } = await supabase.from("users").select("*").eq("email", email).maybeSingle();

    if (!user || user.password_hash !== hashPassword(password)) {
      res.status(401).json({ error: "Invalid credentials" }); return;
    }

    res.cookie("userId", String(user.id), { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.json({ token: String(user.id), user: mapUser(user) });
  });

  router.post("/auth/logout", async (_req, res): Promise<void> => {
    res.clearCookie("userId");
    res.json({ message: "Logged out" });
  });

  router.get("/auth/profile", async (req, res): Promise<void> => {
    const userId = getUserFromSession(req as { cookies?: { userId?: string } });
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    const { data: user } = await supabase.from("users").select("*").eq("id", userId).maybeSingle();
    if (!user) { res.status(404).json({ error: "User not found" }); return; }

    res.json(mapUser(user));
  });

  router.patch("/auth/profile", async (req, res): Promise<void> => {
    const userId = getUserFromSession(req as { cookies?: { userId?: string } });
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    const parsed = UpdateProfileBody.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const upd: Record<string, unknown> = {};
    if (parsed.data.name !== undefined) upd.name = parsed.data.name;
    if (parsed.data.phone !== undefined) upd.phone = parsed.data.phone;
    if (parsed.data.address !== undefined) upd.address = parsed.data.address;

    const { data: user } = await supabase.from("users").update(upd).eq("id", userId).select().single();
    if (!user) { res.status(404).json({ error: "User not found" }); return; }

    res.json(mapUser(user));
  });

  export default router;
  