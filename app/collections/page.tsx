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
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=90&fit=crop',
    href: '/shop?category=perfume',
    subs: [
      {
        label: 'For Him',
        items: ['Oud, Leather & Musk', 'Woody & Spicy'],
        image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=800&q=85&fit=crop',
        desc: 'Heavy masculine fragrances — professional, evening, and sovereign.',
        href: '/shop?category=perfume&gender=him',
      },
      {
        label: 'For Her',
        items: ['Floral & Sweet', 'Fruity & Fresh'],
        image: 'https://images.unsplash.com/photo-1594913122591-cf88db26b2f5?w=800&q=85&fit=crop',
        desc: 'Premium rose, jasmine, vanilla, and light playful day-wear.',
        href: '/shop?category=perfume&gender=her',
      },
      {
        label: 'Unisex',
        items: ['Signature Blends'],
        image: 'https://images.unsplash.com/photo-1590156206657-aec4e8f3c86a?w=800&q=85&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=90&fit=crop',
    href: '/shop?category=cosmetics',
    subs: [
      {
        label: 'For Her',
        items: ['Premium Lip Luxury', 'Face & Glow', 'Eye Collection'],
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=85&fit=crop',
        desc: 'Lipsticks, lip oils, foundations, highlighters, palettes, liners, mascara.',
        href: '/shop?category=cosmetics&gender=her',
      },
      {
        label: 'For Him',
        items: ['Beard & Mustache Care', 'Luxury Skincare'],
        image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=85&fit=crop',
        desc: 'Premium beard oils, balms, waxes, serums, and anti-fatigue creams.',
        href: '/shop?category=cosmetics&gender=him',
      },
    ],
  },
  {
    id: 'jewelry',
    label: 'Jewelry',
    icon: '◆',
    tagline: 'Fine Adornment',
    description: '925 sterling silver and precision-crafted luxury pieces — each one a statement of restraint, identity, and permanent elegance.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90&fit=crop',
    href: '/shop?category=jewelry',
    subs: [
      {
        label: 'For Her',
        items: ['Bridal & Statement', 'Minimalist & Daily Luxe', 'Rings & Bracelets'],
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=85&fit=crop',
        desc: 'Heavy bridal sets, sleek daily necklaces, elegant rings, diamond bracelets.',
        href: '/shop?category=jewelry&gender=her',
      },
      {
        label: 'For Him',
        items: ['Rings & Bands', 'Luxury Cuffs & Bracelets', 'Cufflinks & Lapel Pins'],
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85&fit=crop',
        desc: 'Platinum, gold, black matte bands, solid cuffs, premium sherwani accessories.',
        href: '/shop?category=jewelry&gender=him',
      },
    ],
  },
]

export default function CollectionsPage() {
  const [active, setActive] = useState('perfumes')
  const current = MAIN_CATEGORIES.find(c => c.id === active) ?? MAIN_CATEGORIES[0]

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="pt-20 relative overflow-hidden">
        <div className="relative min-h-[55vw] md:min-h-[45vh] max-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease }}
              className="absolute inset-0"
            >
              <img
                src={current.image}
                alt={current.label}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.35) contrast(1.1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 flex flex-col justify-end h-full pb-0 px-5 md:px-12 lg:px-20 pt-10 md:pt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={active + 'text'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-3 md:mb-5">
                  House Collection
                </p>
                <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] text-zinc-100 leading-[0.95] mb-2">
                  {current.label}
                </h1>
                <p className="font-serif italic text-zinc-500 text-lg md:text-2xl tracking-wide mb-4 md:mb-6">
                  {current.tagline}
                </p>
                <p className="text-zinc-500 font-light text-xs md:text-sm leading-relaxed max-w-xs md:max-w-md">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Category Tabs — mobile horizontal scroll */}
        <div className="border-y border-[#111] bg-[#050505]/95 backdrop-blur-md">
          <div className="flex overflow-x-auto scrollbar-none">
            {MAIN_CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex-shrink-0 px-6 md:px-10 py-5 text-[9px] md:text-[10px] tracking-[0.45em] uppercase transition-all duration-500 border-b-2 whitespace-nowrap relative ${
                  active === cat.id
                    ? 'text-[#c9a054] border-[#c9a054]'
                    : 'text-zinc-600 border-transparent hover:text-zinc-300'
                } ${i < MAIN_CATEGORIES.length - 1 ? 'border-r border-r-[#111]' : ''}`}
              >
                <span className="mr-2 text-[10px]">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
            <Link
              href="/shop"
              className="flex-shrink-0 ml-auto px-6 md:px-10 py-5 text-[9px] tracking-[0.45em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500 whitespace-nowrap border-l border-[#111]"
            >
              Shop All →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SUB-CATEGORIES ─── */}
      <section className="py-10 md:py-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active + 'subs'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            {current.subs.map((sub, idx) => {
              const isImageRight = idx % 2 === 1
              return (
                <div
                  key={sub.label}
                  className="border-b border-[#111]"
                >
                  <Link href={sub.href} className="group grid grid-cols-1 md:grid-cols-2">

                    {/* Image */}
                    <div className={`relative overflow-hidden ${isImageRight ? 'md:order-2' : 'md:order-1'} aspect-[16/10] md:aspect-auto md:min-h-[360px]`}>
                      <img
                        src={sub.image}
                        alt={sub.label}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[2000ms]"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)', filter: 'brightness(0.6) contrast(1.1)' }}
                      />
                      <div className={`absolute inset-0 ${isImageRight
                        ? 'bg-gradient-to-r from-[#050505]/70 via-[#050505]/20 to-transparent'
                        : 'bg-gradient-to-l from-[#050505]/70 via-[#050505]/20 to-transparent'
                      }`} />
                    </div>

                    {/* Text */}
                    <div className={`flex flex-col justify-center px-5 py-8 md:px-10 lg:px-14 md:py-0 ${
                      isImageRight ? 'md:order-1 md:border-r border-[#111]' : 'md:order-2 md:border-l border-[#111]'
                    }`}>
                      <div className="flex items-center gap-3 mb-5 md:mb-7">
                        <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">
                          {current.label}
                        </span>
                        <div className="w-4 h-px bg-[#c9a054]/30" />
                        <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">
                          {sub.label}
                        </span>
                      </div>

                      <h2 className="font-serif font-light text-3xl md:text-4xl lg:text-5xl tracking-[0.08em] text-zinc-100 leading-[1.1] mb-5 md:mb-7 group-hover:text-[#c9a054]/80 transition-colors duration-700">
                        {sub.label}
                      </h2>

                      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-6 md:mb-8 max-w-xs">
                        {sub.desc}
                      </p>

                      {/* Sub-items */}
                      <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                        {sub.items.map(item => (
                          <span
                            key={item}
                            className="text-[8px] tracking-[0.35em] uppercase text-zinc-600 border border-[#1a1a1a] px-3 py-2"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-0 h-px bg-[#c9a054] group-hover:w-8 transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                        <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">
                          Explore {sub.label} →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ─── ALL COLLECTIONS CTA ─── */}
      <section className="border-t border-[#111] py-16 md:py-24 px-5 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
        >
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-700 mb-5">The House</p>
            <h2 className="font-serif font-light text-4xl md:text-6xl tracking-[0.08em] text-zinc-100 leading-[1.05] mb-5">
              Three Universes.<br />
              <span className="italic text-zinc-400">One House.</span>
            </h2>
            <p className="text-zinc-600 font-light text-sm leading-relaxed max-w-sm">
              Every category is built with the same philosophy:<br />
              sovereign craft, no compromise, permanent quality.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden transition-all duration-700 min-w-[200px] text-center"
            >
              <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                Enter the Shop
              </span>
            </Link>
            <Link
              href="/journal"
              className="text-[9px] tracking-[0.45em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500 text-center"
            >
              Read the Journal →
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
