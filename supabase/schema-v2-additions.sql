-- ============================================================
-- SHAMIM FOREVER — SCHEMA V2 ADDITIONS
-- Run this in Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- ─── 1. ADD is_pinned + sort_order TO PRODUCTS ──────────────
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 99;

-- Indexes for fast category-top-product queries
CREATE INDEX IF NOT EXISTS idx_products_pinned ON products(is_pinned) WHERE is_pinned = TRUE;
CREATE INDEX IF NOT EXISTS idx_products_cat_sort ON products(main_category_id, is_pinned, sort_order, created_at);

-- ─── 2. ADD is_pinned + sort_order TO BOUTIQUES ─────────────
ALTER TABLE boutiques ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE;
ALTER TABLE boutiques ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 99;

-- ─── 3. SUB-CATEGORIES (gender-based, universal) ────────────
-- These IDs are hardcoded in the shop frontend — do NOT change them
INSERT INTO sub_categories (id, main_category_id, name, slug, description)
VALUES
  ('ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b', NULL, 'For Him',   'for-him',   'Male products — Perfumes, Cosmetics, Jewelry')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO sub_categories (id, main_category_id, name, slug, description)
VALUES
  ('ab8df629-e022-41d9-a6de-fac63d5680e8', NULL, 'For Her',   'for-her',   'Female products — Perfumes, Cosmetics, Jewelry')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO sub_categories (id, main_category_id, name, slug, description)
VALUES
  ('63e2c67c-fdba-40f7-9cd1-2cbe7fd6d852', NULL, 'Unisex',    'unisex',    'Unisex products for all')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- ─── 4. SLUG COLUMN ON PRODUCTS (if missing) ────────────────
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS products_slug_unique ON products(slug) WHERE slug IS NOT NULL;

-- ─── 5. ORDER TRACKING TABLE (referenced in checkout) ───────
CREATE TABLE IF NOT EXISTS order_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  title TEXT,
  description TEXT,
  location TEXT DEFAULT 'Shamim Forever HQ, Pakistan',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_order_tracking_order ON order_tracking(order_id);

-- ─── 6. INNER CIRCLE APPLICATIONS TABLE (referenced in checkout) ─
CREATE TABLE IF NOT EXISTS inner_circle_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT,
  order_ref TEXT,
  total_usd NUMERIC(10,2) DEFAULT 0,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_ica_wallet ON inner_circle_applications(wallet_address);
CREATE INDEX IF NOT EXISTS idx_ica_order ON inner_circle_applications(order_ref);

-- Enable RLS
ALTER TABLE order_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE inner_circle_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read order_tracking" ON order_tracking FOR SELECT USING (TRUE);
CREATE POLICY "Service all order_tracking" ON order_tracking FOR ALL USING (TRUE);
CREATE POLICY "Service all inner_circle_applications" ON inner_circle_applications FOR ALL USING (TRUE);

-- ─── 7. UPDATE slug COLUMN if missing ───────────────────────
UPDATE products SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9 ]', '', 'g'))::text
  WHERE slug IS NULL OR slug = '';
-- Make slugs URL-friendly
UPDATE products SET slug = regexp_replace(trim(slug), '\s+', '-', 'g') WHERE slug IS NOT NULL;

-- ─── 8. MAIN CATEGORIES — ensure perfume/cosmetics/jewelry exist ─
INSERT INTO main_categories (name, slug, description) VALUES
  ('Perfume',   'perfume',   'Luxury fragrances — Male, Female, Unisex'),
  ('Cosmetics', 'cosmetics', 'Premium beauty — Skin Prep, Color Makeup, Treatments'),
  ('Jewelry',   'jewelry',   'Fine jewelry — Male and Female collections')
ON CONFLICT (slug) DO NOTHING;

-- ─── DONE — Run seed-products & seed-more after this ────────
-- 1. GET /api/seed-products?secret=shamim-seed-2025
-- 2. GET /api/seed-more?secret=shamim-seed-more-2026
