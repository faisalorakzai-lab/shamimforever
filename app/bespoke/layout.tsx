import type { Metadata } from 'next'
  import type { ReactNode } from 'react'

  export const metadata: Metadata = {
    title: 'Bespoke — Commission Your Sovereign Piece | Shamim Forever',
    description: "Commission a one-of-a-kind bespoke creation from Shamim Forever — a signature fragrance, jewellery piece, or luxury artefact crafted exclusively for you. Inquiry by appointment.",
    keywords: [
      'bespoke luxury Pakistan', 'custom perfume commission Pakistan', 'bespoke jewellery commission',
      'custom fragrance Pakistan', 'luxury commission Shamim Forever', 'one of a kind jewellery Pakistan',
      'private commission luxury', 'bespoke cosmetics Pakistan', 'Faisal Orakzai bespoke',
      'custom luxury gift Pakistan',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/bespoke' },
    openGraph: {
      title: 'Bespoke — Commission Your Sovereign Piece | Shamim Forever',
      description: 'One-of-a-kind luxury creations crafted exclusively for you. Signature fragrances, jewellery, and artefacts by Shamim Forever.',
      type: 'website',
      url: 'https://www.shamimforever.com/bespoke',
      siteName: 'Shamim Forever',
      images: [{ url: 'https://www.shamimforever.com/og-bespoke.jpg', width: 1200, height: 630, alt: 'Shamim Forever Bespoke Commission' }],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }

  const bespokeSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
        { "@type": "ListItem", "position": 2, "name": "Bespoke", "item": "https://www.shamimforever.com/bespoke" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.shamimforever.com/bespoke#service",
      "name": "Shamim Forever Bespoke Commission Service",
      "description": "Commission one-of-a-kind luxury pieces — signature fragrances, jewellery, and artefacts crafted exclusively for discerning clients.",
      "url": "https://www.shamimforever.com/bespoke",
      "provider": { "@type": "Organization", "@id": "https://www.shamimforever.com/#organization", "name": "Shamim Forever" },
      "serviceType": ["Bespoke Fragrance", "Custom Jewellery", "Luxury Commission"],
      "areaServed": { "@type": "Country", "name": "Pakistan" }
    }
  ]

  export default function BespokeLayout({ children }: { children: ReactNode }) {
    return (
      <>
        {bespokeSchemas.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        {children}
      </>
    )
  }
  