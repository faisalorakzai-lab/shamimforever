'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface JournalPost {
  id: string; title: string; slug: string; excerpt: string | null
  content: string | null; cover_image: string | null; category: string | null
  published: boolean; created_at: string
}

const ease = [0.16, 1, 0.3, 1] as const

const ARTICLES: JournalPost[] = [
  { id: '0', title: "The Founder's Vision", slug: 'founders-vision', excerpt: 'In every generation, a handful of brands emerge that aspire to do more than sell products — they seek to create a lasting legacy.', content: null, cover_image: '/founders-vision.png', category: 'VISION', published: true, created_at: '2025-06-01T00:00:00Z' },
  { id: '1', title: 'The Future of Luxury: Blockchain Digital Passports', slug: 'blockchain-digital-passports', excerpt: 'How NFT-backed Digital Passports are transforming luxury ownership — bulletproof counterfeit protection and lifelong collector confidence.', content: null, cover_image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=90&fit=crop', category: 'INNOVATION', published: true, created_at: '2025-07-01T00:00:00Z' },
  { id: '2', title: 'Why Every Luxury Collector Needs a Verified Digital Identity', slug: 'verified-digital-identity', excerpt: 'Verified digital identity creates permanent ownership records that protect your investment and enable legacy planning.', content: null, cover_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=90&fit=crop', category: 'INNOVATION', published: true, created_at: '2025-07-08T00:00:00Z' },
  { id: '3', title: 'The Story Behind OKBOND', slug: 'okbond-lifetime-loyalty', excerpt: 'How Shamim Forever created OKBOND — a lifetime 10% benefit, VIP ecosystem, and long-term collector value unlike any loyalty program.', content: null, cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=90&fit=crop', category: 'INNOVATION', published: true, created_at: '2025-07-15T00:00:00Z' },
  { id: '4', title: 'From Perfume to Investment', slug: 'fragrance-as-investment', excerpt: 'How limited editions, rarity, market demand, and preservation value are transforming luxury fragrances into collectible assets.', content: null, cover_image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1600&q=90&fit=crop', category: 'COLLECTIBLES', published: true, created_at: '2025-07-22T00:00:00Z' },
  { id: '5', title: 'High Jewelry as a Legacy Asset', slug: 'high-jewelry-legacy', excerpt: 'How precious metals, certified gemstones, and master craftsmanship transform high jewelry into heirloom assets that build generational wealth.', content: null, cover_image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=90&fit=crop', category: 'HERITAGE', published: true, created_at: '2025-07-29T00:00:00Z' },
  { id: '6', title: 'The Art of Curation', slug: 'art-of-curation', excerpt: 'Inside the Guest Curation philosophy — the rigorous selection standards that ensure only exceptional global masterpieces reach our collectors.', content: null, cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90&fit=crop', category: 'CRAFT', published: true, created_at: '2025-08-05T00:00:00Z' },
  { id: '7', title: 'The Rise of Digital Luxury', slug: 'rise-of-digital-luxury', excerpt: 'The fusion of physical luxury craftsmanship with blockchain verification creates a new paradigm of authenticated, future-ready ownership.', content: null, cover_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=90&fit=crop', category: 'INNOVATION', published: true, created_at: '2025-08-12T00:00:00Z' },
  { id: '8', title: 'Building a Luxury House from Pakistan', slug: 'luxury-house-pakistan', excerpt: 'How Shamim Forever is building a world-class luxury house with international standards and genuine global ambition from Pakistan.', content: null, cover_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=90&fit=crop', category: 'VISION', published: true, created_at: '2025-08-19T00:00:00Z' },
  { id: '9', title: 'How Authenticity Shapes the Future of Luxury', slug: 'authenticity-future-luxury', excerpt: 'In a market flooded with counterfeits, authenticity has become luxury\'s most valuable commodity — and the defining test of every house.', content: null, cover_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90&fit=crop', category: 'CULTURE', published: true, created_at: '2025-08-26T00:00:00Z' },
  { id: '10', title: 'Fragrance Layering: A Signature Identity', slug: 'fragrance-layering', excerpt: 'Master the art of fragrance layering — luxury techniques for building a personal scent identity through thoughtful combinations.', content: null, cover_image: 'https://images.unsplash.com/photo-1547887538-047f40564bc3?w=1600&q=90&fit=crop', category: 'STYLE', published: true, created_at: '2025-09-02T00:00:00Z' },
  { id: '11', title: 'Why Limited Editions Create Lasting Value', slug: 'limited-editions-value', excerpt: 'The psychology and economics of luxury limited editions — how scarcity, exclusivity, and collector psychology create enduring value.', content: null, cover_image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1600&q=90&fit=crop', category: 'COLLECTIBLES', published: true, created_at: '2025-09-09T00:00:00Z' },
  { id: '12', title: 'The Psychology of Luxury Objects', slug: 'psychology-of-luxury-objects', excerpt: 'Understanding the deep emotional, social, and psychological forces that drive investment in timeless luxury objects.', content: null, cover_image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1600&q=90&fit=crop', category: 'CULTURE', published: true, created_at: '2025-09-16T00:00:00Z' },
  { id: '13', title: 'The Making of a Sovereign Collection', slug: 'sovereign-collection-making', excerpt: 'From initial inspiration and material selection through quality control to final archival presentation — inside a Shamim Forever collection.', content: null, cover_image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=90&fit=crop', category: 'CRAFT', published: true, created_at: '2025-09-23T00:00:00Z' },
  { id: '14', title: 'Sustainable Luxury', slug: 'sustainable-luxury', excerpt: 'How ethical sourcing, durable design, and conscious collecting are shaping a new era of responsible luxury at Shamim Forever.', content: null, cover_image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1600&q=90&fit=crop', category: 'HERITAGE', published: true, created_at: '2025-09-30T00:00:00Z' },
  { id: '15', title: 'Inside the Shamim Forever Vision', slug: 'shamim-forever-vision-heritage', excerpt: 'Heritage, innovation, and the next era of luxury — a look at the brand philosophy, Digital Passport ecosystem, and OKBOND roadmap.', content: null, cover_image: 'https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=1600&q=90&fit=crop', category: 'VISION', published: true, created_at: '2025-10-07T00:00:00Z' },
]

const CATEGORIES = ['ALL', 'VISION', 'INNOVATION', 'CRAFT', 'COLLECTIBLES', 'HERITAGE', 'CULTURE', 'STYLE']

const FEATURES = [
  { icon: '✦', label: 'DIGITAL PASSPORTS' },
  { icon: '◈', label: 'OKBOND LOYALTY' },
  { icon: '⬡', label: 'RARE CURATION' },
  { icon: '◇', label: 'VERIFIED PROVENANCE' },
]

export default function JournalPage() {
  const [dbPosts, setDbPosts] = useState<JournalPost[]>([])
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    supabase.from('journal_posts').select('*').eq('published', true).order('created_at', { ascending: false })
      .then(({ data }) => { if (data?.length) setDbPosts(data) })
  }, [])

  const allPosts = dbPosts.length >= 2 ? dbPosts : ARTICLES
  const filtered = activeCategory === 'ALL' ? allPosts : allPosts.filter(p => (p.category || '').toUpperCase() === activeCategory)

  const hero1 = filtered[0] || ARTICLES[0]
  const hero2 = filtered[1] || ARTICLES[1]
  const cards = filtered.slice(2, 5)
  const morePosts = filtered.slice(5)

  return (
    <div style={{ background: '#070a1a', color: '#e8e8f0', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>

      {/* ── TOP TICKER ── */}
      <div className="overflow-hidden border-b" style={{ borderColor: '#1a1d2e', background: '#070a1a', height: '32px' }}>
        <div className="flex items-center h-full" style={{ animation: 'marquee 40s linear infinite', whiteSpace: 'nowrap', gap: '0' }}>
          {[...Array(4)].map((_, ri) => (
            <span key={ri} style={{ fontSize: '8.5px', letterSpacing: '3px', color: '#555' }}>
              {['NEW DISPATCH: DIGITAL PASSPORTS ✦', 'OKBOND LIFETIME LOYALTY ✦', 'CURATED FOR COLLECTORS ✦', 'SHAMIM FOREVER JOURNAL ✦', 'VERIFIED LUXURY ✦ SOVEREIGN CRAFT ✦'].join('  ·  ')}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── MASTHEAD ── */}
      <div className="border-b" style={{ borderColor: '#1a1d2e' }}>
        <div className="flex flex-col items-center justify-center py-7 md:py-9 text-center">
          <div style={{ fontSize: '8px', letterSpacing: '5px', color: '#555', marginBottom: '8px' }}>EST. MMXXV</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 7vw, 88px)', fontWeight: 900, letterSpacing: '0.08em', color: '#f0f0f8', lineHeight: 1, marginBottom: '6px' }}>
            JOURNAL
          </h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(10px, 1.4vw, 14px)', color: '#d4af37', letterSpacing: '2px' }}>
            Dispatches on Luxury, Craft &amp; Culture
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* ── SIDEBAR ── */}
        <aside className="hidden md:flex flex-col justify-between border-r py-8 px-5" style={{ borderColor: '#1a1d2e', width: '180px', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflow: 'auto' }}>
          <div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', color: '#d4af37', marginBottom: '16px' }}>FILTER</div>
            <nav className="flex flex-col gap-1">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  style={{ fontSize: '9px', letterSpacing: '2px', color: activeCategory === cat ? '#d4af37' : '#444', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '5px 0', fontFamily: "'Inter', sans-serif", borderBottom: activeCategory === cat ? '1px solid #d4af3740' : '1px solid transparent', transition: 'color 0.2s' }}>
                  {cat}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="mb-4" style={{ width: '100%', height: '1px', background: '#1a1d2e' }} />
            <div style={{ fontSize: '8px', letterSpacing: '2px', color: '#333', marginBottom: '8px' }}>16 DISPATCHES</div>
            <div className="flex gap-3 mt-1">
              {['IG', 'X', 'WA'].map(s => (<span key={s} style={{ fontSize: '9px', color: '#444', cursor: 'pointer', letterSpacing: '1px' }}>{s}</span>))}
            </div>
          </div>
        </aside>

        {/* ── MOBILE HEADER ── */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 border-b sticky top-0 z-50" style={{ borderColor: '#1a1d2e', background: 'rgba(7,10,26,0.97)', backdropFilter: 'blur(12px)' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 700, letterSpacing: '2px', color: '#d4af37' }}>SHAMIM FOREVER</div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', color: '#555', marginTop: '2px' }}>JOURNAL</div>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: '1px solid #1a1d2e', color: '#d4af37', padding: '7px 12px', fontSize: '9px', letterSpacing: '1px', cursor: 'pointer' }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="md:hidden overflow-hidden border-b" style={{ borderColor: '#1a1d2e', background: '#070a1a' }}>
              <div className="px-4 py-4 grid grid-cols-2 gap-1.5">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setMenuOpen(false) }} style={{ fontSize: '10px', letterSpacing: '2px', color: activeCategory === cat ? '#d4af37' : '#666', border: activeCategory === cat ? '1px solid #d4af3740' : '1px solid #1a1d2e', background: 'none', cursor: 'pointer', padding: '10px 12px', textAlign: 'left', fontFamily: "'Inter', sans-serif" }}>
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── MAIN CONTENT ─── */}
        <main className="flex-1 min-w-0">

          {/* ══ ROW 1: 2-COL HERO ══ */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] border-b" style={{ borderColor: '#1a1d2e' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease }}
              className="relative overflow-hidden border-b md:border-b-0 md:border-r group" style={{ borderColor: '#1a1d2e', height: 'clamp(380px, 52vw, 620px)' }}>
              <Link href={`/journal/${hero1.slug}`} className="block h-full">
                <img src={hero1.cover_image!} alt={hero1.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-[1.04]" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)', objectPosition: hero1.slug === 'founders-vision' ? '50% 12%' : 'center' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,18,0.97) 0%, rgba(5,6,18,0.6) 40%, rgba(5,6,18,0.1) 70%, transparent 100%)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,6,18,0.5) 0%, transparent 60%)' }} />
                {hero1.id === '0' && <div className="absolute top-4 left-4" style={{ fontSize: '8px', letterSpacing: '2px', color: '#070a1a', background: '#d4af37', padding: '4px 10px' }}>LIVE</div>}
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37', fontFamily: "'Inter', sans-serif" }}>{hero1.category}</span>
                    <div style={{ width: '24px', height: '1px', background: '#d4af37' }} />
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 5vw, 68px)', fontWeight: 700, lineHeight: 1.0, color: '#ffffff', marginBottom: '14px', letterSpacing: '-0.01em' }}>{hero1.title}</h2>
                  <p style={{ fontSize: '12px', color: '#9a9aaa', lineHeight: 1.7, marginBottom: '20px', maxWidth: '380px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{hero1.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: '9px', letterSpacing: '2.5px', color: '#d4af37' }}>READ ARTICLE</span>
                    <div style={{ width: '20px', height: '1px', background: '#d4af37' }} />
                    <span style={{ color: '#d4af37', fontSize: '12px' }}>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.12, ease }}
              className="relative overflow-hidden group" style={{ height: 'clamp(300px, 40vw, 620px)' }}>
              <Link href={`/journal/${hero2.slug}`} className="block h-full">
                <img src={hero2.cover_image!} alt={hero2.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-[1.04]" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,18,0.96) 0%, rgba(5,6,18,0.55) 45%, rgba(5,6,18,0.1) 75%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-9">
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37' }}>{hero2.category}</span>
                    <div style={{ width: '24px', height: '1px', background: '#d4af37' }} />
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3.8vw, 48px)', fontWeight: 700, lineHeight: 1.05, color: '#ffffff', marginBottom: '12px', letterSpacing: '-0.01em' }}>{hero2.title}</h2>
                  <p style={{ fontSize: '11px', color: '#9a9aaa', lineHeight: 1.7, marginBottom: '18px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{hero2.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: '9px', letterSpacing: '2.5px', color: '#d4af37' }}>READ ARTICLE</span>
                    <div style={{ width: '20px', height: '1px', background: '#d4af37' }} />
                    <span style={{ color: '#d4af37', fontSize: '12px' }}>→</span>
                  </div>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                  {[0,1,2,3,4].map(i => (<div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: i === 0 ? '#d4af37' : '#333' }} />))}
                </div>
              </Link>
            </motion.div>
          </div>

          {/* ══ ROW 2: 3 CARDS + NEWSLETTER ══ */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b" style={{ borderColor: '#1a1d2e' }}>
            {cards.map((post, i) => (
              <motion.div key={post.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
                className="relative border-r overflow-hidden group" style={{ borderColor: '#1a1d2e', height: 'clamp(220px, 28vw, 340px)' }}>
                <Link href={`/journal/${post.slug}`} className="block h-full">
                  <img src={post.cover_image!} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-[1.06]" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,18,0.97) 0%, rgba(5,6,18,0.5) 45%, transparent 80%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <span style={{ fontSize: '8px', letterSpacing: '2.5px', color: '#d4af37', display: 'block', marginBottom: '6px' }}>{post.category}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(14px, 2.2vw, 22px)', fontWeight: 700, color: '#f0f0f0', lineHeight: 1.2, marginBottom: '6px' }}>{post.title}</h3>
                    <p style={{ fontSize: '10px', color: '#888', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '10px' }}>{post.excerpt}</p>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: '8px', letterSpacing: '2px', color: '#d4af37' }}>READ →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {/* Newsletter */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.24, ease }}
              className="flex flex-col justify-between p-6 md:p-7 col-span-2 md:col-span-1"
              style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid #d4af3725', borderTop: 'none', borderBottom: 'none' }}>
              <div>
                <div style={{ fontSize: '24px', color: '#d4af37', marginBottom: '10px', lineHeight: 1 }}>✉</div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#d4af37', marginBottom: '10px', lineHeight: 1.2, fontWeight: 700 }}>The Journal</h4>
                <p style={{ fontSize: '11px', color: '#777', lineHeight: 1.8, marginBottom: '20px' }}>Curated insights on luxury, culture, and the art of living beautifully. Delivered weekly.</p>
              </div>
              {subscribed ? (
                <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#d4af37' }}>✓ SUBSCRIBED</div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true) }} className="flex flex-col gap-2">
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required
                    style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: '1px solid #2a2a3e', color: '#e8e8e8', fontSize: '11px', fontFamily: "'Inter', sans-serif", outline: 'none' }}
                    onFocus={e => (e.target.style.borderColor = '#d4af37')} onBlur={e => (e.target.style.borderColor = '#2a2a3e')} />
                  <button type="submit" style={{ width: '100%', padding: '10px', background: '#d4af37', color: '#070a1a', fontSize: '9px', letterSpacing: '2px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* ══ ROW 3: QUOTE + FEATURES ══ */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }}
            className="grid grid-cols-1 md:grid-cols-[2fr_3fr] border-b" style={{ borderColor: '#1a1d2e' }}>
            <div className="flex items-center gap-5 px-7 md:px-10 py-8 md:py-10 border-b md:border-b-0 md:border-r" style={{ borderColor: '#1a1d2e', background: 'rgba(212,175,55,0.02)' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '80px', color: '#d4af37', lineHeight: 0.7, flexShrink: 0, opacity: 0.7, alignSelf: 'flex-start', marginTop: '4px' }}>"</div>
              <div>
                <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(14px, 1.8vw, 19px)', fontStyle: 'italic', color: '#c8c8d8', lineHeight: 1.6, marginBottom: '10px' }}>
                  Luxury is not about owning,<br />it's about choosing—intentionally.
                </blockquote>
                <p style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37' }}>— SHAMIM</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {FEATURES.map((f, i) => (
                <motion.div key={f.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="flex flex-col items-center justify-center gap-2.5 py-8 px-4 text-center"
                  style={{ borderLeft: i > 0 ? '1px solid #1a1d2e' : 'none' }}>
                  <span style={{ fontSize: '20px', color: '#d4af37' }}>{f.icon}</span>
                  <span style={{ fontSize: '8px', letterSpacing: '2px', color: '#d4af37', textTransform: 'uppercase', lineHeight: 1.4 }}>{f.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ══ ROW 4: MORE DISPATCHES (articles 6-15) ══ */}
          {morePosts.length > 0 && (
            <div className="border-b" style={{ borderColor: '#1a1d2e' }}>
              <div className="px-6 md:px-8 py-6 border-b flex items-center gap-5" style={{ borderColor: '#1a1d2e' }}>
                <div style={{ width: '32px', height: '2px', background: '#d4af37' }} />
                <span style={{ fontSize: '9px', letterSpacing: '4px', color: '#d4af37' }}>MORE DISPATCHES</span>
                <div style={{ flex: 1, height: '1px', background: '#1a1d2e' }} />
                <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#444' }}>{morePosts.length} ARTICLES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {morePosts.map((post, i) => (
                  <motion.div key={post.id}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: (i % 4) * 0.07, ease }}
                    className="relative overflow-hidden group border-b border-r" style={{ borderColor: '#1a1d2e', height: '280px' }}>
                    <Link href={`/journal/${post.slug}`} className="block h-full">
                      <img src={post.cover_image!} alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-[1.07]"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,6,18,0.97) 0%, rgba(5,6,18,0.45) 50%, rgba(5,6,18,0.15) 100%)' }} />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'rgba(212,175,55,0.06)' }} />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span style={{ fontSize: '7.5px', letterSpacing: '2.5px', color: '#d4af37' }}>{post.category}</span>
                          <div style={{ flex: 1, height: '1px', background: '#d4af3730' }} />
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(13px, 1.8vw, 18px)', fontWeight: 700, color: '#f0f0f0', lineHeight: 1.25, marginBottom: '8px' }}>
                          {post.title}
                        </h3>
                        <p style={{ fontSize: '10px', color: '#777', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '10px' }}>
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div style={{ width: '12px', height: '1px', background: '#d4af37' }} />
                          <span style={{ fontSize: '8px', letterSpacing: '2px', color: '#d4af37' }}>READ →</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #070a1a; }
        ::-webkit-scrollbar-thumb { background: #d4af3750; border-radius: 2px; }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>
    </div>
  )
}
