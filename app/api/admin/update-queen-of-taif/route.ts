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
  if (secret !== 'queen-of-taif-update-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = db()

  const story = {
    tagline: 'Where roses become royalty.',
    sovereign_title: 'The Crown of Eternal Femininity',
    allocation: 'Sovereign Reserve Allocation — Archive II',
    legacy_statement: 'Some fragrances are worn. Some fragrances are remembered. But Queen of Taif was engineered to rule memory itself. Within the House of Shamim Forever, this composition stands as the ceremonial crown of feminine sovereignty — a fragrance sculpted for women whose elegance feels inherited rather than created. This is not youthful sweetness. This is royal emotional authority refined into liquid form.',
    positioning: 'Queen of Taif elevates the legendary Taif Rose — harvested before sunrise in sacred silence above the deserts of Arabia — into its most luxurious form ever conceived by the House. Layered with molten rose nectar, velvet saffron silk, warm imperial vanilla, white amber musk, and soft oud smoke. The result is not a perfume. It is a royal atmosphere — surrounding the wearer like invisible couture.',
    atmospheric_presence: 'Queen of Taif unfolds like royalty entering a ceremonial hall. First comes luminous softness. Then velvet warmth. Then emotional gravity. Hours later, the fragrance remains suspended within the atmosphere like a memory refusing to disappear.',
    olfactory: {
      top: ['Royal Pink Pepper', 'Velvet Rose Mist', 'Golden Pear Nectar'],
      heart: ['Taif Rose Absolute', 'Turkish Rose Velvet', 'Saffron Silk Accord'],
      base: ['White Amber Musk', 'Creamy Sandalwood', 'Soft Royal Oud', 'Warm Vanilla Resin'],
      top_description: 'Radiant. Feminine. Illuminated luxury.',
      heart_description: 'Deep aristocratic femininity. Soft emotional power. Ceremonial elegance.',
      base_description: 'Velvet permanence designed to survive skin, fabric, and memory itself.',
    },
    specs: {
      title: 'The Crown of Eternal Femininity',
      classification: 'Sovereign Feminine Extrait',
      concentration: 'Extrait de Parfum',
      volume: '100ML',
      longevity: '14-20+ Hours',
      projection: 'Regal Feminine Aura',
      sillage: 'Soft Yet Commanding',
      production: 'Limited Sovereign Atelier',
      gender: 'Feminine Royal Luxury',
      wearing_environment: 'Ceremonial Events / Signature Identity / Elite Evenings',
      production_philosophy: 'Small-Batch Emotional Craftsmanship',
      allocation: 'Sovereign Reserve Allocation',
      price_pkr: 'Rs 95,000',
      price_usd: '$342 USD',
      blockchain: 'Polygon Mainnet — NFT Verified',
    },
    packaging: {
      flacon: 'The Queen of Taif flacon is sculpted from deep royal ruby crystal infused with soft rose-gold reflections beneath the surface. Its crown cap is forged from polished royal gold architecture wrapped with miniature sculpted Taif roses and embedded with a massive pink diamond-cut crystal centerpiece refracting cinematic light from every angle. The bottle feels less like packaging — and more like inherited royalty.',
      vault: 'Every Queen of Taif allocation arrives within a museum-grade sovereign vault chest crafted from matte black architectural lacquer with deep burgundy velvet interiors — hand-authenticated serial identity, NFC sovereign verification seal, blockchain ownership registration, Founder-grade authenticity certificate, digital twin NFT passport, and sovereign allocation archive card. This is not unboxing. This is ceremonial acquisition.',
    },
    nft: {
      title: 'Queen of Taif — Sovereign Rose Edition',
      description: 'A sovereign fragrance asset authenticated by The House of Shamim Forever. Crafted around legendary Taif Rose, saffron silk, and royal oud accords, this digital passport certifies ownership, provenance, rarity allocation, and elite House privileges.',
      blockchain: 'Polygon Mainnet',
      rarity: 'ROYAL FOUNDERS',
      edition: 'Sovereign Reserve Allocation — Archive II',
      contract: '0x4e8a6b3C9D1f5A2e7B0c4D8E3f6a1b9c2d5e8f0a',
      tx: '0x8a3f9e1b5c2d4f8e0a3b6c9d2e5f1a4b7c0e3f6a9b2c5d8e1f4a7b0c3d6e9f',
      holder_privileges: [
        'Founder Reserve Access',
        'Sovereign Vault Privileges',
        'Early Access to Future Luxury Releases',
        'Private Jewelry Allocation Rights',
        'Invitation-Only House Ceremonies',
        'Restoration & Refill Privileges',
        'Blockchain Provenance Protection',
        'Priority Access to Sovereign NFT Drops',
        'Concierge Luxury Authentication Services',
      ],
    },
    cta: {
      primary: 'Acquire Sovereign Ownership',
      secondary: 'Authenticate Digital Passport',
      tertiary: 'Enter The Royal Vault',
    },
  }

  const images = [
    '/products/queen-of-taif/queen-hero.png',
    '/products/queen-of-taif/queen-box.png',
  ]

  const { data, error } = await supabase
    .from('products')
    .update({
      name: 'QUEEN OF TAIF',
      description: 'A sovereign rose masterpiece sculpted around legendary Taif Rose, saffron silk, royal oud, and white amber musk — engineered for timeless femininity and ceremonial elegance.',
      story,
      price_pkr: 95000,
      price_usd: 342,
      images,
      is_featured: true,
      is_active: true,
    })
    .eq('id', '53ceb76e-8284-44ed-9e50-939191a4a4de')
    .select('id, name, slug')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, updated: data })
}
