import { notFound } from 'next/navigation'
    import { supabaseAdmin } from '@/lib/supabase-server'
    import type { Product } from '@/types'
    import SovereignProductPage from '@/components/SovereignProductPage'
    import { SOVEREIGN_CONFIGS } from '@/lib/sovereign-configs'
    import LuxuryGenericProductPage from '@/components/LuxuryGenericProductPage'
    import GuestCurationProductPage from '@/components/GuestCurationProductPage'
    import { GUEST_CURATION_SLUGS } from '@/lib/guest-curation-configs'

    const SOVEREIGN_SLUGS = Object.keys(SOVEREIGN_CONFIGS)

    async function getProduct(id: string): Promise<Product | null> {
      // Try by slug first
      const { data: bySlug } = await supabaseAdmin
        .from('products')
        .select('*, main_category:main_categories(*)')
        .eq('slug', id)
        .single()

      if (bySlug) return bySlug

      // Fall back to id
      const { data: byId } = await supabaseAdmin
        .from('products')
        .select('*, main_category:main_categories(*)')
        .eq('id', id)
        .single()

      return byId ?? null
    }

    export async function generateMetadata({ params }: { params: { id: string } }) {
      const product = await getProduct(params.id)
      if (!product) return { title: 'Product Not Found — Shamim Forever' }
      return {
        title: `${product.name} — Shamim Forever`,
        description: product.description || `${product.name} — sovereign luxury creation by Shamim Forever`,
      }
    }

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
            "brand": { "@type": "Brand", "name": "Shamim Forever", "logo": "https://shamimforever.com/logo-sf.png" },
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
              "availability": product.inventory > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "itemCondition": "https://schema.org/NewCondition",
              "seller": { "@type": "Organization", "name": "Shamim Forever", "url": "https://shamimforever.com" },
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

    export default async function ProductDetailPage({ params }: { params: { id: string } }) {
      const product = await getProduct(params.id)

      if (!product) {
        notFound()
      }

      if (SOVEREIGN_SLUGS.includes(product.slug)) {
        return <><ProductJsonLd product={product} /><SovereignProductPage product={product} /></>
      }

      if (GUEST_CURATION_SLUGS.includes(product.slug)) {
        return <><ProductJsonLd product={product} /><GuestCurationProductPage product={product} /></>
      }

      return <><ProductJsonLd product={product} /><LuxuryGenericProductPage product={product} /></>
    }
    