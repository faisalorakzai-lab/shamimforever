'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

const ACCESS_INTERESTS = [
  'Limited Collections',
  'Private Experiences',
  'Bespoke Services',
  'Atelier',
  'Innovation & Digital Identity',
  'Inner Circle',
  'House Journal',
]

const OFFERINGS = [
  ['01', 'Early House Intelligence', 'Selected announcements before wider public communication: House developments, collection news, new experiences, digital initiatives, and editorial releases.'],
  ['02', 'Limited Release Notifications', 'Awareness of selected limited releases. Availability is never guaranteed; the purpose is considered early information.'],
  ['03', 'Private Invitations', 'Consideration for private events, digital experiences, House presentations, selected gatherings, and future international experiences.'],
  ['04', 'Atelier Access', 'A closer look at design thinking, craft, concepts, bespoke experiences, and future collections.'],
  ['05', 'Bespoke Opportunities', 'An initial connection point for individuals interested in personalized creations and private creative conversations.'],
  ['06', 'Inner Circle Consideration', 'The Whitelist is not the Inner Circle. A request may create a relationship with the House, but does not automatically grant membership.'],
]

const FAQS = [
  ['What is Shamim Forever Whitelist Access?', 'Whitelist Access is a private entry point for individuals interested in selected communications and future access opportunities from Shamim Forever.'],
  ['Is Whitelist Access free?', 'Submitting an access request does not require payment.'],
  ['Does joining guarantee products or allocation?', 'No. Whitelist Access does not guarantee product availability, allocation, invitations, or membership.'],
  ['Does Whitelist Access guarantee Inner Circle membership?', 'No. The Inner Circle is a separate private access environment with its own invitation or consideration process.'],
  ['Will everyone receive the same opportunities?', 'Not necessarily. Experiences may depend on availability, location, preferences, and individual invitations.'],
  ['Is my information private?', 'Requests should be handled according to the House Privacy Policy and applicable data protection requirements.'],
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

type FormData = {
  name: string
  email: string
  country: string
  interest: string
  accessInterests: string[]
  note: string
  consent: boolean
  privacyAccepted: boolean
  website: string
}

const initialForm: FormData = {
  name: '',
  email: '',
  country: '',
  interest: '',
  accessInterests: [],
  note: '',
  consent: false,
  privacyAccepted: false,
  website: '',
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">{children}</p>
}

function Hologram({ small = false }: { small?: boolean }) {
  return (
    <div className={`pointer-events-none absolute ${small ? 'h-32 w-32' : 'h-72 w-72'} rounded-full opacity-70`} style={{
      background: 'conic-gradient(from 145deg, rgba(201,160,84,.20), rgba(103,232,249,.08), rgba(232,121,249,.12), rgba(201,160,84,.20))',
      filter: 'blur(1px)',
      maskImage: 'radial-gradient(circle, black 30%, transparent 72%)',
      WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 72%)',
    }}>
      <span className="absolute inset-[22%] rounded-full border border-[#c9a054]/25" />
      <span className="absolute inset-[38%] rounded-full border border-cyan-200/20" />
    </div>
  )
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-[#302719] bg-[#090806] px-5 py-6 font-mono text-sm leading-8 text-[#d5b477] md:px-7">
      {children}
    </div>
  )
}

export default function WhitelistAccessPage() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [formState, setFormState] = useState<FormState>('idle')
  const [error, setError] = useState('')

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(previous => ({ ...previous, [key]: value }))
  }

  function toggleInterest(interest: string) {
    update(
      'accessInterests',
      form.accessInterests.includes(interest)
        ? form.accessInterests.filter(item => item !== interest)
        : [...form.accessInterests, interest],
    )
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormState('submitting')
    setError('')

    try {
      const response = await fetch('/api/whitelist-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (!response.ok || result.error) {
        setError(result.error || 'The House could not record your request.')
        setFormState('error')
        return
      }
      setFormState('success')
    } catch {
      setError('A connection error occurred. Please try again.')
      setFormState('error')
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050506] text-zinc-200">
      <section className="relative flex min-h-[calc(100vh-5rem)] items-end border-b border-[#161412] px-5 pb-20 pt-36 md:px-12 md:pb-28 md:pt-48 lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(201,160,84,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(201,160,84,0.045)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_50%_35%,rgba(201,160,84,0.35)_0.5px,transparent_0.8px)] [background-size:11px_11px]" />
        <Hologram />
        <div className="absolute right-[-8rem] top-32 hidden h-[32rem] w-[32rem] border border-[#c9a054]/10 lg:block" style={{ transform: 'rotate(35deg) skewX(-18deg)' }} />
        <div className="absolute right-[-5rem] top-44 hidden h-[26rem] w-[26rem] border border-[#67e8f9]/10 lg:block" style={{ transform: 'rotate(35deg) skewX(-18deg)' }} />
        <div className="relative mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-8 text-[9px] uppercase tracking-[0.55em] text-zinc-600">Shamim Forever · Private Access</p>
            <h1 className="max-w-5xl font-serif text-6xl font-light leading-[0.88] tracking-[0.035em] text-[#f3efe7] md:text-[8rem]">
              Whitelist
              <span className="block text-[#c9a054]">Access.</span>
            </h1>
            <p className="mt-8 max-w-2xl font-serif text-2xl font-light text-zinc-300 md:text-4xl">Enter the House Before the Door Opens.</p>
            <p className="mt-8 max-w-xl text-sm leading-8 text-zinc-500 md:text-base">A private gateway for those seeking early access to limited collections, bespoke experiences, private invitations, and the evolving world of Shamim Forever.</p>
            <a href="#request-access" className="mt-10 inline-flex border border-[#c9a054] px-7 py-4 text-[9px] uppercase tracking-[0.35em] text-[#c9a054] transition-colors hover:bg-[#c9a054] hover:text-[#080706]">Request access ↓</a>
          </div>
          <div className="relative lg:pb-3">
            <div className="relative border border-[#3a3022] bg-[#080807]/90 p-7 backdrop-blur-sm md:p-9">
              <p className="text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">A considered entry system</p>
              <div className="mt-10 space-y-5 font-mono text-xs leading-7 text-zinc-500">
                <p><span className="text-[#c9a054]">ACCESS</span> = INTEREST + ALIGNMENT + CONSIDERATION</p>
                <p className="border-t border-[#252016] pt-5">The House does not sell attention.</p>
                <p>It protects the meaning of access.</p>
              </div>
              <div className="mt-9 flex items-center gap-3 border-t border-[#252016] pt-5 text-[8px] uppercase tracking-[0.28em] text-zinc-700">
                <span className="h-2 w-2 rounded-full bg-[#c9a054] shadow-[0_0_14px_rgba(201,160,84,.8)]" />
                <span>Request review pathway active</span>
              </div>
            </div>
            <p className="mt-4 text-right font-serif text-lg italic text-zinc-700">Access is not purchased. It is considered.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#161412] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[210px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <p className="mb-5 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">On this page</p>
            <nav className="grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">
              {[
                ['Introduction', 'introduction'],
                ['Access philosophy', 'philosophy'],
                ['What the Whitelist may offer', 'offerings'],
                ['Access architecture', 'architecture'],
                ['How it works', 'process'],
                ['Request access', 'request-access'],
                ['Status system', 'status'],
                ['Principles', 'principles'],
                ['Whitelist vs Inner Circle', 'comparison'],
                ['Future access', 'future-access'],
                ['FAQ', 'faq'],
              ].map(([label, id], index) => (
                <a key={id} href={`#${id}`} className="text-[10px] leading-5 text-zinc-600 transition-colors hover:text-[#c9a054]">
                  <span className="mr-2 text-[8px] text-zinc-800">{String(index + 1).padStart(2, '0')}</span>{label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 space-y-28">
            <section id="introduction" className="scroll-mt-24">
              <Eyebrow>01 · A different kind of access</Eyebrow>
              <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-6xl">Intentional relationships instead of unlimited access.</h2>
                  <p className="mt-8 text-sm leading-8 text-zinc-400">Shamim Forever is built around considered relationships. The Whitelist is designed for individuals who wish to remain connected to the evolution of the House.</p>
                  <p className="mt-5 text-sm leading-8 text-zinc-600">A request may create an initial connection with the House. It does not guarantee membership in any private program, product allocation, invitation, or future experience.</p>
                </div>
                <div className="border-l border-[#302719] pl-6">
                  <p className="text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">Membership consideration may provide information about</p>
                  <ul className="mt-6 space-y-4 text-sm text-zinc-500">
                    {['Selected releases', 'Private experiences', 'Bespoke services', 'Atelier developments', 'House invitations', 'Limited access opportunities'].map(item => <li key={item} className="flex gap-3"><span className="text-[#c9a054]">◆</span>{item}</li>)}
                  </ul>
                </div>
              </div>
            </section>

            <section id="philosophy" className="scroll-mt-24">
              <Eyebrow>02 · The access philosophy</Eyebrow>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Access should have meaning.</h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">In a world of constant notifications, mass subscriptions, and endless promotion, not every communication needs to reach everyone. Not every experience needs to be public.</p>
                </div>
                <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-3">
                  {[
                    ['Interest', 'A genuine interest in the House.'],
                    ['Alignment', 'A connection with its philosophy and values.'],
                    ['Consideration', 'A thoughtful approach to private opportunities.'],
                  ].map(([title, text]) => <div key={title} className="bg-[#080808] p-7"><p className="text-[9px] uppercase tracking-[0.35em] text-[#c9a054]">{title}</p><p className="mt-5 text-xs leading-7 text-zinc-600">{text}</p></div>)}
                </div>
              </div>
            </section>

            <section id="offerings" className="scroll-mt-24">
              <Eyebrow>03 · What the Whitelist may offer</Eyebrow>
              <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">Selected access.</h2>
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700">Awareness is not allocation</p>
              </div>
              <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] md:grid-cols-2">
                {OFFERINGS.map(([number, title, text]) => <div key={number} className="bg-[#080808] p-7 md:p-9"><p className="text-[9px] tracking-[0.3em] text-[#c9a054]">{number}</p><h3 className="mt-10 font-serif text-2xl font-light text-zinc-200">{title}</h3><p className="mt-4 text-xs leading-7 text-zinc-600">{text}</p></div>)}
              </div>
            </section>

            <section id="architecture" className="scroll-mt-24">
              <Eyebrow>04 · Access architecture</Eyebrow>
              <div className="relative overflow-hidden border border-[#302719] bg-[#080807] p-7 md:p-12">
                <Hologram small />
                <div className="relative mx-auto max-w-2xl text-center font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                  <p className="text-[#c9a054]">Shamim Forever</p>
                  <p className="my-4 text-[#c9a054]/60">↓</p>
                  <p className="border border-[#c9a054]/50 bg-[#c9a054]/5 px-5 py-4 text-[#c9a054]">Whitelist Access</p>
                  <p className="my-4 text-[#c9a054]/60">↓</p>
                  <p className="border border-[#302719] px-5 py-4">Request Review</p>
                  <div className="my-4 grid gap-5 sm:grid-cols-2">
                    <div><p className="mb-4 text-[#c9a054]/60">↙</p><p className="border border-[#302719] px-4 py-4">House Access</p><p className="mt-3 text-[9px] leading-5 text-zinc-700">Selected communication</p></div>
                    <div><p className="mb-4 text-[#c9a054]/60">↘</p><p className="border border-[#302719] px-4 py-4">Future Consideration</p><p className="mt-3 text-[9px] leading-5 text-zinc-700">Private experiences</p></div>
                  </div>
                  <p className="my-4 text-[#c9a054]/60">↓</p>
                  <p className="border border-[#c9a054]/30 px-5 py-4 text-zinc-300">Inner Circle / Invitation</p>
                </div>
              </div>
            </section>

            <section id="process" className="scroll-mt-24">
              <Eyebrow>05 · How it works</Eyebrow>
              <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">The process.</h2>
              <div className="mt-10 grid gap-px border border-[#1b1814] bg-[#1b1814] md:grid-cols-5">
                {[
                  ['01', 'Request', 'Submit your access request with accurate information.'],
                  ['02', 'Verify', 'Confirm your contact details where required.'],
                  ['03', 'Enter', 'Your request becomes part of the House access system.'],
                  ['04', 'Remain connected', 'Receive selected communications and future opportunities.'],
                  ['05', 'Evolve', 'Additional access opportunities may become available as the House develops.'],
                ].map(([number, title, text]) => <div key={number} className="bg-[#080808] p-6"><p className="text-[9px] tracking-[0.3em] text-[#c9a054]">{number}</p><h3 className="mt-8 font-serif text-xl font-light text-zinc-200">{title}</h3><p className="mt-4 text-xs leading-6 text-zinc-600">{text}</p></div>)}
              </div>
            </section>

            <section id="request-access" className="scroll-mt-24 border border-[#302719] bg-[#080807] p-6 md:p-10">
              <div className="mb-10 max-w-2xl">
                <Eyebrow>06 · Private request</Eyebrow>
                <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-6xl">Request Whitelist Access.</h2>
                <p className="mt-5 text-sm leading-7 text-zinc-500">This is not a newsletter signup. Share only what is necessary for the House to understand your request. Maximum 500 characters for your note.</p>
              </div>
              {formState === 'success' ? (
                <div className="relative overflow-hidden border border-[#c9a054]/40 px-7 py-14 text-center md:px-12">
                  <Hologram small />
                  <div className="relative">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">Your request has been received.</p>
                    <h3 className="mt-6 font-serif text-4xl font-light text-zinc-100 md:text-5xl">The connection is recorded.</h3>
                    <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-zinc-500">Thank you for requesting access to Shamim Forever. Selected communications and future opportunities may be shared with you as the House evolves.</p>
                    <p className="mt-7 font-serif text-xl italic text-zinc-400">Some doors open immediately. Others reveal themselves with time.</p>
                    <Link href="/" className="mt-10 inline-flex border border-[#c9a054] px-6 py-4 text-[9px] uppercase tracking-[0.3em] text-[#c9a054] transition-colors hover:bg-[#c9a054] hover:text-[#080706]">Return to the House →</Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-10">
                  <input aria-hidden="true" tabIndex={-1} autoComplete="off" value={form.website} onChange={event => update('website', event.target.value)} className="hidden" />
                  <div className="grid gap-8 md:grid-cols-2">
                    <label className="block border-b border-[#302719] pb-3">
                      <span className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">Full Name <b className="text-[#c9a054]">*</b></span>
                      <input required value={form.name} onChange={event => update('name', event.target.value)} placeholder="Your name" className="mt-4 w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-800" />
                    </label>
                    <label className="block border-b border-[#302719] pb-3">
                      <span className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">Email Address <b className="text-[#c9a054]">*</b></span>
                      <input required type="email" value={form.email} onChange={event => update('email', event.target.value)} placeholder="your@email.com" className="mt-4 w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-800" />
                    </label>
                    <label className="block border-b border-[#302719] pb-3">
                      <span className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">Country / Region <b className="text-[#c9a054]">*</b></span>
                      <input required value={form.country} onChange={event => update('country', event.target.value)} placeholder="Pakistan, France, UAE..." className="mt-4 w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-800" />
                    </label>
                    <label className="block border-b border-[#302719] pb-3">
                      <span className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">What brings you to Shamim Forever? <b className="text-[#c9a054]">*</b></span>
                      <select required value={form.interest} onChange={event => update('interest', event.target.value)} className="mt-4 w-full bg-[#080807] text-sm text-zinc-300 outline-none">
                        <option value="">Select your interest</option>
                        {['The House', 'Luxury & Heritage', 'Collections', 'Bespoke Experiences', 'Digital Authenticity', 'Innovation', 'Private Access', 'Future Opportunities', 'Other'].map(item => <option key={item} value={item}>{item}</option>)}
                      </select>
                    </label>
                  </div>

                  <fieldset>
                    <legend className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">Which experiences interest you?</legend>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {ACCESS_INTERESTS.map(item => <label key={item} className={`flex cursor-pointer items-center gap-3 border px-4 py-4 text-xs transition-colors ${form.accessInterests.includes(item) ? 'border-[#c9a054]/60 bg-[#c9a054]/5 text-zinc-200' : 'border-[#1b1814] text-zinc-600 hover:border-[#302719]'}`}><input type="checkbox" checked={form.accessInterests.includes(item)} onChange={() => toggleInterest(item)} className="accent-[#c9a054]" />{item}</label>)}
                    </div>
                  </fieldset>

                  <label className="block border-b border-[#302719] pb-3">
                    <span className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">Tell us about your interest <span className="text-zinc-800">· optional</span></span>
                    <textarea maxLength={500} rows={4} value={form.note} onChange={event => update('note', event.target.value)} placeholder="What interests you about Shamim Forever?" className="mt-4 w-full resize-none bg-transparent text-sm leading-7 text-zinc-200 outline-none placeholder:text-zinc-800" />
                    <span className="mt-2 block text-right text-[9px] text-zinc-800">{form.note.length}/500</span>
                  </label>

                  <div className="space-y-4 text-xs text-zinc-600">
                    <label className="flex items-start gap-3"><input required type="checkbox" checked={form.consent} onChange={event => update('consent', event.target.checked)} className="mt-0.5 accent-[#c9a054]" /><span>I agree to receive selected communications from Shamim Forever.</span></label>
                    <label className="flex items-start gap-3"><input required type="checkbox" checked={form.privacyAccepted} onChange={event => update('privacyAccepted', event.target.checked)} className="mt-0.5 accent-[#c9a054]" /><span>I have read the <Link href="/policies" className="text-[#c9a054] hover:underline">Privacy Policy</Link>.</span></label>
                  </div>

                  {formState === 'error' && <p className="text-sm text-red-300/80">{error}</p>}
                  <button type="submit" disabled={formState === 'submitting'} className="group relative inline-flex overflow-hidden border border-[#c9a054] px-8 py-5 text-[9px] uppercase tracking-[0.35em] text-[#c9a054] transition-colors disabled:cursor-wait disabled:opacity-50">
                    <span className="absolute inset-0 translate-y-full bg-[#c9a054] transition-transform duration-500 group-hover:translate-y-0 group-disabled:translate-y-full" />
                    <span className="relative group-hover:text-[#080706]">{formState === 'submitting' ? 'Recording request...' : 'Request access →'}</span>
                  </button>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-800">A request is not a membership application or product allocation.</p>
                </form>
              )}
            </section>

            <section id="status" className="scroll-mt-24">
              <Eyebrow>07 · Whitelist status system</Eyebrow>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {['Pending', 'Verified', 'Whitelisted', 'Selected', 'Invited', 'Inner Circle'].map((status, index) => <div key={status} className="relative border border-[#1b1814] bg-[#080808] p-5 text-center"><span className="block text-[8px] tracking-[0.25em] text-[#c9a054]">0{index + 1}</span><span className="mt-5 block font-serif text-lg font-light text-zinc-300">{status}</span>{index < 5 && <span className="absolute -right-3 top-1/2 z-10 hidden text-[#c9a054] lg:block">→</span>}</div>)}
              </div>
              <div className="mt-8 border-l border-[#c9a054] pl-5 text-sm leading-7 text-zinc-500">Future approved access identities may use an SF Access ID such as <span className="font-mono text-[#c9a054]">SF-WL-2026-000184</span>. This is a future infrastructure concept, not an ID issued by this page today.</div>
            </section>

            <section id="principles" className="scroll-mt-24">
              <Eyebrow>08 · Private access principles</Eyebrow>
              <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ['Selectivity', 'Not every message needs to be sent.'],
                  ['Relevance', 'Communication should have purpose.'],
                  ['Privacy', 'Personal information should be treated responsibly.'],
                  ['Respect', 'The relationship should remain valuable.'],
                ].map(([title, text]) => <div key={title} className="bg-[#080808] p-7"><h3 className="font-serif text-2xl font-light text-zinc-200">{title}</h3><p className="mt-4 text-xs leading-6 text-zinc-600">{text}</p></div>)}
              </div>
            </section>

            <section id="comparison" className="scroll-mt-24">
              <Eyebrow>09 · Access is not membership</Eyebrow>
              <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Whitelist versus Inner Circle.</h2>
                  <p className="mt-6 text-sm leading-8 text-zinc-500">Whitelist Access is an entry point. The Inner Circle is a separate, more private environment. One does not automatically become the other.</p>
                </div>
                <div className="overflow-hidden border border-[#1b1814]">
                  <div className="grid grid-cols-3 bg-[#0b0a08] text-[8px] uppercase tracking-[0.3em] text-[#c9a054]"><span className="p-4">Access</span><span className="border-l border-[#1b1814] p-4">Whitelist</span><span className="border-l border-[#1b1814] p-4">Inner Circle</span></div>
                  {[
                    ['Entry point', 'Yes', 'Private program'],
                    ['Selected updates', 'Yes', 'Yes'],
                    ['Future opportunities', 'Possible', 'Yes'],
                    ['Invitation guaranteed', 'No', 'By invitation'],
                    ['Membership', 'No', 'Separate'],
                    ['Availability', 'Considered', 'Limited'],
                  ].map(([label, whitelist, circle]) => <div key={label} className="grid grid-cols-3 border-t border-[#1b1814] text-xs text-zinc-600"><span className="p-4">{label}</span><span className="border-l border-[#1b1814] p-4 text-zinc-300">{whitelist}</span><span className="border-l border-[#1b1814] p-4 text-zinc-400">{circle}</span></div>)}
                </div>
              </div>
            </section>

            <section id="future-access" className="scroll-mt-24">
              <Eyebrow>10 · The future of access</Eyebrow>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Intelligent, never impersonal.</h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">Future access systems may consider interests, geography, experience preferences, House relationships, and privacy controls.</p>
                  <Formula>
                    <p>A = f(I, P, R)</p>
                    <p className="mt-4 text-xs leading-7 text-zinc-600">A = Access · I = Identity<br />P = Preference · R = Relationship</p>
                  </Formula>
                </div>
                <div className="relative overflow-hidden border border-[#302719] bg-[#080807] p-7 md:p-10">
                  <Hologram small />
                  <div className="relative font-mono text-xs leading-8 text-zinc-500">
                    <p className="text-[#c9a054]">SHAMIM FOREVER ACCESS IDENTITY</p>
                    <p>│</p>
                    <p>├── ACCESS STATUS</p>
                    <p>├── PREFERENCES</p>
                    <p>├── INVITATIONS</p>
                    <p>├── EXPERIENCES</p>
                    <p>├── AUTHENTICATION</p>
                    <p>└── PRIVACY CONTROLS</p>
                  </div>
                  <p className="relative mt-7 border-t border-[#292218] pt-5 text-xs leading-6 text-zinc-700">Technology may organize access. The House defines the experience.</p>
                </div>
              </div>
            </section>

            <section id="faq" className="scroll-mt-24">
              <Eyebrow>11 · Frequently asked questions</Eyebrow>
              <div className="divide-y divide-[#1b1814] border-y border-[#1b1814]">
                {FAQS.map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl font-light text-zinc-200">{question}<span className="text-[#c9a054] transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600">{answer}</p></details>)}
              </div>
            </section>

            <section className="relative overflow-hidden border-t border-[#302719] py-16 text-center md:py-24">
              <Hologram />
              <div className="relative">
                <Eyebrow>Private Access</Eyebrow>
                <h2 className="font-serif text-5xl font-light leading-none text-[#f3efe7] md:text-8xl">The House is<br /><span className="text-[#c9a054]">always evolving.</span></h2>
                <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-zinc-500">Enter the Whitelist and remain connected to what comes next.</p>
                <a href="#request-access" className="mt-10 inline-flex border border-[#c9a054] px-7 py-4 text-[9px] uppercase tracking-[0.35em] text-[#c9a054] transition-colors hover:bg-[#c9a054] hover:text-[#080706]">Request access →</a>
                <p className="mt-12 font-serif text-xl italic text-zinc-700">Built From Love. Forged Into Legacy.</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}