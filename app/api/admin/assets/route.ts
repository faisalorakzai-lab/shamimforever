import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// GET /api/admin/assets — list all sovereign assets
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  
  const supabase = getSupabase()
  let query = supabase.from('sovereign_assets').select('*').order('created_at', { ascending: false }).limit(200)
  if (status) query = query.eq('nft_status', status)
  
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ assets: data, count: data?.length || 0 })
}

// POST /api/admin/assets — create new sovereign asset (register serial)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { serial, rarity, product_name, category, secret } = body

    if (secret !== 'faisalorakzaiofficial@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!serial) return NextResponse.json({ error: 'serial required' }, { status: 400 })

    const supabase = getSupabase()

    const { data, error } = await supabase.from('sovereign_assets').insert([{
      serial_number: serial.trim().toUpperCase(),
      rarity_tier: rarity || 'ELITE',
      nft_status: 'pending',
      physical_status: 'vaulted',
      ownership_cycle: 0,
    }]).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Also add to products_catalog if product_name provided
    if (product_name) {
      await supabase.from('products_catalog').upsert({
        product_id: serial.toUpperCase(),
        product_name,
        category: category || 'Sovereign Luxury Assets',
        rarity_tier: rarity || 'ELITE',
        craftsmanship_origin: 'Karachi Sovereign Atelier',
        manufacture_date: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      }, { onConflict: 'product_id' })
    }

    return NextResponse.json({ success: true, asset: data })
  } catch (err: unknown) {
    const e = err as { message?: string }
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}
