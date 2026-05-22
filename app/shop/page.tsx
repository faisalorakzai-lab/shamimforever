'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Product, MainCategory } from '@/types'
import { formatPKR } from '@/lib/utils'

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'perfume', name: 'Perfume' },
  { id: 'cosmetics', name: 'Cosmetics' },
  { id: 'jewelry', name: 'Jewelry' },
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const { data: cats } = await supabase.from('main_categories').select('*')
      if (cats) setCategories(cats)
      await fetchProducts('all', 'newest')
      setLoading(false)
    }
    fetchData()
  }, [])

  async function fetchProducts(categorySlug: string, sort: string) {
    setLoading(true)

    let query = supabase
      .from('products')
      .select('*, main_category:main_categories(id, name, slug)')
      .eq('is_active', true)

    if (categorySlug !== 'all') {
      const { data: cat } = await supabase
        .from('main_categories')
        .select('id')
        .eq('slug', categorySlug)
        .single()
      if (cat) {
        query = query.eq('main_category_id', cat.id)
      }
    }

    if (sort === 'price_asc') query = query.order('price_pkr', { ascending: true })
    else if (sort === 'price_desc') query = query.order('price_pkr', { ascending: false })
    else query = query.order('created_at', { ascending: true })

    const { data } = await query
    setProducts(data || [])
    setLoading(false)
  }

  function handleCategoryChange(slug: string) {
    setActiveCategory(slug)
    fetchProducts(slug, sortBy)
  }

  function handleSortChange(sort: string) {
    setSortBy(sort)
    fetchProducts(activeCategory, sort)
  }

  const displayCategories = categories.length > 0
    ? [{ id: 'all', name: 'All', slug: 'all' }, ...categories.map(c => ({ id: c.slug, name: c.name, slug: c.slug }))]
    : CATEGORIES

  return (
    <div className="min-h-screen bg-[#050505] pt-20">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="luxury-meta mb-6">The House</p>
            <h1 className="font-serif text-6xl md:text-8xl font-light tracking-[0.2em] uppercase text-zinc-100">
              Shop
            </h1>
            <p className="text-zinc-500 font-light text-sm tracking-[0.2em] mt-4">
              Perfume · Cosmetics · Jewelry
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#1a1a1a] sticky top-20 z-40 bg-[#050505]/95 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between overflow-x-auto py-6 gap-8">
            <div className="flex items-center gap-6 flex-shrink-0">
              {displayCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id === 'all' ? 'all' : (cat as any).slug || cat.id)}
                  className={`text-[9px] tracking-[0.35em] uppercase transition-colors duration-300 whitespace-nowrap ${
                    activeCategory === (cat.id === 'all' ? 'all' : (cat as any).slug || cat.id)
                      ? 'text-[#c9a054]'
                      : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent border border-[#1a1a1a] text-zinc-500 text-[9px] tracking-[0.3em] uppercase px-4 py-2 outline-none cursor-pointer hover:border-[#c9a054] transition-colors duration-300 flex-shrink-0"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16">
        {loading ? (
          <div className="text-center py-40">
            <p className="luxury-meta">Establishing Sovereign Connection...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-40">
            <p className="font-serif text-3xl font-light text-zinc-700 mb-4">No creations found</p>
            <p className="luxury-meta">The vault is being curated. Return shortly.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + sortBy}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category label */}
              <div className="mb-12 pb-6 border-b border-[#1a1a1a] flex items-end justify-between">
                <div>
                  <p className="luxury-meta mb-2">
                    {activeCategory === 'all' ? 'All Categories' : displayCategories.find(c => (c as any).slug === activeCategory || c.id === activeCategory)?.name}
                  </p>
                  <p className="text-zinc-600 text-xs font-light">{products.length} Sovereign Creations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -8 }}
                  >
                    <Link href={`/products/${product.id}`} className="block group cursor-pointer">
                      <div className="aspect-[3/4] bg-[#0a0a0a] mb-6 overflow-hidden relative border border-[#111]">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                            <p className="font-serif text-7xl font-light text-[#c9a054]/10">SF</p>
                            <p className="luxury-meta opacity-50">
                              {(product as any).main_category?.name || 'Shamim Forever'}
                            </p>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                          <span className="luxury-btn py-2 px-4 text-[8px] w-full block text-center">
                            View Creation
                          </span>
                        </div>
                        {(product as any).main_category?.name && (
                          <div className="absolute top-4 left-4">
                            <span className="text-[7px] tracking-[0.3em] uppercase text-[#c9a054] bg-[#050505]/80 px-2 py-1 border border-[#c9a054]/20">
                              {(product as any).main_category.name}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="font-serif text-lg font-light tracking-[0.2em] uppercase text-zinc-100 mb-2 group-hover:text-[#c9a054] transition-colors duration-500">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-4">
                          <p className="text-zinc-400 text-sm font-light">
                            {formatPKR(product.price_pkr)}
                          </p>
                          <span className="text-zinc-700 text-xs">·</span>
                          <p className="text-zinc-500 text-xs font-light">
                            ${product.price_usd} USD
                          </p>
                        </div>
                        {product.inventory <= 5 && product.inventory > 0 && (
                          <p className="luxury-meta mt-2 text-red-500/70">
                            Only {product.inventory} Remaining
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
