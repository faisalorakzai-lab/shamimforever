import { defineConfig } from "drizzle-kit";
import path from "path";

function buildConnectionString(): string {
  // For migrations (drizzle-kit), prefer DATABASE_URL in dev (Replit's built-in PostgreSQL).
  if (process.env.NODE_ENV !== "production" && process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const raw = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  if (!raw) throw new Error("SUPABASE_DB_URL or DATABASE_URL must be set");

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

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
    ssl: connectionString.includes("supabase") ? { rejectUnauthorized: false } : undefined,
  },
});
