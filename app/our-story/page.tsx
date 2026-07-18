import type { Metadata } from 'next'
  import OurStoryClient from './OurStoryClient'

  export const metadata: Metadata = {
    title: 'Our Story — The Genesis of Sovereign Luxury | Shamim Forever',
    description: "The story of Shamim Forever — born from obsession, perfected through craft. From the bazaars of Peshawar to a global luxury house. Discover the origin of a sovereign brand founded by Faisal Orakzai.",
    keywords: [
      'Shamim Forever story', 'luxury brand Pakistan history', 'sovereign luxury origin',
      'shamim forever about', 'Pakistani luxury house founder', 'luxury brand founders Pakistan',
      'Faisal Orakzai story', 'Orakzai Group history', 'luxury brand heritage Pakistan',
      'blockchain luxury brand story', 'shamimforever.com our story',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/our-story' },
    openGraph: {
      title: 'Our Story — Shamim Forever',
      description: 'Born from obsession, perfected through craft. From Peshawar to the world — the origin of a sovereign luxury house.',
      type: 'website',
      url: 'https://www.shamimforever.com/our-story',
      siteName: 'Shamim Forever',
      images: [{ url: 'https://www.shamimforever.com/og-our-story.jpg', width: 1200, height: 630, alt: 'Shamim Forever — Our Story' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Story — Shamim Forever',
      description: 'Born from obsession, perfected through craft. The origin of a sovereign luxury house.',
      images: ['https://www.shamimforever.com/og-our-story.jpg'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }

  const ourStorySchemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
        { "@type": "ListItem", "position": 2, "name": "Our Story", "item": "https://www.shamimforever.com/our-story" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://www.shamimforever.com/our-story#aboutpage",
      "name": "Our Story — Shamim Forever",
      "description": "Born from obsession, perfected through craft. The origin of a sovereign luxury house by Faisal Orakzai.",
      "url": "https://www.shamimforever.com/our-story",
      "isPartOf": { "@type": "WebSite", "@id": "https://www.shamimforever.com/#website" },
      "about": { "@type": "Organization", "@id": "https://www.shamimforever.com/#organization", "name": "Shamim Forever" },
      "author": { "@type": "Person", "@id": "https://www.wikidata.org/wiki/Q140588912", "name": "Faisal Orakzai" }
    }
  ]

  export default function OurStoryPage() {
    return (
      <>
        {ourStorySchemas.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        <OurStoryClient />
      </>
    )
  }
  