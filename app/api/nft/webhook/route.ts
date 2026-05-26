import { NextRequest, NextResponse } from 'next/server'
  import { createClient } from '@supabase/supabase-js'
  import { createHmac } from 'crypto'

  export const dynamic = 'force-dynamic'

  const CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'.toLowerCase()

  function getSupabase() {
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  }

  // GET /api/nft/webhook — health check for Alchemy webhook setup
  export async function GET() {
    return NextResponse.json({
      status: 'active',
      contract: CONTRACT,
      description: 'Alchemy NFT Activity webhook — Shamim Forever Sovereign Assets',
      network: 'polygon-mainnet',
    })
  }

  // POST /api/nft/webhook — Alchemy Activity + Log Webhooks
  export async function POST(req: NextRequest) {
    try {
      const alchemySecret = process.env.ALCHEMY_WEBHOOK_SECRET || ''
      const signature = req.headers.get('x-alchemy-signature') || ''
      const rawBody = await req.text()

      // Verify Alchemy signature if secret is configured
      if (alchemySecret && signature) {
        const expected = createHmac('sha256', alchemySecret).update(rawBody).digest('hex')
        if (signature !== expected) {
          return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
        }
      }

      const body = JSON.parse(rawBody)
      const supabase = getSupabase()

      let processed = 0

      // ── Handle NFT Activity webhook (token transfers) ──
      const activities = body?.event?.activity || []
      for (const activity of activities) {
        if (activity.category !== 'token') continue

        const { fromAddress, toAddress, erc721TokenId, hash, rawContract } = activity

        // Only process our contract
        const contractAddr = (rawContract?.address || '').toLowerCase()
        if (contractAddr && contractAddr !== CONTRACT) continue
        if (!erc721TokenId || !hash) continue

        const tokenId = parseInt(erc721TokenId, 16)
        const isTransfer = fromAddress?.toLowerCase() !== '0x0000000000000000000000000000000000000000'

        if (isTransfer) {
          const { data: existing } = await supabase
            .from('sovereign_assets')
            .select('id, ownership_cycle, serial_number')
            .eq('token_id', tokenId)
            .single()

          if (existing) {
            await Promise.all([
              supabase.from('sovereign_assets').update({
                wallet_address: toAddress,
                ownership_cycle: (existing.ownership_cycle || 1) + 1,
                physical_status: 'requested',
              }).eq('token_id', tokenId),

              supabase.from('provenance_ledger').insert([{
                token_id: tokenId,
                previous_owner: fromAddress,
                new_owner: toAddress,
                transfer_tx_hash: hash,
                physical_shipment_status: 'requested',
              }]),

              supabase.from('product_authentication').update({
                owner_wallet: toAddress,
                blockchain_hash: hash,
              }).eq('nft_token_id', String(tokenId)),
            ])
            processed++
          }
        }
      }

      // ── Handle Contract Log webhook (ProvenanceUpdated events) ──
      const logs = body?.event?.data?.block?.logs || []
      const PROVENANCE_TOPIC = '0x' + 'ProvenanceUpdated'.padEnd(64, '0') // adjust with real topic hash
      for (const log of logs) {
        if ((log.address || '').toLowerCase() !== CONTRACT) continue
        // ProvenanceUpdated(uint256 tokenId, address previousOwner, address newOwner)
        if (log.topics?.[0] !== PROVENANCE_TOPIC) continue
        // Additional processing can be added here for direct contract events
      }

      return NextResponse.json({ success: true, processed, activities: activities.length })
    } catch (err: unknown) {
      const e = err as { message?: string }
      console.error('Webhook error:', e?.message)
      return NextResponse.json({ error: e?.message }, { status: 500 })
    }
  }
  