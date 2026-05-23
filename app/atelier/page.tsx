'use client'

  import { motion, useScroll, useTransform } from 'framer-motion'
  import { useRef, useMemo } from 'react'
  import Link from 'next/link'

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  }

  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1.4, ease: 'easeOut' },
  }

  function SmokeParticles() {
    const pts = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 0.5,
      d: Math.random() * 10 + 7,
      del: Math.random() * 5,
      op: Math.random() * 0.12 + 0.03,
    })), [])
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {pts.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#c9a054]"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, opacity: p.op }}
            animate={{ y: [0, -22, 0], opacity: [p.op, p.op * 2.8, p.op] }}
            transition={{ duration: p.d, delay: p.del, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    )
  }

  export default function AtelierPage() {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroY = useTransform(heroScroll, [0, 1], ['0%', '22%'])
    const heroOp = useTransform(heroScroll, [0, 0.75], [1, 0])

    return (
      <div className="bg-[#050505] overflow-x-hidden">

        {/* ══════════════════════════════════════════
            SECTION 1 — CINEMATIC ENTRY
        ══════════════════════════════════════════ */}
        <section ref={heroRef} className="relative h-screen overflow-hidden bg-[#050505]">

          {/* Background: craftsmanship atmosphere */}
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              src="/founder-4.png"
              alt="The Atelier"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'brightness(0.28) contrast(1.2) saturate(0.75)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/85 via-[#050505]/40 to-[#050505]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
            {/* Spotlight */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_30%_40%,rgba(201,160,84,0.06)_0%,transparent_70%)]" />
            {/* Smoke atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_80%,rgba(201,160,84,0.025)_0%,transparent_70%)]" />
          </motion.div>

          {/* Particles */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <SmokeParticles />
          </div>

          {/* Hero content */}
          <motion.div
            style={{ opacity: heroOp }}
            className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 lg:px-24 max-w-[1300px]"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 1.4 }}
              className="luxury-meta mb-5 md:mb-8"
            >
              The Atelier
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-light tracking-[0.12em] leading-[0.88] uppercase text-zinc-100 mb-6 md:mb-8"
              style={{ fontSize: 'clamp(2.8rem, 8.5vw, 8rem)' }}
            >
              Where Obsession
              <br />
              <span className="text-zinc-300">Becomes Creation.</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 1.4 }}
              className="w-16 h-px bg-[#c9a054]/55 origin-left mb-6 md:mb-8"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1.4 }}
              className="max-w-xl space-y-2"
            >
              <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
                The Shamim Forever Atelier is not a factory.
              </p>
              <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-base">
                It is a sanctum of precision, emotion, and sovereign craftsmanship.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="flex items-center gap-3 mt-10 md:mt-14"
            >
              <div className="relative w-12 h-px overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-[#c9a054]/65"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute inset-0 bg-[#c9a054]/15" />
              </div>
              <span className="luxury-meta opacity-40">Enter the sanctum</span>
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 — THE SANCTUM
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-44 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Left: Portrait */}
            <motion.div {...fadeIn} className="relative overflow-hidden order-2 lg:order-1">
              <div className="aspect-[4/5] relative">
                <img
                  src="/founder-2.png"
                  alt="The Sanctum"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(0.58) contrast(1.12)' }}
                />
                <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[rgba(201,160,84,0.07)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#050505] to-transparent" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050505] to-transparent lg:block hidden" />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1.2 }}
                  className="absolute bottom-6 left-6"
                >
                  <div className="w-8 h-px bg-[#c9a054]/40 mb-2" />
                  <p className="luxury-meta opacity-45 text-[8px]">The Sanctum</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div {...fadeUp} className="order-1 lg:order-2">
              <p className="luxury-meta mb-6 md:mb-8">Chapter I</p>
              <h2
                className="font-serif font-light tracking-[0.2em] uppercase text-zinc-100 mb-10 md:mb-12 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                The<br />
                <span className="italic text-[#c9a054]">Sanctum</span>
              </h2>
              <div className="space-y-5 md:space-y-7 text-zinc-400 font-light leading-relaxed">
                <p className="text-zinc-300 text-lg md:text-xl font-light font-serif tracking-wide">
                  Behind every creation exists silence.
                </p>
                <div className="pl-5 border-l border-[#c9a054]/25 space-y-2.5">
                  <p>No noise.</p>
                  <p>No mass production.</p>
                  <p>No rushed manufacturing.</p>
                </div>
                <div className="space-y-2.5">
                  <p className="text-zinc-300">Only process.</p>
                  <p className="text-zinc-300">Only discipline.</p>
                  <p className="text-zinc-300">Only intention.</p>
                </div>
                <p>
                  The Atelier was designed as a protected environment where craftsmanship is treated as philosophy.
                </p>
                <p className="text-zinc-500 italic font-serif text-lg tracking-wide">
                  Every detail matters.
                  <br />Every decision leaves a signature.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3 — THE ORIGIN OF CRAFT
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-44 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/12 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/12 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(201,160,84,0.035)_0%,transparent_70%)]" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
            <motion.p {...fadeIn} className="luxury-meta mb-8 md:mb-12 text-center">Chapter II</motion.p>

            <motion.div {...fadeUp} className="space-y-8 md:space-y-10">
              <p
                className="font-serif font-light text-zinc-200 leading-relaxed tracking-wide text-center"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
              >
                Shamim Forever was built on a singular belief:
              </p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1.4 }}
                className="font-serif font-light tracking-[0.2em] uppercase text-[#c9a054] text-center"
                style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
              >
                True luxury cannot be copied.
              </motion.p>

              <p className="text-zinc-400 font-light leading-relaxed text-center max-w-2xl mx-auto text-base md:text-lg">
                It must emerge from identity, memory, and culture.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1a1a1a] max-w-3xl mx-auto">
                {[
                  { label: 'Ancestral Craftsmanship', icon: '◈' },
                  { label: 'Modern Luxury Precision', icon: '◆' },
                  { label: 'Emotional Storytelling', icon: '◇' },
                  { label: 'Sovereign Design Philosophy', icon: '⬡' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="bg-[#050505] px-8 py-7 group hover:bg-[#0a0a0a] transition-colors duration-700"
                  >
                    <p className="text-[#c9a054] text-lg mb-3">{item.icon}</p>
                    <p className="luxury-meta text-[9px]">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1.2 }}
                className="text-center text-zinc-300 font-serif text-lg md:text-xl font-light italic tracking-wide"
              >
                This is not imitation of Western luxury.
                <br />This is the creation of a new luxury language.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4 — THE FOUR ACTS
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-44 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <motion.div {...fadeIn} className="mb-16 md:mb-24">
            <p className="luxury-meta mb-4 md:mb-5">Chapter III</p>
            <h2
              className="font-serif font-light tracking-[0.2em] uppercase text-zinc-100 leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
            >
              The Four
              <br />
              <span className="italic text-[#c9a054]">Acts of Creation</span>
            </h2>
          </motion.div>

          {/* Floating cinematic sequence — not cards */}
          <div className="space-y-20 md:space-y-32">
            {[
              {
                act: 'Act 01',
                title: 'Source',
                body: [
                  'Rare ingredients are sourced from across the world.',
                  'From the oud traditions of the East to the fragrance capitals of Europe.',
                  'Nothing artificial. Nothing diluted.',
                  'Only materials worthy of permanence.',
                ],
                align: 'left',
                img: '/founder-3.png',
              },
              {
                act: 'Act 02',
                title: 'Compose',
                body: [
                  'Composition happens slowly.',
                  'Every fragrance accord is refined repeatedly until balance becomes invisible.',
                  'Luxury is precision disguised as simplicity.',
                ],
                align: 'right',
                img: '/founder-1.png',
              },
              {
                act: 'Act 03',
                title: 'Age',
                body: [
                  'Time becomes an ingredient.',
                  'Creations rest for weeks — sometimes months — until they evolve into their final identity.',
                  'Patience is the most undervalued luxury.',
                ],
                align: 'left',
                img: '/founder-5.png',
              },
              {
                act: 'Act 04',
                title: 'Authenticate',
                body: [
                  'Every creation receives a sovereign signature.',
                  'A digital authenticity system ensures every piece carries permanent verification.',
                  'The chain of custody begins here.',
                ],
                align: 'right',
                img: '/founder-2.png',
              },
            ].map((act, i) => (
              <div
                key={act.act}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center ${act.align === 'right' ? '' : ''}`}
              >
                {/* Image */}
                <motion.div
                  {...fadeIn}
                  transition={{ duration: 1.4, delay: 0.1 }}
                  className={`relative overflow-hidden ${act.align === 'right' ? 'order-1 lg:order-2' : 'order-1'}`}
                >
                  <div className="aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] relative overflow-hidden">
                    <img
                      src={act.img}
                      alt={act.title}
                      className="w-full h-full object-cover object-top"
                      style={{ filter: 'brightness(0.5) contrast(1.12) saturate(0.85)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent" />
                    {/* Act number overlay */}
                    <div className="absolute top-5 left-5">
                      <p className="font-serif text-[3rem] md:text-[5rem] font-light text-[#c9a054]/15 tracking-[0.2em]">{act.act.split(' ')[1]}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className={`${act.align === 'right' ? 'order-2 lg:order-1 lg:text-right' : 'order-2'}`}
                >
                  <p className="luxury-meta mb-4 md:mb-5">{act.act}</p>
                  <h3
                    className="font-serif font-light tracking-[0.2em] uppercase text-zinc-100 mb-7 md:mb-9 leading-tight"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                  >
                    {act.title}
                  </h3>
                  <div className={`space-y-4 text-zinc-400 font-light leading-relaxed ${act.align === 'right' ? 'lg:ml-auto max-w-md' : 'max-w-md'}`}>
                    {act.body.map((line, j) => (
                      <p key={j} className={j === 0 ? 'text-zinc-300' : ''}>{line}</p>
                    ))}
                  </div>
                  <div className={`mt-8 w-10 h-px bg-[#c9a054]/35 ${act.align === 'right' ? 'lg:ml-auto' : ''}`} />
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 5 — MATERIAL PHILOSOPHY
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-48 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/12 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/12 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,160,84,0.04)_0%,transparent_70%)]" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
            <motion.p {...fadeIn} className="luxury-meta mb-10 md:mb-16">Chapter IV — Material Philosophy</motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-light tracking-[0.12em] text-zinc-100 leading-[1.15] mb-16 md:mb-24"
              style={{ fontSize: 'clamp(1.6rem, 4.5vw, 4rem)' }}
            >
              "Craftsmanship begins
              <br />
              <span className="text-[#c9a054] italic">where compromise ends."</span>
            </motion.blockquote>

            {/* Floating materials */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#1a1a1a]">
              {[
                { material: '925 Sterling Silver', desc: 'Cold precision. Warm elegance.' },
                { material: 'Luxury Oud Oils', desc: 'Ancient identity. Modern presence.' },
                { material: 'Rare Ambergris', desc: 'Time distilled into essence.' },
                { material: 'Damascene Rose', desc: 'Memory preserved in petals.' },
                { material: 'Artisan Resins', desc: 'Earth condensed into permanence.' },
                { material: 'Gold Accents', desc: 'Restraint made visible.' },
              ].map((item, i) => (
                <motion.div
                  key={item.material}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 1 }}
                  className="bg-[#050505] px-6 md:px-10 py-8 md:py-10 group hover:bg-[#0a0a0a] transition-colors duration-700"
                >
                  <div className="w-6 h-px bg-[#c9a054]/30 mx-auto mb-5 group-hover:w-10 transition-all duration-700" />
                  <p className="font-serif text-zinc-200 tracking-[0.15em] uppercase text-sm md:text-base font-light mb-2">{item.material}</p>
                  <p className="text-zinc-600 text-[10px] tracking-[0.15em] font-light italic">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 6 — THE FRAGRANCE CHAMBER
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-44 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Left: Text */}
            <motion.div {...fadeUp}>
              <p className="luxury-meta mb-6 md:mb-8">Chapter V</p>
              <h2
                className="font-serif font-light tracking-[0.2em] uppercase text-zinc-100 mb-10 md:mb-12 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                The Fragrance
                <br />
                <span className="italic text-[#c9a054]">Chamber</span>
              </h2>
              <div className="space-y-5 text-zinc-400 font-light leading-relaxed mb-10">
                <p className="text-zinc-300 font-serif text-lg md:text-xl font-light italic tracking-wide">
                  A fragrance should not merely smell beautiful.
                </p>
                <p>It should create memory.</p>
                <p>
                  Every Shamim Forever composition is designed to feel:
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Intimate', 'Powerful', 'Timeless', 'Emotionally Permanent'].map((q, i) => (
                  <motion.div
                    key={q}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.9 }}
                    className="flex items-center gap-3 py-3 border-b border-[#111]"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#c9a054] flex-shrink-0" />
                    <p className="luxury-meta text-[9px]">{q}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Atmospheric visual */}
            <motion.div {...fadeIn} className="relative">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src="/founder-5.png"
                  alt="The Fragrance Chamber"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(0.45) contrast(1.18) saturate(0.7)' }}
                />
                {/* Glass reflection / gold highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(201,160,84,0.04)] to-transparent" />
                {/* Cinematic smoke from bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#050505] to-transparent" />
                {/* Moving light beam */}
                <motion.div
                  className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-[rgba(201,160,84,0.03)] to-transparent"
                  animate={{ x: ['-100px', '600px'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
                />
                {/* Bottle silhouettes overlay */}
                <div className="absolute inset-0 flex items-end justify-center pb-10">
                  <div className="text-center">
                    <div className="w-px h-16 bg-gradient-to-b from-[#c9a054]/30 to-transparent mx-auto mb-4" />
                    <p className="luxury-meta opacity-40 text-[8px]">The Chamber</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 7 — AUTHENTICITY SYSTEM
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-44 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(201,160,84,0.03)_0%,transparent_70%)]" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">

              <motion.div {...fadeUp} className="lg:col-span-5">
                <p className="luxury-meta mb-6 md:mb-8">Chapter VI</p>
                <h2
                  className="font-serif font-light tracking-[0.2em] uppercase text-zinc-100 mb-8 md:mb-12 leading-tight"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  Authenticity
                  <br />
                  <span className="italic text-[#c9a054]">System</span>
                </h2>
                <div className="space-y-5 text-zinc-400 font-light leading-relaxed">
                  <p>Every creation is authenticated through a sovereign verification system.</p>
                  <p className="text-zinc-500 italic font-serif">The goal is permanence. Not imitation.</p>
                </div>
              </motion.div>

              <div className="lg:col-span-7 space-y-px">
                {[
                  { icon: '◈', title: 'Digital Ownership Architecture', desc: 'Each creation is paired with a unique digital record — immutable and sovereign.' },
                  { icon: '◆', title: 'Cryptographic Authentication', desc: 'Cryptographic signatures ensure zero possibility of counterfeit.' },
                  { icon: '◇', title: 'Luxury Provenance Verification', desc: 'A complete audit trail from atelier to owner, permanently preserved.' },
                  { icon: '⬡', title: 'Future-Ready Identity Systems', desc: 'Built for the next era of luxury — physical and digital as one.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 1.1 }}
                    className="bg-[#050505] border border-[#1a1a1a] p-6 md:p-8 group hover:border-[#c9a054]/20 transition-all duration-700 flex gap-6 md:gap-8 items-start"
                  >
                    <span className="text-[#c9a054] text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-serif text-zinc-200 tracking-[0.1em] uppercase text-sm font-light mb-2">{item.title}</p>
                      <p className="text-zinc-500 font-light text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 8 — FINAL IMMERSIVE ENDING
        ══════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/founder-4.png"
              alt="Forever"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'brightness(0.18) contrast(1.2) saturate(0.65)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-[#050505]/55" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_30%,rgba(5,5,5,0.75)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,160,84,0.035)_0%,transparent_70%)]" />
          </div>

          <div className="relative z-10 text-center px-6 py-32 max-w-4xl mx-auto">
            <motion.p {...fadeIn} className="luxury-meta mb-10 md:mb-14">The Atelier</motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 md:space-y-5 mb-12 md:mb-20"
            >
              <p className="font-serif font-light tracking-[0.2em] text-zinc-400" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}>
                Some create products.
              </p>
              <p className="font-serif font-light tracking-[0.2em] text-zinc-400" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}>
                Some create trends.
              </p>
              <p className="font-serif font-light tracking-[0.2em] text-zinc-300 mt-3" style={{ fontSize: 'clamp(1.2rem, 2.8vw, 2rem)' }}>
                The Atelier exists to create permanence.
              </p>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1.4 }}
              className="w-14 h-px bg-[#c9a054]/50 mx-auto mb-10 md:mb-16"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.4 }}
              className="font-serif font-light tracking-[0.4em] uppercase text-[#c9a054] mb-14 md:mb-20"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
            >
              Forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1.4 }}
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center px-8 md:px-10 py-4 border border-[#c9a054]/60 text-zinc-100 text-[9px] tracking-[0.5em] uppercase transition-all duration-700 overflow-hidden hover:border-[#c9a054]"
              >
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                  Enter the Collection
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    )
  }
  