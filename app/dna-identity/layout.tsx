import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'

const path = '/dna-identity'
const title = 'Scent DNA & Biological Authentication'
const socialTitle = `${title} | Shamim Forever`
const description = 'Discover Shamim Forever scent DNA: nano-markers, skin chemistry, NFC verification, and a biometric-inspired profile for personalized fragrance commissions.'
const image = '/blockchain-passport.png'

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
    images: [metadataImage(image, 'Shamim Forever Scent DNA and Authentication')],
  },
  twitter: { card: 'summary_large_image', title: socialTitle, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({
    path,
    name: 'The Biological Lock — Scent DNA Identity',
    description,
    image,
    mainEntity: { '@id': `${absoluteUrl(path)}#service` },
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: 'Scent DNA Authentication',
    serviceType: 'Fragrance authentication and personalization',
    description,
    provider: organizationRef(),
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    url: absoluteUrl(path),
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Nano-marker verification', value: 'Authenticity signal' },
      { '@type': 'PropertyValue', name: 'Skin chemistry profile', value: 'Personalized fragrance guidance' },
      { '@type': 'PropertyValue', name: 'NFC verification', value: 'Digital identity check' },
    ],
  },
  breadcrumbSchema(path, 'DNA Identity'),
]

export default function DnaIdentityLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}