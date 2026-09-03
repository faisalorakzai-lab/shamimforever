import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'

const path = '/concierge'
const title = 'Private Luxury Concierge & Consultations'
const socialTitle = `${title} | Shamim Forever`
const description = 'Book a private Shamim Forever consultation across 11 global addresses worldwide for fragrance, jewelry, bridal, bespoke, cosmetics, or VIP styling services.'
const image = '/og-boutiques.jpg'

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
    images: [metadataImage(image, 'Shamim Forever Private Luxury Concierge')],
  },
  twitter: { card: 'summary_large_image', title: socialTitle, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({
    type: 'ContactPage',
    path,
    name: 'Private Luxury Concierge',
    description,
    image,
    mainEntity: { '@id': `${absoluteUrl(path)}#service` },
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: 'Private Luxury Concierge',
    serviceType: 'Private consultation, appointment, and VIP styling',
    description,
    provider: organizationRef(),
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    availableChannel: [
      { '@type': 'ServiceChannel', serviceUrl: absoluteUrl(path), name: 'Private consultation booking' },
      { '@type': 'ServiceChannel', serviceUrl: 'https://wa.me/923119447572', name: 'WhatsApp concierge' },
    ],
    url: absoluteUrl(path),
  },
  breadcrumbSchema(path, 'Concierge'),
]

export default function ConciergeLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}