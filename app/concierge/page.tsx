'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { CONCIERGE_FAQS } from './content'

const ease = [0.16, 1, 0.3, 1] as const

const BOUTIQUE_OPTIONS = [
    { id: 'hq', city: 'Paris La Défense — Global Headquarters', location: 'Verified headquarters · France', flag: '🇫🇷' },
    { id: 'karachi', city: 'Karachi — Client Experience / Future Boutique', location: 'Future exploration · No address announced', flag: '🇵🇰' },
    { id: 'lahore', city: 'Lahore — Future Boutique', location: 'Future exploration · No address announced', flag: '🇵🇰' },
    { id: 'islamabad', city: 'Islamabad — Future Boutique', location: 'Future exploration · No address announced', flag: '🇵🇰' },
    { id: 'peshawar', city: 'Peshawar — Future Boutique', location: 'Future exploration · No address announced', flag: '🇵🇰' },
    { id: 'dubai', city: 'Dubai — Future International Location', location: 'Future exploration · No address announced', flag: '🇦🇪' },
    { id: 'riyadh', city: 'Riyadh — Future International Location', location: 'Future exploration · No address announced', flag: '🇸🇦' },
    { id: 'virtual', city: 'Virtual Consultation', location: 'Digital access', flag: '◌' },
    { id: 'other', city: 'Other / International Inquiry', location: 'Concierge review', flag: '◇' },
    ]

    const SERVICE_TYPES = [
    { id: 'private-appointment', label: 'Private Appointment', icon: '◈' },
    { id: 'collection-inquiry', label: 'Collection Inquiry', icon: '◆' },
    { id: 'bespoke-commission', label: 'Bespoke Commission', icon: '◇' },
    { id: 'product-assistance', label: 'Product Assistance', icon: '○' },
    { id: 'client-relations', label: 'Client Relations', icon: '◉' },
    { id: 'authentication-inquiry', label: 'Authentication Inquiry', icon: '◎' },
    { id: 'media-inquiry', label: 'Media Inquiry', icon: '✦' },
    { id: 'other', label: 'Other', icon: '◇' },
    ]

    const CONTACT_CHANNELS = [
    { icon: '◈', label: 'WhatsApp Concierge', value: '+92 311 9447572', sub: 'Private client inquiries and appointment coordination.', href: 'https://wa.me/923119447572', cta: 'Message Now', accent: true },
    { icon: '◇', label: "Founder's Office", value: '+92 336 7970004', sub: 'Selected business, partnership, and strategic inquiries.', href: 'tel:+923367970004', cta: 'Call', accent: false },
    ]

    const EMAILS = [
    { addr: 'concierge@shamimforever.com', label: 'VIP Concierge', desc: 'Private appointments, boutique reservations, client assistance, and collection guidance.', icon: '◈' },
    { addr: 'bespoke@shamimforever.com', label: 'Bespoke Commissions', desc: 'Custom fragrance concepts, personalized jewellery, bespoke gifts, and special commissions.', icon: '◆' },
    { addr: 'maisons@shamimforever.com', label: 'Boutique Operations', desc: 'Boutique inquiries, store operations, retail coordination, and inventory-related communication.', icon: '◇' },
    { addr: 'relations@shamimforever.com', label: 'Client Relations', desc: 'Order assistance, delivery inquiries, customer support, and selected after-sales guidance.', icon: '○' },
    { addr: 'media@shamimforever.com', label: 'Press & Media', desc: 'Press inquiries, editorial opportunities, brand features, and media collaborations.', icon: '◉' },
    ]

    type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ConciergePage() {
  const [selectedBoutique, setSelectedBoutique] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', language: '', date: '', notes: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.country || !selectedBoutique || !selectedService) return
    setFormState('submitting')

    supabase
      .from('concierge_bookings')
      .insert([{
        name: form.name, email: form.email, phone: form.phone,
        preferred_date: form.date || null, notes: 'Country / Region: ' + form.country + '\nPreferred Language: ' + (form.language || 'Not specified') + '\n' + form.notes,
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
              <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-5">Private Luxury<br /><span className="italic text-zinc-500">Concierge</span></h1>
              <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-sm">Private access to Shamim Forever. Our Concierge provides a considered point of contact for bespoke services, client assistance, collection inquiries, and direct access to the House.</p>
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
              Select your preferred location and service. The House reviews each request and coordinates the appropriate next step.
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
                  Our concierge will contact you at <span className="text-zinc-500">{form.email}</span> according to its nature, complexity, and location.
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
                      { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', required: true, placeholder: '+92 3XX XXXXXXX' },
                       { name: 'country', label: 'Country / Region', type: 'text', required: true, placeholder: 'Country or region' },
                       { name: 'language', label: 'Preferred Language', type: 'text', required: false, placeholder: 'English, Urdu, or other' },
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
                      {formState === 'submitting' ? 'Confirming...' : 'Request Private Access'}
                    </span>
                  </button>
                  <a href="https://wa.me/923119447572" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-[9px] tracking-[0.45em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-500">
                    Or WhatsApp Us →
                  </a>
                </div>
                <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-800 mt-5">Response timing varies by request · All appointments are private</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>


        <section className="border-b border-[#0d0d0d] bg-[#080808] px-5 py-16 md:px-12 md:py-24 lg:px-20" aria-labelledby="global-access"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">A Global House</p><h2 id="global-access" className="font-serif text-4xl font-light text-zinc-100 md:text-6xl">Wherever you are.</h2><p className="mt-6 text-sm leading-8 text-zinc-500">Shamim Forever serves clients through a developing international network of boutiques, private consultations, and digital experiences. Our Concierge helps direct each request to the appropriate House service.</p></div><div className="grid gap-3 sm:grid-cols-2">{['Boutique appointments', 'Private consultations', 'Collection inquiries', 'Bespoke requests', 'Client relations', 'Product assistance', 'Authentication support', 'International inquiries'].map((item, index) => <div key={item} className="border border-[#1a1a1a] p-5"><span className="font-serif text-2xl text-[#c9a054]/70">0{index + 1}</span><p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-zinc-400">{item}</p></div>)}</div></div></section>

        <section className="border-b border-[#0d0d0d] px-5 py-16 md:px-12 md:py-24 lg:px-20" aria-labelledby="bespoke"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Bespoke</p><h2 id="bespoke" className="font-serif text-4xl font-light text-zinc-100 md:text-6xl">Created beyond the ordinary.</h2></div><div><p className="text-sm leading-8 text-zinc-500">Some requests require something beyond a standard collection. Shamim Forever&apos;s bespoke service is designed for clients seeking personalization, custom development, private commissions, or specialized client services.</p><div className="mt-9 grid gap-3 sm:grid-cols-2">{['Personalization', 'Custom development', 'Private commissions', 'Specialized client services'].map(item => <div key={item} className="border border-[#1a1a1a] p-5 text-[10px] uppercase tracking-[0.25em] text-zinc-400">{item}</div>)}</div><p className="mt-7 text-xs leading-6 text-zinc-700">Every bespoke request is individually reviewed. Submission does not guarantee acceptance or availability.</p></div></div></section>

        <section className="border-b border-[#0d0d0d] px-5 py-16 md:px-12 md:py-24 lg:px-20" aria-labelledby="client-relations"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-2"><div><p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Client Care</p><h2 id="client-relations" className="font-serif text-4xl font-light text-zinc-100 md:text-6xl">A relationship beyond the purchase.</h2><p className="mt-6 text-sm leading-8 text-zinc-500">Luxury extends beyond the moment of acquisition. Client Relations assists with selected post-purchase and support inquiries.</p></div><div className="grid gap-3 sm:grid-cols-2">{['Order inquiries', 'Delivery support', 'Product information', 'Client communication', 'Boutique assistance', 'Selected after-sales guidance'].map(item => <div key={item} className="border-t border-[#c9a054]/25 pt-4 text-[10px] uppercase tracking-[0.25em] text-zinc-400">{item}</div>)}</div></div></section>

        <section className="border-b border-[#0d0d0d] bg-[#080808] px-5 py-16 md:px-12 md:py-24 lg:px-20" aria-labelledby="authenticity"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Authentication & Provenance</p><h2 id="authenticity" className="font-serif text-4xl font-light text-zinc-100 md:text-6xl">Confidence in every detail.</h2></div><div><p className="text-sm leading-8 text-zinc-500">Shamim Forever is exploring emerging technologies that may support product authentication, digital identity, and provenance. Where applicable, the House may introduce systems designed to improve transparency around selected products and client experiences.</p><div className="mt-9 grid gap-3 sm:grid-cols-2">{['Digital product identity', 'Authentication systems', 'Product provenance', 'Digital ownership records', 'Secure client experiences'].map(item => <div key={item} className="border border-[#1a1a1a] p-5 text-[10px] uppercase tracking-[0.22em] text-zinc-400">{item}</div>)}</div><p className="mt-7 text-xs leading-6 text-zinc-700">No blockchain, NFT, or AI security claim is made unless an applicable system is officially available.</p></div></div></section>

        <section className="border-b border-[#0d0d0d] px-5 py-16 md:px-12 md:py-24 lg:px-20" aria-labelledby="international"><div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-2"><div><p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">International Access</p><h2 id="international" className="font-serif text-4xl font-light text-zinc-100 md:text-6xl">Wherever you are.</h2><p className="mt-6 text-sm leading-8 text-zinc-500">Shamim Forever welcomes inquiries from clients internationally. For clients outside an available experience location, the Concierge may assist with digital communication and consultation options.</p></div><div><p className="mb-4 text-[9px] uppercase tracking-[0.4em] text-[#c9a054]">House Relations</p><h3 className="font-serif text-3xl font-light text-zinc-100">Strategic & professional inquiries.</h3><p className="mt-5 text-sm leading-7 text-zinc-600">Selected communications may include strategic partnerships, brand collaborations, retail opportunities, media relationships, technology initiatives, and business proposals.</p><p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-zinc-700">Please include your name, organization, website, purpose, relevant background, and contact details.</p></div></div></section>

        <section className="border-b border-[#0d0d0d] px-5 py-14 md:px-12 lg:px-20" aria-labelledby="privacy"><div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="mb-3 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Private by Design</p><h2 id="privacy" className="font-serif text-3xl font-light text-zinc-100 md:text-4xl">Client communication is handled with discretion.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">Information submitted through official communication channels is used to respond to inquiries and provide relevant client services in accordance with applicable privacy practices.</p></div><a href="/policies" className="flex-shrink-0 text-[9px] uppercase tracking-[0.4em] text-[#c9a054]">Privacy Policy →</a></div></section>

        <section className="border-b border-[#0d0d0d] px-5 py-16 md:px-12 md:py-24 lg:px-20" aria-labelledby="faq"><div className="mx-auto max-w-[1000px]"><p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Concierge FAQ</p><h2 id="faq" className="font-serif text-4xl font-light text-zinc-100 md:text-6xl">Questions before you connect.</h2><div className="mt-10 border-t border-[#1a1a1a]">{CONCIERGE_FAQS.map(item => <details key={item.question} className="group border-b border-[#1a1a1a] py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm text-zinc-300"><span>{item.question}</span><span className="text-[#c9a054] transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-4 text-sm leading-7 text-zinc-600">{item.answer}</p></details>)}</div></div></section>

        <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20"><div className="mx-auto max-w-[900px] text-center"><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The House is within reach</p><h2 className="mt-6 font-serif text-4xl font-light tracking-[0.05em] text-zinc-100 md:text-6xl">Begin your private conversation.</h2><p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-zinc-500">For appointments, bespoke inquiries, client services, and selected House communications, connect with Shamim Forever Concierge.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><a href="#appointment" className="border border-[#c9a054]/60 px-8 py-4 text-[9px] uppercase tracking-[0.45em] text-[#c9a054]">Contact Concierge →</a><a href="https://wa.me/923119447572" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-[9px] uppercase tracking-[0.45em] text-zinc-600">WhatsApp Concierge →</a></div></div></section>

        <section className="border-t border-[#0d0d0d] px-5 py-14 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1200px] gap-8 text-sm text-zinc-500 md:grid-cols-3"><div><p className="mb-4 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Global Headquarters</p><p>Shamim Forever<br />77 Esplanade du Général de Gaulle<br />92800 Puteaux, Hauts-de-Seine<br />Paris La Défense, France</p></div><div><p className="mb-4 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Official Website</p><p>shamimforever.com</p><p className="mt-2 text-xs text-zinc-700">Sovereign Luxury House</p></div><div><p className="mb-4 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Concierge</p><a href="mailto:concierge@shamimforever.com" className="transition hover:text-[#c9a054]">concierge@shamimforever.com</a><p className="mt-2 text-xs text-zinc-700">Private access · By appointment</p></div></div></section>
    </div>
  )
}
