import type { Metadata } from 'next'
  import CollectionsClient from './CollectionsClient'

  export const metadata: Metadata = {
    title: 'Collections — Luxury Fragrances, Jewellery & Cosmetics | Shamim Forever',
    description: 'Explore Shamim Forever collections — sovereign perfumes, luxury jewellery, couture cosmetics, and guest curations. Shop exclusive luxury online in Pakistan & worldwide.',
    keywords: [
      'luxury fragrance collection Pakistan', 'perfume collection', 'sovereign jewellery',
      'luxury cosmetics Pakistan', 'shamim forever collections', 'oud collection',
      'buy luxury perfume Pakistan', 'shamimforever.com shop',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/collections' },
    openGraph: {
      title: 'Collections — Shamim Forever',
      description: 'Sovereign perfumes, jewellery, couture cosmetics, and guest curations.',
      url: 'https://www.shamimforever.com/collections',
      siteName: 'Shamim Forever',
      type: 'website',
      images: [{ url: 'https://www.shamimforever.com/og-banner.jpg', width: 1200, height: 630, alt: 'Shamim Forever Collections' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Collections — Shamim Forever',
      description: 'Sovereign perfumes, jewellery, couture cosmetics, and guest curations.',
      images: ['https://www.shamimforever.com/og-banner.jpg'],
    },
  }

  export default function CollectionsPage() {
    return <CollectionsClient />
  }
  