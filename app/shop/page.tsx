import { supabaseAdmin } from '@/lib/supabase-server'
  import type { Product } from '@/types'
  import ShopClient from './ShopClient'

  export const dynamic = 'force-dynamic'

  export const metadata = {
    title: 'Shop — Shamim Forever',
    description: 'Explore the House of Shamim Forever — sovereign luxury fragrances, cosmetics, and jewelry.',
  }

  async function getInitialProducts(): Promise<Product[]> {
    const { data } = await supabaseAdmin
      .from('products')
      .select('*, main_category:main_categories(id, name, slug)')
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })

    return data || []
  }

  export default async function ShopPage() {
    const initialProducts = await getInitialProducts()

    return <ShopClient initialProducts={initialProducts} />
  }
  