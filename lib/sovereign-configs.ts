// ═══════════════════════════════════════════════════════════════════════════
  // SOVEREIGN PRODUCT CONFIGS — Single source of truth for all product pages
  // ───────────────────────────────────────────────────────────────────────────
  // To add a new product:
  //   1. Copy a block below and paste it at the bottom of SOVEREIGN_CONFIGS
  //   2. Change the key to match the product's slug in the database (e.g. 'midnight-oud')
  //   3. Fill in the content
  //   4. Add the product images to /public/products/<slug>/
  //   Done — the product page will render automatically using the luxury design
  // ═══════════════════════════════════════════════════════════════════════════

  export interface SovereignConfig {
    heroTitle: string; heroSubtitle: string; heroTagline: string
    legacyStatement: string; legacyVoice: string
    topNotes: string[]; heartNotes: string[]; baseNotes: string[]
    specs: Array<{ label: string; value: string }>
    nftTitle: string; nftEdition: string; nftRarity: string
    nftTraits: Array<{ trait: string; value: string }>
    heroImage: string; galleryImages: string[]
  }

  export const SOVEREIGN_CONFIGS: Record<string, SovereignConfig> = {

    // ── ARCHIVE I ──────────────────────────────────────────────────────────────
    'shamims-bloom': {
      heroTitle: "SHAMIM'S BLOOM", heroSubtitle: "The Sovereign Grace",
      heroTagline: "Archive I · Founder Reserve Allocation",
      legacyStatement: "In every breath, a dynasty. In every note, a sovereign memory that transcends time.",
      legacyVoice: "Shamim's Bloom was born not from a laboratory, but from a legacy. A fragrance that carries the weight of generations — the velvet of Taif roses, the warmth of cashmere skin, the eternal whisper of white ambergris. This is not perfume. This is identity.",
      topNotes: ['Velvet Peony', 'White Rose Silk', 'Soft Blush Accord'],
      heartNotes: ['Taif Rose Absolute', 'Turkish Rose Resin', 'Imperial Floral Nectar'],
      baseNotes: ['White Ambergris', 'Cashmere Skin Musk', 'Warm Cream Woods'],
      specs: [
        { label: 'Classification', value: 'Sovereign Feminine Extrait' },
        { label: 'Concentration', value: 'Extrait de Parfum — 40%' },
        { label: 'Volume', value: '100ML · Archive Allocation' },
        { label: 'Longevity', value: '12–18+ Hours' },
        { label: 'Projection', value: 'Elegant Sovereign Aura' },
        { label: 'Sillage', value: 'Soft Yet Commanding' },
        { label: 'Edition', value: 'Archive I — 100 Flacons' },
        { label: 'Authentication', value: 'Polygon Mainnet NFT' },
      ],
      nftTitle: "Shamim's Bloom", nftEdition: "Sovereign Grace Edition", nftRarity: "ELITE FOUNDERS",
      nftTraits: [
        { trait: 'Archive', value: 'Archive I — Founder Reserve' },
        { trait: 'Series', value: 'The Sovereign Feminine' },
        { trait: 'Edition', value: 'Elite — 100 Flacons' },
        { trait: 'Holder Rights', value: 'Lifetime Replenishment' },
      ],
      heroImage: '/products/shamims-bloom/bloom-hero.png',
      galleryImages: ['/products/shamims-bloom/bloom-hero.png', '/products/shamims-bloom/bloom-clean.png', '/products/shamims-bloom/bloom-crown.png', '/products/shamims-bloom/bloom-1.png'],
    },

    // ── ARCHIVE II ─────────────────────────────────────────────────────────────
    'queen-of-taif': {
      heroTitle: "QUEEN OF TAIF", heroSubtitle: "The Rose Sovereign",
      heroTagline: "Archive II · Royal Reserve Allocation",
      legacyStatement: "From ancient Taif valleys, where roses carry the weight of empires — the most powerful olfactory statement of our generation.",
      legacyVoice: "The Queen of Taif is an act of devotion. Sourced from the legendary Taif rose harvest — the rarest in the Arab world — this fragrance channels centuries of royal tradition into one breathtaking declaration. For those who command rooms without speaking.",
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
      nftTitle: "Queen of Taif", nftEdition: "Rose Sovereign Edition", nftRarity: "ROYAL FOUNDERS",
      nftTraits: [
        { trait: 'Archive', value: 'Archive II — Royal Reserve' },
        { trait: 'Series', value: 'The Imperial Rose' },
        { trait: 'Edition', value: 'Royal — 50 Flacons' },
        { trait: 'Access Tier', value: 'Royal Sovereign' },
      ],
      heroImage: '/products/queen-of-taif/queen-hero.png',
      galleryImages: ['/products/queen-of-taif/queen-hero.png', '/products/queen-of-taif/queen-box.png'],
    },

    // ── ARCHIVE IV ─────────────────────────────────────────────────────────────
    'her-legacy-vault': {
      heroTitle: "HER LEGACY VAULT", heroSubtitle: "The Eternal Archive",
      heroTagline: "Grand Sovereign Allocation — Archive IV",
      legacyStatement: "Some women leave memories. Legends leave dynasties.",
      legacyVoice: "Most luxury products are created to be owned. Some are created to be admired. But only a rare few are created to become family history. Her Legacy Vault is not merely a fragrance — it is the final archive of feminine sovereignty preserved in physical form. At its center lies Florentine Iris (Orris Butter), fused with Pure White Ambergris Tincture — together creating a texture unlike ordinary fragrance. Creamy. Powdered. Velvety. A memory preserved inside silk. Quiet. Refined. Timeless.",
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
      nftTitle: "Her Legacy Vault", nftEdition: "Grand Archive Edition", nftRarity: "GRAND ARCHIVE",
      nftTraits: [
        { trait: 'Category', value: 'Sovereign Fragrance Asset' },
        { trait: 'Archive Status', value: 'Archive IV — Eternal' },
        { trait: 'Collector Status', value: 'Founder Archive' },
        { trait: 'Holder Privileges', value: 'Grand Archive Access + Concierge' },
      ],
      heroImage: '/products/her-legacy-vault/vault-hero.png',
      galleryImages: ['/products/her-legacy-vault/vault-hero.png', '/products/her-legacy-vault/vault-box.png'],
    },

    // ── ADD NEW PRODUCTS BELOW ─────────────────────────────────────────────────
    // Copy any block above, paste here, change the slug key + content.
    // Example template:
    //
    // 'midnight-oud': {
    //   heroTitle: "MIDNIGHT OUD", heroSubtitle: "The Dark Sovereign",
    //   heroTagline: "Archive V · Obsidian Reserve",
    //   legacyStatement: "One powerful sentence about this fragrance.",
    //   legacyVoice: "Longer paragraph — the story, ingredients, emotion. 3–5 sentences.",
    //   topNotes: ['Note One', 'Note Two', 'Note Three'],
    //   heartNotes: ['Heart Note One', 'Heart Note Two'],
    //   baseNotes: ['Base Note One', 'Base Note Two', 'Base Note Three'],
    //   specs: [
    //     { label: 'Concentration', value: 'Extrait de Parfum' },
    //     { label: 'Volume', value: '100ML' },
    //     { label: 'Longevity', value: '20+ Hours' },
    //     { label: 'Authentication', value: 'Polygon Verified' },
    //   ],
    //   nftTitle: "Midnight Oud", nftEdition: "Obsidian Edition", nftRarity: "RARE",
    //   nftTraits: [
    //     { trait: 'Archive', value: 'Archive V' },
    //     { trait: 'Edition', value: 'Limited — 30 Flacons' },
    //   ],
    //   heroImage: '/products/midnight-oud/hero.png',
    //   galleryImages: ['/products/midnight-oud/hero.png'],
    // },

  }
  