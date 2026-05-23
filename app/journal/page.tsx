'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface JournalPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  category: string | null
  published: boolean
  created_at: string
}

const ease = [0.16, 1, 0.3, 1] as const

const ARTICLES: JournalPost[] = [
  {
    id: '1',
    title: 'The Architecture of Scent: Why Structure Precedes Soul',
    slug: 'architecture-of-scent',
    excerpt: 'Before fragrance can move emotion, it must first master restraint. At the House, composition begins not with excess — but with silence, structure, and absolute discipline.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1600&q=90&fit=crop',
    category: 'CRAFT',
    published: true,
    created_at: '2025-05-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Sovereign Materials: A Journey from Khyber to Grasse',
    slug: 'sovereign-materials',
    excerpt: 'Our master perfumer traces the ancient trade routes that supply the House with its rarest ingredients — from Khyber passes to the flowering fields of southern France.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90&fit=crop',
    category: 'HERITAGE',
    published: true,
    created_at: '2025-04-15T00:00:00Z',
  },
  {
    id: '3',
    title: 'OKBOND: Redefining Luxury Currency in the Digital Age',
    slug: 'okbond-digital-sovereignty',
    excerpt: 'When we created OKBOND, we were not building a loyalty program. We were building a new form of sovereignty — digital infrastructure that commands permanence.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=90&fit=crop',
    category: 'INNOVATION',
    published: true,
    created_at: '2025-04-01T00:00:00Z',
  },
  {
    id: '4',
    title: 'The Psychology of Prestige',
    slug: 'psychology-of-prestige',
    excerpt: 'Prestige is not manufactured. It accumulates slowly, over decades of uncompromising decisions — each one invisible to the market, and yet collectively definitive.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1600&q=90&fit=crop',
    category: 'SOVEREIGNTY',
    published: true,
    created_at: '2025-03-15T00:00:00Z',
  },
  {
    id: '5',
    title: 'Why Silence Is the New Luxury',
    slug: 'silence-new-luxury',
    excerpt: 'In a world of maximum noise, silence has become the ultimate status signal. The House has always known this. Every product begins as an act of deliberate restraint.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90&fit=crop',
    category: 'CULTURE',
    published: true,
    created_at: '2025-03-01T00:00:00Z',
  },
  {
    id: '6',
    title: 'The Future of Sovereign Commerce',
    slug: 'future-sovereign-commerce',
    excerpt: 'The next decade of luxury will not be won by those with the largest catalogues. It will be won by those with the deepest systems — and the courage to build independently.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=90&fit=crop',
    category: 'DIGITAL LUXURY',
    published: true,
    created_at: '2025-02-15T00:00:00Z',
  },
]

export default function JournalPage() {
  const [posts, setPosts] = useState<JournalPost[]>(ARTICLES)

  useEffect(() => {
    supabase
      .from('journal_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setPosts(data)
      })
      
  }, [])

  const [featured, ...rest] = posts.length > 0 ? posts : ARTICLES
  const second = rest[0] ?? ARTICLES[1]
  const third = rest[1] ?? ARTICLES[2]
  const fourth = rest[2] ?? ARTICLES[3]
  const fifth = rest[3] ?? ARTICLES[4]
  const sixth = rest[4] ?? ARTICLES[5]

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ─────────────────────────────────────────
          HERO: Split — Title Left / Image Right
      ───────────────────────────────────────── */}
      <section className="pt-20 min-h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* Left: Typography */}
        <div className="flex flex-col justify-end pb-16 px-8 md:px-14 lg:px-20 py-20 lg:py-0 border-r border-[#111]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease }}
          >
            <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-10">
              Est. 2025
            </p>
            <h1 className="font-serif font-light tracking-[0.18em] uppercase text-zinc-100 text-6xl md:text-7xl xl:text-8xl leading-[0.95] mb-10">
              House<br />Dispatches
            </h1>
            <div className="w-16 h-px bg-[#c9a054]/50 mb-10" />
            <p className="text-zinc-500 font-light text-sm leading-[2] max-w-sm tracking-wide">
              Thoughts on luxury, structure, culture,<br />
              identity, and sovereign systems.
            </p>

            <div className="mt-20 flex items-center gap-6">
              <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Shamim Forever Archive</span>
              <div className="flex-1 h-px bg-[#111]" />
              <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">
                {posts.length} Dispatches
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: Cinematic image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease }}
          className="relative overflow-hidden min-h-[55vh] lg:min-h-0"
        >
          <img
            src={featured.cover_image ?? ARTICLES[0].cover_image!}
            alt="Journal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/20 to-[#050505]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054]/70">
              Est. 2025 &bull; Shamim Forever Archive
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────
          FEATURED: Dominant First Article
      ───────────────────────────────────────── */}
      <section className="border-t border-[#111] py-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        >
          <Link href={`/journal/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-[55%_45%]">

            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[680px]">
              <img
                src={featured.cover_image ?? ARTICLES[0].cover_image!}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/40" />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center border-l border-[#111] px-10 md:px-16 py-16 lg:py-0">
              <div className="flex items-center gap-5 mb-10">
                <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">{featured.category}</span>
                <div className="w-6 h-px bg-[#c9a054]/25" />
                <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">
                  {new Date(featured.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>

              <p className="text-[9px] tracking-[0.35em] uppercase text-zinc-700 mb-5">Featured Dispatch</p>

              <h2 className="font-serif font-light text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-[0.06em] text-zinc-100 mb-10 group-hover:text-[#c9a054]/80 transition-colors duration-700">
                {featured.title}
              </h2>

              <p className="text-zinc-500 font-light leading-[1.9] text-[15px] max-w-md mb-14">
                {featured.excerpt}
              </p>

              {/* CTA: no button box */}
              <div className="flex items-center gap-3">
                <span className="relative text-[9px] tracking-[0.45em] uppercase text-[#c9a054] group-hover:text-zinc-100 transition-colors duration-500">
                  Read Dispatch
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a054] group-hover:w-full transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                </span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="text-[#c9a054] text-[11px]"
                >
                  →
                </motion.span>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────
          EDITORIAL GRID — Masonry-style
      ───────────────────────────────────────── */}
      <section className="border-t border-[#111]">

        {/* Row 1: Large (60%) + Two stacked (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] border-b border-[#111]">

          {/* Large left article */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="border-r border-[#111]"
          >
            <Link href={`/journal/${second.slug}`} className="group block h-full">
              <div className="relative overflow-hidden aspect-[3/2]">
                <img
                  src={second.cover_image ?? ARTICLES[1].cover_image!}
                  alt={second.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[2000ms]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-[#050505]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054] group-hover:text-[#c9a054] block mb-4">
                    {second.category}
                  </span>
                  <h3 className="font-serif font-light text-2xl md:text-3xl xl:text-4xl tracking-[0.08em] text-zinc-100 leading-[1.15] group-hover:translate-y-[-2px] transition-transform duration-500 max-w-lg">
                    {second.title}
                  </h3>
                </div>
              </div>
              <div className="px-8 md:px-10 py-8 border-t border-[#111]">
                <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-lg">
                  {second.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-0 h-px bg-[#c9a054] group-hover:w-8 transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                  <span className="text-[9px] tracking-[0.4em] uppercase text-[#c9a054]">Read Dispatch</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right: Two stacked */}
          <div className="flex flex-col">
            {[third, fourth].map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.12, ease }}
                className={i === 0 ? 'border-b border-[#111] flex-1' : 'flex-1'}
              >
                <Link href={`/journal/${post.slug}`} className="group block h-full flex flex-col">
                  <div className="relative overflow-hidden flex-1" style={{ minHeight: '200px' }}>
                    <img
                      src={post.cover_image ?? ARTICLES[i + 2].cover_image!}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[2000ms]"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)', position: 'absolute', inset: 0 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/30 to-transparent" />
                  </div>
                  <div className="px-7 py-7 border-t border-[#111]">
                    <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054] block mb-3 group-hover:text-[#c9a054]">
                      {post.category}
                    </span>
                    <h3 className="font-serif font-light text-xl md:text-2xl tracking-[0.06em] text-zinc-100 leading-[1.2] group-hover:translate-y-[-2px] transition-transform duration-500">
                      {post.title}
                    </h3>
                    <div className="mt-5 h-px w-0 bg-[#c9a054]/40 group-hover:w-full transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Row 2: Ultra-wide cinematic feature */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="border-b border-[#111]"
        >
          <Link href={`/journal/${fifth.slug}`} className="group relative block h-[60vh] overflow-hidden">
            <img
              src={fifth.cover_image ?? ARTICLES[4].cover_image!}
              alt={fifth.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[2500ms]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-[#050505]/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20">
              <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054] mb-6 block">
                {fifth.category}
              </span>
              <h2 className="font-serif font-light text-3xl md:text-5xl xl:text-6xl tracking-[0.08em] text-zinc-100 max-w-2xl leading-[1.1] mb-8 group-hover:text-[#c9a054]/80 transition-colors duration-700">
                {fifth.title}
              </h2>
              <p className="text-zinc-400 font-light text-sm leading-relaxed max-w-lg mb-10">
                {fifth.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-[#c9a054]/50 group-hover:w-16 transition-all duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Enter Dispatch →</span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Row 3: Text-left, image-right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        >
          <Link href={`/journal/${sixth.slug}`} className="group grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center px-10 md:px-16 py-16 border-r border-[#111] order-2 lg:order-1">
              <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054] mb-6 block">{sixth.category}</span>
              <p className="text-[9px] tracking-[0.35em] uppercase text-zinc-700 mb-4">Dispatch 06</p>
              <h3 className="font-serif font-light text-3xl md:text-5xl tracking-[0.07em] text-zinc-100 leading-[1.1] mb-8 group-hover:text-[#c9a054]/80 transition-colors duration-700">
                {sixth.title}
              </h3>
              <p className="text-zinc-500 font-light text-[15px] leading-[1.9] max-w-md mb-12">
                {sixth.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <span className="relative text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">
                  Enter Dispatch
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a054] group-hover:w-full transition-all duration-700" />
                </span>
                <span className="text-[#c9a054] text-xs">→</span>
              </div>
            </div>
            <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto order-1 lg:order-2">
              <img
                src={sixth.cover_image ?? ARTICLES[5].cover_image!}
                alt={sixth.title}
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[2000ms]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
              />
              <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent transition-colors duration-700" />
            </div>
          </Link>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────
          MANIFESTO STRIP
      ───────────────────────────────────────── */}
      <section className="border-t border-[#111] py-28 md:py-40 px-8 md:px-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#c9a054]/3 via-transparent to-[#c9a054]/3" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="relative z-10"
        >
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-[#c9a054]/40 mx-auto mb-14" />
          <blockquote className="font-serif font-light text-3xl md:text-5xl lg:text-6xl text-zinc-100 tracking-[0.08em] leading-[1.25] max-w-4xl mx-auto">
            "Luxury should not chase attention.<br />
            It should command permanence."
          </blockquote>
          <div className="mt-14 flex items-center justify-center gap-6">
            <div className="w-12 h-px bg-[#c9a054]/30" />
            <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">House of Shamim Forever</span>
            <div className="w-12 h-px bg-[#c9a054]/30" />
          </div>
          <div className="w-px h-14 bg-gradient-to-t from-transparent to-[#c9a054]/40 mx-auto mt-14" />
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────
          ARCHIVE FOOTER
      ───────────────────────────────────────── */}
      <section className="border-t border-[#111] px-8 md:px-14 lg:px-20 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-16"
        >
          <div>
            <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-700 mb-8">Publication Archive</p>
            <h2 className="font-serif font-light text-4xl md:text-6xl tracking-[0.12em] text-zinc-100 mb-8">
              The Archive<br />Continues.
            </h2>
            <p className="text-zinc-600 font-light text-sm leading-[2] max-w-sm">
              Inside the House of Shamim Forever,<br />
              every creation begins as a thought.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-8">
            <div className="grid grid-cols-3 gap-8 text-center md:text-right mb-4">
              {[['2025', '6 Dispatches'], ['2026', 'Coming Soon'], ['Archive', 'Full Index']].map(([year, label]) => (
                <div key={year}>
                  <p className="font-serif text-2xl font-light text-zinc-300 tracking-wide">{year}</p>
                  <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 mt-1">{label}</p>
                </div>
              ))}
            </div>
            <Link
              href={`/journal/${featured.slug}`}
              className="group flex items-center gap-4"
            >
              <span className="relative text-[9px] tracking-[0.5em] uppercase text-[#c9a054] group-hover:text-zinc-100 transition-colors duration-500">
                Enter the Next Dispatch
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a054] group-hover:w-full transition-all duration-700" />
              </span>
              <span className="text-[#c9a054] text-xs">→</span>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
