'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    title: 'Sovereign Materials',
    slug: 'sovereign-materials',
    excerpt: 'The new language of luxury is being written in rare, raw, and remarkable materials.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90&fit=crop',
    category: 'CRAFT',
    published: true,
    created_at: '2025-05-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'The Psychology of Prestige',
    slug: 'psychology-of-prestige',
    excerpt: 'Why true luxury is less about logos and more about identity, perception, and quiet confidence.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1600&q=90&fit=crop',
    category: 'PSYCHOLOGY',
    published: true,
    created_at: '2025-04-15T00:00:00Z',
  },
  {
    id: '3',
    title: 'The Alchemy of Oud',
    slug: 'alchemy-of-oud',
    excerpt: "Inside the world's most precious ingredient — and why it continues to captivate souls for centuries.",
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=90&fit=crop',
    category: 'INGREDIENTS',
    published: true,
    created_at: '2025-04-01T00:00:00Z',
  },
  {
    id: '4',
    title: 'Threads of Distinction',
    slug: 'threads-of-distinction',
    excerpt: 'On the art of bespoke tailoring and the power of perfect details.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=90&fit=crop',
    category: 'STYLE',
    published: true,
    created_at: '2025-03-15T00:00:00Z',
  },
  {
    id: '5',
    title: 'Time, Curated',
    slug: 'time-curated',
    excerpt: 'The world of collectible timepieces and the stories they carry.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=90&fit=crop',
    category: 'COLLECTIBLES',
    published: true,
    created_at: '2025-03-01T00:00:00Z',
  },
  {
    id: '6',
    title: 'The Architecture of Scent',
    slug: 'architecture-of-scent',
    excerpt: 'Inside the world where perfumery becomes timeless design — structure precedes soul.',
    content: null,
    cover_image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=90&fit=crop',
    category: 'CULTURE',
    published: true,
    created_at: '2025-02-15T00:00:00Z',
  },
]

const CATEGORIES = ['HOME', 'CULTURE', 'CRAFT', 'LIFESTYLE', 'WELLNESS', 'VOYAGES', 'COLLECTIBLES', 'MASTERCLASS']
const FEATURES = [
  { icon: '◆', label: 'Curated Perspectives' },
  { icon: '❋', label: 'Expert Voices' },
  { icon: '⊕', label: 'Global Insights' },
  { icon: '♛', label: 'Timeless Values' },
]

export default function JournalPage() {
  const [posts, setPosts] = useState<JournalPost[]>(ARTICLES)
  const [activeCategory, setActiveCategory] = useState('HOME')
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

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

  const displayPosts = posts.length > 0 ? posts : ARTICLES
  const [hero1, hero2, card1, card2, card3] = displayPosts

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#070a1a', color: '#e8e8e8', fontFamily: "'Inter', sans-serif" }}>

      {/* ── TOP BAR (desktop only) ── */}
      <div className="hidden md:flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: '#1e2140', fontSize: '11px', letterSpacing: '0.15em', color: '#a0a0a0' }}>
        <span>MAY 2025 &nbsp;|&nbsp; ISSUE 07</span>
        <span style={{ color: '#d4af37' }}>EXPLORING THE WORLD OF TIMELESS LUXURY &nbsp;→</span>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* ── SIDEBAR (desktop) ── */}
        <aside className="hidden md:flex flex-col justify-between w-48 lg:w-56 flex-shrink-0 border-r py-8 px-5 sticky top-0 h-screen" style={{ borderColor: '#1e2140' }}>
          <div>
            {/* Logo */}
            <div className="mb-10">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, letterSpacing: '3px', color: '#d4af37', lineHeight: 1.1 }}>
                SHAMIM<br />
                <span style={{ fontSize: '18px' }}>FOREVER</span>
              </div>
              <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#666', marginTop: '4px' }}>JOURNAL</div>
              <div className="mt-3 w-8 h-px" style={{ background: '#d4af37' }} />
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-left py-2 transition-all duration-200"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: activeCategory === cat ? '#d4af37' : '#888',
                    borderLeft: activeCategory === cat ? '2px solid #d4af37' : '2px solid transparent',
                    paddingLeft: activeCategory === cat ? '10px' : '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {activeCategory === cat && <span style={{ display: 'inline-block', width: '2px', height: '12px', background: '#d4af37', borderRadius: '1px', marginRight: '6px' }} />}
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom sidebar actions */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-px" style={{ background: '#1e2140' }} />
            <button style={{ fontSize: '9px', letterSpacing: '2px', color: '#888', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>🔍 SEARCH</button>
            <button style={{ fontSize: '9px', letterSpacing: '2px', color: '#888', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>👤 SIGN IN</button>
            <button style={{ fontSize: '9px', letterSpacing: '2px', color: '#888', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>📖 SUBSCRIBE</button>
            <div className="flex gap-3 mt-2">
              {['IG', 'PT', 'IN'].map(s => (
                <span key={s} style={{ fontSize: '9px', color: '#555', cursor: 'pointer' }}>{s}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* ── MOBILE HEADER ── */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 border-b sticky top-0 z-50" style={{ borderColor: '#1e2140', background: 'rgba(7,10,26,0.97)', backdropFilter: 'blur(12px)' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, letterSpacing: '2px', color: '#d4af37', lineHeight: 1 }}>SHAMIM FOREVER</div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', color: '#666', marginTop: '2px' }}>JOURNAL</div>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: '1px solid #1e2140', color: '#d4af37', padding: '8px 12px', fontSize: '10px', letterSpacing: '1px', cursor: 'pointer' }}>
            {menuOpen ? '✕ CLOSE' : '☰ MENU'}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-b"
              style={{ borderColor: '#1e2140', background: '#070a1a' }}
            >
              <div className="px-4 py-4 grid grid-cols-2 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setMenuOpen(false) }}
                    className="py-3 px-3 text-left transition-all"
                    style={{
                      fontSize: '10px', letterSpacing: '2px',
                      color: activeCategory === cat ? '#d4af37' : '#888',
                      border: activeCategory === cat ? '1px solid #d4af3740' : '1px solid #1e2140',
                      background: 'none', cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0">

          {/* ══════════════════════════════════════════════════════
              EDITORIAL HERO — Bloomberg / Jacob & Co. style
          ══════════════════════════════════════════════════════ */}
          <section className="grid grid-cols-1 md:grid-cols-2 border-b" style={{ borderColor: '#1e2140', minHeight: 'clamp(420px, 60vh, 680px)' }}>

            {/* Left: Editorial text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease }}
              className="flex flex-col justify-center px-8 md:px-10 lg:px-14 py-14 md:py-20 border-b md:border-b-0 md:border-r"
              style={{ borderColor: '#1e2140' }}
            >
              {/* Issue meta */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-px" style={{ background: '#d4af37' }} />
                <span style={{ fontSize: '9px', letterSpacing: '4px', color: '#d4af37', textTransform: 'uppercase' }}>May 2025 &nbsp;·&nbsp; Issue 07</span>
              </div>

              {/* Issue label */}
              <div className="mb-6">
                <span style={{ fontSize: '9px', letterSpacing: '4px', color: '#666', textTransform: 'uppercase' }}>The Craft Issue &nbsp;— 01</span>
                <div className="mt-2 w-12 h-px" style={{ background: '#d4af37' }} />
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(36px, 5.5vw, 78px)',
                fontWeight: 700,
                lineHeight: 1.05,
                color: '#f0f0f0',
                marginBottom: '20px',
                letterSpacing: '-0.01em',
              }}>
                The Architecture<br />
                <em style={{ color: '#d4af37' }}>of Scent</em>
              </h1>

              {/* Excerpt */}
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.85, maxWidth: '380px', marginBottom: '36px' }}>
                Inside the world where perfumery becomes timeless design. Structure precedes soul — and restraint is the highest form of ambition.
              </p>

              {/* CTA */}
              <Link href="/journal/architecture-of-scent" className="group inline-flex items-center gap-4">
                <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37', textTransform: 'uppercase' }}>Explore the Issue</span>
                <div className="h-px transition-all duration-500 group-hover:w-10 w-5" style={{ background: '#d4af37' }} />
                <span style={{ color: '#d4af37', fontSize: '13px' }}>→</span>
              </Link>
            </motion.div>

            {/* Right: Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease }}
              className="relative overflow-hidden"
              style={{ minHeight: 'clamp(300px, 45vw, 680px)' }}
            >
              <Link href="/journal/architecture-of-scent" className="block h-full group">
                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683702?w=1800&q=90&fit=crop"
                  alt="The Architecture of Scent"
                  className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,10,26,0.35) 0%, transparent 60%)' }} />
                {/* Category badge */}
                <div className="absolute top-6 right-6">
                  <span style={{ fontSize: '8px', letterSpacing: '3px', color: '#d4af37', border: '1px solid #d4af3750', padding: '6px 14px', background: 'rgba(7,10,26,0.6)', backdropFilter: 'blur(4px)' }}>CRAFT</span>
                </div>
                {/* Subtle bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: 'linear-gradient(to top, rgba(7,10,26,0.5) 0%, transparent 100%)' }} />
              </Link>
            </motion.div>
          </section>

          {/* ══════════════════════════════════════════════════════
              SECTION LABEL
          ══════════════════════════════════════════════════════ */}
          <div className="flex items-center gap-4 px-6 md:px-8 py-5 border-b" style={{ borderColor: '#1e2140' }}>
            <span style={{ fontSize: '8px', letterSpacing: '4px', color: '#d4af37', textTransform: 'uppercase' }}>Featured</span>
            <div className="flex-1 h-px" style={{ background: '#1e2140' }} />
            <span style={{ fontSize: '8px', letterSpacing: '3px', color: '#444', textTransform: 'uppercase' }}>This Issue</span>
          </div>

          {/* ══════════════════════════════════════════════════════
              FEATURED 2-COLUMN HERO GRID
          ══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b" style={{ borderColor: '#1e2140' }}>

            {/* Hero 1 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease }}
              className="relative overflow-hidden border-b md:border-b-0 md:border-r group transition-all duration-300 hover:-translate-y-0"
              style={{ borderColor: '#1e2140', minHeight: '320px', height: 'clamp(320px, 45vw, 560px)' }}
            >
              <Link href={`/journal/${hero1?.slug || '#'}`} className="block h-full">
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={hero1?.cover_image || ARTICLES[0].cover_image!}
                    alt={hero1?.title}
                    className="w-full h-full object-cover transition-transform duration-[2500ms] group-hover:scale-[1.05]"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                  />
                </div>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,10,26,0.95) 0%, rgba(7,10,26,0.4) 50%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px w-5" style={{ background: '#d4af37' }} />
                    <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37' }}>{hero1?.category || 'CRAFT'}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.1, color: '#f0f0f0', marginBottom: '10px' }}>
                    {hero1?.title}
                  </h2>
                  <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.65, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {hero1?.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-px group-hover:w-8 transition-all duration-500" style={{ background: '#d4af37' }} />
                    <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#d4af37' }}>READ ARTICLE →</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Hero 2 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15, ease }}
              className="relative overflow-hidden group"
              style={{ minHeight: '280px', height: 'clamp(280px, 40vw, 560px)' }}
            >
              <Link href={`/journal/${hero2?.slug || '#'}`} className="block h-full">
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={hero2?.cover_image || ARTICLES[1].cover_image!}
                    alt={hero2?.title}
                    className="w-full h-full object-cover transition-transform duration-[2500ms] group-hover:scale-[1.05]"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                  />
                </div>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,10,26,0.95) 0%, rgba(7,10,26,0.35) 55%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px w-5" style={{ background: '#d4af37' }} />
                    <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37' }}>{hero2?.category || 'PSYCHOLOGY'}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 3vw, 38px)', fontWeight: 700, lineHeight: 1.15, color: '#f0f0f0', marginBottom: '10px' }}>
                    {hero2?.title}
                  </h2>
                  <p style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.65, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {hero2?.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-px group-hover:w-8 transition-all duration-500" style={{ background: '#d4af37' }} />
                    <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#d4af37' }}>READ ARTICLE →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════
              SMALL CARDS ROW (4 columns)
          ══════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b" style={{ borderColor: '#1e2140' }}>

            {[card1, card2, card3].filter(Boolean).map((post, i) => (
              <motion.div
                key={post?.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                className="border-r transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: '#1e2140' }}
              >
                <Link href={`/journal/${post?.slug || '#'}`} className="group block h-full">
                  <div className="relative overflow-hidden" style={{ height: 'clamp(140px, 20vw, 240px)' }}>
                    <img
                      src={post?.cover_image || ARTICLES[i + 2].cover_image!}
                      alt={post?.title}
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.06]"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,10,26,0.6) 0%, transparent 60%)' }} />
                  </div>
                  <div className="p-4 md:p-5" style={{ borderTop: '1px solid #1e2140', transition: 'border-color 0.3s' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px w-4 group-hover:w-6 transition-all duration-300" style={{ background: '#d4af37' }} />
                      <span style={{ fontSize: '8px', letterSpacing: '2px', color: '#d4af37' }}>{post?.category}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(14px, 2.5vw, 20px)', fontWeight: 700, color: '#e8e8e8', lineHeight: 1.25 }}>
                      {post?.title}
                    </h3>
                    <div className="mt-4 w-0 h-px group-hover:w-full transition-all duration-500" style={{ background: '#d4af37', transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Newsletter box — 4th card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="p-5 md:p-7 flex flex-col justify-between col-span-2 md:col-span-1"
              style={{ background: 'rgba(212,175,55,0.04)', borderLeft: '1px solid #2a2a3e', border: '1px solid #d4af3720' }}
            >
              <div>
                <div style={{ fontSize: '22px', color: '#d4af37', marginBottom: '12px' }}>✉</div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#d4af37', marginBottom: '10px', lineHeight: 1.2 }}>The Journal</h4>
                <p style={{ fontSize: '11px', color: '#888', lineHeight: 1.8, marginBottom: '18px' }}>
                  Curated insights on luxury, culture, and the art of living beautifully. Delivered weekly.
                </p>
              </div>
              {subscribed ? (
                <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#d4af37' }}>✓ SUBSCRIBED</div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true) }} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2"
                    style={{ background: 'transparent', border: '1px solid #2a2a3e', color: '#e8e8e8', fontSize: '11px', fontFamily: "'Inter', sans-serif", outline: 'none', transition: 'border-color 0.3s' }}
                    onFocus={e => { e.target.style.borderColor = '#d4af37' }}
                    onBlur={e => { e.target.style.borderColor = '#2a2a3e' }}
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 transition-all duration-300 hover:opacity-85"
                    style={{ background: '#d4af37', color: '#070a1a', fontSize: '9px', letterSpacing: '2px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                  >
                    SUBSCRIBE →
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════
              QUOTE SECTION — Large, dramatic, Bloomberg-level
          ══════════════════════════════════════════════════════ */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="relative py-16 md:py-24 px-6 md:px-16 border-b text-center"
            style={{ borderColor: '#1e2140', borderTop: '1px solid #1e2140', background: 'rgba(212,175,55,0.02)' }}
          >
            {/* Top accent line */}
            <div className="flex items-center justify-center gap-6 mb-10">
              <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to right, transparent, #d4af3740)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#d4af3760' }} />
              <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to left, transparent, #d4af3740)' }} />
            </div>

            {/* Large quotation mark */}
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px, 12vw, 140px)', lineHeight: 0.6, color: '#d4af37', opacity: 0.25, marginBottom: '16px', fontWeight: 700 }}>"</div>

            {/* Quote text */}
            <blockquote style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(18px, 3vw, 32px)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#ddd',
              lineHeight: 1.55,
              maxWidth: '680px',
              margin: '0 auto 24px',
              letterSpacing: '0.01em',
            }}>
              Luxury is not about owning,<br />
              it's about choosing—intentionally.
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-8" style={{ background: '#d4af3750' }} />
              <span style={{ fontSize: '9px', letterSpacing: '4px', color: '#d4af37', textTransform: 'uppercase' }}>— Shamim Forever</span>
              <div className="h-px w-8" style={{ background: '#d4af3750' }} />
            </div>

            {/* Bottom accent line */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to right, transparent, #d4af3740)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#d4af3660' }} />
              <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to left, transparent, #d4af3740)' }} />
            </div>
          </motion.section>

          {/* ══════════════════════════════════════════════════════
              FEATURES BAR
          ══════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="grid grid-cols-2 md:grid-cols-4 border-b"
            style={{ borderColor: '#1e2140' }}
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="flex flex-col items-center justify-center gap-3 py-8 px-4 text-center border-r group cursor-default"
                style={{ borderColor: i < FEATURES.length - 1 ? '#1e2140' : 'transparent' }}
              >
                <span className="transition-transform duration-300 group-hover:scale-110" style={{ fontSize: '22px', color: '#d4af37' }}>{f.icon}</span>
                <span style={{ fontSize: '8px', letterSpacing: '2.5px', color: '#d4af37', textTransform: 'uppercase' }}>{f.label}</span>
                <div className="w-0 h-px group-hover:w-8 transition-all duration-500" style={{ background: '#d4af37' }} />
              </motion.div>
            ))}
          </motion.div>

          {/* ══════════════════════════════════════════════════════
              ALL DISPATCHES GRID
          ══════════════════════════════════════════════════════ */}
          {displayPosts.length > 3 && (
            <section className="border-b" style={{ borderColor: '#1e2140' }}>
              <div className="px-5 md:px-8 py-5 border-b flex items-center gap-4" style={{ borderColor: '#1e2140' }}>
                <span style={{ fontSize: '8px', letterSpacing: '4px', color: '#666', textTransform: 'uppercase' }}>All Dispatches</span>
                <div className="flex-1 h-px" style={{ background: '#1e2140' }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {displayPosts.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease }}
                    className="border-b border-r transition-all duration-300 hover:-translate-y-1"
                    style={{ borderColor: '#1e2140' }}
                  >
                    <Link href={`/journal/${post.slug}`} className="group flex flex-col h-full">
                      <div className="relative overflow-hidden" style={{ height: '200px' }}>
                        <img
                          src={post.cover_image || ARTICLES[i % ARTICLES.length].cover_image!}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.05]"
                          style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                        />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,10,26,0.75) 0%, transparent 60%)' }} />
                        <div className="absolute bottom-3 left-4 flex items-center gap-2">
                          <div className="h-px w-4" style={{ background: '#d4af37' }} />
                          <span style={{ fontSize: '8px', letterSpacing: '2px', color: '#d4af37' }}>{post.category}</span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between" style={{ borderTop: '1px solid #1e2140', transition: 'border-color 0.3s' }}>
                        <div>
                          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: '#e8e8e8', lineHeight: 1.3, marginBottom: '8px' }}>
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p style={{ fontSize: '11px', color: '#777', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <div className="w-0 h-px group-hover:w-6 transition-all duration-500" style={{ background: '#d4af37' }} />
                          <span style={{ fontSize: '8px', letterSpacing: '2px', color: '#d4af37' }}>READ →</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* ══════════════════════════════════════════════════════
              MANIFESTO QUOTE
          ══════════════════════════════════════════════════════ */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="py-16 md:py-24 px-6 md:px-16 text-center border-b"
            style={{ borderColor: '#1e2140' }}
          >
            <div className="w-px h-10 mx-auto mb-10" style={{ background: 'linear-gradient(to bottom, transparent, #d4af37aa)' }} />
            <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 3.5vw, 44px)', fontWeight: 400, color: '#e0e0e0', lineHeight: 1.35, maxWidth: '700px', margin: '0 auto' }}>
              "Luxury should not chase attention.<br />
              It should command permanence."
            </blockquote>
            <div className="flex items-center justify-center gap-5 mt-10">
              <div className="h-px w-8" style={{ background: '#d4af3750' }} />
              <span style={{ fontSize: '8px', letterSpacing: '4px', color: '#d4af37', textTransform: 'uppercase' }}>House of Shamim Forever</span>
              <div className="h-px w-8" style={{ background: '#d4af3750' }} />
            </div>
            <div className="w-px h-10 mx-auto mt-10" style={{ background: 'linear-gradient(to top, transparent, #d4af37aa)' }} />
          </motion.section>

          {/* ══════════════════════════════════════════════════════
              NEWSLETTER — Premium gold box
          ══════════════════════════════════════════════════════ */}
          <section className="px-5 md:px-10 py-12 md:py-16 border-b" style={{ borderColor: '#1e2140' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 p-8 md:p-10"
              style={{ border: '1px solid #d4af3730', background: 'rgba(212,175,55,0.03)' }}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontSize: '18px', color: '#d4af37' }}>✉</span>
                  <span style={{ fontSize: '9px', letterSpacing: '4px', color: '#d4af37', textTransform: 'uppercase' }}>The Journal</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 30px)', color: '#f0f0f0', marginBottom: '8px', fontWeight: 700 }}>
                  The Sovereign Journal
                </h3>
                <p style={{ fontSize: '12px', color: '#777', lineHeight: 1.8, maxWidth: '340px' }}>
                  Curated insights on luxury, culture, and sovereign living. Delivered weekly to the discerning few.
                </p>
              </div>
              {subscribed ? (
                <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#d4af37', flexShrink: 0 }}>✓ SUBSCRIBED TO THE JOURNAL</div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true) }} className="flex flex-col sm:flex-row gap-2 md:min-w-[360px]">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3"
                    style={{ background: 'transparent', border: '1px solid #2a2a3e', color: '#e8e8e8', fontSize: '12px', fontFamily: "'Inter', sans-serif", outline: 'none', transition: 'border-color 0.3s' }}
                    onFocus={e => { e.target.style.borderColor = '#d4af37' }}
                    onBlur={e => { e.target.style.borderColor = '#2a2a3e' }}
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 transition-opacity duration-200 hover:opacity-80"
                    style={{ background: '#d4af37', color: '#070a1a', fontSize: '10px', letterSpacing: '2px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}
                  >
                    SUBSCRIBE →
                  </button>
                </form>
              )}
            </motion.div>
          </section>

        </main>
      </div>

      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #070a1a; }
        ::-webkit-scrollbar-thumb { background: #d4af3740; border-radius: 2px; }
      `}</style>
    </div>
  )
}
