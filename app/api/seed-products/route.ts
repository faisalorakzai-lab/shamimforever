import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

function getPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 2,
    connectionTimeoutMillis: 30000,
  })
}

const SCHEMA_SQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS main_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sub_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  main_category_id UUID REFERENCES main_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  main_category_id UUID REFERENCES main_categories(id) ON DELETE SET NULL,
  sub_category_id UUID REFERENCES sub_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  story TEXT,
  price_pkr NUMERIC(12, 2) NOT NULL DEFAULT 0,
  price_usd NUMERIC(10, 2) NOT NULL DEFAULT 0,
  inventory INTEGER NOT NULL DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journal_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS boutiques (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  coordinates JSONB NOT NULL DEFAULT '{"lat": 0, "lng": 0}',
  image TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inner_circle_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  tier TEXT DEFAULT 'Sovereign',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE main_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE boutiques ENABLE ROW LEVEL SECURITY;
ALTER TABLE inner_circle_requests ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='collections' AND policyname='Public read collections') THEN
    CREATE POLICY "Public read collections" ON collections FOR SELECT USING (is_active = TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='main_categories' AND policyname='Public read categories') THEN
    CREATE POLICY "Public read categories" ON main_categories FOR SELECT USING (TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='sub_categories' AND policyname='Public read sub categories') THEN
    CREATE POLICY "Public read sub categories" ON sub_categories FOR SELECT USING (TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='products' AND policyname='Public read active products') THEN
    CREATE POLICY "Public read active products" ON products FOR SELECT USING (is_active = TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='journal_posts' AND policyname='Public read published journal') THEN
    CREATE POLICY "Public read published journal" ON journal_posts FOR SELECT USING (published = TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='boutiques' AND policyname='Public read active boutiques') THEN
    CREATE POLICY "Public read active boutiques" ON boutiques FOR SELECT USING (is_active = TRUE);
  END IF;
END $$;
`

const CATEGORIES_SQL = `
INSERT INTO main_categories (name, slug, description)
VALUES
  ('Perfume', 'perfume', 'High-end luxury fragrances crafted from the world''s rarest ingredients.'),
  ('Cosmetics', 'cosmetics', 'Bespoke beauty formulations for the sovereign individual.'),
  ('Jewelry', 'jewelry', 'Heirloom-quality pieces crafted from precious metals and gemstones.')
ON CONFLICT (slug) DO NOTHING;
`

const BOUTIQUES_SQL = `
INSERT INTO boutiques (name, address, city, country, phone, email, coordinates)
VALUES
  ('Lahore Sovereign Node', 'DHA Phase VI, Sector C', 'Lahore', 'Pakistan', '+92 42 3000 0001', 'lahore@shamimforever.com', '{"lat": 31.4504, "lng": 74.3587}'),
  ('Karachi Sovereign Node', 'Clifton Block 5', 'Karachi', 'Pakistan', '+92 21 3000 0002', 'karachi@shamimforever.com', '{"lat": 24.8260, "lng": 67.0187}'),
  ('Dubai Sovereign Node', 'DIFC, Gate Village', 'Dubai', 'UAE', '+971 4 300 0003', 'dubai@shamimforever.com', '{"lat": 25.2105, "lng": 55.2749}')
ON CONFLICT DO NOTHING;
`

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== 'shamim-seed-2025') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pool = getPool()
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    await client.query(SCHEMA_SQL)
    await client.query(CATEGORIES_SQL)
    await client.query(BOUTIQUES_SQL)

    const { rows: cats } = await client.query(
      "SELECT id, slug FROM main_categories WHERE slug IN ('perfume', 'cosmetics', 'jewelry')"
    )

    const perfumeId = cats.find((c: any) => c.slug === 'perfume')?.id
    const cosmeticsId = cats.find((c: any) => c.slug === 'cosmetics')?.id
    const jewelryId = cats.find((c: any) => c.slug === 'jewelry')?.id

    if (!perfumeId || !cosmeticsId || !jewelryId) {
      throw new Error('Category IDs not found after insert: ' + JSON.stringify(cats))
    }

    const products = [
      ['Oud Sovereign', 'oud-sovereign', 'A rare Assamese oud composition layered with saffron, ambergris, and sandalwood. The signature scent of sovereign authority.', 'Sourced from 40-year-old agarwood trees in the Assam forest reserve, this oud is one of the most precious materials in the world.', 85000, 299, 12, perfumeId, true],
      ['Heritage Noir', 'heritage-noir', 'A dark, smoky composition of oud, leather, and vetiver. For those who command presence without uttering a word.', 'Inspired by the ancient trade routes of the Silk Road, Heritage Noir blends Eastern oud with Western leather in an unprecedented union.', 65000, 229, 18, perfumeId, false],
      ['Imperial Musk', 'imperial-musk', 'White musk elevated to imperial luxury. Clean, luminous, and utterly timeless. A scent worn by those who need no introduction.', 'Drawing from the Pashtun tradition of musk wearing, Imperial Musk reimagines a centuries-old heritage for the modern sovereign.', 72000, 249, 20, perfumeId, true],
      ['Silk Road Amber', 'silk-road-amber', 'Golden amber, warm benzoin, and vanilla absolute. A fragrance that wraps like silk and lingers like legacy.', 'Amber has been treasured since antiquity. Ours is sourced from Baltic deposits and harmonized with the warm spices of the ancient trade routes.', 55000, 195, 25, perfumeId, false],
      ['Eternal Rose de Taif', 'eternal-rose-de-taif', "The world's most prized rose — the Taif — captured in its purest, most concentrated form. Royalty in a bottle.", 'Taif roses bloom for only three weeks each year in the mountains of Saudi Arabia. Each 50ml bottle contains the essence of over 400 roses.', 95000, 339, 8, perfumeId, true],
      ['Sovereign Lip Elixir', 'sovereign-lip-elixir', 'A lip treatment infused with 24-karat gold, rare rose hip oil, and diamond powder. Lips transformed, sovereignty expressed.', 'Formulated in our Lahore atelier, this elixir took 18 months of development to achieve the perfect balance of treatment and luxury.', 25000, 89, 35, cosmeticsId, false],
      ['Imperial Glow Serum', 'imperial-glow-serum', 'A potent 24-karat gold and vitamin C serum that illuminates from within. The foundation of the sovereign skincare ritual.', "Gold has been used in skincare since Cleopatra's reign. We've refined this ancient wisdom with modern bioactive technology.", 42000, 149, 22, cosmeticsId, true],
      ['Heritage Rose Face Cream', 'heritage-rose-face-cream', 'Our richest moisturizer, built on Taif rose water and Persian saffron extract. Skin sovereignty, achieved.', 'Inspired by the skincare rituals of Mughal empresses, this cream uses rose water distilled in our own atelier from Taif petals.', 38000, 135, 28, cosmeticsId, false],
      ['Silk Velvet Foundation', 'silk-velvet-foundation', 'A lightweight, long-wear foundation with silk proteins and SPF 30. 18 sovereignly curated shades for every complexion.', 'Three years in development. Tested across 500 skin types in Pakistan, UAE, and the UK. The result is flawless, sovereign skin.', 32000, 115, 40, cosmeticsId, false],
      ['Midnight Kohl Noir', 'midnight-kohl-noir', 'Artisanal kohl crafted from pure antimony stone, as it has been for 5,000 years. The original eye sovereign.', "Our kohl is sourced from the same antimony mines that supplied the royal courts of the Mughal Empire. Ground by hand. Charged with history.", 18000, 65, 50, cosmeticsId, true],
      ['Sovereign Gold Collar', 'sovereign-gold-collar', '22-karat gold collar necklace hand-crafted by our master goldsmiths. A statement of absolute sovereignty.', 'Inspired by the jewelry worn by the queens of the Indus Valley Civilization, this collar reimagines 5,000 years of jewelry-making tradition.', 485000, 1699, 3, jewelryId, true],
      ['Imperial Diamond Cuff', 'imperial-diamond-cuff', 'An 18-karat white gold cuff set with 2.8 carats of VS1 diamonds. Worn by those who make history.', 'Each diamond is individually selected from Botswana mines for color, clarity, and cut. The result is a piece that transcends generations.', 750000, 2649, 2, jewelryId, true],
      ['Heritage Pearl Drop Earrings', 'heritage-pearl-drop-earrings', 'South Sea pearl drops suspended from 22-karat gold. The timeless language of luxury, spoken fluently.', 'Our pearls are cultured over 5 years in the pristine waters of the Broome coast. Each pair is matched for luster, shape, and size.', 225000, 795, 6, jewelryId, false],
      ['Silk Road Emerald Ring', 'silk-road-emerald-ring', 'A 3.2-carat Colombian emerald set in 18-karat yellow gold with diamond pavé. Green as sovereignty, enduring as legacy.', "Emeralds were the preferred gemstone of Mughal emperors. Ours is sourced from the Muzo mines of Colombia — the world's finest.", 380000, 1349, 4, jewelryId, false],
      ['Eternal Rose Gold Bracelet', 'eternal-rose-gold-bracelet', 'An 18-karat rose gold bracelet with alternating rubies and diamonds. Love, power, and eternity bound in gold.', 'Rose gold first rose to prominence during the Romantic era. Our bracelet honors this history while declaring a new chapter of sovereign luxury.', 195000, 695, 5, jewelryId, false],
    ]

    let inserted = 0
    for (const [name, slug, description, story, price_pkr, price_usd, inventory, main_category_id, is_featured] of products) {
      await client.query(
        `INSERT INTO products (name, slug, description, story, price_pkr, price_usd, inventory, main_category_id, is_featured, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
         ON CONFLICT (slug) DO UPDATE SET
           name = EXCLUDED.name, description = EXCLUDED.description, story = EXCLUDED.story,
           price_pkr = EXCLUDED.price_pkr, price_usd = EXCLUDED.price_usd,
           inventory = EXCLUDED.inventory, main_category_id = EXCLUDED.main_category_id,
           is_featured = EXCLUDED.is_featured, updated_at = NOW()`,
        [name, slug, description, story, price_pkr, price_usd, inventory, main_category_id, is_featured]
      )
      inserted++
    }

    await client.query('COMMIT')

    return NextResponse.json({
      success: true,
      message: `Database setup complete. ${inserted} luxury products seeded.`,
      categories: cats.map((c: any) => c.slug),
      products: inserted,
    })
  } catch (err: any) {
    await client.query('ROLLBACK')
    return NextResponse.json({ error: err.message, stack: err.stack?.substring(0, 500) }, { status: 500 })
  } finally {
    client.release()
    await pool.end()
  }
}
