import { MetadataRoute } from 'next'
  import { supabaseAdmin } from '@/lib/supabase-server'

  const BASE_URL = 'https://www.shamimforever.com'

  const STATIC_PAGES = [
    { path: '/',                priority: 1.0,  changeFrequency: 'weekly'   as const },
    { path: '/shop',            priority: 0.95, changeFrequency: 'daily'    as const },
    { path: '/collections',     priority: 0.85, changeFrequency: 'weekly'   as const },
    { path: '/our-story',       priority: 0.80, changeFrequency: 'monthly'  as const },
    { path: '/founder',         priority: 0.85, changeFrequency: 'monthly'  as const },
    { path: '/about',           priority: 0.80, changeFrequency: 'monthly'  as const },
    { path: '/journal',         priority: 0.88, changeFrequency: 'weekly'   as const },
    { path: '/atelier',         priority: 0.75, changeFrequency: 'monthly'  as const },
    { path: '/boutiques',       priority: 0.65, changeFrequency: 'monthly'  as const },
    { path: '/inner-circle',    priority: 0.70, changeFrequency: 'monthly'  as const },
  ]

  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Dynamically fetch all active product slugs from database
    let productSlugs: string[] = []
    try {
      const { data } = await supabaseAdmin
        .from('products')
        .select('slug, updated_at')
        .eq('is_active', true)
      productSlugs = (data ?? []).map(p => p.slug).filter(Boolean)
    } catch {
      // fallback: empty — static pages still render
    }

    // Dynamically fetch all active collection IDs
    let collectionIds: string[] = []
    try {
      const { data } = await supabaseAdmin
        .from('collections')
        .select('id')
        .eq('is_active', true)
      collectionIds = (data ?? []).map(c => c.id).filter(Boolean)
    } catch {}

    const now = new Date().toISOString()

    const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }))

    const productEntries: MetadataRoute.Sitemap = productSlugs.map(slug => ({
      url: `${BASE_URL}/products/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.80,
    }))

    const collectionEntries: MetadataRoute.Sitemap = collectionIds.map(id => ({
      url: `${BASE_URL}/collections/${id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))

    return [...staticEntries, ...productEntries, ...collectionEntries]
  }
  