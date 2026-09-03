import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, pageSchema, organizationRef } from '@/lib/seo'

const path = '/care'
const title = 'Lifetime Care & Restoration | Shamim Forever'
const description = 'Protect every Shamim Forever creation with lifetime restoration, fragrance refills, jewelry polishing, climate-controlled vaulting, and NFT service tracking.'
const image = '/og-heirloom.jpg'

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
    images: [metadataImage(image, 'Shamim Forever Lifetime Care and Restoration')],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [absoluteUrl(image)],
  },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({
    path,
    name: 'Sovereign Care — Lifetime Restoration & Service',
    description,
    image,
    mainEntity: { '@id': `${absoluteUrl(path)}#service` },
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: 'Sovereign Care',
    serviceType: 'Lifetime restoration, fragrance refill, jewelry polishing, vaulting, and NFT service tracking',
    description,
    provider: organizationRef(),
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    url: absoluteUrl(path),
  },
  breadcrumbSchema(path, 'Care'),
]

export default function CareLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}