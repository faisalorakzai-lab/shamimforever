import { drizzle } from "drizzle-orm/node-postgres";
  import pg from "pg";
  import * as schema from "./schema";

  const { Pool } = pg;

  function buildConnectionString(): string {
    // In development (Replit), prefer the built-in DATABASE_URL.
    // In production, use SUPABASE_DB_URL or DATABASE_URL as-is (no pooler conversion).
    if (process.env.NODE_ENV !== "production" && process.env.DATABASE_URL) {
      return process.env.DATABASE_URL;
    }

    const raw = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
    if (!raw) throw new Error("SUPABASE_DB_URL or DATABASE_URL must be set.");

    return raw;
  }

  const connectionString = buildConnectionString();

  export const pool = new Pool({
    connectionString,
    ssl: connectionString.includes("supabase") ? { rejectUnauthorized: false } : false,
    max: 3,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 10000,
  });
  export const db = drizzle(pool, { schema });

  export * from "./schema";
  