-- Dedicated storage for the Whitelist Access request flow.
-- The API also falls back to inner_circle_requests for older deployments.
CREATE TABLE IF NOT EXISTS whitelist_access_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  interest TEXT NOT NULL,
  access_interests TEXT[] DEFAULT '{}',
  note TEXT,
  consent BOOLEAN NOT NULL DEFAULT FALSE,
  privacy_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE whitelist_access_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit whitelist access request" ON whitelist_access_requests;
CREATE POLICY "Anyone can submit whitelist access request"
  ON whitelist_access_requests FOR INSERT WITH CHECK (TRUE);

CREATE INDEX IF NOT EXISTS idx_whitelist_access_email ON whitelist_access_requests(email);
CREATE INDEX IF NOT EXISTS idx_whitelist_access_status ON whitelist_access_requests(status);