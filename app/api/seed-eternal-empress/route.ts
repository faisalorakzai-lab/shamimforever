import { NextRequest, NextResponse } from 'next/server'
  import { createClient } from '@supabase/supabase-js'

  export const dynamic = 'force-dynamic'
  export const maxDuration = 60

  function db() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    )
  }

  export async function GET(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret')
    if (secret !== 'shamim-eternal-empress-2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = db()

    const { data: cats } = await supabase.from('main_categories').select('id, slug')
    const perfumeId = cats?.find(c => c.slug === 'perfume')?.id
    if (!perfumeId) {
      return NextResponse.json({ error: 'Perfume category not found. Run seed-categories first.' }, { status: 400 })
    }

    const { data: subs } = await supabase.from('sub_categories').select('id, slug, name')
    const femaleId = subs?.find(s => s.slug === 'for-her' || s.name?.toLowerCase().includes('her'))?.id ?? null

    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('slug', 'eternal-empress')
      .single()

    const productData = {
      name: 'SF Eternal Empress',
      description: 'A sovereign feminine masterpiece sculpted around imperial white rose, molten saffron nectar, golden amber resin, and velvet skin musk — engineered for ceremonial elegance and eternal feminine authority.',
      story: JSON.stringify({
        tagline: 'THE ABSOLUTE FEMININE THRONE',
        sovereign_title: 'Imperial Sovereign Allocation — Archive III',
        legacy_statement: 'Eternal Empress was conceived inside the House of Shamim Forever as a sovereign feminine artifact — engineered to preserve emotional authority long after physical moments disappear.',
        philosophy: 'Power wrapped in elegance becomes eternal.',
        scentPyramid: {
          top: 'White Rose Silk · Golden Pear Elixir · Soft Champagne Accord',
          heart: 'Imperial White Rose · Saffron Nectar · Velvet Jasmine Veil',
          base: 'Golden Amber Resin · Creamy Sandalwood Smoke · White Skin Musk · Vanilla Orchid Veil',
        },
        specs: {
          volume: '100ML — 3.4 FL. OZ.',
          concentration: 'Extrait de Parfum',
          longevity: '16–24+ Hours',
          production: 'Ultra-Limited Small-Batch Perfumery',
          allocation: 'Imperial Sovereign Allocation',
          gender: 'Feminine Royal Luxury',
        },
      }),
      price_pkr: 35000,
      price_usd: 125,
      main_category_id: perfumeId,
      sub_category_id: femaleId,
      images: ['/products/her-legacy-vault/vault-hero.png'],
      is_featured: true,
      is_active: true,
      is_pinned: true,
      sort_order: 3,
    }

    if (existing) {
      const { error } = await supabase.from('products').update(productData).eq('slug', 'eternal-empress')
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true, action: 'updated', slug: 'eternal-empress' })
    }

    const { data: product, error } = await supabase
      .from('products')
      .insert([{ ...productData, slug: 'eternal-empress', inventory: 50 }])
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, action: 'created', product })
  }
  