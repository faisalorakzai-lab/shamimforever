'use client'

  import { motion } from 'framer-motion'

  interface Product {
    id: string
    name: string
    price_pkr: number
  }

  const isSovereign = (price_pkr: number) => price_pkr >= 45000

  function getSerial(id: string): string {
    const hash = id.replace(/-/g, '').slice(0, 8).toUpperCase()
    return `SF-${hash}`
  }

  function getRarityTier(price_pkr: number): string {
    if (price_pkr >= 150000) return 'SOVEREIGN VAULT'
    if (price_pkr >= 45000) return 'SIGNATURE RESERVE'
    return 'HERITAGE EDITION'
  }

  // ─── Small badge for product cards ──────────────────────────────────────────
  export function NftCardBadge({ price_pkr }: { price_pkr: number }) {
    if (isSovereign(price_pkr)) {
      return (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-1 text-[6px] tracking-[0.3em] uppercase border border-[#c9a054]/50 text-[#c9a054] px-1.5 py-0.5 bg-[#c9a054]/5"
        >
          ◆ NFT
        </motion.span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 text-[6px] tracking-[0.3em] uppercase border border-zinc-700/40 text-zinc-600 px-1.5 py-0.5">
        ◇ NFT
      </span>
    )
  }

  // ─── Full NFT section for product detail page ────────────────────────────────
  export default function NftBadge({ product }: { product: Product }) {
    const sovereign = isSovereign(product.price_pkr)
    const serial = getSerial(product.id)
    const tier = getRarityTier(product.price_pkr)

    if (!sovereign) {
      return (
        <div className="space-y-5">
          <p className="text-zinc-500 font-light leading-[2] text-sm">
            Every creation from House of Shamim Forever includes a Digital Twin NFT on Polygon — a permanent on-chain record of your sovereign ownership. Minted automatically on crypto purchase.
          </p>

          <div className="border border-zinc-800/60 p-5 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-[#111]">
              <span className="text-zinc-600 text-xl">◇</span>
              <div>
                <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-400">Heritage NFT Included</p>
                <p className="text-[7px] tracking-[0.2em] uppercase text-zinc-700 mt-0.5">Polygon Mainnet · ERC-721</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {([
                ['Network', 'Polygon'],
                ['Token Standard', 'ERC-721'],
                ['Auto-Mint', 'On Crypto Purchase'],
                ['Royalty', '7.5%'],
                ['Marketplace', 'OpenSea'],
                ['Transfer', 'Allowed'],
              ] as [string, string][]).map(([label, val]) => (
                <div key={label} className="bg-[#080808] px-3 py-2.5">
                  <p className="text-[6px] tracking-[0.35em] uppercase text-zinc-700 mb-1">{label}</p>
                  <p className="text-zinc-400 text-[9px] font-light">{val}</p>
                </div>
              ))}
            </div>

            <p className="text-[7px] tracking-[0.25em] text-zinc-700 uppercase pt-2 border-t border-[#0d0d0d]">
              ◇ Serial number assigned at checkout · Viewable on OpenSea after mint
            </p>
          </div>
        </div>
      )
    }

    // ─── Sovereign / Signature NFT Certificate ──────────────────────────────────
    return (
      <div className="space-y-5">
        <p className="text-zinc-500 font-light leading-[2] text-sm">
          This is a <span className="text-[#c9a054]">{tier}</span> creation — a collector-grade physical piece paired with an authenticated NFT Digital Twin on Polygon. Your serial number is permanently recorded on-chain.
        </p>

        {/* Animated sovereign certificate */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden border border-[#c9a054]/25 bg-gradient-to-br from-[#0d0b07] via-[#090806] to-[#050505]"
        >
          {/* Sweep shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: '-100%' }}
            animate={{ x: '250%' }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: 'linear' }}
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,160,84,0.07), transparent)', width: '40%' }}
          />

          {/* Corner marks */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#c9a054]/60" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#c9a054]/60" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#c9a054]/60" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#c9a054]/60" />

          <div className="p-6 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[6px] tracking-[0.5em] uppercase text-[#c9a054]/60 mb-1.5">House of Shamim Forever</p>
                <p className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Sovereign Digital Certificate</p>
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[#c9a054] text-2xl leading-none"
              >
                ◆
              </motion.div>
            </div>

            {/* Serial */}
            <div className="border-y border-[#c9a054]/10 py-4">
              <p className="text-[6px] tracking-[0.5em] uppercase text-zinc-700 mb-2">Serial Number</p>
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, letterSpacing: '0.2em' }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-mono text-[#c9a054] text-xl"
              >
                {serial}
              </motion.p>
              <p className="text-[6px] tracking-[0.3em] uppercase text-zinc-800 mt-1.5">Assigned on purchase</p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-2">
              {([
                ['Rarity Tier', tier],
                ['Network', 'Polygon'],
                ['Token Standard', 'ERC-721'],
                ['Royalty', '7.5%'],
                ['Authentication', 'NFT Passport'],
                ['Marketplace', 'OpenSea'],
              ] as [string, string][]).map(([label, val]) => (
                <div key={label} className="bg-[#0a0806]/80 px-3 py-2.5 border border-[#c9a054]/5">
                  <p className="text-[6px] tracking-[0.35em] uppercase text-zinc-700 mb-1">{label}</p>
                  <p className="text-zinc-200 text-[9px] font-light">{val}</p>
                </div>
              ))}
            </div>

            {/* Live status */}
            <div className="flex items-center justify-between pt-2 border-t border-[#c9a054]/8">
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
                <p className="text-[6px] tracking-[0.35em] uppercase text-zinc-600">Polygon Active · Transferable</p>
              </div>
              <p className="text-[6px] tracking-[0.25em] uppercase text-zinc-800">Blockchain Verified</p>
            </div>
          </div>
        </motion.div>

        <p className="text-[7px] tracking-[0.25em] text-zinc-700 uppercase">
          ◆ Serial permanently engraved on your physical certificate · Viewable on OpenSea post-mint
        </p>
      </div>
    )
  }
  