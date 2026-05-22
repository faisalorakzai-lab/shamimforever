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
    { 
      name: 'SF OUD SOVEREIGN', 
      slug: 'oud-sovereign', 
      description: 'Absolute authority does not request a seat at the table; it builds the entire infrastructure. SF Oud Sovereign is a highly concentrated 150ML masterpiece engineered exclusively for the ultimate architect of power.', 
      story: JSON.stringify({
        tagline: 'SF OUD SOVEREIGN — THE SCENT OF SOVEREIGN AUTHORITY (150ML)',
        olfactory: 'A rare Assamese oud composition layered with saffron, ambergris, and sandalwood. The signature scent of sovereign authority.',
        scentPyramid: {
          top: 'Pure Saffron Threads, Warm Royal Spice Accord — Sharp, Imperial, Instantly Captivating.',
          heart: 'Rare Assamese Oud Oil, Earthy White Ambergris — Heavy, Dense, Absolute Power.',
          base: 'Creamy Mysore Sandalwood, Velvet Musk, Rich Amber Resin — Smooth, Royal Wood, Everlasting Executive Presence.'
        },
        specs: {
          volume: '150ML e 5.1 FL. OZ.',
          concentration: 'Extrait de Parfum (Highest Oil Density Allocation)',
          sillage: 'Imperial / Alpha / Commanding Dark Wood Trail',
          longevity: 'Constant Eternal (24+ Hours of Undisturbed Presence)',
          batch: 'Strictly Limited Rare Assamese Reserve Batch',
          price: 'Rs 85,000 PKR / $299.00 USD'
        },
        nft: {
          title: 'SF OUD SOVEREIGN — DIGITAL TWIN',
          description: 'Physical Master-Craft. Cryptographic Proof of Ownership. Every 150ML flacon is natively integrated into the blockchain ledger.'
        },
        packaging: 'Housed within our heavy, rectangular signature glass block, finished in an ultra-premium obsidian-black polished coat. The Diamond Coronation Cap is encrusted with multiple rows of brilliant-cut diamonds.'
      }),
      price_pkr: 85000, 
      price_usd: 299, 
      inventory: 12, 
      main_category_id: perfumeId, 
      collection_id: sovereignOudId, 
      images: ['https://uvgtgeauhjbdatrmmaob.supabase.co/storage/v1/object/public/products/perfumes/oud-sovereign-new.png'],
      is_featured: true, 
      is_active: true 
    },
    { name: 'Heritage Noir', slug: 'heritage-noir', description: 'A dark, smoky composition of oud, leather, and vetiver. For those who command presence without uttering a word.', story: 'Inspired by the ancient trade routes of the Silk Road, Heritage Noir blends Eastern oud with Western leather in an unprecedented union.', price_pkr: 65000, price_usd: 229, inventory: 18, main_category_id: perfumeId, collection_id: sovereignOudId, is_featured: false, is_active: true },
    { name: 'Imperial Musk', slug: 'imperial-musk', description: 'White musk elevated to imperial luxury. Clean, luminous, and utterly timeless. A scent worn by those who need no introduction.', story: 'Drawing from the Pashtun tradition of musk wearing, Imperial Musk reimagines a centuries-old heritage for the modern sovereign.', price_pkr: 72000, price_usd: 249, inventory: 20, main_category_id: perfumeId, collection_id: heritageMuskId, is_featured: true, is_active: true },
    { name: 'Silk Road Amber', slug: 'silk-road-amber', description: 'Golden amber, warm benzoin, and vanilla absolute. A fragrance that wraps like silk and lingers like legacy.', story: 'Amber has been treasured since antiquity. Ours is sourced from Baltic deposits and harmonized with the warm spices of the ancient trade routes.', price_pkr: 55000, price_usd: 195, inventory: 25, main_category_id: perfumeId, collection_id: sovereignOudId, is_featured: false, is_active: true },
    { name: 'Eternal Rose de Taif', slug: 'eternal-rose-de-taif', description: "The world's most prized rose — the Taif — captured in its purest, most concentrated form. Royalty in a bottle.", story: 'Taif roses bloom for only three weeks each year in the mountains of Saudi Arabia. Each 50ml bottle contains the essence of over 400 roses.', price_pkr: 95000, price_usd: 339, inventory: 8, main_category_id: perfumeId, collection_id: imperialRoseId, is_featured: true, is_active: true },
    { 
      name: 'SF HIMALAYAN SNOW MUSK', 
      slug: 'himalayan-snow-musk', 
      description: 'While standard musk fragrances lean heavy and warm, SF Himalayan Snow Musk redefines the vector with a freezing, blindingly crisp aura of pure authority.', 
      story: JSON.stringify({
        tagline: 'SF HIMALAYAN SNOW MUSK — THE CRISP-COLD SCENT (150ML)',
        olfactory: 'A crisp, blindingly pure breath of Himalayan heights. Clean, icy, and sharp—engineered for the visionaries who view the world from the summit.',
        scentPyramid: {
          top: 'Frozen Mint Leaves, Crisp Alpine Air Accord — Glacial, Sharp, Instantly Refreshing.',
          heart: 'Silver Birch Bark, Ozone Accord — Clean, Bright, Architectural Wood Matrix.',
          base: 'Pure Himalayan Musk Crystal, Executive White Patchouli — Sub-Zero, Smooth, Everlasting Executive Presence.'
        },
        specs: {
          volume: '150ML e 5.1 FL. OZ.',
          concentration: 'Extrait de Parfum (Highest Oil Density Allocation)',
          sillage: 'Imperial / Crisp / Blindingly Pure Alpine Musk Trail',
          longevity: 'Constant Eternal (18+ Hours of Absolute Frost-Fresh Sillage)',
          batch: 'Strictly Limited High-Altitude Reserve Batch',
          price: 'Rs. 58,000 PKR / $205.00 USD'
        },
        nft: {
          title: 'SF HIMALAYAN SNOW MUSK — DIGITAL TWIN',
          description: 'Physical Master-Craft. Cryptographic Proof of Ownership. Every 150ML flacon is natively integrated into the blockchain ledger.'
        },
        packaging: 'Housed within our premium signature glass, heavily tinted in a sleek, deep obsidian layout. The front features clean, high-relief text in pure polished Platinum-Silver. The bottle is crowned with an elite Silver Crown Cap, topped with a jagged, majestic raw quartz crystal cluster structure.'
      }),
      price_pkr: 58000, 
      price_usd: 205, 
      inventory: 15, 
      main_category_id: perfumeId, 
      collection_id: heritageMuskId, 
      images: ['https://uvgtgeauhjbdatrmmaob.supabase.co/storage/v1/object/public/products/perfumes/himalayan-snow-musk.png'],
      is_featured: true, 
      is_active: true 
    },
    { 
      name: 'SF MIDNIGHT IRIS ROYALE', 
      slug: 'midnight-iris-royale', 
      description: "True luxury doesn't follow trends; it dictates them. SF Midnight Iris Royale is a highly concentrated 150ML masterwork crafted for those who command the peak of high-fashion authority.", 
      story: JSON.stringify({
        tagline: 'SF MIDNIGHT IRIS ROYALE — THE HIGH-FASHION POWDERY SCENT (150ML)',
        olfactory: 'The ultimate expression of high-fashion royalty. Built around the world’s most expensive floral extract, wrapped in buttery soft suede.',
        scentPyramid: {
          top: 'Sharp Violet Leaves, Fresh Ozone Accord — Crisp, Elite, Instantly Captivating.',
          heart: 'Pure Tuscan Iris Root (Orris Butter), Soft Powdery Accord — Creamy, Rich, Supreme Sophistication.',
          base: 'Premium Suede Leather, Structural Cedarwood, Velvet Musk — Heavy, Masculine-Edge, Everlasting.'
        },
        specs: {
          volume: '150ML e 5.1 FL. OZ.',
          concentration: 'Extrait de Parfum (Highest Oil Density Allocation)',
          sillage: 'Imperial / Intensely Rich / Powdery Leather Trail',
          longevity: 'Constant Eternal (24+ Hours of Undisturbed Presence)',
          batch: 'Strictly Limited Tuscan Orris Matured Reserve Batch',
          price: 'Rs. 98,000 PKR / $349.00 USD'
        },
        nft: {
          title: 'SF MIDNIGHT IRIS ROYALE — DIGITAL TWIN',
          description: 'Physical Master-Craft. Cryptographic Proof of Ownership. Every 150ML flacon is natively integrated into the blockchain ledger.'
        },
        packaging: 'Housed within our ultra-premium signature glass, heavily tinted in a mysterious, deep midnight obsidian layout. The front displays Royal Gold text. The bottle is crowned with our signature detailed Royal Gold Crown Cap, featuring a massive brilliant-cut diamond at its peak.'
      }),
      price_pkr: 98000, 
      price_usd: 349, 
      inventory: 10, 
      main_category_id: perfumeId, 
      collection_id: imperialRoseId, 
      images: ['https://uvgtgeauhjbdatrmmaob.supabase.co/storage/v1/object/public/products/perfumes/midnight-iris-royale.png'],
      is_featured: true, 
      is_active: true 
    },
    { 
      name: 'SF SOVEREIGN VANILLA ABSOLUTE', 
      slug: 'vanilla-absolute', 
      description: 'True influence commands absolute attraction instinctively, crossing all boundaries. SF Sovereign Vanilla Absolute is a highly concentrated 150ML masterpiece engineered symmetrically for both men and women of uncompromising status.', 
      story: JSON.stringify({
        tagline: 'SF SOVEREIGN VANILLA ABSOLUTE — THE GOURMAND MASTERPIECE (150ML)',
        olfactory: 'An intoxicating elixir of pure Madagascar vanilla steeped in aged oak barrels. A heavy, seductive trail designed to turn heads before you enter.',
        scentPyramid: {
          top: 'Aged Luxury Cognac Accord, Blonde Tobacco Leaf — Heavy, Seductive, Instantly Captivating.',
          heart: 'Pure Madagascar Vanilla Orchid, Warm Oakwood Shavings — Deep, Dark, Pure Unisex Opulence.',
          base: 'Roasted Tonka Bean, Velvet Musk, Creamy Amber Resin — Smooth, Rich, Warmly Everlasting.'
        },
        specs: {
          volume: '150ML e 5.1 FL. OZ.',
          concentration: 'Extrait de Parfum (Highest Oil Density Allocation)',
          sillage: 'Imperial / Heavy / Deeply Seductive Gourmand Trail',
          longevity: 'Constant Eternal (24+ Hours of Undisturbed Presence)',
          batch: 'Strictly Limited Matured Reserve Batch',
          price: 'Rs 78,000 PKR / $275.00 USD'
        },
        nft: {
          title: 'SF SOVEREIGN VANILLA ABSOLUTE — DIGITAL TWIN',
          description: 'Physical Master-Craft. Cryptographic Proof of Ownership. Every 150ML flacon is natively integrated into the blockchain ledger.'
        },
        packaging: 'Housed within our heavy, solid signature block glass featuring an obsidian-dark, deep-tinted layout. The front features deep metallic high-relief text in pure Royal Gold. The bottle is crowned with our iconic, detailed Royal Gold Crown Cap, featuring a brilliant-cut massive diamond at its peak.'
      }),
      price_pkr: 78000, 
      price_usd: 275, 
      inventory: 20, 
      main_category_id: perfumeId, 
      collection_id: sovereignOudId, 
      images: ['https://uvgtgeauhjbdatrmmaob.supabase.co/storage/v1/object/public/products/perfumes/vanilla-absolute.png'],
      is_featured: true, 
      is_active: true 
    },
    {
      name: 'SF SACRED INCENSE OF KYOTO',
      slug: 'sacred-incense-of-kyoto',
      description: 'A meditative sanctuary of rare resins and sacred Japanese woods. A fragrance for the quiet minds that command absolute empires.',
      story: JSON.stringify({
        tagline: 'SF SACRED INCENSE OF KYOTO — THE SPICY-MYSTICAL SCENT (150ML)',
        olfactory: 'True sovereignty does not shout; it rules from a place of absolute, unshakeable silence. SF Sacred Incense of Kyoto is a highly concentrated 150ML masterpiece engineered exclusively for visionaries who command vast empires with absolute inner stillness.',
        scentPyramid: {
          top: 'Pink Pepper, Fresh Spicy Accord, Cold Morning Air — Sharp, Spicy, Instantly Captivating.',
          heart: 'Pure Kyara Incense Oil, Sacred Ritual Smoke — Deep, Opulent, Pure Spiritual Royalty.',
          base: 'Rare Japanese Hinoki Wood, Dark Myrrh Resin, Velvet Musk — Creamy, Smooth Wood, Everlasting.'
        },
        specs: {
          volume: '150ML e 5.1 FL. OZ.',
          concentration: 'Extrait de Parfum (Highest Oil Density Allocation)',
          sillage: 'Imperial / Expansive / Meditative Smoky Trail',
          longevity: 'Constant Eternal (24+ Hours of Undisturbed Presence)',
          batch: 'Strictly Limited Temple Reserve Batch',
          price: 'Rs 89,000 PKR / $315.00 USD'
        },
        nft: {
          title: 'SF SACRED INCENSE OF KYOTO — DIGITAL TWIN',
          description: 'Physical Master-Craft. Cryptographic Proof of Ownership. Every 150ML flacon is natively integrated into the blockchain ledger.'
        },
        packaging: 'Housed within our heavy, solid dark-grained wooden signature block. The front features deep metallic high-relief text in pure Royal Gold, reading "SHAMIM FOREVER — SACRED INCENSE OF KYOTO". The bottle is crowned with an organic, deeply grained dark ebony-wood crown cap.'
      }),
      price_pkr: 89000,
      price_usd: 315,
      inventory: 10,
      main_category_id: perfumeId,
      collection_id: sovereignOudId,
      images: ['https://files.manuscdn.com/user_upload_by_module/session_file/310519663683576925/gdbOasTainWzRcBc.png'],
      is_featured: true,
      is_active: true
    },
    {
      name: 'SF SAPPHIRE BLUE LEVANT',
      slug: 'sapphire-blue-levant',
      description: 'A breathtaking breath of the Mediterranean sea fused with precious woods. Crafted for the global nomad who rules both the boardroom and the ocean.',
      story: JSON.stringify({
        tagline: 'SF SAPPHIRE BLUE LEVANT — THE FRESH-AQUATIC KING (150ML)',
        olfactory: 'True sovereignty is not bound by land—it commands the oceans. SF Sapphire Blue Levant is a highly concentrated 150ML masterpiece engineered exclusively for the global nomad whose influence spans across borders.',
        scentPyramid: {
          top: 'Calabrian Bergamot, Sun-Ripened Citrus, Crushed Mint — Sharp, Icy, Instantly Captivating.',
          heart: 'Deep Sea Marine Accord, Blue Sea Kelp, Saffron Thread — Crisp, Salty Mineral, Pure Royalty.',
          base: 'Precious Amberwood, Clean Ambergris, Royal Coastal Cedar — Creamy, Smooth Wood, Everlasting.'
        },
        specs: {
          volume: '150ML e 5.1 FL. OZ.',
          concentration: 'Extrait de Parfum (Highest Oil Density Allocation)',
          sillage: 'Imperial / Expansive / Majestic Oceanic Trail',
          longevity: 'Constant Eternal (24+ Hours of Undisturbed Presence)',
          batch: 'Strictly Limited Coastal Reserve Batch',
          price: 'Rs 62,000 PKR / $219.00 USD'
        },
        nft: {
          title: 'SF SAPPHIRE BLUE LEVANT — DIGITAL TWIN',
          description: 'Physical Master-Craft. Cryptographic Proof of Ownership. Every 150ML flacon is natively integrated into the blockchain ledger.'
        },
        packaging: 'Housed within our heavy, solid sapphire-blue translucent glass signature block. The front features deep metallic high-relief text in pure Royal Gold, reading "SHAMIM FOREVER — SAPPHIRE BLUE LEVANT". The bottle is crowned with our iconic, detailed Royal Gold Crown Cap, featuring a brilliant-cut massive sapphire-blue diamond at its peak.'
      }),
      price_pkr: 62000,
      price_usd: 219,
      inventory: 15,
      main_category_id: perfumeId,
      collection_id: sovereignOudId,
      images: ['https://files.manuscdn.com/user_upload_by_module/session_file/310519663683576925/oblFuJebpXRjxvTt.png'],
      is_featured: true,
      is_active: true
    },
    {
      name: 'AFNAN 9PM',
      slug: 'afnan-9pm',
      description: 'A captivating and bold fragrance, Afnan 9PM is the definitive scent for the modern man who commands the evening. It balances vibrant freshness with a warm, seductive, and long-lasting foundation.',
      story: JSON.stringify({
        tagline: 'AFNAN 9PM — THE ESSENCE OF AFTER-DARK CONFIDENCE',
        olfactory: '9PM is not just a fragrance; it is a statement of intent. Inspired by the dynamic energy of an urban night out, it projects a magnetic, sweet, and spicy sillage that ensures you stand out in any crowd.',
        scentPyramid: {
          top: 'Crisp Apple, Bergamot, Wild Lavender, Cinnamon — Vibrant, Mouth-Watering, Addictive.',
          heart: 'Orange Blossom, Lily-of-the-Valley (Muguet) — Refined, Complex, Sophisticated Floral.',
          base: 'Vanilla, Tonka Bean, Patchouli, Amber — Warm, Creamy, Masculine Trail.'
        },
        specs: {
          volume: '100ML (3.4 FL. OZ.)',
          concentration: 'Eau de Parfum (EDP)',
          sillage: 'Powerful, Bold, and Attention-Grabbing',
          longevity: 'High Endurance (6–10+ Hours)',
          batch: 'Standard Institutional Standard',
          price: 'Rs 10,500 PKR / $39.00 USD'
        },
        nft: {
          title: 'AFNAN 9PM — DIGITAL TWIN',
          description: 'Physical Master-Craft. Cryptographic Proof of Ownership. Every 100ML flacon is natively integrated into the blockchain ledger.'
        },
        packaging: 'Housed in a sleek, iconic heavy glass flacon, the design reflects the simplicity and importance of the scent it protects. The bottle features a minimalist, high-contrast black-and-white aesthetic with bold "9pm" typography.'
      }),
      price_pkr: 10500,
      price_usd: 55,
      inventory: 50,
      main_category_id: perfumeId,
      collection_id: heritageMuskId,
      images: ['https://files.manuscdn.com/user_upload_by_module/session_file/310519663685075873/VPnGCjDXAzytHGSo.jpg'],
      is_featured: false,
      is_active: true
    },
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
    {
      name: 'J. FRAGRANCES SHER DIL',
      slug: 'sher-dil',
      description: 'Sher Dil by J. Fragrances is a scent crafted for the brave, serving as a profound tribute to the heroes of Pakistan. Designed to mirror the spirit of resilience, sacrifice, and patriotism, this fragrance is more than just an accessory; it is a symbol of national pride.',
      story: JSON.stringify({
        tagline: 'J. FRAGRANCES SHER DIL — THE EMBLEM OF VALOR',
        olfactory: 'Sher Dil is a sophisticated, masculine fragrance that balances invigorating energy with a deep, grounded foundation. It represents the duality of the modern hero: the sharp focus required for duty and the warm, enduring spirit of love for one\'s nation.',
        scentPyramid: {
          top: 'Fresh Citrus and Green Apple — Energetic, Alert, Precise.',
          heart: 'Floral-Fruity heart spiced with Pepper — Complex, Elegant, Sophisticated.',
          base: 'Rich Leather, Patchouli, Amber, and Deep Cedarwood — Powerful, Commanding, Steadfast.'
        },
        specs: {
          volume: '100ML',
          concentration: 'Eau de Parfum (EDP)',
          sillage: 'Dynamic, Resilient, and Commanding',
          longevity: 'Excellent (Designed for extended endurance)',
          batch: 'Institutional Standard',
          price: 'Rs. 12,200'
        },
        nft: {
          title: 'SHER DIL — DIGITAL TWIN',
          description: 'Physical Master-Craft. Cryptographic Proof of Ownership. Every 100ML flacon is natively integrated into the blockchain ledger.'
        },
        packaging: 'Sher Dil is presented in a premium, high-end luxury leather collector\'s gift box. The bottle features a striking, iconic golden eagle cap—an emblem of flight and freedom. The deep navy blue color of the flacon evokes the expansive sky and the professional attire of national heroes.'
      }),
      price_pkr: 12200,
      price_usd: 45,
      inventory: 100,
      main_category_id: perfumeId,
      collection_id: heritageMuskId,
      images: ['https://files.manuscdn.com/user_upload_by_module/session_file/310519663518074252/jRuwBQFAyiZGbmPR.jpg'],
      is_featured: true,
      is_active: true
    },
    {
      name: 'LATTAFA ASAD',
      slug: 'lattafa-asad',
      description: 'Lattafa Asad is a powerhouse of a fragrance, crafted for the man who exudes natural authority and strength. As a bold, spicy, and sophisticated amber-spicy creation, it is designed to leave a lasting, commanding impression.',
      story: JSON.stringify({
        tagline: 'LATTAFA ASAD — THE EMBODIMENT OF DOMINANCE',
        olfactory: 'Asad is an exercise in bold masculinity. It commands attention without needing to shout, relying on a complex, dense structure that moves from a sharp, peppery opening to a deep, warm, and woody dry-down.',
        scentPyramid: {
          top: 'Black Pepper, Pineapple, and Tobacco — Bold, Sharp, Invigorating.',
          heart: 'Coffee, Patchouli, and Iris — Dark, Roasted, Refined.',
          base: 'Vanilla, Amber, Dry Woods, and Benzoin — Creamy, Warm, Deeply Masculine.'
        },
        specs: {
          volume: '100ML (3.4 FL. OZ.)',
          concentration: 'Eau de Parfum (EDP)',
          sillage: 'Heavy, Projective, and Commanding',
          longevity: 'Exceptional (8–12+ Hours)',
          batch: 'Institutional Standard',
          price: 'Rs. 8,950 PKR'
        },
        nft: {
          title: 'LATTAFA ASAD — DIGITAL TWIN',
          description: 'Physical Master-Craft. Cryptographic Proof of Ownership. Every 100ML flacon is natively integrated into the blockchain ledger.'
        },
        packaging: 'Housed in a matte black cylindrical bottle, the design is defined by its bold gold accents, featuring a stylized lion emblem that denotes bravery and regality. The gold cross-body band adds a structural, architectural element.'
      }),
      price_pkr: 8950,
      price_usd: 32,
      inventory: 100,
      main_category_id: perfumeId,
      collection_id: heritageMuskId,
      images: ['https://files.manuscdn.com/user_upload_by_module/session_file/310519663518074252/uDSGiceinCljfxCF.jpg'],
      is_featured: true,
      is_active: true
    },
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
    breakdown: { perfume: 8, cosmetics: 5, jewelry: 5 },
  })
}
