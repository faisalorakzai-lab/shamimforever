import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'

const path = '/delivery'
const title = 'Private White-Glove Delivery'
const socialTitle = `${title} | Shamim Forever`
const description = 'Explore white-glove delivery from vault preparation to climate-controlled transit, GPS escort, identity-confirmed handoff, and sovereign arrival worldwide.'
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
    images: [metadataImage(image, 'Shamim Forever Private White-Glove Delivery')],
  },
  twitter: { card: 'summary_large_image', title: socialTitle, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const deliveryService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${absoluteUrl(path)}#service`,
  name: 'Private White-Glove Delivery',
  serviceType: 'Sovereign luxury delivery',
  description,
  provider: organizationRef(),
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  url: absoluteUrl(path),
}

const deliveryHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${absoluteUrl(path)}#protocol`,
  name: 'How Shamim Forever private delivery works',
  description: 'The four-stage private delivery protocol for Shamim Forever creations.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Vault preparation', text: 'The creation is prepared and authenticated inside the sovereign vault.' },
    { '@type': 'HowToStep', position: 2, name: 'Climate-controlled transit', text: 'The creation travels in protected, climate-controlled transit.' },
    { '@type': 'HowToStep', position: 3, name: 'GPS escort', text: 'The private route is monitored through secure GPS escort.' },
    { '@type': 'HowToStep', position: 4, name: 'Identity-confirmed handoff', text: 'The creation reaches its collector through a confirmed private handoff.' },
  ],
}

const schemas = [
  pageSchema({ path, name: 'Private White-Glove Delivery', description, image, mainEntity: { '@id': `${absoluteUrl(path)}#service` } }),
  deliveryService,
  deliveryHowTo,
  breadcrumbSchema(path, 'Delivery'),
]

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}