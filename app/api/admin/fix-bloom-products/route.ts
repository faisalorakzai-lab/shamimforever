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

  // Fix the pendant — revert to jewelry data
  const { data: d1, error: e1 } = await supabase
    .from('products')
    .update({
      name: 'Shamim Bloom Sovereign Pendant',
      description: 'An exquisite sovereign pendant from the House of Shamim Forever. A wearable piece of emotional architecture — crafted for the woman who carries grace as her signature.',
      story: JSON.stringify({
        tagline: 'Shamim Bloom Sovereign Pendant — Wearable Heritage',
        olfactory: null,
        specs: { material: '18K Gold Plated', dimensions: 'Pendant: 25mm × 18mm', chain: '18-inch fine chain included' },
        nft: { title: 'Shamim Bloom Pendant — Digital Passport', description: 'Authenticated sovereign jewelry from the House of Shamim Forever.', blockchain: 'Polygon Mainnet', rarity: 'Sovereign Collection' }
      }),
      images: ['/products/shamims-bloom/bloom-hero.png'],
    })
    .eq('id', '5ba5c73d-e647-4ccd-ab70-db2f07be20ae')
    .select('id, name, slug')
  results.push({ product: 'pendant', data: d1, error: e1?.message })

  // Fix the lip elixir — revert to cosmetics data
  const { data: d2, error: e2 } = await supabase
    .from('products')
    .update({
      name: 'Shamim Bloom Lip Elixir',
      description: 'A lip treatment from the House of Shamim Forever. Rose-infused, velvet-soft, and sovereignly feminine. Formulated with Taif rose extract and golden shimmer.',
      story: JSON.stringify({
        tagline: 'Shamim Bloom Lip Elixir — Sovereign Beauty',
        benefits: ['Taif Rose Extract — Deep nourishment', 'Golden shimmer — luminous finish', 'Long-lasting — 8-hour hydration', 'SPF 15 protection'],
        howTo: 'Apply to clean, dry lips. Can be worn alone or layered. Reapply as needed.',
        nft: { title: 'Shamim Bloom Lip Elixir — Digital Passport', description: 'Authenticated sovereign cosmetics from the House of Shamim Forever.', blockchain: 'Polygon Mainnet' }
      }),
      images: ['/products/shamims-bloom/bloom-hero.png'],
    })
    .eq('id', '44e00019-09a7-4e54-b546-dc95758e3705')
    .select('id, name, slug')
  results.push({ product: 'lip_elixir', data: d2, error: e2?.message })

  return NextResponse.json({ success: true, results })
}
