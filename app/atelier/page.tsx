'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import Link from 'next/link'

/* ── constants ── */
const GOLD = '#D4AF37'
const BG   = '#050505'
const ease = [0.16, 1, 0.3, 1] as const

/* ── stagger variants ── */
const stagContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
}
const stagText = {
  hidden: { opacity: 0, y: 44, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] } },
}
const stagImgLeft = {
  hidden: { opacity: 0, x: -56, filter: 'blur(8px)' },
  show:   { opacity: 1, x: 0,   filter: 'blur(0px)',
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } },
}
const stagImgRight = {
  hidden: { opacity: 0, x: 56, filter: 'blur(8px)' },
  show:   { opacity: 1, x: 0,  filter: 'blur(0px)',
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } },
}

/* ── watermark ── */
function Watermark({ text, progress }: { text: string; progress: any }) {
  const y = useTransform(progress, [0, 1], ['-5%', '5%'])
  return (
    <motion.div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none', zIndex: 0, y }}>
      <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(5rem, 22vw, 18rem)', color: 'rgba(248,248,248,0.022)', letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', userSelect: 'none', lineHeight: 1 }}>
        {text}
      </span>
    </motion.div>
  )
}

/* ── chapter image with zoom-on-hover ── */
function ChapterImage({ src, alt, fromRight = false }: { src: string; alt: string; fromRight?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      variants={fromRight ? stagImgRight : stagImgLeft}
      style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%', minHeight: '55vh' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={src}
        alt={alt}
        animate={{
          scale: hovered ? 1.06 : 1,
          filter: hovered
            ? 'brightness(0.52) contrast(1.18) saturate(0.65)'
            : 'brightness(0.38) contrast(1.2) saturate(0.55)',
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: fromRight ? 'linear-gradient(to left, transparent 50%, rgba(5,5,5,0.85))' : 'linear-gradient(to right, transparent 50%, rgba(5,5,5,0.85))' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 50%)' }} />
    </motion.div>
  )
}

/* ── chapter section ── */
interface ChapterProps {
  num: string
  subtitle: string
  heading: string
  subheading: string
  body: string[]
  img: string
  imgAlt: string
  flip?: boolean
  watermark: string
}

function Chapter({ num, subtitle, subheading, heading, body, img, imgAlt, flip = false, watermark }: ChapterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section ref={ref} style={{ position: 'relative', borderBottom: '1px solid #0d0d0d', overflow: 'hidden' }}>
      <Watermark text={watermark} progress={scrollYProgress} />

      {/* ── Desktop ── */}
      <div className="hidden lg:flex" style={{ position: 'relative', zIndex: 1, minHeight: '92vh', flexDirection: flip ? 'row-reverse' : 'row' }}>

        {/* Image — 44% width */}
        <motion.div
          variants={flip ? stagImgRight : stagImgLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{ width: '44%', flexShrink: 0, alignSelf: 'stretch' }}
        >
          <ChapterImage src={img} alt={imgAlt} fromRight={flip} />
        </motion.div>

        {/* Text — overlap by pulling negative margin */}
        <motion.div
          variants={stagContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '7rem 5rem 7rem 5.5rem',
            marginLeft: flip ? 0 : '-5%',
            marginRight: flip ? '-5%' : 0,
            position: 'relative',
            zIndex: 5,
          }}
        >
          {/* Sticky chapter label */}
          <motion.div
            variants={stagText}
            style={{ position: 'sticky', top: '5rem', alignSelf: 'flex-start', marginBottom: '3.5rem' }}
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.6em', textTransform: 'uppercase', color: GOLD }}>
              Chapter {num}
            </span>
            <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.25, margin: '0.6rem 0' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.22)' }}>
              {subtitle}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={stagText}
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 'clamp(2.4rem, 3.8vw, 5.2rem)', lineHeight: 1.02, marginBottom: '1rem', color: '#F8F8F8' }}
          >
            {heading}
          </motion.h2>

          {/* Sub-heading */}
          <motion.p
            variants={stagText}
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.6vw, 1.6rem)', color: `${GOLD}CC`, marginBottom: '2.5rem', lineHeight: 1.3 }}
          >
            {subheading}
          </motion.p>

          <motion.div variants={stagText} style={{ width: 48, height: 1, background: GOLD, opacity: 0.35, marginBottom: '2.5rem' }} />

          {body.map((para, i) => (
            <motion.p
              key={i}
              variants={stagText}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: i === 0 ? '0.95rem' : '0.84rem', lineHeight: 2.1, letterSpacing: '0.03em', color: i === 0 ? 'rgba(248,248,248,0.62)' : 'rgba(248,248,248,0.38)', fontStyle: i === 0 ? 'italic' : 'normal', marginBottom: i < body.length - 1 ? '1.25rem' : 0 }}
            >
              {para}
            </motion.p>
          ))}
        </motion.div>

      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}
        >
          <img src={img} alt={imgAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'brightness(0.38) contrast(1.2) saturate(0.55)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505 0%, transparent 55%)' }} />
        </motion.div>

        <div style={{ padding: '3.5rem 1.75rem 5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', color: GOLD }}>Chapter {num}</span>
            <div style={{ width: 28, height: 1, background: GOLD, opacity: 0.25, margin: '0.5rem 0' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.2)' }}>{subtitle}</span>
          </div>

          <motion.div variants={stagContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={stagText} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 'clamp(2rem, 8vw, 3.5rem)', lineHeight: 1.02, marginBottom: '0.8rem', color: '#F8F8F8' }}>
              {heading}
            </motion.h2>
            <motion.p variants={stagText} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.05rem', color: `${GOLD}CC`, marginBottom: '2rem', lineHeight: 1.4 }}>
              {subheading}
            </motion.p>
            <motion.div variants={stagText} style={{ width: 36, height: 1, background: GOLD, opacity: 0.32, marginBottom: '2rem' }} />
            {body.map((para, i) => (
              <motion.p key={i} variants={stagText} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.87rem', lineHeight: 2.05, letterSpacing: '0.03em', color: i === 0 ? 'rgba(248,248,248,0.6)' : 'rgba(248,248,248,0.36)', fontStyle: i === 0 ? 'italic' : 'normal', marginBottom: i < body.length - 1 ? '1rem' : 0 }}>
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════
   PAGE
════════════════════════════════════════ */
export default function AtelierPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImgY  = useTransform(heroP, [0, 1], ['0%', '25%'])
  const heroFade  = useTransform(heroP, [0, 0.8], [1, 0])

  const chapters = [
    {
      num: '01', subtitle: 'The Origin', heading: 'A House Born\nFrom Obsession.', subheading: 'Not Founded — Summoned.',
      body: [
        'From the bazaars of Peshawar to the fragrance counters of Karachi, our founder spent a decade studying the craft before daring to create.',
        'The first formula was not a product. It was a declaration. Shamim Forever was not founded — it was summoned.',
      ],
      img: '/atelier/chapter-01.png', imgAlt: 'The Origin — Shamim Forever Atelier', watermark: 'ORIGIN', flip: false,
    },
    {
      num: '02', subtitle: 'The Materials', heading: 'Nothing Synthetic.\nNothing Cheap.', subheading: 'Every raw material is sourced from origin.',
      body: [
        'Oud from Assam. Rose absolute from Bulgaria. Ambergris — aged and wild. Our cosmetic pigments are milled at EU-certified facilities.',
        'Our sterling silver is hallmarked 925. We do not negotiate on material. Ever.',
      ],
      img: '/atelier/chapter-02.png', imgAlt: 'The Materials — Origin-sourced ingredients', watermark: 'MATERIAL', flip: true,
    },
    {
      num: '03', subtitle: 'The Process', heading: 'Sixty Days.\nMinimum.', subheading: 'No formula is approved by the clock alone.',
      body: [
        'A Shamim Forever fragrance takes no less than sixty days from first formula to final bottle. Each accord is tested against skin, air, time, and temperature.',
        'Our atelier in Peshawar runs on silence and precision — never speed.',
      ],
      img: '/atelier/chapter-03.png', imgAlt: 'The Process — Perfumer at work', watermark: 'PROCESS', flip: false,
    },
    {
      num: '04', subtitle: 'The People', heading: 'Artisans,\nNot Workers.', subheading: 'We hire for obsession.',
      body: [
        'Our perfumers trained in Grasse and Kannauj both. Our jewelers carry generational craft from the old city workshops of Lahore.',
        'We do not hire for speed. Every hand in our atelier is a specialist — and every specialist is given the time to be one.',
      ],
      img: '/atelier/chapter-04.png', imgAlt: 'The People — Artisans at the Shamim Forever atelier', watermark: 'ARTISAN', flip: true,
    },
    {
      num: '05', subtitle: 'The Standard', heading: 'Sovereign\nor Nothing.', subheading: 'This is not perfectionism.',
      body: [
        'We have rejected entire product lines for failing a single criterion. We have reformulated a fragrance fourteen times.',
        'We do not launch until every element is sovereign. This is not perfectionism — it is the minimum standard for a house that carries this name.',
      ],
      img: '/atelier/chapter-05.png', imgAlt: 'The Standard — Sovereign or Nothing', watermark: 'SOVEREIGN', flip: false,
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Inter:wght@300;400&display=swap');

        /* Film grain */
        .atelier-grain::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px 200px;
          mix-blend-mode: overlay;
        }
        .atelier-cta:hover { background: ${GOLD} !important; color: ${BG} !important; }
      `}</style>

      <div className="atelier-grain" style={{ background: BG, color: '#F8F8F8', overflowX: 'hidden' }}>

        {/* ══ HERO ══ */}
        <section ref={heroRef} style={{ position: 'relative', height: '100dvh', overflow: 'hidden' }}>

          {/* Background image — parallax */}
          <motion.div style={{ y: heroImgY, position: 'absolute', inset: '-12%' }}>
            <img
              src="/atelier/chapter-03.png"
              alt="Shamim Forever Atelier"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'brightness(0.22) contrast(1.2) saturate(0.5)' }}
            />
          </motion.div>

          {/* Overlays */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 25%, rgba(5,5,5,0.88) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, transparent 35%, rgba(5,5,5,0.96) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,0.6) 0%, transparent 55%)' }} />

          {/* Watermark */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(5rem, 25vw, 20rem)', color: 'rgba(248,248,248,0.018)', letterSpacing: '0.12em', userSelect: 'none', lineHeight: 1 }}>
              ATELIER
            </span>
          </div>

          {/* Hero content */}
          <motion.div
            style={{ opacity: heroFade, position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(2rem, 8vw, 7rem)' }}
          >
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.6em', textTransform: 'uppercase', color: GOLD, marginBottom: '3rem' }}
            >
              The Atelier
            </motion.p>

            <div style={{ overflow: 'hidden', marginBottom: '0.1em' }}>
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 'clamp(3rem, 8vw, 9.5rem)', margin: 0, lineHeight: 1, color: '#F8F8F8' }}
              >
                Where Obsession
              </motion.h1>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '3.5rem' }}>
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.72 }}
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500, fontStyle: 'italic', fontSize: 'clamp(3rem, 8vw, 9.5rem)', margin: 0, lineHeight: 1, color: 'rgba(248,248,248,0.28)' }}
              >
                Becomes Craft.
              </motion.h1>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: 72, height: 1, background: `linear-gradient(to right, ${GOLD}, transparent)`, marginBottom: '2.5rem', transformOrigin: 'left' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.8 }}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.88rem', lineHeight: 2.1, letterSpacing: '0.03em', color: 'rgba(248,248,248,0.45)', maxWidth: 460 }}
            >
              Five chapters. One obsession. The uncompromising story of how Shamim Forever is made.
            </motion.p>

            {/* Chapter nav pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
              style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}
            >
              {['Origin','Materials','Process','People','Standard'].map((label, i) => (
                <span key={label} style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: `${GOLD}55` }}>
                  {String(i + 1).padStart(2, '0')} {label}
                </span>
              ))}
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }}
              style={{ position: 'absolute', bottom: '5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 1, height: 52, background: `linear-gradient(to bottom, ${GOLD}, transparent)` }}
              />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: `${GOLD}35` }}>Scroll</span>
            </motion.div>
          </motion.div>

          {/* Bottom strip */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(16px)', padding: '1rem 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 5vw, 4rem)', flexWrap: 'wrap' }}>
              {['Peshawar · Est. 2023', '925 Sterling Silver', 'Grasse · Kannauj', '60 Days Minimum'].map((s, i) => (
                <motion.span key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 + i * 0.1 }}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: `${GOLD}40`, whiteSpace: 'nowrap' }}>
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CHAPTERS ══ */}
        {chapters.map((ch) => (
          <Chapter key={ch.num} {...ch as any} />
        ))}

        {/* ══ MANIFESTO CLOSE ══ */}
        <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderBottom: '1px solid #0d0d0d' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img src="/atelier/chapter-05.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.12) contrast(1.2) saturate(0.4)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.75) 60%, rgba(5,5,5,0.6) 100%)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: 'clamp(4rem, 10vw, 7rem) clamp(2rem, 8vw, 6rem)', maxWidth: 780, margin: '0 auto' }}>
            <motion.div
              variants={stagContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.div variants={stagText} style={{ width: 1, height: 56, background: `linear-gradient(to bottom, transparent, ${GOLD})`, margin: '0 auto 3.5rem' }} />

              <motion.p variants={stagText} style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', color: GOLD, marginBottom: '3rem' }}>
                The Manifesto
              </motion.p>

              <motion.blockquote variants={stagText} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', lineHeight: 1.45, color: '#F8F8F8', margin: '0 0 1.25rem' }}>
                "Sovereign or Nothing."
              </motion.blockquote>

              <motion.p variants={stagText} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.84rem', lineHeight: 2.1, letterSpacing: '0.03em', color: 'rgba(248,248,248,0.38)', marginBottom: '3.5rem' }}>
                We do not launch until every element is sovereign. This is not perfectionism.<br />It is the minimum standard for a house that carries this name.
              </motion.p>

              <motion.div variants={stagText} style={{ width: 72, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, margin: '0 auto 3.5rem' }} />

              <motion.div variants={stagText} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} className="sm:flex-row sm:justify-center">
                <Link
                  href="/shop"
                  className="atelier-cta"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 2.8rem', border: `1px solid ${GOLD}60`, fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)', whiteSpace: 'nowrap' }}
                >
                  Enter the Collection
                </Link>
                <Link
                  href="/our-story"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.25)', textDecoration: 'none', transition: 'color 0.4s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,248,0.25)')}
                >
                  Read Our Story →
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══ FOOTER BAR ══ */}
        <section style={{ borderTop: '1px solid #111', padding: 'clamp(2.5rem, 6vw, 4rem) clamp(2rem, 8vw, 5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', textAlign: 'center' }} className="sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.6rem' }}>The Atelier</p>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: '1.4rem', color: '#F8F8F8' }}>Shamim Forever</p>
          </div>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[{ label: 'Shop', href: '/shop' }, { label: 'Our Story', href: '/our-story' }, { label: 'Journal', href: '/journal' }].map(l => (
              <Link key={l.label} href={l.href} style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.22)', textDecoration: 'none', transition: 'color 0.4s' }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,248,0.22)')}>
                {l.label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
