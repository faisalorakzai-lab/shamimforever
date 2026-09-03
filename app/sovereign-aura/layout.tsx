import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'

const path = '/sovereign-aura'
const title = 'Sovereign Aura — AR Product Authentication | Shamim Forever'
const description = 'Activate Shamim Forever’s digital aura to recognize creations, reveal blockchain provenance, and share authenticated ownership through augmented reality.'
const image = '/blockchain-passport.png'

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
    images: [metadataImage(image, 'Shamim Forever Sovereign Aura')],
  },
  twitter: { card: 'summary_large_image', title, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({
    path,
    name: 'The Verified Digital Aura',
    description,
    image,
    mainEntity: { '@id': `${absoluteUrl(path)}#application` },
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${absoluteUrl(path)}#application`,
    name: 'Sovereign Aura',
    description,
    url: absoluteUrl(path),
    applicationCategory: 'Shopping',
    operatingSystem: 'Any',
    featureList: [
      'AR product recognition',
      'Blockchain provenance overlay',
      'Authenticated ownership sharing',
    ],
    creator: organizationRef(),
  },
  breadcrumbSchema(path, 'Sovereign Aura'),
]

export default function SovereignAuraLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}