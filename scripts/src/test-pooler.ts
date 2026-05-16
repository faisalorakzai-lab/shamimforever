import pg from "pg";

const { Pool } = pg;

const rawUrl = process.env.SUPABASE_DB_URL || "";

// Parse URL to get decoded credentials
let parsedUser = "postgres";
let parsedPassword = "";
let parsedProjectRef = "";

const match = rawUrl.match(/postgresql:\/\/([^:@]+):([^@]+)@db\.([^.]+)\.supabase\.co/);
if (!match) {
  console.error("Cannot parse SUPABASE_DB_URL");
  process.exit(1);
}

const [, user, encodedPass, ref] = match;
parsedUser = user;
parsedPassword = decodeURIComponent(encodedPass);
parsedProjectRef = ref;

console.log("Project ref:", parsedProjectRef);
console.log("Password (decoded length):", parsedPassword.length);

async function testPooler(host: string, port: number, username: string, label: string): Promise<boolean> {
  const pool = new Pool({
    host,
    port,
    user: username,
    password: parsedPassword,
    database: "postgres",
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000,
  });
  try {
    const r = await pool.query("SELECT current_database()");
    console.log(`✓ ${label}: Connected! DB=${r.rows[0].current_database}`);
    await pool.end();
    return true;
  } catch (e) {
    const err = e as Error;
    console.log(`✗ ${label}: ${err.message.slice(0, 100)}`);
    await pool.end();
    return false;
  }
}

async function main() {
  console.log("\nTesting Supabase pooler connections with decoded credentials...\n");

  const regions = ["us-east-1", "us-east-2", "us-west-1", "eu-west-1", "eu-central-1", "ap-southeast-1"];
  
  for (const region of regions) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    const userWithRef = `postgres.${parsedProjectRef}`;
    
    // Session pooler (port 5432)
    const ok = await testPooler(host, 5432, userWithRef, `Session pooler ${region}:5432`);
    if (ok) {
      console.log("\n✓ WORKING POOLER URL (use as SUPABASE_DB_URL):");
      const encodedPwd = encodeURIComponent(parsedPassword);
      console.log(`postgresql://${userWithRef}:${encodedPwd}@${host}:5432/postgres`);
      break;
    }

    // Transaction pooler (port 6543) 
    const ok2 = await testPooler(host, 6543, userWithRef, `Transaction pooler ${region}:6543`);
    if (ok2) {
      console.log("\n✓ WORKING POOLER URL (use as SUPABASE_DB_URL):");
      const encodedPwd = encodeURIComponent(parsedPassword);
      console.log(`postgresql://${userWithRef}:${encodedPwd}@${host}:6543/postgres`);
      break;
    }
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
