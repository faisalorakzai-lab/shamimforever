import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase-server'
import ForHimClient, { type EssentialProduct } from './ForHimClient'

const BASE_URL = 'https://www.shamimforever.com'
const FOR_HIM_COLLECTION_SLUG = 'sf-essential-archive-for-him'
export const revalidate = 300

type EssentialProductRow = {
  id: string
  name: string
  slug: string
  description: string | null
  story: string | null
  price_usd: number | string | null
  price_pkr: number | string | null
  images: string[] | null
  is_featured: boolean | null
}

async function getEssentialProducts(): Promise<EssentialProduct[]> {
  const { data: collection } = await supabaseAdmin
    .from('collections')
    .select('id')
    .eq('slug', FOR_HIM_COLLECTION_SLUG)
    .maybeSingle()

  if (!collection) return []

  const { data } = await supabaseAdmin
    .from('products')
    .select('id,name,slug,description,story,price_usd,price_pkr,images,is_featured')
    .eq('collection_id', collection.id)
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true })

  return (data ?? []).map((product: EssentialProductRow) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description ?? '',
    story: product.story ?? '',
    price_usd: Number(product.price_usd ?? 0),
    price_pkr: Number(product.price_pkr ?? 0),
    images: Array.isArray(product.images) ? product.images : [],
    is_featured: Boolean(product.is_featured),
  }))
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'For Him — Sovereign Fragrance Archive'
  const description =
    'Discover the Shamim Forever For Him Sovereign Archive: rare oud, masculine fragrance standards, and blockchain-authenticated luxury allocations for collectors worldwide.'
  const url = `${BASE_URL}/collections/for-him`
  const image = `${BASE_URL}/ambassadors/srk-for-him-collection.png`

  return {
    title,
    description,
    keywords: [
      'men luxury fragrances Pakistan',
      'oud perfume for men',
      'For Him fragrance collection',
      'Shamim Forever Sovereign Archive',
      'luxury perfume online Pakistan',
      'blockchain authenticated fragrance',
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — Shamim Forever`,
      description,
      url,
      siteName: 'Shamim Forever',
      type: 'website',
      images: [{ url: image, width: 1200, height: 1200, alt: 'Shamim Forever For Him Sovereign Archive' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Shamim Forever`,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

function ForHimJsonLd({ products }: { products: EssentialProduct[] }) {
  const url = `${BASE_URL}/collections/for-him`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collectionpage`,
        name: 'For Him — The Sovereign Archive',
        description:
          'Rare oud and globally respected masculine fragrances curated by Shamim Forever for modern leaders, executives, and collectors.',
        url,
        image: `${BASE_URL}/ambassadors/srk-for-him-collection.png`,
        isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
        publisher: {
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
          name: 'Shamim Forever',
        },
        mainEntity: { '@id': `${url}#products` },
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#products`,
        name: 'SF Essential Archive For Him',
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: product.name,
          url: `${BASE_URL}/products/${product.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Collections', item: `${BASE_URL}/collections` },
          { '@type': 'ListItem', position: 3, name: 'For Him', item: url },
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

export default async function ForHimCollectionPage() {
  const products = await getEssentialProducts()

  return (
    <>
      <ForHimJsonLd products={products} />
      <ForHimClient essentialProducts={products} />
    </>
  )
}