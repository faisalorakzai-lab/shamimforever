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
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'Claude-Web', disallow: '/' },
    ],
    sitemap: [
      'https://www.shamimforever.com/sitemap.xml',
      'https://www.shamimforever.com/news-sitemap.xml',
    ],
    host: 'https://www.shamimforever.com',
  }
}