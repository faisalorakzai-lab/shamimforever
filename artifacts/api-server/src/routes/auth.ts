import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
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

router.post("/auth/register", async (req, res): Promise<void> => {
  const parsed = RegisterUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { email, password, name } = parsed.data;

  const [existing] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (existing) {
    res.status(400).json({ error: "Email already registered" });
    return;
  }

  const [user] = await db.insert(usersTable).values({
    email,
    name,
    passwordHash: hashPassword(password),
    role: email === process.env.ADMIN_EMAIL ? "admin" : "customer",
  }).returning();

  res.cookie("userId", String(user.id), { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.status(201).json({
    token: String(user.id),
    user: { id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone, address: user.address, createdAt: user.createdAt.toISOString() },
  });
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { email, password } = parsed.data;
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

  if (!user || user.passwordHash !== hashPassword(password)) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  res.cookie("userId", String(user.id), { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.json({
    token: String(user.id),
    user: { id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone, address: user.address, createdAt: user.createdAt.toISOString() },
  });
});

router.post("/auth/logout", async (req, res): Promise<void> => {
  res.clearCookie("userId");
  res.json({ message: "Logged out" });
});

router.get("/auth/profile", async (req, res): Promise<void> => {
  const userId = getUserFromSession(req as { cookies?: { userId?: string } });
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json({ id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone, address: user.address, createdAt: user.createdAt.toISOString() });
});

router.patch("/auth/profile", async (req, res): Promise<void> => {
  const userId = getUserFromSession(req as { cookies?: { userId?: string } });
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const parsed = UpdateProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [user] = await db.update(usersTable).set(parsed.data).where(eq(usersTable.id, userId)).returning();
  res.json({ id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone, address: user.address, createdAt: user.createdAt.toISOString() });
});

export default router;
