import { supabaseAdmin } from '@/lib/supabase-server'
  import type { Product } from '@/types'
  import ShopClient from './ShopClient'
  import type { Metadata } from 'next'

  export const dynamic = 'force-dynamic'

  const BASE_URL = 'https://www.shamimforever.com'

  export const metadata: Metadata = {
    title: 'Shop Luxury Fragrances & Collections — Shamim Forever',
    description:
      'Browse Shamim Forever\'s full collection — luxury perfumes, sovereign jewellery, and cosmetics. Buy online in Pakistan & worldwide. Dior, Chanel, Xerjoff, Initio & more.',
    keywords: [
      'buy perfume online Pakistan',
      'luxury perfume Pakistan',
      'Shamim Forever shop',
      'best perfume brand Pakistan',
      'Dior perfume Pakistan',
      'Chanel perfume Pakistan',
      'oud perfume Pakistan',
      'luxury fragrance online',
      'buy Xerjoff Pakistan',
      'initio atomic rose Pakistan',
      'luxury jewellery Pakistan',
      'shamimforever.com',
    ],
    alternates: { canonical: `${BASE_URL}/shop` },
    openGraph: {
      title: 'Shop Luxury Fragrances & Collections — Shamim Forever',
      description:
        'Browse luxury perfumes, sovereign jewellery, and cosmetics by Shamim Forever. Shop Dior, Chanel, Xerjoff, Initio & exclusive house creations online.',
      url: `${BASE_URL}/shop`,
      siteName: 'Shamim Forever',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/logo-sf.png`,
          width: 512,
          height: 512,
          alt: 'Shamim Forever — Sovereign Luxury Shop',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shop Luxury Fragrances — Shamim Forever',
      description:
        'Luxury perfumes, jewellery & cosmetics. Shop online in Pakistan & worldwide.',
      images: [`${BASE_URL}/logo-sf.png`],
    },
  }

  async function getInitialProducts(): Promise<Product[]> {
    const { data } = await supabaseAdmin
      .from('products')
      .select('*, main_category:main_categories(id, name, slug)')
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(48)

    return data || []
  }

  export default async function ShopPage() {
    const initialProducts = await getInitialProducts()
    return <ShopClient initialProducts={initialProducts} />
  }
  