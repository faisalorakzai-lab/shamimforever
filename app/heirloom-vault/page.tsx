'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const ease = [0.16, 1, 0.3, 1] as const
const fv = (d=0) => ({ initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:1,ease,delay:d} })

const STEPS = [
  { n:'01', title:'NFT Inheritance Registration', desc:'Assign your sovereign creation\'s NFT to a wallet or verified heir identity. The transfer is scheduled on-chain — legally binding under smart contract law.' },
  { n:'02', title:'Heir Wallet Assignment', desc:'Designate one or multiple heirs with specific percentage-based ownership. An optional time-lock can delay transfer until a specified future date.' },
  { n:'03', title:'Smart Succession Contract', desc:'A Shamim Forever sovereign contract governs the transition — with optional family council authorisation and legal witness requirements.' },
  { n:'04', title:'Multi-Generation Transfer', desc:'Heirloom Vault creations carry full provenance through every generation. The physical item and its digital identity transfer together, permanently documented.' },
]

export default function HeirloomVaultPage() {
  const [form, setForm] = useState({name:'',email:'',heir_name:'',heir_contact:'',asset_description:'',notes:''})
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    supabase.from('heirloom_registrations').insert([form]).then(({ error }) => { if(!error) setSent(true) })
  }

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <section className="pt-20 border-b border-[#0d0d0d]">
        <div className="relative overflow-hidden" style={{minHeight:'38vw',maxHeight:'440px'}}>
          <img src="/founder-1.png" alt="Vault" className="absolute inset-0 w-full h-full object-cover object-center"
            style={{filter:'brightness(0.15) contrast(1.2) saturate(0.4)'}} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/99 via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full px-5 md:px-12 lg:px-20 py-10 md:py-16 max-w-[1400px] mx-auto">
            <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1.2,ease}}>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5">Quantum Encrypted Heirloom Vault</p>
              <h1 className="font-serif font-light text-5xl md:text-6xl lg:text-7xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-5">
                The Digital<br /><span className="italic text-zinc-400">Will</span>
              </h1>
              <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-sm">
                Your sovereign creation outlives you — and carries your name into the next generation. 
                The Heirloom Vault is Shamim Forever's private Swiss-grade succession system.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vault animation strip */}
      <section className="border-b border-[#0d0d0d] overflow-hidden relative py-5">
        <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap px-5">
          {['Quantum Encrypted','NFT Inheritance','Smart Contracts','Multi-Generation','Heir Authorization','Immutable Ledger'].map(t => (
            <span key={t} className="text-[7px] tracking-[0.4em] uppercase text-zinc-800">{t}</span>
          ))}
        </div>
        {[0,1,2].map(i => (
          <motion.div key={i} className="absolute bottom-0 left-0 w-full h-px"
            style={{background:`linear-gradient(90deg,transparent,rgba(201,160,84,${0.06+i*0.03}),transparent)`}}
            animate={{scaleX:[0,1,0],x:['-50%','0%','50%']}}
            transition={{duration:4+i,delay:i*1.2,repeat:Infinity,ease:'easeInOut'}} />
        ))}
      </section>

      {/* Process */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-10"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Succession Protocol</p><h2 className="font-serif font-light text-3xl md:text-4xl text-zinc-200">Four Steps to<br /><span className="italic text-zinc-500">Sovereign Succession</span></h2></motion.div>
        <div className="space-y-0 divide-y divide-[#0a0a0a]">
          {STEPS.map((s,i) => (
            <motion.div key={s.n} {...fv(i*0.08)} className="grid grid-cols-1 md:grid-cols-[80px_220px_1fr] gap-3 md:gap-10 py-8 md:py-10 group hover:bg-[#080808] px-2 transition-colors duration-500">
              <span className="font-serif font-light text-3xl text-[#c9a054]/20 group-hover:text-[#c9a054]/40 transition-colors duration-700">{s.n}</span>
              <h3 className="font-serif font-light text-lg tracking-[0.08em] text-zinc-300 self-center">{s.title}</h3>
              <p className="text-zinc-600 text-sm font-light leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Family tree visual */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-10"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Sovereign Family Succession</p><h2 className="font-serif font-light text-3xl text-zinc-200">Inheritance Architecture</h2></motion.div>
        <div className="flex flex-col items-center gap-6">
          {/* Root owner */}
          <motion.div {...fv(0.05)} className="border border-[#c9a054]/30 px-8 py-5 text-center bg-[#080808]">
            <p className="text-[7px] tracking-[0.45em] uppercase text-[#c9a054] mb-1">Primary Owner</p>
            <p className="font-serif font-light text-lg text-zinc-200">Sovereign Creator</p>
            <p className="font-mono text-[8px] text-zinc-700 mt-1">0x4a7f...9b2e</p>
          </motion.div>
          {/* Connector */}
          <div className="w-px h-6 bg-[#c9a054]/20" />
          {/* Heirs row */}
          <div className="flex gap-4 flex-wrap justify-center">
            {['Heir 01','Heir 02','Heir 03'].map((h,i) => (
              <motion.div key={h} {...fv(0.1+i*0.06)} className="border border-[#111] px-6 py-4 text-center hover:border-[#c9a054]/20 transition-colors duration-400">
                <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-1">{h}</p>
                <p className="font-serif font-light text-sm text-zinc-400">{['34%','33%','33%'][i]} ownership</p>
                <p className="font-mono text-[7px] text-zinc-800 mt-1">0x{['8c3d...1f7a','e2b1...5c9f','7d4e...8b2c'][i]}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-800 mt-2">Smart contract governs distribution · Time-lock optional</p>
        </div>
      </section>

      {/* Registration form */}
      <section className="px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[700px]">
        <motion.div {...fv()} className="mb-8"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Register</p><h2 className="font-serif font-light text-2xl md:text-3xl text-zinc-200">Register Your Heirloom</h2></motion.div>
        {sent ? (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,ease}} className="border border-[#c9a054]/20 px-8 py-12 text-center">
            <div className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-6" />
            <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-4">Vault Registration Received</p>
            <p className="font-serif font-light text-2xl text-zinc-300">Your legacy is secured.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-0">
            {[
              {n:'name',l:'Your Full Name',t:'text'},
              {n:'email',l:'Email Address',t:'email'},
              {n:'heir_name',l:'Heir Full Name',t:'text'},
              {n:'heir_contact',l:'Heir Contact (Email or Wallet)',t:'text'},
              {n:'asset_description',l:'Asset / Creation Description',t:'text'},
            ].map(f => (
              <div key={f.n} className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
                <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">{f.l}</label>
                <input type={f.t} required value={(form as any)[f.n]} onChange={e=>setForm(p=>({...p,[f.n]:e.target.value}))}
                  className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light outline-none" />
              </div>
            ))}
            <div className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
              <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">Special Instructions</label>
              <textarea rows={3} value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light outline-none resize-none" />
            </div>
            <div className="pt-8">
              <button type="submit" className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{transitionTimingFunction:'cubic-bezier(0.16,1,0.3,1)'}} />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Register Heirloom</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}
