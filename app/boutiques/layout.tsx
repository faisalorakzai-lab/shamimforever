import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const HQ_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '77 Esplanade du Général de Gaulle',
  addressLocality: 'Puteaux',
  addressRegion: 'Hauts-de-Seine',
  addressCountry: 'FR',
}

export const metadata: Metadata = {
  title: 'Shamim Forever Boutiques & Global Headquarters | Paris La Défense',
  description: "Explore Shamim Forever's global presence, including its Global Headquarters in Puteaux, Paris La Défense, France, and the House's long-term international vision.",
  keywords: [
    'Shamim Forever boutiques',
    'Shamim Forever global headquarters',
    'Shamim Forever Puteaux',
    'Paris La Défense luxury house',
    'Shamim Forever locations',
    'luxury concierge',
    'private luxury experiences',
  ],
  alternates: { canonical: 'https://www.shamimforever.com/boutiques' },
  openGraph: {
    title: 'Shamim Forever Boutiques & Global Headquarters | Paris La Défense',
    description: "Discover Shamim Forever's verified global headquarters and long-term international presence.",
    type: 'website',
    url: 'https://www.shamimforever.com/boutiques',
    siteName: 'Shamim Forever',
    images: [{ url: 'https://www.shamimforever.com/og-boutiques.jpg', width: 1200, height: 630, alt: 'Shamim Forever Boutiques and Global Presence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shamim Forever Boutiques & Global Headquarters',
    description: "Explore Shamim Forever's headquarters in Puteaux and future global presence.",
    images: ['https://www.shamimforever.com/og-boutiques.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const boutiquesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.shamimforever.com/boutiques#webpage',
      url: 'https://www.shamimforever.com/boutiques',
      name: 'Shamim Forever Boutiques & Global Headquarters',
      description: "Explore Shamim Forever's global presence, including its Global Headquarters in Puteaux, Paris La Défense, France, and the House's long-term international vision.",
      isPartOf: { '@id': 'https://www.shamimforever.com/#website' },
      about: { '@id': 'https://www.shamimforever.com/#organization' },
      breadcrumb: { '@id': 'https://www.shamimforever.com/boutiques#breadcrumb' },
      mainEntity: { '@id': 'https://www.shamimforever.com/boutiques#headquarters' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.shamimforever.com/#organization',
      name: 'Shamim Forever',
      url: 'https://www.shamimforever.com',
      logo: 'https://www.shamimforever.com/logo-sf.png',
      foundingDate: '2023',
      address: HQ_ADDRESS,
      location: { '@id': 'https://www.shamimforever.com/boutiques#headquarters' },
      sameAs: [
        'https://www.instagram.com/shamimforever',
        'https://x.com/shamimforever',
        'https://www.facebook.com/shamimforever',
        'https://www.linkedin.com/company/shamimforever',
        'https://www.wikidata.org/wiki/Q141223771',
      ],
    },
    {
      '@type': 'Place',
      '@id': 'https://www.shamimforever.com/boutiques#headquarters',
      name: 'Shamim Forever Global Headquarters',
      description: 'The administrative and strategic center of Shamim Forever in Puteaux, within the Paris La Défense region of France.',
      address: HQ_ADDRESS,
      containedInPlace: {
        '@type': 'Place',
        name: 'Paris La Défense',
        address: { '@type': 'PostalAddress', addressLocality: 'Puteaux', addressRegion: 'Hauts-de-Seine', addressCountry: 'FR' },
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.shamimforever.com/boutiques#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shamimforever.com/' },
        { '@type': 'ListItem', position: 2, name: 'Boutiques & Global Presence', item: 'https://www.shamimforever.com/boutiques' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.shamimforever.com/boutiques#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where is Shamim Forever headquartered?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Shamim Forever Global Headquarters is at 77 Esplanade du Général de Gaulle, Puteaux, Hauts-de-Seine, Paris La Défense, France.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Shamim Forever currently have boutiques in other cities?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The House is developing a long-term international presence. Future locations will be announced officially when they are operational or formally secured.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I arrange a private visit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Certain Shamim Forever experiences may be available by appointment or invitation. Contact the concierge for current guidance.',
          },
        },
      ],
    },
  ],
}

export default function BoutiquesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(boutiquesJsonLd) }} />
      {children}
    </>
  )
}