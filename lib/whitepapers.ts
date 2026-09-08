import { absoluteUrl } from '@/lib/seo'

export const WHITEPAPER_PDF_PATH = '/whitepapers/shamim-forever-master-brand-business-investor-book.pdf'

export const whitepapers = [
  {
    slug: 'shamim-forever-master-brand-business-investor-book',
    title: 'Shamim Forever — Master Brand, Business & Investor Book',
    shortTitle: 'Master Brand, Business & Investor Book',
    eyebrow: 'SHAMIM FOREVER WHITE PAPER',
    category: 'Sovereign Systems',
    abstract: 'A 50-page institutional publication describing the House of Shamim Forever, its philosophy, brand DNA, product architecture, customer experience, digital luxury direction, provenance concepts, proposed partnership model, governance principles, roadmap, and technical whitepaper annex.',
    author: 'Shamim Forever',
    datePublished: '2026-08-31',
    version: '1.0',
    readingTime: '35 min',
    documentType: 'Master Brand · Business · Investor Book',
    pages: 50,
    keywords: ['Shamim Forever', 'sovereign luxury house', 'luxury brand architecture', 'digital luxury', 'provenance', 'authentication', 'heritage', 'institutional architecture'],
    pdfPath: WHITEPAPER_PDF_PATH,
    coverImage: '/og-faisal-orakzai.jpg',
    doi: 'SF-WP-2026-001',
    contents: [
      'The House of Shamim Forever',
      'Executive Summary',
      'The Story',
      'The Philosophy',
      'Brand DNA',
      'Our Mission and Vision',
      'Founder and Executive Leadership',
      'The World We Create',
      'The Atelier',
      'Product Strategy',
      'Customer Experience',
      'Digital Luxury',
      'Authenticity and Provenance',
      'The OKBOND Protocol',
      'Marketing and Retail Strategy',
      'Partnership and Governance',
      'Roadmap and Global Vision',
      'Risk Management',
      'The Sovereign Luxury Model',
      'The Technical Whitepaper: Digital Luxury Architecture',
    ],
  },
] as const

export type Whitepaper = (typeof whitepapers)[number]

export function getWhitepaper(slug: string) {
  return whitepapers.find((paper) => paper.slug === slug)
}

export function whitepaperUrl(slug: string) {
  return absoluteUrl(`/whitepapers/${slug}`)
}