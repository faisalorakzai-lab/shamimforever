import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

// GET /api/admin/migrate-db?secret=<ADMIN_EMAIL>
// Creates sovereign NFT tables in Supabase using raw SQL via the REST API
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized. Pass ?secret=<admin_email>' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  // SQL to create tables
  const migrationSQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE IF NOT EXISTS sovereign_assets (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      serial_number TEXT UNIQUE NOT NULL,
      product_id TEXT,
      wallet_address TEXT,
      nft_status TEXT NOT NULL DEFAULT 'pending',
      tx_hash TEXT,
      token_id BIGINT,
      ipfs_metadata_url TEXT,
      rarity_tier TEXT DEFAULT 'ELITE',
      ownership_cycle INT DEFAULT 0,
      physical_status TEXT DEFAULT 'vaulted',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS provenance_ledger (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      token_id BIGINT,
      previous_owner TEXT,
      new_owner TEXT,
      transfer_tx_hash TEXT,
      physical_shipment_status TEXT DEFAULT 'vaulted',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS products_catalog (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      product_id TEXT UNIQUE,
      product_name TEXT,
      category TEXT,
      rarity_tier TEXT DEFAULT 'ELITE',
      description TEXT,
      base_image_ipfs TEXT,
      craftsmanship_origin TEXT DEFAULT 'Karachi Sovereign Atelier',
      manufacture_date TEXT,
      linked_physical_asset_details TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    ALTER TABLE IF EXISTS sovereign_assets ENABLE ROW LEVEL SECURITY;
    ALTER TABLE IF EXISTS provenance_ledger ENABLE ROW LEVEL SECURITY;
    ALTER TABLE IF EXISTS products_catalog ENABLE ROW LEVEL SECURITY;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='sovereign_assets' AND policyname='Public read sovereign_assets') THEN
        CREATE POLICY "Public read sovereign_assets" ON sovereign_assets FOR SELECT USING (TRUE);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='sovereign_assets' AND policyname='Service write sovereign_assets') THEN
        CREATE POLICY "Service write sovereign_assets" ON sovereign_assets FOR ALL USING (TRUE);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='provenance_ledger' AND policyname='Public read provenance_ledger') THEN
        CREATE POLICY "Public read provenance_ledger" ON provenance_ledger FOR SELECT USING (TRUE);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='provenance_ledger' AND policyname='Service write provenance_ledger') THEN
        CREATE POLICY "Service write provenance_ledger" ON provenance_ledger FOR ALL USING (TRUE);
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS idx_sovereign_assets_serial ON sovereign_assets(serial_number);
    CREATE INDEX IF NOT EXISTS idx_sovereign_assets_wallet ON sovereign_assets(wallet_address);
    CREATE INDEX IF NOT EXISTS idx_provenance_ledger_token_id ON provenance_ledger(token_id);
  `

  // Try via Supabase Management API
  const mgmtRes = await fetch(`https://api.supabase.com/v1/projects/uvgtgeauhjbdatrmmaob/database/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ query: migrationSQL }),
  })

  const mgmtText = await mgmtRes.text()
  let mgmtResult: unknown
  try { mgmtResult = JSON.parse(mgmtText) } catch { mgmtResult = mgmtText }

  return NextResponse.json({
    status: mgmtRes.ok ? 'success' : 'failed',
    statusCode: mgmtRes.status,
    result: mgmtResult,
    message: mgmtRes.ok 
      ? 'Tables created successfully!' 
      : 'Migration failed. Please run supabase/schema-nft.sql manually in your Supabase SQL Editor.',
    manual_fallback: 'supabase/schema-nft.sql',
  })
}
