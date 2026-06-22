'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import Link from 'next/link'

/* ══════════════════════════════════════
   CONSTANTS
══════════════════════════════════════ */
const GOLD = '#D4AF37'
const BG   = '#050505'
const ease = [0.16, 1, 0.3, 1] as const

/* ══════════════════════════════════════
   CHAPTER NAVIGATOR (fixed left dots)
══════════════════════════════════════ */
const CHAPTERS = [
  { num: 'I',   id: 'chapter-1', label: 'The Genesis' },
  { num: 'II',  id: 'chapter-2', label: 'A Declaration' },
  { num: 'III', id: 'chapter-3', label: 'Mastery' },
  { num: 'IV',  id: 'chapter-4', label: 'Sovereign Future' },
]

function ChapterNavigator() {
  const [active, setActive] = useState<string>('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.25 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    // Show navigator after hero scrolls past
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observers.forEach(o => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Chapter navigation"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            left: '1.4rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 9980,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.6rem',
            alignItems: 'flex-start',
          }}
        >
          {CHAPTERS.map(({ num, id, label }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                title={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  outline: 'none',
                }}
              >
                {/* Roman numeral dot */}
                <motion.div
                  animate={{
                    width: isActive ? 28 : 12,
                    background: isActive ? GOLD : 'rgba(212,175,55,0.25)',
                    boxShadow: isActive ? `0 0 10px 2px rgba(212,175,55,0.5)` : 'none',
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: 1, borderRadius: 1 }}
                />
                {/* Label — only shown when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 7,
                        letterSpacing: '0.45em',
                        textTransform: 'uppercase',
                        color: GOLD,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {num}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

/* ══════════════════════════════════════
   SCROLL PROGRESS BAR (vertical, right side)
══════════════════════════════════════ */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        right: '1.4rem',
        top: 0,
        bottom: 0,
        width: 1,
        zIndex: 9990,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Track */}
      <div style={{ position: 'absolute', inset: 0, background: `rgba(212,175,55,0.08)` }} />
      {/* Fill */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          scaleY,
          transformOrigin: 'top',
          background: `linear-gradient(to bottom, ${GOLD}00, ${GOLD}, ${GOLD}88)`,
          boxShadow: `0 0 8px 1px ${GOLD}55`,
        }}
      />
    </motion.div>
  )
}

/* ══════════════════════════════════════
   MAGNETIC BUTTON
══════════════════════════════════════ */
function MagneticBtn({
  children,
  href,
  variant = 'outline',
}: {
  children: React.ReactNode
  href: string
  variant?: 'outline' | 'ghost'
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(0, { stiffness: 160, damping: 22 })
  const y = useSpring(0, { stiffness: 160, damping: 22 })

  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.32)
    y.set((e.clientY - r.top  - r.height / 2) * 0.32)
  }, [x, y])

  const onLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])

  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '1.1rem 2.8rem',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase' as const,
    textDecoration: 'none', cursor: 'pointer',
    transition: 'background 0.5s, color 0.5s',
    whiteSpace: 'nowrap' as const,
  }

  const styles: React.CSSProperties = variant === 'outline'
    ? { ...base, border: `1px solid ${GOLD}60`, color: GOLD }
    : { ...base, color: `rgba(248,248,248,0.3)`, border: 'none', background: 'transparent' }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ ...styles, x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={variant === 'outline' ? { backgroundColor: GOLD, color: BG } : { color: GOLD }}
    >
      {children}
    </motion.a>
  )
}

/* ══════════════════════════════════════
   STAGGERED SECTION REVEAL
══════════════════════════════════════ */
const stagContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.05 } },
}
const stagChild = {
  hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] } },
}

/* Parallax reveal for images — mask slides open from center */
const imgReveal = {
  hidden: { clipPath: 'inset(0 50% 0 50%)', opacity: 0, filter: 'brightness(0.4)' },
  show:   {
    clipPath: 'inset(0 0% 0 0%)',
    opacity: 1,
    filter: 'brightness(1)',
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ══════════════════════════════════════
   CHAPTER LABEL (sticky)
══════════════════════════════════════ */
function ChapLabel({ num, sub }: { num: string; sub: string }) {
  return (
    <div
      style={{
        position: 'sticky', top: '6rem', zIndex: 20, alignSelf: 'flex-start',
        display: 'flex', flexDirection: 'column', gap: 6,
        padding: '1rem 0',
      }}
    >
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.6em', textTransform: 'uppercase', color: GOLD }}>
        Chapter {num}
      </span>
      <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.25 }} />
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.22)' }}>
        {sub}
      </span>
    </div>
  )
}

/* ══════════════════════════════════════
   OUTLINED CHAPTER NUMBER (high-fashion)
══════════════════════════════════════ */
function ChapNumOutline({ num }: { num: string }) {
  return (
    <div
      aria-hidden
      className="chap-num-outline"
      style={{
        position: 'absolute',
        top: '-0.15em',
        left: '-0.1em',
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700,
        fontStyle: 'italic',
        fontSize: 'clamp(8rem, 18vw, 20rem)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
        WebkitTextStroke: `1px rgba(212,175,55,0.13)`,
        color: 'transparent',
        letterSpacing: '-0.05em',
      }}
    >
      {num}
    </div>
  )
}

/* ══════════════════════════════════════
   WATERMARK TEXT (parallax + breathing for FOREVER)
══════════════════════════════════════ */
function Watermark({ text, progress, from = '-6%', to = '6%', breathe = false }: {
  text: string; progress: any; from?: string; to?: string; breathe?: boolean
}) {
  const y = useTransform(progress, [0, 1], [from, to])
  return (
    <motion.div
      aria-hidden
      style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
        y,
      }}
    >
      <span
        className={breathe ? 'watermark-breathe' : ''}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic', fontWeight: 700,
          fontSize: 'clamp(5rem, 20vw, 18rem)',
          color: 'rgba(248,248,248,0.025)',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          whiteSpace: 'nowrap', userSelect: 'none',
          lineHeight: 1,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    </motion.div>
  )
}

/* ══════════════════════════════════════
   OKBOND — glitch + gold glow
══════════════════════════════════════ */
function OkbondGlitch() {
  const [g, setG] = useState(false)
  useEffect(() => {
    const id = setInterval(() => {
      setG(true); setTimeout(() => setG(false), 350)
    }, 4800)
    return () => clearInterval(id)
  }, [])
  return (
    <motion.span
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700, fontStyle: 'italic',
        color: GOLD, letterSpacing: '0.2em',
        display: 'inline-block',
        textShadow: g
          ? `3px 0 rgba(59,130,246,0.7), -3px 0 rgba(239,68,68,0.5)`
          : `0 0 18px rgba(212,175,55,0.55), 0 0 40px rgba(212,175,55,0.2)`,
        transform: g ? 'skewX(-3deg)' : 'skewX(0)',
        transition: 'text-shadow 0.06s, transform 0.06s',
      }}
    >
      OKBOND
    </motion.span>
  )
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */

function PillarCard({ roman, title, subtitle, icon, desc, hover, delay }: {
  roman: string; title: string; subtitle: string; icon: string;
  desc: string; hover: string; delay: number;
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', padding: 'clamp(2.5rem,5vw,3.5rem)',
        background: hovered ? 'rgba(212,175,55,0.04)' : '#030303',
        borderRight: '1px solid #111', transition: 'background 0.5s ease',
        cursor: 'default', overflow: 'hidden',
      }}
    >
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
        style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1,
          background: 'linear-gradient(to bottom, transparent, #D4AF37, transparent)', transformOrigin: 'top' }}
      />
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem,6vw,5rem)', fontWeight: 700,
        fontStyle: 'italic', color: hovered ? 'rgba(212,175,55,0.15)' : 'rgba(212,175,55,0.07)',
        lineHeight: 1, marginBottom: '1rem', transition: 'color 0.4s' }}>{roman}</div>
      <div style={{ fontSize: 20, color: 'rgba(212,175,55,0.5)', marginBottom: '1.2rem' }}>{icon}</div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 7.5, letterSpacing: '0.45em',
        textTransform: 'uppercase', color: 'rgba(212,175,55,0.65)', marginBottom: '0.7rem' }}>{title}</div>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.1rem,2vw,1.5rem)',
        fontStyle: 'italic', color: 'rgba(248,248,248,0.7)', marginBottom: '1.2rem', lineHeight: 1.2 }}>{subtitle}</div>
      <div style={{ width: 24, height: 1, background: 'rgba(212,175,55,0.35)', marginBottom: '1.5rem' }} />
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.78rem,1.4vw,0.86rem)', lineHeight: 1.9,
        color: 'rgba(248,248,248,0.36)', fontWeight: 300, letterSpacing: '0.02em', marginBottom: '1.5rem' }}>{desc}</p>
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }} transition={{ duration: 0.35 }}
        style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(0.85rem,1.5vw,1rem)',
          fontStyle: 'italic', color: 'rgba(212,175,55,0.6)' }}
      >{hover}</motion.div>
    </motion.div>
  )
}

export default function OurStoryPage() {

  /* Hero scroll */
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroVidY   = useTransform(heroP, [0, 1], ['0%', '28%'])
  const heroFade   = useTransform(heroP, [0, 0.8], [1, 0])

  /* Chapter parallax refs */
  const ch1Ref = useRef<HTMLDivElement>(null)
  const ch2Ref = useRef<HTMLDivElement>(null)
  const ch3Ref = useRef<HTMLDivElement>(null)
  const ch4Ref = useRef<HTMLDivElement>(null)
  const philRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: ch1P } = useScroll({ target: ch1Ref, offset: ['start end', 'end start'] })
  const { scrollYProgress: ch2P } = useScroll({ target: ch2Ref, offset: ['start end', 'end start'] })
  const { scrollYProgress: ch3P } = useScroll({ target: ch3Ref, offset: ['start end', 'end start'] })
  const { scrollYProgress: ch4P } = useScroll({ target: ch4Ref, offset: ['start end', 'end start'] })
  const { scrollYProgress: philP } = useScroll({ target: philRef, offset: ['start end', 'end start'] })

  /* Parallax Y for chapter images */
  const ch1ImgY = useTransform(ch1P, [0, 1], ['-8%', '8%'])
  const ch3ImgY = useTransform(ch3P, [0, 1], ['-6%', '6%'])
  const ch4ImgY = useTransform(ch4P, [0, 1], ['-8%', '8%'])

  /* Craft hover zoom */
  const [craftHover, setCraftHover] = useState(false)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Inter:wght@300;400&display=swap');

        /* ── Film grain overlay ── */
        .grain-wrap::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px 200px;
          mix-blend-mode: overlay;
        }

        .pf { font-family: 'Playfair Display', Georgia, serif; }
        .inter { font-family: 'Inter', system-ui, sans-serif; font-weight: 300; }
        .gold-cap { font-family: 'Inter', system-ui, sans-serif; font-size: 9px; letter-spacing: 0.55em; text-transform: uppercase; color: ${GOLD}; }
        .sub-body { font-family: 'Inter', system-ui, sans-serif; font-weight: 300; line-height: 2.1; letter-spacing: 0.03em; color: rgba(248,248,248,0.45); }

        /* ── FOREVER breathing animation ── */
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.022); }
        }
        .watermark-breathe { animation: breathe 7s ease-in-out infinite; }

        /* ── Vignette corners on hero ── */
        .hero-vignette::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 0% 0%,   rgba(0,0,0,0.72) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 100% 0%,  rgba(0,0,0,0.72) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 0% 100%,  rgba(0,0,0,0.65) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 100% 100%,rgba(0,0,0,0.65) 0%, transparent 55%);
          pointer-events: none;
          z-index: 2;
        }

        /* ── Glassmorphism text panel ── */
        .glass-panel {
          background: rgba(5,5,5,0.38);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(212,175,55,0.18);
        }

        /* ── OKBOND pulse border ── */
        @keyframes okpulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); border-color: rgba(212,175,55,0.25); }
          50%      { box-shadow: 0 0 28px 5px rgba(212,175,55,0.22); border-color: rgba(212,175,55,0.75); }
        }
        .okbond-box { animation: okpulse 3.2s ease-in-out infinite; }

        /* ── OKBOND logo glow pulse ── */
        @keyframes okglow {
          0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.0), inset 0 0 0 0 rgba(212,175,55,0.0); }
          50%      { box-shadow: 0 0 30px 8px rgba(212,175,55,0.18), inset 0 0 20px 0 rgba(212,175,55,0.06); }
        }
        .okbond-glow { animation: okglow 3.5s ease-in-out infinite; }

        /* ── Value card hover ── */
        .val-card:hover { background: rgba(212,175,55,0.04); }

        /* ── Craft image zoom ── */
        .craft-img { transition: transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 1.2s; }
        .craft-img:hover { transform: scale(1.07) !important; filter: brightness(0.62) contrast(1.2) saturate(0.7) !important; }

        /* ── Image gold line reveal ── */
        .img-reveal-wrap { position: relative; overflow: hidden; }
        .img-reveal-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          background: ${GOLD};
          transform: scaleX(0);
          transform-origin: left;
          pointer-events: none;
        }

        /* ── Smooth scroll ── */
        html { scroll-behavior: smooth; }

        /* ── Stagger tenets ── */
        @keyframes tenetIn {
          from { opacity: 0; transform: translateY(24px); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0px); }
        }

        /* ── Gold underline from CENTER on hover ── */
        .gold-link-center {
          position: relative;
          text-decoration: none;
          transition: color 0.4s;
        }
        .gold-link-center::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 1px;
          background: ${GOLD};
          transform: translateX(-50%);
          transition: width 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .gold-link-center:hover::after { width: 100%; }
        .gold-link-center:hover { color: ${GOLD} !important; }

        /* ── Mobile: hide outlined chapter numerals ── */
        @media (max-width: 1023px) {
          .chap-num-outline { display: none !important; }
        }

        /* ── Enhanced grain for premium film look ── */
        .grain-wrap::after {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 9998;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 150px 150px;
          mix-blend-mode: screen;
        }
      `}</style>

      {/* Fixed scroll progress bar */}
      <ScrollProgressBar />

      {/* Chapter navigator — fixed left */}
      <ChapterNavigator />

      <div className="grain-wrap" style={{ background: BG, color: '#F8F8F8', overflowX: 'hidden' }}>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section ref={heroRef} className="hero-vignette" style={{ position: 'relative', height: '100dvh', overflow: 'hidden' }}>

          {/* Parallax video */}
          <motion.div style={{ y: heroVidY, position: 'absolute', inset: '-12%' }}>
            <video autoPlay muted loop playsInline preload="auto" poster="/founder-5.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.22) contrast(1.18) saturate(0.5)' }}>
              <source src="/videos/our-story-hero.mp4" type="video/mp4" />
              <img src="/founder-5.png" alt="" />
            </video>
          </motion.div>

          {/* Main dark vignette — edges glow dark, center text pops */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.38)', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 60% at 50% 50%, transparent 0%, rgba(5,5,5,0.82) 100%)', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, transparent 35%, rgba(5,5,5,0.98) 100%)', zIndex: 1 }} />

          {/* Breathing FOREVER watermark */}
          <Watermark text="FOREVER" progress={heroP} from="0%" to="12%" breathe={true} />

          {/* Content */}
          <motion.div style={{ opacity: heroFade, position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 clamp(1.5rem, 6vw, 5rem)' }}>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="gold-cap" style={{ marginBottom: '3.5rem' }}>
              Our Story
            </motion.p>

            {/* Headline — slide up from clip */}
            <div style={{ overflow: 'hidden', marginBottom: '0.1em' }}>
              <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.5, ease: [0.16,1,0.3,1], delay: 0.55 }}
                className="pf" style={{ fontSize: 'clamp(3rem, 8.5vw, 9.5rem)', fontWeight: 400, margin: 0, lineHeight: 1 }}>
                Built From Love.
              </motion.h1>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '4rem' }}>
              <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.5, ease: [0.16,1,0.3,1], delay: 0.75 }}
                className="pf" style={{ fontSize: 'clamp(3rem, 8.5vw, 9.5rem)', fontWeight: 500, fontStyle: 'italic', margin: 0, lineHeight: 1, color: 'rgba(248,248,248,0.32)' }}>
                <em>Forged</em> Into Legacy.
              </motion.h1>
            </div>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2, delay: 1.4, ease: [0.16,1,0.3,1] }}
              style={{ width: 80, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, marginBottom: '3rem' }} />

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, delay: 1.8 }}
              className="sub-body" style={{ maxWidth: 500, fontSize: '0.88rem' }}>
              A profound testament to the preservation of cherished emotion, indelible memory, and timeless identity. An ode to permanence in an ephemeral world.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
              style={{ position: 'absolute', bottom: '5.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 1, height: 56, background: `linear-gradient(to bottom, ${GOLD}, transparent)` }} />
              <span className="gold-cap" style={{ color: 'rgba(212,175,55,0.35)', fontSize: 8, letterSpacing: '0.45em' }}>Scroll to explore</span>
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(16px)', padding: '1.1rem 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 5vw, 4rem)', flexWrap: 'wrap' }}>
              {['Est. 2023','925 Sterling Silver','∞  The Standard','Forever The Promise'].map((s,i)=>(
                <motion.span key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 + i*0.1 }}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)', whiteSpace: 'nowrap' }}>
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CHAPTER I — Asymmetric overlapping
        ══════════════════════════════════════ */}
        <section id="chapter-1" ref={ch1Ref} style={{ position: 'relative', borderBottom: '1px solid #0f0f0f', padding: 'clamp(5rem,12vw,10rem) 0', overflow: 'hidden' }}>
          <Watermark text="GENESIS" progress={ch1P} />

          <div className="hidden lg:flex" style={{ position: 'relative', zIndex: 1, alignItems: 'flex-start', gap: 0 }}>

            {/* Sticky label */}
            <div style={{ width: '14%', padding: '0 2rem 0 3rem', flexShrink: 0 }}>
              <ChapLabel num="I" sub="The Genesis" />
            </div>

            {/* Image — parallax + mask reveal */}
            <motion.div
              variants={imgReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              style={{ width: '42%', flexShrink: 0, position: 'relative', aspectRatio: '4/5', overflow: 'hidden', borderRadius: 2 }}
            >
              {/* Gold line reveal flash */}
              <motion.div
                initial={{ scaleX: 1, originX: 0 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0, background: GOLD, zIndex: 3, transformOrigin: 'right' }}
              />
              <motion.div style={{ y: ch1ImgY, height: '115%', marginTop: '-7.5%' }}>
                <img src="/founder-1.png" alt="The Genesis"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'brightness(0.68) contrast(1.06) saturate(0.8)' }} />
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 55%, rgba(5,5,5,0.9))', zIndex: 2 }} />
            </motion.div>

            {/* Text — glassmorphism panel overlapping image */}
            <motion.div
              variants={stagContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              style={{ flex: 1, marginLeft: '-8%', padding: '6rem 4rem 4rem 5rem', position: 'relative', zIndex: 5 }}
            >
              {/* Outlined chapter numeral behind heading */}
              <div style={{ position: 'relative', paddingTop: '1rem' }}>
                <ChapNumOutline num="I" />
                <div className="glass-panel" style={{ position: 'relative', zIndex: 1, padding: '2.5rem', borderRadius: 2 }}>
                  <motion.div variants={stagChild}>
                    <h2 className="pf" style={{ fontSize: 'clamp(2.8rem, 4.5vw, 6rem)', fontWeight: 400, lineHeight: 1.0, marginBottom: '2.5rem' }}>
                      Born From<br />
                      <em style={{ fontStyle: 'italic', color: 'rgba(248,248,248,0.32)' }}>Remembrance,</em><br />
                      Not Markets.
                    </h2>
                  </motion.div>
                  <motion.div variants={stagChild} style={{ width: 48, height: 1, background: GOLD, opacity: 0.4, marginBottom: '2.5rem' }} />
                  <motion.p variants={stagChild} className="sub-body" style={{ fontSize: '1rem', color: 'rgba(248,248,248,0.62)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                    Every enduring legacy finds its genesis not in strategic blueprints, but in a profound, ineffable sentiment.
                  </motion.p>
                  <motion.p variants={stagChild} className="sub-body" style={{ fontSize: '0.84rem' }}>
                    Shamim Forever emerged from the crucible of remembrance — a sanctuary distinct from the transient currents of markets and ephemeral trends. What began as an intimately personal resonance has blossomed into a sovereign luxury atelier, sculpted around meaning, craftsmanship, and timeless presence.
                  </motion.p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Mobile */}
          <div className="lg:hidden" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div variants={imgReveal} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <motion.div
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0, background: GOLD, zIndex: 3, transformOrigin: 'right' }}
              />
              <img src="/founder-1.png" alt="The Genesis" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'brightness(0.68) contrast(1.06) saturate(0.8)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505 0%, transparent 55%)', zIndex: 2 }} />
            </motion.div>
            <div style={{ padding: '3.5rem 2rem 4.5rem' }}>
              <div className="gold-cap" style={{ marginBottom: '2rem' }}>Chapter I — The Genesis</div>
              <motion.div variants={stagContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: 2 }}>
                  <motion.h2 variants={stagChild} className="pf" style={{ fontSize: 'clamp(2.4rem, 9vw, 4.5rem)', fontWeight: 400, lineHeight: 1.0, marginBottom: '2rem' }}>
                    Born From<br /><em style={{ color: 'rgba(248,248,248,0.32)' }}>Remembrance.</em>
                  </motion.h2>
                  <motion.div variants={stagChild} style={{ width: 40, height: 1, background: GOLD, opacity: 0.35, marginBottom: '2rem' }} />
                  <motion.p variants={stagChild} className="sub-body" style={{ fontSize: '0.88rem' }}>
                    Shamim Forever emerged from the crucible of remembrance — a sanctuary distinct from transient markets. An intimately personal resonance that blossomed into a sovereign luxury atelier.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CHAPTER II — Centered declaration
        ══════════════════════════════════════ */}
        <section id="chapter-2" ref={ch2Ref} style={{ position: 'relative', padding: 'clamp(6rem,14vw,12rem) clamp(2rem,8vw,6rem)', borderBottom: '1px solid #0f0f0f', overflow: 'hidden' }}>
          <Watermark text="DECLARATION" progress={ch2P} />

          <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>

            {/* Outlined chapter numeral */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div aria-hidden style={{
                position: 'absolute',
                top: '-0.2em', left: '50%', transform: 'translateX(-50%)',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700, fontStyle: 'italic',
                fontSize: 'clamp(7rem, 16vw, 18rem)',
                lineHeight: 1,
                userSelect: 'none', pointerEvents: 'none', zIndex: 0,
                WebkitTextStroke: `1px rgba(212,175,55,0.1)`,
                color: 'transparent', letterSpacing: '-0.05em',
              }}>II</div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ position: 'relative', zIndex: 1, marginBottom: '4rem' }}>
                <span className="gold-cap">Chapter II</span>
                <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.25, margin: '0.75rem auto' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.2)' }}>A Declaration of Intent</span>
              </motion.div>
            </div>

            <motion.div variants={stagContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
              <motion.h2 variants={stagChild} className="pf" style={{ fontSize: 'clamp(2.8rem, 6vw, 6.5rem)', fontWeight: 400, lineHeight: 1.0, marginBottom: '4.5rem' }}>
                Not a Brand.<br />
                <em style={{ fontStyle: 'italic', color: 'rgba(248,248,248,0.32)' }}>A Declaration.</em>
              </motion.h2>

              <motion.div variants={stagChild} style={{ width: 1, height: 72, background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`, margin: '0 auto 4.5rem' }} />

              <motion.div variants={stagChild} className="glass-panel" style={{ padding: '2.5rem', borderRadius: 2, marginBottom: '4.5rem' }}>
                <blockquote className="pf" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(248,248,248,0.72)', lineHeight: 1.55, margin: '0 0 1.25rem', padding: 0 }}>
                  "True luxury is not created for attention.<br />It is created for permanence."
                </blockquote>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: `${GOLD}55` }}>
                  — The House of Shamim Forever
                </p>
              </motion.div>

              <motion.p variants={stagChild} className="sub-body" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Shamim Forever was conceived as an antidote to cacophony. In an era defined by pervasive visibility yet devoid of substance, the House deliberately chose profound silence, unwavering integrity, and unparalleled emotional depth.
              </motion.p>
              <motion.p variants={stagChild} className="sub-body" style={{ fontSize: '0.84rem', marginBottom: '4rem' }}>
                Every creation is evaluated through a singular inquiry: <em style={{ color: 'rgba(248,248,248,0.55)' }}>Does this possess an intrinsic soul?</em>
              </motion.p>

              {/* Interactive filter */}
              <motion.div variants={stagChild}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: `${GOLD}40`, marginBottom: '1rem' }}>We do not evaluate by</p>
                <FilterRow />
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* ══════════════════════════════════════
            MATERIALS INTERLUDE — Raw Luxury
        ══════════════════════════════════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #0f0f0f', background: '#030303' }}>
          <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent)' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {([
              {
                label: 'THE OUD', sub: 'Ancient Resin, Timeless Spirit',
                desc: 'Harvested from the heartwood of Aquilaria trees over decades — raw oud is worth more than gold by weight. We source exclusively from estates where the tree has wept for no less than thirty years.',
                img: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=1400&q=90&fit=crop',
                align: 'left', num: 'I',
              },
              {
                label: 'THE GOLD', sub: '22-Karat, Hand-Refined',
                desc: 'Each gram of gold used by Shamim Forever passes through the hands of a master refiner before it meets flame. No shortcuts. No compromise. Only the purity that civilisations have venerated for millennia.',
                img: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1400&q=90&fit=crop',
                align: 'right', num: 'II',
              },
              {
                label: 'THE DIAMOND', sub: 'Conflict-Free, Laboratory-Certified',
                desc: 'Every stone is traced to its origin, certified beyond industry standards, and chosen not for size alone — but for the way light moves within it. A Shamim diamond carries a provenance as immutable as the stone itself.',
                img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1400&q=90&fit=crop',
                align: 'left', num: 'III',
              },
            ] as Array<{ label: string; sub: string; desc: string; img: string; align: string; num: string }>).map(({ label, sub, desc, img, align, num }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: i * 0.1 }}
                style={{
                  display: 'flex', flexDirection: align === 'right' ? 'row-reverse' : 'row',
                  minHeight: '52vh', position: 'relative',
                  borderBottom: i < 2 ? '1px solid #0c0c0c' : 'none',
                }}
                className="flex-col lg:flex-row"
              >
                {/* Image panel */}
                <div style={{ flex: '0 0 50%', position: 'relative', overflow: 'hidden', minHeight: 280 }} className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ scaleX: 1 }} whileInView={{ scaleX: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                    style={{ position: 'absolute', inset: 0, background: '#D4AF37', zIndex: 3,
                      transformOrigin: align === 'right' ? 'left' : 'right' }}
                  />
                  <motion.img
                    src={img} alt={label}
                    initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
                      filter: 'brightness(0.45) contrast(1.2) saturate(0.5)', display: 'block', minHeight: 280 }}
                  />
                  <div style={{ position: 'absolute', bottom: '1.5rem', right: align === 'right' ? 'auto' : '1.5rem',
                    left: align === 'right' ? '1.5rem' : 'auto', fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 700, fontStyle: 'italic',
                    color: 'rgba(212,175,55,0.1)', lineHeight: 1, zIndex: 2, userSelect: 'none' }}>{num}</div>
                </div>
                {/* Text panel */}
                <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  padding: 'clamp(3rem,6vw,5rem) clamp(2.5rem,5vw,4rem)', position: 'relative' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.55em',
                      textTransform: 'uppercase', color: '#D4AF37', marginBottom: '0.9rem' }}>{label}</div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,3.5vw,2.4rem)',
                      fontWeight: 400, fontStyle: 'italic', color: 'rgba(248,248,248,0.9)',
                      lineHeight: 1.2, marginBottom: '1.5rem' }}>{sub}</div>
                    <div style={{ width: 28, height: 1, background: 'rgba(212,175,55,0.5)', marginBottom: '1.5rem' }} />
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.8rem,1.5vw,0.92rem)',
                      lineHeight: 1.85, color: 'rgba(248,248,248,0.42)', maxWidth: 420,
                      fontWeight: 300, letterSpacing: '0.02em' }}>{desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            CHAPTER III — Craft / zoom on hover
        ══════════════════════════════════════ */}
        <section id="chapter-3" ref={ch3Ref} style={{ position: 'relative', borderBottom: '1px solid #0f0f0f', overflow: 'hidden' }}>
          <Watermark text="MASTERY" progress={ch3P} />

          <div className="hidden lg:flex" style={{ position: 'relative', zIndex: 1, alignItems: 'flex-start', minHeight: '92vh' }}>

            {/* Text column — glassmorphism */}
            <motion.div
              variants={stagContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              style={{ width: '48%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 5rem 8rem 6rem', borderRight: '1px solid #111' }}
            >
              <div style={{ position: 'sticky', top: '5rem' }}>
                <ChapLabel num="III" sub="Discipline Before Detail" />

                {/* Outlined numeral III behind heading */}
                <div style={{ position: 'relative' }}>
                  <ChapNumOutline num="III" />
                  <div className="glass-panel" style={{ position: 'relative', zIndex: 1, padding: '2rem', borderRadius: 2 }}>
                    <motion.h2 variants={stagChild} className="pf" style={{ fontSize: 'clamp(2.6rem, 4vw, 5.5rem)', fontWeight: 400, lineHeight: 1.0, marginBottom: '2.5rem' }}>
                      Discipline<br />
                      <em style={{ fontStyle: 'italic', color: 'rgba(248,248,248,0.30)' }}>Before Detail.</em>
                    </motion.h2>
                    <motion.div variants={stagChild} style={{ width: 48, height: 1, background: GOLD, opacity: 0.38, marginBottom: '2.5rem' }} />
                    <motion.p variants={stagChild} className="sub-body" style={{ fontSize: '0.95rem', color: 'rgba(248,248,248,0.62)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                      Within the hallowed halls of the House, serendipity holds no dominion.
                    </motion.p>
                    <motion.p variants={stagChild} className="sub-body" style={{ fontSize: '0.83rem', marginBottom: '3rem' }}>
                      Our 925 sterling silver is painstakingly hand-finished to a mirror-like brilliance. Our Oud compositions are cultivated over months, not days. The packaging is an extension of the object. The process is the product.
                    </motion.p>
                  </div>
                </div>

                {/* Spec grid */}
                <motion.div variants={stagChild} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid #1a1a1a', marginTop: '1.5rem' }}>
                  {[{v:'925',s:'Sterling Silver'},{v:'Hand',s:'Finished'},{v:'Months',s:'Cultivated'},{v:'∞',s:'The Standard'}].map((item,i)=>(
                    <div key={item.v} style={{ padding:'1.4rem 1.2rem', borderRight:i%2===0?'1px solid #1a1a1a':'none', borderBottom:i<2?'1px solid #1a1a1a':'none', background: 'rgba(212,175,55,0.02)' }}>
                      <p className="pf" style={{ fontSize: '1.5rem', color: GOLD, marginBottom: '0.3rem' }}>{item.v}</p>
                      <p style={{ fontFamily:'Inter,sans-serif', fontSize:8, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(248,248,248,0.25)' }}>{item.s}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Craft image — parallax + zoom on hover */}
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease }}
              style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
              onMouseEnter={() => setCraftHover(true)}
              onMouseLeave={() => setCraftHover(false)}
            >
              {/* Gold reveal flash */}
              <motion.div
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0, background: GOLD, zIndex: 3, transformOrigin: 'right' }}
              />
              <motion.div style={{ y: ch3ImgY, height: '115%', marginTop: '-7.5%', position: 'relative' }}>
                <video
                  autoPlay muted loop playsInline preload="auto"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', filter: 'brightness(0.55) contrast(1.12) saturate(0.75)' }}
                >
                  <source src="/products/shamims-bloom/shamim-bloom-hero.mp4" type="video/mp4" />
                </video>
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent, rgba(5,5,5,0.55))', zIndex: 2 }} />

              {/* Hover overlay */}
              <AnimatePresence>
                {craftHover && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 4 }}>
                    <span className="gold-cap" style={{ color: GOLD, marginBottom: '1rem' }}>925 Sterling Silver</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.4)' }}>Hand Finished</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <motion.div
              variants={imgReveal} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
              <motion.div
                initial={{ scaleX: 1 }} whileInView={{ scaleX: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0, background: GOLD, zIndex: 3, transformOrigin: 'right' }}
              />
              <video autoPlay muted loop playsInline preload="auto" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.55) contrast(1.12) saturate(0.75)' }}>
                <source src="/products/shamims-bloom/shamim-bloom-hero.mp4" type="video/mp4" />
              </video>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505 0%, transparent 55%)', zIndex: 2 }} />
            </motion.div>
            <div style={{ padding: '3.5rem 2rem 4.5rem' }}>
              <div className="gold-cap" style={{ marginBottom: '2rem' }}>Chapter III — Discipline Before Detail</div>
              <motion.div variants={stagContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 2 }}>
                  <motion.h2 variants={stagChild} className="pf" style={{ fontSize: 'clamp(2.4rem, 9vw, 4.5rem)', fontWeight: 400, lineHeight: 1.0, marginBottom: '2rem' }}>
                    Discipline<br /><em style={{ color: 'rgba(248,248,248,0.3)' }}>Before Detail.</em>
                  </motion.h2>
                  <motion.div variants={stagChild} style={{ width: 40, height: 1, background: GOLD, opacity: 0.35, marginBottom: '2rem' }} />
                  <motion.p variants={stagChild} className="sub-body" style={{ fontSize: '0.88rem' }}>
                    Our 925 sterling silver is hand-finished to mirror-like brilliance. Our Oud compositions cultivated over months. The process is the product.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CHAPTER IV — Sovereign Future
        ══════════════════════════════════════ */}
        <section id="chapter-4" ref={ch4Ref} style={{ position: 'relative', borderBottom: '1px solid #0f0f0f', overflow: 'hidden' }}>
          <Watermark text="SOVEREIGN" progress={ch4P} />

          <div className="hidden lg:flex" style={{ position: 'relative', zIndex: 1, alignItems: 'stretch', minHeight: '90vh' }}>

            {/* Image — right side, parallax */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
              style={{ width: '52%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}
            >
              {/* Gold reveal */}
              <motion.div
                initial={{ scaleX: 1 }} whileInView={{ scaleX: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0, background: GOLD, zIndex: 3, transformOrigin: 'left' }}
              />
              <motion.div style={{ y: ch4ImgY, height: '115%', marginTop: '-7.5%' }}>
                <video
                  autoPlay muted loop playsInline preload="auto"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.55) contrast(1.12) saturate(0.75)' }}
                >
                  <source src="https://uvgtgeauhjbdatrmmaob.supabase.co/storage/v1/object/public/products/de-beers-talisman-diamond-pendant/hero.mp4" type="video/mp4" />
                </video>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.26) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 2 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,0.6), transparent)', zIndex: 2 }} />
            </motion.div>

            {/* Text column — glassmorphism */}
            <motion.div
              variants={stagContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 5rem 8rem 5rem' }}
            >
              <ChapLabel num="IV" sub="The Sovereign Future" />

              {/* Outlined numeral IV */}
              <div style={{ position: 'relative', marginTop: '2rem' }}>
                <ChapNumOutline num="IV" />
                <div className="glass-panel" style={{ position: 'relative', zIndex: 1, padding: '2.5rem', borderRadius: 2 }}>
                  <motion.h2 variants={stagChild} className="pf" style={{ fontSize: 'clamp(2.6rem, 4vw, 5.5rem)', fontWeight: 400, lineHeight: 1.0, marginBottom: '2.5rem' }}>
                    Architecture of<br />
                    <em style={{ fontStyle: 'italic', color: 'rgba(248,248,248,0.30)' }}>New Ownership.</em>
                  </motion.h2>
                  <motion.div variants={stagChild} style={{ width: 48, height: 1, background: GOLD, opacity: 0.38, marginBottom: '2.5rem' }} />
                  <motion.p variants={stagChild} className="sub-body" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    <OkbondGlitch /> — the House's declaration of sovereignty. Liberated from external platforms, defiant of mass commerce.
                  </motion.p>
                  <motion.p variants={stagChild} className="sub-body" style={{ fontSize: '0.83rem', marginBottom: '3rem' }}>
                    OKBOND represents the frontier of sovereign luxury — where physical craftsmanship and digital permanence converge into a new paradigm of ownership.
                  </motion.p>
                </div>
              </div>

              {/* OKBOND glow pulse box */}
              <motion.div variants={stagChild} className="okbond-box okbond-glow" style={{ border:'1px solid rgba(212,175,55,0.25)', padding:'1.5rem', position:'relative', overflow:'hidden', marginTop: '1.5rem', borderRadius: 2 }}>
                <motion.div animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:3.2, repeat:Infinity }}
                  style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
                <motion.div animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:3.2, repeat:Infinity, delay: 1.6 }}
                  style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:`linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
                <span className="gold-cap" style={{ display:'block', marginBottom:'0.75rem', color:`${GOLD}50` }}>Status: Forthcoming</span>
                <p className="sub-body" style={{ fontSize:'0.82rem' }}>
                  The forthcoming decade shall belong to those audacious few who dare to build their own sovereign architecture — commanding their own narrative, their own permanence.
                </p>
              </motion.div>
            </motion.div>

          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} style={{ aspectRatio:'3/4', overflow:'hidden', position:'relative' }}>
              <motion.div
                initial={{ scaleX: 1 }} whileInView={{ scaleX: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0, background: GOLD, zIndex: 3, transformOrigin: 'left' }}
              />
              <video
                autoPlay muted loop playsInline preload="auto"
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', filter:'brightness(0.55) contrast(1.12) saturate(0.75)' }}
              >
                <source src="https://uvgtgeauhjbdatrmmaob.supabase.co/storage/v1/object/public/products/de-beers-talisman-diamond-pendant/hero.mp4" type="video/mp4" />
              </video>
              <motion.div animate={{ opacity:[0.3,0.8,0.3] }} transition={{ duration:4, repeat:Infinity }}
                style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.26) 0%, transparent 60%)', pointerEvents:'none', zIndex: 2 }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, #050505 0%, transparent 55%)', zIndex: 2 }} />
            </motion.div>
            <div style={{ padding:'3.5rem 2rem 4.5rem' }}>
              <div className="gold-cap" style={{ marginBottom:'2rem' }}>Chapter IV — The Sovereign Future</div>
              <motion.div variants={stagContainer} initial="hidden" whileInView="show" viewport={{ once:true }}>
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 2, marginBottom: '1.5rem' }}>
                  <motion.h2 variants={stagChild} className="pf" style={{ fontSize:'clamp(2.4rem,9vw,4.5rem)', fontWeight:400, lineHeight:1.0, marginBottom:'2rem' }}>
                    Architecture of<br /><em style={{ color:'rgba(248,248,248,0.3)' }}>New Ownership.</em>
                  </motion.h2>
                  <motion.div variants={stagChild} style={{ width:40,height:1,background:GOLD,opacity:0.35,marginBottom:'2rem' }} />
                  <motion.p variants={stagChild} className="sub-body" style={{ fontSize:'0.88rem', marginBottom:'1.5rem' }}>
                    <OkbondGlitch /> — the House's declaration of sovereignty. Liberated from external platforms, defiant of mass commerce.
                  </motion.p>
                </div>
                <motion.div variants={stagChild} className="okbond-box okbond-glow" style={{ border:'1px solid rgba(212,175,55,0.25)', padding:'1.25rem', borderRadius: 2 }}>
                  <span className="gold-cap" style={{ display:'block', marginBottom:'0.6rem', color:`${GOLD}50` }}>Status: Forthcoming</span>
                  <p className="sub-body" style={{ fontSize:'0.81rem' }}>The forthcoming decade belongs to those who dare build sovereign architecture.</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PHILOSOPHY / VALUES
        ══════════════════════════════════════ */}

        {/* ══════════════════════════════════════
            FOUNDER'S VISION — Faisal Orakzai
        ══════════════════════════════════════ */}
        <section style={{ position: 'relative', borderBottom: '1px solid #0f0f0f', overflow: 'hidden',
          minHeight: '90vh', display: 'flex', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', width: '100%' }} className="flex-col lg:flex-row">
            {/* Left: Portrait */}
            <motion.div
              style={{ flex: '0 0 45%', position: 'relative', overflow: 'hidden', minHeight: 420 }}
              className="w-full lg:w-2/5"
            >
              <motion.div
                initial={{ scaleY: 1 }} whileInView={{ scaleY: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0, background: '#D4AF37', zIndex: 3, transformOrigin: 'top' }}
              />
              <motion.img
                src="/founder-portrait.jpg"
                alt="Faisal Orakzai — Founder, Shamim Forever"
                initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
                  filter: 'brightness(0.82) contrast(1.08) saturate(0.85)', display: 'block', minHeight: 420 }}
              />
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, transparent 60%, #030303 100%)', zIndex: 2 }} />
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, #030303 0%, transparent 40%)', zIndex: 2 }} />
              <motion.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 4 }}
              >
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 7.5, letterSpacing: '0.5em',
                  textTransform: 'uppercase', color: 'rgba(212,175,55,0.7)', marginBottom: '0.4rem' }}>Founder &amp; Visionary</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.2rem,2.5vw,1.8rem)',
                  fontWeight: 400, color: 'rgba(248,248,248,0.9)' }}>Faisal Orakzai</div>
              </motion.div>
            </motion.div>

            {/* Right: Quote & Vision */}
            <div style={{ flex: '0 0 55%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: 'clamp(4rem,8vw,7rem) clamp(2.5rem,6vw,5rem)', position: 'relative' }}
              className="w-full lg:w-3/5">
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(5rem,10vw,8rem)',
                color: 'rgba(212,175,55,0.08)', lineHeight: 0.7, marginBottom: '1rem',
                fontStyle: 'italic', userSelect: 'none' }}>{String.fromCharCode(8220)}</div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <blockquote style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem,3.2vw,2.4rem)',
                  fontWeight: 400, fontStyle: 'italic', lineHeight: 1.45, color: 'rgba(248,248,248,0.92)',
                  marginBottom: '2.5rem', letterSpacing: '0.01em' }}>
                  Luxury without permanence is merely performance.<br />
                  <span style={{ color: 'rgba(248,248,248,0.45)' }}>What I sought to build was not a brand — but an heirloom. A house whose every creation outlives its creator.</span>
                </blockquote>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '3rem' }}
              >
                <div style={{ width: 32, height: 1, background: 'rgba(212,175,55,0.6)' }} />
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 7.5, letterSpacing: '0.45em',
                  textTransform: 'uppercase', color: 'rgba(212,175,55,0.7)' }}>On Technological Immutability</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.82rem,1.6vw,0.95rem)', lineHeight: 1.9,
                  color: 'rgba(248,248,248,0.4)', maxWidth: 480, fontWeight: 300, marginBottom: '1.5rem', letterSpacing: '0.025em' }}>
                  When blockchain technology emerged, most luxury houses saw a gimmick. I saw a mirror — a way to give our creations the one thing even platinum cannot provide: a verifiable, unalterable record of its origin, its journey, and its soul.
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.82rem,1.6vw,0.95rem)', lineHeight: 1.9,
                  color: 'rgba(248,248,248,0.4)', maxWidth: 480, fontWeight: 300, letterSpacing: '0.025em' }}>
                  Shamim Forever is the first house to encode provenance not as a certificate — but as an eternal truth written into the immutable ledger of time.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={philRef} style={{ position:'relative', padding:'clamp(6rem,14vw,12rem) clamp(2rem,8vw,5rem)', borderBottom:'1px solid #0f0f0f', textAlign:'center', overflow:'hidden' }}>
          <Watermark text="LEGACY" progress={philP} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(212,175,55,0.03) 0%, transparent 65%)', pointerEvents:'none' }} />

          <div style={{ maxWidth:900, margin:'0 auto', position:'relative', zIndex:1 }}>
            <motion.div variants={stagContainer} initial="hidden" whileInView="show" viewport={{ once:true, margin:'-60px' }}>
              <motion.div variants={stagChild} style={{ width:1,height:60,background:`linear-gradient(to bottom, transparent, ${GOLD})`,margin:'0 auto 4rem' }} />
              <motion.p variants={stagChild} className="gold-cap" style={{ marginBottom:'3.5rem' }}>The Philosophy</motion.p>

              <motion.div variants={stagChild} className="glass-panel" style={{ padding: '3rem', borderRadius: 2, marginBottom: '2rem' }}>
                <blockquote className="pf" style={{ fontSize:'clamp(1.8rem,4vw,3.6rem)', fontWeight:400, lineHeight:1.3, marginBottom:'0.8rem' }}>
                  "True luxury does not seek<br />fleeting attention —
                </blockquote>
                <blockquote className="pf" style={{ fontSize:'clamp(1.8rem,4vw,3.6rem)', fontWeight:400, fontStyle:'italic', color:'rgba(248,248,248,0.36)', lineHeight:1.3, marginBottom:'2rem' }}>
                  it is crafted for enduring permanence."
                </blockquote>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:9, letterSpacing:'0.4em', textTransform:'uppercase', color:`${GOLD}45` }}>
                  — The House of Shamim Forever
                </p>
              </motion.div>
            </motion.div>

            <p style={{ fontFamily:'Inter,sans-serif', fontSize:9, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(248,248,248,0.18)', marginBottom:'3rem', marginTop: '3rem' }}>
              Our tenets are immutable
            </p>

            {/* Staggered tenets — one by one elegant fade */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', border:'1px solid #1a1a1a', gap:0 }} className="md:grid-cols-4">
              {[
                { h:'Timelessness', s:'over transient trends' },
                { h:'Discipline', s:'over pervasive noise' },
                { h:'Authentic Identity', s:'over superficial imitation' },
                { h:'Enduring Legacy', s:'over ephemeral speed' },
              ].map((v,i)=>(
                <motion.div key={v.h}
                  initial={{ opacity:0, y:36, filter:'blur(6px)' }}
                  whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
                  viewport={{ once:true }}
                  transition={{ duration:1.0, delay: i * 0.18, ease: [0.16,1,0.3,1] }}
                  className="val-card"
                  style={{ padding:'2.5rem 1.5rem', borderRight:i%2===0?'1px solid #1a1a1a':'none', borderBottom:i<2?'1px solid #1a1a1a':'none', textAlign:'left', transition:'background 0.5s', cursor:'default' }}>
                  <div style={{ width:20, height:1, background:GOLD, opacity:0.38, marginBottom:'1.5rem' }} />
                  <p className="pf" style={{ fontSize:'1.1rem', fontWeight:500, color:'#F8F8F8', marginBottom:'0.5rem' }}>{v.h}</p>
                  <p style={{ fontFamily:'Inter,sans-serif', fontSize:8, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(248,248,248,0.22)' }}>{v.s}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
              style={{ width:1,height:60,background:`linear-gradient(to top, transparent, ${GOLD})`,margin:'5rem auto 0' }} />
          </div>
        </section>

        {/* ══════════════════════════════════════
            FINAL — "Forever."
        ══════════════════════════════════════ */}

        {/* ══════════════════════════════════════
            THE THREE PILLARS — Interactive Grid
        ══════════════════════════════════════ */}
        <section style={{ position: 'relative', padding: 'clamp(6rem,12vw,10rem) clamp(2rem,8vw,6rem)',
          borderBottom: '1px solid #0f0f0f', overflow: 'hidden', background: '#020202' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(3rem,7vw,5rem)' }}
          >
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 7.5, letterSpacing: '0.55em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,0.6)', marginBottom: '1.2rem' }}>The Three Pillars</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem,5vw,4rem)',
              fontWeight: 400, fontStyle: 'italic', color: 'rgba(248,248,248,0.9)', lineHeight: 1.1 }}>
              The Architecture of{' '}
              <em style={{ color: 'rgba(212,175,55,0.85)' }}>Permanence</em>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1px', background: '#111', maxWidth: 1100, margin: '0 auto' }}>
            <PillarCard roman="I" title="Aesthetic Superlative" subtitle="Beauty Beyond Comparison" icon="◈"
              desc="Every Shamim Forever creation is measured not against its contemporaries, but against the masterworks of history. Our standard is not the market — it is eternity. Each design passes through no fewer than forty review cycles before a single gram of material is committed."
              hover="Where others iterate, we perfect." delay={0} />
            <PillarCard roman="II" title="Technological Immutable" subtitle="Provenance as Permanence" icon="⬡"
              desc="Each creation carries a Digital Passport — a blockchain-encoded record as permanent as the piece itself. The stone's origin. The artisan's hand. The moment of completion. Written once. Unchangeable forever."
              hover="The ledger of luxury, written in code." delay={0.15} />
            <PillarCard roman="III" title="Sovereign Ownership" subtitle="Truly, Completely Yours" icon="◉"
              desc="A Shamim Forever piece does not merely belong to you — it is governed by you. Through blockchain title, your ownership is absolute, portable, and provable across generations. You are not a customer. You are a custodian."
              hover="Ownership that time cannot erode." delay={0.3} />
          </div>
        </section>

        <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0 }}>
            <img src="/founder-5.png" alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', filter:'brightness(0.15) contrast(1.2) saturate(0.45)' }} />
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.9) 100%)' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.45) 100%)' }} />
          </div>

          {/* Background "FOREVER" — breathing */}
          <div aria-hidden style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', pointerEvents:'none' }}>
            <span className="pf watermark-breathe" style={{ fontSize:'clamp(6rem,28vw,22rem)', fontStyle:'italic', fontWeight:700, color:'rgba(248,248,248,0.018)', letterSpacing:'0.1em', userSelect:'none', lineHeight:1, display:'inline-block' }}>FOREVER</span>
          </div>

          <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'clamp(5rem,12vw,9rem) 2rem', maxWidth:860, margin:'0 auto' }}>
            <motion.div variants={stagContainer} initial="hidden" whileInView="show" viewport={{ once:true, margin:'-40px' }}>
              <motion.p variants={stagChild} className="gold-cap" style={{ marginBottom:'4rem' }}>Forever</motion.p>

              <motion.p variants={stagChild} className="sub-body" style={{ fontSize:'clamp(0.88rem,2vw,1.1rem)', fontStyle:'italic', lineHeight:2.3, marginBottom:'4rem' }}>
                While many marques merely transact in products, and others chase the fleeting currents of trends,<br />a select few are destined to forge something far more profound —
              </motion.p>

              <motion.div variants={stagChild} style={{ width:80,height:1,background:`linear-gradient(to right, transparent, ${GOLD}, transparent)`,margin:'0 auto 4rem' }} />

              {/* Dramatic "Forever." */}
              <motion.h2
                variants={{
                  hidden: { opacity:0, y:80, filter:'blur(14px)' },
                  show: { opacity:1, y:0, filter:'blur(0px)', transition:{ duration:2.2, ease:[0.16,1,0.3,1] } }
                }}
                className="pf"
                style={{ fontSize:'clamp(4.5rem,16vw,13rem)', fontWeight:400, fontStyle:'italic', color:GOLD, marginBottom:'5rem', letterSpacing:'0.06em', lineHeight:1 }}
              >
                Forever.
              </motion.h2>

              <motion.div variants={stagChild} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem' }} className="sm:flex-row sm:justify-center">
                <MagneticBtn href="/shop" variant="outline">Discover the Collection</MagneticBtn>
                <MagneticBtn href="/journal" variant="ghost">Explore the Journal →</MagneticBtn>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CONCIERGE FOOTER
        ══════════════════════════════════════ */}

        {/* ══════════════════════════════════════
            THE BRIDGE TO PERMANENCE — Timeline
        ══════════════════════════════════════ */}
        <section style={{ position: 'relative', padding: 'clamp(6rem,12vw,10rem) clamp(2rem,8vw,5rem)',
          borderBottom: '1px solid #0f0f0f', overflow: 'hidden', background: '#020202' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(4rem,8vw,6rem)' }}
          >
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 7.5, letterSpacing: '0.55em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,0.6)', marginBottom: '1.2rem' }}>Est. 2023 — Forever</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem,5vw,4rem)',
              fontWeight: 400, fontStyle: 'italic', color: 'rgba(248,248,248,0.9)', lineHeight: 1.1, marginBottom: '1.2rem' }}>
              The Bridge to{' '}<em style={{ color: 'rgba(212,175,55,0.85)' }}>Permanence</em>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.82rem,1.6vw,0.9rem)', lineHeight: 1.85,
              color: 'rgba(248,248,248,0.35)', maxWidth: 540, margin: '0 auto', letterSpacing: '0.025em' }}>
              Where artisanal heritage meets blockchain immutability — a house built not for a decade, but for all decades.
            </p>
          </motion.div>
          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
            {/* Vertical timeline line */}
            <motion.div
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1,
                background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.3) 20%, rgba(212,175,55,0.3) 80%, transparent)',
                transformOrigin: 'top' }}
            />
            {([
              { year: '2023', label: 'The Founding', side: 'left', future: false,
                desc: 'Shamim Forever is established in Peshawar — born from a vision to create a luxury house that fuses centuries-old artisanal mastery with immutable digital provenance.' },
              { year: '2024', label: 'The First Collection', side: 'right', future: false,
                desc: 'The inaugural collection of sovereign pieces — each carrying a blockchain Digital Passport — is unveiled to an exclusive circle of collectors across Dubai and London.' },
              { year: '2025', label: 'The Digital Archive', side: 'left', future: false,
                desc: 'Launch of the Shamim Digital Heritage Archive: every piece ever created is inscribed onto a public ledger, verifiable by anyone, owned absolutely by the holder.' },
              { year: '2030', label: 'The Vision', side: 'right', future: true,
                desc: 'A Shamim Forever atelier in every major cultural capital. 10,000 Digital Passports issued. A legacy that has already begun to outlive those who started it.' },
              { year: 'Forever', label: 'The Promise', side: 'left', future: true,
                desc: 'When the last human memory of our founders has faded, the blockchain will still remember every stone, every gram, every breath of artisanal intention — unchanged, unchangeable.' },
            ] as Array<{ year: string; label: string; side: string; future: boolean; desc: string }>).map(({ year, label, desc, side, future }, i) => (
              <motion.div key={year}
                initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', justifyContent: side === 'left' ? 'flex-start' : 'flex-end',
                  marginBottom: 'clamp(3rem,5vw,4rem)', position: 'relative',
                  paddingLeft: side === 'left' ? 0 : '50%', paddingRight: side === 'right' ? 0 : '50%' }}
              >
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.3 }}
                  style={{ position: 'absolute', left: 'calc(50% - 6px)', top: 14, width: 12, height: 12,
                    borderRadius: '50%', background: future ? 'transparent' : '#D4AF37',
                    border: future ? '1px solid rgba(212,175,55,0.35)' : 'none',
                    boxShadow: future ? 'none' : '0 0 10px rgba(212,175,55,0.5)' }}
                />
                <div style={{ maxWidth: 360, textAlign: side === 'left' ? 'right' : 'left',
                  padding: side === 'left' ? '0 clamp(1.5rem,3vw,2.5rem) 0 0' : '0 0 0 clamp(1.5rem,3vw,2.5rem)' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,3rem)',
                    fontWeight: 700, fontStyle: 'italic', lineHeight: 1, marginBottom: '0.3rem',
                    color: future ? 'rgba(212,175,55,0.28)' : 'rgba(212,175,55,0.85)' }}>{year}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 7.5, letterSpacing: '0.4em',
                    textTransform: 'uppercase', marginBottom: '0.7rem',
                    color: future ? 'rgba(248,248,248,0.2)' : 'rgba(248,248,248,0.55)' }}>{label}</div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.78rem,1.4vw,0.85rem)',
                    lineHeight: 1.85, fontWeight: 300, letterSpacing: '0.02em',
                    color: future ? 'rgba(248,248,248,0.18)' : 'rgba(248,248,248,0.38)' }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════
            FINAL CTA — Enter The Collection
        ══════════════════════════════════════ */}
        <section style={{ position: 'relative', minHeight: '55vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          padding: 'clamp(5rem,10vw,8rem) 2rem', borderBottom: '1px solid #0f0f0f' }}>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.18, 0.05] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.28) 0%, transparent 60%)',
              pointerEvents: 'none' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
          >
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 7.5, letterSpacing: '0.55em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,0.6)', marginBottom: '1.5rem' }}>The Journey Begins</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem,6vw,5rem)',
              fontWeight: 400, fontStyle: 'italic', color: 'rgba(248,248,248,0.92)', lineHeight: 1.1, marginBottom: '1rem' }}>
              Enter{' '}<em style={{ color: '#D4AF37' }}>The Collection</em>
            </h2>
            <div style={{ width: 40, height: 1, background: 'rgba(212,175,55,0.5)', margin: '1.5rem auto 2.5rem' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.82rem,1.6vw,0.92rem)', lineHeight: 1.85,
              color: 'rgba(248,248,248,0.35)', maxWidth: 460, margin: '0 auto 3rem', letterSpacing: '0.02em' }}>
              Each piece is a chapter. Each chapter, a legacy. The collection awaits those who understand that true luxury is not acquired — it is inherited.
            </p>
            <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a href="/products" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block', padding: '1rem 2.8rem',
                  border: '1px solid rgba(212,175,55,0.7)', color: '#D4AF37',
                  fontFamily: 'Inter, sans-serif', fontSize: 8.5, letterSpacing: '0.4em',
                  textTransform: 'uppercase', textDecoration: 'none', background: 'transparent' }}>
                The Collection
              </motion.a>
              <motion.a href="/membership" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block', padding: '1rem 2.8rem',
                  background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.18)',
                  color: 'rgba(248,248,248,0.45)', fontFamily: 'Inter, sans-serif',
                  fontSize: 8.5, letterSpacing: '0.4em', textTransform: 'uppercase', textDecoration: 'none' }}>
                The Inner Circle
              </motion.a>
            </div>
          </motion.div>
        </section>

        <section style={{ borderTop:'1px solid #111', padding:'clamp(3rem,7vw,5rem) clamp(2rem,8vw,5rem)' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'2.5rem', textAlign:'center' }} className="sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="gold-cap" style={{ marginBottom:'0.75rem' }}>The House</p>
              <p className="pf" style={{ fontSize:'1.5rem', fontWeight:400 }}>Shamim Forever</p>
            </div>
            <MagneticBtn href="/shop" variant="outline">Enter the Atelier</MagneticBtn>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', alignItems:'center' }} className="sm:items-end">
              {[{label:'Sovereign Panel',href:'/sovereign-panel'},{label:'Virtual Atelier',href:'/virtual-atelier'}].map(l=>(
                <a key={l.label} href={l.href}
                  className="gold-cap gold-link-center"
                  style={{ color:'rgba(248,248,248,0.2)', textDecoration:'none' }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

/* ══════════════════════════════════════
   FILTER ROW (Chapter II)
══════════════════════════════════════ */
function FilterRow() {
  const [active, setActive] = useState<string|null>(null)
  const desc: Record<string,string> = {
    Beauty: 'Beyond transient beauty lies permanence.',
    Price: 'Value is measured in meaning, not currency.',
    Soul: 'Soul — the quality that makes a thing worth keeping across generations.',
  }
  return (
    <div>
      <div style={{ display:'flex', border:'1px solid #1a1a1a' }}>
        {['Beauty','Price','Soul'].map((f,i)=>(
          <button key={f}
            onMouseEnter={()=>setActive(f)} onMouseLeave={()=>setActive(null)}
            style={{ flex:1, padding:'1.1rem', fontFamily:'Inter,sans-serif', fontSize:9, letterSpacing:'0.5em', textTransform:'uppercase', fontWeight:300, background:active===f?GOLD:'transparent', color:active===f?BG:active?'rgba(248,248,248,0.18)':GOLD, border:'none', borderRight:i<2?'1px solid #1a1a1a':'none', cursor:'pointer', transition:'all 0.45s cubic-bezier(0.16,1,0.3,1)' }}>
            {f}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {active&&(
          <motion.p key={active} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.28}}
            style={{ fontFamily:'Inter,sans-serif', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(248,248,248,0.32)', marginTop:'1rem' }}>
            {desc[active]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
