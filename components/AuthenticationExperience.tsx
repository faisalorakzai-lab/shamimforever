'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { AuthenticationStatus, PublicAuthenticationRecord } from '@/lib/authentication'

type LookupResult = {
  status: AuthenticationStatus
  record: PublicAuthenticationRecord | null
  message?: string
}

const ease = [0.16, 1, 0.3, 1] as const

const statusStyles: Record<AuthenticationStatus, { label: string; dot: string; border: string; text: string }> = {
  Authentic: { label: 'Authentic', dot: 'bg-emerald-400', border: 'border-emerald-900/50', text: 'text-emerald-400' },
  Pending: { label: 'Pending', dot: 'bg-amber-400', border: 'border-amber-900/50', text: 'text-amber-400' },
  Transferred: { label: 'Transferred', dot: 'bg-sky-400', border: 'border-sky-900/50', text: 'text-sky-400' },
  Archived: { label: 'Archived', dot: 'bg-zinc-400', border: 'border-zinc-700', text: 'text-zinc-300' },
  Suspended: { label: 'Suspended', dot: 'bg-red-400', border: 'border-red-900/50', text: 'text-red-400' },
  'Not Found': { label: 'Not Found', dot: 'bg-red-400', border: 'border-red-900/50', text: 'text-red-400' },
  Invalid: { label: 'Invalid', dot: 'bg-red-400', border: 'border-red-900/50', text: 'text-red-400' },
}

function formatDate(value?: string) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

function StatusBadge({ status }: { status: AuthenticationStatus }) {
  const style = statusStyles[status]
  return (
    <span className={`inline-flex items-center gap-2 border ${style.border} px-3 py-2 ${style.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      <span className="text-[9px] tracking-[0.35em] uppercase">{style.label}</span>
    </span>
  )
}

function DataRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1 border-b border-[#151515] px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <span className="text-[8px] tracking-[0.35em] uppercase text-zinc-600">{label}</span>
      <span className="font-mono text-[11px] text-zinc-300 sm:text-right">{value}</span>
    </div>
  )
}

export default function AuthenticationExperience({ initialSerial }: { initialSerial?: string }) {
  const [input, setInput] = useState(initialSerial ?? '')
  const [serial, setSerial] = useState(initialSerial ?? '')
  const [result, setResult] = useState<LookupResult | null>(null)
  const [loading, setLoading] = useState(false)

  const lookup = useCallback(async (value: string) => {
    const normalized = value.trim().toUpperCase()
    if (!normalized) {
      setResult({ status: 'Invalid', record: null, message: 'Enter the Sovereign Serial printed on the creation or its certificate.' })
      return
    }

    setInput(normalized)
    setSerial(normalized)
    setLoading(true)
    try {
      const response = await fetch(`/api/authenticate?serial=${encodeURIComponent(normalized)}`, { cache: 'no-store' })
      const data = (await response.json()) as LookupResult
      setResult(data)
    } catch {
      setResult({ status: 'Pending', record: null, message: 'The registry is temporarily unavailable. Please try again.' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialSerial) void lookup(initialSerial)
  }, [initialSerial, lookup])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void lookup(input)
  }

  const status = result?.status
  const record = result?.record
  const statusStyle = status ? statusStyles[status] : null
  const recordPath = record ? `/authenticate/${encodeURIComponent(record.serial)}` : null

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-zinc-100">
      <section className="relative border-b border-[#151515]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_65%_at_50%_0%,rgba(201,160,84,0.08),transparent_70%)]" />
        <div className="relative mx-auto max-w-[1180px] px-5 pb-16 pt-24 md:px-12 md:pb-24 lg:px-20">
          <p className="mb-6 text-[9px] tracking-[0.6em] uppercase text-[#c9a054]">Digital Provenance · Sovereign Registry</p>
          <h1 className="max-w-3xl font-serif text-5xl font-light leading-[1.05] tracking-[0.06em] md:text-7xl">
            Authenticate<br />
            <span className="text-zinc-500 italic">Your Creation</span>
          </h1>
          <p className="mt-7 max-w-xl text-sm font-light leading-7 text-zinc-500">
            Enter the Sovereign Serial to check the public registry record for a Shamim Forever creation.
            The result reflects the record currently available to the House verification service.
          </p>
        </div>
      </section>

      <section className="border-b border-[#151515]">
        <div className="mx-auto max-w-[920px] px-5 py-10 md:px-12 md:py-14">
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="sovereign-serial" className="sr-only">Sovereign Serial</label>
            <input
              id="sovereign-serial"
              value={input}
              onChange={(event) => setInput(event.target.value.toUpperCase())}
              placeholder="SF-RO-2026-00001"
              autoComplete="off"
              spellCheck={false}
              className="min-h-14 flex-1 border border-[#242424] bg-[#090909] px-5 font-mono text-sm text-zinc-200 outline-none transition-colors placeholder:text-zinc-700 focus:border-[#c9a054]/60"
            />
            <button
              type="submit"
              disabled={loading}
              className="min-h-14 border border-[#c9a054]/60 px-8 text-[9px] tracking-[0.45em] uppercase text-[#c9a054] transition-colors hover:bg-[#c9a054] hover:text-[#050505] disabled:cursor-wait disabled:opacity-50"
            >
              {loading ? 'Checking…' : 'Verify Serial →'}
            </button>
          </form>
          <p className="mt-3 text-[8px] tracking-[0.2em] uppercase leading-5 text-zinc-700">
            Format: SF-[CATEGORY]-[YEAR]-[NUMBER]. Found on the creation, certificate, or inner packaging seal.
          </p>
        </div>
      </section>

      {result && (
        <section className="mx-auto max-w-[1180px] px-5 py-12 md:px-12 md:py-16 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <div className={`flex flex-col gap-4 border ${statusStyle?.border ?? 'border-[#242424]'} bg-[#090909] p-5 sm:flex-row sm:items-center sm:justify-between`}>
              <div>
                <p className="mb-2 text-[8px] tracking-[0.45em] uppercase text-zinc-600">Registry response</p>
                <p className={`text-sm font-light ${statusStyle?.text ?? 'text-zinc-300'}`}>{result.message ?? 'Public record located.'}</p>
              </div>
              <StatusBadge status={status ?? 'Invalid'} />
            </div>

            {record ? (
              <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="border border-[#1a1a1a] bg-[#080808]">
                  <div className="border-b border-[#1a1a1a] px-5 py-4">
                    <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054]">Public verification certificate</p>
                  </div>
                  <div className="p-5 md:p-8">
                    <p className="font-mono text-xs tracking-[0.18em] text-zinc-500">{record.serial}</p>
                    <h2 className="mt-6 font-serif text-3xl font-light tracking-wide text-zinc-100">
                      {record.productName ?? 'Shamim Forever Creation'}
                    </h2>
                    <p className="mt-3 max-w-md text-sm font-light leading-6 text-zinc-500">
                      This certificate shows the public fields returned by the House registry. It is not a transfer document,
                      ownership certificate, or automatic legal determination.
                    </p>
                    <div className="mt-8 grid gap-0 border border-[#171717]">
                      <DataRow label="Status" value={record.status} />
                      <DataRow label="Registry record" value={record.registry} />
                      <DataRow label="Category" value={record.category} />
                      <DataRow label="Atelier / provenance" value={record.atelier} />
                      <DataRow label="Edition tier" value={record.rarityTier} />
                      <DataRow label="Recorded" value={formatDate(record.recordedAt)} />
                      <DataRow label="Manufacture date" value={formatDate(record.manufactureDate)} />
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {record.onChain && (
                    <div className="border border-[#1a1a1a] bg-[#080808] p-5 md:p-8">
                      <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054]">Technical record</p>
                      <p className="mt-4 text-sm font-light leading-6 text-zinc-500">
                        Blockchain details are shown only because this registry record contains them. Their presence does not
                        replace physical inspection or establish a royalty entitlement.
                      </p>
                      <div className="mt-6 space-y-4">
                        <DataRow label="Network" value={record.onChain.network} />
                        <DataRow label="Token ID" value={record.onChain.tokenId} />
                        <div className="border-b border-[#151515] pb-4">
                          <p className="mb-2 text-[8px] tracking-[0.35em] uppercase text-zinc-600">Transaction hash</p>
                          {record.onChain.explorerUrl ? (
                            <a href={record.onChain.explorerUrl} target="_blank" rel="noreferrer" className="break-all font-mono text-[10px] text-[#c9a054] hover:underline">
                              {record.onChain.transactionHash} ↗
                            </a>
                          ) : (
                            <p className="break-all font-mono text-[10px] text-zinc-400">{record.onChain.transactionHash}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border border-[#1a1a1a] bg-[#080808] p-5 md:p-8">
                    <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-600">Record access</p>
                    <p className="mt-4 text-sm font-light leading-6 text-zinc-500">
                      QR and NFC labels should point to the individual record URL below. Public lookup does not expose holder
                      identity, wallet addresses, private notes, or internal House review fields.
                    </p>
                    {recordPath && (
                      <Link href={recordPath} className="mt-6 block break-all border border-[#242424] px-4 py-3 font-mono text-[10px] text-[#c9a054] transition-colors hover:border-[#c9a054]/60">
                        {recordPath} →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 border border-[#1a1a1a] bg-[#080808] p-6 md:p-8">
                <p className="text-sm font-light leading-7 text-zinc-500">
                  Check the serial carefully against the creation and its certificate. A Not Found or Invalid result is a
                  verification signal, not an automatic finding that an item is counterfeit or that any party has acted unlawfully.
                </p>
              </div>
            )}
          </motion.div>
        </section>
      )}

      <section className="border-t border-[#151515]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-14 md:grid-cols-3 md:px-12 md:py-20 lg:px-20">
          <div>
            <p className="mb-4 text-[#c9a054]">01</p>
            <h2 className="font-serif text-xl font-light tracking-wide text-zinc-200">Public registry layer</h2>
            <p className="mt-3 text-sm font-light leading-6 text-zinc-600">Serial, status, and selected creation details available for an open verification check.</p>
          </div>
          <div>
            <p className="mb-4 text-[#c9a054]">02</p>
            <h2 className="font-serif text-xl font-light tracking-wide text-zinc-200">Verified-holder layer</h2>
            <p className="mt-3 text-sm font-light leading-6 text-zinc-600">Holder-specific information is not published on this page. Access requires a separate authenticated House workflow.</p>
          </div>
          <div>
            <p className="mb-4 text-[#c9a054]">03</p>
            <h2 className="font-serif text-xl font-light tracking-wide text-zinc-200">Internal House layer</h2>
            <p className="mt-3 text-sm font-light leading-6 text-zinc-600">Operational notes, review evidence, and case handling remain internal and are never inferred from a public lookup.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-12 md:py-20 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054]">If a result does not match</p>
            <h2 className="mt-5 font-serif text-3xl font-light leading-tight text-zinc-200">Preserve the record before you act.</h2>
          </div>
          <div className="space-y-5 text-sm font-light leading-7 text-zinc-500">
            <p>Photograph the serial, certificate, seal, packaging, and purchase documentation. Keep the item and its packaging together while the House reviews the record.</p>
            <p>Do not rely on screenshots, marketplace descriptions, or an isolated blockchain reference as a substitute for physical inspection.</p>
            <a href="mailto:authenticity@shamimforever.com" className="inline-block border border-[#242424] px-5 py-3 text-[9px] tracking-[0.35em] uppercase text-[#c9a054] transition-colors hover:border-[#c9a054]/60">
              Request House review →
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-[#151515]">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-12 md:py-20 lg:px-20">
          <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054]">Verification questions</p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {[
              ['What does Authentic mean?', 'It means the public registry returned an active record that meets the current House status rules. It does not disclose holder identity or replace examination of the physical creation.'],
              ['What does Pending mean?', 'The serial is present in a registry, but the record does not currently contain the signals required for an Authentic result.'],
              ['Why can a record be Transferred?', 'The registry may record a transfer or ownership-cycle change. This public page does not publish the identities of previous or current holders.'],
              ['Does ERC-2981 guarantee royalties?', 'No. ERC-2981 is a royalty information standard. Marketplaces and secondary-sale venues decide whether and how to honour it; the standard alone does not force payment.'],
            ].map(([question, answer]) => (
              <div key={question} className="border-t border-[#242424] pt-5">
                <h3 className="font-serif text-lg font-light text-zinc-200">{question}</h3>
                <p className="mt-3 text-sm font-light leading-6 text-zinc-600">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}