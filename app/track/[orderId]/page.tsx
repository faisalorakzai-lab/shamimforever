'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ShieldCheck } from 'lucide-react'

const STATUS_ICONS: Record<string, React.ElementType> = {
  order_placed:    Package,
  confirmed:       CheckCircle,
  processing:      Clock,
  dispatched:      Truck,
  in_transit:      Truck,
  out_for_delivery: Truck,
  delivered:       CheckCircle,
  update:          MapPin,
}

const STATUS_COLORS: Record<string, string> = {
  order_placed:    '#888',
  confirmed:       '#c9a054',
  processing:      '#c9a054',
  dispatched:      '#60a5fa',
  in_transit:      '#60a5fa',
  out_for_delivery: '#a78bfa',
  delivered:       '#34d399',
  update:          '#888',
}

interface TrackingUpdate {
  id: string
  status: string
  title: string
  description: string | null
  location: string | null
  created_at: string
}

interface OrderData {
  id: string
  status: string
  payment_method: string
  payment_status: string
  total_pkr: number
  created_at: string
  shipping_address: {
    name?: string
    city?: string
    line1?: string
  }
  order_items: {
    id: string
    quantity: number
    product: { name: string; images: string[] }
  }[]
}

export default function TrackOrderPage({ params }: { params: { orderId: string } }) {
  const [searchId, setSearchId] = useState(params.orderId === 'lookup' ? '' : params.orderId)
  const [order, setOrder] = useState<OrderData | null>(null)
  const [tracking, setTracking] = useState<TrackingUpdate[]>([])
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (params.orderId && params.orderId !== 'lookup') {
      fetchOrder(params.orderId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.orderId])

  async function fetchOrder(id: string) {
    setLoading(true)
    setNotFound(false)
    setOrder(null)
    setTracking([])

    // Try full UUID first, then partial prefix search
    const { data: orderData } = await supabase
      .from('orders')
      .select('*, order_items(id, quantity, product:products(name, images))')
      .or(`id.eq.${id},id.ilike.${id}%`)
      .maybeSingle()

    if (!orderData) { setNotFound(true); setLoading(false); return }
    setOrder(orderData)

    // Fetch tracking updates
    const { data: trackingData } = await supabase
      .from('order_tracking')
      .select('*')
      .eq('order_id', orderData.id)
      .order('created_at', { ascending: true })
    setTracking(trackingData || [])
    setLoading(false)
  }

  function handleSearch() {
    if (searchId.trim()) {
      fetchOrder(searchId.trim())
      window.history.replaceState(null, '', `/track/${searchId.trim()}`)
    }
  }

  const orderStatus = order?.status ?? ''
  const isDelivered = ['delivered', 'archive_closed'].includes(orderStatus)
  const orderStatusLabel = STATUS_LABELS[orderStatus] || orderStatus.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <div className="min-h-screen bg-[#050505] pt-20">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054] mb-4">House of Shamim Forever</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-[0.15em] uppercase text-zinc-100 mb-4">Track Order</h1>
          <p className="text-[9px] tracking-[0.35em] uppercase text-zinc-600">Enter your order ID to see live status</p>
        </div>

        {/* Search */}
        <div className="flex gap-0 mb-16 border border-[#1a1a1a]">
          <input
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Order ID (e.g. A1B2C3D4 or full UUID)"
            className="flex-1 bg-transparent px-5 py-4 text-[11px] text-zinc-300 placeholder:text-zinc-700 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-6 bg-[#c9a054]/10 border-l border-[#1a1a1a] text-[8px] tracking-[0.35em] uppercase text-[#c9a054] hover:bg-[#c9a054]/20 transition-all"
          >
            <Search size={13} />
            Track
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-px h-12 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-6" />
            <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-700">Locating your sovereign order...</p>
          </div>
        )}

        {/* Not found */}
        {notFound && !loading && (
          <div className="text-center py-16 border border-[#1a1a1a]">
            <p className="font-serif text-3xl font-light text-zinc-700 mb-3">Order Not Found</p>
            <p className="text-[8px] tracking-[0.35em] uppercase text-zinc-700">Please check your order ID and try again</p>
          </div>
        )}

        {/* Order found */}
        {order && !loading && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="space-y-8">

            {/* Order summary */}
            <div className="border border-[#1a1a1a] p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 mb-5 border-b border-[#111]">
                <div>
                  <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-1">Order ID</p>
                  <p className="text-zinc-200 font-mono text-sm">#{order.id.toUpperCase().slice(0, 8)}</p>
                </div>
                <div>
                  <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-1">Placed On</p>
                  <p className="text-zinc-400 text-xs">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-1">Total</p>
                  <p className="text-zinc-200 text-sm">PKR {order.total_pkr?.toLocaleString()}</p>
                </div>
                <div>
                  <span className={`text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 border ${
                    isDelivered ? 'border-emerald-500/30 text-emerald-400'
                    : orderStatus === 'shipped' ? 'border-blue-500/30 text-blue-400'
                    : orderStatus === 'confirmed' ? 'border-[#c9a054]/30 text-[#c9a054]'
                    : orderStatus === 'cancelled' ? 'border-red-500/25 text-red-400'
                    : 'border-zinc-800 text-zinc-500'
                  }`}>
                    {orderStatus?.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Products */}
              {order.order_items?.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {order.order_items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      {item.product?.images?.[0] && (
                        <img src={item.product.images[0]} alt="" className="w-12 h-12 object-cover" />
                      )}
                      <div>
                        <p className="text-zinc-300 text-xs font-light">{item.product?.name}</p>
                        <p className="text-[7px] tracking-[0.25em] uppercase text-zinc-700">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Delivery address */}
              {order.shipping_address?.name && (
                <div className="mt-4 pt-4 border-t border-[#0d0d0d]">
                  <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-700">
                    Delivering to: {order.shipping_address.name}
                    {order.shipping_address.city ? ` · ${order.shipping_address.city}` : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Tracking timeline */}
            <div>
              <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-600 mb-6">Shipment Timeline</p>

              {tracking.length === 0 ? (
                <div className="border border-[#1a1a1a] p-10 text-center">
                  <Package size={28} className="text-zinc-800 mx-auto mb-3" />
                  <p className="text-zinc-600 text-sm font-light">
                    {orderStatus === 'confirmed' ? 'Your order is confirmed and being prepared.' : 'Tracking updates will appear here once dispatched.'}
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-5 top-0 bottom-0 w-px bg-[#1a1a1a]" />

                  <div className="space-y-0">
                    {tracking.map((update, i) => {
                      const Icon = STATUS_ICONS[update.status] ?? MapPin
                      const color = STATUS_COLORS[update.status] ?? '#888'
                      const isLast = i === tracking.length - 1
                      return (
                        <motion.div key={update.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.08 }} className="flex gap-6 pb-8 relative">
                          {/* Icon dot */}
                          <div className="relative z-10 w-10 h-10 shrink-0 flex items-center justify-center"
                            style={{ background: '#050505', border: `1px solid ${isLast ? color : '#1a1a1a'}` }}>
                            <Icon size={14} style={{ color: isLast ? color : '#444' }} />
                          </div>
                          {/* Content */}
                          <div className="flex-1 pt-1.5">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-1">
                              <p className={`text-sm font-light ${isLast ? 'text-zinc-100' : 'text-zinc-500'}`}>
                                {update.title}
                              </p>
                              <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700">
                                {new Date(update.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            {update.description && (
                              <p className="text-zinc-600 text-xs leading-relaxed">{update.description}</p>
                            )}
                            {update.location && (
                              <div className="flex items-center gap-1.5 mt-1">
                                <MapPin size={9} className="text-zinc-700" />
                                <p className="text-[8px] tracking-[0.2em] uppercase text-zinc-700">{update.location}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Current status label */}
                  {isDelivered && (
                    <div className="mt-4 p-4 border border-emerald-500/20 bg-emerald-500/5 text-center">
                      <p className="text-[8px] tracking-[0.45em] uppercase text-emerald-400">Order Delivered — Enjoy your Sovereign Creation</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Help */}
            <div className="text-center pt-4 border-t border-[#0d0d0d]">
              <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-700">
                For assistance, contact us via WhatsApp: 03367970004
              </p>
              <Link href="/shop" className="inline-block mt-4 text-[8px] tracking-[0.35em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors">
                Continue Shopping →
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
