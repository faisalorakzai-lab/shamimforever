import type { Metadata } from 'next'
  import Script from 'next/script'
  import OurStoryClient from './OurStoryClient'

  export const metadata: Metadata = {
    title: 'Our Story — The Genesis of Sovereign Luxury | Shamim Forever',
    description: 'The story of Shamim Forever — born from obsession, perfected through craft. From the bazaars of Peshawar to a global luxury house. Discover the origin of a sovereign brand.',
    keywords: [
      'Shamim Forever story', 'luxury brand Pakistan history', 'sovereign luxury origin',
      'shamim forever about', 'Pakistani luxury house', 'luxury brand founders',
      'shamimforever.com our story', 'luxury brand heritage Pakistan',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/our-story' },
    openGraph: {
      title: 'Our Story — Shamim Forever',
      description: 'From the bazaars of Peshawar to a global luxury house. The origin of Shamim Forever.',
      url: 'https://www.shamimforever.com/our-story',
      siteName: 'Shamim Forever',
      type: 'website',
      images: [{ url: 'https://www.shamimforever.com/og-banner.jpg', width: 1200, height: 630, alt: 'Shamim Forever Our Story' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Story — Shamim Forever',
      description: 'From the bazaars of Peshawar to a global luxury house.',
      images: ['https://www.shamimforever.com/og-banner.jpg'],
    },
  }

  const storyJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Our Story — Shamim Forever",
    "description": "The origin and heritage of Shamim Forever — a sovereign luxury house born in Pakistan.",
    "url": "https://www.shamimforever.com/our-story",
    "about": { "@type": "Organization", "name": "Shamim Forever", "url": "https://www.shamimforever.com" }
  }

  export default function OurStoryPage() {
    return (
      <>
        <Script id="our-story-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storyJsonLd) }} />
        <OurStoryClient />
      </>
    )
  }
  