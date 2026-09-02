'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const SERIF = "'Cormorant Garamond', Georgia, serif"
const ease = [0.16, 1, 0.3, 1] as const

const PRODUCTS = [
  {
    slug: 'founder-s-eternal-archive',
    name: "Founder's Eternal Archive",
    subtitle: 'The Sovereign Vault',
    tagline: 'Archive 00 — Founder Reserve',
    price: 150000,
    usd: 540,
    image: '/products/founders-eternal-archive/founder-hero.png',
    rarity: 'FOUNDER SOVEREIGN',
    description: 'Ancient oud accord, wild tobacco, dark ambergris. The monument of legacy.',
    accent: '#c9a054',
  },
  {
    slug: 'sovereign-oud-absolute',
    name: 'Sovereign Oud Absolute',
    subtitle: 'The Imperial Resins',
    tagline: 'Archive IV — Imperial Reserve',
    price: 120000,
    usd: 432,
    image: '/products/sovereign-oud-absolute/oud-bottle.png',
    rarity: 'IMPERIAL RESERVE',
    description: 'Pure Assamese oud absolute, black saffron, aged leather. Institutional authority.',
    accent: '#8b6914',
  },
  {
    slug: 'shamim-s-ghost-the-eternal-legacy',
    name: "Shamim's Ghost",
    subtitle: 'The Eternal Legacy',
    tagline: 'Archive I — Imperial Reserve',
    price: 95000,
    usd: 342,
    image: '/products/shamims-ghost/ghost-hero.png',
    rarity: 'IMPERIAL RESERVE',
    description: 'Smoked oud, vintage ambergris, Iranian saffron. Presence that outlasts time.',
    accent: '#9b9b9b',
  },
  {
    slug: 'imperial-black-throne',
    name: 'Imperial Black Throne',
    subtitle: 'The Dark Authority',
    tagline: 'Archive II — Imperial Reserve',
    price: 85000,
    usd: 306,
    image: '/products/imperial-black-throne/throne-bottle.png',
    rarity: 'IMPERIAL RESERVE',
    description: 'Cambodian oud, black leather, smoked labdanum. Ultra-dark wealth signature.',
    accent: '#3a3a3a',
  },
  {
    slug: 'sapphire-blue-levant',
    name: 'Sapphire Blue Levant',
    subtitle: 'The Mediterranean King',
    tagline: 'Archive III — Royal Reserve',
    price: 75000,
    usd: 270,
    image: '/products/sapphire-blue-levant/levant-bottle.png',
    rarity: 'ROYAL RESERVE',
    description: 'Rare sea accord, blue cypress, Levantine herbs. Maritime sovereign power.',
    accent: '#1a3a6e',
  },
]

export interface EssentialProduct {
  id: string
  name: string
  slug: string
  description: string
  story: string
  price_usd: number
  price_pkr: number
  images: string[]
  is_featured: boolean
}

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 1.1, ease, delay },
  }
}

function ProductCard({ p, index }: { p: typeof PRODUCTS[0]; index: number }) {
  return (
    <motion.div
      {...reveal(index * 0.1)}
      style={{ position: 'relative', background: '#060402', border: '1px solid rgba(201,160,84,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#0a0805' }}>
        <img
          src={p.image}
          alt={p.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{ position: 'absolute', top: 16, left: 16 }}>
          <p style={{ fontSize: 7, letterSpacing: '0.6em', textTransform: 'uppercase', color: '#c9a054', background: 'rgba(0,0,0,0.75)', padding: '4px 10px', border: '1px solid rgba(201,160,84,0.3)', backdropFilter: 'blur(4px)' }}>◆ NFT</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(0deg, #060402 0%, transparent 100%)' }} />
      </div>
      <div style={{ padding: 'clamp(20px,3vw,28px)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div>
          <p style={{ fontSize: 7, letterSpacing: '0.6em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 8 }}>{p.tagline}</p>
          <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.2, marginBottom: 4 }}>{p.name}</h3>
          <p style={{ fontFamily: SERIF, fontSize: 'clamp(13px,1.5vw,15px)', fontWeight: 300, color: 'rgba(240,236,228,0.45)', fontStyle: 'italic', marginBottom: 10 }}>{p.subtitle}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, fontWeight: 300 }}>{p.description}</p>
        </div>
        <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, rgba(201,160,84,0.4), transparent)' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(18px,2vw,22px)', fontWeight: 300, color: '#f0ece4' }}>Rs {p.price.toLocaleString()}</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>${p.usd}</p>
          </div>
          <Link
            href={`/products/${p.slug}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: '1px solid rgba(201,160,84,0.4)', fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a054', textDecoration: 'none', transition: 'all 0.3s ease', background: 'transparent' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,160,84,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.8)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.4)'; }}
          >
            Acquire →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function EssentialCard({ p, index }: { p: EssentialProduct; index: number }) {
  const img = p.images && p.images.length > 0 ? p.images[0] : null
  const firstLine = p.description ? p.description.split('. ').slice(0, 2).join('. ') + '.' : ''
  const pricePKR = p.price_pkr ? p.price_pkr.toLocaleString() : (p.price_usd * 278).toLocaleString()

  return (
    <motion.div
      {...reveal(index * 0.08)}
      style={{
        position: 'relative',
        background: 'linear-gradient(145deg, #0a0a0a 0%, #080604 100%)',
        border: '1px solid rgba(201,160,84,0.15)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.4s ease',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.4)')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.15)')}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1', background: '#050402' }}>
        {img ? (
          <img
            src={img}
            alt={p.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block', padding: '12px', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: 28, opacity: 0.15 }}>◈</p>
          </div>
        )}
        {p.is_featured && (
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <p style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c9a054', background: 'rgba(0,0,0,0.85)', padding: '3px 8px', border: '1px solid rgba(201,160,84,0.4)' }}>★ FEATURED</p>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(0deg, #080604 0%, transparent 100%)' }} />
      </div>

      {/* Content */}
      <div style={{ padding: 'clamp(16px,2.5vw,22px)', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div>
          <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(17px,2vw,21px)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.25, marginBottom: 6 }}>{p.name}</h3>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.65, fontWeight: 300 }}>{firstLine}</p>
        </div>

        <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, rgba(201,160,84,0.3), transparent)' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 300, color: '#f0ece4' }}>Rs {pricePKR}</p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em' }}>${p.price_usd}</p>
          </div>
          <Link
            href={`/products/${p.slug}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', border: '1px solid rgba(201,160,84,0.35)', fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a054', textDecoration: 'none', background: 'transparent', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,160,84,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.7)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.35)'; }}
          >
            View →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function EssentialArchiveSection({ products }: { products: EssentialProduct[] }) {
  const loading = false

  return (
    <section style={{ padding: 'clamp(56px,8vw,100px) 0', background: 'linear-gradient(180deg, #030303 0%, #06050e 50%, #030303 100%)' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(16px,4vw,40px)' }}>

        {/* Header */}
        <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,64px)' }}>
          <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.6)', marginBottom: 10 }}>Discovery Allocations — House Curated</p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', fontWeight: 300, color: '#f0ece4', marginBottom: 14 }}>SF Essential Archive For Him</h2>
          <p style={{ fontFamily: SERIF, fontSize: 'clamp(0.95rem,1.8vw,1.2rem)', fontWeight: 300, color: 'rgba(240,236,228,0.4)', fontStyle: 'italic', maxWidth: 560, margin: '0 auto 20px' }}>
            Globally respected masculine fragrances — selected as foundational allocations for modern leaders, executives, and collectors.
          </p>
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #c9a054, transparent)', margin: '0 auto' }} />
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.4)' }}>Loading Archive…</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>No products found in this collection.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 'clamp(12px,2vw,20px)' }}>
            {products.map((p, i) => (
              <EssentialCard key={p.id} p={p} index={i} />
            ))}
          </div>
        )}

        {/* Footer note */}
        <motion.div {...reveal(0.2)} style={{ textAlign: 'center', marginTop: 'clamp(36px,5vw,56px)' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.3)', marginBottom: 20 }}>
            ◆ &nbsp; Globally Respected Masculine Standards &nbsp; ◆
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>
            These are not chosen because they are affordable. They are chosen because they became global masculine standards.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default function ForHimCollectionPage({ essentialProducts = [] }: { essentialProducts?: EssentialProduct[] }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div style={{ background: '#030303', minHeight: '100vh', color: '#f0ece4', overflowX: 'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ position: 'relative', height: '100svh', minHeight: 600, overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: '-5%', scale: heroScale }}>
          <img
            src="/ambassadors/srk-for-him-collection.png"
            alt="For Him — The Sovereign Archive"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
          />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.78) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(3,3,3,1) 0%, transparent 35%, transparent 75%, rgba(3,3,3,0.6) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #c9a054 40%, #c9a054 60%, transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #c9a054 40%, #c9a054 60%, transparent)' }} />

        <motion.div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 'clamp(24px,5vw,60px)', opacity: heroOpacity }}>
          <motion.p {...reveal(0)} style={{ fontSize: 7, letterSpacing: '1em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 24 }}>
            House of Shamim Forever — Sovereign Archive
          </motion.p>
          <motion.div {...reveal(0.1)} style={{ marginBottom: 16 }}>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(3rem,10vw,8rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 0.9, fontStyle: 'italic', letterSpacing: '-0.01em' }}>The</p>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(3rem,10vw,8rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 0.9, letterSpacing: '0.15em' }}>SOVEREIGN</p>
          </motion.div>
          <motion.div {...reveal(0.2)} style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
            <div style={{ width: 60, height: 1, background: '#c9a054' }} />
            <p style={{ fontSize: 8, letterSpacing: '0.7em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.7)' }}>For Him</p>
            <div style={{ width: 60, height: 1, background: '#c9a054' }} />
          </motion.div>
          <motion.p {...reveal(0.3)} style={{ fontFamily: SERIF, fontSize: 'clamp(1rem,2.5vw,1.5rem)', fontWeight: 300, color: 'rgba(240,236,228,0.55)', fontStyle: 'italic', maxWidth: 500, lineHeight: 1.5 }}>
            Five creations. One dominion. Zero compromises.
          </motion.p>
          <motion.div {...reveal(0.45)} style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.5)' }}>Scroll</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 1, height: 40, background: 'linear-gradient(180deg, #c9a054, transparent)' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── MANIFESTO ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,10vw,120px) 0', background: 'linear-gradient(180deg, #030303 0%, #060401 50%, #030303 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,5vw,60px)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }}>
          <motion.div {...reveal()}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 16 }}>The Doctrine</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.1 }}>Built for<br /><em>Authority</em></h2>
            <div style={{ width: 40, height: 1, background: '#c9a054', marginTop: 24 }} />
          </motion.div>
          <motion.div {...reveal(0.15)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontWeight: 300, color: 'rgba(240,236,228,0.75)', lineHeight: 1.7, fontStyle: 'italic' }}>
              &ldquo;The House of Shamim Forever does not create fragrances for men. It creates instruments of legacy — olfactory architectures for men who have already decided who they are.&rdquo;
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.9, fontWeight: 300 }}>
              Each creation in the For Him Sovereign Archive is a permanent statement of masculine authority. Limited allocations. NFT-authenticated provenance. Crafted in Karachi with museum-grade precision — for the boardroom, the private gathering, the legacy event, the moment that defines history.
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', lineHeight: 1.9, fontWeight: 300 }}>
              Sirf woh log in creations ke liye hain jo success ko ek maqam nahi, balki ek tamaddun samajhte hain. Jo sirf khushbu nahi — permanent impression chahte hain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SOVEREIGN PRODUCTS GRID ───────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(48px,8vw,100px) 0', background: '#030303' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(16px,4vw,40px)' }}>
          <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>Sovereign Allocations — 2026</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 300, color: '#f0ece4', marginBottom: 16 }}>The Five Archives</h2>
            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #c9a054, transparent)', margin: '0 auto' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 'clamp(12px,2vw,24px)', marginBottom: 'clamp(12px,2vw,24px)' }}>
            {PRODUCTS.slice(0, 2).map((p, i) => (
              <ProductCard key={p.slug} p={p} index={i} />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 'clamp(12px,2vw,24px)' }}>
            {PRODUCTS.slice(2).map((p, i) => (
              <ProductCard key={p.slug} p={p} index={i + 2} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SF ESSENTIAL ARCHIVE FOR HIM (dynamic from Supabase) ─────────────── */}
      <EssentialArchiveSection products={essentialProducts} />

      {/* ── AMBASSADOR STATEMENT — SALMAN ─────────────────────────────────────── */}
      <section style={{ position: 'relative', height: 'clamp(400px,65vh,680px)', overflow: 'hidden' }}>
        <img
          src="/ambassadors/salman-founders-archive.png"
          alt="Founder's Eternal Archive"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.48) 50%, rgba(0,0,0,0.72) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #c9a054 40%, #c9a054 60%, transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #c9a054 40%, #c9a054 60%, transparent)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(32px,6vw,72px)' }}>
          <motion.div {...reveal()}>
            <div style={{ width: 36, height: 1, background: '#c9a054', marginBottom: 18 }} />
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 16 }}>Archive 00 — Founder Reserve</p>
            <blockquote style={{ fontFamily: SERIF, fontSize: 'clamp(1.4rem,3.5vw,2.8rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.3, maxWidth: 600, margin: '0 0 24px 0', fontStyle: 'italic' }}>
              &ldquo;Some men wear a fragrance.<br />Others wear a legacy.&rdquo;
            </blockquote>
            <Link
              href="/products/founder-s-eternal-archive"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 28px', border: '1px solid rgba(201,160,84,0.5)', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a054', textDecoration: 'none', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            >
              View Founder&apos;s Eternal Archive →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── NFT STATEMENT ─────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(56px,8vw,100px) 0', background: 'linear-gradient(180deg, #030303 0%, #060510 50%, #030303 100%)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(20px,4vw,40px)', textAlign: 'center' }}>
          <motion.div {...reveal()}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: 'rgba(130,71,229,0.6)', marginBottom: 16 }}>Polygon · Blockchain Authentication</p>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: '#f0ece4', marginBottom: 20 }}>Every Archive is a Digital Sovereign Passport</h3>
            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(130,71,229,0.5), transparent)', margin: '0 auto 24px' }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.9, fontWeight: 300, maxWidth: 600, margin: '0 auto 40px' }}>
              Each sovereign creation carries a permanent, irrevocable proof of authenticity on the Polygon blockchain. The NFT is your identity — inseparable from the physical artifact, permanent in the ledger of history.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {['Ultra-Limited Allocation', 'Polygon Verified', 'Museum-Grade Craftsmanship', 'Holder Privileges Included', 'Karachi Sovereign Atelier'].map(tag => (
                <span key={tag} style={{ fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.5)', border: '1px solid rgba(201,160,84,0.15)', padding: '6px 14px' }}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(56px,8vw,100px) 0', background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #0e0903 0%, #030303 70%)', textAlign: 'center' }}>
        <motion.div {...reveal()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, padding: '0 clamp(20px,4vw,40px)' }}>
          <div>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 16 }}>Sovereign Access</p>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.2, marginBottom: 20 }}>
              Enter the<br /><em>Sovereign Archive</em>
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', lineHeight: 1.9, maxWidth: 480, margin: '0 auto' }}>
              Five masculine creations await. Each one a permanent statement. Each one an irrevocable legacy. Select your archive — or claim them all.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <Link
              href="/products/founder-s-eternal-archive"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'linear-gradient(135deg, #c9a054, #a0783c)', fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#030303', textDecoration: 'none', fontWeight: 600 }}
            >
              ◆ Acquire Founder Reserve
            </Link>
            <Link
              href="/shop"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', border: '1px solid rgba(201,160,84,0.4)', fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c9a054', textDecoration: 'none', background: 'transparent' }}
            >
              Full Sovereign Archive
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
