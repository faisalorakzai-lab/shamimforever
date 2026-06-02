'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Copy, Check, Upload, X, ExternalLink, ArrowDown } from 'lucide-react'
import { formatPKR } from '@/lib/utils'
import type { Product } from '@/types'
import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
import { useAccount } from 'wagmi'

  declare global {
    namespace JSX {
      interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
          src?: string
          alt?: string
          poster?: string
          'camera-controls'?: boolean | string
          'auto-rotate'?: boolean | string
          'auto-rotate-delay'?: string
          'interaction-prompt'?: string
          exposure?: string
          'shadow-intensity'?: string
          'shadow-softness'?: string
          'environment-image'?: string
          'rotation-per-second'?: string
          'camera-orbit'?: string
          'camera-target'?: string
          'min-camera-orbit'?: string
          'max-camera-orbit'?: string
          'field-of-view'?: string
          'min-field-of-view'?: string
          'max-field-of-view'?: string
          style?: React.CSSProperties
        }, HTMLElement>
      }
    }
  }
  import { SOVEREIGN_CONFIGS, type SovereignConfig } from '@/lib/sovereign-configs'

type PayMethod = 'crypto' | 'pkr_manual' | 'cod'
interface OrderResult { order_id: string; order_ref: string; tracking_ref: string; status: string; track_url: string }



const NFT_CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
const MERCHANT_WALLET = '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7'
const EASYPAISA_NUMBER = '03367970004'
const EASYPAISA_NAME = 'M Faisal'
const UBL_IBAN = 'PK13UNIL0109000318870498'
const SERIF = "'Cormorant Garamond', Georgia, serif"

const SOVEREIGN_CSS = [
  '@keyframes shimmerPulse{0%,100%{opacity:0.55}50%{opacity:1}}',
  '@media(max-width:768px){',
  '.scent-grid{grid-template-columns:1fr!important}',
  '.nft-grid{grid-template-columns:1fr!important;gap:32px!important}',
  '.pay-grid{grid-template-columns:1fr 1fr!important}',
  '.mob-full{width:100%!important;box-sizing:border-box!important;display:flex!important;justify-content:center!important}',
  '}',
].join('')

function CopyBtn({ text }: { text: string }) {
  const [c, setC] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 2000) }}
      style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#c9a054', background: 'none', border: 'none', cursor: 'pointer' }}
    >
      {c ? <Check size={10} /> : <Copy size={10} />}
      <span style={{ fontSize: 7, letterSpacing: '0.3em', textTransform: 'uppercase' as const }}>{c ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

function GoldParticles() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.2, vx: (Math.random() - 0.5) * 0.12, vy: -(Math.random() * 0.2 + 0.04),
      a: Math.random(), va: (Math.random() - 0.5) * 0.005,
    }))
    let id: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += p.va
        if (p.a <= 0 || p.a >= 1) p.va *= -1
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,160,84,${p.a * 0.55})`; ctx.fill()
      })
      id = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }} />
}

function NftCard({ config }: { config: SovereignConfig }) {
  const [deg, setDeg] = useState(0)
  useEffect(() => {
    let frame: number; let t = 0
    const go = () => { t += 0.35; setDeg(t); frame = requestAnimationFrame(go) }
    go(); return () => cancelAnimationFrame(frame)
  }, [])
  const front = deg % 360 < 180
  return (
    <div style={{ perspective: '1200px' }} className="w-full max-w-[280px] mx-auto select-none">
      <div style={{ transform: `rotateY(${deg}deg)`, transformStyle: 'preserve-3d', transition: 'none', position: 'relative', width: '100%', aspectRatio: '3/4' }}>
        {[false, true].map(isBack => (
          <div
            key={String(isBack)}
            className={`absolute inset-0 border rounded-sm flex flex-col p-5 ${(front && !isBack) || (!front && isBack) ? '' : 'pointer-events-none'}`}
            style={{
              backfaceVisibility: 'hidden',
              transform: isBack ? 'rotateY(180deg)' : 'none',
              background: 'linear-gradient(145deg, #0c0906 0%, #0f0c07 50%, #080604 100%)',
              borderColor: 'rgba(201,160,84,0.35)',
            }}
          >
            {!isBack ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c9a054' }}>House of Shamim</p>
                    <p style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3f3830', marginTop: 2 }}>Sovereign Passport</p>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(130,71,229,0.15)', border: '1px solid rgba(130,71,229,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 38.4 33.5" fill="#8247e5">
                      <path d="M29 10.2a.7.7 0 0 0-.7 0l-4.4 2.6-3 1.7-4.4 2.6a.7.7 0 0 1-.7 0l-3.5-2a.7.7 0 0 1-.4-.6v-4a.7.7 0 0 1 .4-.6l3.5-2a.7.7 0 0 1 .7 0l3.5 2a.7.7 0 0 1 .4.6v2.6l3-1.8v-2.6a.7.7 0 0 0-.4-.6l-6.4-3.7a.7.7 0 0 0-.7 0l-6.5 3.8a.7.7 0 0 0-.4.6v7.4a.7.7 0 0 0 .4.6l6.5 3.7a.7.7 0 0 0 .7 0l4.4-2.5 3-1.8 4.4-2.5a.7.7 0 0 1 .7 0l3.5 2a.7.7 0 0 1 .4.6v4a.7.7 0 0 1-.4.6l-3.5 2a.7.7 0 0 1-.7 0l-3.5-2a.7.7 0 0 1-.4-.6V18l-3 1.7v2.6a.7.7 0 0 0 .4.6l6.5 3.7a.7.7 0 0 0 .7 0l6.5-3.7a.7.7 0 0 0 .3-.6v-7.4a.7.7 0 0 0-.3-.6z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center flex-col text-center">
                  <p style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 300, color: '#f0ece4', letterSpacing: '0.1em', lineHeight: 1 }}>{config.nftTitle}</p>
                  <div style={{ width: 32, height: 1, background: 'linear-gradient(to right, transparent, #c9a054, transparent)', margin: '10px auto' }} />
                  <p style={{ fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a054' }}>{config.nftEdition}</p>
                </div>
                <div className="mt-auto">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 6, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3f3830' }}>Rarity</span>
                    <span style={{ fontSize: 6, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a054', border: '1px solid rgba(201,160,84,0.25)', padding: '2px 6px' }}>{config.nftRarity}</span>
                  </div>
                  <p style={{ fontFamily: 'monospace', fontSize: 6, color: '#1f1c17', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{NFT_CONTRACT}</p>
                </div>
              </>
            ) : (
              <>
                <p style={{ fontSize: 7, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 14 }}>Sovereign Traits</p>
                {config.nftTraits.map(t => (
                  <div key={t.trait} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3f3830' }}>{t.trait}</span>
                    <span style={{ fontSize: 8, color: '#b0a898', fontWeight: 300, maxWidth: '55%', textAlign: 'right' }}>{t.value}</span>
                  </div>
                ))}
                <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: 16 }}>
                  <div style={{ width: 44, height: 44, border: '1px solid rgba(201,160,84,0.15)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: SERIF, fontSize: 20, color: 'rgba(201,160,84,0.3)' }}>◆</span>
                  </div>
                  <p style={{ fontSize: 6, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#1f1c17' }}>Blockchain Verified</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SovereignProductPage({ product }: { product: Product }) {
  const config = SOVEREIGN_CONFIGS[product.slug] ?? SOVEREIGN_CONFIGS['her-legacy-vault']
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, 60])

  const [quantity, setQuantity] = useState(1)
  const [payMethod, setPayMethod] = useState<PayMethod>('crypto')
  const [txId, setTxId] = useState('')
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [proofPreview, setProofPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [custName, setCustName] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [custAddress, setCustAddress] = useState('')
  const [custCity, setCustCity] = useState('')
  const [activeGallery, setActiveGallery] = useState(0)
  const { address: walletAddress } = useAccount()
  const [mintWallet, setMintWallet] = useState('')
  const [mintStatus, setMintStatus] = useState<'idle'|'minting'|'success'|'error'>('idle')
  const [mintResult, setMintResult] = useState<{tokenId:number;txHash:string;openSeaUrl:string;polygonScanUrl:string}|null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.utils.toArray<Element>('.s-reveal').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      )
    })
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  const callCheckout = useCallback(async (opts: { paymentMethod: string; paymentStatus: string; txHash?: string; proofUrl?: string; walletAddress?: string }) => {
    if (!product) throw new Error('No product')
    const discount = opts.paymentMethod === 'okbond' ? 10 : 0
    const totalUsd = parseFloat((product.price_usd * quantity * (1 - discount / 100)).toFixed(2))
    const res = await fetch('/api/v1/checkout', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: product.id, product_name: product.name, quantity,
        payment_method: opts.paymentMethod, payment_status: opts.paymentStatus,
        tx_hash: opts.txHash || null,
        shipping_address: { name: custName, phone: custPhone, line1: custAddress, city: custCity, country: 'Pakistan' },
        total_pkr: product.price_pkr * quantity, total_usd: totalUsd, discount_applied: discount,
        price_pkr: product.price_pkr, price_usd: product.price_usd,
        wallet_address: opts.walletAddress || null, payment_proof_url: opts.proofUrl || null,
        rarity_tier: config.nftRarity,
      }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.error || 'Checkout failed')
    return data as OrderResult
  }, [product, quantity, custName, custPhone, custAddress, custCity, config.nftRarity])

  const handleWeb3Success = useCallback(async (txHash: string, coin: CoinType) => {
    try {
      setOrderResult(await callCheckout({ paymentMethod: coin.toLowerCase(), paymentStatus: 'paid', txHash, walletAddress: walletAddress || undefined }))
    } catch (err: any) {
      setOrderError(err?.message || 'Payment received. Contact us with your TX hash.')
    }
  }, [callCheckout, walletAddress])

  async function handlePlaceOrder() {
    if (!custName || !custPhone || !custAddress || !custCity) { setOrderError('Please fill in all delivery details.'); return }
    if (payMethod === 'pkr_manual' && !txId && !proofFile) { setOrderError('Please provide Transaction ID or screenshot.'); return }
    setSubmitting(true); setOrderError(null)
    try {
      let proofUrl: string | null = null
      if (proofFile && proofPreview) {
        const up = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageStr: proofPreview }) })
        const ud = await up.json(); if (ud.url) proofUrl = ud.url
      }
      setOrderResult(await callCheckout({ paymentMethod: payMethod, paymentStatus: payMethod === 'cod' ? 'pending' : 'awaiting_verification', proofUrl: proofUrl || undefined, txHash: txId || undefined }))
    } catch (err: any) {
      setOrderError(err?.message || 'Failed to place order.')
    }
    setSubmitting(false)
  }

  async function handleMintNFT() {
    const addr = (mintWallet.trim() || walletAddress) as string | undefined
    if (!addr || !addr.startsWith('0x')) { setMintStatus('error'); return }
    setMintStatus('minting')
    try {
      const res = await fetch('/api/nft/mint', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: addr }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Mint failed')
      setMintResult(data); setMintStatus('success')
    } catch { setMintStatus('error') }
  }

  if (orderResult) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', background: '#030303' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ textAlign: 'center', maxWidth: 500, width: '100%' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}>
          <p style={{ fontFamily: SERIF, fontSize: 80, color: '#c9a054', lineHeight: 1 }}>◆</p>
        </motion.div>
        <h2 style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 300, letterSpacing: '0.2em', color: '#f0ece4', textTransform: 'uppercase', marginTop: 16, marginBottom: 8 }}>Order Placed</h2>
        <p style={{ fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 40 }}>House of Shamim Forever</p>
        <div style={{ border: '1px solid rgba(201,160,84,0.12)', background: 'linear-gradient(135deg, #0c0906 0%, #080604 100%)', marginBottom: 32, textAlign: 'left' }}>
          {[['Order Reference', orderResult.order_ref], ['Tracking ID', orderResult.tracking_ref], ['Status', orderResult.status?.replace(/_/g, ' ')]].map(([lbl, val]) => (
            <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830' }}>{lbl}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#c9b894', wordBreak: 'break-all' }}>{val}</p>
                {lbl !== 'Status' && <CopyBtn text={val ?? ''} />}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={orderResult.track_url} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', border: '1px solid rgba(201,160,84,0.4)', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a054', textDecoration: 'none' }}>
            <ExternalLink size={10} /> Track Order
          </Link>
          <Link href="/shop" style={{ padding: '12px 24px', border: '1px solid rgba(255,255,255,0.08)', fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830', textDecoration: 'none' }}>Continue</Link>
        </div>
      </motion.div>
    </div>
  )

  const images = config.galleryImages
  const finalPkr = product.price_pkr * quantity

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: SOVEREIGN_CSS }} />

      {/* HERO — Black & Gold brand, edge-to-edge 3D */}
        <section ref={heroRef} style={{ position: 'relative', background: '#000000', overflow: 'hidden' }}>

          {/* Gold crown spotlight */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: '5%', height: '55%', background: 'radial-gradient(ellipse 52% 60% at 50% 26%, rgba(212,175,55,0.16) 0%, rgba(201,160,84,0.05) 40%, transparent 68%)', pointerEvents: 'none', zIndex: 2 }} />

          {/* Gold stage ambient glow */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', background: 'radial-gradient(ellipse 62% 80% at 50% 100%, rgba(201,160,84,0.11) 0%, transparent 75%)', pointerEvents: 'none', zIndex: 2 }} />

          {/* Black vignette edges */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 42%, rgba(0,0,0,0.70) 100%)', pointerEvents: 'none', zIndex: 3 }} />

          {/* ── Animated gold border — jewellery box opening, clockwise ── */}
          {/* Top: left → right */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.4, 0, 0.2, 1] }} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent 0%, rgba(212,175,55,0.75) 20%, rgba(212,175,55,0.95) 50%, rgba(212,175,55,0.75) 80%, transparent 100%)', transformOrigin: 'left', pointerEvents: 'none', zIndex: 8 }} />
          {/* Right: top → bottom */}
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent 0%, rgba(212,175,55,0.65) 20%, rgba(212,175,55,0.65) 80%, transparent 100%)', transformOrigin: 'top', pointerEvents: 'none', zIndex: 8 }} />
          {/* Bottom: right → left */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.8, duration: 0.9, ease: [0.4, 0, 0.2, 1] }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to left, transparent 0%, rgba(212,175,55,0.75) 20%, rgba(212,175,55,0.95) 50%, rgba(212,175,55,0.75) 80%, transparent 100%)', transformOrigin: 'right', pointerEvents: 'none', zIndex: 8 }} />
          {/* Left: bottom → top */}
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 2.7, duration: 0.6, ease: [0.4, 0, 0.2, 1] }} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 1, background: 'linear-gradient(to top, transparent 0%, rgba(212,175,55,0.65) 20%, rgba(212,175,55,0.65) 80%, transparent 100%)', transformOrigin: 'bottom', pointerEvents: 'none', zIndex: 8 }} />

          {/* Gold corner brackets */}
          <div style={{ position: 'absolute', top: 54, left: 14, width: 18, height: 18, borderTop: '1px solid rgba(212,175,55,0.40)', borderLeft: '1px solid rgba(212,175,55,0.40)', pointerEvents: 'none', zIndex: 9 }} />
          <div style={{ position: 'absolute', top: 54, right: 14, width: 18, height: 18, borderTop: '1px solid rgba(212,175,55,0.40)', borderRight: '1px solid rgba(212,175,55,0.40)', pointerEvents: 'none', zIndex: 9 }} />
          <div style={{ position: 'absolute', bottom: 14, left: 14, width: 18, height: 18, borderBottom: '1px solid rgba(212,175,55,0.28)', borderLeft: '1px solid rgba(212,175,55,0.28)', pointerEvents: 'none', zIndex: 9 }} />
          <div style={{ position: 'absolute', bottom: 14, right: 14, width: 18, height: 18, borderBottom: '1px solid rgba(212,175,55,0.28)', borderRight: '1px solid rgba(212,175,55,0.28)', pointerEvents: 'none', zIndex: 9 }} />

          {/* Cinematic media — video first, then 3D model, then hero image */}
          {config.videoPath ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', background: '#000' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 'min(45vh, 100vw)', aspectRatio: '1 / 1', overflow: 'hidden', background: '#000' }}>
               <video autoPlay loop muted playsInline preload="metadata"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', pointerEvents: 'none' }}>
                <source src={config.videoPath} type="video/mp4" />
              </video>
              <GoldParticles />
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'55%', background:'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(212,175,55,0.13) 0%, transparent 65%)', pointerEvents:'none', zIndex:12 }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 90% at 50% 50%, transparent 48%, rgba(0,0,0,0.72) 100%)', pointerEvents:'none', zIndex:12 }} />
              <div style={{ position:'absolute', left:0, right:0, bottom:0, height:'45%', background:'linear-gradient(to bottom, transparent, rgba(0,0,0,0.98))', pointerEvents:'none', zIndex:13 }} />
              <div style={{ position:'absolute', top:'8%', left:'25%', width:'50%', height:'30%', background:'radial-gradient(ellipse at center, rgba(212,175,55,0.09) 0%, transparent 68%)', pointerEvents:'none', zIndex:12, animation:'shimmerPulse 5s ease-in-out infinite' }} />
            </div>
              </div>
            </div>
          ) : config.modelPath ? (
            <div style={{ position: 'absolute', inset: 0, zIndex: 10, paddingTop: '46px', paddingBottom: '2px' }}>
              <model-viewer
                src={config.modelPath}
                alt={config.heroTitle}
                auto-rotate=""
                auto-rotate-delay="0"
                camera-orbit="0deg 70deg 5.2m"
                camera-target="0m 0.52m 0m"
                field-of-view="38deg"
                min-field-of-view="30deg"
                max-field-of-view="52deg"
                min-camera-orbit="auto auto auto"
                max-camera-orbit="auto auto 7m"
                interaction-prompt="none"
                exposure="1.3"
                shadow-intensity="0.9"
                shadow-softness="1"
                rotation-per-second="10deg"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'transparent' }}
              />
            </div>
          ) : (
            <motion.div initial={{ scale: 1.12, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 3.2, ease: [0.25, 0.1, 0.1, 1] }} style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
              <img src={config.heroImage} alt={config.heroTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }} />
            </motion.div>
          )}

          {/* Text overlaid at bottom — only when NO model (existing products) */}
          {!config.modelPath && !config.videoPath && (
            <motion.div style={{ opacity: textOpacity, y: textY, position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20, padding: '0 clamp(20px,5vw,80px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1 }} style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 16 }}>{config.heroTagline}</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1.6, ease: [0.16, 1, 0.3, 1] }} style={{ fontFamily: SERIF, fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 0.88, color: '#f8f4ee', marginBottom: 14, fontSize: 'clamp(3rem,10vw,9.5rem)' }}>{config.heroTitle}</motion.h1>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.5, duration: 1.2 }} style={{ height: 1, width: 180, background: 'linear-gradient(to right, #c9a054 0%, rgba(201,160,84,0.3) 60%, transparent 100%)', marginBottom: 12, transformOrigin: 'left' }} />
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: 1 }} style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1rem,3vw,2rem)', color: 'rgba(240,236,228,0.65)', fontWeight: 300, marginBottom: 20 }}>{config.heroSubtitle}</motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 0.8 }} style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem,5vw,3.2rem)', fontWeight: 300, color: '#f8f4ee' }}>{formatPKR(finalPkr)}</span>
                <span style={{ fontSize: 12, letterSpacing: '0.2em', color: 'rgba(201,160,84,0.5)' }}>${product.price_usd} USD</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.9, duration: 0.8 }} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#acquire" className="group" style={{ position: 'relative', overflow: 'hidden', padding: '14px 32px', border: '1px solid rgba(201,160,84,0.55)', fontSize: 8, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', display: 'inline-block', textDecoration: 'none' }}>
                  <span className="absolute inset-0 bg-[#c9a054] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="relative group-hover:text-black transition-colors duration-150">Acquire Now</span>
                </a>
                <a href="#legacy" style={{ padding: '14px 32px', border: '1px solid rgba(255,255,255,0.1)', fontSize: 8, letterSpacing: '0.7em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', display: 'inline-block', textDecoration: 'none' }} onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }} onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}>Explore Archive</a>
              </motion.div>
            </motion.div>
          )}

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}
            style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 30, pointerEvents: 'none' }}>
            <span style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.38)', writingMode: 'vertical-lr' }}>Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <ArrowDown size={10} color="rgba(201,160,84,0.38)" />
            </motion.div>
          </motion.div>
        </section>

        {/* PRODUCT INFO — fully below the 3D model section */}
        {(config.modelPath || config.videoPath) && (
          <section style={{ background: '#030303', padding: 'clamp(40px,7vw,72px) clamp(20px,5vw,80px)', textAlign: 'center', borderTop: '1px solid rgba(201,160,84,0.1)' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
              <p style={{ fontSize: 7, letterSpacing: '0.85em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 20 }}>{config.heroTagline}</p>
              <div style={{ width: 72, height: 1, background: 'linear-gradient(to right, transparent, #c9a054, transparent)', margin: '0 auto 24px' }} />
              <h1 style={{ fontFamily: SERIF, fontWeight: 300, letterSpacing: '0.2em', lineHeight: 0.9, color: '#f8f4ee', marginBottom: 16, textTransform: 'uppercase', fontSize: 'clamp(2.8rem,10vw,6rem)' }}>{config.heroTitle}</h1>
              {config.category && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(201,160,84,0.28)', padding: '6px 20px', marginBottom: 12, marginTop: 10, background: 'rgba(201,160,84,0.04)' }}>
                  <span style={{ fontSize: 6, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054' }}>◆ {config.category}</span>
                </div>
              )}
              <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1rem,3vw,1.5rem)', color: 'rgba(240,236,228,0.6)', marginBottom: 8 }}>{config.heroSubtitle}</p>
              <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 32 }}>Love does not fade — it blooms into eternity</p>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 18, marginBottom: 20, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,6vw,2.8rem)', fontWeight: 300, color: '#f8f4ee' }}>{formatPKR(finalPkr)}</span>
                <span style={{ fontSize: 12, letterSpacing: '0.2em', color: 'rgba(201,160,84,0.5)' }}>${product.price_usd} USD</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(201,160,84,0.22)', padding: '10px 24px', marginBottom: 36, background: 'rgba(201,160,84,0.04)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a054', flexShrink: 0 }} />
                <p style={{ fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a054', margin: 0 }}>NFT Sovereign Passport · Polygon Mainnet</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
                <a href="#acquire" className="group" style={{ position: 'relative', overflow: 'hidden', padding: '15px 40px', fontSize: 8, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#050202', display: 'inline-block', textDecoration: 'none', background: 'linear-gradient(135deg, #c9a054 0%, #b8860b 100%)', fontWeight: 600 }}>Acquire Archive I</a>
                <a href="#legacy" style={{ padding: '15px 40px', border: '1px solid rgba(201,160,84,0.35)', fontSize: 8, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', display: 'inline-block', textDecoration: 'none' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,160,84,0.08)' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}>Explore Archive</a>
              </div>
            </motion.div>
          </section>
        )}


              {/* ACQUIRE */}
      <section id="acquire" style={{ padding: 'clamp(56px,8vw,100px) 0', background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(30,22,8,0.9) 0%, #030303 55%)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
          <div className="s-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>Acquisition</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.4rem,6vw,5rem)', fontWeight: 300, color: '#f0ece4', letterSpacing: '0.05em' }}>Claim Your Sovereign</h2>
          </div>

          <div className="s-reveal">
            <div style={{ textAlign: 'center', padding: 'clamp(20px,4vw,32px) 24px', border: '1px solid rgba(201,160,84,0.12)', background: 'linear-gradient(135deg, #0e0a04 0%, #0a0703 100%)', marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', marginBottom: 12 }}>Sovereign Allocation Price</p>
              <p style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,7vw,4.5rem)', fontWeight: 300, color: '#f8f4ee', lineHeight: 1 }}>{formatPKR(finalPkr)}</p>
              <p style={{ fontSize: 12, letterSpacing: '0.2em', color: 'rgba(201,160,84,0.45)', marginTop: 8 }}>${(product.price_usd * quantity).toFixed(2)} USD</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', border: '1px solid rgba(201,160,84,0.08)', background: '#0a0703', marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830' }}>Quantity</p>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(201,160,84,0.15)' }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a054', borderRight: '1px solid rgba(201,160,84,0.15)', background: 'none', cursor: 'pointer' }}>−</button>
                <span style={{ width: 44, textAlign: 'center', fontFamily: SERIF, fontSize: 18, color: '#f0ece4' }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a054', borderLeft: '1px solid rgba(201,160,84,0.15)', background: 'none', cursor: 'pointer' }}>+</button>
              </div>
            </div>

            <div style={{ marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', padding: '12px 20px', background: '#0a0703', border: '1px solid rgba(201,160,84,0.08)' }}>Delivery Information</p>
              {([
                { v: custName, s: setCustName, ph: 'Full Name *' },
                { v: custPhone, s: setCustPhone, ph: 'Phone Number *' },
                { v: custAddress, s: setCustAddress, ph: 'Delivery Address *' },
                { v: custCity, s: setCustCity, ph: 'City *' },
              ] as { v: string; s: (val: string) => void; ph: string }[]).map(({ v, s, ph }) => (
                <input
                  key={ph}
                  value={v}
                  onChange={e => s(e.target.value)}
                  placeholder={ph}
                  style={{ width: '100%', background: '#080602', border: 'none', borderBottom: '1px solid rgba(201,160,84,0.06)', padding: '16px 20px', fontSize: 11, color: '#c9b894', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'rgba(201,160,84,0.3)' }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(201,160,84,0.06)' }}
                />
              ))}
            </div>

            <div style={{ marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', padding: '12px 20px', background: '#0a0703', border: '1px solid rgba(201,160,84,0.08)', marginBottom: 2 }}>Payment Method</p>
              <div className="pay-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, marginBottom: 16 }}>
                {(['crypto', 'pkr_manual', 'cod'] as PayMethod[]).map(m => (
                  <button
                    key={m}
                    onClick={() => setPayMethod(m)}
                    style={{ padding: '14px 4px', fontSize: 7, letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s', background: payMethod === m ? 'rgba(201,160,84,0.08)' : '#080602', color: payMethod === m ? '#c9a054' : '#3f3830', border: payMethod === m ? '1px solid rgba(201,160,84,0.3)' : '1px solid rgba(255,255,255,0.04)' }}
                  >
                    {m === 'crypto' ? '◆ Crypto' : m === 'pkr_manual' ? 'PKR Transfer' : 'COD'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {payMethod === 'crypto' && (
                  <motion.div key="crypto" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Web3PaySection priceUsd={product.price_usd * quantity} onSuccess={handleWeb3Success} />
                  </motion.div>
                )}
                {payMethod === 'pkr_manual' && (
                  <motion.div key="pkr" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ border: '1px solid rgba(201,160,84,0.1)', background: '#080602' }}>
                      {([
                        ['EasyPaisa', `${EASYPAISA_NUMBER} · ${EASYPAISA_NAME}`, EASYPAISA_NUMBER],
                        ['UBL IBAN', UBL_IBAN, UBL_IBAN],
                      ] as [string, string, string][]).map(([lbl, val, copyVal], i, arr) => (
                        <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, padding: '16px 20px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830' }}>{lbl}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#c9b894', wordBreak: 'break-all' }}>{val}</p>
                            <CopyBtn text={copyVal} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <input
                      value={txId}
                      onChange={e => setTxId(e.target.value)}
                      placeholder="Transaction ID / Reference Number"
                      style={{ background: '#080602', border: '1px solid rgba(201,160,84,0.08)', padding: '14px 20px', fontSize: 11, color: '#c9b894', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                    />
                    <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', border: '1px dashed rgba(201,160,84,0.12)', cursor: 'pointer', background: '#080602' }}>
                      <Upload size={12} color="rgba(201,160,84,0.4)" />
                      <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3f3830' }}>Upload Payment Screenshot</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const f = e.target.files?.[0]; if (!f) return; setProofFile(f)
                          const r = new FileReader(); r.onload = ev => setProofPreview(ev.target?.result as string); r.readAsDataURL(f)
                        }}
                        className="hidden"
                      />
                    </label>
                    {proofPreview && (
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={proofPreview} alt="proof" style={{ height: 80, opacity: 0.7 }} />
                        <button onClick={() => { setProofFile(null); setProofPreview(null) }} style={{ position: 'absolute', top: 4, right: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#c9a054' }}><X size={12} /></button>
                      </div>
                    )}
                    {orderError && <p style={{ fontSize: 9, color: 'rgba(248,113,113,0.7)', letterSpacing: '0.1em' }}>{orderError}</p>}
                    <button onClick={handlePlaceOrder} disabled={submitting} className="group" style={{ position: 'relative', overflow: 'hidden', padding: '18px', border: '1px solid rgba(201,160,84,0.45)', fontSize: 8, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.5 : 1, background: 'none', width: '100%' }}>
                      <span className="absolute inset-0 bg-[#c9a054] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <span className="relative group-hover:text-black transition-colors duration-150">{submitting ? 'Processing...' : 'Submit Sovereign Order'}</span>
                    </button>
                  </motion.div>
                )}
                {payMethod === 'cod' && (
                  <motion.div key="cod" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ padding: '24px 20px', border: '1px solid rgba(201,160,84,0.1)', background: '#080602' }}>
                      <p style={{ fontFamily: SERIF, fontSize: 22, color: '#c9b894', marginBottom: 8 }}>Cash on Delivery</p>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 300, lineHeight: 1.8 }}>Pay upon white-glove delivery within Pakistan. Our concierge confirms via WhatsApp within 2 hours.</p>
                    </div>
                    {orderError && <p style={{ fontSize: 9, color: 'rgba(248,113,113,0.7)' }}>{orderError}</p>}
                    <button onClick={handlePlaceOrder} disabled={submitting} className="group" style={{ position: 'relative', overflow: 'hidden', padding: '18px', border: '1px solid rgba(201,160,84,0.45)', fontSize: 8, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.5 : 1, background: 'none', width: '100%' }}>
                      <span className="absolute inset-0 bg-[#c9a054] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <span className="relative group-hover:text-black transition-colors duration-150">{submitting ? 'Placing Order...' : 'Confirm COD Order'}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>


      {/* LEGACY */}
      <section id="legacy" style={{ padding: 'clamp(56px,8vw,100px) 0', position: 'relative', background: 'linear-gradient(180deg, #030303 0%, #080602 50%, #030303 100%)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(20px,4vw,24px)', textAlign: 'center' }}>
          <div className="s-reveal">
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 32 }}>Legacy Statement</p>
          </div>
          <div className="s-reveal">
            <blockquote style={{ fontFamily: SERIF, fontSize: 'clamp(1.5rem,4.5vw,3.6rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.25, marginBottom: 32 }}>
              "{config.legacyStatement}"
            </blockquote>
          </div>
          <div className="s-reveal">
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(0.95rem,2.2vw,1.5rem)', color: 'rgba(240,236,228,0.4)', fontWeight: 300, lineHeight: 1.9, maxWidth: 660, margin: '0 auto' }}>
              {config.legacyVoice}
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {images.length > 0 && (
        <section style={{ padding: 'clamp(44px,7vw,80px) 0', background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #0e0903 0%, #030303 65%)' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(20px,4vw,24px)' }}>
            <div className="s-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>Sovereign Flacon</p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 300, color: '#f0ece4', letterSpacing: '0.08em' }}>The Archive Object</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 4 }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  className="s-reveal"
                  onClick={() => setActiveGallery(i)}
                  style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', cursor: 'pointer', border: activeGallery === i ? '1px solid rgba(201,160,84,0.5)' : '1px solid rgba(255,255,255,0.04)', background: '#080604', transition: 'border-color 0.4s' }}
                >
                  <motion.img
                    src={img}
                    alt=""
                    animate={{ scale: activeGallery === i ? 1.04 : 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 24 }}
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0.2' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at bottom, rgba(201,160,84,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCENT ARCHITECTURE */}
      <section style={{ padding: 'clamp(56px,8vw,100px) 0', background: 'linear-gradient(180deg, #030303 0%, #090703 40%, #030303 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,4vw,24px)' }}>
          <div className="s-reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>Olfactory Architecture</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 300, color: '#f0ece4', letterSpacing: '0.08em' }}>Scent Pyramid</h2>
          </div>
          <div className="scent-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1 }}>
            {[
              { tier: 'TOP', label: 'Opening Veil', notes: config.topNotes, glow: 'rgba(201,160,84,0.05)' },
              { tier: 'HEART', label: 'Sovereign Core', notes: config.heartNotes, glow: 'rgba(201,160,84,0.07)' },
              { tier: 'BASE', label: 'Eternal Foundation', notes: config.baseNotes, glow: 'rgba(201,160,84,0.04)' },
            ].map(layer => (
              <div
                key={layer.tier}
                className="s-reveal"
                style={{ padding: 'clamp(24px,4vw,40px) clamp(18px,3vw,32px)', background: `radial-gradient(ellipse at top, ${layer.glow} 0%, transparent 70%), linear-gradient(180deg, #0c0906 0%, #080603 100%)`, border: '1px solid rgba(201,160,84,0.06)' }}
              >
                <p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.6)', marginBottom: 6 }}>{layer.tier}</p>
                <p style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 300, color: '#c9b894', marginBottom: 24 }}>{layer.label}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {layer.notes.map((note, ni) => (
                    <div key={ni} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ width: 4, height: 4, background: 'rgba(201,160,84,0.4)', borderRadius: '50%', flexShrink: 0, marginTop: 6 }} />
                      <p style={{ color: 'rgba(240,236,228,0.55)', fontSize: 13, fontWeight: 300, lineHeight: 1.5 }}>{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFORMANCE MATRIX */}
      <section style={{ padding: 'clamp(56px,8vw,100px) 0', background: 'radial-gradient(ellipse 70% 50% at 50% 50%, #0e0903 0%, #030303 60%)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 clamp(20px,4vw,24px)' }}>
          <div className="s-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>Technical Specifications</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 300, color: '#f0ece4' }}>Performance Matrix</h2>
          </div>
          <div className="s-reveal" style={{ border: '1px solid rgba(201,160,84,0.1)', background: 'linear-gradient(180deg, #0c0906 0%, #080603 100%)' }}>
            {config.specs.map((spec, i) => (
              <div
                key={spec.label}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, padding: '18px clamp(16px,3vw,28px)', borderBottom: i < config.specs.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
              >
                <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', flexShrink: 0 }}>{spec.label}</p>
                <p style={{ fontFamily: SERIF, fontSize: 15, color: '#c9b894', fontWeight: 300, wordBreak: 'break-word', textAlign: 'right' }}>{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMBASSADOR — The Sovereign Statement */}
      {config.ambassadorImage && (
        <section style={{ position: 'relative', height: 'clamp(380px,70vh,680px)', overflow: 'hidden' }}>
          <img
            src={config.ambassadorImage}
            alt="The Sovereign Statement"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
          />
          {/* Dark luxury overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.52) 45%, rgba(0,0,0,0.80) 100%)' }} />
          {/* Gold accent lines */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #c9a054 35%, #c9a054 65%, transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #c9a054 35%, #c9a054 65%, transparent)' }} />
          {/* Text content — bottom-left aligned, luxury editorial style */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(28px,5vw,64px) clamp(24px,6vw,80px)' }}>
            <div style={{ width: 36, height: 1, background: '#c9a054', marginBottom: 18 }} />
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 16, fontWeight: 400 }}>The Sovereign Statement</p>
            <blockquote style={{ fontFamily: SERIF, fontSize: 'clamp(1.3rem,3.2vw,2.5rem)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.35, maxWidth: 560, margin: 0, fontStyle: 'italic' }}>
              &ldquo;{config.ambassadorQuote ?? 'Power is not worn. It is distilled.'}&rdquo;
            </blockquote>
          </div>
        </section>
      )}

      {/* DIGITAL SOVEREIGN PASSPORT */}
      <section style={{ padding: 'clamp(56px,8vw,100px) 0', position: 'relative', background: 'linear-gradient(180deg, #030303 0%, #060510 50%, #030303 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,4vw,24px)' }}>
          <div className="s-reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: 'rgba(130,71,229,0.6)', marginBottom: 12 }}>Polygon · Blockchain Identity</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 300, color: '#f0ece4' }}>Digital Sovereign Passport</h2>
          </div>
          <div className="nft-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 64, alignItems: 'start' }}>
            <div className="s-reveal">
              <NftCard config={config} />
            </div>
            <div className="s-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <p style={{ fontFamily: SERIF, fontSize: 'clamp(20px,3vw,28px)', fontWeight: 300, color: '#f0ece4', marginBottom: 12 }}>Blockchain Authentication</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 300, lineHeight: 1.9 }}>Every sovereign creation carries a permanent, irrevocable proof of authenticity on the Polygon blockchain — the NFT is your identity, inseparable from the physical artifact.</p>
              </div>
              <div style={{ border: '1px solid rgba(201,160,84,0.1)', background: 'linear-gradient(135deg, #0c0906 0%, #080603 100%)' }}>
                {[
                  { label: 'Contract', value: `${NFT_CONTRACT.slice(0, 10)}...${NFT_CONTRACT.slice(-6)}`, copy: NFT_CONTRACT },
                  { label: 'Network', value: 'Polygon Mainnet', copy: null },
                  { label: 'Standard', value: 'ERC-721 Non-Fungible', copy: null },
                  { label: 'Rarity', value: config.nftRarity, copy: null },
                  { label: 'Merchant', value: `${MERCHANT_WALLET.slice(0, 8)}...${MERCHANT_WALLET.slice(-6)}`, copy: MERCHANT_WALLET },
                ].map((row, i, arr) => (
                  <div
                    key={row.label}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, padding: '14px clamp(12px,2vw,20px)', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                  >
                    <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830', flexShrink: 0 }}>{row.label}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#c9b894', wordBreak: 'break-all' }}>{row.value}</p>
                      {row.copy && <CopyBtn text={row.copy} />}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={`https://polygonscan.com/address/${NFT_CONTRACT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mob-full"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 20px', border: '1px solid rgba(130,71,229,0.25)', fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(130,71,229,0.7)', textDecoration: 'none' }}
              >
                <ExternalLink size={10} /> View on Polygonscan
              </a>

              {/* ── CLAIM YOUR NFT SOVEREIGN PASSPORT ── */}
              <div style={{ marginTop: 28, border: '1px solid rgba(201,160,84,0.15)', background: 'linear-gradient(135deg, #0c0906 0%, #080603 100%)' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(201,160,84,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 6, height: 6, background: '#c9a054', transform: 'rotate(45deg)', flexShrink: 0 }} />
                  <p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054' }}>Claim Your Sovereign Passport NFT</p>
                </div>
                <div style={{ padding: '20px' }}>
                  {mintStatus === 'success' && mintResult ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(201,160,84,0.06)', border: '1px solid rgba(201,160,84,0.22)' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a054' }} />
                        <p style={{ fontSize: 10, color: '#c9b894', letterSpacing: '0.04em' }}>Minted — Sovereign Passport #{String(mintResult.tokenId).padStart(4,'0')}</p>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <a href={mintResult.openSeaUrl} target="_blank" rel="noopener noreferrer"
                          style={{ flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, padding:'11px 16px', border:'1px solid rgba(201,160,84,0.35)', fontSize:7, letterSpacing:'0.3em', textTransform:'uppercase', color:'#c9a054', textDecoration:'none' }}>
                          <ExternalLink size={9} /> OpenSea
                        </a>
                        <a href={mintResult.polygonScanUrl} target="_blank" rel="noopener noreferrer"
                          style={{ flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, padding:'11px 16px', border:'1px solid rgba(130,71,229,0.28)', fontSize:7, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(130,71,229,0.75)', textDecoration:'none' }}>
                          <ExternalLink size={9} /> PolygonScan
                        </a>
                      </div>
                      <p style={{ fontFamily:'monospace', fontSize:9, color:'rgba(201,160,84,0.4)', wordBreak:'break-all' }}>TX: {mintResult.txHash.slice(0,22)}...</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <p style={{ fontSize: 11, color: 'rgba(240,236,228,0.32)', lineHeight: 1.8, fontWeight: 300 }}>After purchase, enter your Polygon wallet address to receive your Sovereign Passport NFT. Works with MetaMask, Trust Wallet, Coinbase Wallet and all WalletConnect wallets.</p>
                      {walletAddress ? (
                        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', background:'rgba(201,160,84,0.04)', border:'1px solid rgba(201,160,84,0.14)' }}>
                          <div style={{ width:5, height:5, borderRadius:'50%', background:'#c9a054', flexShrink:0 }} />
                          <p style={{ fontFamily:'monospace', fontSize:9, color:'#c9b894', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{walletAddress}</p>
                          <p style={{ fontSize:6, letterSpacing:'0.4em', color:'rgba(201,160,84,0.5)', textTransform:'uppercase', flexShrink:0 }}>Connected</p>
                        </div>
                      ) : (
                        <input
                          value={mintWallet}
                          onChange={e => setMintWallet(e.target.value)}
                          placeholder="0x... Your Polygon Wallet Address"
                          style={{ width:'100%', background:'#080602', border:'none', borderBottom:'1px solid rgba(201,160,84,0.12)', padding:'13px 16px', fontSize:10, color:'#c9b894', outline:'none', fontFamily:'monospace', boxSizing:'border-box' }}
                          onFocus={e=>{ e.currentTarget.style.borderBottomColor='rgba(201,160,84,0.45)' }}
                          onBlur={e=>{ e.currentTarget.style.borderBottomColor='rgba(201,160,84,0.12)' }}
                        />
                      )}
                      {mintStatus === 'error' && (
                        <p style={{ fontSize:10, color:'rgba(255,88,88,0.7)' }}>Please enter a valid Polygon wallet address (0x...)</p>
                      )}
                      <button
                        onClick={handleMintNFT}
                        disabled={mintStatus === 'minting'}
                        style={{ padding:'14px 24px', border:'1px solid rgba(201,160,84,0.4)', fontSize:7, letterSpacing:'0.55em', textTransform:'uppercase', color: mintStatus==='minting' ? 'rgba(201,160,84,0.35)' : '#c9a054', background:'none', cursor: mintStatus==='minting' ? 'not-allowed' : 'pointer', width:'100%', transition:'all 0.3s' }}
                        onMouseEnter={e=>{ if(mintStatus!=='minting')(e.currentTarget as HTMLButtonElement).style.background='rgba(201,160,84,0.06)' }}
                        onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.background='none' }}
                      >
                        {mintStatus === 'minting' ? '◆  Minting on Polygon Mainnet...' : '◆  Mint Sovereign Passport'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


        {/* HOLDER PRIVILEGES */}
        {config.holderPrivileges && config.holderPrivileges.length > 0 && (
          <section style={{ padding: 'clamp(56px,8vw,100px) 0', background: 'linear-gradient(180deg, #030303 0%, #060401 50%, #030303 100%)' }}>
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(20px,4vw,24px)' }}>
              <div className="s-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
                <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>Ownership Benefits</p>
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,40px)', fontWeight: 300, color: '#f0ece4', marginBottom: 20, letterSpacing: '0.05em' }}>Holder Privileges</h2>
                <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #c9a054, transparent)', margin: '0 auto' }} />
              </div>
              <div className="s-reveal" style={{ border: '1px solid rgba(201,160,84,0.22)', background: 'rgba(8,6,2,0.7)' }}>
                {config.holderPrivileges.map((privilege, i) => {
                  const [title, ...rest] = privilege.split(' — ')
                  const description = rest.join(' — ')
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 20, padding: '20px 28px',
                        borderBottom: i < config.holderPrivileges!.length - 1 ? '1px solid rgba(201,160,84,0.06)' : 'none',
                      }}
                    >
                      <div style={{ paddingTop: 6, flexShrink: 0 }}>
                        <div style={{ width: 6, height: 6, background: '#c9a054', transform: 'rotate(45deg)' }} />
                      </div>
                      <div>
                        {description ? (
                          <>
                            <p style={{ fontSize: 11, color: '#c9b894', fontWeight: 400, letterSpacing: '0.04em', marginBottom: 3 }}>{title}</p>
                            <p style={{ fontSize: 11, color: 'rgba(240,236,228,0.45)', fontWeight: 300, lineHeight: 1.6 }}>{description}</p>
                          </>
                        ) : (
                          <p style={{ fontSize: 12, color: 'rgba(240,236,228,0.75)', fontWeight: 300, letterSpacing: '0.02em', lineHeight: 1.6 }}>{privilege}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}


      {/* RELATED */}
      <section style={{ padding: 'clamp(44px,7vw,80px) 0 clamp(56px,8vw,100px)', background: '#030303', borderTop: '1px solid rgba(201,160,84,0.06)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(20px,4vw,24px)', textAlign: 'center' }}>
          <div className="s-reveal" style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 10 }}>The Sovereign House</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: 'rgba(240,236,228,0.4)' }}>Explore the Archive</h2>
          </div>
          <div className="s-reveal" style={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
            {(
              ['kyoto-sacred-incense','sf-kyoto-sacred-incense','kyoto-incense','sf-kyoto-incense','midnight-iris-royale','eternal-sovereign','house-vault-no-001','sovereign-genesis'].includes(product.slug)
                  ? [
                      { slug: 'kyoto-sacred-incense', name: 'Kyoto Sacred Incense', sub: 'The Sovereign Sanctuary' },
                      { slug: 'midnight-iris-royale', name: 'Midnight Iris Royale', sub: 'The Obsidian Crown' },
                      { slug: 'eternal-sovereign', name: 'Eternal Sovereign', sub: 'The Sovereign Throne' },
                      { slug: 'house-vault-no-001', name: 'House Vault No.001', sub: "The Collector's Archive" },
                      { slug: 'sovereign-genesis', name: 'Sovereign Genesis', sub: 'The Origin' },
                    ]
                  : ['shamim-s-ghost-the-eternal-legacy','founder-s-eternal-archive','sapphire-blue-levant','sovereign-oud-absolute','imperial-black-throne'].includes(product.slug)
                ? [
                    { slug: 'shamim-s-ghost-the-eternal-legacy', name: "Shamim's Ghost", sub: 'The Eternal Legacy' },
                    { slug: 'founder-s-eternal-archive', name: "Founder's Eternal Archive", sub: 'The Sovereign Vault' },
                    { slug: 'sapphire-blue-levant', name: 'Sapphire Blue Levant', sub: 'The Sovereign Mediterranean' },
                    { slug: 'sovereign-oud-absolute', name: 'Sovereign Oud Absolute', sub: 'The Imperial Resins' },
                    { slug: 'imperial-black-throne', name: 'Imperial Black Throne', sub: 'The Sovereign Seclusion' },
                  ]
                : [
                    { slug: 'shamims-bloom', name: "Shamim's Bloom", sub: 'Archive I' },
                    { slug: 'queen-of-taif', name: 'Queen of Taif', sub: 'Archive II' },
                    { slug: 'her-legacy-vault', name: 'Her Legacy Vault', sub: 'Grand Sovereign' },
                  ]
            ).filter(p => p.slug !== product.slug).map(p => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                style={{ padding: '20px 28px', border: '1px solid rgba(201,160,84,0.08)', background: '#080602', display: 'block', textDecoration: 'none', minWidth: 160, transition: 'border-color 0.5s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.08)' }}
              >
                <p style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 300, color: '#c9b894', marginBottom: 4 }}>{p.name}</p>
                <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830' }}>{p.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
