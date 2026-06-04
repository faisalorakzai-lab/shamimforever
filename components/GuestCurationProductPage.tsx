'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Copy, Check, Upload, X, ArrowDown } from 'lucide-react'
import type { Product } from '@/types'
import Web3PaySection, { type CoinType } from '@/components/Web3PaySection'
import { useAccount } from 'wagmi'
import { getGuestCurationConfig } from '@/lib/guest-curation-configs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type PayMethod = 'crypto' | 'pkr_manual' | 'cod'
interface OrderResult { order_id: string; order_ref: string; tracking_ref: string; status: string; track_url: string }

const SERIF = "'Cormorant Garamond', Georgia, serif"
const EASYPAISA_NUMBER = '03367970004'
const EASYPAISA_NAME = 'M Faisal'
const UBL_IBAN = 'PK13UNIL0109000318870498'

const GC_CSS = `
@media(max-width:768px){
  .gc-pay-grid{grid-template-columns:1fr 1fr!important}
  .gc-hero-overlay{padding: 0 20px 40px!important}
}
@keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
`

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

function formatPKR(n: number) {
  return 'Rs ' + Math.round(n).toLocaleString('en-PK')
}

export default function GuestCurationProductPage({ product }: { product: Product }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, 45])

  const config = getGuestCurationConfig(product.slug)

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
  const { address: walletAddress } = useAccount()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.utils.toArray<Element>('.gc-reveal').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 36, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
    })
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  const callCheckout = useCallback(async (opts: { paymentMethod: string; paymentStatus: string; txHash?: string; proofUrl?: string; walletAddress?: string }) => {
    const totalUsd = parseFloat((product.price_usd * quantity).toFixed(2))
    const res = await fetch('/api/v1/checkout', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: product.id, product_name: product.name, quantity,
        payment_method: opts.paymentMethod, payment_status: opts.paymentStatus,
        tx_hash: opts.txHash || null,
        shipping_address: { name: custName, phone: custPhone, line1: custAddress, city: custCity, country: 'Pakistan' },
        total_pkr: product.price_pkr * quantity, total_usd: totalUsd, discount_applied: 0,
        price_pkr: product.price_pkr, price_usd: product.price_usd,
        wallet_address: opts.walletAddress || null, payment_proof_url: opts.proofUrl || null, rarity_tier: 'ELITE',
      }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.error || 'Checkout failed')
    return data as OrderResult
  }, [product, quantity, custName, custPhone, custAddress, custCity])

  const handleWeb3Success = useCallback(async (txHash: string, coin: CoinType) => {
    try {
      setOrderResult(await callCheckout({ paymentMethod: coin.toLowerCase(), paymentStatus: 'paid', txHash, walletAddress: walletAddress || undefined }))
    } catch (err: any) {
      setOrderError(err?.message || 'Payment received. Contact us with your TX hash.')
    }
  }, [callCheckout, walletAddress])

  async function handlePlaceOrder() {
    if (!custName || !custPhone || !custAddress || !custCity) { setOrderError('Please fill in all delivery details.'); return }
    if (payMethod === 'pkr_manual' && !txId && !proofFile) { setOrderError('Provide Transaction ID or screenshot.'); return }
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

  const heroImage = config?.image || product.images?.[0] || null

  if (orderResult) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', background: '#030303' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: 500, width: '100%' }}>
          <div style={{ width: 48, height: 48, border: '1px solid rgba(201,160,84,0.3)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={18} color="#c9a054" />
          </div>
          <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 14 }}>Order Confirmed</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 300, color: '#f8f4ee', marginBottom: 8 }}>Allocation Secured</h1>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, color: 'rgba(240,236,228,0.45)', marginBottom: 32 }}>Your sovereign archive awaits delivery.</p>
          <div style={{ border: '1px solid rgba(201,160,84,0.1)', background: '#0a0703', padding: '20px 24px', marginBottom: 28 }}>
            {[['Order Reference', orderResult.order_ref], ['Tracking Reference', orderResult.tracking_ref], ['Status', orderResult.status?.toUpperCase()]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <p style={{ fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3f3830' }}>{k}</p>
                <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#c9b894' }}>{v}</p>
              </div>
            ))}
          </div>
          {orderResult.track_url && (
            <Link href={orderResult.track_url} style={{ fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a054', border: '1px solid rgba(201,160,84,0.25)', padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }}>
              Track Your Order
            </Link>
          )}
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ background: '#030303', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: GC_CSS }} />

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', background: '#000', width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
        {/* Gold border — static for instant load */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.9) 50%, transparent)', pointerEvents: 'none', zIndex: 8 }} />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.6) 50%, transparent)', pointerEvents: 'none', zIndex: 8 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.9) 50%, transparent)', pointerEvents: 'none', zIndex: 8 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 1, background: 'linear-gradient(to top, transparent, rgba(212,175,55,0.6) 50%, transparent)', pointerEvents: 'none', zIndex: 8 }} />
          
        {/* Corner brackets */}
        {[[{top:54,left:14},{borderTop:'1px solid rgba(212,175,55,0.4)',borderLeft:'1px solid rgba(212,175,55,0.4)'}],
          [{top:54,right:14},{borderTop:'1px solid rgba(212,175,55,0.4)',borderRight:'1px solid rgba(212,175,55,0.4)'}],
          [{bottom:14,left:14},{borderBottom:'1px solid rgba(212,175,55,0.25)',borderLeft:'1px solid rgba(212,175,55,0.25)'}],
          [{bottom:14,right:14},{borderBottom:'1px solid rgba(212,175,55,0.25)',borderRight:'1px solid rgba(212,175,55,0.25)'}]].map(([pos, border], i) => (
          <div key={i} style={{ position: 'absolute', ...pos as any, width: 18, height: 18, ...border as any, pointerEvents: 'none', zIndex: 9 }} />
        ))}

        {/* Product image — fills full 1:1 square like SovereignProductPage */}
          {heroImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{ position: 'absolute', inset: 0, zIndex: 2 }}
            >
              <img
                src={heroImage}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
              />
            </motion.div>
          )}

        {/* Radial vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.72) 100%)', pointerEvents: 'none', zIndex: 3 }} />
        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.96))', pointerEvents: 'none', zIndex: 4 }} />

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 30, pointerEvents: 'none' }}>
          <span style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.35)', writingMode: 'vertical-lr' }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown size={10} color="rgba(201,160,84,0.35)" />
          </motion.div>
        </motion.div>
      </section>

      {/* PRODUCT INFO — below image */}
      <section style={{ background: '#030303', padding: 'clamp(40px,7vw,72px) clamp(20px,5vw,80px)', textAlign: 'center', borderTop: '1px solid rgba(201,160,84,0.1)' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          {config && (
            <p style={{ fontSize: 7, letterSpacing: '0.85em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 20 }}>
              SF Guest Curation Series · Archive {config.archiveCode}
            </p>
          )}
          <div style={{ width: 72, height: 1, background: 'linear-gradient(to right, transparent, #c9a054, transparent)', margin: '0 auto 28px' }} />
          <h1 style={{ fontFamily: SERIF, fontWeight: 300, letterSpacing: '0.15em', lineHeight: 0.9, color: '#f8f4ee', marginBottom: 16, textTransform: 'uppercase', fontSize: 'clamp(2.8rem,10vw,7rem)' }}>
            {product.name}
          </h1>
          {config && (
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1rem,2.5vw,1.6rem)', color: 'rgba(240,236,228,0.55)', fontWeight: 300, marginBottom: 12 }}>
              {config.collectionName}
            </p>
          )}
          {config && (
            <p style={{ fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.5)', marginBottom: 32 }}>
              {config.classification}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 18, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,6vw,3rem)', fontWeight: 300, color: '#f8f4ee' }}>
              ${product.price_usd} <span style={{ fontSize: '0.4em', letterSpacing: '0.35em', color: '#c9a054' }}>USD</span>
            </span>
            <span style={{ fontSize: 11, letterSpacing: '0.12em', color: 'rgba(201,160,84,0.32)' }}>{formatPKR(product.price_pkr)}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <a href="#acquire" className="group" style={{ position: 'relative', overflow: 'hidden', padding: '15px 40px', fontSize: 8, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#050202', display: 'inline-block', textDecoration: 'none', background: 'linear-gradient(135deg, #c9a054 0%, #b8860b 100%)', fontWeight: 600 }}>
              Acquire Now
            </a>
            <a href="#archive" style={{ padding: '15px 40px', border: '1px solid rgba(201,160,84,0.35)', fontSize: 8, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', display: 'inline-block', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,160,84,0.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
              View Archive
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── ARCHIVE DETAILS ── */}
      {config && (
        <section id="archive" style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,80px)', background: 'linear-gradient(180deg, #000 0%, #06040200 60%, #030303 100%)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>

            {/* Section label */}
            <div className="gc-reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontSize: 6, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 10 }}>
                SF Guest Curation Series · Archive {config.archiveCode}
              </p>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, #c9a054, transparent)', margin: '0 auto 16px' }} />
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 300, color: '#f0ece4' }}>{config.collectionName}</h2>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.42)', marginTop: 10 }}>{config.archiveLabel}</p>
            </div>

            {/* Two-column: Signature Notes + Archive info */}
            <div className="gc-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 2 }}>
              {/* Signature Notes */}
              <div style={{ border: '1px solid rgba(201,160,84,0.1)', background: '#0a0703', padding: '28px 24px' }}>
                <p style={{ fontSize: 6, letterSpacing: '0.75em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 20 }}>Signature Notes</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {config.signatureNotes.map(note => (
                    <span key={note} style={{ fontFamily: SERIF, fontSize: 13, color: '#c9b894', border: '1px solid rgba(201,160,84,0.2)', padding: '4px 12px', background: 'rgba(201,160,84,0.04)' }}>
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Archive specs */}
              <div style={{ border: '1px solid rgba(201,160,84,0.1)', background: '#0a0703', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  ['Classification', config.classification],
                  ['Official Size', config.size],
                  ['Global Retail Value', `$${config.globalRetailUsd} USD`],
                  ['SF Allocation Price', `$${product.price_usd} USD`],
                ].map(([lbl, val], i, arr) => (
                  <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', gap: 12, flexWrap: 'wrap' }}>
                    <p style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', flexShrink: 0 }}>{lbl}</p>
                    <p style={{ fontFamily: SERIF, fontSize: 13, color: '#c9b894', fontWeight: 300, textAlign: 'right' }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why The House Curated It */}
            <div className="gc-reveal" style={{ border: '1px solid rgba(201,160,84,0.1)', background: '#080602', padding: 'clamp(28px,4vw,48px)', marginBottom: 2 }}>
              <p style={{ fontSize: 6, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 24 }}>— Why The House Curated It —</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {config.whyCurated.map((para, i) => (
                  <p key={i} style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(1rem,2.2vw,1.4rem)', color: i === 0 ? 'rgba(240,236,228,0.72)' : 'rgba(240,236,228,0.45)', fontWeight: 300, lineHeight: 1.75 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Curator's Positioning */}
            <div className="gc-reveal" style={{ border: '1px solid rgba(201,160,84,0.08)', background: '#060401', padding: 'clamp(24px,4vw,40px)', textAlign: 'center', marginBottom: 0 }}>
              <p style={{ fontSize: 6, letterSpacing: '0.9em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.45)', marginBottom: 20 }}>Curator's Positioning</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {config.curatorPositioning.map((line, i) => (
                  <p key={i} style={{ fontFamily: SERIF, fontSize: 'clamp(1.1rem,2.5vw,1.8rem)', fontWeight: 300, color: i % 2 === 0 ? 'rgba(240,236,228,0.65)' : 'rgba(201,160,84,0.7)', fontStyle: 'italic', lineHeight: 1.2 }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SOVEREIGN DISCLAIMER ── */}
      <section style={{ padding: 'clamp(40px,6vw,64px) clamp(20px,5vw,80px)', background: 'radial-gradient(ellipse 70% 50% at 50% 50%, #0e0903 0%, #030303 65%)' }}>
        <div className="gc-reveal" style={{ maxWidth: 720, margin: '0 auto', border: '1px solid rgba(201,160,84,0.1)', background: '#0a0703', padding: 'clamp(24px,4vw,40px)', textAlign: 'center' }}>
          <div style={{ width: 40, height: 1, background: 'linear-gradient(to right, transparent, #c9a054, transparent)', margin: '0 auto 18px' }} />
          <p style={{ fontSize: 6, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 20 }}>Sovereign Statement</p>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(0.95rem,2vw,1.25rem)', color: 'rgba(240,236,228,0.55)', fontWeight: 300, lineHeight: 1.85, marginBottom: 10 }}>
            The House of Shamim Forever does not manufacture these fragrances.
          </p>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(0.85rem,1.8vw,1.1rem)', color: 'rgba(240,236,228,0.38)', fontWeight: 300, lineHeight: 1.85, marginBottom: 10 }}>
            Each masterpiece is independently created by its respective luxury fragrance house.
          </p>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(0.85rem,1.8vw,1.1rem)', color: 'rgba(240,236,228,0.38)', fontWeight: 300, lineHeight: 1.85, marginBottom: 10 }}>
            Our role is curation, authentication, preservation, and allocation.
          </p>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(0.85rem,1.8vw,1.1rem)', color: 'rgba(240,236,228,0.38)', fontWeight: 300, lineHeight: 1.85 }}>
            Every fragrance enters the Sovereign Vault only after meeting our standards for craftsmanship, cultural significance, performance, and collector value.
          </p>
          <div style={{ width: 40, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,160,84,0.4), transparent)', margin: '20px auto 0' }} />
        </div>
      </section>

      {/* ── ACQUISITION ── */}
      <section id="acquire" style={{ padding: 'clamp(52px,8vw,90px) 0 clamp(64px,9vw,100px)', background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(25,18,6,0.95) 0%, #030303 55%)' }}>
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
          <div className="gc-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 10 }}>Acquisition</p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 300, color: '#f0ece4' }}>Claim This Masterpiece</h2>
            {config && (
              <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: 'rgba(240,236,228,0.3)', marginTop: 8 }}>
                {config.collectionName} · Archive {config.archiveCode}
              </p>
            )}
          </div>

          <div className="gc-reveal">
            {/* Price block */}
            <div style={{ textAlign: 'center', padding: '28px', border: '1px solid rgba(201,160,84,0.12)', background: '#0c0906', marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', marginBottom: 10 }}>Allocation Price</p>
              <p style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,6vw,3.8rem)', fontWeight: 300, color: '#f8f4ee', lineHeight: 1 }}>
                ${(product.price_usd * quantity).toFixed(0)} <span style={{ fontSize: '0.4em', letterSpacing: '0.35em', color: '#c9a054' }}>USD</span>
              </p>
              <p style={{ fontSize: 11, color: 'rgba(201,160,84,0.3)', marginTop: 6 }}>{formatPKR(product.price_pkr * quantity)}</p>
            </div>

            {/* Quantity */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', border: '1px solid rgba(201,160,84,0.06)', background: '#0a0703', marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830' }}>Quantity</p>
              <div style={{ display: 'flex', border: '1px solid rgba(201,160,84,0.15)' }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a054', borderRight: '1px solid rgba(201,160,84,0.15)', background: 'none', cursor: 'pointer', fontSize: 18 }}>−</button>
                <span style={{ width: 40, textAlign: 'center', fontFamily: SERIF, fontSize: 18, color: '#f0ece4', lineHeight: '38px' }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a054', borderLeft: '1px solid rgba(201,160,84,0.15)', background: 'none', cursor: 'pointer', fontSize: 18 }}>+</button>
              </div>
            </div>

            {/* Delivery info */}
            <div style={{ marginBottom: 2 }}>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', padding: '12px 18px', background: '#0a0703', border: '1px solid rgba(201,160,84,0.06)' }}>Delivery Information</p>
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
                  style={{ width: '100%', background: '#080602', border: 'none', borderBottom: '1px solid rgba(201,160,84,0.05)', padding: '15px 18px', fontSize: 11, color: '#c9b894', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'rgba(201,160,84,0.28)' }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(201,160,84,0.05)' }}
                />
              ))}
            </div>

            {/* Payment method */}
            <div>
              <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', padding: '12px 18px', background: '#0a0703', border: '1px solid rgba(201,160,84,0.06)', marginBottom: 2 }}>Payment Method</p>
              <div className="gc-pay-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 12 }}>
                {(['crypto', 'pkr_manual', 'cod'] as PayMethod[]).map(m => (
                  <button
                    key={m}
                    onClick={() => setPayMethod(m)}
                    style={{ padding: '13px 4px', fontSize: 7, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', background: payMethod === m ? 'rgba(201,160,84,0.07)' : '#080602', color: payMethod === m ? '#c9a054' : '#3f3830', border: payMethod === m ? '1px solid rgba(201,160,84,0.28)' : '1px solid rgba(255,255,255,0.03)', transition: 'all 0.3s' }}
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
                        <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, padding: '14px 18px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                          <p style={{ fontSize: 7, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830' }}>{lbl}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#c9b894', wordBreak: 'break-all' }}>{val}</p>
                            <CopyBtn text={copyVal} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <input value={txId} onChange={e => setTxId(e.target.value)} placeholder="Transaction ID / Reference Number"
                      style={{ background: '#080602', border: '1px solid rgba(201,160,84,0.07)', padding: '13px 18px', fontSize: 11, color: '#c9b894', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 18px', border: '1px dashed rgba(201,160,84,0.1)', cursor: 'pointer', background: '#080602' }}>
                      <Upload size={11} color="rgba(201,160,84,0.35)" />
                      <span style={{ fontSize: 7, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3f3830' }}>Upload Payment Screenshot</span>
                      <input type="file" accept="image/*" onChange={e => {
                        const f = e.target.files?.[0]; if (!f) return; setProofFile(f)
                        const r = new FileReader(); r.onload = ev => setProofPreview(ev.target?.result as string); r.readAsDataURL(f)
                      }} className="hidden" />
                    </label>
                    {proofPreview && (
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={proofPreview} alt="proof" style={{ height: 72, opacity: 0.7 }} />
                        <button onClick={() => { setProofFile(null); setProofPreview(null) }} style={{ position: 'absolute', top: 3, right: 3, background: 'none', border: 'none', cursor: 'pointer', color: '#c9a054' }}><X size={11} /></button>
                      </div>
                    )}
                    {orderError && <p style={{ fontSize: 9, color: 'rgba(248,113,113,0.65)', padding: '4px 0' }}>{orderError}</p>}
                    <button onClick={handlePlaceOrder} disabled={submitting} className="group"
                      style={{ position: 'relative', overflow: 'hidden', padding: '17px', border: '1px solid rgba(201,160,84,0.4)', fontSize: 8, letterSpacing: '0.65em', textTransform: 'uppercase', color: '#c9a054', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.5 : 1, background: 'none', width: '100%' }}>
                      <span className="group-hover:translate-x-0 -translate-x-full absolute inset-0 bg-[#c9a054] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <span className="relative group-hover:text-black transition-colors duration-150">{submitting ? 'Processing...' : 'Submit Order'}</span>
                    </button>
                  </motion.div>
                )}
                {payMethod === 'cod' && (
                  <motion.div key="cod" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ padding: '20px 18px', border: '1px solid rgba(201,160,84,0.1)', background: '#080602' }}>
                      <p style={{ fontFamily: SERIF, fontSize: 20, color: '#c9b894', marginBottom: 6 }}>Cash on Delivery</p>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 300, lineHeight: 1.8 }}>Pay upon delivery. Available within Pakistan. Confirmed via WhatsApp within 2 hours.</p>
                    </div>
                    {orderError && <p style={{ fontSize: 9, color: 'rgba(248,113,113,0.65)' }}>{orderError}</p>}
                    <button onClick={handlePlaceOrder} disabled={submitting} className="group"
                      style={{ position: 'relative', overflow: 'hidden', padding: '17px', border: '1px solid rgba(201,160,84,0.4)', fontSize: 8, letterSpacing: '0.65em', textTransform: 'uppercase', color: '#c9a054', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.5 : 1, background: 'none', width: '100%' }}>
                      <span className="group-hover:translate-x-0 -translate-x-full absolute inset-0 bg-[#c9a054] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <span className="relative group-hover:text-black transition-colors duration-150">{submitting ? 'Placing Order...' : 'Confirm COD Order'}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
