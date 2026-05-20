'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Product, Collection } from '@/types'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

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
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#050505]"
        />

        {/* Decorative lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a054]/10 to-transparent" />
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a054]/10 to-transparent" />
          <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#c9a054]/5 to-transparent" />
          <div className="absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#c9a054]/5 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="luxury-meta mb-8"
          >
            Sovereign Luxury — Est. 2025
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-[9rem] font-light tracking-[0.15em] uppercase text-zinc-100 leading-none mb-8"
          >
            Shamim
            <br />
            <span className="italic text-[#c9a054]">Forever</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="text-zinc-500 font-light text-sm tracking-[0.2em] uppercase mb-16 max-w-md mx-auto"
          >
            Where fragrance meets sovereignty. Each bottle, a declaration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/shop" className="luxury-btn text-[9px]">
              Enter the House
            </Link>
            <Link
              href="/atelier"
              className="text-[9px] tracking-[0.4em] uppercase text-zinc-500 hover:text-[#c9a054] transition-colors duration-500"
            >
              Discover Our Craft
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="luxury-meta">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent"
          />
        </motion.div>
      </section>

      {/* FRAGRANCE EXPERIENCE */}
      <section className="py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeUp}>
            <p className="luxury-meta mb-8">The Experience</p>
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-10 leading-tight">
              Not a scent.<br />
              <span className="italic text-[#c9a054]">A presence.</span>
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed mb-10 max-w-md">
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
            className="relative aspect-[3/4] bg-[#0a0a0a] border border-[#1a1a1a]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="font-serif text-8xl font-light text-[#c9a054]/10 tracking-[0.3em]">SF</p>
                <p className="luxury-meta mt-4">Since 2025</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#050505] to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* PRESTIGE NUMBERS */}
      <section className="py-20 border-y border-[#1a1a1a]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
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
                className="text-center py-16 border-r border-[#1a1a1a] last:border-r-0"
              >
                <p className="font-serif text-5xl md:text-6xl font-light text-[#c9a054] mb-3">{stat.value}</p>
                <p className="luxury-meta">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIGITAL AUTHENTICITY */}
      <section className="py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-20">
          <p className="luxury-meta mb-6">Sovereign Technology</p>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-zinc-100 max-w-3xl mx-auto leading-tight">
            Digital Authenticity. Physical Prestige.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a]">
          {[
            {
              title: 'Blockchain Verified',
              desc: 'Each creation carries a unique cryptographic signature — immutable proof of authenticity and provenance.',
              icon: '◈',
            },
            {
              title: 'Sovereign Vault',
              desc: 'Members of the Inner Circle gain access to exclusive drops, private viewings, and bespoke commissions.',
              icon: '◆',
            },
            {
              title: 'OKBOND Protocol',
              desc: 'Our proprietary loyalty currency. Pay with OKBOND and receive an automatic 10% sovereign discount.',
              icon: '⬡',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#050505] p-12 group hover:bg-[#0a0a0a] transition-colors duration-700"
            >
              <p className="text-[#c9a054] text-2xl mb-8">{item.icon}</p>
              <h3 className="font-serif text-xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-6">
                {item.title}
              </h3>
              <p className="text-zinc-500 font-light leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-16">
          <div>
            <p className="luxury-meta mb-4">Featured</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-[0.2em] uppercase text-zinc-100">
              The Sovereign Edit
            </h2>
          </div>
          <Link href="/shop" className="hidden md:block text-[9px] tracking-[0.4em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors duration-500">
            View All →
          </Link>
        </motion.div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                  <div className="aspect-[3/4] bg-[#0a0a0a] border border-[#1a1a1a] mb-6 overflow-hidden relative">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="font-serif text-6xl text-[#c9a054]/10">SF</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <p className="luxury-meta mb-2">Shamim Forever</p>
                  <h3 className="font-serif text-xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-3 group-hover:text-[#c9a054] transition-colors duration-500">
                    {product.name}
                  </h3>
                  <p className="text-zinc-400 text-sm font-light">
                    PKR {product.price_pkr?.toLocaleString()} · ${product.price_usd} USD
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="opacity-30"
              >
                <div className="aspect-[3/4] bg-[#0a0a0a] border border-[#1a1a1a] mb-6 flex items-center justify-center">
                  <p className="font-serif text-6xl text-[#c9a054]/20">SF</p>
                </div>
                <p className="luxury-meta mb-2">Shamim Forever</p>
                <div className="h-4 w-48 bg-[#1a1a1a] mb-3" />
                <div className="h-3 w-32 bg-[#1a1a1a]" />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CONCIERGE CTA */}
      <section className="py-40 px-6 md:px-12 lg:px-20">
        <motion.div
          {...fadeUp}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="luxury-meta mb-8">Private Access</p>
          <h2 className="font-serif text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-10 leading-tight">
            The Inner Circle<br />
            <span className="italic text-[#c9a054]">Awaits You.</span>
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-16 max-w-lg mx-auto">
            Gain sovereign access to limited editions, private viewings, and bespoke concierge services. 
            Membership is by invitation or application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inner-circle" className="luxury-btn text-[9px]">
              Request Sovereign Access
            </Link>
            <Link href="/boutiques" className="luxury-btn text-[9px]">
              Visit a Boutique
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
