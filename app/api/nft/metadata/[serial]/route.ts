import { NextRequest, NextResponse } from 'next/server'
  import { buildNFTMetadata, getNFTOwner, NFT_CONTRACT } from '@/lib/nft-service'

  export const runtime = 'nodejs'

  export async function GET(
    _req: NextRequest,
    { params }: { params: { serial: string } },
  ) {
    const tokenId = parseInt(params.serial, 10)
    if (isNaN(tokenId) || tokenId <= 0) {
      return NextResponse.json({ error: 'Invalid token ID' }, { status: 400 })
    }

    const owner    = (await getNFTOwner(tokenId)) ?? 'Unknown'
    const archive  = `ARCHIVE-I-${String(tokenId).padStart(4, '0')}`
    const mintDate = new Date().toISOString().split('T')[0]
    const metadata = buildNFTMetadata(tokenId, owner, archive, mintDate)

    return NextResponse.json(metadata, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'X-NFT-Contract': NFT_CONTRACT,
      },
    })
  }
  