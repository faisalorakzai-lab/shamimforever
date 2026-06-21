'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as const

/* ─── Word-by-word reveal ─── */
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
}
const wordV = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] } },
}

function RevealLine({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} style={{ display: 'block' }}>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={wordV} style={{ display: 'inline-block', marginRight: '0.26em' }}>
          {w}
        </motion.span>
      ))}
    </span>
  )
}

/* ─── Chapter I: Genesis of Emotion — split parallax ─── */
function ChapterGenesis() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const founderY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const macroY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section ref={ref} className="border-b border-[#111] overflow-hidden">

      {/* Desktop */}
      <div className="hidden lg:flex min-h-screen">

        {/* Founder portrait — parallax down */}
        <div className="flex-1 relative overflow-hidden">
          <motion.div style={{ y: founderY }} className="absolute inset-[-10%]">
            <img
              src="/founder-1.png"
              alt="Shamim — The Genesis"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'brightness(0.70) contrast(1.08) saturate(0.85)' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
        </div>

        {/* Text — center, moves slightly faster */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
          className="w-[45%] flex-shrink-0 flex flex-col justify-center px-14 py-20 border-x border-[#111] z-10"
        >
          <motion.div style={{ y: textY }}>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054]">Chapter I</span>
              <div className="w-6 h-px bg-[#c9a054]/30" />
              <span className="text-[9px] tracking-[0.5em] uppercase text-zinc-700">The Genesis of Emotion</span>
            </div>
            <h2 className="font-serif font-light text-5xl xl:text-6xl tracking-[0.06em] text-zinc-100 leading-[1.05] mb-10">
              Built From<br />Emotion.
            </h2>
            <div className="w-12 h-px bg-[#c9a054]/40 mb-10" />
            <p className="text-zinc-300 font-light text-lg leading-[1.9] mb-6 italic font-serif">
              Every enduring legacy finds its genesis not in strategic blueprints, but in a profound, ineffable sentiment that compels its very existence. Shamim Forever emerged from the crucible of remembrance, a sanctuary distinct from the transient currents of markets and ephemeral trends.
            </p>
            <p className="text-zinc-500 font-light text-sm leading-[2]">
              What began as an intimately personal emotional resonance has blossomed into an entity of far greater magnitude: a sovereign luxury atelier, meticulously sculpted around the pillars of profound meaning, unparalleled craftsmanship, and an immutable, timeless presence.
            </p>
          </motion.div>
        </motion.div>

        {/* Macro material — parallax up (opposite) */}
        <div className="flex-1 relative overflow-hidden">
          <motion.div style={{ y: macroY }} className="absolute inset-[-10%]">
            <img
              src="/products/eternal-sovereign/vault.png"
              alt="Raw Material — The Craft"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(0.50) contrast(1.22) saturate(0.55)' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505]/75" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a054]/6 via-transparent to-transparent" />
          <div className="absolute top-10 right-10">
            <span className="text-[8px] tracking-[0.55em] uppercase text-[#c9a054]/55">The Craft</span>
          </div>
        </div>

      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative overflow-hidden aspect-[3/4]"
        >
          <img
            src="/founder-1.png"
            alt="Shamim — The Genesis"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.70) contrast(1.08) saturate(0.85)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-transparent" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="px-8 py-14 border-b border-[#111]"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054]">Chapter I</span>
            <div className="w-5 h-px bg-[#c9a054]/30" />
            <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">The Genesis of Emotion</span>
          </div>
          <h2 className="font-serif font-light text-4xl tracking-[0.06em] text-zinc-100 leading-[1.08] mb-8">
            Built From<br />Emotion.
          </h2>
          <div className="w-12 h-px bg-[#c9a054]/40 mb-8" />
          <p className="text-zinc-300 font-light text-base leading-[1.9] mb-5 italic font-serif">
            Every enduring legacy finds its genesis not in strategic blueprints, but in a profound, ineffable sentiment that compels its very existence.
          </p>
          <p className="text-zinc-500 font-light text-sm leading-[2]">
            What began as an intimately personal emotional resonance has blossomed into a sovereign luxury atelier, meticulously sculpted around meaning, craftsmanship, and timeless presence.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative overflow-hidden aspect-[4/3]"
        >
          <img
            src="/products/eternal-sovereign/vault.png"
            alt="The Craft"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.50) contrast(1.22) saturate(0.55)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a054]/6 via-transparent to-transparent" />
          <div className="absolute top-6 right-6">
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054]/55">The Craft</span>
          </div>
        </motion.div>
      </div>

    </section>
  )
}

/* ─── Chapter II: Philosophy — reverse layout + interactive filter ─── */
function ChapterPhilosophy() {
  const [active, setActive] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  const filters = ['Beauty', 'Price', 'Soul']

  return (
    <section ref={ref} className="border-b border-[#111] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">

        {/* Visual — noise-to-serene: starts desaturated, reveals colour */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="relative overflow-hidden aspect-[3/4] lg:aspect-auto order-1 lg:order-2"
        >
          <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
            <motion.img
              src="/founder-2.png"
              alt="The Philosophy"
              className="w-full h-full object-cover object-top"
              initial={{ filter: 'brightness(0.3) contrast(1.3) saturate(0)' }}
              whileInView={{ filter: 'brightness(0.58) contrast(1.12) saturate(0.85)' }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: 'easeOut', delay: 0.4 }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 right-8">
            <span className="font-serif text-9xl font-light text-white/5 select-none leading-none">II</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.15 }}
          className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 md:py-20 order-2 lg:order-1"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054]">Chapter II</span>
            <div className="w-6 h-px bg-[#c9a054]/30" />
            <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">A Declaration of Intent</span>
          </div>
          <h2 className="font-serif font-light text-4xl md:text-5xl xl:text-6xl tracking-[0.07em] text-zinc-100 leading-[1.05] mb-10">
            Not a Brand.<br />A Declaration.
          </h2>
          <div className="w-12 h-px bg-[#c9a054]/40 mb-10" />
          <p className="text-zinc-300 font-light text-lg leading-[1.85] mb-6 italic font-serif">
            Shamim Forever was meticulously conceived as an antidote to cacophony. In an era defined by pervasive visibility yet devoid of substance, the House chose an antithetical path: profound silence, unwavering integrity, unparalleled emotional depth.
          </p>
          <p className="text-zinc-500 font-light text-sm leading-[2] mb-10">
            Every creation is evaluated through a singular inquiry: Does this possess an intrinsic soul?
          </p>

          {/* Interactive filter */}
          <div className="flex items-center gap-0 border border-[#1a1a1a]">
            {filters.map((f) => (
              <button
                key={f}
                onMouseEnter={() => setActive(f)}
                onMouseLeave={() => setActive(null)}
                className="relative flex-1 py-4 text-[9px] tracking-[0.45em] uppercase overflow-hidden transition-colors duration-500"
                style={{ color: active === f ? '#050505' : active ? '#3f3f46' : '#c9a054' }}
              >
                <motion.span
                  className="absolute inset-0 bg-[#c9a054]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: active === f ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                />
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {active && (
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mt-4"
              >
                {active === 'Beauty' && 'Beyond transient beauty lies permanence.'}
                {active === 'Price' && 'Value is measured in meaning, not currency.'}
                {active === 'Soul' && 'Soul — the quality that makes a thing worth keeping across generations.'}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}

/* ─── Chapter III: Craft — zoom-on-scroll ─── */
function ChapterCraft() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section ref={ref} className="border-b border-[#111] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">

        {/* Craft visual with zoom-on-scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="relative overflow-hidden aspect-[3/4] lg:aspect-auto order-1"
        >
          <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
            <motion.img
              src="/products/chopard-happy-diamonds-necklace/hero.png"
              alt="925 Sterling Silver — The Craft"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(0.52) contrast(1.2) saturate(0.65)', scale }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
          {/* Gold detail label */}
          <div className="absolute bottom-8 left-8 flex flex-col gap-1">
            <span className="text-[8px] tracking-[0.6em] uppercase text-[#c9a054]/70">925 Sterling Silver</span>
            <div className="w-8 h-px bg-[#c9a054]/40" />
          </div>
          <div className="absolute bottom-8 right-8">
            <span className="font-serif text-9xl font-light text-white/5 select-none leading-none">III</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.15 }}
          className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 md:py-20 order-2 border-l border-[#111]"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054]">Chapter III</span>
            <div className="w-6 h-px bg-[#c9a054]/30" />
            <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">Discipline Before Detail</span>
          </div>
          <h2 className="font-serif font-light text-4xl md:text-5xl xl:text-6xl tracking-[0.07em] text-zinc-100 leading-[1.05] mb-10">
            Discipline<br />Before Detail.
          </h2>
          <div className="w-12 h-px bg-[#c9a054]/40 mb-10" />
          <p className="text-zinc-300 font-light text-lg leading-[1.85] mb-6 italic font-serif">
            Within the hallowed halls of the House, serendipity holds no dominion. Each material is chosen with unwavering intent. Every finish undergoes rigorous scrutiny against an exacting standard unparalleled in the contemporary market.
          </p>
          <p className="text-zinc-500 font-light text-sm leading-[2]">
            Our 925 sterling silver is painstakingly hand-finished to achieve a mirror-like brilliance. Our exquisite Oud compositions are cultivated over months, not days — the packaging an extension of the product itself. The process is the product.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

/* ─── Chapter IV: Future — digital glow + OKBOND glitch ─── */
function ChapterFuture() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section ref={ref} className="border-b border-[#111] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 md:py-20 order-2 lg:order-1 border-r border-[#111]"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054]">Chapter IV</span>
            <div className="w-6 h-px bg-[#c9a054]/30" />
            <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">Sovereign Commerce</span>
          </div>
          <h2 className="font-serif font-light text-4xl md:text-5xl xl:text-6xl tracking-[0.07em] text-zinc-100 leading-[1.05] mb-10">
            Sovereign<br />Commerce.
          </h2>
          <div className="w-12 h-px bg-[#c9a054]/40 mb-10" />
          <p className="text-zinc-300 font-light text-lg leading-[1.85] mb-6 italic font-serif">
            The trajectory of Shamim Forever transcends conventional luxury — venturing into a novel paradigm where digital and material sovereignty are inextricably intertwined.
          </p>
          <p className="text-zinc-500 font-light text-sm leading-[2] mb-8">
            <OkbondGlitch /> stands as the House's unequivocal declaration: true luxury must assert its sovereignty within its foundational systems — liberated from external platforms, free from intermediaries, defiant of mass commerce.
          </p>
        </motion.div>

        {/* Visual — digital glow overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease, delay: 0.1 }}
          className="relative overflow-hidden aspect-[3/4] lg:aspect-auto order-1 lg:order-2"
        >
          <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
            <img
              src="/founder-3.png"
              alt="Sovereign Commerce"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'brightness(0.45) contrast(1.15) saturate(0.7)' }}
            />
          </motion.div>
          {/* Digital glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 40%, rgba(201,160,84,0.22) 0%, rgba(201,160,84,0) 65%)' }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 right-8">
            <span className="font-serif text-9xl font-light text-white/5 select-none leading-none">IV</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

/* OKBOND glitch text */
function OkbondGlitch() {
  return (
    <motion.span
      className="font-mono font-bold tracking-widest"
      style={{ color: '#c9a054' }}
      animate={{
        textShadow: [
          '0 0 0px rgba(201,160,84,0)',
          '2px 0 0px rgba(201,160,84,0.8), -2px 0 0px rgba(59,130,246,0.5)',
          '0 0 0px rgba(201,160,84,0)',
          '-1px 0 0px rgba(201,160,84,0.6), 1px 0 0px rgba(239,68,68,0.4)',
          '0 0 0px rgba(201,160,84,0)',
        ],
      }}
      transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 4 }}
    >
      OKBOND
    </motion.span>
  )
}

export default function OurStoryPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '22%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.85], [1, 0])

  return (
    <div className="bg-[#050505] overflow-x-hidden">

      {/* ══ HERO — Video background ══ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <video
            autoPlay muted loop playsInline preload="auto"
            poster="/founder-5.png"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.30) contrast(1.15) saturate(0.72)' }}
          >
            <source src="/videos/our-story-hero.mp4" type="video/mp4" />
            <img src="/founder-5.png" alt="Shamim Forever Legacy" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/88 via-[#050505]/45 to-[#050505]/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/45" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent" />
        </motion.div>

        {/* Hero content — centered as per spec */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-10"
          >
            Our Story
          </motion.p>

          {/* Word-by-word headline */}
          <motion.div
            variants={containerV}
            initial="hidden"
            animate="show"
            className="mb-10"
            style={{ fontSize: 'clamp(2.4rem, 6.5vw, 7rem)' }}
          >
            <RevealLine
              text="Conceived from Profound Affection."
              className="font-serif font-light tracking-[0.07em] text-zinc-100 leading-[0.97]"
            />
            <RevealLine
              text="Forged for an Enduring Legacy."
              className="font-serif font-light italic tracking-[0.07em] text-zinc-400 leading-[0.97]"
            />
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 1.8, ease }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a054] to-transparent mb-10"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.0 }}
            className="text-zinc-400 font-light text-sm md:text-base leading-[2] max-w-xl tracking-wide"
          >
            Shamim Forever transcends the conventional, emerging not merely as a marque, but as a profound testament to the preservation of cherished emotion, indelible memory, and timeless identity. It is an ode to permanence in an ephemeral world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.6 }}
            className="flex flex-col items-center gap-3 mt-14"
          >
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent"
            />
            <span className="text-[8px] tracking-[0.5em] uppercase text-zinc-700">Scroll to explore</span>
          </motion.div>
        </motion.div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-[#111]/60 bg-[#050505]/70 backdrop-blur-sm">
          <div className="flex items-center justify-between px-8 md:px-14 py-4 overflow-x-auto gap-8">
            {[
              { value: 'Est. 2023' },
              { value: '925 Sterling Silver' },
              { value: '∞ The Standard' },
              { value: 'Forever The Promise' },
            ].map((s, i) => (
              <motion.span
                key={s.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.8 + i * 0.1 }}
                className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 whitespace-nowrap flex-shrink-0"
              >
                {s.value}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATISTICS STRIP ══ */}
      <section className="border-b border-[#111] py-12 px-8 md:px-14 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">

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

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="py-8 px-6 md:px-10 flex flex-col gap-3 border-r border-[#111]"
          >
            <div className="relative overflow-hidden inline-block w-fit">
              <span className="font-serif font-light text-3xl md:text-4xl text-zinc-200 tracking-wide select-none">925</span>
              <motion.div
                initial={{ x: '-120%' }}
                animate={{ x: '280%' }}
                transition={{ duration: 1.3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4 }}
                style={{
                  position: 'absolute', top: '-5%', left: 0, width: '45%', height: '110%',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(201,160,84,0.75) 50%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
            <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Sterling Silver</span>
          </motion.div>

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
                textShadow: ['0 0 0px rgba(201,160,84,0)', '0 0 22px rgba(201,160,84,0.85)', '0 0 0px rgba(201,160,84,0)'],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity }}
            >
              ∞
            </motion.span>
            <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">The Standard</span>
          </motion.div>

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

      {/* ══ CHAPTERS ══ */}
      <ChapterGenesis />
      <ChapterPhilosophy />
      <ChapterCraft />
      <ChapterFuture />

      {/* ══ PHILOSOPHY / VALUES ══ */}
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
          <p className="text-[9px] tracking-[0.55em] uppercase text-[#c9a054] mb-12">The Philosophy</p>

          <blockquote className="font-serif font-light text-3xl md:text-4xl lg:text-5xl text-zinc-100 tracking-[0.07em] leading-[1.3] mb-6">
            "True luxury does not seek fleeting attention;<br />
            <span className="italic text-zinc-400">it is meticulously crafted for enduring permanence."</span>
          </blockquote>
          <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-700 mb-16">— The House of Shamim Forever</p>

          <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-600 mb-12">Our tenets are immutable:</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#111]">
            {[
              { a: 'Timelessness', b: 'over transient trends' },
              { a: 'Discipline', b: 'over pervasive noise' },
              { a: 'Authentic Identity', b: 'over superficial imitation' },
              { a: 'Enduring Legacy', b: 'over ephemeral speed' },
            ].map((item, i) => (
              <motion.div
                key={item.a}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
                whileHover={{ backgroundColor: 'rgba(201,160,84,0.04)' }}
                className={`p-8 text-left transition-colors duration-500 ${i < 3 ? 'border-r border-[#111]' : ''}`}
              >
                <p className="font-serif text-xl text-zinc-200 tracking-wide mb-2">{item.a}</p>
                <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-700">{item.b}</p>
              </motion.div>
            ))}
          </div>

          <div className="w-px h-14 bg-gradient-to-t from-transparent to-[#c9a054]/40 mx-auto mt-16" />
        </motion.div>
      </section>

      {/* ══ FINAL — "Forever." ══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/founder-5.png"
            alt="Shamim Forever"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.18) contrast(1.2) saturate(0.55)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-[#050505]/55" />
        </div>

        <div className="relative z-10 text-center px-8 py-32 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="text-[9px] tracking-[0.55em] uppercase text-[#c9a054] mb-14"
          >
            Forever
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
            className="font-serif font-light text-xl md:text-2xl tracking-[0.12em] text-zinc-400 mb-16 leading-[2]"
          >
            While many marques merely transact in products, and others chase the fleeting currents of trends,<br />
            a select few are destined to forge something far more profound: an enduring legacy.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.4, ease }}
            className="w-16 h-px bg-[#c9a054]/50 mx-auto mb-16 origin-center"
          />

          {/* "Forever." — dramatic slide-up fade */}
          <motion.p
            initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light tracking-[0.35em] uppercase text-[#c9a054] mb-20"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Forever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1.2, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden transition-all duration-700 hover:border-[#c9a054]"
            >
              <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Discover the Collection</span>
            </Link>
            <Link
              href="/journal"
              className="text-[9px] tracking-[0.45em] uppercase text-zinc-600 hover:text-[#c9a054] transition-colors duration-500"
            >
              Explore the Journal of Craftsmanship →
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
