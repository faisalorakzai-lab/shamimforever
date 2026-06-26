import { MetadataRoute } from 'next'
  import { supabaseAdmin } from '@/lib/supabase-server'

  const BASE_URL = 'https://www.shamimforever.com'

  const STATIC_PAGES = [
    { path: '/faisal-orakzai', priority: 1.0,  changeFrequency: 'weekly'   as const },
    { path: '/news',            priority: 0.99, changeFrequency: 'daily'    as const },
    { path: '/',                priority: 1.0,  changeFrequency: 'daily'    as const },
    { path: '/shop',            priority: 0.98, changeFrequency: 'daily'    as const },
    { path: '/founder',         priority: 0.97, changeFrequency: 'weekly'   as const },
    { path: '/collections',     priority: 0.96, changeFrequency: 'daily'    as const },
    { path: '/atelier',         priority: 0.93, changeFrequency: 'monthly'  as const },
    { path: '/our-story',       priority: 0.93, changeFrequency: 'monthly'  as const },
    { path: '/journal',         priority: 0.92, changeFrequency: 'weekly'   as const },
    { path: '/press',           priority: 0.92, changeFrequency: 'monthly'  as const },
    { path: '/team',            priority: 0.91, changeFrequency: 'monthly'  as const },
    { path: '/boutiques',       priority: 0.90, changeFrequency: 'monthly'  as const },
    { path: '/inner-circle',    priority: 0.90, changeFrequency: 'monthly'  as const },
    { path: '/collections/for-him', priority: 0.89, changeFrequency: 'weekly' as const },
    { path: '/bespoke',         priority: 0.88, changeFrequency: 'monthly'  as const },
    { path: '/concierge',       priority: 0.87, changeFrequency: 'monthly'  as const },
    { path: '/virtual-atelier', priority: 0.87, changeFrequency: 'monthly'  as const },
    { path: '/heirloom-vault',  priority: 0.86, changeFrequency: 'monthly'  as const },
    { path: '/sovereign-aura',  priority: 0.85, changeFrequency: 'monthly'  as const },
    { path: '/dna-identity',    priority: 0.85, changeFrequency: 'monthly'  as const },
    { path: '/gallery',         priority: 0.84, changeFrequency: 'weekly'   as const },
    { path: '/care',            priority: 0.80, changeFrequency: 'monthly'  as const },
    { path: '/delivery',        priority: 0.80, changeFrequency: 'monthly'  as const },
    { path: '/vault',           priority: 0.80, changeFrequency: 'monthly'  as const },
    { path: '/wallet',          priority: 0.78, changeFrequency: 'monthly'  as const },
    { path: '/time-archive',    priority: 0.78, changeFrequency: 'monthly'  as const },
  ]

  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date().toISOString()

    const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }))

    let productEntries: MetadataRoute.Sitemap = []
    let collectionEntries: MetadataRoute.Sitemap = []

    try {
      const { data: products } = await supabaseAdmin
        .from('products')
        .select('id, updated_at')
        .eq('active', true)
        .limit(500)
      if (products) {
        productEntries = products.map((p) => ({
          url: `${BASE_URL}/products/${p.id}`,
          lastModified: p.updated_at ?? now,
          changeFrequency: 'weekly' as const,
          priority: 0.85,
        }))
      }
      const { data: collections } = await supabaseAdmin
        .from('collections')
        .select('id, updated_at')
        .limit(100)
      if (collections) {
        collectionEntries = collections.map((c) => ({
          url: `${BASE_URL}/collections/${c.id}`,
          lastModified: c.updated_at ?? now,
          changeFrequency: 'weekly' as const,
          priority: 0.88,
        }))
      }
    } catch {
      // Supabase unavailable during build
    }

    return [...staticEntries, ...productEntries, ...collectionEntries]
  }
  