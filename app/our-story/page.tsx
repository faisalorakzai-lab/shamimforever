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

  const heroTextContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.5,
      },
    },
  }

  const wordReveal = {
    hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
  }

  function RevealWords({ text, className }: { text: string; className?: string }) {
    return (
      <span className={className} style={{ display: 'inline' }}>
        {text.split(' ').map((word, i) => (
          <motion.span
            key={i}
            variants={wordReveal}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    )
  }

  // Parallax Chapter I component
  function ChapterOneSection() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
    const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
    const macroY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
    const textY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

    return (
      <section ref={ref} className="border-b border-[#111] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[90vh]">

          {/* Founder portrait — parallax */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
            className="relative overflow-hidden aspect-[3/4] lg:aspect-auto lg:order-1"
          >
            <motion.div style={{ y: imageY }} className="absolute inset-[-8%]">
              <img
                src="/founder-1.png"
                alt="THE BEGINNING"
                className="w-full h-full object-cover object-top"
                style={{ filter: 'brightness(0.55) contrast(1.12) saturate(0.8)' }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050505]/10 to-[#050505]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="font-serif text-7xl md:text-9xl font-light text-white/5 leading-none select-none">I</span>
            </div>
          </motion.div>

          {/* Text — moves slightly faster */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="relative flex flex-col justify-center px-8 md:px-14 lg:px-12 py-16 md:py-20 lg:order-2 border-x border-[#111] z-10"
          >
            <motion.div style={{ y: textY }}>
              <div className="flex items-center gap-5 mb-10">
                <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Chapter I</span>
                <div className="w-6 h-px bg-[#c9a054]/30" />
                <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">THE BEGINNING</span>
              </div>

              <h2 className="font-serif font-light text-4xl md:text-5xl xl:text-6xl tracking-[0.08em] text-zinc-100 leading-[1.05] mb-10 whitespace-pre-line">
                {'Built From\nEmotion.'}
              </h2>

              <div className="w-14 h-px bg-[#c9a054]/40 mb-10" />

              <p className="text-zinc-300 font-light text-lg leading-[1.85] mb-8 italic font-serif">
                Every legacy begins not with a business plan — but with something felt so deeply it demands to exist. Shamim Forever was born from remembrance, not from markets or trends.
              </p>

              <p className="text-zinc-500 font-light text-[15px] leading-[2] max-w-md">
                What started as a deeply personal emotional connection evolved into something far greater: a sovereign luxury house built around meaning, craftsmanship, and timeless presence. This brand carries the essence of loyalty, elegance, and permanence — in every material, every composition, every decision.
              </p>
            </motion.div>
          </motion.div>

          {/* Macro / craft shot — parallax opposite direction */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease, delay: 0.2 }}
            className="relative overflow-hidden aspect-[3/4] lg:aspect-auto lg:order-3"
          >
            <motion.div style={{ y: macroY }} className="absolute inset-[-8%]">
              <img
                src="/founder-4.png"
                alt="The Craft — Raw Material"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: 'center 30%',
                  filter: 'brightness(0.45) contrast(1.25) saturate(0.5) sepia(0.3)',
                }}
              />
            </motion.div>
            {/* Golden shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a054]/8 via-transparent to-[#c9a054]/4" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/10 to-[#050505]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
            {/* Label */}
            <div className="absolute top-8 right-8">
              <span className="text-[8px] tracking-[0.45em] uppercase text-[#c9a054]/60">The Craft</span>
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
      body: 'The craft philosophy mirrors the atelier tradition: slow, deliberate, and uncompromising. 925 sterling silver is hand-finished to a mirror standard. Oud compositions are built over months, not days. The packaging is considered an extension of the product. The process is the product.',
      image: '/founder-4.png',
      imageRight: false,
    },
    {
      num: 'IV',
      label: 'THE FUTURE',
      headline: 'Sovereign\nCommerce.',
      sub: 'The future of Shamim Forever extends beyond physical luxury into the architecture of a new kind of ownership — where digital and material sovereignty are inseparable.',
      body: "OKBOND is the House's declaration that luxury must also be sovereign in its systems. Not dependent on platforms, not mediated by intermediaries, not subject to the logic of mass commerce. The next decade belongs to those who build their own infrastructure — and the House is building from the ground up.",
      image: '/founder-3.png',
      imageRight: true,
    },
  ]

  const NUMBERS = [
    { value: '2023', label: 'Founded', type: 'plain' },
    { value: '925', label: 'Sterling Silver', type: 'shimmer' },
    { value: '∞', label: 'The Standard', type: 'infinity' },
    { value: 'Forever', label: 'The Promise', type: 'plain' },
  ]

  export default function OurStoryPage() {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroY = useTransform(heroScroll, [0, 1], ['0%', '25%'])
    const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])

    return (
      <div className="bg-[#050505] overflow-x-hidden">

        {/* CINEMATIC HERO */}
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
              style={{ filter: 'brightness(0.32) contrast(1.15) saturate(0.75)' }}
            >
              <source src="/videos/our-story-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/55 to-[#050505]/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#050505]/80 via-[#050505]/20 to-transparent" />
          </motion.div>

          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-8 md:px-14 lg:px-20"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease }}
              className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-10"
            >
              Our Story
            </motion.p>

            <motion.h1
              variants={heroTextContainer}
              initial="hidden"
              animate="show"
              className="font-serif font-light tracking-[0.1em] text-zinc-100 leading-[0.92] mb-10"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}
            >
              <RevealWords text="Built From Love." /><br />
              <RevealWords text="Forged Into" className="text-zinc-400" /><br />
              <motion.span
                variants={wordReveal}
                className="italic text-zinc-300"
                style={{ display: 'inline-block' }}
              >
                Legacy.
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, delay: 1.4, ease }}
              className="w-20 h-px bg-gradient-to-r from-[#c9a054] to-transparent origin-left mb-10"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.6, ease }}
              className="text-zinc-400 font-light text-sm leading-[2] max-w-md tracking-wide"
            >
              Shamim Forever was never built to become another brand.<br />
              It was built to preserve emotion, memory, and timeless identity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.1 }}
              className="flex items-center gap-3 mt-12"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent"
              />
              <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-600">Scroll to explore</span>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 right-0 px-8 md:px-14 pb-8 z-10">
            <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Est. 2023</span>
          </div>
        </section>

        {/* NUMBERS STRIP — with micro-animations */}
        <section className="border-y border-[#111] py-12 px-8 md:px-14 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {NUMBERS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
                className={`py-8 px-6 md:px-10 flex flex-col gap-3 ${i < 3 ? 'border-r border-[#111]' : ''}`}
              >
                {item.type === 'shimmer' ? (
                  /* 925 — gold shimmer sweep every few seconds */
                  <div className="relative overflow-hidden">
                    <span className="font-serif font-light text-3xl md:text-4xl text-zinc-200 tracking-wide block">
                      {item.value}
                    </span>
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(105deg, transparent 20%, rgba(201,160,84,0.55) 50%, transparent 80%)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                      transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
                    />
                  </div>
                ) : item.type === 'infinity' ? (
                  /* ∞ — slow pulsing glow */
                  <motion.span
                    className="font-serif font-light text-3xl md:text-4xl tracking-wide block"
                    style={{ color: '#c9a054' }}
                    animate={{
                      textShadow: [
                        '0 0 0px rgba(201,160,84,0)',
                        '0 0 18px rgba(201,160,84,0.7)',
                        '0 0 0px rgba(201,160,84,0)',
                      ],
                      scale: [1, 1.07, 1],
                    }}
                    transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
                  >
                    {item.value}
                  </motion.span>
                ) : (
                  <span className="font-serif font-light text-3xl md:text-4xl text-zinc-200 tracking-wide">
                    {item.value}
                  </span>
                )}

                <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CHAPTER I — Split-Screen Parallax (special layout) */}
        <ChapterOneSection />

        {/* CHAPTERS II–IV — Standard alternating layout */}
        {CHAPTERS_REST.map((chapter) => (
          <section key={chapter.num} className="border-b border-[#111]">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease }}
                className={`relative overflow-hidden aspect-[3/4] lg:aspect-auto ${chapter.imageRight ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <img
                  src={chapter.image}
                  alt={chapter.label}
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(0.55) contrast(1.12) saturate(0.8)' }}
                />
                <div className={`absolute inset-0 ${chapter.imageRight
                  ? 'bg-gradient-to-r from-[#050505]/60 via-[#050505]/20 to-transparent'
                  : 'bg-gradient-to-l from-[#050505]/60 via-[#050505]/20 to-transparent'
                }`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />
                <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10">
                  <span className="font-serif text-7xl md:text-9xl font-light text-white/5 leading-none select-none">
                    {chapter.num}
                  </span>
                </div>
              </motion.div>

              <motion.div
                {...fadeUp}
                className={`flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 md:py-20 ${
                  chapter.imageRight ? 'lg:order-1 border-r border-[#111]' : 'lg:order-2 border-l border-[#111] lg:border-l-0 lg:border-r-0'
                }`}
              >
                <div className="flex items-center gap-5 mb-10">
                  <span className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">
                    Chapter {chapter.num}
                  </span>
                  <div className="w-6 h-px bg-[#c9a054]/30" />
                  <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">
                    {chapter.label}
                  </span>
                </div>

                <h2 className="font-serif font-light text-4xl md:text-5xl xl:text-6xl tracking-[0.08em] text-zinc-100 leading-[1.05] mb-10 whitespace-pre-line">
                  {chapter.headline}
                </h2>

                <div className="w-14 h-px bg-[#c9a054]/40 mb-10" />

                <p className="text-zinc-300 font-light text-lg leading-[1.85] mb-8 italic font-serif">
                  {chapter.sub}
                </p>

                <p className="text-zinc-500 font-light text-[15px] leading-[2] max-w-md">
                  {chapter.body}
                </p>
              </motion.div>

            </div>
          </section>
        ))}

        {/* MANIFESTO */}
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

        {/* FINAL LEGACY STATEMENT */}
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
              <p className="font-serif font-light text-xl md:text-2xl lg:text-3xl tracking-[0.15em] text-zinc-500">
                Some brands sell products.
              </p>
              <p className="font-serif font-light text-xl md:text-2xl lg:text-3xl tracking-[0.15em] text-zinc-500">
                Some brands create trends.
              </p>
              <p className="font-serif font-light text-xl md:text-2xl lg:text-3xl tracking-[0.15em] text-zinc-300">
                But very few build legacy.
              </p>
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
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                  Enter the Collection
                </span>
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
  