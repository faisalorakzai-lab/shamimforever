import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Corporate | Shamim Forever', description: 'The official corporate profile of Shamim Forever — Sovereign Luxury House.', alternates: { canonical: 'https://www.shamimforever.com/corporate' } }

const links = [
  ['/about', 'About Shamim Forever', 'House story, philosophy, history, and vision.'],
  ['/team', 'Founder & Leadership', 'Faisal Orakzai, Dr Asma Orakzai, and Laiba Faisal Orakzai.'],
  ['/press', 'Press & Media', 'Official description, coverage, assets, and enquiries.'],
  ['/brand-facts', 'Brand Facts', 'A concise factual reference for the house.'],
  ['/corporate-information', 'Corporate Information', 'Public information and governance principles.'],
  ['/sustainability', 'Sustainability', 'Responsible sourcing, longevity, care, and standards.'],
  ['/careers', 'Careers', 'Future opportunities and house culture.'],
  ['/investor-relations', 'Investor Relations', 'Partnership and expansion principles.'],
  ['/news', 'Newsroom', 'Announcements, launches, and company news.'],
  ['/authenticate', 'Authenticity & Digital Passport', 'Product identity, provenance, and verification.'],
]

export default function CorporatePage() {
  return <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-32 text-zinc-200 md:px-12 lg:px-20">
    <div className="mx-auto max-w-[1050px]">
      <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#c9a054]">The House · Corporate</p>
      <h1 className="text-4xl font-light tracking-tight md:text-6xl">About Shamim Forever</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">The official home for the story, people, facts, standards, and future direction of Shamim Forever — Sovereign Luxury House.</p>
      <div className="mt-12 grid gap-10 border-y border-[#1a1a1a] py-12 md:grid-cols-2">
        <div><p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#c9a054]">What is Shamim Forever?</p><h2 className="text-3xl font-light">A house built around identity, craft, and lasting meaning.</h2></div>
        <div className="space-y-4 text-sm leading-7 text-zinc-400"><p>Shamim Forever is a luxury goods brand founded in 2023 by Faisal Orakzai. The house presents fragrance, jewellery, couture, and collector experiences through a point of view shaped by heritage and modern digital identity.</p><p>Its philosophy is personal, considered, and built to be remembered. Sovereign Luxury House describes the commitment to independent expression and deliberate craft.</p></div>
      </div>
      <p className="mb-6 mt-16 text-xs uppercase tracking-[0.4em] text-[#c9a054]">Corporate directory</p>
      <div className="grid gap-3 md:grid-cols-2">{links.map(([href, title, text]) => <Link key={href} href={href} className="group border border-[#1a1a1a] bg-[#080808] p-6 transition-colors hover:border-[#c9a054]/50"><p className="text-xl font-light text-zinc-100 group-hover:text-[#c9a054]">{title} <span className="text-sm text-[#c9a054]/60">↗</span></p><p className="mt-3 text-sm leading-6 text-zinc-500">{text}</p></Link>)}</div>
      <div className="mt-16 border-t border-[#1a1a1a] pt-8"><Link href="/policies" className="text-xs uppercase tracking-[0.25em] text-[#c9a054]">Policies & legal →</Link></div>
    </div>
  </main>
}
