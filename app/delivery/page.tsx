'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const ease = [0.16, 1, 0.3, 1] as const
const fv = (d=0) => ({ initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:1,ease,delay:d} })

const STEPS = [
  { n:'01', title:'White-Glove Packaging', desc:'Your creation is wrapped in black suede cloth, sealed with wax, and placed in an acid-free archival box — handled by specialist hands only.' },
  { n:'02', title:'Climate-Controlled Transit', desc:'Temperature and humidity maintained at 18–22°C throughout the journey. Fragrances and skincare are never exposed to extreme conditions.' },
  { n:'03', title:'Chauffeur Fleet Delivery', desc:'For orders above PKR 50,000, personal chauffeur delivery is available in Karachi, Lahore, and Islamabad — in-person, hand-signed receipt.' },
  { n:'04', title:'Sovereign Tracking', desc:'Real-time GPS-level tracking via a private dashboard link sent to your phone. No generic courier notifications — sovereign updates only.' },
  { n:'05', title:'Private Unboxing Ritual', desc:'Each delivery includes a card with the creation\'s NFT hash, provenance notes, and care instructions on gold-embossed archival paper.' },
]

const ZONES = [
  { zone:'Pakistan', cities:'Karachi · Lahore · Islamabad · Peshawar', time:'24–48 hours', method:'Chauffeur or Premium Express', badge:'◈' },
  { zone:'Gulf & Middle East', cities:'Dubai · Riyadh · Abu Dhabi · Kuwait', time:'48–72 hours', method:'Climate-Controlled Air Freight', badge:'◇' },
  { zone:'Europe', cities:'London · Paris · Milan · Zurich', time:'72–96 hours', method:'Sovereign Diplomatic Courier', badge:'◆' },
  { zone:'Americas & Rest', cities:'New York · Toronto · Singapore', time:'96–120 hours', method:'Private Air Charter Freight', badge:'○' },
]

export default function DeliveryPage() {
  const [tracking, setTracking] = useState('')
  const [trackResult, setTrackResult] = useState(false)

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <section className="pt-20 border-b border-[#0d0d0d]">
        <div className="px-5 md:px-12 lg:px-20 py-16 md:py-28 max-w-[1400px] mx-auto">
          <motion.div {...fv()}>
            <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5 md:mb-8">Elite Shipping & Delivery</p>
            <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-6">
              The White-Glove<br /><span className="italic text-zinc-500">Protocol</span>
            </h1>
            <p className="text-zinc-600 font-light text-sm leading-relaxed max-w-md">
              Military-grade luxury logistics. Your sovereign creation travels the world 
              under conditions that match the care of its creation — never less.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated vehicle route strip */}
      <section className="border-b border-[#0d0d0d] overflow-hidden relative py-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a054]/10 to-transparent" />
        </div>
        {[0,1,2].map(i => (
          <motion.div key={i} className="absolute w-3 h-3 rounded-full bg-[#c9a054]/40"
            style={{ top:'50%', translateY:'-50%' }}
            animate={{ left:['-5%','105%'] }}
            transition={{ duration:4+i*1.5, delay:i*1.2, repeat:Infinity, ease:'linear', repeatType:'loop' }} />
        ))}
        <div className="flex items-center justify-center gap-6 md:gap-12 py-2 px-5 flex-wrap">
          {['Karachi','Lahore','Dubai','London','Paris','New York','Riyadh'].map(c => (
            <span key={c} className="text-[7px] tracking-[0.4em] uppercase text-zinc-800">{c}</span>
          ))}
        </div>
      </section>

      {/* 5-step protocol */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-10"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">The Protocol</p><h2 className="font-serif font-light text-3xl md:text-4xl text-zinc-200">Five Acts of Delivery</h2></motion.div>
        <div className="space-y-0 divide-y divide-[#0a0a0a]">
          {STEPS.map((s,i) => (
            <motion.div key={s.n} {...fv(i*0.07)} className="grid grid-cols-1 md:grid-cols-[80px_220px_1fr] gap-3 md:gap-10 py-8 md:py-10 group hover:bg-[#080808] px-2 transition-colors duration-500">
              <span className="font-serif font-light text-3xl text-[#c9a054]/20 group-hover:text-[#c9a054]/40 transition-colors duration-700">{s.n}</span>
              <h3 className="font-serif font-light text-lg tracking-[0.08em] text-zinc-300 self-center">{s.title}</h3>
              <p className="text-zinc-600 text-sm font-light leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Zones */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-10"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Coverage</p><h2 className="font-serif font-light text-3xl md:text-4xl text-zinc-200">Sovereign Delivery Zones</h2></motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0a0a0a]">
          {ZONES.map((z,i) => (
            <motion.div key={z.zone} {...fv(i*0.08)} className="bg-[#050505] px-6 py-8 hover:bg-[#080808] transition-colors duration-500">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-lg text-[#c9a054]">{z.badge}</span>
                <div>
                  <h3 className="font-serif font-light text-xl tracking-[0.08em] text-zinc-200 mb-1">{z.zone}</h3>
                  <p className="text-zinc-700 text-xs font-light">{z.cities}</p>
                </div>
              </div>
              <div className="flex gap-6 mt-4">
                <div><p className="text-[7px] tracking-[0.4em] uppercase text-zinc-800 mb-1">Delivery</p><p className="text-xs text-zinc-500 font-light">{z.time}</p></div>
                <div><p className="text-[7px] tracking-[0.4em] uppercase text-zinc-800 mb-1">Method</p><p className="text-xs text-zinc-500 font-light">{z.method}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Track */}
      <section className="px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[700px]">
        <motion.div {...fv()} className="mb-8"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Sovereign Tracking</p><h2 className="font-serif font-light text-2xl md:text-3xl text-zinc-200">Track Your Creation</h2></motion.div>
        {!trackResult ? (
          <div className="flex gap-0 border-b border-[#0d0d0d]">
            <input value={tracking} onChange={e=>setTracking(e.target.value)} placeholder="Enter your sovereign order ID..."
              className="flex-1 py-4 bg-transparent text-zinc-300 text-sm font-light placeholder:text-zinc-800 outline-none" />
            <button onClick={()=>{if(tracking)setTrackResult(true)}} className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] hover:text-zinc-200 transition-colors duration-400 pl-4">Track →</button>
          </div>
        ) : (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.8,ease}} className="border border-[#c9a054]/20 p-6">
            <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] mb-4">Sovereign Delivery Status</p>
            <div className="space-y-3">
              {['Order Confirmed','Packaging Ritual Complete','In Transit — Climate Controlled','Out for Chauffeur Delivery'].map((step,i)=>(
                <div key={step} className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${i<3?'bg-[#c9a054]':'bg-[#111]'}`} />
                  <span className={`text-xs font-light ${i<3?'text-zinc-400':'text-zinc-700'}`}>{step}</span>
                  {i===2 && <span className="text-[7px] tracking-[0.3em] uppercase text-[#c9a054] ml-auto">Active</span>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
        <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-800 mt-5">For live tracking contact: <a href="mailto:concierge@shamimforever.com" className="hover:text-[#c9a054] transition-colors">concierge@shamimforever.com</a></p>
      </section>
    </div>
  )
}
