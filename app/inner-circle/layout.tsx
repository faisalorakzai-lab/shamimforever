import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'

const path = '/inner-circle'
const title = 'Inner Circle Membership — Private Luxury Access | Shamim Forever'
const description = 'Apply to Shamim Forever’s Inner Circle for early drops, private boutique previews, bespoke commissions, OKBOND privileges, concierge access, and archives.'
const image = '/og-faisal-orakzai.jpg'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title,
    description,
    url: absoluteUrl(path),
    type: 'website',
    siteName: 'Shamim Forever',
    images: [metadataImage(image, 'Shamim Forever Inner Circle membership')],
  },
  twitter: { card: 'summary_large_image', title, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({
    path,
    name: 'The Inner Circle',
    description,
    image,
    mainEntity: { '@id': `${absoluteUrl(path)}#service` },
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: 'Inner Circle Membership',
    serviceType: 'Private luxury membership access',
    description,
    provider: organizationRef(),
    audience: { '@type': 'Audience', audienceType: 'Luxury collectors' },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    url: absoluteUrl(path),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Inner Circle tiers',
      itemListElement: [
        { '@type': 'OfferCatalog', name: 'Confidant' },
        { '@type': 'OfferCatalog', name: 'Sovereign' },
        { '@type': 'OfferCatalog', name: 'Patron' },
      ],
    },
  },
  breadcrumbSchema(path, 'Inner Circle'),
]

export default function InnerCircleLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}