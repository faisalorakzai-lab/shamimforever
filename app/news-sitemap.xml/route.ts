import { NextResponse } from 'next/server'

// This sitemap intentionally contains no entries until the site has a dedicated
// news article URL for each report. Evergreen pages are not Google News articles.
const NEWS_ARTICLES: Array<{
  url: string
  title: string
  publication: string
  lang: string
  publishedAt: string
  keywords: string
}> = []

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
