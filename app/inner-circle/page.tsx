'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

const BENEFITS = [
  { icon: '◈', title: 'First-Access Drops', desc: 'Every new product, limited edition, and seasonal collection arrives in your inbox before public release — 48 hours early.' },
  { icon: '◇', title: 'Private Boutique Previews', desc: 'Exclusive invitations to pre-opening viewings across all 10 global locations — from Karachi to Paris.' },
  { icon: '◆', title: 'Bespoke Commission', desc: 'Inner Circle members may commission one-of-one creations — fragrances, jewelry, and cosmetics made only for you.' },
  { icon: '⬡', title: 'OKBOND Privilege', desc: 'Automatic 10% discount on all purchases when paying with OKBOND — our sovereign loyalty currency.' },
  { icon: '○', title: 'Concierge Access', desc: 'Direct WhatsApp line to the House concierge for private appointments, gifting, and sourcing requests.' },
  { icon: '◉', title: 'Legacy Archive', desc: 'Access to the full Shamim Forever archive — sold-out editions, founder notes, and atelier documentation.' },
]

const TIERS = [
  {
    id: 'confidant',
    label: 'Confidant',
    sub: 'The Foundation',
    perks: ['First-access drops', 'Monthly dispatch', 'OKBOND 5% discount'],
    color: 'border-zinc-800',
    accent: 'text-zinc-400',
  },
  {
    id: 'sovereign',
    label: 'Sovereign',
    sub: 'The Inner Circle',
    perks: ['Everything in Confidant', 'Private boutique previews', 'OKBOND 10% discount', 'Concierge WhatsApp access'],
    color: 'border-[#c9a054]/40',
    accent: 'text-[#c9a054]',
    featured: true,
  },
  {
    id: 'patron',
    label: 'Patron',
    sub: 'Bespoke Only',
    perks: ['Everything in Sovereign', 'Bespoke commission priority', 'Legacy archive access', 'Annual atelier visit'],
    color: 'border-zinc-700',
    accent: 'text-zinc-300',
  },
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function InnerCirclePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [selectedTier, setSelectedTier] = useState('sovereign')
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', city: '', message: '' })
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    setFormState('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/inner-circle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tier: selectedTier }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setFormState('error')
      } else {
        setFormState('success')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setFormState('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="pt-20 relative border-b border-[#0d0d0d]">
        <div className="relative min-h-[50vw] md:min-h-[50vh] max-h-[560px] overflow-hidden">
          <img src="/founder-5.png" alt="Inner Circle"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.25) contrast(1.15) saturate(0.7)' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/70 to-[#050505]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent to-[#c9a054]/10" />
            <div className="absolute bottom-16 right-0 w-1/4 h-px bg-gradient-to-l from-transparent to-[#c9a054]/8" />
          </div>
          <div className="relative z-10 flex flex-col justify-end h-full px-5 md:px-12 lg:px-20 py-12 md:py-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }}>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#c9a054] mb-5 md:mb-7">Membership · By Application</p>
              <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-zinc-100 leading-[0.92] mb-5 md:mb-7">
                The Inner<br /><span className="italic text-zinc-400">Circle</span>
              </h1>
              <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-sm">
                A closed tier of those who understand permanence. Not everyone qualifies — but everyone may apply.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="border-b border-[#0d0d0d]">
        <div className="px-5 md:px-12 lg:px-20 py-14 md:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="mb-10 md:mb-14">
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-4">What You Receive</p>
            <h2 className="font-serif font-light text-3xl md:text-5xl tracking-[0.05em] text-zinc-100">
              Six Sovereign<br /><span className="italic text-zinc-500">Privileges</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0d0d0d]">
            {BENEFITS.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                className="bg-[#050505] px-6 md:px-8 py-8 md:py-10 hover:bg-[#080808] transition-colors duration-500 group">
                <span className="text-xl text-[#c9a054] block mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-500 inline-block">{b.icon}</span>
                <h3 className="font-serif font-light text-base md:text-lg tracking-[0.1em] text-zinc-200 mb-3 md:mb-4">{b.title}</h3>
                <p className="text-zinc-600 text-xs font-light leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIERS ─── */}
      <section id="tiers-section" className="border-b border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="mb-10 md:mb-14">
          <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-4">Membership Tiers</p>
          <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.05em] text-zinc-100">
            Choose Your<br /><span className="italic text-zinc-500">Standing</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {TIERS.map((tier, i) => (
            <motion.button key={tier.id} onClick={() => setSelectedTier(tier.id)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className={`text-left border p-6 md:p-8 transition-all duration-500 relative ${selectedTier === tier.id ? tier.color + ' bg-[#080808]' : 'border-[#111] hover:border-[#1a1a1a]'}`}>
              {tier.featured && (
                <div className="absolute top-4 right-4">
                  <span className="text-[6px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-2 py-1">Recommended</span>
                </div>
              )}
              <p className={`text-[8px] tracking-[0.45em] uppercase mb-3 ${selectedTier === tier.id ? tier.accent : 'text-zinc-700'}`}>{tier.sub}</p>
              <h3 className={`font-serif font-light text-2xl md:text-3xl tracking-[0.08em] mb-5 md:mb-6 ${selectedTier === tier.id ? 'text-zinc-100' : 'text-zinc-500'}`}>{tier.label}</h3>
              <ul className="space-y-2.5">
                {tier.perks.map(perk => (
                  <li key={perk} className="flex items-start gap-3">
                    <span className={`text-[8px] mt-0.5 ${selectedTier === tier.id ? tier.accent : 'text-zinc-800'}`}>◈</span>
                    <span className={`text-xs font-light ${selectedTier === tier.id ? 'text-zinc-400' : 'text-zinc-700'}`}>{perk}</span>
                  </li>
                ))}
              </ul>
              {selectedTier === tier.id && (
                <div className="mt-6 pt-5 border-t border-[#1a1a1a]">
                  <span className={`text-[8px] tracking-[0.4em] uppercase ${tier.accent}`}>Selected ◈</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section className="px-5 md:px-12 lg:px-20 py-14 md:py-24">
        <div className="max-w-xl mx-auto md:mx-0">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} className="mb-10 md:mb-12">
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-4">The Application</p>
            <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.05em] text-zinc-100">Request Access</h2>
            <p className="text-zinc-600 text-sm font-light mt-4 leading-relaxed">
              Applications are reviewed within 48 hours. Approved members receive a sovereign welcome dispatch with access credentials.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease }}
                className="border border-[#c9a054]/20 px-8 py-12 text-center">
                <div className="w-px h-12 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-8" />
                <p className="text-[9px] tracking-[0.55em] uppercase text-[#c9a054] mb-5">Application Received</p>
                <h3 className="font-serif font-light text-3xl tracking-[0.08em] text-zinc-200 mb-5">Welcome, {form.name.split(' ')[0]}.</h3>
                <p className="text-zinc-600 text-sm font-light leading-relaxed mb-8 max-w-xs mx-auto">
                  Your application for <span className="text-[#c9a054]">{TIERS.find(t => t.id === selectedTier)?.label}</span> membership has been received. We will respond within 48 hours.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-8 h-px bg-[#c9a054]/30" />
                  <span className="text-[8px] tracking-[0.45em] uppercase text-zinc-700">House of Shamim Forever</span>
                  <div className="w-8 h-px bg-[#c9a054]/30" />
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-0">
                <div className="border border-[#c9a054]/20 px-5 py-4 mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-[7px] tracking-[0.45em] uppercase text-zinc-700 mb-1">Applying For</p>
                    <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a054]">
                      {TIERS.find(t => t.id === selectedTier)?.label} — {TIERS.find(t => t.id === selectedTier)?.sub}
                    </p>
                  </div>
                  <button type="button" onClick={() => document.getElementById('tiers-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors duration-400">Change</button>
                </div>

                {[
                  { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Your name' },
                  { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'your@email.com' },
                  { name: 'city', label: 'City / Country', type: 'text', required: false, placeholder: 'Karachi, Pakistan' },
                ].map(field => (
                  <div key={field.name} className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/40 transition-colors duration-500">
                    <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">
                      {field.label} {field.required && <span className="text-[#c9a054]">*</span>}
                    </label>
                    <input type={field.type} name={field.name} required={field.required}
                      value={(form as any)[field.name]} onChange={handleChange} placeholder={field.placeholder}
                      className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light placeholder:text-zinc-800 outline-none" />
                  </div>
                ))}

                <div className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/40 transition-colors duration-500">
                  <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors duration-400">Why do you seek access?</label>
                  <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                    placeholder="Tell us about yourself and your connection to the House..."
                    className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light placeholder:text-zinc-800 outline-none resize-none" />
                </div>

                {formState === 'error' && <p className="text-red-500/70 text-xs font-light pt-2">{errorMsg}</p>}

                <div className="pt-8">
                  <button type="submit" disabled={formState === 'submitting'}
                    className="group relative w-full md:w-auto inline-flex items-center justify-center px-10 py-5 border border-[#c9a054]/60 text-[9px] tracking-[0.55em] uppercase text-[#c9a054] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed">
                    <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700 group-disabled:translate-y-full" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                    <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                      {formState === 'submitting' ? 'Submitting Application...' : 'Submit Application'}
                    </span>
                  </button>
                  <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-800 mt-5">Applications reviewed within 48 hours · No spam, ever</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── BOTTOM MANIFESTO ─── */}
      <section className="border-t border-[#0d0d0d] px-5 md:px-12 lg:px-20 py-14 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <p className="font-serif font-light italic text-2xl md:text-4xl text-zinc-600 mb-4 max-w-lg leading-[1.2]">
              &ldquo;The Inner Circle is not a loyalty programme.<br />It is a recognition.&rdquo;
            </p>
            <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-800">— The House, 2023</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#c9a054]/20" />
            <span className="text-[8px] tracking-[0.45em] uppercase text-zinc-700">House of Shamim Forever</span>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
