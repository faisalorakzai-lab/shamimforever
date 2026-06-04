import { NextRequest, NextResponse } from 'next/server'
  import { createClient } from '@supabase/supabase-js'

  export const dynamic = 'force-dynamic'
  export const maxDuration = 60

  function db() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )
  }

  export async function GET(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret')
    if (secret !== 'unisex-guest-curation-2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = db()

    const { data: cats } = await supabase.from('main_categories').select('id, slug')
    const perfumeId = cats?.find(c => c.slug === 'perfume')?.id
    if (!perfumeId) return NextResponse.json({ error: 'Perfume category not found' }, { status: 400 })

    const { data: subs } = await supabase.from('sub_categories').select('id, name, slug')
    const unisexId = subs?.find(s => s.name?.toLowerCase().includes('unisex') || s.slug?.includes('unisex'))?.id
    if (!unisexId) return NextResponse.json({ error: 'Unisex sub-category not found' }, { status: 400 })

    const products = [
      {
        name: 'BYREDO GYPSY WATER',
        slug: 'byredo-gypsy-water',
        description: "Gypsy Water represents artistic independence without boundaries. Fresh juniper opening, smoky incense heart, smooth sandalwood foundation. The Sovereign Freedom Archive.",
        price_pkr: 68500, price_usd: 245, inventory: 10, is_featured: true, is_active: true,
        images: ['/guest-curation/unisex/byredo-gypsy-water.jpg'],
      },
      {
        name: 'LE LABO SANTAL 33',
        slug: 'le-labo-santal-33',
        description: "Santal 33 became a global benchmark because it refuses imitation. Dry sandalwood, leathery structure, architectural simplicity. Identity over imitation. The Identity Archive.",
        price_pkr: 107500, price_usd: 385, inventory: 10, is_featured: true, is_active: true,
        images: ['/guest-curation/unisex/le-labo-santal-33.jpg'],
      },
      {
        name: 'CREED SILVER MOUNTAIN WATER',
        slug: 'creed-silver-mountain-water',
        description: "Silver Mountain Water represents luxury clarity. Green tea freshness, metallic musk signature, alpine purity. One of the most refined fresh compositions ever produced. The Crystal Summit Archive.",
        price_pkr: 157900, price_usd: 565, inventory: 10, is_featured: true, is_active: true,
        images: ['/guest-curation/unisex/creed-silver-mountain-water.jpg'],
      },
      {
        name: 'DIPTYQUE PHILOSYKOS',
        slug: 'diptyque-philosykos',
        description: "Philosykos preserves nature with remarkable authenticity. Every spray feels like walking beneath a Mediterranean fig tree. True luxury often begins with simplicity. The Mediterranean Archive.",
        price_pkr: 79700, price_usd: 285, inventory: 10, is_featured: true, is_active: true,
        images: ['/guest-curation/unisex/diptyque-philosykos.jpg'],
      },
      {
        name: 'TOM FORD SOLEIL BLANC',
        slug: 'tom-ford-soleil-blanc',
        description: "Soleil Blanc transforms sunlight into luxury. Creamy. Warm. Sophisticated. A private resort preserved as a fragrance. The Private Island Archive.",
        price_pkr: 99300, price_usd: 355, inventory: 10, is_featured: true, is_active: true,
        images: ['/guest-curation/unisex/tom-ford-soleil-blanc.jpg'],
      },
      {
        name: 'NISHANE HACIVAT',
        slug: 'nishane-hacivat',
        description: "Hacivat represents permanence. Extraordinary concentration, powerful longevity, oakmoss authority. One of modern niche perfumery's strongest signatures. The Legacy Archive.",
        price_pkr: 102100, price_usd: 365, inventory: 10, is_featured: true, is_active: true,
        images: ['/guest-curation/unisex/nishane-hacivat.jpg'],
      },
      {
        name: 'PARFUMS DE MARLY HALTANE',
        slug: 'parfums-de-marly-haltane',
        description: "Haltane balances strength and elegance. Natural oud meets modern sophistication. Authority meets refinement. Prestige should never feel forced. The Prestige Archive.",
        price_pkr: 118900, price_usd: 425, inventory: 10, is_featured: true, is_active: true,
        images: ['/guest-curation/unisex/parfums-de-marly-haltane.jpg'],
      },
      {
        name: 'FREDERIC MALLE PORTRAIT OF A LADY',
        slug: 'frederic-malle-portrait-of-a-lady',
        description: "Portrait of a Lady is not merely fragrance. It is olfactory art. Extraordinary rose concentration, dark incense structure, unmatched depth. One of perfumery's greatest achievements. The Imperial Rose Archive.",
        price_pkr: 132900, price_usd: 475, inventory: 10, is_featured: true, is_active: true,
        images: ['/guest-curation/unisex/frederic-malle-portrait-of-a-lady.jpg'],
      },
      {
        name: 'SERGE LUTENS AMBRE SULTAN',
        slug: 'serge-lutens-ambre-sultan',
        description: "Ambre Sultan respects raw materials. Dry amber structure, herbal complexity, timeless warmth. The spirit of historical perfumery preserved. The Golden Resin Archive.",
        price_pkr: 58700, price_usd: 210, inventory: 10, is_featured: true, is_active: true,
        images: ['/guest-curation/unisex/serge-lutens-ambre-sultan.jpg'],
      },
      {
        name: 'JO MALONE WOOD SAGE & SEA SALT',
        slug: 'jo-malone-wood-sage-sea-salt',
        description: "Wood Sage & Sea Salt demonstrates restraint. Clean. Balanced. Effortlessly sophisticated. True luxury does not require excess. The Oceanic Archive.",
        price_pkr: 60100, price_usd: 215, inventory: 10, is_featured: true, is_active: true,
        images: ['/guest-curation/unisex/jo-malone-wood-sage-sea-salt.jpg'],
      },
    ]

    const results: { name: string; slug: string; status: string; error?: string }[] = []

    for (const product of products) {
      const { data: existing } = await supabase.from('products').select('id').eq('slug', product.slug).single()

      if (existing?.id) {
        const { error } = await supabase.from('products').update({
          name: product.name,
          description: product.description,
          price_pkr: product.price_pkr,
          price_usd: product.price_usd,
          images: product.images,
          is_featured: product.is_featured,
          is_active: product.is_active,
          main_category_id: perfumeId,
          sub_category_id: unisexId,
        }).eq('id', existing.id)
        results.push({ name: product.name, slug: product.slug, status: error ? 'update_error' : 'updated', ...(error ? { error: error.message } : {}) })
      } else {
        const { error } = await supabase.from('products').insert({ ...product, main_category_id: perfumeId, sub_category_id: unisexId })
        results.push({ name: product.name, slug: product.slug, status: error ? 'insert_error' : 'created', ...(error ? { error: error.message } : {}) })
      }
    }

    return NextResponse.json({ results, updated_at: new Date().toISOString() })
  }
  