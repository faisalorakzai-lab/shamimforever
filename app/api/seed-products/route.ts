import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== 'shamim-seed-2025') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getAdminClient()

  // Step 1: Ensure collections exist
  const { data: collectionsData, error: collError } = await supabase
    .from('collections')
    .upsert([
      { name: 'Sovereign Oud', slug: 'sovereign-oud', description: 'A collection of rare oud compositions, sourced from the ancient forests of Assam and Oman.', is_active: true },
      { name: 'Heritage Musk', slug: 'heritage-musk', description: 'White and black musk expressions, rooted in Pashtun olfactory traditions.', is_active: true },
      { name: 'Imperial Rose', slug: 'imperial-rose', description: 'The most prized Taif roses, elevated to sovereign luxury.', is_active: true },
    ], { onConflict: 'slug' })
    .select('id, slug')

  if (collError) {
    return NextResponse.json({ error: collError.message }, { status: 500 })
  }

  // Get collection IDs
  const sovereignOudId = collectionsData?.find(c => c.slug === 'sovereign-oud')?.id
  const heritageMuskId = collectionsData?.find(c => c.slug === 'heritage-musk')?.id
  const imperialRoseId = collectionsData?.find(c => c.slug === 'imperial-rose')?.id

  // Step 2: Ensure categories exist
  const { error: catError } = await supabase
    .from('main_categories')
    .upsert([
      { name: 'Perfume', slug: 'perfume', description: "High-end luxury fragrances crafted from the world's rarest ingredients." },
      { name: 'Cosmetics', slug: 'cosmetics', description: 'Bespoke beauty formulations for the sovereign individual.' },
      { name: 'Jewelry', slug: 'jewelry', description: 'Heirloom-quality pieces crafted from precious metals and gemstones.' },
    ], { onConflict: 'slug' })

  if (catError) {
    return NextResponse.json({
      error: catError.message,
      hint: 'Tables may not exist yet. Please run supabase/schema.sql in your Supabase SQL Editor first.',
      supabase_dashboard: 'https://supabase.com/dashboard/project/uvgtgeauhjbdatrmmaob/sql/new',
    }, { status: 500 })
  }

  // Step 3: Get category IDs
  const { data: cats } = await supabase
    .from('main_categories')
    .select('id, slug')
    .in('slug', ['perfume', 'cosmetics', 'jewelry'])

  const perfumeId = cats?.find(c => c.slug === 'perfume')?.id
  const cosmeticsId = cats?.find(c => c.slug === 'cosmetics')?.id
  const jewelryId = cats?.find(c => c.slug === 'jewelry')?.id

  // Step 4: Seed boutiques
  await supabase.from('boutiques').upsert([
    { name: 'Lahore Sovereign Node', address: 'DHA Phase VI, Sector C', city: 'Lahore', country: 'Pakistan', phone: '+92 42 3000 0001', email: 'lahore@shamimforever.com', coordinates: { lat: 31.4504, lng: 74.3587 } },
    { name: 'Karachi Sovereign Node', address: 'Clifton Block 5', city: 'Karachi', country: 'Pakistan', phone: '+92 21 3000 0002', email: 'karachi@shamimforever.com', coordinates: { lat: 24.8260, lng: 67.0187 } },
    { name: 'Dubai Sovereign Node', address: 'DIFC, Gate Village', city: 'Dubai', country: 'UAE', phone: '+971 4 300 0003', email: 'dubai@shamimforever.com', coordinates: { lat: 25.2105, lng: 55.2749 } },
  ], { onConflict: 'name', ignoreDuplicates: true })

  // Step 5: Upsert 15 luxury products
  const products = [
    // Perfume (5) - Sovereign Oud Collection
    { name: 'Oud Sovereign', slug: 'oud-sovereign', description: 'A rare Assamese oud composition layered with saffron, ambergris, and sandalwood. The signature scent of sovereign authority.', story: 'Sourced from 40-year-old agarwood trees in the Assam forest reserve, this oud is one of the most precious materials in the world.', price_pkr: 85000, price_usd: 299, inventory: 12, main_category_id: perfumeId, collection_id: sovereignOudId, is_featured: true, is_active: true },
    { name: 'Heritage Noir', slug: 'heritage-noir', description: 'A dark, smoky composition of oud, leather, and vetiver. For those who command presence without uttering a word.', story: 'Inspired by the ancient trade routes of the Silk Road, Heritage Noir blends Eastern oud with Western leather in an unprecedented union.', price_pkr: 65000, price_usd: 229, inventory: 18, main_category_id: perfumeId, collection_id: sovereignOudId, is_featured: false, is_active: true },
    { name: 'Imperial Musk', slug: 'imperial-musk', description: 'White musk elevated to imperial luxury. Clean, luminous, and utterly timeless. A scent worn by those who need no introduction.', story: 'Drawing from the Pashtun tradition of musk wearing, Imperial Musk reimagines a centuries-old heritage for the modern sovereign.', price_pkr: 72000, price_usd: 249, inventory: 20, main_category_id: perfumeId, collection_id: heritageMuskId, is_featured: true, is_active: true },
    { name: 'Silk Road Amber', slug: 'silk-road-amber', description: 'Golden amber, warm benzoin, and vanilla absolute. A fragrance that wraps like silk and lingers like legacy.', story: 'Amber has been treasured since antiquity. Ours is sourced from Baltic deposits and harmonized with the warm spices of the ancient trade routes.', price_pkr: 55000, price_usd: 195, inventory: 25, main_category_id: perfumeId, collection_id: sovereignOudId, is_featured: false, is_active: true },
    { name: 'Eternal Rose de Taif', slug: 'eternal-rose-de-taif', description: "The world's most prized rose — the Taif — captured in its purest, most concentrated form. Royalty in a bottle.", story: 'Taif roses bloom for only three weeks each year in the mountains of Saudi Arabia. Each 50ml bottle contains the essence of over 400 roses.', price_pkr: 95000, price_usd: 339, inventory: 8, main_category_id: perfumeId, collection_id: imperialRoseId, is_featured: true, is_active: true },
    // Cosmetics (5) - Heritage Musk Collection
    { name: 'Sovereign Lip Elixir', slug: 'sovereign-lip-elixir', description: 'A lip treatment infused with 24-karat gold, rare rose hip oil, and diamond powder. Lips transformed, sovereignty expressed.', story: 'Formulated in our Lahore atelier, this elixir took 18 months of development to achieve the perfect balance of treatment and luxury.', price_pkr: 25000, price_usd: 89, inventory: 35, main_category_id: cosmeticsId, collection_id: heritageMuskId, is_featured: false, is_active: true },
    { name: 'Imperial Glow Serum', slug: 'imperial-glow-serum', description: 'A potent 24-karat gold and vitamin C serum that illuminates from within. The foundation of the sovereign skincare ritual.', story: "Gold has been used in skincare since Cleopatra's reign. We've refined this ancient wisdom with modern bioactive technology.", price_pkr: 42000, price_usd: 149, inventory: 22, main_category_id: cosmeticsId, collection_id: heritageMuskId, is_featured: true, is_active: true },
    { name: 'Heritage Rose Face Cream', slug: 'heritage-rose-face-cream', description: 'Our richest moisturizer, built on Taif rose water and Persian saffron extract. Skin sovereignty, achieved.', story: 'Inspired by the skincare rituals of Mughal empresses, this cream uses rose water distilled in our own atelier from Taif petals.', price_pkr: 38000, price_usd: 135, inventory: 28, main_category_id: cosmeticsId, collection_id: imperialRoseId, is_featured: false, is_active: true },
    { name: 'Silk Velvet Foundation', slug: 'silk-velvet-foundation', description: 'A lightweight, long-wear foundation with silk proteins and SPF 30. 18 sovereignly curated shades for every complexion.', story: 'Three years in development. Tested across 500 skin types in Pakistan, UAE, and the UK. The result is flawless, sovereign skin.', price_pkr: 32000, price_usd: 115, inventory: 40, main_category_id: cosmeticsId, collection_id: heritageMuskId, is_featured: false, is_active: true },
    { name: 'Midnight Kohl Noir', slug: 'midnight-kohl-noir', description: 'Artisanal kohl crafted from pure antimony stone, as it has been for 5,000 years. The original eye sovereign.', story: "Our kohl is sourced from the same antimony mines that supplied the royal courts of the Mughal Empire. Ground by hand. Charged with history.", price_pkr: 18000, price_usd: 65, inventory: 50, main_category_id: cosmeticsId, collection_id: heritageMuskId, is_featured: true, is_active: true },
    // Jewelry (5) - Imperial Rose Collection
    { name: 'Sovereign Gold Collar', slug: 'sovereign-gold-collar', description: '22-karat gold collar necklace hand-crafted by our master goldsmiths. A statement of absolute sovereignty.', story: 'Inspired by the jewelry worn by the queens of the Indus Valley Civilization, this collar reimagines 5,000 years of jewelry-making tradition.', price_pkr: 485000, price_usd: 1699, inventory: 3, main_category_id: jewelryId, collection_id: imperialRoseId, is_featured: true, is_active: true },
    { name: 'Imperial Diamond Cuff', slug: 'imperial-diamond-cuff', description: 'An 18-karat white gold cuff set with 2.8 carats of VS1 diamonds. Worn by those who make history.', story: 'Each diamond is individually selected from Botswana mines for color, clarity, and cut. The result is a piece that transcends generations.', price_pkr: 750000, price_usd: 2649, inventory: 2, main_category_id: jewelryId, collection_id: imperialRoseId, is_featured: true, is_active: true },
    { name: 'Heritage Pearl Drop Earrings', slug: 'heritage-pearl-drop-earrings', description: 'South Sea pearl drops suspended from 22-karat gold. The timeless language of luxury, spoken fluently.', story: 'Our pearls are cultured over 5 years in the pristine waters of the Broome coast. Each pair is matched for luster, shape, and size.', price_pkr: 225000, price_usd: 795, inventory: 6, main_category_id: jewelryId, collection_id: imperialRoseId, is_featured: false, is_active: true },
    { name: 'Silk Road Emerald Ring', slug: 'silk-road-emerald-ring', description: 'A 3.2-carat Colombian emerald set in 18-karat yellow gold with diamond pavé. Green as sovereignty, enduring as legacy.', story: "Emeralds were the preferred gemstone of Mughal emperors. Ours is sourced from the Muzo mines of Colombia — the world's finest.", price_pkr: 380000, price_usd: 1349, inventory: 4, main_category_id: jewelryId, collection_id: imperialRoseId, is_featured: false, is_active: true },
    { name: 'Eternal Rose Gold Bracelet', slug: 'eternal-rose-gold-bracelet', description: 'An 18-karat rose gold bracelet with alternating rubies and diamonds. Love, power, and eternity bound in gold.', story: 'Rose gold first rose to prominence during the Romantic era. Our bracelet honors this history while declaring a new chapter of sovereign luxury.', price_pkr: 195000, price_usd: 695, inventory: 5, main_category_id: jewelryId, collection_id: imperialRoseId, is_featured: false, is_active: true },
  ]

  const { data: upserted, error: prodError } = await supabase
    .from('products')
    .upsert(products, { onConflict: 'slug' })
    .select('id')

  if (prodError) {
    return NextResponse.json({ error: prodError.message, detail: prodError.details }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    message: 'Shamim Forever database seeded successfully.',
    collections: 3,
    categories: 3,
    products: upserted?.length ?? products.length,
    breakdown: { perfume: 5, cosmetics: 5, jewelry: 5 },
  })
}
