import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createHmac } from 'crypto'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// POST /api/nft/webhook — Alchemy Activity Webhook for ProvenanceUpdated events
export async function POST(req: NextRequest) {
  try {
    // Verify Alchemy webhook signature
    const alchemySecret = process.env.ALCHEMY_WEBHOOK_SECRET || ''
    const signature = req.headers.get('x-alchemy-signature') || ''
    const rawBody = await req.text()

    if (alchemySecret && signature) {
      const expected = createHmac('sha256', alchemySecret).update(rawBody).digest('hex')
      if (signature !== expected) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const body = JSON.parse(rawBody)
    const supabase = getSupabase()

    // Process each event
    const events = body?.event?.activity || []
    for (const activity of events) {
      if (activity.category !== 'token') continue

      const { fromAddress, toAddress, erc721TokenId, hash } = activity
      if (!erc721TokenId || !hash) continue

      const tokenId = parseInt(erc721TokenId, 16)
      const isTransfer = fromAddress !== '0x0000000000000000000000000000000000000000'

      if (isTransfer) {
        // NFT transferred on secondary market
        const { data: existing } = await supabase
          .from('sovereign_assets')
          .select('id, ownership_cycle')
          .eq('token_id', tokenId)
          .single()

        if (existing) {
          // Update ownership
          await supabase.from('sovereign_assets').update({
            wallet_address: toAddress,
            ownership_cycle: (existing.ownership_cycle || 1) + 1,
            physical_status: 'requested', // New owner must verify
          }).eq('token_id', tokenId)

          // Log provenance
          await supabase.from('provenance_ledger').insert([{
            token_id: tokenId,
            previous_owner: fromAddress,
            new_owner: toAddress,
            transfer_tx_hash: hash,
            physical_shipment_status: 'requested',
          }])

          // Update product_authentication wallet
          await supabase.from('product_authentication').update({
            owner_wallet: toAddress,
            blockchain_hash: hash,
          }).eq('nft_token_id', String(tokenId))
        }
      }
    }

    return NextResponse.json({ success: true, processed: events.length })
  } catch (err: unknown) {
    const e = err as { message?: string }
    return NextResponse.json({ error: e?.message }, { status: 500 })
  }
}
