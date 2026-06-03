import { MetadataRoute } from 'next'

  const BASE_URL = 'https://shamimforever.com'

  const KNOWN_PRODUCT_SLUGS = [
    'shamims-bloom', 'shamim-bloom', 'sovereign-amethyst', 'queen-of-taif',
    'eternal-empress', 'her-legacy-vault', 'founders-eternal-archive',
    'sapphire-blue-levant', 'sovereign-oud-absolute', 'imperial-black-throne',
    'kyoto-sacred-incense', 'midnight-iris-royale', 'eternal-sovereign',
    'house-vault-no-001', 'delina-exclusif', 'amouage-guidance',
    'baccarat-rouge-540-extrait', 'baccarat-rouge-540', 'xerjoff-casamorati-lira',
    'initio-atomic-rose', 'chanel-coco-mademoiselle-intense', 'dior-jadore-lor',
    'tom-ford-velvet-orchid', 'ysl-libre-le-parfum', 'kilian-angels-share',
    'sovereign-genesis', 'queen-of-taif-crown-ring', 'queen-of-taif-ring',
    'empress-sovereign-vault', 'eternal-grace-sapphire-set',
    'shamim-s-ghost-the-eternal-legacy', 'shamims-ghost',
    'sf-kyoto-sacred-incense', 'xerjoff-lira', 'chanel-coco-mademoiselle',
    'ysl-libre', 'founder-s-eternal-archive',
  ]

  const STATIC_PAGES = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/shop', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/collections', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  ]

  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date()

    let productSlugs = [...KNOWN_PRODUCT_SLUGS]

    // Try to fetch live products from Supabase
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/products?select=slug&is_active=eq.true`,
          { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
        )
        if (res.ok) {
          const data: { slug: string }[] = await res.json()
          const liveSlugs = data.map(p => p.slug).filter(Boolean)
          productSlugs = [...new Set([...KNOWN_PRODUCT_SLUGS, ...liveSlugs])]
        }
      }
    } catch {
      // Fallback to static known slugs
    }

    const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map(p => ({
      url: `${BASE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    }))

    const productPages: MetadataRoute.Sitemap = productSlugs.map(slug => ({
      url: `${BASE_URL}/products/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))

    return [...staticPages, ...productPages]
  }
  