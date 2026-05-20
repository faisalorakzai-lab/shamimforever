'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const craftSteps = [
  {
    number: '01',
    title: 'Source',
    description:
      'We travel the world — from Grasse to the mountains of Khyber — to hand-select each raw material. Nothing is compromised. Nothing is synthetic.',
  },
  {
    number: '02',
    title: 'Compose',
    description:
      'Our master perfumers blend in silence. Each accord is tested for months before it earns the right to exist in a Shamim Forever creation.',
  },
  {
    number: '03',
    title: 'Age',
    description:
      'Time is the final ingredient. Every creation rests — weeks, sometimes months — until it finds its voice.',
  },
  {
    number: '04',
    title: 'Authenticate',
    description:
      'Each bottle receives a unique cryptographic signature and is hand-sealed by the atelier. Only then does it leave our hands.',
  },
]

export default function AtelierPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] pt-20">
      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-end pb-24 px-6 md:px-12 lg:px-20 overflow-hidden border-b border-[#1a1a1a]">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505]"
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#c9a054]/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#c9a054]/5" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="luxury-meta mb-8"
          >
            The Craft
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-[9rem] font-light tracking-[0.15em] uppercase text-zinc-100 leading-none mb-10"
          >
            The<br />
            <span className="italic text-[#c9a054]">Atelier</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-zinc-400 font-light leading-relaxed max-w-xl"
          >
            Where obsession becomes creation. Where heritage meets the future. 
            The Shamim Forever Atelier is not a factory — it is a sanctum.
          </motion.p>
        </div>
      </div>

      {/* Manifesto */}
      <section className="py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="luxury-meta mb-8">Our Manifesto</p>
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-10 leading-tight">
              We do not follow.<br />
              <span className="italic text-[#c9a054]">We define.</span>
            </h2>
            <div className="space-y-6 text-zinc-400 font-light leading-relaxed">
              <p>
                Shamim Forever was born from a singular conviction: that luxury should not be borrowed 
                from the West. Pakistan's cultural heritage — its ancient trade routes, royal courts, 
                and artisanal traditions — is itself a source of sovereign luxury.
              </p>
              <p>
                Our atelier operates at the intersection of ancestral knowledge and contemporary precision. 
                We are not recreating history. We are making it.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-[#0a0a0a] border border-[#1a1a1a] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-serif text-[12rem] font-light text-[#c9a054]/5 leading-none">∞</p>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="luxury-meta mb-2">Founded</p>
                <p className="font-serif text-3xl font-light text-zinc-100 tracking-[0.2em]">2025</p>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-32 h-32 border border-[#c9a054]/10" />
          </motion.div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-20 border-y border-[#1a1a1a]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-20"
          >
            <p className="luxury-meta mb-6">The Method</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-[0.2em] uppercase text-zinc-100">
              Four Acts of Creation
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a]">
            {craftSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#050505] p-10 group hover:bg-[#0a0a0a] transition-colors duration-700"
              >
                <p className="font-serif text-6xl font-light text-[#c9a054]/20 mb-8 group-hover:text-[#c9a054]/40 transition-colors duration-700">
                  {step.number}
                </p>
                <h3 className="font-serif text-2xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-6">
                  {step.title}
                </h3>
                <p className="text-zinc-500 font-light leading-relaxed text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif text-2xl md:text-4xl font-light tracking-[0.15em] text-zinc-300 leading-relaxed italic mb-20">
              "A fragrance is not worn. It is inhabited. We build houses for the soul — not for the wrist."
            </p>
            <p className="luxury-meta">— The House of Shamim Forever</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[#1a1a1a] px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="luxury-meta mb-4">Experience the Craft</p>
            <h3 className="font-serif text-3xl md:text-4xl font-light tracking-[0.2em] uppercase text-zinc-100">
              Visit Our Atelier
            </h3>
          </div>
          <div className="flex gap-4">
            <Link href="/boutiques" className="luxury-btn text-[9px]">
              Find a Boutique
            </Link>
            <Link href="/shop" className="luxury-btn text-[9px]">
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
