'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/supabase'

const ease = [0.16, 1, 0.3, 1] as const

const RANK_COLORS: Record<string, string> = {
  Associate: 'text-zinc-500',
  Elite: 'text-zinc-300',
  Sovereign: 'text-[#c9a054]',
  Royal: 'text-amber-400',
  Imperial: 'text-purple-400',
  Founder: 'text-[#c9a054]',
}

const VAULT_PRIVILEGES: Record<string, string[]> = {
  Associate: ['Verify product authenticity', 'View ownership history'],
  Elite:     ['Verify product authenticity', 'View ownership history', 'Early drop notifications'],
  Sovereign: ['Verify product authenticity', 'View ownership history', 'Early drop notifications', 'WhatsApp concierge access', 'OKBOND 10% discount'],
  Royal:     ['All Sovereign privileges', 'Bespoke commission priority', 'Private boutique previews', 'Legacy archive access'],
  Imperial:  ['All Royal privileges', 'Annual atelier visit', 'Custom fragrance commission', 'NFT resale royalty share'],
  Founder:   ['All Imperial privileges', 'Founding member seal', 'Permanent concierge line', 'Vault governance vote'],
}

interface SovereignAsset {
  id: string
  serial_number: string
  token_id: number
  tx_hash: string
  rarity_tier: string
  nft_status: string
  ipfs_metadata_url: string
  physical_status: string
  ownership_cycle: number
  created_at: string
}

interface ProvenanceEntry {
  id: string
  token_id: number
  previous_owner: string
  new_owner: string
  transfer_tx_hash: string
  physical_shipment_status: string
  created_at: string
}

export default function VaultPage() {
  const { address, isConnected } = useAccount()
  const [assets, setAssets] = useState<SovereignAsset[]>([])
  const [loading, setLoading] = useState(false)
  const [rank, setRank] = useState('Associate')
  const [score, setScore] = useState(0)
  const [selectedAsset, setSelectedAsset] = useState<SovereignAsset | null>(null)
  const [provenance, setProvenance] = useState<ProvenanceEntry[]>([])
  const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || ''

  useEffect(() => {
    if (!isConnected || !address) { setAssets([]); return }
    loadWalletAssets(address)
  }, [address, isConnected])

  async function loadWalletAssets(wallet: string) {
    setLoading(true)
    const { data } = await supabase
      .from('sovereign_assets')
      .select('*')
      .eq('wallet_address', wallet.toLowerCase())
      .eq('nft_status', 'minted')

    const list = data || []
    setAssets(list)

    const RARITY_SCORES: Record<string, number> = { COMMON: 10, ELITE: 25, ROYAL: 50, IMPERIAL: 80, FOUNDERS: 150, 'ONE-OF-ONE': 300 }
    const totalScore = list.reduce((s: number, a: SovereignAsset) => s + (RARITY_SCORES[a.rarity_tier] || 10), 0)
    setScore(totalScore)

    let r = 'Associate'
    if (totalScore >= 500) r = 'Founder'
    else if (totalScore >= 250) r = 'Imperial'
    else if (totalScore >= 100) r = 'Royal'
    else if (totalScore >= 50) r = 'Sovereign'
    else if (totalScore >= 20) r = 'Elite'
    setRank(r)
    setLoading(false)
  }

  async function loadProvenance(tokenId: number) {
    const { data } = await supabase
      .from('provenance_ledger')
      .select('*')
      .eq('token_id', tokenId)
      .order('created_at', { ascending: true })
    setProvenance((data as ProvenanceEntry[]) || [])
  }

  const privileges = VAULT_PRIVILEGES[rank] || VAULT_PRIVILEGES['Associate']
  const conciergeHref = `https://wa.me/923119447572?text=Sovereign%20Vault%20Access%20-%20Rank:%20${rank}`

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      {/* HERO */}
      <section className="pt-20 border-b border-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(201,160,84,0.05)_0%,transparent_70%)]" />
        <div className="px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }}>
            <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5">Sovereign Vault · Private Access</p>
            <h1 className="font-serif font-light text-5xl md:text-7xl tracking-[0.08em] uppercase text-zinc-100 leading-tight mb-5">
              House<br /><span className="italic text-zinc-500">Vault</span>
            </h1>
            <p className="text-zinc-600 font-light text-sm leading-relaxed max-w-md mb-8">
              Your sovereign holdings. Your provenance ledger. Your privileges — permanently recorded on Polygon Mainnet.
            </p>
            <ConnectButton label="Connect Sovereign Wallet" chainStatus="none" showBalance={false} accountStatus="address" />
          </motion.div>
        </div>
      </section>

      {/* NOT CONNECTED */}
      {!isConnected && (
        <section className="px-5 md:px-12 lg:px-20 py-20 max-w-[800px] mx-auto text-center">
          <div className="border border-[#c9a054]/10 p-12">
            <span className="text-4xl text-[#c9a054] block mb-6">◈</span>
            <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-3">Wallet Required</p>
            <p className="font-serif font-light text-2xl text-zinc-400 mb-6">Connect your Polygon wallet to access the Vault.</p>
            <p className="text-zinc-700 text-xs leading-relaxed">Your sovereign assets and rank are tied to your wallet address on Polygon Mainnet.</p>
          </div>
        </section>
      )}

      {isConnected && (
        <>
          {/* RANK PANEL */}
          <section className="border-b border-[#0a0a0a]">
            <div className="px-5 md:px-12 lg:px-20 py-10 md:py-14 max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0a0a0a]">
                {[
                  { label: 'Sovereign Rank', value: rank, className: RANK_COLORS[rank] || 'text-[#c9a054]', pulse: true },
                  { label: 'Sovereign Score', value: String(score), suffix: 'Points', className: 'text-zinc-200' },
                  { label: 'Holdings', value: loading ? '…' : String(assets.length), suffix: 'Sovereign Assets', className: 'text-zinc-200' },
                ].map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, ease }} className="bg-[#050505] p-8 text-center">
                    <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-3">{item.label}</p>
                    <p className={`font-serif font-light text-4xl md:text-5xl tracking-[0.12em] ${item.className}`}>{item.value}</p>
                    {item.suffix && <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mt-2">{item.suffix}</p>}
                    {item.pulse && (
                      <motion.div className="w-1.5 h-1.5 rounded-full bg-[#c9a054] mx-auto mt-4"
                        animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PRIVILEGES */}
          <section className="border-b border-[#0a0a0a]">
            <div className="px-5 md:px-12 lg:px-20 py-10 md:py-14 max-w-[1400px] mx-auto">
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-6">Your Sovereign Privileges</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {privileges.map((priv, i) => (
                  <motion.div key={priv} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, ease }}
                    className="flex items-start gap-3 border border-[#c9a054]/15 p-4 hover:border-[#c9a054]/30 transition-colors duration-500">
                    <span className="text-[#c9a054] text-xs mt-0.5 flex-shrink-0">◈</span>
                    <span className="text-zinc-400 text-xs font-light leading-relaxed">{priv}</span>
                  </motion.div>
                ))}
              </div>
              {assets.length === 0 && !loading && rank === 'Associate' && (
                <div className="mt-6 border border-[#111] p-6 flex items-start gap-4">
                  <span className="text-[#c9a054] text-xl flex-shrink-0">◇</span>
                  <div>
                    <p className="text-zinc-400 text-sm font-light mb-2">No sovereign assets found in this wallet.</p>
                    <p className="text-zinc-700 text-xs leading-relaxed mb-3">Acquire Shamim Forever products to mint your Sovereign NFT assets and unlock vault privileges.</p>
                    <Link href="/shop" className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-4 py-2 inline-block hover:bg-[#c9a054]/5 transition-colors">Enter Vault Shop →</Link>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ASSETS GRID */}
          {assets.length > 0 && (
            <section className="border-b border-[#0a0a0a]">
              <div className="px-5 md:px-12 lg:px-20 py-10 md:py-14 max-w-[1400px] mx-auto">
                <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-8">Your Sovereign Assets · Polygon Mainnet</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {assets.map((asset, i) => (
                    <motion.div key={asset.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, ease }}
                      onClick={() => { setSelectedAsset(asset); loadProvenance(asset.token_id) }}
                      className="group border border-[#1a1a1a] hover:border-[#c9a054]/30 transition-all duration-500 cursor-pointer bg-[#050505]">
                      <div className="aspect-square bg-[#080808] overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(201,160,84,0.08)_0%,transparent_70%)]" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                          <span className="text-3xl text-[#c9a054] mb-3">◈</span>
                          <p className={`text-[7px] tracking-[0.45em] uppercase mb-1 ${RANK_COLORS[asset.rarity_tier] || 'text-zinc-400'}`}>{asset.rarity_tier}</p>
                          <p className="font-mono text-[8px] text-zinc-600">{asset.serial_number}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-mono text-[9px] text-zinc-600 truncate">Token #{asset.token_id}</p>
                          <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"
                            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        </div>
                        <p className="font-mono text-[8px] text-zinc-700 truncate">{asset.serial_number}</p>
                        <div className="mt-3 flex gap-2">
                          <a href={`https://polygonscan.com/tx/${asset.tx_hash}`} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="text-[7px] tracking-[0.3em] uppercase text-[#c9a054] hover:underline">Polygonscan ↗</a>
                          <span className="text-zinc-800">·</span>
                          <a href={`https://opensea.io/assets/matic/${contractAddress}/${asset.token_id}`}
                            target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                            className="text-[7px] tracking-[0.3em] uppercase text-zinc-700 hover:text-[#c9a054]">OpenSea ↗</a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CONCIERGE */}
          {(rank === 'Sovereign' || rank === 'Royal' || rank === 'Imperial' || rank === 'Founder') && (
            <section className="border-b border-[#0a0a0a]">
              <div className="px-5 md:px-12 lg:px-20 py-10 max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                <div>
                  <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-2">Sovereign Concierge Line</p>
                  <h3 className="font-serif font-light text-2xl text-zinc-200 mb-2">Direct House Access</h3>
                  <p className="text-zinc-600 text-sm font-light">Private WhatsApp line for bespoke requests, refills, and restoration.</p>
                </div>
                <a href={conciergeHref} target="_blank" rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden flex-shrink-0">
                  <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                  <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Open Concierge Line</span>
                </a>
              </div>
            </section>
          )}
        </>
      )}

      {/* ASSET DETAIL MODAL */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050505]/96 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedAsset(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease }} onClick={e => e.stopPropagation()}
              className="w-full max-w-lg border border-[#1a1a1a] bg-[#080808] max-h-[85vh] overflow-y-auto">
              <div className="border-b border-[#111] p-6 flex items-center justify-between">
                <div>
                  <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] mb-1">Sovereign Asset Detail</p>
                  <h3 className="font-serif font-light text-xl text-zinc-200">{selectedAsset.serial_number}</h3>
                </div>
                <button onClick={() => setSelectedAsset(null)} className="text-zinc-600 hover:text-zinc-300 text-xl">✕</button>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: 'Token ID', value: '#' + selectedAsset.token_id },
                  { label: 'Serial Number', value: selectedAsset.serial_number },
                  { label: 'Rarity Tier', value: selectedAsset.rarity_tier },
                  { label: 'NFT Status', value: selectedAsset.nft_status },
                  { label: 'Physical Status', value: selectedAsset.physical_status },
                  { label: 'Ownership Cycle', value: String(selectedAsset.ownership_cycle) + 'x transfers' },
                  { label: 'Minted', value: new Date(selectedAsset.created_at).toLocaleDateString('en-GB') },
                ].map(item => (
                  <div key={item.label} className="flex justify-between border-b border-[#0d0d0d] pb-3">
                    <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700">{item.label}</p>
                    <p className="font-mono text-[10px] text-zinc-400">{item.value}</p>
                  </div>
                ))}
                {selectedAsset.tx_hash && (
                  <a href={`https://polygonscan.com/tx/${selectedAsset.tx_hash}`} target="_blank" rel="noopener noreferrer"
                    className="block text-[8px] tracking-[0.4em] uppercase text-[#c9a054] hover:underline break-all">
                    View on Polygonscan ↗
                  </a>
                )}
                {provenance.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-700 mb-3">Provenance Ledger</p>
                    <div className="space-y-3">
                      {provenance.map((p, i) => (
                        <div key={p.id} className="border border-[#111] p-3">
                          <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-700 mb-1">
                            Transfer {i + 1} · {new Date(p.created_at).toLocaleDateString('en-GB')}
                          </p>
                          <p className="font-mono text-[8px] text-zinc-600 break-all">From: {p.previous_owner?.slice(0, 20)}…</p>
                          <p className="font-mono text-[8px] text-zinc-500 break-all">To: {p.new_owner?.slice(0, 20)}…</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="px-5 md:px-12 lg:px-20 py-16 md:py-24 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(201,160,84,0.03)_0%,transparent_70%)]" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1, ease }} className="relative z-10">
          <p className="font-serif italic text-2xl md:text-4xl text-zinc-600 mb-8 max-w-lg mx-auto leading-snug">
            &ldquo;Every holding is a sovereign declaration.&rdquo;
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/shop" className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
              <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Expand Holdings</span>
            </Link>
            <Link href="/authenticate" className="text-[9px] tracking-[0.5em] uppercase text-zinc-600 border border-[#111] px-8 py-4 hover:text-zinc-300 transition-colors">
              Authenticate Asset
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
