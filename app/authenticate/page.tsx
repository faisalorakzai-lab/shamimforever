'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const ease = [0.16, 1, 0.3, 1] as const
const fv = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 1, ease, delay: d } })

/* ─── Supabase table: product_authentication
   id uuid, product_id uuid, serial_number text unique,
   nft_token_id text, blockchain_hash text, owner_wallet text,
   owner_name text, created_at timestamptz, verification_status boolean,
   nft_metadata jsonb, authenticity_score integer, activation_date timestamptz
─── */

interface AuthRecord {
  id: string
  serial_number: string
  nft_token_id: string
  blockchain_hash: string
  owner_wallet: string
  owner_name: string
  created_at: string
  verification_status: boolean
  nft_metadata: { product_name?: string; atelier?: string; collection?: string; image?: string } | null
  authenticity_score: number
  activation_date: string | null
}

type UIState = 'idle' | 'scanning' | 'verified' | 'counterfeit' | 'activating' | 'activated'

function GoldParticles() {
  const [pts] = useState(() => Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    size: 0.5 + Math.random() * 1.5,
    dur: 4 + Math.random() * 6,
    delay: Math.random() * 4
  })))
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pts.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full bg-[#c9a054]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0], y: [-10, -40], x: [0, (Math.random() - 0.5) * 20] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }} />
      ))}
    </div>
  )
}

function ScanLine() {
  return (
    <motion.div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/40 to-transparent pointer-events-none"
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} />
  )
}

const TIMELINE_STEPS = [
  { icon: '◈', label: 'Crafted', desc: 'Created by sovereign artisans in the Karachi Atelier.' },
  { icon: '◆', label: 'Authenticated', desc: 'NFC chip embedded. Blockchain hash anchored.' },
  { icon: '◇', label: 'Vault Sealed', desc: 'Stored in climate-controlled sovereign vault.' },
  { icon: '○', label: 'Delivered', desc: 'White-glove chauffeur delivery to owner.' },
  { icon: '◉', label: 'Activated', desc: 'Ownership registered. Sovereign passport active.' },
]

export default function AuthenticatePage() {
  const [serial, setSerial] = useState('')
  const [uiState, setUiState] = useState<UIState>('idle')
  const [record, setRecord] = useState<AuthRecord | null>(null)
  const [activationEmail, setActivationEmail] = useState('')
  const [activationWallet, setActivationWallet] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleVerify(overrideSerial?: string) {
    const s = (overrideSerial || serial).trim().toUpperCase()
    if (!s) return
    setUiState('scanning')
    supabase.from('product_authentication').select('*').eq('serial_number', s).single()
      .then(({ data, error }) => {
        if (error || !data) {
          setTimeout(() => setUiState('counterfeit'), 2000)
        } else {
          setRecord(data as unknown as AuthRecord)
          setTimeout(() => setUiState('verified'), 2000)
        }
      })
  }

  // Check URL param for NFC/QR tap
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const s = params.get('serial') || params.get('s')
    if (s) { setSerial(s); handleVerify(s) }
  }, [])

  function handleActivation(e: React.FormEvent) {
    e.preventDefault()
    if (!record) return
    setUiState('activating')
    supabase.from('product_authentication').update({
      verification_status: true as boolean,
      activation_date: new Date().toISOString(),
      owner_wallet: activationWallet || record.owner_wallet,
      owner_name: activationEmail
    }).eq('id', record.id).then(({ error }) => {
      if (!error) setUiState('activated')
    })
  }

  function resetAll() { setUiState('idle'); setSerial(''); setRecord(null) }

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden border-b border-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_40%,rgba(201,160,84,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(201,160,84,0.025) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(201,160,84,0.025) 80px)' }} />
        <GoldParticles />
        <ScanLine />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, ease }}
          className="relative z-10 text-center px-5 max-w-2xl mx-auto pt-28 pb-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease }}
            className="text-[9px] tracking-[0.7em] uppercase text-[#c9a054] mb-8 md:mb-10">
            Sovereign Verification Protocol
          </motion.p>

          {/* Floating emblem */}
          <motion.div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-10"
            animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i} className="absolute inset-0 border border-[#c9a054]/20 rounded-full"
                animate={{ scale: [1, 1.4 + i * 0.3], opacity: [0.5, 0] }}
                transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity, ease: 'easeOut' }} />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-[#c9a054]/30 flex items-center justify-center bg-[#050505]">
                <img src="/logo-icon.png" alt="SF" className="w-8 h-8 md:w-12 md:h-12 object-contain opacity-80"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(201,160,84,0.4))' }} onError={e => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }} />
                <span className="text-[#c9a054] text-2xl font-serif font-light absolute">◈</span>
              </div>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5, ease }}
            className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] uppercase text-zinc-100 mb-5">
            Authenticate
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9, ease }}
            className="text-zinc-600 font-light text-sm leading-relaxed max-w-sm mx-auto mb-10">
            Every Shamim Forever creation carries a sovereign digital identity. Enter the serial number to verify provenance.
          </motion.p>

          {/* Verification input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1, ease }}
            className="relative max-w-md mx-auto">
            <div className="group relative border-b border-[#1a1a1a] focus-within:border-[#c9a054]/50 transition-colors duration-700">
              <input ref={inputRef} type="text" value={serial} onChange={e => setSerial(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && handleVerify()}
                placeholder="SF-RO-2025-00000"
                className="w-full py-5 bg-transparent text-zinc-200 text-center text-sm md:text-base font-light tracking-[0.2em] uppercase placeholder:text-zinc-800 outline-none" />
            </div>
            <div className="flex gap-3 mt-5 justify-center flex-wrap">
              <button onClick={() => handleVerify()}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 border border-[#c9a054]/50 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Verify Sovereignty</span>
              </button>
              <a href="https://wa.me/923119447572?text=Authenticate%20my%20Shamim%20Forever%20creation%3A%20" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-[#111] text-[9px] tracking-[0.4em] uppercase text-zinc-600 hover:text-[#c9a054] hover:border-[#c9a054]/30 transition-all duration-500">
                NFC / QR Tap
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-[#c9a054]/30 to-transparent" />
          <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-800">Scroll</p>
        </motion.div>
      </section>

      {/* ── SCANNING STATE ── */}
      <AnimatePresence>
        {uiState === 'scanning' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-8">
                {[0, 1].map(i => (
                  <motion.div key={i} className="absolute inset-0 border border-[#c9a054]/30 rounded-full"
                    animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.6, repeat: Infinity }} />
                ))}
                <motion.div className="absolute inset-0 flex items-center justify-center text-3xl text-[#c9a054]"
                  animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>◈</motion.div>
              </div>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-2">Querying Sovereign Ledger</p>
              <p className="text-zinc-700 text-xs font-light">Verifying {serial}...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VERIFIED RESULT ── */}
      <AnimatePresence>
        {(uiState === 'verified' || uiState === 'activating' || uiState === 'activated') && record && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease }}
            className="border-b border-[#0a0a0a]">
            <div className="px-5 md:px-12 lg:px-20 py-16 md:py-24 max-w-[1400px] mx-auto">

              {/* Status badge */}
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease }}
                className="text-center mb-14">
                <div className="relative inline-block">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="absolute inset-0 border border-[#c9a054] rounded-full"
                      animate={{ scale: [1, 2 + i], opacity: [0.4, 0] }}
                      transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }} />
                  ))}
                  <div className="relative w-20 h-20 rounded-full border border-[#c9a054]/40 flex items-center justify-center mx-auto bg-[#050505]">
                    <span className="text-3xl text-[#c9a054]">✦</span>
                  </div>
                </div>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-[9px] tracking-[0.7em] uppercase text-[#c9a054] mt-6 mb-2">Sovereignty Confirmed</motion.p>
                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
                  className="font-serif font-light text-3xl md:text-5xl tracking-[0.2em] uppercase text-zinc-100">
                  Sovereignly Verified
                </motion.h2>
              </motion.div>

              {/* Product data grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0a0a0a] mb-0">
                {[
                  { label: 'Creation', value: record.nft_metadata?.product_name || 'Royal Oud No. 11' },
                  { label: 'Serial Number', value: record.serial_number },
                  { label: 'Sovereign Vault', value: record.nft_metadata?.atelier || 'Karachi Sovereign Atelier' },
                  { label: 'NFT Token', value: record.nft_token_id ? `#${record.nft_token_id}` : '#—' },
                  { label: 'Authenticity Score', value: `${record.authenticity_score || 100}/100` },
                  { label: 'Activated', value: record.activation_date ? new Date(record.activation_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Pending activation' },
                ].map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                    className="bg-[#050505] px-6 py-6 hover:bg-[#080808] transition-colors duration-500">
                    <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-1.5">{item.label}</p>
                    <p className="font-serif font-light text-lg text-zinc-200">{item.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* NFT Blockchain Panel */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8, ease }}
                className="border border-[#c9a054]/15 p-6 md:p-10 mt-px">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <p className="text-[8px] tracking-[0.55em] uppercase text-[#c9a054] mb-1">Blockchain Registry</p>
                    <p className="font-serif font-light text-xl text-zinc-200">Sovereign NFT Ledger</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#c9a054]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                    <span className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054]">Connected to Sovereign Ledger</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {[
                    { label: 'Hash', value: record.blockchain_hash ? record.blockchain_hash.slice(0, 18) + '...' : '0x4a7f...9b2e' },
                    { label: 'Network', value: 'Polygon' },
                    { label: 'Minted', value: new Date(record.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
                    { label: 'Owner', value: record.owner_wallet ? record.owner_wallet.slice(0, 12) + '...' : record.owner_name || 'Unactivated' },
                  ].map(item => (
                    <div key={item.label}>
                      <p className="text-[7px] tracking-[0.45em] uppercase text-zinc-800 mb-1">{item.label}</p>
                      <p className="font-mono text-[10px] text-zinc-500">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="flex gap-4 mt-8 flex-wrap">
                <button onClick={resetAll} className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 hover:text-zinc-400 transition-colors duration-400 border border-[#111] px-6 py-3">
                  Verify Another
                </button>
                <Link href="/shop" className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-6 py-3 hover:bg-[#c9a054]/5 transition-colors duration-400">
                  Enter The Vault →
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── COUNTERFEIT ── */}
      <AnimatePresence>
        {uiState === 'counterfeit' && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            className="border-b border-[#0a0a0a]">
            <div className="px-5 md:px-12 lg:px-20 py-20 max-w-[900px] mx-auto text-center">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease }}
                className="w-16 h-16 border border-red-900/50 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ boxShadow: '0 0 40px rgba(180,0,0,0.1)' }}>
                <span className="text-2xl text-red-800">✕</span>
              </motion.div>
              <p className="text-[8px] tracking-[0.6em] uppercase text-red-800 mb-4">Authorization Failed</p>
              <h2 className="font-serif font-light text-3xl md:text-5xl tracking-[0.15em] text-zinc-500 mb-6">Unauthorized Object Detected</h2>
              <p className="text-zinc-700 text-sm font-light leading-relaxed max-w-md mx-auto mb-8">
                The serial number <span className="font-mono text-zinc-500">{serial}</span> does not match any record in the Sovereign Ledger. This item cannot be verified as an authentic Shamim Forever creation.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={resetAll} className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 border border-[#111] px-6 py-3 hover:text-zinc-400 transition-colors duration-400">Try Again</button>
                <a href="https://wa.me/923119447572?text=I+need+help+authenticating+a+Shamim+Forever+product" target="_blank" rel="noopener noreferrer"
                  className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-6 py-3 hover:bg-[#c9a054]/5 transition-colors duration-400">
                  Contact Concierge
                </a>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── DIGITAL TIMELINE ── */}
      <section className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-12">
          <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Sovereign Journey</p>
          <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.08em] text-zinc-200">Five Acts of<br /><span className="italic text-zinc-500">Creation</span></h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a054]/30 via-[#c9a054]/10 to-transparent" />
          <div className="space-y-0 divide-y divide-[#0a0a0a]">
            {TIMELINE_STEPS.map((step, i) => (
              <motion.div key={step.label} {...fv(i * 0.1)}
                className={`relative flex gap-8 md:gap-12 items-start pl-12 md:pl-16 py-8 group transition-colors duration-500 ${uiState === 'verified' && i === 4 ? 'bg-[#080808]' : 'hover:bg-[#080808]'}`}>
                <div className={`absolute left-0 w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-700 ${uiState === 'verified' && i <= 3 ? 'border-[#c9a054]/60 bg-[#c9a054]/5' : 'border-[#111] bg-[#050505]'}`}>
                  <span className={`text-sm transition-colors duration-500 ${uiState === 'verified' && i <= 3 ? 'text-[#c9a054]' : 'text-zinc-700'}`}>{step.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-600 mb-1">Act {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-serif font-light text-xl md:text-2xl tracking-[0.08em] text-zinc-300 group-hover:text-zinc-100 transition-colors duration-500 mb-2">{step.label}</h3>
                  <p className="text-zinc-700 text-sm font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OWNER ACTIVATION ── */}
      {uiState === 'verified' && record && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}
          className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[700px]">
          <div className="mb-8">
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Activate Ownership</p>
            <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.08em] text-zinc-200">Register as Sovereign Owner</h2>
          </div>
          {uiState === 'activated' ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="border border-[#c9a054]/20 p-8 text-center">
              <div className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-6" />
              <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-4">Activation Complete</p>
              <p className="font-serif font-light text-2xl text-zinc-200">Ownership is sovereign.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleActivation} className="space-y-0">
              {[
                { n: 'email', l: 'Email Address', t: 'email', sv: activationEmail, fn: setActivationEmail },
                { n: 'wallet', l: 'Wallet Address (optional)', t: 'text', sv: activationWallet, fn: setActivationWallet },
              ].map(f => (
                <div key={f.n} className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
                  <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">{f.l}</label>
                  <input type={f.t} value={f.sv} onChange={e => f.fn(e.target.value)}
                    required={f.n === 'email'}
                    className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light outline-none" />
                </div>
              ))}
              <div className="pt-8">
                <button type="submit" disabled={uiState === 'activating'}
                  className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden disabled:opacity-50">
                  <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                  <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                    {uiState === 'activating' ? 'Registering...' : 'Activate Sovereignty'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </motion.section>
      )}

      {/* ── DIGITAL CERTIFICATE ── */}
      <section className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div {...fv()}>
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-5">Ownership Certificate</p>
            <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.08em] text-zinc-200 mb-6">
              Digital Sovereignty<br /><span className="italic text-zinc-500">Certificate</span>
            </h2>
            <p className="text-zinc-600 text-sm font-light leading-relaxed mb-8">
              Each verified creation generates a permanent digital certificate — black and gold, institutional typography, anchored to the blockchain. Yours to save, share, and inherit.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-6 py-3 hover:bg-[#c9a054]/5 transition-colors duration-400">
                Download Certificate
              </button>
              <button className="text-[8px] tracking-[0.4em] uppercase text-zinc-700 border border-[#111] px-6 py-3 hover:text-zinc-400 transition-colors duration-400">
                Save as NFT
              </button>
            </div>
          </motion.div>

          {/* Certificate preview */}
          <motion.div {...fv(0.15)} className="border border-[#c9a054]/15 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/30 to-transparent" />
            <div className="text-center mb-6">
              <img src="/logo.png" alt="Shamim Forever" className="h-8 w-auto object-contain mx-auto mb-4 opacity-60"
                style={{ filter: 'drop-shadow(0 0 4px rgba(201,160,84,0.2))' }} />
              <p className="text-[7px] tracking-[0.6em] uppercase text-[#c9a054] mb-1">Certificate of Sovereign Ownership</p>
              <div className="w-12 h-px bg-[#c9a054]/30 mx-auto mt-3" />
            </div>
            <div className="space-y-3">
              {[
                { l: 'Creation', v: record?.nft_metadata?.product_name || 'Royal Oud No. 11' },
                { l: 'Serial', v: record?.serial_number || 'SF-RO-2025-00112' },
                { l: 'NFT', v: record?.nft_token_id ? `#${record.nft_token_id}` : '#8841' },
                { l: 'Issued', v: record ? new Date(record.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '01 Jan 2025' },
                { l: 'Status', v: record?.verification_status ? 'Verified & Active' : 'Pending Activation' },
              ].map(item => (
                <div key={item.l} className="flex items-center justify-between py-2 border-b border-[#0a0a0a] last:border-0">
                  <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700">{item.l}</p>
                  <p className="text-xs font-light text-zinc-400 text-right">{item.v}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 border border-[#c9a054]/20 px-4 py-2">
                <motion.div className="w-1 h-1 rounded-full bg-[#c9a054]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="text-[7px] tracking-[0.45em] uppercase text-[#c9a054]">Sovereignty Seal Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OKBOND PRIVILEGE ── */}
      <section className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-12 md:py-16 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
          <div>
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">OKBOND Protocol</p>
            <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.08em] text-zinc-200 mb-3">
              10% Sovereign <span className="italic text-[#c9a054]">Privilege</span>
            </h2>
            <p className="text-zinc-600 text-sm font-light leading-relaxed max-w-md">
              Verified owners who hold OKBOND tokens unlock a permanent 10% discount across all Shamim Forever acquisitions — applied automatically at checkout.
            </p>
          </div>
          <button className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden flex-shrink-0">
            <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
            <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Connect Wallet</span>
          </button>
        </motion.div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-5 md:px-12 lg:px-20 py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,160,84,0.04)_0%,transparent_70%)]" />
        <GoldParticles />
        <motion.div {...fv()} className="relative z-10">
          <p className="font-serif italic text-2xl md:text-4xl text-zinc-600 max-w-2xl mx-auto leading-snug mb-10">
            "Luxury is temporary.<br />Authenticity is eternal."
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/shop" className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
              <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Enter The Vault</span>
            </Link>
            <Link href="/heirloom-vault" className="text-[9px] tracking-[0.5em] uppercase text-zinc-600 border border-[#111] px-10 py-4 hover:text-zinc-300 hover:border-[#222] transition-all duration-500">
              Heirloom Protocol
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
