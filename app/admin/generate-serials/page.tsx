'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const PREFIXES = ['SF-RO', 'SF-MK', 'SF-IR', 'SF-OD', 'SF-SP', 'SF-VT']

interface Serial {
  id: string
  serial_number: string
  nft_token_id: string
  blockchain_hash: string
  is_claimed: boolean
  verification_status: boolean
  owner_wallet: string
  owner_name: string
  nft_metadata: { product_name?: string; atelier?: string }
  created_at: string
  qr_url?: string
}

export default function AdminGenerateSerialsPage() {
  const [prefix, setPrefix] = useState('SF-RO')
  const [count, setCount] = useState(1)
  const [productName, setProductName] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<Serial[]>([])
  const [existing, setExisting] = useState<Serial[]>([])
  const [loadingExisting, setLoadingExisting] = useState(true)
  const [msg, setMsg] = useState('')

  async function fetchExisting() {
    setLoadingExisting(true)
    const { data } = await supabase
      .from('product_authentication')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
    setExisting((data ?? []) as Serial[])
    setLoadingExisting(false)
  }

  useEffect(() => { fetchExisting() }, [])

  async function handleGenerate() {
    if (!productName.trim()) { setMsg('Enter product name first.'); return }
    setGenerating(true)
    setMsg('')
    setGenerated([])

    const res = await fetch('/api/serials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefix, count, product_name: productName }),
    })
    const json = await res.json()

    if (json.error) {
      setMsg('Error: ' + json.error)
    } else {
      setGenerated(json.serials)
      setMsg(`${json.count} serial(s) generated and saved.`)
      fetchExisting()
    }
    setGenerating(false)
  }

  async function handleRevoke(id: string) {
    if (!confirm('Delete this serial from DB?')) return
    await supabase.from('product_authentication').delete().eq('id', id)
    fetchExisting()
    setGenerated(prev => prev.filter(s => s.id !== id))
  }

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://shamimforever-api-server.vercel.app'

  return (
    <div className="p-10">
      <div className="mb-10 pb-8 border-b border-[#1a1a1a]">
        <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-2">Sovereign Authentication</p>
        <h1 className="font-serif text-3xl font-light tracking-[0.15em] uppercase text-zinc-100">Generate Serials</h1>
      </div>

      {/* Generator Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="border border-[#1a1a1a] bg-[#050505] p-8">
          <h2 className="font-serif text-lg font-light tracking-[0.1em] text-zinc-300 mb-6">New Batch</h2>

          <div className="space-y-0">
            <div className="border-b border-[#111] focus-within:border-[#c9a054]/30 transition-colors">
              <label className="block pt-4 pb-1 text-[7px] tracking-[0.4em] uppercase text-zinc-700">Product Name</label>
              <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="Royal Oud No. 11" className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light outline-none" />
            </div>
            <div className="border-b border-[#111]">
              <label className="block pt-4 pb-1 text-[7px] tracking-[0.4em] uppercase text-zinc-700">Serial Prefix</label>
              <select value={prefix} onChange={e => setPrefix(e.target.value)} className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light outline-none">
                {PREFIXES.map(p => <option key={p} value={p} className="bg-[#0a0a0a]">{p}</option>)}
              </select>
            </div>
            <div className="border-b border-[#111]">
              <label className="block pt-4 pb-1 text-[7px] tracking-[0.4em] uppercase text-zinc-700">Quantity (max 50)</label>
              <input type="number" min={1} max={50} value={count} onChange={e => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))} className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light outline-none" />
            </div>
          </div>

          {msg && <p className="mt-4 text-[8px] tracking-[0.3em] uppercase text-[#c9a054]">{msg}</p>}

          <button onClick={handleGenerate} disabled={generating} className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[8px] tracking-[0.4em] uppercase text-[#c9a054] overflow-hidden mt-6 disabled:opacity-50">
            <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
              {generating ? 'Generating…' : 'Generate & Save to DB'}
            </span>
          </button>
        </div>

        {/* Generated Result */}
        <div className="border border-[#1a1a1a] bg-[#050505] p-8">
          <h2 className="font-serif text-lg font-light tracking-[0.1em] text-zinc-300 mb-6">Generated This Session</h2>
          {generated.length === 0 ? (
            <p className="text-zinc-700 text-xs font-light">No serials generated yet.</p>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {generated.map(s => (
                <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="border border-[#111] p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-mono text-[#c9a054] text-xs">{s.serial_number}</p>
                    <button onClick={() => handleRevoke(s.id)} className="text-[7px] tracking-[0.3em] uppercase text-red-800 hover:text-red-600 transition-colors">Revoke</button>
                  </div>
                  <p className="text-zinc-700 text-[9px] mb-2">NFT #{s.nft_token_id}</p>
                  <div className="bg-white p-2 w-24 h-24 mx-auto mb-2">
                    {/* QR Code via public API */}
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=88x88&data=${encodeURIComponent(`${siteUrl}/authenticate?serial=${s.serial_number}`)}`}
                      alt={s.serial_number}
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-zinc-800 text-[7px] font-mono break-all text-center">{siteUrl}/authenticate?serial={s.serial_number}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Existing Serials */}
      <div className="border border-[#1a1a1a] bg-[#050505]">
        <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between">
          <h2 className="font-serif text-lg font-light tracking-[0.15em] uppercase text-zinc-100">All Serials (Latest 50)</h2>
          <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-700">{existing.length} records</p>
        </div>
        <div className="divide-y divide-[#111]">
          {loadingExisting ? (
            <div className="p-8 text-center"><p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Loading…</p></div>
          ) : existing.length === 0 ? (
            <div className="p-8 text-center"><p className="text-zinc-700 text-xs font-light">No serials yet</p></div>
          ) : existing.map(s => (
            <div key={s.id} className="p-5 flex items-center gap-6 hover:bg-[#080808] transition-colors group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-mono text-zinc-300 text-xs">{s.serial_number}</p>
                  <span className={`text-[7px] tracking-[0.3em] uppercase px-2 py-0.5 ${s.is_claimed ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-600 bg-[#111]'}`}>
                    {s.is_claimed ? 'Claimed' : 'Unclaimed'}
                  </span>
                </div>
                <p className="text-zinc-600 text-[9px]">{s.nft_metadata?.product_name ?? '—'} · NFT #{s.nft_token_id}</p>
                {s.owner_wallet && <p className="text-zinc-700 text-[8px] font-mono mt-0.5">{s.owner_wallet.slice(0, 16)}…</p>}
              </div>
              <button onClick={() => handleRevoke(s.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[7px] tracking-[0.3em] uppercase text-red-800 border border-red-900/30 px-3 py-1.5">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
