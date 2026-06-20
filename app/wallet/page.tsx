'use client'
  import { useState } from 'react'
  import { useCart } from '@/lib/cart-context'
  import Link from 'next/link'
  import { motion, AnimatePresence } from 'framer-motion'

  export default function WalletPage() {
    const { items, removeItem, updateQty, clearCart, totalPrice } = useCart()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(false)
    const [orderResult, setOrderResult] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)

    const inputSt: React.CSSProperties = {
      width: '100%', padding: '14px 18px', background: '#080602', border: '1px solid rgba(201,160,84,0.08)',
      color: '#e8dcc8', fontSize: 11, letterSpacing: '0.08em', outline: 'none', marginBottom: 2,
      fontFamily: 'inherit',
    }

    async function handlePlaceOrder() {
      if (!name || !phone || !address || !city || !country) { setError('Please fill all delivery fields'); return }
      if (items.length === 0) { setError('Your wallet is empty'); return }
      setLoading(true); setError(null)
      try {
        const results = []
        for (const item of items) {
          const res = await fetch('/api/v1/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              product_id: item.product_id,
              product_name: item.product_name,
              quantity: item.quantity,
              payment_method: 'cod',
              payment_status: 'pending',
              customer_name: name,
              customer_phone: phone,
              delivery_address: `${address}, ${city}, ${country}`,
              city,
              country,
              custom_message: item.custom_message,
            })
          })
          const data = await res.json()
          if (res.ok) results.push(data)
          else throw new Error(data.error || 'Order failed')
        }
        setOrderResult(results)
        clearCart()
      } catch(e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    const st: React.CSSProperties = { minHeight: '100vh', background: '#050505', padding: 'clamp(80px,12vw,120px) clamp(16px,5vw,80px) 60px', fontFamily: 'inherit' }
    const gold = '#c9a054'

    if (orderResult.length > 0) {
      return (
        <div style={st}>
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ color: gold, fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: 24 }}>Order Confirmed</p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem,6vw,3rem)', color: '#e8dcc8', fontWeight: 300, marginBottom: 32, letterSpacing: '0.06em' }}>Thank You</h1>
            <p style={{ color: '#6b6b6b', fontSize: 11, letterSpacing: '0.1em', marginBottom: 40 }}>{orderResult.length} order{orderResult.length > 1 ? 's' : ''} placed successfully. Our team will contact you shortly.</p>
            {orderResult.map((o, i) => (
              <div key={i} style={{ padding: '16px 20px', border: '1px solid rgba(201,160,84,0.12)', marginBottom: 8, textAlign: 'left' }}>
                <p style={{ color: gold, fontSize: 9, letterSpacing: '0.3em' }}>Order Ref: {o.order_ref || o.tracking_ref || o.order_id}</p>
              </div>
            ))}
            <Link href="/shop" style={{ display: 'inline-block', marginTop: 32, padding: '14px 40px', border: '1px solid rgba(201,160,84,0.4)', color: gold, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div style={st}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ color: gold, fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: 12 }}>My Wallet</p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem,5vw,2.8rem)', color: '#e8dcc8', fontWeight: 300, letterSpacing: '0.06em', marginBottom: 48 }}>
            Your Selections
          </h1>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: '#3f3830', fontSize: 11, letterSpacing: '0.3em', marginBottom: 32 }}>Your wallet is empty</p>
              <Link href="/shop" style={{ color: gold, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(201,160,84,0.3)', padding: '12px 32px' }}>
                Browse Collections
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 48, alignItems: 'start' }}>
              {/* Items list */}
              <div>
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div key={item.product_id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                      style={{ display: 'flex', gap: 16, padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      {item.image && (
                        <div style={{ width: 80, height: 100, flexShrink: 0, overflow: 'hidden', background: '#0a0a0a' }}>
                          <img src={item.image} alt={item.product_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: '#e8dcc8', fontSize: 11, letterSpacing: '0.1em', marginBottom: 4, lineHeight: 1.4 }}>{item.product_name}</p>
                        {item.custom_message && (
                          <p style={{ color: '#4a4a4a', fontSize: 9, letterSpacing: '0.2em', marginBottom: 8 }}>Note: {item.custom_message}</p>
                        )}
                        <p style={{ color: gold, fontSize: 10, letterSpacing: '0.2em', marginBottom: 12 }}>$ {(item.price_usd * item.quantity).toLocaleString()} USD</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(201,160,84,0.15)' }}>
                            <button onClick={() => item.quantity > 1 ? updateQty(item.product_id, item.quantity - 1) : removeItem(item.product_id)}
                              style={{ width: 32, height: 32, background: 'none', border: 'none', color: '#6b6b6b', cursor: 'pointer', fontSize: 14 }}>−</button>
                            <span style={{ width: 32, textAlign: 'center', color: '#e8dcc8', fontSize: 11 }}>{item.quantity}</span>
                            <button onClick={() => updateQty(item.product_id, item.quantity + 1)}
                              style={{ width: 32, height: 32, background: 'none', border: 'none', color: '#6b6b6b', cursor: 'pointer', fontSize: 14 }}>+</button>
                          </div>
                          <button onClick={() => removeItem(item.product_id)}
                            style={{ background: 'none', border: 'none', color: '#3f3830', fontSize: 9, letterSpacing: '0.3em', cursor: 'pointer', textTransform: 'uppercase' }}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div style={{ paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ color: '#3f3830', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{items.length} item{items.length !== 1 ? 's' : ''}</p>
                  <p style={{ color: '#e8dcc8', fontFamily: 'Georgia, serif', fontSize: 18, letterSpacing: '0.06em' }}>
                    $ {totalPrice.toLocaleString()} <span style={{ fontSize: 10, color: '#6b6b6b' }}>USD</span>
                  </p>
                </div>
              </div>

              {/* Checkout form */}
              <div style={{ position: 'sticky', top: 100 }}>
                <p style={{ fontSize: 7, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#3f3830', padding: '12px 18px', background: '#0a0703', border: '1px solid rgba(201,160,84,0.06)', marginBottom: 2 }}>
                  Delivery Information
                </p>
                {[
                  { v: name, s: setName, ph: 'Full Name *' },
                  { v: phone, s: setPhone, ph: 'Phone Number *' },
                  { v: address, s: setAddress, ph: 'Delivery Address *' },
                  { v: city, s: setCity, ph: 'City *' },
                  { v: country, s: setCountry, ph: 'Country *' },
                ].map(({ v, s, ph }) => (
                  <input key={ph} value={v} onChange={e => s(e.target.value)} placeholder={ph} style={inputSt} />
                ))}

                {error && <p style={{ color: '#c0392b', fontSize: 9, letterSpacing: '0.2em', padding: '8px 0' }}>{error}</p>}

                <button onClick={handlePlaceOrder} disabled={loading}
                  style={{ width: '100%', padding: '18px', background: gold, color: '#050505', fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', border: 'none', fontWeight: 600, marginTop: 12 }}>
                  {loading ? 'Placing Orders...' : `Place Order — $ ${totalPrice.toLocaleString()} USD`}
                </button>
                <p style={{ color: '#2a2a2a', fontSize: 8, letterSpacing: '0.2em', textAlign: 'center', marginTop: 12 }}>Cash on Delivery</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  