'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const MEMBERSHIP_TIERS = [
  {
    name: 'Sovereign',
    code: 'S-001',
    description: 'Early access to new releases. Complimentary white-glove delivery.',
    perks: ['Early drop access', 'Complimentary delivery', 'Member events'],
  },
  {
    name: 'Imperial',
    code: 'I-002',
    description: 'Exclusive bespoke commissions. Private atelier viewings. OKBOND allocation.',
    perks: ['Bespoke commissions', 'Private viewings', 'OKBOND allocation', 'Dedicated concierge'],
  },
  {
    name: 'Eternal',
    code: 'E-003',
    description: 'Full sovereign access. Lifetime membership. Named in the House archives.',
    perks: ['All Imperial perks', 'Lifetime access', 'House archive listing', 'Annual masterclass'],
  },
]

export default function InnerCirclePage() {
  const [activeTab, setActiveTab] = useState<'request' | 'authenticate'>('request')
  const [form, setForm] = useState({ name: '', email: '', message: '', tier: 'Sovereign' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleRequestAccess(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await supabase.from('inner_circle_requests').insert([{
        name: form.name,
        email: form.email,
        message: form.message,
        tier: form.tier,
        status: 'pending',
      }])
      setSubmitted(true)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-20">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#c9a054]/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-[#c9a054]/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] rounded-full border border-[#c9a054]/10" />
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="luxury-meta mb-8">Exclusive Access</p>
            <h1 className="font-serif text-6xl md:text-8xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-8 leading-none">
              The Inner<br />
              <span className="italic text-[#c9a054]">Circle</span>
            </h1>
            <p className="text-zinc-500 font-light max-w-lg leading-relaxed">
              Sovereignty is not purchased — it is granted. Membership to the Shamim Forever 
              Inner Circle is by invitation or application, reviewed by the House.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
        {/* Membership Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <p className="luxury-meta mb-12">Tiers of Sovereignty</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a]">
            {MEMBERSHIP_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="bg-[#050505] p-10 group hover:bg-[#0a0a0a] transition-colors duration-700"
              >
                <p className="luxury-meta mb-2">{tier.code}</p>
                <h3 className="font-serif text-3xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-6">
                  {tier.name}
                </h3>
                <p className="text-zinc-500 font-light leading-relaxed text-sm mb-8">
                  {tier.description}
                </p>
                <div className="space-y-3">
                  {tier.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-[#c9a054] flex-shrink-0" />
                      <span className="text-xs text-zinc-400 tracking-[0.1em] uppercase font-light">{perk}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Access Form */}
        <div className="max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-1 mb-16 border-b border-[#1a1a1a]">
            {(['request', 'authenticate'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 text-[9px] tracking-[0.4em] uppercase transition-colors duration-300 ${
                  activeTab === tab
                    ? 'text-[#c9a054] border-b border-[#c9a054] -mb-px'
                    : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                {tab === 'request' ? 'Request Access' : 'Sovereign Key'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'request' ? (
              <motion.div
                key="request"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {submitted ? (
                  <div className="text-center py-20">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="font-serif text-4xl font-light text-[#c9a054] mb-6">◆</p>
                      <h3 className="font-serif text-3xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-4">
                        Application Received
                      </h3>
                      <p className="text-zinc-500 font-light leading-relaxed">
                        Your application has entered the Sovereign Vault. The House will review 
                        your request within 72 hours and contact you directly.
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <form onSubmit={handleRequestAccess} className="space-y-10">
                    <div>
                      <label className="luxury-meta block mb-3">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="luxury-input"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="luxury-meta block mb-3">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="luxury-input"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="luxury-meta block mb-3">Requested Tier</label>
                      <select
                        value={form.tier}
                        onChange={(e) => setForm({ ...form, tier: e.target.value })}
                        className="luxury-input bg-transparent cursor-pointer"
                      >
                        {MEMBERSHIP_TIERS.map((t) => (
                          <option key={t.name} value={t.name} className="bg-[#0a0a0a]">
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="luxury-meta block mb-3">Why Shamim Forever</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="luxury-input resize-none"
                        rows={4}
                        placeholder="Tell the House about yourself..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileTap={{ scale: 0.98 }}
                      className="luxury-btn w-full text-[10px] py-5 disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="auth"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <p className="font-serif text-6xl text-[#c9a054]/20 mb-8">◈</p>
                <h3 className="font-serif text-3xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-6">
                  Authenticate
                </h3>
                <p className="text-zinc-500 font-light mb-12">
                  Present your Sovereign Key to gain Inner Circle access.
                </p>
                <a href="/auth" className="luxury-btn text-[9px]">
                  Go to Authentication
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
