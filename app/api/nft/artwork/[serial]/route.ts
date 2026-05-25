import { NextRequest, NextResponse } from 'next/server'
import { generateSovereignSVG } from '@/lib/nft-artwork'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: { serial: string } }
) {
  const serial = params.serial.toUpperCase().replace(/\.svg$/i, '')
  const svg = generateSovereignSVG({ serial, rarityTier: 'ELITE' })
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
