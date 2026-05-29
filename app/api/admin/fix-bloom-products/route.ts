import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== 'shamim-fix-other-products-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = db()
  const results: any[] = []

  // Fix pendant — correct name, description, story, price
  const { data: d1, error: e1 } = await supabase
    .from('products')
    .update({
      name: 'Shamim Bloom Sovereign Pendant',
      description: 'An exquisite sovereign pendant from the House of Shamim Forever.',
      price_pkr: 22000,
      price_usd: 79,
      story: {
        tagline: 'Wearable sovereign heritage from the House of Shamim Forever.',
        specs: { material: '18K Gold Plated', dimensions: 'Pendant: 25mm × 18mm', chain: '18-inch fine chain included' }
      },
      images: ['/products/shamims-bloom/bloom-hero.png'],
    })
    .eq('id', '5ba5c73d-e647-4ccd-ab70-db2f07be20ae')
    .select('id, name, slug, price_pkr')
  results.push({ product: 'pendant', data: d1, error: e1?.message })

  // Fix lip elixir — correct name, description, story, price
  const { data: d2, error: e2 } = await supabase
    .from('products')
    .update({
      name: 'Shamim Bloom Lip Elixir',
      description: 'A rose-infused lip elixir from the House of Shamim Forever. Taif rose extract, golden shimmer, velvet-soft finish.',
      price_pkr: 4500,
      price_usd: 16,
      story: {
        tagline: 'Shamim Bloom Lip Elixir — Sovereign Beauty',
        benefits: ['Taif Rose Extract — Deep nourishment', 'Golden shimmer — luminous finish', 'Long-lasting — 8-hour hydration'],
      },
      images: ['/products/shamims-bloom/bloom-hero.png'],
    })
    .eq('id', '44e00019-09a7-4e54-b546-dc95758e3705')
    .select('id, name, slug, price_pkr')
  results.push({ product: 'lip_elixir', data: d2, error: e2?.message })

  return NextResponse.json({ success: true, results })
}
