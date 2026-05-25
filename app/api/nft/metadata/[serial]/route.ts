import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface AssetEntry {
  name: string; description: string; rarity: string; tier: string
  price: string; usd: number; tokenId: number; txHash: string
  origin: string; material: string; concentration: string
  notes: string; volume: string; edition: string; year: number
  serial: string
}

const GENESIS: Record<string, AssetEntry> = {
  'SF-FND-0001': {
    name: "SHAMIM'S GHOST — FOUNDERS SOVEREIGN EDITION",
    description: "The genesis sovereign asset of The House of Shamim Forever. A blockchain-authenticated ultra-luxury fragrance passport permanently preserved on Polygon. Grants provenance verification, sovereign ownership rights, concierge privileges, restoration eligibility, digital inheritance access, and future Founders Circle utility within the House ecosystem. This is not a collectible. It is a sovereign identity object.",
    rarity: 'Founders Sovereign', tier: 'FOUNDERS',
    price: '$150,000 USD', usd: 150000, tokenId: 4,
    txHash: '0xb15155afb209fc6568c3e4337be4a78d4cbc604df82bf8d63bbd1b7b5e8d3e79',
    origin: 'Karachi Sovereign Atelier', material: 'Black Pakistani Oud & Kashmiri Saffron',
    concentration: 'Pure Parfum (43%)', notes: 'Black Pakistani Oud, Kashmiri Saffron, Grasse Rose, Sacred Amber',
    volume: '50ml Obsidian Crystal Flacon', edition: 'Founders Legacy — 1 of 1', year: 2026,
    serial: 'SF-FND-0001',
  },
  'SF-SG-2026-00005': {
    name: "Shamim's Ghost — Eternal Legacy",
    description: "The founder's eternal signature. Black Pakistani oud harvested from century-old agarwood trees, Kashmiri saffron threads, and a heart of Grasse rose absolute. This Founders Legacy edition carries the founder's own scent memory preserved forever on-chain.",
    rarity: 'Eternal Legacy', tier: 'FOUNDERS',
    price: '$150,000 USD', usd: 150000, tokenId: 4,
    txHash: '0xb15155afb209fc6568c3e4337be4a78d4cbc604df82bf8d63bbd1b7b5e8d3e79',
    origin: 'Karachi, Pakistan', material: 'Black Oud & Kashmiri Saffron',
    concentration: 'Pure Parfum (43%)', notes: 'Black Pakistani Oud, Kashmiri Saffron, Grasse Rose, Amber',
    volume: '50ml Obsidian Crystal Flacon', edition: 'Founders Legacy — 1 of 1', year: 2026,
    serial: 'SF-SG-2026-00005',
  },
  'SF-IK-2026-00001': {
    name: 'Sacred Incense of Kyoto — Imperial Cut',
    description: 'An Imperial masterpiece inspired by the sacred incense rituals of ancient Kyoto temples. Rare Japanese oud, aged hinoki wood, and ceremonial benzoin form an olfactory monument. Each bottle is hand-lacquered by master artisans and numbered in 24K gold.',
    rarity: 'Imperial Cut', tier: 'IMPERIAL',
    price: '$85,000 USD', usd: 85000, tokenId: 0,
    txHash: '0x371c524942d3eb27dc0935b9d6d989c1d91dc9517b0872598a7ce77f85cf1dac',
    origin: 'Kyoto, Japan', material: 'Agarwood & Hinoki',
    concentration: 'Pure Parfum (40%)', notes: 'Japanese Oud, Hinoki Wood, Sacred Benzoin, Temple Incense',
    volume: '50ml Crystal Flacon', edition: 'Imperial Registry — 1 of 3', year: 2026,
    serial: 'SF-IK-2026-00001',
  },
  'SF-BL-2026-00002': {
    name: 'Sapphire Blue Levant — Royal Heritage',
    description: 'A Royal Heritage masterwork capturing the blue Mediterranean light of the Levant coast. Rare Taif rose absolute, sea salt accords, and a base of 40-year aged sandalwood.',
    rarity: 'Royal Heritage', tier: 'ROYAL',
    price: '$65,000 USD', usd: 65000, tokenId: 1,
    txHash: '0xe5708e2790ec34982bdced5bd50c531456c0022b102a54a5a55c889b28228d27',
    origin: 'Damascus, Syria', material: 'Taif Rose & Sandalwood',
    concentration: 'Pure Parfum (38%)', notes: 'Taif Rose Absolute, Sea Salt, Aged Sandalwood, Iris Root',
    volume: '75ml Handblown Glass', edition: 'Royal Archive — 1 of 5', year: 2026,
    serial: 'SF-BL-2026-00002',
  },
  'SF-VA-2026-00003': {
    name: 'SF Vanilla Absolute — Founders Edition',
    description: "A Founders Edition of transcendent luxury. Tahitian vanilla absolute extracted through a proprietary cold-process, blended with Madagascan ylang-ylang and a base of white ambergris.",
    rarity: 'Founders Edition', tier: 'FOUNDERS',
    price: '$120,000 USD', usd: 120000, tokenId: 2,
    txHash: '0x78ad0a9bb4a40b29947fee16bf763edeccda76497ef8da3a65bdf5b70be1a45b',
    origin: 'Tahiti & Madagascar', material: 'Vanilla Absolute & Ambergris',
    concentration: 'Pure Parfum (42%)', notes: 'Tahitian Vanilla, White Ambergris, Ylang-Ylang, Musk Absolute',
    volume: '100ml Gold-Dipped Flacon', edition: 'Founders Archive — 1 of 2', year: 2026,
    serial: 'SF-VA-2026-00003',
  },
  'SF-MI-2026-00004': {
    name: 'Midnight Iris Royale — Bespoke Masterpiece',
    description: 'One-of-one bespoke masterpiece. Florentine iris concrete aged 12 years in French oak, midnight patchouli from Sumatra, and Ethiopian civet absolute. The only bottle in existence.',
    rarity: 'Bespoke Masterpiece', tier: 'ONE-OF-ONE',
    price: '$250,000 USD', usd: 250000, tokenId: 3,
    txHash: '0x22a4748cec69f73d3d0d6b80a46b4ec775662aeaeed949e38649e120a06e7dc7',
    origin: 'Florence, Italy', material: '12yr Iris Concrete & Civet',
    concentration: 'Extrait (45%)', notes: 'Florentine Iris, Aged Patchouli, Ethiopian Civet, French Oak',
    volume: '30ml Hand-Engraved Baccarat Crystal', edition: 'Absolute Unique — 1 of 1', year: 2026,
    serial: 'SF-MI-2026-00004',
  },
  'SF-RN-2026-00006': {
    name: "Sovereign Rose Noir — Elite Atelier Selection",
    description: 'An Elite Atelier selection of extraordinary distinction. Midnight-harvested Turkish rose de mai, blackened with rare oud smoke and set upon a base of Haitian vetiver.',
    rarity: 'Elite Atelier Selection', tier: 'ELITE',
    price: '$55,000 USD', usd: 55000, tokenId: 5,
    txHash: '0x881e1479264af6137b3c448da602874daed2242f66a6e5e970c2a8e2eacd7e4a',
    origin: 'Istanbul, Turkey', material: 'Rose de Mai & Oud Smoke',
    concentration: 'Pure Parfum (37%)', notes: 'Turkish Rose de Mai, Oud Smoke, Haitian Vetiver, Dark Musk',
    volume: '50ml Noir Crystal Flacon', edition: 'Elite Selection — 1 of 7', year: 2026,
    serial: 'SF-RN-2026-00006',
  },
  'SF-OC-2026-00007': {
    name: 'The Orakzai Crest Amber — 1/1 Vault Piece',
    description: "One-of-one vault masterpiece honouring the ancient Orakzai tribal heritage. Fossilized amber from the Baltic coast, 60-year aged Mysore sandalwood, and a secret formula from the founder's ancestral lineage.",
    rarity: '1/1 Vault Piece', tier: 'ONE-OF-ONE',
    price: '$500,000 USD', usd: 500000, tokenId: 6,
    txHash: '0x34a2d12c379f093596e422a4a6f7fee322c91d651b39ff1e07e684b2fb914230',
    origin: 'Orakzai, KPK, Pakistan', material: 'Baltic Amber & 60yr Mysore Sandalwood',
    concentration: 'Extrait (47%)', notes: 'Baltic Amber, Aged Mysore Sandalwood, Tribal Oud, Sacred Resin',
    volume: '20ml Hand-Carved Amber Crystal', edition: 'Absolute Unique — 1 of 1', year: 2026,
    serial: 'SF-OC-2026-00007',
  },
  'SF-MO-2026-00008': {
    name: 'Majestic Oud Supreme — Imperial Registry',
    description: 'The most powerful oud composition in the Shamim Forever canon. Wild Cambodian oud oil aged 25 years, Yemeni frankincense absolute, and a foundation of Ethiopian civet.',
    rarity: 'Imperial Registry', tier: 'IMPERIAL',
    price: '$95,000 USD', usd: 95000, tokenId: 7,
    txHash: '0xc514b2142080169e2826daad1362476d6b25c612831ab2f24fdf91c1e70a0ccb',
    origin: 'Phnom Penh, Cambodia', material: '25yr Wild Oud & Frankincense',
    concentration: 'Extrait (46%)', notes: '25yr Wild Cambodian Oud, Yemeni Frankincense, Civet, Dark Amber',
    volume: '50ml Imperial Crystal Flacon', edition: 'Imperial Registry — 1 of 3', year: 2026,
    serial: 'SF-MO-2026-00008',
  },
  'SF-CM-2026-00009': {
    name: 'Celestial Musk Signet — Atelier Archive',
    description: 'A Royal Heritage masterwork of pure luminosity. White musk from Kannauj India, ethereal ambrette seed absolute, and a crystalline base of Himalayan cedar.',
    rarity: 'Atelier Archive', tier: 'ROYAL',
    price: '$75,000 USD', usd: 75000, tokenId: 8,
    txHash: '0x795f5954fc7e59c45bf586ec3d14599cc36bc7df5f85ab68420817371b598aed',
    origin: 'Kannauj, India', material: 'White Musk & Himalayan Cedar',
    concentration: 'Pure Parfum (38%)', notes: 'White Indian Musk, Ambrette Seed, Himalayan Cedar, Orris',
    volume: '75ml Royal Crystal Flacon', edition: 'Royal Archive — 1 of 5', year: 2026,
    serial: 'SF-CM-2026-00009',
  },
  'SF-IO-2026-00010': {
    name: 'Sovereign Infinite Oud — Grand Finale',
    description: 'The Grand Finale. A one-of-one perfume that transcends valuation. Oud oil from a single tree felled in Assam in 1963, preserved for 60 years, combined with aged rose absolute from the 1985 Grasse harvest.',
    rarity: 'Grand Finale Asset', tier: 'ONE-OF-ONE',
    price: '$1,000,000 USD', usd: 1000000, tokenId: 9,
    txHash: '0x14035a0a7834c0120ad5c93ddfd06f6a62a5567efa75471453b53e6f73f06574',
    origin: 'Assam, India — 1963 Harvest', material: '60yr Assam Oud & 1985 Grasse Rose',
    concentration: 'Extrait (50%)', notes: '1963 Assam Oud, 1985 Grasse Rose Absolute, White Civet, Sacred Amber',
    volume: '10ml Hand-Blown Venetian Glass', edition: 'Absolute Unique — 1 of 1', year: 2026,
    serial: 'SF-IO-2026-00010',
  },
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { serial: string } }
) {
  const serial = params.serial.toUpperCase().replace(/\.json$/i, '')
  const asset = GENESIS[serial]

  if (!asset) {
    return NextResponse.json({ error: 'NFT not found', serial }, { status: 404 })
  }

  const imageURL = 'https://shamimforever-api-server.vercel.app/api/nft/artwork/' + serial
  const authenticateURL = 'https://shamimforever-api-server.vercel.app/authenticate/' + serial
  const polygonscanURL = 'https://polygonscan.com/tx/' + asset.txHash
  const openSeaURL = 'https://opensea.io/assets/matic/0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640/' + asset.tokenId

  const metadata = {
    name: asset.name,
    description: asset.description + '\n\nAuthentic Shamim Forever Sovereign Asset. Contract: 0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640 on Polygon Mainnet. Verified on-chain: ' + polygonscanURL,
    image: imageURL,
    external_url: authenticateURL,
    background_color: '000000',
    attributes: [
      { trait_type: 'Category', value: 'Sovereign Fragrance Asset' },
      { trait_type: 'Edition', value: asset.rarity },
      { trait_type: 'Rarity Tier', value: asset.tier },
      { trait_type: 'Serial Number', value: serial },
      { trait_type: 'Token ID', value: String(asset.tokenId) },
      { trait_type: 'USD Value', display_type: 'number', value: asset.usd },
      { trait_type: 'Price', value: asset.price },
      { trait_type: 'Craftsmanship Origin', value: asset.origin },
      { trait_type: 'Material', value: asset.material },
      { trait_type: 'Concentration', value: asset.concentration },
      { trait_type: 'Fragrance Notes', value: asset.notes },
      { trait_type: 'Volume', value: asset.volume },
      { trait_type: 'Blockchain', value: 'Polygon Mainnet' },
      { trait_type: 'Authenticity', value: 'Verified Sovereign Asset' },
      { trait_type: 'Physical Pairing', value: 'Matched Luxury Fragrance Object' },
      { trait_type: 'Ownership Cycle', display_type: 'number', value: 1 },
      { trait_type: 'Access Level', value: asset.tier === 'FOUNDERS' || asset.tier === 'ONE-OF-ONE' ? 'Founder Sovereign Circle' : 'Sovereign Member' },
      { trait_type: 'Standard', value: 'ERC-721' },
    ],
    properties: {
      collection: 'Shamim Forever Sovereign Assets',
      contract: '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640',
      tx_hash: asset.txHash,
      minted_to: '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7',
    },
  }

  return NextResponse.json(metadata, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
