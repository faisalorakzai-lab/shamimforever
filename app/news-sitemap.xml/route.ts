import { NextResponse } from 'next/server'

const BASE_URL = 'https://www.shamimforever.com'

const NEWS_ARTICLES = [
    {
      url: `${BASE_URL}/faisal-orakzai`,
      title: 'Faisal Orakzai — Founder & Chairman, Shamim Forever | Blockchain Entrepreneur',
      publication: 'Shamim Forever',
      lang: 'en',
      publishedAt: '2026-06-01T00:00:00Z',
      keywords: 'Faisal Orakzai, Shamim Forever founder, blockchain entrepreneur Pakistan, Orakzai Bond CEO',
    },
    {
      url: `${BASE_URL}/founder`,
      title: 'Faisal Orakzai — Founder Story | Building Shamim Forever from Pakistan',
      publication: 'Shamim Forever',
      lang: 'en',
      publishedAt: '2026-06-01T00:00:00Z',
      keywords: 'Faisal Orakzai, Shamim Forever, luxury brand Pakistan, blockchain luxury',
    },
    {
      url: `${BASE_URL}/our-story`,
      title: 'Shamim Forever — Sovereign Luxury Digital House Founded 2023',
      publication: 'Shamim Forever',
      lang: 'en',
      publishedAt: '2026-06-01T00:00:00Z',
      keywords: 'Shamim Forever story, luxury fragrance Pakistan, sovereign digital luxury, Faisal Orakzai',
    },
    {
      url: `${BASE_URL}/dna-identity`,
      title: 'Shamim Forever DNA Identity — Blockchain-Verified Luxury Authentication',
      publication: 'Shamim Forever',
      lang: 'en',
      publishedAt: '2026-06-15T00:00:00Z',
      keywords: 'blockchain luxury authentication, NFT fragrance, Shamim Forever DNA',
    },
    {
      url: `${BASE_URL}/heirloom-vault`,
      title: 'Shamim Forever Heirloom Vault — Heritage Luxury Archives',
      publication: 'Shamim Forever',
      lang: 'en',
      publishedAt: '2026-06-15T00:00:00Z',
      keywords: 'luxury heirloom, heritage fragrance, Shamim Forever vault',
    },
]

export async function GET() {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${NEWS_ARTICLES.map(a => `  <url>
      <loc>${a.url}</loc>
      <news:news>
        <news:publication>
          <news:name>${a.publication}</news:name>
          <news:language>${a.lang}</news:language>
        </news:publication>
        <news:publication_date>${a.publishedAt}</news:publication_date>
        <news:title>${a.title}</news:title>
        <news:keywords>${a.keywords}</news:keywords>
      </news:news>
    </url>`).join('\n')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'X-Robots-Tag': 'noindex',
      },
    })
}
