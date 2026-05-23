'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const ease = [0.16, 1, 0.3, 1] as const

const BOUTIQUE_OPTIONS = [
  { id: 'hq', city: 'Karachi — Global HQ', location: 'Shamim Sky Tower, Federal B Area', flag: '🇵🇰' },
  { id: 'khi-tariq', city: 'Karachi — Tariq Road', location: 'Dolmen Mall Tariq Road', flag: '🇵🇰' },
  { id: 'khi-clifton', city: 'Karachi — Clifton', location: 'Dolmen Mall Clifton', flag: '🇵🇰' },
  { id: 'lahore', city: 'Lahore — DHA Phase 6', location: 'Main Boulevard, DHA', flag: '🇵🇰' },
  { id: 'islamabad', city: 'Islamabad — DHA Phase II', location: 'Giga Mall', flag: '🇵🇰' },
  { id: 'peshawar', city: 'Peshawar — Ring Road', location: 'HBK Hyper Market', flag: '🇵🇰' },
  { id: 'dubai', city: 'Dubai', location: 'The Dubai Mall, Fashion Avenue', flag: '🇦🇪' },
  { id: 'riyadh', city: 'Riyadh', location: 'VIA Riyadh Luxury District', flag: '🇸🇦' },
  { id: 'london', city: 'London — Mayfair', location: '158-160 New Bond Street', flag: '🇬🇧' },
  { id: 'paris', city: 'Paris', location: '12 Place Vendôme', flag: '🇫🇷' },
  { id: 'nyc', city: 'New York', location: '712 Fifth Avenue', flag: '🇺🇸' },
]

const SERVICE_TYPES = [
  { id: 'fragrance', label: 'Private Fragrance Consultation', icon: '◈' },
  { id: 'jewelry', label: 'Jewelry & Bridal Atelier Session', icon: '◆' },
  { id: 'bespoke', label: 'Bespoke Commission Request', icon: '◇' },
  { id: 'cosmetics', label: 'Beauty & Cosmetics Consultation', icon: '○' },
  { id: 'vip', label: 'Full VIP Styling Session', icon: '◉' },
]

const CONTACT_CHANNELS = [
  {
    icon: '◈', label: 'WhatsApp Concierge', value: '+92 311 9447572', sub: 'VIP Clients & Private Appointments',
    href: 'https://wa.me/923119447572', cta: 'Message Now', accent: true,
  },
  {
    icon: '◇', label: 'Founder Direct', value: '+92 336 7970004', sub: 'Founding House Direct Line',
    href: 'tel:+923367970004', cta: 'Call', accent: false,
  },
]

const EMAILS = [
  { addr: 'concierge@shamimforever.com', label: 'VIP Concierge', desc: 'Private appointment bookings · Global boutique reservations', icon: '◈' },
  { addr: 'bespoke@shamimforever.com', label: 'Bespoke Commissions', desc: 'Custom fragrance blending · Custom jewelry · Couture sherwanis', icon: '◆' },
  { addr: 'maisons@shamimforever.com', label: 'Boutique Operations', desc: 'Global store management · Retail & inventory operations', icon: '◇' },
  { addr: 'relations@shamimforever.com', label: 'Client Relations', desc: 'Orders, tracking, and premium customer support', icon: '○' },
  { addr: 'media@shamimforever.com', label: 'Press & Media', desc: 'Fashion shows · Editorial collaborations · Celebrity PR', icon: '◉' },
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ConciergePage() {
  const [selectedBoutique, setSelectedBoutique] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', notes: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !selectedBoutique || !selectedService) return
    setFormState('submitting')

    supabase
      .from('concierge_bookings')
      .insert([{
        name: form.name, email: form.email, phone: form.phone,
        preferred_date: form.date || null, notes: form.notes,
        boutique: selectedBoutique, service_type: selectedService,
      }])
      .then(({ error }) => {
        if (error) setFormState('error')
        else setFormState('success')
      })
  }

  const boutique = BOUTIQUE_OPTIONS.find(b => b.id === selectedBoutique)
  const service = SERVICE_TYPES.find(s => s.id === selectedService)

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="pt-20 border-b border-[#0d0d0d]">
        <div className="relative overflow-hidden" style={{ minHeight: '44vw', maxHeight: '500px' }}>
          <img src="/founder-4.png" alt="Private Concierge"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.22) contrast(1.2) saturate(0.7)' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/98 via-[#050505]/75 to-[#050505]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col justify-end h-full px-5 md:px-12 lg:px-20 py-12 md:py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }}>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5">Private Access · By Appointment</p>
              <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-5">
                Concierge
              </h1>
              <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-sm">
                Sovereign consultation across 11 global addresses. WhatsApp, phone, 
                or private appointment — access the House directly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── QUICK CONTACT CHANNELS ─── */}
      <section className="border-b border-[#0d0d0d]">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#0d0d0d]">
          {CONTACT_CHANNELS.map((ch, i) => (
            <motion.a key={ch.label} href={ch.href} target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="group flex items-center gap-5 md:gap-7 px-5 md:px-10 lg:px-14 py-8 md:py-10 hover:bg-[#080808] transition-colors duration-500">
              <span className={`text-2xl ${ch.accent ? 'text-[#c9a054]' : 'text-zinc-700'}`}>{ch.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[7px] tracking-[0.45em] uppercase text-zinc-700 mb-1">{ch.label}</p>
                <p className={`font-serif font-light text-xl md:text-2xl tracking-[0.06em] mb-1 ${ch.accent ? 'text-[#c9a054]' : 'text-zinc-300'} group-hover:text-zinc-100 transition-colors duration-500`}>
                  {ch.value}
                </p>
                <p className="text-zinc-700 text-xs font-light">{ch.sub}</p>
              </div>
              <span className={`text-[8px] tracking-[0.4em] uppercase ${ch.accent ? 'text-[#c9a054]' : 'text-zinc-700'} group-hover:text-[#c9a054] transition-colors duration-400 flex-shrink-0`}>
                {ch.cta} →
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ─── EMAIL DIRECTORY ─── */}
      <section className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}
          className="mb-8 md:mb-10">
          <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Sovereign Communications</p>
          <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.05em] text-zinc-200">Email Directory</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0a0a0a]">
          {EMAILS.map((em, i) => (
            <motion.a key={em.addr} href={`mailto:${em.addr}`}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: i * 0.07 }}
              className="group bg-[#050505] px-5 md:px-7 py-6 md:py-8 hover:bg-[#080808] transition-colors duration-500">
              <span className="text-lg text-[#c9a054] block mb-4">{em.icon}</span>
              <p className="text-[7px] tracking-[0.45em] uppercase text-zinc-700 mb-1.5">{em.label}</p>
              <p className="font-serif font-light text-base md:text-lg tracking-[0.04em] text-zinc-300 group-hover:text-[#c9a054] transition-colors duration-500 mb-2 break-all">
                {em.addr}
              </p>
              <p className="text-zinc-700 text-xs font-light leading-relaxed">{em.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ─── APPOINTMENT BOOKING FORM ─── */}
      <section className="px-5 md:px-12 lg:px-20 py-14 md:py-24">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}
            className="mb-10 md:mb-14">
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-4">Private Appointment</p>
            <h2 className="font-serif font-light text-3xl md:text-5xl tracking-[0.05em] text-zinc-100">
              Book a Sovereign<br />
              <span className="italic text-zinc-500">Consultation</span>
            </h2>
            <p className="text-zinc-600 text-sm font-light mt-5 leading-relaxed">
              Select your preferred location and service. Our concierge responds within 4 hours.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease }}
                className="border border-[#c9a054]/20 px-8 py-14 text-center">
                <div className="w-px h-14 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-8" />
                <p className="text-[9px] tracking-[0.55em] uppercase text-[#c9a054] mb-5">Appointment Confirmed</p>
                <h3 className="font-serif font-light text-3xl tracking-[0.08em] text-zinc-200 mb-5">
                  {form.name.split(' ')[0]}, we await you.
                </h3>
                <p className="text-zinc-600 text-sm font-light leading-relaxed mb-3 max-w-xs mx-auto">
                  Your private consultation at <span className="text-[#c9a054]">{boutique?.city}</span> has been received.
                </p>
                <p className="text-zinc-700 text-xs font-light">
                  Our concierge will contact you at <span className="text-zinc-500">{form.email}</span> within 4 hours.
                </p>
                <div className="flex items-center justify-center gap-4 mt-10">
                  <div className="w-8 h-px bg-[#c9a054]/30" />
                  <a href="https://wa.me/923119447572" target="_blank" rel="noopener noreferrer"
                    className="text-[8px] tracking-[0.45em] uppercase text-[#c9a054] hover:opacity-70 transition-opacity">
                    WhatsApp Concierge →
                  </a>
                  <div className="w-8 h-px bg-[#c9a054]/30" />
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                {/* Step 1: Boutique */}
                <div className="mb-8 md:mb-10">
                  <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-700 mb-4">01 — Select Location</p>
                  <div className="grid grid-cols-1 gap-px bg-[#0a0a0a]">
                    {BOUTIQUE_OPTIONS.map(b => (
                      <button key={b.id} type="button" onClick={() => setSelectedBoutique(b.id)}
                        className={`flex items-center gap-4 px-5 py-4 text-left bg-[#050505] hover:bg-[#080808] transition-all duration-400 ${selectedBoutique === b.id ? 'border-l-2 border-l-[#c9a054]' : ''}`}>
                        <span className="text-sm flex-shrink-0">{b.flag}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-light tracking-[0.08em] ${selectedBoutique === b.id ? 'text-[#c9a054]' : 'text-zinc-400'}`}>{b.city}</p>
                          <p className="text-[10px] text-zinc-700 font-light">{b.location}</p>
                        </div>
                        {selectedBoutique === b.id && <span className="text-[#c9a054] text-xs flex-shrink-0">◈</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Service */}
                <div className="mb-8 md:mb-10">
                  <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-700 mb-4">02 — Consultation Type</p>
                  <div className="grid grid-cols-1 gap-2">
                    {SERVICE_TYPES.map(s => (
                      <button key={s.id} type="button" onClick={() => setSelectedService(s.id)}
                        className={`flex items-center gap-4 px-5 py-4 text-left border transition-all duration-400 ${
                          selectedService === s.id ? 'border-[#c9a054]/40 bg-[#080808] text-[#c9a054]' : 'border-[#0d0d0d] text-zinc-600 hover:text-zinc-300'
                        }`}>
                        <span className={`text-base ${selectedService === s.id ? 'text-[#c9a054]' : 'text-zinc-800'}`}>{s.icon}</span>
                        <span className="text-xs font-light tracking-[0.06em]">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Details */}
                <div className="mb-8">
                  <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-700 mb-5">03 — Your Details</p>
                  <div className="space-y-0">
                    {[
                      { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Your name' },
                      { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your@email.com' },
                      { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', required: false, placeholder: '+92 3XX XXXXXXX' },
                      { name: 'date', label: 'Preferred Date', type: 'date', required: false, placeholder: '' },
                    ].map(f => (
                      <div key={f.name} className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
                        <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">
                          {f.label} {f.required && <span className="text-[#c9a054]">*</span>}
                        </label>
                        <input type={f.type} name={f.name} required={f.required} value={(form as any)[f.name]}
                          onChange={handleChange} placeholder={f.placeholder}
                          className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light placeholder:text-zinc-800 outline-none" />
                      </div>
                    ))}
                    <div className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
                      <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">
                        Special Requests or Notes
                      </label>
                      <textarea name="notes" rows={3} value={form.notes} onChange={handleChange}
                        placeholder="Any preferences, occasion, or special requirements..."
                        className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light placeholder:text-zinc-800 outline-none resize-none" />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                {selectedBoutique && selectedService && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
                    className="border border-[#c9a054]/15 px-5 py-4 mb-8 bg-[#080808]">
                    <p className="text-[7px] tracking-[0.45em] uppercase text-zinc-700 mb-3">Booking Summary</p>
                    <p className="text-xs text-zinc-400 font-light">{boutique?.flag} {boutique?.city} — {boutique?.location}</p>
                    <p className="text-xs text-[#c9a054] font-light mt-1">{service?.icon} {service?.label}</p>
                  </motion.div>
                )}

                {formState === 'error' && (
                  <p className="text-red-500/70 text-xs font-light mb-5">Something went wrong. Please try WhatsApp instead.</p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button type="submit" disabled={formState === 'submitting' || !selectedBoutique || !selectedService}
                    className="group relative inline-flex items-center justify-center px-10 py-5 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed">
                    <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 group-disabled:translate-y-full transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                    <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                      {formState === 'submitting' ? 'Confirming...' : 'Request Appointment'}
                    </span>
                  </button>
                  <a href="https://wa.me/923119447572" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-[9px] tracking-[0.45em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500">
                    Or WhatsApp Us →
                  </a>
                </div>
                <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-800 mt-5">Concierge responds within 4 hours · All appointments are private</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
