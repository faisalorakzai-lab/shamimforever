import { NextRequest, NextResponse } from 'next/server'
  import { createClient } from '@supabase/supabase-js'
  import { mintSovereignNFT } from '@/lib/nft-engine'
  import { uploadMetadataToIPFS, uploadImageURLToIPFS } from '@/lib/pinata'

  export const dynamic = 'force-dynamic'
  export const maxDuration = 300

  const CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'

  const FOUNDERS_NFT = {
    serial: 'SF-RO-2026-01',
    name: "SHAMIM'S GHOST — FOUNDERS SOVEREIGN EDITION",
    description: "Ultra-luxury sovereign fragrance NFT — $150,000 Founder collectible. Cinematic matte black, obsidian crystal bottle with engraved gold SF insignia, royal diamond crown cap, floating sovereign gold key charm, museum-grade reflections, black velvet shadows, luxury smoke atmosphere, royal gold silk fabric, hyper-detailed cinematic lighting, elite billionaire aesthetic. Sotheby's x Rolls Royce x Tom Ford. Permanent digital provenance with VVIP institutional access to the House of Shamim Forever.",
    rarityTier: 'FOUNDERS',
    category: 'Sovereign Fragrance Assets',
    craftOrigin: 'Karachi Sovereign Atelier',
    manufactureDate: 'May 2026',
    extraAttributes: [
      { trait_type: 'Edition', value: 'Founders Sovereign Edition' },
      { trait_type: 'Type', value: 'Ultra-luxury Sovereign Fragrance NFT' },
      { trait_type: 'Environment', value: 'Cinematic Matte Black' },
      { trait_type: 'Bottle Material', value: 'Obsidian Crystal' },
      { trait_type: 'Bottle Details', value: 'Engraved Gold SF Insignia, Royal Diamond Crown Cap, Floating Sovereign Gold Key Charm' },
      { trait_type: 'Reflections', value: 'Museum-grade' },
      { trait_type: 'Atmosphere', value: 'Black Velvet Shadows, Soft Luxury Smoke' },
      { trait_type: 'Fabric', value: 'Royal Gold Silk' },
      { trait_type: 'Accents', value: 'Subtle Rose Elements' },
      { trait_type: 'Lighting', value: 'Hyper-detailed Cinematic, Dramatic from Above' },
      { trait_type: 'Aesthetic', value: 'Elite Billionaire, Institutional Luxury Branding' },
      { trait_type: 'Color Palette', value: 'Deep Black and Gold' },
      { trait_type: 'Quality', value: "Sotheby's x Rolls Royce x Tom Ford, Ultra Realistic, 8K, Masterpiece" },
      { trait_type: 'Seal', value: 'Sovereign Seal Emblem' },
      { trait_type: 'Surface', value: 'Dark Reflective Marble' },
      { trait_type: 'Spotlight', value: 'Dramatic from Above' },
      { trait_type: 'Mood', value: 'Timeless, Powerful, Emotional, Legendary, Sovereign' },
      { trait_type: 'Hidden Elements', value: 'Microscopic Serial Engraving, Floating Dust Particles, Arabic/Persian Texture Patterns, Gold Embossing, Cinematic Lens Bloom, Luxury Fog' },
      { trait_type: 'Valuation', value: '$150,000 USD' },
      { trait_type: 'Edition Number', value: '1 of 1' },
      { trait_type: 'Material', value: 'Black Oud and Kashmiri Saffron' },
      { trait_type: 'Physical Asset', value: 'Sovereign Fragrance — Vaulted at Karachi Atelier' },
    ],
  }

  function getSupabase() {
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  }

  export async function GET() {
    const supabase = getSupabase()
    const { data } = await supabase.from('sovereign_assets').select('*').eq('serial_number', FOUNDERS_NFT.serial).single()
    return NextResponse.json({
      serial: FOUNDERS_NFT.serial,
      name: FOUNDERS_NFT.name,
      valuation: '$150,000 USD',
      edition: '1 of 1 — Founders Ghost Genesis',
      contract: CONTRACT,
      status: data || { nft_status: 'pending', message: 'Not yet minted — call POST with walletAddress' },
      ...(data?.nft_status === 'minted' ? {
        opensea: `https://opensea.io/assets/matic/${CONTRACT}/${data.token_id}`,
        polygonscan: `https://polygonscan.com/tx/${data.tx_hash}`,
        authenticate: `https://shamimforever-api-server.vercel.app/authenticate?serial=${FOUNDERS_NFT.serial}`,
      } : {}),
    })
  }

  export async function POST(req: NextRequest) {
    try {
      const adminKey = req.headers.get('x-admin-key') || ''
      const expectedKey = process.env.ADMIN_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
      if (adminKey !== expectedKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

      const { walletAddress, skipIfMinted } = await req.json()
      if (!walletAddress) return NextResponse.json({ error: 'walletAddress required' }, { status: 400 })

      const supabase = getSupabase()
      const { serial, name, description, rarityTier, category, craftOrigin, manufactureDate, extraAttributes } = FOUNDERS_NFT

      const { data: existing } = await supabase.from('sovereign_assets').select('*').eq('serial_number', serial).single()
      if (existing?.nft_status === 'minted') {
        if (skipIfMinted) return NextResponse.json({ success: true, already_minted: true, txHash: existing.tx_hash, tokenId: existing.token_id, metadataUrl: existing.ipfs_metadata_url })
        return NextResponse.json({ error: 'Already minted', existing }, { status: 409 })
      }

      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://shamimforever-api-server.vercel.app'
      const artworkUrl = `${baseUrl}/api/nft/artwork/${encodeURIComponent(serial)}`
      let artworkIpfs = artworkUrl
      try { artworkIpfs = await uploadImageURLToIPFS(artworkUrl, `${serial}-founders-artwork`) } catch { /* use URL fallback */ }

      const metadataIpfsUrl = await uploadMetadataToIPFS({
        name, description,
        image: artworkIpfs,
        external_url: `https://shamimforever-api-server.vercel.app/authenticate?serial=${serial}`,
        background_color: '050505',
        attributes: [
          { trait_type: 'Serial Number', value: serial },
          { trait_type: 'Category', value: category },
          { trait_type: 'Rarity Tier', value: rarityTier },
          { trait_type: 'Craftsmanship Origin', value: craftOrigin },
          { trait_type: 'Manufacture Date', value: manufactureDate },
          { trait_type: 'Sovereign Status', value: 'Active Founders Passport' },
          { trait_type: 'Physical Authenticity', value: '100/100 (Sovereign Seal)' },
          { trait_type: 'Ownership Cycle Count', value: 1, display_type: 'number' as const },
          ...extraAttributes,
        ],
        unlockable_content: {
          description: 'Founders Vault: Private atelier tours, personal concierge, fragrance refill for life, first access to all future drops, VVIP event access, founder attribution in all House archives.',
          vault_gate_url: 'https://shamimforever-api-server.vercel.app/vault',
        },
      })

      await supabase.from('sovereign_assets').upsert({
        serial_number: serial, wallet_address: walletAddress, nft_status: 'minting',
        rarity_tier: rarityTier, ownership_cycle: 0, physical_status: 'vaulted', product_id: 'founders-ghost-001',
      }, { onConflict: 'serial_number' })

      const result = await mintSovereignNFT({ toAddress: walletAddress, productName: name, serial, rarityTier, category, craftOrigin, manufactureDate })

      await Promise.all([
        supabase.from('sovereign_assets').update({
          nft_status: 'minted', tx_hash: result.txHash, token_id: parseInt(result.tokenId),
          ipfs_metadata_url: metadataIpfsUrl || result.metadataUrl, wallet_address: walletAddress, ownership_cycle: 1,
        }).eq('serial_number', serial),
        supabase.from('provenance_ledger').insert([{
          token_id: parseInt(result.tokenId), previous_owner: '0x0000000000000000000000000000000000000000',
          new_owner: walletAddress, transfer_tx_hash: result.txHash, physical_shipment_status: 'vaulted',
        }]),
      ])

      return NextResponse.json({
        success: true, serial, txHash: result.txHash, tokenId: result.tokenId,
        metadataUrl: metadataIpfsUrl || result.metadataUrl, artworkIpfs,
        opensea: `https://opensea.io/assets/matic/${CONTRACT}/${result.tokenId}`,
        polygonscan: `https://polygonscan.com/tx/${result.txHash}`,
        authenticate: `https://shamimforever-api-server.vercel.app/authenticate?serial=${serial}`,
      })
    } catch (err: unknown) {
      const e = err as { message?: string }
      return NextResponse.json({ error: e?.message || 'Minting failed' }, { status: 500 })
    }
  }