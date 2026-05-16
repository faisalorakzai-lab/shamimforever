import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

function buildConnectionString(): string {
  // In development (Replit), prefer the built-in DATABASE_URL.
  // In production, prefer SUPABASE_DB_URL (with pooler fallback) or DATABASE_URL.
  if (process.env.NODE_ENV !== "production" && process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const raw = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  if (!raw) throw new Error("SUPABASE_DB_URL or DATABASE_URL must be set.");

  // Auto-convert Supabase direct URL → pooler URL for production environments
  const directMatch = raw.match(/postgresql:\/\/([^:]+):([^@]+)@db\.([^.]+)\.supabase\.co/);
  if (directMatch) {
    const [, , encodedPass, ref] = directMatch;
    const pass = decodeURIComponent(encodedPass);
    const encodedForUrl = encodeURIComponent(pass);
    return `postgresql://postgres.${ref}:${encodedForUrl}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;
  }

  return raw;
}

const connectionString = buildConnectionString();

export const pool = new Pool({ connectionString, ssl: connectionString.includes("supabase") ? { rejectUnauthorized: false } : false });
export const db = drizzle(pool, { schema });

export * from "./schema";
