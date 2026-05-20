'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const STATUS_OPTIONS = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

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

  async function updateStatus(id: string, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o))
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div className="p-10">
      <div className="mb-12 pb-8 border-b border-[#1a1a1a] flex items-end justify-between">
        <div>
          <p className="luxury-meta mb-3">Sovereign Logistics</p>
          <h1 className="font-serif text-4xl font-light tracking-[0.2em] uppercase text-zinc-100">Orders</h1>
        </div>
        <p className="luxury-meta">{filtered.length} Total</p>
      </div>

      {/* Filter */}
      <div className="flex gap-1 mb-8 border-b border-[#1a1a1a]">
        {['all', ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`pb-4 px-3 text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 ${
              filter === s
                ? 'text-[#c9a054] border-b border-[#c9a054] -mb-px'
                : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            {s}
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
            {filtered.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 hover:bg-[#0a0a0a] transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-zinc-300 text-xs font-mono mb-1">#{order.id.slice(0, 8).toUpperCase()}</p>
                    <p className="luxury-meta">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="luxury-meta mb-1">Customer</p>
                    <p className="text-zinc-400 text-xs font-light">
                      {order.shipping_address?.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="luxury-meta mb-1">Payment</p>
                    <p className="text-zinc-400 text-xs font-light uppercase tracking-wider">
                      {order.payment_method || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="luxury-meta mb-1">Total</p>
                    <p className="text-zinc-200 text-sm font-light">PKR {order.total_pkr?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="luxury-meta mb-2">Status</p>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`bg-transparent text-[8px] tracking-[0.2em] uppercase px-2 py-1.5 border cursor-pointer outline-none ${
                        order.status === 'delivered'
                          ? 'border-emerald-500/30 text-emerald-500'
                          : order.status === 'pending'
                          ? 'border-amber-500/30 text-amber-500'
                          : order.status === 'cancelled'
                          ? 'border-red-500/30 text-red-500'
                          : 'border-[#1a1a1a] text-zinc-400'
                      }`}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s} className="bg-[#0a0a0a] text-zinc-300">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {order.order_items && order.order_items.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#111111] flex flex-wrap gap-3">
                    {order.order_items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-2">
                        {item.product?.images?.[0] && (
                          <img src={item.product.images[0]} alt="" className="w-8 h-8 object-cover" />
                        )}
                        <div>
                          <p className="text-zinc-400 text-xs">{item.product?.name}</p>
                          <p className="luxury-meta">×{item.quantity}</p>
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
    </div>
  )
}
