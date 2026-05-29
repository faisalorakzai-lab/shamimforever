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
import { formatPKR } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

const MERCHANT_WALLET = '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7' as const
const NFT_CONTRACT   = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640' as const
const DEPLOY_TX      = '0x00d4c75acdc3e3bed45731e120d2ffceffe450e7585c5cd7e9f7ed670cdefff2' as const
const OKBOND_DISCOUNT = 0.10

const TOKEN_META = {
  USDT:   { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as const, decimals: 6,  symbol: 'USDT' },
  USDC:   { address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' as const, decimals: 6,  symbol: 'USDC' },
  OKBOND: { address: '0xc89729DA02a8c2E282EC3070A9a680E01bE2E22F' as const, decimals: 18, symbol: 'OKBOND' },
} as const

const ERC20_ABI = [{
  name: 'transfer', type: 'function' as const, stateMutability: 'nonpayable' as const,
  inputs: [{ name: 'recipient', type: 'address' }, { name: 'amount', type: 'uint256' }],
  outputs: [{ name: '', type: 'bool' }],
}]

type CoinType = keyof typeof TOKEN_META

interface ScentPyramidData {
  top: string; heart: string; base: string
  top_mood?: string; heart_mood?: string; base_mood?: string
}

interface StoryData {
  tagline?: string
  sovereign_title?: string
  allocation?: string
  legacy_statement?: string
  positioning?: string
  atmospheric_presence?: string
  olfactory?: string
  scentPyramid?: ScentPyramidData
  specs?: {
    volume?: string; concentration?: string; longevity?: string; sillage?: string
    price_pkr?: string; price_usd?: string; production?: string; gender?: string
    wearing_environment?: string; allocation?: string; projection?: string
  }
  nft?: {
    title?: string; description?: string; blockchain?: string
    rarity?: string; edition?: string; holder_privileges?: string[]
  }
  packaging?: string
  cta?: { primary?: string; secondary?: string; tertiary?: string }
}

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

function PyramidLayer({ label, sub, value, mood, width, delay }: {
  label: string; sub: string; value: string; mood?: string; width: string; delay: number
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
        {mood && <p className="text-[7px] tracking-[0.2em] uppercase text-zinc-600 mt-1.5 italic">{mood}</p>}
      </div>
    </motion.div>
  )
}

function Web3PaySection({
  priceUsd, productId, productName,
  custName, custPhone, custAddress, custCity, custCountry,
  onSuccess,
}: {
  priceUsd: number; productId: string; productName: string
  custName: string; custPhone: string; custAddress: string; custCity: string; custCountry: string
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

  if (isConfirmed && localTx && step !== 'done') { setStep('done'); onSuccess(localTx, coin) }

  async function handlePay() {
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
            {coin === 'OKBOND' && <p className="text-[8px] tracking-[0.25em] uppercase text-[#c9a054]">10% Sovereign Discount Applied</p>}
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

export default function QueenOfTaifPage({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'story' | 'specs' | 'nft' | 'buy'>('story')
  const [quantity] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [txHashFinal, setTxHashFinal] = useState('')

  const [custName, setCustName] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [custAddress, setCustAddress] = useState('')
  const [custCity, setCustCity] = useState('')
  const [custCountry] = useState('Pakistan')

  const story: StoryData = (() => {
    try {
      const raw: Record<string, unknown> = typeof product.story === 'string'
        ? JSON.parse(product.story as string)
        : ((product.story as Record<string, unknown>) ?? {})

      const olf = raw.olfactory
      if (olf && typeof olf === 'object' && !Array.isArray(olf)) {
        const o = olf as Record<string, unknown>
        if (!raw.scentPyramid && (o.top || o.heart || o.base)) {
          raw.scentPyramid = {
            top:        Array.isArray(o.top)   ? (o.top as string[]).join(' · ')   : String(o.top ?? ''),
            heart:      Array.isArray(o.heart) ? (o.heart as string[]).join(' · ') : String(o.heart ?? ''),
            base:       Array.isArray(o.base)  ? (o.base as string[]).join(' · ')  : String(o.base ?? ''),
            top_mood:   o.top_description   ?? '',
            heart_mood: o.heart_description ?? '',
            base_mood:  o.base_description  ?? '',
          }
        }
        raw.olfactory = [o.top_description, o.heart_description, o.base_description].filter(Boolean).join(' ')
      }

      const pkg = raw.packaging
      if (pkg && typeof pkg === 'object' && !Array.isArray(pkg)) {
        const p = pkg as Record<string, unknown>
        raw.packaging = [p.flacon, p.vault].filter(Boolean).join(' ')
      }

      return raw as unknown as StoryData
    } catch { return {} }
  })()

  const images = product.images ?? []
  const scentPyramid = story.scentPyramid

  const handleWeb3Success = useCallback(async (txHash: string, coin: CoinType) => {
    setTxHashFinal(txHash)
    try {
      const { data: order } = await supabase.from('orders').insert([{
        status: 'confirmed',
        payment_method: coin.toLowerCase(),
        payment_status: 'paid',
        total_pkr: product.price_pkr * quantity,
        total_usd: parseFloat((product.price_usd * quantity * (coin === 'OKBOND' ? 0.9 : 1)).toFixed(2)),
        discount_applied: coin === 'OKBOND' ? 10 : 0,
        shipping_address: { name: custName, phone: custPhone, line1: custAddress, city: custCity, country: custCountry },
        notes: `Crypto TX: ${txHash} | Coin: ${coin} | Queen of Taif — Sovereign Rose Edition`,
      }]).select().single()
      if (order) {
        await supabase.from('order_items').insert([{
          order_id: order.id, product_id: product.id,
          quantity, price_pkr: product.price_pkr, price_usd: product.price_usd,
        }])
      }
    } catch { /* best effort */ }
    setOrderPlaced(true)
  }, [custName, custPhone, custAddress, custCity, custCountry, product, quantity])

  const nftTraits = [
    { label: 'NFT Name',         value: 'Queen of Taif — Sovereign Rose Edition' },
    { label: 'Category',         value: 'Sovereign Fragrance Asset' },
    { label: 'Rarity Tier',      value: story.nft?.rarity ?? 'ROYAL FOUNDERS' },
    { label: 'Archive Status',   value: 'Sovereign Reserve — Archive II' },
    { label: 'Blockchain',       value: 'Polygon Mainnet' },
    { label: 'Authentication',   value: 'Polygon Verified' },
    { label: 'Physical Pairing', value: 'Yes' },
    { label: 'Concierge Access', value: 'Enabled' },
    { label: 'Production',       value: 'Limited Royal Batch' },
    { label: 'Contract',         value: `${NFT_CONTRACT.slice(0,10)}...${NFT_CONTRACT.slice(-6)}` },
  ]

  const holderPrivileges: string[] = story.nft?.holder_privileges ?? [
    'Founder Reserve Access',
    'Sovereign Vault Privileges',
    'Early Access to Future Luxury Releases',
    'Private Jewelry Allocation Rights',
    'Invitation-Only House Ceremonies',
    'Restoration & Refill Privileges',
    'Blockchain Provenance Protection',
    'Priority Access to Sovereign NFT Drops',
    'Concierge Luxury Authentication Services',
  ]

  if (orderPlaced) return (
    <div className="min-h-screen bg-[#050505] pt-20 flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease }} className="text-center max-w-lg">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }} className="font-serif text-7xl text-[#c9a054] mb-8">◆</motion.p>
        <h2 className="font-serif text-3xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-3">
          Sovereign Order Confirmed
        </h2>
        <p className="font-serif italic text-zinc-500 mb-8">Your Queen of Taif is sealed and awaiting royal dispatch</p>
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
        <div className="flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase text-zinc-600">
          <Link href="/" className="hover:text-[#c9a054] transition-colors">House</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#c9a054] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-zinc-400">Queen of Taif</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">

          {/* ── LEFT: Images ─────────────────────────────────── */}
          <div>
            <div className="relative aspect-square bg-[#0a0a0a] overflow-hidden mb-4"
              style={{ boxShadow: 'inset 0 0 80px rgba(201,160,84,0.06), 0 0 60px rgba(0,0,0,0.8)' }}>
              <AnimatePresence mode="wait">
                {images.length > 0 ? (
                  <motion.img key={activeImage} src={images[activeImage]} alt={product.name}
                    initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease }} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="font-serif text-9xl text-[#c9a054]/8">SF</p>
                  </div>
                )}
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImage(i => Math.max(0, i - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#050505]/80 text-zinc-400 hover:text-[#c9a054] transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => setActiveImage(i => Math.min(images.length - 1, i + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#050505]/80 text-zinc-400 hover:text-[#c9a054] transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
              <div className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(201,160,84,0.08)' }} />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-none">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 overflow-hidden border transition-colors ${activeImage === i ? 'border-[#c9a054]/60' : 'border-transparent'}`}
                    style={{ width: 64, aspectRatio: '1' }}>
                    <img src={img} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}

            {/* Allocation badge */}
            <div className="mt-6 p-4 border border-[#c9a054]/15 bg-gradient-to-r from-[#c9a054]/5 to-transparent flex items-center gap-4">
              <span className="text-[#c9a054] text-lg">◆</span>
              <div>
                <p className="text-[7px] tracking-[0.45em] uppercase text-[#c9a054]">Sovereign Reserve Allocation</p>
                <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-600">
                  Archive II · Limited Royal Batch · Polygon Verified
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Info + Purchase ─────────────────────── */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}>
              <p className="text-[8px] tracking-[0.55em] uppercase text-[#c9a054] mb-4">
                Perfume · For Her · ROYAL FOUNDERS
              </p>
              <h1 className="font-serif font-light text-4xl md:text-5xl tracking-[0.08em] text-zinc-100 leading-tight mb-1">
                QUEEN OF TAIF
              </h1>
              <p className="font-serif italic text-zinc-500 text-xl mb-2">The Crown of Eternal Femininity</p>
              <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-700 mb-8">
                {story.tagline ?? 'Where roses become royalty.'}
              </p>

              <div className="flex items-baseline gap-4 mb-10 pb-10 border-b border-[#111]">
                <p className="text-3xl font-light text-zinc-100">{formatPKR(product.price_pkr * quantity)}</p>
                <p className="text-zinc-500">${product.price_usd} USD</p>
                <span className="text-[7px] tracking-[0.3em] uppercase text-[#c9a054] border border-[#c9a054]/20 px-2 py-1">
                  ◆ NFT-Backed
                </span>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#111] mb-8">
                {(['story', 'specs', 'nft', 'buy'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 text-[7px] md:text-[8px] tracking-[0.3em] uppercase transition-all duration-300 border-b-2 ${activeTab === tab ? 'text-[#c9a054] border-b-[#c9a054]' : 'text-zinc-600 border-b-transparent hover:text-zinc-400'}`}>
                    {tab === 'story' ? 'Story' : tab === 'specs' ? 'Specs' : tab === 'nft' ? 'Digital Twin' : 'Buy Now'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">

                {/* ─ Story Tab ─ */}
                {activeTab === 'story' && (
                  <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-8">
                    {story.legacy_statement && (
                      <div>
                        <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-3">The Legacy Statement</p>
                        <p className="font-serif italic text-zinc-400 text-sm leading-[2] border-l-2 border-[#c9a054]/25 pl-5">
                          {story.legacy_statement}
                        </p>
                      </div>
                    )}
                    {story.positioning && (
                      <div>
                        <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-3">Chapter II — The Throne of Roses</p>
                        <p className="text-zinc-500 text-xs font-light leading-[2]">{story.positioning}</p>
                      </div>
                    )}
                    {story.atmospheric_presence && (
                      <div>
                        <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-3">The Atmospheric Presence</p>
                        <p className="text-zinc-500 text-xs font-light leading-[2]">{story.atmospheric_presence}</p>
                      </div>
                    )}
                    {scentPyramid && (
                      <div>
                        <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-4">The Scent Architecture</p>
                        <div className="space-y-2">
                          <PyramidLayer label="ROYAL OPENING" sub="Top Layer" value={scentPyramid.top}
                            mood={scentPyramid.top_mood} width="w-2/3" delay={0} />
                          <PyramidLayer label="IMPERIAL HEART" sub="Core Layer" value={scentPyramid.heart}
                            mood={scentPyramid.heart_mood} width="w-4/5" delay={0.1} />
                          <PyramidLayer label="ETERNAL FOUNDATION" sub="Base Layer" value={scentPyramid.base}
                            mood={scentPyramid.base_mood} width="w-full" delay={0.2} />
                        </div>
                      </div>
                    )}
                    {story.packaging && (
                      <div>
                        <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-3">The Flacon & Sovereign Vault</p>
                        <p className="text-zinc-500 text-xs font-light leading-[2]">{story.packaging}</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ─ Specs Tab ─ */}
                {activeTab === 'specs' && (
                  <motion.div key="specs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-0">
                    {story.specs && Object.entries({
                      'Concentration Class':  story.specs.concentration,
                      'Volume Allocation':    story.specs.volume,
                      'Longevity Vector':     story.specs.longevity,
                      'Projection Signature': story.specs.projection ?? 'Regal Feminine Aura',
                      'Sillage':              story.specs.sillage,
                      'Gender Profile':       story.specs.gender,
                      'Production Batch':     story.specs.production,
                      'Wearing Environment':  story.specs.wearing_environment,
                      'Allocation Type':      story.specs.allocation,
                      'Valuation PKR':        story.specs.price_pkr,
                      'Valuation USD':        story.specs.price_usd,
                    }).filter(([, v]) => v).map(([label, value]) => (
                      <div key={label} className="flex justify-between items-center py-4 border-b border-[#0d0d0d]">
                        <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-600">{label}</p>
                        <p className="text-zinc-300 text-xs font-light text-right max-w-[55%]">{value as string}</p>
                      </div>
                    ))}
                    <div className="flex justify-between items-center py-4 border-b border-[#0d0d0d]">
                      <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-600">Blockchain</p>
                      <p className="text-zinc-300 text-xs">Polygon Mainnet — NFT Verified</p>
                    </div>
                    <div className="flex justify-between items-center py-4">
                      <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-600">Craftsmanship Origin</p>
                      <p className="text-zinc-300 text-xs">Karachi Sovereign Atelier</p>
                    </div>
                  </motion.div>
                )}

                {/* ─ NFT Tab ─ */}
                {activeTab === 'nft' && (
                  <motion.div key="nft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6">
                    <p className="text-zinc-500 text-xs font-light leading-[2]">
                      {story.nft?.description ?? 'A sovereign fragrance asset authenticated by The House of Shamim Forever. Crafted around legendary Taif Rose, saffron silk, and royal oud accords, this digital passport certifies ownership, provenance, rarity allocation, and elite House privileges. The physical object may age. The sovereign registry remains eternal.'}
                    </p>

                    <div className="border border-[#c9a054]/15 bg-[#080808]">
                      <div className="px-5 py-4 border-b border-[#111]">
                        <p className="text-[7px] tracking-[0.45em] uppercase text-[#c9a054]">Sovereign Blockchain Certificate</p>
                      </div>
                      <div className="px-5 py-2">
                        {nftTraits.map(({ label, value }) => (
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
                      <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-4">Sovereign Holder Privileges</p>
                      <div className="grid grid-cols-2 gap-2">
                        {holderPrivileges.map((p) => (
                          <div key={p} className="flex items-center gap-2 p-2.5 border border-[#111]">
                            <span className="text-[#c9a054] text-[8px] shrink-0">◆</span>
                            <span className="text-[7px] tracking-[0.2em] uppercase text-zinc-500">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─ Buy Tab ─ */}
                {activeTab === 'buy' && (
                  <motion.div key="buy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6">
                    <div>
                      <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 mb-3">Delivery Details</p>
                      <div className="space-y-2">
                        {[
                          { v: custName,    s: setCustName,    ph: 'Full Name *' },
                          { v: custPhone,   s: setCustPhone,   ph: 'Phone Number *' },
                          { v: custAddress, s: setCustAddress, ph: 'Delivery Address *' },
                          { v: custCity,    s: setCustCity,    ph: 'City *' },
                        ].map(({ v, s, ph }) => (
                          <input key={ph} value={v} onChange={e => s(e.target.value)} placeholder={ph}
                            className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 placeholder:text-zinc-700 focus:border-[#c9a054]/30 focus:outline-none transition-colors" />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 mb-3">Pay with Crypto · Polygon Network</p>
                      <Web3PaySection
                        priceUsd={product.price_usd}
                        productId={product.id}
                        productName={product.name}
                        custName={custName}
                        custPhone={custPhone}
                        custAddress={custAddress}
                        custCity={custCity}
                        custCountry={custCountry}
                        onSuccess={handleWeb3Success}
                      />
                    </div>

                    <div className="pt-4 border-t border-[#0d0d0d]">
                      <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-2">Sovereign Acquisition</p>
                      <p className="text-[7px] tracking-[0.25em] uppercase text-zinc-700 leading-[2]">
                        {story.cta?.primary ?? 'Acquire Sovereign Ownership'} ·{' '}
                        {story.cta?.secondary ?? 'Authenticate Digital Passport'} ·{' '}
                        {story.cta?.tertiary ?? 'Enter The Royal Vault'}
                      </p>
                    </div>

                    <p className="text-[7px] tracking-[0.25em] uppercase text-zinc-700 text-center">
                      Secure · Blockchain Verified · Polygon Mainnet · Royal Dispatch
                    </p>
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
