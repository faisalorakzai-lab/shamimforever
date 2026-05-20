'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Check, X, Eye } from 'lucide-react'

const STATUS_OPTIONS = ['all', 'pending_verification', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [proofModal, setProofModal] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*, product:products(name, images))')
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string, paymentStatus?: string) {
    const update: any = { status }
    if (paymentStatus) update.payment_status = paymentStatus
    await supabase.from('orders').update(update).eq('id', id)
    setOrders(orders.map(o => o.id === id ? { ...o, ...update } : o))
  }

  async function approveOrder(id: string) {
    await updateStatus(id, 'confirmed', 'paid')
  }

  async function rejectOrder(id: string) {
    await updateStatus(id, 'cancelled', 'failed')
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const pendingCount = orders.filter(o => o.status === 'pending_verification').length

  return (
    <div className="p-10">
      <div className="mb-12 pb-8 border-b border-[#1a1a1a] flex items-end justify-between">
        <div>
          <p className="luxury-meta mb-3">Sovereign Logistics</p>
          <h1 className="font-serif text-4xl font-light tracking-[0.2em] uppercase text-zinc-100">Orders</h1>
        </div>
        <div className="text-right">
          <p className="font-serif text-3xl font-light text-zinc-100">{filtered.length}</p>
          <p className="luxury-meta">Total</p>
          {pendingCount > 0 && (
            <p className="luxury-meta text-amber-500 mt-1">{pendingCount} Awaiting Verification</p>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1 mb-8 border-b border-[#1a1a1a] overflow-x-auto">
        {STATUS_OPTIONS.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`pb-4 px-3 text-[9px] tracking-[0.3em] uppercase whitespace-nowrap transition-colors duration-300 flex-shrink-0 ${
              filter === s
                ? 'text-[#c9a054] border-b border-[#c9a054] -mb-px'
                : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            {s === 'pending_verification' ? 'Pending Verification' : s}
            {s === 'pending_verification' && pendingCount > 0 && (
              <span className="ml-2 text-amber-500">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      <div className="border border-[#1a1a1a] bg-[#050505]">
        {loading ? (
          <div className="p-12 text-center">
            <p className="luxury-meta">Loading orders...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-serif text-2xl font-light text-zinc-700">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1a1a1a]">
            {filtered.map(order => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-6 hover:bg-[#0a0a0a] transition-colors ${order.status === 'pending_verification' ? 'border-l-2 border-amber-500/50' : ''}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
                  {/* Order ID + Date */}
                  <div>
                    <p className="text-zinc-300 text-xs font-mono mb-1">#{order.id.slice(0, 8).toUpperCase()}</p>
                    <p className="luxury-meta">{new Date(order.created_at).toLocaleDateString()}</p>
                    <p className="luxury-meta text-zinc-700">{new Date(order.created_at).toLocaleTimeString()}</p>
                  </div>

                  {/* Customer */}
                  <div>
                    <p className="luxury-meta mb-1">Customer</p>
                    <p className="text-zinc-300 text-xs font-light">{order.shipping_address?.name || 'N/A'}</p>
                    <p className="text-zinc-600 text-xs">{order.shipping_address?.phone || ''}</p>
                    <p className="text-zinc-600 text-xs">{order.shipping_address?.city || ''}</p>
                  </div>

                  {/* Payment */}
                  <div>
                    <p className="luxury-meta mb-1">Payment</p>
                    <p className="text-zinc-300 text-xs uppercase tracking-wider font-light mb-1">
                      {order.payment_method || 'N/A'}
                    </p>
                    <span className={`text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 ${
                      order.payment_status === 'paid'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : order.payment_status === 'awaiting_verification'
                        ? 'bg-amber-500/10 text-amber-500'
                        : order.payment_status === 'failed'
                        ? 'bg-red-500/10 text-red-500'
                        : 'bg-[#1a1a1a] text-zinc-500'
                    }`}>
                      {order.payment_status || 'pending'}
                    </span>
                  </div>

                  {/* Amount + Discount */}
                  <div>
                    <p className="luxury-meta mb-1">Total</p>
                    <p className="text-zinc-200 text-sm font-light">PKR {order.total_pkr?.toLocaleString()}</p>
                    {order.discount_applied > 0 && (
                      <p className="luxury-meta text-[#c9a054] mt-1">{order.discount_applied}% discount</p>
                    )}
                  </div>

                  {/* Proof / Tx */}
                  <div>
                    {order.notes && (
                      <div>
                        <p className="luxury-meta mb-1">Reference</p>
                        <p className="text-zinc-500 text-xs font-mono break-all">{order.notes}</p>
                      </div>
                    )}
                    {order.payment_proof_url && (
                      <button
                        onClick={() => setProofModal(order.payment_proof_url)}
                        className="flex items-center gap-2 text-[#c9a054] hover:text-zinc-100 transition-colors mt-2"
                      >
                        <Eye size={12} />
                        <span className="text-[9px] tracking-[0.3em] uppercase">View Proof</span>
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {order.status === 'pending_verification' && (
                      <>
                        <button
                          onClick={() => approveOrder(order.id)}
                          className="flex items-center gap-2 px-3 py-2 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 transition-colors text-[9px] tracking-[0.2em] uppercase"
                        >
                          <Check size={11} />
                          Approve
                        </button>
                        <button
                          onClick={() => rejectOrder(order.id)}
                          className="flex items-center gap-2 px-3 py-2 border border-red-500/30 text-red-500/70 hover:bg-red-500/10 transition-colors text-[9px] tracking-[0.2em] uppercase"
                        >
                          <X size={11} />
                          Reject
                        </button>
                      </>
                    )}
                    {order.status !== 'pending_verification' && (
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className={`bg-transparent text-[8px] tracking-[0.2em] uppercase px-2 py-1.5 border cursor-pointer outline-none ${
                          order.status === 'delivered' ? 'border-emerald-500/30 text-emerald-500'
                          : order.status === 'cancelled' ? 'border-red-500/30 text-red-500'
                          : order.status === 'shipped' ? 'border-blue-500/30 text-blue-400'
                          : 'border-[#1a1a1a] text-zinc-400'
                        }`}
                      >
                        {['confirmed', 'shipped', 'delivered', 'cancelled'].map(s => (
                          <option key={s} value={s} className="bg-[#0a0a0a] text-zinc-300">{s}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {/* Order items */}
                {order.order_items?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#111111] flex flex-wrap gap-3">
                    {order.order_items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-3">
                        {item.product?.images?.[0] && (
                          <img src={item.product.images[0]} alt="" className="w-10 h-10 object-cover" />
                        )}
                        <div>
                          <p className="text-zinc-400 text-xs">{item.product?.name}</p>
                          <p className="luxury-meta">×{item.quantity} · PKR {item.price_pkr?.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Proof Modal */}
      {proofModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8"
          onClick={() => setProofModal(null)}
        >
          <div className="relative max-w-2xl w-full">
            <button
              onClick={() => setProofModal(null)}
              className="absolute -top-10 right-0 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <img src={proofModal} alt="Payment proof" className="w-full" />
          </div>
        </div>
      )}
    </div>
  )
}
