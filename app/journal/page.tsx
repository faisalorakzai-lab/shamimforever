'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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

const PLACEHOLDER_POSTS: JournalPost[] = [
  {
    id: '1',
    title: 'The Architecture of Scent',
    slug: 'architecture-of-scent',
    excerpt: 'Before fragrance can move emotion, it must first master restraint. At the House of Shamim Forever, composition begins not with excess — but with silence, structure, and balance.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1400&q=90&fit=crop',
    category: 'CRAFT',
    published: true,
    created_at: '2025-05-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Sovereign Materials',
    slug: 'sovereign-materials',
    excerpt: 'Our master perfumer traces the ancient trade routes — from the Khyber passes to the flowering fields of Grasse — that now supply the House with its rarest and most irreplaceable ingredients.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90&fit=crop',
    category: 'HERITAGE',
    published: true,
    created_at: '2025-04-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'OKBOND: Digital Sovereignty',
    slug: 'okbond-digital-sovereignty',
    excerpt: 'When we created OKBOND, we were not building a loyalty program. We were building a new form of sovereign currency — a declaration that luxury, in the digital age, must also command permanence.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=90&fit=crop',
    category: 'INNOVATION',
    published: true,
    created_at: '2025-03-01T00:00:00Z',
  },
]

const ARCHIVE_YEARS = ['2025', '2026', 'Future Dispatches']
const ARCHIVE_FILTERS = ['All', 'Craft', 'Heritage', 'Innovation', 'Culture', 'Sovereignty']

const easing = [0.16, 1, 0.3, 1]

export default function JournalPage() {
  const [posts, setPosts] = useState<JournalPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeYear, setActiveYear] = useState('2025')
  const [activeFilter, setActiveFilter] = useState('All')
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    supabase
      .from('journal_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPosts(data && data.length > 0 ? data : PLACEHOLDER_POSTS)
        setLoading(false)
      })
      .catch(() => {
        setPosts(PLACEHOLDER_POSTS)
        setLoading(false)
      })
  }, [])

  const featured = posts[0] ?? PLACEHOLDER_POSTS[0]
  const editorialPosts = posts.length > 1 ? posts.slice(1) : PLACEHOLDER_POSTS.slice(1)

  const filteredPosts = activeFilter === 'All'
    ? editorialPosts
    : editorialPosts.filter(p => p.category?.toLowerCase() === activeFilter.toLowerCase())

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ─── SECTION 1: CINEMATIC HERO ─── */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=85&fit=crop)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/40 to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/50" />
        </motion.div>

        {/* Ambient gold glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a054]/5 blur-[120px] pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 flex flex-col items-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: easing }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#c9a054] mb-10"
          >
            House Dispatches
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: easing }}
            className="font-serif font-light tracking-[0.15em] text-7xl md:text-9xl leading-[0.9] text-zinc-100 mb-10"
          >
            Journal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: easing }}
            className="text-zinc-400 font-light max-w-md leading-relaxed text-sm tracking-wide"
          >
            Thoughts on craftsmanship, culture, sovereignty,<br />
            and the architecture of timeless luxury.
          </motion.p>

          {/* Animated gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 1.1, ease: easing }}
            className="mt-16 h-px w-32 bg-gradient-to-r from-transparent via-[#c9a054] to-transparent origin-center"
          />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-600">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-[#c9a054]/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ─── SECTION 2: FEATURED DISPATCH ─── */}
      {!loading && featured && (
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easing }}
            className="mb-16 flex items-center gap-6"
          >
            <span className="luxury-meta">Featured Dispatch</span>
            <div className="flex-1 h-px bg-[#1a1a1a]" />
            <span className="luxury-meta text-zinc-700">No. 001</span>
          </motion.div>

          <Link href={`/journal/${featured.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: easing }}
                className="relative overflow-hidden aspect-[4/5] lg:aspect-auto lg:min-h-[700px]"
              >
                <img
                  src={featured.cover_image ?? 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1400&q=90&fit=crop'}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/30" />
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.15, ease: easing }}
                className="flex flex-col justify-center px-0 lg:pl-20 pt-14 lg:pt-0"
              >
                <div className="flex items-center gap-4 mb-10">
                  <span className="luxury-meta">{featured.category ?? 'CRAFT'}</span>
                  <div className="w-8 h-px bg-[#c9a054]/30" />
                  <span className="luxury-meta text-zinc-600">
                    {new Date(featured.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>

                <h2 className="font-serif font-light tracking-[0.1em] text-5xl lg:text-7xl text-zinc-100 leading-[1.05] mb-10 group-hover:text-[#c9a054]/90 transition-colors duration-700">
                  {featured.title}
                </h2>

                <p className="text-zinc-400 font-light leading-[1.9] max-w-md mb-14 text-base">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-4">
                  <span className="text-[9px] tracking-[0.4em] uppercase text-[#c9a054] border-b border-[#c9a054]/30 pb-1 group-hover:border-[#c9a054] transition-colors duration-500">
                    Enter Dispatch
                  </span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="text-[#c9a054] text-xs"
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </Link>
        </section>
      )}

      {/* ─── SECTION 3: EDITORIAL ARTICLE FLOW ─── */}
      {!loading && (
        <section className="py-20 md:py-32">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easing }}
              className="flex items-center gap-6"
            >
              <span className="luxury-meta">Editorial Archive</span>
              <div className="flex-1 h-px bg-[#1a1a1a]" />
            </motion.div>
          </div>

          <div className="space-y-0">
            {(filteredPosts.length > 0 ? filteredPosts : PLACEHOLDER_POSTS.slice(1)).map((post, i) => {
              const isFullWidth = i === 2
              const isImageRight = i % 2 === 1

              if (isFullWidth) {
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: easing }}
                    className="relative h-[70vh] overflow-hidden group"
                  >
                    <Link href={`/journal/${post.slug}`} className="block h-full">
                      <img
                        src={post.cover_image ?? 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=90&fit=crop'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[2000ms] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/30 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20">
                        <div className="max-w-[1600px] mx-auto">
                          <span className="luxury-meta mb-6 block">{post.category}</span>
                          <h2 className="font-serif font-light tracking-[0.12em] text-4xl md:text-6xl text-zinc-100 leading-tight max-w-3xl mb-8 group-hover:text-[#c9a054]/90 transition-colors duration-700">
                            {post.title}
                          </h2>
                          <span className="text-[9px] tracking-[0.4em] uppercase text-[#c9a054]">
                            Enter Dispatch →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              }

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: easing }}
                  className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28"
                >
                  <Link href={`/journal/${post.slug}`} className="group block">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isImageRight ? 'direction-normal' : ''}`}>
                      {/* Image side */}
                      <div className={`relative overflow-hidden aspect-[3/2] ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                        <img
                          src={post.cover_image ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90&fit=crop'}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                        />
                        <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-[#050505]/10 transition-colors duration-700" />
                      </div>

                      {/* Text side */}
                      <div className={`flex flex-col justify-center ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="flex items-center gap-4 mb-8">
                          <span className="luxury-meta">{post.category}</span>
                          <div className="w-6 h-px bg-[#c9a054]/30" />
                          <span className="luxury-meta text-zinc-600">
                            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>

                        <div className="text-[9px] tracking-[0.3em] uppercase text-zinc-700 mb-6">
                          Dispatch {String(i + 2).padStart(2, '0')}
                        </div>

                        <h2 className="font-serif font-light tracking-[0.12em] text-3xl md:text-5xl text-zinc-100 leading-[1.1] mb-8 group-hover:text-[#c9a054]/80 transition-colors duration-700">
                          {post.title}
                        </h2>

                        <p className="text-zinc-400 font-light leading-relaxed max-w-md mb-12 text-[15px]">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="w-8 h-px bg-[#c9a054]/40 group-hover:w-14 transition-all duration-700" />
                          <span className="text-[9px] tracking-[0.4em] uppercase text-[#c9a054]">
                            Enter Dispatch
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* ─── SECTION 4: HOUSE MANIFESTO STRIP ─── */}
      <section className="py-28 md:py-40 bg-[#050505] border-y border-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#c9a054]/3 via-transparent to-[#c9a054]/3" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easing }}
          className="text-center px-6 md:px-20 relative z-10"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#c9a054]/40 mx-auto mb-14" />

          <blockquote className="font-serif font-light text-3xl md:text-5xl lg:text-6xl text-zinc-100 tracking-[0.08em] leading-[1.3] max-w-4xl mx-auto mb-14">
            "Luxury should not chase attention.<br />
            It should command permanence."
          </blockquote>

          <div className="flex items-center justify-center gap-6">
            <div className="w-12 h-px bg-[#c9a054]/30" />
            <span className="luxury-meta">House of Shamim Forever</span>
            <div className="w-12 h-px bg-[#c9a054]/30" />
          </div>

          <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#c9a054]/40 mx-auto mt-14" />
        </motion.div>
      </section>

      {/* ─── SECTION 5: ARCHIVE SYSTEM ─── */}
      <section className="py-28 md:py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
          className="mb-20"
        >
          <span className="luxury-meta">Publication Archive</span>
        </motion.div>

        {/* Year selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: easing }}
          className="flex items-end gap-10 mb-14 border-b border-[#1a1a1a] pb-8"
        >
          {ARCHIVE_YEARS.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`transition-all duration-500 ${
                activeYear === year
                  ? 'font-serif text-3xl md:text-5xl text-zinc-100 font-light tracking-wider'
                  : 'text-[10px] tracking-[0.3em] uppercase text-zinc-700 hover:text-zinc-500'
              }`}
            >
              {year}
            </button>
          ))}
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: easing }}
          className="flex flex-wrap items-center gap-8 mb-16"
        >
          {ARCHIVE_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-[9px] tracking-[0.4em] uppercase transition-all duration-500 pb-1 ${
                activeFilter === filter
                  ? 'text-[#c9a054] border-b border-[#c9a054]'
                  : 'text-zinc-600 hover:text-zinc-400 border-b border-transparent'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Archive list */}
        <div className="space-y-0">
          {(activeFilter === 'All' ? posts : posts.filter(p => p.category?.toLowerCase() === activeFilter.toLowerCase()))
            .map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: easing }}
              >
                <Link
                  href={`/journal/${post.slug}`}
                  className="group flex items-center justify-between py-7 border-b border-[#111] hover:border-[#c9a054]/20 transition-colors duration-500"
                >
                  <div className="flex items-center gap-8 md:gap-16">
                    <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 w-8 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="luxury-meta hidden md:block w-24 text-zinc-700">
                      {post.category}
                    </span>
                    <h3 className="font-serif font-light tracking-wide text-lg md:text-2xl text-zinc-300 group-hover:text-[#c9a054] transition-colors duration-500">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <span className="luxury-meta text-zinc-700 hidden md:block">
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <span className="text-[#c9a054] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </section>

    </div>
  )
}
