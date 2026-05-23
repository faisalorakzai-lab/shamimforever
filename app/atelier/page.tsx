'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as const

const CHAPTERS = [
  {
    num: '01',
    label: 'The Origin',
    title: 'A House Born From Obsession',
    body: 'Shamim Forever was not founded — it was summoned. From the bazaars of Peshawar to the fragrance counters of Karachi, our founder spent a decade studying the craft before daring to create. The first formula was not a product. It was a declaration.',
    image: '/founder-1.png',
    stat: { value: '2023', label: 'Year Founded' },
    align: 'left' as const,
  },
  {
    num: '02',
    label: 'The Materials',
    title: 'Nothing Synthetic. Nothing Cheap.',
    body: 'Every raw material is sourced from origin. Oud from Assam. Rose absolute from Bulgaria. Ambergris — aged and wild. Our cosmetic pigments are milled at EU-certified facilities. Our sterling silver is hallmarked 925. We do not negotiate on material.',
    image: '/founder-2.png',
    stat: { value: '925', label: 'Sterling Silver Standard' },
    align: 'right' as const,
  },
  {
    num: '03',
    label: 'The Process',
    title: 'Sixty Days. Minimum.',
    body: 'A Shamim Forever fragrance takes no less than sixty days from first formula to final bottle. Each accord is tested against skin, air, time, and temperature before it is approved. Our atelier in Peshawar runs on silence and precision — never speed.',
    image: '/founder-3.png',
    stat: { value: '60+', label: 'Days Per Formula' },
    align: 'left' as const,
  },
  {
    num: '04',
    label: 'The People',
    title: 'Artisans, Not Workers.',
    body: 'Every hand in our atelier is a specialist. Our perfumers trained in Grasse and Kannauj both. Our jewelers carry generational craft from the old city workshops of Lahore. We do not hire for speed. We hire for obsession.',
    image: '/founder-4.png',
    stat: { value: '∞', label: 'Generational Craft' },
    align: 'right' as const,
  },
  {
    num: '05',
    label: 'The Standard',
    title: 'Sovereign or Nothing.',
    body: 'We have rejected entire product lines for failing a single criterion. We have reformulated a fragrance fourteen times. We do not launch until every element is sovereign. This is not perfectionism — it is the minimum standard for a house that carries this name.',
    image: '/founder-5.png',
    stat: { value: 'Forever', label: 'The Standard' },
    align: 'left' as const,
  },
]

const PILLARS = [
  { icon: '◈', title: 'Origin Materials', desc: 'Every ingredient sourced from its native territory — no substitutes, no dilution.' },
  { icon: '◇', title: 'Atelier Process', desc: 'Handcrafted in small batches. Never mass-produced. Never rushed.' },
  { icon: '◆', title: 'Zero Compromise', desc: 'Products that fail our internal standard are destroyed, not discounted.' },
  { icon: '◉', title: 'Generational Craft', desc: 'Our artisans carry methods passed through families — not courses.' },
]

export default function AtelierPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ─── CINEMATIC HERO ─── */}
      <section ref={heroRef} className="relative h-[100svh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="/founder-1.png"
            alt="The Atelier"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.3) contrast(1.15) saturate(0.8)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-end px-5 md:px-12 lg:px-20 pb-16 md:pb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.3 }}
          >
            <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5 md:mb-8">
              The Atelier
            </p>
            <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-[6.5vw] leading-[0.92] tracking-[0.04em] text-zinc-100 mb-6 md:mb-10 max-w-3xl">
              Where Sovereign<br />
              <span className="italic text-zinc-400">Craft Is Born</span>
            </h1>
            <div className="flex items-center gap-6">
              <div className="w-10 h-px bg-[#c9a054]/60" />
              <p className="text-zinc-500 font-light text-xs tracking-[0.2em] max-w-xs">
                A documentary of obsession, material, and permanent standard.
              </p>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 right-5 md:right-12 flex flex-col items-center gap-3">
            <div className="w-px h-16 bg-gradient-to-b from-[#c9a054]/0 via-[#c9a054]/60 to-[#c9a054]/0 animate-pulse" />
            <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-700 rotate-90 origin-center translate-y-8">
              Scroll
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─── OPENING MANIFESTO ─── */}
      <section className="px-5 md:px-12 lg:px-20 py-14 md:py-24 border-b border-[#111]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-14 items-start"
          >
            <div className="flex flex-row md:flex-col gap-4 md:gap-2">
              <div className="w-10 h-px bg-[#c9a054]/40 mt-2" />
            </div>
            <div>
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-6 md:mb-8">
                The Philosophy
              </p>
              <blockquote className="font-serif font-light text-2xl md:text-4xl lg:text-5xl tracking-[0.04em] text-zinc-200 leading-[1.2] mb-8 md:mb-10">
                "We do not make products.<br />
                <span className="italic text-zinc-500">We build permanent things —</span><br />
                objects designed to outlast trend,<br />
                season, and memory."
              </blockquote>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a054]">
                — The Founding Doctrine, 2023
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOUR PILLARS ─── */}
      <section className="border-b border-[#111]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#111]">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              className="px-5 md:px-8 py-10 md:py-14"
            >
              <span className="text-xl md:text-2xl text-[#c9a054] block mb-4 md:mb-6">{p.icon}</span>
              <h3 className="font-serif font-light text-base md:text-xl tracking-[0.1em] text-zinc-200 mb-3 md:mb-4 leading-tight">
                {p.title}
              </h3>
              <p className="text-zinc-600 text-xs font-light leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CHAPTER DOCUMENTARY ─── */}
      <section>
        {CHAPTERS.map((chapter, i) => {
          const isRight = chapter.align === 'right'
          return (
            <motion.div
              key={chapter.num}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease }}
              className="border-b border-[#111]"
            >
              <div className={`grid grid-cols-1 md:grid-cols-2`}>

                {/* Image */}
                <div className={`relative overflow-hidden ${isRight ? 'md:order-2' : 'md:order-1'} aspect-[4/3] md:aspect-auto md:min-h-[480px]`}>
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-full object-cover object-top"
                    style={{ filter: 'brightness(0.5) contrast(1.1) saturate(0.75)' }}
                  />
                  <div className={`absolute inset-0 ${
                    isRight
                      ? 'bg-gradient-to-r from-[#050505]/60 via-[#050505]/20 to-transparent'
                      : 'bg-gradient-to-l from-[#050505]/60 via-[#050505]/20 to-transparent'
                  }`} />
                  {/* Chapter number overlay */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                    <span className="font-serif font-light text-6xl md:text-8xl text-white/5 leading-none">
                      {chapter.num}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className={`flex flex-col justify-center px-5 py-10 md:px-12 lg:px-16 md:py-0 ${
                  isRight ? 'md:order-1 md:border-r border-[#111]' : 'md:order-2 md:border-l border-[#111]'
                }`}>
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <span className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054]">
                      Chapter {chapter.num}
                    </span>
                    <div className="w-4 h-px bg-[#c9a054]/30" />
                    <span className="text-[8px] tracking-[0.45em] uppercase text-zinc-700">
                      {chapter.label}
                    </span>
                  </div>

                  <h2 className="font-serif font-light text-2xl md:text-3xl lg:text-4xl tracking-[0.06em] text-zinc-100 leading-[1.15] mb-6 md:mb-8">
                    {chapter.title}
                  </h2>

                  <p className="text-zinc-500 font-light text-sm leading-relaxed mb-10 md:mb-12 max-w-sm">
                    {chapter.body}
                  </p>

                  {/* Stat */}
                  <div className="flex items-end gap-4 pt-8 border-t border-[#111]">
                    <span className="font-serif font-light text-4xl md:text-5xl text-[#c9a054] leading-none">
                      {chapter.stat.value}
                    </span>
                    <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 mb-1">
                      {chapter.stat.label}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          )
        })}
      </section>

      {/* ─── CLOSING STATEMENT ─── */}
      <section className="px-5 md:px-12 lg:px-20 py-20 md:py-32 border-b border-[#111]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="max-w-3xl"
        >
          <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-700 mb-8">
            The Standard
          </p>
          <h2 className="font-serif font-light text-4xl md:text-6xl lg:text-7xl tracking-[0.04em] text-zinc-100 leading-[1.05] mb-10 md:mb-14">
            Sovereign.<br />
            <span className="italic text-zinc-500">Or not at all.</span>
          </h2>
          <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-md mb-10 md:mb-14">
            Every creation leaves this atelier with a single mandate: to be worthy of the name it carries.
            Not for a season. Not for a trend. Forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden transition-all duration-700"
            >
              <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                Enter the Shop
              </span>
            </Link>
            <Link
              href="/our-story"
              className="inline-flex items-center justify-center text-[9px] tracking-[0.45em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500"
            >
              Our Story →
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
