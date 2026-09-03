import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase-server'
import type { Collection, Product } from '@/types'
import CollectionDetailClient from './CollectionDetailClient'

const BASE_URL = 'https://www.shamimforever.com'
export const revalidate = 300

async function getCollection(id: string): Promise<Collection | null> {
  const { data: bySlug } = await supabaseAdmin
    .from('collections')
    .select('*')
    .eq('slug', id)
    .maybeSingle()

  if (bySlug) return bySlug

  const { data: byId } = await supabaseAdmin
    .from('collections')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  return byId ?? null
}

async function getCollectionProducts(collectionId: string): Promise<Product[]> {
  const { data } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('collection_id', collectionId)
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  return data ?? []
}

export async function generateStaticParams() {
  try {
    const { data } = await supabaseAdmin
      .from('collections')
      .select('slug')
      .eq('is_active', true)

    return (data ?? []).map((collection: Pick<Collection, 'slug'>) => ({ id: collection.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const collection = await getCollection(params.id)

  if (!collection) {
    return {
      title: 'Collection Not Found — Shamim Forever',
      robots: { index: false, follow: false },
    }
  }

  const collectionUrl = `${BASE_URL}/collections/${collection.slug}`
  const description =
    collection.description ||
    `Explore the ${collection.name} collection by Shamim Forever — sovereign luxury fragrances, jewellery, and cosmetics crafted in Pakistan for collectors worldwide.`
  const image = collection.cover_image
    ? collection.cover_image.startsWith('http')
      ? collection.cover_image
      : `${BASE_URL}${collection.cover_image}`
    : `${BASE_URL}/logo-sf.png`

  return {
    title: `${collection.name} — Luxury Collection`,
    description: description.slice(0, 160),
    keywords: [
      collection.name,
      `${collection.name} collection`,
      'Shamim Forever',
      'luxury collection Pakistan',
      'sovereign luxury',
      'shamimforever.com',
    ],
    alternates: { canonical: collectionUrl },
    openGraph: {
      title: `${collection.name} — Shamim Forever`,
      description: description.slice(0, 160),
      url: collectionUrl,
      siteName: 'Shamim Forever',
      type: 'website',
      images: [{ url: image, width: 1200, height: 1200, alt: `${collection.name} — Shamim Forever` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${collection.name} — Shamim Forever`,
      description: description.slice(0, 160),
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

function CollectionJsonLd({
  collection,
  products,
}: {
  collection: Collection
  products: Product[]
}) {
  const collectionUrl = `${BASE_URL}/collections/${collection.slug}`
  const image = collection.cover_image
    ? collection.cover_image.startsWith('http')
      ? collection.cover_image
      : `${BASE_URL}${collection.cover_image}`
    : `${BASE_URL}/logo-sf.png`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${collectionUrl}#collectionpage`,
        name: collection.name,
        description:
          collection.description ||
          `Explore the ${collection.name} collection by Shamim Forever.`,
        url: collectionUrl,
        image,
        isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
        publisher: {
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
          name: 'Shamim Forever',
        },
        mainEntity: { '@id': `${collectionUrl}#products` },
      },
      {
        '@type': 'ItemList',
        '@id': `${collectionUrl}#products`,
        name: `${collection.name} products`,
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
          { '@type': 'ListItem', position: 3, name: collection.name, item: collectionUrl },
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

export default async function CollectionDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const collection = await getCollection(params.id)
  if (!collection) notFound()
  const resolvedCollection = collection as Collection

  const products = await getCollectionProducts(resolvedCollection.id)

  return (
    <>
      <CollectionJsonLd collection={resolvedCollection} products={products} />
      <CollectionDetailClient collection={resolvedCollection} products={products} />
    </>
  )
}