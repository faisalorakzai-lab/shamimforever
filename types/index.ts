export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  cover_image: string | null
  created_at: string
}

export interface MainCategory {
  id: string
  collection_id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  created_at: string
}

export interface SubCategory {
  id: string
  main_category_id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export interface Product {
  id: string
  collection_id: string | null
  main_category_id: string | null
  sub_category_id: string | null
  name: string
  slug: string
  description: string | null
  story: string | null
  price_pkr: number
  price_usd: number
  inventory: number
  images: string[]
  is_featured: boolean
  is_active: boolean
  is_pinned?: boolean
  sort_order?: number
  created_at: string
  collection?: Collection
  main_category?: MainCategory
}

export interface Order {
  id: string
  user_id: string | null
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: 'stripe' | 'jazzcash' | 'easypaisa' | 'usdt' | 'usdc' | 'okbond' | 'cod'
  total_pkr: number
  total_usd: number
  discount_applied: number
  shipping_address: Address
  created_at: string
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_pkr: number
  price_usd: number
  product?: Product
}

export interface Address {
  name: string
  phone: string
  line1: string
  line2?: string
  city: string
  province: string
  country: string
  postal_code?: string
}

export interface Wishlist {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product
}

export interface JournalPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  published: boolean
  created_at: string
}

export interface Boutique {
  id: string
  name: string
  address: string
  city: string
  country: string
  phone: string
  email: string | null
  coordinates: { lat: number; lng: number }
  image: string | null
  is_active: boolean
  is_pinned?: boolean
  sort_order?: number
}
