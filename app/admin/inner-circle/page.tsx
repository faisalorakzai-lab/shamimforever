'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Check, X, Mail, User, Clock } from 'lucide-react'

const STATUS_OPTIONS = ['all', 'pending', 'approved', 'rejected']

interface Application {
  id: string
  name: string
  email: string
  city: string
  tier: string
  message: string
  status: string
  created_at: string
}

export default function AdminInnerCirclePage() {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [creating, setCreating] = useState<string | null>(null)
  const [tempPass, setTempPass] = useState<{ id: string; pass: string } | null>(null)

  useEffect(() => { fetchApps() }, [])

  async function fetchApps() {
    const { data } = await supabase
      .from('inner_circle_applications')
      .select('*')
      .order('created_at', { ascending: false })
    setApps(data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('inner_circle_applications').update({ status }).eq('id', id)
    setApps(apps.map(a => a.id === id ? { ...a, status } : a))
  }

  async function createMemberAccount(app: Application) {
    setCreating(app.id)
    try {
      // Generate temp password
      const pass = 'SF' + Math.random().toString(36).slice(2, 8).toUpperCase() + Math.floor(Math.random() * 900 + 100)
      
      const res = await fetch('/api/admin/create-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: app.email, password: pass, name: app.name, tier: app.tier }),
      })
      
      if (res.ok) {
        await updateStatus(app.id, 'approved')
        setTempPass({ id: app.id, pass })
      } else {
        const d = await res.json()
        alert('Error: ' + (d.error || 'Failed to create account'))
      }
    } catch (err) {
      alert('Network error creating account')
    }
    setCreating(null)
  }

  const tierColor: Record<string, string> = {
    confidant: 'text-zinc-400',
    sovereign: 'text-[#c9a054]',
    patron: 'text-zinc-300',
  }

  const statusColor: Record<string, string> = {
    pending: 'text-amber-500 border-amber-500/30',
    approved: 'text-emerald-500 border-emerald-500/30',
    rejected: 'text-red-500/60 border-red-500/20',
  }

  const filtered = filter === 'all' ? apps : apps.filter(a => a.status === filter)
  const pendingCount = apps.filter(a => a.status === 'pending').length

  return (
    <div className="p-6 md:p-10">
      <div className="mb-10 pb-8 border-b border-[#1a1a1a] flex items-end justify-between">
        <div>
          <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-3">Membership Registry</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-[0.2em] uppercase text-zinc-100">Inner Circle</h1>
        </div>
        <div className="text-right">
          <p className="font-serif text-3xl font-light text-zinc-100">{apps.length}</p>
          <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Applications</p>
          {pendingCount > 0 && <p className="text-[8px] tracking-[0.4em] uppercase text-amber-500 mt-1">{pendingCount} Pending</p>}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1 mb-8 border-b border-[#1a1a1a] overflow-x-auto">
        {STATUS_OPTIONS.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`pb-4 px-3 text-[9px] tracking-[0.3em] uppercase whitespace-nowrap transition-colors duration-300 ${filter === s ? 'text-[#c9a054] border-b border-[#c9a054] -mb-px' : 'text-zinc-600 hover:text-zinc-400'}`}>
            {s} {s === 'pending' && pendingCount > 0 && <span className="text-amber-500 ml-1">{pendingCount}</span>}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="p-12 text-center"><p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700">Loading applications...</p></div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center border border-[#1a1a1a]">
          <p className="font-serif text-2xl font-light text-zinc-700">No applications</p>
        </div>
      ) : (
        <div className="divide-y divide-[#1a1a1a] border border-[#1a1a1a]">
          {filtered.map(app => (
            <motion.div key={app.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`p-5 md:p-6 hover:bg-[#0a0a0a] transition-colors ${app.status === 'pending' ? 'border-l-2 border-amber-500/50' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-serif text-lg text-zinc-200">{app.name}</span>
                    <span className={`text-[7px] tracking-[0.4em] uppercase border px-2 py-0.5 ${tierColor[app.tier] || 'text-zinc-500'} border-current/30`}>
                      {app.tier}
                    </span>
                    <span className={`text-[7px] tracking-[0.4em] uppercase border px-2 py-0.5 ${statusColor[app.status] || 'text-zinc-600 border-zinc-600/30'}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Mail size={10} className="text-zinc-700 flex-shrink-0" />
                      <span className="font-mono text-[10px] text-zinc-500">{app.email}</span>
                    </div>
                    {app.city && (
                      <div className="flex items-center gap-2">
                        <User size={10} className="text-zinc-700" />
                        <span className="text-[10px] text-zinc-600">{app.city}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock size={10} className="text-zinc-700" />
                      <span className="text-[10px] text-zinc-700">{new Date(app.created_at).toLocaleDateString('en-GB')}</span>
                    </div>
                  </div>
                  {app.message && (
                    <p className="text-zinc-600 text-xs font-light leading-relaxed border-l border-[#1a1a1a] pl-3 max-w-lg">{app.message}</p>
                  )}

                  {/* Show temp password if just created */}
                  {tempPass?.id === app.id && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      className="mt-4 border border-[#c9a054]/20 p-4 bg-[#080808]">
                      <p className="text-[7px] tracking-[0.5em] uppercase text-[#c9a054] mb-2">Account Created — Send These Credentials</p>
                      <div className="space-y-1 font-mono text-xs">
                        <p className="text-zinc-400">Email: <span className="text-zinc-200">{app.email}</span></p>
                        <p className="text-zinc-400">Password: <span className="text-zinc-200 bg-[#c9a054]/10 px-2 py-0.5">{tempPass.pass}</span></p>
                      </div>
                      <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-700 mt-3">Copy and send to member. They can change it at /auth</p>
                    </motion.div>
                  )}
                </div>

                {app.status === 'pending' && (
                  <div className="flex gap-2 flex-wrap flex-shrink-0">
                    <button onClick={() => createMemberAccount(app)} disabled={creating === app.id}
                      className="flex items-center gap-2 px-4 py-2 border border-[#c9a054]/50 text-[8px] tracking-[0.35em] uppercase text-[#c9a054] hover:bg-[#c9a054]/5 transition-colors disabled:opacity-40">
                      <Check size={10} />
                      {creating === app.id ? 'Creating…' : 'Approve + Create Account'}
                    </button>
                    <button onClick={() => updateStatus(app.id, 'rejected')}
                      className="flex items-center gap-2 px-4 py-2 border border-[#1a1a1a] text-[8px] tracking-[0.35em] uppercase text-zinc-600 hover:text-red-500/60 hover:border-red-500/20 transition-colors">
                      <X size={10} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
