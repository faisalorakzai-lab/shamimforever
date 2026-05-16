import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

async function main() {
  const r = await pool.query("SELECT current_database(), version()");
  console.log("Connected to:", r.rows[0].current_database);
  console.log("Version:", r.rows[0].version.substring(0, 40));
  await pool.end();
}

main().then(() => process.exit(0)).catch((e) => {
  console.error("DB Error:", e.message);
  process.exit(1);
});
