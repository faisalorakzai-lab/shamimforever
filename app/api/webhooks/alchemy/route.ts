import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function verifyAlchemySignature(body: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(body, 'utf8')
  const digest = hmac.digest('hex')
  return digest === signature
}

// POST /api/webhooks/alchemy — receives NFT transfer events from Alchemy
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('x-alchemy-signature') || ''
    const webhookSecret = process.env.ALCHEMY_WEBHOOK_SECRET

    // Verify signature if secret configured
    if (webhookSecret && signature) {
      const valid = verifyAlchemySignature(rawBody, signature, webhookSecret)
      if (!valid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const payload = JSON.parse(rawBody)
    const supabase = getSupabase()

    // Handle NFT Activity webhook type
    const event = payload?.event
    if (!event) return NextResponse.json({ ok: true, skipped: 'no event' })

    const contractAddress = process.env.NFT_CONTRACT_ADDRESS?.toLowerCase()

    // Process NFT activity (transfers)
    if (payload.type === 'NFT_ACTIVITY' || event.activity) {
      const activities = event.activity || []

      for (const activity of activities) {
        const { fromAddress, toAddress, contractAddress: activityContract, erc721TokenId, log } = activity

        // Only process our contract
        if (activityContract?.toLowerCase() !== contractAddress) continue

        // Skip mints (from zero address)
        const zeroAddress = '0x0000000000000000000000000000000000000000'
        if (fromAddress?.toLowerCase() === zeroAddress) continue

        const tokenId = erc721TokenId ? parseInt(erc721TokenId, 16) : null
        if (tokenId === null || isNaN(tokenId)) continue

        const txHash = log?.transactionHash || activity.hash

        // Find sovereign_asset by token_id
        const { data: asset } = await supabase
          .from('sovereign_assets')
          .select('*')
          .eq('token_id', tokenId)
          .single()

        if (!asset) continue

        const previousOwner = asset.wallet_address || fromAddress
        const newOwner = toAddress

        // 1. Update sovereign_assets: new owner, increment ownership_cycle, lock vault
        await supabase.from('sovereign_assets').update({
          wallet_address: newOwner,
          ownership_cycle: (asset.ownership_cycle || 1) + 1,
          physical_status: 'transferred',
          updated_at: new Date().toISOString(),
        }).eq('token_id', tokenId)

        // 2. Log to provenance_ledger
        await supabase.from('provenance_ledger').insert([{
          token_id: tokenId,
          previous_owner: previousOwner,
          new_owner: newOwner,
          transfer_tx_hash: txHash,
          physical_shipment_status: 'transferred',
        }])

        // 3. Update vault_members: remove previous owner's count
        if (previousOwner) {
          const { data: prevAssets } = await supabase
            .from('sovereign_assets')
            .select('rarity_tier')
            .eq('wallet_address', previousOwner)
            .eq('nft_status', 'minted')
          
          if (prevAssets && prevAssets.length > 0) {
            const score = calculateScore(prevAssets.map(a => a.rarity_tier))
            await supabase.from('vault_members').upsert({
              wallet_address: previousOwner.toLowerCase(),
              total_score: score,
              sovereign_rank: getRank(score),
              updated_at: new Date().toISOString(),
            }, { onConflict: 'wallet_address' })
          }
        }

        // 4. Update vault_members for new owner
        const { data: newAssets } = await supabase
          .from('sovereign_assets')
          .select('rarity_tier')
          .eq('wallet_address', newOwner)
          .eq('nft_status', 'minted')
        
        if (newAssets && newAssets.length > 0) {
          const score = calculateScore(newAssets.map(a => a.rarity_tier))
          await supabase.from('vault_members').upsert({
            wallet_address: newOwner.toLowerCase(),
            total_score: score,
            sovereign_rank: getRank(score),
            updated_at: new Date().toISOString(),
          }, { onConflict: 'wallet_address' })
        }

        // 5. Log claim event
        await supabase.from('nft_claim_logs').insert([{
          serial_number: asset.serial_number,
          wallet_address: newOwner,
          action: 'secondary_transfer',
          tx_hash: txHash,
        }])
      }
    }

    return NextResponse.json({ ok: true, processed: true })
  } catch (err: unknown) {
    const e = err as { message?: string }
    console.error('Alchemy webhook error:', e?.message)
    return NextResponse.json({ error: e?.message || 'Webhook failed' }, { status: 500 })
  }
}

function calculateScore(rarities: string[]): number {
  const SCORES: Record<string, number> = {
    COMMON: 10, ELITE: 25, ROYAL: 50, IMPERIAL: 80, FOUNDERS: 150, 'ONE-OF-ONE': 300
  }
  return rarities.reduce((sum, r) => sum + (SCORES[r] || 10), 0)
}

function getRank(score: number): string {
  if (score >= 500) return 'Founder'
  if (score >= 250) return 'Imperial'
  if (score >= 100) return 'Royal'
  if (score >= 50) return 'Sovereign'
  if (score >= 20) return 'Elite'
  return 'Associate'
}

// GET — health check for webhook registration
export async function GET() {
  return NextResponse.json({
    status: 'Alchemy webhook endpoint active',
    contract: process.env.NFT_CONTRACT_ADDRESS,
    network: 'Polygon Mainnet',
  })
}
