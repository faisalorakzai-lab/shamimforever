import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { mintSovereignNFT } from '@/lib/nft-engine'

export const dynamic = 'force-dynamic'
export const maxDuration = 120

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// POST /api/nft/claim — user claims unclaimed NFT with their wallet
export async function POST(req: NextRequest) {
  try {
    const { serial, walletAddress } = await req.json()
    if (!serial || !walletAddress) return NextResponse.json({ error: 'serial and walletAddress required' }, { status: 400 })

    const supabase = getSupabase()

    // Check sovereign_assets
    let { data: asset } = await supabase.from('sovereign_assets').select('*').eq('serial_number', serial).single()
    
    // Fallback to product_authentication
    if (!asset) {
      const { data: auth } = await supabase.from('product_authentication').select('*').eq('serial_number', serial).single()
      if (!auth) return NextResponse.json({ error: 'Serial not found' }, { status: 404 })
      
      // Create sovereign_asset entry
      const { data: newAsset } = await supabase.from('sovereign_assets').insert([{
        serial_number: serial,
        wallet_address: walletAddress,
        nft_status: 'pending',
        rarity_tier: 'ELITE',
        ownership_cycle: 0,
        physical_status: 'vaulted',
      }]).select().single()
      asset = newAsset
    }

    if (asset?.nft_status === 'minted' && asset?.wallet_address !== walletAddress) {
      return NextResponse.json({ error: 'NFT already claimed by another wallet' }, { status: 409 })
    }
    if (asset?.nft_status === 'minted' && asset?.wallet_address === walletAddress) {
      return NextResponse.json({ 
        success: true, already_claimed: true,
        txHash: asset.tx_hash, tokenId: String(asset.token_id), metadataUrl: asset.ipfs_metadata_url 
      })
    }

    // Mint to user's wallet
    await supabase.from('sovereign_assets').update({ nft_status: 'minting', wallet_address: walletAddress }).eq('serial_number', serial)

    const result = await mintSovereignNFT({
      toAddress: walletAddress,
      productName: 'Sovereign Creation',
      serial,
      rarityTier: asset?.rarity_tier || 'ELITE',
      category: 'Sovereign Luxury Assets',
    })

    await supabase.from('sovereign_assets').update({
      nft_status: 'minted',
      tx_hash: result.txHash,
      token_id: parseInt(result.tokenId),
      ipfs_metadata_url: result.metadataUrl,
      ownership_cycle: 1,
    }).eq('serial_number', serial)

    await supabase.from('product_authentication').update({
      blockchain_hash: result.txHash,
      nft_token_id: result.tokenId,
      owner_wallet: walletAddress,
      is_claimed: true,
      activation_date: new Date().toISOString(),
    }).eq('serial_number', serial)

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
    return NextResponse.json({ error: e?.message || 'Claim failed' }, { status: 500 })
  }
}
