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

  const story = "\"{\\\"tagline\\\":\\\"Love does not fade; it blooms into eternity.\\\",\\\"positioning\\\":\\\"Shamim Bloom was never designed as a commercial perfume. It was conceived as an eternal feminine archive — a liquid monument dedicated to grace powerful enough to outlive memory itself. Inside the House of Shamim Forever, fragrance is treated not as cosmetic luxury, but as emotional architecture. Every molecule within Shamim Bloom exists to preserve permanence: permanence of presence, permanence of identity, permanence of love. This is the scent of a woman whose silence carries more authority than noise ever could. She does not seek attention. She transforms atmosphere.\\\",\\\"olfactory\\\":\\\"A sovereign floral masterpiece sculpted around legendary Taif Rose, velvet peony accords, and white ambergris — engineered for timeless femininity, quiet power, and eternal presence. Shamim Bloom does not enter rooms aggressively. It unfolds in phases. First comes softness. Then warmth. Then emotional memory. Hours later, the atmosphere still belongs to her. People may forget conversations. They do not forget the emotional imprint this fragrance leaves behind.\\\",\\\"scentPyramid\\\":{\\\"top\\\":\\\"Velvet Peony · White Rose Silk · Soft Blush Accord — Airy. Feminine. Illuminated elegance.\\\",\\\"heart\\\":\\\"Taif Rose Absolute · Turkish Rose Resin · Imperial Floral Nectar — Deep emotional luxury. Soft dominance. Royal femininity.\\\",\\\"base\\\":\\\"White Ambergris · Cashmere Skin Musk · Warm Cream Woods — Velvet permanence engineered to survive fabric, skin, memory, and time itself.\\\"},\\\"specs\\\":{\\\"volume\\\":\\\"100ML\\\",\\\"concentration\\\":\\\"Extrait de Parfum\\\",\\\"longevity\\\":\\\"12–18+ Hours\\\",\\\"sillage\\\":\\\"Soft Yet Commanding — Elegant Sovereign Aura\\\",\\\"price_pkr\\\":\\\"Rs 85,000\\\",\\\"price_usd\\\":\\\"\\\\u0006 USD\\\"},\\\"packaging\\\":\\\"The Shamim Bloom flacon is sculpted from deep translucent amethyst crystal layered with soft blush reflections beneath the surface. Its crown cap is forged in polished royal gold wrapped in miniature sculpted roses and crowned with a massive diamond-cut crystal centerpiece engineered to refract cinematic light in every direction. Every surface is designed to feel inherited rather than manufactured. The object rests like an heirloom jewel within the hand. Every Shamim Bloom allocation arrives within a museum-grade presentation vault crafted from matte black lacquered architecture and blush velvet interiors — with hand-authenticated serial identity, NFC sovereign verification seal, blockchain ownership registration, Founder-grade authenticity certificate, digital twin NFT passport, and archive allocation signature.\\\",\\\"nft\\\":{\\\"title\\\":\\\"Shamim Bloom — Velvet Taif & Peony (Founder Sovereign Edition)\\\",\\\"description\\\":\\\"A sovereign fragrance asset authenticated by The House of Shamim Forever. Crafted around legendary Taif Rose, velvet peony silk, and white ambergris, this digital passport certifies ownership, provenance, rarity allocation, and elite House privileges.\\\",\\\"blockchain\\\":\\\"Polygon Mainnet\\\",\\\"rarity\\\":\\\"FOUNDERS\\\",\\\"edition\\\":\\\"Founder Reserve Allocation — Archive I\\\"}}\""

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

  // Try updating by slug first
  const { data: bySlug, error: slugErr } = await supabase
    .from('products')
    .update(updates)
    .eq('slug', 'shamims-bloom')
    .select('id, name, slug')

  if (!slugErr && bySlug && bySlug.length > 0) {
    return NextResponse.json({ success: true, updated: bySlug, method: 'by-slug' })
  }

  // Fallback: find by partial name
  const { data: byName, error: nameErr } = await supabase
    .from('products')
    .update(updates)
    .ilike('name', '%shamim bloom%')
    .select('id, name, slug')

  if (nameErr) {
    return NextResponse.json({ error: nameErr.message, slugError: slugErr?.message }, { status: 500 })
  }

  if (!byName || byName.length === 0) {
    // Product doesn't exist yet — insert it
    const { data: cats } = await supabase.from('main_categories').select('id, slug')
    const perfumeId = cats?.find(c => c.slug === 'perfume')?.id
    const { data: inserted, error: insertErr } = await supabase
      .from('products')
      .insert([{ ...updates, slug: 'shamims-bloom', main_category_id: perfumeId }])
      .select('id, name, slug')
    if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 })
    return NextResponse.json({ success: true, inserted, method: 'inserted' })
  }

  return NextResponse.json({ success: true, updated: byName, method: 'by-name' })
}
