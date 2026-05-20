'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })
        if (error) throw error
        router.push('/')
      } else {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { full_name: form.name },
          },
        })
        if (error) throw error
        setSuccess('Account created. Check your email to confirm access.')
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Try again.')
    }

    setLoading(false)
  }

  async function handleOAuth(provider: 'google') {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin } })
  }

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 border-r border-[#1a1a1a] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#c9a054]/5 animate-spin" style={{ animationDuration: '60s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[#c9a054]/5 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[#c9a054]/10" />
        </div>

        <div className="relative z-10 text-center px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif text-[12rem] font-light text-[#c9a054]/10 leading-none">SF</p>
          </motion.div>
          <div className="mt-8">
            <p className="font-serif text-3xl font-light tracking-[0.3em] uppercase text-zinc-100 mb-3">
              Shamim Forever
            </p>
            <p className="luxury-meta">Sovereign Luxury</p>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20 pt-32">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="luxury-meta mb-4">Sovereign Access</p>
            <h1 className="font-serif text-4xl font-light tracking-[0.2em] uppercase text-zinc-100 mb-12">
              {mode === 'login' ? 'Authenticate' : 'Request Access'}
            </h1>

            {/* Tabs */}
            <div className="flex gap-1 mb-12 border-b border-[#1a1a1a]">
              {(['login', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(null); setSuccess(null) }}
                  className={`pb-4 px-2 text-[9px] tracking-[0.4em] uppercase transition-colors duration-300 ${
                    mode === m
                      ? 'text-[#c9a054] border-b border-[#c9a054] -mb-px'
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  {m === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleAuth}
                className="space-y-10"
              >
                {mode === 'signup' && (
                  <div>
                    <label className="luxury-meta block mb-3">Full Name</label>
                    <input
                      type="text"
                      required={mode === 'signup'}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="luxury-input"
                      placeholder="Your full name"
                    />
                  </div>
                )}

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
                  <label className="luxury-meta block mb-3">Password</label>
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="luxury-input"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500/70 text-xs tracking-[0.2em] uppercase"
                  >
                    {error}
                  </motion.p>
                )}

                {success && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#c9a054] text-xs tracking-[0.2em] uppercase"
                  >
                    {success}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                  className="luxury-btn w-full text-[10px] py-5 disabled:opacity-50"
                >
                  {loading
                    ? 'Processing...'
                    : mode === 'login'
                    ? 'Authenticate'
                    : 'Create Account'}
                </motion.button>
              </motion.form>
            </AnimatePresence>

            {/* Divider */}
            <div className="flex items-center gap-6 my-10">
              <div className="flex-1 h-px bg-[#1a1a1a]" />
              <span className="luxury-meta text-zinc-700">or</span>
              <div className="flex-1 h-px bg-[#1a1a1a]" />
            </div>

            <button
              onClick={() => handleOAuth('google')}
              className="luxury-btn w-full text-[9px] py-4"
            >
              Continue with Google
            </button>

            <p className="text-center text-zinc-700 text-[9px] tracking-[0.2em] uppercase mt-10">
              By continuing you agree to our Terms of Sovereignty
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
