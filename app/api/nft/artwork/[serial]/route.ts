import { NextRequest, NextResponse } from 'next/server'
import { generateSovereignSVG } from '@/lib/nft-artwork'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: { serial: string } }
) {
  const serial = params.serial.toUpperCase().replace(/\.svg$/i, '')

  let rarityTier = 'ELITE'
  let productName = 'Sovereign Asset'
  let ownershipCycle = 1
  let origin = 'Karachi Sovereign Atelier'
  let price = '$50,000+'

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data: asset } = await supabase
      .from('sovereign_assets')
      .select('rarity_tier, ownership_cycle')
      .eq('serial_number', serial)
      .single()
    if (asset) {
      rarityTier = asset.rarity_tier || 'ELITE'
      ownershipCycle = asset.ownership_cycle || 1
    }
    const { data: catalog } = await supabase
      .from('products_catalog')
      .select('product_name, craftsmanship_origin')
      .eq('product_id', serial)
      .single()
    if (catalog) {
      productName = catalog.product_name || productName
      origin = catalog.craftsmanship_origin || origin
    }
  } catch { /* use defaults */ }

  const svg = generateSovereignSVG({ serial, rarityTier, productName, ownershipCycle, origin, price })

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
