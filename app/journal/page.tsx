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
      <div
        className="hidden md:flex items-center justify-between px-6 py-3 border-b"
        style={{ borderColor: '#1a1d2e', fontSize: '10px', letterSpacing: '0.18em', color: '#666' }}
      >
        <span>MAY 2025 &nbsp;|&nbsp; ISSUE 07</span>
        <span style={{ color: '#d4af37' }}>EXPLORING THE WORLD OF TIMELESS LUXURY &nbsp;→</span>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* ─────────────────── SIDEBAR ─────────────────── */}
        <aside
          className="hidden md:flex flex-col justify-between w-44 lg:w-52 flex-shrink-0 border-r sticky top-0 h-screen py-8 px-5"
          style={{ borderColor: '#1a1d2e' }}
        >
          <div>
            {/* Logo */}
            <div className="mb-8">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, letterSpacing: '4px', color: '#d4af37', lineHeight: 1.1 }}>
                SHAMIM<br /><span style={{ fontSize: '16px' }}>FOREVER</span>
              </div>
              <div style={{ fontSize: '8px', letterSpacing: '4px', color: '#555', marginTop: '3px' }}>JOURNAL</div>
              <div className="mt-3" style={{ width: '28px', height: '1px', background: 'linear-gradient(to right, #d4af37, #d4af3700)' }} />
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-0.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-left py-2.5 transition-all duration-200 relative"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: activeCategory === cat ? '#d4af37' : '#666',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    paddingLeft: activeCategory === cat ? '14px' : '0px',
                  }}
                >
                  {activeCategory === cat && (
                    <span style={{
                      position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                      width: '2px', height: '14px', background: '#d4af37', borderRadius: '1px'
                    }} />
                  )}
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom sidebar */}
          <div className="flex flex-col gap-0.5">
            <div className="mb-4" style={{ width: '100%', height: '1px', background: '#1a1d2e' }} />
            {[{ icon: '🔍', label: 'SEARCH' }, { icon: '👤', label: 'SIGN IN' }, { icon: '📖', label: 'SUBSCRIBE' }].map(item => (
              <button
                key={item.label}
                style={{ fontSize: '9px', letterSpacing: '2px', color: '#555', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '6px 0', fontFamily: "'Inter', sans-serif" }}
              >
                {item.icon} &nbsp;{item.label}
              </button>
            ))}
            <div className="flex gap-4 mt-3">
              {['IG', 'PT', 'IN'].map(s => (
                <span key={s} style={{ fontSize: '9px', color: '#444', cursor: 'pointer', letterSpacing: '1px' }}>{s}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* ── MOBILE HEADER ── */}
        <div
          className="md:hidden flex items-center justify-between px-4 py-4 border-b sticky top-0 z-50"
          style={{ borderColor: '#1a1d2e', background: 'rgba(7,10,26,0.97)', backdropFilter: 'blur(12px)' }}
        >
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 700, letterSpacing: '2px', color: '#d4af37' }}>SHAMIM FOREVER</div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', color: '#555', marginTop: '2px' }}>JOURNAL</div>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: '1px solid #1a1d2e', color: '#d4af37', padding: '7px 12px', fontSize: '9px', letterSpacing: '1px', cursor: 'pointer' }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-b"
              style={{ borderColor: '#1a1d2e', background: '#070a1a' }}
            >
              <div className="px-4 py-4 grid grid-cols-2 gap-1.5">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setMenuOpen(false) }}
                    style={{
                      fontSize: '10px', letterSpacing: '2px',
                      color: activeCategory === cat ? '#d4af37' : '#666',
                      border: activeCategory === cat ? '1px solid #d4af3740' : '1px solid #1a1d2e',
                      background: 'none', cursor: 'pointer', padding: '10px 12px', textAlign: 'left',
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

        {/* ─────────────────── MAIN CONTENT ─────────────────── */}
        <main className="flex-1 min-w-0">

          {/* ══════════════════════════════════════════════
              ROW 1 — HERO: 2 large featured articles
          ══════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] border-b" style={{ borderColor: '#1a1d2e' }}>

            {/* LEFT HERO — large, full-bleed image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease }}
              className="relative overflow-hidden border-b md:border-b-0 md:border-r group"
              style={{ borderColor: '#1a1d2e', height: 'clamp(380px, 52vw, 620px)' }}
            >
              <Link href={`/journal/${hero1?.slug || '#'}`} className="block h-full">
                {/* Full-bleed image */}
                <img
                  src={hero1?.cover_image || ARTICLES[0].cover_image!}
                  alt={hero1?.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                />
                {/* Multi-layer gradient for text legibility */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,18,0.97) 0%, rgba(5,6,18,0.6) 40%, rgba(5,6,18,0.1) 70%, transparent 100%)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,6,18,0.5) 0%, transparent 60%)' }} />

                {/* Text block — bottom left */}
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                  {/* Category */}
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37', fontFamily: "'Inter', sans-serif" }}>
                      {hero1?.category || 'CRAFT'}
                    </span>
                    <div style={{ width: '24px', height: '1px', background: '#d4af37' }} />
                  </div>

                  {/* Title — very large */}
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(36px, 5.5vw, 72px)',
                    fontWeight: 700,
                    lineHeight: 1.0,
                    color: '#ffffff',
                    marginBottom: '14px',
                    letterSpacing: '-0.01em',
                  }}>
                    {hero1?.title}
                  </h2>

                  {/* Excerpt */}
                  <p style={{ fontSize: '12px', color: '#9a9aaa', lineHeight: 1.7, marginBottom: '20px', maxWidth: '380px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {hero1?.excerpt}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-3 group/link">
                    <span style={{ fontSize: '9px', letterSpacing: '2.5px', color: '#d4af37', fontFamily: "'Inter', sans-serif" }}>READ ARTICLE</span>
                    <div className="w-5 h-px group-hover/link:w-10 transition-all duration-500" style={{ background: '#d4af37' }} />
                    <span style={{ color: '#d4af37', fontSize: '12px' }}>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* RIGHT HERO — slightly smaller */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.12, ease }}
              className="relative overflow-hidden group"
              style={{ height: 'clamp(300px, 40vw, 620px)' }}
            >
              <Link href={`/journal/${hero2?.slug || '#'}`} className="block h-full">
                <img
                  src={hero2?.cover_image || ARTICLES[1].cover_image!}
                  alt={hero2?.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,18,0.96) 0%, rgba(5,6,18,0.55) 45%, rgba(5,6,18,0.1) 75%, transparent 100%)' }} />

                {/* Text block — bottom left */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-9">
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37', fontFamily: "'Inter', sans-serif" }}>
                      {hero2?.category || 'PSYCHOLOGY'}
                    </span>
                    <div style={{ width: '24px', height: '1px', background: '#d4af37' }} />
                  </div>

                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(26px, 3.8vw, 48px)',
                    fontWeight: 700,
                    lineHeight: 1.05,
                    color: '#ffffff',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}>
                    {hero2?.title}
                  </h2>

                  <p style={{ fontSize: '11px', color: '#9a9aaa', lineHeight: 1.7, marginBottom: '18px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {hero2?.excerpt}
                  </p>

                  <div className="flex items-center gap-3 group/link">
                    <span style={{ fontSize: '9px', letterSpacing: '2.5px', color: '#d4af37', fontFamily: "'Inter', sans-serif" }}>READ ARTICLE</span>
                    <div className="w-5 h-px group-hover/link:w-8 transition-all duration-500" style={{ background: '#d4af37' }} />
                    <span style={{ color: '#d4af37', fontSize: '12px' }}>→</span>
                  </div>
                </div>

                {/* Scroll dots — right edge decoration */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: i === 0 ? '#d4af37' : '#333' }} />
                  ))}
                </div>
              </Link>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════
              ROW 2 — 4 SMALL CARDS + NEWSLETTER
          ══════════════════════════════════════════════ */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b" style={{ borderColor: '#1a1d2e' }}>

            {/* Cards 1–3: small article cards */}
            {[card1, card2, card3].filter(Boolean).map((post, i) => (
              <motion.div
                key={post?.id || i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
                className="relative border-r overflow-hidden group"
                style={{ borderColor: '#1a1d2e', height: 'clamp(220px, 28vw, 340px)' }}
              >
                <Link href={`/journal/${post?.slug || '#'}`} className="block h-full">
                  {/* Background image */}
                  <img
                    src={post?.cover_image || ARTICLES[i + 2].cover_image!}
                    alt={post?.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-[1.06]"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,18,0.97) 0%, rgba(5,6,18,0.5) 45%, rgba(5,6,18,0.0) 80%)' }} />

                  {/* Text overlay — bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span style={{ fontSize: '8px', letterSpacing: '2.5px', color: '#d4af37', fontFamily: "'Inter', sans-serif" }}>{post?.category}</span>
                      <div style={{ width: '14px', height: '1px', background: '#d4af37' }} />
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(14px, 2.2vw, 22px)', fontWeight: 700, color: '#f0f0f0', lineHeight: 1.2, marginBottom: '6px' }}>
                      {post?.title}
                    </h3>
                    <p style={{ fontSize: '10px', color: '#888', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '10px' }}>
                      {post?.excerpt}
                    </p>
                    <div className="flex items-center gap-2 group/link">
                      <span style={{ fontSize: '8px', letterSpacing: '2px', color: '#d4af37' }}>READ ARTICLE</span>
                      <div className="w-3 h-px group-hover/link:w-5 transition-all duration-400" style={{ background: '#d4af37' }} />
                      <span style={{ color: '#d4af37', fontSize: '10px' }}>→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Card 4: Newsletter box */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.24, ease }}
              className="flex flex-col justify-between p-6 md:p-7 col-span-2 md:col-span-1"
              style={{
                background: 'rgba(212,175,55,0.04)',
                border: '1px solid #d4af3725',
                borderTop: 'none',
                borderBottom: 'none',
              }}
            >
              <div>
                <div style={{ fontSize: '24px', color: '#d4af37', marginBottom: '10px', lineHeight: 1 }}>✉</div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#d4af37', marginBottom: '10px', lineHeight: 1.2, fontWeight: 700 }}>
                  The Journal
                </h4>
                <p style={{ fontSize: '11px', color: '#777', lineHeight: 1.8, marginBottom: '20px' }}>
                  Curated insights on luxury, culture, and the art of living beautifully. Delivered weekly.
                </p>
              </div>

              {subscribed ? (
                <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#d4af37' }}>✓ SUBSCRIBED</div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true) }} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'transparent',
                      border: '1px solid #2a2a3e',
                      color: '#e8e8e8',
                      fontSize: '11px',
                      fontFamily: "'Inter', sans-serif",
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#d4af37')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a3e')}
                  />
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#d4af37',
                      color: '#070a1a',
                      fontSize: '9px',
                      letterSpacing: '2px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif",
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════
              ROW 3 — QUOTE (left) + FEATURES (right)
              Matches screenshot exactly: combined strip
          ══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="grid grid-cols-1 md:grid-cols-[2fr_3fr] border-b"
            style={{ borderColor: '#1a1d2e' }}
          >
            {/* Left: Quote */}
            <div
              className="flex items-center gap-5 px-7 md:px-10 py-8 md:py-10 border-b md:border-b-0 md:border-r"
              style={{ borderColor: '#1a1d2e', background: 'rgba(212,175,55,0.02)' }}
            >
              {/* Big quotation mark */}
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '80px',
                color: '#d4af37',
                lineHeight: 0.7,
                flexShrink: 0,
                opacity: 0.7,
                alignSelf: 'flex-start',
                marginTop: '4px',
              }}>"</div>

              <div>
                <blockquote style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(14px, 1.8vw, 19px)',
                  fontStyle: 'italic',
                  color: '#c8c8d8',
                  lineHeight: 1.6,
                  marginBottom: '10px',
                  fontWeight: 400,
                }}>
                  Luxury is not about owning,<br />
                  it's about choosing—intentionally.
                </blockquote>
                <p style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37', fontFamily: "'Inter', sans-serif" }}>— SHAMIM</p>
              </div>
            </div>

            {/* Right: Features */}
            <div className="grid grid-cols-2 md:grid-cols-4">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="flex flex-col items-center justify-center gap-2.5 py-8 px-4 text-center group cursor-default"
                  style={{ borderLeft: i > 0 ? '1px solid #1a1d2e' : 'none' }}
                >
                  <span
                    className="transition-transform duration-300 group-hover:scale-110"
                    style={{ fontSize: '20px', color: '#d4af37' }}
                  >
                    {f.icon}
                  </span>
                  <span style={{ fontSize: '8px', letterSpacing: '2px', color: '#d4af37', textTransform: 'uppercase', lineHeight: 1.4, textAlign: 'center' }}>
                    {f.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #070a1a; }
        ::-webkit-scrollbar-thumb { background: #d4af3750; border-radius: 2px; }
      `}</style>
    </div>
  )
}
