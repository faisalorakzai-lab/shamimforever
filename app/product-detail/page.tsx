import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetailPage, {
  generateMetadata as generateProductMetadata,
} from '@/app/products/[id]/page'

type ProductDetailSearchParams = {
  id?: string
}

function productParams(searchParams: ProductDetailSearchParams) {
  if (!searchParams.id) notFound()
  return { id: searchParams.id }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: ProductDetailSearchParams
}): Promise<Metadata> {
  const metadata = await generateProductMetadata({ params: productParams(searchParams) })
  return {
    ...metadata,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function ProductDetailProxyPage({
  searchParams,
}: {
  searchParams: ProductDetailSearchParams
}) {
  return ProductDetailPage({ params: productParams(searchParams) })
}