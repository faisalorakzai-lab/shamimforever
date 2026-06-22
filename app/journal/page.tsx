import type { Metadata } from 'next'
  import Script from 'next/script'
  import JournalClient from './JournalClient'

  export const metadata: Metadata = {
    title: 'The Journal — Sovereign Dispatches & Luxury Insights | Shamim Forever',
    description: 'The Shamim Forever Journal — sovereign dispatches on luxury, fragrance architecture, craftsmanship, and the art of living. Stories from a house that refuses to be ordinary.',
    keywords: [
      'Shamim Forever journal', 'luxury fragrance blog', 'perfume blog Pakistan',
      'luxury lifestyle Pakistan', 'sovereign luxury blog', 'oud stories',
      'shamimforever.com journal', 'fragrance insights',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/journal' },
    openGraph: {
      title: 'The Journal — Shamim Forever',
      description: 'Sovereign dispatches on luxury, fragrance, and the art of living.',
      url: 'https://www.shamimforever.com/journal',
      siteName: 'Shamim Forever',
      type: 'website',
      images: [{ url: 'https://www.shamimforever.com/og-banner.jpg', width: 1200, height: 630, alt: 'Shamim Forever Journal' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Journal — Shamim Forever',
      description: 'Sovereign dispatches on luxury, fragrance, and the art of living.',
      images: ['https://www.shamimforever.com/og-banner.jpg'],
    },
  }

  const journalJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Shamim Forever Journal",
    "description": "Sovereign dispatches on luxury, fragrance architecture, craftsmanship, and the art of living.",
    "url": "https://www.shamimforever.com/journal",
    "publisher": {
      "@type": "Organization",
      "name": "Shamim Forever",
      "logo": { "@type": "ImageObject", "url": "https://www.shamimforever.com/logo-sf.png" }
    }
  }

  export default function JournalPage() {
    return (
      <>
        <Script id="journal-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(journalJsonLd) }} />
        <JournalClient />
      </>
    )
  }
  