import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, pageSchema, organizationRef } from '@/lib/seo'

const path = '/time-archive'
const title = 'The Provenance Stream — Digital Time Archive'
const socialTitle = `${title} | Shamim Forever`
const description = 'Trace Oud Noir Eternal from aged Assam oud and formula development through artisan bottling, NFC sealing, blockchain anchoring, and first collector ownership.'
const image = '/og-heirloom.jpg'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title: socialTitle,
    description,
    url: absoluteUrl(path),
    type: 'website',
    siteName: 'Shamim Forever',
    images: [metadataImage(image, 'Shamim Forever Digital Time Archive')],
  },
  twitter: { card: 'summary_large_image', title: socialTitle, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({ type: 'CollectionPage', path, name: 'The Provenance Stream — Digital Time Archive', description, image }),
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#archive`,
    name: 'Shamim Forever Provenance Archive',
    numberOfItems: 5,
    itemListElement: [
      'Assam Oud Sourcing',
      'Formula Development',
      'Artisan Bottling',
      'NFC Sealing',
      'Blockchain Anchoring & First Ownership',
    ].map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: { '@type': 'CreativeWork', name, creator: organizationRef() },
    })),
  },
  breadcrumbSchema(path, 'Time Archive'),
]

export default function TimeArchiveLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}