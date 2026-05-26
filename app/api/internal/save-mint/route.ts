import { NextRequest, NextResponse } from 'next/server'
  import { createClient } from '@supabase/supabase-js'

  export const dynamic = 'force-dynamic'

  function getSupabase() {
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  }

  export async function POST(req: NextRequest) {
    const { serial, tokenId, txHash, wallet, metadataUrl, rarityTier } = await req.json()
    if (!serial || !txHash) return NextResponse.json({ error: 'serial + txHash required' }, { status: 400 })
    const supabase = getSupabase()
    const [upsert, provenance] = await Promise.all([
      supabase.from('sovereign_assets').upsert({
        serial_number: serial,
        wallet_address: wallet,
        nft_status: 'minted',
        rarity_tier: rarityTier || 'FOUNDERS',
        ownership_cycle: 1,
        physical_status: 'vaulted',
        product_id: 'founders-ghost-001',
        tx_hash: txHash,
        token_id: tokenId,
        ipfs_metadata_url: metadataUrl || null,
      }, { onConflict: 'serial_number' }),
      supabase.from('provenance_ledger').upsert({
        token_id: tokenId,
        previous_owner: '0x0000000000000000000000000000000000000000',
        new_owner: wallet,
        transfer_tx_hash: txHash,
        physical_shipment_status: 'vaulted',
      }, { onConflict: 'transfer_tx_hash' }),
    ])
    return NextResponse.json({
      success: true,
      asset: upsert.error ? upsert.error.message : 'saved',
      provenance: provenance.error ? provenance.error.message : 'saved',
    })
  }