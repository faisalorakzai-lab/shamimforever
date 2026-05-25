import { uploadMetadataToIPFS, uploadImageURLToIPFS, type NFTMetadata } from './pinata'
import { createPublicClient, createWalletClient, http, parseAbi } from 'viem'
import { polygon } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

function getClients() {
  const pk = process.env.MINTER_PRIVATE_KEY
  if (!pk) throw new Error('MINTER_PRIVATE_KEY env var not set')
  const account = privateKeyToAccount(pk as `0x${string}`)
  const transport = http(process.env.ALCHEMY_RPC_URL!)
  const publicClient = createPublicClient({ chain: polygon, transport })
  const walletClient = createWalletClient({ account, chain: polygon, transport })
  return { publicClient, walletClient, account }
}

const NFT_ABI = parseAbi([
  'function mintSovereignAsset(address to, string uri, string serialNumber, string rarityTier) returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  'event AssetMinted(uint256 indexed tokenId, string serialNumber, string rarityTier, address indexed owner)',
  'event ProvenanceUpdated(uint256 indexed tokenId, address indexed previousOwner, address indexed newOwner)',
])

function getContractAddress() {
  const addr = process.env.NFT_CONTRACT_ADDRESS
  if (!addr || addr === 'PENDING_DEPLOYMENT') throw new Error('NFT_CONTRACT_ADDRESS not configured')
  return addr as `0x${string}`
}

export const RARITY_TIERS = {
  COMMON:     { label: 'COMMON',     royalty: 500,  score: 10  },
  ELITE:      { label: 'ELITE',      royalty: 700,  score: 25  },
  ROYAL:      { label: 'ROYAL',      royalty: 800,  score: 50  },
  IMPERIAL:   { label: 'IMPERIAL',   royalty: 900,  score: 80  },
  FOUNDERS:   { label: 'FOUNDERS',   royalty: 1000, score: 150 },
  ONE_OF_ONE: { label: 'ONE-OF-ONE', royalty: 1000, score: 300 },
}

export function generateSimpleArtworkURL(serial: string, rarity: string): string {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME || 'dvsjiufdv'
  const r = encodeURIComponent(rarity)
  const s = encodeURIComponent(serial)
  return `https://res.cloudinary.com/${cloud}/image/upload/b_rgb:050505,h_1000,w_1000,c_fill/l_text:Arial_Bold_48:${r},co_rgb:c9a054,g_north,y_80/l_text:Arial_28:${s},co_rgb:c9a054,g_center/l_text:Arial_Bold_20:SHAMIM%20FOREVER,co_rgb:888880,g_south,y_80/v1/sovereign-base`
}

export function buildMetadata(params: {
  productName: string
  serial: string
  rarityTier: string
  category: string
  imageIpfsUrl: string
  craftOrigin: string
  manufactureDate: string
  ownershipCycle?: number
}): NFTMetadata {
  const { productName, serial, rarityTier, category, imageIpfsUrl, craftOrigin, manufactureDate, ownershipCycle = 1 } = params
  return {
    name: `${productName} — ${rarityTier} Edition`,
    description: `A Sovereign Asset certified by The House of Shamim Forever. This token grants digital provenance, verified ownership history, and VVIP institutional access to the ${category} collection.`,
    image: imageIpfsUrl,
    external_url: `https://shamimforever-api-server.vercel.app/authenticate?serial=${serial}`,
    background_color: '050505',
    attributes: [
      { trait_type: 'Category', value: category },
      { trait_type: 'Serial Number', value: serial },
      { trait_type: 'Rarity Tier', value: rarityTier },
      { trait_type: 'Sovereign Status', value: 'Active Passport' },
      { trait_type: 'Physical Authenticity', value: '100/100 (Sovereign Seal)' },
      { trait_type: 'Craftsmanship Origin', value: craftOrigin },
      { trait_type: 'Manufacture Date', value: manufactureDate },
      { trait_type: 'Ownership Cycle Count', value: ownershipCycle, display_type: 'number' },
    ],
    unlockable_content: {
      description: 'Authentic Owners only. Access your House Vault to stream atelier footage, fragrance compositions, concierge request, and refill schedules.',
      vault_gate_url: 'https://shamimforever-api-server.vercel.app/vault',
    },
  }
}

export async function mintSovereignNFT(params: {
  toAddress: string
  productName: string
  serial: string
  rarityTier: string
  category: string
  craftOrigin?: string
  manufactureDate?: string
}): Promise<{ txHash: string; tokenId: string; metadataUrl: string; artworkIpfs: string }> {
  const {
    toAddress, productName, serial, rarityTier, category,
    craftOrigin = 'Karachi Sovereign Atelier',
    manufactureDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
  } = params

  // 1. Generate artwork URL via Cloudinary
  const artworkCloudinaryUrl = generateSimpleArtworkURL(serial, rarityTier)

  // 2. Upload artwork to IPFS (fallback to Cloudinary URL if fails)
  let artworkIpfs = artworkCloudinaryUrl
  try {
    artworkIpfs = await uploadImageURLToIPFS(artworkCloudinaryUrl, `${serial}-artwork`)
  } catch {
    console.warn('IPFS artwork upload failed, using Cloudinary URL')
  }

  // 3. Build + upload metadata JSON to IPFS
  const metadata = buildMetadata({ productName, serial, rarityTier, category, imageIpfsUrl: artworkIpfs, craftOrigin, manufactureDate })
  const metadataUrl = await uploadMetadataToIPFS(metadata)

  // 4. Mint on Polygon Mainnet
  const { walletClient, publicClient, account } = getClients()
  const contractAddress = getContractAddress()

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi: NFT_ABI,
    functionName: 'mintSovereignAsset',
    args: [toAddress as `0x${string}`, metadataUrl, serial, rarityTier],
    account,
  })

  // 5. Wait for receipt
  const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 2 })

  // 6. Extract tokenId from logs
  let tokenId = '0'
  if (receipt.logs && receipt.logs.length > 0) {
    const lastLog = receipt.logs[receipt.logs.length - 1]
    if (lastLog?.topics[1]) {
      tokenId = BigInt(lastLog.topics[1]).toString()
    }
  }

  return { txHash: hash, tokenId, metadataUrl, artworkIpfs }
}

export async function getWalletNFTs(walletAddress: string): Promise<{ tokenId: string; tokenURI: string }[]> {
  try {
    const { publicClient } = getClients()
    const contractAddress = getContractAddress()

    const balance = await publicClient.readContract({
      address: contractAddress, abi: NFT_ABI, functionName: 'balanceOf',
      args: [walletAddress as `0x${string}`],
    }) as bigint

    const nfts: { tokenId: string; tokenURI: string }[] = []
    const count = Number(balance)
    for (let i = 0; i < count; i++) {
      const tokenId = await publicClient.readContract({
        address: contractAddress, abi: NFT_ABI, functionName: 'tokenOfOwnerByIndex',
        args: [walletAddress as `0x${string}`, BigInt(i)],
      }) as bigint
      const uri = await publicClient.readContract({
        address: contractAddress, abi: NFT_ABI, functionName: 'tokenURI',
        args: [tokenId],
      }) as string
      nfts.push({ tokenId: tokenId.toString(), tokenURI: uri })
    }
    return nfts
  } catch {
    return []
  }
}

export function calculateSovereignRank(rarities: string[]): { rank: string; score: number } {
  const SCORES: Record<string, number> = { COMMON: 10, ELITE: 25, ROYAL: 50, IMPERIAL: 80, FOUNDERS: 150, 'ONE-OF-ONE': 300 }
  const score = rarities.reduce((sum, r) => sum + (SCORES[r] || 10), 0)
  let rank = 'Associate'
  if (score >= 500) rank = 'Founder'
  else if (score >= 250) rank = 'Imperial'
  else if (score >= 100) rank = 'Royal'
  else if (score >= 50) rank = 'Sovereign'
  else if (score >= 20) rank = 'Elite'
  return { rank, score }
}
