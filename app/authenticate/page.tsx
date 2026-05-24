'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAccount, useWriteContract, useSendTransaction, useConnect, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseEther, parseUnits } from 'viem'

const ease = [0.16, 1, 0.3, 1] as const
const fv = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease, delay: d },
})

interface AuthRecord {
  id: string
  serial_number: string
  nft_token_id: string
  blockchain_hash: string
  owner_wallet: string
  owner_name: string
  created_at: string
  verification_status: boolean
  is_claimed: boolean
  nft_metadata: { product_name?: string; atelier?: string } | null
  authenticity_score: number
  activation_date: string | null
  provenance: string
  manufacture_date: string
}

type UIState = 'idle' | 'scanning' | 'verified' | 'counterfeit' | 'claiming' | 'claimed'

interface ParticleData {
  x: number
  y: number
  size: number
  dur: number
  delay: number
}

const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

const VAULT_ADDRESS = '0x3Cb45d2022e2E15AFa8C4822647B89935a2ceD08' as const
const OKBOND_ADDRESS = '0x7BB2458740c4F491277973212309d831385Ab9D7' as const

function GoldParticles() {
  const [pts] = useState<ParticleData[]>(() =>
    Array.from({ length: 18 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 1.5,
      dur: 4 + Math.random() * 6,
      delay: Math.random() * 4,
    }))
  )
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pts.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#c9a054]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0], y: -40 }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/30 to-transparent pointer-events-none"
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
    />
  )
}

const TIMELINE = [
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
  const [claimStatus, setClaimStatus] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const { address, isConnected } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const { sendTransactionAsync } = useSendTransaction()

  function handleVerify(overrideSerial?: string) {
    const s = (overrideSerial ?? serial).trim().toUpperCase()
    if (!s) return
    setSerial(s)
    setUiState('scanning')
    supabase
      .from('product_authentication')
      .select('*')
      .eq('serial_number', s)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setTimeout(() => setUiState('counterfeit'), 2000)
        } else {
          setRecord(data as unknown as AuthRecord)
          setTimeout(() => setUiState('verified'), 2000)
        }
      })
  }

  async function handleClaimOwnership() {
    if (!record || !isConnected || !address) return
    setUiState('claiming')
    setClaimStatus('Saving wallet address to Sovereign Ledger…')

    const { error } = await supabase
      .from('product_authentication')
      .update({
        owner_wallet: address,
        is_claimed: true,
        verification_status: true,
        activation_date: new Date().toISOString(),
      })
      .eq('id', record.id)

    if (error) {
      setClaimStatus('Error: ' + error.message)
      setUiState('verified')
      return
    }

    setRecord(prev => prev ? { ...prev, owner_wallet: address, is_claimed: true, verification_status: true } : null)
    setClaimStatus('Ownership claimed. Sovereign passport activated.')
    setUiState('claimed')
  }

  function resetAll() {
    setUiState('idle')
    setSerial('')
    setRecord(null)
    setClaimStatus('')
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const s = params.get('serial') ?? params.get('s')
    if (s) {
      setSerial(s.toUpperCase())
      handleVerify(s.toUpperCase())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isResultState = uiState === 'verified' || uiState === 'claiming' || uiState === 'claimed'

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden border-b border-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_40%,rgba(201,160,84,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(201,160,84,0.02) 80px)' }} />
        <GoldParticles />
        <ScanLine />

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, ease }}
          className="relative z-10 text-center px-5 max-w-2xl mx-auto pt-28 pb-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="text-[9px] tracking-[0.7em] uppercase text-[#c9a054] mb-8"
          >
            Sovereign Verification Protocol
          </motion.p>

          <motion.div
            className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {([0, 1, 2] as const).map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-[#c9a054]/20 rounded-full"
                animate={{ scale: [1, 1.4 + i * 0.3], opacity: [0.5, 0] }}
                transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-[#c9a054]/30 flex items-center justify-center bg-[#050505]">
                <span className="text-[#c9a054] text-2xl font-serif font-light">◈</span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
            className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] uppercase text-zinc-100 mb-5"
          >
            Authenticate
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9, ease }}
            className="text-zinc-600 font-light text-sm leading-relaxed max-w-sm mx-auto mb-10"
          >
            Every Shamim Forever creation carries a sovereign digital identity. Enter the serial number or scan the NFC/QR to verify provenance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease }}
            className="relative max-w-md mx-auto"
          >
            <div className="border-b border-[#1a1a1a] focus-within:border-[#c9a054]/50 transition-colors duration-700">
              <input
                ref={inputRef}
                type="text"
                value={serial}
                onChange={(e) => setSerial(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                placeholder="SF-RO-2025-00001"
                className="w-full py-5 bg-transparent text-zinc-200 text-center text-sm font-light tracking-[0.2em] uppercase placeholder:text-zinc-800 outline-none"
              />
            </div>
            <div className="flex gap-3 mt-5 justify-center flex-wrap">
              <button
                onClick={() => handleVerify()}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 border border-[#c9a054]/50 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Verify Sovereignty</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-[#c9a054]/30 to-transparent" />
          <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-800">Scroll</p>
        </motion.div>
      </section>

      {/* ── SCANNING OVERLAY ── */}
      <AnimatePresence>
        {uiState === 'scanning' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center"
          >
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-8">
                {([0, 1] as const).map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border border-[#c9a054]/30 rounded-full"
                    animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.6, repeat: Infinity }}
                  />
                ))}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-3xl text-[#c9a054]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >◈</motion.div>
              </div>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-2">Querying Sovereign Ledger</p>
              <p className="text-zinc-700 text-xs font-light">Verifying {serial}…</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VERIFIED RESULT ── */}
      <AnimatePresence>
        {isResultState && record && (
          <motion.section
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease }}
            className="border-b border-[#0a0a0a]"
          >
            <div className="px-5 md:px-12 lg:px-20 py-16 md:py-24 max-w-[1400px] mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease }}
                className="text-center mb-14"
              >
                <div className="relative inline-block">
                  {([0, 1, 2] as const).map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border border-[#c9a054] rounded-full"
                      animate={{ scale: [1, 2 + i], opacity: [0.4, 0] }}
                      transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                    />
                  ))}
                  <div className="relative w-20 h-20 rounded-full border border-[#c9a054]/40 flex items-center justify-center mx-auto bg-[#050505]">
                    <span className="text-3xl text-[#c9a054]">✦</span>
                  </div>
                </div>
                <motion.p className="text-[9px] tracking-[0.7em] uppercase text-[#c9a054] mt-6 mb-2">Sovereignty Confirmed</motion.p>
                <motion.h2 className="font-serif font-light text-3xl md:text-5xl tracking-[0.2em] uppercase text-zinc-100">
                  Sovereignly Verified
                </motion.h2>
              </motion.div>

              {/* Data grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0a0a0a] mb-px">
                {[
                  { label: 'Creation', value: record.nft_metadata?.product_name ?? 'Sovereign Creation' },
                  { label: 'Serial Number', value: record.serial_number },
                  { label: 'Atelier', value: record.nft_metadata?.atelier ?? record.provenance ?? 'Karachi Sovereign Atelier' },
                  { label: 'NFT Token', value: record.nft_token_id ? `#${record.nft_token_id}` : '#—' },
                  { label: 'Authenticity Score', value: `${record.authenticity_score ?? 100}/100` },
                  { label: 'Manufacture Date', value: record.manufacture_date ? new Date(record.manufacture_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : new Date(record.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) },
                  { label: 'Activated', value: record.activation_date ? new Date(record.activation_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Pending activation' },
                  { label: 'Status', value: record.is_claimed ? 'Ownership Claimed' : 'Unclaimed — Available for ownership' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                    className="bg-[#050505] px-6 py-6 hover:bg-[#080808] transition-colors duration-500"
                  >
                    <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-1.5">{item.label}</p>
                    <p className="font-serif font-light text-lg text-zinc-200">{item.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Blockchain panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease }}
                className="border border-[#c9a054]/15 p-6 md:p-10 mt-px"
              >
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <p className="text-[8px] tracking-[0.55em] uppercase text-[#c9a054] mb-1">Blockchain Registry</p>
                    <p className="font-serif font-light text-xl text-zinc-200">Sovereign NFT Ledger · Polygon</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-[#c9a054]"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054]">Live On-Chain</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {[
                    { label: 'Blockchain Hash', value: record.blockchain_hash ? `${record.blockchain_hash.slice(0, 18)}…` : '0x—' },
                    { label: 'Network', value: 'Polygon Mainnet' },
                    { label: 'Minted', value: new Date(record.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
                    { label: 'Owner Wallet', value: record.owner_wallet ? `${record.owner_wallet.slice(0, 12)}…` : 'Unregistered' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[7px] tracking-[0.45em] uppercase text-zinc-800 mb-1">{item.label}</p>
                      <p className="font-mono text-[10px] text-zinc-500">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Ownership Claim */}
              {!record.is_claimed && uiState === 'verified' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1, ease }}
                  className="border border-[#c9a054]/20 p-6 md:p-10 mt-6"
                >
                  <p className="text-[8px] tracking-[0.55em] uppercase text-[#c9a054] mb-3">Unclaimed Creation</p>
                  <h3 className="font-serif font-light text-2xl text-zinc-200 mb-4">Claim Digital Ownership</h3>
                  <p className="text-zinc-600 text-sm font-light leading-relaxed mb-6 max-w-md">
                    Connect your Polygon wallet to register as the sovereign owner of this creation. Your wallet address will be saved to the ledger permanently.
                  </p>

                  {!isConnected ? (
                    <div className="flex items-center gap-4 flex-wrap">
                      <ConnectButton
                        label="Connect Wallet to Claim"
                        chainStatus="none"
                        showBalance={false}
                        accountStatus="address"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 border border-[#c9a054]/20 px-4 py-3 w-fit">
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-[#c9a054]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        <span className="font-mono text-xs text-zinc-400">{address}</span>
                      </div>
                      <button
                        onClick={handleClaimOwnership}
                        className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                        <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Claim Digital Ownership</span>
                      </button>
                    </div>
                  )}
                  {claimStatus && <p className="mt-4 text-[8px] tracking-[0.4em] uppercase text-[#c9a054]">{claimStatus}</p>}
                </motion.div>
              )}

              {/* Already claimed */}
              {record.is_claimed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="border border-emerald-900/30 p-6 mt-6 flex items-center gap-4"
                >
                  <motion.div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                  <div>
                    <p className="text-[8px] tracking-[0.5em] uppercase text-emerald-500 mb-1">Ownership Registered</p>
                    <p className="font-mono text-xs text-zinc-500">{record.owner_wallet}</p>
                  </div>
                </motion.div>
              )}

              {uiState === 'claimed' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border border-[#c9a054]/20 p-8 mt-6 text-center">
                  <div className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-4" />
                  <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-3">Sovereignty Activated</p>
                  <p className="font-serif font-light text-2xl text-zinc-300">You are now the sovereign owner.</p>
                </motion.div>
              )}

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
          <motion.section
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="border-b border-[#0a0a0a]"
          >
            <div className="px-5 md:px-12 lg:px-20 py-20 max-w-[900px] mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease }}
                className="w-16 h-16 border border-red-900/50 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ boxShadow: '0 0 40px rgba(180,0,0,0.08)' }}
              >
                <span className="text-2xl text-red-800">✕</span>
              </motion.div>
              <p className="text-[8px] tracking-[0.6em] uppercase text-red-800 mb-4">Sovereign Record Not Found</p>
              <h2 className="font-serif font-light text-3xl md:text-5xl tracking-[0.15em] text-zinc-500 mb-6">
                Unauthorized Object
              </h2>
              <p className="text-zinc-700 text-sm font-light leading-relaxed max-w-md mx-auto mb-8">
                The serial <span className="font-mono text-zinc-500">{serial}</span> does not match any record in the Sovereign Ledger.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={resetAll} className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 border border-[#111] px-6 py-3 hover:text-zinc-400 transition-colors duration-400">Try Again</button>
                <a href="https://wa.me/923119447572?text=Help+authenticating+Shamim+Forever+product" target="_blank" rel="noopener noreferrer"
                  className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-6 py-3">
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
          <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.08em] text-zinc-200">
            Five Acts of<br /><span className="italic text-zinc-500">Creation</span>
          </h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a054]/30 via-[#c9a054]/10 to-transparent" />
          <div className="space-y-0 divide-y divide-[#0a0a0a]">
            {TIMELINE.map((step, i) => (
              <motion.div
                key={step.label}
                {...fv(i * 0.1)}
                className="relative flex gap-8 md:gap-12 items-start pl-12 md:pl-16 py-8 group hover:bg-[#080808] transition-colors duration-500"
              >
                <div className={`absolute left-0 w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-700 ${isResultState && i <= 3 ? 'border-[#c9a054]/60 bg-[#c9a054]/5' : 'border-[#111] bg-[#050505]'}`}>
                  <span className={`text-sm transition-colors duration-500 ${isResultState && i <= 3 ? 'text-[#c9a054]' : 'text-zinc-700'}`}>{step.icon}</span>
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

      {/* ── OKBOND PRIVILEGE ── */}
      <section className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-12 md:py-16 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
          <div>
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">OKBOND Protocol</p>
            <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.08em] text-zinc-200 mb-3">
              10% Sovereign <span className="italic text-[#c9a054]">Privilege</span>
            </h2>
            <p className="text-zinc-600 text-sm font-light leading-relaxed max-w-md">
              OKBOND holders unlock a permanent 10% discount across all Shamim Forever acquisitions — applied automatically at checkout.
            </p>
            {isConnected && (
              <div className="flex items-center gap-2 mt-4">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-[#c9a054]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="font-mono text-xs text-zinc-500">{address?.slice(0, 16)}… connected</span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            <ConnectButton
              label="Connect Wallet"
              chainStatus="none"
              showBalance={false}
              accountStatus="address"
            />
          </div>
        </motion.div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section className="px-5 md:px-12 lg:px-20 py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,160,84,0.04)_0%,transparent_70%)]" />
        <GoldParticles />
        <motion.div {...fv()} className="relative z-10">
          <p className="font-serif italic text-2xl md:text-4xl text-zinc-600 max-w-2xl mx-auto leading-snug mb-10">
            &ldquo;Luxury is temporary.<br />Authenticity is eternal.&rdquo;
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/shop" className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
              <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Enter The Vault</span>
            </Link>
            <Link href="/heirloom-vault" className="text-[9px] tracking-[0.5em] uppercase text-zinc-600 border border-[#111] px-10 py-4 hover:text-zinc-300 transition-all duration-500">
              Heirloom Protocol
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
