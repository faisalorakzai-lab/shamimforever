'use client'

  import { useState } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  import Link from 'next/link'
  import { Copy, Check, ChevronDown, Shield, Gem, Crown, Star } from 'lucide-react'
  import type { Product } from '@/types'

  const SERIF = "'Cormorant Garamond', Georgia, serif"
  const MONO  = "'Courier New', Courier, monospace"
  const GOLD  = '#c9a054'
  const GOLD2 = '#e8c97a'
  const EASYPAISA_NUMBER = '03367970004'
  const EASYPAISA_NAME   = 'M Faisal'
  const UBL_IBAN         = 'PK13UNIL0109000318870498'

  const PAGE_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
    html{scroll-behavior:smooth}
    .jw-trait-row{padding:12px 0;border-bottom:1px solid rgba(201,160,84,0.08)}
    .jw-trait-row:last-child{border-bottom:none}
    .jw-priv-row{display:flex;align-items:flex-start;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.04)}
    .jw-priv-row:last-child{border-bottom:none}
    .jw-holo::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,160,84,.15) 0%,transparent 40%,rgba(201,160,84,.06) 60%,transparent 100%);pointer-events:none;border-radius:inherit}
    .jw-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(201,160,84,.5),transparent);animation:jwscan 4s ease-in-out infinite;pointer-events:none}
    @keyframes jwscan{0%{top:0%;opacity:0}8%{opacity:1}92%{opacity:1}100%{top:100%;opacity:0}}
    @media(max-width:768px){
      .jw-hero-grid{grid-template-columns:1fr!important}
      .jw-price-grid{grid-template-columns:1fr!important}
      .jw-trait-grid{grid-template-columns:1fr 1fr!important}
    }
  `

  function getPieceType(product: Product): string {
    const n = (product.name + ' ' + (product.slug||'')).toLowerCase()
    if (n.includes('ring')) return 'Ring'
    if (n.includes('necklace')||n.includes('pendant')||n.includes('chain')) return 'Necklace'
    if (n.includes('bracelet')||n.includes('cuff')||n.includes('bangle')) return 'Bracelet'
    if (n.includes('earring')||n.includes('stud')) return 'Earrings'
    if (n.includes('set')) return 'Jewelry Set'
    if (n.includes('tiara')||n.includes('crown')) return 'Crown Piece'
    return 'Jewelry'
  }

  function getRarity(usd: number): string {
    if (usd >= 50000) return 'ULTRA SOVEREIGN'
    if (usd >= 20000) return 'GRAND ARCHIVE'
    if (usd >= 10000) return 'HIGH JEWEL'
    if (usd >= 5000) return 'PREMIER'
    if (usd >= 1000) return 'CURATED'
    return 'ESSENTIAL'
  }

  function getMaterial(product: Product): string {
    const n = (product.name + ' ' + (product.description||'')).toLowerCase()
    if (n.includes('diamond')) return 'Diamond'
    if (n.includes('sapphire')) return 'Sapphire'
    if (n.includes('emerald')) return 'Emerald'
    if (n.includes('ruby')) return 'Ruby'
    if (n.includes('pearl')) return 'Pearl'
    if (n.includes('gold')) return '18K Gold'
    if (n.includes('platinum')) return 'Platinum'
    if (n.includes('steel')) return 'Steel'
    if (n.includes('crystal')) return 'Crystal'
    if (n.includes('titanium')) return 'Titanium'
    return 'Precious Metal'
  }

  function CopyBtn({ text }: { text: string }) {
    const [c, setC] = useState(false)
    return (
      <button onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(()=>setC(false),2000) }}
        style={{ display:'flex', alignItems:'center', gap:6, color:GOLD, background:'none', border:'none', cursor:'pointer' }}>
        {c ? <Check size={10}/> : <Copy size={10}/>}
        <span style={{ fontSize:7, letterSpacing:'0.3em', textTransform:'uppercase' as const }}>{c?'Copied':'Copy'}</span>
      </button>
    )
  }

  export default function JewelryProductPage({ product }: { product: Product }) {
    const [payMethod, setPayMethod] = useState<'pkr'|'contact'>('pkr')
    const [proof, setProof] = useState('')
    const [ordered, setOrdered] = useState(false)
    const [openSection, setOpenSection] = useState<string|null>('payment')
    const [activeImg, setActiveImg] = useState(0)

    const images = product.images || []
    const heroImg = images[0] || null
    const priceUsd = product.price_usd || 0
    const pricePkr = product.price_pkr || 0
    const pieceType = getPieceType(product)
    const rarity = getRarity(priceUsd)
    const material = getMaterial(product)
    const pkrStr = pricePkr ? `PKR ${Number(pricePkr).toLocaleString()}` : null

    const traits = [
      { label: 'Classification', value: pieceType },
      { label: 'Rarity Tier', value: rarity },
      { label: 'Primary Material', value: material },
      { label: 'Archive Status', value: 'Sovereign Collection' },
      { label: 'Provenance', value: 'Shamim Forever House' },
      { label: 'NFT Twin', value: priceUsd >= 1000 ? 'Enabled' : 'Standard' },
    ]

    const toggleSection = (s: string) => setOpenSection(o => o === s ? null : s)

    if (ordered) {
      return (
        <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#030303', padding:'80px 24px' }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center', maxWidth:480 }}>
            <div style={{ width:48, height:48, border:`1px solid ${GOLD}40`, margin:'0 auto 24px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Check size={18} color={GOLD}/>
            </div>
            <p style={{ fontSize:7, letterSpacing:'0.9em', textTransform:'uppercase', color:GOLD, marginBottom:14, fontFamily:MONO }}>Order Confirmed</p>
            <p style={{ fontFamily:SERIF, fontSize:22, fontWeight:300, color:'#fff', marginBottom:8 }}>{product.name}</p>
            <p style={{ fontSize:8, letterSpacing:'0.3em', color:'rgba(255,255,255,0.4)', marginBottom:32 }}>Your order has been received. Our team will contact you within 24 hours.</p>
            <Link href="/shop" style={{ display:'inline-block', border:`1px solid ${GOLD}60`, color:GOLD, padding:'12px 32px', fontSize:7, letterSpacing:'0.35em', textTransform:'uppercase', textDecoration:'none', fontFamily:MONO }}>
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      )
    }

    return (
      <>
        <style>{PAGE_CSS}</style>
        <div style={{ background:'#030303', minHeight:'100vh', color:'#fff', fontFamily:SERIF }}>

          {/* ── NAV ─────────────────────────────────────────────────────── */}
          <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, padding:'16px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgba(201,160,84,0.08)', background:'rgba(3,3,3,0.95)', backdropFilter:'blur(12px)' }}>
            <Link href="/" style={{ textDecoration:'none' }}>
              <span style={{ fontFamily:SERIF, fontSize:13, letterSpacing:'0.25em', color:GOLD, textTransform:'uppercase' }}>Shamim Forever</span>
            </Link>
            <div style={{ display:'flex', gap:24 }}>
              <Link href="/shop" style={{ fontSize:7, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', textDecoration:'none', fontFamily:MONO }}>Shop</Link>
              <Link href="/collections" style={{ fontSize:7, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', textDecoration:'none', fontFamily:MONO }}>Collections</Link>
            </div>
          </nav>

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <section style={{ paddingTop:120, paddingBottom:80, paddingLeft:32, paddingRight:32, maxWidth:1200, margin:'0 auto' }}>
            <div className="jw-hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>

              {/* Left — image */}
              <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:1 }}>
                <div style={{ position:'relative', aspectRatio:'1', border:`1px solid ${GOLD}20`, overflow:'hidden', background:'#0a0a0a' }} className="jw-holo">
                  <div className="jw-scan"/>
                  {heroImg ? (
                    <img src={activeImg < images.length ? images[activeImg] : heroImg}
                      alt={product.name}
                      style={{ width:'100%', height:'100%', objectFit:'contain', padding:'12%' }}
                    />
                  ) : (
                    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Crown size={64} color={`${GOLD}30`}/>
                    </div>
                  )}
                  {/* Rarity badge */}
                  <div style={{ position:'absolute', top:16, right:16, background:'rgba(3,3,3,0.9)', border:`1px solid ${GOLD}40`, padding:'4px 10px' }}>
                    <span style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:GOLD, fontFamily:MONO }}>{rarity}</span>
                  </div>
                </div>
                {/* Thumbnail strip */}
                {images.length > 1 && (
                  <div style={{ display:'flex', gap:8, marginTop:12 }}>
                    {images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImg(i)}
                        style={{ width:56, height:56, border:`1px solid ${i===activeImg ? GOLD : GOLD+'20'}`, background:'#0a0a0a', cursor:'pointer', padding:4, overflow:'hidden' }}>
                        <img src={img} alt="" style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Right — details */}
              <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:1, delay:0.2 }}>
                <p style={{ fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', color:GOLD, marginBottom:16, fontFamily:MONO }}>
                  Shamim Forever · {pieceType} · {rarity}
                </p>
                <h1 style={{ fontFamily:SERIF, fontSize:32, fontWeight:300, lineHeight:1.2, marginBottom:8, color:'#fff' }}>
                  {product.name}
                </h1>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:32 }}>
                  <motion.div animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:2, repeat:Infinity }} style={{ fontSize:16, color:GOLD }}>◆</motion.div>
                  <span style={{ fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', fontFamily:MONO }}>{material}</span>
                </div>

                {/* Price */}
                <div style={{ marginBottom:32 }}>
                  <p style={{ fontFamily:SERIF, fontSize:38, fontWeight:300, color:GOLD2, marginBottom:4 }}>
                    ${priceUsd.toLocaleString()} <span style={{ fontSize:14, color:`${GOLD}80` }}>USD</span>
                  </p>
                  {pkrStr && (
                    <p style={{ fontSize:9, letterSpacing:'0.25em', color:'rgba(255,255,255,0.4)', fontFamily:MONO }}>{pkrStr}</p>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p style={{ fontFamily:SERIF, fontSize:13, lineHeight:1.8, color:'rgba(255,255,255,0.6)', marginBottom:32, fontStyle:'italic', borderLeft:`2px solid ${GOLD}40`, paddingLeft:16 }}>
                    {product.description.slice(0, 220)}{product.description.length > 220 ? '...' : ''}
                  </p>
                )}

                {/* Sovereign Traits mini */}
                <div style={{ border:`1px solid ${GOLD}15`, padding:20, marginBottom:32 }}>
                  <p style={{ fontSize:6, letterSpacing:'0.5em', textTransform:'uppercase', color:GOLD, marginBottom:14, fontFamily:MONO }}>Sovereign Traits</p>
                  <div className="jw-trait-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>
                    {traits.slice(0,4).map(t => (
                      <div key={t.label} className="jw-trait-row" style={{ paddingRight:16 }}>
                        <p style={{ fontSize:6, letterSpacing:'0.35em', textTransform:'uppercase', color:GOLD, marginBottom:3, fontFamily:MONO }}>{t.label}</p>
                        <p style={{ fontFamily:SERIF, fontSize:11, color:'rgba(255,255,255,0.75)' }}>{t.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button onClick={() => { const el = document.getElementById('jw-order'); el?.scrollIntoView({ behavior:'smooth' }) }}
                  style={{ width:'100%', background:GOLD, color:'#030303', border:'none', padding:'16px', fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', cursor:'pointer', fontFamily:MONO, fontWeight:700, marginBottom:12 }}>
                  Acquire This Piece
                </button>
                <button onClick={() => { const el = document.getElementById('jw-order'); el?.scrollIntoView({ behavior:'smooth' }); setPayMethod('contact') }}
                  style={{ width:'100%', background:'transparent', color:GOLD, border:`1px solid ${GOLD}40`, padding:'14px', fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', cursor:'pointer', fontFamily:MONO }}>
                  Request Private Consultation
                </button>
              </motion.div>
            </div>
          </section>

          {/* ── SEPARATOR ────────────────────────────────────────────────── */}
          <div style={{ maxWidth:1200, margin:'0 auto 80px', padding:'0 32px' }}>
            <div style={{ height:1, background:`linear-gradient(90deg,transparent,${GOLD}40,transparent)` }}/>
            <div style={{ textAlign:'center', marginTop:-8 }}>
              <motion.div animate={{ opacity:[0.3,1,0.3] }} transition={{ duration:2.5, repeat:Infinity }} style={{ fontSize:14, color:GOLD, display:'inline-block', background:'#030303', padding:'0 16px' }}>◆</motion.div>
            </div>
          </div>

          {/* ── NFT IDENTITY ─────────────────────────────────────────────── */}
          <section style={{ maxWidth:1200, margin:'0 auto 80px', padding:'0 32px' }}>
            <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
              <p style={{ fontSize:7, letterSpacing:'0.6em', textTransform:'uppercase', color:GOLD, marginBottom:8, fontFamily:MONO }}>Sovereign Identity</p>
              <h2 style={{ fontFamily:SERIF, fontSize:26, fontWeight:300, marginBottom:40, color:'#fff' }}>
                {product.name} — Digital Provenance Record
              </h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }} className="jw-price-grid">
                {[
                  { icon:<Crown size={18} color={GOLD}/>, label:'Piece Type', value:pieceType },
                  { icon:<Gem size={18} color={GOLD}/>, label:'Rarity Class', value:rarity },
                  { icon:<Shield size={18} color={GOLD}/>, label:'NFT Twin', value:priceUsd >= 1000 ? 'Blockchain Verified' : 'Standard' },
                ].map(item => (
                  <div key={item.label} style={{ border:`1px solid ${GOLD}15`, padding:24, position:'relative', overflow:'hidden' }} className="jw-holo">
                    <div style={{ marginBottom:12 }}>{item.icon}</div>
                    <p style={{ fontSize:6, letterSpacing:'0.4em', textTransform:'uppercase', color:GOLD, marginBottom:6, fontFamily:MONO }}>{item.label}</p>
                    <p style={{ fontFamily:SERIF, fontSize:16, color:'#fff', fontWeight:300 }}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Full traits table */}
              <div style={{ border:`1px solid ${GOLD}15`, padding:32, marginTop:32 }}>
                <p style={{ fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', color:GOLD, marginBottom:24, fontFamily:MONO }}>Archive Attributes</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>
                  {traits.map(t => (
                    <div key={t.label} className="jw-trait-row" style={{ paddingRight:24, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                      <span style={{ fontSize:6, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', fontFamily:MONO }}>{t.label}</span>
                      <span style={{ fontFamily:SERIF, fontSize:11, color:'rgba(255,255,255,0.8)', textAlign:'right' }}>{t.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* ── STORY ──────────────────────────────────────────────────── */}
          {(product.story || product.description) && (
            <section style={{ maxWidth:800, margin:'0 auto 80px', padding:'0 32px', textAlign:'center' }}>
              <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
                <div style={{ width:32, height:1, background:GOLD, margin:'0 auto 32px' }}/>
                <p style={{ fontFamily:SERIF, fontSize:16, lineHeight:2, color:'rgba(255,255,255,0.6)', fontStyle:'italic' }}>
                  {(product.story || product.description || '').slice(0, 500)}
                </p>
                <div style={{ width:32, height:1, background:GOLD, margin:'32px auto 0' }}/>
              </motion.div>
            </section>
          )}

          {/* ── SEPARATOR ────────────────────────────────────────────────── */}
          <div style={{ maxWidth:1200, margin:'0 auto 80px', padding:'0 32px' }}>
            <div style={{ height:1, background:`linear-gradient(90deg,transparent,${GOLD}40,transparent)` }}/>
          </div>

          {/* ── ORDER SECTION ─────────────────────────────────────────────── */}
          <section id="jw-order" style={{ maxWidth:700, margin:'0 auto 120px', padding:'0 32px' }}>
            <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
              <p style={{ fontSize:7, letterSpacing:'0.6em', textTransform:'uppercase', color:GOLD, marginBottom:8, fontFamily:MONO }}>Acquisition</p>
              <h2 style={{ fontFamily:SERIF, fontSize:26, fontWeight:300, marginBottom:40 }}>Complete Your Order</h2>

              {/* Method selector */}
              <div style={{ display:'flex', gap:0, marginBottom:32, border:`1px solid ${GOLD}20` }}>
                {(['pkr','contact'] as const).map(m => (
                  <button key={m} onClick={() => setPayMethod(m)}
                    style={{ flex:1, padding:'14px', background:payMethod===m ? GOLD : 'transparent', color:payMethod===m ? '#030303' : GOLD, border:'none', cursor:'pointer', fontSize:7, letterSpacing:'0.35em', textTransform:'uppercase', fontFamily:MONO, fontWeight:payMethod===m ? 700 : 400 }}>
                    {m === 'pkr' ? 'Bank Transfer' : 'Private Consultation'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {payMethod === 'pkr' && (
                  <motion.div key="pkr" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                    <div style={{ border:`1px solid ${GOLD}20`, padding:28, marginBottom:24 }}>
                      <p style={{ fontSize:7, letterSpacing:'0.4em', textTransform:'uppercase', color:GOLD, marginBottom:20, fontFamily:MONO }}>Payment Details</p>
                      <div style={{ marginBottom:16 }}>
                        <p style={{ fontSize:7, letterSpacing:'0.3em', color:'rgba(255,255,255,0.4)', marginBottom:6, fontFamily:MONO }}>EASYPAISA</p>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <span style={{ fontFamily:SERIF, fontSize:14, color:'#fff' }}>{EASYPAISA_NUMBER} — {EASYPAISA_NAME}</span>
                          <CopyBtn text={EASYPAISA_NUMBER}/>
                        </div>
                      </div>
                      <div style={{ height:1, background:`${GOLD}15`, margin:'16px 0' }}/>
                      <div>
                        <p style={{ fontSize:7, letterSpacing:'0.3em', color:'rgba(255,255,255,0.4)', marginBottom:6, fontFamily:MONO }}>UBL BANK IBAN</p>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <span style={{ fontFamily:SERIF, fontSize:12, color:'#fff', letterSpacing:'0.05em' }}>{UBL_IBAN}</span>
                          <CopyBtn text={UBL_IBAN}/>
                        </div>
                      </div>
                      <div style={{ height:1, background:`${GOLD}15`, margin:'16px 0' }}/>
                      <div style={{ display:'flex', justifyContent:'space-between' }}>
                        <span style={{ fontSize:7, letterSpacing:'0.3em', color:'rgba(255,255,255,0.4)', fontFamily:MONO }}>AMOUNT</span>
                        <span style={{ fontFamily:SERIF, fontSize:14, color:GOLD2 }}>
                          {pkrStr || `$${priceUsd.toLocaleString()} USD`}
                        </span>
                      </div>
                    </div>

                    <div style={{ marginBottom:24 }}>
                      <p style={{ fontSize:7, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginBottom:10, fontFamily:MONO }}>Payment Proof (URL or Reference)</p>
                      <input
                        type="text"
                        value={proof}
                        onChange={e => setProof(e.target.value)}
                        placeholder="Paste screenshot URL or transaction reference..."
                        style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:`1px solid ${GOLD}25`, color:'#fff', padding:'14px 16px', fontSize:11, fontFamily:SERIF, outline:'none', boxSizing:'border-box' as const }}
                      />
                    </div>

                    <button
                      onClick={async () => {
                        if (!proof.trim()) return alert('Please add payment proof')
                        try {
                          await fetch('/api/orders', { method:'POST', headers:{'Content-Type':'application/json'},
                            body: JSON.stringify({ product_id: product.id, product_slug: product.slug, product_name: product.name, payment_method:'bank_transfer', payment_proof: proof, price_usd: priceUsd, price_pkr: pricePkr }) })
                          setOrdered(true)
                        } catch {}
                      }}
                      style={{ width:'100%', background:GOLD, color:'#030303', border:'none', padding:'16px', fontSize:7, letterSpacing:'0.45em', textTransform:'uppercase', cursor:'pointer', fontFamily:MONO, fontWeight:700 }}>
                      Confirm Order — {product.name}
                    </button>
                  </motion.div>
                )}

                {payMethod === 'contact' && (
                  <motion.div key="contact" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                    <div style={{ border:`1px solid ${GOLD}20`, padding:32, textAlign:'center' }}>
                      <Crown size={28} color={GOLD} style={{ margin:'0 auto 16px' }}/>
                      <p style={{ fontFamily:SERIF, fontSize:18, fontWeight:300, marginBottom:12 }}>Private Consultation</p>
                      <p style={{ fontSize:8, letterSpacing:'0.2em', color:'rgba(255,255,255,0.5)', marginBottom:24, fontFamily:MONO }}>
                        For this piece, our jewelry concierge will personally assist you.
                      </p>
                      <a href="https://wa.me/923367970004" target="_blank" rel="noopener noreferrer"
                        style={{ display:'inline-block', background:GOLD, color:'#030303', padding:'14px 32px', fontSize:7, letterSpacing:'0.4em', textTransform:'uppercase', textDecoration:'none', fontFamily:MONO, fontWeight:700 }}>
                        Contact Jewelry Concierge
                      </a>
                      <p style={{ fontSize:7, letterSpacing:'0.25em', color:GOLD, marginTop:20, fontFamily:MONO }}>WhatsApp: +92 336 7970004</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </section>

          {/* ── FOOTER ─────────────────────────────────────────────────── */}
          <footer style={{ borderTop:`1px solid ${GOLD}15`, padding:'48px 32px', textAlign:'center' }}>
            <p style={{ fontFamily:SERIF, fontSize:18, letterSpacing:'0.2em', color:GOLD, marginBottom:8 }}>SHAMIM FOREVER</p>
            <p style={{ fontSize:7, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:24, fontFamily:MONO }}>House of Sovereign Luxury · Est. 1928</p>
            <div style={{ display:'flex', justifyContent:'center', gap:32 }}>
              {[['Shop','/shop'],['Collections','/collections'],['Our Story','/our-story']].map(([l,h])=>(
                <Link key={l} href={h} style={{ fontSize:6, letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', textDecoration:'none', fontFamily:MONO }}>{l}</Link>
              ))}
            </div>
          </footer>
        </div>
      </>
    )
  }
  