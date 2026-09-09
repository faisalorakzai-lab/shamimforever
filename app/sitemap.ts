import { MetadataRoute } from 'next'
  import { supabase } from '@/lib/supabase'
  import { glossaryTerms } from '@/lib/glossary-content'

  export const dynamic = 'force-dynamic'

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
    { path: '/faq',              priority: 0.82, changeFrequency: 'monthly'  as const },
    { path: '/inner-circle',    priority: 0.90, changeFrequency: 'monthly'  as const },
     { path: '/whitelist-access', priority: 0.90, changeFrequency: 'monthly' as const },
     { path: '/learn',            priority: 0.89, changeFrequency: 'monthly'  as const },
     { path: '/guides',            priority: 0.98, changeFrequency: 'weekly'   as const },
     { path: '/whitepapers',       priority: 0.96, changeFrequency: 'monthly'  as const },
     { path: '/whitepapers/shamim-forever-master-brand-business-investor-book', priority: 0.92, changeFrequency: 'monthly' as const },
     { path: '/glossary',          priority: 0.88, changeFrequency: 'monthly'  as const },
     { path: '/learn/the-house',    priority: 0.89, changeFrequency: 'monthly'  as const },
     { path: '/learn/luxury',        priority: 0.89, changeFrequency: 'monthly'  as const },
     { path: '/learn/our-world',   priority: 0.89, changeFrequency: 'monthly'  as const },
    { path: '/learn/innovation', priority: 0.96, changeFrequency: 'monthly' as const },
    { path: '/learn/innovation/artificial-intelligence', priority: 0.92, changeFrequency: 'monthly' as const },
    { path: '/learn/innovation/human-ai-collaboration', priority: 0.91, changeFrequency: 'monthly' as const },
    { path: '/learn/innovation/digital-infrastructure', priority: 0.91, changeFrequency: 'monthly' as const },
    { path: '/learn/innovation/digital-sovereignty', priority: 0.90, changeFrequency: 'monthly' as const },
    { path: '/learn/innovation/material-innovation', priority: 0.90, changeFrequency: 'monthly' as const },
    { path: '/learn/innovation/future-craftsmanship', priority: 0.90, changeFrequency: 'monthly' as const },
    { path: '/learn/innovation/virtual-atelier', priority: 0.90, changeFrequency: 'monthly' as const },
    { path: '/learn/innovation/blockchain-provenance', priority: 0.90, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure', priority: 0.97, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/identity', priority: 0.89, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/authenticity-infrastructure', priority: 0.89, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/private-client-infrastructure', priority: 0.89, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/boutique-infrastructure', priority: 0.89, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/atelier-infrastructure', priority: 0.89, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/digital-sovereignty', priority: 0.89, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/privacy', priority: 0.89, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/security', priority: 0.89, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/data-architecture', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/heritage-architecture', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/time-archive', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/sovereign-vault', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/heirloom-vault', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/heritage-gallery', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/private-delivery', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/concierge-care', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/governance', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/resilience', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/interoperability', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/future-infrastructure', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/sovereign-infrastructure/ai-infrastructure', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/learn/authenticity', priority: 0.96, changeFrequency: 'monthly' as const },
    { path: '/learn/authenticity/what-is-authenticity', priority: 0.92, changeFrequency: 'monthly' as const },
    { path: '/learn/authenticity/provenance', priority: 0.91, changeFrequency: 'monthly' as const },
    { path: '/learn/authenticity/object-identity', priority: 0.91, changeFrequency: 'monthly' as const },
    { path: '/learn/authenticity/materials', priority: 0.90, changeFrequency: 'monthly' as const },
    { path: '/learn/authenticity/digital-authenticity', priority: 0.90, changeFrequency: 'monthly' as const },
    { path: '/learn/authenticity/authentication-guide', priority: 0.90, changeFrequency: 'monthly' as const },
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
    { path: '/time-archive',    priority: 0.78, changeFrequency: 'monthly'  as const },
    { path: '/about', priority: 0.95, changeFrequency: 'monthly' as const },
     { path: '/founder-leadership', priority: 0.94, changeFrequency: 'monthly' as const },
     { path: '/leadership-governance', priority: 0.90, changeFrequency: 'monthly' as const },
     { path: '/authenticate', priority: 0.89, changeFrequency: 'monthly' as const },
     { path: '/corporate', priority: 0.95, changeFrequency: 'monthly' as const },
    { path: '/brand-facts', priority: 0.94, changeFrequency: 'monthly' as const },
    { path: '/corporate-information', priority: 0.92, changeFrequency: 'monthly' as const },
    { path: '/sustainability', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/careers', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/investor-relations', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/newsroom', priority: 0.88, changeFrequency: 'weekly' as const },
     { path: '/policies', priority: 0.78, changeFrequency: 'monthly' as const },
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
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('slug, updated_at')
        .eq('is_active', true)
        .limit(500)
      if (productsError) {
        console.error('[sitemap] Product query failed; product URLs were omitted.', productsError)
      } else if (products) {
        productEntries = products.map((p) => ({
          url: `${BASE_URL}/products/${p.slug}`,
          lastModified: p.updated_at ?? now,
          changeFrequency: 'weekly' as const,
          priority: 0.85,
        }))
      }
      const { data: collections, error: collectionsError } = await supabase
        .from('collections')
        .select('id, updated_at')
        .limit(100)
      if (collectionsError) {
        console.error('[sitemap] Collection query failed; collection URLs were omitted.', collectionsError)
      } else if (collections) {
        collectionEntries = collections.map((c) => ({
          url: `${BASE_URL}/collections/${c.id}`,
          lastModified: c.updated_at ?? now,
          changeFrequency: 'weekly' as const,
          priority: 0.88,
        }))
      }
    } catch (error) {
      console.error('[sitemap] Supabase unavailable; database-backed URLs were omitted.', error)
    }

    const glossaryEntries: MetadataRoute.Sitemap = glossaryTerms.map((entry) => ({
      url: `${BASE_URL}/glossary/${entry.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.78,
    }))

    return [...staticEntries, ...glossaryEntries, ...productEntries, ...collectionEntries]
  }
  