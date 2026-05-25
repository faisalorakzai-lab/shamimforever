import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Complete Genesis Masterpiece Collection data — no external dependency
const GENESIS: Record<string, {
  name: string; description: string; rarity: string; tier: string
  price: string; usd: number; tokenId: number; txHash: string
  origin: string; material: string; concentration: string
  notes: string; volume: string; edition: string; year: number
}> = {
  'SF-IK-2026-00001': {
    name: 'Sacred Incense of Kyoto',
    description: 'An Imperial masterpiece inspired by the sacred incense rituals of ancient Kyoto temples. Rare Japanese oud, aged hinoki wood, and ceremonial benzoin form an olfactory monument. Each bottle is hand-lacquered by master artisans and numbered in 24K gold.',
    rarity: 'Imperial Cut', tier: 'IMPERIAL',
    price: '$85,000 USD', usd: 85000, tokenId: 0,
    txHash: '0x371c524942d3eb27dc0935b9d6d989c1d91dc9517b0872598a7ce77f85cf1dac',
    origin: 'Kyoto, Japan', material: 'Agarwood & Hinoki',
    concentration: 'Pure Parfum (40%)', notes: 'Japanese Oud, Hinoki Wood, Sacred Benzoin, Temple Incense',
    volume: '50ml Crystal Flacon', edition: 'Imperial Registry — 1 of 3', year: 2026,
  },
  'SF-BL-2026-00002': {
    name: 'Sapphire Blue Levant',
    description: 'A Royal Heritage masterwork capturing the blue Mediterranean light of the Levant coast. Rare Taif rose absolute, sea salt accords, and a base of 40-year aged sandalwood. The sapphire crystal stopper is set by hand in Damascus.',
    rarity: 'Royal Heritage', tier: 'ROYAL',
    price: '$65,000 USD', usd: 65000, tokenId: 1,
    txHash: '0xe5708e2790ec34982bdced5bd50c531456c0022b102a54a5a55c889b28228d27',
    origin: 'Damascus, Syria', material: 'Taif Rose & Sandalwood',
    concentration: 'Pure Parfum (38%)', notes: 'Taif Rose Absolute, Sea Salt, Aged Sandalwood, Iris Root',
    volume: '75ml Handblown Glass', edition: 'Royal Archive — 1 of 5', year: 2026,
  },
  'SF-VA-2026-00003': {
    name: 'SF Vanilla Absolute',
    description: "A Founders Edition of transcendent luxury — Tahitian vanilla absolute extracted through a proprietary cold-process, blended with Madagascan ylang-ylang and a base of white ambergris. Shamim Forever's founding family reserve.",
    rarity: 'Founders Edition', tier: 'FOUNDERS',
    price: '$120,000 USD', usd: 120000, tokenId: 2,
    txHash: '0x78ad0a9bb4a40b29947fee16bf763edeccda76497ef8da3a65bdf5b70be1a45b',
    origin: 'Tahiti & Madagascar', material: 'Vanilla Absolute & Ambergris',
    concentration: 'Pure Parfum (42%)', notes: 'Tahitian Vanilla, White Ambergris, Ylang-Ylang, Musk Absolute',
    volume: '100ml Gold-Dipped Flacon', edition: 'Founders Archive — 1 of 2', year: 2026,
  },
  'SF-MI-2026-00004': {
    name: 'Midnight Iris Royale',
    description: 'One-of-one bespoke masterpiece. A singular creation from the Shamim Forever private atelier — Florentine iris concrete aged 12 years in French oak, midnight patchouli from Sumatra, and a throne of Ethiopian civet absolute. The only bottle in existence.',
    rarity: 'Bespoke Masterpiece', tier: 'ONE-OF-ONE',
    price: '$250,000 USD', usd: 250000, tokenId: 3,
    txHash: '0x22a4748cec69f73d3d0d6b80a46b4ec775662aeaeed949e38649e120a06e7dc7',
    origin: 'Florence, Italy', material: '12yr Iris Concrete & Civet',
    concentration: 'Extrait (45%)', notes: 'Florentine Iris, Aged Patchouli, Ethiopian Civet, French Oak',
    volume: '30ml Hand-Engraved Baccarat Crystal', edition: 'Absolute Unique — 1 of 1', year: 2026,
  },
  'SF-SF-2026-00005': { name: 'Shamim's Ghost', description: '', rarity: 'Eternal Legacy', tier: 'FOUNDERS', price: '$150,000 USD', usd: 150000, tokenId: 4, txHash: '0xb15155afb209fc6568c3e4337be4a78d4cbc604df82bf8d63bbd1b7b5e8d3e79', origin: 'Karachi, Pakistan', material: 'Black Oud & Rose', concentration: 'Pure Parfum (41%)', notes: 'Black Oud, Pakistani Rose, Saffron, Musk', volume: '50ml Obsidian Flacon', edition: 'Founders Legacy — 1 of 2', year: 2026 },
  'SF-SG-2026-00005': {
    name: "Shamim's Ghost",
    description: "The founder's eternal signature — black Pakistani oud harvested from century-old agarwood trees, Kashmiri saffron threads, and a heart of Grasse rose absolute. This Founders Legacy edition is Shamim Forever's most personal creation, carrying the founder's own scent memory.",
    rarity: 'Eternal Legacy', tier: 'FOUNDERS',
    price: '$150,000 USD', usd: 150000, tokenId: 4,
    txHash: '0xb15155afb209fc6568c3e4337be4a78d4cbc604df82bf8d63bbd1b7b5e8d3e79',
    origin: 'Karachi, Pakistan', material: 'Black Oud & Kashmiri Saffron',
    concentration: 'Pure Parfum (43%)', notes: 'Black Pakistani Oud, Kashmiri Saffron, Grasse Rose, Amber',
    volume: '50ml Obsidian Crystal Flacon', edition: 'Founders Legacy — 1 of 2', year: 2026,
  },
  'SF-RN-2026-00006': {
    name: 'Sovereign Rose Noir',
    description: 'An Elite Atelier selection of extraordinary distinction — midnight-harvested Turkish rose de mai, blackened with rare oud smoke and set upon a base of Haitian vetiver. The dark rose that crowns the Shamim collection.',
    rarity: 'Elite Atelier Selection', tier: 'ELITE',
    price: '$55,000 USD', usd: 55000, tokenId: 5,
    txHash: '0x881e1479264af6137b3c448da602874daed2242f66a6e5e970c2a8e2eacd7e4a',
    origin: 'Istanbul, Turkey', material: 'Rose de Mai & Oud Smoke',
    concentration: 'Pure Parfum (37%)', notes: 'Turkish Rose de Mai, Oud Smoke, Haitian Vetiver, Dark Musk',
    volume: '50ml Noir Crystal Flacon', edition: 'Elite Selection — 1 of 7', year: 2026,
  },
  'SF-OC-2026-00007': {
    name: 'The Orakzai Crest Amber',
    description: "One-of-one vault masterpiece honouring the ancient Orakzai tribal heritage of the House of Shamim. Fossilized amber from the Baltic coast, 60-year aged Mysore sandalwood, and a secret formula passed through the founder's ancestral lineage. The most coveted piece in the genesis collection.",
    rarity: '1/1 Vault Piece', tier: 'ONE-OF-ONE',
    price: '$500,000 USD', usd: 500000, tokenId: 6,
    txHash: '0x34a2d12c379f093596e422a4a6f7fee322c91d651b39ff1e07e684b2fb914230',
    origin: 'Orakzai, KPK, Pakistan', material: 'Baltic Amber & 60yr Mysore Sandalwood',
    concentration: 'Extrait (47%)', notes: 'Baltic Amber, Aged Mysore Sandalwood, Tribal Oud, Sacred Resin',
    volume: '20ml Hand-Carved Amber Crystal', edition: 'Absolute Unique — 1 of 1', year: 2026,
  },
  'SF-MO-2026-00008': {
    name: 'Majestic Oud Supreme',
    description: 'Imperial Registry — the most powerful oud composition in the Shamim Forever canon. Wild Cambodian oud oil aged 25 years, Yemeni frankincense absolute, and a foundation of Ethiopian civet. Worn by sovereigns and heads of state.',
    rarity: 'Imperial Registry', tier: 'IMPERIAL',
    price: '$95,000 USD', usd: 95000, tokenId: 7,
    txHash: '0xc514b2142080169e2826daad1362476d6b25c612831ab2f24fdf91c1e70a0ccb',
    origin: 'Phnom Penh, Cambodia', material: '25yr Wild Oud & Frankincense',
    concentration: 'Extrait (46%)', notes: '25yr Wild Cambodian Oud, Yemeni Frankincense, Civet, Dark Amber',
    volume: '50ml Imperial Crystal Flacon', edition: 'Imperial Registry — 1 of 3', year: 2026,
  },
  'SF-CM-2026-00009': {
    name: 'Celestial Musk Signet',
    description: 'A Royal Heritage masterwork of pure luminosity — white musk from Kannauj India, ethereal ambrette seed absolute, and a crystalline base of Himalayan cedar. The lightest and most celestial composition in the collection, worn close to the skin.',
    rarity: 'Atelier Archive', tier: 'ROYAL',
    price: '$75,000 USD', usd: 75000, tokenId: 8,
    txHash: '0x795f5954fc7e59c45bf586ec3d14599cc36bc7df5f85ab68420817371b598aed',
    origin: 'Kannauj, India', material: 'White Musk & Himalayan Cedar',
    concentration: 'Pure Parfum (38%)', notes: 'White Indian Musk, Ambrette Seed, Himalayan Cedar, Orris',
    volume: '75ml Royal Crystal Flacon', edition: 'Royal Archive — 1 of 5', year: 2026,
  },
  'SF-IO-2026-00010': {
    name: 'Sovereign Infinite Oud',
    description: 'The Grand Finale — a one-of-one perfume that transcends valuation. Oud oil from a single tree felled in Assam in 1963, preserved for 60 years, combined with aged rose absolute from 1985 Grasse harvest. The apex of all oud perfumery. The most expensive perfume NFT in history.',
    rarity: 'Grand Finale Asset', tier: 'ONE-OF-ONE',
    price: '$1,000,000 USD', usd: 1000000, tokenId: 9,
    txHash: '0x14035a0a7834c0120ad5c93ddfd06f6a62a5567efa75471453b53e6f73f06574',
    origin: 'Assam, India (1963 Harvest)', material: '60yr Assam Oud & 1985 Grasse Rose',
    concentration: 'Extrait (50%)', notes: '1963 Assam Oud, 1985 Grasse Rose Absolute, White Civet, Sacred Amber',
    volume: '10ml Hand-Blown Venetian Glass', edition: 'Absolute Unique — 1 of 1', year: 2026,
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

  const imageURL = `https://shamimforever-api-server.vercel.app/api/nft/artwork/${serial}`
  const polygonscanURL = `https://polygonscan.com/tx/${asset.txHash}`
  const openSeaURL = `https://opensea.io/assets/matic/0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640/${asset.tokenId}`

  const metadata = {
    name: `${asset.name} — Shamim Forever #${asset.tokenId}`,
    description: asset.description + `\n\nAuthentic Shamim Forever Genesis Masterpiece. Contract: 0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640 on Polygon Mainnet. Minted on-chain: ${polygonscanURL}`,
    image: imageURL,
    external_url: openSeaURL,
    background_color: '050505',
    attributes: [
      { trait_type: 'Rarity', value: asset.rarity },
      { trait_type: 'Tier', value: asset.tier },
      { trait_type: 'Serial Number', value: serial },
      { trait_type: 'Token ID', value: `#${asset.tokenId}` },
      { trait_type: 'USD Value', display_type: 'number', value: asset.usd },
      { trait_type: 'Price', value: asset.price },
      { trait_type: 'Origin', value: asset.origin },
      { trait_type: 'Material', value: asset.material },
      { trait_type: 'Concentration', value: asset.concentration },
      { trait_type: 'Volume', value: asset.volume },
      { trait_type: 'Edition', value: asset.edition },
      { trait_type: 'Fragrance Notes', value: asset.notes },
      { trait_type: 'Collection', value: 'Genesis Masterpiece 2026' },
      { trait_type: 'Year', display_type: 'number', value: asset.year },
      { trait_type: 'Physical Asset', value: 'Vaulted — Karachi Sovereign Atelier' },
      { trait_type: 'Blockchain', value: 'Polygon Mainnet' },
      { trait_type: 'Standard', value: 'ERC-721' },
    ],
    properties: {
      collection: 'Shamim Forever Genesis Masterpiece Collection',
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
