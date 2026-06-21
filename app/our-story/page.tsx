'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
}

/* ─── Word-by-word reveal variants ─── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.6 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
}

function RevealLine({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} style={{ display: 'block' }}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

/* ─── Chapter I — parallax split-screen ─── */
function ChapterOne() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const macroY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section ref={ref} className="border-b border-[#111] overflow-hidden">

      {/* ── Desktop: 3-column side-by-side ── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1fr_1fr] min-h-[90vh]">

        {/* Col 1 — Founder portrait, clearly lit, parallax down */}
        <div className="relative overflow-hidden">
          <motion.div style={{ y: portraitY }} className="absolute inset-[-6%]">
            <img
              src="/founder-1.png"
              alt="Shamim — The Beginning"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'brightness(0.72) contrast(1.08) saturate(0.85)' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050505]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="absolute bottom-8 left-8"
          >
            <span className="font-serif text-9xl font-light text-white/5 select-none leading-none">I</span>
          </motion.div>
        </div>

        {/* Col 2 — Text, moves slightly faster */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
          className="relative flex flex-col justify-center px-12 py-20 border-x border-[#111] z-10"
        >
          <motion.div style={{ y: textY }}>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Chapter I</span>
              <div className="w-6 h-px bg-[#c9a054]/30" />
              <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">THE BEGINNING</span>
            </div>
            <h2 className="font-serif font-light text-5xl xl:text-6xl tracking-[0.06em] text-zinc-100 leading-[1.05] mb-10">
              Built From<br />Emotion.
            </h2>
            <div className="w-12 h-px bg-[#c9a054]/40 mb-10" />
            <p className="text-zinc-300 font-light text-lg leading-[1.9] mb-7 italic font-serif">
              Every legacy begins not with a business plan — but with something felt so deeply it demands to exist.
            </p>
            <p className="text-zinc-500 font-light text-sm leading-[2]">
              What started as a deeply personal emotional connection evolved into something far greater: a sovereign luxury house built around meaning, craftsmanship, and timeless presence.
            </p>
          </motion.div>
        </motion.div>

        {/* Col 3 — Silver craft macro shot, parallax up (opposite direction) */}
        <div className="relative overflow-hidden">
          <motion.div style={{ y: macroY }} className="absolute inset-[-6%]">
            <img
              src="/products/eternal-sovereign/vault.png"
              alt="The Craft — Silver"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(0.5) contrast(1.2) saturate(0.6)' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#050505]/70" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a054]/6 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3 }}
            className="absolute top-8 right-8"
          >
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054]/60">The Craft</span>
          </motion.div>
        </div>

      </div>

      {/* ── Mobile: stacked portrait → text → craft ── */}
      <div className="lg:hidden">

        {/* Portrait — full width, good brightness */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="relative overflow-hidden aspect-[3/4]"
        >
          <img
            src="/founder-1.png"
            alt="Shamim — The Beginning"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.72) contrast(1.08) saturate(0.85)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="font-serif text-8xl font-light text-white/5 select-none leading-none">I</span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="px-8 py-14 border-b border-[#111]"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Chapter I</span>
            <div className="w-6 h-px bg-[#c9a054]/30" />
            <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">THE BEGINNING</span>
          </div>
          <h2 className="font-serif font-light text-4xl tracking-[0.06em] text-zinc-100 leading-[1.08] mb-8">
            Built From<br />Emotion.
          </h2>
          <div className="w-12 h-px bg-[#c9a054]/40 mb-8" />
          <p className="text-zinc-300 font-light text-base leading-[1.9] mb-6 italic font-serif">
            Every legacy begins not with a business plan — but with something felt so deeply it demands to exist. Shamim Forever was born from remembrance, not from markets or trends.
          </p>
          <p className="text-zinc-500 font-light text-sm leading-[2]">
            What started as a deeply personal emotional connection evolved into something far greater: a sovereign luxury house built around meaning, craftsmanship, and timeless presence.
          </p>
        </motion.div>

        {/* Craft image — visible on mobile too */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
          className="relative overflow-hidden aspect-[4/3]"
        >
          <img
            src="/products/eternal-sovereign/vault.png"
            alt="The Craft"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.5) contrast(1.2) saturate(0.6)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a054]/6 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
          <div className="absolute top-6 right-6">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054]/60">The Craft</span>
          </div>
        </motion.div>

      </div>

    </section>
  )
}

const CHAPTERS_REST = [
  {
    num: 'II',
    label: 'THE PHILOSOPHY',
    headline: 'Not a Brand.\nA Declaration.',
    sub: 'Shamim Forever was designed to resist noise. In a world of maximum visibility and minimum substance, the House chose the opposite: silence, structure, and emotional depth.',
    body: 'The philosophy is not a marketing strategy. It is a filter. Every product, every decision, every collaboration is passed through a single question: does this carry soul? Not just beauty. Not just price. Soul — the quality that makes a thing worth keeping across generations.',
    image: '/founder-2.png',
    imageRight: true,
  },
  {
    num: 'III',
    label: 'THE CRAFT',
    headline: 'Discipline\nBefore Detail.',
    sub: 'Nothing at the House is accidental. Every material is selected with intent. Every finish is reviewed against a standard that has no market equivalent.',
    body: 'The craft philosophy mirrors the atelier tradition: slow, deliberate, and uncompromising. 925 sterling silver is hand-finished to a mirror standard. Oud compositions are built over months, not days.',
    image: '/founder-4.png',
    imageRight: false,
  },
  {
    num: 'IV',
    label: 'THE FUTURE',
    headline: 'Sovereign\nCommerce.',
    sub: 'The future of Shamim Forever extends beyond physical luxury into the architecture of a new kind of ownership — where digital and material sovereignty are inseparable.',
    body: "OKBOND is the House's declaration that luxury must also be sovereign in its systems. Not dependent on platforms, not mediated by intermediaries, not subject to the logic of mass commerce.",
    image: '/founder-3.png',
    imageRight: true,
  },
]

export default function OurStoryPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '22%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])

  return (
    <div className="bg-[#050505] overflow-x-hidden">

      {/* ── CINEMATIC HERO ── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/founder-5.png"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.3) contrast(1.15) saturate(0.7)' }}
          >
            <source src="/videos/our-story-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/50 to-[#050505]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-[#050505]/50" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-8 md:px-14 lg:px-20"
        >
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[9px] tracking-[0.55em] uppercase text-[#c9a054] mb-8"
          >
            Our Story
          </motion.p>

          {/* Word-by-word headline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mb-10"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 8.5rem)' }}
          >
            <RevealLine
              text="Built From Love."
              className="font-serif font-light tracking-[0.08em] text-zinc-100 leading-[0.95]"
            />
            <RevealLine
              text="Forged Into"
              className="font-serif font-light tracking-[0.08em] text-zinc-400 leading-[0.95]"
            />
            <motion.span
              variants={wordVariants}
              className="font-serif font-light italic text-zinc-300 leading-[0.95]"
              style={{ display: 'inline-block' }}
            >
              Legacy.
            </motion.span>
          </motion.div>

          {/* Gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 1.8, ease }}
            className="w-20 h-px bg-gradient-to-r from-[#c9a054] to-transparent origin-left mb-8"
          />

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.0 }}
            className="text-zinc-400 font-light text-sm leading-[2.1] max-w-md tracking-wide"
          >
            Shamim Forever was never built to become another brand.<br />
            It was built to preserve emotion, memory, and timeless identity.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.6 }}
            className="flex items-center gap-3 mt-10"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent"
            />
            <span className="text-[8px] tracking-[0.45em] uppercase text-zinc-700">Scroll to explore</span>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 right-0 px-8 md:px-14 pb-8 z-10">
          <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Est. 2023</span>
        </div>
      </section>

      {/* ── STATISTICS BAR ── */}
      <section className="border-y border-[#111] py-12 px-8 md:px-14 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">

          {/* 2023 — Founded */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0, ease }}
            className="py-8 px-6 md:px-10 flex flex-col gap-3 border-r border-[#111]"
          >
            <span className="font-serif font-light text-3xl md:text-4xl text-zinc-200 tracking-wide">2023</span>
            <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Founded</span>
          </motion.div>

          {/* 925 — shimmer sweep */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="py-8 px-6 md:px-10 flex flex-col gap-3 border-r border-[#111]"
          >
            <div className="relative overflow-hidden inline-block w-fit">
              <span className="font-serif font-light text-3xl md:text-4xl text-zinc-200 tracking-wide select-none">925</span>
              {/* Shimmer sweep — translates from left to right, repeats every 4s */}
              <motion.div
                initial={{ x: '-120%' }}
                animate={{ x: '280%' }}
                transition={{
                  duration: 1.3,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                style={{
                  position: 'absolute',
                  top: '-5%',
                  left: 0,
                  width: '45%',
                  height: '110%',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(201,160,84,0.75) 50%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
            <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Sterling Silver</span>
          </motion.div>

          {/* ∞ — golden breathing glow */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="py-8 px-6 md:px-10 flex flex-col gap-3 border-r border-[#111]"
          >
            <motion.span
              className="font-serif font-light text-3xl md:text-4xl tracking-wide"
              style={{ color: '#c9a054', display: 'inline-block' }}
              animate={{
                textShadow: [
                  '0 0 0px rgba(201,160,84,0)',
                  '0 0 20px rgba(201,160,84,0.8)',
                  '0 0 0px rgba(201,160,84,0)',
                ],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity }}
            >
              ∞
            </motion.span>
            <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">The Standard</span>
          </motion.div>

          {/* Forever */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="py-8 px-6 md:px-10 flex flex-col gap-3"
          >
            <span className="font-serif font-light text-3xl md:text-4xl text-zinc-200 tracking-wide">Forever</span>
            <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">The Promise</span>
          </motion.div>

        </div>
      </section>

      {/* ── CHAPTER I — Split-screen parallax ── */}
      <ChapterOne />

      {/* ── CHAPTERS II–IV ── */}
      {CHAPTERS_REST.map((ch) => (
        <section key={ch.num} className="border-b border-[#111]">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease }}
              className={`relative overflow-hidden aspect-[3/4] lg:aspect-auto ${ch.imageRight ? 'lg:order-2' : 'lg:order-1'}`}
            >
              <img
                src={ch.image}
                alt={ch.label}
                className="w-full h-full object-cover object-top"
                style={{ filter: 'brightness(0.55) contrast(1.12) saturate(0.8)' }}
              />
              <div className={`absolute inset-0 ${ch.imageRight ? 'bg-gradient-to-r from-[#050505]/60 via-[#050505]/20 to-transparent' : 'bg-gradient-to-l from-[#050505]/60 via-[#050505]/20 to-transparent'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 right-8">
                <span className="font-serif text-8xl font-light text-white/5 leading-none select-none">{ch.num}</span>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              className={`flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 md:py-20 ${ch.imageRight ? 'lg:order-1 border-r border-[#111]' : 'lg:order-2'}`}
            >
              <div className="flex items-center gap-5 mb-10">
                <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Chapter {ch.num}</span>
                <div className="w-6 h-px bg-[#c9a054]/30" />
                <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">{ch.label}</span>
              </div>
              <h2 className="font-serif font-light text-4xl md:text-5xl xl:text-6xl tracking-[0.08em] text-zinc-100 leading-[1.05] mb-10 whitespace-pre-line">
                {ch.headline}
              </h2>
              <div className="w-14 h-px bg-[#c9a054]/40 mb-10" />
              <p className="text-zinc-300 font-light text-lg leading-[1.85] mb-8 italic font-serif">{ch.sub}</p>
              <p className="text-zinc-500 font-light text-[15px] leading-[2] max-w-md">{ch.body}</p>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ── MANIFESTO ── */}
      <section className="py-28 md:py-44 px-8 text-center relative overflow-hidden border-b border-[#111]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#c9a054]/3 via-transparent to-[#c9a054]/3" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-[#c9a054]/40 mx-auto mb-16" />
          <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-12">The Philosophy</p>
          <blockquote className="font-serif font-light text-3xl md:text-5xl lg:text-6xl text-zinc-100 tracking-[0.07em] leading-[1.25] mb-16">
            "True luxury is not created for attention.<br />
            <span className="italic text-zinc-400">It is created for permanence."</span>
          </blockquote>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-left border-t border-[#111] pt-16">
            {[
              { a: 'Timeless', b: 'over trendy' },
              { a: 'Discipline', b: 'over noise' },
              { a: 'Identity', b: 'over imitation' },
              { a: 'Legacy', b: 'over speed' },
            ].map((item, i) => (
              <motion.div
                key={item.a}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
              >
                <p className="font-serif text-xl text-zinc-200 tracking-wide mb-2">{item.a}</p>
                <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-700">{item.b}</p>
              </motion.div>
            ))}
          </div>
          <div className="w-px h-14 bg-gradient-to-t from-transparent to-[#c9a054]/40 mx-auto mt-16" />
        </motion.div>
      </section>

      {/* ── FINAL LEGACY STATEMENT ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/founder-5.png"
            alt="Shamim Forever"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.2) contrast(1.2) saturate(0.6)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/50" />
        </div>
        <div className="relative z-10 text-center px-8 py-32 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-14"
          >
            Forever
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease }}
            className="space-y-5 mb-16"
          >
            <p className="font-serif font-light text-xl md:text-2xl lg:text-3xl tracking-[0.15em] text-zinc-500">Some brands sell products.</p>
            <p className="font-serif font-light text-xl md:text-2xl lg:text-3xl tracking-[0.15em] text-zinc-500">Some brands create trends.</p>
            <p className="font-serif font-light text-xl md:text-2xl lg:text-3xl tracking-[0.15em] text-zinc-300">But very few build legacy.</p>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.4, ease }}
            className="w-16 h-px bg-[#c9a054]/50 mx-auto mb-16 origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1.4, ease }}
            className="font-serif font-light tracking-[0.35em] uppercase text-[#c9a054] mb-20"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            Forever.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 1.2, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden transition-all duration-700 hover:border-[#c9a054]"
            >
              <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Enter the Collection</span>
            </Link>
            <Link
              href="/journal"
              className="text-[9px] tracking-[0.45em] uppercase text-zinc-600 hover:text-[#c9a054] transition-colors duration-500"
            >
              Read the Journal →
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
