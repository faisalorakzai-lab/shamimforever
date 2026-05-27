'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Product, MainCategory } from '@/types'
import { formatPKR } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

const STATIC_CATS = [
  { id: 'all', slug: 'all', label: 'All', icon: '◈' },
  { id: 'perfume', slug: 'perfume', label: 'Perfumes', icon: '◈' },
  { id: 'cosmetics', slug: 'cosmetics', label: 'Cosmetics', icon: '◇' },
  { id: 'jewelry', slug: 'jewelry', label: 'Jewelry', icon: '◆' },
]

const SUB_CATS: Record<string, { label: string; value: string }[]> = {
  perfume: [
    { label: 'All Fragrances', value: 'all' },
    { label: 'For Her', value: 'her' },
    { label: 'Floral & Sweet', value: 'floral' },
    { label: 'Fruity & Fresh', value: 'fruity' },
    { label: 'For Him', value: 'him' },
    { label: 'Oud & Leather', value: 'oud' },
    { label: 'Woody & Spicy', value: 'woody' },
    { label: 'Unisex', value: 'unisex' },
  ],
  cosmetics: [
    { label: 'All Cosmetics', value: 'all' },
    { label: 'For Her', value: 'her' },
    { label: 'Lip Luxury', value: 'lips' },
    { label: 'Face & Glow', value: 'face' },
    { label: 'Eye Collection', value: 'eyes' },
    { label: 'For Him', value: 'him' },
    { label: 'Beard Care', value: 'beard' },
    { label: 'Skincare', value: 'skincare' },
  ],
  jewelry: [
    { label: 'All Jewelry', value: 'all' },
    { label: 'For Her', value: 'her' },
    { label: 'Bridal & Statement', value: 'bridal' },
    { label: 'Minimalist & Daily', value: 'minimal' },
    { label: 'Rings & Bracelets', value: 'rings-her' },
    { label: 'For Him', value: 'him' },
    { label: 'Rings & Bands', value: 'rings-him' },
    { label: 'Cuffs & Bracelets', value: 'cuffs' },
    { label: 'Cufflinks', value: 'cufflinks' },
  ],
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price ↑' },
  { value: 'price_desc', label: 'Price ↓' },
]

// Updated with real collection banners
const HERO_IMAGES: Record<string, string> = {
  all: '/collections/banner-her.png',
  perfume: '/collections/banner-her.png',
  cosmetics: '/collections/banner-unisex.png',
  jewelry: '/collections/banner-him.png',
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSub, setActiveSub] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showSort, setShowSort] = useState(false)

  useEffect(() => {
    fetchProducts('all', 'all', 'newest')
  }, [])

  async function fetchProducts(category: string, sub: string, sort: string) {
    setLoading(true)
    let query = supabase
      .from('products')
      .select('*, main_category:main_categories(id, name, slug)')
      .eq('is_active', true)

    if (category !== 'all') {
      const { data: cat } = await supabase
        .from('main_categories').select('id').eq('slug', category).single()
      if (cat) query = query.eq('main_category_id', cat.id)
    }

    if (sort === 'price_asc') query = query.order('price_pkr', { ascending: true })
    else if (sort === 'price_desc') query = query.order('price_pkr', { ascending: false })
    else query = query.order('created_at', { ascending: false })

    const { data } = await query
    setProducts(data || [])
    setLoading(false)
  }

  function handleCategory(slug: string) {
    setActiveCategory(slug)
    setActiveSub('all')
    fetchProducts(slug, 'all', sortBy)
  }

  function handleSort(sort: string) {
    setSortBy(sort)
    setShowSort(false)
    fetchProducts(activeCategory, activeSub, sort)
  }

  const currentLabel = STATIC_CATS.find(c => c.slug === activeCategory)?.label ?? 'All'
  const heroImage = HERO_IMAGES[activeCategory] ?? HERO_IMAGES.all

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ─── HERO STRIP ─── */}
      <section className="pt-20 relative overflow-hidden border-b border-[#111]">
        <div className="relative h-[40vw] md:h-[35vh] max-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + 'hero'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
              className="absolute inset-0"
            >
              <img
                src={heroImage}
                alt={currentLabel}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.25) contrast(1.1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 h-full flex flex-col justify-end pb-6 md:pb-10 px-5 md:px-12 lg:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + 'title'}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-2 md:mb-3">
                  House of Shamim Forever
                </p>
                <h1 className="font-serif font-light text-4xl md:text-6xl lg:text-7xl tracking-[0.1em] text-zinc-100 leading-none">
                  {currentLabel}
                </h1>
                {products.length > 0 && !loading && (
                  <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-700 mt-2">
                    {products.length} Creations
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ─── MAIN CATEGORY TABS ─── */}
        <div className="flex overflow-x-auto scrollbar-none bg-[#050505]/95 backdrop-blur-md border-t border-[#111]">
          {STATIC_CATS.map((cat, i) => (
            <button
              key={cat.slug}
              onClick={() => handleCategory(cat.slug)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.4em] uppercase transition-all duration-500 border-b-2 whitespace-nowrap ${
                activeCategory === cat.slug
                  ? 'text-[#c9a054] border-[#c9a054]'
                  : 'text-zinc-600 border-transparent hover:text-zinc-300'
              } ${i < STATIC_CATS.length - 1 ? 'border-r border-r-[#111]' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ─── SUB-CATEGORY + SORT ─── */}
        {activeCategory !== 'all' && SUB_CATS[activeCategory] && (
          <div className="border-t border-[#0a0a0a] bg-[#030303]">
            <div className="flex items-center">
              <div className="flex overflow-x-auto scrollbar-none flex-1">
                {SUB_CATS[activeCategory].map((sub) => (
                  <button
                    key={sub.value}
                    onClick={() => setActiveSub(sub.value)}
                    className={`flex-shrink-0 px-4 md:px-6 py-3 text-[8px] tracking-[0.35em] uppercase whitespace-nowrap transition-all duration-400 ${
                      activeSub === sub.value
                        ? 'text-[#c9a054]'
                        : 'text-zinc-700 hover:text-zinc-400'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
              <div className="relative flex-shrink-0 border-l border-[#111]">
                <button
                  onClick={() => setShowSort(!showSort)}
                  className="px-4 md:px-6 py-3 text-[8px] tracking-[0.35em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-400 whitespace-nowrap"
                >
                  Sort: {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                </button>
                {showSort && (
                  <div className="absolute right-0 top-full bg-[#0a0a0a] border border-[#1a1a1a] z-50 min-w-[160px]">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => handleSort(opt.value)}
                        className={`w-full text-left px-5 py-3 text-[8px] tracking-[0.35em] uppercase transition-colors duration-300 ${
                          sortBy === opt.value ? 'text-[#c9a054]' : 'text-zinc-500 hover:text-zinc-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── PRODUCT GRID ─── */}
      <section className="px-4 md:px-10 lg:px-20 py-8 md:py-14">
        {loading ? (
          <div className="text-center py-28 md:py-40">
            <div className="w-px h-12 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-6" />
            <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">
              Establishing Sovereign Connection...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-28 md:py-40">
            <p className="font-serif text-4xl font-light text-zinc-700 tracking-[0.1em] mb-4">Coming Soon</p>
            <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">
              The vault is being curated. Return shortly.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-[#c9a054]/30" />
              <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">House of Shamim Forever</span>
              <div className="w-8 h-px bg-[#c9a054]/30" />
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + activeSub + sortBy}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6 md:mb-10 pb-4 md:pb-6 border-b border-[#0d0d0d]">
                <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-700">
                  {products.length} Creations
                </p>
                {activeCategory === 'all' && (
                  <div className="relative">
                    <button
                      onClick={() => setShowSort(!showSort)}
                      className="text-[8px] tracking-[0.35em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-400"
                    >
                      Sort: {SORT_OPTIONS.find(s => s.value === sortBy)?.label} ↓
                    </button>
                    {showSort && (
                      <div className="absolute right-0 top-full mt-1 bg-[#0a0a0a] border border-[#1a1a1a] z-50 min-w-[160px]">
                        {SORT_OPTIONS.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => handleSort(opt.value)}
                            className={`w-full text-left px-5 py-3 text-[8px] tracking-[0.35em] uppercase transition-colors duration-300 ${
                              sortBy === opt.value ? 'text-[#c9a054]' : 'text-zinc-500 hover:text-zinc-200'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 lg:gap-10">
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.8, ease }}
                  >
                    <Link href={'/products/' + (product.slug || product.id)} className="block group">
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a] mb-3 md:mb-5">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1500ms]"
                            style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                          />
                        ) : product.slug === 'shamims-bloom' ? (
                          <img
                            src="/products/shamims-bloom/bloom-1.png"
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1500ms]"
                            style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                            <p className="font-serif text-5xl md:text-7xl font-light text-[#c9a054]/8">SF</p>
                            <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-800">
                              {(product as any).main_category?.name ?? 'Shamim Forever'}
                            </p>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-0 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}>
                          <span className="block w-full text-center text-[7px] md:text-[8px] tracking-[0.35em] uppercase text-[#c9a054] border border-[#c9a054]/40 py-2 md:py-2.5 bg-[#050505]/80 backdrop-blur-sm">
                            View Creation
                          </span>
                        </div>

                        {(product as any).main_category?.name && (
                          <div className="absolute top-2 md:top-3 left-2 md:left-3">
                            <span className="text-[6px] md:text-[7px] tracking-[0.3em] uppercase text-[#c9a054] bg-[#050505]/85 px-2 py-1">
                              {(product as any).main_category.name}
                            </span>
                          </div>
                        )}

                        {product.inventory <= 5 && product.inventory > 0 && (
                          <div className="absolute top-2 md:top-3 right-2 md:right-3">
                            <span className="text-[6px] md:text-[7px] tracking-[0.3em] uppercase text-red-400/80 bg-[#050505]/85 px-2 py-1">
                              {product.inventory} Left
                            </span>
                          </div>
                        )}

                        {product.slug === 'shamims-bloom' && (
                          <div className="absolute bottom-12 md:bottom-14 right-2 md:right-3">
                            <span className="text-[6px] tracking-[0.3em] uppercase text-[#c9a054]/80 bg-[#050505]/85 px-2 py-1">◆ NFT</span>
                          </div>
                        )}
                      </div>

                      <div className="px-0.5">
                        <h3 className="font-serif font-light text-sm md:text-lg tracking-[0.12em] text-zinc-200 group-hover:text-[#c9a054] transition-colors duration-500 leading-tight mb-1.5 md:mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                          <p className="text-zinc-300 text-xs md:text-sm font-light">
                            {formatPKR(product.price_pkr)}
                          </p>
                          <span className="hidden md:block text-zinc-700 text-xs">·</span>
                          <p className="text-zinc-600 text-[10px] md:text-xs font-light">
                            ${product.price_usd}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </div>
  )
}
