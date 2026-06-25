import type { Metadata } from 'next'
  import CollectionsClient from './CollectionsClient'

  export const metadata: Metadata = {
    title: 'Luxury Collections — Fragrances, Jewellery & Cosmetics | Shamim Forever',
    description: 'Explore Shamim Forever collections — sovereign perfumes, bespoke luxury jewellery, premium cosmetics, and exclusive guest curations. Blockchain-authenticated. Shop worldwide.',
    keywords: [
      'luxury fragrance collection Pakistan', 'bespoke jewellery collection Pakistan',
      'sovereign perfumes collection', 'luxury cosmetics Pakistan',
      'shamim forever collections', 'oud collection Pakistan',
      'blockchain luxury collection', 'exclusive luxury gifts Pakistan',
      'museum grade perfume collection', 'shamimforever.com collections',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/collections' },
    openGraph: {
      title: 'Luxury Collections — Shamim Forever',
      description: 'Sovereign perfumes, bespoke jewellery, and premium cosmetics. Blockchain-verified luxury from Pakistan to the world.',
      type: 'website',
      url: 'https://www.shamimforever.com/collections',
      siteName: 'Shamim Forever',
      images: [{ url: 'https://www.shamimforever.com/og-collections.jpg', width: 1200, height: 630, alt: 'Shamim Forever Luxury Collections' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Luxury Collections — Shamim Forever',
      description: 'Sovereign perfumes, bespoke jewellery, and premium cosmetics.',
      images: ['https://www.shamimforever.com/og-collections.jpg'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }

  const collectionsSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
        { "@type": "ListItem", "position": 2, "name": "Collections", "item": "https://www.shamimforever.com/collections" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.shamimforever.com/collections#collectionpage",
      "name": "Shamim Forever Luxury Collections",
      "description": "Sovereign perfumes, bespoke luxury jewellery, and premium cosmetics — all blockchain-authenticated.",
      "url": "https://www.shamimforever.com/collections",
      "isPartOf": { "@type": "WebSite", "@id": "https://www.shamimforever.com/#website" },
      "publisher": { "@type": "Organization", "@id": "https://www.shamimforever.com/#organization", "name": "Shamim Forever" }
    }
  ]

  export default function CollectionsPage() {
    return (
      <>
        {collectionsSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <CollectionsClient />
      </>
    )
  }
  