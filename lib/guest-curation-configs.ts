export interface GuestCurationConfig {
  slug: string
  archiveCode: string
  archiveLabel: string
  collectionName: string
  classification: string
  size: string
  globalRetailUsd: number
  signatureNotes: string[]
  whyCurated: string[]
  curatorPositioning: string[]
}

const CONFIGS: GuestCurationConfig[] = [
  {
    slug: 'delina-exclusif',
    archiveCode: 'G-I',
    archiveLabel: 'Curated Female Allocation — Archive G-I',
    collectionName: 'The Sovereign Rose Archive',
    classification: 'Luxury Niche Feminine Masterpiece',
    size: '75ml',
    globalRetailUsd: 430,
    signatureNotes: ['Turkish Rose', 'Lychee', 'Incense', 'Oud', 'Vanilla'],
    whyCurated: [
      'Delina Exclusif represents the meeting point between aristocratic floral craftsmanship and modern luxury architecture.',
      'Its Turkish Rose core carries extraordinary richness. Its incense foundation creates permanence. Its oud structure delivers authority.',
      'The House selected Delina Exclusif because it demonstrates a philosophy we deeply respect: Beauty strengthened by discipline.',
      'This fragrance belongs inside every sovereign feminine archive.',
    ],
    curatorPositioning: ['Not merely a floral perfume.', 'A modern rose monument.', 'A luxury standard.', 'A permanent feminine signature.'],
  },
  {
    slug: 'amouage-guidance',
    archiveCode: 'G-II',
    archiveLabel: 'Curated Female Allocation — Archive G-II',
    collectionName: 'The Sovereign Harmony Archive',
    classification: 'Ultra-Luxury Niche Feminine Composition',
    size: '100ml',
    globalRetailUsd: 395,
    signatureNotes: ['Pear', 'Hazelnut', 'Frankincense', 'Osmanthus', 'Rose', 'Sandalwood'],
    whyCurated: [
      'Guidance represents emotional intelligence translated into fragrance.',
      'Its Omani Frankincense foundation reflects structure. Its creamy woods create depth. Its floral architecture creates sophistication.',
      'The House allocated Guidance because true luxury whispers rather than shouts. This fragrance rewards attention.',
      'And reveals new dimensions over time.',
    ],
    curatorPositioning: ['Not a trend.', 'A sensory symphony.', 'An intelligent luxury asset.'],
  },
  {
    slug: 'baccarat-rouge-540-extrait',
    archiveCode: 'G-III',
    archiveLabel: 'Curated Female Allocation — Archive G-III',
    collectionName: 'The Crystal Empire Archive',
    classification: 'Luxury Amber-Wood Extrait',
    size: '70ml',
    globalRetailUsd: 465,
    signatureNotes: ['Saffron', 'Bitter Almond', 'Egyptian Jasmine', 'Ambergris', 'Cedarwood'],
    whyCurated: [
      'Few fragrances have achieved modern legendary status. Baccarat Rouge 540 Extrait is one of them.',
      'Its saffron brilliance. Its ambergris structure. Its crystalline projection.',
      'Together create one of contemporary perfumery\'s most recognized luxury signatures.',
      'The House includes it as an archive-worthy benchmark of modern excellence.',
    ],
    curatorPositioning: ['A fragrance icon.', 'A global luxury reference point.', 'A crystal monument in liquid form.'],
  },
  {
    slug: 'xerjoff-casamorati-lira',
    archiveCode: 'G-IV',
    archiveLabel: 'Curated Female Allocation — Archive G-IV',
    collectionName: 'The Golden Theatre Archive',
    classification: 'Luxury Gourmand Masterpiece',
    size: '100ml',
    globalRetailUsd: 315,
    signatureNotes: ['Blood Orange', 'Bergamot', 'Lavender', 'Cinnamon', 'Licorice', 'Caramel Vanilla'],
    whyCurated: [
      'Lira preserves old-world Italian romance. Rich sweetness. Vintage elegance. Theatrical beauty.',
      'Its gourmand architecture demonstrates how luxury can feel emotional without sacrificing sophistication.',
    ],
    curatorPositioning: ['A heritage gourmand.', 'A collector\'s dessert.', 'A preserved piece of olfactory history.'],
  },
  {
    slug: 'initio-atomic-rose',
    archiveCode: 'G-V',
    archiveLabel: 'Curated Female Allocation — Archive G-V',
    collectionName: 'The Sovereign Power Rose',
    classification: 'Luxury High-Impact Floral',
    size: '90ml',
    globalRetailUsd: 360,
    signatureNotes: ['Italian Bergamot', 'Bulgarian Rose', 'Turkish Rose', 'Egyptian Jasmine', 'Madagascar Vanilla'],
    whyCurated: [
      'Atomic Rose transforms the rose from ornament into authority. Powerful. Bold. Unapologetic.',
      'The House selected this masterpiece because it demonstrates how a classic floral note can become a commanding statement.',
    ],
    curatorPositioning: ['Not a flower.', 'A declaration.', 'A rose engineered for influence.'],
  },
  {
    slug: 'chanel-coco-mademoiselle-intense',
    archiveCode: 'G-VI',
    archiveLabel: 'Curated Female Allocation — Archive G-VI',
    collectionName: 'The Executive Elegance Archive',
    classification: 'Luxury Corporate Feminine Signature',
    size: '100ml',
    globalRetailUsd: 190,
    signatureNotes: ['Patchouli', 'Sicilian Orange', 'Calabrian Bergamot', 'Amber', 'Tonka Bean'],
    whyCurated: [
      'Modern feminine professionalism has few universal references. Coco Mademoiselle Intense remains one of them.',
      'The House recognizes its ability to balance elegance, confidence, and maturity with effortless authority.',
    ],
    curatorPositioning: ['Boardroom luxury.', 'Executive sophistication.', 'Timeless feminine structure.'],
  },
  {
    slug: 'dior-jadore-lor',
    archiveCode: 'G-VII',
    archiveLabel: 'Curated Female Allocation — Archive G-VII',
    collectionName: 'The Liquid Gold Archive',
    classification: 'Luxury Floral Essence',
    size: '50ml',
    globalRetailUsd: 170,
    signatureNotes: ['Orange Blossom Absolute', 'Jasmine Grandiflorum', 'Centifolia Rose'],
    whyCurated: [
      "J'adore L'Or feels like concentrated precious metal. Rich. Radiant. Refined.",
      'The House selected this composition because it embodies purity elevated to luxury.',
    ],
    curatorPositioning: ['Liquid gold.', 'Floral wealth.', 'Pure feminine refinement.'],
  },
  {
    slug: 'tom-ford-velvet-orchid',
    archiveCode: 'G-VIII',
    archiveLabel: 'Curated Female Allocation — Archive G-VIII',
    collectionName: 'The Midnight Society Archive',
    classification: 'Dark Oriental Floral',
    size: '100ml',
    globalRetailUsd: 235,
    signatureNotes: ['Black Orchid', 'Velvet Orchid', 'Rum', 'Honey', 'Mandarin', 'Myrrh'],
    whyCurated: [
      "Mystery remains one of luxury's most powerful currencies. Velvet Orchid operates within shadows.",
      'Its honey. Its rum. Its dark floral architecture. Together create an atmosphere of private luxury.',
    ],
    curatorPositioning: ['Not attention.', 'Intrigue.', 'Not visibility.', 'Presence.'],
  },
  {
    slug: 'ysl-libre-le-parfum',
    archiveCode: 'G-IX',
    archiveLabel: 'Curated Female Allocation — Archive G-IX',
    collectionName: 'The Sovereign Freedom Archive',
    classification: 'Luxury Floral Amber',
    size: '90ml',
    globalRetailUsd: 195,
    signatureNotes: ['French Lavender', 'Moroccan Orange Blossom', 'Ginger', 'Saffron'],
    whyCurated: [
      'Libre Le Parfum embodies self-determination. Its lavender structure. Its saffron warmth. Its amber foundation.',
      'Create a fragrance that feels modern yet authoritative.',
    ],
    curatorPositioning: ['Freedom with structure.', 'Elegance with power.', 'Modern sovereignty in liquid form.'],
  },
  {
    slug: 'kilian-angels-share',
    archiveCode: 'G-X',
    archiveLabel: 'Curated Female Allocation — Archive G-X',
    collectionName: 'The Heritage Cognac Archive',
    classification: 'Luxury Gourmand Amber',
    size: '50ml',
    globalRetailUsd: 245,
    signatureNotes: ['Cognac Accord', 'Cinnamon', 'Tonka Bean', 'Praline', 'Vanilla', 'Oak'],
    whyCurated: [
      "Some fragrances transcend categories. Angels' Share is one of them. Warm. Addictive. Sophisticated.",
      'The House includes it because it captures the emotional richness of celebration, memory, and legacy.',
    ],
    curatorPositioning: ['A bottle of heritage.', 'A vault of memories.', 'A luxury masterpiece worthy of preservation.'],
  },
]

const CONFIG_MAP: Record<string, GuestCurationConfig> = {}
for (const c of CONFIGS) CONFIG_MAP[c.slug] = c

export function getGuestCurationConfig(slug: string): GuestCurationConfig | null {
  return CONFIG_MAP[slug] || null
}

export const GUEST_CURATION_SLUGS = CONFIGS.map(c => c.slug)
