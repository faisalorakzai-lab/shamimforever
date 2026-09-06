import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'

const path = '/whitelist-access'
const title = 'Whitelist Access | Private Luxury Access'
const description = 'Explore Shamim Forever Whitelist Access, a considered path to selected communications, private experiences, limited releases, and future House invitations.'
const image = '/og-faisal-orakzai.jpg'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Shamim Forever Whitelist Access', 'private luxury access', 'luxury private invitations', 'limited release access', 'Shamim Forever Inner Circle'],
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title: `${title} | Shamim Forever`,
    description,
    url: absoluteUrl(path),
    type: 'website',
    siteName: 'Shamim Forever',
    images: [metadataImage(image, 'Shamim Forever Whitelist Access')],
  },
  twitter: { card: 'summary_large_image', title: `${title} | Shamim Forever`, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const faqs = [
  ['What is Shamim Forever Whitelist Access?', 'Whitelist Access is a private entry point for individuals interested in selected communications and future access opportunities from Shamim Forever.'],
  ['Is Whitelist Access free?', 'Submitting an access request does not require payment.'],
  ['Does joining guarantee products or allocation?', 'No. Whitelist Access does not guarantee product availability, allocation, invitations, or membership.'],
  ['Does Whitelist Access guarantee Inner Circle membership?', 'No. The Inner Circle is a separate private access environment with its own invitation or consideration process.'],
]

const schemas = [
  {
    ...pageSchema({
      path,
      name: 'Shamim Forever Whitelist Access',
      description,
      image,
      mainEntity: { '@id': `${absoluteUrl(path)}#access` },
    }),
    inLanguage: ['en', 'ur'],
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#access`,
    name: 'Whitelist Access',
    serviceType: 'Private luxury access consideration',
    description,
    provider: organizationRef(),
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    url: absoluteUrl(path),
    category: 'Private access and House communications',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${absoluteUrl(path)}#how-it-works`,
    name: 'How Shamim Forever Whitelist Access works',
    description: 'The five-stage request and consideration pathway for Shamim Forever Whitelist Access.',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Request', text: 'Submit an access request with accurate information.' },
      { '@type': 'HowToStep', position: 2, name: 'Verify', text: 'Confirm contact details where required.' },
      { '@type': 'HowToStep', position: 3, name: 'Enter', text: 'Your request becomes part of the House access system.' },
      { '@type': 'HowToStep', position: 4, name: 'Remain connected', text: 'Receive selected communications and future opportunities.' },
      { '@type': 'HowToStep', position: 5, name: 'Evolve', text: 'Additional access opportunities may become available as the House develops.' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  },
  breadcrumbSchema(path, 'Whitelist Access'),
]

export default function WhitelistAccessLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}