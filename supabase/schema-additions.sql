-- ADDITIONS: vault_members + nft_claim_logs tables
-- Run this in Supabase SQL Editor (after the main schema-nft.sql)

-- Vault Members (rank tracking per wallet)
CREATE TABLE IF NOT EXISTS vault_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT UNIQUE NOT NULL,
  total_score INT DEFAULT 0,
  sovereign_rank TEXT DEFAULT 'Associate',
  member_since TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NFT Claim Logs (audit trail)
CREATE TABLE IF NOT EXISTS nft_claim_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  serial_number TEXT,
  wallet_address TEXT,
  action TEXT NOT NULL,
  tx_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE vault_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE nft_claim_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read vault_members" ON vault_members FOR SELECT USING (TRUE);
CREATE POLICY "Service write vault_members" ON vault_members FOR ALL USING (TRUE);
CREATE POLICY "Public read nft_claim_logs" ON nft_claim_logs FOR SELECT USING (TRUE);
CREATE POLICY "Service write nft_claim_logs" ON nft_claim_logs FOR ALL USING (TRUE);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_vault_members_wallet ON vault_members(wallet_address);
CREATE INDEX IF NOT EXISTS idx_nft_claim_logs_serial ON nft_claim_logs(serial_number);
CREATE INDEX IF NOT EXISTS idx_nft_claim_logs_wallet ON nft_claim_logs(wallet_address);
