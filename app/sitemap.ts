import { MetadataRoute } from 'next'

    const BASE_URL = 'https://www.shamimforever.com'

    const KNOWN_PRODUCT_SLUGS = [
      'shamim-bloom-the-sovereign-grace', 'sovereign-amethyst', 'queen-of-taif',
      'eternal-empress', 'her-legacy-vault', 'founder-s-eternal-archive',
      'sapphire-blue-levant', 'sovereign-oud-absolute', 'imperial-black-throne',
      'kyoto-sacred-incense', 'midnight-iris-royale', 'eternal-sovereign',
      'house-vault-no-001', 'delina-exclusif', 'amouage-guidance',
      'baccarat-rouge-540-extrait', 'baccarat-rouge-540', 'xerjoff-casamorati-lira',
      'initio-atomic-rose', 'chanel-coco-mademoiselle-intense', 'dior-jadore-lor',
      'tom-ford-velvet-orchid', 'ysl-libre-le-parfum', 'kilian-angels-share',
      'sovereign-genesis', 'queen-of-taif-crown-ring', 'empress-sovereign-vault',
      'eternal-grace-sapphire-set', 'shamim-s-ghost-the-eternal-legacy',
      'sf-kyoto-sacred-incense', 'xerjoff-lira', 'chanel-coco-mademoiselle',
      'ysl-libre', 'creed-aventus', 'roja-elysium-pour-homme',
      'amouage-interlude-man', 'parfums-de-marly-layton', 'mfk-grand-soir',
      'tom-ford-oud-wood', 'lv-ombre-nomade', 'xerjoff-naxos',
      'piaget-rose-high-jewelry-ring', 'harry-winston-cluster-diamond-ring',
      'van-cleef-alhambra-necklace', 'damiani-margherita-diamond-necklace',
      'de-beers-enchanted-lotus-earrings', 'messika-move-bracelet',
      'augustinus-bader-the-cream', 'chanel-sublimage-la-creme-gc',
      'tom-ford-research-serum-concentrate', 'valmont-prime-regenerating-pack',
      'aesop-lucent-facial-concentrate', 'aesop-parsley-seed-serum',
      'vaseline-intensive-care-advanced-repair', 'sapphire-blue-levant',
      'shamim-s-ghost-the-eternal-legacy', 'amouage-guidance',
      // Additional sovereign own-brand products
      'shamims-ghost', 'shamims-bloom', 'shamim-bloom', 'founders-eternal-archive',
      'initio-atomic-rose',
    ]

    const STATIC_PAGES = [
      { path: '/',                priority: 1.0,  changeFrequency: 'weekly'  as const },
      { path: '/shop',            priority: 0.95, changeFrequency: 'daily'   as const },
      { path: '/collections',     priority: 0.85, changeFrequency: 'weekly'  as const },
      { path: '/our-story',       priority: 0.80, changeFrequency: 'monthly' as const },
      { path: '/founder',         priority: 0.85, changeFrequency: 'monthly' as const },
      { path: '/about',           priority: 0.80, changeFrequency: 'monthly' as const },
      { path: '/journal',         priority: 0.88, changeFrequency: 'weekly'  as const },
      { path: '/gallery',         priority: 0.70, changeFrequency: 'weekly'  as const },
      { path: '/boutiques',       priority: 0.65, changeFrequency: 'monthly' as const },
      { path: '/concierge',       priority: 0.65, changeFrequency: 'monthly' as const },
      { path: '/bespoke',         priority: 0.65, changeFrequency: 'monthly' as const },
      { path: '/atelier',         priority: 0.65, changeFrequency: 'monthly' as const },
      { path: '/virtual-atelier', priority: 0.65, changeFrequency: 'monthly' as const },
      { path: '/heirloom-vault',  priority: 0.70, changeFrequency: 'weekly'  as const },
      { path: '/vault',           priority: 0.70, changeFrequency: 'weekly'  as const },
      { path: '/sovereign-aura',  priority: 0.70, changeFrequency: 'weekly'  as const },
      { path: '/time-archive',    priority: 0.65, changeFrequency: 'monthly' as const },
      { path: '/dna-identity',    priority: 0.65, changeFrequency: 'monthly' as const },
      { path: '/inner-circle',    priority: 0.60, changeFrequency: 'monthly' as const },
      { path: '/delivery',        priority: 0.55, changeFrequency: 'monthly' as const },
      { path: '/care',            priority: 0.55, changeFrequency: 'monthly' as const },
    ]

    
    const JOURNAL_SLUGS = [
      'founders-vision',
      'architecture-of-scent',
      'sovereign-materials',
      'okbond-digital-sovereignty',
      'psychology-of-prestige',
      'silence-new-luxury',
      'future-sovereign-commerce',
    ]
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
      const now = new Date()
      let productSlugs = [...new Set(KNOWN_PRODUCT_SLUGS)]

      try {
        const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
          const res = await fetch(
            `${supabaseUrl}/rest/v1/products?select=slug&is_active=eq.true`,
            { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
          )
          if (res.ok) {
            const data: { slug: string }[] = await res.json()
            const liveSlugs = data.map(p => p.slug).filter(Boolean)
            productSlugs = [...new Set([...KNOWN_PRODUCT_SLUGS, ...liveSlugs])]
          }
        }
      } catch { /* fallback to static list */ }

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

      const journalPages: MetadataRoute.Sitemap = JOURNAL_SLUGS.map(slug => ({
        url: `${BASE_URL}/journal/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.82,
      }))

      return [...staticPages, ...productPages, ...journalPages]
    }
    