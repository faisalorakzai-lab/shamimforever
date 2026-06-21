import type { Metadata } from 'next'
  import Script from 'next/script'
  import './globals.css'
  import 'mapbox-gl/dist/mapbox-gl.css'
  import Navigation from '@/components/Navigation'
  import Footer from '@/components/Footer'
  import LuxuryCursor from '@/components/LuxuryCursor'
  import { Web3Provider } from '@/components/Web3Provider'
import { CartProvider } from '@/lib/cart-context'

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
        { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
        { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
        { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'mask-icon', url: '/favicon.png', color: '#D4AF37' },
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
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="shortcut icon" type="image/png" href="/favicon.png" />
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
          {/* Person schema — Faisal Orakzai Google Knowledge Panel */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Person","@id":"https://www.shamimforever.com/founder#faisal-orakzai","name":"Faisal Orakzai","alternateName":["Chairman Faisal Orakzai","Malak Faisal Orakzai","Faisal Moeen Orakzai"],"description":"Faisal Orakzai is a visionary entrepreneur, blockchain architect, and the Founder & Chairman of Shamim Forever. He specializes in luxury commerce, decentralized finance (DeFi), and quantitative fintech.","url":"https://www.shamimforever.com/founder","image":"https://www.shamimforever.com/founder-3.png","birthDate":"2006-04-30","jobTitle":["Founder & Chairman","Blockchain Architect","Entrepreneur"],"alumniOf":{"@type":"CollegeOrUniversity","name":"National University of Sciences & Technology (NUST)"},"award":"NUST 50 Under 50 — Entrepreneurship","knowsAbout":["Blockchain Architecture","Quantitative Fintech","Decentralized Finance","Asset Management","Luxury Commerce","Luxury Fragrances","NFT Technology"],"worksFor":[{"@type":"Organization","@id":"https://www.shamimforever.com/#organization","name":"Shamim Forever"},{"@type":"Organization","name":"Orakzai Group"},{"@type":"Organization","name":"Orakzai Bond"}],"sameAs":["https://www.wikidata.org/wiki/Q140264666","https://www.crunchbase.com/person/faisal-orakzai","https://x.com/faisalorakzaii","https://www.linkedin.com/in/faisalorakzaii","https://www.instagram.com/faisalorakzaii","https://web.facebook.com/faisalorakzaii","https://tiktok.com/@chairmanorakzai","https://github.com/faisalorakzai-lab","https://scholar.google.com/citations?user=ER8h90UAAAAJ","https://linktr.ee/faisalorakzaiofficial","https://www.f6s.com/faisalorakzai","https://gust.com/user/014bee5e-1c09-4f2d-b5ae-f5c937bbcc0e","https://orcid.org/0009-0000-0915-7272","https://www.pinterest.com/faisalorakzaii","https://orakzaibond.com"]}) }}
            />
          {/* Organization schema — Shamim Forever brand entity */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Organization","@id":"https://www.shamimforever.com/#organization","name":"Shamim Forever","alternateName":["Shamim Forever House","SF Luxury"],"url":"https://www.shamimforever.com","logo":{"@type":"ImageObject","url":"https://www.shamimforever.com/logo.png","width":512,"height":512},"description":"Shamim Forever is a sovereign luxury digital house offering bespoke fragrances, high jewellery, and couture collections. Blockchain-verified authenticity. Based in Pakistan, shipping worldwide.","foundingDate":"2024","founder":{"@type":"Person","@id":"https://www.shamimforever.com/#faisal-orakzai","name":"Faisal Orakzai"},"address":{"@type":"PostalAddress","addressCountry":"PK"},"contactPoint":{"@type":"ContactPoint","contactType":"customer service","url":"https://www.shamimforever.com/contact"},"sameAs":["https://www.instagram.com/shamimforever","https://x.com/shamimforever","https://www.facebook.com/shamimforever","https://tiktok.com/@shamimforever"]}) }}
            />
          {/* WebSite schema — enables Google Sitelinks Search Box */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"WebSite","@id":"https://www.shamimforever.com/#website","name":"Shamim Forever","url":"https://www.shamimforever.com","description":"Sovereign luxury fragrances, high jewellery, and couture. Blockchain-verified. Shop worldwide.","publisher":{"@id":"https://www.shamimforever.com/#organization"},"potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.shamimforever.com/shop?q={search_term_string}"},"query-input":"required name=search_term_string"}}) }}
            />
          </head>
        <body className="bg-[#050505] text-zinc-200 antialiased cursor-none lg:cursor-none">
          <CartProvider>
          <Web3Provider>
            <LuxuryCursor />
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </Web3Provider>
          </CartProvider>
          <Script
            src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
            strategy="afterInteractive"
            type="module"
          />
        </body>
      </html>
    )
  }
  