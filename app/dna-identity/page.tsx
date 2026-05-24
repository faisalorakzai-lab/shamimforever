'use client'
import { motion, useAnimationFrame } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as const
const fv = (d=0) => ({ initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:1,ease,delay:d} })

function DnaStrand() {
  const t = useRef(0)
  const [dots, setDots] = useState(() => Array.from({length:16}, (_,i) => ({ x:0, y:0, o:1 })))
  useAnimationFrame((_, delta) => {
    t.current += delta * 0.001
    setDots(Array.from({length:16}, (_,i) => {
      const phase = (i / 16) * Math.PI * 2 + t.current * 2
      return { x: Math.sin(phase) * 40, y: (i / 15) * 200 - 100, o: 0.3 + Math.abs(Math.sin(phase)) * 0.7 }
    }))
  })
  return (
    <div className="relative h-64 w-full flex items-center justify-center overflow-hidden">
      <svg width="160" height="220" viewBox="-80 -110 160 220" className="overflow-visible">
        {dots.map((d,i) => i < dots.length-1 && (
          <line key={`l${i}`} x1={d.x} y1={d.y} x2={dots[i+1].x} y2={dots[i+1].y} stroke={`rgba(201,160,84,${d.o*0.3})`} strokeWidth="1" />
        ))}
        {dots.map((d,i) => (
          <circle key={i} cx={d.x} cy={d.y} r="3" fill={`rgba(201,160,84,${d.o})`} />
        ))}
        {dots.map((d,i) => (
          <circle key={`m${i}`} cx={-d.x} cy={d.y} r="2" fill={`rgba(201,160,84,${d.o*0.5})`} />
        ))}
        {dots.map((d,i) => (
          <line key={`c${i}`} x1={d.x} y1={d.y} x2={-d.x} y2={d.y} stroke={`rgba(201,160,84,${d.o*0.15})`} strokeWidth="0.5" />
        ))}
      </svg>
    </div>
  )
}

const PILLARS = [
  { icon:'◉', title:'Micro DNA Markers', desc:'Invisible nano-markers embedded in the liquid composition of each fragrance. Unique to the production batch — verifiable under spectrographic analysis.' },
  { icon:'◈', title:'Adaptive Fragrance Chemistry', desc:'Your skin chemistry is documented during your first bespoke session. Future formulas adapt to your biological profile — the scent evolves with you.' },
  { icon:'◆', title:'Personal Scent Signature', desc:'Your unique body chemistry is encoded into a Sovereign Scent Profile — a biometric fingerprint used to personalise every future fragrance commissioned.' },
  { icon:'◇', title:'Impossible Counterfeit Protocol', desc:'The combination of nano-markers, batch codes, NFC verification, and DNA chemistry creates a system of authenticity no counterfeit can replicate.' },
]

export default function DnaIdentityPage() {
  const [step, setStep] = useState(0)
  const QUIZ = [
    { q:'What is your dominant skin tone?', opts:['Fair · Neutral','Warm · Golden','Deep · Rich','Olive · Mediterranean'] },
    { q:'How does your skin react to heat?', opts:['Dry · Minimal sweat','Normal · Balanced','Oily · Amplifies scent','Sensitive · Delicate'] },
    { q:'What scents naturally suit you?', opts:['Fresh · Citrus','Warm · Oriental','Green · Botanical','Deep · Resinous'] },
  ]
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState('')

  function choose(opt: string) {
    const a = [...answers, opt]
    setAnswers(a)
    if(a.length >= 3) {
      const profiles = ['Oud Noir Sovereign','Rose de Lumière','Forêt Mystique','Ambre Royal']
      setResult(profiles[Math.floor(Math.random()*profiles.length)])
    } else {
      setStep(s=>s+1)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <section className="pt-20 border-b border-[#0d0d0d]">
        <div className="px-5 md:px-12 lg:px-20 py-16 md:py-24 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1.2,ease}}>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5">Bio-Signature DNA Authentication</p>
              <h1 className="font-serif font-light text-5xl md:text-6xl lg:text-7xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-6">
                The Biological<br /><span className="italic text-zinc-500">Lock</span>
              </h1>
              <p className="text-zinc-600 font-light text-sm leading-relaxed max-w-md">
                The future of luxury authentication is biological. Your creation carries markers 
                no lab can replicate — and your scent adapts to the chemistry that is uniquely yours.
              </p>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.5,ease}}>
              <DnaStrand />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-10"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">The System</p><h2 className="font-serif font-light text-3xl md:text-4xl text-zinc-200">Four Biological Pillars</h2></motion.div>
        <div className="space-y-0 divide-y divide-[#0a0a0a]">
          {PILLARS.map((p,i) => (
            <motion.div key={p.title} {...fv(i*0.07)} className="grid grid-cols-1 md:grid-cols-[80px_220px_1fr] gap-3 md:gap-10 py-8 md:py-10 group hover:bg-[#080808] px-2 transition-colors duration-500">
              <span className="text-xl text-[#c9a054]">{p.icon}</span>
              <h3 className="font-serif font-light text-lg tracking-[0.08em] text-zinc-300 self-center">{p.title}</h3>
              <p className="text-zinc-600 text-sm font-light leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Biometric Quiz */}
      <section className="px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[700px]">
        <motion.div {...fv()} className="mb-8"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Biometric Profile</p><h2 className="font-serif font-light text-2xl md:text-3xl text-zinc-200">Discover Your Scent DNA</h2></motion.div>
        {result ? (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,ease}} className="border border-[#c9a054]/20 p-8">
            <p className="text-[7px] tracking-[0.55em] uppercase text-[#c9a054] mb-3">Your Sovereign Scent Profile</p>
            <h3 className="font-serif font-light text-3xl text-zinc-200 mb-4">{result}</h3>
            <p className="text-zinc-600 text-sm font-light leading-relaxed mb-6">Your biological profile matches this sovereign formula. Commission a bespoke version adapted to your unique chemistry.</p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/bespoke" className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-5 py-3 hover:bg-[#c9a054]/5 transition-colors duration-400">Commission Bespoke</Link>
              <button onClick={()=>{setStep(0);setAnswers([]);setResult('')}} className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 px-5 py-3 hover:text-zinc-400 transition-colors duration-400">Retake →</button>
            </div>
          </motion.div>
        ) : (
          <div className="border border-[#0d0d0d] p-8">
            <div className="flex gap-1 mb-6">
              {QUIZ.map((_,i) => <div key={i} className={`h-px flex-1 transition-colors duration-500 ${i<=step?'bg-[#c9a054]':'bg-[#111]'}`} />)}
            </div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-700 mb-3">Question {step+1} of {QUIZ.length}</p>
            <h3 className="font-serif font-light text-xl text-zinc-200 mb-6">{QUIZ[step].q}</h3>
            <div className="grid grid-cols-1 gap-2">
              {QUIZ[step].opts.map(opt => (
                <button key={opt} onClick={()=>choose(opt)} className="text-left px-5 py-4 border border-[#111] text-[9px] tracking-[0.35em] uppercase text-zinc-600 hover:border-[#c9a054]/40 hover:text-[#c9a054] transition-all duration-400">{opt}</button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
