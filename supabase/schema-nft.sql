-- SHAMIM FOREVER — NFT SOVEREIGN TABLES
-- Run this in your Supabase SQL Editor to create missing NFT tables

-- Enable UUID extension (already should be enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================
-- SOVEREIGN ASSETS (NFT Registry)
-- ========================
CREATE TABLE IF NOT EXISTS sovereign_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  serial_number TEXT UNIQUE NOT NULL,
  product_id TEXT,
  wallet_address TEXT,
  nft_status TEXT NOT NULL DEFAULT 'pending',
  -- pending | minting | minted | failed
  tx_hash TEXT,
  token_id BIGINT,
  ipfs_metadata_url TEXT,
  rarity_tier TEXT DEFAULT 'ELITE',
  -- COMMON | ELITE | ROYAL | IMPERIAL | FOUNDERS | ONE-OF-ONE
  ownership_cycle INT DEFAULT 0,
  physical_status TEXT DEFAULT 'vaulted',
  -- vaulted | requested | shipped | delivered
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- PROVENANCE LEDGER (Transfer History)
-- ========================
CREATE TABLE IF NOT EXISTS provenance_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token_id BIGINT,
  previous_owner TEXT,
  new_owner TEXT,
  transfer_tx_hash TEXT,
  physical_shipment_status TEXT DEFAULT 'vaulted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- PRODUCTS CATALOG (Luxury Metadata Extension)
-- ========================
CREATE TABLE IF NOT EXISTS products_catalog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT UNIQUE,
  product_name TEXT,
  category TEXT,
  -- Sovereign Fragrance Assets | Sovereign Jewelry Assets | Founders Editions | Atelier Editions | Royal Heritage Editions | 1/1 Bespoke Assets
  rarity_tier TEXT DEFAULT 'ELITE',
  description TEXT,
  base_image_ipfs TEXT,
  craftsmanship_origin TEXT DEFAULT 'Karachi Sovereign Atelier',
  manufacture_date TEXT,
  linked_physical_asset_details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- RLS POLICIES
-- ========================
ALTER TABLE sovereign_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE provenance_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE products_catalog ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (to avoid conflicts)
DROP POLICY IF EXISTS "Public read sovereign_assets" ON sovereign_assets;
DROP POLICY IF EXISTS "Service update sovereign_assets" ON sovereign_assets;
DROP POLICY IF EXISTS "Public read provenance_ledger" ON provenance_ledger;
DROP POLICY IF EXISTS "Service insert provenance_ledger" ON provenance_ledger;
DROP POLICY IF EXISTS "Public read products_catalog" ON products_catalog;

-- Sovereign assets: public read, service role can write
CREATE POLICY "Public read sovereign_assets" ON sovereign_assets FOR SELECT USING (TRUE);
CREATE POLICY "Service write sovereign_assets" ON sovereign_assets FOR ALL USING (TRUE);

-- Provenance ledger: public read, service role can write
CREATE POLICY "Public read provenance_ledger" ON provenance_ledger FOR SELECT USING (TRUE);
CREATE POLICY "Service write provenance_ledger" ON provenance_ledger FOR ALL USING (TRUE);

-- Products catalog: public read
CREATE POLICY "Public read products_catalog" ON products_catalog FOR SELECT USING (TRUE);
CREATE POLICY "Service write products_catalog" ON products_catalog FOR ALL USING (TRUE);

-- Add updated_at trigger for sovereign_assets
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_sovereign_assets_updated_at ON sovereign_assets;
CREATE TRIGGER update_sovereign_assets_updated_at
  BEFORE UPDATE ON sovereign_assets
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sovereign_assets_serial ON sovereign_assets(serial_number);
CREATE INDEX IF NOT EXISTS idx_sovereign_assets_wallet ON sovereign_assets(wallet_address);
CREATE INDEX IF NOT EXISTS idx_sovereign_assets_token_id ON sovereign_assets(token_id);
CREATE INDEX IF NOT EXISTS idx_provenance_ledger_token_id ON provenance_ledger(token_id);

SELECT 'NFT tables created successfully' AS status;
