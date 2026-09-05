import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leadership & Governance | Shamim Forever',
  description: 'Shamim Forever leadership roles, governance principles, management philosophy, and long-term strategy.',
  alternates: { canonical: 'https://www.shamimforever.com/leadership-governance' },
  openGraph: {
    title: 'Leadership & Governance | Shamim Forever',
    description: 'How Shamim Forever approaches leadership, stewardship, and long-term direction.',
    url: 'https://www.shamimforever.com/leadership-governance',
    type: 'website',
  },
}

const leaders = [
  { name: 'Faisal Orakzai', role: 'Founder & Chairman', text: 'Sets the house vision, protects the long-term identity of Shamim Forever, and guides its strategic direction.', href: '/faisal-orakzai' },
  { name: 'Dr Asma Orakzai', role: 'CEO', text: 'Leads the operating vision of the house and the experience delivered to clients, partners, and the wider team.', href: '/founder-leadership' },
  { name: 'Dr Laiba Faisal Orakzai', role: 'Director', text: 'Supports the house direction, governance conversations, and the continued development of the brand.', href: '/founder-leadership' },
]

const principles = [
  ['Stewardship over short-termism', 'Decisions are evaluated against product integrity, client trust, and the ability of the house to remain meaningful over time.'],
  ['Clarity of responsibility', 'Leadership roles are named publicly where appropriate, while future operational roles are only listed once they are formally established.'],
  ['Authenticity in publication', 'The house separates confirmed public information from claims that require official documentation, certification, or legal verification.'],
  ['Craft and client care', 'Management is anchored in quality, thoughtful service, responsible communication, and respect for the people who make and own each creation.'],
]

const governanceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://www.shamimforever.com/leadership-governance#page',
  name: 'Shamim Forever Leadership & Governance',
  url: 'https://www.shamimforever.com/leadership-governance',
  about: {
    '@type': 'Organization',
    name: 'Shamim Forever',
    url: 'https://www.shamimforever.com',
    foundingDate: '2023',
    founder: [
      { '@type': 'Person', name: 'Faisal Orakzai', jobTitle: 'Founder & Chairman' },
      { '@type': 'Person', name: 'Dr Asma Orakzai', jobTitle: 'CEO' },
      { '@type': 'Person', name: 'Dr Laiba Faisal Orakzai', jobTitle: 'Director' },
    ],
  },
}

export default function LeadershipGovernancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(governanceJsonLd) }} />
      <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-32 text-zinc-200 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1050px]">
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#c9a054]">The House · Governance</p>
          <h1 className="max-w-3xl text-4xl font-light tracking-tight md:text-6xl">Leadership & Governance</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Shamim Forever is guided by a small founding leadership team and a long-term management philosophy: protect the house identity, publish responsibly, and earn trust through the quality of every detail.
          </p>

          <section className="mt-14">
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#c9a054]">Leadership</p>
            <div className="grid gap-3 md:grid-cols-3">
              {leaders.map((leader) => (
                <article key={leader.name} className="border border-[#1a1a1a] bg-[#080808] p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#c9a054]">{leader.role}</p>
                  <h2 className="mt-3 text-xl font-light text-zinc-100">{leader.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-zinc-500">{leader.text}</p>
                  <Link href={leader.href} className="mt-5 inline-block text-xs uppercase tracking-[0.22em] text-[#c9a054]">View profile →</Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-10 border-y border-[#1a1a1a] py-12 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#c9a054]">Management philosophy</p>
              <h2 className="text-3xl font-light leading-tight">Build deliberately. Communicate clearly. Leave something worth inheriting.</h2>
            </div>
            <div className="space-y-5 text-sm leading-7 text-zinc-400">
              <p>Leadership at Shamim Forever treats the brand as a house to steward rather than a campaign to exhaust. Product, technology, partnerships, and client experience should reinforce the same point of view.</p>
              <p>Where a commitment is still being developed, the house prefers to say so plainly. Public information is kept separate from legal, financial, or operational details that require formal verification.</p>
            </div>
          </section>

          <section className="mt-16">
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#c9a054]">Governance principles</p>
            <div className="grid gap-3 md:grid-cols-2">
              {principles.map(([title, text]) => (
                <article key={title} className="border border-[#1a1a1a] p-6">
                  <h2 className="text-xl font-light text-[#c9a054]">{title}</h2>
                  <p className="mt-3 text-sm leading-7 text-zinc-500">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16 border border-[#3a2c17] bg-[#100d08] p-7">
            <p className="text-xs uppercase tracking-[0.35em] text-[#c9a054]">Long-term strategy</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">The house is building a connected luxury ecosystem across fragrance, jewellery, couture, authenticity, concierge, and digital ownership. Expansion will be approached market by market, with attention to readiness, service quality, product integrity, and genuine demand.</p>
          </section>

          <div className="mt-12 flex flex-wrap gap-5 text-xs uppercase tracking-[0.25em] text-[#c9a054]">
            <Link href="/founder-leadership">Founder & leadership →</Link>
            <Link href="/corporate-information">Corporate information →</Link>
            <Link href="/policies">Policies & legal →</Link>
          </div>
        </div>
      </main>
    </>
  )
}
