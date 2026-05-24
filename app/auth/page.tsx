'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

const ease = [0.16, 1, 0.3, 1] as const

type Mode = 'choose' | 'email' | 'change-password' | 'forgot'

export default function AuthPage() {
  const router = useRouter()
  const { isConnected, address } = useAccount()
  const [mode, setMode] = useState<Mode>('choose')
  const [form, setForm] = useState({ email: '', password: '', newPassword: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session && mode === 'choose') setMode('choose')
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    if (error) setError(error.message)
    else { setSuccess('Access granted. Welcome.'); setTimeout(() => router.push('/'), 1200) }
    setLoading(false)
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (form.newPassword !== form.confirmPassword) { setError('Passwords do not match.'); return }
    if (form.newPassword.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true); setError(null)
    const { error } = await supabase.auth.updateUser({ password: form.newPassword })
    if (error) setError(error.message)
    else setSuccess('Password updated successfully.')
    setLoading(false)
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
      redirectTo: `${window.location.origin}/auth?mode=change-password`,
    })
    if (error) setError(error.message)
    else setSuccess('Reset link sent to your email.')
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setSession(null); setMode('choose')
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-5 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#c9a054]/3 animate-spin" style={{ animationDuration: '80s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#c9a054]/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a054]/10 to-transparent" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease }}
        className="relative z-10 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/">
            <img src="/logo.png" alt="Shamim Forever" className="h-10 w-auto mx-auto mb-8 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(201,160,84,0.2))' }} />
          </Link>
          <p className="text-[8px] tracking-[0.55em] uppercase text-[#c9a054] mb-2">Sovereign Access</p>
          <h1 className="font-serif font-light text-3xl tracking-[0.15em] uppercase text-zinc-100">
            {mode === 'choose' ? 'Enter' : mode === 'email' ? 'Sign In' : mode === 'change-password' ? 'New Password' : 'Reset Access'}
          </h1>
        </div>

        <AnimatePresence mode="wait">

          {/* ── LOGGED IN STATE ── */}
          {session && mode === 'choose' && (
            <motion.div key="loggedin" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}
              className="border border-[#c9a054]/20 p-8 text-center space-y-6">
              <div>
                <motion.div className="w-2 h-2 rounded-full bg-[#c9a054] mx-auto mb-4"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <p className="text-[8px] tracking-[0.45em] uppercase text-[#c9a054] mb-1">Sovereign Access Active</p>
                <p className="text-zinc-400 text-sm font-light truncate">{session.user?.email}</p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => setMode('change-password')}
                  className="group relative inline-flex items-center justify-center w-full py-3.5 border border-[#c9a054]/50 text-[8px] tracking-[0.45em] uppercase text-[#c9a054] overflow-hidden">
                  <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Change Password</span>
                </button>
                <Link href="/shop" className="w-full py-3.5 border border-[#111] text-[8px] tracking-[0.45em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors text-center block">
                  Enter Vault
                </Link>
                <button onClick={handleLogout} className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 hover:text-red-500/60 transition-colors">
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}

          {/* ── CHOOSE MODE ── (not logged in) */}
          {!session && mode === 'choose' && (
            <motion.div key="choose" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}
              className="space-y-4">

              {/* Wallet Option */}
              <div className="border border-[#1a1a1a] p-6 hover:border-[#c9a054]/20 transition-colors duration-500">
                <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-700 mb-1">Option 01</p>
                <h3 className="font-serif font-light text-lg text-zinc-200 mb-1">Sovereign Wallet</h3>
                <p className="text-zinc-600 text-xs font-light mb-5">Connect your Polygon wallet for NFT access, product authentication, and blockchain payments.</p>
                <div className="flex justify-start">
                  <ConnectButton label="Connect Wallet" chainStatus="none" showBalance={false} accountStatus="address" />
                </div>
                {isConnected && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-4 border border-[#c9a054]/15 p-3 flex items-center gap-3">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#c9a054] flex-shrink-0"
                      animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                    <p className="font-mono text-[9px] text-zinc-500 truncate">{address}</p>
                  </motion.div>
                )}
                {isConnected && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link href="/authenticate" className="text-[7px] tracking-[0.35em] uppercase text-[#c9a054] border border-[#c9a054]/30 py-2.5 text-center hover:bg-[#c9a054]/5 transition-colors">
                      Authenticate NFT
                    </Link>
                    <Link href="/shop" className="text-[7px] tracking-[0.35em] uppercase text-zinc-600 border border-[#111] py-2.5 text-center hover:text-zinc-300 transition-colors">
                      Enter Vault
                    </Link>
                  </div>
                )}
              </div>

              {/* Email Option */}
              <div className="border border-[#1a1a1a] p-6 hover:border-[#c9a054]/20 transition-colors duration-500">
                <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-700 mb-1">Option 02</p>
                <h3 className="font-serif font-light text-lg text-zinc-200 mb-1">Member Account</h3>
                <p className="text-zinc-600 text-xs font-light mb-5">Accounts are created by the House. Apply for Inner Circle membership to receive your credentials.</p>
                <button onClick={() => setMode('email')}
                  className="group relative inline-flex items-center justify-center w-full py-3.5 border border-[#111] text-[8px] tracking-[0.45em] uppercase text-zinc-500 overflow-hidden hover:border-[#c9a054]/30 hover:text-[#c9a054] transition-colors duration-300">
                  Sign In With Email
                </button>
              </div>

              <p className="text-center text-[7px] tracking-[0.4em] uppercase text-zinc-800 pt-2">
                No account?{' '}
                <Link href="/inner-circle" className="text-[#c9a054]/60 hover:text-[#c9a054] transition-colors">Apply for Inner Circle</Link>
              </p>
            </motion.div>
          )}

          {/* ── EMAIL LOGIN ── */}
          {mode === 'email' && (
            <motion.div key="email" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>
              <form onSubmit={handleLogin} className="space-y-0">
                {[
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                ].map(f => (
                  <div key={f.name} className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/40 transition-colors duration-500">
                    <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors">{f.label}</label>
                    <input type={f.type} name={f.name} required autoComplete={f.name}
                      value={(form as any)[f.name]} onChange={handleChange}
                      placeholder={f.placeholder}
                      className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light placeholder:text-zinc-800 outline-none" />
                  </div>
                ))}

                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500/70 text-xs pt-3">{error}</motion.p>}
                {success && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#c9a054] text-xs pt-3">{success}</motion.p>}

                <div className="pt-7 space-y-3">
                  <button type="submit" disabled={loading}
                    className="group relative inline-flex items-center justify-center w-full py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden disabled:opacity-40">
                    <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                    <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                      {loading ? 'Verifying…' : 'Enter Vault'}
                    </span>
                  </button>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => { setMode('choose'); setError(null) }}
                      className="flex-1 py-3 text-[7px] tracking-[0.4em] uppercase text-zinc-700 hover:text-zinc-400 transition-colors border border-[#0a0a0a]">
                      ← Back
                    </button>
                    <button type="button" onClick={() => { setMode('forgot'); setError(null) }}
                      className="flex-1 py-3 text-[7px] tracking-[0.4em] uppercase text-zinc-700 hover:text-[#c9a054] transition-colors border border-[#0a0a0a]">
                      Forgot Password
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── CHANGE PASSWORD ── */}
          {mode === 'change-password' && (
            <motion.div key="change" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>
              <form onSubmit={handleChangePassword} className="space-y-0">
                {[
                  { name: 'newPassword', label: 'New Password', placeholder: '••••••••' },
                  { name: 'confirmPassword', label: 'Confirm Password', placeholder: '••••••••' },
                ].map(f => (
                  <div key={f.name} className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/40 transition-colors duration-500">
                    <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors">{f.label}</label>
                    <input type="password" name={f.name} required
                      value={(form as any)[f.name]} onChange={handleChange}
                      placeholder={f.placeholder}
                      className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light placeholder:text-zinc-800 outline-none" />
                  </div>
                ))}
                {error && <p className="text-red-500/70 text-xs pt-3">{error}</p>}
                {success && <p className="text-[#c9a054] text-xs pt-3">{success}</p>}
                <div className="pt-7 flex gap-3">
                  <button type="button" onClick={() => setMode('choose')}
                    className="flex-1 py-3.5 border border-[#0a0a0a] text-[7px] tracking-[0.4em] uppercase text-zinc-700 hover:text-zinc-400 transition-colors">
                    ← Back
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 py-3.5 border border-[#c9a054]/50 text-[8px] tracking-[0.4em] uppercase text-[#c9a054] hover:bg-[#c9a054]/5 transition-colors disabled:opacity-40">
                    {loading ? 'Saving…' : 'Update Password'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── FORGOT PASSWORD ── */}
          {mode === 'forgot' && (
            <motion.div key="forgot" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>
              <form onSubmit={handleForgot} className="space-y-0">
                <div className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/40 transition-colors duration-500">
                  <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors">Email Address</label>
                  <input type="email" name="email" required
                    value={form.email} onChange={handleChange} placeholder="your@email.com"
                    className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light placeholder:text-zinc-800 outline-none" />
                </div>
                {error && <p className="text-red-500/70 text-xs pt-3">{error}</p>}
                {success && <p className="text-[#c9a054] text-xs pt-3">{success}</p>}
                <div className="pt-7 flex gap-3">
                  <button type="button" onClick={() => { setMode('email'); setError(null) }}
                    className="flex-1 py-3.5 border border-[#0a0a0a] text-[7px] tracking-[0.4em] uppercase text-zinc-700 hover:text-zinc-400 transition-colors">
                    ← Back
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 py-3.5 border border-[#c9a054]/50 text-[8px] tracking-[0.4em] uppercase text-[#c9a054] disabled:opacity-40 hover:bg-[#c9a054]/5 transition-colors">
                    {loading ? 'Sending…' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  )
}
