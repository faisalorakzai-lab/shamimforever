'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const ease = [0.16, 1, 0.3, 1] as const
const fv = (d=0) => ({ initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:1,ease,delay:d} })

const SERVICES = [
  { icon:'◈', title:'Lifetime Restoration', desc:'Your Shamim Forever creation is restored to sovereign condition at any point in its life — free of charge for registered owners. Crystal clarity guaranteed.' },
  { icon:'◇', title:'Refill Ritual', desc:'Every fragrance may be refilled by our master perfumers using the original formula — preserved in our sovereign vault indefinitely.' },
  { icon:'◆', title:'Forever Polish', desc:'Jewelry and accessories receive quarterly polish services at any boutique, restoring the original lustre of sterling 925 or gold plating.' },
  { icon:'○', title:'Bespoke Vaulting', desc:'Your creation can be physically stored in our climate-controlled sovereign vault between seasons — insured, catalogued, and retrievable on demand.' },
  { icon:'◉', title:'NFT Service Tracking', desc:'Every care event is logged to your product\'s NFT — building a permanent record of restoration, refill, and service history that lives on-chain.' },
]

const TIMELINE = [
  { year:'Day 1', label:'Acquisition', desc:'Creation delivered. Sovereign passport issued.' },
  { year:'Year 1', label:'First Ritual', desc:'Complimentary care assessment at your boutique.' },
  { year:'Year 3', label:'Deep Restoration', desc:'Full restoration to original sovereign condition.' },
  { year:'Year 7', label:'Archive Review', desc:'Creation assessed for Heritage Gallery induction.' },
  { year:'Forever', label:'Permanent Record', desc:'On-chain service history — immutable, transferable.' },
]

export default function CarePage() {
  const [form, setForm] = useState({name:'',email:'',product:'',service:'',notes:''})
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    supabase.from('care_requests').insert([form]).then(({ error }) => { if(!error) setSent(true) })
  }

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <section className="pt-20 border-b border-[#0d0d0d]">
        <div className="relative overflow-hidden" style={{minHeight:'40vw',maxHeight:'480px'}}>
          <img src="/founder-5.png" alt="Care" className="absolute inset-0 w-full h-full object-cover object-top"
            style={{filter:'brightness(0.2) contrast(1.2) saturate(0.6)'}} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/98 via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full px-5 md:px-12 lg:px-20 py-12 md:py-20 max-w-[1400px] mx-auto">
            <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1.2,ease}}>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5">Sovereign Concierge & Care</p>
              <h1 className="font-serif font-light text-5xl md:text-7xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-5">
                The Lifetime<br /><span className="italic text-zinc-400">Covenant</span>
              </h1>
              <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-sm">
                We do not sell and forget. Every Shamim Forever creation is covered by a lifetime commitment to sovereign care — restoration, refill, and preservation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-10"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Care Timeline</p><h2 className="font-serif font-light text-3xl md:text-4xl text-zinc-200">Your Creation's Journey</h2></motion.div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a054]/30 via-[#c9a054]/10 to-transparent hidden md:block" />
          <div className="space-y-0 divide-y divide-[#0a0a0a]">
            {TIMELINE.map((t,i) => (
              <motion.div key={t.year} {...fv(i*0.08)} className="grid grid-cols-1 md:grid-cols-[120px_180px_1fr] gap-3 md:gap-10 py-7 md:py-9 md:pl-8 group">
                <span className="font-serif font-light text-2xl text-[#c9a054]/40 group-hover:text-[#c9a054]/70 transition-colors duration-500">{t.year}</span>
                <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-500 self-center">{t.label}</p>
                <p className="text-zinc-600 text-sm font-light leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-10"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Services</p><h2 className="font-serif font-light text-3xl md:text-4xl text-zinc-200">Five Pillars of<br /><span className="italic text-zinc-500">Sovereign Care</span></h2></motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0a0a0a]">
          {SERVICES.map((s,i) => (
            <motion.div key={s.title} {...fv(i*0.07)} className="bg-[#050505] px-6 py-8 hover:bg-[#080808] transition-colors duration-500">
              <span className="text-xl text-[#c9a054] block mb-4">{s.icon}</span>
              <h3 className="font-serif font-light text-lg tracking-[0.08em] text-zinc-200 mb-3">{s.title}</h3>
              <p className="text-zinc-600 text-xs font-light leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Care Request Form */}
      <section className="px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[700px]">
        <motion.div {...fv()} className="mb-10"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Service Request</p><h2 className="font-serif font-light text-3xl tracking-[0.05em] text-zinc-200">Request Sovereign Care</h2></motion.div>
        {sent ? (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,ease}} className="border border-[#c9a054]/20 px-8 py-12 text-center">
            <div className="w-px h-12 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-6" />
            <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-4">Care Request Received</p>
            <p className="font-serif font-light text-2xl text-zinc-300 mb-4">Your covenant is honoured.</p>
            <p className="text-zinc-600 text-sm font-light">Our care team responds within 24 hours.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-0">
            {[{n:'name',l:'Full Name',t:'text',r:true},{n:'email',l:'Email Address',t:'email',r:true},{n:'product',l:'Product Name / Reference',t:'text',r:false}].map(f => (
              <div key={f.n} className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
                <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">{f.l} {f.r&&<span className="text-[#c9a054]">*</span>}</label>
                <input type={f.t} required={f.r} value={(form as any)[f.n]} onChange={e=>setForm(p=>({...p,[f.n]:e.target.value}))}
                  className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light placeholder:text-zinc-800 outline-none" />
              </div>
            ))}
            <div className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
              <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">Service Required</label>
              <select value={form.service} onChange={e=>setForm(p=>({...p,service:e.target.value}))} className="w-full pb-4 bg-transparent text-zinc-400 text-sm font-light outline-none">
                <option value="">Select service</option>
                {SERVICES.map(s=><option key={s.title} value={s.title} className="bg-[#050505]">{s.title}</option>)}
              </select>
            </div>
            <div className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
              <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">Notes</label>
              <textarea rows={3} value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light placeholder:text-zinc-800 outline-none resize-none" />
            </div>
            <div className="pt-8">
              <button type="submit" className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{transitionTimingFunction:'cubic-bezier(0.16,1,0.3,1)'}} />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Submit Care Request</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}
