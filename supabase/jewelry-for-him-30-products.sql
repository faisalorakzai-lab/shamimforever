-- ============================================================
  -- SHAMIM FOREVER — 30 JEWELRY (FOR HIM) PRODUCTS
  -- Category: Jewelry | main_category_id: e291b9af-a637-45da-a2df-d39f2e72e53c
  -- Sub-Category: For Him | sub_category_id: ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b
  -- Run this in Supabase SQL Editor:
  -- https://supabase.com/dashboard/project/uvgtgeauhjbdatrmmaob/sql/new
  -- ============================================================

  -- ── GLOBAL MASCULINE HIGH JEWELRY MASTERPIECES (15 products) ──

  INSERT INTO products (
    name, slug, description, story, price_pkr, price_usd,
    inventory, is_active, is_featured, images,
    main_category_id, sub_category_id, sort_order
  ) VALUES

  (
    'CARTIER JUSTE UN CLOU BRACELET',
    'cartier-juste-un-clou-bracelet',
    'The Executive Authority Archive. Modern icon. Bold architecture. Corporate prestige. Cartier''s legendary nail-shaped bracelet in 18K yellow gold — a statement of power worn by the world''s most influential leaders.',
    'Classification: Luxury Gold Statement Bracelet. The Juste un Clou is more than jewelry — it is a manifesto in gold. Conceived in New York in 1971, it transforms the humble nail into an object of pure authority. House Allocation Price: $12,500 USD. NFT Certificate of Authenticity included with every allocation.',
    3475000, 12500, 3, TRUE, TRUE,
    ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    1
  ),

  (
    'BVLGARI BVLGARI RING',
    'bvlgari-bvlgari-ring',
    'The Roman Legacy Archive. Historic elegance. Timeless identity. Roman power. The iconic double-logo band born from the grandeur of Ancient Rome — a sovereign seal for the modern patriarch.',
    'Classification: Luxury Heritage Ring. The Bvlgari Bvlgari ring carries 2,000 years of Roman civilization in its double-engraved band. House Allocation Price: $8,900 USD. Each piece is accompanied by a Shamim Forever NFT Sovereign Passport — a blockchain-verified certificate of ownership and authenticity.',
    2474200, 8900, 5, TRUE, TRUE,
    ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    2
  ),

  (
    'TIFFANY ATLAS X CUFF',
    'tiffany-atlas-x-cuff',
    'The Founder''s Archive. Architectural luxury. Executive confidence. Global prestige. Tiffany & Co.''s Atlas X collection in 18K gold — geometric Roman numeral architecture elevated into wearable power.',
    'Classification: Luxury Gold Cuff Bracelet. The Atlas X Cuff draws inspiration from the Atlas clock on Tiffany''s Fifth Avenue facade — an emblem of time, authority, and New York sovereignty. House Allocation Price: $11,500 USD. Includes Shamim Forever blockchain authentication.',
    3197000, 11500, 3, TRUE, TRUE,
    ARRAY['https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    3
  ),

  (
    'VAN CLEEF & ARPELS PERLEE COUPLES RING',
    'van-cleef-perlee-couples-ring',
    'The Heritage Reserve Archive. Refined craftsmanship. Quiet sophistication. Collector appeal. Van Cleef & Arpels'' signature beaded gold band — understated mastery for the man who needs no announcement.',
    'Classification: Luxury Gold Ring. The Perlee ring is Van Cleef & Arpels'' most collectible modern design — hand-finished gold beading around an 18K band. House Allocation Price: $9,500 USD. NFT Sovereign Passport issued upon allocation, verifiable on blockchain.',
    2641000, 9500, 4, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    4
  ),

  (
    'GRAFF CLASSIC DIAMOND MENS RING',
    'graff-classic-diamond-mens-ring',
    'The Crown Authority Archive. Pure rarity. Exceptional brilliance. Legacy ownership. Graff''s investment-grade diamond men''s ring — each stone hand-selected for color, clarity, and sovereign presence.',
    'Classification: Investment Grade Diamond Ring. Graff is the world''s authority on exceptional diamonds. This men''s ring features stones of D-F color and VS1 or better clarity, set in platinum. House Allocation Price: $22,000 USD. Certificate of Diamond Authenticity and Shamim Forever NFT included.',
    6116000, 22000, 2, TRUE, TRUE,
    ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    5
  ),

  (
    'HARRY WINSTON EMERALD SIGNET RING',
    'harry-winston-emerald-signet-ring',
    'The Dynasty Seal Archive. Royal heritage. Executive status. Museum-grade luxury. Harry Winston''s emerald-set signet ring — a dynastic seal carved for those who build empires.',
    'Classification: High Jewelry Signet Ring. Harry Winston — the King of Diamonds — presents this extraordinary signet set with a Colombian emerald of exceptional provenance. House Allocation Price: $25,000 USD. Includes GIA certification, Harry Winston provenance documentation, and Shamim Forever NFT Sovereign Passport.',
    6950000, 25000, 1, TRUE, TRUE,
    ARRAY['https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    6
  ),

  (
    'CHOPARD ICE CUBE BRACELET',
    'chopard-ice-cube-bracelet',
    'The Modern Prestige Archive. Contemporary design. Swiss excellence. Timeless appeal. Chopard''s geometric ice-cube bracelet in 18K ethical gold — Swiss precision transformed into masculine sculpture.',
    'Classification: Luxury Gold Bracelet. The Ice Cube line is Chopard''s most architectural creation — interlocking cubes of polished gold that catch light from every angle. House Allocation Price: $10,800 USD. Crafted in Fairmined-certified gold. Shamim Forever NFT authentication included.',
    3002400, 10800, 4, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    7
  ),

  (
    'PIAGET POSSESSION MENS RING',
    'piaget-possession-mens-ring',
    'The Infinite Motion Archive. Elegant engineering. Modern refinement. Everyday prestige. Piaget''s rotating-band Possession ring in 18K gold — Swiss watchmaking ingenuity applied to jewelry.',
    'Classification: Luxury Signature Ring. The Possession ring features Piaget''s signature spinning outer band — a kinetic design inspired by the infinite motion of their ultra-thin movements. House Allocation Price: $8,200 USD. Comes with Shamim Forever blockchain certificate and Piaget provenance card.',
    2279600, 8200, 5, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    8
  ),

  (
    'DE BEERS TALISMAN DIAMOND PENDANT',
    'de-beers-talisman-diamond-pendant',
    'The Rare Stone Archive. Natural rarity. Raw beauty. Collector worthy. De Beers'' Talisman collection — rough diamonds in their natural form, encased in gold, as rare and unrepeatable as a fingerprint.',
    'Classification: Luxury Diamond Pendant. De Beers Talisman celebrates the natural beauty of rough diamonds — each piece unique, each stone selected from the world''s most exceptional mines. House Allocation Price: $18,500 USD. Diamond Origin Report included. Shamim Forever NFT Sovereign Passport authenticated on-chain.',
    5143000, 18500, 2, TRUE, TRUE,
    ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    9
  ),

  (
    'BUCCELLATI MACRI CLASSICA CUFF',
    'buccellati-macri-classica-cuff',
    'The Artisan Legacy Archive. Italian mastery. Handcrafted perfection. Historic craftsmanship. Buccellati''s signature engraved gold cuff — a century of Milanese goldsmithing tradition on your wrist.',
    'Classification: Luxury Gold Bracelet. Buccellati''s Macri Classica is hand-engraved by master artisans in Milan using techniques passed down since 1919. Each cuff takes over 80 hours to complete. House Allocation Price: $19,000 USD. Certificate of Italian craftsmanship and Shamim Forever NFT included.',
    5282000, 19000, 2, TRUE, TRUE,
    ARRAY['https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    10
  ),

  (
    'DAMIANI BELLE EPOQUE CROSS PENDANT',
    'damiani-belle-epoque-cross-pendant',
    'The Eternal Faith Archive. Symbolic elegance. Italian luxury. Timeless meaning. Damiani''s diamond-set cross pendant — the intersection of faith and Italian high jewelry excellence.',
    'Classification: Luxury Diamond Pendant. Damiani''s Belle Epoque cross is set with F-G color VVS diamonds in 18K white gold — a sacred symbol elevated to museum-worthy jewelry. House Allocation Price: $9,800 USD. Shamim Forever NFT Sovereign Passport authenticated. Italian provenance documented.',
    2724400, 9800, 3, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    11
  ),

  (
    'BOUCHERON QUATRE BLACK EDITION RING',
    'boucheron-quatre-black-edition-ring',
    'The Executive Power Archive. Modern authority. Parisian sophistication. Bold identity. Boucheron''s Quatre Black Edition — four gold textures unified in one commanding band at Place Vendome''s oldest maison.',
    'Classification: Luxury Contemporary Ring. The Quatre Black Edition features Boucheron''s signature four-band design with black PVD coating, yellow gold, white gold, and pave diamonds. House Allocation Price: $11,200 USD. Place Vendome provenance and Shamim Forever NFT authentication.',
    3113600, 11200, 4, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    12
  ),

  (
    'MESSIKA MOVE TITANIUM BRACELET',
    'messika-move-titanium-bracelet',
    'The Dynamic Prestige Archive. Contemporary luxury. Innovative design. Global recognition. Messika''s Move collection in titanium — floating diamonds in motion, for the man who never stops.',
    'Classification: Luxury Diamond Bracelet. Messika''s patented Move setting allows three diamonds to slide freely within their setting — a kinetic innovation born in Paris. House Allocation Price: $8,500 USD. Messika certificate of creation and Shamim Forever NFT Sovereign Passport.',
    2363000, 8500, 5, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    13
  ),

  (
    'CHAUMET LIENS MENS BRACELET',
    'chaumet-liens-mens-bracelet',
    'The Alliance Archive. Connection. Strength. Refined elegance. Chaumet''s Liens bracelet — forged bonds in 18K gold, from the house that crowned Napoleon''s Empire.',
    'Classification: Luxury Heritage Bracelet. Chaumet has served the courts of Europe since 1780. The Liens bracelet celebrates the bonds of loyalty, strength, and sovereign alliance in hand-finished gold. House Allocation Price: $12,800 USD. Imperial heritage documentation and Shamim Forever NFT authentication.',
    3558400, 12800, 3, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    14
  ),

  (
    'JACOB & CO ASTRONOMIA DIAMOND CUFF',
    'jacob-co-astronomia-diamond-cuff',
    'The Billionaire Archive. Ultimate exclusivity. Collector status. Billionaire luxury. Jacob & Co.''s Astronomia Diamond Cuff — the most extraordinary wrist sculpture ever conceived for the male collector.',
    'Classification: Ultra High Jewelry Masterpiece. The Astronomia Cuff is Jacob & Co.''s most ambitious creation — a wearable universe of exceptional diamonds and sculptural goldwork. House Allocation Price: $85,000 USD. Allocation is strictly by private appointment. Shamim Forever NFT Sovereign Passport minted upon confirmed acquisition.',
    23630000, 85000, 1, TRUE, TRUE,
    ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    15
  ),

  -- ── ESSENTIAL MASCULINE JEWELRY ARCHIVE (15 products) ──

  (
    'PANDORA SIGNATURE MENS RING',
    'pandora-signature-mens-ring',
    'The Everyday Authority Archive. Clean design. Daily confidence. Modern standard. Pandora''s minimalist stainless steel men''s ring — precision crafted for the man who leads with quiet confidence.',
    'Classification: Essential Stainless Steel Ring. Pandora''s Signature Men''s Ring features polished stainless steel with a clean geometric profile. Designed for everyday wear with lasting durability. House Allocation Price: $85 USD. Includes Shamim Forever curated verification.',
    23630, 85, 30, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    16
  ),

  (
    'FOSSIL STAINLESS STEEL CHAIN',
    'fossil-stainless-steel-chain',
    'The Urban Archive. Reliable style. Affordable prestige. Daily wear. Fossil''s stainless steel chain necklace — American heritage craft designed for the modern urban professional.',
    'Classification: Everyday Chain Necklace. Fossil''s stainless steel chain is precision-engineered for durability, style, and all-day comfort. Water-resistant. Suitable for office to evening. House Allocation Price: $65 USD. Shamim Forever verified and curated.',
    18070, 65, 40, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    17
  ),

  (
    'TOMMY HILFIGER CLASSIC BRACELET',
    'tommy-hilfiger-classic-bracelet',
    'The Executive Casual Archive. Simple elegance. Global appeal. Timeless look. Tommy Hilfiger''s iconic men''s bracelet — American collegiate sophistication for the globally minded professional.',
    'Classification: Modern Men''s Bracelet. Tommy Hilfiger''s Classic Bracelet blends stainless steel and leather in a clean, masculine design that transitions effortlessly from boardroom to weekend. House Allocation Price: $55 USD. Shamim Forever curated archive piece.',
    15290, 55, 45, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    18
  ),

  (
    'CALVIN KLEIN MINIMALIST CUFF',
    'calvin-klein-minimalist-cuff',
    'The Modern Structure Archive. Clean lines. Urban luxury. Effortless style. Calvin Klein''s signature minimalist cuff — New York modernism at its most refined and wearable.',
    'Classification: Contemporary Bracelet. The Calvin Klein Minimalist Cuff is an exercise in restraint — polished stainless steel with architectural proportions and a brushed interior. Zero excess. Maximum impact. House Allocation Price: $95 USD. Shamim Forever verified.',
    26410, 95, 35, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    19
  ),

  (
    'SWAROVSKI MENS CRYSTAL RING',
    'swarovski-mens-crystal-ring',
    'The Spark Archive. Subtle brilliance. Modern refinement. Affordable luxury. Swarovski''s men''s crystal ring — Austrian precision-cut crystals set in gunmetal for understated brilliance.',
    'Classification: Fashion Jewelry Ring. Swarovski''s Men''s Crystal Ring channels the brand''s 130-year expertise in crystal cutting into a contemporary masculine form. Each crystal is precision-cut to maximum light refraction. House Allocation Price: $90 USD. Shamim Forever curated.',
    25020, 90, 35, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    20
  ),

  (
    'POLICE BLACK STEEL BRACELET',
    'police-black-steel-bracelet',
    'The Bold Identity Archive. Strong presence. Modern attitude. Daily confidence. Police''s black steel statement bracelet — raw masculine energy in precision-finished PVD-coated steel.',
    'Classification: Masculine Statement Bracelet. Police''s Black Steel Bracelet is PVD black-coated stainless steel with a matte military finish. Designed for the man who leads with presence, not words. House Allocation Price: $70 USD. Shamim Forever verified.',
    19460, 70, 50, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    21
  ),

  (
    'DIESEL STEEL DOG TAG PENDANT',
    'diesel-steel-dog-tag-pendant',
    'The Industrial Archive. Urban character. Contemporary edge. Everyday style. Diesel''s iconic dog tag pendant — industrial authenticity reimagined as modern masculine jewelry.',
    'Classification: Casual Pendant Necklace. Diesel''s Steel Dog Tag channels military heritage and industrial design into an accessible everyday pendant. Engraved with Diesel''s signature branding on brushed stainless steel. House Allocation Price: $60 USD. Shamim Forever curated.',
    16680, 60, 55, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    22
  ),

  (
    'EMPORIO ARMANI LOGO BRACELET',
    'emporio-armani-logo-bracelet',
    'The Italian Standard Archive. Italian elegance. Corporate style. Reliable prestige. Emporio Armani''s logo bracelet — Milan''s most recognized symbol of accessible Italian luxury.',
    'Classification: Premium Fashion Bracelet. Emporio Armani''s Logo Bracelet presents the iconic EA eagle emblem on a premium-quality stainless steel chain. Italian craftsmanship at an accessible price point. House Allocation Price: $110 USD. Shamim Forever verified.',
    30580, 110, 30, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    23
  ),

  (
    'MICHAEL KORS CHAIN BRACELET',
    'michael-kors-chain-bracelet',
    'The Metropolitan Archive. Smart design. Everyday versatility. Global appeal. Michael Kors'' chain bracelet — New York metropolitan style distilled into refined gold-tone hardware.',
    'Classification: Luxury Fashion Bracelet. Michael Kors'' Chain Bracelet brings Manhattan sophistication to daily wear — gold-tone stainless steel links with the brand''s signature MK lock closure. House Allocation Price: $80 USD. Shamim Forever curated archive.',
    22240, 80, 40, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    24
  ),

  (
    'GUESS STEEL RING',
    'guess-steel-ring',
    'The Contemporary Archive. Affordable confidence. Modern styling. Daily durability. Guess''s men''s steel ring — California bold aesthetics in premium stainless steel, built for every day.',
    'Classification: Essential Men''s Ring. Guess''s Steel Ring delivers polished contemporary design in scratch-resistant stainless steel. Clean, modern, versatile. Designed for the man who expects quality at every price point. House Allocation Price: $75 USD. Shamim Forever verified.',
    20850, 75, 45, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    25
  ),

  (
    'DANIEL WELLINGTON CLASSIC CUFF',
    'daniel-wellington-classic-cuff',
    'The Minimal Archive. Understated luxury. Clean identity. Timeless simplicity. Daniel Wellington''s classic cuff — Scandinavian minimalism in precision-finished stainless steel.',
    'Classification: Modern Bracelet. Daniel Wellington''s Classic Cuff embodies the Scandinavian philosophy of pure form — a clean stainless steel cuff with no excess, no noise, and no compromise on quality. House Allocation Price: $55 USD. Shamim Forever curated.',
    15290, 55, 50, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    26
  ),

  (
    'SECTOR MENS CHAIN NECKLACE',
    'sector-mens-chain-necklace',
    'The Foundation Archive. Practical style. Long-term wear. Reliable value. Sector''s men''s chain necklace — Italian sporting heritage crafted for the man who values reliability above all.',
    'Classification: Everyday Chain Jewelry. Sector''s Chain Necklace is built to Italian standards of durability — stainless steel with anti-tarnish PVD coating for extended daily wear. House Allocation Price: $65 USD. Shamim Forever verified.',
    18070, 65, 55, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    27
  ),

  (
    'NAUTICA ANCHOR BRACELET',
    'nautica-anchor-bracelet',
    'The Maritime Archive. Relaxed confidence. Coastal inspiration. Affordable quality. Nautica''s anchor bracelet — the spirit of the open sea expressed in a clean, wearable masculine design.',
    'Classification: Casual Lifestyle Bracelet. Nautica''s Anchor Bracelet channels maritime tradition into an everyday accessory — stainless steel anchor charm on a braided or chain base. House Allocation Price: $45 USD. Shamim Forever curated.',
    12510, 45, 60, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    28
  ),

  (
    'HUGO BOSS STEEL LINK BRACELET',
    'hugo-boss-steel-link-bracelet',
    'The Corporate Archive. Professional elegance. Executive appearance. Modern prestige. Hugo Boss''s steel link bracelet — German precision engineering for the contemporary executive.',
    'Classification: Premium Men''s Bracelet. Hugo Boss''s Steel Link Bracelet is precision-engineered in Germany — polished stainless steel links with a secure deployant clasp. The standard of corporate masculine jewelry. House Allocation Price: $120 USD. Shamim Forever verified.',
    33360, 120, 30, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    29
  ),

  (
    'LACOSTE ESSENTIAL MENS RING',
    'lacoste-essential-mens-ring',
    'The Daily Legacy Archive. Everyday sophistication. Recognized quality. Reliable luxury. Lacoste''s essential men''s ring — French sporting elegance for the man who plays every game with style.',
    'Classification: Contemporary Fashion Ring. Lacoste''s Essential Men''s Ring brings the iconic crocodile heritage to everyday finger jewelry — stainless steel with the brand''s signature enamel crocodile motif. House Allocation Price: $70 USD. Shamim Forever curated archive.',
    19460, 70, 50, TRUE, FALSE,
    ARRAY['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80'],
    'e291b9af-a637-45da-a2df-d39f2e72e53c',
    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
    30
  );

  -- ── Verify the insert ──
  SELECT name, price_usd, sort_order
  FROM products
  WHERE main_category_id = 'e291b9af-a637-45da-a2df-d39f2e72e53c'
    AND sub_category_id = 'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b'
  ORDER BY sort_order;
  