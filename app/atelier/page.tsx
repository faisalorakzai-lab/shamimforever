'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as const
const GOLD = '#D4AF37'

const CHAPTERS = [
  {
    num: '01',
    label: 'The Origin',
    title: 'A House Born From Obsession',
    body: 'Shamim Forever was not founded — it was summoned. From the bazaars of Peshawar to the fragrance counters of Karachi, our founder spent a decade studying the craft before daring to create. The first formula was not a product. It was a declaration.',
    image: '/atelier/atelier-chapter-01.png',
    stat: { value: '2023', label: 'Year Founded' },
    align: 'left' as const,
  },
  {
    num: '02',
    label: 'The Materials',
    title: 'Nothing Synthetic. Nothing Cheap.',
    body: 'Every raw material is sourced from origin. Oud from Assam. Rose absolute from Bulgaria. Ambergris — aged and wild. Our cosmetic pigments are milled at EU-certified facilities. Our sterling silver is hallmarked 925. We do not negotiate on material.',
    image: '/atelier/atelier-chapter-02.png',
    stat: { value: '925', label: 'Sterling Silver Standard' },
    align: 'right' as const,
    materialNote: 'Assam Oud · Bulgarian Rose · Wild Ambergris',
  },
  {
    num: '03',
    label: 'The Process',
    title: 'Sixty Days. Minimum.',
    body: 'A Shamim Forever fragrance takes no less than sixty days from first formula to final bottle. Each accord is tested against skin, air, time, and temperature before it is approved. Our atelier in Peshawar runs on silence and precision — never speed.',
    image: '/atelier/atelier-chapter-03.png',
    stat: { value: '60+', label: 'Days Per Formula' },
    align: 'left' as const,
    materialNote: 'Formula · Maceration · Evaluation · Approval',
  },
  {
    num: '04',
    label: 'The People',
    title: 'Artisans, Not Workers.',
    body: 'Every hand in our atelier is a specialist. Our perfumers trained in Grasse and Kannauj both. Our jewelers carry generational craft from the old city workshops of Lahore. We do not hire for speed. We hire for obsession.',
    image: '/atelier/atelier-chapter-04.png',
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

const JOURNEY_STEPS = [
  { day: 'Day 01', phase: 'Raw Sourcing', desc: 'Materials arrive from four continents. Each batch is inspected at origin before shipment is accepted.' },
  { day: 'Day 07', phase: 'First Formula', desc: 'The perfumer begins building the accord from memory, instinct, and raw material character.' },
  { day: 'Day 21', phase: 'Maceration', desc: 'The formula rests. Molecules bond. No shortcuts. The atelier is silent.' },
  { day: 'Day 35', phase: 'Skin Trials', desc: 'The accord is tested against twelve different skin profiles in varying temperature and humidity conditions.' },
  { day: 'Day 50', phase: 'Reformulation', desc: 'If a single note fails, the entire formula is rebuilt. We do not patch. We restart.' },
  { day: 'Day 60+', phase: 'Final Approval', desc: 'The founder personally signs off. Until he does, the fragrance does not exist.' },
]

const RAW_MATERIALS = [
  {
    name: 'THE OUD',
    origin: 'Assam, India',
    desc: 'Agarwood resin aged for no less than twelve years. The rarest organic fragrance material on earth.',
    img: '/materials/oud-assam.png',
  },
  {
    name: 'THE GOLD',
    origin: 'Hallmarked 22K',
    desc: 'Every gold detail is independently hallmarked and certified. Not plated. Not alloyed beyond standard.',
    img: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=700&auto=format&fit=crop&q=80',
  },
  {
    name: 'THE DIAMOND',
    origin: 'Conflict-Free Certified',
    desc: 'Natural diamonds. Conflict-free certified. Set by hand in Lahore\'s oldest jeweller workshop.',
    img: '/materials/diamond-certified.png',
  },
]

export default function AtelierPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      <style>{`
        @keyframes goldPulse {
          0%, 100% { text-shadow: 0 0 4px rgba(212,175,55,0.4), 0 0 12px rgba(212,175,55,0.1); opacity: 1; }
          50% { text-shadow: 0 0 10px rgba(212,175,55,0.9), 0 0 28px rgba(212,175,55,0.35), 0 0 50px rgba(212,175,55,0.1); opacity: 0.85; }
        }
        .pillar-icon { animation: goldPulse 3s ease-in-out infinite; }
        .pillar-icon:nth-child(1) { animation-delay: 0s; }
        .pillar-card:nth-child(2) .pillar-icon { animation-delay: 0.75s; }
        .pillar-card:nth-child(3) .pillar-icon { animation-delay: 1.5s; }
        .pillar-card:nth-child(4) .pillar-icon { animation-delay: 2.25s; }
        .journey-track::-webkit-scrollbar { display: none; }
        .journey-track { scrollbar-width: none; -ms-overflow-style: none; }
        @keyframes breatheGold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
          50% { box-shadow: 0 0 0 6px rgba(212,175,55,0.08), 0 0 30px rgba(212,175,55,0.04); }
        }
        .material-card { animation: breatheGold 4s ease-in-out infinite; }
      `}</style>

      {/* ─── CINEMATIC HERO ─── */}
      <section ref={heroRef} className="relative h-[100svh] overflow-hidden">
        <motion.div style={{ y: heroY, position: 'absolute', inset: '-12%' }}>
          <video
            autoPlay muted loop playsInline preload="auto"
            poster="/founder-1.png"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.28) contrast(1.22) saturate(0.45) hue-rotate(200deg)' }}
          >
            <source src="/videos/atelier-hero.mp4" type="video/mp4" />
            <img src="/founder-1.png" alt="The Atelier" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </video>
        </motion.div>

        {/* Dark cyberpunk overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,4,18,0.45)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, rgba(5,5,5,0.88) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, transparent 30%, rgba(5,5,5,0.98) 100%)', zIndex: 1 }} />
        {/* Cyberpunk blue-gold scan-line shimmer */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(30,60,120,0.04) 50%, transparent 100%)', zIndex: 1, backgroundSize: '100% 4px', backgroundRepeat: 'repeat-y' }} />

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

      {/* ─── FOUR PILLARS (with pulse icons) ─── */}
      <section className="border-b border-[#111]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#111]">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              className="pillar-card px-5 md:px-8 py-10 md:py-14 group hover:bg-[#0a0900] transition-colors duration-700"
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              <span
                className="pillar-icon text-xl md:text-2xl text-[#D4AF37] block mb-4 md:mb-6"
                style={{ animationDelay: `${i * 0.75}s` }}
              >
                {p.icon}
              </span>
              <h3 className="font-serif font-light text-base md:text-xl tracking-[0.1em] text-zinc-200 mb-3 md:mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors duration-500">
                {p.title}
              </h3>
              <p className="text-zinc-600 text-xs font-light leading-relaxed group-hover:text-zinc-500 transition-colors duration-500">
                {p.desc}
              </p>
              <div className="mt-6 w-0 h-px bg-[#D4AF37]/40 group-hover:w-8 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── RAW MATERIALS INTERLUDE ─── */}
      <section className="border-b border-[#111] py-20 md:py-32 px-5 md:px-12 lg:px-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="mb-14 md:mb-20"
        >
          <p className="text-[8px] tracking-[0.6em] uppercase text-zinc-700 mb-4">The Source</p>
          <h2 className="font-serif font-light text-3xl md:text-5xl tracking-[0.06em] text-zinc-100">
            The Three Materials
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {RAW_MATERIALS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease, delay: i * 0.15 }}
              className="material-card relative overflow-hidden border border-[#1a1800] group"
              style={{ animationDelay: `${i * 1.3}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover object-center transition-transform duration-[2000ms] group-hover:scale-105"
                  style={{ filter: 'brightness(0.45) contrast(1.2) saturate(0.6)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                {/* Gold reveal line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/60 transition-all duration-700" />
              </div>

              {/* Text overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[7px] tracking-[0.6em] uppercase text-[#D4AF37]/70 mb-2">{m.origin}</p>
                <h3 className="font-serif font-light text-xl md:text-2xl tracking-[0.15em] text-zinc-100 mb-3">
                  {m.name}
                </h3>
                <p className="text-zinc-500 text-xs font-light leading-relaxed max-w-[220px]">{m.desc}</p>
              </div>
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
                    className="w-full h-full object-cover object-top transition-transform duration-[3000ms] hover:scale-105"
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
                  {/* Material note badge */}
                  {'materialNote' in chapter && chapter.materialNote && (
                    <div className="absolute top-5 left-5 md:top-7 md:left-7">
                      <p className="text-[6px] tracking-[0.5em] uppercase text-[#D4AF37]/60 bg-[#050505]/70 px-3 py-1.5 border border-[#D4AF37]/15">
                        {chapter.materialNote}
                      </p>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className={`flex flex-col justify-center px-5 py-10 md:px-12 lg:px-16 md:py-0 ${
                  isRight ? 'md:order-1 md:border-r border-[#111]' : 'md:order-2 md:border-l border-[#111]'
                }`}>
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <span className="text-[8px] tracking-[0.5em] uppercase text-[#D4AF37]">
                      Chapter {chapter.num}
                    </span>
                    <div className="w-4 h-px bg-[#D4AF37]/30" />
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
                    <span className="font-serif font-light text-4xl md:text-5xl text-[#D4AF37] leading-none">
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

      {/* ─── THE 60-DAY JOURNEY ─── */}
      <section className="border-b border-[#111] py-20 md:py-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="px-5 md:px-12 lg:px-20 mb-14 md:mb-20"
        >
          <p className="text-[8px] tracking-[0.6em] uppercase text-zinc-700 mb-4">The Art of Patience</p>
          <h2 className="font-serif font-light text-3xl md:text-5xl tracking-[0.06em] text-zinc-100 mb-4">
            The 60-Day Journey
          </h2>
          <p className="text-zinc-600 text-xs font-light tracking-[0.15em] max-w-md">
            From raw material to final bottle — every step is irreplaceable.
          </p>
        </motion.div>

        {/* Horizontal scroll track */}
        <div className="journey-track overflow-x-auto px-5 md:px-12 lg:px-20 pb-4">
          <div className="flex gap-0 w-max">
            {JOURNEY_STEPS.map((step, i) => (
              <motion.div
                key={step.day}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: i * 0.1 }}
                className="relative flex-shrink-0 w-[240px] md:w-[280px] border-l border-[#1c1800] pl-6 pr-4 py-8 group"
              >
                {/* Gold dot on the line */}
                <div className="absolute top-8 -left-[4.5px] w-2 h-2 rounded-full border border-[#D4AF37]/50 bg-[#050505] group-hover:bg-[#D4AF37]/30 transition-colors duration-500" />

                <p className="text-[8px] tracking-[0.5em] uppercase text-[#D4AF37]/70 mb-3">{step.day}</p>
                <h3 className="font-serif font-light text-base tracking-[0.08em] text-zinc-200 mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors duration-500">
                  {step.phase}
                </h3>
                <p className="text-zinc-600 text-xs font-light leading-relaxed">{step.desc}</p>

                {/* Index number */}
                <span className="absolute bottom-5 right-5 font-serif text-4xl text-white/3 leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>
            ))}

            {/* End cap */}
            <div className="flex-shrink-0 w-[80px] border-l border-[#1c1800] flex items-center justify-center">
              <span className="text-[#D4AF37]/30 text-lg">◈</span>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-[7px] tracking-[0.5em] uppercase text-zinc-800 px-5 md:px-12 lg:px-20 mt-6 flex items-center gap-3"
        >
          <span className="inline-block w-4 h-px bg-zinc-800" />
          Scroll to explore the process
          <span className="inline-block w-4 h-px bg-zinc-800" />
        </motion.p>
      </section>

      {/* ─── ARTISAN SPOTLIGHT ─── */}
      <section className="border-b border-[#111] px-5 md:px-12 lg:px-20 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease }}
          className="max-w-[900px] mx-auto text-center"
        >
          <div className="w-px h-14 bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent mx-auto mb-10" />

          <p className="text-[8px] tracking-[0.6em] uppercase text-zinc-700 mb-8">The Artisan Voice</p>

          <blockquote className="font-serif font-light text-2xl md:text-4xl lg:text-5xl tracking-[0.04em] text-zinc-200 leading-[1.25] mb-8 md:mb-10 italic">
            "We don't count hours.<br />
            <span className="text-[#D4AF37]">We count perfections.</span>"
          </blockquote>

          <div className="flex items-center justify-center gap-5 mb-4">
            <div className="w-8 h-px bg-[#D4AF37]/30" />
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#D4AF37]/60">Master Perfumer</span>
            <div className="w-8 h-px bg-[#D4AF37]/30" />
          </div>
          <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Shamim Forever Atelier · Peshawar</p>

          <div className="w-px h-14 bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent mx-auto mt-10" />
        </motion.div>
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
            {/* Premium CTA — heavy gold border with slow fill */}
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center px-10 py-5 border border-[#D4AF37]/70 text-[9px] tracking-[0.6em] uppercase text-[#D4AF37] overflow-hidden transition-all duration-700"
              style={{ letterSpacing: '0.5em' }}
            >
              <span
                className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-[900ms]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
              />
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300 delay-100 flex items-center gap-3">
                Enter the Collection
                <span className="w-4 h-px bg-current inline-block transition-all duration-500 group-hover:w-6" />
              </span>
            </Link>
            <Link
              href="/our-story"
              className="inline-flex items-center justify-center text-[9px] tracking-[0.45em] uppercase text-zinc-700 hover:text-[#D4AF37] transition-colors duration-500"
            >
              Our Story →
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
