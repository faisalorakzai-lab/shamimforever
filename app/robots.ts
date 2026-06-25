import { MetadataRoute } from 'next'

  export default function robots(): MetadataRoute.Robots {
    return {
      rules: [
        { userAgent: 'Googlebot',           allow: '/' },
        { userAgent: 'Googlebot-Image',     allow: '/' },
        { userAgent: 'Googlebot-News',      allow: '/' },
        { userAgent: 'Bingbot',             allow: '/' },
        { userAgent: 'Applebot',            allow: '/' },
        { userAgent: 'facebookexternalhit', allow: '/' },
        { userAgent: 'Twitterbot',          allow: '/' },
        { userAgent: 'LinkedInBot',         allow: '/' },
        { userAgent: 'WhatsApp',            allow: '/' },
        { userAgent: 'Slackbot',            allow: '/' },
        { userAgent: 'Discordbot',          allow: '/' },
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin/', '/api/', '/auth', '/authenticate', '/_next/', '/track/'],
        },
        { userAgent: 'GPTBot',       disallow: '/' },
        { userAgent: 'ChatGPT-User', disallow: '/' },
        { userAgent: 'CCBot',        disallow: '/' },
        { userAgent: 'anthropic-ai', disallow: '/' },
        { userAgent: 'Claude-Web',   disallow: '/' },
      ],
      sitemap: [
        'https://www.shamimforever.com/sitemap.xml',
        'https://www.shamimforever.com/news-sitemap.xml',
      ],
      host: 'https://www.shamimforever.com',
    }
  }
  