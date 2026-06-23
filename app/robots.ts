import { MetadataRoute } from 'next'

  export default function robots(): MetadataRoute.Robots {
    return {
      rules: [
        // Google — full access + image crawler
        { userAgent: 'Googlebot',         allow: '/' },
        { userAgent: 'Googlebot-Image',   allow: '/' },
        { userAgent: 'Googlebot-News',    allow: '/' },
        // Bing
        { userAgent: 'Bingbot',           allow: '/' },
        // Apple & Social crawlers
        { userAgent: 'Applebot',          allow: '/' },
        { userAgent: 'facebookexternalhit', allow: '/' },
        { userAgent: 'Twitterbot',        allow: '/' },
        { userAgent: 'LinkedInBot',       allow: '/' },
        { userAgent: 'WhatsApp',          allow: '/' },
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
      sitemap: [
        'https://www.shamimforever.com/sitemap.xml',
        'https://www.shamimforever.com/news-sitemap.xml',
      ],
      host: 'https://www.shamimforever.com',
    }
  }
  