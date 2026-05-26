import { NextRequest, NextResponse } from 'next/server'
  import { createWalletClient, createPublicClient, http, parseAbi } from 'viem'
  import { polygon } from 'viem/chains'
  import { privateKeyToAccount } from 'viem/accounts'

  export const dynamic = 'force-dynamic'
  export const maxDuration = 300

  const CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
  const BASE = 'https://shamimforever-api-server.vercel.app'

  const ABI = parseAbi([
    'function setTokenURI(uint256 tokenId, string memory uri)',
  ])

  async function uploadImageToPinata(imgBuffer: Buffer, filename: string): Promise<string> {
    const blob = new Blob([imgBuffer], { type: 'image/png' })
    const form = new FormData()
    form.append('file', blob, filename)
    form.append('pinataMetadata', JSON.stringify({ name: filename }))
    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.PINATA_JWT}` },
      body: form,
    })
    if (!res.ok) throw new Error('Pinata image upload: ' + await res.text())
    const d = await res.json()
    return `ipfs://${d.IpfsHash}`
  }

  async function uploadMetaToPinata(meta: object, name: string): Promise<string> {
    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.PINATA_JWT}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ pinataContent: meta, pinataMetadata: { name } }),
    })
    if (!res.ok) throw new Error('Pinata JSON: ' + await res.text())
    const d = await res.json()
    return `ipfs://${d.IpfsHash}`
  }

  export async function POST(req: NextRequest) {
    try {
      const adminKey = req.headers.get('x-admin-key') || ''
      if (adminKey !== (process.env.ADMIN_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const { serial, tokenId, imagePublicPath } = await req.json()
      if (!serial || tokenId === undefined) return NextResponse.json({ error: 'serial + tokenId required' }, { status: 400 })

      // Fetch PNG from our public CDN
      const imgUrl = imagePublicPath || `${BASE}/nft/${serial}-main.png`
      const imgRes = await fetch(imgUrl)
      if (!imgRes.ok) throw new Error('Image fetch failed: ' + imgUrl)
      const imgBuffer = Buffer.from(await imgRes.arrayBuffer())

      // Upload image to IPFS
      const imageIpfs = await uploadImageToPinata(imgBuffer, `${serial}-founders.png`)

      // Build metadata
      const meta = {
        name: "SHAMIM'S GHOST — FOUNDERS SOVEREIGN EDITION",
        description: "Ultra-luxury sovereign fragrance NFT — \$150,000 Founder collectible. Cinematic matte black environment, obsidian crystal perfume bottle with engraved gold SF insignia, massive royal diamond crown cap, floating sovereign gold key charm. Sotheby's × Rolls Royce × Tom Ford. Permanent provenance with VVIP access to the House of Shamim Forever.",
        image: imageIpfs,
        external_url: `${BASE}/authenticate?serial=${serial}`,
        background_color: '050505',
        attributes: [
          { trait_type: 'Serial Number', value: serial },
          { trait_type: 'Edition', value: 'Founders Sovereign Edition' },
          { trait_type: 'Rarity Tier', value: 'FOUNDERS' },
          { trait_type: 'Valuation', value: '\$150,000 USD' },
          { trait_type: 'Edition Number', value: '1 of 1' },
          { trait_type: 'Bottle Material', value: 'Obsidian Crystal' },
          { trait_type: 'Atmosphere', value: 'Black Velvet Shadows, Soft Luxury Smoke' },
          { trait_type: 'Lighting', value: 'Hyper-detailed Cinematic' },
          { trait_type: 'Aesthetic', value: 'Elite Billionaire, Institutional Luxury Branding' },
          { trait_type: 'Material', value: 'Black Oud and Kashmiri Saffron' },
          { trait_type: 'Craftsmanship Origin', value: 'Karachi Sovereign Atelier' },
          { trait_type: 'Physical Asset', value: 'Sovereign Fragrance — Vaulted at Karachi Atelier' },
          { trait_type: 'Ownership Cycle Count', value: 1, display_type: 'number' },
          { trait_type: 'House', value: 'Shamim Forever' },
          { trait_type: 'Country', value: 'Pakistan' },
        ],
      }
      const metaIpfs = await uploadMetaToPinata(meta, `${serial}-metadata`)

      // Update on-chain tokenURI via setTokenURI
      const pk = process.env.MINTER_PRIVATE_KEY as `0x${string}`
      const account = privateKeyToAccount(pk)
      const transport = http(process.env.ALCHEMY_RPC_URL!)
      const walletClient = createWalletClient({ account, chain: polygon, transport })
      const publicClient = createPublicClient({ chain: polygon, transport })

      const txHash = await walletClient.writeContract({
        address: CONTRACT as `0x${string}`,
        abi: ABI,
        functionName: 'setTokenURI',
        args: [BigInt(tokenId), metaIpfs],
      })
      await publicClient.waitForTransactionReceipt({ hash: txHash })

      return NextResponse.json({
        success: true, serial, tokenId, imageIpfs, metaIpfs, txHash,
        gatewayImage: imageIpfs.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/'),
        polygonscan: `https://polygonscan.com/tx/${txHash}`,
        opensea: `https://opensea.io/assets/matic/${CONTRACT}/${tokenId}`,
      })
    } catch (err: unknown) {
      const e = err as { message?: string }
      return NextResponse.json({ error: e?.message }, { status: 500 })
    }
  }