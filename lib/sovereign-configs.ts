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
  }

  export const SOVEREIGN_CONFIGS: Record<string, SovereignConfig> = {

    // ── ARCHIVE I ──────────────────────────────────────────────────────────────
    'shamims-bloom': SHAMIM_BLOOM_CONFIG,
    'shamim-bloom': SHAMIM_BLOOM_CONFIG,
    'shamim-bloom-the-sovereign-grace': SHAMIM_BLOOM_CONFIG,

    // ── ARCHIVE II ─────────────────────────────────────────────────────────────
    'queen-of-taif': QUEEN_OF_TAIF_CONFIG,

    // ── ARCHIVE II — IMPERIAL ──────────────────────────────────────────────────
    'eternal-empress': ETERNAL_EMPRESS_CONFIG,

    // ── ARCHIVE IV ─────────────────────────────────────────────────────────────
    'her-legacy-vault': HER_LEGACY_VAULT_CONFIG,

  }
  