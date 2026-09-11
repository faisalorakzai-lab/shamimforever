'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Copy, Check, Upload, X, ExternalLink, ArrowDown } from 'lucide-react'
import { formatPKR } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/types'
  import { PRODUCT_VIDEO_OVERRIDES } from '@/lib/product-image-overrides'

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
  '.bloom-knowledge-grid{grid-template-columns:repeat(3,1fr)}',
  '.bloom-detail-grid{grid-template-columns:repeat(2,1fr)}',
  '.bloom-passport-grid{grid-template-columns:repeat(4,1fr)}',
  '.mob-full{width:100%!important;box-sizing:border-box!important;display:flex!important;justify-content:center!important}',
  '.bloom-knowledge-grid,.bloom-detail-grid,.bloom-passport-grid{grid-template-columns:1fr!important}',
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

function BloomKnowledgeSections() {
  const faqs = [
    ['Is Shamim Bloom for day or night?', 'Its positioning is particularly suited to evening wear, formal occasions and private gatherings, but fragrance use is personal and can be adapted to the wearer.'],
    ['Is Shamim Bloom a rose fragrance?', 'Rose is central to the heart through Taif Rose Absolute and Turkish Rose Resin, while amber, musk and creamy woods shape the full dry-down.'],
    ['How should Shamim Bloom be worn?', 'Apply to clean, moisturised skin at the wrists, neck, behind the ears or inner elbows. Allow the fragrance to develop naturally and avoid aggressively rubbing it after application.'],
    ['Does the Sovereign Passport transfer the brand or formula?', 'No. A digital token does not automatically transfer the Shamim Forever trademark, formula, photography, copyright or commercial rights. Those rights require separate written terms.'],
  ]

  return (
    <section
      aria-labelledby="shamim-bloom-knowledge"
      style={{
        padding: 'clamp(56px,8vw,100px) 0',
        background: 'linear-gradient(180deg, #030303 0%, #080502 48%, #030303 100%)',
        borderTop: '1px solid rgba(201,160,84,0.08)',
      }}
    >
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 clamp(20px,4vw,28px)' }}>
        <div className="s-reveal" style={{ textAlign: 'center', marginBottom: 50 }}>
          <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>The Shamim Bloom Dossier</p>
          <h2 id="shamim-bloom-knowledge" style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 300, color: '#f0ece4', letterSpacing: '0.05em' }}>From First Impression to Archive</h2>
          <p style={{ maxWidth: 650, margin: '20px auto 0', color: 'rgba(240,236,228,0.52)', fontSize: 13, lineHeight: 1.8 }}>
            Shamim Bloom is presented as an olfactive creation, a physical archive object and—where applicable—a digitally documented identity within the House archive.
          </p>
        </div>

        <div className="s-reveal bloom-knowledge-grid" style={{ display: 'grid', gap: 1, background: 'rgba(201,160,84,0.12)', marginBottom: 36 }}>
          {[
            ['01', 'The Opening', 'A soft floral veil introduces Velvet Peony, White Rose Silk and the intimate blush accord.'],
            ['02', 'The Revelation', 'Taif Rose Absolute and Turkish Rose Resin form the emotional centre of the composition.'],
            ['03', 'The Memory', 'White Ambergris, cashmere skin musk and warm cream woods remain close through the dry-down.'],
          ].map(([number, title, text]) => (
            <div key={number} style={{ padding: '28px 24px', background: '#080603' }}>
              <p style={{ fontSize: 8, letterSpacing: '0.35em', color: '#c9a054', marginBottom: 16 }}>{number}</p>
              <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 300, color: '#c9b894', marginBottom: 10 }}>{title}</h3>
              <p style={{ color: 'rgba(240,236,228,0.5)', fontSize: 12, lineHeight: 1.7 }}>{text}</p>
            </div>
          ))}
        </div>

        <div className="s-reveal bloom-detail-grid" style={{ display: 'grid', gap: 1, background: 'rgba(201,160,84,0.12)', marginBottom: 36 }}>
          <div style={{ padding: '30px 26px', background: '#080603' }}>
            <p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>The Ritual of Application</p>
            <h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#f0ece4', marginBottom: 16 }}>How to Wear Bloom</h3>
            <ol style={{ margin: 0, paddingLeft: 20, color: 'rgba(240,236,228,0.56)', fontSize: 12, lineHeight: 2 }}>
              <li>Apply to clean, moisturised skin.</li>
              <li>Target pulse areas: wrists, neck, behind the ears and inner elbows.</li>
              <li>Allow the fragrance to develop without aggressive rubbing.</li>
              <li>Use 2–4 sprays for an intimate profile or 4–6 for a more pronounced presence.</li>
            </ol>
          </div>
          <div style={{ padding: '30px 26px', background: '#080603' }}>
            <p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>Preserve the Creation</p>
            <h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#f0ece4', marginBottom: 16 }}>Care Guide</h3>
            <p style={{ color: 'rgba(240,236,228,0.56)', fontSize: 12, lineHeight: 1.8 }}>
              Keep the bottle away from direct sunlight, extreme heat and excessive humidity. Store it with the cap securely closed, preferably in its original presentation environment. Do not leave the bottle in a hot vehicle or use harsh chemicals on decorative surfaces.
            </p>
          </div>
        </div>

        <div className="s-reveal" style={{ padding: '32px 28px', border: '1px solid rgba(201,160,84,0.16)', background: 'rgba(8,6,2,0.72)', marginBottom: 36 }}>
          <p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>Physical + Digital</p>
          <h3 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 300, color: '#f0ece4', marginBottom: 14 }}>The Archive Object</h3>
          <p style={{ color: 'rgba(240,236,228,0.55)', fontSize: 13, lineHeight: 1.85, maxWidth: 760 }}>
            The bottle is the visible counterpart of an invisible composition. For eligible creations, the Sovereign Passport adds a digital provenance layer that can connect creation identity, sovereign serial, edition, ownership status and applicable blockchain references. This record supports provenance; it does not by itself inspect a physical bottle or transfer intellectual property.
          </p>
          <div className="bloom-passport-grid" style={{ display: 'grid', gap: 1, marginTop: 24, background: 'rgba(201,160,84,0.1)' }}>
            {[
              ['Network', 'Polygon Mainnet'],
              ['Standard', 'ERC-721'],
              ['Contract', '0xCCFc11b2…DC7640'],
              ['Reserve', '50 Founder pieces'],
            ].map(([label, value]) => (
              <div key={label} style={{ padding: '18px 14px', background: '#050403' }}>
                <p style={{ fontSize: 7, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#4c4030', marginBottom: 8 }}>{label}</p>
                <p style={{ fontSize: 12, color: '#c9b894', wordBreak: 'break-word' }}>{value}</p>
              </div>
            ))}
          </div>
          <a href="https://polygonscan.com/address/0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', marginTop: 20, color: '#c9a054', fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Verify contract on PolygonScan ↗
          </a>
        </div>

        <div className="s-reveal" style={{ borderTop: '1px solid rgba(201,160,84,0.14)' }}>
          <p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', margin: '28px 0 20px' }}>Fragrance & Provenance FAQ</p>
          {faqs.map(([question, answer]) => (
            <details key={question} style={{ borderBottom: '1px solid rgba(201,160,84,0.1)', padding: '18px 0' }}>
              <summary style={{ cursor: 'pointer', color: '#c9b894', fontFamily: SERIF, fontSize: 20, fontWeight: 300 }}>{question}</summary>
              <p style={{ color: 'rgba(240,236,228,0.52)', fontSize: 12, lineHeight: 1.8, margin: '12px 0 0', maxWidth: 760 }}>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}


    function VanillaKnowledgeSections() {
    const faqs = [
      ['What is SF Sovereign Vanilla Absolute?', 'SF Sovereign Vanilla Absolute is a vanilla-centred fragrance by Shamim Forever, built around Madagascar Bourbon vanilla with benzoin, tonka bean and white sandalwood.'],
      ['What does SF Sovereign Vanilla Absolute smell like?', 'It is positioned around a warm vanilla character supported by resinous benzoin, aromatic tonka bean and a soft sandalwood foundation.'],
      ['When should I wear it?', 'The warm profile is suited to evening dinners, formal occasions, private gatherings, signature wear and meaningful gifting. Fragrance use remains personal and can be adapted to the wearer.'],
      ['What is the Sovereign Passport?', 'It is the digital provenance layer associated with the creation. The record may include product identity, serial reference, edition and applicable blockchain information.'],
      ['Does the Passport automatically mean legal ownership of the physical perfume?', 'Not necessarily. The legal effect of a digital passport is determined by the applicable product terms and law; it does not automatically transfer intellectual property or physical ownership rights.'],
      ['How can I authenticate the creation?', 'Compare the product identity, House branding, packaging, serial reference and purchase record, then verify the applicable Sovereign Passport and complete on-chain record through the official explorer or House Authentication Concierge.'],
      ['Is SF Sovereign Vanilla Absolute an investment?', 'No investment-return claim should be inferred from the fragrance, its digital passport or any blockchain-linked record.'],
      ['What should I never share for wallet support?', 'Never share a seed phrase, private key, recovery phrase or wallet password. Only a public wallet address should be provided when it is genuinely required.'],
    ]
    const identity = [
      ['Madagascar Bourbon Vanilla', 'The heart of the composition — warm, recognisable and intimate.'],
      ['Benzoin', 'A resinous dimension that brings balsamic softness and depth.'],
      ['Tonka Bean', 'A naturally warm aromatic material that gives the composition a smooth, rounded character.'],
      ['White Sandalwood', 'The foundation — a soft woody base that lets the vanilla settle with polish.'],
    ]
    return (
      <section id="vanilla-dossier" aria-labelledby="vanilla-dossier-title" style={{ padding: 'clamp(56px,8vw,100px) 0', background: 'linear-gradient(180deg, #030303 0%, #080502 48%, #030303 100%)', borderTop: '1px solid rgba(201,160,84,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,4vw,28px)' }}>
          <div className="s-reveal" style={{ textAlign: 'center', marginBottom: 54 }}><p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>The Vanilla Dossier</p><h2 id="vanilla-dossier-title" style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,3.7rem)', fontWeight: 300, color: '#f0ece4', letterSpacing: '0.05em' }}>A Vanilla Built for Memory</h2><p style={{ maxWidth: 760, margin: '20px auto 0', color: 'rgba(240,236,228,0.56)', fontSize: 13, lineHeight: 1.85 }}>Vanilla can feel familiar yet luxurious, sweet yet sophisticated, soft yet memorable. Within the House of Shamim, it becomes a language of intimacy rather than simple sweetness.</p></div>
          <div className="s-reveal" style={{ padding: '32px 28px', border: '1px solid rgba(201,160,84,0.15)', background: 'rgba(8,6,2,0.74)', marginBottom: 36 }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>01 · The Creation</p><h3 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 300, color: '#f0ece4', marginBottom: 14 }}>The House Signature</h3><p style={{ color: 'rgba(240,236,228,0.58)', fontSize: 13, lineHeight: 1.9, maxWidth: 820 }}>SF Sovereign Vanilla Absolute is a warm, intimate expression of vanilla created within the House of Shamim fragrance world. Built around Madagascar Bourbon vanilla, benzoin, tonka bean and white sandalwood, the composition is intended not simply to be worn, but to become associated with the person who wears it.</p></div>
          <div className="s-reveal" style={{ marginBottom: 36 }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 18 }}>02 · The Olfactive Identity</p><div className="bloom-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'rgba(201,160,84,0.12)' }}>{identity.map(([title, text]) => <div key={title} style={{ padding: '28px 24px', background: '#080603' }}><h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 300, color: '#c9b894', marginBottom: 10 }}>{title}</h3><p style={{ color: 'rgba(240,236,228,0.54)', fontSize: 12, lineHeight: 1.75 }}>{text}</p></div>)}</div></div>
          <div className="s-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(201,160,84,0.12)', marginBottom: 36 }}>{[['03 · Opening', 'Vanilla Warmth', 'The fragrance begins with a soft, inviting vanilla impression.'], ['04 · Development', 'Benzoin · Tonka Bean', 'Warmth deepens into a smoother and more enveloping character.'], ['05 · Dry Down', 'White Sandalwood', 'The composition settles into a quieter woody finish with structure and elegance.']].map(([eyebrow, title, text]) => <div key={eyebrow} style={{ padding: '28px 24px', background: '#080603' }}><p style={{ fontSize: 7, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>{eyebrow}</p><h3 style={{ fontFamily: SERIF, fontSize: 25, fontWeight: 300, color: '#f0ece4', marginBottom: 10 }}>{title}</h3><p style={{ color: 'rgba(240,236,228,0.52)', fontSize: 12, lineHeight: 1.75 }}>{text}</p></div>)}</div>
          <div className="s-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'rgba(201,160,84,0.12)', marginBottom: 36 }}><div style={{ padding: '30px 26px', background: '#080603' }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>06 · When to Wear</p><h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#f0ece4', marginBottom: 16 }}>The Sovereign Vanilla Ritual</h3><ul style={{ margin: 0, paddingLeft: 20, color: 'rgba(240,236,228,0.56)', fontSize: 12, lineHeight: 2 }}><li>Evening dinners and private gatherings</li><li>Formal occasions where understated luxury is preferred</li><li>Personal signature wear and intimate moments</li><li>Birthdays, anniversaries and meaningful gifting</li><li>Archive-oriented fragrance collecting</li></ul></div><div style={{ padding: '30px 26px', background: '#080603' }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>07 · Application & Care</p><h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#f0ece4', marginBottom: 16 }}>Preserve the Creation</h3><p style={{ color: 'rgba(240,236,228,0.56)', fontSize: 12, lineHeight: 1.85 }}>Apply lightly to wrists, neck and behind the ears. Allow the fragrance to develop naturally rather than immediately rubbing the skin. Store the bottle away from direct sunlight, excessive heat and repeated temperature changes, with the cap properly closed and the original presentation preserved.</p></div></div>
          <div className="s-reveal" style={{ padding: '32px 28px', border: '1px solid rgba(201,160,84,0.16)', background: 'rgba(8,6,2,0.72)', marginBottom: 36 }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>08 · The Archive Object</p><h3 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 300, color: '#f0ece4', marginBottom: 14 }}>Physical Creation. Digital Record.</h3><p style={{ color: 'rgba(240,236,228,0.55)', fontSize: 13, lineHeight: 1.85, maxWidth: 820 }}>The physical creation represents the sensory layer. The serial identity represents the archive layer. Where applicable, the Sovereign Passport provides a blockchain-linked provenance record associated with the product identity, edition and serial reference. It supports traceability; it does not by itself transfer intellectual property or establish legal ownership of the physical creation.</p></div>
          <div className="s-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'rgba(201,160,84,0.12)', marginBottom: 36 }}><div style={{ padding: '30px 26px', background: '#080603' }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>09 · Authentication</p><h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#f0ece4', marginBottom: 14 }}>Verify the Record</h3><p style={{ color: 'rgba(240,236,228,0.55)', fontSize: 12, lineHeight: 1.8 }}>Check the product identity, House branding, packaging, serial/reference information and purchase record. For the digital layer, verify the complete network, contract, token and explorer record where applicable, then contact the House Authentication Concierge if anything is uncertain.</p></div><div style={{ padding: '30px 26px', background: '#080603', border: '1px solid rgba(201,160,84,0.18)' }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>10 · Wallet Safety</p><h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#f0ece4', marginBottom: 14 }}>Your Wallet. Your Responsibility.</h3><p style={{ color: 'rgba(240,236,228,0.55)', fontSize: 12, lineHeight: 1.8 }}>Shamim Forever should never ask for a seed phrase, private key, recovery phrase or wallet password. Only provide a public wallet address when the applicable passport process genuinely requires it.</p></div></div>
          <div className="s-reveal" style={{ borderTop: '1px solid rgba(201,160,84,0.14)' }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', margin: '28px 0 20px' }}>11 · Fragrance & Provenance FAQ</p>{faqs.map(([question, answer]) => <details key={question} style={{ borderBottom: '1px solid rgba(201,160,84,0.1)', padding: '18px 0' }}><summary style={{ cursor: 'pointer', color: '#c9b894', fontFamily: SERIF, fontSize: 20, fontWeight: 300 }}>{question}</summary><p style={{ color: 'rgba(240,236,228,0.52)', fontSize: 12, lineHeight: 1.8, margin: '12px 0 0', maxWidth: 820 }}>{answer}</p></details>)}</div>
        </div>
      </section>
    )
    }
    

function EternalRoseKnowledgeSections() {
  const identity = [
    ['Taif Rose', 'The central floral identity: refined, expressive and connected to the cultural heritage of Taif.'],
    ['White Musk', 'The softening layer: a smoother, cleaner and more intimate transition around the floral heart.'],
    ['Mysore Sandalwood', 'The foundation: a warm woody dimension beneath the rose that gives the composition depth and a grounded finish.'],
  ]
  const journey = [
    ['The First Encounter', 'The fragrance opens with the unmistakable emotional language of rose.'],
    ['The Heart', 'The floral character becomes more intimate as musk softens the composition.'],
    ['The Dry Down', 'Mysore sandalwood introduces warmth and depth beneath the floral character.'],
    ['The Memory', 'The final impression is intended to be softer, warmer and more personal than the initial encounter.'],
  ]
  const faqs = [
    ['What is Eternal Rose de Taif?', 'Eternal Rose de Taif is a rose-centred fragrance from Shamim Forever built around Taif rose, white musk and Mysore sandalwood.'],
    ['What is the price?', 'The current listed price is $245 USD, with a Pakistan reference price of Rs 68,000.'],
    ['What does it smell like?', 'The fragrance is built around a rose-centred character supported by soft musk and warm sandalwood.'],
    ['What is the main fragrance identity?', 'Taif Rose. White musk softens the journey and Mysore sandalwood grounds the final impression.'],
    ['Is it part of the Heritage Archive?', 'Yes. The current product record identifies the rarity as HERITAGE ARCHIVE and the edition as House Allocation Reserve.'],
    ['Does it have a digital passport?', 'Yes, the product is presented with a Sovereign Digital Passport associated with its applicable blockchain-linked record.'],
    ['Is the passport an NFT?', 'The current product record identifies the passport as ERC-721 on Polygon Mainnet.'],
    ['What is the serial number?', 'SF-E32B4700.'],
    ['Does the NFT legally equal ownership of the perfume?', 'Not automatically. That relationship must be established by the applicable legal terms.'],
    ['Can I verify the blockchain record?', 'Yes, where the relevant contract, token and blockchain information are publicly verifiable.'],
    ['Can Shamim Forever ask for my seed phrase?', 'No. Never share a private key, seed phrase, recovery phrase or wallet password.'],
    ['Is the product an investment?', 'No investment-return claim should be made simply because the product has a blockchain passport.'],
    ['Is it suitable as a gift?', 'Yes, particularly for occasions associated with love, celebration, remembrance and elegance.'],
  ]
  return (
    <section id="eternal-rose-dossier" aria-labelledby="eternal-rose-dossier-title" style={{ padding: 'clamp(56px,8vw,100px) 0', background: 'linear-gradient(180deg, #030303 0%, #080502 48%, #030303 100%)', borderTop: '1px solid rgba(201,160,84,0.08)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,4vw,28px)' }}>
        <div className="s-reveal" style={{ textAlign: 'center', marginBottom: 54 }}>
          <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>The Eternal Rose Dossier</p>
          <h2 id="eternal-rose-dossier-title" style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,5vw,3.7rem)', fontWeight: 300, color: '#f0ece4', letterSpacing: '0.05em' }}>The Rose That Becomes a Memory</h2>
          <p style={{ maxWidth: 780, margin: '20px auto 0', color: 'rgba(240,236,228,0.56)', fontSize: 13, lineHeight: 1.85 }}>A rose of heritage. A fragrance of memory. A creation preserved within the House.</p>
        </div>

        <div className="s-reveal" style={{ padding: '32px 28px', border: '1px solid rgba(201,160,84,0.15)', background: 'rgba(8,6,2,0.74)', marginBottom: 36 }}>
          <p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>01 · The Creation</p>
          <h3 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 300, color: '#f0ece4', marginBottom: 14 }}>Eternal Rose de Taif</h3>
          <p style={{ color: 'rgba(240,236,228,0.58)', fontSize: 13, lineHeight: 1.9, maxWidth: 840 }}>Eternal Rose de Taif is an expression of rose interpreted through the sovereign language of the House of Shamim. At its heart is the celebrated Taif rose, framed by white musk and Mysore sandalwood to create a composition built around floral elegance, softness and depth. The result moves beyond the idea of a conventional rose perfume: it is conceived as a House creation, a sensory signature and an archive object.</p>
        </div>

        <div className="s-reveal" style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 18 }}>02 · The Rose of Taif</p>
          <div className="bloom-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'rgba(201,160,84,0.12)' }}>
            <div style={{ padding: '28px 24px', background: '#080603' }}><h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 300, color: '#f0ece4', marginBottom: 12 }}>A Rose With a Place in History</h3><p style={{ color: 'rgba(240,236,228,0.54)', fontSize: 12, lineHeight: 1.85 }}>Taif rose carries a distinctive cultural and olfactory identity associated with the mountainous region of Taif. Its character has long been associated with refined floral fragrance, rose water and traditional perfumery.</p></div>
            <div style={{ padding: '28px 24px', background: '#080603' }}><h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 300, color: '#c9b894', marginBottom: 12 }}>A Symbol of Permanence</h3><p style={{ color: 'rgba(240,236,228,0.54)', fontSize: 12, lineHeight: 1.85 }}>Within the House, the rose becomes a symbol of beauty, memory, devotion, heritage and permanence. It is presented as a legendary rose of Taif, celebrated for its distinctive floral character and cultural heritage.</p></div>
          </div>
        </div>

        <div className="s-reveal" style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 18 }}>03 · The Olfactive Architecture</p>
          <h3 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 300, color: '#f0ece4', marginBottom: 20 }}>The Rose. The Musk. The Wood.</h3>
          <div className="bloom-knowledge-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(201,160,84,0.12)' }}>{identity.map(([title, text]) => <div key={title} style={{ padding: '28px 24px', background: '#080603' }}><h4 style={{ fontFamily: SERIF, fontSize: 25, fontWeight: 300, color: '#c9b894', marginBottom: 10 }}>{title}</h4><p style={{ color: 'rgba(240,236,228,0.54)', fontSize: 12, lineHeight: 1.8 }}>{text}</p></div>)}</div>
        </div>

        <div className="s-reveal" style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 18 }}>04 · The Olfactive Journey</p>
          <div className="bloom-knowledge-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(201,160,84,0.12)' }}>{journey.map(([title, text]) => <div key={title} style={{ padding: '26px 20px', background: '#080603' }}><h4 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 300, color: '#f0ece4', marginBottom: 10 }}>{title}</h4><p style={{ color: 'rgba(240,236,228,0.52)', fontSize: 12, lineHeight: 1.75 }}>{text}</p></div>)}</div>
        </div>

        <div className="s-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'rgba(201,160,84,0.12)', marginBottom: 36 }}>
          <div style={{ padding: '30px 26px', background: '#080603' }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>05 · The Character</p><h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#f0ece4', marginBottom: 16 }}>What Does It Feel Like?</h3><ul style={{ margin: 0, paddingLeft: 20, color: 'rgba(240,236,228,0.56)', fontSize: 12, lineHeight: 2 }}><li>Floral — rose-led and expressive</li><li>Elegant — refinement over excess</li><li>Romantic — suited to intimate moments</li><li>Warm — supported by musk and sandalwood</li><li>Heritage-oriented — presented within the House archive philosophy</li><li>Feminine signature — a sophisticated floral positioning</li></ul></div>
          <div style={{ padding: '30px 26px', background: '#080603' }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>06 · When to Wear</p><h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#f0ece4', marginBottom: 16 }}>The Eternal Rose Ritual</h3><ul style={{ margin: 0, paddingLeft: 20, color: 'rgba(240,236,228,0.56)', fontSize: 12, lineHeight: 2 }}><li>Evening dinners and refined social occasions</li><li>Weddings, celebrations and receptions</li><li>Romantic occasions and meaningful moments</li><li>Exhibitions, private salons and ceremonies</li><li>Signature wear and meaningful gifting</li><li>Fragrance collecting and archive-oriented ownership</li></ul></div>
        </div>

        <div className="s-reveal" style={{ padding: '32px 28px', border: '1px solid rgba(201,160,84,0.16)', background: 'rgba(8,6,2,0.72)', marginBottom: 36 }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>07 · The Archive Object</p><h3 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 300, color: '#f0ece4', marginBottom: 14 }}>When Fragrance Becomes an Object of Memory</h3><p style={{ color: 'rgba(240,236,228,0.55)', fontSize: 13, lineHeight: 1.85, maxWidth: 840 }}>The fragrance represents the sensory layer. The physical bottle represents the object layer. The serial number represents the archive layer. Where applicable, the digital passport represents the digital provenance layer. Together, they form a unified House record without changing the legal ownership or intellectual-property status of the physical creation.</p></div>

        <div className="s-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'rgba(201,160,84,0.12)', marginBottom: 36 }}><div style={{ padding: '30px 26px', background: '#080603' }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>08 · Authentication</p><h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#f0ece4', marginBottom: 14 }}>Verify the Record</h3><p style={{ color: 'rgba(240,236,228,0.55)', fontSize: 12, lineHeight: 1.8 }}>Verify the House identity, product name, packaging, serial reference and purchase record. For the digital record, verify the Sovereign Passport, network, contract, token ID and blockchain record where the information is publicly available. For questions or disputed authenticity, use the Authentication Concierge.</p></div><div style={{ padding: '30px 26px', background: '#080603', border: '1px solid rgba(201,160,84,0.18)' }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>09 · Wallet Security</p><h3 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#f0ece4', marginBottom: 14 }}>Protect Your Digital Identity</h3><p style={{ color: 'rgba(240,236,228,0.55)', fontSize: 12, lineHeight: 1.8 }}>Shamim Forever should never request a private key, seed phrase, recovery phrase or wallet password. Only provide the public wallet address required for receiving the applicable passport. Never share recovery information with anyone claiming to represent the House.</p></div></div>

        <div className="s-reveal" style={{ padding: '32px 28px', border: '1px solid rgba(201,160,84,0.16)', background: 'linear-gradient(135deg, rgba(15,10,5,0.95), rgba(8,6,3,0.75))', marginBottom: 36 }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', marginBottom: 12 }}>10 · Heritage Archive</p><p style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.22em', color: '#c9a054', marginBottom: 12 }}>SF-E32B4700</p><h3 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 300, color: '#f0ece4', marginBottom: 14 }}>ETERNAL ROSE DE TAIF</h3><p style={{ color: 'rgba(240,236,228,0.54)', fontSize: 12, lineHeight: 1.9 }}>Archive Class: Heritage Archive · Edition: House Allocation Reserve · Category: Perfume · Digital Network: Polygon Mainnet · Token Standard: ERC-721 · House: Shamim Forever</p></div>

        <div className="s-reveal" style={{ borderTop: '1px solid rgba(201,160,84,0.14)' }}><p style={{ fontSize: 7, letterSpacing: '0.7em', textTransform: 'uppercase', color: '#c9a054', margin: '28px 0 20px' }}>11 · Fragrance & Provenance FAQ</p>{faqs.map(([question, answer]) => <details key={question} style={{ borderBottom: '1px solid rgba(201,160,84,0.1)', padding: '18px 0' }}><summary style={{ cursor: 'pointer', color: '#c9b894', fontFamily: SERIF, fontSize: 20, fontWeight: 300 }}>{question}</summary><p style={{ color: 'rgba(240,236,228,0.52)', fontSize: 12, lineHeight: 1.8, margin: '12px 0 0', maxWidth: 840 }}>{answer}</p></details>)}</div>
      </div>
    </section>
  )
}

export default function SovereignProductPage({ product }: { product: Product }) {
  const config = SOVEREIGN_CONFIGS[product.slug] ?? SOVEREIGN_CONFIGS['her-legacy-vault']
  const isBloom = ['shamim-bloom', 'shamims-bloom', 'shamim-bloom-the-sovereign-grace'].includes(product.slug)
  const isVanilla = product.slug === 'sf-sovereign-vanilla-absolute'
  const isRose = product.slug === 'eternal-rose-de-taif'
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, 60])

  const [quantity, setQuantity] = useState(1)
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [custName, setCustName] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [custAddress, setCustAddress] = useState('')
  const [custCity, setCustCity] = useState('')
  const [custCountry, setCustCountry] = useState('Pakistan')
  const [custMessage, setCustMessage] = useState('')
  const [walletAdded, setWalletAdded] = useState(false)
  const { addItem } = useCart()
  const [liveRates, setLiveRates] = useState<Record<string,number>>({ PKR: 278, INR: 83.5, AED: 3.67, SAR: 3.75 })
  const [activeGallery, setActiveGallery] = useState(0)
  const [mintWallet, setMintWallet] = useState('')
  const [mintStatus, setMintStatus] = useState<'idle'|'minting'|'success'|'error'>('idle')
  const [mintResult, setMintResult] = useState<{tokenId:number;txHash:string;openSeaUrl:string;polygonScanUrl:string}|null>(null)
  const [recentlyViewed, setRecentlyViewed] = useState<Array<{slug:string;name:string;price_usd:number;image:string}>>([])

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

    useEffect(() => {
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(r => r.json())
        .then(d => { if (d.rates) setLiveRates({ PKR: d.rates.PKR||278, INR: d.rates.INR||83.5, AED: d.rates.AED||3.67, SAR: d.rates.SAR||3.75 }) })
        .catch(() => {})
    }, [])

    useEffect(() => {
      if (!product?.slug) return
      const KEY = 'sf_recently_viewed'
      const entry = { slug: product.slug, name: product.name, price_usd: product.price_usd, image: config.heroImage || product.images?.[0] || '' }
      const prev: Array<{slug:string;name:string;price_usd:number;image:string}> = JSON.parse(localStorage.getItem(KEY) || '[]')
      const filtered = prev.filter(p => p.slug !== product.slug)
      localStorage.setItem(KEY, JSON.stringify([entry, ...filtered].slice(0, 8)))
      setRecentlyViewed(filtered.slice(0, 5))
    }, [product?.slug])

  async function handleMintNFT() {
    const addr = mintWallet.trim() as string | undefined
    if (!addr || !addr.startsWith('0x')) { setMintStatus('error'); return }
    setMintStatus('minting')
    try {
      const res = await fetch('/api/nft/mint', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: addr || '' }),
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

  const images = (config.galleryImages?.length > 0 ? config.galleryImages : product.images) || []
  const finalPkr = product.price_pkr * quantity

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: SOVEREIGN_CSS }} />

      {/* HERO — Black & Gold brand, edge-to-edge 3D */}
        <section ref={heroRef} style={{ position: 'relative', background: '#000000', overflow: 'hidden', width: '100%', aspectRatio: '1 / 1' }}>

          {/* Gold crown spotlight */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: '5%', height: '55%', background: 'radial-gradient(ellipse 52% 60% at 50% 26%, rgba(212,175,55,0.16) 0%, rgba(201,160,84,0.05) 40%, transparent 68%)', pointerEvents: 'none', zIndex: 2 }} />

          {/* Gold stage ambient glow */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', background: 'radial-gradient(ellipse 62% 80% at 50% 100%, rgba(201,160,84,0.11) 0%, transparent 75%)', pointerEvents: 'none', zIndex: 2 }} />

          {/* Black vignette edges */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 42%, rgba(0,0,0,0.70) 100%)', pointerEvents: 'none', zIndex: 3 }} />

          {/* Gold border — static, no animation */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent 0%, rgba(212,175,55,0.75) 20%, rgba(212,175,55,0.95) 50%, rgba(212,175,55,0.75) 80%, transparent 100%)', pointerEvents: 'none', zIndex: 8 }} />
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent 0%, rgba(212,175,55,0.65) 20%, rgba(212,175,55,0.65) 80%, transparent 100%)', pointerEvents: 'none', zIndex: 8 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to left, transparent 0%, rgba(212,175,55,0.75) 20%, rgba(212,175,55,0.95) 50%, rgba(212,175,55,0.75) 80%, transparent 100%)', pointerEvents: 'none', zIndex: 8 }} />
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 1, background: 'linear-gradient(to top, transparent 0%, rgba(212,175,55,0.65) 20%, rgba(212,175,55,0.65) 80%, transparent 100%)', pointerEvents: 'none', zIndex: 8 }} />

          {/* Gold corner brackets */}
          <div style={{ position: 'absolute', top: 54, left: 14, width: 18, height: 18, borderTop: '1px solid rgba(212,175,55,0.40)', borderLeft: '1px solid rgba(212,175,55,0.40)', pointerEvents: 'none', zIndex: 9 }} />
          <div style={{ position: 'absolute', top: 54, right: 14, width: 18, height: 18, borderTop: '1px solid rgba(212,175,55,0.40)', borderRight: '1px solid rgba(212,175,55,0.40)', pointerEvents: 'none', zIndex: 9 }} />
          <div style={{ position: 'absolute', bottom: 14, left: 14, width: 18, height: 18, borderBottom: '1px solid rgba(212,175,55,0.28)', borderLeft: '1px solid rgba(212,175,55,0.28)', pointerEvents: 'none', zIndex: 9 }} />
          <div style={{ position: 'absolute', bottom: 14, right: 14, width: 18, height: 18, borderBottom: '1px solid rgba(212,175,55,0.28)', borderRight: '1px solid rgba(212,175,55,0.28)', pointerEvents: 'none', zIndex: 9 }} />

          {/* Cinematic media — video first, then 3D model, then hero image */}
          {(PRODUCT_VIDEO_OVERRIDES[product.slug] || config.videoPath) ? (
              <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
                <video autoPlay loop muted playsInline preload="auto" poster={config.heroImage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}>
                  <source src={PRODUCT_VIDEO_OVERRIDES[product.slug] || config.videoPath} type="video/mp4" />
                </video>
                <GoldParticles />
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'55%', background:'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(212,175,55,0.13) 0%, transparent 65%)', pointerEvents:'none', zIndex:12 }} />
                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 90% at 50% 50%, transparent 48%, rgba(0,0,0,0.55) 100%)', pointerEvents:'none', zIndex:12 }} />
                <div style={{ position:'absolute', left:0, right:0, bottom:0, height:'30%', background:'linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))', pointerEvents:'none', zIndex:13 }} />
                <div style={{ position:'absolute', top:'8%', left:'25%', width:'50%', height:'30%', background:'radial-gradient(ellipse at center, rgba(212,175,55,0.09) 0%, transparent 68%)', pointerEvents:'none', zIndex:12, animation:'shimmerPulse 5s ease-in-out infinite' }} />
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
              <img src={config.heroImage || product.images?.[0] || ''} alt={config.heroTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }} />
            </motion.div>
          )}


          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 30, pointerEvents: 'none' }}>
            <span style={{ fontSize: 6, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.38)', writingMode: 'vertical-lr' }}>Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <ArrowDown size={10} color="rgba(201,160,84,0.38)" />
            </motion.div>
          </motion.div>
        </section>

        {/* PRODUCT INFO — fully below the 3D model section */}
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
                <span style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,6vw,2.8rem)', fontWeight: 300, color: '#f8f4ee' }}>${product.price_usd} <span style={{ fontSize: '0.4em', letterSpacing: '0.35em', color: '#c9a054' }}>USD</span></span>
                <span style={{ fontSize: 11, letterSpacing: '0.15em', color: 'rgba(201,160,84,0.32)' }}>{formatPKR(finalPkr)}</span>
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
              <p style={{ fontFamily: SERIF, fontSize: 'clamp(2rem,7vw,4.5rem)', fontWeight: 300, color: '#f8f4ee', lineHeight: 1 }}>${(product.price_usd * quantity).toFixed(0)} <span style={{ fontSize: '0.4em', letterSpacing: '0.3em', color: '#c9a054' }}>USDT</span></p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
                {(['PKR','INR','AED','SAR'] as const).map(cur => (
                  <span key={cur} style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(201,160,84,0.38)' }}>{cur} {Math.round(product.price_usd * quantity * (liveRates[cur]||1)).toLocaleString()}</span>
                ))}
              </div>
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
                <input key={ph} value={v} onChange={e => s(e.target.value)} placeholder={ph}
                  style={{ width: '100%', background: '#080602', border: 'none', borderBottom: '1px solid rgba(201,160,84,0.06)', padding: '16px 20px', fontSize: 11, color: '#c9b894', outline: 'none', boxSizing: 'border-box' as const }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'rgba(201,160,84,0.3)' }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(201,160,84,0.06)' }}
                />
              ))}
              <select value={custCountry} onChange={e => setCustCountry(e.target.value)} style={{ width: '100%', background: '#080602', border: 'none', borderBottom: '1px solid rgba(201,160,84,0.06)', padding: '16px 20px', fontSize: 11, color: '#c9b894', outline: 'none', boxSizing: 'border-box' as const, WebkitAppearance: 'none' as any, cursor: 'pointer' }}>
                {['Pakistan','Saudi Arabia','United Arab Emirates','United Kingdom','United States','India','Qatar','Kuwait','Bahrain','Oman','Canada','Australia','Germany','France','Other'].map(c => (
                  <option key={c} value={c} style={{ background: '#0a0703' }}>{c}</option>
                ))}
              </select>
            </div>


              <div>
                <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', padding: '12px 20px', background: '#0a0703', border: '1px solid rgba(201,160,84,0.08)', marginBottom: 2 }}>Custom Message / Size</p>
                <textarea
                  value={custMessage}
                  onChange={e => setCustMessage(e.target.value)}
                  placeholder="Optional: size, personalization, or special instructions..."
                  rows={3}
                  style={{ width: '100%', padding: '14px 20px', background: '#080602', border: '1px solid rgba(201,160,84,0.08)', color: '#c9b894', fontSize: 11, letterSpacing: '0.06em', outline: 'none', marginBottom: 2, resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' as const }}
                />
                {orderError && <p style={{ fontSize: 9, color: 'rgba(248,113,113,0.7)', letterSpacing: '0.1em', marginBottom: 8 }}>{orderError}</p>}
                {walletAdded ? (
                  <div style={{ padding: '20px', textAlign: 'center', border: '1px solid rgba(201,160,84,0.25)', background: 'rgba(201,160,84,0.04)' }}>
                    <p style={{ color: '#c9a054', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 10 }}>✓ Added to Wallet</p>
                    <a href="/wallet" style={{ color: '#c9a054', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', textDecoration: 'underline' }}>View Wallet →</a>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (!custName || !custPhone || !custAddress || !custCity || !custCountry) {
                        setOrderError('Please fill in all delivery details.')
                        return
                      }
                      setOrderError(null)
                      addItem({
                        product_id: product.id,
                        product_name: product.name,
                        slug: product.slug || '',
                        price_usd: product.price_usd,
                        quantity,
                        image: config.heroImage || product.images?.[0] || '',
                        custom_message: custMessage,
                      })
                      setWalletAdded(true)
                    }}
                    style={{ width: '100%', padding: '18px', background: '#c9a054', color: '#050505', fontSize: 9, letterSpacing: '0.6em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', fontWeight: 600 }}
                  >
                    + ADD TO WALLET
                  </button>
                )}
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
          <div className="scent-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1 }}>
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
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 300, lineHeight: 1.9 }}>Where applicable, a Sovereign Passport provides a blockchain-linked provenance record associated with the physical creation. It supports traceability and authentication; it does not by itself transfer intellectual property or establish legal ownership of the physical product.</p>
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
                      {mintWallet ? (
                        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', background:'rgba(201,160,84,0.04)', border:'1px solid rgba(201,160,84,0.14)' }}>
                          <div style={{ width:5, height:5, borderRadius:'50%', background:'#c9a054', flexShrink:0 }} />
                          <p style={{ fontFamily:'monospace', fontSize:9, color:'#c9b894', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{mintWallet}</p>
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


      {/* RECENTLY VIEWED */}
        {recentlyViewed.length > 0 && (
          <section style={{ padding: 'clamp(44px,6vw,72px) 0', background: '#050504', borderTop: '1px solid rgba(201,160,84,0.05)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(20px,4vw,40px)' }}>
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <p style={{ fontSize: 7, letterSpacing: '0.9em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.45)', marginBottom: 8 }}>Your Archive History</p>
                <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(1.4rem,3.5vw,2.4rem)', fontWeight: 300, color: 'rgba(240,236,228,0.3)', letterSpacing: '0.1em' }}>Recently Viewed</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'clamp(8px,2vw,16px)' }}>
                {recentlyViewed.map(item => (
                  <Link key={item.slug} href={'/products/' + item.slug} style={{ textDecoration: 'none', display: 'block', border: '1px solid rgba(201,160,84,0.08)', background: '#0a0806', transition: 'border-color 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.28)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,84,0.08)' }}
                  >
                    <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#080604' }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: SERIF, fontSize: 28, color: 'rgba(201,160,84,0.15)' }}>◆</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '10px 12px' }}>
                      <p style={{ fontFamily: SERIF, fontSize: 11, color: 'rgba(240,236,228,0.45)', lineHeight: 1.3, marginBottom: 4 }}>{item.name}</p>
                      <p style={{ fontSize: 8, color: 'rgba(201,160,84,0.4)', letterSpacing: '0.15em' }}>${item.price_usd}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}



              {/* RELATED */}
      {isVanilla && <VanillaKnowledgeSections />}
      {isRose && <EternalRoseKnowledgeSections />}
      {isBloom && <BloomKnowledgeSections />}

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
