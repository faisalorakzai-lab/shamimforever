'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { TrendingUp, Package, ShoppingBag, Users } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: products },
        { count: orders },
        { count: customers },
        { data: orderData },
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('id, total_pkr, status, created_at').order('created_at', { ascending: false }).limit(5),
      ])

      const revenue = (orderData || []).reduce((sum: number, o: any) => sum + (o.total_pkr || 0), 0)

      setStats({
        products: products || 0,
        orders: orders || 0,
        customers: customers || 0,
        revenue,
      })
      setRecentOrders(orderData || [])
      setLoading(false)
    }
    fetchStats()
  }, [])

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: Package, change: '+12%' },
    { label: 'Total Orders', value: stats.orders, icon: ShoppingBag, change: '+8%' },
    { label: 'Customers', value: stats.customers, icon: Users, change: '+24%' },
    { label: 'Revenue (PKR)', value: `${stats.revenue.toLocaleString()}`, icon: TrendingUp, change: '+18%' },
  ]

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-[#1a1a1a]">
        <p className="luxury-meta mb-3">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="font-serif text-4xl font-light tracking-[0.2em] uppercase text-zinc-100">
          Sovereign Overview
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a] mb-12">
        {statCards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-[#0a0a0a] p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <Icon size={16} strokeWidth={1} className="text-[#c9a054]" />
                <span className="luxury-meta text-[#c9a054]">{card.change}</span>
              </div>
              <p className="font-serif text-3xl font-light text-zinc-100 mb-2">
                {loading ? '—' : card.value}
              </p>
              <p className="luxury-meta">{card.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border border-[#1a1a1a] bg-[#050505]">
            <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between">
              <h2 className="font-serif text-lg font-light tracking-[0.2em] uppercase text-zinc-100">
                Recent Orders
              </h2>
              <a href="/admin/orders" className="luxury-meta text-[#c9a054] hover:text-zinc-100 transition-colors">
                View All →
              </a>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {loading ? (
                <div className="p-8 text-center">
                  <p className="luxury-meta">Loading orders...</p>
                </div>
              ) : recentOrders.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="luxury-meta text-zinc-700">No orders yet</p>
                </div>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="p-6 flex items-center justify-between hover:bg-[#0a0a0a] transition-colors">
                    <div>
                      <p className="text-zinc-300 text-xs font-light mb-1 font-mono">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="luxury-meta">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-200 text-sm font-light mb-1">
                        PKR {order.total_pkr?.toLocaleString()}
                      </p>
                      <span className={`text-[8px] tracking-[0.3em] uppercase px-2 py-1 ${
                        order.status === 'delivered'
                          ? 'text-emerald-500 bg-emerald-500/10'
                          : order.status === 'pending'
                          ? 'text-amber-500 bg-amber-500/10'
                          : 'text-zinc-400 bg-[#1a1a1a]'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border border-[#1a1a1a] bg-[#050505]">
          <div className="p-6 border-b border-[#1a1a1a]">
            <h2 className="font-serif text-lg font-light tracking-[0.2em] uppercase text-zinc-100">
              Quick Actions
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: 'Add New Product', href: '/admin/products' },
              { label: 'View Orders', href: '/admin/orders' },
              { label: 'Customer List', href: '/admin/customers' },
              { label: 'View Live Store', href: '/' },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="block luxury-btn text-[9px] py-3 w-full text-center"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
