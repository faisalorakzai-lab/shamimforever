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
      positioning: 'Shamim Bloom was never created to attract attention. It was created to preserve presence. Inside the House of Shamim Forever, fragrance is treated not as beauty — but as emotional architecture. Every accord within Shamim Bloom was sculpted to capture a feeling so profound that it refused to disappear. A feeling powerful enough to survive memory. A feeling capable of becoming legacy. This is not the story of a fragrance. This is the story of a woman whose elegance becomes permanence — a woman whose silence carries more influence than noise, a woman remembered long after she leaves the room.',
      legacy_statement: 'Some fragrances are worn. Some fragrances are admired. But a rare few become part of a person\'s identity. Shamim Bloom was conceived as an eternal feminine archive — a liquid monument dedicated to grace powerful enough to outlive memory itself. At its center lies the legendary Taif Rose, harvested before the first ray of sunlight touches each petal — one of the most revered flowers ever cultivated, born where survival itself is an act of grace. United with White Ambergris drawn from the mysteries of the sea, together they create an aura that feels timeless. Soft enough to comfort. Powerful enough to remain unforgettable.',
      chapter_title: 'THE BLOOM OF ETERNITY',
      chapter_body: 'Everything in this world eventually fades. Beauty fades. Seasons fade. Moments fade. But true love leaves evidence behind. Hidden within the mountains of Taif, these roses bloom where survival itself becomes an act of grace. Before the first ray of sunlight touches their petals, each bloom is harvested by hand to preserve its living soul. This is not ordinary floral luxury. This is resilience transformed into beauty.',
      atmospheric_presence: 'Shamim Bloom unfolds slowly. First comes tenderness. Then warmth. Then emotional gravity. Hours later, the fragrance remains suspended within the atmosphere like a beautiful memory refusing to leave. Its presence is never loud. Never aggressive. Never temporary. It simply becomes part of the room. Part of the moment. Part of the story. People may forget words. They rarely forget how Shamim Bloom made them feel.',
      olfactory: {
        top: ['Velvet Peony', 'White Rose Silk', 'Soft Blush Accord'],
        heart: ['Taif Rose Absolute', 'Turkish Rose Resin', 'Imperial Floral Nectar'],
        base: ['White Ambergris', 'Cashmere Skin Musk', 'Warm Cream Woods'],
        top_description: 'Elegant. Luminous. Effortlessly feminine.',
        heart_description: 'Refined femininity. Quiet strength. Emotional luxury.',
        base_description: 'Soft permanence. Velvet sophistication. Timeless identity.',
      },
      specs: {
        title: 'The Sovereign Grace',
        classification: 'Sovereign Feminine Extrait',
        concentration: 'Extrait de Parfum',
        volume: '100ML',
        longevity: '12–18+ Hours',
        projection: 'Elegant Sovereign Aura',
        sillage: 'Soft Yet Commanding',
        production: 'Small-Batch Sovereign Craftsmanship',
        gender: 'Feminine Luxury',
        wearing_environment: 'Royal Events · Private Gatherings · Evening Elegance · Signature Identity',
        allocation: 'Founder Reserve Allocation — Archive I',
        authentication: 'Polygon Verified',
        nft_pairing: 'Enabled',
        serial_registry: 'Dynamic',
        production_status: 'Limited Founder Batch',
      },
      packaging: {
        flacon: 'Shamim Bloom is housed within a museum-grade crystal flacon sculpted from deep amethyst glass illuminated by soft blush reflections beneath the surface. Its crown cap is forged in polished royal gold architecture wrapped with sculpted rose detailing and crowned by a diamond-cut crystal centerpiece engineered to capture and refract light from every angle. Every surface was designed to communicate one message: Elegance should feel eternal. The bottle exists not merely as packaging — but as an heirloom object worthy of preservation.',
        vault: 'Every Shamim Bloom allocation arrives within a sovereign presentation chest crafted from matte black lacquer architecture lined with blush velvet interiors. Included: Hand-Authenticated Serial Identity · Founder Reserve Certificate · NFC Authentication Seal · Blockchain Ownership Registration · Digital Twin NFT Passport · Collector Documentation · Archive Allocation Signature. This is not packaging. This is ceremonial presentation.',
      },
      nft: {
        title: 'Shamim Bloom — Founder Reserve Edition',
        description: 'Every authenticated Shamim Bloom allocation receives a permanently linked blockchain identity secured on Polygon Mainnet. The NFT Passport certifies: Authenticity · Ownership · Serial Provenance · Archive Status · Allocation Rarity · Collector History · Future House Privileges. The fragrance may travel through generations. The blockchain registry remains eternal.',
        blockchain: 'Polygon Mainnet',
        rarity: 'FOUNDER RESERVE',
        edition: 'Founder Reserve Allocation — Archive I',
        contract: '0x4e8a6b3C9D1f5A2e7B0c4D8E3f6a1b9c2d5e8f0a',
        attributes: [
          { trait_type: 'Category', value: 'Sovereign Fragrance Asset' },
          { trait_type: 'Collection', value: 'Shamim Bloom' },
          { trait_type: 'Rarity Tier', value: 'FOUNDER RESERVE' },
          { trait_type: 'Authentication', value: 'Polygon Verified' },
          { trait_type: 'Ownership Status', value: 'Active Sovereign Passport' },
          { trait_type: 'Physical Asset Pairing', value: 'Yes' },
          { trait_type: 'Production Allocation', value: 'Limited' },
          { trait_type: 'Craftsmanship Origin', value: 'Karachi Sovereign Atelier' },
          { trait_type: 'Collector Status', value: 'Founder Reserve' },
          { trait_type: 'Concierge Access', value: 'Enabled' },
          { trait_type: 'Archive Status', value: 'Active' },
        ],
        holder_privileges: [
          'Founder Archive Access',
          'Sovereign Vault Membership',
          'Future Reserve Allocations',
          'Private Jewelry Releases',
          'Invitation-Only House Events',
          'Priority Authentication Services',
          'Concierge Refill Program',
          'Lifetime Provenance Protection',
          'Collector Registry Recognition',
          'Early Access To Future Sovereign Releases',
        ],
      },
      cta: {
        primary: 'Acquire Sovereign Ownership',
        secondary: 'Authenticate Digital Passport',
        tertiary: 'Enter The House Vault',
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
      name: 'SHAMIM BLOOM',
      description: 'A sovereign floral masterpiece crafted around legendary Taif Rose and White Ambergris — engineered for timeless femininity, quiet power, and eternal presence.',
      story,
      price_pkr: 85000,
      price_usd: 306,
      images,
      is_featured: true,
      is_active: true,
    }

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
  