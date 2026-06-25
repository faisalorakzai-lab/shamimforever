import type { Metadata } from 'next'
  import JournalClient from './JournalClient'

  export const metadata: Metadata = {
    title: 'The Journal — Luxury Insights, Fragrance & Blockchain Stories | Shamim Forever',
    description: "Read the Shamim Forever Journal — sovereign dispatches on luxury living, fragrance architecture, blockchain provenance, bespoke craftsmanship, and the Faisal Orakzai vision.",
    keywords: [
      'Shamim Forever journal', 'luxury fragrance blog Pakistan', 'perfume blog Pakistan',
      'blockchain luxury blog', 'luxury lifestyle Pakistan', 'Faisal Orakzai blog',
      'sovereign luxury stories', 'oud stories Pakistan', 'bespoke jewellery Pakistan blog',
      'DeFi luxury blockchain', 'shamimforever journal', 'fragrance insights Pakistan',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/journal' },
    openGraph: {
      title: 'The Journal — Shamim Forever',
      description: "Sovereign dispatches on luxury, fragrance, blockchain, and craftsmanship from Pakistan's most ambitious luxury house.",
      type: 'website',
      url: 'https://www.shamimforever.com/journal',
      siteName: 'Shamim Forever',
      images: [{ url: 'https://www.shamimforever.com/og-journal.jpg', width: 1200, height: 630, alt: 'Shamim Forever Journal' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Journal — Shamim Forever',
      description: 'Sovereign dispatches on luxury, fragrance, and blockchain.',
      images: ['https://www.shamimforever.com/og-journal.jpg'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }

  const journalSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
        { "@type": "ListItem", "position": 2, "name": "Journal", "item": "https://www.shamimforever.com/journal" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://www.shamimforever.com/journal#blog",
      "name": "The Shamim Forever Journal",
      "description": "Sovereign dispatches on luxury, fragrance architecture, blockchain provenance, and bespoke craftsmanship.",
      "url": "https://www.shamimforever.com/journal",
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.shamimforever.com/#organization",
        "name": "Shamim Forever",
        "logo": { "@type": "ImageObject", "url": "https://www.shamimforever.com/logo-sf.png" }
      },
      "author": {
        "@type": "Person",
        "@id": "https://www.wikidata.org/wiki/Q140264666",
        "name": "Faisal Orakzai"
      },
      "inLanguage": "en"
    }
  ]

  export default function JournalPage() {
    return (
      <>
        {journalSchemas.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <JournalClient />
      </>
    )
  }
  