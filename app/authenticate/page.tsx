'use client'

  import { motion, AnimatePresence } from 'framer-motion'
  import { useState, useEffect, useCallback, Suspense } from 'react'
  import { useSearchParams } from 'next/navigation'
  import Link from 'next/link'
  import { ConnectButton } from '@rainbow-me/rainbowkit'
  import { useAccount } from 'wagmi'
  import { supabase } from '@/lib/supabase'
  import Footer from '@/components/Footer'

  const ease = [0.16, 1, 0.3, 1] as const

  interface AuthRecord {
    id: string
    serial_number: string
    nft_status: 'pending' | 'minting' | 'minted' | 'failed'
    tx_hash?: string
    token_id?: number
    ipfs_metadata_url?: string
    rarity_tier?: string
    wallet_address?: string
    physical_status?: string
    ownership_cycle?: number
    created_at: string
    product?: { name: string; category?: string }
  }

  interface LegacyAuth {
    id: string
    serial_number: string
    product_name?: string
    product_id?: string
    blockchain_hash?: string
    nft_token_id?: string
    owner_wallet?: string
    is_claimed?: boolean
    manufacture_date?: string
    provenance?: string
    nft_metadata?: Record<string, unknown>
  }

  interface ProvenanceEntry {
    id: string
    token_id: number
    previous_owner: string
    new_owner: string
    transfer_tx_hash: string
    physical_shipment_status?: string
    created_at: string
  }

  function shortAddress(addr?: string | null) {
    if (!addr) return '—'
    if (addr === '0x0000000000000000000000000000000000000000') return 'House of Shamim Forever (Genesis)'
    return addr.slice(0, 6) + '\u2026' + addr.slice(-4)
  }

  function AuthenticateContent() {
    const params = useSearchParams()
    const { address, isConnected } = useAccount()
    const [serial, setSerial] = useState('')
    const [inputSerial, setInputSerial] = useState('')
    const [asset, setAsset] = useState<AuthRecord | null>(null)
    const [legacy, setLegacy] = useState<LegacyAuth | null>(null)
    const [provenance, setProvenance] = useState<ProvenanceEntry[]>([])
    const [loading, setLoading] = useState(false)
    const [claiming, setClaiming] = useState(false)
    const [claimResult, setClaimResult] = useState<{ txHash: string; tokenId: string } | null>(null)
    const [error, setError] = useState('')
    const [notFound, setNotFound] = useState(false)
    const [artworkError, setArtworkError] = useState(false)

    useEffect(() => {
      const s = params.get('serial')
      if (s) { setSerial(s.toUpperCase()); setInputSerial(s.toUpperCase()) }
    }, [params])

    const lookupSerial = useCallback(async (s: string) => {
      if (!s.trim()) return
      setLoading(true)
      setError('')
      setNotFound(false)
      setAsset(null)
      setLegacy(null)
      setClaimResult(null)
      setProvenance([])
      setArtworkError(false)
      const normalized = s.trim().toUpperCase()
      setSerial(normalized)

      const { data: sov } = await supabase
        .from('sovereign_assets')
        .select('*, product:products(name, category)')
        .eq('serial_number', normalized)
        .single()

      if (sov) {
        setAsset(sov)
        if (sov.token_id) {
          const { data: prov } = await supabase
            .from('provenance_ledger')
            .select('*')
            .eq('token_id', sov.token_id)
            .order('created_at', { ascending: true })
          if (prov) setProvenance(prov)
        }
        setLoading(false)
        return
      }

      const { data: auth } = await supabase
        .from('product_authentication')
        .select('*')
        .eq('serial_number', normalized)
        .single()

      if (auth) {
        setLegacy(auth)
        setLoading(false)
        return
      }

      setNotFound(true)
      setLoading(false)
    }, [])

    useEffect(() => {
      if (serial) lookupSerial(serial)
    }, [serial, lookupSerial])

    async function handleClaim() {
      if (!isConnected || !address) return
      const targetSerial = asset?.serial_number || legacy?.serial_number
      if (!targetSerial) return
      setClaiming(true)
      setError('')
      try {
        const res = await fetch('/api/nft/claim', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ serial: targetSerial, walletAddress: address }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Claim failed')
        setClaimResult({ txHash: data.txHash, tokenId: data.tokenId })
        await lookupSerial(targetSerial)
      } catch (e: unknown) {
        const err = e as { message?: string }
        setError(err?.message || 'Claim failed. Please try again.')
      } finally {
        setClaiming(false)
      }
    }

    const isMinted = asset?.nft_status === 'minted' || (legacy?.is_claimed && legacy?.blockchain_hash)
    const txHash = asset?.tx_hash || legacy?.blockchain_hash || claimResult?.txHash
    const tokenId = asset?.token_id || (legacy?.nft_token_id ? parseInt(legacy.nft_token_id) : null) || (claimResult?.tokenId ? parseInt(claimResult.tokenId) : null)
    const ownerWallet = asset?.wallet_address || legacy?.owner_wallet
    const rarityTier = asset?.rarity_tier || 'ELITE'
    const productName = asset?.product?.name || legacy?.product_name || (legacy?.nft_metadata as Record<string, unknown>)?.product_name as string || 'Sovereign Creation'
    const currentSerial = asset?.serial_number || legacy?.serial_number
    const CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'

    function getEvolutionLabel(): string {
      if (!asset?.created_at) return 'Sovereign Status: Active'
      const ageYears = (Date.now() - new Date(asset.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365)
      if (ageYears >= 5) return 'Heritage Status: Legendary'
      if (ageYears >= 3) return 'Heritage Status: Matured'
      if (ageYears >= 1) return 'Sovereign Status: Seasoned'
      return 'Sovereign Status: Active'
    }

    return (
      <div className="min-h-screen bg-[#050505] overflow-x-hidden">
        {/* HERO */}
        <section className="pt-20 border-b border-[#0a0a0a] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(201,160,84,0.04)_0%,transparent_70%)]" />
          <div className="px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }}>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5">Provenance Verification \u00b7 Sovereign Registry</p>
              <h1 className="font-serif font-light text-5xl md:text-7xl tracking-[0.08em] uppercase text-zinc-100 leading-tight mb-5">
                Authenticate<br /><span className="italic text-zinc-500">Asset</span>
              </h1>
              <p className="text-zinc-600 font-light text-sm leading-relaxed max-w-md">
                Every Shamim Forever creation carries a unique Sovereign Serial registered on Polygon Mainnet. Verify authenticity, claim digital provenance, and access the House Vault.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SERIAL LOOKUP */}
        <section className="border-b border-[#0a0a0a]">
          <div className="px-5 md:px-12 lg:px-20 py-10 md:py-14 max-w-[900px] mx-auto">
            <div className="flex gap-0">
              <input
                value={inputSerial}
                onChange={e => setInputSerial(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && lookupSerial(inputSerial)}
                placeholder="SF-RO-2026-00001"
                className="flex-1 bg-[#080808] border border-[#1a1a1a] border-r-0 px-5 py-4 text-zinc-200 font-mono text-sm placeholder:text-zinc-800 outline-none focus:border-[#c9a054]/30 transition-colors duration-300"
              />
              <button
                onClick={() => lookupSerial(inputSerial)}
                disabled={loading}
                className="px-8 py-4 bg-[#080808] border border-[#1a1a1a] text-[8px] tracking-[0.4em] uppercase text-[#c9a054] hover:bg-[#c9a054]/5 transition-colors duration-300 disabled:opacity-40 whitespace-nowrap">
                {loading ? 'Scanning\u2026' : 'Verify \u2192'}
              </button>
            </div>
            <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-800 mt-3">
              Serial format: SF-[CATEGORY]-[YEAR]-[NUMBER] \u00b7 Found on product base, certificate, or packaging inner seal
            </p>
          </div>
        </section>

        {/* LOADING */}
        {loading && (
          <section className="px-5 md:px-12 lg:px-20 py-20 max-w-[900px] mx-auto text-center">
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <p className="text-[#c9a054] text-2xl mb-4">\u25c8</p>
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-600">Querying Sovereign Registry\u2026</p>
            </motion.div>
          </section>
        )}

        {/* NOT FOUND */}
        {notFound && !loading && (
          <section className="px-5 md:px-12 lg:px-20 py-16 max-w-[900px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
              className="border border-red-900/20 bg-[#0a0202] p-8 text-center">
              <p className="text-red-900 text-2xl mb-4">\u2715</p>
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-600 mb-2">Serial Not Found</p>
              <h3 className="font-serif font-light text-2xl text-red-900/80 mb-3">Authentication Failed</h3>
              <p className="text-zinc-700 text-sm font-light leading-relaxed">
                No sovereign asset found for serial <span className="font-mono text-zinc-500">{serial}</span>.
                If your product is genuine, contact the House concierge immediately.
              </p>
              <a href="mailto:concierge@shamimf.com"
                className="inline-block mt-6 text-[8px] tracking-[0.4em] uppercase border border-[#1a1a1a] px-6 py-3 text-zinc-600 hover:text-zinc-300 transition-colors">
                Contact Concierge
              </a>
            </motion.div>
          </section>
        )}

        {/* AUTHENTICATED STATE */}
        {(asset || legacy) && !loading && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
            className="px-5 md:px-12 lg:px-20 py-10 md:py-16 max-w-[1100px] mx-auto">

            {/* STATUS BANNER */}
            <div className={`border p-4 flex items-center gap-4 mb-8 ${isMinted ? 'border-emerald-900/30 bg-[#020a02]' : 'border-amber-900/20 bg-[#0a0800]'}`}>
              <motion.div className={`w-2 h-2 rounded-full flex-shrink-0 ${isMinted ? 'bg-emerald-500' : 'bg-amber-600'}`}
                animate={{ opacity: isMinted ? [1, 0.4, 1] : 1 }} transition={{ duration: 1.5, repeat: Infinity }} />
              <div>
                <p className={`text-[8px] tracking-[0.5em] uppercase ${isMinted ? 'text-emerald-600' : 'text-amber-700'}`}>
                  {isMinted ? 'Sovereign Asset \u00b7 Verified & Minted on Polygon Mainnet' : 'Sovereign Asset \u00b7 Pending Claim'}
                </p>
                <p className={`text-xs font-light mt-0.5 ${isMinted ? 'text-emerald-900' : 'text-amber-900'}`}>
                  {isMinted ? 'Digital provenance immutably established \u00b7 ' + getEvolutionLabel() : 'This asset awaits sovereign claim. Connect wallet to mint.'}
                </p>
              </div>
            </div>

            {/* CLAIM SUCCESS */}
            {claimResult && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="border border-[#c9a054]/30 bg-[#080600] p-6 mb-8 text-center">
                <p className="text-[#c9a054] text-3xl mb-4">\u25c8</p>
                <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-2">Sovereign Claim Successful</p>
                <h3 className="font-serif font-light text-2xl text-zinc-200 mb-4">NFT Minted to Your Wallet</h3>
                <a href={`https://polygonscan.com/tx/${claimResult.txHash}`} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-xs text-[#c9a054] hover:underline block mb-4">
                  {claimResult.txHash.slice(0, 20)}\u2026{claimResult.txHash.slice(-8)} \u2197
                </a>
                <Link href="/vault" className="text-[8px] tracking-[0.4em] uppercase border border-[#c9a054]/30 px-6 py-3 text-[#c9a054] hover:bg-[#c9a054]/5 transition-colors inline-block">
                  Enter House Vault \u2192
                </Link>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT: NFT ARTWORK */}
              <div>
                <div className="aspect-square bg-[#080808] border border-[#1a1a1a] relative overflow-hidden mb-4">
                  {currentSerial && !artworkError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/api/nft/artwork/${encodeURIComponent(currentSerial)}`}
                      alt={`${productName} — ${currentSerial}`}
                      className="w-full h-full object-cover"
                      onError={() => setArtworkError(true)}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(201,160,84,0.08)_0%,transparent_70%)]" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <motion.div className="text-[#c9a054] text-6xl mb-6"
                          animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}>\u25c8</motion.div>
                        <p className="text-[7px] tracking-[0.6em] uppercase text-[#c9a054] mb-3">{rarityTier}</p>
                        <p className="font-serif font-light text-2xl text-zinc-200 mb-2">{productName}</p>
                        <p className="font-mono text-xs text-zinc-600">{currentSerial}</p>
                        {isMinted && tokenId !== null && (
                          <p className="font-mono text-[9px] text-zinc-700 mt-2">Token #{tokenId}</p>
                        )}
                      </div>
                      {['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map(c => (
                        <div key={c} className={`absolute w-5 h-5 border-[#c9a054]/20 ${c}`} />
                      ))}
                    </>
                  )}
                </div>

                {isMinted && tokenId !== null && (
                  <div className="flex gap-3 flex-wrap">
                    <a href={`https://polygonscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
                      className="flex-1 border border-[#1a1a1a] p-3 text-center hover:border-[#c9a054]/20 transition-colors">
                      <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-1">Polygonscan</p>
                      <p className="text-[8px] text-[#c9a054]">View Transaction \u2197</p>
                    </a>
                    <a href={`https://opensea.io/assets/matic/${CONTRACT}/${tokenId}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 border border-[#1a1a1a] p-3 text-center hover:border-[#c9a054]/20 transition-colors">
                      <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-1">OpenSea</p>
                      <p className="text-[8px] text-[#c9a054]">View on OpenSea \u2197</p>
                    </a>
                    <a href={`https://rarible.com/token/polygon/${CONTRACT}:${tokenId}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 border border-[#1a1a1a] p-3 text-center hover:border-[#c9a054]/20 transition-colors">
                      <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-1">Rarible</p>
                      <p className="text-[8px] text-[#c9a054]">View on Rarible \u2197</p>
                    </a>
                  </div>
                )}
              </div>

              {/* RIGHT: DETAILS */}
              <div className="space-y-0">
                <div className="border border-[#111]">
                  <div className="border-b border-[#111] px-5 py-3">
                    <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-700">Sovereign Asset Details</p>
                  </div>
                  <div className="divide-y divide-[#0a0a0a]">
                    {[
                      { label: 'Serial Number', value: currentSerial },
                      { label: 'Product', value: productName },
                      { label: 'Rarity Tier', value: rarityTier },
                      { label: 'NFT Status', value: asset?.nft_status || (legacy?.is_claimed ? 'minted' : 'pending') },
                      ...(tokenId !== null ? [{ label: 'Token ID', value: '#' + tokenId }] : []),
                      ...(asset?.physical_status ? [{ label: 'Physical Status', value: asset.physical_status }] : []),
                      ...(asset?.ownership_cycle !== undefined ? [{ label: 'Ownership Cycle', value: asset.ownership_cycle + 'x' }] : []),
                      { label: 'Evolution', value: getEvolutionLabel() },
                      { label: 'Blockchain', value: 'Polygon Mainnet \u00b7 ERC-721' },
                      { label: 'Royalties', value: '7.5% ERC-2981' },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between px-5 py-3">
                        <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700">{row.label}</p>
                        <p className="font-mono text-[10px] text-zinc-400 capitalize">{row.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {txHash && (
                  <div className="border border-[#111] border-t-0">
                    <div className="border-b border-[#111] px-5 py-3">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-700">Blockchain Record \u00b7 Polygon Mainnet</p>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      <div>
                        <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-1">Transaction Hash</p>
                        <a href={`https://polygonscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
                          className="font-mono text-[9px] text-[#c9a054] hover:underline break-all">{txHash}</a>
                      </div>
                      <div>
                        <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-1">Contract Address</p>
                        <a href={`https://polygonscan.com/address/${CONTRACT}`} target="_blank" rel="noopener noreferrer"
                          className="font-mono text-[9px] text-zinc-500 hover:text-[#c9a054] transition-colors break-all">{CONTRACT}</a>
                      </div>
                      {ownerWallet && (
                        <div>
                          <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-1">Current Owner</p>
                          <a href={`https://polygonscan.com/address/${ownerWallet}`} target="_blank" rel="noopener noreferrer"
                            className="font-mono text-[9px] text-zinc-500 hover:text-[#c9a054] transition-colors break-all">{ownerWallet}</a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!isMinted && !claimResult && (
                  <div className="border border-[#c9a054]/15 border-t-0 bg-[#080600]">
                    <div className="border-b border-[#c9a054]/10 px-5 py-3">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054]">Claim Sovereign Ownership</p>
                    </div>
                    <div className="px-5 py-6">
                      {!isConnected ? (
                        <div>
                          <p className="text-zinc-600 text-xs font-light leading-relaxed mb-5">
                            Connect your Polygon wallet to mint your Sovereign NFT. This permanently registers your ownership on Polygon Mainnet.
                          </p>
                          <ConnectButton label="Connect Wallet to Claim" chainStatus="none" showBalance={false} accountStatus="address" />
                        </div>
                      ) : (
                        <div>
                          <p className="text-zinc-600 text-xs font-light leading-relaxed mb-2">
                            Claiming will mint your NFT to:
                          </p>
                          <p className="font-mono text-[9px] text-zinc-500 mb-5 break-all">{address}</p>
                          {error && (
                            <p className="text-red-700 text-xs mb-4 border border-red-900/30 p-3">{error}</p>
                          )}
                          <button onClick={handleClaim} disabled={claiming}
                            className="group relative w-full inline-flex items-center justify-center py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden disabled:opacity-40">
                            <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                            <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                              {claiming ? 'Minting on Polygon\u2026' : 'Claim Sovereign NFT \u2192'}
                            </span>
                          </button>
                          {claiming && (
                            <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-700 mt-3 text-center animate-pulse">
                              Uploading to IPFS \u2192 Minting on Polygon \u2192 Awaiting confirmation\u2026
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isMinted && (
                  <div className="border border-[#c9a054]/10 border-t-0 p-5">
                    <p className="text-zinc-600 text-xs font-light mb-4">Access your House Vault to unlock exclusive privileges, concierge services, and view your full sovereign portfolio.</p>
                    <Link href="/vault"
                      className="group relative w-full inline-flex items-center justify-center py-4 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
                      <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                      <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Enter House Vault \u2192</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* PROVENANCE TIMELINE */}
            {provenance.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="mt-12 border border-[#111]"
              >
                <div className="border-b border-[#111] px-5 py-4">
                  <p className="text-[7px] tracking-[0.55em] uppercase text-zinc-700">Provenance Timeline \u00b7 On-Chain Transfer History</p>
                </div>
                <div className="divide-y divide-[#0a0a0a]">
                  {provenance.map((entry, idx) => (
                    <div key={entry.id} className="px-5 py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                      <div className="flex-shrink-0">
                        <span className={`text-[7px] tracking-[0.4em] uppercase ${idx === 0 ? 'text-[#c9a054]' : 'text-zinc-700'}`}>
                          {idx === 0 ? 'Genesis' : 'Transfer ' + idx}
                        </span>
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                        <div>
                          <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-800 mb-1">From</p>
                          <p className="font-mono text-[9px] text-zinc-600">{shortAddress(entry.previous_owner)}</p>
                        </div>
                        <div>
                          <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-800 mb-1">To</p>
                          <p className="font-mono text-[9px] text-zinc-400">{shortAddress(entry.new_owner)}</p>
                        </div>
                        <div>
                          <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-800 mb-1">Physical Status</p>
                          <p className="font-mono text-[9px] text-zinc-600 capitalize">{entry.physical_shipment_status || 'vaulted'}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <a href={`https://polygonscan.com/tx/${entry.transfer_tx_hash}`} target="_blank" rel="noopener noreferrer"
                          className="font-mono text-[8px] text-[#c9a054] hover:underline">
                          {entry.transfer_tx_hash?.slice(0, 10)}\u2026\u2197
                        </a>
                        <p className="text-[7px] text-zinc-800 mt-0.5">
                          {new Date(entry.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.section>
        )}

        {/* BOTTOM INFO */}
        <section className="border-t border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '\u25c8', title: 'Polygon Mainnet', desc: 'All Shamim Forever sovereign assets are registered on Polygon Mainnet — permanent, immutable, globally verifiable.' },
              { icon: '\u25c7', title: 'ERC-2981 Royalties', desc: 'Every secondary market transaction automatically routes a 7.5% royalty back to The House — ensuring perpetual provenance.' },
              { icon: '\u25c9', title: 'House Vault Access', desc: 'Verified NFT holders access the private Vault — concierge, refills, atelier footage, and VVIP drops.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, ease }}
                className="border border-[#0a0a0a] p-6 hover:border-[#1a1a1a] transition-colors duration-500">
                <p className="text-[#c9a054] text-xl mb-4">{item.icon}</p>
                <h3 className="font-serif font-light text-base text-zinc-300 mb-3 tracking-wide">{item.title}</h3>
                <p className="text-zinc-700 text-xs font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  export default function AuthenticatePage() {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <p className="text-[#c9a054] text-2xl">\u25c8</p>
          </motion.div>
        </div>
      }>
        <AuthenticateContent />
      </Suspense>
    )
  }
  