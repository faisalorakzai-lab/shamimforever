'use client'

  import { useRef } from 'react'
  import { motion, useScroll, useTransform } from 'framer-motion'
  import Link from 'next/link'

  const SERIF = "'Cormorant Garamond', Georgia, serif"
  const ease = [0.16, 1, 0.3, 1] as const

  const PRODUCTS = [
    // ── ARCHIVE 00 — FOUNDERS ──────────────────────────────────────────────────
    {
      slug: 'founder-s-eternal-archive',
      name: "Founder's Eternal Archive",
      subtitle: 'The Sovereign Vault',
      tagline: 'Archive 00 — Founder Reserve',
      price: 150000,
      usd: 540,
      image: '/products/founders-eternal-archive/founder-hero.png',
      rarity: 'FOUNDER SOVEREIGN',
      description: 'Ancient oud accord, wild tobacco, dark ambergris. The monument of masculine legacy.',
      accent: '#c9a054',
      badge: 'MOST PRESTIGIOUS',
    },
    // ── ARCHIVE I ─────────────────────────────────────────────────────────────
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
      badge: '',
    },
    {
      slug: 'obsidian-sovereign',
      name: 'Obsidian Sovereign',
      subtitle: 'The Dark Authority',
      tagline: 'Archive III — Imperial Reserve',
      price: 85000,
      usd: 306,
      image: '/products/obsidian-sovereign/obsidian-hero.png',
      rarity: 'IMPERIAL RESERVE',
      description: 'Black oud absolute, smoked resins, obsidian amber woods. Authority carved from darkness.',
      accent: '#1a1a1a',
      badge: '',
    },
    {
      slug: 'phantom-legacy',
      name: 'Phantom Legacy',
      subtitle: 'The Unseen Empire',
      tagline: 'Archive II — Founder Reserve',
      price: 88000,
      usd: 315,
      image: '/products/phantom-legacy/phantom-hero.png',
      rarity: 'FOUNDER RESERVE',
      description: 'Ghost incense, vintage oud, white ambergris. The legacy that refuses to disappear.',
      accent: '#555555',
      badge: '',
    },
    // ── ARCHIVE II ────────────────────────────────────────────────────────────
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
      badge: '',
    },
    {
      slug: 'midnight-throne-noir',
      name: 'Midnight Throne Noir',
      subtitle: 'The Nocturnal Empire',
      tagline: 'Archive II — Imperial Reserve',
      price: 80000,
      usd: 288,
      image: '/products/midnight-throne-noir/midnight-hero.png',
      rarity: 'IMPERIAL RESERVE',
      description: 'Dark noir rose, smoked leather, black oud heart. Nocturnal sovereignty perfected.',
      accent: '#2a1a3a',
      badge: '',
    },
    // ── ARCHIVE III ───────────────────────────────────────────────────────────
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
      badge: '',
    },
    {
      slug: 'black-atlas-reserve',
      name: 'Black Atlas Reserve',
      subtitle: 'The Mountain Sovereign',
      tagline: 'Archive III — Royal Reserve',
      price: 75000,
      usd: 270,
      image: '/products/black-atlas-reserve/atlas-hero.png',
      rarity: 'ROYAL RESERVE',
      description: 'Moroccan Atlas cedar, Himalayan vetiver, obsidian amber. Power carved from mountains.',
      accent: '#2a3a2a',
      badge: '',
    },
    {
      slug: 'cedar-monarch',
      name: 'Cedar Monarch',
      subtitle: 'The Fresh King',
      tagline: 'Archive III — Royal Reserve',
      price: 65000,
      usd: 234,
      image: '/products/cedar-monarch/cedar-hero.png',
      rarity: 'ROYAL RESERVE',
      description: 'Atlas cedar absolute, Himalayan vetiver, white musk. Fresh authority that commands.',
      accent: '#2a4a2a',
      badge: '',
    },
    // ── ARCHIVE IV ────────────────────────────────────────────────────────────
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
      badge: 'SECOND TIER',
    },
    {
      slug: 'sovereign-musk-noir',
      name: 'Sovereign Musk Noir',
      subtitle: 'The Skin of Power',
      tagline: 'Archive IV — Imperial Reserve',
      price: 75000,
      usd: 270,
      image: '/products/sovereign-musk-noir/musk-hero.png',
      rarity: 'IMPERIAL RESERVE',
      description: 'Dark musk absolute, aged ambergris, velvet skin accord. Power worn as skin itself.',
      accent: '#2a1a1a',
      badge: '',
    },
    // ── ARCHIVE V ─────────────────────────────────────────────────────────────
    {
      slug: 'king-of-kings-oud',
      name: 'King of Kings Oud',
      subtitle: 'The Royal Oud Throne',
      tagline: 'Archive V — Grand Sovereign',
      price: 135000,
      usd: 486,
      image: '/products/king-of-kings-oud/king-hero.png',
      rarity: 'GRAND SOVEREIGN',
      description: 'Assamese oud absolute, Persian saffron, aged agarwood. The oud of kings.',
      accent: '#b8860b',
      badge: 'ULTRA-RARE',
    },
    {
      slug: 'black-crown-absolute',
      name: 'Black Crown Absolute',
      subtitle: 'The Supreme Darkness',
      tagline: 'Archive V — Supreme Sovereign',
      price: 145000,
      usd: 522,
      image: '/products/black-crown-absolute/crown-hero.png',
      rarity: 'SUPREME SOVEREIGN',
      description: 'Borneo black oud, aged tobacco absolute, obsidian resin. The absolute supreme darkness.',
      accent: '#0a0a0a',
      badge: 'MOST EXCLUSIVE',
    },
    // ── ARCHIVE I (GRAND) ────────────────────────────────────────────────────
    {
      slug: 'arabian-kingdom',
      name: 'Arabian Kingdom',
      subtitle: 'The Desert Sovereign',
      tagline: 'Archive I — Grand Reserve',
      price: 115000,
      usd: 414,
      image: '/products/arabian-kingdom/kingdom-hero.png',
      rarity: 'GRAND RESERVE',
      description: 'Hejazi frankincense, Al-Oud Assami, ancient musk. The desert sovereign in liquid form.',
      accent: '#8b4513',
      badge: '',
    },
    // ── ARCHIVE 0X ────────────────────────────────────────────────────────────
    {
      slug: 'dark-archive-reserve',
      name: 'Dark Archive Reserve',
      subtitle: 'The Vaulted Legacy',
      tagline: 'Archive 0X — Collector Reserve',
      price: 100000,
      usd: 360,
      image: '/products/dark-archive-reserve/archive-hero.png',
      rarity: 'ARCHIVE RESERVE',
      description: '30-year aged leather, Himalayan black musk, proprietary dark amber. By invitation only.',
      accent: '#1a0a0a',
      badge: 'COLLECTOR ONLY',
    },
  ]

  function reveal(delay = 0) {
    return {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-60px' },
      transition: { duration: 1.1, ease, delay },
    }
  }

  function RarityDot({ rarity }: { rarity: string }) {
    const colors: Record<string, string> = {
      'FOUNDER SOVEREIGN': '#c9a054',
      'SUPREME SOVEREIGN': '#ffffff',
      'GRAND SOVEREIGN': '#d4af37',
      'GRAND RESERVE': '#cd7f32',
      'IMPERIAL RESERVE': '#9b9b9b',
      'ROYAL RESERVE': '#1a6eb5',
      'ARCHIVE RESERVE': '#8b0000',
      'FOUNDER RESERVE': '#c9a054',
    }
    return <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: colors[rarity] || '#c9a054', marginRight: 8, flexShrink: 0 }} />
  }

  function ProductCard({ p, index, featured = false }: { p: typeof PRODUCTS[0]; index: number; featured?: boolean }) {
    return (
      <motion.div
        {...reveal(index * 0.07)}
        style={{
          position: 'relative',
          background: 'linear-gradient(160deg, #080502 0%, #040301 100%)',
          border: `1px solid ${p.accent === '#c9a054' || p.rarity === 'FOUNDER SOVEREIGN' || p.rarity === 'SUPREME SOVEREIGN' ? 'rgba(201,160,84,0.25)' : 'rgba(255,255,255,0.07)'}`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.4s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.35)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = p.accent === '#c9a054' || p.rarity === 'FOUNDER SOVEREIGN' || p.rarity === 'SUPREME SOVEREIGN' ? 'rgba(201,160,84,0.25)' : 'rgba(255,255,255,0.07)' }}
      >
        {/* Badge */}
        {p.badge && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, background: 'linear-gradient(90deg, rgba(201,160,84,0.9), rgba(180,140,60,0.9))', padding: '6px 16px', textAlign: 'center' }}>
            <p style={{ fontSize: 7, letterSpacing: '0.6em', textTransform: 'uppercase', color: '#030303', fontWeight: 600 }}>◆ {p.badge}</p>
          </div>
        )}

        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: featured ? '3/4' : '4/5', background: '#0a0805', marginTop: p.badge ? 28 : 0 }}>
          <img
            src={p.image}
            alt={p.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3' }}
          />
          {/* Gold gradient bottom fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(0deg, #040301 0%, transparent 100%)' }} />
          {/* NFT badge */}
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c9a054', background: 'rgba(0,0,0,0.85)', padding: '4px 10px', border: '1px solid rgba(201,160,84,0.3)', backdropFilter: 'blur(4px)' }}>◆ NFT</p>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 'clamp(18px,2.5vw,28px)', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {/* Tagline */}
          <p style={{ fontSize: 7, letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.65)' }}>{p.tagline}</p>

          {/* Title block */}
          <div>
            <h3 style={{ fontFamily: SERIF, fontSize: `clamp(${featured ? '22px' : '18px'},${featured ? '2.8' : '2.2'}vw,${featured ? '28px' : '24px'})`, fontWeight: 300, color: '#f0ece4', lineHeight: 1.15, marginBottom: 4, letterSpacing: '0.04em' }}>{p.name}</h3>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(12px,1.4vw,14px)', fontWeight: 300, color: 'rgba(240,236,228,0.38)', fontStyle: 'italic' }}>{p.subtitle}</p>
          </div>

          {/* Description */}
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', lineHeight: 1.75, fontWeight: 300 }}>{p.description}</p>

          {/* Rarity */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RarityDot rarity={p.rarity} />
            <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.45)' }}>{p.rarity}</p>
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, rgba(201,160,84,0.25), transparent)' }} />

          {/* Price + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginTop: 'auto' }}>
            <div>
              <p style={{ fontFamily: SERIF, fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 300, color: '#f0ece4' }}>Rs {p.price.toLocaleString()}</p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', marginTop: 2 }}>${p.usd} USD</p>
            </div>
            <Link
              href={`/products/${p.slug}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', border: '1px solid rgba(201,160,84,0.35)', fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a054', textDecoration: 'none', background: 'transparent', transition: 'all 0.3s ease', whiteSpace: 'nowrap' as const }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,160,84,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.7)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.35)' }}
            >
              Acquire →
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  export default function ForHimCollectionPage() {
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
              Fifteen archives. One dominion. Zero compromises.
            </motion.p>
            <motion.div {...reveal(0.45)} style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.5)' }}>Scroll</p>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 1, height: 40, background: 'linear-gradient(180deg, #c9a054, transparent)' }} />
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
                "The House of Shamim Forever does not create fragrances for men. It creates instruments of legacy — olfactory architectures for men who have already decided who they are."
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.9, fontWeight: 300 }}>
                Each creation in the For Him Sovereign Archive is a permanent statement of masculine authority. Fifteen limited allocations spanning five Archives — from fresh royal cedar to absolute supreme darkness. NFT-authenticated provenance. Crafted in Karachi with museum-grade precision.
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', lineHeight: 1.9, fontWeight: 300 }}>
                Sirf woh log in creations ke liye hain jo success ko ek maqam nahi, balki ek tamaddun samajhte hain. Jo sirf khushbu nahi — permanent impression chahte hain.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── ARCHIVE TIER GUIDE ────────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(32px,5vw,64px) 0', background: '#030303', borderTop: '1px solid rgba(201,160,84,0.08)', borderBottom: '1px solid rgba(201,160,84,0.08)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,5vw,60px)' }}>
            <motion.div {...reveal()} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,3vw,40px)', justifyContent: 'center' }}>
              {[
                { rarity: 'SUPREME SOVEREIGN', color: '#ffffff', desc: 'The Absolute Pinnacle' },
                { rarity: 'FOUNDER SOVEREIGN', color: '#c9a054', desc: 'Founding Archive Tier' },
                { rarity: 'GRAND SOVEREIGN', color: '#d4af37', desc: 'Grand Archive Tier' },
                { rarity: 'GRAND RESERVE', color: '#cd7f32', desc: 'Grand Reserve Tier' },
                { rarity: 'IMPERIAL RESERVE', color: '#9b9b9b', desc: 'Imperial Allocation' },
                { rarity: 'ROYAL RESERVE', color: '#1a6eb5', desc: 'Royal Allocation' },
                { rarity: 'ARCHIVE RESERVE', color: '#8b0000', desc: 'By Invitation Only' },
              ].map(t => (
                <div key={t.rarity} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.color, display: 'inline-block', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.5)' }}>{t.rarity}</p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 1 }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── PRODUCTS GRID — ALL 15 ─────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(56px,8vw,100px) 0', background: '#030303' }}>
          <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 clamp(16px,4vw,40px)' }}>
            <motion.div {...reveal()} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
              <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>Sovereign Allocations — 2026</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 300, color: '#f0ece4', marginBottom: 16 }}>The Fifteen Archives</h2>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #c9a054, transparent)', margin: '0 auto 16px' }} />
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>15 SOVEREIGN MASCULINE CREATIONS · POLYGON AUTHENTICATED · ULTRA-LIMITED ALLOCATION</p>
            </motion.div>

            {/* Top 2 featured — largest */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', gap: 'clamp(12px,2vw,20px)', marginBottom: 'clamp(12px,2vw,20px)' }}>
              {PRODUCTS.slice(0, 2).map((p, i) => <ProductCard key={p.slug} p={p} index={i} featured />)}
            </div>

            {/* Next 4 — medium */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'clamp(12px,2vw,20px)', marginBottom: 'clamp(12px,2vw,20px)' }}>
              {PRODUCTS.slice(2, 6).map((p, i) => <ProductCard key={p.slug} p={p} index={i + 2} />)}
            </div>

            {/* Remaining 9 — standard grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 'clamp(12px,2vw,20px)' }}>
              {PRODUCTS.slice(6).map((p, i) => <ProductCard key={p.slug} p={p} index={i + 6} />)}
            </div>
          </div>
        </section>

        {/* ── AMBASSADOR STATEMENT ──────────────────────────────────────────────── */}
        <section style={{ position: 'relative', height: 'clamp(400px,65vh,680px)', overflow: 'hidden' }}>
          <img src="/ambassadors/salman-founders-archive.png" alt="Founder's Eternal Archive" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%', display: 'block' }} />
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
              <Link href="/products/founder-s-eternal-archive" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 28px', border: '1px solid rgba(201,160,84,0.5)', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a054', textDecoration: 'none', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
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
                {['Ultra-Limited Allocation', 'Polygon Verified', '15 Masculine Archives', 'Holder Privileges Included', 'Karachi Sovereign Atelier'].map(tag => (
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
                Fifteen masculine creations await. Each one a permanent statement. Each one an irrevocable legacy. Select your archive — or claim them all.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
              <Link href="/products/founder-s-eternal-archive" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'linear-gradient(135deg, #c9a054, #a0783c)', fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#030303', textDecoration: 'none', fontWeight: 600 }}>
                ◆ Acquire Founder Reserve
              </Link>
              <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', border: '1px solid rgba(201,160,84,0.4)', fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c9a054', textDecoration: 'none', background: 'transparent' }}>
                Full Sovereign Archive
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    )
  }
  