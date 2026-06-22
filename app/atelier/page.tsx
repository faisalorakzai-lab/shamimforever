import type { Metadata } from 'next'
  import Script from 'next/script'
  import AtelierClient from './AtelierClient'

  export const metadata: Metadata = {
    title: 'The Atelier — Craft, Heritage & Vision | Shamim Forever',
    description: 'Step inside the Shamim Forever Atelier — where sovereign luxury is born. Discover the heritage, craft philosophy, and visionary process behind every fragrance and creation.',
    keywords: [
      'Shamim Forever atelier', 'luxury house story', 'bespoke fragrance craft',
      'perfume house Pakistan', 'luxury brand story', 'sovereign perfumery',
      'shamimforever atelier', 'luxury craftsmanship Pakistan',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/atelier' },
    openGraph: {
      title: 'The Atelier — Shamim Forever',
      description: 'Where sovereign luxury is born. Craft, heritage, and visionary perfumery.',
      url: 'https://www.shamimforever.com/atelier',
      siteName: 'Shamim Forever',
      type: 'website',
      images: [{ url: 'https://www.shamimforever.com/og-banner.jpg', width: 1200, height: 630, alt: 'Shamim Forever Atelier' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Atelier — Shamim Forever',
      description: 'Where sovereign luxury is born. Craft, heritage, and visionary perfumery.',
      images: ['https://www.shamimforever.com/og-banner.jpg'],
    },
  }

  const atelierJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Shamim Forever Atelier",
    "description": "The creative studio and craft philosophy behind Shamim Forever — sovereign luxury fragrances.",
    "creator": { "@type": "Organization", "name": "Shamim Forever", "url": "https://www.shamimforever.com" },
    "url": "https://www.shamimforever.com/atelier"
  }

  export default function AtelierPage() {
    return (
      <>
        <Script id="atelier-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(atelierJsonLd) }} />
        <AtelierClient />
      </>
    )
  }
  