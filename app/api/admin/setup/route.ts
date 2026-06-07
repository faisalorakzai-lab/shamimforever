import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'pg'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  })

  try {
    await client.connect()

    // Create tables
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    await client.query(`
      CREATE TABLE IF NOT EXISTS collections (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        subtitle TEXT,
        tagline TEXT,
        cover_image TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS main_categories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        image TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
        main_category_id UUID REFERENCES main_categories(id) ON DELETE SET NULL,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        subtitle TEXT,
        description TEXT,
        story TEXT,
        classification TEXT,
        notes TEXT[],
        why_curated TEXT,
        positioning TEXT,
        allocation_code TEXT,
        price_pkr NUMERIC(12,2) NOT NULL DEFAULT 0,
        price_usd NUMERIC(10,2) NOT NULL DEFAULT 0,
        volume TEXT,
        inventory INTEGER NOT NULL DEFAULT 100,
        images TEXT[] DEFAULT '{}',
        is_featured BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        status TEXT NOT NULL DEFAULT 'pending',
        payment_method TEXT DEFAULT 'pkr',
        total_pkr NUMERIC(12,2) DEFAULT 0,
        total_usd NUMERIC(10,2) DEFAULT 0,
        shipping_address JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
        product_id UUID REFERENCES products(id) ON DELETE SET NULL,
        quantity INTEGER DEFAULT 1,
        price_usd NUMERIC(10,2) DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    // Enable RLS with open policies (service role bypasses RLS anyway)
    for (const t of ['collections','main_categories','products','orders','order_items']) {
      await client.query(`ALTER TABLE ${t} ENABLE ROW LEVEL SECURITY`).catch(() => {})
      await client.query(`DROP POLICY IF EXISTS "all_access_${t}" ON ${t}`).catch(() => {})
      await client.query(`CREATE POLICY "all_access_${t}" ON ${t} FOR ALL USING (TRUE) WITH CHECK (TRUE)`).catch(() => {})
    }

    // Insert "SF Essential Archive For Him" collection
    const BASE = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'https://shamimforever-api-server.vercel.app'

    const collRes = await client.query(`
      INSERT INTO collections (name, slug, description, subtitle, tagline, is_active)
      VALUES ($1, $2, $3, $4, $5, TRUE)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        subtitle = EXCLUDED.subtitle,
        tagline = EXCLUDED.tagline
      RETURNING id
    `, [
      'SF Essential Archive For Him',
      'sf-essential-archive-for-him',
      'The Foundational Collection — Luxury Discovery Allocations. Globally respected masculine fragrances selected by the House of Shamim Forever as foundational allocations for modern leaders, entrepreneurs, executives, and collectors.',
      'The Foundational Collection',
      'For every empire that reaches the summit, there was once a foundation carefully built beneath it.'
    ])

    const collectionId = collRes.rows[0].id

    // 10 products
    const products = [
      {
        name: 'Bleu de Chanel',
        slug: 'bleu-de-chanel',
        subtitle: 'The Executive Archive',
        allocation_code: 'E-I',
        price_usd: 129,
        volume: '50ML EDT',
        classification: 'Luxury Fresh Woody Signature',
        notes: ['Grapefruit', 'Mint', 'Ginger', 'Incense', 'Cedarwood'],
        why_curated: 'Few fragrances have influenced modern masculine luxury more than Bleu de Chanel. Its balance of freshness, sophistication, and executive presence has made it a universal benchmark.',
        positioning: 'Corporate luxury. Executive authority. A modern leadership standard.',
        description: 'Essential Masculine Allocation — E-I. The Executive Archive.',
        image: '/images/products/bleu-de-chanel.png'
      },
      {
        name: 'Dior Sauvage',
        slug: 'dior-sauvage',
        subtitle: 'The Frontier Archive',
        allocation_code: 'E-II',
        price_usd: 129,
        volume: '60ML EDT',
        classification: 'Fresh Aromatic Powerhouse',
        notes: ['Calabrian Bergamot', 'Pepper', 'Ambroxan'],
        why_curated: 'Sauvage transformed contemporary masculine perfumery through its explosive freshness and unmistakable projection.',
        positioning: 'Raw confidence. Modern influence. A global masculine icon.',
        description: 'Essential Masculine Allocation — E-II. The Frontier Archive.',
        image: '/images/products/dior-sauvage.png'
      },
      {
        name: 'Acqua di Giò Pour Homme',
        slug: 'acqua-di-gio-pour-homme',
        subtitle: 'The Oceanic Archive',
        allocation_code: 'E-III',
        price_usd: 119,
        volume: '50ML EDT',
        classification: 'Marine Citrus Classic',
        notes: ['Sea Notes', 'Bergamot', 'Jasmine', 'Rosemary', 'Cedarwood'],
        why_curated: 'One of the most recognizable fresh fragrances ever created. It captures clarity, calmness, and effortless sophistication.',
        positioning: 'Mediterranean elegance. Timeless freshness. Pure refinement.',
        description: 'Essential Masculine Allocation — E-III. The Oceanic Archive.',
        image: '/images/products/acqua-di-gio.png'
      },
      {
        name: 'YSL La Nuit de L\'Homme',
        slug: 'ysl-la-nuit-de-lhomme',
        subtitle: 'The Midnight Archive',
        allocation_code: 'E-IV',
        price_usd: 125,
        volume: '60ML EDT',
        classification: 'Spicy Evening Signature',
        notes: ['Cardamom', 'Lavender', 'Virginia Cedar', 'Coumarin'],
        why_curated: 'La Nuit de L\'Homme remains one of the most respected evening fragrances in modern luxury. Its smooth cardamom signature has become legendary.',
        positioning: 'Sophisticated mystery. Nighttime authority. Refined charisma.',
        description: 'Essential Masculine Allocation — E-IV. The Midnight Archive.',
        image: '/images/products/ysl-la-nuit.png'
      },
      {
        name: 'Versace Eros',
        slug: 'versace-eros',
        subtitle: 'The Conquest Archive',
        allocation_code: 'E-V',
        price_usd: 129,
        volume: '50ML EDP',
        classification: 'Fresh Amber Power Fragrance',
        notes: ['Mint', 'Italian Lemon', 'Green Apple', 'Tonka Bean', 'Amber'],
        why_curated: 'Eros represents ambition, energy, and unapologetic confidence. Its bold structure creates an unmistakable presence.',
        positioning: 'Passion. Power. Modern conquest.',
        description: 'Essential Masculine Allocation — E-V. The Conquest Archive.',
        image: '/images/products/versace-eros.png'
      },
      {
        name: 'Terre d\'Hermès',
        slug: 'terre-dhermes',
        subtitle: 'The Earth Archive',
        allocation_code: 'E-VI',
        price_usd: 135,
        volume: '50ML EDT',
        classification: 'Mineral Woody Luxury',
        notes: ['Orange', 'Flint', 'Vetiver', 'Cedarwood', 'Benzoin'],
        why_curated: 'Terre d\'Hermès remains one of the most sophisticated woody fragrances ever created. It reflects discipline, structure, and maturity.',
        positioning: 'Grounded authority. Quiet confidence. Intellectual luxury.',
        description: 'Essential Masculine Allocation — E-VI. The Earth Archive.',
        image: '/images/products/terre-dhermes.png'
      },
      {
        name: 'Tom Ford Noir Anthracite',
        slug: 'tom-ford-noir-anthracite',
        subtitle: 'The Shadow Archive',
        allocation_code: 'E-VII',
        price_usd: 125,
        volume: '30ML Travel Allocation',
        classification: 'Dark Woody Spice',
        notes: ['Sichuan Pepper', 'Ginger', 'Galbanum', 'Cedarwood', 'Ebony'],
        why_curated: 'Dark, architectural, and uncompromising. Noir Anthracite represents power concealed behind discipline.',
        positioning: 'The scent of strategic silence.',
        description: 'Essential Masculine Allocation — E-VII. The Shadow Archive.',
        image: '/images/products/tom-ford-noir.png'
      },
      {
        name: 'Prada L\'Homme',
        slug: 'prada-lhomme',
        subtitle: 'The Precision Archive',
        allocation_code: 'E-VIII',
        price_usd: 125,
        volume: '50ML EDT',
        classification: 'Luxury Clean Iris',
        notes: ['Iris', 'Amber', 'Neroli', 'Geranium', 'Patchouli'],
        why_curated: 'Prada L\'Homme exemplifies modern professionalism through immaculate cleanliness and structure.',
        positioning: 'Professional perfection. Corporate sophistication. Everyday prestige.',
        description: 'Essential Masculine Allocation — E-VIII. The Precision Archive.',
        image: '/images/products/prada-lhomme.png'
      },
      {
        name: 'Jean Paul Gaultier Le Male Le Parfum',
        slug: 'jpg-le-male-le-parfum',
        subtitle: 'The Captain\'s Archive',
        allocation_code: 'E-IX',
        price_usd: 129,
        volume: '75ML EDP',
        classification: 'Oriental Amber Signature',
        notes: ['Cardamom', 'Lavender', 'Iris', 'Vanilla', 'Oriental Woods'],
        why_curated: 'A modern evolution of a legendary masculine lineage. Dense, smooth, and remarkably refined.',
        positioning: 'Command presence. Timeless masculinity. Modern aristocracy.',
        description: 'Essential Masculine Allocation — E-IX. The Captain\'s Archive.',
        image: '/images/products/jpg-le-male.png'
      },
      {
        name: 'Giorgio Armani Code',
        slug: 'giorgio-armani-code',
        subtitle: 'The Enigma Archive',
        allocation_code: 'E-X',
        price_usd: 119,
        volume: '50ML EDT',
        classification: 'Elegant Amber Aromatic',
        notes: ['Green Mandarin', 'Lavender', 'Tonka Bean', 'Cedarwood'],
        why_curated: 'Armani Code remains one of the most respected evening signatures in luxury fragrance history. Its elegance has survived generations of trends.',
        positioning: 'Structured mystery. Quiet power. Enduring sophistication.',
        description: 'Essential Masculine Allocation — E-X. The Enigma Archive.',
        image: null
      }
    ]

    let inserted = 0
    for (const p of products) {
      const images = p.image ? [p.image] : []
      const priceUsd = p.price_usd
      // Convert USD to PKR (approx 278 PKR per USD)
      const pricePkr = Math.round(priceUsd * 278)

      await client.query(`
        INSERT INTO products (
          collection_id, name, slug, subtitle, description, story,
          classification, notes, why_curated, positioning, allocation_code,
          price_usd, price_pkr, volume, images, is_featured, is_active, inventory
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,TRUE,100)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          subtitle = EXCLUDED.subtitle,
          description = EXCLUDED.description,
          classification = EXCLUDED.classification,
          notes = EXCLUDED.notes,
          why_curated = EXCLUDED.why_curated,
          positioning = EXCLUDED.positioning,
          price_usd = EXCLUDED.price_usd,
          price_pkr = EXCLUDED.price_pkr,
          volume = EXCLUDED.volume,
          images = EXCLUDED.images,
          allocation_code = EXCLUDED.allocation_code,
          collection_id = EXCLUDED.collection_id
      `, [
        collectionId,
        p.name, p.slug, p.subtitle, p.description,
        `${p.why_curated} ${p.positioning}`,
        p.classification, p.notes, p.why_curated, p.positioning, p.allocation_code,
        priceUsd, pricePkr, p.volume, images, p.allocation_code === 'E-I'
      ])
      inserted++
    }

    await client.end()

    return NextResponse.json({
      success: true,
      collection_id: collectionId,
      products_inserted: inserted,
      message: `SF Essential Archive For Him created with ${inserted} products`
    })
  } catch (err: any) {
    await client.end().catch(() => {})
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
