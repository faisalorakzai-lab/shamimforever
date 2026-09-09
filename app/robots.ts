import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/auth',
          '/authenticate',
          '/wallet',
          '/_next/',
          '/track',
        ],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
    ],
    sitemap: [
      'https://www.shamimforever.com/sitemap.xml',
      'https://www.shamimforever.com/news-sitemap.xml',
    ],
    host: 'https://www.shamimforever.com',
  }
}