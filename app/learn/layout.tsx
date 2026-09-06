import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'

const path = '/learn'
const title = 'Welcome to Shamim Forever | Learn'
const description = 'A canonical knowledge page explaining Shamim Forever, sovereign luxury, craftsmanship, provenance, digital identity, heritage, technology, and legacy.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl(path) },
  robots: { index: true, follow: true },
}

const schemas = [
  {
    ...pageSchema({
      type: 'Article',
      path,
      name: title,
      description,
      image: '/og-faisal-orakzai.jpg',
      mainEntity: { '@id': `${absoluteUrl(path)}#knowledge` },
    }),
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#knowledge`,
    headline: title,
    author: organizationRef(),
    publisher: organizationRef(),
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
    inLanguage: ['en', 'ur'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#chapters`,
    name: 'Shamim Forever Learn chapters',
    itemListElement: [
      'Start Here',
      'The House',
      'Luxury',
      'Our World',
      'Authenticity',
      'Innovation',
      'Sovereign Infrastructure',
      'Guides',
      'Glossary',
      'FAQ',
    ].map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      url: `${absoluteUrl(path)}#${name.toLowerCase().replaceAll(' ', '-')}`,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${absoluteUrl(path)}#knowledge`,
    name: 'Shamim Forever Learn',
    url: absoluteUrl(path),
    parentOrganization: organizationRef(),
  },
  breadcrumbSchema(path, 'Learn'),
]

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}