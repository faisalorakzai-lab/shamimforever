import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'

const path = '/heirloom-vault'
const title = 'Heirloom Vault — NFT Inheritance & Digital Succession'
const description = 'Plan NFT inheritance with Shamim Forever’s Heirloom Vault: assign heirs, schedule time-locks, and preserve physical and digital provenance across generations.'
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
    images: [metadataImage(image, 'Shamim Forever Heirloom Vault')],
  },
  twitter: { card: 'summary_large_image', title, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const schemas = [
  pageSchema({
    path,
    name: 'The Digital Will — Heirloom Vault',
    description,
    image,
    mainEntity: { '@id': `${absoluteUrl(path)}#service` },
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: 'Heirloom Vault',
    serviceType: 'Digital asset inheritance and succession',
    description,
    provider: organizationRef(),
    audience: { '@type': 'Audience', audienceType: 'Luxury collectors and families' },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    url: absoluteUrl(path),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${absoluteUrl(path)}#succession`,
    name: 'How the Heirloom Vault preserves a digital legacy',
    description: 'Set up a succession plan for physical and digital provenance.',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Select your heir', text: 'Choose the person who should receive your digital legacy.' },
      { '@type': 'HowToStep', position: 2, name: 'Assign the heir', text: 'Record the succession instruction in the Heirloom Vault.' },
      { '@type': 'HowToStep', position: 3, name: 'Schedule the time-lock', text: 'Set the conditions and timing for the planned transfer.' },
      { '@type': 'HowToStep', position: 4, name: 'Preserve provenance', text: 'Keep the physical and digital history connected across generations.' },
    ],
  },
  breadcrumbSchema(path, 'Heirloom Vault'),
]

export default function HeirloomVaultLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}