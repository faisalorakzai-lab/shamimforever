-- NFT Notifications table for Digital Twin mint tracking
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS nft_notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  serial_number text UNIQUE NOT NULL,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  buyer_name text,
  wallet_address text,
  tx_hash text,
  token_id int,
  product_name text,
  opensea_url text,
  polygonscan_url text,
  authenticate_url text,
  notified_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_nft_notifications_serial ON nft_notifications(serial_number);
CREATE INDEX IF NOT EXISTS idx_nft_notifications_wallet ON nft_notifications(wallet_address);

-- Also ensure the products table has a slug column
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug text;
CREATE UNIQUE INDEX IF NOT EXISTS products_slug_unique ON products(slug) WHERE slug IS NOT NULL;

-- Upsert Shamim's Bloom product (update if exists, insert if not)
INSERT INTO products (
  name, slug, description,
  price_pkr, price_usd, inventory,
  images, is_featured, is_active,
  story
) VALUES (
  'Shamim''s Bloom — The Sovereign Grace',
  'shamims-bloom',
  'A sovereign feminine Extrait de Parfum — 100ML of rare Taif Rose, White Ambergris, and Royal Sandalwood. Each bottle paired with a Digital Twin NFT on Polygon blockchain.',
  72000, 255, 50,
  ARRAY[
    '/products/shamims-bloom/bloom-hero.png',
    '/products/shamims-bloom/bloom-1.png',
    '/products/shamims-bloom/bloom-2.png',
    '/products/shamims-bloom/bloom-crown.png',
    '/products/shamims-bloom/bloom-clean.png',
    '/products/shamims-bloom/bloom-3.png'
  ],
  true, true,
  '{"tagline":"The Sovereign Grace","olfactory":"A composition that opens with the rarest Taif Rose, blooms into White Ambergris, and anchors in Royal Sandalwood and Madagascar Vanilla.","scentPyramid":{"top":"Taif Rose Petals, Pink Saffron, Italian Bergamot","heart":"White Ambergris, Turkish Rose Milk, Jasmine Veil","base":"Royal Sandalwood, Madagascar Vanilla, Soft White Musk"},"specs":{"volume":"100ML Extrait de Parfum","concentration":"Highest Oil Concentration","sillage":"Elegant Royal Feminine Aura","longevity":"18–24 Hours","batch":"Strictly Limited Sovereign Reserve","price":"Rs 72,000 PKR · $255 USD"},"nft":{"title":"Digital Twin Sovereign Passport","description":"Every bottle of Shamim''s Bloom is paired with a unique NFT on Polygon blockchain — your permanent proof of ownership and access to the House of Shamim Forever inner circle."},"packaging":"Hand-assembled Crown Edition. Obsidian-tinted glass, 24k gold hardware, velvet presentation box."}'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_pkr = EXCLUDED.price_pkr,
  price_usd = EXCLUDED.price_usd,
  images = EXCLUDED.images,
  is_featured = EXCLUDED.is_featured,
  is_active = EXCLUDED.is_active,
  story = EXCLUDED.story;

