import { MetadataRoute } from 'next'

  export default function robots(): MetadataRoute.Robots {
    return {
      rules: [
        // Google & Bing — full access, full trust
        { userAgent: 'Googlebot', allow: '/' },
        { userAgent: 'Googlebot-Image', allow: '/' },
        { userAgent: 'Bingbot', allow: '/' },
        // Apple & Social crawlers
        { userAgent: 'Applebot', allow: '/' },
        { userAgent: 'facebookexternalhit', allow: '/' },
        { userAgent: 'Twitterbot', allow: '/' },
        // Block AI content harvesters & scrapers
        {
          userAgent: [
            'GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai',
            'Claude-Web', 'PerplexityBot', 'YouBot', 'Diffbot',
            'SemrushBot', 'AhrefsBot', 'DotBot', 'MJ12bot',
            'DataForSeoBot', 'serpstatbot', 'BLEXBot',
          ],
          disallow: '/',
        },
        // Default: allow all legitimate crawlers
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/admin/', '/_next/'],
        },
      ],
      sitemap: 'https://shamimforever.com/sitemap.xml',
      host: 'https://shamimforever.com',
    }
  }
  