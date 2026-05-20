'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Product, Collection, MainCategory } from '@/types'
import { formatPKR } from '@/lib/utils'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCollection, setActiveCollection] = useState<string>('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [{ data: cols }, { data: cats }] = await Promise.all([
        supabase.from('collections').select('*'),
        supabase.from('main_categories').select('*'),
      ])
      if (cols) setCollections(cols)
      if (cats) setCategories(cats)
      await fetchProducts('all', sortBy)
      setLoading(false)
    }
    fetchData()
  }, [])

  async function fetchProducts(collectionId: string, sort: string) {
    setLoading(true)
    let query = supabase
      .from('products')
      .select('*, collection:collections(*)')
      .eq('is_active', true)

    if (collectionId !== 'all') {
      query = query.eq('collection_id', collectionId)
    }

    if (sort === 'price_asc') query = query.order('price_pkr', { ascending: true })
    else if (sort === 'price_desc') query = query.order('price_pkr', { ascending: false })
    else query = query.order('created_at', { ascending: false })

    const { data } = await query
    setProducts(data || [])
    setLoading(false)
  }

  function handleCollectionChange(id: string) {
    setActiveCollection(id)
    fetchProducts(id, sortBy)
  }

  function handleSortChange(sort: string) {
    setSortBy(sort)
    fetchProducts(activeCollection, sort)
  }

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
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#1a1a1a] sticky top-20 z-40 bg-[#050505]/95 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between overflow-x-auto py-6 gap-8">
            {/* Collection Filters */}
            <div className="flex items-center gap-6 flex-shrink-0">
              <button
                onClick={() => handleCollectionChange('all')}
                className={`text-[9px] tracking-[0.35em] uppercase transition-colors duration-300 whitespace-nowrap ${
                  activeCollection === 'all'
                    ? 'text-[#c9a054]'
                    : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                All
              </button>
              {collections.map((col) => (
                <button
                  key={col.id}
                  onClick={() => handleCollectionChange(col.id)}
                  className={`text-[9px] tracking-[0.35em] uppercase transition-colors duration-300 whitespace-nowrap ${
                    activeCollection === col.id
                      ? 'text-[#c9a054]'
                      : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {col.name}
                </button>
              ))}
            </div>

            {/* Sort */}
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
            <p className="luxury-meta">Establishing Secure Connection to Sovereign Vault...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-40">
            <p className="font-serif text-3xl font-light text-zinc-700 mb-4">No creations found</p>
            <p className="luxury-meta">Establishing Secure Connection to Sovereign Vault...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCollection + sortBy}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                >
                  <Link href={`/products/${product.id}`} className="block group cursor-pointer">
                    {/* Product Image */}
                    <div className="aspect-[3/4] bg-[#0a0a0a] mb-6 overflow-hidden relative">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                          <p className="font-serif text-7xl font-light text-[#c9a054]/10">SF</p>
                          <p className="luxury-meta opacity-50">No Image</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                        <span className="luxury-btn py-2 px-4 text-[8px] w-full block text-center">
                          View Creation
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div>
                      {product.collection && (
                        <p className="luxury-meta mb-2">{product.collection.name}</p>
                      )}
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
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
