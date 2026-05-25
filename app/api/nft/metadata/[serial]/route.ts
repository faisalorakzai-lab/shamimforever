import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { buildMetadata, generateSimpleArtworkURL } from '@/lib/nft-engine'
import { ipfsToHTTP } from '@/lib/pinata'

export const dynamic = 'force-dynamic'

// GET /api/nft/metadata/[serial] — dynamic OpenSea-compatible metadata endpoint
export async function GET(req: NextRequest, { params }: { params: { serial: string } }) {
  const serial = params.serial.toUpperCase()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // Check sovereign_assets
  const { data: asset } = await supabase
    .from('sovereign_assets')
    .select('*, product:products(name, category)')
    .eq('serial_number', serial)
    .single()

  if (!asset) {
    // Fallback: check product_authentication
    const { data: auth } = await supabase.from('product_authentication').select('*').eq('serial_number', serial).single()
    if (!auth) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    
    const productName = auth.nft_metadata?.product_name || 'Sovereign Creation'
    const artworkUrl = generateSimpleArtworkURL(serial, 'ELITE')
    return NextResponse.json(buildMetadata({
      productName, serial, rarityTier: 'ELITE',
      category: 'Sovereign Luxury Assets',
      imageIpfsUrl: artworkUrl,
      craftOrigin: auth.provenance || 'Karachi Sovereign Atelier',
      manufactureDate: auth.manufacture_date ? new Date(auth.manufacture_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : 'May 2026',
      ownershipCycle: auth.is_claimed ? 1 : 0,
    }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' }})
  }

  // Use IPFS metadata URL if minted, else generate dynamic
  if (asset.ipfs_metadata_url) {
    const metaUrl = ipfsToHTTP(asset.ipfs_metadata_url)
    try {
      const res = await fetch(metaUrl)
      const meta = await res.json()
      return NextResponse.json(meta, { headers: { 'Content-Type': 'application/json' }})
    } catch { /* fallthrough to dynamic */ }
  }

  // Dynamic generation
  const productName = asset.product?.name || 'Sovereign Creation'
  const artworkUrl = generateSimpleArtworkURL(serial, asset.rarity_tier || 'ELITE')
  return NextResponse.json(buildMetadata({
    productName, serial,
    rarityTier: asset.rarity_tier || 'ELITE',
    category: asset.product?.category || 'Sovereign Luxury Assets',
    imageIpfsUrl: artworkUrl,
    craftOrigin: 'Karachi Sovereign Atelier',
    manufactureDate: new Date(asset.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    ownershipCycle: asset.ownership_cycle || 0,
  }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' }})
}
