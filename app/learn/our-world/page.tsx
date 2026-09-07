import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'
import { OUR_WORLD_FAQS } from '@/lib/our-world-faq'
import OurWorldPage from '@/components/learn/OurWorldPage'

const path = '/learn/our-world'
const title = 'Our World | The Global Universe of Shamim Forever'
const description = 'Explore the world of Shamim Forever, a sovereign luxury house shaped by craftsmanship, culture, heritage, private experiences, global destinations and the future of enduring luxury.'
const keywords = ['Our World Shamim Forever', 'global luxury house', 'luxury culture and heritage', 'private client experience', 'global luxury destinations', 'craft and creation', 'heritage and memory', 'luxury ecosystem', 'global presence']
const dateModified = '2026-09-07'

export const metadata: Metadata = {
  title,
  description,
  keywords,
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title,
    description,
    url: absoluteUrl(path),
    type: 'article',
    siteName: 'Shamim Forever',
    section: 'Our World',
    tags: keywords,
    publishedTime: dateModified,
    modifiedTime: dateModified,
    images: [metadataImage('/og-faisal-orakzai.jpg', 'Our World of Shamim Forever')],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-faisal-orakzai.jpg'] },
  robots: { index: true, follow: true },
}

const schemas = [
  {
    ...pageSchema({ type: 'Article', path, name: title, description, image: '/og-faisal-orakzai.jpg', mainEntity: { '@id': absoluteUrl(path) + '#our-world' } }),
    '@id': absoluteUrl(path) + '#our-world',
    headline: title,
    author: organizationRef(),
    publisher: organizationRef(),
    datePublished: dateModified,
    dateModified,
    articleSection: 'Our World',
    keywords,
    inLanguage: 'en',
    about: ['Global luxury', 'Luxury culture', 'Heritage and memory', 'Private client experience', 'Craft and creation', 'Digital luxury', 'Sovereign ecosystem'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': absoluteUrl(path) + '#world-map',
    name: 'The Shamim Forever World',
    url: absoluteUrl(path),
    description: 'Places, people, culture, heritage, experiences, digital systems, and future possibilities within the Shamim Forever world.',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: 5,
    itemListElement: ['France', 'Pakistan', 'United Arab Emirates', 'Saudi Arabia', 'Future destinations'].map((name, position) => ({ '@type': 'ListItem', position: position + 1, name })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl(path) + '#organization',
    name: 'Shamim Forever',
    url: absoluteUrl(path),
    parentOrganization: organizationRef(),
    knowsAbout: ['Global luxury', 'Luxury culture', 'Heritage and memory', 'Private client experience', 'Craft and creation', 'Digital luxury', 'Sovereign ecosystem'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': absoluteUrl(path) + '#faq',
    url: absoluteUrl(path) + '#faq',
    name: 'Our World frequently asked questions',
    mainEntity: OUR_WORLD_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  },
  breadcrumbSchema(path, 'Our World', [{ name: 'Learn', path: '/learn' }]),
]

export default function OurWorldRoute() {
  return <SeoJsonLd schemas={schemas}><OurWorldPage /></SeoJsonLd>
}
