'use client'
  import { useState, useEffect } from 'react'
  import { motion } from 'framer-motion'
  import Link from 'next/link'
  import { supabase } from '@/lib/supabase'

  const SERIF = "'Cormorant Garamond', Georgia, serif"

  const DELIVERY_STAGES = [
    { key: 'received',               label: 'Received' },
    { key: 'payment_verification',   label: 'Payment Verification' },
    { key: 'archive_authentication', label: 'Archive Authentication' },
    { key: 'vault_preparation',      label: 'Vault Preparation' },
    { key: 'private_dispatch',       label: 'Private Dispatch' },
    { key: 'in_transit',             label: 'In Transit' },
    { key: 'delivered',              label: 'Delivered' },
    { key: 'archive_closed',         label: 'Archive Closed' },
  ]

  const LEGACY_MAP: Record<string,string> = {
    pending_verification: 'received',
    confirmed: 'payment_verification',
    processing: 'archive_authentication',
    dispatched: 'private_dispatch',
    shipped: 'in_transit',
    out_for_delivery: 'in_transit',
    Completed: 'archive_closed',
  }

  function normalizeStatus(s: string): string {
    return LEGACY_MAP[s] || s
  }

  function getStageIndex(status: string): number {
    const normalized = normalizeStatus(status)
    return DELIVERY_STAGES.findIndex(s => s.key === normalized)
  }

  export default function CustomerDashboard() {
    const [orderRef, setOrderRef] = useState('')
    const [order, setOrder] = useState<any>(null)
    const [tracking, setTracking] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [searched, setSearched] = useState(false)

    async function lookupOrder() {
      if (!orderRef.trim()) return
      setLoading(true)
      setNotFound(false)
      setOrder(null)
      setTracking([])
      setSearched(true)

      const { data } = await supabase
        .from('orders')
        .select('*, order_items(id, quantity, product:products(name, images, slug))')
        .or(`order_ref.ilike.${orderRef.trim()}%,consumer_number.ilike.${orderRef.trim()}%,id.ilike.${orderRef.trim()}%`)
        .maybeSingle()

      if (!data) { setNotFound(true); setLoading(false); return }
      setOrder(data)

      const { data: trackData } = await supabase
        .from('order_tracking')
        .select('*')
        .eq('order_id', data.id)
        .order('created_at', { ascending: true })
      setTracking(trackData || [])
      setLoading(false)
    }

    const stageIdx = order ? getStageIndex(order.status) : -1

    return (
      <div className="min-h-screen bg-[#050505] pt-24 pb-20">
        <div className="max-w-[920px] mx-auto px-5 md:px-12">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="mb-16">
            <p className="text-[9px] tracking-[0.55em] uppercase text-[#c9a054] mb-4">◆ Collector Portal</p>
            <h1 className="font-serif font-light tracking-[0.1em] text-zinc-100 mb-3" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
              My Archive
            </h1>
            <div className="w-10 h-px bg-[#c9a054]/40 mb-4" />
            <p className="text-zinc-500 text-sm tracking-wide font-light">
              Enter your Order Reference, Collector ID, or Order ID to access your sovereign acquisition records.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1.2 }} className="mb-12">
            <div className="flex gap-0">
              <input
                value={orderRef}
                onChange={e => setOrderRef(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && lookupOrder()}
                placeholder="SF-2026-000001 · COLLECTOR-XXXXXX · Order ID"
                className="flex-1 bg-[#0a0a0a] border border-[#1a1a1a] border-r-0 px-5 py-4 text-zinc-300 text-sm font-light tracking-wide outline-none focus:border-[#c9a054]/40 transition-colors placeholder:text-zinc-700"
              />
              <button
                onClick={lookupOrder}
                disabled={loading}
                className="px-8 py-4 bg-[#c9a054] text-[#050505] text-[8px] tracking-[0.4em] uppercase font-medium hover:bg-[#e5ba6e] transition-colors disabled:opacity-50"
              >
                {loading ? '…' : 'Access'}
              </button>
            </div>
          </motion.div>

          {/* Not Found */}
          {searched && notFound && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-[#1a1a1a] p-8 text-center mb-8">
              <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Record Not Found</p>
              <p className="text-zinc-700 text-xs font-light">No acquisition record matches this reference. Please verify your Order Reference or Collector ID.</p>
            </motion.div>
          )}

          {/* Order Found */}
          {order && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>

              {/* Order IDs Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#0d0d0d] mb-8">
                {[
                  { label: 'Order Reference', value: order.order_ref || order.id?.substring(0,12) },
                  { label: 'Collector ID', value: order.consumer_number || '—' },
                  { label: 'Archive Registry', value: order.archive_ref || `ARCHIVE-I-${order.id?.substring(0,4).toUpperCase()}` },
                ].map(item => (
                  <div key={item.label} className="bg-[#050505] p-6 border border-[#0d0d0d]">
                    <p className="text-[7px] tracking-[0.45em] uppercase text-[#c9a054] mb-2">{item.label}</p>
                    <p className="font-mono text-zinc-300 text-sm font-light tracking-wider">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Delivery Timeline */}
              <div className="border border-[#0d0d0d] p-8 mb-8">
                <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-600 mb-8">◆ Private Delivery Status</p>
                <div className="space-y-0">
                  {DELIVERY_STAGES.map((stage, i) => {
                    const isActive = i === stageIdx
                    const isCompleted = i < stageIdx
                    const isPending = i > stageIdx
                    return (
                      <div key={stage.key} className="flex items-start gap-5">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`w-3 h-3 rounded-full border flex-shrink-0 ${isCompleted ? 'bg-[#c9a054] border-[#c9a054]' : isActive ? 'border-[#c9a054] bg-transparent' : 'border-[#1a1a1a] bg-transparent'}`}
                            style={isActive ? { boxShadow: '0 0 8px rgba(201,160,84,0.5)' } : {}}
                          />
                          {i < DELIVERY_STAGES.length - 1 && (
                            <div className={`w-px flex-1 ${isCompleted ? 'bg-[#c9a054]/40' : 'bg-[#1a1a1a]'}`} style={{ minHeight: 32 }} />
                          )}
                        </div>
                        <div className="pb-6">
                          <p className={`text-[9px] tracking-[0.35em] uppercase mb-1 ${isCompleted ? 'text-[#c9a054]' : isActive ? 'text-zinc-200' : 'text-zinc-700'}`}>
                            {stage.label}
                            {isActive && <span className="ml-2 text-[7px] text-[#c9a054] opacity-70">● Current</span>}
                            {isCompleted && <span className="ml-2 text-[7px] text-[#c9a054] opacity-50">✓</span>}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Order Items */}
              {order.order_items?.length > 0 && (
                <div className="border border-[#0d0d0d] p-6 mb-8">
                  <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-600 mb-6">◆ Acquisition Items</p>
                  <div className="space-y-4">
                    {order.order_items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4">
                        {item.product?.images?.[0] && (
                          <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-cover flex-shrink-0" style={{ filter: 'brightness(0.85)' }} />
                        )}
                        <div className="flex-1">
                          <p className="text-zinc-300 text-sm font-serif font-light">{item.product?.name || 'Sovereign Creation'}</p>
                          <p className="text-zinc-600 text-xs mt-1">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Digital Passport / NFT Section */}
              <div className="border border-[#c9a054]/15 p-6 mb-8 bg-[#c9a054]/02">
                <p className="text-[8px] tracking-[0.45em] uppercase text-[#c9a054] mb-4">◆ Digital Passport</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Blockchain', value: 'Polygon' },
                    { label: 'Standard', value: 'ERC-721' },
                    { label: 'Storage', value: 'IPFS' },
                    { label: 'NFT Status', value: order.status === 'delivered' || order.status === 'archive_closed' ? 'Eligible for Mint' : 'Pending Delivery' },
                  ].map(item => (
                    <div key={item.label}>
                      <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-1">{item.label}</p>
                      <p className="text-zinc-400 text-xs tracking-wider">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking History */}
              {tracking.length > 0 && (
                <div className="border border-[#0d0d0d] p-6">
                  <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-600 mb-6">◆ Archive History</p>
                  <div className="space-y-4">
                    {tracking.map(t => (
                      <div key={t.id} className="flex gap-4">
                        <div className="w-1 h-1 rounded-full bg-[#c9a054]/50 mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-zinc-400 text-xs font-light tracking-wide">{t.title}</p>
                          {t.description && <p className="text-zinc-600 text-xs mt-0.5 font-light">{t.description}</p>}
                          {t.location && <p className="text-zinc-700 text-xs mt-0.5">📍 {t.location}</p>}
                          <p className="text-zinc-700 text-[10px] mt-1">{new Date(t.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Links */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} className="mt-16 flex flex-wrap gap-6 items-center">
            <Link href="/shop" className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 hover:text-[#c9a054] transition-colors">Browse Collection</Link>
            <Link href="/authenticate" className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 hover:text-[#c9a054] transition-colors">Authenticate</Link>
            <Link href="/concierge" className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 hover:text-[#c9a054] transition-colors">Concierge</Link>
          </motion.div>

        </div>
      </div>
    )
  }
  