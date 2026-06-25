import type { Metadata } from 'next'
  import AtelierClient from './AtelierClient'

  export const metadata: Metadata = {
    title: 'The Atelier — Craft, Heritage & Vision | Shamim Forever',
    description: 'Step inside the Shamim Forever Atelier — where sovereign luxury is born. Discover the heritage, craft philosophy, and visionary process behind every bespoke fragrance, jewellery piece, and luxury creation by Faisal Orakzai.',
    keywords: [
      'Shamim Forever atelier', 'luxury house story Pakistan', 'bespoke fragrance craft',
      'perfume house Pakistan', 'luxury brand story', 'sovereign perfumery Pakistan',
      'Faisal Orakzai atelier', 'luxury craftsmanship Pakistan', 'bespoke jewellery craft Pakistan',
      'luxury brand heritage Pakistan', 'museum grade perfume craft',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/atelier' },
    openGraph: {
      title: 'The Atelier — Shamim Forever',
      description: 'Where sovereign luxury is born. The craft, heritage, and vision of Shamim Forever by Faisal Orakzai.',
      type: 'website',
      url: 'https://www.shamimforever.com/atelier',
      siteName: 'Shamim Forever',
      images: [{ url: 'https://www.shamimforever.com/og-atelier.jpg', width: 1200, height: 630, alt: 'Shamim Forever Atelier' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Atelier — Shamim Forever',
      description: 'Where sovereign luxury is born. Craft, heritage, and vision.',
      images: ['https://www.shamimforever.com/og-atelier.jpg'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }

  const atelierSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
        { "@type": "ListItem", "position": 2, "name": "The Atelier", "item": "https://www.shamimforever.com/atelier" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://www.shamimforever.com/atelier#aboutpage",
      "name": "The Shamim Forever Atelier",
      "description": "Where sovereign luxury is born. The craft, heritage, and vision of Shamim Forever.",
      "url": "https://www.shamimforever.com/atelier",
      "isPartOf": { "@type": "WebSite", "@id": "https://www.shamimforever.com/#website" },
      "about": { "@type": "Organization", "@id": "https://www.shamimforever.com/#organization", "name": "Shamim Forever" },
      "author": { "@type": "Person", "@id": "https://www.wikidata.org/wiki/Q140264666", "name": "Faisal Orakzai" }
    }
  ]

  export default function AtelierPage() {
    return (
      <>
        {atelierSchemas.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <AtelierClient />
      </>
    )
  }
  