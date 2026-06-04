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
        description: 'Gypsy Water represents artistic independence without boundaries. Fresh juniper opening, smoky incense heart, smooth sandalwood foundation — a fragrance that feels weightless yet memorable. The Sovereign Freedom Archive.',
        price_pkr: 68500,
        price_usd: 245,
        inventory: 10,
        is_featured: true,
        is_active: true,
        images: ['/guest-curation/unisex/byredo-gypsy-water.jpg'],
        story: JSON.stringify({
          collectionName: 'The Sovereign Freedom Archive',
          archiveLabel: 'Curated Unisex Allocation — Archive U-I',
          classification: 'Luxury Woody Aromatic Unisex Signature',
          size: '50ML',
          globalRetailUsd: 245,
          signatureNotes: ['Juniper', 'Lemon', 'Bergamot', 'Pine Needles', 'Incense', 'Sandalwood', 'Vanilla'],
          whyCurated: ['Gypsy Water represents artistic independence without boundaries.', 'Its fresh juniper opening.', 'Its smoky incense heart.', 'Its smooth sandalwood foundation.', 'Together create a fragrance that feels weightless yet memorable.', 'The House selected Gypsy Water because it captures freedom in its most refined form.'],
          curatorPositioning: ['Not a destination.', 'A journey.', 'A luxury escape preserved in glass.'],
          type: 'guest-curation-unisex',
        }),
      },
      {
        name: 'LE LABO SANTAL 33',
        slug: 'le-labo-santal-33',
        description: 'Santal 33 became a global benchmark because it refuses imitation. Dry sandalwood, leathery structure, architectural simplicity. The House philosophy: Identity over imitation. The Identity Archive.',
        price_pkr: 107500,
        price_usd: 385,
        inventory: 10,
        is_featured: true,
        is_active: true,
        images: ['/guest-curation/unisex/le-labo-santal-33.jpg'],
        story: JSON.stringify({
          collectionName: 'The Identity Archive',
          archiveLabel: 'Curated Unisex Allocation — Archive U-II',
          classification: 'Luxury Smoky Sandalwood Icon',
          size: '100ML',
          globalRetailUsd: 385,
          signatureNotes: ['Cardamom', 'Iris', 'Violet', 'Ambrox', 'Sandalwood', 'Papyrus', 'Cedarwood'],
          whyCurated: ['Santal 33 became a global benchmark because it refuses imitation.', 'Its dry sandalwood.', 'Its leathery structure.', 'Its architectural simplicity.', 'Reflect the House philosophy:', 'Identity over imitation.'],
          curatorPositioning: ['A cultural icon.', 'A global reference point.', 'A monument of individuality.'],
          type: 'guest-curation-unisex',
        }),
      },
      {
        name: 'CREED SILVER MOUNTAIN WATER',
        slug: 'creed-silver-mountain-water',
        description: 'Silver Mountain Water represents luxury clarity. Green tea freshness, metallic musk signature, alpine purity. One of the most refined fresh compositions ever produced. The Crystal Summit Archive.',
        price_pkr: 157900,
        price_usd: 565,
        inventory: 10,
        is_featured: true,
        is_active: true,
        images: ['/guest-curation/unisex/creed-silver-mountain-water.jpg'],
        story: JSON.stringify({
          collectionName: 'The Crystal Summit Archive',
          archiveLabel: 'Curated Unisex Allocation — Archive U-III',
          classification: 'Luxury Alpine Fresh Masterpiece',
          size: '100ML',
          globalRetailUsd: 565,
          signatureNotes: ['Bergamot', 'Mandarin', 'Green Tea', 'Blackcurrant', 'Musk', 'Petitgrain', 'Sandalwood'],
          whyCurated: ['Silver Mountain Water represents luxury clarity.', 'Its green tea freshness.', 'Its metallic musk signature.', 'Its alpine purity.', 'Create one of the most refined fresh compositions ever produced.'],
          curatorPositioning: ['Mountain air.', 'Crystal water.', 'Liquid precision.'],
          type: 'guest-curation-unisex',
        }),
      },
      {
        name: 'DIPTYQUE PHILOSYKOS',
        slug: 'diptyque-philosykos',
        description: 'Philosykos preserves nature with remarkable authenticity. Every spray feels like walking beneath a Mediterranean fig tree. True luxury often begins with simplicity. The Mediterranean Archive.',
        price_pkr: 79700,
        price_usd: 285,
        inventory: 10,
        is_featured: true,
        is_active: true,
        images: ['/guest-curation/unisex/diptyque-philosykos.jpg'],
        story: JSON.stringify({
          collectionName: 'The Mediterranean Archive',
          archiveLabel: 'Curated Unisex Allocation — Archive U-IV',
          classification: 'Luxury Fig Tree Masterpiece',
          size: '75ML',
          globalRetailUsd: 285,
          signatureNotes: ['Fig Leaf', 'Fig Fruit', 'Coconut', 'Green Notes', 'Cedar', 'Fig Tree Wood'],
          whyCurated: ['Philosykos preserves nature with remarkable authenticity.', 'Every spray feels like walking beneath a Mediterranean fig tree.', 'The House selected it because true luxury often begins with simplicity.'],
          curatorPositioning: ['Nature refined.', 'Green luxury.', 'Mediterranean permanence.'],
          type: 'guest-curation-unisex',
        }),
      },
      {
        name: 'TOM FORD SOLEIL BLANC',
        slug: 'tom-ford-soleil-blanc',
        description: 'Soleil Blanc transforms sunlight into luxury. Creamy. Warm. Sophisticated. A private resort preserved as a fragrance. Sunlit opulence, endless summer, resort-level luxury. The Private Island Archive.',
        price_pkr: 99300,
        price_usd: 355,
        inventory: 10,
        is_featured: true,
        is_active: true,
        images: ['/guest-curation/unisex/tom-ford-soleil-blanc.jpg'],
        story: JSON.stringify({
          collectionName: 'The Private Island Archive',
          archiveLabel: 'Curated Unisex Allocation — Archive U-V',
          classification: 'Luxury Solar Floral Masterpiece',
          size: '100ML',
          globalRetailUsd: 355,
          signatureNotes: ['Coconut', 'Ylang-Ylang', 'Bergamot', 'Cardamom', 'Pistachio', 'Amber', 'Tuberose'],
          whyCurated: ['Soleil Blanc transforms sunlight into luxury.', 'Creamy.', 'Warm.', 'Sophisticated.', 'A private resort preserved as a fragrance.'],
          curatorPositioning: ['Sunlit opulence.', 'Endless summer.', 'Resort-level luxury.'],
          type: 'guest-curation-unisex',
        }),
      },
      {
        name: 'NISHANE HACIVAT',
        slug: 'nishane-hacivat',
        description: 'Hacivat represents permanence. Extraordinary concentration, powerful longevity, oakmoss authority. One of modern niche perfumery's strongest signatures. The Legacy Archive.',
        price_pkr: 102100,
        price_usd: 365,
        inventory: 10,
        is_featured: true,
        is_active: true,
        images: ['/guest-curation/unisex/nishane-hacivat.jpg'],
        story: JSON.stringify({
          collectionName: 'The Legacy Archive',
          archiveLabel: 'Curated Unisex Allocation — Archive U-VI',
          classification: 'Extrait de Parfum Luxury Signature',
          size: '100ML',
          globalRetailUsd: 365,
          signatureNotes: ['Pineapple', 'Grapefruit', 'Bergamot', 'Oakmoss', 'Patchouli', 'Timberwood'],
          whyCurated: ["Hacivat represents permanence.", "Its extraordinary concentration.", "Its powerful longevity.", "Its oakmoss authority.", "Make it one of modern niche perfumery's strongest signatures."],
          curatorPositioning: ['Legacy over speed.', 'Power over trends.', 'A signature that refuses to fade.'],
          type: 'guest-curation-unisex',
        }),
      },
      {
        name: 'PARFUMS DE MARLY HALTANE',
        slug: 'parfums-de-marly-haltane',
        description: 'Haltane balances strength and elegance. Natural oud meets modern sophistication. Authority meets refinement. Prestige should never feel forced. The Prestige Archive.',
        price_pkr: 118900,
        price_usd: 425,
        inventory: 10,
        is_featured: true,
        is_active: true,
        images: ['/guest-curation/unisex/parfums-de-marly-haltane.jpg'],
        story: JSON.stringify({
          collectionName: 'The Prestige Archive',
          archiveLabel: 'Curated Unisex Allocation — Archive U-VII',
          classification: 'Luxury Oud Prestige Signature',
          size: '125ML',
          globalRetailUsd: 425,
          signatureNotes: ['Clary Sage', 'Lavender', 'Bergamot', 'Saffron', 'Praline', 'Oud Wood', 'Cedarwood'],
          whyCurated: ['Haltane balances strength and elegance.', 'Natural oud meets modern sophistication.', 'Authority meets refinement.', 'The House selected it because prestige should never feel forced.'],
          curatorPositioning: ['Modern aristocracy.', 'Velvet authority.', 'Prestige engineered to perfection.'],
          type: 'guest-curation-unisex',
        }),
      },
      {
        name: 'FREDERIC MALLE PORTRAIT OF A LADY',
        slug: 'frederic-malle-portrait-of-a-lady',
        description: 'Portrait of a Lady is not merely fragrance — it is olfactory art. Extraordinary rose concentration, dark incense structure, unmatched depth. One of perfumery's greatest achievements. The Imperial Rose Archive.',
        price_pkr: 132900,
        price_usd: 475,
        inventory: 10,
        is_featured: true,
        is_active: true,
        images: ['/guest-curation/unisex/frederic-malle-portrait-of-a-lady.jpg'],
        story: JSON.stringify({
          collectionName: 'The Imperial Rose Archive',
          archiveLabel: 'Curated Unisex Allocation — Archive U-VIII',
          classification: 'Luxury Artistic Rose Masterpiece',
          size: '100ML',
          globalRetailUsd: 475,
          signatureNotes: ['Rose', 'Patchouli', 'Clove', 'Cinnamon', 'Incense', 'Amber', 'Sandalwood'],
          whyCurated: ["Portrait of a Lady is not merely fragrance.", "It is olfactory art.", "Its extraordinary rose concentration.", "Its dark incense structure.", "Its unmatched depth.", "Make it one of perfumery's greatest achievements."],
          curatorPositioning: ['A masterpiece.', 'A gallery piece.', 'A sovereign rose monument.'],
          type: 'guest-curation-unisex',
        }),
      },
      {
        name: 'SERGE LUTENS AMBRE SULTAN',
        slug: 'serge-lutens-ambre-sultan',
        description: 'Ambre Sultan respects raw materials. Dry amber structure, herbal complexity, timeless warmth. The spirit of historical perfumery preserved. The Golden Resin Archive.',
        price_pkr: 58700,
        price_usd: 210,
        inventory: 10,
        is_featured: true,
        is_active: true,
        images: ['/guest-curation/unisex/serge-lutens-ambre-sultan.jpg'],
        story: JSON.stringify({
          collectionName: 'The Golden Resin Archive',
          archiveLabel: 'Curated Unisex Allocation — Archive U-IX',
          classification: 'Luxury Amber Resin Signature',
          size: '50ML',
          globalRetailUsd: 210,
          signatureNotes: ['Amber', 'Bay Leaf', 'Coriander', 'Oregano', 'Patchouli', 'Myrrh', 'Vanilla Resin'],
          whyCurated: ['Ambre Sultan respects raw materials.', 'Its dry amber structure.', 'Its herbal complexity.', 'Its timeless warmth.', 'Reflect the spirit of historical perfumery.'],
          curatorPositioning: ['Ancient amber.', 'Modern elegance.', 'A preserved golden treasure.'],
          type: 'guest-curation-unisex',
        }),
      },
      {
        name: 'JO MALONE WOOD SAGE & SEA SALT',
        slug: 'jo-malone-wood-sage-sea-salt',
        description: 'Wood Sage & Sea Salt demonstrates restraint. Clean. Balanced. Effortlessly sophisticated. True luxury does not require excess. The Oceanic Archive.',
        price_pkr: 60100,
        price_usd: 215,
        inventory: 10,
        is_featured: true,
        is_active: true,
        images: ['/guest-curation/unisex/jo-malone-wood-sage-sea-salt.jpg'],
        story: JSON.stringify({
          collectionName: 'The Oceanic Archive',
          archiveLabel: 'Curated Unisex Allocation — Archive U-X',
          classification: 'Luxury Mineral Aquatic Signature',
          size: '100ML',
          globalRetailUsd: 215,
          signatureNotes: ['Ambrette Seeds', 'Sea Salt', 'Sage', 'Red Algae', 'Grapefruit'],
          whyCurated: ['Wood Sage & Sea Salt demonstrates restraint.', 'Clean.', 'Balanced.', 'Effortlessly sophisticated.', 'The House selected it because true luxury does not require excess.'],
          curatorPositioning: ['Ocean air.', 'Coastal freedom.', 'Minimalist luxury perfected.'],
          type: 'guest-curation-unisex',
        }),
      },
    ]

    const results: { name: string; slug: string; status: string; error?: string }[] = []

    for (const product of products) {
      // Check if product already exists
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('slug', product.slug)
        .single()

      if (existing?.id) {
        // Update existing
        const { error } = await supabase
          .from('products')
          .update({
            name: product.name,
            description: product.description,
            price_pkr: product.price_pkr,
            price_usd: product.price_usd,
            images: product.images,
            story: product.story,
            is_featured: product.is_featured,
            is_active: product.is_active,
            main_category_id: perfumeId,
            sub_category_id: unisexId,
          })
          .eq('id', existing.id)

        results.push({ name: product.name, slug: product.slug, status: error ? 'update_error' : 'updated', ...(error ? { error: error.message } : {}) })
      } else {
        // Insert new
        const { error } = await supabase.from('products').insert({
          ...product,
          main_category_id: perfumeId,
          sub_category_id: unisexId,
        })

        results.push({ name: product.name, slug: product.slug, status: error ? 'insert_error' : 'created', ...(error ? { error: error.message } : {}) })
      }
    }

    return NextResponse.json({ results, updated_at: new Date().toISOString() })
  }
  