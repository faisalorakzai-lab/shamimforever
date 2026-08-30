import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LuxuryCursor from '@/components/LuxuryCursor'
import { Web3Provider } from '@/components/Web3Provider'
import { CartProvider } from '@/lib/cart-context'

const SITE_URL = 'https://www.shamimforever.com'
const FOUNDER_URL = 'https://faisalorakzai.com/'
const PARENT_ORGANIZATION_URL = 'https://orakzaigroup.com/'

// Only include exact, brand-specific profiles here. Generic social domains and
// unverified handles weaken entity disambiguation instead of helping it.
const BRAND_SAME_AS = [
  'https://www.crunchbase.com/organization/shamim-forever',
  'https://www.f6s.com/company/shamimforever',
  'https://peerlist.io/faisalorakzai/project/shamim-forever',
]

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Shamim Forever — Sovereign Luxury Fragrances & Couture',
    template: '%s | Shamim Forever',
  },
  description:
    "Pakistan's first global luxury digital house offering sovereign fragrances, bespoke fine jewellery, blockchain-verified couture, and premium concierge services.",
  keywords: [
    'Shamim Forever',
    'luxury fragrances Pakistan',
    'bespoke perfume Pakistan',
    'fine jewellery Pakistan',
    'sovereign luxury',
    'luxury perfume online',
    'oud perfume',
    'premium concierge services',
  ],
  authors: [{ name: 'Faisal Orakzai', url: FOUNDER_URL }],
  creator: 'Faisal Orakzai',
  publisher: 'Shamim Forever',
  category: 'Luxury Fashion & Fragrance',
  openGraph: {
    title: 'Shamim Forever — Sovereign Luxury Fragrances & Couture',
    description:
      "Pakistan's first global luxury digital house offering sovereign fragrances, bespoke fine jewellery, blockchain-verified couture, and premium concierge services.",
    type: 'website',
    url: `${SITE_URL}/`,
    siteName: 'Shamim Forever',
    locale: 'en_US',
    images: [
      {
        url: '/logo-sf.png',
        width: 512,
        height: 512,
        alt: 'Shamim Forever logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shamim Forever — Sovereign Luxury',
    description:
      'Sovereign fragrances, bespoke fine jewellery, blockchain-verified couture, and premium concierge services.',
    images: ['/logo-sf.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      en: `${SITE_URL}/`,
      'x-default': `${SITE_URL}/`,
    },
  },
  robots: {
    index: true,
    follow: true,
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
    apple: [{ url: '/favicon.png', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/favicon.png', color: '#D4AF37' }],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-TileImage': '/logo-sf.png',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#D4AF37',
  },
}

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Shamim Forever',
      legalName: 'Shamim Forever',
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#logo`,
        url: `${SITE_URL}/logo-sf.png`,
        contentUrl: `${SITE_URL}/logo-sf.png`,
        width: 512,
        height: 512,
        caption: 'Shamim Forever logo',
      },
      image: `${SITE_URL}/logo-sf.png`,
      description:
        "Pakistan's first global luxury digital house offering sovereign fragrances, bespoke fine jewellery, blockchain-verified couture, and premium concierge services.",
      foundingDate: '2023',
      founder: {
        '@id': `${FOUNDER_URL}#person`,
      },
      parentOrganization: {
        '@id': `${PARENT_ORGANIZATION_URL}#organization`,
        '@type': 'Organization',
        name: 'Orakzai Group',
        url: PARENT_ORGANIZATION_URL,
      },
      knowsAbout: [
        'Luxury Goods',
        'Haute Parfumerie',
        'Fine Jewelry',
        'Blockchain Provenance',
      ],
      sameAs: BRAND_SAME_AS,
    },
    {
      '@type': 'Brand',
      '@id': `${SITE_URL}/#brand`,
      name: 'Shamim Forever',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo-sf.png`,
      description:
        "Pakistan's first global luxury digital house offering sovereign fragrances, bespoke fine jewellery, blockchain-verified couture, and premium concierge services.",
      slogan: 'Sovereign Luxury. Eternally Remembered.',
    },
    {
      '@type': 'Person',
      '@id': `${FOUNDER_URL}#person`,
      name: 'Faisal Orakzai',
      url: FOUNDER_URL,
      jobTitle: 'Founder & Chairman',
      worksFor: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Shamim Forever',
      description:
        'Official website of Shamim Forever, a global luxury digital house.',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: 'Shamim Forever — Sovereign Luxury Fragrances & Couture',
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      about: {
        '@id': `${SITE_URL}/#organization`,
      },
      primaryImageOfPage: {
        '@id': `${SITE_URL}/#logo`,
      },
      inLanguage: 'en',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="application-name" content="Shamim Forever" />
        <meta name="theme-color" content="#D4AF37" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://uvgtgeauhjbdatrmmaob.supabase.co" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="bg-[#050505] text-zinc-200 antialiased cursor-none lg:cursor-none">
        <CartProvider>
          <Web3Provider>
            <LuxuryCursor />
            <Navigation />
            <main className="min-h-screen">{children}</main>
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