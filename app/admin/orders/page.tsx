'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Check, X, Eye, ExternalLink, RefreshCw, Package } from 'lucide-react'

const STATUS_OPTIONS = ['all', 'pending_verification', 'confirmed', 'shipped', 'delivered', 'cancelled']
const PAYMENT_METHODS: Record<string, { label: string; color: string }> = {
  usdt:         { label: 'USDT', color: '#26a17b' },
  usdc:         { label: 'USDC', color: '#2775ca' },
  okbond:       { label: 'OKBOND', color: '#c9a054' },
  pkr_manual:   { label: 'PKR Bank', color: '#888' },
  easypaisa:    { label: 'EasyPaisa', color: '#4caf50' },
  cod:          { label: 'COD', color: '#9e9e9e' },
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [proofModal, setProofModal] = useState<string | null>(null)
  const [actionMsg, setActionMsg] = useState<{ id: string; msg: string } | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*, product:products(name, images, slug))')
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  async function updateOrder(id: string, status: string, paymentStatus?: string) {
    const update: any = { status }
    if (paymentStatus) update.payment_status = paymentStatus
    const { error } = await supabase.from('orders').update(update).eq('id', id)
    if (!error) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, ...update } : o))
      setActionMsg({ id, msg: `✓ ${status}` })
      setTimeout(() => setActionMsg(null), 2500)
    }
  }

  function extractTxHash(notes: string | null): string | null {
    if (!notes) return null
    const match = notes.match(/0x[a-fA-F0-9]{60,66}/)
    return match?.[0] ?? null
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const pendingCount = orders.filter(o => o.status === 'pending_verification').length
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + (o.total_pkr || 0), 0)

  const statusStyle = (s: string) => {
    const map: Record<string, string> = {
      confirmed:            'text-emerald-400 border-emerald-500/30 bg-emerald-500/8',
      shipped:              'text-blue-400 border-blue-500/30 bg-blue-500/8',
      delivered:            'text-green-400 border-green-500/30 bg-green-500/8',
      cancelled:            'text-red-400/70 border-red-500/25 bg-red-500/5',
      pending_verification: 'text-amber-400 border-amber-500/40 bg-amber-500/8',
      pending:              'text-zinc-400 border-zinc-700 bg-zinc-900',
    }
    return map[s] ?? 'text-zinc-500 border-zinc-800'
  }

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[#1a1a1a] flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-2">Sovereign Logistics</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-[0.2em] uppercase text-zinc-100">Orders</h1>
        </div>
        <div className="flex gap-6 md:gap-10">
          <div className="text-center">
            <p className="font-serif text-2xl font-light text-zinc-100">{orders.length}</p>
            <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mt-1">Total Orders</p>
          </div>
          {pendingCount > 0 && (
            <div className="text-center">
              <p className="font-serif text-2xl font-light text-amber-400">{pendingCount}</p>
              <p className="text-[7px] tracking-[0.4em] uppercase text-amber-600 mt-1">Needs Review</p>
            </div>
          )}
          <div className="text-center">
            <p className="font-serif text-2xl font-light text-zinc-100">
              {(totalRevenue / 1000).toFixed(0)}K
            </p>
            <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mt-1">PKR Revenue</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-0 border-b border-[#1a1a1a] overflow-x-auto">
          {STATUS_OPTIONS.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`pb-3.5 px-3 md:px-4 text-[8px] tracking-[0.3em] uppercase whitespace-nowrap transition-colors duration-300 flex-shrink-0 ${filter === s ? 'text-[#c9a054] border-b border-[#c9a054] -mb-px' : 'text-zinc-600 hover:text-zinc-400'}`}>
              {s === 'pending_verification' ? 'Pending' : s}
              {s === 'pending_verification' && pendingCount > 0 && (
                <span className="ml-1.5 text-[7px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>
        <button onClick={fetchOrders} disabled={loading}
          className="flex items-center gap-2 text-[8px] tracking-[0.3em] uppercase text-zinc-600 hover:text-zinc-400 transition-colors ml-4 shrink-0">
          <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Orders list */}
      <div className="border border-[#1a1a1a]">
        {loading ? (
          <div className="p-16 text-center">
            <div className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-4" />
            <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-700">Loading sovereign orders...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Package size={32} className="text-zinc-800 mx-auto mb-4" />
            <p className="font-serif text-xl font-light text-zinc-700">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-[#111]">
            {filtered.map(order => {
              const txHash = extractTxHash(order.notes)
              const isCrypto = ['usdt', 'usdc', 'okbond'].includes(order.payment_method?.toLowerCase())
              const isPkrPending = order.status === 'pending_verification'
              const pm = PAYMENT_METHODS[order.payment_method?.toLowerCase()] ?? { label: order.payment_method ?? 'Unknown', color: '#888' }
              const confirmMsg = actionMsg?.id === order.id ? actionMsg.msg : null

              return (
                <div key={order.id}
                  className={`p-5 md:p-6 hover:bg-[#080808] transition-colors ${isPkrPending ? 'border-l-2 border-amber-500/50' : ''}`}>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start">

                    {/* Order ID + Date */}
                    <div>
                      <p className="text-zinc-200 text-[10px] font-mono mb-1">#{order.id.slice(0,8).toUpperCase()}</p>
                      <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-600">
                        {new Date(order.created_at).toLocaleDateString('en-GB')}
                      </p>
                      <p className="text-[7px] text-zinc-700">
                        {new Date(order.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {/* Customer */}
                    <div>
                      <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-600 mb-1">Customer</p>
                      <p className="text-zinc-200 text-xs font-light">{order.shipping_address?.name || 'N/A'}</p>
                      <p className="text-zinc-600 text-[10px]">{order.shipping_address?.phone || ''}</p>
                      <p className="text-zinc-700 text-[10px]">{order.shipping_address?.city || ''}</p>
                    </div>

                    {/* Payment */}
                    <div>
                      <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-600 mb-1">Payment</p>
                      <p className="text-xs font-semibold" style={{ color: pm.color }}>{pm.label}</p>
                      <div className="mt-1">
                        <span className={`text-[7px] tracking-[0.2em] uppercase px-2 py-0.5 border ${
                          order.payment_status === 'paid' ? 'border-emerald-500/30 text-emerald-500'
                          : order.payment_status === 'awaiting_verification' ? 'border-amber-500/30 text-amber-500'
                          : order.payment_status === 'failed' ? 'border-red-500/30 text-red-500'
                          : 'border-zinc-800 text-zinc-600'
                        }`}>
                          {order.payment_status || 'pending'}
                        </span>
                      </div>
                      {/* Blockchain TX link */}
                      {txHash && (
                        <a href={`https://polygonscan.com/tx/${txHash}`} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 mt-2 text-[7px] tracking-[0.2em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors">
                          TX {txHash.slice(0,6)}... <ExternalLink size={8} />
                        </a>
                      )}
                    </div>

                    {/* Amount */}
                    <div>
                      <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-600 mb-1">Total</p>
                      <p className="text-zinc-100 text-sm font-light">PKR {order.total_pkr?.toLocaleString()}</p>
                      {order.total_usd && <p className="text-zinc-600 text-[10px]">${order.total_usd}</p>}
                      {order.discount_applied > 0 && (
                        <p className="text-[7px] text-[#c9a054] mt-1">{order.discount_applied}% off</p>
                      )}
                    </div>

                    {/* Status + proof */}
                    <div>
                      <span className={`text-[7px] tracking-[0.2em] uppercase px-2 py-1 border inline-block ${statusStyle(order.status)}`}>
                        {order.status?.replace('_', ' ')}
                      </span>
                      {order.payment_proof_url && (
                        <button onClick={() => setProofModal(order.payment_proof_url)}
                          className="flex items-center gap-1.5 mt-2 text-[#c9a054] hover:text-zinc-100 transition-colors">
                          <Eye size={11} />
                          <span className="text-[7px] tracking-[0.25em] uppercase">View Proof</span>
                        </button>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {confirmMsg ? (
                        <p className="text-emerald-400 text-[9px] tracking-[0.3em] uppercase">{confirmMsg}</p>
                      ) : isPkrPending ? (
                        <>
                          <button onClick={() => updateOrder(order.id, 'confirmed', 'paid')}
                            className="flex items-center gap-2 px-3 py-2 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors text-[8px] tracking-[0.25em] uppercase">
                            <Check size={10} /> Approve
                          </button>
                          <button onClick={() => updateOrder(order.id, 'cancelled', 'failed')}
                            className="flex items-center gap-2 px-3 py-2 border border-red-500/25 text-red-400/70 hover:bg-red-500/10 transition-colors text-[8px] tracking-[0.25em] uppercase">
                            <X size={10} /> Reject
                          </button>
                        </>
                      ) : (
                        order.status !== 'cancelled' && order.status !== 'delivered' && (
                          <select value={order.status} onChange={e => updateOrder(order.id, e.target.value)}
                            className="bg-transparent text-[8px] tracking-[0.2em] uppercase px-2 py-2 border border-[#1a1a1a] text-zinc-400 cursor-pointer outline-none hover:border-[#333] transition-colors">
                            <option value="confirmed" className="bg-[#0a0a0a]">Confirmed</option>
                            <option value="shipped" className="bg-[#0a0a0a]">Shipped</option>
                            <option value="delivered" className="bg-[#0a0a0a]">Delivered</option>
                            <option value="cancelled" className="bg-[#0a0a0a]">Cancelled</option>
                          </select>
                        )
                      )}
                    </div>
                  </div>

                  {/* Products */}
                  {order.order_items?.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#0d0d0d] flex flex-wrap gap-4">
                      {order.order_items.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-2">
                          {item.product?.images?.[0] && (
                            <img src={item.product.images[0]} alt="" className="w-9 h-9 object-cover" />
                          )}
                          <div>
                            <p className="text-zinc-400 text-[10px] font-light line-clamp-1">{item.product?.name ?? 'Product'}</p>
                            <p className="text-[7px] tracking-[0.25em] uppercase text-zinc-700">×{item.quantity} · PKR {item.price_pkr?.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Delivery address */}
                  {order.shipping_address && (
                    <div className="mt-3 pt-3 border-t border-[#0a0a0a]">
                      <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700">
                        Deliver to: {[order.shipping_address.line1, order.shipping_address.city, order.shipping_address.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Proof Modal */}
      {proofModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6" onClick={() => setProofModal(null)}>
          <div className="relative max-w-2xl w-full">
            <button onClick={() => setProofModal(null)} className="absolute -top-10 right-0 text-zinc-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <p className="text-center text-[8px] tracking-[0.4em] uppercase text-zinc-600 mb-4">Payment Proof Screenshot</p>
            <img src={proofModal} alt="Payment proof" className="w-full border border-[#1a1a1a]" />
          </div>
        </div>
      )}
    </div>
  )
}
