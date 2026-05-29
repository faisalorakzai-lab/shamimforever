'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Copy, Check, Wallet, ShieldCheck, ExternalLink } from 'lucide-react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseUnits } from 'viem'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/types'

const ease = [0.16, 1, 0.3, 1] as const

const MERCHANT_WALLET = '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7' as const
const NFT_CONTRACT   = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640' as const
const DEPLOY_TX      = '0x00d4c75acdc3e3bed45731e120d2ffceffe450e7585c5cd7e9f7ed670cdefff2' as const
const OKBOND_DISCOUNT = 0.10

const TOKEN_META = {
  USDT:   { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as const, decimals: 6 },
  USDC:   { address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' as const, decimals: 6 },
  OKBOND: { address: '0xc89729DA02a8c2E282EC3070A9a680E01bE2E22F' as const, decimals: 18 },
} as const

const ERC20_ABI = [{
  name: 'transfer', type: 'function' as const, stateMutability: 'nonpayable' as const,
  inputs: [{ name: 'recipient', type: 'address' }, { name: 'amount', type: 'uint256' }],
  outputs: [{ name: '', type: 'bool' }],
}]

type CoinType = keyof typeof TOKEN_META

function CopyBtn({ text, short }: { text: string; short?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text); setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])
  return (
    <button onClick={copy} className="flex items-center gap-1.5 text-[#c9a054] hover:text-zinc-100 transition-colors shrink-0">
      {copied ? <Check size={10} /> : <Copy size={10} />}
      <span className="text-[7px] tracking-[0.3em] uppercase">{copied ? 'Copied' : (short ?? 'Copy')}</span>
    </button>
  )
}

function PyramidLayer({ label, sub, value, width, delay }: {
  label: string; sub: string; value: string; width: string; delay: number
}) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease }} className="flex gap-5 items-stretch">
      <div className="w-20 shrink-0 flex flex-col justify-center">
        <p className="text-[7px] tracking-[0.25em] uppercase text-[#c9a054]">{label}</p>
        <p className="text-[6px] tracking-[0.2em] uppercase text-zinc-600">{sub}</p>
      </div>
      <div className={`${width} bg-gradient-to-r from-[#c9a054]/15 to-transparent border-l-2 border-[#c9a054] px-4 py-3`}>
        <p className="text-zinc-300 text-xs font-light leading-relaxed">{value}</p>
      </div>
    </motion.div>
  )
}

function Web3PayBlock({ priceUsd, onSuccess }: {
  priceUsd: number
  onSuccess: (txHash: string, coin: CoinType) => void
}) {
  const [coin, setCoin] = useState<CoinType>('USDT')
  const [step, setStep] = useState<'idle' | 'sending' | 'confirming' | 'done' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')
  const [localTx, setLocalTx] = useState<`0x${string}` | undefined>()

  const { address, isConnected } = useAccount()
  const { writeContract, isPending: isSending } = useWriteContract()
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: localTx })

  const discount = coin === 'OKBOND' ? OKBOND_DISCOUNT : 0
  const finalUsd = priceUsd * (1 - discount)
  const token = TOKEN_META[coin]
  const tokenAmount = parseUnits(finalUsd.toFixed(2), token.decimals)

  if (isConfirmed && localTx && step !== 'done') {
    setStep('done')
    onSuccess(localTx, coin)
  }

  function handlePay() {
    if (!isConnected || !address) return
    setErrMsg(''); setStep('sending')
    writeContract({
      address: token.address, abi: ERC20_ABI, functionName: 'transfer',
      args: [MERCHANT_WALLET, tokenAmount],
    }, {
      onSuccess: (hash) => { setLocalTx(hash); setStep('confirming') },
      onError: (err) => { setErrMsg(err.message?.split('\n')[0] ?? 'Transaction failed'); setStep('error') },
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-0 border border-[#1a1a1a]">
        {(Object.keys(TOKEN_META) as CoinType[]).map(c => (
          <button key={c} onClick={() => { setCoin(c); setStep('idle') }}
            className={`flex-1 py-3 text-[8px] tracking-[0.2em] uppercase transition-all duration-300 border-b-2 ${coin === c ? 'text-[#c9a054] border-b-[#c9a054] bg-[#c9a054]/5' : 'text-zinc-600 border-b-transparent hover:text-zinc-400'}`}>
            {c}{c === 'OKBOND' ? ' −10%' : ''}
          </button>
        ))}
      </div>
      <div className="p-4 bg-[#0a0a0a] border border-[#1a1a1a]">
        <div className="flex justify-between items-center">
          <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-600">You Pay</p>
          <div className="text-right">
            <p className="text-zinc-100 font-light text-lg">{finalUsd.toFixed(2)} {coin}</p>
            {coin === 'OKBOND' && (
              <p className="text-[8px] tracking-[0.25em] uppercase text-[#c9a054]">10% Sovereign Discount Applied</p>
            )}
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[#111] space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700">Recipient</p>
            <div className="flex items-center gap-2">
              <p className="text-zinc-500 text-[9px] font-mono">{MERCHANT_WALLET.slice(0,8)}...{MERCHANT_WALLET.slice(-6)}</p>
              <CopyBtn text={MERCHANT_WALLET} short="Copy" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700">Network</p>
            <p className="text-zinc-500 text-[9px]">Polygon Mainnet</p>
          </div>
        </div>
      </div>
      {!isConnected ? (
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button onClick={openConnectModal}
              className="w-full py-4 flex items-center justify-center gap-3 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all duration-500">
              <Wallet size={14} /> Connect Wallet to Pay
            </button>
          )}
        </ConnectButton.Custom>
      ) : step === 'idle' || step === 'error' ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-500">
              {address?.slice(0,6)}...{address?.slice(-4)}
            </p>
          </div>
          {errMsg && <p className="text-red-400/80 text-[9px] px-1">{errMsg}</p>}
          <button onClick={handlePay} disabled={isSending}
            className="w-full py-4 flex items-center justify-center gap-3 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all duration-500 disabled:opacity-50">
            <ShieldCheck size={14} />
            {isSending ? 'Approve in Wallet...' : `Pay ${finalUsd.toFixed(2)} ${coin}`}
          </button>
        </div>
      ) : step === 'confirming' ? (
        <div className="p-5 border border-[#c9a054]/20 bg-[#c9a054]/5 text-center space-y-3">
          <div className="w-6 h-6 border-2 border-[#c9a054] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054]">Confirming on Polygon...</p>
          {localTx && (
            <a href={`https://polygonscan.com/tx/${localTx}`} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 text-[7px] tracking-[0.25em] uppercase text-zinc-600 hover:text-zinc-400 transition-colors">
              View on PolygonScan <ExternalLink size={9} />
            </a>
          )}
        </div>
      ) : (
        <div className="p-5 border border-[#c9a054]/30 bg-[#c9a054]/8 text-center space-y-3">
          <p className="text-[#c9a054] text-2xl">◆</p>
          <p className="text-[9px] tracking-[0.45em] uppercase text-[#c9a054]">Sovereign Payment Confirmed</p>
          {localTx && (
            <a href={`https://polygonscan.com/tx/${localTx}`} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 text-[8px] tracking-[0.25em] uppercase text-zinc-400 hover:text-zinc-200 transition-colors">
              Verify on PolygonScan <ExternalLink size={10} />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

const ARCHIVE_COMPOSITIONS = [
  {
    name: 'SHAMIM BLOOM',
    title: 'The Sovereign Grace',
    desc: 'A legendary Taif Rose masterpiece sculpted for timeless femininity and emotional permanence.',
  },
  {
    name: 'QUEEN OF TAIF',
    title: 'The Crown of Eternal Femininity',
    desc: 'An aristocratic rose empire infused with saffron silk and royal oud warmth.',
  },
  {
    name: 'ETERNAL EMPRESS',
    title: 'The Absolute Feminine Throne',
    desc: 'A ceremonial feminine authority composition engineered around imperial white rose and golden amber resin.',
  },
  {
    name: 'PRIVATE VAULT ELIXIR',
    title: 'Exclusive Collector Oil',
    desc: 'A hand-numbered concentrated extrait unavailable outside the vault allocation.',
  },
]

const PERFORMANCE_MATRIX = [
  { label: 'Collection Type',       value: 'Ultra-Luxury Feminine Archive' },
  { label: 'Total Pieces',          value: '4 Sovereign Fragrance Artifacts' },
  { label: 'Concentration',         value: 'Extrait de Parfum' },
  { label: 'Longevity',             value: '18–36+ Hours Layered Presence' },
  { label: 'Projection',            value: 'Cinematic Feminine Aura' },
  { label: 'Allocation Structure',  value: 'Hand-Numbered Collector Release' },
  { label: 'Ownership Tier',        value: 'Founder Sovereign' },
  { label: 'Production Philosophy', value: 'Museum-Grade Small-Batch Craftsmanship' },
  { label: 'Authentication',        value: 'Polygon Sovereign Verified' },
]

const HOLDER_PRIVILEGES = [
  'Founder Sovereign Access',
  'Priority Reserve Allocations',
  'Invitation-Only House Ceremonies',
  'Private Jewelry Archive Previews',
  'Sovereign Refill Privileges',
  'Concierge Restoration Services',
  'Early NFT Archive Access',
  'Blockchain Provenance Protection',
  'Lifetime Authentication Registry',
  'Collector-Tier House Recognition',
]

const NFT_TRAITS = [
  { label: 'NFT Name',            value: 'House of Shamim — Her Legacy Vault' },
  { label: 'Category',            value: 'Sovereign Luxury Archive' },
  { label: 'Collection',          value: 'Her Legacy Vault' },
  { label: 'Rarity Tier',         value: 'GRAND FOUNDERS' },
  { label: 'Authentication',      value: 'Polygon Verified' },
  { label: 'Ownership Status',    value: 'Active Sovereign Passport' },
  { label: 'Physical Pairing',    value: 'Yes' },
  { label: 'Concierge Access',    value: 'Enabled' },
  { label: 'Production',          value: 'Ultra Limited' },
  { label: 'Craftsmanship Origin', value: 'Karachi Sovereign Atelier' },
  { label: 'Archive Status',      value: 'Grand Sovereign Reserve' },
  { label: 'Contract',            value: `${NFT_CONTRACT.slice(0,10)}...${NFT_CONTRACT.slice(-6)}` },
]

export default function HerLegacyVaultPage({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'story' | 'archive' | 'nft' | 'buy'>('story')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [txHashFinal, setTxHashFinal] = useState('')

  const [custName, setCustName] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [custAddress, setCustAddress] = useState('')
  const [custCity, setCustCity] = useState('')

  const images = product.images ?? []

  const handleWeb3Success = useCallback(async (txHash: string, coin: CoinType) => {
    setTxHashFinal(txHash)
    try {
      const { data: order } = await supabase.from('orders').insert([{
        status: 'confirmed',
        payment_method: coin.toLowerCase(),
        payment_status: 'paid',
        total_pkr: product.price_pkr,
        total_usd: parseFloat((product.price_usd * (coin === 'OKBOND' ? 0.9 : 1)).toFixed(2)),
        discount_applied: coin === 'OKBOND' ? 10 : 0,
        shipping_address: { name: custName, phone: custPhone, line1: custAddress, city: custCity, country: 'Pakistan' },
        notes: `Crypto TX: ${txHash} | Coin: ${coin} | House of Shamim — Her Legacy Vault`,
      }]).select().single()
      if (order) {
        await supabase.from('order_items').insert([{
          order_id: order.id, product_id: product.id,
          quantity: 1, price_pkr: product.price_pkr, price_usd: product.price_usd,
        }])
      }
    } catch {
      // best effort
    }
    setOrderPlaced(true)
  }, [custName, custPhone, custAddress, custCity, product])

  if (orderPlaced) return (
    <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease }} className="text-center max-w-lg">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }} className="font-serif text-7xl text-[#c9a054] mb-8">◆</motion.p>
        <h2 className="font-serif text-3xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-3">
          Sovereign Order Confirmed
        </h2>
        <p className="font-serif italic text-zinc-500 mb-8">
          Your Her Legacy Vault is sealed and awaiting royal dispatch
        </p>
        {txHashFinal && (
          <div className="mb-8 p-4 border border-[#c9a054]/20 bg-[#c9a054]/5">
            <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-600 mb-2">Blockchain Proof</p>
            <a href={`https://polygonscan.com/tx/${txHashFinal}`} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 text-[9px] tracking-[0.25em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors">
              Verify on PolygonScan <ExternalLink size={11} />
            </a>
          </div>
        )}
        <Link href="/shop"
          className="text-[9px] tracking-[0.4em] uppercase text-zinc-400 border border-zinc-800 px-8 py-3 hover:text-[#c9a054] hover:border-[#c9a054]/40 transition-all">
          Return to House
        </Link>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050505] pt-20">
      {/* Breadcrumb */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-8 border-b border-[#111]">
        <nav className="flex items-center gap-3 text-[7px] tracking-[0.4em] uppercase">
          <Link href="/shop" className="text-zinc-700 hover:text-zinc-400 transition-colors">House</Link>
          <span className="text-zinc-800">·</span>
          <Link href="/shop" className="text-zinc-700 hover:text-zinc-400 transition-colors">Perfumes</Link>
          <span className="text-zinc-800">·</span>
          <Link href="/shop" className="text-zinc-700 hover:text-zinc-400 transition-colors">For Her</Link>
          <span className="text-zinc-800">·</span>
          <span className="text-[#c9a054]">Her Legacy Vault</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">

          {/* Left — Images */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease }} className="space-y-4">
            <div className="relative aspect-square bg-[#080808] border border-[#111] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img key={activeImage}
                  initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }}
                  src={images[activeImage] ?? '/products/her-legacy-vault/vault-hero.png'}
                  alt="Her Legacy Vault"
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImage(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 border border-[#1a1a1a] text-zinc-400 hover:text-[#c9a054] transition-colors">
                    <ChevronLeft size={14} />
                  </button>
                  <button onClick={() => setActiveImage(i => (i + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 border border-[#1a1a1a] text-zinc-400 hover:text-[#c9a054] transition-colors">
                    <ChevronRight size={14} />
                  </button>
                </>
              )}
              {/* Grand Sovereign Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/80 border border-[#c9a054]/40">
                <p className="text-[6px] tracking-[0.5em] uppercase text-[#c9a054]">Grand Sovereign</p>
              </div>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 border overflow-hidden transition-all ${activeImage === i ? 'border-[#c9a054]/60' : 'border-[#111] opacity-50 hover:opacity-80'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            {/* Vault Inscription */}
            <div className="border border-[#c9a054]/15 bg-[#080808] p-5">
              <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] mb-1">The Vault Inscription</p>
              <p className="font-serif italic text-zinc-400 text-sm leading-relaxed">
                &ldquo;Beauty fades. Legacy does not.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right — Details */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease }} className="space-y-8">

            {/* Header */}
            <div className="space-y-3 pb-6 border-b border-[#111]">
              <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-600">Perfume · For Her · Grand Sovereign</p>
              <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-[0.1em] text-zinc-100 leading-tight">
                House of Shamim<br />
                <span className="text-[#c9a054]">Her Legacy Vault</span>
              </h1>
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-600">The Eternal Feminine Archive</p>
              <div className="flex items-baseline gap-4 pt-2">
                <p className="font-serif text-3xl font-light text-zinc-100">Rs 150,000</p>
                <p className="text-zinc-500 text-sm font-light">$540 USD</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a054]" />
                <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600">
                  Ultra-Limited Collector Release · Polygon Verified
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b border-[#111]">
              {(['story', 'archive', 'nft', 'buy'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-[7px] tracking-[0.35em] uppercase transition-all border-b-2 -mb-px ${
                    activeTab === tab ? 'text-[#c9a054] border-[#c9a054]' : 'text-zinc-600 border-transparent hover:text-zinc-400'
                  }`}>
                  {tab === 'story' ? 'Legacy' : tab === 'archive' ? 'Archive' : tab === 'nft' ? 'NFT' : 'Acquire'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">

                {activeTab === 'story' && (
                  <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-8">
                    <div>
                      <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-3">
                        Chapter I — The Legacy Statement
                      </p>
                      <p className="text-zinc-500 text-xs font-light leading-[2]">
                        Some luxuries are purchased. Some luxuries are inherited. But certain creations transcend
                        ownership itself and become emotional bloodlines passed through generations.
                      </p>
                    </div>
                    <div>
                      <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-3">
                        Chapter II — The Philosophy
                      </p>
                      <p className="text-zinc-500 text-xs font-light leading-[2]">
                        Her Legacy Vault was conceived as the highest ceremonial feminine archive within the House
                        of Shamim Forever — a sovereign collection engineered not as a single fragrance, but as an
                        eternal preservation of feminine identity. Inside the House, beauty is not treated as
                        cosmetic enhancement. It is treated as legacy architecture.
                      </p>
                    </div>
                    <div>
                      <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-3">
                        Chapter III — The Scent Architecture
                      </p>
                      <div className="space-y-2">
                        <PyramidLayer label="SOVEREIGN FLORALS" sub="Heritage Layer"
                          value="Taif Rose Absolute · Imperial White Rose · Velvet Peony Silk"
                          width="w-2/3" delay={0} />
                        <PyramidLayer label="IMPERIAL HEART" sub="Core Layer"
                          value="White Ambergris · Royal Saffron Nectar · Warm Skin Musk"
                          width="w-4/5" delay={0.1} />
                        <PyramidLayer label="ETERNAL FOUNDATION" sub="Legacy Base"
                          value="Cashmere Woods · Golden Amber Resin"
                          width="w-full" delay={0.2} />
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-3">
                        The Vault Experience
                      </p>
                      <p className="text-zinc-500 text-xs font-light leading-[2]">
                        Opening the Her Legacy Vault feels less like unboxing luxury and more like entering a
                        private sovereign archive. The experience unfolds in ceremonial layers — first comes silence,
                        then velvet, then gold, then fragrance. The exterior is sculpted from matte obsidian-black
                        architectural lacquer finished with engraved royal gold insignia. The interior reveals layered
                        blush velvet chambers illuminated by integrated warm ambient lighting.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'archive' && (
                  <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6">
                    <div>
                      <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-1">
                        Chapter IV — The Archive of Her Presence
                      </p>
                      <p className="text-zinc-600 text-[9px] font-light leading-[2] italic mb-5">
                        &ldquo;True femininity does not disappear. It echoes through generations.&rdquo;
                      </p>
                    </div>
                    <div className="space-y-3">
                      {ARCHIVE_COMPOSITIONS.map((comp, i) => (
                        <motion.div key={comp.name}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, ease }}
                          className="border border-[#111] bg-[#080808] p-5">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <p className="text-[7px] tracking-[0.4em] uppercase text-[#c9a054] mb-0.5">{comp.name}</p>
                              <p className="font-serif text-zinc-300 text-sm font-light">{comp.title}</p>
                            </div>
                            <span className="text-[#c9a054]/40 text-lg font-serif shrink-0">◆</span>
                          </div>
                          <p className="text-zinc-600 text-[10px] font-light leading-relaxed">{comp.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="border border-[#c9a054]/15 bg-[#080808] p-5 mt-4">
                      <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-4">Performance Matrix</p>
                      {PERFORMANCE_MATRIX.map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-center py-3 border-b border-[#0d0d0d] last:border-0">
                          <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-600">{label}</p>
                          <p className="text-zinc-300 text-[10px] font-light text-right max-w-[55%]">{value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'nft' && (
                  <motion.div key="nft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6">
                    <div>
                      <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-3">Digital Sovereign Passport</p>
                      <p className="text-zinc-500 text-xs font-light leading-[2]">
                        Every Her Legacy Vault allocation is permanently paired with a sovereign blockchain identity
                        recorded on Polygon Mainnet. The NFT passport certifies authenticity, ownership, provenance,
                        archive allocation, collector status, rarity structure, and sovereign privileges. The physical
                        vault may travel through generations. The sovereign registry remains eternal.
                      </p>
                    </div>
                    <div className="border border-[#c9a054]/15 bg-[#080808]">
                      <div className="px-5 py-4 border-b border-[#111]">
                        <p className="text-[7px] tracking-[0.45em] uppercase text-[#c9a054]">
                          Sovereign Blockchain Certificate
                        </p>
                      </div>
                      <div className="px-5 py-2">
                        {NFT_TRAITS.map(({ label, value }) => (
                          <div key={label} className="flex justify-between items-center py-3.5 border-b border-[#0a0a0a] last:border-0">
                            <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-600">{label}</p>
                            <p className="text-zinc-300 text-[10px] font-light">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border border-[#111] bg-[#050505]">
                        <div>
                          <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-600 mb-0.5">NFT Contract</p>
                          <p className="text-zinc-400 text-[9px] font-mono">{NFT_CONTRACT.slice(0,12)}...{NFT_CONTRACT.slice(-6)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <CopyBtn text={NFT_CONTRACT} />
                          <a href={`https://polygonscan.com/address/${NFT_CONTRACT}`} target="_blank" rel="noreferrer"
                            className="text-zinc-600 hover:text-[#c9a054] transition-colors">
                            <ExternalLink size={11} />
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-[#111] bg-[#050505]">
                        <div>
                          <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-600 mb-0.5">Deploy Transaction</p>
                          <p className="text-zinc-400 text-[9px] font-mono">{DEPLOY_TX.slice(0,12)}...{DEPLOY_TX.slice(-6)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <CopyBtn text={DEPLOY_TX} />
                          <a href={`https://polygonscan.com/tx/${DEPLOY_TX}`} target="_blank" rel="noreferrer"
                            className="text-zinc-600 hover:text-[#c9a054] transition-colors">
                            <ExternalLink size={11} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-4">
                        Sovereign Holder Privileges
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {HOLDER_PRIVILEGES.map((priv) => (
                          <div key={priv} className="flex items-center gap-2 p-2.5 border border-[#111]">
                            <span className="text-[#c9a054] text-[8px] shrink-0">◆</span>
                            <span className="text-[7px] tracking-[0.2em] uppercase text-zinc-500">{priv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'buy' && (
                  <motion.div key="buy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6">
                    <div>
                      <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 mb-3">Delivery Details</p>
                      <div className="space-y-2">
                        {([
                          { v: custName,    s: setCustName,    ph: 'Full Name *' },
                          { v: custPhone,   s: setCustPhone,   ph: 'Phone Number *' },
                          { v: custAddress, s: setCustAddress, ph: 'Delivery Address *' },
                          { v: custCity,    s: setCustCity,    ph: 'City *' },
                        ] as { v: string; s: (x: string) => void; ph: string }[]).map(({ v, s, ph }) => (
                          <input key={ph} value={v} onChange={e => s(e.target.value)} placeholder={ph}
                            className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 placeholder:text-zinc-700 focus:border-[#c9a054]/30 focus:outline-none transition-colors" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 mb-3">
                        Pay with Crypto · Polygon Network
                      </p>
                      <Web3PayBlock
                        priceUsd={product.price_usd}
                        onSuccess={handleWeb3Success}
                      />
                    </div>
                    <div className="pt-4 border-t border-[#0d0d0d]">
                      <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-2">Sovereign Acquisition</p>
                      <p className="text-[7px] tracking-[0.25em] uppercase text-zinc-700 leading-[2]">
                        Acquire The Legacy Vault · Authenticate Sovereign Archive · Enter The Founder Chamber
                      </p>
                    </div>
                    <p className="text-[7px] tracking-[0.25em] uppercase text-zinc-700 text-center">
                      Secure · Blockchain Verified · Polygon Mainnet · Royal Dispatch
                    </p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
