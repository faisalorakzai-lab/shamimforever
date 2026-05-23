'use client'

  import { motion, useScroll, useTransform } from 'framer-motion'
  import { useRef } from 'react'
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

  export default function OurStoryPage() {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroY = useTransform(heroScroll, [0, 1], ['0%', '20%'])
    const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])

    return (
      <div className="bg-[#050505] overflow-x-hidden">

        {/* ══════════════════════════════════════════
            SECTION 1 — CINEMATIC HERO
        ══════════════════════════════════════════ */}
        <section ref={heroRef} className="relative h-screen overflow-hidden bg-[#050505]">

          {/* Full-bleed background portrait */}
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              src="/founder-5.png"
              alt="Shamim Forever — Our Story"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'brightness(0.35) contrast(1.15) saturate(0.8)' }}
            />
            {/* Atmospheric overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-[#050505]/30 to-[#050505]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,160,84,0.04)_0%,transparent_70%)]" />
          </motion.div>

          {/* Hero text */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 lg:px-24 max-w-[1200px]"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.4 }}
              className="luxury-meta mb-5 md:mb-8"
            >
              Our Story
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-light tracking-[0.12em] leading-[0.88] uppercase text-zinc-100 mb-6 md:mb-8"
              style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
            >
              Built From Love.
              <br />
              <span className="text-zinc-300">Forged Into Legacy.</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 1.4 }}
              className="w-16 h-px bg-[#c9a054]/60 origin-left mb-6 md:mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1.4 }}
              className="text-zinc-400 font-light leading-relaxed max-w-xl text-sm md:text-base"
            >
              Shamim Forever was never created to become another luxury brand.
              <br className="hidden md:block" />{' '}
              It was built to preserve emotion, memory, craftsmanship, and timeless identity through sovereign design.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="flex items-center gap-3 mt-10 md:mt-14"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent"
              />
              <span className="luxury-meta opacity-40">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 — THE BEGINNING
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Left: Portrait */}
            <motion.div
              {...fadeIn}
              className="relative aspect-[3/4] overflow-hidden order-2 lg:order-1"
            >
              <img
                src="/founder-1.png"
                alt="Shamim — The Beginning"
                className="w-full h-full object-cover object-top"
                style={{ filter: 'brightness(0.65) contrast(1.1)' }}
              />
              {/* Gold rim light */}
              <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[rgba(201,160,84,0.08)] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#050505] to-transparent" />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="absolute bottom-6 left-6"
              >
                <div className="w-8 h-px bg-[#c9a054]/40 mb-2" />
                <p className="luxury-meta opacity-50 text-[8px]">Est. 2023</p>
              </motion.div>
            </motion.div>

            {/* Right: Text */}
            <motion.div {...fadeUp} className="order-1 lg:order-2">
              <p className="luxury-meta mb-6 md:mb-8">Chapter I</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8 md:mb-10 leading-tight">
                The
                <br />
                <span className="italic text-[#c9a054]">Beginning</span>
              </h2>
              <div className="space-y-5 md:space-y-6 text-zinc-400 font-light leading-relaxed">
                <p>Every legacy begins with emotion.</p>
                <p>
                  Shamim Forever was born from remembrance — not from trends, markets, or commercial ambition.
                </p>
                <p>
                  What started as a deeply personal emotional connection evolved into something far greater:
                  a sovereign luxury house built around meaning, craftsmanship, and timeless presence.
                </p>
                <p>
                  This brand carries the essence of loyalty, elegance, and emotional permanence.
                </p>
                <p className="text-zinc-300 font-light italic">
                  It represents the idea that true luxury is not loud.
                  <br />It is deeply felt.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3 — THE EMOTION
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-40 relative overflow-hidden">
          {/* Subtle gold atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,160,84,0.04)_0%,transparent_70%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/15 to-transparent" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.p {...fadeIn} className="luxury-meta mb-8 md:mb-10 text-center">Chapter II</motion.p>

            <motion.div {...fadeUp} className="space-y-8 md:space-y-10">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.15em] text-zinc-200 leading-relaxed">
                In a world driven by noise and temporary attention, Shamim Forever was designed differently.
              </p>

              <div className="pl-6 border-l border-[#c9a054]/30 space-y-3">
                <p className="text-zinc-300 font-light tracking-[0.1em] text-base md:text-lg">Every fragrance.</p>
                <p className="text-zinc-300 font-light tracking-[0.1em] text-base md:text-lg">Every ring.</p>
                <p className="text-zinc-300 font-light tracking-[0.1em] text-base md:text-lg">Every crafted detail.</p>
              </div>

              <p className="text-zinc-400 font-light text-lg md:text-xl leading-relaxed">
                Exists to preserve feeling.
              </p>

              <div className="pt-4 md:pt-6">
                <p className="luxury-meta mb-4">The philosophy is simple</p>
                <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase text-zinc-100 leading-tight">
                  Luxury should carry
                  <br />
                  <span className="text-[#c9a054] italic">soul.</span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-8 pt-4">
                {['Not excess.', 'Not imitation.', 'But identity.'].map((text, i) => (
                  <motion.p
                    key={text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 1 }}
                    className="text-zinc-500 font-light text-xs md:text-sm tracking-[0.15em] text-center"
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4 — THE TRANSFORMATION
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Left: Text */}
            <motion.div {...fadeUp}>
              <p className="luxury-meta mb-6 md:mb-8">Chapter III</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8 md:mb-10 leading-tight">
                The<br />
                <span className="italic text-[#c9a054]">Transformation</span>
              </h2>
              <div className="space-y-5 md:space-y-6 text-zinc-400 font-light leading-relaxed">
                <p>
                  Over time, the vision expanded beyond a traditional boutique.
                </p>
                <p>
                  Shamim Forever evolved into a modern luxury ecosystem — blending craftsmanship, technology,
                  digital authenticity, and sovereign commerce.
                </p>
                <p className="text-zinc-300">The mission became larger:</p>
                <p className="font-serif text-xl md:text-2xl text-zinc-200 tracking-wide leading-relaxed italic">
                  "To create a globally respected luxury house rooted in emotional storytelling and institutional elegance."
                </p>
              </div>
            </motion.div>

            {/* Right: Portrait */}
            <motion.div {...fadeIn} className="relative aspect-[3/4] overflow-hidden">
              <img
                src="/founder-2.png"
                alt="Shamim — The Vision"
                className="w-full h-full object-cover object-top"
                style={{ filter: 'brightness(0.65) contrast(1.1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505]/30" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#050505] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 5 — THE CRAFTSMANSHIP
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">

            {/* Left: Floating typography */}
            <motion.div {...fadeUp} className="lg:col-span-5 lg:sticky lg:top-32">
              <p className="luxury-meta mb-6 md:mb-8">Chapter IV</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-10 md:mb-14 leading-tight">
                The<br />
                <span className="italic text-[#c9a054]">Craft</span>
              </h2>

              <div className="space-y-6 md:space-y-8 text-zinc-400 font-light leading-relaxed mb-10">
                <p>Every material is selected intentionally.</p>
                <p className="text-zinc-300 font-light">
                  Nothing is rushed.
                  <br />Nothing is accidental.
                </p>
                <p>
                  Craftsmanship is treated as philosophy.
                </p>
                <p>
                  The process matters as much as the final creation.
                </p>
              </div>

              <div className="space-y-4 border-t border-[#1a1a1a] pt-8">
                {[
                  '925 Sterling Silver',
                  'Luxury Oud Oils',
                  'Precision Compositions',
                  'Hand-Finished Detail',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#c9a054] flex-shrink-0" />
                    <p className="luxury-meta text-[9px]">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Portrait grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <motion.div {...fadeIn} className="aspect-[3/4] overflow-hidden">
                <img
                  src="/founder-4.png"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(0.6) contrast(1.1)' }}
                />
              </motion.div>
              <motion.div
                {...fadeIn}
                transition={{ delay: 0.2, duration: 1.4 }}
                className="aspect-[3/4] overflow-hidden mt-10 md:mt-16"
              >
                <img
                  src="/founder-3.png"
                  alt="The Vision"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(0.6) contrast(1.1)' }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 6 — THE PHILOSOPHY
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-48 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(201,160,84,0.04)_0%,transparent_70%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/12 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/12 to-transparent" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.p {...fadeIn} className="luxury-meta mb-10 md:mb-16">Chapter V — The Philosophy</motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-light tracking-[0.12em] text-zinc-100 leading-[1.2] mb-14 md:mb-20"
              style={{ fontSize: 'clamp(1.6rem, 4.5vw, 4rem)' }}
            >
              "True luxury is not created for attention.
              <br />
              <span className="text-[#c9a054] italic">It is created for permanence."</span>
            </motion.blockquote>

            <motion.div
              {...fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto text-left"
            >
              {[
                { label: 'Timeless', sub: 'over trendy' },
                { label: 'Discipline', sub: 'over noise' },
                { label: 'Identity', sub: 'over imitation' },
                { label: 'Legacy', sub: 'over short-term success' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className="flex items-start gap-4 py-4 border-b border-[#1a1a1a]"
                >
                  <div className="w-1 h-1 rounded-full bg-[#c9a054] mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="font-serif text-zinc-100 tracking-[0.1em]">{item.label}</span>
                    <span className="text-zinc-600 text-sm font-light"> — {item.sub}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 7 — THE FUTURE
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Right: Text */}
            <motion.div {...fadeUp} className="lg:col-start-2 order-1 lg:order-2">
              <p className="luxury-meta mb-6 md:mb-8">Chapter VI</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8 md:mb-10 leading-tight">
                The<br />
                <span className="italic text-[#c9a054]">Future</span>
              </h2>
              <div className="space-y-5 text-zinc-400 font-light leading-relaxed mb-10">
                <p>The future of Shamim Forever extends beyond physical luxury.</p>
                <p>The vision includes a new dimension of sovereign presence:</p>
              </div>
              <div className="space-y-3 mb-10">
                {[
                  'Digital Authenticity Systems',
                  'Blockchain Verification',
                  'Sovereign Commerce Infrastructure',
                  'Global Luxury Experiences',
                  'Institutional-Grade Luxury',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="flex items-center gap-4 py-2 border-b border-[#111]"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#c9a054] flex-shrink-0" />
                    <p className="luxury-meta text-[9px]">{item}</p>
                  </motion.div>
                ))}
              </div>
              <motion.p
                {...fadeIn}
                className="font-serif text-xl md:text-2xl text-zinc-300 tracking-wide italic leading-relaxed"
              >
                "The goal is not to become bigger.
                <br />The goal is to become timeless."
              </motion.p>
            </motion.div>

            {/* Left: Portrait */}
            <motion.div {...fadeIn} className="relative aspect-[3/4] overflow-hidden order-2 lg:order-1 lg:col-start-1 lg:row-start-1">
              <img
                src="/founder-1.png"
                alt="Shamim — The Future"
                className="w-full h-full object-cover object-center"
                style={{ filter: 'brightness(0.5) contrast(1.15) saturate(0.8)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/40" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#050505] to-transparent" />
              {/* Subtle gold radial */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_30%,rgba(201,160,84,0.06)_0%,transparent_70%)]" />
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 8 — FINAL LEGACY STATEMENT
        ══════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="/founder-5.png"
              alt="Shamim Forever Legacy"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'brightness(0.22) contrast(1.2) saturate(0.7)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_30%,rgba(5,5,5,0.7)_100%)]" />
          </div>

          <div className="relative z-10 text-center px-6 py-32 max-w-4xl mx-auto">
            <motion.p {...fadeIn} className="luxury-meta mb-8 md:mb-12">Forever</motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 md:space-y-5 mb-10 md:mb-16"
            >
              <p className="font-serif font-light text-xl md:text-2xl lg:text-3xl tracking-[0.2em] text-zinc-400">
                Some brands sell products.
              </p>
              <p className="font-serif font-light text-xl md:text-2xl lg:text-3xl tracking-[0.2em] text-zinc-400">
                Some brands create trends.
              </p>
              <p className="font-serif font-light text-xl md:text-2xl lg:text-3xl tracking-[0.2em] text-zinc-300 mt-4">
                But very few build legacy.
              </p>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1.4 }}
              className="w-16 h-px bg-[#c9a054]/50 mx-auto mb-10 md:mb-16"
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1.4 }}
              className="text-zinc-400 font-light leading-relaxed max-w-lg mx-auto mb-6 md:mb-8 text-sm md:text-base"
            >
              Shamim Forever exists to build something that remains.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1.4 }}
              className="font-serif font-light tracking-[0.4em] uppercase text-[#c9a054] mb-16 md:mb-20"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
            >
              Forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1.4 }}
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
  