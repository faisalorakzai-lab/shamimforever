'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/* ─── Typography helpers ─── */
const ease = [0.16, 1, 0.3, 1] as const

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.3, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Chapter label ─── */
function ChapterLabel({ num, title }: { num: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className="flex items-center gap-5 mb-14"
    >
      <span
        className="text-[10px] tracking-[0.6em] uppercase"
        style={{ color: '#D4AF37', fontFamily: 'Inter, sans-serif' }}
      >
        Chapter {num}
      </span>
      <div className="flex-1 max-w-[60px] h-px" style={{ background: '#D4AF37', opacity: 0.25 }} />
      <span
        className="text-[9px] tracking-[0.5em] uppercase"
        style={{ color: 'rgba(248,248,248,0.3)', fontFamily: 'Inter, sans-serif' }}
      >
        {title}
      </span>
    </motion.div>
  )
}

/* ─── OKBOND Glitch ─── */
function OkbondGlitch() {
  const [glitching, setGlitching] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 400)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  return (
    <span
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700,
        color: '#D4AF37',
        letterSpacing: '0.25em',
        position: 'relative',
        display: 'inline-block',
        textShadow: glitching
          ? '3px 0 rgba(59,130,246,0.7), -3px 0 rgba(239,68,68,0.5)'
          : 'none',
        transform: glitching ? 'skewX(-2deg)' : 'skewX(0deg)',
        transition: 'text-shadow 0.05s, transform 0.05s',
      }}
    >
      OKBOND
    </span>
  )
}

export default function OurStoryPage() {
  /* ── Hero parallax ── */
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroVideoY = useTransform(heroP, [0, 1], ['0%', '25%'])
  const heroContentOpacity = useTransform(heroP, [0, 0.75], [1, 0])

  /* ── Chapter III craft zoom ── */
  const craftRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: craftP } = useScroll({ target: craftRef, offset: ['start end', 'end start'] })
  const craftScale = useTransform(craftP, [0, 1], [1, 1.14])

  /* ── Interactive filter (Chapter II) ── */
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const filterDesc: Record<string, string> = {
    Beauty: 'Beyond transient beauty lies permanence.',
    Price: 'Value is measured in meaning, not currency.',
    Soul: 'Soul — the quality that makes a thing worth keeping across generations.',
  }

  return (
    <>
      {/* ─── Google Fonts — scoped to this page only ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400&display=swap');

        .lx-head {
          font-family: 'Playfair Display', Georgia, serif;
          letter-spacing: 0.06em;
          line-height: 1.02;
        }
        .lx-body {
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 300;
          line-height: 2;
          color: rgba(248,248,248,0.55);
          letter-spacing: 0.03em;
        }
        .lx-caption {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.55em;
          text-transform: uppercase;
          color: #D4AF37;
        }
        .gold-btn:hover {
          background: #D4AF37;
          color: #050505;
        }
      `}</style>

      <div style={{ background: '#050505', color: '#F8F8F8', overflowX: 'hidden' }}>

        {/* ════════════════════════════════
            HERO — Full-screen video
        ════════════════════════════════ */}
        <section ref={heroRef} style={{ position: 'relative', height: '100dvh', overflow: 'hidden' }}>

          {/* Video layer */}
          <motion.div style={{ y: heroVideoY, position: 'absolute', inset: '-10%' }}>
            <video
              autoPlay muted loop playsInline preload="auto"
              poster="/founder-5.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.28) contrast(1.12) saturate(0.6)' }}
            >
              <source src="/videos/our-story-hero.mp4" type="video/mp4" />
              <img src="/founder-5.png" alt="Shamim Forever" />
            </video>
          </motion.div>

          {/* Overlays */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.25) 45%, rgba(5,5,5,0.92) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.15) 60%, transparent 100%)' }} />

          {/* Content */}
          <motion.div
            style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 32px', opacity: heroContentOpacity }}
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="lx-caption"
              style={{ marginBottom: '3.5rem' }}
            >
              Our Story
            </motion.p>

            {/* Main headline */}
            <div style={{ overflow: 'hidden', marginBottom: '0.2em' }}>
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="lx-head"
                style={{ fontSize: 'clamp(2.8rem, 7.5vw, 8rem)', fontWeight: 400, color: '#F8F8F8', margin: 0 }}
              >
                Built From Love.
              </motion.h1>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '3.5rem' }}>
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                className="lx-head"
                style={{ fontSize: 'clamp(2.8rem, 7.5vw, 8rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(248,248,248,0.45)', margin: 0 }}
              >
                Forged Into Legacy.
              </motion.h1>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: 80, height: 1, background: 'linear-gradient(to right, transparent, #D4AF37, transparent)', marginBottom: '3rem' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.8 }}
              className="lx-body"
              style={{ maxWidth: 520, fontSize: '0.88rem' }}
            >
              Shamim Forever transcends the conventional — a profound testament to the preservation of cherished emotion, indelible memory, and timeless identity. An ode to permanence in an ephemeral world.
            </motion.p>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.4 }}
              style={{ position: 'absolute', bottom: '5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, #D4AF37, transparent)' }}
              />
              <span className="lx-caption" style={{ color: 'rgba(248,248,248,0.25)', letterSpacing: '0.45em' }}>
                Scroll to explore
              </span>
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(5,5,5,0.75)', backdropFilter: 'blur(12px)', padding: '1.1rem 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 6vw, 5rem)', flexWrap: 'wrap' }}>
              {['Est. 2023', '925 Sterling Silver', '∞  The Standard', 'Forever The Promise'].map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.6 + i * 0.12 }}
                  className="lx-caption"
                  style={{ color: 'rgba(212,175,55,0.5)', fontSize: 8, letterSpacing: '0.45em' }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            CHAPTER I — The Genesis
        ════════════════════════════════ */}
        <section style={{ borderBottom: '1px solid #111', overflow: 'hidden' }}>

          {/* Desktop */}
          <div className="hidden lg:flex" style={{ minHeight: '100vh' }}>

            {/* Image column */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease }}
              style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
            >
              <img
                src="/founder-1.png"
                alt="The Genesis — Shamim"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'brightness(0.68) contrast(1.05) saturate(0.8)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #050505)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 45%)' }} />
            </motion.div>

            {/* Text column */}
            <div style={{ width: '52%', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 6rem 6rem 5rem', borderLeft: '1px solid #111' }}>
              <ChapterLabel num="I" title="The Genesis of Emotion" />

              <FadeUp delay={0.1}>
                <h2 className="lx-head" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 5.5rem)', fontWeight: 400, color: '#F8F8F8', marginBottom: '2.5rem' }}>
                  Born From<br />Remembrance,<br />
                  <em style={{ color: 'rgba(248,248,248,0.38)', fontStyle: 'italic' }}>Not Markets.</em>
                </h2>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div style={{ width: 48, height: 1, background: '#D4AF37', opacity: 0.4, marginBottom: '2.5rem' }} />
              </FadeUp>

              <FadeUp delay={0.3}>
                <p className="lx-body" style={{ fontSize: '1.05rem', color: 'rgba(248,248,248,0.65)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  Every enduring legacy finds its genesis not in strategic blueprints, but in a profound, ineffable sentiment that compels its very existence.
                </p>
              </FadeUp>

              <FadeUp delay={0.4}>
                <p className="lx-body" style={{ fontSize: '0.85rem' }}>
                  Shamim Forever emerged from the crucible of remembrance — a sanctuary distinct from the transient currents of markets and ephemeral trends. What began as an intimately personal emotional resonance has blossomed into a sovereign luxury atelier, meticulously sculpted around meaning, unparalleled craftsmanship, and timeless presence.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img src="/founder-1.png" alt="The Genesis" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'brightness(0.68) contrast(1.05) saturate(0.8)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.1) 60%, transparent 100%)' }} />
            </motion.div>
            <div style={{ padding: '4rem 2rem 5rem' }}>
              <ChapterLabel num="I" title="The Genesis of Emotion" />
              <FadeUp>
                <h2 className="lx-head" style={{ fontSize: 'clamp(2.2rem, 8vw, 4rem)', fontWeight: 400, color: '#F8F8F8', marginBottom: '2rem' }}>
                  Born From Remembrance,<br />
                  <em style={{ color: 'rgba(248,248,248,0.38)' }}>Not Markets.</em>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div style={{ width: 40, height: 1, background: '#D4AF37', opacity: 0.4, marginBottom: '2rem' }} />
                <p className="lx-body" style={{ fontSize: '0.9rem', color: 'rgba(248,248,248,0.65)', marginBottom: '1.25rem', fontStyle: 'italic' }}>
                  Every enduring legacy finds its genesis not in strategic blueprints, but in a profound, ineffable sentiment.
                </p>
                <p className="lx-body" style={{ fontSize: '0.82rem' }}>
                  Shamim Forever emerged from the crucible of remembrance — a sanctuary distinct from the transient currents of markets. What began as an intimately personal resonance has blossomed into a sovereign luxury atelier.
                </p>
              </FadeUp>
            </div>
          </div>

        </section>

        {/* ════════════════════════════════
            CHAPTER II — The Declaration
        ════════════════════════════════ */}
        <section style={{ padding: 'clamp(5rem, 12vw, 10rem) clamp(2rem, 8vw, 7rem)', textAlign: 'center', borderBottom: '1px solid #111', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <ChapterLabel num="II" title="A Declaration of Intent" />

            <FadeUp>
              <h2 className="lx-head" style={{ fontSize: 'clamp(2.6rem, 6vw, 6rem)', fontWeight: 400, color: '#F8F8F8', marginBottom: '4rem' }}>
                Not a Brand.<br />
                <em style={{ color: 'rgba(248,248,248,0.35)' }}>A Declaration.</em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div style={{ width: 1, height: 72, background: 'linear-gradient(to bottom, transparent, #D4AF37, transparent)', margin: '0 auto 4rem' }} />
            </FadeUp>

            <FadeUp delay={0.2}>
              <blockquote className="lx-head" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(248,248,248,0.78)', lineHeight: 1.5, margin: '0 0 1.5rem', padding: '0 1rem' }}>
                "True luxury is not created for attention.<br />It is created for permanence."
              </blockquote>
              <p className="lx-caption" style={{ color: 'rgba(212,175,55,0.5)', marginBottom: '4.5rem' }}>
                — The House of Shamim Forever
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="lx-body" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Shamim Forever was conceived as an antidote to cacophony. In an era defined by pervasive visibility yet often devoid of intrinsic substance, the House deliberately chose an antithetical path — one consecrated to profound silence, unwavering structural integrity, and unparalleled emotional depth.
              </p>
              <p className="lx-body" style={{ fontSize: '0.85rem', marginBottom: '3.5rem' }}>
                Every creation is evaluated through a singular inquiry: <em style={{ color: 'rgba(248,248,248,0.6)' }}>Does this possess an intrinsic soul?</em>
              </p>
            </FadeUp>

            {/* Interactive filter */}
            <FadeUp delay={0.35}>
              <p className="lx-caption" style={{ marginBottom: '1.25rem', color: 'rgba(212,175,55,0.4)' }}>We do not evaluate by</p>
              <div style={{ display: 'flex', border: '1px solid #1a1a1a', marginBottom: '1rem' }}>
                {['Beauty', 'Price', 'Soul'].map((f, i) => (
                  <button
                    key={f}
                    onMouseEnter={() => setActiveFilter(f)}
                    onMouseLeave={() => setActiveFilter(null)}
                    style={{
                      flex: 1,
                      padding: '1.1rem',
                      fontSize: 9,
                      letterSpacing: '0.5em',
                      textTransform: 'uppercase',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 300,
                      background: activeFilter === f ? '#D4AF37' : 'transparent',
                      color: activeFilter === f ? '#050505' : activeFilter ? 'rgba(248,248,248,0.2)' : '#D4AF37',
                      border: 'none',
                      borderRight: i < 2 ? '1px solid #1a1a1a' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {activeFilter && (
                  <motion.p
                    key={activeFilter}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="lx-caption"
                    style={{ color: 'rgba(248,248,248,0.35)', letterSpacing: '0.3em' }}
                  >
                    {filterDesc[activeFilter]}
                  </motion.p>
                )}
              </AnimatePresence>
            </FadeUp>
          </div>
        </section>

        {/* ════════════════════════════════
            CHAPTER III — The Mastery
        ════════════════════════════════ */}
        <section ref={craftRef} style={{ borderBottom: '1px solid #111', overflow: 'hidden' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '90vh' }}>

            {/* Zoom-on-scroll visual */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease }}
              style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}
              className="lg:aspect-auto"
            >
              <motion.img
                src="/products/chopard-happy-diamonds-necklace/hero.png"
                alt="925 Sterling Silver — The Craft"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.5) contrast(1.2) saturate(0.55)', scale: craftScale }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(5,5,5,0.6))' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                <span className="lx-caption" style={{ color: 'rgba(212,175,55,0.6)', fontSize: 8, letterSpacing: '0.6em' }}>925 Sterling Silver</span>
                <div style={{ width: 32, height: 1, background: '#D4AF37', opacity: 0.35, marginTop: 6 }} />
              </div>
            </motion.div>

            {/* Text */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(3rem, 6vw, 6rem)', borderLeft: '1px solid #111' }}>
              <ChapterLabel num="III" title="Discipline Before Detail" />

              <FadeUp>
                <h2 className="lx-head" style={{ fontSize: 'clamp(2.2rem, 4vw, 5rem)', fontWeight: 400, color: '#F8F8F8', marginBottom: '2.5rem' }}>
                  Discipline<br />
                  <em style={{ color: 'rgba(248,248,248,0.35)' }}>Before Detail.</em>
                </h2>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div style={{ width: 40, height: 1, background: '#D4AF37', opacity: 0.4, marginBottom: '2.5rem' }} />
                <p className="lx-body" style={{ fontSize: '0.95rem', color: 'rgba(248,248,248,0.65)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  Within the hallowed halls of the House, serendipity holds no dominion. Each material is chosen with unwavering, singular intent.
                </p>
                <p className="lx-body" style={{ fontSize: '0.84rem', marginBottom: '3rem' }}>
                  Our 925 sterling silver is painstakingly hand-finished to achieve a mirror-like brilliance. Our exquisite Oud compositions are cultivated over months, not days — allowing their profound complexities to fully mature. The packaging is an extension of the object itself. The process is the product.
                </p>
              </FadeUp>

              {/* Detail grid */}
              <FadeUp delay={0.25}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid #1a1a1a' }}>
                  {[
                    { label: '925', sub: 'Sterling Silver' },
                    { label: 'Hand', sub: 'Finished' },
                    { label: 'Months', sub: 'Cultivated' },
                    { label: '∞', sub: 'The Standard' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ background: 'rgba(212,175,55,0.04)' }}
                      style={{ padding: '1.5rem', borderRight: i % 2 === 0 ? '1px solid #1a1a1a' : 'none', borderBottom: i < 2 ? '1px solid #1a1a1a' : 'none', transition: 'background 0.4s' }}
                    >
                      <p className="lx-head" style={{ fontSize: '1.5rem', fontWeight: 400, color: '#D4AF37', marginBottom: '0.3rem' }}>{item.label}</p>
                      <p className="lx-caption" style={{ color: 'rgba(248,248,248,0.3)', fontSize: 8, letterSpacing: '0.45em' }}>{item.sub}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════
            CHAPTER IV — OKBOND / Sovereign Future
        ════════════════════════════════ */}
        <section style={{ borderBottom: '1px solid #111', overflow: 'hidden' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '90vh' }}>

            {/* Text */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(3rem, 6vw, 6rem)', borderRight: '1px solid #111', order: 2 }} className="lg:order-1">
              <ChapterLabel num="IV" title="The Sovereign Future" />

              <FadeUp>
                <h2 className="lx-head" style={{ fontSize: 'clamp(2.2rem, 4vw, 5rem)', fontWeight: 400, color: '#F8F8F8', marginBottom: '2.5rem' }}>
                  Architecture of<br />
                  <em style={{ color: 'rgba(248,248,248,0.35)' }}>A New Ownership.</em>
                </h2>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div style={{ width: 40, height: 1, background: '#D4AF37', opacity: 0.4, marginBottom: '2.5rem' }} />
                <p className="lx-body" style={{ fontSize: '0.95rem', color: 'rgba(248,248,248,0.65)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  The trajectory of Shamim Forever transcends conventional luxury — venturing into a novel paradigm where digital and material sovereignty are inextricably intertwined.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="lx-body" style={{ fontSize: '0.84rem', marginBottom: '2.5rem' }}>
                  <OkbondGlitch /> stands as the House's unequivocal declaration: true luxury must assert its sovereignty within its foundational systems. Liberated from external platforms, free from intermediaries, defiant of mass commerce.
                </p>
              </FadeUp>

              {/* High-tech detail strip */}
              <FadeUp delay={0.3}>
                <div style={{ border: '1px solid #1a1a1a', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                  <motion.div
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }}
                  />
                  <p className="lx-caption" style={{ marginBottom: '0.75rem', color: 'rgba(212,175,55,0.5)' }}>Status: Forthcoming</p>
                  <p className="lx-body" style={{ fontSize: '0.82rem' }}>
                    The forthcoming decade shall belong to those audacious few who dare to build their own sovereign architecture — commanding their own narrative, their own platforms, their own permanence.
                  </p>
                </div>
              </FadeUp>
            </div>

            {/* Visual — digital glow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease }}
              style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', order: 1 }}
              className="lg:aspect-auto lg:order-2"
            >
              <img
                src="/founder-3.png"
                alt="Sovereign Future"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'brightness(0.4) contrast(1.18) saturate(0.6)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent, rgba(5,5,5,0.65))' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.65) 0%, transparent 55%)' }} />

              {/* Pulsing gold glow */}
              <motion.div
                animate={{ opacity: [0.3, 0.75, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 35%, rgba(212,175,55,0.28) 0%, rgba(212,175,55,0) 65%)', pointerEvents: 'none' }}
              />

              {/* OKBOND watermark */}
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 11, letterSpacing: '0.4em', color: 'rgba(212,175,55,0.3)', textTransform: 'uppercase' }}>OKBOND</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ════════════════════════════════
            PHILOSOPHY — Values
        ════════════════════════════════ */}
        <section style={{ padding: 'clamp(5rem, 12vw, 10rem) clamp(2rem, 8vw, 5rem)', borderBottom: '1px solid #111', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
            <FadeUp>
              <div style={{ width: 1, height: 56, background: 'linear-gradient(to bottom, transparent, #D4AF37)', margin: '0 auto 4rem' }} />
              <p className="lx-caption" style={{ marginBottom: '3.5rem' }}>The Philosophy</p>
              <blockquote className="lx-head" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 400, color: '#F8F8F8', lineHeight: 1.3, marginBottom: '1.25rem' }}>
                "True luxury does not seek<br />fleeting attention —
              </blockquote>
              <blockquote className="lx-head" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(248,248,248,0.4)', lineHeight: 1.3, marginBottom: '2rem' }}>
                it is crafted for enduring permanence."
              </blockquote>
              <p className="lx-caption" style={{ color: 'rgba(212,175,55,0.4)', marginBottom: '5rem' }}>— The House of Shamim Forever</p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="lx-caption" style={{ color: 'rgba(248,248,248,0.2)', marginBottom: '3rem' }}>Our tenets are immutable</p>
            </FadeUp>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, border: '1px solid #1a1a1a' }} className="md:grid-cols-4">
              {[
                { title: 'Timelessness', sub: 'over transient trends' },
                { title: 'Discipline', sub: 'over pervasive noise' },
                { title: 'Authentic Identity', sub: 'over superficial imitation' },
                { title: 'Enduring Legacy', sub: 'over ephemeral speed' },
              ].map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease }}
                  whileHover={{ backgroundColor: 'rgba(212,175,55,0.04)' }}
                  style={{
                    padding: '2.5rem 1.5rem',
                    borderRight: i % 2 === 0 ? '1px solid #1a1a1a' : 'none',
                    borderBottom: i < 2 ? '1px solid #1a1a1a' : 'none',
                    textAlign: 'left',
                    transition: 'background 0.5s',
                    cursor: 'default',
                  }}
                  className="md:border-r md:border-b-0"
                >
                  <div style={{ width: 24, height: 1, background: '#D4AF37', opacity: 0.4, marginBottom: '1.5rem' }} />
                  <p className="lx-head" style={{ fontSize: '1.15rem', fontWeight: 500, color: '#F8F8F8', marginBottom: '0.6rem' }}>{v.title}</p>
                  <p className="lx-caption" style={{ color: 'rgba(248,248,248,0.25)', fontSize: 8, letterSpacing: '0.4em' }}>{v.sub}</p>
                </motion.div>
              ))}
            </div>

            <FadeUp delay={0.2}>
              <div style={{ width: 1, height: 56, background: 'linear-gradient(to top, transparent, #D4AF37)', margin: '5rem auto 0' }} />
            </FadeUp>
          </div>
        </section>

        {/* ════════════════════════════════
            FINAL — "Forever."
        ════════════════════════════════ */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img src="/founder-5.png" alt="Shamim Forever" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'brightness(0.16) contrast(1.15) saturate(0.5)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.7) 50%, rgba(5,5,5,0.5) 100%)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: 'clamp(4rem, 10vw, 8rem) 2rem', maxWidth: 860, margin: '0 auto' }}>
            <FadeUp>
              <p className="lx-caption" style={{ marginBottom: '4rem' }}>Forever</p>
              <p className="lx-body" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'rgba(248,248,248,0.45)', marginBottom: '4rem', fontStyle: 'italic', lineHeight: 2.2 }}>
                While many marques merely transact in products, and others chase the fleeting currents of trends, a select few are destined to forge something far more profound —
              </p>
            </FadeUp>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: 80, height: 1, background: 'linear-gradient(to right, transparent, #D4AF37, transparent)', margin: '0 auto 4rem' }}
            />

            {/* Dramatic "Forever." */}
            <motion.h2
              initial={{ opacity: 0, y: 70, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lx-head"
              style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', fontWeight: 400, fontStyle: 'italic', color: '#D4AF37', marginBottom: '5rem', letterSpacing: '0.08em' }}
            >
              Forever.
            </motion.h2>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease, delay: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
              className="sm:flex-row sm:justify-center"
            >
              <Link
                href="/shop"
                className="gold-btn"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '1.1rem 3rem', border: '1px solid rgba(212,175,55,0.55)', fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', color: '#D4AF37', textDecoration: 'none', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)' }}
              >
                Discover the Collection
              </Link>
              <Link
                href="/journal"
                className="lx-caption"
                style={{ color: 'rgba(248,248,248,0.28)', textDecoration: 'none', transition: 'color 0.4s', letterSpacing: '0.4em' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,248,0.28)')}
              >
                Explore the Journal →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════
            CONCIERGE FOOTER
        ════════════════════════════════ */}
        <section style={{ borderTop: '1px solid #111', padding: 'clamp(3rem, 7vw, 5rem) clamp(2rem, 8vw, 5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', textAlign: 'center' }} className="sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="lx-caption" style={{ marginBottom: '0.75rem' }}>The House</p>
            <p className="lx-head" style={{ fontSize: '1.5rem', fontWeight: 400, color: '#F8F8F8' }}>Shamim Forever</p>
          </div>

          <motion.a
            href="/shop"
            whileHover={{ backgroundColor: '#D4AF37', color: '#050505' }}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '1.1rem 2.5rem', border: '1px solid rgba(212,175,55,0.6)', fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', color: '#D4AF37', textDecoration: 'none', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)', whiteSpace: 'nowrap' }}
          >
            Enter the Atelier
          </motion.a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }} className="sm:items-end">
            <a href="/sovereign-panel" className="lx-caption" style={{ color: 'rgba(248,248,248,0.22)', textDecoration: 'none', transition: 'color 0.4s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,248,0.22)')}>
              Sovereign Panel
            </a>
            <a href="/virtual-atelier" className="lx-caption" style={{ color: 'rgba(248,248,248,0.22)', textDecoration: 'none', transition: 'color 0.4s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,248,0.22)')}>
              Virtual Atelier
            </a>
          </div>
        </section>

      </div>
    </>
  )
}
