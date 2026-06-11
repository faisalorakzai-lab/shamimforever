'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as const

const MAIN_CATEGORIES = [
  {
    id: 'perfumes',
    label: 'Perfumes',
    icon: '◈',
    tagline: 'Fragrances',
    description: 'Sovereign compositions built on restraint, heritage, and olfactory architecture — from the Khyber passes to the fields of Grasse.',
    image: '/collections/perfume-collection.png',
    href: '/shop?category=perfume',
    subs: [
      {
        label: 'For Her',
        items: ['Floral & Sweet', 'Fruity & Fresh'],
        image: '/collections/perfume-her.png',
        desc: 'Premium rose, jasmine, vanilla, and light playful day-wear.',
        href: '/shop?category=perfume&gender=her',
      },
      {
        label: 'For Him',
        items: ['Oud, Leather & Musk', 'Woody & Spicy'],
        image: '/collections/perfume-him.png',
        desc: 'Heavy masculine fragrances — professional, evening, and sovereign.',
        href: '/shop?category=perfume&gender=him',
      },
      {
        label: 'Unisex',
        items: ['Signature Blends'],
        image: '/collections/perfume-unisex.png',
        desc: 'Premium compositions that transcend — sovereign for all.',
        href: '/shop?category=perfume&gender=unisex',
      },
    ],
  },
  {
    id: 'cosmetics',
    label: 'Cosmetics',
    icon: '◇',
    tagline: '& Grooming',
    description: 'Precision beauty systems and premium grooming — crafted for those who understand that presentation is the first act of sovereignty.',
    image: '/collections/cosmetics-collection.png',
    href: '/shop?category=cosmetics',
    subs: [
      {
        label: 'For Her',
        items: ['Lip Luxury', 'Face & Glow', 'Eye Collection'],
        image: '/collections/cosmetics-her.png',
        desc: 'Precision beauty systems for the sovereign woman.',
        href: '/shop?category=cosmetics&gender=her',
      },
      {
        label: 'For Him',
        items: ['Beard Care', 'Skincare'],
        image: '/collections/cosmetics-him.png',
        desc: 'Premium grooming for the sovereign man.',
        href: '/shop?category=cosmetics&gender=him',
      },
    ],
  },
  {
    id: 'jewelry',
    label: 'Jewelry',
    icon: '◆',
    tagline: '& Accessories',
    description: 'Sovereign adornments — each piece a chapter in the larger story of your identity, crafted for those who wear meaning.',
    image: '/collections/jewelry-collection.png',
    href: '/shop?category=jewelry',
    subs: [
      {
        label: 'For Her',
        items: ['Bridal & Statement', 'Minimalist & Daily', 'Rings & Bracelets'],
        image: '/collections/jewelry-her.png',
        desc: 'Timeless adornments for the sovereign woman.',
        href: '/shop?category=jewelry&gender=her',
      },
      {
        label: 'For Him',
        items: ['Rings & Bands', 'Cuffs & Bracelets', 'Cufflinks'],
        image: '/collections/jewelry-him.png',
        desc: 'Sovereign accessories for the modern patriarch.',
        href: '/shop?category=jewelry&gender=him',
      },
    ],
  },
]

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const active = MAIN_CATEGORIES.find(c => c.id === activeCategory)

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="pt-20 relative overflow-hidden border-b border-[#111]">
        <div className="relative h-[45vw] md:h-[45vh] max-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={(active?.id ?? 'default') + 'bg'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
              className="absolute inset-0"
            >
              <img
                src={active?.image ?? '/collections/banner-her.png'}
                alt="Collections"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.22) contrast(1.05)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 h-full flex flex-col justify-end pb-8 md:pb-14 px-5 md:px-12 lg:px-20">
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
              className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-3 md:mb-4"
            >
              House of Shamim Forever
            </motion.p>
            <AnimatePresence mode="wait">
              <motion.h1
                key={active?.label ?? 'Collections'}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="font-serif font-light text-4xl md:text-6xl lg:text-7xl tracking-[0.1em] text-zinc-100 leading-none"
              >
                {active?.label ?? 'Collections'}
              </motion.h1>
            </AnimatePresence>
            {active?.tagline && (
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-600 mt-3">{active.tagline}</p>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex overflow-x-auto scrollbar-none bg-[#050505]/95 border-t border-[#111]">
          <button
            onClick={() => setActiveCategory(null)}
            className={'flex-shrink-0 px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.4em] uppercase transition-all duration-500 border-b-2 border-r border-r-[#111] whitespace-nowrap ' + (!activeCategory ? 'text-[#c9a054] border-[#c9a054]' : 'text-zinc-600 border-transparent hover:text-zinc-300')}
          >
            All
          </button>
          {MAIN_CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={'flex-shrink-0 px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.4em] uppercase transition-all duration-500 border-b-2 whitespace-nowrap ' + (activeCategory === cat.id ? 'text-[#c9a054] border-[#c9a054]' : 'text-zinc-600 border-transparent hover:text-zinc-300') + (i < MAIN_CATEGORIES.length - 1 ? ' border-r border-r-[#111]' : '')}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ─── COLLECTION GRID ─── */}
      <section className="px-5 md:px-12 lg:px-20 py-16 md:py-24">
        <AnimatePresence mode="wait">
          {!activeCategory ? (
            <motion.div
              key="all"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Main category cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {MAIN_CATEGORIES.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease }}
                    onClick={() => setActiveCategory(cat.id)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden mb-6">
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[2000ms]"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)', filter: 'brightness(0.7)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] mb-2">{cat.tagline}</p>
                        <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.15em] text-zinc-100">{cat.label}</h2>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="text-[7px] tracking-[0.4em] uppercase text-zinc-500 bg-[#050505]/70 px-3 py-1.5">
                          {cat.subs.length} Collections
                        </span>
                      </div>
                    </div>
                    <p className="text-zinc-600 font-light leading-[1.8] text-xs mb-6">{cat.description}</p>
                    <Link
                      href={cat.href}
                      className="text-[8px] tracking-[0.45em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors duration-400"
                    >
                      Explore Collection →
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {active && (
                <>
                  <div className="mb-12 md:mb-16">
                    <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-3">{active.tagline}</p>
                    <p className="text-zinc-600 font-light leading-[2] text-sm max-w-xl">{active.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {active.subs.map((sub, i) => (
                      <motion.div
                        key={sub.label}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8, ease }}
                        className="group"
                      >
                        <Link href={sub.href}>
                          <div className="relative aspect-[3/4] overflow-hidden mb-6">
                            <img
                              src={sub.image}
                              alt={sub.label}
                              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[2000ms]"
                              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)', filter: 'brightness(0.6)' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6">
                              <h3 className="font-serif font-light text-xl tracking-[0.15em] text-zinc-100">{sub.label}</h3>
                            </div>
                          </div>
                          <p className="text-zinc-600 font-light leading-[1.8] text-xs mb-4">{sub.desc}</p>
                          <div className="flex flex-wrap gap-2 mb-5">
                            {sub.items.map(item => (
                              <span key={item} className="text-[7px] tracking-[0.3em] uppercase text-zinc-700 border border-[#1a1a1a] px-3 py-1.5">{item}</span>
                            ))}
                          </div>
                          <span className="text-[8px] tracking-[0.45em] uppercase text-[#c9a054] group-hover:text-zinc-100 transition-colors duration-400">
                            Shop {sub.label} →
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-16 text-center">
                    <Link
                      href={active.href}
                      className="inline-block text-[9px] tracking-[0.5em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-12 py-4 hover:bg-[#c9a054]/10 transition-all duration-500"
                    >
                      View All {active.label}
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
