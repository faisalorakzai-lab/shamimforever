import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Journal | Shamim Forever — Curated Insights on Timeless Luxury',
    template: '%s | Shamim Forever Journal',
  },
  description:
    'The official journal of Shamim Forever. Explore curated dispatches on luxury craftsmanship, rare fragrances, fine jewelry, digital sovereignty, and the art of living beautifully.',
  keywords: [
    'Shamim Forever journal', 'luxury journal', 'luxury fragrance editorial',
    'fine jewelry editorial', 'OKBOND', 'Orakzai ecosystem', 'timeless luxury',
    'luxury lifestyle editorial', 'bespoke perfumery', 'luxury Pakistan',
    'sovereign luxury brand', 'Shamim Forever',
  ],
  openGraph: {
    siteName: 'Shamim Forever',
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://www.shamimforever.com/founders-vision.png', width: 1200, height: 630, alt: 'Shamim Forever Journal' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shamimforever',
    creator: '@shamimforever',
  },
  alternates: { canonical: 'https://www.shamimforever.com/journal' },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function JournalLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Shamim Forever Journal',
    description: 'Curated dispatches on luxury craftsmanship, rare fragrances, fine jewelry, and the art of living beautifully.',
    url: 'https://www.shamimforever.com/journal',
    publisher: {
      '@type': 'Organization',
      name: 'Shamim Forever',
      url: 'https://www.shamimforever.com',
      logo: { '@type': 'ImageObject', url: 'https://www.shamimforever.com/logo-sf.png' },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shamimforever.com' },
        { '@type': 'ListItem', position: 2, name: 'Journal', item: 'https://www.shamimforever.com/journal' },
      ],
    },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
