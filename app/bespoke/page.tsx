'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const ease = [0.16, 1, 0.3, 1] as const
const fv = (d=0) => ({ initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:1,ease,delay:d} })

const MATERIALS = ['Oud·Resinous','Rose·Floral','Musk·Animalic','Bergamot·Citrus','Sandalwood·Creamy','Vetiver·Smoky','Amber·Warm','Iris·Powdery']
const INTENSITIES = ['Eau de Cologne','Eau de Toilette','Eau de Parfum','Parfum·Extrait','Huile de Parfum']
const JEWEL_PATHS = ['Diamond · Ethically Sourced','Ruby · Ceylon Origin','Emerald · Colombian Cut','Sapphire · Kashmir Premium','Pearl · Tahitian Black']

export default function BespokePage() {
  const [tab, setTab] = useState<'fragrance'|'jewelry'>('fragrance')
  const [selectedMats, setSelectedMats] = useState<string[]>([])
  const [intensity, setIntensity] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [sent, setSent] = useState(false)

  function toggleMat(m: string) {
    setSelectedMats(p => p.includes(m) ? p.filter(x=>x!==m) : p.length<4 ? [...p,m] : p)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = { name, email, type: tab, materials: selectedMats.join(', '), intensity, notes }
    supabase.from('bespoke_requests').insert([payload]).then(({ error }) => { if(!error) setSent(true) })
  }

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <section className="pt-20 border-b border-[#0d0d0d]">
        <div className="px-5 md:px-12 lg:px-20 py-16 md:py-28 max-w-[1400px] mx-auto">
          <motion.div {...fv()}>
            <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5">Sovereign Alchemy</p>
            <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-6">
              The Bespoke<br /><span className="italic text-zinc-500">Atelier</span>
            </h1>
            <p className="text-zinc-600 font-light text-sm leading-relaxed max-w-md">
              Co-create with our sovereign masters. A fragrance built from your memories. 
              A jewel shaped from your vision. A creation that exists nowhere else on earth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab selector */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="flex gap-0 border-b border-[#0d0d0d]">
          {(['fragrance','jewelry'] as const).map(t => (
            <button key={t} onClick={()=>setTab(t)}
              className={`px-8 py-5 text-[9px] tracking-[0.4em] uppercase transition-colors duration-500 border-b-2 -mb-px ${
                tab===t ? 'text-[#c9a054] border-[#c9a054]' : 'text-zinc-700 border-transparent hover:text-zinc-400'
              }`}>{t === 'fragrance' ? 'Master Fragrance' : 'Jewel Co-Creation'}</button>
          ))}
        </div>
      </section>

      {/* Fragrance composer */}
      {tab === 'fragrance' && (
        <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <motion.div {...fv()}>
              <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-6">Step 1 — Select Your Notes (max 4)</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {MATERIALS.map(m => (
                  <button key={m} onClick={()=>toggleMat(m)}
                    className={`px-4 py-2.5 text-[8px] tracking-[0.35em] uppercase transition-all duration-400 border ${
                      selectedMats.includes(m) ? 'border-[#c9a054]/60 text-[#c9a054] bg-[#c9a054]/5' : 'border-[#111] text-zinc-700 hover:border-[#222] hover:text-zinc-500'
                    }`}>{m}</button>
                ))}
              </div>
              <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-4">Step 2 — Intensity</p>
              <div className="flex flex-col gap-2 mb-8">
                {INTENSITIES.map(int => (
                  <button key={int} onClick={()=>setIntensity(int)}
                    className={`text-left px-4 py-3 text-[9px] tracking-[0.3em] uppercase transition-all duration-400 border ${
                      intensity===int ? 'border-[#c9a054]/50 text-[#c9a054]' : 'border-transparent text-zinc-700 hover:text-zinc-400'
                    }`}>{int}</button>
                ))}
              </div>
              {/* Visual composition display */}
              {selectedMats.length > 0 && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}} className="border border-[#111] p-6">
                  <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] mb-3">Your Sovereign Formula</p>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {selectedMats.map((m,i) => (
                      <div key={m} className="flex items-center gap-1">
                        <div className="w-8 h-px bg-[#c9a054]" style={{opacity: 1-i*0.2}} />
                        <span className="text-[8px] text-zinc-500">{m.split('·')[0]}</span>
                      </div>
                    ))}
                  </div>
                  {intensity && <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-700">{intensity}</p>}
                </motion.div>
              )}
            </motion.div>
            <motion.div {...fv(0.15)}>
              <div className="bg-[#080808] border border-[#0d0d0d] p-8 h-full">
                <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-4">Atelier Process</p>
                {[
                  { n:'01', t:'Formula Session', d:'2-hour private consultation with Master Perfumer Shamim — in-boutique or virtual.' },
                  { n:'02', t:'Sample Batch', d:'Three trial concentrations created and shipped to you within 14 days.' },
                  { n:'03', t:'Refinement Round', d:'Up to 3 revision rounds until the scent is exactly sovereign.' },
                  { n:'04', t:'Vault Encoding', d:'Final formula locked in our sovereign vault. Yours, forever — refillable, exclusive.' },
                ].map(step => (
                  <div key={step.n} className="flex gap-5 pb-6 mb-6 border-b border-[#0a0a0a] last:border-0 last:mb-0 last:pb-0">
                    <span className="font-serif font-light text-2xl text-[#c9a054]/20 flex-shrink-0">{step.n}</span>
                    <div><p className="text-[9px] tracking-[0.3em] uppercase text-zinc-400 mb-1">{step.t}</p><p className="text-zinc-700 text-xs font-light leading-relaxed">{step.d}</p></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Jewel paths */}
      {tab === 'jewelry' && (
        <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
          <motion.div {...fv()} className="mb-10">
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Gemstone Paths</p>
            <h2 className="font-serif font-light text-3xl md:text-4xl text-zinc-200">Choose Your Stone</h2>
          </motion.div>
          <div className="space-y-0 divide-y divide-[#0a0a0a]">
            {JEWEL_PATHS.map((j,i) => (
              <motion.div key={j} {...fv(i*0.07)} className="flex items-center gap-8 py-7 hover:bg-[#080808] px-2 transition-colors duration-500 group cursor-pointer">
                <span className="text-lg text-[#c9a054]/40 group-hover:text-[#c9a054] transition-colors duration-500">◆</span>
                <span className="font-serif font-light text-xl tracking-[0.08em] text-zinc-400 group-hover:text-zinc-200 transition-colors duration-500">{j}</span>
                <span className="ml-auto text-[8px] tracking-[0.4em] uppercase text-zinc-800 group-hover:text-[#c9a054] transition-colors duration-500">Enquire →</span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Commission form */}
      <section className="px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[700px]">
        <motion.div {...fv()} className="mb-8">
          <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Commission</p>
          <h2 className="font-serif font-light text-2xl md:text-3xl text-zinc-200">Begin Your Creation</h2>
        </motion.div>
        {sent ? (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,ease}} className="border border-[#c9a054]/20 px-8 py-12 text-center">
            <div className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-6" />
            <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-4">Commission Received</p>
            <p className="font-serif font-light text-2xl text-zinc-300">Your alchemy begins.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-0">
            {[{n:'name',l:'Your Name',t:'text'},{n:'email',l:'Email Address',t:'email'}].map(f => (
              <div key={f.n} className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
                <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">{f.l}</label>
                <input type={f.t} required value={(name && f.n==='name') ? name : f.n==='email' ? email : ''} onChange={e => f.n==='name' ? setName(e.target.value) : setEmail(e.target.value)}
                  className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light outline-none" />
              </div>
            ))}
            <div className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
              <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">Describe Your Vision</label>
              <textarea rows={4} required value={notes} onChange={e=>setNotes(e.target.value)} className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light outline-none resize-none" />
            </div>
            <div className="pt-8">
              <button type="submit" className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{transitionTimingFunction:'cubic-bezier(0.16,1,0.3,1)'}} />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Commission My Creation</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}
