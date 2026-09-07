import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'
import TheHousePage from '@/components/learn/TheHousePage'

const path = '/learn/the-house'
const title = 'The House | The Architecture, Philosophy & World of Shamim Forever'
const description = 'Explore The House of Shamim Forever, including its founding philosophy, sovereign luxury architecture, leadership, craftsmanship, global presence, private client culture, heritage, innovation and long-term vision.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['The House Shamim Forever', 'sovereign luxury architecture', 'Shamim Forever philosophy', 'luxury craftsmanship', 'private client culture', 'luxury heritage and innovation'],
  alternates: { canonical: absoluteUrl(path) },
  openGraph: { title, description, url: absoluteUrl(path), type: 'article', siteName: 'Shamim Forever', images: [metadataImage('/og-faisal-orakzai.jpg', 'The House of Shamim Forever')] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-faisal-orakzai.jpg'] },
  robots: { index: true, follow: true },
}

const schemas = [
  { ...pageSchema({ type: 'Article', path, name: title, description, image: '/og-faisal-orakzai.jpg', mainEntity: { '@id': absoluteUrl(path) + '#house' } }), '@id': absoluteUrl(path) + '#house', headline: title, author: organizationRef(), publisher: organizationRef(), inLanguage: 'en' },
  { '@context': 'https://schema.org', '@type': 'Organization', '@id': absoluteUrl(path) + '#house', name: 'Shamim Forever', alternateName: 'The House of Shamim Forever', url: absoluteUrl(path), parentOrganization: organizationRef(), knowsAbout: ['Sovereign luxury', 'Craftsmanship', 'Authenticity', 'Heritage', 'Innovation', 'Private client culture'] },
  breadcrumbSchema(path, 'The House', [{ name: 'Learn', path: '/learn' }]),
]

export default function TheHouseRoute() { return <SeoJsonLd schemas={schemas}><TheHousePage /></SeoJsonLd> }
