'use client'

  import { motion, useScroll, useTransform } from 'framer-motion'
  import { useRef, useEffect, useState, useMemo } from 'react'
  import Link from 'next/link'
  import { supabase } from '@/lib/supabase'
  import type { Product, Collection } from '@/types'

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  }

  function ParticleField() {
    const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.4 + 0.4,
      dur: Math.random() * 9 + 6,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.14 + 0.03,
    })), [])

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#c9a054]"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
            animate={{ y: [0, -16, 0], opacity: [p.opacity, p.opacity * 2.5, p.opacity] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    )
  }

  export default function HomePage() {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
    const [collections, setCollections] = useState<Collection[]>([])

    useEffect(() => {
      async function fetchData() {
        const [{ data: products }, { data: cols }] = await Promise.all([
          supabase.from('products').select('*').eq('is_featured', true).eq('is_active', true).limit(3),
          supabase.from('collections').select('*').limit(4),
        ])
        if (products) setFeaturedProducts(products)
        if (cols) setCollections(cols)
      }
      fetchData()
    }, [])

    return (
      <div className="bg-[#050505]">

        {/* ═══════════════════════════════════════
            CINEMATIC LUXURY HERO — MOBILE FIRST
        ═══════════════════════════════════════ */}
        <section ref={heroRef} className="relative h-screen overflow-hidden bg-[#050505]">

          {/* Shared atmosphere */}
          <div className="absolute inset-0 pointer-events-none z-[1]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_40%,rgba(201,160,84,0.05)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_45%,rgba(5,5,5,0.7)_100%)]" />
            <ParticleField />
          </div>

          {/* ── MOBILE LAYOUT (< lg) ── */}
          {/* Full-bleed portrait as background */}
          <div className="lg:hidden absolute inset-0 z-0">
            <motion.img
              src="/founder-3.png"
              alt="Shamim Forever"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'brightness(0.42) contrast(1.12) saturate(0.88)' }}
              initial={{ scale: 1.07, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/55 to-[#050505]/15" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505]/60 to-transparent" />
          </div>

          {/* Mobile text — overlaid bottom */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="lg:hidden absolute inset-0 z-10 flex flex-col justify-end px-6 pb-16 pt-24"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.4 }}
              className="text-[10px] tracking-[0.5em] uppercase text-[#c9a054] mb-5"
            >
              Sovereign Luxury House
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-light tracking-[0.12em] leading-[0.88] uppercase text-zinc-100 mb-5"
              style={{ fontSize: 'clamp(3.2rem, 14vw, 5rem)' }}
            >
              Shamim
              <br />
              Forever
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 1.2 }}
              className="w-10 h-px bg-[#c9a054]/60 origin-left mb-5"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1.2 }}
              className="text-zinc-400 text-sm tracking-wide font-light leading-relaxed mb-8 max-w-[280px]"
            >
              Built From Love.
              <br />
              Forged Into Legacy.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.2 }}
              className="flex flex-row gap-4 items-center flex-wrap"
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center px-6 py-3 border border-[#c9a054]/70 text-zinc-100 text-[9px] tracking-[0.4em] uppercase transition-all duration-700 overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                  Enter Collection
                </span>
              </Link>
              <Link
                href="/our-story"
                className="relative text-[9px] tracking-[0.4em] uppercase text-zinc-500 hover:text-[#c9a054] transition-colors duration-700 group"
              >
                Our Story
                <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-[#c9a054]/60 transition-all duration-700" />
              </Link>
            </motion.div>

            {/* Mobile scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="flex items-center gap-3 mt-10"
            >
              <div className="relative w-10 h-px overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-[#c9a054]/70"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 bg-[#c9a054]/15" />
              </div>
              <span className="luxury-meta opacity-40">Scroll</span>
            </motion.div>
          </motion.div>

          {/* ── DESKTOP LAYOUT (≥ lg) ── */}
          <div className="hidden lg:grid grid-cols-2 h-full relative z-10">

            {/* Left: Cinematic Portrait */}
            <div className="relative overflow-hidden">
              <motion.div
                style={{ y: heroY, scale: heroScale }}
                className="absolute inset-0"
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src="/founder-3.png"
                  alt="Shamim — Founder"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(0.7) contrast(1.12) saturate(0.9)' }}
                />
                <div className="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-[rgba(201,160,84,0.07)] to-transparent" />
                <div className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#050505]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
                <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#050505] to-transparent" />
              </motion.div>
              <motion.div
                className="absolute bottom-8 left-8 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1.2 }}
              >
                <div className="w-10 h-px bg-[#c9a054]/40 mb-3" />
                <p className="luxury-meta opacity-50">Shamim — Founder</p>
              </motion.div>
            </div>

            {/* Right: Typography */}
            <motion.div
              style={{ opacity: heroOpacity }}
              className="relative flex flex-col justify-center px-14 xl:px-20 py-20"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1.4 }}
                className="text-[10px] tracking-[0.5em] uppercase text-[#c9a054] mb-10 lg:mb-14"
              >
                Sovereign Luxury House
              </motion.p>

              <div className="overflow-hidden mb-6 lg:mb-7">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif font-light tracking-[0.15em] leading-[0.88] uppercase text-zinc-100"
                  style={{ fontSize: 'clamp(4.5rem, 8.5vw, 10rem)' }}
                >
                  Shamim
                  <br />
                  Forever
                </motion.h1>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.85, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-14 h-px bg-[#c9a054]/50 origin-left mb-8 lg:mb-10"
              />

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-zinc-400 text-base lg:text-lg tracking-wide max-w-sm font-light leading-relaxed mb-12"
              >
                Built From Love.
                <br />
                Forged Into Legacy.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-5 items-start mb-14"
              >
                <Link
                  href="/shop"
                  className="group relative inline-flex items-center justify-center px-8 py-3.5 border border-[#c9a054]/70 text-zinc-100 text-[9px] tracking-[0.4em] uppercase transition-all duration-700 overflow-hidden hover:border-[#c9a054]"
                >
                  <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                    Enter the Collection
                  </span>
                </Link>
                <Link
                  href="/our-story"
                  className="relative inline-flex items-center self-center text-[9px] tracking-[0.4em] uppercase text-zinc-500 hover:text-[#c9a054] transition-colors duration-700 group mt-1"
                >
                  Our Story
                  <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-[#c9a054]/60 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1.2 }}
                className="flex items-center gap-8"
              >
                <span className="luxury-meta opacity-50">Est. 2023</span>
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-px overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-[#c9a054]/60"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="absolute inset-0 bg-[#c9a054]/15" />
                  </div>
                  <span className="luxury-meta opacity-40">Scroll</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/8 to-transparent pointer-events-none z-20" />
        </section>

        {/* FRAGRANCE EXPERIENCE */}
        <section className="py-28 md:py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-20 items-center">
            <motion.div {...fadeUp}>
              <p className="luxury-meta mb-6 md:mb-8">The Experience</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8 md:mb-10 leading-tight">
                Not a scent.<br />
                <span className="italic text-[#c9a054]">A presence.</span>
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-8 md:mb-10 max-w-md">
                Each creation from Shamim Forever is an act of cultural sovereignty — a distillation of heritage,
                ambition, and quiet power. We do not make perfume. We architect identity.
              </p>
              <Link href="/atelier" className="luxury-btn text-[9px]">
                Enter the Atelier
              </Link>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden"
            >
              <img
                src="/founder-1.png"
                alt="Shamim Forever"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.6) contrast(1.1)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#050505] to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="luxury-meta opacity-60">The Founder</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PRESTIGE NUMBERS */}
        <section className="py-16 md:py-20 border-y border-[#1a1a1a]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {[
                { value: '100+', label: 'Sovereign Creations' },
                { value: '3', label: 'Global Boutiques' },
                { value: '50K+', label: 'Discerning Clients' },
                { value: '∞', label: 'Generational Legacy' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="text-center py-10 md:py-16 border-r border-[#1a1a1a] last:border-r-0"
                >
                  <p className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#c9a054] mb-2 md:mb-3">{stat.value}</p>
                  <p className="luxury-meta text-[8px] md:text-[9px]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DIGITAL AUTHENTICITY */}
        <section className="py-28 md:py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16 md:mb-20">
            <p className="luxury-meta mb-5 md:mb-6">Sovereign Technology</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl font-light tracking-[0.2em] uppercase text-zinc-100 max-w-3xl mx-auto leading-tight">
              Digital Authenticity. Physical Prestige.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a]">
            {[
              { title: 'Blockchain Verified', desc: 'Each creation carries a unique cryptographic signature — immutable proof of authenticity and provenance.', icon: '◈' },
              { title: 'Sovereign Vault', desc: 'Members of the Inner Circle gain access to exclusive drops, private viewings, and bespoke commissions.', icon: '◆' },
              { title: 'OKBOND Protocol', desc: 'Our proprietary loyalty currency. Pay with OKBOND and receive an automatic 10% sovereign discount.', icon: '⬡' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#050505] p-8 md:p-12 group hover:bg-[#0a0a0a] transition-colors duration-700"
              >
                <p className="text-[#c9a054] text-2xl mb-6 md:mb-8">{item.icon}</p>
                <h3 className="font-serif text-lg md:text-xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-4 md:mb-6">{item.title}</h3>
                <p className="text-zinc-500 font-light leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURED COLLECTION */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <p className="luxury-meta mb-3 md:mb-4">Featured</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase text-zinc-100">
                The Sovereign Edit
              </h2>
            </div>
            <Link href="/shop" className="hidden md:block text-[9px] tracking-[0.4em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors duration-500">
              View All →
            </Link>
          </motion.div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {featuredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                >
                  <Link href={`/products/${product.id}`} className="block group">
                    <div className="aspect-[3/4] bg-[#0a0a0a] border border-[#1a1a1a] mb-5 overflow-hidden relative">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <img src="/logo-icon.png" alt="SF" className="w-16 h-16 opacity-10 object-contain" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                    <p className="luxury-meta mb-2">Shamim Forever</p>
                    <h3 className="font-serif text-lg md:text-xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-2 group-hover:text-[#c9a054] transition-colors duration-500">{product.name}</h3>
                    <p className="text-zinc-400 text-sm font-light">PKR {product.price_pkr?.toLocaleString()} · ${product.price_usd} USD</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 1 }}
                  className="opacity-30"
                >
                  <div className="aspect-[3/4] bg-[#0a0a0a] border border-[#1a1a1a] mb-5 flex items-center justify-center">
                    <img src="/logo-icon.png" alt="SF" className="w-16 h-16 opacity-20 object-contain" />
                  </div>
                  <p className="luxury-meta mb-2">Shamim Forever</p>
                  <div className="h-4 w-48 bg-[#1a1a1a] mb-3" />
                  <div className="h-3 w-32 bg-[#1a1a1a]" />
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center md:hidden">
            <Link href="/shop" className="luxury-btn text-[9px]">View All</Link>
          </div>
        </section>

        {/* CONCIERGE CTA */}
        <section className="py-28 md:py-40 px-6 md:px-12 lg:px-20">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="luxury-meta mb-6 md:mb-8">Private Access</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8 md:mb-10 leading-tight">
              The Inner Circle<br />
              <span className="italic text-[#c9a054]">Awaits You.</span>
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed mb-12 md:mb-16 max-w-lg mx-auto">
              Gain sovereign access to limited editions, private viewings, and bespoke concierge services.
              Membership is by invitation or application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/inner-circle" className="luxury-btn text-[9px]">
                Request Sovereign Access
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    )
  }
  