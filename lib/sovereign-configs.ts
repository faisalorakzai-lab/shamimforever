// ═══════════════════════════════════════════════════════════════════════════
  // SOVEREIGN PRODUCT CONFIGS — Single source of truth for all product pages
  // ───────────────────────────────────────────────────────────────────────────
  // To add a new product:
  //   1. Copy a block below and paste it at the bottom of SOVEREIGN_CONFIGS
  //   2. Change the key to match the product's slug in the database
  //   3. Fill in the content
  //   4. Add the product images to /public/products/<slug>/
  // ═══════════════════════════════════════════════════════════════════════════

  export interface SovereignConfig {
    heroTitle: string
    heroSubtitle: string
    heroTagline: string
    legacyStatement: string
    legacyVoice: string
    topNotes: string[]
    heartNotes: string[]
    baseNotes: string[]
    specs: Array<{ label: string; value: string }>
    nftTitle: string
    nftEdition: string
    nftRarity: string
    nftTraits: Array<{ trait: string; value: string }>
    heroImage: string
    galleryImages: string[]
    holderPrivileges?: string[]
  }

  // ── ARCHIVE I — SHAMIM BLOOM ────────────────────────────────────────────────
  const SHAMIM_BLOOM_CONFIG: SovereignConfig = {
    heroTitle: 'SHAMIM BLOOM',
    heroSubtitle: 'The Sovereign Grace',
    heroTagline: 'Founder Reserve Allocation — Archive I',
    legacyStatement: 'Love does not fade; it blooms into eternity.',
    legacyVoice:
      "Some fragrances are worn. Some fragrances are admired. But a rare few become part of a person's identity. Shamim Bloom was never created to attract attention. It was created to preserve presence. Inside the House of Shamim Forever, fragrance is treated not as beauty — but as emotional architecture. Every accord within Shamim Bloom was sculpted to capture a feeling so profound that it refused to disappear. At the center of the composition lies the legendary Taif Rose, harvested before sunrise from the mountains of Taif where survival itself is an act of grace. United with White Ambergris drawn from the mysteries of the sea — one born from the mountains, one born from the ocean — together they create an aura that feels timeless. Soft enough to comfort. Powerful enough to remain unforgettable. This is the story of a woman whose elegance becomes permanence. A woman whose silence carries more influence than noise. A woman remembered long after she leaves the room.",
    topNotes: ['Velvet Peony', 'White Rose Silk', 'Soft Blush Accord'],
    heartNotes: ['Taif Rose Absolute', 'Turkish Rose Resin', 'Imperial Floral Nectar'],
    baseNotes: ['White Ambergris', 'Cashmere Skin Musk', 'Warm Cream Woods'],
    specs: [
      { label: 'Concentration Class', value: 'Extrait de Parfum' },
      { label: 'Volume Allocation', value: '100ML' },
      { label: 'Longevity', value: '12–18+ Hours' },
      { label: 'Projection', value: 'Elegant Sovereign Aura' },
      { label: 'Sillage', value: 'Soft Yet Commanding' },
      { label: 'Batch Philosophy', value: 'Founder Reserve Allocation' },
      { label: 'Gender Profile', value: 'Feminine Luxury' },
      { label: 'Production Method', value: 'Small-Batch Sovereign Craftsmanship' },
      { label: 'Wearing Environment', value: 'Royal Events · Private Gatherings · Evening Elegance' },
      { label: 'Authentication', value: 'Polygon Verified' },
      { label: 'NFT Pairing', value: 'Enabled' },
      { label: 'Production Status', value: 'Limited Founder Batch' },
    ],
    nftTitle: 'Shamim Bloom — Founder Reserve Edition',
    nftEdition: 'Founder Reserve Allocation — Archive I',
    nftRarity: 'FOUNDER RESERVE',
    nftTraits: [
      { trait: 'Category', value: 'Sovereign Fragrance Asset' },
      { trait: 'Collection', value: 'Shamim Bloom' },
      { trait: 'Rarity Tier', value: 'FOUNDER RESERVE' },
      { trait: 'Authentication', value: 'Polygon Verified' },
      { trait: 'Ownership Status', value: 'Active Sovereign Passport' },
      { trait: 'Physical Asset Pairing', value: 'Yes' },
      { trait: 'Production Allocation', value: 'Limited' },
      { trait: 'Craftsmanship Origin', value: 'Karachi Sovereign Atelier' },
      { trait: 'Collector Status', value: 'Founder Reserve' },
      { trait: 'Concierge Access', value: 'Enabled' },
      { trait: 'Archive Status', value: 'Active' },
    ],
    heroImage: '/products/shamims-bloom/bloom-hero.png',
    galleryImages: [
      '/products/shamims-bloom/bloom-hero.png',
      '/products/shamims-bloom/bloom-1.png',
    ],
    holderPrivileges: [
      'Sovereign Vault Membership — Lifetime access to the House of Shamim Forever private archive',
      'Concierge Refill Program — Priority restocking with white-glove packaging at founder pricing',
      'Early Access to Future Releases — First allocation rights on all new Chapter launches',
      'Exclusive Atelier Events Invitation — Private fragrance ceremonies, launches, and Sovereign gatherings',
      'One-Time Complimentary Engraving — Personalised flacon engraving on your first refill order',
      'Lifetime Authentication Certificate — Blockchain-verified provenance record on Polygon Mainnet',
      'Quarterly Sovereign Newsletter — Behind-the-scenes creation stories and archive updates',
      'White-Glove Packaging on All Future Orders — Hand-wrapped in sovereign black tissue and wax seal',
      'Direct WhatsApp Concierge Line — Priority contact with the House of Shamim Forever team',
      'Founder Reserve Badge — Digital and physical recognition as a founding patron of the archive',
    ],
  }

  // ── ARCHIVE II — QUEEN OF TAIF ─────────────────────────────────────────────
  const QUEEN_OF_TAIF_CONFIG: SovereignConfig = {
    heroTitle: 'QUEEN OF TAIF',
    heroSubtitle: 'The Rose Sovereign',
    heroTagline: 'Archive II · Royal Reserve Allocation',
    legacyStatement: 'From ancient Taif valleys, where roses carry the weight of empires.',
    legacyVoice:
      'The Queen of Taif is an act of devotion. Sourced from the legendary Taif rose harvest — the rarest in the Arab world — this fragrance channels centuries of royal tradition into one breathtaking declaration. For those who command rooms without speaking.',
    topNotes: ['Damascene Rose Dew', 'Taif Blossom Elixir', 'Golden Saffron Silk'],
    heartNotes: ['Oud Rose Fusion', 'Bulgarian Rose Absolute', 'Tuberose Majesty'],
    baseNotes: ['Royal Ambergris', 'Sandalwood Throne', 'Sacred Incense Trail'],
    specs: [
      { label: 'Classification', value: 'Imperial Rose Extrait' },
      { label: 'Concentration', value: 'Extrait de Parfum — 42%' },
      { label: 'Volume', value: '100ML · Royal Allocation' },
      { label: 'Longevity', value: '16–24+ Hours' },
      { label: 'Projection', value: 'Majestic Royal Aura' },
      { label: 'Edition', value: 'Archive II — 50 Flacons' },
      { label: 'Authentication', value: 'Polygon Mainnet NFT' },
    ],
    nftTitle: 'Queen of Taif',
    nftEdition: 'Rose Sovereign Edition',
    nftRarity: 'ROYAL FOUNDERS',
    nftTraits: [
      { trait: 'Archive', value: 'Archive II — Royal Reserve' },
      { trait: 'Series', value: 'The Imperial Rose' },
      { trait: 'Edition', value: 'Royal — 50 Flacons' },
      { trait: 'Access Tier', value: 'Royal Sovereign' },
    ],
    heroImage: '/products/queen-of-taif/queen-hero.png',
    galleryImages: ['/products/queen-of-taif/queen-hero.png', '/products/queen-of-taif/queen-box.png'],
    holderPrivileges: [
      'Royal Vault Membership — Lifetime access to the House of Shamim Forever Royal Archive',
      'Taif Rose Concierge Refill Program — Priority restocking at founder pricing with royal packaging',
      'Early Access to Future Chapter Releases — First allocation rights on all new sovereign launches',
      'Royal House Events Invitation — Private fragrance ceremonies and exclusive Taif Rose gatherings',
      'One-Time Complimentary Engraving — Personalised flacon engraving on your first refill order',
      'Lifetime Blockchain Authentication — Polygon-verified provenance record permanently linked',
      'Quarterly Royal Newsletter — Behind-the-scenes craftsmanship stories and archive updates',
      'White-Glove Royal Packaging — Hand-wrapped in sovereign tissue on all future orders',
      'Direct WhatsApp Royal Concierge — Priority contact with the House of Shamim Forever team',
      'Royal Founders Badge — Digital and physical recognition as a founding royal patron',
    ],
  }

  // ── ARCHIVE II — ETERNAL EMPRESS ───────────────────────────────────────────
  const ETERNAL_EMPRESS_CONFIG: SovereignConfig = {
    heroTitle: 'ETERNAL EMPRESS',
    heroSubtitle: 'The Sovereign Reign',
    heroTagline: 'Imperial Reserve Allocation — Archive II',
    legacyStatement: 'Queens inherit kingdoms. Empresses create them.',
    legacyVoice:
      "Eternal Empress was never designed to be worn. It was designed to be remembered. Inside the House of Shamim Forever, certain creations are born not from trends, but from philosophy. A philosophy built upon silence, structure, emotional depth, and absolute authority. At the center of this composition stand two of perfumery's most aristocratic floral treasures: Imperial Red Rose Absolute and French Royal Violet. The rose embodies passion disciplined by wisdom. The violet embodies elegance refined by time. Together they create a floral architecture that feels regal, commanding, and profoundly expensive. Beneath this royal heart lies a foundation built upon Golden Ambergris and an aged Royal Oud Accord — one born from the mysteries of the ocean, one born from the heritage of kings. Together they create an aura that feels less like perfume and more like inherited authority. This is not beauty. This is power wearing beauty as its crown.",
    topNotes: ['Crystal Pear Nectar', 'White Champagne Accord', 'Royal Bergamot Silk'],
    heartNotes: ['Imperial Red Rose Absolute', 'French Royal Violet', 'Golden Floral Resin'],
    baseNotes: ['Golden Ambergris', 'Royal Oud Accord', 'Cashmere Woods', 'White Velvet Musk'],
    specs: [
      { label: 'Concentration Class', value: 'Extrait de Parfum' },
      { label: 'Volume Allocation', value: '100ML' },
      { label: 'Longevity', value: '16–24+ Hours' },
      { label: 'Projection', value: 'Imperial Aura Expansion' },
      { label: 'Sillage', value: 'Commanding Velvet Trail' },
      { label: 'Batch Philosophy', value: 'Imperial Reserve Allocation' },
      { label: 'Gender Profile', value: 'Feminine Royal Luxury' },
      { label: 'Production Method', value: 'Ultra-Limited Sovereign Craftsmanship' },
      { label: 'Wearing Environment', value: 'State Events · Private Galas · Luxury Gatherings · Signature Authority Moments' },
      { label: 'Authentication', value: 'Polygon Verified' },
      { label: 'NFT Pairing', value: 'Enabled' },
      { label: 'Production Status', value: 'Ultra-Limited Imperial Batch' },
    ],
    nftTitle: 'Eternal Empress — Imperial Reserve Edition',
    nftEdition: 'Imperial Reserve Allocation — Archive II',
    nftRarity: 'IMPERIAL RESERVE',
    nftTraits: [
      { trait: 'Category', value: 'Sovereign Fragrance Asset' },
      { trait: 'Collection', value: 'Eternal Empress' },
      { trait: 'Rarity Tier', value: 'IMPERIAL RESERVE' },
      { trait: 'Authentication', value: 'Polygon Verified' },
      { trait: 'Ownership Status', value: 'Active Sovereign Passport' },
      { trait: 'Physical Asset Pairing', value: 'Yes' },
      { trait: 'Production Allocation', value: 'Ultra Limited' },
      { trait: 'Craftsmanship Origin', value: 'Karachi Sovereign Atelier' },
      { trait: 'Collector Status', value: 'Imperial Founder' },
      { trait: 'Concierge Access', value: 'Enabled' },
      { trait: 'Archive Status', value: 'Active' },
    ],
    heroImage: '/products/eternal-empress/empress-hero.png',
    galleryImages: [
      '/products/eternal-empress/empress-hero.png',
      '/products/eternal-empress/empress-1.png',
    ],
    holderPrivileges: [
      'Imperial Founder Status — Permanently recognised as a founding patron of the Imperial Archive',
      'Sovereign Vault Access — Lifetime entry to the House of Shamim Forever exclusive private vault',
      'Future Archive Allocations — Priority rights on all future sovereign imperial releases',
      'Private Jewelry Invitations — Exclusive access to House jewelry and sovereign accessory previews',
      'House Ceremonies — Invitation to private imperial fragrance ceremonies and Atelier events',
      'Priority Authentication Services — Expedited blockchain verification and provenance documentation',
      'Concierge Restoration Program — White-glove restoration and refill service at imperial pricing',
      'Lifetime Provenance Protection — Permanent blockchain record securing ownership history',
      'Collector Registry Recognition — Official listing within the House of Shamim Forever collector registry',
      'Early Access to Future Sovereign Releases — First allocation on every new Chapter and Archive launch',
    ],
  }

  // ── ARCHIVE IV — HER LEGACY VAULT ─────────────────────────────────────────
  const HER_LEGACY_VAULT_CONFIG: SovereignConfig = {
    heroTitle: 'HER LEGACY VAULT',
    heroSubtitle: 'The Eternal Archive',
    heroTagline: 'Grand Sovereign Allocation — Archive IV',
    legacyStatement: 'Some women leave memories. Legends leave dynasties.',
    legacyVoice:
      'Most luxury products are created to be owned. Some are created to be admired. But only a rare few are created to become family history. Her Legacy Vault is not merely a fragrance — it is the final archive of feminine sovereignty preserved in physical form. At its center lies Florentine Iris (Orris Butter), fused with Pure White Ambergris Tincture — together creating a texture unlike ordinary fragrance. Creamy. Powdered. Velvety. A memory preserved inside silk. Quiet. Refined. Timeless.',
    topNotes: ['Champagne Pear Accord', 'White Velvet Iris Petals', 'Soft Crystal Bergamot'],
    heartNotes: ['Florentine Orris Butter', 'Imperial White Rose', 'Golden Mimosa Nectar'],
    baseNotes: ['Pure White Ambergris Tincture', 'Cashmere Woods', 'Royal Skin Musk', 'Aged Sandalwood Cream'],
    specs: [
      { label: 'Concentration Class', value: 'Extrait de Parfum' },
      { label: 'Volume Allocation', value: '100ML — 3.4 FL. OZ.' },
      { label: 'Longevity', value: '18–36+ Hours' },
      { label: 'Projection', value: 'Elegant Sovereign Aura' },
      { label: 'Sillage', value: 'Refined Legacy Trail' },
      { label: 'Batch Philosophy', value: 'Grand Archive Allocation' },
      { label: 'Gender Profile', value: 'Feminine Sovereign Luxury' },
      { label: 'Production Method', value: 'Ultra-Limited Atelier Craftsmanship' },
      { label: 'Authentication', value: 'Polygon Verified' },
    ],
    nftTitle: 'Her Legacy Vault',
    nftEdition: 'Grand Archive Edition',
    nftRarity: 'GRAND ARCHIVE',
    nftTraits: [
      { trait: 'Category', value: 'Sovereign Fragrance Asset' },
      { trait: 'Archive Status', value: 'Archive IV — Eternal' },
      { trait: 'Collector Status', value: 'Founder Archive' },
      { trait: 'Holder Privileges', value: 'Grand Archive Access + Concierge' },
    ],
    heroImage: '/products/her-legacy-vault/vault-hero.png',
    galleryImages: ['/products/her-legacy-vault/vault-hero.png', '/products/her-legacy-vault/vault-box.png'],
    holderPrivileges: [
      'Grand Archive Membership — Lifetime access to the House of Shamim Forever eternal legacy archive',
      'Legacy Refill Program — Priority restocking with grand archive packaging at founder pricing',
      'First Allocation on Future Sovereign Releases — Priority rights on all upcoming House creations',
      'Grand Archive Events Invitation — Exclusive access to legacy ceremonies and private archive gatherings',
      'One-Time Complimentary Engraving — Personalised flacon engraving on your first refill order',
      'Lifetime Blockchain Authentication — Polygon-verified provenance record permanently secured',
      'Quarterly Legacy Newsletter — Exclusive creation stories and dispatches from the Grand Archive',
      'White-Glove Legacy Packaging — Hand-wrapped in grand archive tissue with wax seal on all future orders',
      'Direct WhatsApp Legacy Concierge — Priority contact with the House of Shamim Forever team',
      'Grand Archive Founders Badge — Permanent recognition as a founding patron of the eternal archive',
    ],
  }

  
  // ── ARCHIVE I — SOVEREIGN AMETHYST ────────────────────────────────────────
  const SOVEREIGN_AMETHYST_CONFIG: SovereignConfig = {
    heroTitle: 'SOVEREIGN AMETHYST',
    heroSubtitle: 'The Crown Jewel of Silence',
    heroTagline: 'Imperial Reserve Allocation — Archive I',
    legacyStatement: 'Elegance does not seek attention. It commands reverence.',
    legacyVoice:
      "Sovereign Amethyst is not created to be noticed. It is created to be felt — silently, permanently, and irreversibly. Inside the House of Shamim Forever, certain creations are designed not for presence that speaks, but for presence that redefines silence itself. This is not a fragrance for the visible world. It is a fragrance for the invisible hierarchy of influence. Some people announce their arrival through noise. Others redefine the room without ever speaking. Sovereign Amethyst is crafted for women who understand a deeper truth: Real status is never loud. It is quiet, controlled, and absolute. This fragrance belongs to those whose influence is not dependent on reaction, validation, or attention. It is for women who exist like a hidden axis of gravity — everything aligns around them, without them moving. A violet shadow of authority. A calm storm of refinement. A presence that does not enter space — it restructures it.",
    topNotes: ['Rare Purple Iris Absolute', 'Crystal Dew Accord', 'Soft Mineral Air Accord'],
    heartNotes: ['Midnight Orchid Bloom', 'Amethyst Floral Shadow Accord', 'Powdered Silk Petals'],
    baseNotes: ['Rich Amethyst Amber', 'Liquid Honey Resin Accord', 'Soft Cashmere Woods', 'White Skin Musk'],
    specs: [
      { label: 'Concentration Class', value: 'Extrait de Parfum' },
      { label: 'Volume Allocation', value: '100ML' },
      { label: 'Longevity', value: '14–20+ Hours' },
      { label: 'Projection', value: 'Controlled Aura Diffusion' },
      { label: 'Sillage', value: 'Velvet Violet Trail' },
      { label: 'Batch Philosophy', value: 'Imperial Reserve Allocation' },
      { label: 'Gender Profile', value: 'Imperial Feminine Extrait' },
      { label: 'Craft Origin', value: 'Karachi Sovereign Atelier' },
      { label: 'Wearing Environment', value: 'Intimate Gatherings · High-Status Environments · Silent Authority Events' },
      { label: 'Authentication', value: 'Polygon Verified' },
      { label: 'NFT Pairing', value: 'Enabled' },
      { label: 'Production Status', value: 'Ultra-Limited Reserve Allocation' },
    ],
    nftTitle: 'Sovereign Amethyst — Crowned Silence Edition',
    nftEdition: 'Imperial Reserve Allocation — Archive I',
    nftRarity: 'CROWNED SILENCE',
    nftTraits: [
      { trait: 'Category', value: 'Sovereign Fragrance Asset' },
      { trait: 'Collection', value: 'Sovereign Amethyst' },
      { trait: 'Rarity Tier', value: 'CROWNED SILENCE' },
      { trait: 'Authentication', value: 'Polygon Verified' },
      { trait: 'Ownership Status', value: 'Active Sovereign Passport' },
      { trait: 'Physical Asset Pairing', value: 'Yes' },
      { trait: 'Production Allocation', value: 'Ultra Limited' },
      { trait: 'Craftsmanship Origin', value: 'Karachi Sovereign Atelier' },
      { trait: 'Collector Status', value: 'Imperial Reserve' },
      { trait: 'Concierge Access', value: 'Enabled' },
      { trait: 'Archive Status', value: 'Active' },
    ],
    heroImage: '/products/sovereign-amethyst/amethyst-hero.png',
    galleryImages: [
      '/products/sovereign-amethyst/amethyst-hero.png',
      '/products/sovereign-amethyst/amethyst-1.png',
    ],
    holderPrivileges: [
      'Sovereign Access Tier — Elevated membership status within the House of Shamim Forever archive',
      'Private Vault Eligibility — Exclusive access to the House private sovereign vault and collection',
      'Future Archive Priority Allocation — First rights on all upcoming imperial sovereign releases',
      'House Invitation Rights — Private invitations to House ceremonies, launches, and elite gatherings',
      'Authentication Concierge Service — Dedicated blockchain verification and provenance documentation',
      'Collector Registry Recognition — Official listing within the House of Shamim Forever collector registry',
      'Legacy Protection Protocol — Permanent provenance security and ownership lineage preservation',
      'Early Sovereign Drop Access — First notification and allocation on every new Archive drop',
      'White-Glove Packaging Service — Hand-wrapped with violet silk tissue on all future orders',
      'Direct WhatsApp Sovereign Concierge — Priority contact with the House of Shamim Forever team',
    ],
  }
  

    // ── ARCHIVE I — SHAMIM'S GHOST ────────────────────────────────────────────
    const SHAMIMS_GHOST_CONFIG: SovereignConfig = {
      heroTitle: "SHAMIM'S GHOST",
      heroSubtitle: 'The Eternal Legacy',
      heroTagline: 'Imperial Reserve Allocation — Archive I',
      legacyStatement: "Kings do not fight for territory. They build empires that outlive time.",
      legacyVoice:
        "Shamim's Ghost is not a fragrance. It is a masculine sovereign imprint — a presence that does not follow history, but quietly becomes part of it. Inside the House of Shamim Forever, this creation represents the origin of legacy itself: not loud dominance, but silent permanence. It is not designed for attention. It is designed for memory that refuses to fade. True power is never expressive. It is structural. Shamim's Ghost is crafted for men who do not compete for space in the world — they redefine the boundaries of it. This is the fragrance of a modern monarch. A man whose authority does not rise in voice. It settles in silence. A man whose presence does not enter a room. It occupies it before arrival is even registered. Kuch mard apni taqat alfaaz aur shor se sabit karte hain. Magar asli mardana shahi rutba khamoshi se pehchana jata hai. Shamim's Ghost un elite aur high-profile leaders ke liye banaya gaya hai jo sirf success nahi chahte — balkay permanent legacy chahte hain. This is not fragrance. This is psychological architecture.",
      topNotes: ['Smoked Black Resin Air', 'Dark Bergamot Extraction', 'Burned Wood Accord'],
      heartNotes: ['Smoked Royal Ambergris', 'Vintage Cambodian Oud', 'Pure Iranian Saffron Threads'],
      baseNotes: ['Crisp Leather Accord', 'Deep Oud Smoke Base', 'Dark Amber Woods', 'Black Musk Residue'],
      specs: [
        { label: 'Masculine Identity', value: 'Masculine Sovereign Extrait' },
        { label: 'Concentration', value: 'Extrait de Parfum' },
        { label: 'Volume Allocation', value: '100ML' },
        { label: 'Longevity', value: '18–30+ Hours' },
        { label: 'Projection', value: 'Controlled Sovereign Pressure Field' },
        { label: 'Sillage', value: 'Smoky Royal Trail' },
        { label: 'Batch Philosophy', value: 'Imperial Reserve Allocation' },
        { label: 'Gender Profile', value: 'Ultra-Masculine Luxury' },
        { label: 'Production Method', value: 'Small-Batch Sovereign Craftsmanship' },
        { label: 'Wearing Environment', value: 'Boardrooms · Private Deals · High-Level Negotiations · Elite Masculine Gatherings' },
        { label: 'Authentication', value: 'Polygon Verified' },
        { label: 'NFT Pairing', value: 'Enabled' },
        { label: 'Production Status', value: 'Ultra-Limited Imperial Allocation' },
        { label: 'Craft Origin', value: 'Karachi Sovereign Atelier' },
      ],
      nftTitle: "Shamim's Ghost — Eternal Legacy Edition",
      nftEdition: 'Imperial Reserve Allocation — Archive I',
      nftRarity: 'IMPERIAL RESERVE',
      nftTraits: [
        { trait: 'Category', value: 'Sovereign Fragrance Asset' },
        { trait: 'Collection', value: "Shamim's Ghost" },
        { trait: 'Rarity Tier', value: 'IMPERIAL RESERVE' },
        { trait: 'Authentication', value: 'Polygon Verified' },
        { trait: 'Ownership Status', value: 'Active Sovereign Passport' },
        { trait: 'Physical Asset Pairing', value: 'Yes' },
        { trait: 'Production Allocation', value: 'Ultra Limited' },
        { trait: 'Craftsmanship Origin', value: 'Karachi Sovereign Atelier' },
        { trait: 'Collector Status', value: 'Imperial Founder' },
        { trait: 'Concierge Access', value: 'Enabled' },
        { trait: 'Archive Status', value: 'Active' },
        { trait: 'Blockchain', value: 'Polygon Mainnet' },
      ],
      heroImage: '/products/shamims-ghost/ghost-hero.png',
      galleryImages: [
        '/products/shamims-ghost/ghost-hero.png',
        '/products/shamims-ghost/ghost-box.png',
      ],
      holderPrivileges: [
        'Founder Legacy Status — Permanently recognised as a founding patron of the Imperial Archive',
        'Sovereign Vault Privileges — Lifetime access to the House of Shamim Forever private vault',
        'Future Archive Allocation Rights — Priority rights on all upcoming sovereign imperial releases',
        'Private House Access — Exclusive invitations to private House ceremonies and elite gatherings',
        'Authentication Concierge Support — Dedicated blockchain verification and provenance documentation',
        'Collector Registry Recognition — Official listing within the House of Shamim Forever collector registry',
        'Legacy Continuation Protocol — Permanent provenance security and ownership lineage preservation',
        'Early Sovereign Release Access — First notification and allocation on every new Archive drop',
        'White-Glove Packaging Service — Hand-wrapped in sovereign black tissue with seal on all future orders',
        'Direct WhatsApp Sovereign Concierge — Priority contact with the House of Shamim Forever team',
      ],
    }
  

    // ── ARCHIVE 00 — FOUNDER'S ETERNAL ARCHIVE ────────────────────────────────
    const FOUNDERS_ETERNAL_ARCHIVE_CONFIG: SovereignConfig = {
      heroTitle: "FOUNDER'S ETERNAL ARCHIVE",
      heroSubtitle: 'The Sovereign Vault',
      heroTagline: "Founder Reserve Allocation — Archive 00",
      legacyStatement: "Time does not dissolve power. It archives it into an empire.",
      legacyVoice:
        "Founder's Eternal Archive was never created as a fragrance. It was created as a permanent monument to legacy. Inside the House of Shamim Forever, every creation carries a story. This creation carries the origin of all stories. The founder. The architect. The visionary. The man whose principles become institutions and whose decisions continue shaping reality long after his voice falls silent. Most men build wealth. A rare few build history. The rarest build civilizations. Founder's Eternal Archive is dedicated to the men who create structures larger than themselves — men whose names become foundations, men whose vision survives generations, men who answer to no throne because they built the throne itself. Kuch log duniya mein aate hain aur waqt ke saath unka naam dhundla jata hai. Lekin asal founders kabhi khatam nahi hote. Unke usool, unki soch aur unka nizaam unke baad bhi zinda rehta hai. This is not a fragrance. This is preserved authority.",
      topNotes: ['Silver Incense Accord', 'Cold Mineral Smoke', 'Black Cedar Essence'],
      heartNotes: ['Aged Black Oud Resins', 'Wild Tobacco Absolute', 'Rare Dark Ambergris'],
      baseNotes: ['Natural Siberian Musk', 'Obsidian Woods', 'Dark Resin Accord', 'Aged Leather Archive'],
      specs: [
        { label: 'Masculine Identity', value: 'Founder Reserve Masculine Extrait' },
        { label: 'Concentration', value: 'Extrait de Parfum Extreme' },
        { label: 'Volume Allocation', value: '100ML' },
        { label: 'Longevity', value: '24–48+ Hours' },
        { label: 'Projection', value: 'Sovereign Authority Radius' },
        { label: 'Sillage', value: 'Archive Smoke Trail' },
        { label: 'Batch Philosophy', value: 'Founder Reserve Allocation' },
        { label: 'Gender Profile', value: 'Ultra-Luxury Masculine' },
        { label: 'Production Method', value: 'Museum-Grade Craftsmanship' },
        { label: 'Wearing Environment', value: 'Private Boardrooms · Founder Gatherings · Legacy Events · Institutional Ceremonies' },
        { label: 'Authentication', value: 'Polygon Verified' },
        { label: 'NFT Pairing', value: 'Enabled' },
        { label: 'Production Status', value: 'Ultra-Limited Founder Batch' },
        { label: 'Craft Origin', value: 'Karachi Sovereign Atelier' },
        { label: 'Valuation', value: 'Rs 150,000 PKR' },
      ],
      nftTitle: "Founder's Eternal Archive — Sovereign Vault Edition",
      nftEdition: 'Founder Reserve Allocation — Archive 00',
      nftRarity: 'FOUNDER SOVEREIGN',
      nftTraits: [
        { trait: 'Category', value: 'Sovereign Fragrance Asset' },
        { trait: 'Collection', value: "Founder's Eternal Archive" },
        { trait: 'Rarity Tier', value: 'FOUNDER SOVEREIGN' },
        { trait: 'Authentication', value: 'Polygon Verified' },
        { trait: 'Ownership Status', value: 'Active Sovereign Passport' },
        { trait: 'Physical Asset Pairing', value: 'Yes' },
        { trait: 'Production Allocation', value: 'Ultra Limited' },
        { trait: 'Craftsmanship Origin', value: 'Karachi Sovereign Atelier' },
        { trait: 'Collector Status', value: 'Founder Sovereign' },
        { trait: 'Concierge Access', value: 'Enabled' },
        { trait: 'Archive Status', value: 'Active' },
        { trait: 'Blockchain', value: 'Polygon Mainnet' },
        { trait: 'Archive Tier', value: 'Archive 00 — Origin' },
      ],
      heroImage: '/products/founders-eternal-archive/founder-hero.png',
      galleryImages: [
        '/products/founders-eternal-archive/founder-hero.png',
        '/products/founders-eternal-archive/founder-box.png',
      ],
      holderPrivileges: [
        'Founder Sovereign Status — Highest tier recognition within the House of Shamim Forever archive',
        'Archive Vault Access — Permanent lifetime entry to the founder-exclusive sovereign vault',
        'Future Founder Allocations — First priority rights on all upcoming House creations',
        'Private House Ceremonies — Exclusive invitations to private founder-only ceremonies and events',
        'Collector Registry Recognition — Official listing within the House of Shamim Forever founder registry',
        'Priority Authentication Services — Dedicated blockchain verification and provenance documentation',
        'Concierge Preservation Program — White-glove restoration and refill at founder pricing',
        'Lifetime Provenance Protection — Permanent blockchain record securing ownership and lineage',
        'Legacy Registry Membership — Permanent entry in the House of Shamim Forever legacy archive',
        'Early Access To Future Founder Releases — First notification and allocation on every Archive drop',
      ],
    }
  
export const SOVEREIGN_CONFIGS: Record<string, SovereignConfig> = {

    // ── ARCHIVE I ──────────────────────────────────────────────────────────────

      // ── ARCHIVE I — FOR HIM ────────────────────────────────────────────────────
      'shamim-s-ghost-the-eternal-legacy': SHAMIMS_GHOST_CONFIG,
      'shamims-ghost': SHAMIMS_GHOST_CONFIG,
      "shamim's-ghost": SHAMIMS_GHOST_CONFIG,
      'shamims-ghost-the-eternal-legacy': SHAMIMS_GHOST_CONFIG,

      'shamims-bloom': SHAMIM_BLOOM_CONFIG,
    'shamim-bloom': SHAMIM_BLOOM_CONFIG,
    'shamim-bloom-the-sovereign-grace': SHAMIM_BLOOM_CONFIG,

    'sovereign-amethyst': SOVEREIGN_AMETHYST_CONFIG,

    // ── ARCHIVE II ─────────────────────────────────────────────────────────────
    'queen-of-taif': QUEEN_OF_TAIF_CONFIG,

    // ── ARCHIVE II — IMPERIAL ──────────────────────────────────────────────────
    'eternal-empress': ETERNAL_EMPRESS_CONFIG,

    // ── ARCHIVE IV ─────────────────────────────────────────────────────────────
    'her-legacy-vault': HER_LEGACY_VAULT_CONFIG,

    // ── ARCHIVE 00 — FOR HIM (FOUNDER) ──────────────────────────────────────────
    'founder-s-eternal-archive': FOUNDERS_ETERNAL_ARCHIVE_CONFIG,
    'founders-eternal-archive': FOUNDERS_ETERNAL_ARCHIVE_CONFIG,
    'sapphire-blue-levant': SAPPHIRE_BLUE_LEVANT_CONFIG,

  }
 
  export const SAPPHIRE_BLUE_LEVANT_CONFIG: SovereignProductConfig = {
    slug: 'sapphire-blue-levant',
    heroTagline: 'Calm waters run deep. True power requires no storm.',
    sovereignTitle: 'THE SOVEREIGN MEDITERRANEAN',
    collectionLabel: 'Imperial Reserve Allocation — Archive III',
    price: 'Rs. 75,000',
    volume: '100ML',
    concentration: 'Extrait de Parfum',
    longevity: '14–20+ Hours',
    projection: 'Mediterranean Aura Expansion',
    heroDescription: 'An oceanic masculine extrait crafted around French Blue Lotus, Blue Cypress Wood, White Ambergris, and Indonesian Patchouli — engineered for men whose calm becomes their greatest authority.',
    philosophy: 'Sapphire Blue Levant is dedicated to men who possess composed authority. The kind that never panics. Never rushes. Never loses structure. This fragrance embodies the mentality of a sovereign navigator crossing endless oceans with complete certainty of direction.',
    kahani: 'Aam fresh perfumes chand lamhon ke liye taazgi dete hain aur phir hawa mein kho jate hain. Lekin asli luxury permanence ke saath aati hai. Sapphire Blue Levant un elite mardon ke liye tarasha gaya hai jo freshness ko bhi billionaire standard par experience karna chahte hain.',
    kahaniFormal: 'Rs. 75,000 ka ye allocation sirf price nahi. Ye refinement ka filter hai — un logon ke liye jo pressure ke darmiyan bhi samandar ki gehrayi ki tarah pur-sukoon rehte hain.',
    scentPyramid: {
      top: {
        title: 'THE CRYSTAL HORIZON',
        subtitle: 'Opening Layer',
        notes: ['Crisp Sea Salt Accord', 'Italian Sea Bergamot', 'Mediterranean Mineral Air'],
        mood: 'Pure clarity. Oceanic freedom. Cold precision.',
      },
      heart: {
        title: 'THE BLUE LEVANT HEART',
        subtitle: 'Identity Layer',
        notes: ['French Blue Lotus', 'Premium Blue Cypress Wood', 'Marine Floral Accord'],
        mood: 'Refined masculinity. Calm confidence. Controlled sophistication.',
      },
      base: {
        title: 'THE SOVEREIGN FOUNDATION',
        subtitle: 'Base Layer',
        notes: ['Royal White Ambergris Tincture', 'Aged Indonesian Patchouli', 'Silver Driftwood Accord', 'White Mineral Musk'],
        mood: 'Enduring stability. Quiet luxury. Permanent depth.',
      },
    },
    atmosphericPresence: 'Sapphire Blue Levant does not dominate a room. It stabilizes it. Its opening feels like the first breath of cold Mediterranean air at sunrise. Its heart unfolds with disciplined elegance. Its foundation settles into a calm maritime aura that remains attached to memory long after departure.',
    flaconDesign: 'Sculpted from deep sapphire crystal infused with shifting ocean-blue reflections. Its cap is forged from brushed silver alloy inspired by maritime navigation instruments, with a sapphire emblem symbolizing stability, direction, and mastery over uncertainty.',
    presentationVault: 'Museum-grade maritime chest crafted from matte obsidian architecture lined with deep sapphire velvet interiors.',
    vaultIncludes: ['Authenticated Serial Identity', 'Imperial Allocation Certificate', 'NFC Verification Seal', 'Blockchain Ownership Registration', 'Digital Twin NFT Passport', 'Collector Documentation', 'Archive Signature Card'],
    holderPrivileges: ['Imperial Collector Status', 'Sovereign Vault Access', 'Future Maritime Allocations', 'Private House Invitations', 'Collector Registry Recognition', 'Priority Authentication Services', 'Concierge Preservation Program', 'Lifetime Provenance Protection', 'Early Access To Future Releases'],
    nftName: 'Sapphire Blue Levant — Sovereign Mediterranean Edition',
    nftDescription: 'A blockchain-authenticated maritime fragrance asset crafted around Mediterranean freshness and sovereign stability. This digital passport certifies ownership, provenance, rarity allocation, collector privileges, and House recognition.',
    performanceMatrix: {
      concentration: 'Extrait de Parfum',
      volume: '100ML',
      longevity: '14–20+ Hours',
      projection: 'Mediterranean Aura Expansion',
      sillage: 'Oceanic Sovereign Trail',
      batch: 'Imperial Reserve Allocation',
      gender: 'Fresh Luxury Masculine',
      production: 'Ultra-Limited Maritime Craftsmanship',
    },
    wearingEnvironments: ['Executive Meetings', 'Luxury Resorts', 'Private Yachts', 'Summer Evenings', 'Coastal Gatherings', 'Daily Signature Wear'],
    accentColor: '#1a3a6b',
    accentGold: '#c9a84c',
  }
   