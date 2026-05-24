'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

const ease = [0.16, 1, 0.3, 1] as const
const fv = (d=0) => ({ initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:1,ease,delay:d} })

const PIECES = [
  { id:'SF-001', title:'Oud Noir Eternal', year:'2023', category:'Fragrance', origin:'Karachi Atelier', img:'/founder-1.png', rarity:'First Edition · 150 pieces' },
  { id:'SF-002', title:'Rose de Lahore', year:'2023', category:'Fragrance', origin:'Lahore Maison', img:'/founder-2.png', rarity:'Limited · 300 pieces' },
  { id:'SF-003', title:'Sovereign Gold Cuff', year:'2024', category:'Jewelry', origin:'Master Artisan Faisal', img:'/founder-3.png', rarity:'Unique Commission' },
  { id:'SF-004', title:'Noir Velvet Collection', year:'2024', category:'Couture', origin:'Karachi House', img:'/founder-4.png', rarity:'12 pieces worldwide' },
  { id:'SF-005', title:'Amber Archive', year:'2025', category:'Fragrance', origin:'Sovereign Vault', img:'/founder-5.png', rarity:'Private Reserve · 50 pieces' },
]

const CATEGORIES = ['All', 'Fragrance', 'Jewelry', 'Couture']

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState<typeof PIECES[0]|null>(null)

  const filtered = active === 'All' ? PIECES : PIECES.filter(p => p.category === active)

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <section className="pt-20 border-b border-[#0d0d0d]">
        <div className="px-5 md:px-12 lg:px-20 py-16 md:py-24 max-w-[1400px] mx-auto">
          <motion.div {...fv()}>
            <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5">Sovereign Heritage Gallery</p>
            <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-6">
              The Digital<br /><span className="italic text-zinc-500">Heritage Vault</span>
            </h1>
            <p className="text-zinc-600 font-light text-sm leading-relaxed max-w-md">
              A living archive of sovereign creations. Each piece is catalogued, provenance-tracked, 
              and stored in our immutable digital vault — accessible from anywhere on earth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="flex gap-0 overflow-x-auto">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`px-7 py-5 text-[8px] tracking-[0.45em] uppercase whitespace-nowrap transition-colors duration-400 border-b-2 -mb-px ${
                active === c ? 'text-[#c9a054] border-[#c9a054]' : 'text-zinc-700 border-transparent hover:text-zinc-400'
              }`}>{c}</button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="px-5 md:px-12 lg:px-20 py-12 md:py-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0a0a0a]">
          {filtered.map((piece, i) => (
            <motion.div key={piece.id} {...fv(i*0.07)}
              className="group bg-[#050505] cursor-pointer overflow-hidden"
              onClick={() => setSelected(piece)}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={piece.img} alt={piece.title} className="w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  style={{ filter:'brightness(0.55) contrast(1.1) saturate(0.7)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[7px] tracking-[0.45em] uppercase text-[#c9a054] bg-[#050505]/80 px-2 py-1">{piece.category}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-1">{piece.id} · {piece.year}</p>
                  <h3 className="font-serif font-light text-xl tracking-[0.1em] text-zinc-100 mb-1">{piece.title}</h3>
                  <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-600">{piece.rarity}</p>
                </div>
              </div>
              <div className="px-5 py-4 flex items-center justify-between border-t border-[#0a0a0a]">
                <span className="text-[7px] tracking-[0.4em] uppercase text-zinc-700">{piece.origin}</span>
                <span className="text-[7px] tracking-[0.4em] uppercase text-[#c9a054] group-hover:text-zinc-200 transition-colors duration-400">View →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Provenance ledger */}
      <section className="border-t border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <motion.div {...fv()}>
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-5">Legacy Protocol</p>
            <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.05em] text-zinc-200 mb-6">
              NFT Provenance<br /><span className="italic text-zinc-500">Ledger</span>
            </h2>
            <p className="text-zinc-600 text-sm font-light leading-relaxed mb-8">
              Every creation in the Heritage Vault carries a permanent NFT provenance record — 
              from initial sketch to artisan hands, from sovereign vault to your ownership. 
              Inheritance-ready, immutable, transferable.
            </p>
            <Link href="/authenticate" className="text-[9px] tracking-[0.4em] uppercase text-[#c9a054] hover:text-zinc-200 transition-colors duration-400 border-b border-[#c9a054]/30 pb-1">
              Verify Authenticity →
            </Link>
          </motion.div>
          <motion.div {...fv(0.15)}>
            <div className="border border-[#0d0d0d] divide-y divide-[#0a0a0a]">
              {[
                { hash:'0x4a7f...9b2e', event:'Creation Initiated', date:'14 Mar 2023' },
                { hash:'0x8c3d...1f7a', event:'Artisan Signature', date:'22 Mar 2023' },
                { hash:'0xe2b1...5c9f', event:'Vault Entry', date:'01 Apr 2023' },
                { hash:'0x7d4e...8b2c', event:'First Ownership Transfer', date:'15 Apr 2023' },
              ].map(row => (
                <div key={row.hash} className="flex items-center gap-5 px-5 py-4">
                  <div className="w-1 h-1 rounded-full bg-[#c9a054]/40" />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[9px] text-zinc-700 truncate">{row.hash}</p>
                    <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-600 mt-0.5">{row.event}</p>
                  </div>
                  <span className="text-[7px] tracking-[0.3em] uppercase text-zinc-800 flex-shrink-0">{row.date}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}} className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-sm flex items-center justify-center p-5" onClick={()=>setSelected(null)}>
          <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.6,ease}} className="max-w-lg w-full bg-[#080808] border border-[#111] overflow-hidden" onClick={e=>e.stopPropagation()}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={selected.img} alt={selected.title} className="w-full h-full object-cover" style={{filter:'brightness(0.6) contrast(1.1) saturate(0.7)'}} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />
            </div>
            <div className="p-8">
              <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] mb-2">{selected.id} · {selected.category}</p>
              <h3 className="font-serif font-light text-2xl tracking-[0.08em] text-zinc-100 mb-2">{selected.title}</h3>
              <p className="text-zinc-600 text-xs font-light mb-4">{selected.origin} · {selected.year}</p>
              <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 mb-6">{selected.rarity}</p>
              <div className="flex gap-4">
                <Link href="/shop" className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-5 py-3 hover:bg-[#c9a054]/5 transition-colors duration-400">Acquire</Link>
                <button onClick={()=>setSelected(null)} className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 px-5 py-3 hover:text-zinc-400 transition-colors duration-400">Close</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
