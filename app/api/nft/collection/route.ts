import { NextResponse } from 'next/server'
  export const dynamic = 'force-dynamic'
  export async function GET() {
    const BASE = 'https://shamimforever-api-server.vercel.app'
    return NextResponse.json({
      name: 'Shamim Forever — Sovereign Assets',
      description: "A sovereign luxury NFT collection tied to physical ultra-luxury fragrances and jewels. Every piece is a Founders-grade collectible with on-chain provenance, ERC-2981 royalties, and House Vault access. The House of Shamim Forever — Built From Love. Forged Into Legacy.",
      image: `${BASE}/api/nft/artwork/SF-RO-2026-01`,
      banner_image_url: `${BASE}/api/nft/artwork/SF-SG-2026-00005`,
      external_link: BASE,
      seller_fee_basis_points: 750,
      fee_recipient: '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7',
      contract_address: '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640',
      schema_name: 'ERC721',
      blockchain: 'polygon',
      royalties: [{ recipient: '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7', basis_points: 750 }],
      socials: { website: BASE },
    }, { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=3600' } })
  }