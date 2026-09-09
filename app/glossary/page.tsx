import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import GlossaryHub from '@/components/GlossaryHub'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'
import { glossaryCategories, glossaryTerms } from '@/lib/glossary-content'

const path = '/glossary'
const title = 'Shamim Forever Glossary | Luxury, Craft, Heritage & Sovereign Infrastructure'
const description = 'Explore the Shamim Forever Glossary, a living reference for luxury, craftsmanship, heritage, bespoke creation, authenticity, private service, innovation, and sovereign infrastructure.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['luxury glossary', 'luxury terminology', 'bespoke glossary', 'craftsmanship terms', 'heritage terminology', 'authenticity terminology', 'private luxury terminology', 'digital authenticity', 'luxury innovation', 'sovereign infrastructure'],
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title,
    description,
    url: absoluteUrl(path),
    type: 'website',
    siteName: 'Shamim Forever',
    images: [metadataImage('/og-faisal-orakzai.jpg', 'The Sovereign Lexicon — Shamim Forever')],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-faisal-orakzai.jpg'] },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({ type: 'CollectionPage', path, name: 'The Sovereign Lexicon', description, image: '/og-faisal-orakzai.jpg', mainEntity: { '@id': `${absoluteUrl(path)}#terms` } }),
  {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${absoluteUrl(path)}#terms`,
    name: 'The Sovereign Lexicon',
    description,
    url: absoluteUrl(path),
    publisher: organizationRef(),
    numberOfItems: glossaryTerms.length,
    hasDefinedTerm: glossaryTerms.map((entry) => ({
      '@type': 'DefinedTerm',
      '@id': `${absoluteUrl(`/glossary/${entry.slug}`)}#term`,
      name: entry.term,
      description: entry.shortDefinition,
      url: absoluteUrl(`/glossary/${entry.slug}`),
      inDefinedTermSet: absoluteUrl(path),
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#categories`,
    name: 'Sovereign Lexicon categories',
    numberOfItems: glossaryCategories.length,
    itemListElement: glossaryCategories.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: category.title,
      description: category.description,
    })),
  },
  breadcrumbSchema(path, 'The Sovereign Lexicon'),
]

export default function GlossaryPage() {
  return (
    <SeoJsonLd schemas={schemas}>
      <main className="min-h-screen">
        <GlossaryHub />
      </main>
    </SeoJsonLd>
  )
}