'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'

const ease = [0.16, 1, 0.3, 1] as const

const JOURNAL_DISPATCHES = [
  { num: '01', label: 'Dispatch', title: 'The Architecture of Scent', sub: 'How a fragrance is engineered for permanence — not trend.', slug: 'architecture-of-scent', date: 'May 2025' },
  { num: '02', label: 'Field Notes', title: 'Sourcing Oud in Assam', sub: 'The forty-year-old trees that make our heaviest accord possible.', slug: 'sourcing-oud-assam', date: 'Apr 2025' },
  { num: '03', label: 'Craft', title: 'Why We Rejected the Formula', sub: 'Fourteen iterations. One final decision. The obsession behind our Signature Blend.', slug: 'rejected-formula', date: 'Mar 2025' },
]

const CATEGORY_TABS = [
  { id: 'all', label: 'All', slug: 'all' },
  { id: 'perfume', label: 'Perfumes', slug: 'perfume' },
  { id: 'cosmetics', label: 'Cosmetics', slug: 'cosmetics' },
  { id: 'jewelry', label: 'Jewelry', slug: 'jewelry' },
]

const WORLD_CITIES = [
  { city: 'Karachi', region: 'Tariq Road', flag: '🇵🇰' },
  { city: 'Karachi', region: 'Clifton', flag: '🇵🇰' },
  { city: 'Lahore', region: 'DHA Phase 6', flag: '🇵🇰' },
  { city: 'Islamabad', region: 'DHA Phase II', flag: '🇵🇰' },
  { city: 'Peshawar', region: 'Ring Road', flag: '🇵🇰' },
  { city: 'Dubai', region: 'The Dubai Mall', flag: '🇦🇪' },
  { city: 'London', region: 'New Bond Street', flag: '🇬🇧' },
  { city: 'Paris', region: 'Place Vendôme', flag: '🇫🇷' },
  { city: 'New York', region: 'Fifth Avenue', flag: '🇺🇸' },
  { city: 'Riyadh', region: 'VIA District', flag: '🇸🇦' },
]

function ParticleField() {
  const pts = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 1.2 + 0.4, dur: Math.random() * 9 + 6,
    delay: Math.random() * 6, opacity: Math.random() * 0.12 + 0.03,
  })), [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {pts.map(p => (
        <motion.div key={p.id} className="absolute rounded-full bg-[#c9a054]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, -14, 0], opacity: [p.opacity, p.opacity * 2.5, p.opacity] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.12, duration: 1.2, ease }}
    >
      <Link href={`/products/${product.id}`} className="block group">
        <div className="relative aspect-[3/4] bg-[#0a0a0a] overflow-hidden mb-3 md:mb-5">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name}
              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1400ms]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img src="/logo-icon.png" alt="SF" className="w-10 h-10 object-contain" style={{ opacity: 0.08 }} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}>
            <span className="block w-full text-center text-[7px] md:text-[8px] tracking-[0.35em] uppercase text-[#c9a054] border border-[#c9a054]/40 py-2 bg-[#050505]/80 backdrop-blur-sm">
              View Creation
            </span>
          </div>
          {(product as any).main_category?.name && (
            <div className="absolute top-2 left-2">
              <span className="text-[6px] tracking-[0.3em] uppercase text-[#c9a054] bg-[#050505]/80 px-2 py-1">
                {(product as any).main_category.name}
              </span>
            </div>
          )}
        </div>
        <h3 className="font-serif font-light text-sm md:text-base tracking-[0.12em] text-zinc-200 group-hover:text-[#c9a054] transition-colors duration-500 leading-tight mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[#c9a054]/70 text-xs font-light tracking-widest">$ {product.price_usd} USD</p>
      </Link>
    </motion.div>
  )
}

function ProductSkeleton({ index }: { index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12, duration: 1.2, ease }}>
      <div className="relative aspect-[3/4] bg-[#0a0a0a] overflow-hidden mb-3 md:mb-5 border border-[#0d0d0d]">
        <div className="w-full h-full flex items-center justify-center">
          <img src="/logo-icon.png" alt="SF" className="w-10 h-10 object-contain" style={{ opacity: 0.06 }} />
        </div>
      </div>
      <div className="h-3 w-32 bg-[#111] mb-2 opacity-50" />
      <div className="h-3 w-20 bg-[#0d0d0d] opacity-40" />
    </motion.div>
  )
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => { fetchProducts('all') }, [])

  async function fetchProducts(categorySlug: string) {
    setLoadingProducts(true)
    let query = supabase
      .from('products')
      .select('*, main_category:main_categories(id, name, slug)')
      .eq('is_active', true)
      .limit(6)

    if (categorySlug !== 'all') {
      const { data: cat } = await supabase.from('main_categories').select('id').eq('slug', categorySlug).single()
      if (cat) query = query.eq('main_category_id', cat.id)
    }
    const { data } = await query.order('created_at', { ascending: false })
    setProducts(data || [])
    setLoadingProducts(false)
  }

  function handleCategory(slug: string) {
    setActiveCategory(slug)
    fetchProducts(slug)
  }

  return (
    <div className="bg-[#050505] overflow-x-hidden">

      {/* ══════ HERO — LUXURY ACQUISITION ══════ */}
        <section ref={heroRef} className="relative h-[100svh] overflow-hidden bg-[#030303]">
          {/* Cinematic Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.3) contrast(1.1) saturate(0.75)' }}
            >
              <source src="/products/eternal-grace-sapphire-set/product-video.mp4" type="video/mp4" />
            </video>
            <motion.img
              src="/products/shamims-bloom/bloom-1.png"
              alt="Shamim's Bloom"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.32) contrast(1.12) saturate(0.72)' }}
              initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1.0, opacity: 1 }}
              transition={{ duration: 2.6, ease }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/90 via-[#030303]/30 to-[#030303]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/30" />
          </div>

          <ParticleField />

          {/* Main Content */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 h-full flex flex-col justify-center max-w-[1600px] mx-auto px-5 md:px-12 lg:px-20"
          >
            <div className="max-w-xl lg:max-w-2xl">
              {/* Campaign Label */}
              <motion.div
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1.4 }}
                className="flex items-center gap-3 mb-7"
              >
                <span className="text-[#c9a054] text-[8px]">◆</span>
                <span className="text-[9px] tracking-[0.55em] uppercase text-[#c9a054]">Founder's Reserve — Limited Allocation</span>
                <span className="text-[#c9a054] text-[8px]">◆</span>
              </motion.div>

              {/* Product Name */}
              <motion.h1
                initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 1.8, ease }}
                className="font-serif font-light leading-[0.86] text-zinc-100 mb-4"
                style={{ fontSize: 'clamp(3.6rem, 8.5vw, 9.5rem)', letterSpacing: '0.04em' }}
              >
                Shamim's<br />Bloom
              </motion.h1>

              {/* Sovereign Title */}
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 1.3 }}
                className="text-[9px] tracking-[0.5em] uppercase text-zinc-500 mb-3"
              >
                Sovereign Luxury House — Extrait de Parfum
              </motion.p>

              {/* Gold Rule */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.82, duration: 1.2 }}
                className="w-12 h-px bg-[#c9a054]/50 origin-left mb-6"
              />

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.92, duration: 1.4 }}
                className="font-serif font-light italic text-zinc-400 leading-snug mb-7"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 1.35rem)' }}
              >
                "Built From Love. Forged Into Legacy."
              </motion.p>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.02, duration: 1.2 }}
                className="flex items-baseline gap-2 mb-8"
              >
                <span className="text-[#c9a054] font-serif font-light" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>$306</span>
                <span className="text-zinc-600 text-[9px] tracking-[0.4em] uppercase">USD</span>
              </motion.div>

              {/* Luxury Attribute Panel */}
              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 1.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 mb-10 max-w-md"
              >
                {[
                  '100ML Extrait de Parfum',
                  'Founder Reserve Allocation',
                  'Polygon NFT Included',
                  'Blockchain Authenticated',
                  'Worldwide Collector Delivery',
                  'Ultra-Limited Allocation',
                ].map((attr) => (
                  <div key={attr} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#c9a054]/70 flex-shrink-0" />
                    <span className="text-[8px] tracking-[0.22em] uppercase text-zinc-500">{attr}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1.2 }}
                className="flex flex-row gap-4 items-center flex-wrap"
              >
                <Link href="/products/shamims-bloom"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#c9a054] text-[#030303] text-[9px] tracking-[0.45em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-[#e5ba6e]"
                >
                  Acquire Ownership
                </Link>
                <Link href="/our-story"
                  className="inline-flex items-center gap-2 text-[9px] tracking-[0.4em] uppercase text-zinc-500 hover:text-[#c9a054] transition-colors duration-500 border border-[#1c1c1c] px-6 py-4 hover:border-[#c9a054]/25"
                >
                  Explore Story
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Digital Passport Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.65, duration: 1.2 }}
            className="absolute bottom-8 right-5 md:right-12 lg:right-20 z-20 hidden md:flex flex-col items-end gap-1.5"
          >
            <div className="border border-[#c9a054]/22 px-4 py-3 backdrop-blur-sm bg-[#030303]/60">
              <p className="text-[7px] tracking-[0.45em] uppercase text-[#c9a054] mb-1.5">◆ Digital Passport</p>
              <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-600 mb-0.5">Polygon Blockchain</p>
              <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-600">ERC-721 · IPFS Verified</p>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 1 }}
            className="absolute bottom-8 left-5 md:left-12 lg:left-20 z-20 flex items-center gap-3"
          >
            <div className="relative w-10 h-px overflow-hidden">
              <motion.div className="absolute inset-0 bg-[#c9a054]/70"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} />
              <div className="absolute inset-0 bg-[#c9a054]/15" />
            </div>
            <span className="text-[7px] tracking-[0.5em] uppercase text-zinc-700">Scroll</span>
          </motion.div>
        </section>

      {/* ══════ NUMBERS STRIP ══════ */}
      <section className="border-y border-[#0d0d0d]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#0d0d0d]">
          {[
            { value: '100+', label: 'Sovereign Creations' },
            { value: '10', label: 'Global Boutiques' },
            { value: '5', label: 'Countries' },
            { value: '∞', label: 'Generational Legacy' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.8 }}
              className="text-center py-8 md:py-14 px-4">
              <p className="font-serif text-3xl md:text-5xl font-light text-[#c9a054] mb-2">{stat.value}</p>
              <p className="text-[7px] md:text-[8px] tracking-[0.4em] uppercase text-zinc-700">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════ EDITORIAL INTRO ══════ */}
      <section className="py-16 md:py-28 px-5 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-6 md:mb-8">The Experience</p>
            <h2 className="font-serif font-light text-3xl md:text-5xl lg:text-6xl tracking-[0.06em] text-zinc-100 leading-[1.05] mb-6 md:mb-8">
              Not a scent.<br />
              <span className="italic text-[#c9a054]">A presence.</span>
            </h2>
            <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8 md:mb-10 max-w-sm">
              Each creation from Shamim Forever is an act of cultural sovereignty — a distillation of heritage, 
              ambition, and quiet power. We do not make products. We architect identity.
            </p>
            <Link href="/atelier"
              className="group relative inline-flex items-center justify-center px-7 py-3.5 border border-[#c9a054]/50 text-[9px] tracking-[0.45em] uppercase text-[#c9a054] overflow-hidden">
              <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Enter the Atelier</span>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease, delay: 0.15 }}
            className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
            <img src="/founder-2.png" alt="Shamim Forever Atelier" className="w-full h-full object-cover object-top"
              style={{ filter: 'brightness(0.55) contrast(1.1) saturate(0.8)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#050505] to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600">The Atelier</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ PRODUCT SHOWCASE ══════ */}
      <section className="border-t border-[#0d0d0d] pb-14 md:pb-24">
        {/* Category tabs */}
        <div className="flex items-center justify-between border-b border-[#0d0d0d] overflow-x-auto scrollbar-none">
          <div className="flex flex-shrink-0">
            {CATEGORY_TABS.map((cat, i) => (
              <button key={cat.id} onClick={() => handleCategory(cat.slug)}
                className={`flex-shrink-0 px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.4em] uppercase whitespace-nowrap transition-all duration-500 border-b-2 ${
                  activeCategory === cat.slug
                    ? 'text-[#c9a054] border-[#c9a054]'
                    : 'text-zinc-700 border-transparent hover:text-zinc-400'
                } ${i < CATEGORY_TABS.length - 1 ? 'border-r border-r-[#0d0d0d]' : ''}`}>
                {cat.label}
              </button>
            ))}
          </div>
          <Link href="/shop"
            className="flex-shrink-0 px-5 md:px-8 py-4 md:py-5 text-[9px] tracking-[0.4em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500 whitespace-nowrap border-l border-[#0d0d0d]">
            View All →
          </Link>
        </div>

        {/* Product grid */}
        <div className="px-4 md:px-10 lg:px-20 pt-8 md:pt-12">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              {loadingProducts ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                  {[0,1,2,3,4,5].map(i => <ProductSkeleton key={i} index={i} />)}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-24">
                  <p className="font-serif text-2xl font-light text-zinc-700 mb-3">Coming Soon</p>
                  <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-800">The vault is being curated</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                  {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════ JOURNAL DISPATCH ══════ */}
      <section className="border-t border-[#0d0d0d] py-14 md:py-24">
        <div className="px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 md:mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
              <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-4">The Journal</p>
              <h2 className="font-serif font-light text-3xl md:text-5xl tracking-[0.06em] text-zinc-100 leading-[1.05]">
                Dispatches<br />
                <span className="italic text-zinc-500">from the House</span>
              </h2>
            </motion.div>
            <Link href="/journal"
              className="self-start md:self-auto text-[9px] tracking-[0.45em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500">
              Full Archive →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#0d0d0d] border border-[#0d0d0d]">
            {JOURNAL_DISPATCHES.map((article, i) => (
              <motion.div key={article.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: i * 0.1 }}>
                <Link href={`/journal/${article.slug}`} className="block group p-6 md:p-8 hover:bg-[#080808] transition-colors duration-500 h-full">
                  <div className="flex items-center gap-3 mb-5 md:mb-7">
                    <span className="font-serif font-light text-3xl md:text-4xl text-[#c9a054]/20 group-hover:text-[#c9a054]/40 transition-colors duration-700">
                      {article.num}
                    </span>
                    <span className="text-[7px] tracking-[0.45em] uppercase text-zinc-700">{article.label}</span>
                  </div>
                  <h3 className="font-serif font-light text-lg md:text-xl tracking-[0.06em] text-zinc-200 group-hover:text-zinc-100 transition-colors duration-500 leading-snug mb-3 md:mb-4">
                    {article.title}
                  </h3>
                  <p className="text-zinc-600 text-xs font-light leading-relaxed mb-6 md:mb-8">
                    {article.sub}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-0 h-px bg-[#c9a054] group-hover:w-6 transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                    <span className="text-[7px] tracking-[0.4em] uppercase text-[#c9a054] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Read → {article.date}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ WORLD BOUTIQUES TICKER ══════ */}
      <section className="border-t border-b border-[#0d0d0d] py-5 overflow-hidden">
        <div className="flex items-center gap-0">
          {/* Two sets for seamless loop */}
          {[...WORLD_CITIES, ...WORLD_CITIES].map((loc, i) => (
            <div key={i} className="flex-shrink-0 flex items-center gap-3 md:gap-5 px-4 md:px-8">
              <motion.div
                animate={{ x: [0, -100 * WORLD_CITIES.length] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
                className="flex items-center gap-3 md:gap-5"
              >
              </motion.div>
              <span className="text-base">{loc.flag}</span>
              <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-zinc-600 whitespace-nowrap">
                {loc.city}
              </span>
              <span className="text-zinc-800 text-xs hidden md:inline">·</span>
              <span className="text-[7px] tracking-[0.3em] uppercase text-zinc-800 whitespace-nowrap hidden md:inline">
                {loc.region}
              </span>
              <span className="text-[7px] tracking-[0.3em] uppercase text-[#c9a054]/40 whitespace-nowrap">
                Coming Soon
              </span>
              <span className="w-px h-3 bg-[#1a1a1a] mx-2 md:mx-4" />
            </div>
          ))}
        </div>
      </section>

      {/* ══════ TECHNOLOGY STRIP ══════ */}
      <section className="border-b border-[#0d0d0d]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0d0d0d]">
          {[
            { icon: '◈', title: 'Blockchain Verified', desc: 'Each creation carries a unique cryptographic signature — immutable proof of authenticity and provenance.' },
            { icon: '◆', title: 'Sovereign Vault', desc: 'Members of the Inner Circle gain access to exclusive drops, private viewings, and bespoke commissions.' },
            { icon: '⬡', title: 'OKBOND Protocol', desc: 'Our proprietary loyalty currency. Pay with OKBOND and receive an automatic 10% sovereign discount.' },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.9, ease }}
              className="px-5 md:px-10 lg:px-14 py-10 md:py-16 hover:bg-[#080808] transition-colors duration-700">
              <span className="text-xl md:text-2xl text-[#c9a054] block mb-5 md:mb-7">{item.icon}</span>
              <h3 className="font-serif font-light text-base md:text-lg tracking-[0.12em] text-zinc-200 mb-3 md:mb-4">{item.title}</h3>
              <p className="text-zinc-600 text-xs font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════ INNER CIRCLE CTA ══════ */}
      <section className="py-20 md:py-36 px-5 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,160,84,0.04)_0%,transparent_70%)]" />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}
          className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-6 md:mb-8">Private Access</p>
          <h2 className="font-serif font-light text-4xl md:text-6xl lg:text-7xl tracking-[0.05em] text-zinc-100 leading-[1.0] mb-6 md:mb-8">
            The Inner Circle<br />
            <span className="italic text-[#c9a054]">Awaits You.</span>
          </h2>
          <p className="text-zinc-500 font-light text-sm leading-relaxed mb-10 md:mb-14 max-w-md mx-auto">
            Gain sovereign access to limited editions, boutique opening invitations, 
            private viewings, and bespoke concierge service across 10 global locations.
          </p>
          <Link href="/inner-circle"
            className="group relative inline-flex items-center justify-center px-10 py-5 border border-[#c9a054]/60 text-[9px] tracking-[0.55em] uppercase text-[#c9a054] overflow-hidden">
            <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
            <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
              Request Sovereign Access
            </span>
          </Link>
        </motion.div>
      </section>

    </div>
  )
}
