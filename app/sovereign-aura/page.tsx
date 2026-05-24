'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as const
const fv = (d=0) => ({ initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:1,ease,delay:d} })

function AuraOrb() {
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness:80, damping:20 })
  const sy = useSpring(my, { stiffness:80, damping:20 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width/2, cy = r.top + r.height/2
      mx.set((e.clientX - cx) * 0.12)
      my.set((e.clientY - cy) * 0.12)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <div ref={ref} className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
      {[0,1,2,3].map(i => (
        <motion.div key={i} className="absolute inset-0 rounded-full border border-[#c9a054]"
          style={{ x:sx, y:sy, scale:1+i*0.08, opacity:0.08-i*0.015 }}
          animate={{ rotate: i%2===0 ? [0,360] : [360,0] }}
          transition={{ duration: 20+i*8, repeat:Infinity, ease:'linear' }} />
      ))}
      <motion.div className="absolute inset-0 rounded-full" style={{ x:sx, y:sy,
        background:'radial-gradient(circle at 50% 50%, rgba(201,160,84,0.12) 0%, transparent 70%)' }}
        animate={{ scale:[1,1.05,1] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }} />
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ x:sx, y:sy }}>
        <div className="text-center">
          <motion.div className="text-5xl text-[#c9a054]" animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}>◉</motion.div>
          <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054]/50 mt-3">Sovereign Aura</p>
        </div>
      </motion.div>
    </div>
  )
}

const FEATURES = [
  { icon:'◈', title:'AR Sovereign Glow', desc:'Point your phone at any Shamim Forever creation and a gold aura activates — visible only to verified app users, marking the item as authentically sovereign.' },
  { icon:'◆', title:'Verified Product Recognition', desc:'Computer vision identifies your creation in real time. Within 1.2 seconds, full provenance data appears overlaid in gold — model, batch, origin, owner history.' },
  { icon:'◇', title:'Gold Aura Projection', desc:'The sovereign aura is a personalized digital signature. Your NFT ownership is rendered as a visible golden glow — a prestige layer only authenticated owners display.' },
  { icon:'○', title:'Social Prestige Layer', desc:'Share your creation with sovereign aura active on social platforms. Embedded verification data travels with the post — visible to anyone who scans the code.' },
]

const PHONES = [
  { label:'Identify', color:'from-[#c9a054]/20', desc:'Scan any Shamim Forever creation' },
  { label:'Verify', color:'from-[#c9a054]/30', desc:'Provenance appears in gold overlay' },
  { label:'Share', color:'from-[#c9a054]/15', desc:'Aura follows you on social media' },
]

export default function SovereignAuraPage() {
  const [active, setActive] = useState(false)

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <section className="pt-20 border-b border-[#0d0d0d]">
        <div className="px-5 md:px-12 lg:px-20 py-16 md:py-24 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1.2,ease}}>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5">Augmented Reality Aura System</p>
              <h1 className="font-serif font-light text-5xl md:text-6xl lg:text-7xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-6">
                The Verified<br /><span className="italic text-zinc-500">Digital Aura</span>
              </h1>
              <p className="text-zinc-600 font-light text-sm leading-relaxed max-w-md mb-8">
                Your sovereign identity is visible. A gold aura surrounds every authentic Shamim Forever 
                creation — projected through augmented reality, anchored by blockchain.
              </p>
              <button onClick={()=>setActive(a=>!a)} className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{transitionTimingFunction:'cubic-bezier(0.16,1,0.3,1)'}} />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">{active ? '◉ Aura Active' : 'Activate Aura Simulation'}</span>
              </button>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.5,ease}}>
              <AuraOrb />
            </motion.div>
          </div>
        </div>
      </section>

      {/* AR Simulation */}
      {active && (
        <motion.section initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} transition={{duration:0.8,ease}}
          className="border-b border-[#0d0d0d] overflow-hidden">
          <div className="px-5 md:px-12 lg:px-20 py-10 max-w-[1400px] mx-auto">
            <div className="relative border border-[#c9a054]/20 bg-[#080808] p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_,i) => (
                  <motion.div key={i} className="absolute rounded-full border border-[#c9a054]/10"
                    style={{ width:`${60+i*30}px`, height:`${60+i*30}px`, left:'50%', top:'50%', transform:'translate(-50%,-50%)' }}
                    animate={{ scale:[1,1.15,1], opacity:[0.4,0.15,0.4] }}
                    transition={{ duration:2+i*0.3, delay:i*0.2, repeat:Infinity, ease:'easeInOut' }} />
                ))}
              </div>
              <div className="relative z-10 text-center">
                <motion.p className="text-[8px] tracking-[0.55em] uppercase text-[#c9a054] mb-2"
                  animate={{opacity:[0.4,1,0.4]}} transition={{duration:1.5,repeat:Infinity,ease:'easeInOut'}}>
                  ◉ Sovereign Aura Active
                </motion.p>
                <p className="font-serif font-light text-2xl text-zinc-200 mb-1">Oud Noir Eternal</p>
                <p className="text-zinc-700 text-xs font-light mb-4">SF-001 · Karachi Atelier 2023 · First Edition</p>
                <div className="flex justify-center gap-6 flex-wrap">
                  <div><p className="text-[7px] tracking-[0.4em] uppercase text-zinc-800 mb-0.5">Owner</p><p className="font-mono text-[9px] text-[#c9a054]">0x4a7f...9b2e</p></div>
                  <div><p className="text-[7px] tracking-[0.4em] uppercase text-zinc-800 mb-0.5">Verified</p><p className="text-[9px] text-zinc-500">Block #18,492,771</p></div>
                  <div><p className="text-[7px] tracking-[0.4em] uppercase text-zinc-800 mb-0.5">Status</p><p className="text-[9px] text-[#c9a054]">Authentic</p></div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Phone mockups */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-10"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">How It Works</p><h2 className="font-serif font-light text-3xl md:text-4xl text-zinc-200">Three-Step Aura Protocol</h2></motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0a0a0a]">
          {PHONES.map((p,i) => (
            <motion.div key={p.label} {...fv(i*0.1)} className="bg-[#050505] p-8 group hover:bg-[#080808] transition-colors duration-500">
              <div className={`w-full aspect-[9/16] max-w-[120px] mx-auto mb-6 border border-[#111] rounded-2xl relative overflow-hidden bg-gradient-to-b ${p.color} to-transparent`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span className="text-3xl text-[#c9a054]"
                    animate={{ opacity:[0.3,1,0.3] }} transition={{ duration:2, delay:i*0.5, repeat:Infinity, ease:'easeInOut' }}>◉</motion.span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-[#050505]/80 p-2">
                  <p className="text-[6px] tracking-[0.4em] uppercase text-zinc-600 text-center">{p.desc}</p>
                </div>
              </div>
              <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-2">Step {i+1}</p>
              <h3 className="font-serif font-light text-xl tracking-[0.08em] text-zinc-200 mb-2">{p.label}</h3>
              <p className="text-zinc-700 text-xs font-light leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-10"><p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Technology</p><h2 className="font-serif font-light text-3xl md:text-4xl text-zinc-200">The Aura System</h2></motion.div>
        <div className="space-y-0 divide-y divide-[#0a0a0a]">
          {FEATURES.map((f,i) => (
            <motion.div key={f.title} {...fv(i*0.07)} className="grid grid-cols-1 md:grid-cols-[80px_220px_1fr] gap-3 md:gap-10 py-8 md:py-10 group hover:bg-[#080808] px-2 transition-colors duration-500">
              <span className="text-xl text-[#c9a054]">{f.icon}</span>
              <h3 className="font-serif font-light text-lg tracking-[0.08em] text-zinc-300 self-center">{f.title}</h3>
              <p className="text-zinc-600 text-sm font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-12 lg:px-20 py-14 md:py-20">
        <motion.div {...fv()} className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Own the Aura</p>
            <p className="font-serif italic text-2xl md:text-3xl text-zinc-600 max-w-lg">"Your sovereignty glows where others only claim."</p>
          </div>
          <Link href="/shop" className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden flex-shrink-0">
            <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{transitionTimingFunction:'cubic-bezier(0.16,1,0.3,1)'}} />
            <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Acquire Your Aura</span>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
