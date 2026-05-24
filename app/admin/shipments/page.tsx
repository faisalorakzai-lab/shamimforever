'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const STATUS_OPTIONS = [
  { value: 'vault_prepared', label: 'Vault Prepared' },
  { value: 'identity_verified', label: 'Identity Verified' },
  { value: 'route_secured', label: 'Route Secured' },
  { value: 'chauffeur_assigned', label: 'Chauffeur Assigned' },
  { value: 'transit_active', label: 'Transit Active' },
  { value: 'arrival_confirmed', label: 'Arrival Confirmed' },
]

interface Shipment {
  id: string
  tracking_id: string
  customer_name: string
  customer_email: string
  status: string
  current_location: string
  destination: string
  chauffeur_name: string
  vehicle: string
  eta: string
  is_active: boolean
  created_at: string
  notes: string
}

const EMPTY_FORM = {
  tracking_id: '',
  customer_name: '',
  customer_email: '',
  status: 'vault_prepared',
  current_location: 'Karachi Sovereign Vault',
  destination: '',
  chauffeur_name: '',
  vehicle: 'Mercedes S-Class (Armoured)',
  eta: '',
  notes: '',
}

export default function AdminShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Shipment | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function fetchShipments() {
    setLoading(true)
    const { data } = await supabase.from('shipments').select('*').order('created_at', { ascending: false })
    setShipments((data ?? []) as Shipment[])
    setLoading(false)
  }

  useEffect(() => { fetchShipments() }, [])

  function startEdit(s: Shipment) {
    setEditing(s)
    setCreating(false)
    setForm({
      tracking_id: s.tracking_id,
      customer_name: s.customer_name ?? '',
      customer_email: s.customer_email ?? '',
      status: s.status,
      current_location: s.current_location ?? '',
      destination: s.destination ?? '',
      chauffeur_name: s.chauffeur_name ?? '',
      vehicle: s.vehicle ?? '',
      eta: s.eta ? s.eta.slice(0, 16) : '',
      notes: s.notes ?? '',
    })
  }

  function startCreate() {
    setEditing(null)
    setCreating(true)
    const id = `SF-TRK-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`
    setForm({ ...EMPTY_FORM, tracking_id: id })
  }

  async function handleSave() {
    setSaving(true)
    setMsg('')
    const payload = { ...form, eta: form.eta ? new Date(form.eta).toISOString() : null }

    if (creating) {
      const { error } = await supabase.from('shipments').insert([payload])
      if (error) { setMsg('Error: ' + error.message) } else { setMsg('Shipment created.'); setCreating(false); fetchShipments() }
    } else if (editing) {
      const { error } = await supabase.from('shipments').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editing.id)
      if (error) { setMsg('Error: ' + error.message) } else { setMsg('Shipment updated.'); setEditing(null); fetchShipments() }
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this shipment?')) return
    await supabase.from('shipments').delete().eq('id', id)
    fetchShipments()
  }

  const statusColor = (s: string) => {
    if (s === 'arrival_confirmed') return 'text-emerald-500 bg-emerald-500/10'
    if (s === 'transit_active') return 'text-[#c9a054] bg-[#c9a054]/10'
    return 'text-zinc-400 bg-[#1a1a1a]'
  }

  return (
    <div className="p-10">
      <div className="mb-10 pb-8 border-b border-[#1a1a1a] flex items-center justify-between">
        <div>
          <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-2">Sovereign Logistics</p>
          <h1 className="font-serif text-3xl font-light tracking-[0.15em] uppercase text-zinc-100">Shipments</h1>
        </div>
        <button onClick={startCreate} className="group relative inline-flex items-center justify-center px-6 py-3 border border-[#c9a054]/60 text-[8px] tracking-[0.4em] uppercase text-[#c9a054] overflow-hidden">
          <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">+ New Shipment</span>
        </button>
      </div>

      {msg && <p className="mb-6 text-[9px] tracking-[0.3em] uppercase text-[#c9a054] border border-[#c9a054]/20 px-4 py-3">{msg}</p>}

      {(creating || editing) && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border border-[#1a1a1a] bg-[#080808] p-8 mb-10">
          <h2 className="font-serif text-lg font-light tracking-[0.15em] uppercase text-zinc-300 mb-6">
            {creating ? 'New Shipment' : `Edit: ${editing?.tracking_id}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: 'tracking_id', label: 'Tracking ID', type: 'text', readOnly: true },
              { key: 'customer_name', label: 'Customer Name', type: 'text' },
              { key: 'customer_email', label: 'Customer Email', type: 'email' },
              { key: 'current_location', label: 'Current Location', type: 'text' },
              { key: 'destination', label: 'Destination', type: 'text' },
              { key: 'chauffeur_name', label: 'Chauffeur Name', type: 'text' },
              { key: 'vehicle', label: 'Vehicle', type: 'text' },
              { key: 'eta', label: 'ETA', type: 'datetime-local' },
            ].map(f => (
              <div key={f.key} className="border-b border-[#111] focus-within:border-[#c9a054]/30 transition-colors duration-300">
                <label className="block pt-3 pb-1 text-[7px] tracking-[0.4em] uppercase text-zinc-700">{f.label}</label>
                <input
                  type={f.type}
                  value={(form as Record<string, string>)[f.key] ?? ''}
                  readOnly={f.readOnly}
                  onChange={e => !f.readOnly && setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full pb-3 bg-transparent text-zinc-300 text-sm font-light outline-none"
                />
              </div>
            ))}
            <div className="border-b border-[#111] md:col-span-2">
              <label className="block pt-3 pb-1 text-[7px] tracking-[0.4em] uppercase text-zinc-700">Status</label>
              <select
                value={form.status}
                onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                className="w-full pb-3 bg-transparent text-zinc-300 text-sm font-light outline-none"
              >
                {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-[#0a0a0a]">{o.label}</option>)}
              </select>
            </div>
            <div className="border-b border-[#111] md:col-span-2">
              <label className="block pt-3 pb-1 text-[7px] tracking-[0.4em] uppercase text-zinc-700">Notes</label>
              <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2} className="w-full pb-3 bg-transparent text-zinc-300 text-sm font-light outline-none resize-none" />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={handleSave} disabled={saving} className="group relative inline-flex items-center justify-center px-8 py-3 border border-[#c9a054]/60 text-[8px] tracking-[0.4em] uppercase text-[#c9a054] overflow-hidden disabled:opacity-50">
              <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">{saving ? 'Saving…' : 'Save Shipment'}</span>
            </button>
            <button onClick={() => { setEditing(null); setCreating(false) }} className="text-[8px] tracking-[0.3em] uppercase text-zinc-600 border border-[#111] px-6 py-3">Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="border border-[#1a1a1a] bg-[#050505]">
        <div className="divide-y divide-[#111]">
          {loading ? (
            <div className="p-10 text-center"><p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Loading shipments…</p></div>
          ) : shipments.length === 0 ? (
            <div className="p-10 text-center"><p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">No shipments yet</p></div>
          ) : shipments.map(s => (
            <div key={s.id} className="p-6 flex items-center justify-between gap-6 hover:bg-[#080808] transition-colors group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-1">
                  <p className="font-mono text-zinc-300 text-xs">{s.tracking_id}</p>
                  <span className={`text-[7px] tracking-[0.3em] uppercase px-2 py-0.5 ${statusColor(s.status)}`}>
                    {STATUS_OPTIONS.find(o => o.value === s.status)?.label ?? s.status}
                  </span>
                </div>
                <p className="text-zinc-600 text-xs font-light">{s.customer_name} — {s.current_location} → {s.destination}</p>
                {s.chauffeur_name && <p className="text-zinc-700 text-[9px] mt-0.5">Chauffeur: {s.chauffeur_name} · {s.vehicle}</p>}
              </div>
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(s)} className="text-[8px] tracking-[0.3em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-3 py-1.5 hover:bg-[#c9a054]/5 transition-colors">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="text-[8px] tracking-[0.3em] uppercase text-red-800 border border-red-900/30 px-3 py-1.5 hover:bg-red-900/5 transition-colors">Del</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
