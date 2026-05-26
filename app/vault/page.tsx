'use client'

  import { motion, AnimatePresence } from 'framer-motion'
  import { useState, useEffect, useCallback } from 'react'
  import Link from 'next/link'
  import { ConnectButton } from '@rainbow-me/rainbowkit'
  import { useAccount } from 'wagmi'
  import Footer from '@/components/Footer'

  const ease = [0.16, 1, 0.3, 1] as const

  const TIER_CONFIG: Record<string, {
    label: string; badge: string; color: string; glow: string; border: string; rank: number;
    privileges: string[]
  }> = {
    'FOUNDERS': {
      label: 'FOUNDERS SOVEREIGN', badge: '◆ FOUNDERS', color: '#c9a054', glow: 'rgba(201,160,84,0.3)',
      border: '#3a2a0a', rank: 4,
      privileges: [
        'Private atelier tours — lifetime access',
        'Personal House concierge — 24/7',
        'Fragrance refill for life — complimentary',
        'First access to all future Shamim Forever drops',
        'VVIP event & gala invitations worldwide',
        'Founder attribution in all House archives',
        'Sovereign NFT resale royalty sharing — 1%',
        'Direct line to Shamim — founder channel',
      ],
    },
    'ONE-OF-ONE': {
      label: 'ONE OF ONE', badge: '◈ ONE OF ONE', color: '#e8e8e0', glow: 'rgba(232,232,224,0.25)',
      border: '#1a1a18', rank: 3,
      privileges: [
        'Absolute provenance — globally unique',
        'Museum-grade digital certificate',
        'Bespoke packaging — white glove delivery',
        'Priority atelier access',
        'Annual House event invitation',
      ],
    },
    'IMPERIAL': {
      label: 'IMPERIAL REGISTRY', badge: '◉ IMPERIAL', color: '#d4900a', glow: 'rgba(212,144,10,0.22)',
      border: '#2a1800', rank: 2,
      privileges: [
        'Imperial registry membership',
        'Priority concierge response — 2hr SLA',
        'Seasonal House newsletter & gifts',
        'Early access to new collections',
        'Complimentary authentication renewal',
      ],
    },
    'ROYAL': {
      label: 'ROYAL HERITAGE', badge: '◇ ROYAL', color: '#7a9fcf', glow: 'rgba(122,159,207,0.2)',
      border: '#0a1428', rank: 1,
      privileges: [
        'Royal heritage provenance certificate',
        'Concierge access — standard tier',
        'Digital archive inclusion',
        'New season early notification',
      ],
    },
    'ELITE': {
      label: 'ELITE SELECTION', badge: '○ ELITE', color: '#9a8060', glow: 'rgba(154,128,96,0.18)',
      border: '#181410', rank: 0,
      privileges: [
        'Elite selection certificate',
        'House newsletter membership',
        'Standard authentication support',
      ],
    },
  }

  type SovereignAsset = {
    id: string
    serial_number: string
    wallet_address: string
    rarity_tier: string
    nft_status: string
    token_id: number
    tx_hash: string
    ipfs_metadata_url: string
    physical_status: string
    ownership_cycle: number
    product_id: string
  }

  export default function VaultPage() {
    const { address, isConnected } = useAccount()
    const [assets, setAssets] = useState<SovereignAsset[]>([])
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState<SovereignAsset | null>(null)

    const fetchVault = useCallback(async (wallet: string) => {
      setLoading(true)
      try {
        const res = await fetch(`/api/nft/vault?wallet=${wallet}`)
        if (res.ok) {
          const data = await res.json()
          const sorted = (data.assets || []).sort((a: SovereignAsset, b: SovereignAsset) => {
            const ra = TIER_CONFIG[a.rarity_tier]?.rank ?? 0
            const rb = TIER_CONFIG[b.rarity_tier]?.rank ?? 0
            return rb - ra
          })
          setAssets(sorted)
        }
      } finally {
        setLoading(false)
      }
    }, [])

    useEffect(() => {
      if (isConnected && address) fetchVault(address)
      else setAssets([])
    }, [isConnected, address, fetchVault])

    return (
      <div className="min-h-screen bg-[#030303] text-zinc-200 flex flex-col">
        {/* Header */}
        <div className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <img src="/logo.png" alt="Shamim Forever" className="h-7 w-auto opacity-80" />
          </Link>
          <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus="avatar"
          />
        </div>

        {/* Hero */}
        <div className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-14 md:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }}>
            <p className="text-[8px] tracking-[0.6em] uppercase text-[#c9a054] mb-4">House of Shamim Forever</p>
            <h1 className="font-serif font-light text-3xl md:text-5xl text-zinc-200 leading-tight mb-3">
              Sovereign Vault
            </h1>
            <p className="text-zinc-600 text-xs tracking-[0.25em] uppercase max-w-md">
              Your sovereign NFT holdings — provenance, privileges, and on-chain identity
            </p>
          </motion.div>
        </div>

        {/* Main */}
        <div className="flex-1 px-5 md:px-12 lg:px-20 py-14">
          {!isConnected ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}
              className="flex flex-col items-center justify-center py-32 gap-8 text-center"
            >
              <div className="w-16 h-16 border border-[#1a1a1a] flex items-center justify-center mb-2">
                <span className="text-[#c9a054] text-2xl">◆</span>
              </div>
              <div>
                <p className="font-serif font-light text-2xl text-zinc-400 mb-3">Connect Your Wallet</p>
                <p className="text-zinc-700 text-xs tracking-[0.3em] uppercase max-w-xs">
                  Connect to view your Shamim Forever sovereign holdings and unlock your privileges
                </p>
              </div>
              <ConnectButton />
            </motion.div>
          ) : loading ? (
            <div className="flex items-center justify-center py-40">
              <div className="flex gap-1.5">
                {[0,1,2].map(i => (
                  <motion.div key={i} className="w-1 h-1 rounded-full bg-[#c9a054]"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.4, delay: i * 0.2, repeat: Infinity }} />
                ))}
              </div>
            </div>
          ) : assets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center py-28 gap-6 text-center"
            >
              <p className="font-serif font-light italic text-xl text-zinc-600">No sovereign assets found</p>
              <p className="text-zinc-800 text-xs tracking-[0.3em] uppercase">
                Connected: {address?.slice(0,6)}…{address?.slice(-4)}
              </p>
              <Link href="/shop"
                className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054] border border-[#c9a054]/20 px-6 py-3 hover:border-[#c9a054]/60 transition-all duration-500">
                Explore Collection →
              </Link>
            </motion.div>
          ) : (
            <div>
              <div className="flex items-baseline gap-4 mb-10">
                <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700">
                  {assets.length} Sovereign Asset{assets.length !== 1 ? 's' : ''}
                </p>
                <div className="flex-1 h-px bg-[#0d0d0d]" />
                <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-800">
                  {address?.slice(0,6)}…{address?.slice(-4)}
                </p>
              </div>

              {/* NFT Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {assets.map((asset, i) => {
                  const tier = TIER_CONFIG[asset.rarity_tier] || TIER_CONFIG['ELITE']
                  return (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease }}
                      onClick={() => setSelected(asset)}
                      className="group cursor-pointer border border-[#0d0d0d] hover:border-[#1a1a1a] bg-[#050505] transition-all duration-700"
                      style={{ boxShadow: `0 0 0 0 ${tier.glow}`, }}
                      whileHover={{ boxShadow: `0 8px 40px ${tier.glow}` }}
                    >
                      {/* Artwork */}
                      <div className="relative aspect-square overflow-hidden bg-[#050505]">
                        <img
                          src={`/api/nft/artwork/${encodeURIComponent(asset.serial_number)}`}
                          alt={asset.serial_number}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                        {/* Tier badge */}
                        <div className="absolute top-3 left-3">
                          <span className="text-[7px] tracking-[0.4em] uppercase px-2.5 py-1.5 border"
                            style={{ color: tier.color, borderColor: tier.border, background: '#050505cc' }}>
                            {tier.badge}
                          </span>
                        </div>
                        {/* Status dot */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${asset.nft_status === 'minted' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span className="text-[7px] tracking-[0.3em] uppercase text-zinc-500">
                            {asset.nft_status}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5 border-t border-[#0d0d0d]">
                        <p className="text-[8px] tracking-[0.45em] uppercase mb-1" style={{ color: tier.color }}>
                          {tier.label}
                        </p>
                        <p className="font-serif font-light text-zinc-300 text-sm mb-1">{asset.serial_number}</p>
                        <p className="text-[8px] tracking-[0.25em] uppercase text-zinc-700 mb-4">
                          Ownership #{asset.ownership_cycle} · {asset.physical_status?.replace('_', ' ') || 'Active'}
                        </p>
                        <div className="flex items-center justify-between">
                          {asset.token_id ? (
                            <a href={`https://opensea.io/assets/matic/0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640/${asset.token_id}`}
                              target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                              className="text-[8px] tracking-[0.35em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500">
                              OpenSea →
                            </a>
                          ) : <div />}
                          <Link href={`/authenticate?serial=${asset.serial_number}`} onClick={e => e.stopPropagation()}
                            className="text-[8px] tracking-[0.35em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500">
                            Verify →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Privilege Modal */}
        <AnimatePresence>
          {selected && (() => {
            const tier = TIER_CONFIG[selected.rarity_tier] || TIER_CONFIG['ELITE']
            return (
              <motion.div
                key="modal"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8"
                style={{ background: 'rgba(3,3,3,0.92)', backdropFilter: 'blur(12px)' }}
                onClick={() => setSelected(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease }}
                  className="w-full max-w-lg border border-[#111] bg-[#050505] relative overflow-hidden"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Top accent */}
                  <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${tier.color}, transparent)` }} />

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="text-[7px] tracking-[0.5em] uppercase mb-1" style={{ color: tier.color }}>{tier.badge}</p>
                        <p className="font-serif font-light text-zinc-200 text-lg">{selected.serial_number}</p>
                      </div>
                      <button onClick={() => setSelected(null)} className="text-zinc-700 hover:text-zinc-400 transition-colors text-xl leading-none mt-1">×</button>
                    </div>

                    {/* Artwork small */}
                    <div className="w-full aspect-video mb-6 overflow-hidden border border-[#0d0d0d]">
                      <img src={`/api/nft/artwork/${encodeURIComponent(selected.serial_number)}`}
                        alt={selected.serial_number} className="w-full h-full object-cover" />
                    </div>

                    {/* Privileges */}
                    <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-4">Unlocked Privileges</p>
                    <div className="flex flex-col gap-3 mb-6">
                      {tier.privileges.map((p, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-[#c9a054] mt-0.5 text-xs leading-none">◆</span>
                          <span className="text-xs text-zinc-500 leading-relaxed">{p}</span>
                        </div>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 border-t border-[#0d0d0d] pt-5">
                      <Link href={`/authenticate?serial=${selected.serial_number}`}
                        className="text-[9px] tracking-[0.4em] uppercase text-zinc-500 hover:text-[#c9a054] transition-colors duration-500">
                        Authenticate →
                      </Link>
                      {selected.token_id && (
                        <>
                          <a href={`https://opensea.io/assets/matic/0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640/${selected.token_id}`}
                            target="_blank" rel="noopener noreferrer"
                            className="text-[9px] tracking-[0.4em] uppercase text-zinc-500 hover:text-[#c9a054] transition-colors duration-500">
                            OpenSea →
                          </a>
                          <a href={`https://polygonscan.com/tx/${selected.tx_hash}`}
                            target="_blank" rel="noopener noreferrer"
                            className="text-[9px] tracking-[0.4em] uppercase text-zinc-500 hover:text-[#c9a054] transition-colors duration-500">
                            Polygonscan →
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })()}
        </AnimatePresence>

        <Footer />
      </div>
    )
  }