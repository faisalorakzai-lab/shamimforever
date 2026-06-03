'use client'

  import { useState, useEffect } from 'react'
  import Link from 'next/link'
  import { supabase } from '@/lib/supabase'
  import type { Product } from '@/types'
  import SovereignProductPage from '@/components/SovereignProductPage'
  import { SOVEREIGN_CONFIGS } from '@/lib/sovereign-configs'
  import LuxuryGenericProductPage from '@/components/LuxuryGenericProductPage'
  import QueenOfTaifRingPage from '@/components/QueenOfTaifRingPage'
  import EmpressSovereignVaultPage from '@/components/EmpressSovereignVaultPage'
  import EternalGraceSapphirePage from '@/components/EternalGraceSapphirePage'
  import GuestCurationProductPage from '@/components/GuestCurationProductPage'
  import { GUEST_CURATION_SLUGS } from '@/lib/guest-curation-configs'

  const SOVEREIGN_SLUGS = Object.keys(SOVEREIGN_CONFIGS)
  const SERIF = "'Cormorant Garamond', Georgia, serif"

  function ProductJsonLd({ product }: { product: Product }) {
    const productImage = product.images?.[0] || 'https://shamimforever.com/logo-sf.png'
    const productUrl = `https://shamimforever.com/products/${product.slug}`

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${productUrl}#product`,
          "name": product.name,
          "description": product.description || `${product.name} — sovereign luxury creation by Shamim Forever`,
          "image": productImage,
          "url": productUrl,
          "sku": product.slug,
          "brand": {
            "@type": "Brand",
            "name": "Shamim Forever",
            "logo": "https://shamimforever.com/logo-sf.png"
          },
          "manufacturer": { "@type": "Organization", "name": "Shamim Forever" },
          "category": product.main_category?.name || "Luxury Fragrance",
          "additionalProperty": [
            { "@type": "PropertyValue", "name": "blockchainNetwork", "value": "Polygon" },
            { "@type": "PropertyValue", "name": "tokenStandard", "value": "ERC-721" },
            { "@type": "PropertyValue", "name": "authenticity", "value": "Blockchain-Verified" },
            { "@type": "PropertyValue", "name": "smartContractNetwork", "value": "Polygon Mainnet" }
          ],
          "offers": {
            "@type": "Offer",
            "price": product.price_usd,
            "priceCurrency": "USD",
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "availability": product.inventory > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
              "@type": "Organization",
              "name": "Shamim Forever",
              "url": "https://shamimforever.com"
            },
            "url": productUrl,
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "PK",
              "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow"
            }
          }
        }
      ]
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    )
  }

  export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const slug = params.id
      supabase
        .from('products')
        .select('*, main_category:main_categories(*)')
        .eq('slug', slug)
        .single()
        .then(({ data }) => {
          if (data) {
            setProduct(data)
            setLoading(false)
          } else {
            supabase
              .from('products')
              .select('*, main_category:main_categories(*)')
              .eq('id', slug)
              .single()
              .then(({ data: d2 }) => {
                setProduct(d2)
                setLoading(false)
              })
          }
        })
    }, [params.id])

    if (loading) {
      return (
        <div style={{ minHeight: '100vh', background: '#030303', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.25)' }}>
            Accessing Sovereign Vault...
          </p>
        </div>
      )
    }

    if (!product) {
      return (
        <div style={{ minHeight: '100vh', background: '#030303', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
          <p style={{ fontFamily: SERIF, fontSize: 42, fontWeight: 300, color: 'rgba(255,255,255,0.15)' }}>
            Creation Not Found
          </p>
          <Link href="/shop" style={{ fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.5)', border: '1px solid rgba(201,160,84,0.15)', padding: '14px 32px', textDecoration: 'none' }}>
            Return to Archive
          </Link>
        </div>
      )
    }

    const RING_SLUGS = ['queen-of-taif-crown-ring', 'queen-of-taif-ring']
    if (RING_SLUGS.includes(product.slug)) return <><ProductJsonLd product={product} /><QueenOfTaifRingPage product={product} /></>

    const EMPRESS_SLUGS = ['empress-sovereign-vault']
    if (EMPRESS_SLUGS.includes(product.slug)) return <><ProductJsonLd product={product} /><EmpressSovereignVaultPage product={product} /></>

    const SAPPHIRE_SLUGS = ['eternal-grace-sapphire-set']
    if (SAPPHIRE_SLUGS.includes(product.slug)) return <><ProductJsonLd product={product} /><EternalGraceSapphirePage product={product} /></>

    if (SOVEREIGN_SLUGS.includes(product.slug)) return <><ProductJsonLd product={product} /><SovereignProductPage product={product} /></>

    if (GUEST_CURATION_SLUGS.includes(product.slug)) return <><ProductJsonLd product={product} /><GuestCurationProductPage product={product} /></>

    return <><ProductJsonLd product={product} /><LuxuryGenericProductPage product={product} /></>
  }
  