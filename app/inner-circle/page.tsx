'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

const ACCESS_AREAS = [
  ['01', 'Private previews', 'Consideration for early viewing of selected collections, concepts, and House developments.'],
  ['02', 'Bespoke consultations', 'Private conversations about commissions, individual requirements, and future creations.'],
  ['03', 'House communications', 'Selected stories, developments, and invitations shared directly with the Inner Circle.'],
  ['04', 'Limited releases', 'Consideration for selected releases where availability, timing, and fit allow.'],
  ['05', 'Concierge connection', 'A more direct relationship with the House for appropriate questions, appointments, and coordination.'],
  ['06', 'Archive access', 'A future path to selected House stories, collection history, and atelier documentation.'],
]

const PRINCIPLES = [
  ['Discretion', 'Privacy is respected.'],
  ['Continuity', 'Relationships develop over time.'],
  ['Authenticity', 'Recognition should be meaningful.'],
  ['Care', 'Attention should feel personal.'],
  ['Heritage', 'The relationship contributes to the continuing story of the House.'],
]

const FAQS = [
  ['What is the Shamim Forever Inner Circle?', 'The Inner Circle is a private relationship program for individuals who share a deeper, long-term connection with Shamim Forever. It is not a public subscription or points-based loyalty program.'],
  ['How is Inner Circle consideration different from Whitelist Access?', 'Whitelist Access is an entry point for selected communications and future opportunities. The Inner Circle represents a deeper relationship and separate consideration process.'],
  ['Does applying guarantee membership?', 'No. A request creates an opportunity for review. It does not guarantee acceptance, products, allocation, invitations, concierge access, or any other benefit.'],
  ['Are there membership tiers or required spending levels?', 'This page does not promise public tiers or a spending threshold. The House may consider relationships, engagement, preferences, and other factors privately as the program develops.'],
  ['Is the Inner Circle an investment, cryptocurrency, or financial product?', 'No. The Inner Circle is a private luxury relationship program, not a financial instrument, investment product, cryptocurrency, or ownership scheme.'],
  ['How can the relationship begin?', 'Explore the House, enter through Whitelist Access, remain connected, and allow the relationship to develop over time. Selected relationships may receive further consideration.'],
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function InnerCirclePage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    interest: '',
    message: '',
    consent: false,
    privacyAccepted: false,
    website: '',
  })

  function update(key: keyof typeof form, value: string | boolean) {
    setForm(previous => ({ ...previous, [key]: value }))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormState('submitting')
    setError('')

    try {
      const response = await fetch('/api/inner-circle/request', {
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
      <section className="relative border-b border-[#181512] px-5 pb-20 pt-36 md:px-12 md:pb-28 md:pt-48 lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(201,160,84,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(201,160,84,0.04)_1px,transparent_1px)] [background-size:84px_84px]" />
        <div className="pointer-events-none absolute right-[-7rem] top-24 h-[30rem] w-[30rem] rounded-full border border-[#c9a054]/10 md:h-[42rem] md:w-[42rem]" />
        <div className="pointer-events-none absolute right-[-2rem] top-40 h-[20rem] w-[20rem] rounded-full border border-[#67e8f9]/10 md:h-[30rem] md:w-[30rem]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="mb-8 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Shamim Forever · Private Relationship Program</p>
            <h1 className="max-w-4xl font-serif text-6xl font-light leading-[0.88] tracking-[0.03em] text-[#f3efe7] md:text-[8rem]">
              The Inner
              <span className="block italic text-zinc-500">Circle.</span>
            </h1>
            <p className="mt-8 max-w-2xl font-serif text-2xl font-light text-zinc-300 md:text-4xl">A private world within the House.</p>
            <p className="mt-8 max-w-xl text-sm leading-8 text-zinc-500 md:text-base">The Shamim Forever Inner Circle is built around trust, continuity, discretion, and long-term connection. Access is considered. Relationships are cultivated.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#consideration" className="border border-[#c9a054] px-7 py-4 text-[9px] uppercase tracking-[0.35em] text-[#c9a054] transition-colors hover:bg-[#c9a054] hover:text-[#080706]">Request consideration ↓</a>
              <Link href="/whitelist-access" className="border border-[#302719] px-7 py-4 text-[9px] uppercase tracking-[0.35em] text-zinc-500 transition-colors hover:border-[#c9a054]/50 hover:text-[#c9a054]">Explore Whitelist Access</Link>
            </div>
          </div>
          <div className="border border-[#302719] bg-[#080807]/90 p-7 backdrop-blur-sm md:p-9">
            <p className="text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">The principle</p>
            <p className="mt-10 font-serif text-3xl font-light leading-tight text-zinc-200 md:text-4xl">Luxury begins where transactions end.</p>
            <div className="mt-8 space-y-3 border-t border-[#252016] pt-6 text-sm leading-7 text-zinc-600">
              <p>A purchase can be completed in seconds.</p>
              <p>A relationship takes time.</p>
            </div>
            <p className="mt-8 border-t border-[#252016] pt-5 text-[9px] uppercase tracking-[0.28em] text-zinc-700">No public ranking · No guaranteed status</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#181512] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[210px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <p className="mb-5 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Inner Circle</p>
            <nav className="grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">
              {[
                ['The program', 'program'],
                ['Private access', 'private-access'],
                ['Concierge', 'concierge'],
                ['Bespoke', 'bespoke'],
                ['Archive', 'archive'],
                ['Digital identity', 'digital-identity'],
                ['Consideration', 'consideration'],
                ['FAQ', 'faq'],
              ].map(([label, id], index) => <a key={id} href={`#${id}`} className="text-[10px] leading-5 text-zinc-600 transition-colors hover:text-[#c9a054]"><span className="mr-2 text-[8px] text-zinc-800">{String(index + 1).padStart(2, '0')}</span>{label}</a>)}
            </nav>
          </aside>

          <div className="min-w-0 space-y-28">
            <section id="program" className="scroll-mt-24">
              <p className="mb-5 text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">01 · The program</p>
              <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-6xl">A relationship with the House, not a public subscription.</h2>
                  <p className="mt-8 text-sm leading-8 text-zinc-400">The Inner Circle is Shamim Forever&apos;s private relationship program. While Whitelist Access provides a structured path into selected experiences and services, the Inner Circle represents a deeper level of connection with the House.</p>
                  <p className="mt-5 text-sm leading-8 text-zinc-600">Participation is private and subject to the evolving standards and discretion of the House. Membership is never treated as a transaction.</p>
                </div>
                <div className="border-l border-[#302719] pl-6">
                  <p className="text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">The House remembers</p>
                  <ul className="mt-6 space-y-4 text-sm text-zinc-500">
                    {['Recognition', 'Trust', 'Memory', 'Continuity', 'Access'].map(item => <li key={item} className="flex gap-3"><span className="text-[#c9a054]">◆</span>{item}</li>)}
                  </ul>
                </div>
              </div>
            </section>

            <section id="private-access" className="scroll-mt-24">
              <p className="mb-5 text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">02 · Private access</p>
              <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">Access beyond the public experience.</h2>
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700">Consideration, never entitlement</p>
              </div>
              <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] md:grid-cols-2">
                {ACCESS_AREAS.map(([number, title, text]) => <div key={number} className="bg-[#080808] p-7 md:p-9"><p className="text-[9px] tracking-[0.3em] text-[#c9a054]">{number}</p><h3 className="mt-10 font-serif text-2xl font-light text-zinc-200">{title}</h3><p className="mt-4 text-xs leading-7 text-zinc-600">{text}</p></div>)}
              </div>
            </section>

            <section id="concierge" className="scroll-mt-24">
              <p className="mb-5 text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">03 · The personal concierge</p>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">A more direct connection.</h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">Where appropriate, the Inner Circle may provide a more personal connection to Shamim Forever. The purpose is not automation. The purpose is attention.</p>
                </div>
                <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2">
                  {['Product inquiries', 'Private appointments', 'Bespoke discussions', 'Delivery coordination', 'Collection information', 'Authentication guidance'].map(item => <div key={item} className="bg-[#080808] p-6 text-sm text-zinc-500"><span className="mr-3 text-[#c9a054]">◇</span>{item}</div>)}
                </div>
              </div>
              <p className="mt-8 text-xs leading-7 text-zinc-700">Every request is treated individually. Availability and response times depend on the nature of the request and the House&apos;s capacity.</p>
            </section>

            <section id="bespoke" className="scroll-mt-24">
              <p className="mb-5 text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">04 · Bespoke</p>
              <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Created around the individual.</h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">Some relationships naturally lead beyond existing collections. Where appropriate, the House may explore bespoke possibilities through a private creative dialogue.</p>
                </div>
                <div className="border border-[#302719] bg-[#080807] p-7 font-mono text-sm leading-8 text-[#d5b477]">
                  <p>B = f(P, D, A, C)</p>
                  <p className="mt-5 text-xs leading-7 text-zinc-600">B = Bespoke journey<br />P = Personal preference<br />D = Design dialogue<br />A = Artisanal consideration<br />C = Continuity</p>
                  <p className="mt-5 border-t border-[#292218] pt-5 text-xs text-zinc-700">A conceptual House framework, not a public scoring system.</p>
                </div>
              </div>
            </section>

            <section id="archive" className="scroll-mt-24">
              <p className="mb-5 text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">05 · Archive access</p>
              <div className="border border-[#302719] bg-[#080807] p-8 md:p-12">
                <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">The memory of the House.</h2>
                <p className="mt-7 max-w-3xl text-sm leading-8 text-zinc-500">Shamim Forever is designed not only around the present. The House is also concerned with memory: how collections begin, how ideas become objects, and how relationships contribute to a continuing story.</p>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {['House stories', 'Collection history', 'Design development', 'Cultural references'].map(item => <div key={item} className="border border-[#1b1814] p-5 text-xs text-zinc-600"><span className="mb-5 block text-[#c9a054]">01</span>{item}</div>)}
                </div>
              </div>
            </section>

            <section id="digital-identity" className="scroll-mt-24">
              <p className="mb-5 text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">06 · Digital identity</p>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Technology serves the experience.</h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">As the House develops its digital infrastructure, the Inner Circle may connect with selected identity and authentication systems.</p>
                </div>
                <div className="border border-[#302719] bg-[#080807] p-7 font-mono text-xs leading-8 text-zinc-500">
                  <p className="text-[#c9a054]">SHAMIM FOREVER RELATIONSHIP IDENTITY</p>
                  <p>│</p>
                  <p>├── VERIFIED OWNERSHIP RECORDS</p>
                  <p>├── DIGITAL PROVENANCE</p>
                  <p>├── AUTHENTICATION HISTORY</p>
                  <p>├── COLLECTION CONTINUITY</p>
                  <p>└── PRIVACY CONTROLS</p>
                  <p className="mt-6 border-t border-[#292218] pt-5 text-zinc-700">Technology is infrastructure. The relationship remains human.</p>
                </div>
              </div>
            </section>

            <section id="consideration" className="scroll-mt-24 border border-[#302719] bg-[#080807] p-6 md:p-10">
              <p className="mb-5 text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">07 · Private consideration</p>
              <div className="mb-10 max-w-2xl">
                <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-6xl">Request Inner Circle consideration.</h2>
                <p className="mt-5 text-sm leading-7 text-zinc-500">A request is an opening for a relationship, not a promise of membership. Share only what is necessary for the House to understand your interest.</p>
              </div>
              {formState === 'success' ? (
                <div className="border border-[#c9a054]/40 px-7 py-14 text-center">
                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">Request received</p>
                  <h3 className="mt-6 font-serif text-4xl font-light text-zinc-100 md:text-5xl">The House will consider the connection.</h3>
                  <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-zinc-500">Your request has been recorded for private consideration. No automatic membership, allocation, invitation, or status has been created.</p>
                  <Link href="/" className="mt-10 inline-flex border border-[#c9a054] px-6 py-4 text-[9px] uppercase tracking-[0.3em] text-[#c9a054] transition-colors hover:bg-[#c9a054] hover:text-[#080706]">Return to the House →</Link>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-9">
                  <input aria-hidden="true" tabIndex={-1} autoComplete="off" value={form.website} onChange={event => update('website', event.target.value)} className="hidden" />
                  <div className="grid gap-8 md:grid-cols-2">
                    {[
                      ['name', 'Full Name', 'Your name', 'text'],
                      ['email', 'Email Address', 'your@email.com', 'email'],
                      ['country', 'Country / Region', 'Pakistan, France, UAE...', 'text'],
                    ].map(([key, label, placeholder, type]) => <label key={key} className="block border-b border-[#302719] pb-3 md:last:col-span-2"><span className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">{label} <b className="text-[#c9a054]">*</b></span><input required type={type} value={form[key as 'name' | 'email' | 'country']} onChange={event => update(key as 'name' | 'email' | 'country', event.target.value)} placeholder={placeholder} className="mt-4 w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-800" /></label>)}
                  </div>
                  <label className="block border-b border-[#302719] pb-3"><span className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">What brings you to the House? <b className="text-[#c9a054]">*</b></span><select required value={form.interest} onChange={event => update('interest', event.target.value)} className="mt-4 w-full bg-[#080807] text-sm text-zinc-300 outline-none"><option value="">Select your interest</option>{['Collections', 'Bespoke', 'Heritage & Archive', 'Private Experiences', 'Authentication & Provenance', 'Long-term relationship with the House', 'Other'].map(item => <option key={item} value={item}>{item}</option>)}</select></label>
                  <label className="block border-b border-[#302719] pb-3"><span className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">Tell us about your interest <span className="text-zinc-800">· optional</span></span><textarea maxLength={500} rows={5} value={form.message} onChange={event => update('message', event.target.value)} placeholder="What interests you about the Inner Circle?" className="mt-4 w-full resize-none bg-transparent text-sm leading-7 text-zinc-200 outline-none placeholder:text-zinc-800" /><span className="mt-2 block text-right text-[9px] text-zinc-800">{form.message.length}/500</span></label>
                  <div className="space-y-4 text-xs text-zinc-600"><label className="flex items-start gap-3"><input required type="checkbox" checked={form.consent} onChange={event => update('consent', event.target.checked)} className="mt-0.5 accent-[#c9a054]" /><span>I agree to receive selected communications from Shamim Forever.</span></label><label className="flex items-start gap-3"><input required type="checkbox" checked={form.privacyAccepted} onChange={event => update('privacyAccepted', event.target.checked)} className="mt-0.5 accent-[#c9a054]" /><span>I have read the <Link href="/policies" className="text-[#c9a054] hover:underline">Privacy Policy</Link>.</span></label></div>
                  {formState === 'error' && <p className="text-sm text-red-300/80">{error}</p>}
                  <button type="submit" disabled={formState === 'submitting'} className="border border-[#c9a054] px-8 py-5 text-[9px] uppercase tracking-[0.35em] text-[#c9a054] transition-colors hover:bg-[#c9a054] hover:text-[#080706] disabled:cursor-wait disabled:opacity-50">{formState === 'submitting' ? 'Recording request...' : 'Request consideration →'}</button>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-800">The Inner Circle is not an investment, financial product, cryptocurrency, or guaranteed status program.</p>
                </form>
              )}
            </section>

            <section id="faq" className="scroll-mt-24">
              <p className="mb-5 text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">08 · Frequently asked questions</p>
              <div className="divide-y divide-[#1b1814] border-y border-[#1b1814]">
                {FAQS.map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl font-light text-zinc-200">{question}<span className="text-[#c9a054] transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600">{answer}</p></details>)}
              </div>
            </section>

            <section className="relative overflow-hidden border-t border-[#302719] py-16 text-center md:py-24">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a054]/10" />
              <div className="relative">
                <p className="mb-5 text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">A long-term view</p>
                <h2 className="font-serif text-5xl font-light leading-none text-[#f3efe7] md:text-8xl">A House that<br /><span className="text-[#c9a054]">remembers.</span></h2>
                <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-zinc-500">Some doors open through interest. Others reveal themselves through time.</p>
                <Link href="/whitelist-access" className="mt-10 inline-flex border border-[#c9a054] px-7 py-4 text-[9px] uppercase tracking-[0.35em] text-[#c9a054] transition-colors hover:bg-[#c9a054] hover:text-[#080706]">Explore Whitelist Access →</Link>
                <Link href="/concierge" className="mt-5 block text-[9px] uppercase tracking-[0.3em] text-zinc-700 transition-colors hover:text-[#c9a054]">Contact the Concierge</Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}