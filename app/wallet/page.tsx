'use client'
  import { useState, useCallback } from 'react'
  import { useCart } from '@/lib/cart-context'
  import Link from 'next/link'
  import { motion, AnimatePresence } from 'framer-motion'
  import Web3PaySection from '@/components/Web3PaySection'
  import type { CoinType } from '@/components/Web3PaySection'

  const WALLET_CSS = `
    .wlt-wrap { min-height:100vh; background:#050505; padding:100px clamp(16px,6vw,80px) 80px; font-family:inherit }
    .wlt-inner { max-width:1100px; margin:0 auto }
    .wlt-grid { display:grid; grid-template-columns:1fr 400px; gap:60px; align-items:start }
    .wlt-form-col { position:sticky; top:100px }
    @media(max-width:900px){
      .wlt-grid { grid-template-columns:1fr; gap:0 }
      .wlt-form-col { position:static; margin-top:48px; border-top:1px solid rgba(201,160,84,0.08); padding-top:40px }
    }
    .wlt-item { display:grid; grid-template-columns:96px 1fr; gap:20px; padding:28px 0; border-bottom:1px solid rgba(255,255,255,0.04) }
    @media(max-width:480px){ .wlt-item { grid-template-columns:72px 1fr; gap:14px; padding:20px 0 } }
    .wlt-img { width:100%; aspect-ratio:3/4; object-fit:cover; display:block }
    .wlt-img-wrap { overflow:hidden; background:#0a0a0a }
    .wlt-input { width:100%; padding:15px 18px; background:#07060a; border:1px solid rgba(201,160,84,0.1); border-bottom:none; color:#e8dcc8; font-size:11px; letter-spacing:0.08em; outline:none; font-family:inherit; transition:border-color 0.2s; box-sizing:border-box; display:block }
    .wlt-input:last-of-type { border-bottom:1px solid rgba(201,160,84,0.1) }
    .wlt-input:focus { border-color:rgba(201,160,84,0.3); background:#090710 }
    .wlt-input::placeholder { color:rgba(201,160,84,0.25) }
    .wlt-qty { display:flex; align-items:center; border:1px solid rgba(201,160,84,0.18) }
    .wlt-qty-btn { width:34px; height:34px; background:none; border:none; color:rgba(201,160,84,0.5); cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; transition:color 0.2s; font-family:inherit }
    .wlt-qty-btn:hover { color:#c9a054 }
    .wlt-qty-val { width:34px; text-align:center; color:#e8dcc8; font-size:11px }
    .wlt-remove { background:none; border:none; color:rgba(255,255,255,0.12); font-size:8px; letter-spacing:0.35em; cursor:pointer; text-transform:uppercase; font-family:inherit; padding:0; margin-left:16px; transition:color 0.2s }
    .wlt-remove:hover { color:rgba(255,80,80,0.5) }
    .wlt-divider { height:1px; background:linear-gradient(90deg,rgba(201,160,84,0.12),transparent); margin:32px 0 }
    .wlt-error { color:rgba(255,80,80,0.75); font-size:9px; letter-spacing:0.2em; padding:12px 16px; border:1px solid rgba(255,80,80,0.12); background:rgba(255,80,80,0.04); margin-bottom:12px }
    .wlt-summary-box { background:#07060a; border:1px solid rgba(201,160,84,0.1); padding:22px }
    .wlt-summary-row { display:flex; justify-content:space-between; margin-bottom:12px; gap:12px }
  `

  export default function WalletPage() {
    const { items, removeItem, updateQty, clearCart, totalPrice } = useCart()
    const [name, setName]       = useState('')
    const [phone, setPhone]     = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity]       = useState('')
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(false)
    const [orderResult, setOrderResult] = useState<{order_ref?:string,tracking_ref?:string,order_id?:string,txHash?:string}[]>([])
    const [error, setError]     = useState<string | null>(null)

    const gold = '#c9a054'
    const MONO = 'ui-monospace,SFMono-Regular,Menlo,monospace'

    const handleCryptoSuccess = useCallback(async (txHash: string, coin: CoinType) => {
      if (!name || !phone || !address || !city || !country) {
        setError('Please fill all delivery fields before paying')
        return
      }
      setLoading(true); setError(null)
      try {
        const results: typeof orderResult = []
        for (const item of items) {
          const res = await fetch('/api/v1/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              product_id: item.product_id,
              product_name: item.product_name,
              quantity: item.quantity,
              payment_method: 'crypto',
              payment_status: 'paid',
              coin,
              tx_hash: txHash,
              customer_name: name,
              customer_phone: phone,
              delivery_address: `${address}, ${city}, ${country}`,
              city, country,
              custom_message: item.custom_message,
            })
          })
          const data = await res.json()
          if (res.ok) results.push({ ...data, txHash })
          else throw new Error(data.error || 'Order failed')
        }
        setOrderResult(results); clearCart()
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Order failed')
      } finally { setLoading(false) }
    }, [name, phone, address, city, country, items, clearCart])

    // ── Order confirmed ──────────────────────────────────────────────
    if (orderResult.length > 0) {
      return (
        <div className="wlt-wrap">
          <style>{WALLET_CSS}</style>
          <div style={{ maxWidth:520, margin:'0 auto', textAlign:'center' }}>
            <div style={{ width:60, height:60, borderRadius:'50%', border:'1px solid rgba(201,160,84,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 32px', color:gold, fontSize:22 }}>✓</div>
            <p style={{ color:gold, fontSize:8, letterSpacing:'0.55em', textTransform:'uppercase', marginBottom:14, fontFamily:MONO }}>Payment Confirmed · Blockchain Verified</p>
            <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(2rem,6vw,3rem)', color:'#e8dcc8', fontWeight:300, marginBottom:16, letterSpacing:'0.06em' }}>Thank You</h1>
            <p style={{ color:'rgba(255,255,255,0.3)', fontSize:11, letterSpacing:'0.1em', lineHeight:1.7, marginBottom:40 }}>
              {orderResult.length} order{orderResult.length > 1 ? 's' : ''} confirmed on Polygon. Our team will arrange delivery shortly.
            </p>
            <div style={{ marginBottom:32 }}>
              {orderResult.map((o, i) => (
                <div key={i} style={{ padding:'16px 20px', border:'1px solid rgba(201,160,84,0.1)', marginBottom:6 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:o.txHash ? 8 : 0 }}>
                    <span style={{ color:'rgba(255,255,255,0.25)', fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', fontFamily:MONO }}>Order Ref</span>
                    <span style={{ color:gold, fontSize:10, letterSpacing:'0.18em', fontFamily:MONO }}>{o.order_ref || o.tracking_ref || o.order_id}</span>
                  </div>
                  {o.txHash && (
                    <a href={`https://polygonscan.com/tx/${o.txHash}`} target="_blank" rel="noreferrer"
                      style={{ display:'flex', justifyContent:'space-between', textDecoration:'none', marginTop:6, paddingTop:6, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color:'rgba(255,255,255,0.2)', fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', fontFamily:MONO }}>TX Hash</span>
                      <span style={{ color:'rgba(201,160,84,0.5)', fontSize:9, fontFamily:MONO }}>{o.txHash.slice(0,10)}…{o.txHash.slice(-6)} ↗</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
            <Link href="/shop" style={{ display:'inline-block', padding:'15px 44px', border:'1px solid rgba(201,160,84,0.35)', color:gold, fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', textDecoration:'none', fontFamily:MONO }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      )
    }

    // ── Main wallet ──────────────────────────────────────────────────
    return (
      <div className="wlt-wrap">
        <style>{WALLET_CSS}</style>
        <div className="wlt-inner">

          {/* Header */}
          <div style={{ marginBottom:48, borderBottom:'1px solid rgba(255,255,255,0.04)', paddingBottom:32 }}>
            <p style={{ color:gold, fontSize:8, letterSpacing:'0.55em', textTransform:'uppercase', marginBottom:10, fontFamily:MONO }}>My Wallet</p>
            <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(1.8rem,4vw,2.6rem)', color:'#e8dcc8', fontWeight:300, letterSpacing:'0.06em', margin:0 }}>
              Your Selections
            </h1>
          </div>

          {items.length === 0 ? (
            <div style={{ textAlign:'center', padding:'100px 0' }}>
              <div style={{ width:48, height:48, border:'1px solid rgba(201,160,84,0.15)', margin:'0 auto 28px', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(201,160,84,0.3)', fontSize:18 }}>◇</div>
              <p style={{ color:'rgba(255,255,255,0.15)', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', marginBottom:32, fontFamily:MONO }}>Your wallet is empty</p>
              <Link href="/shop" style={{ color:gold, fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(201,160,84,0.3)', padding:'13px 36px', fontFamily:MONO }}>
                Browse Collections
              </Link>
            </div>
          ) : (
            <div className="wlt-grid">

              {/* ── Left: Items ─────────────────────────── */}
              <div>
                <p style={{ color:'rgba(255,255,255,0.15)', fontSize:7.5, letterSpacing:'0.4em', textTransform:'uppercase', fontFamily:MONO, paddingBottom:16, borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </p>

                <AnimatePresence>
                  {items.map(item => (
                    <motion.div key={item.product_id}
                      initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, height:0 }}
                      transition={{ duration:0.35 }} className="wlt-item">
                      <div className="wlt-img-wrap">
                        {item.image
                          ? <img src={item.image} alt={item.product_name} className="wlt-img" />
                          : <div className="wlt-img" style={{ display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(201,160,84,0.12)', fontSize:22 }}>◇</div>
                        }
                      </div>
                      <div style={{ minWidth:0 }}>
                        <p style={{ color:'rgba(201,160,84,0.35)', fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', marginBottom:3, fontFamily:MONO }}>House of Shamim Forever</p>
                        <p style={{ color:'#e8dcc8', fontSize:12, letterSpacing:'0.12em', lineHeight:1.5, marginBottom:5, wordBreak:'break-word' }}>{item.product_name}</p>
                        {item.custom_message && (
                          <p style={{ color:'rgba(255,255,255,0.22)', fontSize:9, letterSpacing:'0.15em', lineHeight:1.6, marginBottom:10, fontStyle:'italic' }}>"{item.custom_message}"</p>
                        )}
                        <p style={{ color:gold, fontSize:11, letterSpacing:'0.25em', marginBottom:16 }}>
                          $ {(item.price_usd * item.quantity).toLocaleString(undefined,{minimumFractionDigits:0})} <span style={{ fontSize:8, color:'rgba(201,160,84,0.55)', letterSpacing:'0.3em' }}>USD</span>
                        </p>
                        <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:8 }}>
                          <div className="wlt-qty">
                            <button className="wlt-qty-btn" onClick={() => item.quantity > 1 ? updateQty(item.product_id, item.quantity - 1) : removeItem(item.product_id)}>−</button>
                            <span className="wlt-qty-val">{item.quantity}</span>
                            <button className="wlt-qty-btn" onClick={() => updateQty(item.product_id, item.quantity + 1)}>+</button>
                          </div>
                          <button className="wlt-remove" onClick={() => removeItem(item.product_id)}>Remove</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="wlt-divider" />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                  <span style={{ color:'rgba(255,255,255,0.25)', fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', fontFamily:MONO }}>Total</span>
                  <span style={{ fontFamily:'Georgia,serif', fontSize:22, color:'#e8dcc8', letterSpacing:'0.04em' }}>
                    $ {totalPrice.toLocaleString(undefined,{minimumFractionDigits:0})} <span style={{ fontSize:10, color:'rgba(255,255,255,0.3)', letterSpacing:'0.2em' }}>USD</span>
                  </span>
                </div>
              </div>

              {/* ── Right: Delivery + Crypto Payment ─── */}
              <div className="wlt-form-col">

                {/* Order summary */}
                <div className="wlt-summary-box" style={{ marginBottom:3 }}>
                  <p style={{ fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', marginBottom:16, fontFamily:MONO }}>Order Summary</p>
                  {items.map(item => (
                    <div key={item.product_id} className="wlt-summary-row">
                      <span style={{ color:'rgba(255,255,255,0.35)', fontSize:10, letterSpacing:'0.05em', flex:1, lineHeight:1.4 }}>{item.product_name}</span>
                      <span style={{ color:gold, fontSize:10, letterSpacing:'0.1em', whiteSpace:'nowrap', fontFamily:MONO }}>$ {(item.price_usd * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div style={{ borderTop:'1px solid rgba(201,160,84,0.1)', paddingTop:12, marginTop:4, display:'flex', justifyContent:'space-between' }}>
                    <span style={{ color:'rgba(255,255,255,0.4)', fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', fontFamily:MONO }}>Total</span>
                    <span style={{ color:'#e8dcc8', fontSize:14, letterSpacing:'0.06em', fontFamily:'Georgia,serif' }}>$ {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Delivery info */}
                <p style={{ fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', padding:'16px 18px', background:'#07060a', border:'1px solid rgba(201,160,84,0.1)', borderBottom:'none', marginTop:20, fontFamily:MONO }}>
                  Delivery Information
                </p>
                {([
                  { v:name,    s:setName,    ph:'Full Name',        type:'text' },
                  { v:phone,   s:setPhone,   ph:'Phone Number',     type:'tel' },
                  { v:address, s:setAddress, ph:'Delivery Address', type:'text' },
                  { v:city,    s:setCity,    ph:'City',             type:'text' },
                  { v:country, s:setCountry, ph:'Country',          type:'text' },
                ] as {v:string,s:(x:string)=>void,ph:string,type:string}[]).map(({ v, s, ph, type }) => (
                  <input key={ph} value={v} onChange={e => s(e.target.value)} placeholder={ph + ' *'} type={type} className="wlt-input" />
                ))}

                {/* Crypto payment */}
                <div style={{ marginTop:20 }}>
                  <p style={{ fontSize:7, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(201,160,84,0.4)', padding:'16px 18px', background:'#07060a', border:'1px solid rgba(201,160,84,0.1)', marginBottom:0, fontFamily:MONO }}>
                    Crypto Payment · Polygon
                  </p>
                  <div style={{ border:'1px solid rgba(201,160,84,0.1)', borderTop:'none', padding:'20px' }}>
                    {!name || !phone || !address || !city || !country ? (
                      <div style={{ textAlign:'center', padding:'24px 0' }}>
                        <p style={{ color:'rgba(255,255,255,0.2)', fontSize:9, letterSpacing:'0.25em', fontFamily:MONO }}>Fill delivery details above to pay</p>
                      </div>
                    ) : (
                      <Web3PaySection priceUsd={totalPrice} onSuccess={handleCryptoSuccess} />
                    )}
                  </div>
                </div>

                {error && <div className="wlt-error" style={{ marginTop:12 }}>{error}</div>}
                {loading && (
                  <div style={{ textAlign:'center', padding:'16px', border:'1px solid rgba(201,160,84,0.1)', marginTop:12 }}>
                    <p style={{ color:gold, fontSize:8, letterSpacing:'0.4em', fontFamily:MONO }}>Recording order…</p>
                  </div>
                )}

                <p style={{ color:'rgba(255,255,255,0.1)', fontSize:8, letterSpacing:'0.25em', textAlign:'center', marginTop:14, fontFamily:MONO }}>
                  ◆ USDT · USDC · OKBOND · Polygon Network
                </p>
              </div>

            </div>
          )}
        </div>
      </div>
    )
  }
  