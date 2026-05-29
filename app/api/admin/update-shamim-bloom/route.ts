import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== 'shamim-bloom-update-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = db()

  const story = {
    tagline: 'Love does not fade; it blooms into eternity.',
    positioning: 'Shamim Bloom was conceived as an eternal feminine archive — a liquid monument dedicated to grace powerful enough to outlive memory itself. Inside the House of Shamim Forever, fragrance is treated not as cosmetic luxury, but as emotional architecture. Every molecule within Shamim Bloom exists to preserve permanence: permanence of presence, permanence of identity, permanence of love. This is the scent of a woman whose silence carries more authority than noise ever could. She does not seek attention. She transforms atmosphere.',
    legacy_statement: 'Shamim Bloom was born not from commerce but from consecration. A scent commissioned from within the highest archives of the House — dedicated to feminine power preserved in liquid form across generations. The bottle was not designed. It was forged. Every allocation is a permanent record. A cultural artefact. A sovereign heirloom. In years to come, collectors will point to this moment as the origin of modern Arabian luxury fragrance heritage. You are not purchasing a perfume. You are claiming the founding chapter of an eternal archive.',
    olfactory: {
      top: ['Velvet Peony', 'White Rose Silk', 'Soft Blush Accord'],
      heart: ['Taif Rose Absolute', 'Turkish Rose Resin', 'Imperial Floral Nectar'],
      base: ['White Ambergris', 'Cashmere Skin Musk', 'Warm Cream Woods'],
      top_description: 'Airy. Feminine. Illuminated elegance.',
      heart_description: 'Deep emotional luxury. Soft dominance. Royal femininity.',
      base_description: 'Velvet permanence engineered to survive fabric, skin, memory, and time itself.',
    },
    specs: {
      title: 'The Sovereign Grace',
      classification: 'Sovereign Feminine Extrait',
      concentration: 'Extrait de Parfum',
      volume: '100ML',
      longevity: '12-18+ Hours',
      projection: 'Elegant Sovereign Aura',
      sillage: 'Soft Yet Commanding',
      production: 'Limited Atelier Production',
      gender: 'Feminine Luxury',
      wearing_environment: 'Royal Events · Black Tie · Signature Identity',
      allocation: 'Founder Reserve Allocation — Archive I',
      price_pkr: 'Rs 85,000',
      price_usd: '$306 USD',
      blockchain: 'Polygon Mainnet — NFT Verified',
      method: 'Small-Batch Sovereign Craftsmanship',
    },
    packaging: {
      description: 'The Shamim Bloom flacon is sculpted from deep translucent amethyst crystal layered with soft blush reflections beneath the surface. Its crown cap is forged in polished royal gold wrapped in miniature sculpted roses and crowned with a massive diamond-cut crystal centerpiece engineered to refract cinematic light in every direction. Every surface is designed to feel inherited rather than manufactured.',
      vault: 'Every Shamim Bloom allocation arrives within a museum-grade presentation vault crafted from matte black lacquered architecture and blush velvet interiors — with hand-authenticated serial identity, NFC sovereign verification seal, blockchain ownership registration, Founder-grade authenticity certificate, digital twin NFT passport, and archive allocation signature.',
    },
    nft: {
      title: 'Shamim Bloom — Velvet Taif & Peony (Founder Sovereign Edition)',
      description: 'Every Shamim Bloom flacon is permanently paired with a sovereign blockchain identity recorded on Polygon Mainnet. The NFT passport certifies: authenticity, ownership, provenance, rarity allocation, archival status, and sovereign privileges. The physical object may travel through generations. The sovereign registry remains eternal.',
      blockchain: 'Polygon Mainnet',
      rarity: 'FOUNDERS',
      edition: 'Founder Reserve Allocation — Archive I',
      contract: '0x4e8a6b3C9D1f5A2e7B0c4D8E3f6a1b9c2d5e8f0a',
      tx: '0x7f3a9e1b5c2d4f8e0a3b6c9d2e5f1a4b7c0e3f6a9b2c5d8e1f4a7b0c3d6e9f',
      holder_privileges: [
        'Founder Archive Access',
        'Sovereign Vault Privileges',
        'Future Reserve Allocations',
        'Private Jewelry Releases',
        'Invitation-Only House Ceremonies',
        'Restoration & Refill Privileges',
        'Blockchain Provenance Protection',
        'Early Access to Sovereign NFT Drops',
        'Priority on Future Ultra-Limited Releases',
      ],
    },
  }

  const images = [
    '/products/shamims-bloom/bloom-hero.png',
    '/products/shamims-bloom/bloom-1.png',
    '/products/shamims-bloom/bloom-2.png',
    '/products/shamims-bloom/bloom-crown.png',
    '/products/shamims-bloom/bloom-clean.png',
    '/products/shamims-bloom/bloom-3.png',
    '/products/shamims-bloom/bloom-4.png',
  ]

  const updates = {
    name: 'SHAMIM BLOOM — Velvet Taif & Peony',
    description: 'A sovereign floral masterpiece sculpted around legendary Taif Rose, velvet peony accords, and white ambergris — engineered for timeless femininity, quiet power, and eternal presence.',
    story,
    price_pkr: 85000,
    price_usd: 306,
    images,
    is_featured: true,
    is_active: true,
  }

  // Target the specific perfume product by UUID only
  const { data: byId, error: idErr } = await supabase
    .from('products')
    .update(updates)
    .eq('id', '695e1b4b-07c6-411a-9680-1908be120ad1')
    .select('id, name, slug')

  if (idErr) {
    return NextResponse.json({ error: idErr.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, updated: byId, method: 'by-id' })
}
