import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'

const path = '/virtual-atelier'
const title = 'Virtual Atelier — Private Digital Craft'
const socialTitle = `${title} | Shamim Forever`
const description = 'Enter Shamim Forever’s Virtual Atelier to explore private consultations, digital craftsmanship, bespoke commissions, and a new dimension of sovereign luxury.'
const image = '/og-atelier.jpg'

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
    images: [metadataImage(image, 'Shamim Forever Virtual Atelier')],
  },
  twitter: { card: 'summary_large_image', title: socialTitle, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({
    path,
    name: 'Shamim Forever Virtual Atelier',
    description,
    image,
    mainEntity: { '@id': `${absoluteUrl(path)}#service` },
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: 'Virtual Atelier',
    serviceType: 'Digital luxury consultation and bespoke commission',
    description,
    provider: organizationRef(),
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    url: absoluteUrl(path),
  },
  breadcrumbSchema(path, 'Virtual Atelier'),
]

export default function VirtualAtelierLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}