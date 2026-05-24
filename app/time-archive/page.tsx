'use client'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const ease = [0.16, 1, 0.3, 1] as const
const fv = (d=0) => ({ initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:1,ease,delay:d} })

const ARCHIVE = [
  {
    id:'SF-OUD-001', title:'Oud Noir Eternal',
    events:[
      { date:'01 Mar 2023', label:'Raw Material Sourcing', desc:'Master perfumer Shamim sources aged oud from Assam, India — 40-year-old agarwood, hand-selected.' },
      { date:'14 Mar 2023', label:'Formula Development', desc:'47 iterations over 13 days. The final formula emerges from session 47 — a perfect balance of resin, smoke, and rose.' },
      { date:'22 Mar 2023', label:'Artisan Bottling', desc:'Hand-filled in our Karachi atelier by two artisans. Each bottle is weighed to within 0.02ml precision.' },
      { date:'01 Apr 2023', label:'NFC Seal & Wax', desc:'Sovereign NFC chip embedded. Gold wax seal applied by hand. Blockchain hash generated and anchored.' },
      { date:'15 Apr 2023', label:'First Ownership', desc:'Acquired by a private collector in Karachi. Sovereign passport transferred. Creation enters its living chapter.' },
    ]
  },
]

export default function TimeArchivePage() {
  const [selected, setSelected] = useState(ARCHIVE[0])
  const [activeIdx, setActiveIdx] = useState(0)
  const [scrub, setScrub] = useState(0)
  const scrubRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  function handleScrubClick(e: React.MouseEvent) {
    const rect = scrubRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const idx = Math.round(pct * (selected.events.length-1))
    setScrub(pct)
    setActiveIdx(idx)
  }

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <section className="pt-20 border-b border-[#0d0d0d]">
        <div className="px-5 md:px-12 lg:px-20 py-16 md:py-24 max-w-[1400px] mx-auto">
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1.2,ease}}>
            <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5">Sovereign Time Archive</p>
            <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-6">
              The Provenance<br /><span className="italic text-zinc-500">Stream</span>
            </h1>
            <p className="text-zinc-600 font-light text-sm leading-relaxed max-w-md">
              Travel back through every moment of your creation's existence — from raw material sourcing 
              to the hands that shaped it, to the vault that holds it today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700">Provenance Timeline — {selected.id}</p>
            <p className="font-serif font-light text-xl text-zinc-500 italic">{selected.title}</p>
          </div>
        </motion.div>

        {/* Scrubber */}
        <motion.div {...fv(0.1)}>
          <div ref={scrubRef} className="relative h-12 cursor-pointer mb-8 flex items-center" onClick={handleScrubClick}>
            <div className="w-full h-px bg-[#111]" />
            {selected.events.map((ev, i) => (
              <div key={i} className="absolute flex flex-col items-center" style={{ left:`${(i/(selected.events.length-1))*100}%`, transform:'translateX(-50%)' }}>
                <button onClick={(e) => { e.stopPropagation(); setActiveIdx(i); setScrub(i/(selected.events.length-1)) }}
                  className={`w-3 h-3 rounded-full border transition-all duration-400 ${i===activeIdx?'bg-[#c9a054] border-[#c9a054] scale-125':'bg-[#050505] border-[#222] hover:border-[#c9a054]/50'}`} />
                <span className={`mt-2 text-[6px] tracking-[0.3em] uppercase text-center whitespace-nowrap transition-colors duration-400 ${i===activeIdx?'text-[#c9a054]':'text-zinc-800'}`}>
                  {ev.date.split(' ')[2] ? ev.date.split(' ').slice(1).join(' ') : ev.date}
                </span>
              </div>
            ))}
            <div className="absolute h-px bg-[#c9a054]/40 top-1/2 left-0 pointer-events-none transition-all duration-400" style={{width:`${scrub*100}%`}} />
          </div>
        </motion.div>

        {/* Active event */}
        <motion.div key={activeIdx} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease}} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 border-t border-[#0d0d0d] pt-8">
          <div>
            <p className="text-[7px] tracking-[0.45em] uppercase text-[#c9a054] mb-2">Event {activeIdx+1} of {selected.events.length}</p>
            <p className="font-serif font-light text-sm text-zinc-500">{selected.events[activeIdx].date}</p>
            <h3 className="font-serif font-light text-xl text-zinc-200 mt-2">{selected.events[activeIdx].label}</h3>
          </div>
          <p className="text-zinc-500 text-sm font-light leading-relaxed self-center">{selected.events[activeIdx].desc}</p>
        </motion.div>
      </section>

      {/* All events list */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-8"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Full Record</p><h2 className="font-serif font-light text-3xl text-zinc-200">Complete Creation Journey</h2></motion.div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a054]/30 via-[#c9a054]/10 to-transparent" />
          <div className="space-y-0 divide-y divide-[#0a0a0a] pl-8">
            {selected.events.map((ev,i) => (
              <motion.div key={ev.label} {...fv(i*0.07)} className="relative py-7 group cursor-pointer" onClick={()=>{setActiveIdx(i);setScrub(i/(selected.events.length-1))}}>
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-[#c9a054]/30 bg-[#050505] group-hover:bg-[#c9a054] group-hover:border-[#c9a054] transition-all duration-400" />
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-10">
                  <div>
                    <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700">{ev.date}</p>
                    <p className="font-serif font-light text-lg text-zinc-400 group-hover:text-zinc-200 transition-colors duration-400 mt-1">{ev.label}</p>
                  </div>
                  <p className="text-zinc-700 text-sm font-light leading-relaxed self-center">{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Own the Archive</p>
            <p className="font-serif italic text-2xl md:text-3xl text-zinc-600 max-w-lg">"Every second of creation is preserved — permanently."</p>
          </div>
          <a href="/shop" className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden flex-shrink-0">
            <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{transitionTimingFunction:'cubic-bezier(0.16,1,0.3,1)'}} />
            <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Own a Creation</span>
          </a>
        </motion.div>
      </section>
    </div>
  )
}
