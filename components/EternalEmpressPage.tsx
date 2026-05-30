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

function ScentPyramidLayer({ label, sub, notes, mood, width, delay }: {
  label: string; sub: string; notes: string[]; mood: string; width: string; delay: number
}) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease }} className="flex gap-5 items-stretch">
      <div className="w-24 shrink-0 flex flex-col justify-center">
        <p className="text-[7px] tracking-[0.25em] uppercase text-[#c9a054]">{label}</p>
        <p className="text-[6px] tracking-[0.2em] uppercase text-zinc-600">{sub}</p>
      </div>
      <div className={`${width} bg-gradient-to-r from-[#c9a054]/15 to-transparent border-l-2 border-[#c9a054] px-4 py-3 space-y-2`}>
        <div className="flex flex-wrap gap-2">
          {notes.map((n, i) => (
            <span key={i} className="text-[8px] tracking-[0.2em] uppercase text-zinc-300 border border-[#c9a054]/20 px-2 py-0.5">{n}</span>
          ))}
        </div>
        <p className="text-zinc-600 text-[7px] tracking-[0.2em] italic">{mood}</p>
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

const PERFORMANCE_MATRIX = [
  { label: 'Classification',        value: 'Sovereign Feminine Extrait' },
  { label: 'Volume Allocation',     value: '100ML — 3.4 FL. OZ.' },
  { label: 'Concentration',         value: 'Extrait de Parfum' },
  { label: 'Longevity',             value: '16–24+ Hours' },
  { label: 'Projection',            value: 'Regal Atmospheric Aura' },
  { label: 'Sillage',               value: 'Velvet Command Presence' },
  { label: 'Production Structure',  value: 'Imperial Sovereign Allocation' },
  { label: 'Batch Philosophy',      value: 'Ultra-Limited Small-Batch Perfumery' },
  { label: 'Gender Identity',       value: 'Feminine Royal Luxury' },
  { label: 'Authentication',        value: 'Polygon Verified' },
  { label: 'Ideal Environment',     value: 'Royal Gatherings · Gala Evenings · Ceremonial Luxury' },
]

const HOLDER_PRIVILEGES = [
  'Imperial Founder Access',
  'Sovereign Vault Privileges',
  'Future Reserve Allocations',
  'Invitation-Only House Ceremonies',
  'Private Jewelry Archive Access',
  'Concierge Restoration Privileges',
  'Refill & Preservation Services',
  'Blockchain Provenance Protection',
  'Priority Sovereign NFT Drops',
  'Founder-Level Collector Status',
  'Lifetime Authentication Privileges',
]

const NFT_TRAITS = [
  { label: 'NFT Name',             value: 'Eternal Empress — Imperial Sovereign Edition' },
  { label: 'Category',             value: 'Sovereign Fragrance Artifact' },
  { label: 'Collection',           value: 'Eternal Empress' },
  { label: 'Rarity Tier',          value: 'IMPERIAL FOUNDERS' },
  { label: 'Authentication',       value: 'Polygon Verified' },
  { label: 'Ownership Status',     value: 'Active Sovereign Passport' },
  { label: 'Physical Pairing',     value: 'Yes' },
  { label: 'Concierge Access',     value: 'Enabled' },
  { label: 'Production Allocation',value: 'Ultra Limited' },
  { label: 'Craftsmanship Origin', value: 'Karachi Sovereign Atelier' },
  { label: 'Archive Status',       value: 'Imperial Reserve' },
  { label: 'Contract',             value: `${NFT_CONTRACT.slice(0,10)}...${NFT_CONTRACT.slice(-6)}` },
]

const LEGACY_QUALITIES = [
  'ceremonial femininity',
  'sovereign intelligence',
  'inherited power',
  'emotional permanence',
  'imperial elegance',
  'cinematic authority',
]

const ATMOSPHERIC_QUALITIES = [
  'cinematic softness',
  'velvet authority',
  'addictive warmth',
  'unforgettable emotional gravity',
  'royal femininity engineered into memory',
]

export default function EternalEmpressPage({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'story' | 'scent' | 'nft' | 'buy'>('story')
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
        notes: `Crypto TX: ${txHash} | Coin: ${coin} | Eternal Empress — Imperial Sovereign Edition`,
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
          Imperial Order Confirmed
        </h2>
        <p className="font-serif italic text-zinc-500 mb-8">
          Your Eternal Empress is sealed within the Imperial Vault awaiting sovereign dispatch
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
          <span className="text-[#c9a054]">Eternal Empress</span>
        </nav>
      </div>

      {/* Archive Banner */}
      <div className="border-b border-[#c9a054]/10 bg-[#c9a054]/3 py-2">
        <p className="text-center text-[7px] tracking-[0.6em] uppercase text-[#c9a054]/60">
          Imperial Sovereign Allocation — Archive III &nbsp;·&nbsp; Ultra-Limited Imperial Batch &nbsp;·&nbsp; Polygon Verified
        </p>
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
                  alt="Eternal Empress"
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
              {/* Imperial Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/80 border border-[#c9a054]/40">
                <p className="text-[6px] tracking-[0.5em] uppercase text-[#c9a054]">Imperial Sovereign</p>
              </div>
              {/* Archive Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/80 border border-zinc-800">
                <p className="text-[6px] tracking-[0.5em] uppercase text-zinc-600">Archive III</p>
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
            {/* Empress Inscription */}
            <div className="border border-[#c9a054]/15 bg-[#080808] p-5">
              <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] mb-1">The Imperial Inscription</p>
              <p className="font-serif italic text-zinc-400 text-sm leading-relaxed">
                &ldquo;Power wrapped in elegance becomes eternal.&rdquo;
              </p>
            </div>

            {/* Flacon Architecture */}
            <div className="border border-[#111] bg-[#060606] p-6 space-y-4">
              <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-500">The Flacon Architecture</p>
              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                The Eternal Empress flacon was engineered as a sovereign jewel artifact. Sculpted from deep
                pearl-white crystal infused with flowing golden reflections — creating the illusion of illuminated
                royalty suspended within the glass. Its crown cap is forged in polished royal gold with intricate
                imperial engravings, crowned with a massive oval-cut crystal centerpiece that refracts cinematic
                light like a preserved crown jewel.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {['feminine authority', 'emotional permanence', 'inherited wealth', 'sovereign elegance'].map(q => (
                  <div key={q} className="flex items-center gap-2">
                    <span className="text-[#c9a054] text-[8px]">◆</span>
                    <span className="text-[7px] tracking-[0.2em] uppercase text-zinc-600">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Details */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease }} className="space-y-8">

            {/* Header */}
            <div className="space-y-3 pb-6 border-b border-[#111]">
              <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-600">Perfume · For Her · Imperial Sovereign</p>
              <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-[0.1em] text-zinc-100 leading-tight">
                SF&nbsp;
                <span className="text-[#c9a054]">Eternal Empress</span>
              </h1>
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-600">The Absolute Feminine Throne</p>
              <p className="font-serif italic text-zinc-500 text-sm mt-1">
                A sovereign feminine masterpiece sculpted around imperial white rose, molten saffron nectar,
                golden amber resin, and velvet skin musk — engineered for ceremonial elegance and eternal feminine authority.
              </p>
              <div className="flex items-baseline gap-4 pt-2">
                <p className="font-serif text-3xl font-light text-zinc-100">
                  Rs {product.price_pkr?.toLocaleString()}
                </p>
                <p className="text-zinc-500 text-sm font-light">
                  ${product.price_usd} USD
                </p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a054]" />
                <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600">
                  Ultra-Limited Imperial Batch · Polygon Verified
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b border-[#111]">
              {(['story', 'scent', 'nft', 'buy'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-[7px] tracking-[0.35em] uppercase transition-all border-b-2 -mb-px ${
                    activeTab === tab ? 'text-[#c9a054] border-[#c9a054]' : 'text-zinc-600 border-transparent hover:text-zinc-400'
                  }`}>
                  {tab === 'story' ? 'Legacy' : tab === 'scent' ? 'Scent' : tab === 'nft' ? 'NFT' : 'Acquire'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[480px]">
              <AnimatePresence mode="wait">

                {activeTab === 'story' && (
                  <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-8">

                    <div className="space-y-4">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054]">The Legacy Statement</p>
                      <div className="space-y-3 text-zinc-400 text-xs font-light leading-relaxed">
                        <p>Throughout history, civilizations have worshipped beauty. But only a handful of women possessed something far more dangerous: <span className="text-zinc-300 italic">presence powerful enough to alter reality itself.</span></p>
                        <p>Eternal Empress was never created as a traditional fragrance. It was conceived inside the House of Shamim Forever as a sovereign feminine artifact — engineered to preserve emotional authority long after physical moments disappear.</p>
                        <p className="font-serif italic text-zinc-500">This composition does not chase attraction. It establishes atmosphere. It does not seek validation. It creates psychological gravity powerful enough to command silence before a single word is spoken.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-600">Engineered to Embody</p>
                      <div className="grid grid-cols-2 gap-2">
                        {LEGACY_QUALITIES.map((q, i) => (
                          <motion.div key={q} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08, ease }}
                            className="flex items-center gap-2 py-2 border-b border-[#111]">
                            <span className="text-[#c9a054] text-[8px]">◆</span>
                            <span className="text-[8px] tracking-[0.15em] uppercase text-zinc-500">{q}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 border border-[#111] bg-[#060606] p-5">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054]">Chapter III — The Ascension of the Empress</p>
                      <p className="font-serif italic text-zinc-400 text-sm">
                        &ldquo;Some women enter rooms. An Empress transforms them.&rdquo;
                      </p>
                      <p className="text-zinc-500 text-xs font-light leading-relaxed">
                        At the center of Eternal Empress lies one of the rarest sovereign floral compositions ever engineered by the House: Imperial White Rose infused with molten saffron nectar and sacred golden amber resin.
                      </p>
                      <div className="space-y-2 pt-2">
                        {[
                          ['White Rose', 'purity disciplined by intelligence'],
                          ['Saffron', 'wealth refined into elegance'],
                          ['Amber', 'permanence beyond mortality'],
                        ].map(([n, d]) => (
                          <div key={n} className="flex gap-3 items-start">
                            <span className="text-[#c9a054]/60 text-[8px] tracking-[0.3em] uppercase w-16 shrink-0 pt-0.5">{n}</span>
                            <span className="text-zinc-600 text-[8px] italic">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-600">The Atmospheric Presence</p>
                      <p className="text-zinc-500 text-xs font-light leading-relaxed italic font-serif">
                        Eternal Empress unfolds in emotional phases. First comes illumination. Then warmth. Then psychological surrender. Hours later, the atmosphere still belongs to her.
                      </p>
                      <div className="grid grid-cols-1 gap-0.5 pt-1">
                        {ATMOSPHERIC_QUALITIES.map(q => (
                          <div key={q} className="flex items-center gap-2 py-2 border-b border-[#0d0d0d]">
                            <span className="text-[#c9a054]/50 text-[8px]">◆</span>
                            <span className="text-[8px] tracking-[0.15em] uppercase text-zinc-600">{q}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-zinc-600 text-[9px] font-light italic font-serif pt-2">
                        People may forget appearances. They never forget how Eternal Empress made reality feel around them.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-600">Performance Matrix</p>
                      <div className="divide-y divide-[#0d0d0d]">
                        {PERFORMANCE_MATRIX.map(({ label, value }) => (
                          <div key={label} className="flex justify-between py-2.5 gap-4">
                            <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700 shrink-0">{label}</p>
                            <p className="text-[8px] text-zinc-400 text-right">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border border-[#c9a054]/15 bg-[#060606] p-5 space-y-4">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054]">The Ceremonial Presentation</p>
                      <p className="text-zinc-500 text-xs font-light leading-relaxed">
                        Every Eternal Empress allocation arrives inside a museum-grade sovereign presentation vault crafted from matte black lacquer architecture lined with white velvet interiors and embossed royal gold insignia.
                      </p>
                      <div className="space-y-1.5 pt-1">
                        {[
                          'Hand-authenticated serial identity',
                          'NFC sovereign verification seal',
                          'Blockchain ownership registration',
                          'Founder-grade authenticity certificate',
                          'Digital twin NFT passport',
                          'Imperial archive allocation signature',
                          'Concierge preservation documentation',
                        ].map(item => (
                          <div key={item} className="flex items-center gap-2">
                            <span className="text-[#c9a054]/60 text-[8px]">◆</span>
                            <span className="text-[8px] tracking-[0.15em] uppercase text-zinc-600">{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-zinc-700 text-[7px] tracking-[0.35em] uppercase italic pt-2">
                        This is not packaging. This is ceremonial possession.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-600">Holder Privileges</p>
                      <div className="grid grid-cols-1 gap-0.5">
                        {HOLDER_PRIVILEGES.map((p, i) => (
                          <motion.div key={p} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, ease }}
                            className="flex items-center gap-2 py-2 border-b border-[#0d0d0d]">
                            <span className="text-[#c9a054] text-[8px]">◆</span>
                            <span className="text-[8px] tracking-[0.15em] uppercase text-zinc-500">{p}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => setActiveTab('buy')}
                      className="w-full py-4 bg-[#c9a054]/10 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/20 transition-all duration-500">
                      Acquire Imperial Ownership
                    </button>
                  </motion.div>
                )}

                {activeTab === 'scent' && (
                  <motion.div key="scent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-8">
                    <div className="space-y-2">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054]">The Scent Architecture</p>
                      <p className="text-zinc-600 text-[9px] italic font-serif">
                        Three sovereign layers — each a chapter in feminine authority.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <ScentPyramidLayer
                        label="Opening" sub="The Celestial Opening" delay={0.1}
                        width="w-full"
                        notes={['White Rose Silk', 'Golden Pear Elixir', 'Soft Champagne Accord']}
                        mood="Radiant. Airy. Illuminated feminine luxury."
                      />
                      <ScentPyramidLayer
                        label="Heart" sub="The Imperial Heart" delay={0.2}
                        width="w-[85%]"
                        notes={['Imperial White Rose', 'Saffron Nectar', 'Velvet Jasmine Veil']}
                        mood="Royal emotional warmth wrapped in aristocratic femininity."
                      />
                      <ScentPyramidLayer
                        label="Base" sub="The Eternal Foundation" delay={0.3}
                        width="w-[70%]"
                        notes={['Golden Amber Resin', 'Creamy Sandalwood Smoke', 'White Skin Musk', 'Vanilla Orchid Veil']}
                        mood="Soft dominance engineered to survive fabric, atmosphere, skin, memory, and time itself."
                      />
                    </div>

                    <div className="border border-[#111] bg-[#060606] p-5 space-y-4">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-600">Scent Journey</p>
                      <div className="space-y-3">
                        {[
                          { phase: 'Illumination', time: '0–30 min', desc: 'White rose silk and champagne accord bloom in luminous, airy radiance.' },
                          { phase: 'Warmth', time: '30 min–4 hrs', desc: 'Imperial white rose merges with saffron nectar — warm, aristocratic, commanding.' },
                          { phase: 'Surrender', time: '4–24+ hrs', desc: 'Golden amber resin and white skin musk create an unforgettable gravitational presence.' },
                        ].map(({ phase, time, desc }) => (
                          <div key={phase} className="flex gap-4">
                            <div className="w-24 shrink-0">
                              <p className="text-[7px] tracking-[0.3em] uppercase text-[#c9a054]">{phase}</p>
                              <p className="text-[6px] tracking-[0.2em] text-zinc-700">{time}</p>
                            </div>
                            <p className="text-zinc-500 text-[9px] font-light leading-relaxed">{desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => setActiveTab('buy')}
                      className="w-full py-4 bg-[#c9a054]/10 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/20 transition-all duration-500">
                      Acquire Imperial Ownership
                    </button>
                  </motion.div>
                )}

                {activeTab === 'nft' && (
                  <motion.div key="nft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-8">

                    <div className="space-y-2">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054]">The Sovereign Digital Passport</p>
                      <p className="text-zinc-500 text-xs font-light leading-relaxed">
                        Every authenticated Eternal Empress flacon is permanently paired with a sovereign blockchain identity recorded on Polygon Mainnet. The physical object may travel through generations. The sovereign registry remains eternal.
                      </p>
                    </div>

                    <div className="border border-[#111] bg-[#060606] p-5 space-y-3">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-600">NFT Description</p>
                      <p className="text-zinc-400 text-xs font-light leading-relaxed italic font-serif">
                        A sovereign fragrance artifact authenticated by The House of Shamim Forever. Crafted around Imperial White Rose, molten saffron nectar, and sacred golden amber resin, this digital passport certifies ownership, provenance, rarity allocation, and elite House privileges.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-600">The NFT Passport Certifies</p>
                      <div className="grid grid-cols-2 gap-1">
                        {['authenticity', 'ownership', 'provenance', 'rarity allocation', 'archive history', 'sovereign privileges', 'generational traceability'].map(item => (
                          <div key={item} className="flex items-center gap-2 py-1.5">
                            <span className="text-[#c9a054]/60 text-[8px]">◆</span>
                            <span className="text-[8px] tracking-[0.15em] uppercase text-zinc-600">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border border-[#c9a054]/15 bg-[#060606] p-5 space-y-2">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] mb-3">NFT Attributes</p>
                      <div className="divide-y divide-[#0d0d0d]">
                        {NFT_TRAITS.map(({ label, value }) => (
                          <div key={label} className="flex justify-between py-2.5 gap-4">
                            <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700 shrink-0">{label}</p>
                            <p className="text-[8px] text-zinc-400 text-right font-mono">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setActiveTab('buy')}
                        className="py-4 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all duration-500">
                        Acquire Imperial Ownership
                      </button>
                      <button className="py-4 border border-zinc-800 text-[9px] tracking-[0.5em] uppercase text-zinc-600 hover:text-zinc-400 hover:border-zinc-600 transition-all duration-500">
                        Authenticate Sovereign Passport
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'buy' && (
                  <motion.div key="buy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6">

                    <div className="space-y-1">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054]">Acquire Imperial Ownership</p>
                      <p className="text-zinc-600 text-[9px]">Complete your acquisition via crypto or sovereign concierge.</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700">Sovereign Dispatch Details</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'name', label: 'Full Name', val: custName, set: setCustName, placeholder: 'Her Imperial Name' },
                          { id: 'phone', label: 'Phone', val: custPhone, set: setCustPhone, placeholder: '+92 300 000 0000' },
                        ].map(({ id, label, val, set, placeholder }) => (
                          <div key={id} className="space-y-1">
                            <p className="text-[6px] tracking-[0.4em] uppercase text-zinc-700">{label}</p>
                            <input value={val} onChange={e => set(e.target.value)} placeholder={placeholder}
                              className="w-full bg-[#080808] border border-[#1a1a1a] px-3 py-2.5 text-[9px] text-zinc-300 placeholder-zinc-800 focus:outline-none focus:border-[#c9a054]/30 transition-colors" />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <p className="text-[6px] tracking-[0.4em] uppercase text-zinc-700">Street Address</p>
                        <input value={custAddress} onChange={e => setCustAddress(e.target.value)} placeholder="Sovereign Residence Address"
                          className="w-full bg-[#080808] border border-[#1a1a1a] px-3 py-2.5 text-[9px] text-zinc-300 placeholder-zinc-800 focus:outline-none focus:border-[#c9a054]/30 transition-colors" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[6px] tracking-[0.4em] uppercase text-zinc-700">City</p>
                        <input value={custCity} onChange={e => setCustCity(e.target.value)} placeholder="City of the Empress"
                          className="w-full bg-[#080808] border border-[#1a1a1a] px-3 py-2.5 text-[9px] text-zinc-300 placeholder-zinc-800 focus:outline-none focus:border-[#c9a054]/30 transition-colors" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700">Sovereign Payment</p>
                      <Web3PayBlock priceUsd={product.price_usd ?? 125} onSuccess={handleWeb3Success} />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-[#111]" />
                      <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-800">or</p>
                      <div className="flex-1 h-px bg-[#111]" />
                    </div>

                    <div className="border border-[#111] p-5 space-y-3">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-600">Enter The Imperial Vault</p>
                      <p className="text-zinc-600 text-[9px] font-light leading-relaxed">
                        For private acquisition via bank transfer, or to speak with a House sovereign concierge, contact us directly.
                      </p>
                      <div className="flex gap-3">
                        <Link href="/concierge"
                          className="flex-1 py-3 border border-zinc-800 text-[8px] tracking-[0.4em] uppercase text-zinc-600 hover:text-[#c9a054] hover:border-[#c9a054]/30 transition-all text-center">
                          Concierge Access
                        </Link>
                        <Link href="/inner-circle"
                          className="flex-1 py-3 border border-zinc-800 text-[8px] tracking-[0.4em] uppercase text-zinc-600 hover:text-[#c9a054] hover:border-[#c9a054]/30 transition-all text-center">
                          Inner Circle
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-[#080808] border border-[#111]">
                      <ShieldCheck size={14} className="text-[#c9a054]/50 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600">Sovereign Security</p>
                        <p className="text-[8px] text-zinc-700 leading-relaxed">
                          All transactions are verified on Polygon Mainnet. Your imperial acquisition is protected by blockchain authentication and a permanent sovereign registry.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Brand Statement */}
      <div className="border-t border-[#0d0d0d] py-20 mt-16">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <p className="text-[7px] tracking-[0.6em] uppercase text-zinc-700">House of Shamim Forever</p>
          <p className="font-serif text-2xl font-light text-zinc-400 leading-relaxed">
            Eternal Empress does not exist inside traditional perfumery.
          </p>
          <p className="font-serif italic text-zinc-600 text-sm">
            This is where fragrance, legacy, identity, luxury, blockchain, craftsmanship, and ownership become one eternal ecosystem.
          </p>
          <div className="flex justify-center gap-8 pt-4">
            {[
              'Collectible Sovereign Luxury',
              'Blockchain-Authenticated Heirloom',
              'Generational Ownership System',
            ].map(label => (
              <div key={label} className="text-center">
                <p className="text-[#c9a054] text-lg font-serif">◆</p>
                <p className="text-[6px] tracking-[0.5em] uppercase text-zinc-700 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
