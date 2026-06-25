import type { Metadata, ReactNode } from 'next'

  export const metadata: Metadata = {
    title: 'Shamim Forever Boutiques — Karachi, Lahore, Dubai | Luxury Flagship Stores',
    description: "Visit Shamim Forever boutiques in Karachi, Lahore, and Dubai. Experience luxury fragrances, bespoke jewellery, and premium cosmetics in person. Book a private consultation.",
    keywords: [
      'Shamim Forever boutique', 'luxury store Karachi', 'luxury store Lahore',
      'luxury perfume store Pakistan', 'luxury boutique Dubai', 'bespoke jewellery store Karachi',
      'Shamim Forever store locations', 'luxury store near me Pakistan',
      'flagship store Shamim Forever', 'luxury shopping Pakistan',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/boutiques' },
    openGraph: {
      title: 'Shamim Forever Boutiques — Flagship Luxury Stores',
      description: 'Visit our boutiques in Karachi, Lahore, and Dubai for a personal luxury experience.',
      type: 'website',
      url: 'https://www.shamimforever.com/boutiques',
      siteName: 'Shamim Forever',
      images: [{ url: 'https://www.shamimforever.com/og-boutiques.jpg', width: 1200, height: 630, alt: 'Shamim Forever Boutique' }],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }

  const boutiquesSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
        { "@type": "ListItem", "position": 2, "name": "Boutiques", "item": "https://www.shamimforever.com/boutiques" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.shamimforever.com/boutiques#karachi",
      "name": "Shamim Forever — Karachi Flagship Boutique",
      "description": "Luxury fragrances, bespoke jewellery, and premium cosmetics — flagship boutique in Karachi, Pakistan.",
      "url": "https://www.shamimforever.com/boutiques",
      "telephone": "+92-300-0000000",
      "priceRange": "$$$",
      "currenciesAccepted": "PKR, USD",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "openingHours": "Mo-Sa 10:00-21:00",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Karachi",
        "addressRegion": "Sindh",
        "addressCountry": "PK"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 24.8607, "longitude": 67.0011 },
      "image": "https://www.shamimforever.com/og-boutiques.jpg",
      "logo": "https://www.shamimforever.com/logo-sf.png",
      "parentOrganization": { "@type": "Organization", "@id": "https://www.shamimforever.com/#organization", "name": "Shamim Forever" },
      "servesCuisine": [],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Shamim Forever Luxury Collections",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Luxury Fragrances" } },
          { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Bespoke Jewellery" } },
          { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Premium Cosmetics" } }
        ]
      },
      "sameAs": ["https://www.shamimforever.com"]
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.shamimforever.com/boutiques#lahore",
      "name": "Shamim Forever — Lahore Boutique",
      "description": "Luxury fragrances, bespoke jewellery, and premium cosmetics — boutique in Lahore, Pakistan.",
      "url": "https://www.shamimforever.com/boutiques",
      "address": { "@type": "PostalAddress", "addressLocality": "Lahore", "addressRegion": "Punjab", "addressCountry": "PK" },
      "parentOrganization": { "@type": "Organization", "@id": "https://www.shamimforever.com/#organization", "name": "Shamim Forever" }
    }
  ]

  export default function BoutiquesLayout({ children }: { children: ReactNode }) {
    return (
      <>
        {boutiquesSchemas.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        {children}
      </>
    )
  }
  