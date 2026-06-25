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
    metadataBase: new URL('https://www.shamimforever.com'),
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
      'Faisal Orakzai', 'Chairman Faisal Orakzai', 'Orakzai Bond', 'OKBOND',
    ],
    authors: [{ name: 'Faisal Orakzai', url: 'https://orakzaibond.com/faisal-orakzai' }],
    creator: 'Faisal Orakzai',
    publisher: 'Shamim Forever',
    category: 'Luxury Fashion & Fragrance',
    openGraph: {
      title: 'Shamim Forever — Sovereign Luxury Fragrances',
      description: 'A global luxury house by Faisal Orakzai. Bespoke fragrances, sovereign jewellery, and rare couture collections. Blockchain-verified.',
      type: 'website',
      url: 'https://www.shamimforever.com',
      siteName: 'Shamim Forever',
      locale: 'en_US',
      images: [{ url: '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever — Sovereign Luxury' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shamim Forever — Sovereign Luxury by Faisal Orakzai',
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

  const richJsonLd =   {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.shamimforever.com/#organization",
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
        "image": {
          "@type": "ImageObject",
          "url": "https://www.shamimforever.com/founders-portrait.jpg",
          "width": 1200,
          "height": 800
        },
        "description": "A global luxury digital house offering bespoke fragrances, sovereign jewellery, and blockchain-verified couture collections. Founded by Faisal Orakzai.",
        "foundingDate": "2023",
        "founder": {
          "@type": "Person",
          "@id": "https://www.wikidata.org/wiki/Q140264666",
          "name": "Faisal Orakzai"
        },
        "slogan": "Sovereign Luxury. Eternally Remembered.",
        "areaServed": {
          "@type": "Place",
          "name": "Worldwide"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": [
            "English",
            "Urdu"
          ],
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
          "https://www.instagram.com/shamimforever",
          "https://x.com/shamimforever",
          "https://www.facebook.com/shamimforever",
          "https://tiktok.com/@shamimforever",
          "https://www.linkedin.com/company/shamimforever"
        ],
        "brand": {
          "@type": "Brand",
          "name": "Shamim Forever",
          "slogan": "Sovereign Luxury. Eternally Remembered.",
          "logo": "https://www.shamimforever.com/logo-sf.png"
        },
        "memberOf": {
          "@type": "Organization",
          "name": "Orakzai Group SMC",
          "founder": {
            "@type": "Person",
            "@id": "https://www.wikidata.org/wiki/Q140264666"
          }
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://shamimforever.com/#website",
        "url": "https://www.shamimforever.com",
        "name": "Shamim Forever",
        "description": "Global Luxury Digital House — Bespoke Fragrances & Couture by Faisal Orakzai",
        "publisher": {
          "@id": "https://www.shamimforever.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://shamimforever.com/shop?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.wikidata.org/wiki/Q140264666",
        "name": "Faisal Orakzai",
        "givenName": "Faisal",
        "familyName": "Orakzai",
        "honorificPrefix": "Chairman",
        "alternateName": [
          "Chairman Faisal Orakzai",
          "Malak Faisal Orakzai",
          "faisalorakzaii",
          "Faisal Orakzai OKBOND"
        ],
        "disambiguatingDescription": "Pakistani entrepreneur and blockchain architect (born 30 April 2006, Tirah, Orakzai). Founder of Shamim Forever and Orakzai Bond (OKBOND). Not to be confused with Dr. Faisal Moeen Orakzai, who is a separate individual.",
        "description": "Faisal Orakzai (born 30 April 2006, Tirah, Orakzai, Pakistan) is a Pakistani entrepreneur and blockchain architect. He is the Founder & Chairman of Shamim Forever luxury house and Orakzai Bond (OKBOND) DeFi protocol. He studied at Ziauddin University, Karachi.",
        "url": "https://www.shamimforever.com/faisal-orakzai",
        "mainEntityOfPage": "https://www.shamimforever.com/faisal-orakzai",
        "image": {
          "@type": "ImageObject",
          "url": "https://www.shamimforever.com/founder-faisal-orakzai.jpg",
          "width": 800,
          "height": 800,
          "caption": "Faisal Orakzai — Founder & Chairman, Shamim Forever & Orakzai Bond"
        },
        "birthDate": "2006-04-30",
        "birthPlace": {
          "@type": "Place",
          "name": "Tirah, Orakzai",
          "addressRegion": "Khyber Pakhtunkhwa",
          "addressCountry": "PK",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 33.6,
            "longitude": 70.2
          }
        },
        "nationality": {
          "@type": "Country",
          "name": "Pakistan"
        },
        "jobTitle": [
          "Founder & Chairman",
          "Blockchain Architect",
          "Quantitative Fintech Engineer",
          "CEO"
        ],
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Ziauddin University",
          "url": "https://zu.edu.pk",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Karachi",
            "addressRegion": "Sindh",
            "addressCountry": "PK"
          }
        },
        "award": [
          "Stevie® Gold Award — Best Young Entrepreneur, 2026 International Business Awards (Orakzai Group SMC)",
          "NUST 50 Under 50 — Entrepreneurship"
        ],
        "knowsAbout": [
          "Blockchain Architecture",
          "Quantitative Fintech",
          "Decentralized Finance",
          "Asset Management",
          "Luxury Commerce",
          "Luxury Fragrances",
          "NFT Technology",
          "Polygon Blockchain",
          "DeFi Protocol Design",
          "Smart Contracts"
        ],
        "worksFor": [
          {
            "@type": "Organization",
            "@id": "https://www.shamimforever.com/#organization",
            "name": "Shamim Forever"
          },
          {
            "@type": "Organization",
            "@id": "https://orakzaibond.com/#organization",
            "name": "Orakzai Bond"
          }
        ],
        "owns": [
          {
            "@type": "Organization",
            "name": "Shamim Forever",
            "url": "https://www.shamimforever.com"
          },
          {
            "@type": "Organization",
            "name": "Orakzai Bond (OKBOND)",
            "url": "https://orakzaibond.com"
          },
          {
            "@type": "Organization",
            "name": "Orakzai Group SMC"
          }
        ],
        "identifier": [
          {
            "@type": "PropertyValue",
            "propertyID": "Wikidata",
            "value": "Q140264666",
            "url": "https://www.wikidata.org/wiki/Q140264666"
          },
          {
            "@type": "PropertyValue",
            "propertyID": "ORCID",
            "value": "0009-0000-0915-7272",
            "url": "https://orcid.org/0009-0000-0915-7272"
          }
        ],
        "sameAs": [
          "https://www.wikidata.org/wiki/Q140264666",
          "https://orcid.org/0009-0000-0915-7272",
          "https://www.crunchbase.com/person/faisal-orakzai",
          "https://x.com/faisalorakzaii",
          "https://www.linkedin.com/in/faisalorakzaii",
          "https://www.instagram.com/faisalorakzaii",
          "https://web.facebook.com/faisalorakzaii",
          "https://tiktok.com/@chairmanorakzai",
          "https://github.com/faisalorakzai-lab",
          "https://scholar.google.com/citations?user=ER8h90UAAAAJ",
          "https://linktr.ee/faisalorakzaiofficial",
          "https://www.f6s.com/faisalorakzai",
          "https://peerlist.io/faisalorakzai",
          "https://hackernoon.com/u/faisalorakzai",
          "https://www.pinterest.com/faisalorakzaii",
          "https://orakzaibond.com/faisal-orakzai",
          "https://www.shamimforever.com/faisal-orakzai",
          "https://www.shamimforever.com/founder"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://orakzaibond.com/#organization",
        "name": "Orakzai Bond",
        "alternateName": [
          "OKBOND",
          "Orakzai Bond DeFi"
        ],
        "url": "https://orakzaibond.com",
        "description": "World's first capital-protected decentralized bond on Polygon blockchain by Faisal Orakzai.",
        "founder": {
          "@type": "Person",
          "@id": "https://www.wikidata.org/wiki/Q140264666",
          "name": "Faisal Orakzai"
        },
        "sameAs": [
          "https://orakzaibond.com",
          "https://x.com/orakzaibond",
          "https://www.linkedin.com/company/orakzai-bond"
        ]
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
            {/* Organization Schema — Shamim Forever */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Shamim Forever",
                "url": "https://shamimforever.com",
                "logo": "https://shamimforever.com/logo.png",
                "foundingDate": "2026",
                "founder": {
                  "@type": "Person",
                  "name": "Muhammad Faisal Orakzai",
                  "jobTitle": "Founder & Owner"
                },
                "award": "International Business Awards 2026 Nomination for Pioneering Financial Infrastructure & Luxury Ecosystems",
                "sameAs": [
                  "https://x.com/shamimforeversf",
                  "https://www.linkedin.com/company/orakzaigroup",
                  "https://www.instagram.com/shamimforeversf",
                  "https://www.facebook.com/shamimforever",
                  "https://www.prlog.org/13154317-young-pakistani-entrepreneur-expands-global-vision-through-okbond-and-shamim-forever.html"
                ],
                "knowsAbout": [
                  "Bespoke Luxury Jewelry",
                  "Premium Cosmetics",
                  "High-End Perfumes",
                  "Cryptographic Provenance",
                  "Blockchain Luxury Assets",
                  "Real-World Asset Tokenization",
                  "Decentralized Luxury Commerce"
                ]
              }) }}
            />
            {/* WebSite + SearchAction Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": "https://shamimforever.com/",
                "name": "Shamim Forever",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://shamimforever.com/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              }) }}
            />
            {/* Product Schema — Shamim Forever Royal Blue Sapphire Set */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "Shamim Forever Royal Blue Sapphire Set",
                "image": ["https://shamimforever.com/images/sapphire-set.jpg"],
                "description": "Museum-grade bespoke sapphire jewelry structured with automated Polygon smart contracts for immutable ownership verification and high-end cryptographic provenance.",
                "sku": "SF-SAPPHIRE-001",
                "mpn": "981245",
                "brand": { "@type": "Brand", "name": "Shamim Forever" },
                "offers": {
                  "@type": "Offer",
                  "url": "https://shamimforever.com/products/sapphire-set",
                  "priceCurrency": "USD",
                  "price": "15000.00",
                  "priceValidUntil": "2028-12-31",
                  "itemCondition": "https://schema.org/NewCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@type": "Organization", "name": "Shamim Forever" }
                }
              }) }}
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
