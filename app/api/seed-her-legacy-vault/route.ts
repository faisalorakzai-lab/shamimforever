import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== 'shamim-her-legacy-vault-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = db()

  const { data: cats } = await supabase.from('main_categories').select('id, slug')
  const perfumeId = cats?.find(c => c.slug === 'perfume')?.id
  if (!perfumeId) {
    return NextResponse.json({ error: 'Perfume category not found. Run seed-categories first.' }, { status: 400 })
  }

  const { data: subs } = await supabase.from('sub_categories').select('id, slug, name')
  const femaleId = subs?.find(s => s.slug === 'for-her' || s.name?.toLowerCase().includes('her'))?.id ?? null

  const story = {
    tagline: 'HOUSE OF SHAMIM — HER LEGACY VAULT',
    sovereign_title: 'THE ETERNAL FEMININE ARCHIVE',
    legacy_statement: 'Some luxuries are purchased. Some luxuries are inherited. But certain creations transcend ownership itself and become emotional bloodlines passed through generations. Her Legacy Vault was conceived as the highest ceremonial feminine archive within the House of Shamim Forever.',
    philosophy: 'Inside the House, beauty is not treated as cosmetic enhancement. It is treated as legacy architecture. Her Legacy Vault exists for the woman whose presence reshapes atmosphere, memory, and emotion long after she leaves the room.',
    positioning: 'This is not a commercial luxury set. This is a museum-grade sovereign inheritance object.',
    scentPyramid: {
      top: 'Taif Rose Absolute · Imperial White Rose · Velvet Peony Silk',
      heart: 'White Ambergris · Royal Saffron Nectar · Warm Skin Musk',
      base: 'Cashmere Woods · Golden Amber Resin',
    },
    archive_compositions: [
      { name: 'SHAMIM BLOOM', title: 'The Sovereign Grace', desc: 'A legendary Taif Rose masterpiece sculpted for timeless femininity and emotional permanence.' },
      { name: 'QUEEN OF TAIF', title: 'The Crown of Eternal Femininity', desc: 'An aristocratic rose empire infused with saffron silk and royal oud warmth.' },
      { name: 'ETERNAL EMPRESS', title: 'The Absolute Feminine Throne', desc: 'A ceremonial feminine authority composition engineered around imperial white rose and golden amber resin.' },
      { name: 'PRIVATE VAULT ELIXIR', title: 'Exclusive Collector Oil', desc: 'A hand-numbered concentrated extrait unavailable outside the vault allocation.' },
    ],
    specs: {
      volume: 'Grand Sovereign Collector Allocation (4 Pieces)',
      concentration: 'Extrait de Parfum',
      longevity: '18–36+ Hours Layered Presence',
      sillage: 'Cinematic Feminine Aura',
      gender: 'Feminine',
      production: 'Museum-Grade Small-Batch Craftsmanship',
      allocation: 'Hand-Numbered Collector Release',
      price_pkr: 'Rs 150,000',
      price_usd: '$540 USD',
    },
    packaging: 'The Her Legacy Vault chest was engineered as a sovereign heirloom object. The exterior is sculpted from matte obsidian-black architectural lacquer finished with engraved royal gold insignia and soft cinematic reflections. The interior reveals layered blush velvet chambers illuminated by integrated warm ambient lighting designed to resemble a private jewelry archive.',
    nft: {
      description: 'A blockchain-authenticated sovereign luxury archive created by The House of Shamim Forever. This collector-grade vault preserves elite feminine fragrance compositions, provenance, rarity allocation, and founder-level privileges within an immutable digital registry.',
      rarity: 'GRAND FOUNDERS',
      holder_privileges: [
        'Founder Sovereign Access',
        'Priority Reserve Allocations',
        'Invitation-Only House Ceremonies',
        'Private Jewelry Archive Previews',
        'Sovereign Refill Privileges',
        'Concierge Restoration Services',
        'Early NFT Archive Access',
        'Blockchain Provenance Protection',
        'Lifetime Authentication Registry',
        'Collector-Tier House Recognition',
      ],
    },
    cta: {
      primary: 'Acquire The Legacy Vault',
      secondary: 'Authenticate Sovereign Archive',
      tertiary: 'Enter The Founder Chamber',
    },
  }

  const { data, error } = await supabase
    .from('products')
    .upsert([{
      name: 'House of Shamim — Her Legacy Vault',
      slug: 'her-legacy-vault',
      description: 'A museum-grade sovereign feminine archive uniting legendary Taif Rose compositions, imperial florals, and blockchain-authenticated luxury into one eternal collector vault.',
      story: JSON.stringify(story),
      price_pkr: 150000,
      price_usd: 540,
      inventory: 5,
      main_category_id: perfumeId,
      sub_category_id: femaleId,
      images: [
        '/products/her-legacy-vault/vault-hero.png',
        '/products/her-legacy-vault/vault-box.png',
      ],
      is_featured: true,
      is_active: true,
    }], { onConflict: 'slug' })
    .select('id, name, slug, price_pkr')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    message: 'Her Legacy Vault product upserted successfully.',
    product: data?.[0],
  })
}
