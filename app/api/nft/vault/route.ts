import { NextRequest, NextResponse } from 'next/server'
  import { createClient } from '@supabase/supabase-js'

  export const dynamic = 'force-dynamic'

  function getSupabase() {
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  }

  export async function GET(req: NextRequest) {
    const wallet = req.nextUrl.searchParams.get('wallet')?.toLowerCase()
    if (!wallet) return NextResponse.json({ error: 'wallet param required' }, { status: 400 })

    const supabase = getSupabase()
    const { data: assets, error } = await supabase
      .from('sovereign_assets')
      .select('*')
      .ilike('wallet_address', wallet)
      .order('ownership_cycle', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
    return NextResponse.json({
      wallet, count: assets?.length || 0,
      assets: (assets || []).map(a => ({
        ...a,
        artwork_url: `/api/nft/artwork/${encodeURIComponent(a.serial_number)}`,
        authenticate_url: `/authenticate?serial=${a.serial_number}`,
        opensea_url: a.token_id ? `https://opensea.io/assets/matic/${CONTRACT}/${a.token_id}` : null,
        polygonscan_url: a.tx_hash ? `https://polygonscan.com/tx/${a.tx_hash}` : null,
      })),
    }, { headers: { 'Access-Control-Allow-Origin': '*' } })
  }