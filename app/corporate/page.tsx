import type { Metadata } from 'next'
import Link from 'next/link'

const siteUrl = 'https://www.shamimforever.com'
const pageUrl = `${siteUrl}/corporate`

export const metadata: Metadata = {
  title: { absolute: 'Shamim Forever Corporate | Leadership, Governance & Institutional Information' },
  description:
    'Explore Shamim Forever Corporate: leadership, governance, company information, sustainability, investor relations, media, careers, policies and institutional resources.',
  keywords: [
    'Shamim Forever Corporate',
    'Shamim Forever company',
    'Shamim Forever leadership',
    'Shamim Forever founder',
    'Shamim Forever governance',
    'Shamim Forever sustainability',
    'Shamim Forever investor relations',
    'Shamim Forever careers',
    'Shamim Forever newsroom',
    'sovereign luxury house',
    'luxury brand corporate governance',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Shamim Forever Corporate | The Institution Behind the House',
    description:
      'The official institutional hub for Shamim Forever leadership, governance, standards, company information, media, careers and legal resources.',
    url: pageUrl,
    siteName: 'Shamim Forever',
    type: 'website',
    images: [{ url: '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever — Sovereign Luxury House' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shamim Forever Corporate',
    description: 'Leadership, governance, responsibility and institutional information behind the House.',
    images: ['/logo-sf.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

const glance = [
  ['Public identity', 'Shamim Forever', 'Sovereign Luxury House'],
  ['Founded', '2023', 'Publicly stated founding year'],
  ['Founder & Chairman', 'Faisal Orakzai', 'Founder and long-term steward'],
  ['Global headquarters', 'Puteaux, France', 'Paris La Défense region'],
]

const pillars = [
  ['01', 'People', 'Leadership, craftsmanship and talent form the human framework of the House.'],
  ['02', 'Principles', 'Governance, ethics, responsibility and clear publication standards guide decisions.'],
  ['03', 'Permanence', 'Long-term value, heritage and institutional continuity take precedence over short-term noise.'],
]

const divisions = [
  ['Luxury & Fashion', 'Design, collections, couture, ready-to-wear and seasonal expressions.'],
  ['Fragrance', 'Original compositions, bespoke scent experiences and olfactory archives.'],
  ['Jewellery', 'Fine jewellery, heritage objects and private commissions.'],
  ['Bespoke Atelier', 'Custom garments, ceremonial pieces and one-of-one creations.'],
  ['Private Client Services', 'Concierge, appointments, private shopping and client relationship care.'],
  ['Digital Experiences', 'Identity, provenance, digital access and emerging technology.'],
]

const directoryGroups = [
  {
    number: '01',
    label: 'House & leadership',
    audience: 'For people seeking the people, purpose and direction behind the House.',
    links: [
      ['/about', 'About the House', 'Identity, philosophy, history and public mission.'],
      ['/founder-leadership', 'Founder & Leadership', 'The people responsible for vision and stewardship.'],
      ['/corporate/leadership-governance', 'Leadership & Governance', 'Roles, management principles and accountability.'],
    ],
  },
  {
    number: '02',
    label: 'Facts, standards & governance',
    audience: 'For fact-checking, partners and readers looking for responsible public information.',
    links: [
      ['/brand-facts', 'Brand Facts', 'A concise factual reference for Shamim Forever.'],
      ['/corporate-information', 'Corporate Information', 'Confirmed public information and verification notes.'],
      ['/sustainability', 'Sustainability', 'Materials, longevity, operations and future commitments.'],
      ['/policies', 'Policies & Legal', 'Public policy, terms, privacy and legal resources.'],
    ],
  },
  {
    number: '03',
    label: 'Public communications',
    audience: 'For journalists, editors, publishers and readers following the House.',
    links: [
      ['/press-media', 'Press & Media', 'Official descriptions, media enquiries and editorial resources.'],
      ['/newsroom', 'Newsroom', 'Announcements, launches, partnerships and House news.'],
      ['/corporate/faq', 'Corporate FAQ', 'Direct answers about identity, structure and contact routes.'],
      ['/whitepapers', 'Research & White Papers', 'The separate research and knowledge repository.'],
    ],
  },
  {
    number: '04',
    label: 'Opportunities & relationships',
    audience: 'For candidates, investors, partners and clients seeking the right point of contact.',
    links: [
      ['/careers', 'Careers', 'Creative, atelier, technology, operations and corporate opportunities.'],
      ['/investor-relations', 'Investor Relations', 'Private investor and strategic partnership information.'],
      ['/concierge', 'Concierge', 'Private client assistance and House enquiries.'],
      ['/authenticate', 'Authenticity & Provenance', 'Product identity, provenance and verification.'],
    ],
  },
]

const corporateSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${pageUrl}#page`,
      url: pageUrl,
      name: 'Shamim Forever Corporate',
      description: metadata.description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      mainEntity: { '@id': `${pageUrl}#directory` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Corporate', item: pageUrl },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#directory`,
      name: 'Shamim Forever Corporate Directory',
      description: 'Official institutional resources for Shamim Forever.',
      itemListElement: directoryGroups.flatMap((group) =>
        group.links.map(([url, name], index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name,
          url: `${siteUrl}${url}`,
        })),
      ),
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Shamim Forever',
      url: siteUrl,
      logo: `${siteUrl}/logo-sf.png`,
      description: 'A sovereign luxury house built around craftsmanship, identity, provenance and lasting value.',
      foundingDate: '2023',
      founder: { '@type': 'Person', name: 'Faisal Orakzai', jobTitle: 'Founder & Chairman' },
      address: { '@type': 'PostalAddress', addressLocality: 'Puteaux', addressRegion: 'Hauts-de-Seine', addressCountry: 'FR' },
      knowsAbout: ['Luxury goods', 'Bespoke fragrance', 'Jewellery', 'Couture', 'Private client services', 'Digital provenance'],
    },
  ],
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[9px] uppercase tracking-[0.52em] text-[#c9a054]">{children}</p>
}

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#c9a054] transition-colors hover:text-[#f1d28d]">
      {children}
      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
    </Link>
  )
}

export default function CorporatePage() {
  return (
    <>
      <script id="corporate-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateSchema).replace(/</g, '\\u003c') }} />
      <main className="min-h-screen bg-[#050505] text-zinc-200">
        <section className="relative overflow-hidden border-b border-[#1b1814] px-6 pb-24 pt-32 md:px-12 md:pb-32 lg:px-20">
          <div className="pointer-events-none absolute -right-24 top-10 select-none font-serif text-[25rem] font-light leading-none text-[#c9a054]/[0.025]">C</div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[580px] bg-[radial-gradient(ellipse_at_58%_0%,rgba(201,160,84,0.11),transparent_62%)]" />
          <div className="relative mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <SectionLabel>Corporate · Public record</SectionLabel>
              <h1 className="mt-7 max-w-4xl font-serif text-5xl font-light leading-[0.95] tracking-tight text-[#eee9df] md:text-8xl">
                The Institution
                <br />
                <span className="text-[#c9a054]">Behind the House</span>
              </h1>
              <p className="mt-9 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
                Corporate governance, leadership, operations, responsibility and long-term stewardship behind Shamim Forever.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">
                Shamim Forever is built not only as a luxury house, but as an institution designed around enduring value, disciplined governance, craftsmanship, innovation and permanence.
              </p>
              <div className="mt-11 flex flex-wrap gap-4">
                <a href="#directory" className="border border-[#c9a054] px-7 py-3 text-[10px] uppercase tracking-[0.35em] text-[#c9a054] transition hover:bg-[#c9a054] hover:text-[#050505]">Explore Corporate</a>
                <ArrowLink href="/investor-relations">Investor Relations</ArrowLink>
              </div>
            </div>
            <aside className="border-l border-[#2a241a] pl-7 lg:mb-2">
              <SectionLabel>Institutional brief</SectionLabel>
              <p className="mt-5 max-w-xs font-serif text-3xl font-light leading-tight text-[#d8ccb9]">Leadership. Governance. Responsibility. Permanence.</p>
              <div className="mt-8 space-y-3 text-[9px] uppercase tracking-[0.32em] text-zinc-600">
                <p>Official information hub</p>
                <p>Separate from Learn</p>
                <p>Built for clarity</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-[#1b1814] bg-[#080808] px-6 py-20 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <SectionLabel>At a glance</SectionLabel>
                <h2 className="mt-5 max-w-sm font-serif text-4xl font-light leading-tight text-[#eee9df] md:text-5xl">A clear public reference.</h2>
              </div>
              <dl className="grid border-y border-[#211d17] sm:grid-cols-2">
                {glance.map(([label, value, note]) => (
                  <div key={label} className="border-b border-[#211d17] px-0 py-6 sm:px-5 sm:odd:border-r md:px-7">
                    <dt className="text-[9px] uppercase tracking-[0.35em] text-[#c9a054]">{label}</dt>
                    <dd className="mt-3 text-xl font-light text-zinc-100">{value}</dd>
                    <p className="mt-2 text-xs leading-5 text-zinc-600">{note}</p>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-8 max-w-3xl text-xs leading-6 text-zinc-600">Legal registration details, financial figures, certifications and formal structures are not published here unless supported by official documentation. The Corporate directory separates confirmed public information from future or proposed work.</p>
          </div>
        </section>

        <section className="border-b border-[#1b1814] px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <SectionLabel>A House built to endure</SectionLabel>
                <h2 className="mt-5 max-w-md font-serif text-4xl font-light leading-tight text-[#eee9df] md:text-6xl">The operating principles behind the name.</h2>
              </div>
              <div className="grid divide-y divide-[#211d17] border-y border-[#211d17]">
                {pillars.map(([number, title, text]) => (
                  <article key={number} className="grid gap-5 py-7 sm:grid-cols-[60px_180px_1fr] sm:items-start">
                    <span className="text-[10px] tracking-[0.3em] text-[#c9a054]">{number}</span>
                    <h3 className="text-2xl font-light text-zinc-100">{title}</h3>
                    <p className="max-w-md text-sm leading-7 text-zinc-500">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#1b1814] bg-[#080808] px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SectionLabel>Architecture of the House</SectionLabel>
                <h2 className="mt-5 font-serif text-4xl font-light text-[#eee9df] md:text-6xl">One institution. Many expressions.</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-zinc-600">The House operates across connected creative, service and digital disciplines while preserving one clear point of view.</p>
            </div>
            <div className="mt-14 grid gap-px border border-[#211d17] bg-[#211d17] sm:grid-cols-2 lg:grid-cols-3">
              {divisions.map(([title, text]) => (
                <article key={title} className="bg-[#080808] p-7 transition-colors hover:bg-[#0d0c0a]">
                  <h3 className="text-xl font-light text-[#d9c39b]">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-500">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="directory" className="scroll-mt-10 px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="max-w-2xl">
              <SectionLabel>Corporate directory</SectionLabel>
              <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-[#eee9df] md:text-6xl">Find the official record.</h2>
              <p className="mt-6 text-base leading-8 text-zinc-500">Corporate is the institutional counterpart to Learn. It answers who leads the House, what is publicly confirmed, where standards are documented and how to reach the right function.</p>
            </div>
            <div className="mt-16 space-y-16">
              {directoryGroups.map((group) => (
                <section key={group.number} className="grid gap-8 border-t border-[#211d17] pt-7 lg:grid-cols-[90px_0.72fr_1.28fr]">
                  <p className="text-[10px] tracking-[0.3em] text-[#c9a054]">{group.number}</p>
                  <div>
                    <h3 className="font-serif text-3xl font-light text-[#eee9df]">{group.label}</h3>
                    <p className="mt-4 max-w-xs text-xs leading-6 text-zinc-600">{group.audience}</p>
                  </div>
                  <div className="divide-y divide-[#211d17] border-y border-[#211d17]">
                    {group.links.map(([href, title, text]) => (
                      <Link key={href} href={href} className="group flex items-center justify-between gap-6 py-5">
                        <span>
                          <span className="block text-lg font-light text-zinc-200 transition-colors group-hover:text-[#c9a054]">{title}</span>
                          <span className="mt-1 block text-xs leading-5 text-zinc-600">{text}</span>
                        </span>
                        <span className="shrink-0 text-[#c9a054] transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#211d17] bg-[#0a0907] px-6 py-20 md:px-12 lg:px-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <SectionLabel>Corporate relations</SectionLabel>
              <h2 className="mt-5 max-w-2xl font-serif text-4xl font-light leading-tight text-[#eee9df] md:text-5xl">For a question that needs a person, not a page.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">For institutional, partnership, media or private client enquiries, the House routes each conversation through the appropriate team.</p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <a href="mailto:relations@shamimforever.com" className="text-sm text-[#c9a054] transition hover:text-[#f1d28d]">relations@shamimforever.com</a>
              <a href="mailto:media@shamimforever.com" className="text-sm text-[#c9a054] transition hover:text-[#f1d28d]">media@shamimforever.com</a>
              <ArrowLink href="/corporate/faq">Read Corporate FAQ</ArrowLink>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
