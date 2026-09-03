import { NextResponse } from 'next/server'

  export const runtime = 'nodejs'

  export async function GET() {
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.shamimforever.com'
    return NextResponse.json({
      name: 'House of Shamim Forever — Sovereign Passport',
      description: 'The Shamim Bloom Sovereign Passport is a permanent, blockchain-verified proof of ownership for the Shamim Bloom Founder Reserve fragrance. Minted on Polygon Mainnet. Non-burnable. OpenSea compatible. Limited to 50 Founder pieces.',
      image: `${APP_URL}/products/shamims-bloom/shamim-bloom-hero.mp4`,
      external_link: APP_URL,
      seller_fee_basis_points: 250,
      fee_recipient: '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7',
    }, {
      headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=86400' }
    })
  }
  