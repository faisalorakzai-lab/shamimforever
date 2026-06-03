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
      default: 'Shamim Forever — Sovereign Luxury Fragrances & Couture',
      template: '%s | Shamim Forever',
    },
    description: 'Shamim Forever — a global luxury digital house. Bespoke fragrances, sovereign jewellery, and rare couture collections. Blockchain-verified authenticity. Shop from Pakistan worldwide.',
    keywords: [
      'luxury fragrances Pakistan', 'bespoke perfume Pakistan', 'shamim forever',
      'luxury perfume online', 'oud perfume', 'rose attar', 'taif rose',
      'luxury jewellery Pakistan', 'sovereign luxury', 'couture Pakistan',
      'buy perfume online Pakistan', 'best perfume brand Pakistan',
      'blockchain luxury', 'nft fragrance', 'shamim bloom', 'eternal empress',
    ],
    authors: [{ name: 'Shamim Forever', url: 'https://shamimforever.com' }],
    creator: 'Shamim Forever',
    publisher: 'Shamim Forever',
    category: 'Luxury Fashion & Fragrance',
    openGraph: {
      title: 'Shamim Forever — Sovereign Luxury Fragrances',
      description: 'A global luxury house. Bespoke fragrances, sovereign jewellery, and rare couture collections. Blockchain-verified.',
      type: 'website',
      url: 'https://shamimforever.com',
      siteName: 'Shamim Forever',
      locale: 'en_US',
      images: [{ url: '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever — Sovereign Luxury' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shamim Forever — Sovereign Luxury',
      description: 'Bespoke fragrances and couture for the discerning few.',
      images: ['/logo-sf.png'],
    },
    alternates: {
      canonical: 'https://www.shamimforever.com',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/logo-sf.png', sizes: '32x32', type: 'image/png' },
        { url: '/logo-sf.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: [
        { url: '/logo-sf.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'mask-icon', url: '/logo-sf.png', color: '#D4AF37' },
      ],
    },
    manifest: '/manifest.json',
    other: {
      'msapplication-TileColor': '#000000',
      'msapplication-TileImage': '/logo-sf.png',
      'msapplication-config': '/browserconfig.xml',
      'theme-color': '#D4AF37',
    },
  }

  const richJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://shamimforever.com/#organization",
        "name": "Shamim Forever",
        "legalName": "Shamim Forever — House of Sovereign Luxury",
        "url": "https://www.shamimforever.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.shamimforever.com/logo-sf.png",
          "width": 512,
          "height": 512,
          "caption": "Shamim Forever — Sovereign Luxury"
        },
        "description": "A global luxury digital house offering bespoke fragrances, sovereign jewellery, and blockchain-verified couture collections.",
        "foundingDate": "2023",
        "slogan": "Sovereign Luxury. Eternally Remembered.",
        "areaServed": {
          "@type": "Place",
          "name": "Worldwide"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": ["English", "Urdu"],
          "areaServed": "Worldwide",
          "url": "https://shamimforever.com/contact"
        },
        "knowsAbout": [
          "Bespoke Fragrances",
          "Sovereign Digital Luxury",
          "Blockchain-anchored Asset Verification",
          "Taif Rose Absolute",
          "Extrait de Parfum",
          "NFT Luxury Collectibles",
          "Couture Jewellery",
          "Oud Perfumery",
          "Pakistani Luxury Fashion"
        ],
        "sameAs": [
          "https://www.shamimforever.com",
          "https://shamimforever.com"
        ],
        "brand": {
          "@type": "Brand",
          "name": "Shamim Forever",
          "slogan": "Sovereign Luxury. Eternally Remembered.",
          "logo": "https://www.shamimforever.com/logo-sf.png"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://shamimforever.com/#website",
        "url": "https://www.shamimforever.com",
        "name": "Shamim Forever",
        "description": "Global Luxury Digital House — Bespoke Fragrances & Couture",
        "publisher": { "@id": "https://shamimforever.com/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": "https://shamimforever.com/shop?q={search_term_string}" },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  }

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en" dir="ltr">
        <head>
          {/* Security — upgrade all HTTP to HTTPS */}
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />

          {/* ENS/Web3 Sovereign Domain Anchors */}
          <meta name="ens:address" content="shamimforever.eth" />
          <meta name="dapp:url" content="https://shamimforever.com" />
          <meta name="dapp:network" content="polygon" />
          <meta name="web3:verified-domain" content="shamimforever.com" />

          {/* Anti-phishing: canonical sovereign domain declaration */}
          <meta name="application-name" content="Shamim Forever — Official Site: shamimforever.com" />
          <meta name="theme-color" content="#D4AF37" />

          {/* Performance — preconnect to critical origins */}
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://res.cloudinary.com" />
          <link rel="dns-prefetch" href="https://uvgtgeauhjbdatrmmaob.supabase.co" />
          <link rel="dns-prefetch" href="https://ajax.googleapis.com" />

          {/* Fonts — woff2 with swap to prevent invisible text */}
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
            rel="stylesheet"
          />

          {/* Rich JSON-LD — Google Knowledge Graph */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(richJsonLd) }}
          />
        </head>
        <body className="bg-[#050505] text-zinc-200 antialiased cursor-none lg:cursor-none">
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
  