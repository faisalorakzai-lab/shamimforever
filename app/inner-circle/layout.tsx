import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { absoluteUrl, breadcrumbSchema, metadataImage, organizationRef, pageSchema } from '@/lib/seo'

const path = '/inner-circle'
const title = 'Inner Circle | Private Luxury Access'
const socialTitle = `${title} | Shamim Forever`
const description = 'Explore Shamim Forever’s Inner Circle, a private relationship program built around trust, continuity, discretion, bespoke access, and long-term connection.'
const image = '/og-faisal-orakzai.jpg'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl(path) },
  keywords: [
    'Shamim Forever Inner Circle',
    'private luxury access',
    'luxury concierge',
    'bespoke luxury experiences',
    'private collection previews',
    'luxury relationship program',
  ],
  openGraph: {
    title: socialTitle,
    description,
    url: absoluteUrl(path),
    type: 'website',
    siteName: 'Shamim Forever',
    images: [metadataImage(image, 'Shamim Forever Inner Circle membership')],
  },
  twitter: { card: 'summary_large_image', title: socialTitle, description, images: [absoluteUrl(image)] },
  robots: { index: true, follow: true },
}

const faqs = [
  ['What is the Shamim Forever Inner Circle?', 'The Inner Circle is a private relationship program for individuals who share a deeper, long-term connection with Shamim Forever. It is not a public subscription or points-based loyalty program.'],
  ['How is Inner Circle consideration different from Whitelist Access?', 'Whitelist Access is an entry point for selected communications and future opportunities. The Inner Circle represents a deeper relationship and separate consideration process.'],
  ['Does applying guarantee membership?', 'No. A request creates an opportunity for review. It does not guarantee acceptance, products, allocation, invitations, concierge access, or any other benefit.'],
  ['Are there membership tiers or required spending levels?', 'This page does not promise public tiers or a spending threshold. The House may consider relationships, engagement, preferences, and other factors privately as the program develops.'],
  ['Is the Inner Circle an investment, cryptocurrency, or financial product?', 'No. The Inner Circle is a private luxury relationship program, not a financial instrument, investment product, cryptocurrency, or ownership scheme.'],
  ['How can the relationship begin?', 'Explore the House, enter through Whitelist Access, remain connected, and allow the relationship to develop over time. Selected relationships may receive further consideration.'],
]

const schemas = [
  {
    ...pageSchema({
      path,
      name: 'The Shamim Forever Inner Circle',
      description,
      image,
      mainEntity: { '@id': `${absoluteUrl(path)}#service` },
    }),
    inLanguage: ['en', 'ur'],
    datePublished: '2026-09-06',
    dateModified: '2026-09-06',
  },
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
    category: 'Private luxury relationship program',
    termsOfService: absoluteUrl('/policies'),
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
  breadcrumbSchema(path, 'Inner Circle'),
]

export default function InnerCircleLayout({ children }: { children: React.ReactNode }) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>
}