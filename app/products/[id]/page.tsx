import { notFound } from 'next/navigation'
    import { supabaseAdmin } from '@/lib/supabase-server'
    import type { Product } from '@/types'
    import SovereignProductPage from '@/components/SovereignProductPage'
    import { SOVEREIGN_CONFIGS } from '@/lib/sovereign-configs'
    import LuxuryGenericProductPage from '@/components/LuxuryGenericProductPage'
    import GuestCurationProductPage from '@/components/GuestCurationProductPage'
    import { GUEST_CURATION_SLUGS } from '@/lib/guest-curation-configs'
  import { PRODUCT_IMAGE_OVERRIDES } from '@/lib/product-image-overrides'
    import CosmeticsProductPage from '@/components/CosmeticsProductPage'
    import JewelryProductPage from '@/components/JewelryProductPage'

  export const dynamic = 'force-dynamic'

    const BASE_URL = 'https://www.shamimforever.com'
    const SOVEREIGN_SLUGS = Object.keys(SOVEREIGN_CONFIGS)
    const COSMETICS_CATEGORY_ID = '22226324-4789-419d-a9e2-f763df2d24f1'
    const JEWELRY_CATEGORY_ID   = 'e291b9af-a637-45da-a2df-d39f2e72e53c'

    async function getProduct(id: string): Promise<Product | null> {
      const { data: bySlug } = await supabaseAdmin
        .from('products')
        .select('*, main_category:main_categories(*)')
        .eq('slug', id)
        .single()
      if (bySlug) return bySlug

      const { data: byId } = await supabaseAdmin
        .from('products')
        .select('*, main_category:main_categories(*)')
        .eq('id', id)
        .single()
      return byId ?? null
    }

    /** Pre-render all active product pages at build time for fast SEO */
    export async function generateStaticParams() {
      try {
        const { data } = await supabaseAdmin
          .from('products')
          .select('slug')
          .eq('is_active', true)
        return (data ?? []).map(p => ({ id: p.slug }))
      } catch {
        return []
      }
    }

    export async function generateMetadata({ params }: { params: { id: string } }) {
      const product = await getProduct(params.id)
      if (!product) return { title: 'Product Not Found — Shamim Forever' }

      const productImage = product.images?.[0]
        ? (product.images[0].startsWith('http') ? product.images[0] : `${BASE_URL}${product.images[0]}`)
        : `${BASE_URL}/logo-sf.png`

      const productUrl = `${BASE_URL}/products/${product.slug}`
      const desc = product.description
        ? product.description.slice(0, 160)
        : `${product.name} — sovereign luxury creation by Shamim Forever. Shop online in Pakistan & worldwide.`

      return {
        title: `${product.name} — Shamim Forever`,
        description: desc,
        keywords: [
          product.name,
          'Shamim Forever',
          'luxury fragrance Pakistan',
          'buy perfume online Pakistan',
          product.main_category?.name ?? 'luxury perfume',
          'best perfume brand Pakistan',
          'oud perfume Pakistan',
          'shamimforever.com',
        ],
        alternates: { canonical: productUrl },
        openGraph: {
          title: `${product.name} — Shamim Forever`,
          description: desc,
          url: productUrl,
          siteName: 'Shamim Forever',
          type: 'website',
          images: [
            {
              url: productImage,
              width: 1080,
              height: 1080,
              alt: `${product.name} — Shamim Forever Luxury Collection`,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${product.name} — Shamim Forever`,
          description: desc,
          images: [productImage],
        },
      }
    }

    function ProductJsonLd({ product }: { product: Product }) {
      const rawImage = product.images?.[0] || ''
      const productImage = rawImage.startsWith('http')
        ? rawImage
        : rawImage
        ? `${BASE_URL}${rawImage}`
        : `${BASE_URL}/logo-sf.png`

      const productUrl = `${BASE_URL}/products/${product.slug}`

      const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Product',
            '@id': `${productUrl}#product`,
            name: product.name,
            description:
              product.description ||
              `${product.name} — sovereign luxury creation by Shamim Forever`,
            image: productImage,
            url: productUrl,
            sku: product.slug,
            brand: {
              '@type': 'Brand',
              name: 'Shamim Forever',
              logo: `${BASE_URL}/logo-sf.png`,
            },
            manufacturer: {
              '@type': 'Organization',
              name: 'Shamim Forever',
              url: BASE_URL,
            },
            category: product.main_category?.name || 'Luxury Fragrance',
            offers: {
              '@type': 'Offer',
              price: product.price_usd,
              priceCurrency: 'USD',
              priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0],
              availability:
                (product.inventory ?? 1) > 0
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
              itemCondition: 'https://schema.org/NewCondition',
              seller: {
                '@type': 'Organization',
                name: 'Shamim Forever',
                url: BASE_URL,
              },
              url: productUrl,
              hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'PK',
                returnPolicyCategory:
                  'https://schema.org/MerchantReturnFiniteReturnWindow',
              },
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Shop',
                item: `${BASE_URL}/shop`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: product.name,
                item: productUrl,
              },
            ],
          },
        ],
      }

      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )
    }

    export default async function ProductDetailPage({
      params,
    }: {
      params: { id: string }
    }) {
      const _rawProduct = await getProduct(params.id)
      if (!_rawProduct) notFound()

      const _imgOverride = PRODUCT_IMAGE_OVERRIDES[_rawProduct!.slug]
      const product = _imgOverride
        ? { ..._rawProduct!, images: Array.isArray(_imgOverride) ? [..._imgOverride, ...(_rawProduct!.images ?? [])] : [_imgOverride, ...(_rawProduct!.images ?? [])] }
        : _rawProduct!

      if (product.main_category_id === JEWELRY_CATEGORY_ID) {
        return (
          <>
            <ProductJsonLd product={product} />
            <JewelryProductPage product={product} />
          </>
        )
      }

      if (SOVEREIGN_SLUGS.includes(product.slug)) {
        return (
          <>
            <ProductJsonLd product={product} />
            <SovereignProductPage product={product} />
          </>
        )
      }

      if (GUEST_CURATION_SLUGS.includes(product.slug)) {
        return (
          <>
            <ProductJsonLd product={product} />
            <GuestCurationProductPage product={product} />
          </>
        )
      }

      if (product.main_category_id === COSMETICS_CATEGORY_ID) {
        return (
          <>
            <ProductJsonLd product={product} />
            <CosmeticsProductPage product={product} />
          </>
        )
      }

      return (
        <>
          <ProductJsonLd product={product} />
          <LuxuryGenericProductPage product={product} />
        </>
      )
    }
    