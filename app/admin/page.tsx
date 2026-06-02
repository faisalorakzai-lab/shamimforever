'use client'
import { useState, useEffect, useCallback } from 'react'

const SERIF = "'Cormorant Garamond', Georgia, serif"
const ADMIN_PASS = 'faisalorakzaiofficial@gmail.com'

const ORDER_STATUSES = [
  'Pending Verification',
  'Payment Approved',
  'Under Private Delivery Dispatch',
  'Completed',
  'Cancelled',
]

interface Asset {
  id: string
  serial_number: string
  wallet_address: string | null
  nft_status: string
  rarity_tier: string
  tx_hash: string | null
  token_id: number | null
  physical_status: string
  ownership_cycle: number
  created_at: string
}

interface ShippingAddress {
  name?: string
  phone?: string
  line1?: string
  city?: string
  country?: string
}

interface Order {
  id: string
  created_at: string
  status: string
  payment_method: string
  payment_status: string
  total_pkr: number
  total_usd: number
  shipping_address: ShippingAddress
  notes: string | null
  payment_proof_url: string | null
  order_ref: string | null
  tracking_ref: string | null
  consumer_number: string | null
  order_items?: Array<{ quantity: number; price_usd: number; product?: { name: string } }>
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function formatUsd(n: number) {
  return '$' + (n || 0).toFixed(2)
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState<'orders' | 'assets' | 'create'>('orders')
  const [assets, setAssets] = useState<Asset[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [orderFilter, setOrderFilter] = useState('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [form, setForm] = useState({
    serial: '', rarity: 'ELITE', product_name: '', category: 'Sovereign Luxury Assets',
  })

  const fetchAssets = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/assets')
      const data = await r.json()
      setAssets(data.assets || [])
    } catch { setMessage('Failed to load assets') }
    setLoading(false)
  }, [])

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const url = orderFilter !== 'all'
        ? `/api/orders?status=${encodeURIComponent(orderFilter)}`
        : '/api/orders'
      const r = await fetch(url)
      const data = await r.json()
      setOrders(data.orders || [])
    } catch { setMessage('Failed to load orders') }
    setLoading(false)
  }, [orderFilter])

  useEffect(() => {
    if (!authed) return
    if (tab === 'assets' || tab === 'create') fetchAssets()
    if (tab === 'orders') fetchOrders()
  }, [authed, tab, fetchAssets, fetchOrders])

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const r = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (r.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
        setMessage('Status updated successfully')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to update status')
      }
    } catch { setMessage('Network error') }
  }

  const handleCreate = async () => {
    if (!form.serial) return setMessage('Serial number required')
    setLoading(true)
    try {
      const r = await fetch('/api/admin/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, secret: ADMIN_PASS }),
      })
      const data = await r.json()
      if (data.success) {
        setMessage('Asset created: ' + form.serial)
        setForm({ serial: '', rarity: 'ELITE', product_name: '', category: 'Sovereign Luxury Assets' })
        fetchAssets()
        setTab('assets')
      } else {
        setMessage('Error: ' + (data.error || 'Failed'))
      }
    } catch { setMessage('Network error') }
    setLoading(false)
  }

  if (!authed) {
    return (
      <main style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF }}>
        <div style={{ background: '#0c0a07', border: '1px solid rgba(201,160,84,0.25)', borderRadius: 4, padding: 56, width: 380 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ color: '#c9a054', fontSize: 10, letterSpacing: 5, marginBottom: 8 }}>SHAMIM FOREVER</div>
            <div style={{ color: '#f0ece4', fontSize: 24, fontWeight: 300, letterSpacing: '0.15em' }}>Sovereign Admin</div>
            <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(201,160,84,0.4), transparent)', marginTop: 16 }} />
          </div>
          <input
            type="password"
            placeholder="Enter access password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                password === ADMIN_PASS ? setAuthed(true) : setMessage('Incorrect password')
              }
            }}
            style={{
              width: '100%', background: '#080604', border: '1px solid rgba(201,160,84,0.15)',
              padding: '12px 16px', color: '#f0ece4', fontSize: 12, marginBottom: 12,
              boxSizing: 'border-box',
            }}
          />
          {message && <p style={{ color: '#e55', fontSize: 10, marginBottom: 8 }}>{message}</p>}
          <button
            onClick={() => password === ADMIN_PASS ? setAuthed(true) : setMessage('Incorrect password')}
            style={{
              width: '100%', background: 'linear-gradient(135deg, #c9a054, #a07830)',
              color: '#050505', border: 'none', padding: '12px',
              fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: SERIF,
            }}
          >
            Enter Archive
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: '#050505', fontFamily: 'system-ui, sans-serif', padding: '80px 24px 60px' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 300, color: '#f0ece4', letterSpacing: '0.1em', margin: 0 }}>
              Sovereign Admin
            </p>
            <p style={{ fontSize: 9, letterSpacing: '0.4em', color: '#c9a054', textTransform: 'uppercase', margin: '4px 0 0' }}>
              House of Shamim Forever
            </p>
          </div>
          <button
            onClick={() => setAuthed(false)}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 16px', color: 'rgba(255,255,255,0.3)', fontSize: 9, letterSpacing: '0.3em', cursor: 'pointer', textTransform: 'uppercase' }}
          >
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 1, marginBottom: 32, borderBottom: '1px solid rgba(201,160,84,0.1)' }}>
          {(['orders', 'assets', 'create'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setMessage('') }}
              style={{
                padding: '10px 24px', fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase',
                background: tab === t ? 'rgba(201,160,84,0.1)' : 'none',
                border: 'none', borderBottom: tab === t ? '1px solid #c9a054' : '1px solid transparent',
                color: tab === t ? '#c9a054' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer', fontFamily: 'inherit', marginBottom: -1,
              }}
            >
              {t === 'orders' ? '◆ Orders' : t === 'assets' ? '◈ Assets' : '+ Create'}
            </button>
          ))}
        </div>

        {/* Message */}
        {message && (
          <div style={{ padding: '10px 16px', background: 'rgba(201,160,84,0.06)', border: '1px solid rgba(201,160,84,0.18)', color: '#c9b894', fontSize: 10, marginBottom: 20, borderRadius: 2, display: 'flex', justifyContent: 'space-between' }}>
            <span>{message}</span>
            <button onClick={() => setMessage('')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 14 }}>×</button>
          </div>
        )}

        {/* ══════ ORDERS TAB ══════ */}
        {tab === 'orders' && (
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {['all', ...ORDER_STATUSES].map(s => (
                  <button key={s} onClick={() => setOrderFilter(s)}
                    style={{
                      padding: '4px 10px', fontSize: 7, letterSpacing: '0.2em', textTransform: 'uppercase',
                      background: orderFilter === s ? 'rgba(201,160,84,0.12)' : 'none',
                      border: `1px solid ${orderFilter === s ? 'rgba(201,160,84,0.4)' : 'rgba(255,255,255,0.08)'}`,
                      color: orderFilter === s ? '#c9a054' : 'rgba(255,255,255,0.3)',
                      cursor: 'pointer', borderRadius: 2, fontFamily: 'inherit',
                    }}
                  >
                    {s === 'all' ? 'All Orders' : s}
                  </button>
                ))}
              </div>
              <button onClick={fetchOrders}
                style={{ padding: '5px 14px', background: 'none', border: '1px solid rgba(201,160,84,0.2)', color: '#c9a054', fontSize: 8, cursor: 'pointer', letterSpacing: '0.25em', fontFamily: 'inherit' }}
              >
                ↻ Refresh
              </button>
            </div>

            {/* Column headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 120px 80px 190px', gap: 12, padding: '8px 16px', borderBottom: '1px solid rgba(201,160,84,0.08)' }}>
              {['Consumer / Date', 'Customer', 'Amount', 'Proof', 'Status'].map(h => (
                <p key={h} style={{ fontSize: 6, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#3f3830', margin: 0 }}>{h}</p>
              ))}
            </div>

            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 40, fontSize: 11 }}>Loading orders…</p>
            ) : orders.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.2)', textAlign: 'center', padding: 40, fontSize: 11 }}>No orders found</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {orders.map(order => {
                  const addr = order.shipping_address || {}
                  const isExpanded = expandedOrder === order.id
                  const usdDisplay = formatUsd(order.total_usd)
                  const pkrDisplay = 'PKR ' + (order.total_pkr || 0).toLocaleString()

                  return (
                    <div key={order.id} style={{ background: '#0a0805', border: '1px solid rgba(201,160,84,0.06)' }}>
                      <div
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        style={{ display: 'grid', gridTemplateColumns: '160px 1fr 120px 80px 190px', gap: 12, padding: '14px 16px', cursor: 'pointer', alignItems: 'center' }}
                      >
                        <div>
                          <p style={{ fontSize: 7, letterSpacing: '0.28em', color: '#c9a054', margin: 0, textTransform: 'uppercase', fontFamily: 'monospace' }}>
                            {order.consumer_number || order.order_ref || order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', margin: '3px 0 0' }}>
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: 12, color: '#f0ece4', margin: 0 }}>{addr.name || '—'}</p>
                          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.32)', margin: '2px 0 0' }}>
                            {[addr.city, addr.country].filter(Boolean).join(', ')}
                            {addr.phone ? ' · ' + addr.phone : ''}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: 14, fontFamily: SERIF, color: '#c9a054', margin: 0 }}>{usdDisplay}</p>
                          <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.22)', margin: '2px 0 0', letterSpacing: '0.15em' }}>{pkrDisplay}</p>
                        </div>
                        <div>
                          {order.payment_proof_url ? (
                            <a href={order.payment_proof_url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
                              <img
                                src={order.payment_proof_url}
                                alt="proof"
                                style={{ height: 40, width: 40, objectFit: 'cover', border: '1px solid rgba(201,160,84,0.2)', opacity: 0.85, display: 'block' }}
                              />
                            </a>
                          ) : (
                            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>—</span>
                          )}
                        </div>
                        <div onClick={e => e.stopPropagation()}>
                          <select
                            value={order.status}
                            onChange={e => updateOrderStatus(order.id, e.target.value)}
                            style={{
                              background: '#0c0a07', border: '1px solid rgba(201,160,84,0.2)',
                              color: '#c9a054', padding: '5px 8px', fontSize: 7,
                              cursor: 'pointer', width: '100%', letterSpacing: '0.12em',
                              fontFamily: 'inherit', textTransform: 'uppercase',
                            }}
                          >
                            {ORDER_STATUSES.map(s => (
                              <option key={s} value={s} style={{ background: '#0c0a07' }}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {isExpanded && (
                        <div style={{ borderTop: '1px solid rgba(201,160,84,0.07)', padding: '16px 16px 20px', background: '#080604' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 16 }}>
                            <div>
                              <p style={{ fontSize: 7, letterSpacing: '0.4em', color: '#3f3830', textTransform: 'uppercase', marginBottom: 6 }}>Order References</p>
                              <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#c9b894', margin: '2px 0' }}>
                                {order.consumer_number || '—'}
                              </p>
                              <p style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(201,184,148,0.6)', margin: '2px 0' }}>
                                Ref: {order.order_ref || '—'}
                              </p>
                              <p style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(201,184,148,0.5)', margin: '2px 0' }}>
                                Track: {order.tracking_ref || '—'}
                              </p>
                            </div>
                            <div>
                              <p style={{ fontSize: 7, letterSpacing: '0.4em', color: '#3f3830', textTransform: 'uppercase', marginBottom: 6 }}>Delivery</p>
                              <p style={{ fontSize: 11, color: 'rgba(240,236,228,0.65)', lineHeight: 1.7, margin: 0 }}>
                                {addr.name}<br />
                                {addr.line1 || '—'}<br />
                                {[addr.city, addr.country].filter(Boolean).join(', ')}<br />
                                {addr.phone}
                              </p>
                            </div>
                            <div>
                              <p style={{ fontSize: 7, letterSpacing: '0.4em', color: '#3f3830', textTransform: 'uppercase', marginBottom: 6 }}>Payment</p>
                              <p style={{ fontSize: 12, color: '#c9a054', margin: 0 }}>{usdDisplay} USD</p>
                              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: '4px 0 0' }}>{pkrDisplay}</p>
                              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                via {order.payment_method}
                              </p>
                            </div>
                            {order.notes && (
                              <div>
                                <p style={{ fontSize: 7, letterSpacing: '0.4em', color: '#3f3830', textTransform: 'uppercase', marginBottom: 6 }}>Notes</p>
                                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontFamily: 'monospace', margin: 0 }}>
                                  {order.notes}
                                </p>
                              </div>
                            )}
                          </div>
                          {order.payment_proof_url && (
                            <div style={{ marginBottom: 16 }}>
                              <p style={{ fontSize: 7, letterSpacing: '0.4em', color: '#3f3830', textTransform: 'uppercase', marginBottom: 8 }}>Payment Proof Screenshot</p>
                              <a href={order.payment_proof_url} target="_blank" rel="noreferrer">
                                <img
                                  src={order.payment_proof_url}
                                  alt="Payment proof"
                                  style={{ maxHeight: 220, maxWidth: 340, objectFit: 'contain', border: '1px solid rgba(201,160,84,0.15)', opacity: 0.9 }}
                                />
                              </a>
                            </div>
                          )}
                          <a
                            href={`/track/${order.id}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: 'inline-block', padding: '6px 16px', border: '1px solid rgba(201,160,84,0.22)', color: '#c9a054', fontSize: 7, letterSpacing: '0.3em', textDecoration: 'none', textTransform: 'uppercase' }}
                          >
                            Track Order ↗
                          </a>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════ ASSETS TAB ══════ */}
        {tab === 'assets' && (
          <div>
            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 40 }}>Loading…</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {assets.map(a => (
                  <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#0a0805', border: '1px solid rgba(201,160,84,0.06)', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <p style={{ fontSize: 10, color: '#c9a054', fontFamily: 'monospace', margin: 0 }}>{a.serial_number}</p>
                      <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', margin: '3px 0 0', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{a.rarity_tier}</p>
                    </div>
                    <span style={{ padding: '3px 10px', background: a.nft_status === 'minted' ? '#1a3a1a' : '#2a2a18', color: a.nft_status === 'minted' ? '#5a9a5a' : '#9a9a58', fontSize: 7, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                      {a.nft_status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════ CREATE TAB ══════ */}
        {tab === 'create' && (
          <div style={{ maxWidth: 500 }}>
            {[
              { label: 'Serial Number *', key: 'serial' as const, placeholder: 'e.g. SB-001' },
              { label: 'Product Name', key: 'product_name' as const, placeholder: 'Shamim Bloom' },
            ].map(({ label, key, placeholder }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3f3830', marginBottom: 6 }}>{label}</p>
                <input
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{ width: '100%', background: '#080604', border: '1px solid rgba(201,160,84,0.12)', padding: '10px 14px', color: '#f0ece4', fontSize: 12, boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#3f3830', marginBottom: 6 }}>Rarity</p>
              <select
                value={form.rarity}
                onChange={e => setForm(f => ({ ...f, rarity: e.target.value }))}
                style={{ width: '100%', background: '#080604', border: '1px solid rgba(201,160,84,0.12)', padding: '10px 14px', color: '#f0ece4', fontSize: 11 }}
              >
                {['FOUNDER RESERVE', 'ELITE', 'PREMIUM', 'STANDARD'].map(r => (
                  <option key={r} value={r} style={{ background: '#0c0a07' }}>{r}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleCreate}
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #c9a054, #a07830)', color: '#050505', border: 'none', padding: '12px 32px', fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.5 : 1 }}
            >
              {loading ? 'Creating…' : 'Create Asset'}
            </button>
          </div>
        )}

      </div>
    </main>
  )
}
