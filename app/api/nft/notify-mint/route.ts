import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(req: NextRequest) {
  try {
    const { productName, serial, walletAddress, buyerName, orderId, txHash, tokenId } = await req.json()
    const CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
    const BASE = 'https://shamimforever-api-server.vercel.app'
    const supabase = getSupabase()

    // Save notification record — graceful if table doesn't exist yet
    try {
      await supabase.from('nft_notifications').upsert([{
        serial_number: serial,
        order_id: orderId || null,
        buyer_name: buyerName || null,
        wallet_address: walletAddress || null,
        tx_hash: txHash || null,
        token_id: tokenId ? parseInt(tokenId) : null,
        product_name: productName,
        opensea_url: tokenId
          ? 'https://opensea.io/assets/matic/' + CONTRACT + '/' + tokenId
          : null,
        polygonscan_url: txHash ? 'https://polygonscan.com/tx/' + txHash : null,
        authenticate_url: BASE + '/authenticate?serial=' + serial,
        notified_at: new Date().toISOString(),
      }], { onConflict: 'serial_number' })
    } catch (_ignored) {
      // Table may not exist yet — ignore
    }

    return NextResponse.json({ success: true, serial, notified: true })
  } catch (err: unknown) {
    const e = err as { message?: string }
    return NextResponse.json({ error: e?.message }, { status: 500 })
  }
}
