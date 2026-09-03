import { createWalletClient, createPublicClient, http, parseAbi, type Address } from 'viem'
  import { polygon } from 'viem/chains'
  import { privateKeyToAccount } from 'viem/accounts'

  export const NFT_CONTRACT = (process.env.NFT_CONTRACT_ADDRESS || '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640') as Address
  const POLYGON_RPC = 'https://polygon-rpc.com'

  // Standard OpenZeppelin ERC-721 URIStorage ABI
  const ERC721_ABI = parseAbi([
    'function safeMint(address to, string memory uri) external returns (uint256)',
    'function totalSupply() external view returns (uint256)',
    'function ownerOf(uint256 tokenId) external view returns (address)',
    'function tokenURI(uint256 tokenId) external view returns (string)',
    'function balanceOf(address owner) external view returns (uint256)',
    'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  ])

  export interface NFTMetadata {
    name: string
    description: string
    image: string
    animation_url: string
    external_url: string
    background_color: string
    attributes: Array<{ trait_type: string; value: string | number }>
  }

  const SHAMIM_BLOOM_STORY = `Some fragrances are worn. Some fragrances are admired. But a rare few become part of a person's identity. Shamim Bloom was never created to attract attention. It was created to preserve presence.

  Inside the House of Shamim Forever, fragrance is treated not as beauty — but as emotional architecture. Every accord within Shamim Bloom was sculpted to capture a feeling so profound that it refused to disappear.

  At the center of the composition lies the legendary Taif Rose, harvested before sunrise from the mountains of Taif where survival itself is an act of grace. United with White Ambergris drawn from the mysteries of the sea — one born from the mountains, one born from the ocean — together they create an aura that feels timeless. Soft enough to comfort. Powerful enough to remain unforgettable.

  This is the story of a woman whose elegance becomes permanence. A woman whose silence carries more influence than noise. A woman remembered long after she leaves the room.

  This NFT is your Sovereign Passport — a permanent, irrevocable proof of ownership and authenticity on the Polygon blockchain. It is inseparable from the physical artifact.`

  export function buildNFTMetadata(
    tokenId: number,
    ownerWallet: string,
    archiveNumber: string,
    mintDate: string,
  ): NFTMetadata {
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.shamimforever.com'
    const videoUrl = `${APP_URL}/products/shamims-bloom/shamim-bloom-hero.mp4`
    return {
      name: `Shamim Bloom — Founder Reserve #${String(tokenId).padStart(4, '0')}`,
      description: SHAMIM_BLOOM_STORY,
      image: videoUrl,
      animation_url: videoUrl,
      external_url: `${APP_URL}/products/shamims-bloom`,
      background_color: '000000',
      attributes: [
        { trait_type: 'Collection',           value: 'House of Shamim Forever' },
        { trait_type: 'Product',              value: 'Shamim Bloom' },
        { trait_type: 'Edition',              value: 'Founder Reserve Allocation — Archive I' },
        { trait_type: 'Rarity',              value: 'FOUNDER RESERVE' },
        { trait_type: 'Serial Number',        value: String(tokenId).padStart(4, '0') },
        { trait_type: 'Archive Number',       value: archiveNumber },
        { trait_type: 'Owner Wallet',         value: ownerWallet },
        { trait_type: 'Authentication',       value: 'Polygon Verified' },
        { trait_type: 'Mint Date',            value: mintDate },
        { trait_type: 'Network',              value: 'Polygon Mainnet' },
        { trait_type: 'Standard',             value: 'ERC-721' },
        { trait_type: 'Concentration',        value: 'Extrait de Parfum' },
        { trait_type: 'Volume',               value: '100ML' },
        { trait_type: 'Longevity',            value: '12–18+ Hours' },
        { trait_type: 'Top Notes',            value: 'Velvet Peony · White Rose Silk · Soft Blush Accord' },
        { trait_type: 'Heart Notes',          value: 'Taif Rose Absolute · Turkish Rose Resin · Imperial Floral Nectar' },
        { trait_type: 'Base Notes',           value: 'White Ambergris · Cashmere Skin Musk · Warm Cream Woods' },
        { trait_type: 'Physical Pairing',     value: 'Yes — Verified Bottle' },
        { trait_type: 'Burn Status',          value: 'Non-Burnable' },
        { trait_type: 'Transfer Status',      value: 'Transferable' },
        { trait_type: 'OpenSea Compatible',   value: 'Yes' },
      ],
    }
  }

  export async function getNextTokenId(): Promise<number> {
    try {
      const client = createPublicClient({ chain: polygon, transport: http(POLYGON_RPC) })
      const supply = await client.readContract({
        address: NFT_CONTRACT, abi: ERC721_ABI, functionName: 'totalSupply',
      })
      return Number(supply) + 1
    } catch {
      return (Date.now() % 9000) + 1
    }
  }

  export async function mintNFT(
    toAddress: Address,
    tokenId: number,
    orderRef: string,
  ): Promise<{ txHash: string; tokenId: number }> {
    const pkRaw = process.env.NFT_MINTER_PRIVATE_KEY
    if (!pkRaw) throw new Error('NFT minter not configured')

    const pk = (pkRaw.startsWith('0x') ? pkRaw : `0x${pkRaw}`) as `0x${string}`
    const account = privateKeyToAccount(pk)
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.shamimforever.com'
    const metadataUri = `${APP_URL}/api/nft/metadata/${tokenId}`

    const walletClient = createWalletClient({
      account, chain: polygon, transport: http(POLYGON_RPC),
    })

    const txHash = await walletClient.writeContract({
      address: NFT_CONTRACT,
      abi: ERC721_ABI,
      functionName: 'safeMint',
      args: [toAddress, metadataUri],
    })

    return { txHash, tokenId }
  }

  export async function getNFTOwner(tokenId: number): Promise<string | null> {
    try {
      const client = createPublicClient({ chain: polygon, transport: http(POLYGON_RPC) })
      const owner = await client.readContract({
        address: NFT_CONTRACT, abi: ERC721_ABI, functionName: 'ownerOf', args: [BigInt(tokenId)],
      })
      return owner as string
    } catch {
      return null
    }
  }

  export async function getTokenURI(tokenId: number): Promise<string | null> {
    try {
      const client = createPublicClient({ chain: polygon, transport: http(POLYGON_RPC) })
      const uri = await client.readContract({
        address: NFT_CONTRACT, abi: ERC721_ABI, functionName: 'tokenURI', args: [BigInt(tokenId)],
      })
      return uri as string
    } catch {
      return null
    }
  }
  