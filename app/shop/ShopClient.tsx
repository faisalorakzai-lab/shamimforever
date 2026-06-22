'use client'

import { SOVEREIGN_CONFIGS } from '@/lib/sovereign-configs'
import { PRODUCT_IMAGE_OVERRIDES, PRODUCT_VIDEO_OVERRIDES } from '@/lib/product-image-overrides'
import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'
import { NftCardBadge } from '@/components/NftBadge'

const ease = [0.16, 1, 0.3, 1] as const

const GENDER_TO_SUB_ID: Record<string, string> = {
  her:    'ab8df629-e022-41d9-a6de-fac63d5680e8',
  him:    'ce7a59e1-d0c4-49c8-9c70-3b487f3ab56b',
  unisex: '63e2c67c-fdba-40f7-9cd1-2cbe7fd6d852',
}

const CAT_SLUG_TO_ID: Record<string, string> = {
  perfume:   'c513e298-7cb4-4c94-8288-19c6a12eed9b',
  cosmetics: '22226324-4789-419d-a9e2-f763df2d24f1',
  jewelry:   'e291b9af-a637-45da-a2df-d39f2e72e53c',
}

const STATIC_CATS = [
  { slug: 'all', label: 'All' },
  { slug: 'perfume', label: 'Perfumes' },
  { slug: 'cosmetics', label: 'Cosmetics' },
  { slug: 'jewelry', label: 'Jewelry' },
]

const SUB_CATS: Record<string, { label: string; value: string }[]> = {
  perfume: [
    { label: 'All Fragrances', value: 'all' },
    { label: 'For Her', value: 'her' },
    { label: 'For Him', value: 'him' },
    { label: 'Unisex', value: 'unisex' },
  ],
  cosmetics: [
    { label: 'All Cosmetics', value: 'all' },
    { label: 'For Her', value: 'her' },
    { label: 'For Him', value: 'him' },
    { label: 'Unisex', value: 'unisex' },
  ],
  jewelry: [
    { label: 'All Jewelry', value: 'all' },
    { label: 'For Her', value: 'her' },
    { label: 'For Him', value: 'him' },
  ],
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price ↑' },
  { value: 'price_desc', label: 'Price ↓' },
]

const HERO_IMAGES: Record<string, string> = {
  all: '/collections/banner-her.png',
  perfume: '/collections/banner-her.png',
  cosmetics: '/collections/banner-unisex.png',
  jewelry: '/collections/banner-jewelry-her.png',
}

const GENDER_HERO_IMAGES: Record<string, string> = {
  her: '/collections/banner-jewelry-her.png',
  him: '/collections/banner-him.png',
  unisex: '/collections/banner-unisex.png',
}

const CAT_LABEL_MAP: Record<string, string> = {
  all: 'All',
  perfume: 'Perfumes',
  cosmetics: 'Cosmetics',
  jewelry: 'Jewelry',
  her: 'For Her',
  him: 'For Him',
  unisex: 'Unisex',
}

const SOVEREIGN_THRESHOLD = 45000

function Card3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 16
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12
    el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.03,1.03,1.03)`
  }, [])
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }, [])
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: 'transform 0.15s cubic-bezier(0.16,1,0.3,1)', transformStyle: 'preserve-3d', willChange: 'transform' }}>
      {children}
    </div>
  )
}

function ShopPageInner({ initialProducts }: { initialProducts: Product[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSub, setActiveSub] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showSort, setShowSort] = useState(false)
  const [sovereignOnly, setSovereignOnly] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('category') || 'all'
    const gender = searchParams.get('gender') || 'all'
    const sov = searchParams.get('sovereign') === '1'
    setActiveCategory(cat)
    setActiveSub(gender)
    setSovereignOnly(sov)
    fetchProducts(cat, gender, sortBy, sov)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  async function fetchProducts(category: string, sub: string, sort: string, sovereign: boolean) {
    setLoading(true)
    let query = supabase
      .from('products')
      .select('*, main_category:main_categories(id, name, slug)')
      .eq('is_active', true)

    if (category !== 'all' && CAT_SLUG_TO_ID[category]) {
      query = query.eq('main_category_id', CAT_SLUG_TO_ID[category])
    }

    if (sub !== 'all' && GENDER_TO_SUB_ID[sub]) {
      query = query.eq('sub_category_id', GENDER_TO_SUB_ID[sub])
    }

    if (sovereign) {
      query = query.gte('price_pkr', SOVEREIGN_THRESHOLD)
    }

    if (sort === 'price_asc') query = query.order('price_pkr', { ascending: true })
    else if (sort === 'price_desc') query = query.order('price_pkr', { ascending: false })
    else query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false })

    const { data } = await query.limit(500)
    setProducts(data || [])
    setLoading(false)
  }

  function handleCategory(slug: string) {
    const params = new URLSearchParams()
    if (slug !== 'all') params.set('category', slug)
    router.push('/shop' + (params.toString() ? '?' + params.toString() : ''), { scroll: false })
  }

  function handleSub(sub: string) {
    const params = new URLSearchParams()
    if (activeCategory !== 'all') params.set('category', activeCategory)
    if (sub !== 'all') params.set('gender', sub)
    if (sovereignOnly) params.set('sovereign', '1')
    router.push('/shop' + (params.toString() ? '?' + params.toString() : ''), { scroll: false })
  }

  function handleSort(sort: string) {
    setSortBy(sort)
    setShowSort(false)
    fetchProducts(activeCategory, activeSub, sort, sovereignOnly)
  }

  function handleSovereignToggle() {
    const next = !sovereignOnly
    const params = new URLSearchParams()
    if (activeCategory !== 'all') params.set('category', activeCategory)
    if (activeSub !== 'all') params.set('gender', activeSub)
    if (next) params.set('sovereign', '1')
    router.push('/shop' + (params.toString() ? '?' + params.toString() : ''), { scroll: false })
  }

  const subLabel = sovereignOnly
    ? 'Sovereign Vault'
    : activeSub !== 'all'
      ? CAT_LABEL_MAP[activeSub]
      : CAT_LABEL_MAP[activeCategory] ?? 'All'

  const heroImage = (activeSub !== 'all' ? GENDER_HERO_IMAGES[activeSub] : null) ?? HERO_IMAGES[activeCategory] ?? HERO_IMAGES.all

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Hero */}
      <section className="pt-20 relative overflow-hidden border-b border-[#111]">
        <div className="relative h-[40vw] md:h-[35vh] max-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + 'hero'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }} className="absolute inset-0">
              <img src={heroImage} alt={subLabel} className="w-full h-full object-cover" style={{ filter: sovereignOnly ? 'brightness(0.18) contrast(1.15) sepia(0.3)' : 'brightness(0.25) contrast(1.1)' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              {sovereignOnly && (
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(201,160,84,0.06) 0%, transparent 60%)' }} />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="relative z-10 h-full flex flex-col justify-end pb-6 md:pb-10 px-5 md:px-12 lg:px-20">
            <AnimatePresence mode="wait">
              <motion.div key={subLabel} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}>
                {sovereignOnly && (
                  <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-1">◆ Signature & Sovereign Tier · Rs 45,000+</p>
                )}
                {!sovereignOnly && (
                  <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-2 md:mb-3">House of Shamim Forever</p>
                )}
                <h1 className="font-serif font-light text-4xl md:text-6xl lg:text-7xl tracking-[0.1em] text-zinc-100 leading-none">{subLabel}</h1>
                {products.length > 0 && !loading && (
                  <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-700 mt-2">{products.length} Creations</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Main category tabs + Sovereign button */}
        <div className="flex overflow-x-auto scrollbar-none bg-[#050505]/95 backdrop-blur-md border-t border-[#111]">
          {STATIC_CATS.map((cat, i) => (
            <button key={cat.slug} onClick={() => handleCategory(cat.slug)}
              className={`flex-shrink-0 px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.4em] uppercase transition-all duration-500 border-b-2 whitespace-nowrap ${!sovereignOnly && activeCategory === cat.slug ? 'text-[#c9a054] border-[#c9a054]' : 'text-zinc-600 border-transparent hover:text-zinc-300'} ${i < STATIC_CATS.length - 1 ? 'border-r border-r-[#111]' : ''}`}>
              {cat.label}
            </button>
          ))}

          {/* Sovereign Vault filter button */}
          <button
            onClick={handleSovereignToggle}
            className={`flex-shrink-0 px-5 md:px-7 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.4em] uppercase transition-all duration-500 border-b-2 whitespace-nowrap border-l border-l-[#1a1a1a] flex items-center gap-2 ${sovereignOnly ? 'text-[#c9a054] border-[#c9a054] bg-[#c9a054]/5' : 'text-zinc-600 border-transparent hover:text-[#c9a054] hover:border-[#c9a054]/40'}`}>
            <span className={`text-[10px] transition-all duration-300 ${sovereignOnly ? 'text-[#c9a054]' : 'text-zinc-700'}`}>◆</span>
            Sovereign Vault
          </button>
        </div>

        {/* Sovereign active banner */}
        <AnimatePresence>
          {sovereignOnly && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#c9a054]/15 bg-gradient-to-r from-[#c9a054]/8 via-[#c9a054]/4 to-transparent overflow-hidden">
              <div className="px-5 md:px-12 lg:px-20 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-[#c9a054]" />
                  <p className="text-[8px] tracking-[0.45em] uppercase text-[#c9a054]">Sovereign Vault Active — Showing Rs 45,000+ Signature & Luxury Tier</p>
                </div>
                <button onClick={handleSovereignToggle} className="text-[7px] tracking-[0.35em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors">
                  Clear ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sub-category tabs */}
        {activeCategory !== 'all' && SUB_CATS[activeCategory] && (
          <div className="border-t border-[#0a0a0a] bg-[#030303]">
            <div className="flex items-center">
              <div className="flex overflow-x-auto scrollbar-none flex-1">
                {SUB_CATS[activeCategory].map(sub => (
                  <button key={sub.value} onClick={() => handleSub(sub.value)}
                    className={`flex-shrink-0 px-4 md:px-6 py-3 text-[8px] tracking-[0.35em] uppercase whitespace-nowrap transition-all ${activeSub === sub.value ? 'text-[#c9a054]' : 'text-zinc-700 hover:text-zinc-400'}`}>
                    {sub.label}
                  </button>
                ))}
              </div>
              <div className="relative flex-shrink-0 border-l border-[#111]">
                <button onClick={() => setShowSort(!showSort)} className="px-4 md:px-6 py-3 text-[8px] tracking-[0.35em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors whitespace-nowrap">
                  Sort: {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                </button>
                {showSort && (
                  <div className="absolute right-0 top-full bg-[#0a0a0a] border border-[#1a1a1a] z-50 min-w-[160px]">
                    {SORT_OPTIONS.map(opt => (
                      <button key={opt.value} onClick={() => handleSort(opt.value)}
                        className={`w-full text-left px-5 py-3 text-[8px] tracking-[0.35em] uppercase transition-colors ${sortBy === opt.value ? 'text-[#c9a054]' : 'text-zinc-500 hover:text-zinc-200'}`}>
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

      {/* Products grid */}
      <section className="px-4 md:px-10 lg:px-20 py-8 md:py-14">
        {loading ? (
          <div className="text-center py-28 md:py-40">
            <div className="w-px h-12 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-6" />
            <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">{sovereignOnly ? 'Opening Sovereign Vault...' : 'Establishing Sovereign Connection...'}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-28 md:py-40">
            <p className="font-serif text-4xl font-light text-zinc-700 tracking-[0.1em] mb-4">{sovereignOnly ? 'Vault Reserved' : 'Coming Soon'}</p>
            <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">
              {sovereignOnly ? 'No sovereign-tier creations in this category.' : 'The vault is being curated. Return shortly.'}
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-[#c9a054]/30" />
              <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">House of Shamim Forever</span>
              <div className="w-8 h-px bg-[#c9a054]/30" />
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + activeSub + sortBy + String(sovereignOnly)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center justify-between mb-6 md:mb-10 pb-4 border-b border-[#0d0d0d]">
                <div className="flex items-center gap-4">
                  <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-700">{products.length} Creations</p>
                  {sovereignOnly && (
                    <span className="text-[7px] tracking-[0.3em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-2 py-0.5">◆ Rs 45,000+</span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 lg:gap-10">
                {products.map((product, i) => {
                  const _imgOvr = PRODUCT_IMAGE_OVERRIDES[product.slug]
                  const _vidOvr = PRODUCT_VIDEO_OVERRIDES[product.slug] || null
                  const img: string | null = (Array.isArray(_imgOvr) ? (_imgOvr[0] ?? null) : _imgOvr) || SOVEREIGN_CONFIGS[product.slug]?.heroImage || product.images?.[0] || null
                  const isSovereign = product.price_pkr >= SOVEREIGN_THRESHOLD
                  return (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.8, ease }}>
                      <Link href={'/products/' + (product.slug || product.id)} className="block">
                        <Card3D>
                          <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a] mb-3 md:mb-5" style={{ transformStyle: 'preserve-3d' }}>
                            {_vidOvr ? (
                              <>
                                <video src={_vidOvr} autoPlay muted loop playsInline
                                  style={{ filter: 'brightness(0.9) contrast(1.05)' }}
                                  className="w-full h-full object-cover" />
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.07) 0%,transparent 45%,rgba(0,0,0,0.18) 100%)', transform: 'translateZ(2px)' }} />
                                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: isSovereign ? 'inset 0 0 40px rgba(201,160,84,0.08),inset 0 0 0 1px rgba(201,160,84,0.12)' : 'inset 0 0 40px rgba(201,160,84,0.05),inset 0 0 0 1px rgba(201,160,84,0.07)', transform: 'translateZ(4px)' }} />
                                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 opacity-0 hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateZ(20px)' }}>
                                  <span className="block w-full text-center text-[7px] md:text-[8px] tracking-[0.35em] uppercase text-[#c9a054] border border-[#c9a054]/40 py-2 md:py-2.5 bg-[#050505]/85 backdrop-blur-sm">View Creation</span>
                                </div>
                              </>
                            ) : img ? (
                              <>
                                <img src={img} alt={product.name} className="w-full h-full object-cover" loading="lazy"
                                  style={{ filter: 'brightness(0.9) contrast(1.05)' }} />
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.07) 0%,transparent 45%,rgba(0,0,0,0.18) 100%)', transform: 'translateZ(2px)' }} />
                                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: isSovereign ? 'inset 0 0 40px rgba(201,160,84,0.08),inset 0 0 0 1px rgba(201,160,84,0.12)' : 'inset 0 0 40px rgba(201,160,84,0.05),inset 0 0 0 1px rgba(201,160,84,0.07)', transform: 'translateZ(4px)' }} />
                                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 opacity-0 hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateZ(20px)' }}>
                                  <span className="block w-full text-center text-[7px] md:text-[8px] tracking-[0.35em] uppercase text-[#c9a054] border border-[#c9a054]/40 py-2 md:py-2.5 bg-[#050505]/85 backdrop-blur-sm">
                                    View Creation
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                                <p className="font-serif text-5xl md:text-7xl font-light text-[#c9a054]/8">SF</p>
                              </div>
                            )}
                            {(product as any).main_category?.name && (
                              <div className="absolute top-2 md:top-3 left-2 md:left-3" style={{ transform: 'translateZ(8px)' }}>
                                <span className="text-[6px] md:text-[7px] tracking-[0.3em] uppercase text-[#c9a054] bg-[#050505]/85 px-2 py-1">
                                  {(product as any).main_category.name}
                                </span>
                              </div>
                            )}
                            {isSovereign && !sovereignOnly && (
                              <div className="absolute top-2 md:top-3 right-2 md:right-3" style={{ transform: 'translateZ(8px)' }}>
                                <span className="text-[6px] tracking-[0.25em] uppercase text-[#c9a054] bg-[#050505]/90 border border-[#c9a054]/25 px-1.5 py-0.5">◆</span>
                              </div>
                            )}
                            {!isSovereign && product.inventory <= 5 && product.inventory > 0 && (
                              <div className="absolute top-2 md:top-3 right-2 md:right-3" style={{ transform: 'translateZ(8px)' }}>
                                <span className="text-[6px] md:text-[7px] tracking-[0.3em] uppercase text-red-400/80 bg-[#050505]/85 px-2 py-1">{product.inventory} Left</span>
                              </div>
                            )}
                          </div>
                          <div className="px-0.5" style={{ transform: 'translateZ(6px)' }}>
                            <h3 className="font-serif font-light text-sm md:text-lg tracking-[0.12em] text-zinc-200 hover:text-[#c9a054] transition-colors duration-500 leading-tight mb-1.5 md:mb-2 line-clamp-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <p className="font-serif font-light text-sm md:text-base text-[#c9a054] tracking-wider">$ {product.price_usd}</p>
                              <span className="text-[7px] tracking-[0.35em] text-[#c9a054]/60">USD</span>
                            </div>
                            <div className="mt-2"><NftCardBadge price_pkr={product.price_pkr} /></div>
                          </div>
                        </Card3D>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </div>
  )
}

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-px h-12 bg-gradient-to-b from-[#c9a054] to-transparent" />
      </div>
    }>
      <ShopPageInner initialProducts={initialProducts} />
    </Suspense>
  )
}
