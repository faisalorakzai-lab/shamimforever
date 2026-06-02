'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Check, X, Eye, ExternalLink, RefreshCw, Package, MapPin, Plus, Truck } from 'lucide-react'

const STATUS_OPTIONS = [
    'all',
    'received',
    'payment_verification',
    'archive_authentication',
    'vault_preparation',
    'private_dispatch',
    'in_transit',
    'delivered',
    'archive_closed',
    'cancelled',
  ]

  const STATUS_DISPLAY: Record<string, string> = {
    received:               'Received',
    payment_verification:   'Payment Verification',
    archive_authentication: 'Archive Authentication',
    vault_preparation:      'Vault Preparation',
    private_dispatch:       'Private Dispatch',
    in_transit:             'In Transit',
    delivered:              'Delivered',
    archive_closed:         'Archive Closed',
    cancelled:              'Cancelled',
    // legacy statuses
    pending_verification:   'Pending Verification',
    confirmed:              'Confirmed',
    shipped:                'Shipped',
  }
const PAYMENT_METHODS: Record<string, { label: string; color: string }> = {
  usdt:       { label: 'USDT',     color: '#26a17b' },
  usdc:       { label: 'USDC',     color: '#2775ca' },
  okbond:     { label: 'OKBOND',   color: '#c9a054' },
  pkr_manual: { label: 'PKR Bank', color: '#888' },
  easypaisa:  { label: 'EasyPaisa',color: '#4caf50' },
  cod:        { label: 'COD',      color: '#9e9e9e' },
}
const TRACKING_STATUSES = [
  { value: 'order_placed',    label: 'Order Placed' },
  { value: 'confirmed',       label: 'Confirmed' },
  { value: 'processing',      label: 'Processing' },
  { value: 'dispatched',      label: 'Dispatched' },
  { value: 'in_transit',      label: 'In Transit' },
  { value: 'out_for_delivery',label: 'Out for Delivery' },
  { value: 'delivered',       label: 'Delivered' },
  { value: 'update',          label: 'General Update' },
]

interface TrackForm { status: string; title: string; description: string; location: string }

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [proofModal, setProofModal] = useState<string | null>(null)
  const [actionMsg, setActionMsg] = useState<{ id: string; msg: string } | null>(null)

  // Tracking state
  const [trackModal, setTrackModal] = useState<string | null>(null)
  const [trackForm, setTrackForm] = useState<TrackForm>({
    status: 'in_transit', title: '', description: '', location: ''
  })
  const [trackLoading, setTrackLoading] = useState(false)
  const [trackUpdates, setTrackUpdates] = useState<Record<string, any[]>>({})

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

  async function loadTrackingForOrder(orderId: string) {
    const { data } = await supabase
      .from('order_tracking')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false })
    setTrackUpdates(prev => ({ ...prev, [orderId]: data || [] }))
  }

  async function openTrackModal(orderId: string) {
    setTrackModal(orderId)
    setTrackForm({ status: 'in_transit', title: '', description: '', location: '' })
    await loadTrackingForOrder(orderId)
  }

  async function addTrackingUpdate() {
    if (!trackModal || !trackForm.title.trim()) return
    setTrackLoading(true)
    const { error } = await supabase.from('order_tracking').insert([{
      order_id: trackModal,
      status: trackForm.status,
      title: trackForm.title.trim(),
      description: trackForm.description.trim() || null,
      location: trackForm.location.trim() || null,
    }])
    if (!error) {
      await loadTrackingForOrder(trackModal)
      setTrackForm({ status: 'in_transit', title: '', description: '', location: '' })
    }
    setTrackLoading(false)
  }

  function extractTxHash(notes: string | null): string | null {
    if (!notes) return null
    return notes.match(/0x[a-fA-F0-9]{60,66}/)?.[0] ?? null
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const pendingCount = orders.filter(o => o.status === 'pending_verification').length
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total_pkr || 0), 0)

  const statusStyle = (s: string) => {
    const map: Record<string, string> = {
      confirmed:            'text-emerald-400 border-emerald-500/30',
      shipped:              'text-blue-400 border-blue-500/30',
      delivered:            'text-green-400 border-green-500/30',
      cancelled:            'text-red-400/70 border-red-500/25',
      pending_verification: 'text-amber-400 border-amber-500/40',
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
        <div className="flex gap-8">
          <div className="text-center">
            <p className="font-serif text-2xl font-light text-zinc-100">{orders.length}</p>
            <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mt-1">Total</p>
          </div>
          {pendingCount > 0 && (
            <div className="text-center">
              <p className="font-serif text-2xl font-light text-amber-400">{pendingCount}</p>
              <p className="text-[7px] tracking-[0.4em] uppercase text-amber-600 mt-1">Pending</p>
            </div>
          )}
          <div className="text-center">
            <p className="font-serif text-2xl font-light text-zinc-100">{(totalRevenue / 1000).toFixed(0)}K</p>
            <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mt-1">PKR</p>
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

      {/* Orders */}
      <div className="border border-[#1a1a1a]">
        {loading ? (
          <div className="p-16 text-center">
            <div className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-4" />
            <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-700">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Package size={32} className="text-zinc-800 mx-auto mb-4" />
            <p className="font-serif text-xl font-light text-zinc-700">No orders</p>
          </div>
        ) : (
          <div className="divide-y divide-[#111]">
            {filtered.map(order => {
              const txHash = extractTxHash(order.notes)
              const isPkrPending = order.status === 'pending_verification'
              const pm = PAYMENT_METHODS[order.payment_method?.toLowerCase()] ?? { label: order.payment_method ?? 'N/A', color: '#888' }
              const confirmMsg = actionMsg && actionMsg.id === order.id ? actionMsg.msg : null
              const updates = trackUpdates[order.id] ?? []

              return (
                <div key={order.id}
                  className={`p-5 md:p-6 hover:bg-[#080808] transition-colors ${isPkrPending ? 'border-l-2 border-amber-500/50' : ''}`}>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start">

                    {/* ID + Date */}
                    <div>
                      <p className="text-zinc-200 text-[10px] font-mono mb-1">#{order.id.slice(0,8).toUpperCase()}</p>
                      <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-600">
                        {new Date(order.created_at).toLocaleDateString('en-GB')}
                      </p>
                      <a href={`/track/${order.id}`} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 mt-1.5 text-[7px] tracking-[0.2em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors">
                        <ExternalLink size={8} /> Track page
                      </a>
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
                    </div>

                    {/* Status */}
                    <div>
                      <span className={`text-[7px] tracking-[0.2em] uppercase px-2 py-1 border inline-block ${statusStyle(order.status)}`}>
                        {order.status?.replace(/_/g, ' ')}
                      </span>
                      {order.payment_proof_url && (
                        <button onClick={() => setProofModal(order.payment_proof_url)}
                          className="flex items-center gap-1.5 mt-2 text-[#c9a054] hover:text-zinc-100 transition-colors">
                          <Eye size={11} />
                          <span className="text-[7px] tracking-[0.25em] uppercase">Proof</span>
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
                            className="flex items-center gap-1.5 px-3 py-2 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors text-[8px] tracking-[0.25em] uppercase">
                            <Check size={10} /> Approve
                          </button>
                          <button onClick={() => rejectOrder(order.id)}
                            className="flex items-center gap-1.5 px-3 py-2 border border-red-500/25 text-red-400/70 hover:bg-red-500/10 transition-colors text-[8px] tracking-[0.25em] uppercase">
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
                      {/* Tracking button */}
                      <button onClick={() => openTrackModal(order.id)}
                        className="flex items-center gap-1.5 px-3 py-2 border border-[#1a1a1a] text-zinc-500 hover:text-[#c9a054] hover:border-[#c9a054]/30 transition-colors text-[8px] tracking-[0.25em] uppercase">
                        <Truck size={10} />
                        {updates.length > 0 ? `Track (${updates.length})` : 'Add Tracking'}
                      </button>
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
                            <p className="text-zinc-400 text-[10px] font-light line-clamp-1">{item.product?.name}</p>
                            <p className="text-[7px] tracking-[0.25em] uppercase text-zinc-700">×{item.quantity} · PKR {item.price_pkr?.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {order.shipping_address && (
                    <div className="mt-2.5">
                      <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700">
                        {[order.shipping_address.line1, order.shipping_address.city, 'Pakistan'].filter(Boolean).join(', ')}
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
            <button onClick={() => setProofModal(null)} className="absolute -top-10 right-0 text-zinc-400 hover:text-white"><X size={20} /></button>
            <img src={proofModal} alt="Payment proof" className="w-full border border-[#1a1a1a]" />
          </div>
        </div>
      )}

      {/* Tracking Modal */}
      {trackModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setTrackModal(null)}>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] w-full max-w-xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
              <div>
                <p className="text-[7px] tracking-[0.4em] uppercase text-[#c9a054] mb-1">Order #{trackModal.slice(0,8).toUpperCase()}</p>
                <p className="text-zinc-200 text-sm">Add Tracking Update</p>
              </div>
              <button onClick={() => setTrackModal(null)} className="text-zinc-600 hover:text-zinc-200"><X size={16} /></button>
            </div>

            {/* Add update form */}
            <div className="p-6 space-y-4 border-b border-[#1a1a1a]">
              <div>
                <label className="block text-[7px] tracking-[0.35em] uppercase text-zinc-600 mb-2">Status</label>
                <select value={trackForm.status} onChange={e => setTrackForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full bg-[#111] border border-[#1a1a1a] text-zinc-300 text-xs px-3 py-2.5 outline-none focus:border-[#c9a054]/30 transition-colors">
                  {TRACKING_STATUSES.map(s => (
                    <option key={s.value} value={s.value} className="bg-[#111]">{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[7px] tracking-[0.35em] uppercase text-zinc-600 mb-2">Title *</label>
                <input value={trackForm.title} onChange={e => setTrackForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Order dispatched from Islamabad warehouse"
                  className="w-full bg-[#111] border border-[#1a1a1a] text-zinc-300 text-xs px-3 py-2.5 outline-none focus:border-[#c9a054]/30 transition-colors placeholder:text-zinc-700" />
              </div>
              <div>
                <label className="block text-[7px] tracking-[0.35em] uppercase text-zinc-600 mb-2">Description</label>
                <input value={trackForm.description} onChange={e => setTrackForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Additional details (optional)"
                  className="w-full bg-[#111] border border-[#1a1a1a] text-zinc-300 text-xs px-3 py-2.5 outline-none focus:border-[#c9a054]/30 transition-colors placeholder:text-zinc-700" />
              </div>
              <div>
                <label className="block text-[7px] tracking-[0.35em] uppercase text-zinc-600 mb-2">Location</label>
                <input value={trackForm.location} onChange={e => setTrackForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="e.g. Islamabad Hub, Karachi Sorting Center"
                  className="w-full bg-[#111] border border-[#1a1a1a] text-zinc-300 text-xs px-3 py-2.5 outline-none focus:border-[#c9a054]/30 transition-colors placeholder:text-zinc-700" />
              </div>
              <button onClick={addTrackingUpdate} disabled={trackLoading || !trackForm.title.trim()}
                className="w-full py-3 flex items-center justify-center gap-2 border border-[#c9a054]/40 text-[8px] tracking-[0.4em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all disabled:opacity-50">
                <Plus size={11} />
                {trackLoading ? 'Adding...' : 'Add Update'}
              </button>
            </div>

            {/* Existing updates */}
            <div className="p-6">
              <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-4">
                Timeline ({(trackUpdates[trackModal] || []).length} updates)
              </p>
              {(trackUpdates[trackModal] || []).length === 0 ? (
                <p className="text-zinc-700 text-xs text-center py-4">No updates yet</p>
              ) : (
                <div className="space-y-3">
                  {(trackUpdates[trackModal] || []).map(u => (
                    <div key={u.id} className="flex gap-3 p-3 border border-[#111] bg-[#080808]">
                      <MapPin size={11} className="text-[#c9a054] mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-zinc-300 text-xs font-light">{u.title}</p>
                          <p className="text-[7px] text-zinc-700 shrink-0">
                            {new Date(u.created_at).toLocaleDateString('en-GB')}
                          </p>
                        </div>
                        {u.location && <p className="text-[7px] tracking-[0.2em] uppercase text-zinc-700 mt-0.5">{u.location}</p>}
                        {u.description && <p className="text-zinc-600 text-[10px] mt-1">{u.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )

  function rejectOrder(id: string) { updateOrder(id, 'cancelled', 'failed') }
}
