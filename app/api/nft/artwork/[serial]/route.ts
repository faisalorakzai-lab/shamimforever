import { NextRequest, NextResponse } from 'next/server'
import { generateSovereignSVG } from '@/lib/nft-artwork'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { serial: string } }
) {
  const serial = params.serial.toUpperCase().replace('.svg', '')

  // Look up asset details for richer artwork
  let rarityTier = 'ELITE'
  let productName = 'Sovereign Asset'
  let ownershipCycle = 1

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data } = await supabase
      .from('sovereign_assets')
      .select('rarity_tier, ownership_cycle, product_id')
      .eq('serial_number', serial)
      .single()
    if (data) {
      rarityTier = data.rarity_tier || 'ELITE'
      ownershipCycle = data.ownership_cycle || 1
    }

    const { data: catalog } = await supabase
      .from('products_catalog')
      .select('product_name')
      .eq('product_id', serial)
      .single()
    if (catalog) productName = catalog.product_name || productName
  } catch { /* use defaults */ }

  const svg = generateSovereignSVG({ serial, rarityTier, productName, ownershipCycle })

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
