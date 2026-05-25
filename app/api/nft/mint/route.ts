import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { mintSovereignNFT } from '@/lib/nft-engine'

export const dynamic = 'force-dynamic'
export const maxDuration = 120 // 2 min for blockchain tx

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// POST /api/nft/mint — called after order confirmed
export async function POST(req: NextRequest) {
  try {
    const { serial, walletAddress, orderId } = await req.json()
    if (!serial || !walletAddress) return NextResponse.json({ error: 'serial and walletAddress required' }, { status: 400 })

    const supabase = getSupabase()

    // Get sovereign_asset record
    const { data: asset, error: assetErr } = await supabase
      .from('sovereign_assets')
      .select('*, product:products(name, category)')
      .eq('serial_number', serial)
      .single()

    if (assetErr || !asset) return NextResponse.json({ error: 'Serial not found in sovereign_assets' }, { status: 404 })
    if (asset.nft_status === 'minted') return NextResponse.json({ error: 'NFT already minted for this serial' }, { status: 409 })

    // Update status to minting
    await supabase.from('sovereign_assets').update({ nft_status: 'minting', wallet_address: walletAddress }).eq('serial_number', serial)

    // Mint NFT
    const result = await mintSovereignNFT({
      toAddress: walletAddress,
      productName: asset.product?.name || 'Sovereign Creation',
      serial,
      rarityTier: asset.rarity_tier || 'ELITE',
      category: asset.product?.category || 'Sovereign Luxury Assets',
      craftOrigin: 'Karachi Sovereign Atelier',
      manufactureDate: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    })

    // Update sovereign_assets with real tx data
    await supabase.from('sovereign_assets').update({
      nft_status: 'minted',
      tx_hash: result.txHash,
      token_id: parseInt(result.tokenId),
      ipfs_metadata_url: result.metadataUrl,
      wallet_address: walletAddress,
      ownership_cycle: 1,
    }).eq('serial_number', serial)

    // Also update product_authentication if it exists
    await supabase.from('product_authentication').update({
      blockchain_hash: result.txHash,
      nft_token_id: result.tokenId,
      owner_wallet: walletAddress,
      is_claimed: true,
      activation_date: new Date().toISOString(),
    }).eq('serial_number', serial)

    // Log provenance
    await supabase.from('provenance_ledger').insert([{
      token_id: parseInt(result.tokenId),
      previous_owner: '0x0000000000000000000000000000000000000000',
      new_owner: walletAddress,
      transfer_tx_hash: result.txHash,
      physical_shipment_status: 'vaulted',
    }])

    return NextResponse.json({ success: true, ...result })
  } catch (err: unknown) {
    const e = err as { message?: string }
    console.error('NFT mint error:', e)
    return NextResponse.json({ error: e?.message || 'Minting failed' }, { status: 500 })
  }
}
