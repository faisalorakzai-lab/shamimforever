import { supabaseAdmin } from '@/lib/supabase-server'
  import type { Product } from '@/types'
  import ShopClient from './ShopClient'
  import type { Metadata } from 'next'

  export const dynamic = 'force-dynamic'

  export const metadata: Metadata = {
    title: 'Shop Luxury Fragrances, Jewellery & Cosmetics — Shamim Forever',
    description: "Buy luxury perfumes, bespoke jewellery, and premium cosmetics online from Shamim Forever. Blockchain-verified authenticity. Ship worldwide from Pakistan. Oud, rose, sapphire collections.",
    keywords: [
      'buy perfume online Pakistan', 'luxury perfume Pakistan', 'Shamim Forever shop',
      'best perfume brand Pakistan', 'oud perfume buy online', 'bespoke jewellery Pakistan',
      'luxury cosmetics Pakistan', 'blockchain verified luxury', 'shamimforever shop',
      'buy luxury gifts Pakistan', 'museum grade perfume Pakistan',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/shop' },
    openGraph: {
      title: 'Shop — Shamim Forever Luxury Collections',
      description: "Blockchain-verified luxury perfumes, jewellery, and cosmetics. Shop worldwide from Pakistan's most sovereign luxury house.",
      type: 'website',
      url: 'https://www.shamimforever.com/shop',
      siteName: 'Shamim Forever',
      images: [{ url: 'https://www.shamimforever.com/og-shop.jpg', width: 1200, height: 630, alt: 'Shamim Forever — Shop Luxury Collections' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shop — Shamim Forever Luxury Collections',
      description: 'Blockchain-verified luxury perfumes, jewellery, and cosmetics.',
      images: ['https://www.shamimforever.com/og-shop.jpg'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }

  const shopSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
        { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://www.shamimforever.com/shop" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.shamimforever.com/shop#collectionpage",
      "name": "Shamim Forever — Luxury Shop",
      "description": "Blockchain-verified luxury perfumes, bespoke jewellery, and premium cosmetics from Shamim Forever.",
      "url": "https://www.shamimforever.com/shop",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
          { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://www.shamimforever.com/shop" }
        ]
      },
      "isPartOf": { "@type": "WebSite", "@id": "https://www.shamimforever.com/#website" },
      "publisher": { "@type": "Organization", "@id": "https://www.shamimforever.com/#organization", "name": "Shamim Forever" }
    }
  ]

  export default async function ShopPage() {
    let products: Product[] = []
    try {
      const { data } = await supabaseAdmin
        .from('products')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
      products = data || []
    } catch {
      products = []
    }

    return (
      <>
        {shopSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <ShopClient products={products} />
      </>
    )
  }
  