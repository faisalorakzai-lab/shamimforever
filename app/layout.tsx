import type { Metadata } from 'next'
  import Script from 'next/script'
  import './globals.css'
  import 'mapbox-gl/dist/mapbox-gl.css'
  import Navigation from '@/components/Navigation'
  import Footer from '@/components/Footer'
  import LuxuryCursor from '@/components/LuxuryCursor'
  import { Web3Provider } from '@/components/Web3Provider'

  export const metadata: Metadata = {
    metadataBase: new URL('https://shamimforever.com'),
    title: {
      default: 'Shamim Forever — Sovereign Luxury Fragrances',
      template: '%s | Shamim Forever',
    },
    description: 'Shamim Forever — a global luxury house offering bespoke fragrances, couture jewellery, and rare collections for the discerning few. Shop online from Pakistan.',
    keywords: [
      'luxury fragrances Pakistan', 'bespoke perfume', 'shamim forever',
      'luxury perfume online', 'oud perfume', 'rose perfume', 'attar',
      'luxury jewellery Pakistan', 'sovereign luxury', 'couture Pakistan',
      'buy perfume online Pakistan', 'best perfume brand Pakistan',
    ],
    openGraph: {
      title: 'Shamim Forever — Sovereign Luxury Fragrances',
      description: 'A global luxury house. Bespoke fragrances and couture for the discerning few.',
      type: 'website',
      url: 'https://shamimforever.com',
      siteName: 'Shamim Forever',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shamim Forever — Sovereign Luxury',
      description: 'Bespoke fragrances and couture for the discerning few.',
    },
    alternates: {
      canonical: 'https://shamimforever.com',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    verification: {
      google: undefined,
    },
  }

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Shamim Forever",
    "url": "https://shamimforever.com",
    "sameAs": ["https://www.shamimforever.com"],
    "description": "A global luxury house offering bespoke fragrances, couture jewellery, and rare collections.",
    "brand": { "@type": "Brand", "name": "Shamim Forever" },
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className="bg-[#050505] text-zinc-200 antialiased cursor-none lg:cursor-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          />
          <Web3Provider>
            <LuxuryCursor />
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </Web3Provider>
        <Script
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
          strategy="afterInteractive"
          type="module"
        />
        </body>
      </html>
    )
  }
  