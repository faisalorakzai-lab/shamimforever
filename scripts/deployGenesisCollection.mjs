/**
 * SHAMIM FOREVER — Genesis Masterpiece Collection Deployment Script
 * Mints 10 sovereign luxury NFTs to Polygon Mainnet
 * Stores tx hashes + metadata in Supabase
 */

import { createPublicClient, createWalletClient, http, parseAbi } from 'viem'
import { polygon } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const MINTER_PK    = '0x3ff696da215192e0eb8f7143547735b943a0415c57f9a6850c14157e7a9f719c'
const ALCHEMY_RPC  = 'https://polygon-mainnet.g.alchemy.com/v2/c-v-snzVJwVH4JhQHbP6E'
const CONTRACT     = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
const TO_WALLET    = '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7'
const SITE_URL     = 'https://shamimforever-api-server.vercel.app'
const SUPABASE_URL = 'https://uvgtgeauhjbdatrmmaob.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2Z3RnZWF1aGpiZGF0cm1tYW9iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODAyMzc1OCwiZXhwIjoyMDYzNTk5NzU4fQ.placeholder'

// ─── GENESIS COLLECTION ───────────────────────────────────────────────────────
const GENESIS_ASSETS = [
  {
    serial: 'SF-IK-2026-00001',
    name: 'Sacred Incense of Kyoto (Imperial Cut)',
    rarity: 'IMPERIAL',
    category: 'Sacred Fragrance',
    description: 'A sovereign fragrance asset of unparalleled provenance — 100% deep-aged agarwood profile sourced from ancient Kyoto reserves, sealed within an architectural gold-filigree geometric vessel. This token represents absolute olfactory heritage at the highest institutional tier.',
    specs: '100% Provenance rating · Deep aged agarwood profile · Gold-filigree geometric overlay',
    origin: 'Kyoto Reserve Atelier',
    price: '$55,000 USD',
  },
  {
    serial: 'SF-BL-2026-00002',
    name: 'Sapphire Blue Levant (Royal Heritage)',
    rarity: 'ROYAL',
    category: 'Sovereign Crystal Collection',
    description: 'The Levant water of antiquity — distilled into a deep sapphire blue hand-cut crystal decanter of royal provenance. The authentic crown jewel stopper casting is a singular achievement of contemporary luxury craftsmanship.',
    specs: 'Hand-cut crystal decanter · Crown jewel stopper casting · Levantine heritage provenance',
    origin: 'Damascus Crystal House',
    price: '$52,000 USD',
  },
  {
    serial: 'SF-VA-2026-00003',
    name: 'SF Vanilla Absolute (Founders Edition)',
    rarity: 'FOUNDERS',
    category: 'Founders Reserve',
    description: 'The purest absolute — a rich dense resin base of Tahitian vanilla absolute, presented on a hand-polished obsidian plinth of singular beauty. Reserved exclusively for founding sovereign collectors.',
    specs: 'Rich dense absolute resin · Hand-polished obsidian plinth · Founders reserve access',
    origin: 'Tahitian Absolute Laboratory',
    price: '$58,000 USD',
  },
  {
    serial: 'SF-MI-2026-00004',
    name: 'Midnight Iris Royale (Bespoke Masterpiece)',
    rarity: 'ONE-OF-ONE',
    category: '1/1 Bespoke Masterpiece',
    description: 'The singular bespoke masterpiece of the genesis collection. A 24K gold embedded emblem frame houses the midnight iris extraction — the rarest natural absolute in existence. Dynamic ownership age tracking is permanently enabled on-chain.',
    specs: '24K gold embedded emblem frame · Bespoke 1/1 · Dynamic ownership age tracking on-chain',
    origin: 'Sovereign Bespoke Atelier — Karachi',
    price: '$95,000 USD',
  },
  {
    serial: 'SF-SG-2026-00005',
    name: "Shamim's Ghost (Eternal Legacy)",
    rarity: 'FOUNDERS',
    category: 'Eternal Legacy Series',
    description: "The eternal legacy token — Shamim's Ghost grants complete VVIP physical concierge access and immutable physical refill rights validated on-chain. This token is both a fragrance archive and a permanent access credential to The House of Shamim Forever.",
    specs: 'VVIP physical concierge access · Physical refill rights on-chain · Eternal legacy status',
    origin: 'House of Shamim Forever — Sovereign Archive',
    price: '$62,000 USD',
  },
  {
    serial: 'SF-RN-2026-00006',
    name: 'Sovereign Rose Noir (Elite Atelier Selection)',
    rarity: 'ELITE',
    category: 'Atelier Selection',
    description: 'The elite atelier selection — a hand-blown dark amber core vessel of extraordinary depth, accented with Damascus metal casting of institutional precision. The Sovereign Rose Noir represents the pinnacle of the elite tier.',
    specs: 'Hand-blown dark amber core · Damascus metal casting · Elite atelier provenance certificate',
    origin: 'Damascus Metalwork Atelier',
    price: '$50,000 USD',
  },
  {
    serial: 'SF-OC-2026-00007',
    name: 'The Orakzai Crest Amber (1/1 Vault Piece)',
    rarity: 'ONE-OF-ONE',
    category: '1/1 Heritage Vault Piece',
    description: "A vault piece of singular historical significance — deep fossilized raw amber of geological provenance, bearing the custom-engraved Orakzai family heritage crest. The most personal asset in The House's sovereign archive.",
    specs: 'Deep fossilized raw amber · Custom family heritage crest engraving · 1/1 vault certification',
    origin: 'Orakzai Heritage Atelier — Sovereign Commission',
    price: '$88,000 USD',
  },
  {
    serial: 'SF-MO-2026-00008',
    name: 'Majestic Oud Supreme (Imperial Registry)',
    rarity: 'IMPERIAL',
    category: 'Imperial Oud Registry',
    description: 'The imperial registry piece — a centenary aged oil infusion of the rarest Vietnamese Oud, presented beneath heavy textured gold blueprint typography overlay of architectural authority. The Majestic Oud Supreme defines the imperial standard.',
    specs: 'Centenary aged oil infusion · Heavy textured gold blueprint typography · Imperial registry certificate',
    origin: 'Hoi An Centenary Oud Reserve',
    price: '$72,000 USD',
  },
  {
    serial: 'SF-CM-2026-00009',
    name: 'Celestial Musk Signet (Atelier Archive)',
    rarity: 'ROYAL',
    category: 'Royal Atelier Archive',
    description: 'The celestial archive piece — platinum brushed metallic accents frame the white velvet institutional display of this musk signet of royal provenance. An asset designed for the serious institutional collector.',
    specs: 'Platinum brushed metallic accents · White velvet institutional display · Royal signet certification',
    origin: 'Parisian Musk Laboratory — Royal Reserve',
    price: '$54,000 USD',
  },
  {
    serial: 'SF-IO-2026-00010',
    name: 'Sovereign Infinite Oud (Grand Finale Asset)',
    rarity: 'ONE-OF-ONE',
    category: '1/1 Grand Finale',
    description: 'The grand finale — the ultimate pinnacle luxury asset capsule of the Genesis Masterpiece Collection. The Sovereign Infinite Oud carries an immutable diamond-grade certification index and represents the absolute apex of what The House of Shamim Forever can create.',
    specs: 'Ultimate pinnacle luxury capsule · Diamond-grade certification index · Grand finale — 1 of 1 forever',
    origin: 'House of Shamim Forever — Grand Atelier Commission',
    price: '$120,000 USD',
  },
]

const NFT_ABI = parseAbi([
  'function mintSovereignAsset(address to, string uri, string serialNumber, string rarityTier) returns (uint256)',
])

async function sbInsert(table, rows) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(rows),
  })
  return r.json()
}

async function sbUpsert(table, rows, onConflict) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=${onConflict}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(rows),
  })
  return r.json()
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗')
  console.log('║     SHAMIM FOREVER — GENESIS MASTERPIECE COLLECTION           ║')
  console.log('║     Deploying 10 Sovereign NFTs · Polygon Mainnet             ║')
  console.log('╚════════════════════════════════════════════════════════════════╝\n')

  const account = privateKeyToAccount(MINTER_PK)
  const transport = http(ALCHEMY_RPC)
  const publicClient = createPublicClient({ chain: polygon, transport })
  const walletClient = createWalletClient({ account, chain: polygon, transport })

  console.log(`Minter: ${account.address}`)
  console.log(`Recipient: ${TO_WALLET}`)
  console.log(`Contract: ${CONTRACT}\n`)

  const results = []

  for (let i = 0; i < GENESIS_ASSETS.length; i++) {
    const asset = GENESIS_ASSETS[i]
    console.log(`\n[${i+1}/10] Minting: ${asset.name}`)
    console.log(`        Serial: ${asset.serial} | Tier: ${asset.rarity}`)

    try {
      // 1. Build metadata URL (our API serves it dynamically)
      const metadataUrl = `${SITE_URL}/api/nft/metadata/${asset.serial}`
      const artworkUrl  = `${SITE_URL}/api/nft/artwork/${asset.serial}.svg`

      // 2. Pre-populate sovereign_assets in Supabase
      await sbUpsert('sovereign_assets', [{
        serial_number: asset.serial,
        rarity_tier: asset.rarity,
        nft_status: 'minting',
        physical_status: 'vaulted',
        ownership_cycle: 1,
        wallet_address: TO_WALLET,
      }], 'serial_number')

      // 3. Pre-populate products_catalog
      await sbUpsert('products_catalog', [{
        product_id: asset.serial,
        product_name: asset.name,
        category: asset.category,
        rarity_tier: asset.rarity,
        description: asset.description,
        craftsmanship_origin: asset.origin,
        manufacture_date: 'May 2026',
        linked_physical_asset_details: asset.specs,
      }], 'product_id')

      // 4. Mint on-chain
      console.log(`        → Sending mint transaction...`)
      const hash = await walletClient.writeContract({
        address: CONTRACT,
        abi: NFT_ABI,
        functionName: 'mintSovereignAsset',
        args: [TO_WALLET, metadataUrl, asset.serial, asset.rarity],
        account,
      })
      console.log(`        → TX: ${hash}`)

      // 5. Wait for confirmation
      console.log(`        → Waiting for confirmation...`)
      const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 2, timeout: 120_000 })

      // 6. Extract token ID from logs
      let tokenId = i  // fallback
      if (receipt.logs?.length > 0) {
        const log = receipt.logs[receipt.logs.length - 1]
        if (log?.topics[1]) tokenId = Number(BigInt(log.topics[1]))
      }

      console.log(`        ✅ Minted! Token ID: ${tokenId} | Block: ${receipt.blockNumber}`)

      // 7. Update Supabase with real data
      await sbUpsert('sovereign_assets', [{
        serial_number: asset.serial,
        nft_status: 'minted',
        tx_hash: hash,
        token_id: tokenId,
        ipfs_metadata_url: metadataUrl,
        rarity_tier: asset.rarity,
        wallet_address: TO_WALLET,
        ownership_cycle: 1,
        physical_status: 'vaulted',
      }], 'serial_number')

      // 8. Log provenance
      await sbInsert('provenance_ledger', [{
        token_id: tokenId,
        previous_owner: '0x0000000000000000000000000000000000000000',
        new_owner: TO_WALLET,
        transfer_tx_hash: hash,
        physical_shipment_status: 'vaulted',
      }])

      // 9. Update vault_members score
      const SCORES = { COMMON: 10, ELITE: 25, ROYAL: 50, IMPERIAL: 80, FOUNDERS: 150, 'ONE-OF-ONE': 300 }
      const score = results.reduce((s, r) => s + (SCORES[r.rarity] || 10), 0) + (SCORES[asset.rarity] || 10)
      const rank = score >= 500 ? 'Founder' : score >= 250 ? 'Imperial' : score >= 100 ? 'Royal' : score >= 50 ? 'Sovereign' : 'Elite'
      await sbUpsert('vault_members', [{
        wallet_address: TO_WALLET.toLowerCase(),
        total_score: score,
        sovereign_rank: rank,
        updated_at: new Date().toISOString(),
      }], 'wallet_address')

      results.push({
        index: i + 1,
        serial: asset.serial,
        name: asset.name,
        rarity: asset.rarity,
        tokenId,
        txHash: hash,
        metadataUrl,
        artworkUrl,
        opensea: `https://opensea.io/assets/matic/${CONTRACT}/${tokenId}`,
        polygonscan: `https://polygonscan.com/tx/${hash}`,
      })

      // Small delay between mints to avoid nonce issues
      if (i < GENESIS_ASSETS.length - 1) {
        console.log(`        → Waiting 5s before next mint...`)
        await new Promise(r => setTimeout(r, 5000))
      }

    } catch (err) {
      console.error(`        ❌ FAILED: ${err.message}`)
      results.push({ index: i + 1, serial: asset.serial, name: asset.name, rarity: asset.rarity, error: err.message })
    }
  }

  // Final report
  console.log('\n╔════════════════════════════════════════════════════════════════╗')
  console.log('║     GENESIS COLLECTION — DEPLOYMENT REPORT                    ║')
  console.log('╚════════════════════════════════════════════════════════════════╝\n')

  const successful = results.filter(r => r.txHash)
  const failed = results.filter(r => r.error)

  console.log(`✅ Minted: ${successful.length}/10`)
  if (failed.length > 0) console.log(`❌ Failed: ${failed.length}/10`)

  console.log('\n── MINTED ASSETS ──────────────────────────────────────────────')
  for (const r of successful) {
    console.log(`\n#${r.index} ${r.name}`)
    console.log(`   Serial:    ${r.serial}`)
    console.log(`   Token ID:  ${r.tokenId}`)
    console.log(`   Tier:      ${r.rarity}`)
    console.log(`   TX Hash:   ${r.txHash}`)
    console.log(`   OpenSea:   ${r.opensea}`)
    console.log(`   Polygonscan: ${r.polygonscan}`)
  }

  if (failed.length > 0) {
    console.log('\n── FAILED ──────────────────────────────────────────────────────')
    for (const r of failed) console.log(`❌ #${r.index} ${r.serial}: ${r.error}`)
  }

  console.log('\n── COLLECTION ──────────────────────────────────────────────────')
  console.log(`OpenSea Collection: https://opensea.io/collection/shamim-forever-sovereign-assets`)
  console.log(`Contract:           https://polygonscan.com/address/${CONTRACT}`)
  console.log(`Admin Panel:        ${SITE_URL}/admin\n`)
}

main().catch(console.error)
