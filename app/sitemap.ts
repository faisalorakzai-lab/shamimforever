import { MetadataRoute } from 'next'
  import { createClient } from '@supabase/supabase-js'

  const BASE_URL = 'https://shamimforever.com'

  // Known static product slugs (always included even without DB)
  const KNOWN_SLUGS = [
    'shamim-s-ghost-the-eternal-legacy',
  'shamims-ghost',
  'shamims-ghost-the-eternal-legacy',
  'shamims-bloom',
  'shamim-bloom',
  'shamim-bloom-the-sovereign-grace',
  'sovereign-amethyst',
  'queen-of-taif',
  'eternal-empress',
  'her-legacy-vault',
  'founder-s-eternal-archive',
  'founders-eternal-archive',
  'sapphire-blue-levant',
  'sovereign-oud-absolute',
  'imperial-black-throne',
  'kyoto-sacred-incense',
  'sf-kyoto-sacred-incense',
  'kyoto-incense',
  'sf-kyoto-incense',
  'midnight-iris-royale',
  'eternal-sovereign',
  'house-vault-no-001',
  'delina-exclusif',
  'amouage-guidance',
  'baccarat-rouge-540-extrait',
  'baccarat-rouge-540',
  'xerjoff-casamorati-lira',
  'xerjoff-lira',
  'initio-atomic-rose',
  'chanel-coco-mademoiselle-intense',
  'chanel-coco-mademoiselle',
  'dior-jadore-lor',
  'tom-ford-velvet-orchid',
  'ysl-libre-le-parfum',
  'ysl-libre',
  'kilian-angels-share',
  'sovereign-genesis',
  'queen-of-taif-crown-ring',
  'queen-of-taif-ring',
    'queen-of-taif-crown-ring',
    'queen-of-taif-ring',
    'empress-sovereign-vault',
    'eternal-grace-sapphire-set',
  ]

  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date()

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
      { url: `${BASE_URL}/shop`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
      { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
      { url: `${BASE_URL}/collections`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ]

    // Try to fetch all products from Supabase
    let allSlugs: string[] = [...KNOWN_SLUGS]

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabase
        .from('products')
        .select('slug, updated_at')
        .eq('is_active', true)

      if (data && data.length > 0) {
        // Merge DB slugs with known slugs, remove duplicates
        const dbSlugs = data.map((p: { slug: string }) => p.slug).filter(Boolean)
        allSlugs = [...new Set([...KNOWN_SLUGS, ...dbSlugs])]
      }
    } catch {
      // Fallback to known slugs if Supabase is unavailable
    }

    const productPages: MetadataRoute.Sitemap = allSlugs.map(slug => ({
      url: `${BASE_URL}/products/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))

    return [...staticPages, ...productPages]
  }
  