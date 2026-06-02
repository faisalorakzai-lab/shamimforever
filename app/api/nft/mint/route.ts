import { NextRequest, NextResponse } from 'next/server'
  import { mintNFT, getNextTokenId, NFT_CONTRACT } from '@/lib/nft-service'
  import type { Address } from 'viem'

  export const runtime = 'nodejs'
  export const maxDuration = 60

  export async function POST(req: NextRequest) {
    try {
      const body = await req.json()
      const { walletAddress, orderRef } = body as { walletAddress?: string; orderRef?: string }

      if (!walletAddress || typeof walletAddress !== 'string') {
        return NextResponse.json({ success: false, error: 'Wallet address required' }, { status: 400 })
      }
      if (!/^0x[0-9a-fA-F]{40}$/.test(walletAddress)) {
        return NextResponse.json({ success: false, error: 'Invalid Polygon wallet address (must be 0x... 42 chars)' }, { status: 400 })
      }

      const tokenId = await getNextTokenId()
      const { txHash } = await mintNFT(walletAddress as Address, tokenId, orderRef ?? 'DIRECT')

      return NextResponse.json({
        success: true,
        tokenId,
        txHash,
        contractAddress: NFT_CONTRACT,
        openSeaUrl: `https://opensea.io/assets/matic/${NFT_CONTRACT}/${tokenId}`,
        polygonScanUrl: `https://polygonscan.com/tx/${txHash}`,
        polygonScanTokenUrl: `https://polygonscan.com/token/${NFT_CONTRACT}?a=${tokenId}`,
      })
    } catch (err: unknown) {
      const msg =
        (err as { shortMessage?: string })?.shortMessage ??
        (err as { message?: string })?.message ??
        'Minting failed'
      console.error('[NFT Mint Error]', msg)
      return NextResponse.json({ success: false, error: msg }, { status: 500 })
    }
  }
  