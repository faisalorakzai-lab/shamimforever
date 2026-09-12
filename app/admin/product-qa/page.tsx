'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type AuditRow = {
  id: string
  name: string
  category: 'perfume' | 'cosmetics' | 'jewelry' | 'other'
  url: string
  completionStatus: 'completed' | 'needs-data'
  imageStatus: 'present' | 'missing' | 'broken'
  videoStatus: 'present' | 'not-provided' | 'broken'
  seoStatus: 'ready' | 'needs-data'
  schemaStatus: 'ready' | 'needs-data'
  passportStatus: 'enabled' | 'archive-only'
  issues: string[]
}

type AuditReport = {
  total: number
  completed: number
  needsReview: number
  missingData: number
  brokenAssets: number
  brokenVideos: number
  seoIssues: number
  schemaIssues: number
  byCategory: Record<'perfume' | 'cosmetics' | 'jewelry' | 'other', number>
  rows: AuditRow[]
}

const categoryLabels: Record<AuditRow['category'], string> = {
  perfume: 'Perfume',
  cosmetics: 'Cosmetics',
  jewelry: 'Jewelry',
  other: 'Other',
}

function Metric({ label, value, tone = 'normal' }: { label: string; value: number; tone?: 'normal' | 'warn' }) {
  return (
    <div className="border border-[#1b1814] bg-[#080706] p-5">
      <p className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">{label}</p>
      <p className={`mt-3 font-serif text-3xl font-light ${tone === 'warn' ? 'text-amber-300' : 'text-[#f0ece4]'}`}>{value}</p>
    </div>
  )
}

export default function ProductQaPage() {
  const [report, setReport] = useState<AuditReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'needs-data'>('all')
  const [category, setCategory] = useState<'all' | AuditRow['category']>('all')

  async function loadReport() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/product-qa', { cache: 'no-store' })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Unable to load the product report')
      setReport(payload)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load the product report')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void loadReport() }, [])

  const rows = useMemo(() => {
    if (!report) return []
    return report.rows.filter(row => {
      const statusMatch = filter === 'all' || row.completionStatus === 'needs-data'
      const categoryMatch = category === 'all' || row.category === category
      return statusMatch && categoryMatch
    })
  }, [report, filter, category])

  return (
    <main className="min-h-screen bg-[#050505] p-8 text-zinc-300 md:p-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <Link href="/admin" className="text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">Executive Panel</Link>
            <h1 className="mt-4 font-serif text-4xl font-light uppercase tracking-[0.18em] text-zinc-100">Product QA</h1>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-zinc-600">A live readiness report for the data-driven catalog engine. It checks every active product without creating placeholder provenance, reviews, ratings, or blockchain records.</p>
          </div>
          <button onClick={() => void loadReport()} className="border border-[#c9a054]/40 px-5 py-3 text-[8px] uppercase tracking-[0.3em] text-[#c9a054] hover:bg-[#c9a054]/10">Refresh report</button>
        </div>

        {loading && <p className="py-16 text-center text-[9px] uppercase tracking-[0.4em] text-zinc-600">Reading the House catalog...</p>}
        {error && <div className="border border-red-900/40 bg-red-950/10 p-5 text-sm text-red-300">{error}</div>}

        {report && (
          <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Metric label="Total products" value={report.total} />
              <Metric label="Completed" value={report.completed} />
              <Metric label="Needs review" value={report.needsReview} tone="warn" />
              <Metric label="Missing images" value={report.brokenAssets} tone="warn" />
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Metric label="Perfumes" value={report.byCategory.perfume} />
              <Metric label="Cosmetics" value={report.byCategory.cosmetics} />
              <Metric label="Jewelry" value={report.byCategory.jewelry} />
              <Metric label="Other luxury" value={report.byCategory.other} />
            </div>

            <div className="mt-10 flex flex-wrap gap-3 border-b border-[#1b1814] pb-4">
              <select value={filter} onChange={event => setFilter(event.target.value as typeof filter)} className="bg-[#080706] px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-zinc-400 outline-none">
                <option value="all">All products</option>
                <option value="needs-data">Needs data</option>
              </select>
              <select value={category} onChange={event => setCategory(event.target.value as typeof category)} className="bg-[#080706] px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-zinc-400 outline-none">
                <option value="all">All categories</option>
                {Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
              <p className="self-center text-[9px] uppercase tracking-[0.25em] text-zinc-700">{rows.length} shown</p>
            </div>

            <div className="mt-5 overflow-x-auto border border-[#151210]">
              <div className="min-w-[980px]">
                <div className="grid grid-cols-[2fr_1fr_1.2fr_1fr_1fr_1fr_1fr] gap-3 border-b border-[#151210] bg-[#080706] px-5 py-3 text-[7px] uppercase tracking-[0.3em] text-zinc-700">
                  <span>Product</span><span>Category</span><span>Status</span><span>Image</span><span>Video</span><span>SEO</span><span>Passport</span>
                </div>
                {rows.map(row => (
                  <div key={row.id} className="grid grid-cols-[2fr_1fr_1.2fr_1fr_1fr_1fr_1fr] gap-3 border-b border-[#111] px-5 py-4 text-[10px]">
                    <div>
                      <Link href={row.url} target="_blank" className="text-zinc-300 hover:text-[#c9a054]">{row.name}</Link>
                      {row.issues.length > 0 && <p className="mt-1 text-[9px] text-amber-400/80">{row.issues.join(' · ')}</p>}
                    </div>
                    <span className="text-zinc-600">{categoryLabels[row.category]}</span>
                    <span className={row.completionStatus === 'completed' ? 'text-emerald-400' : 'text-amber-300'}>{row.completionStatus === 'completed' ? 'Ready' : 'Needs data'}</span>
                    <span className={row.imageStatus === 'present' ? 'text-emerald-400' : 'text-red-400'}>{row.imageStatus}</span>
                    <span className={row.videoStatus === 'present' ? 'text-emerald-400' : row.videoStatus === 'broken' ? 'text-red-400' : 'text-zinc-600'}>{row.videoStatus === 'present' ? 'Present' : row.videoStatus === 'broken' ? 'Broken' : 'Image fallback'}</span>
                    <span className={row.seoStatus === 'ready' ? 'text-emerald-400' : 'text-amber-300'}>{row.seoStatus}</span>
                    <span className="text-zinc-600">{row.passportStatus === 'enabled' ? 'Enabled' : 'Archive only'}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}