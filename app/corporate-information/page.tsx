import type { Metadata } from 'next'
import Link from 'next/link'

const CANONICAL_URL = 'https://www.shamimforever.com/corporate-information'

export const metadata: Metadata = {
  title: 'Corporate Information — The House, Defined',
  description:
    'The authoritative corporate record of Shamim Forever: a sovereign luxury house spanning craftsmanship, private client service, digital infrastructure, heritage and legacy.',
  keywords: [
    'Shamim Forever corporate information',
    'Shamim Forever company',
    'sovereign luxury house',
    'Shamim Forever headquarters',
    'Shamim Forever leadership',
    'Shamim Forever corporate contact',
    'Shamim Forever institutional record',
  ],
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: 'Corporate Information — The House, Defined',
    description:
      'The institutional record of Shamim Forever, a sovereign luxury house built from love and forged into legacy.',
    url: CANONICAL_URL,
    type: 'website',
    siteName: 'Shamim Forever',
    locale: 'en_US',
    images: [
      {
        url: '/logo-sf.png',
        width: 512,
        height: 512,
        alt: 'Shamim Forever — Sovereign Luxury House',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Information — Shamim Forever',
    description:
      'The authoritative institutional record of the Shamim Forever luxury house.',
    images: ['/logo-sf.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const facts = [
  ['House', 'Shamim Forever'],
  ['Institutional positioning', 'Sovereign Luxury House'],
  ['Brand line', 'Built From Love. Forged Into Legacy.'],
  ['Global headquarters', 'Puteaux, France'],
  ['Official website', 'shamimforever.com'],
  ['Core domains', 'Luxury · Bespoke · Experience · Technology · Heritage'],
]

const principles = [
  ['Elegance', 'Quiet confidence rather than excessive display.'],
  ['Permanence', 'Creating things intended to survive trends.'],
  ['Authenticity', 'Clear provenance and truthful representation.'],
  ['Craftsmanship', 'Respect for human skill, detail and precision.'],
  ['Innovation', 'Technology used to improve the experience rather than merely decorate it.'],
  ['Privacy', 'Respect for clients, partners and sensitive information.'],
  ['Legacy', 'A long-term perspective extending beyond individual products and campaigns.'],
]

const activities = [
  ['Luxury Products', 'Design, development and distribution of selected luxury products and objects.'],
  ['Bespoke', 'Customised products and experiences developed according to individual client requirements.'],
  ['Private Client Services', 'Relationship-based services designed around privacy, personalisation and continuity.'],
  ['Digital Luxury', 'Technology-enabled experiences, digital identity, authentication and private access systems.'],
  ['Heritage', 'Documentation, preservation and presentation of cultural and historical material associated with the House.'],
  ['Hospitality', 'Curated environments, experiences and hospitality-oriented initiatives.'],
  ['Intellectual Property', 'Development and management of trademarks, designs, digital assets, publications, proprietary systems and creative works.'],
]

const architecture = [
  ['The House', 'Institutional identity and culture.'],
  ['Craft', 'Products, materials, artisanship and design.'],
  ['Experience', 'Private client relationships, hospitality and personalised services.'],
  ['Infrastructure', 'Digital systems, archives, authentication, private access and operational architecture.'],
  ['Legacy', 'Preservation, knowledge, heritage and intergenerational continuity.'],
]

const structure = [
  ['01', 'Holding / Corporate Layer', 'Strategic direction, corporate identity, governance, intellectual property, institutional standards, risk and legal coordination.'],
  ['02', 'House Layer', 'Brand expression, design language, product philosophy, client experience, heritage and cultural identity.'],
  ['03', 'Operating Layer', 'Products, services, ateliers, boutiques, digital platforms, private client operations and partnerships.'],
  ['04', 'Infrastructure Layer', 'Authentication, archives, digital identity, private access, data systems, security and technology.'],
  ['05', 'Legacy Layer', 'Heritage preservation, documentation, sustainability, cultural projects, education and future-generation initiatives.'],
]

const contacts = [
  ['Corporate Relations', 'relations@shamimforever.com', 'Institutional enquiries, official corporate correspondence and partnerships.'],
  ['Media', 'media@shamimforever.com', 'Press requests, approved brand assets and media enquiries.'],
  ['Concierge', 'concierge@shamimforever.com', 'Private client guidance and House access.'],
  ['Bespoke', 'bespoke@shamimforever.com', 'Bespoke products and private commissions.'],
  ['Maison / Boutiques', 'maisons@shamimforever.com', 'Maison, boutique and hospitality enquiries.'],
]

const documents = [
  ['Corporate Profile', 'Institutional reference', 'SF-CORP-PROFILE'],
  ['Corporate Fact Sheet', 'House facts and official references', 'SF-CORP-FACT-001'],
  ['Governance Documents', 'Governance reference', 'SF-GOV-001'],
  ['Sustainability Reports', 'Responsibility and progress', 'SF-SUS-001'],
  ['White Papers', 'Research and long-form publications', 'SF-WP-001'],
  ['Press Kits', 'Approved media resources', 'SF-MEDIA-001'],
]

const faqs = [
  ['What is Shamim Forever?', 'Shamim Forever is a sovereign luxury house whose institutional vision spans identity, craftsmanship, technology, experiences, intellectual property, private client services and legacy infrastructure.'],
  ['Where is Shamim Forever headquartered?', 'The House identifies its global headquarters as Puteaux, France. Detailed registered corporate information is published only after formal verification.'],
  ['Who leads Shamim Forever?', 'The institutional directory identifies Faisal Orakzai as Founder & Chairman, Dr. Asma Orakzai in chief executive leadership, and Dr. Laiba Faisal Orakzai as Director.'],
  ['How should third parties reference the House?', 'Use the official name Shamim Forever, the institutional descriptor Sovereign Luxury House, and the brand line Built From Love. Forged Into Legacy. Do not modify or reinterpret House trademarks without authorisation.'],
  ['Where can media and institutions make contact?', 'Use relations@shamimforever.com for corporate relations and media@shamimforever.com for media enquiries. The complete contact directory appears on this page.'],
]

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#d1ad68] transition-colors hover:text-[#f1d59a]"
    >
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
    </Link>
  )
}

function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="mb-4 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">{eyebrow}</p>
      <h2 className="max-w-3xl font-serif text-3xl font-light leading-tight text-zinc-100 md:text-5xl">{title}</h2>
    </div>
  )
}

export default function CorporateInformationPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.shamimforever.com/#organization',
        name: 'Shamim Forever',
        alternateName: 'Sovereign Luxury House',
        url: 'https://www.shamimforever.com',
        description:
          'A sovereign luxury house spanning craftsmanship, private client service, digital infrastructure, heritage and legacy.',
        slogan: 'Built From Love. Forged Into Legacy.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Puteaux',
          addressCountry: 'FR',
        },
        contactPoint: contacts.map(([contactType, email]) => ({
          '@type': 'ContactPoint',
          contactType,
          email,
          areaServed: 'Worldwide',
          availableLanguage: ['English', 'Urdu'],
        })),
        founder: {
          '@type': 'Person',
          name: 'Faisal Orakzai',
          jobTitle: 'Founder & Chairman',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${CANONICAL_URL}#webpage`,
        url: CANONICAL_URL,
        name: 'Corporate Information — The House, Defined',
        description: 'The authoritative corporate record of Shamim Forever.',
        isPartOf: { '@id': 'https://www.shamimforever.com/#website' },
        about: { '@id': 'https://www.shamimforever.com/#organization' },
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shamimforever.com/' },
          { '@type': 'ListItem', position: 2, name: 'Corporate', item: 'https://www.shamimforever.com/corporate' },
          { '@type': 'ListItem', position: 3, name: 'Corporate Information', item: CANONICAL_URL },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  }

  return (
    <main className="overflow-hidden bg-[#050505] text-zinc-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="relative border-b border-[#17130d] px-5 pb-24 pt-36 md:px-12 md:pb-32 md:pt-48 lg:px-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(153,111,48,0.13),transparent_34%),linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.02)_48%,transparent_75%)]" />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="max-w-4xl">
            <p className="mb-7 text-[9px] uppercase tracking-[0.62em] text-[#c9a054]">Corporate · Information</p>
            <h1 className="font-serif text-5xl font-light leading-[0.98] text-zinc-100 md:text-8xl">
              The House,
              <br />
              <span className="text-[#c9a054]">Defined.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base font-light leading-8 text-zinc-400 md:text-xl md:leading-9">
              Shamim Forever is built as a sovereign luxury house with a long-term institutional vision spanning identity, craftsmanship, technology, experiences, intellectual property, private client services and legacy infrastructure.
            </p>
          </div>
          <div className="mt-16 grid gap-8 border-t border-[#272016] pt-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <p className="max-w-xl text-sm leading-7 text-zinc-500">
              This is the authoritative corporate record of the House — a factual reference centre for institutions, partners, clients, researchers and media.
            </p>
            <div className="md:text-right">
              <p className="text-[9px] uppercase tracking-[0.45em] text-zinc-600">Institutional descriptor</p>
              <p className="mt-3 font-serif text-2xl font-light text-zinc-200">Sovereign Luxury House</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#151515] px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">01 · The record</p>
            <h2 className="mt-5 max-w-sm font-serif text-3xl font-light leading-tight text-zinc-100 md:text-5xl">A corporate reference, not a brochure.</h2>
          </div>
          <div className="space-y-6 text-sm leading-8 text-zinc-400 md:text-base">
            <p>Corporate Information is the central institutional reference layer of Shamim Forever. It exists to answer practical questions about what the House is, what it represents, how it operates and where authoritative information can be found.</p>
            <p>It is intentionally separate from Press &amp; Media, Leadership &amp; Governance, Brand Facts, Investor Relations, Sustainability and Policies &amp; Legal. Each environment has its own purpose; this page is the factual index that connects them.</p>
            <p className="border-l border-[#c9a054] pl-5 font-serif text-xl italic leading-8 text-zinc-200">Built From Love. Forged Into Legacy.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionLabel eyebrow="02 · Corporate overview" title="Luxury treated as an ecosystem." />
          <div className="grid gap-px overflow-hidden border border-[#1a1713] bg-[#1a1713] md:grid-cols-2 lg:grid-cols-4">
            {['Identity', 'Craftsmanship', 'Heritage', 'Technology', 'Private service', 'Intellectual property', 'Experience', 'Trust', 'Preservation', 'Cultural continuity', 'Responsible development', 'Long-term institutional thinking'].map((item, index) => (
              <div key={item} className="bg-[#070707] px-5 py-6 transition-colors duration-500 hover:bg-[#100d08] md:px-7">
                <span className="mb-5 block text-[10px] text-[#705d3e]">0{(index % 9) + 1}</span>
                <span className="text-xs uppercase tracking-[0.25em] text-zinc-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#151515] bg-[#070707] px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionLabel eyebrow="03 · Corporate identity" title="A House with a long memory." />
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="divide-y divide-[#1d1a16] border-y border-[#1d1a16]">
              {facts.map(([key, value]) => (
                <div key={key} className="grid gap-3 py-5 sm:grid-cols-[220px_1fr] sm:gap-8">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">{key}</span>
                  <span className="text-sm leading-6 text-zinc-200">{value}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="mb-6 text-[9px] uppercase tracking-[0.45em] text-zinc-600">The character of the House</p>
              <div className="space-y-6">
                {principles.map(([name, detail]) => (
                  <div key={name} className="flex gap-5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9a054]" />
                    <div>
                      <h3 className="font-serif text-xl font-light text-zinc-100">{name}</h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-500">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionLabel eyebrow="04 · Corporate architecture" title="Five dimensions. One coherent House." />
          <div className="grid gap-px border border-[#1a1713] bg-[#1a1713] md:grid-cols-5">
            {architecture.map(([name, detail], index) => (
              <div key={name} className="bg-[#050505] px-5 py-7 md:px-6 md:py-9">
                <span className="text-[10px] text-[#c9a054]">0{index + 1}</span>
                <h3 className="mt-12 font-serif text-2xl font-light text-zinc-100">{name}</h3>
                <p className="mt-4 text-xs leading-6 text-zinc-500">{detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-zinc-500">The architecture allows distinct disciplines to coexist without losing their individual identities — from the object in the hand to the infrastructure that preserves its meaning.</p>
        </div>
      </section>

      <section className="border-y border-[#151515] bg-[#070707] px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionLabel eyebrow="05 · Institutional structure" title="Clear accountability across every layer." />
          <div className="grid gap-4">
            {structure.map(([number, name, detail]) => (
              <article key={number} className="grid gap-5 border border-[#1c1915] p-6 transition-colors duration-500 hover:border-[#5b4727] md:grid-cols-[70px_250px_1fr] md:items-start md:p-8">
                <span className="font-serif text-2xl font-light text-[#c9a054]">{number}</span>
                <h3 className="font-serif text-2xl font-light text-zinc-100">{name}</h3>
                <p className="text-sm leading-7 text-zinc-500">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionLabel eyebrow="06 · Principal activities" title="What the House develops and preserves." />
          <div className="grid gap-x-12 gap-y-0 md:grid-cols-2">
            {activities.map(([name, detail], index) => (
              <article key={name} className="border-b border-[#1c1915] py-7">
                <div className="flex gap-5">
                  <span className="pt-1 text-[10px] text-[#705d3e]">0{index + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-zinc-100">{name}</h3>
                    <p className="mt-2 max-w-md text-sm leading-7 text-zinc-500">{detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#151515] bg-[#070707] px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">07 · Presence &amp; leadership</p>
            <h2 className="mt-5 max-w-md font-serif text-4xl font-light leading-tight text-zinc-100 md:text-6xl">The people behind the record.</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">Corporate Information provides the institutional directory. Detailed biographies, governance responsibilities and leadership philosophy belong to the dedicated leadership environment.</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <ArrowLink href="/founder-leadership">Founder &amp; Leadership</ArrowLink>
              <ArrowLink href="/corporate/leadership-governance">Governance reference</ArrowLink>
            </div>
          </div>
          <div className="space-y-4">
            {[
              ['Founder & Chairman', 'Faisal Orakzai'],
              ['Chief executive leadership', 'Dr. Asma Orakzai'],
              ['Director', 'Dr. Laiba Faisal Orakzai'],
            ].map(([role, name], index) => (
              <div key={role} className="flex items-center justify-between gap-6 border-b border-[#1c1915] py-6">
                <span className="text-[9px] uppercase tracking-[0.28em] text-[#c9a054]">0{index + 1} · {role}</span>
                <span className="text-right font-serif text-xl font-light text-zinc-100 md:text-2xl">{name}</span>
              </div>
            ))}
            <p className="pt-4 text-sm leading-7 text-zinc-500">The governance framework is intended to establish clear accountability across strategic decision-making, executive responsibility, oversight, financial controls, risk management, ethics, information security, intellectual property and stakeholder relationships.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionLabel eyebrow="08 · Official channels" title="The right conversation, to the right House office." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map(([label, email, detail]) => (
              <article key={email} className="flex min-h-[190px] flex-col border border-[#1c1915] p-6 transition-colors duration-500 hover:border-[#5b4727] md:p-7">
                <p className="text-[9px] uppercase tracking-[0.35em] text-[#c9a054]">{label}</p>
                <a href={`mailto:${email}`} className="mt-6 break-all font-serif text-xl font-light text-zinc-100 transition-colors hover:text-[#d1ad68]">{email}</a>
                <p className="mt-auto pt-5 text-xs leading-6 text-zinc-600">{detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-7 max-w-2xl text-xs leading-6 text-zinc-600">For legal, investor relations and other formal offices, information will be published only when the official channel exists and has been formally verified.</p>
        </div>
      </section>

      <section className="border-y border-[#151515] bg-[#070707] px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">09 · Headquarters</p>
            <h2 className="mt-5 font-serif text-4xl font-light text-zinc-100 md:text-6xl">Puteaux, France.</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-500">The global headquarters of Shamim Forever. Detailed registered corporate information remains pending formal publication until verified from official records.</p>
          </div>
          <div className="border-y border-[#1c1915]">
            {[
              ['Global headquarters', 'Puteaux, France'],
              ['Registered address', 'Information pending formal publication.'],
              ['Corporate entity', 'Information pending formal publication.'],
              ['Registration / VAT', 'Information pending formal publication.'],
              ['Operating reach', 'Worldwide'],
            ].map(([key, value]) => (
              <div key={key} className="grid gap-2 border-b border-[#1c1915] py-5 last:border-0 sm:grid-cols-[220px_1fr]">
                <span className="text-[9px] uppercase tracking-[0.28em] text-[#c9a054]">{key}</span>
                <span className="text-sm leading-6 text-zinc-300">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionLabel eyebrow="10 · Intellectual property" title="The language of the House is an asset." />
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <p className="max-w-lg text-base leading-8 text-zinc-400">The visual and intellectual language of Shamim Forever forms part of its institutional identity. The House manages and develops a living body of names, marks, symbols, monograms, typography, photography, films, publications, designs, product concepts, software, interfaces, proprietary systems, written content and archival material.</p>
            <div className="flex flex-wrap content-start gap-2">
              {['Name', 'Logos', 'Symbols', 'Monograms', 'Typography', 'Photography', 'Films', 'Publications', 'Designs', 'Software', 'Digital interfaces', 'Research', 'Archives'].map(item => (
                <span key={item} className="border border-[#2a2115] px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-zinc-400">{item}</span>
              ))}
              <p className="mt-5 w-full text-xs leading-6 text-zinc-600">Detailed legal conditions and usage terms belong under Policies &amp; Legal.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#151515] bg-[#070707] px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionLabel eyebrow="11 · Corporate documents" title="An institutional document centre, built over time." />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {documents.map(([title, type, id]) => (
              <article key={id} className="border border-[#1c1915] p-6">
                <p className="text-[9px] uppercase tracking-[0.28em] text-[#c9a054]">{id}</p>
                <h3 className="mt-8 font-serif text-2xl font-light text-zinc-100">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-zinc-600">{type}</p>
                <span className="mt-8 inline-block text-[9px] uppercase tracking-[0.25em] text-zinc-700">Publication pending</span>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            <ArrowLink href="/whitepapers">Explore White Papers</ArrowLink>
            <ArrowLink href="/press-media">Visit Press &amp; Media</ArrowLink>
            <ArrowLink href="/brand-facts">Read Brand Facts</ArrowLink>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-2">
          <div>
            <p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">12 · Responsibility</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-zinc-100 md:text-6xl">Progress with standards.</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">The House approaches responsibility through ethical business conduct, responsible sourcing, employee standards, environmental responsibility, privacy, accessibility, community engagement, supply-chain standards and anti-corruption principles.</p>
            <div className="mt-8"><ArrowLink href="/sustainability">Explore Sustainability</ArrowLink></div>
          </div>
          <div className="border-t border-[#1c1915]">
            {['Ethical business conduct', 'Responsible sourcing', 'Privacy & accessibility', 'Community engagement', 'Supply-chain standards', 'Anti-corruption principles'].map((item, index) => (
              <div key={item} className="flex items-center justify-between border-b border-[#1c1915] py-5">
                <span className="text-sm text-zinc-300">{item}</span>
                <span className="text-[10px] text-[#705d3e]">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#151515] bg-[#070707] px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">13 · Building the House</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-zinc-100 md:text-6xl">A future made by many disciplines.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-8 text-zinc-400">Shamim Forever seeks individuals across luxury, fashion, design, technology, engineering, AI, cybersecurity, hospitality, operations, finance, legal, research, communications and craftsmanship.</p>
            <div className="mt-8"><ArrowLink href="/careers">Explore Careers</ArrowLink></div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1240px]">
          <SectionLabel eyebrow="14 · Frequently referenced" title="Answers for institutions, partners and researchers." />
          <div className="divide-y divide-[#1c1915] border-y border-[#1c1915]">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl font-light text-zinc-100 marker:hidden">
                  <span>{question}</span>
                  <span className="text-2xl font-light text-[#c9a054] transition-transform duration-500 group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pt-4 text-sm leading-7 text-zinc-500">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#151515] px-5 py-24 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1240px] text-center">
          <p className="text-[9px] uppercase tracking-[0.6em] text-[#c9a054]">The House, in record.</p>
          <h2 className="mx-auto mt-6 max-w-4xl font-serif text-4xl font-light leading-tight text-zinc-100 md:text-7xl">A luxury house is remembered by what it leaves behind.</h2>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-zinc-500">Corporate Information exists to preserve the record — from the identity of the House to its operating architecture, people, partnerships, intellectual property and institutional standards.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4">
            <ArrowLink href="/founder-leadership">Leadership &amp; Governance</ArrowLink>
            <ArrowLink href="/brand-facts">Brand Facts</ArrowLink>
            <ArrowLink href="/press-media">Press &amp; Media</ArrowLink>
            <ArrowLink href="/policies">Policies &amp; Legal</ArrowLink>
          </div>
        </div>
      </section>
    </main>
  )
}
