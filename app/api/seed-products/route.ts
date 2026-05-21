export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 60

import { NextRequest, NextResponse } from 'next/server'

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
`

const RLS_SQL = `
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE main_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE boutiques ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='collections' AND policyname='Public read collections') THEN
    CREATE POLICY "Public read collections" ON collections FOR SELECT USING (is_active = TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='main_categories' AND policyname='Public read categories') THEN
    CREATE POLICY "Public read categories" ON main_categories FOR SELECT USING (TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='products' AND policyname='Public read active products') THEN
    CREATE POLICY "Public read active products" ON products FOR SELECT USING (is_active = TRUE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='boutiques' AND policyname='Public read active boutiques') THEN
    CREATE POLICY "Public read active boutiques" ON boutiques FOR SELECT USING (is_active = TRUE);
  END IF;
END $$;
`

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== 'shamim-seed-2025') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let client: any = null
  let pool: any = null

  try {
    // Use pg with connection pooler URL (port 6543) for Vercel serverless
    const { Pool } = await import('pg')

    const dbUrl = process.env.DATABASE_URL || ''
    // Convert direct connection (5432) to pooler (6543) for serverless compatibility
    const poolerUrl = dbUrl
      .replace(':5432/', ':6543/')
      .replace('db.', '')
      .concat(dbUrl.includes('?') ? '&pgbouncer=true&connection_limit=1' : '?pgbouncer=true&connection_limit=1')

    pool = new Pool({
      connectionString: poolerUrl,
      ssl: { rejectUnauthorized: false },
      max: 1,
      connectionTimeoutMillis: 30000,
      idleTimeoutMillis: 10000,
    })

    client = await pool.connect()

    // Step 1: Create schema
    await client.query(SCHEMA_SQL)

    // Step 2: Enable RLS and policies
    try { await client.query(RLS_SQL) } catch (_) {}

    // Step 3: Insert categories
    await client.query(`
      INSERT INTO main_categories (name, slug, description)
      VALUES
        ('Perfume', 'perfume', 'High-end luxury fragrances crafted from the world''s rarest ingredients.'),
        ('Cosmetics', 'cosmetics', 'Bespoke beauty formulations for the sovereign individual.'),
        ('Jewelry', 'jewelry', 'Heirloom-quality pieces crafted from precious metals and gemstones.')
      ON CONFLICT (slug) DO NOTHING
    `)

    // Step 4: Insert boutiques
    await client.query(`
      INSERT INTO boutiques (name, address, city, country, phone, email, coordinates)
      VALUES
        ('Lahore Sovereign Node', 'DHA Phase VI, Sector C', 'Lahore', 'Pakistan', '+92 42 3000 0001', 'lahore@shamimforever.com', '{"lat": 31.4504, "lng": 74.3587}'),
        ('Karachi Sovereign Node', 'Clifton Block 5', 'Karachi', 'Pakistan', '+92 21 3000 0002', 'karachi@shamimforever.com', '{"lat": 24.8260, "lng": 67.0187}'),
        ('Dubai Sovereign Node', 'DIFC, Gate Village', 'Dubai', 'UAE', '+971 4 300 0003', 'dubai@shamimforever.com', '{"lat": 25.2105, "lng": 55.2749}')
      ON CONFLICT DO NOTHING
    `)

    // Step 5: Get category IDs
    const { rows: cats } = await client.query(
      "SELECT id, slug FROM main_categories WHERE slug IN ('perfume', 'cosmetics', 'jewelry')"
    )

    const perfumeId = cats.find((c: any) => c.slug === 'perfume')?.id
    const cosmeticsId = cats.find((c: any) => c.slug === 'cosmetics')?.id
    const jewelryId = cats.find((c: any) => c.slug === 'jewelry')?.id

    if (!perfumeId || !cosmeticsId || !jewelryId) {
      throw new Error('Missing category IDs: ' + JSON.stringify(cats))
    }

    // Step 6: Insert 15 luxury products
    const products = [
      { name: 'Oud Sovereign', slug: 'oud-sovereign', desc: 'A rare Assamese oud composition layered with saffron, ambergris, and sandalwood. The signature scent of sovereign authority.', story: 'Sourced from 40-year-old agarwood trees in the Assam forest reserve, this oud is one of the most precious materials in the world.', pkr: 85000, usd: 299, inv: 12, cat: perfumeId, featured: true },
      { name: 'Heritage Noir', slug: 'heritage-noir', desc: 'A dark, smoky composition of oud, leather, and vetiver. For those who command presence without uttering a word.', story: 'Inspired by the ancient trade routes of the Silk Road, Heritage Noir blends Eastern oud with Western leather in an unprecedented union.', pkr: 65000, usd: 229, inv: 18, cat: perfumeId, featured: false },
      { name: 'Imperial Musk', slug: 'imperial-musk', desc: 'White musk elevated to imperial luxury. Clean, luminous, and utterly timeless. A scent worn by those who need no introduction.', story: 'Drawing from the Pashtun tradition of musk wearing, Imperial Musk reimagines a centuries-old heritage for the modern sovereign.', pkr: 72000, usd: 249, inv: 20, cat: perfumeId, featured: true },
      { name: 'Silk Road Amber', slug: 'silk-road-amber', desc: 'Golden amber, warm benzoin, and vanilla absolute. A fragrance that wraps like silk and lingers like legacy.', story: 'Amber has been treasured since antiquity. Ours is sourced from Baltic deposits and harmonized with the warm spices of the ancient trade routes.', pkr: 55000, usd: 195, inv: 25, cat: perfumeId, featured: false },
      { name: 'Eternal Rose de Taif', slug: 'eternal-rose-de-taif', desc: "The world's most prized rose — the Taif — captured in its purest, most concentrated form. Royalty in a bottle.", story: 'Taif roses bloom for only three weeks each year in the mountains of Saudi Arabia. Each 50ml bottle contains the essence of over 400 roses.', pkr: 95000, usd: 339, inv: 8, cat: perfumeId, featured: true },
      { name: 'Sovereign Lip Elixir', slug: 'sovereign-lip-elixir', desc: 'A lip treatment infused with 24-karat gold, rare rose hip oil, and diamond powder. Lips transformed, sovereignty expressed.', story: 'Formulated in our Lahore atelier, this elixir took 18 months of development to achieve the perfect balance of treatment and luxury.', pkr: 25000, usd: 89, inv: 35, cat: cosmeticsId, featured: false },
      { name: 'Imperial Glow Serum', slug: 'imperial-glow-serum', desc: 'A potent 24-karat gold and vitamin C serum that illuminates from within. The foundation of the sovereign skincare ritual.', story: "Gold has been used in skincare since Cleopatra's reign. We've refined this ancient wisdom with modern bioactive technology.", pkr: 42000, usd: 149, inv: 22, cat: cosmeticsId, featured: true },
      { name: 'Heritage Rose Face Cream', slug: 'heritage-rose-face-cream', desc: 'Our richest moisturizer, built on Taif rose water and Persian saffron extract. Skin sovereignty, achieved.', story: 'Inspired by the skincare rituals of Mughal empresses, this cream uses rose water distilled in our own atelier from Taif petals.', pkr: 38000, usd: 135, inv: 28, cat: cosmeticsId, featured: false },
      { name: 'Silk Velvet Foundation', slug: 'silk-velvet-foundation', desc: 'A lightweight, long-wear foundation with silk proteins and SPF 30. 18 sovereignly curated shades for every complexion.', story: 'Three years in development. Tested across 500 skin types in Pakistan, UAE, and the UK. The result is flawless, sovereign skin.', pkr: 32000, usd: 115, inv: 40, cat: cosmeticsId, featured: false },
      { name: 'Midnight Kohl Noir', slug: 'midnight-kohl-noir', desc: 'Artisanal kohl crafted from pure antimony stone, as it has been for 5,000 years. The original eye sovereign.', story: "Our kohl is sourced from the same antimony mines that supplied the royal courts of the Mughal Empire. Ground by hand. Charged with history.", pkr: 18000, usd: 65, inv: 50, cat: cosmeticsId, featured: true },
      { name: 'Sovereign Gold Collar', slug: 'sovereign-gold-collar', desc: '22-karat gold collar necklace hand-crafted by our master goldsmiths. A statement of absolute sovereignty.', story: 'Inspired by the jewelry worn by the queens of the Indus Valley Civilization, this collar reimagines 5,000 years of jewelry-making tradition.', pkr: 485000, usd: 1699, inv: 3, cat: jewelryId, featured: true },
      { name: 'Imperial Diamond Cuff', slug: 'imperial-diamond-cuff', desc: 'An 18-karat white gold cuff set with 2.8 carats of VS1 diamonds. Worn by those who make history.', story: 'Each diamond is individually selected from Botswana mines for color, clarity, and cut. The result is a piece that transcends generations.', pkr: 750000, usd: 2649, inv: 2, cat: jewelryId, featured: true },
      { name: 'Heritage Pearl Drop Earrings', slug: 'heritage-pearl-drop-earrings', desc: 'South Sea pearl drops suspended from 22-karat gold. The timeless language of luxury, spoken fluently.', story: 'Our pearls are cultured over 5 years in the pristine waters of the Broome coast. Each pair is matched for luster, shape, and size.', pkr: 225000, usd: 795, inv: 6, cat: jewelryId, featured: false },
      { name: 'Silk Road Emerald Ring', slug: 'silk-road-emerald-ring', desc: 'A 3.2-carat Colombian emerald set in 18-karat yellow gold with diamond pavé. Green as sovereignty, enduring as legacy.', story: "Emeralds were the preferred gemstone of Mughal emperors. Ours is sourced from the Muzo mines of Colombia — the world's finest.", pkr: 380000, usd: 1349, inv: 4, cat: jewelryId, featured: false },
      { name: 'Eternal Rose Gold Bracelet', slug: 'eternal-rose-gold-bracelet', desc: 'An 18-karat rose gold bracelet with alternating rubies and diamonds. Love, power, and eternity bound in gold.', story: 'Rose gold first rose to prominence during the Romantic era. Our bracelet honors this history while declaring a new chapter of sovereign luxury.', pkr: 195000, usd: 695, inv: 5, cat: jewelryId, featured: false },
    ]

    let inserted = 0
    for (const p of products) {
      await client.query(
        `INSERT INTO products (name, slug, description, story, price_pkr, price_usd, inventory, main_category_id, is_featured, is_active)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true)
         ON CONFLICT (slug) DO UPDATE SET
           name=EXCLUDED.name, description=EXCLUDED.description, story=EXCLUDED.story,
           price_pkr=EXCLUDED.price_pkr, price_usd=EXCLUDED.price_usd,
           inventory=EXCLUDED.inventory, main_category_id=EXCLUDED.main_category_id,
           is_featured=EXCLUDED.is_featured, updated_at=NOW()`,
        [p.name, p.slug, p.desc, p.story, p.pkr, p.usd, p.inv, p.cat, p.featured]
      )
      inserted++
    }

    return NextResponse.json({
      success: true,
      message: `Shamim Forever database seeded successfully.`,
      categories: 3,
      products: inserted,
      breakdown: { perfume: 5, cosmetics: 5, jewelry: 5 },
    })
  } catch (err: any) {
    return NextResponse.json({
      error: err.message,
      code: err.code,
      detail: err.detail,
      hint: err.hint,
    }, { status: 500 })
  } finally {
    try { client?.release() } catch (_) {}
    try { await pool?.end() } catch (_) {}
  }
}
