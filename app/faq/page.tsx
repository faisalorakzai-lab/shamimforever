import type { Metadata } from 'next'
import FAQClient from './FAQClient'
import { allFaqItems } from './content'

const faqUrl = 'https://www.shamimforever.com/faq'
const description = 'Find answers about Shamim Forever, luxury collections, bespoke commissions, authenticity, private delivery, concierge services, boutiques, orders, returns, privacy and more.'

export const metadata: Metadata = {
  title: { absolute: 'Shamim Forever FAQ | Luxury, Orders, Authenticity & Concierge' },
  description,
  keywords: [
    'Shamim Forever FAQ', 'luxury FAQ', 'luxury concierge Pakistan', 'bespoke luxury services',
    'luxury product authenticity', 'private luxury shopping', 'luxury delivery Pakistan',
    'bespoke commissions', 'Shamim Forever Concierge', 'luxury customer support',
  ],
  alternates: { canonical: faqUrl },
  openGraph: {
    title: 'Shamim Forever FAQ | Luxury, Orders, Authenticity & Concierge',
    description,
    type: 'website',
    url: faqUrl,
    siteName: 'Shamim Forever',
    images: [{ url: '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever — Sovereign Luxury House' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shamim Forever FAQ | Luxury, Orders, Authenticity & Concierge',
    description,
    images: ['/logo-sf.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${faqUrl}#webpage`,
      url: faqUrl,
      name: 'Shamim Forever Frequently Asked Questions',
      description,
      inLanguage: 'en',
      isPartOf: { '@id': 'https://www.shamimforever.com/#website' },
      about: { '@id': 'https://www.shamimforever.com/#organization' },
      breadcrumb: { '@id': `${faqUrl}#breadcrumb` },
      mainEntity: { '@id': `${faqUrl}#faq` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${faqUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shamimforever.com/' },
        { '@type': 'ListItem', position: 2, name: 'Frequently Asked Questions', item: faqUrl },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${faqUrl}#faq`,
      name: 'Shamim Forever — Frequently Asked Questions',
      url: faqUrl,
      inLanguage: 'en',
      isPartOf: { '@id': 'https://www.shamimforever.com/#website' },
      publisher: { '@id': 'https://www.shamimforever.com/#organization' },
      mainEntity: allFaqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-5 py-28 text-zinc-200 md:px-12 lg:px-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <FAQClient />
    </main>
  )
}
