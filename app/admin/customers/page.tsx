'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Search } from 'lucide-react'

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchCustomers() {
      const { data } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      setCustomers(data || [])
      setLoading(false)
    }
    fetchCustomers()
  }, [])

  const filtered = customers.filter(c =>
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.full_name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-10">
      <div className="mb-12 pb-8 border-b border-[#1a1a1a] flex items-end justify-between">
        <div>
          <p className="luxury-meta mb-3">Sovereign Clientele</p>
          <h1 className="font-serif text-4xl font-light tracking-[0.2em] uppercase text-zinc-100">Customers</h1>
        </div>
        <p className="luxury-meta">{customers.length} Members</p>
      </div>

      {/* Search */}
      <div className="mb-8 relative max-w-md">
        <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clientele..."
          className="luxury-input pl-6"
        />
      </div>

      <div className="border border-[#1a1a1a] bg-[#050505]">
        <div className="grid grid-cols-[1fr,auto,auto,auto] text-[9px] tracking-[0.3em] uppercase text-zinc-600 px-6 py-4 border-b border-[#1a1a1a] gap-4">
          <span>Member</span>
          <span>Tier</span>
          <span>Orders</span>
          <span>Joined</span>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <p className="luxury-meta">Loading clientele...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-serif text-2xl font-light text-zinc-700">
              {search ? 'No matches found' : 'No members yet'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#1a1a1a]">
            {filtered.map((customer) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-[1fr,auto,auto,auto] px-6 py-5 gap-4 items-center hover:bg-[#0a0a0a] transition-colors"
              >
                <div>
                  <p className="text-zinc-200 text-xs font-light mb-1">
                    {customer.full_name || customer.email?.split('@')[0]}
                  </p>
                  <p className="luxury-meta">{customer.email}</p>
                </div>
                <span className={`text-[8px] tracking-[0.2em] uppercase px-2 py-1 ${
                  customer.membership_tier === 'Eternal'
                    ? 'text-[#c9a054] bg-[#c9a054]/10'
                    : customer.membership_tier === 'Imperial'
                    ? 'text-zinc-300 bg-[#1a1a1a]'
                    : 'text-zinc-600 bg-[#111111]'
                }`}>
                  {customer.membership_tier || 'Standard'}
                </span>
                <span className="text-zinc-400 text-xs font-light text-right">
                  {customer.order_count || 0}
                </span>
                <span className="luxury-meta text-right">
                  {new Date(customer.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
