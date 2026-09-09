import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'

const siteUrl = 'https://www.shamimforever.com'

export const metadata: Metadata = {
  title: 'Careers at Shamim Forever | Build a Lasting Legacy',
  description:
    'Explore careers, apprenticeships and partner pathways at Shamim Forever, a sovereign luxury house building fragrance, craft and technology for generations.',
  alternates: {
    canonical: `${siteUrl}/careers`,
  },
  openGraph: {
    title: 'Careers at Shamim Forever | Build a Lasting Legacy',
    description:
      'A considered invitation for builders, artisans, operators and partners shaping the next generation of sovereign luxury.',
    url: `${siteUrl}/careers`,
    siteName: 'Shamim Forever',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/logo-sf.png`,
        width: 512,
        height: 512,
        alt: 'Shamim Forever — sovereign luxury house',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at Shamim Forever | Build a Lasting Legacy',
    description:
      'Meet the people and pathways building the next generation of sovereign luxury.',
    images: [`${siteUrl}/logo-sf.png`],
  },
}

const principles = [
  {
    index: '01',
    title: 'Craftsmanship',
    body: 'Obsessive attention to detail. The smallest gesture is part of the house.',
  },
  {
    index: '02',
    title: 'Intelligence',
    body: 'We look for people who can hold complexity and still make a clear decision.',
  },
  {
    index: '03',
    title: 'Integrity',
    body: 'Trust comes before revenue. Confidentiality is a form of respect.',
  },
  {
    index: '04',
    title: 'Ownership',
    body: 'Builders do not wait for a perfect brief. They take responsibility for the result.',
  },
  {
    index: '05',
    title: 'Curiosity',
    body: 'Technology, culture, design and business keep changing. We stay awake.',
  },
  {
    index: '06',
    title: 'Long-term thinking',
    body: 'We are building for decades, not a campaign cycle or a quarterly mood.',
  },
]

const departments = [
  {
    number: '01',
    title: 'Creative & craftsmanship',
    description:
      'Make the objects people remember: fragrance, fine jewellery, fashion, leather goods and complete product experiences.',
    roles: 'Scent artisan · High jewellery designer · Fashion designer · Product designer',
  },
  {
    number: '02',
    title: 'Technology & Web3',
    description:
      'Build the quiet infrastructure behind ownership, membership, commerce and a more intelligent luxury experience.',
    roles: 'Full-stack engineer · Blockchain engineer · Mobile engineer · Product designer',
  },
  {
    number: '03',
    title: 'AI & research',
    description:
      'Explore responsible intelligence for personalisation, discovery, knowledge systems and computational creativity.',
    roles: 'AI product engineer · AI researcher · Data and knowledge systems',
  },
  {
    number: '04',
    title: 'Brand & growth',
    description:
      'Carry the house into France, Europe, the GCC, South Asia and selected markets with discipline and cultural fluency.',
    roles: 'Global brand strategist · Art director · Digital content creator',
  },
  {
    number: '05',
    title: 'Concierge & private client',
    description:
      'Turn a request into a relationship. Make every private appointment, commission and after-sale interaction considered.',
    roles: 'Concierge manager · Private client advisor · Membership experience',
  },
  {
    number: '06',
    title: 'Operations & institution',
    description:
      'Translate vision into reliable systems across supply chain, finance, legal, quality, retail, people and risk.',
    roles: 'Operations · Procurement · Finance · Legal and compliance · People',
  },
  {
    number: '07',
    title: 'Retail & hospitality',
    description:
      'Bring Shamim Forever to life physically through boutiques, salons, lounges, pop-ups and destination experiences.',
    roles: 'Retail operations · Hospitality · Location development · Training',
  },
]

const careerLevels = [
  ['Intern', 'Learn the foundations.'],
  ['Apprentice', 'Develop practical skills.'],
  ['Associate', 'Own defined responsibilities.'],
  ['Specialist', 'Become an expert.'],
  ['Senior specialist', 'Lead complex work.'],
  ['Manager', 'Lead people and operations.'],
  ['Director', 'Lead a major function.'],
  ['Executive', 'Shape company strategy.'],
  ['House leadership', 'Build the institution itself.'],
]

const academyTracks = [
  'Luxury brand management',
  'Fragrance and perfumery',
  'Jewellery and product design',
  'Digital design and technology',
  'AI and blockchain',
  'Retail, concierge and hospitality',
  'Business development and operations',
]

const globalMarkets = [
  ['France', 'Luxury, design, fragrance and European operations.'],
  ['Dubai / GCC', 'Retail, hospitality, investment and private client relationships.'],
  ['Pakistan', 'Technology, operations, creative talent and emerging-market growth.'],
  ['United Kingdom', 'Design, finance, technology and international business.'],
  ['Europe', 'Craftsmanship, fashion, fragrance and luxury expertise.'],
  ['Asia', 'Technology, manufacturing, supply chain and growth.'],
]

const partnerPathways = [
  ['Entrepreneur', 'Operate a premium luxury business with a local point of view.'],
  ['Investor', 'Provide capital within an approved, documented business structure.'],
  ['Retail operator', 'Bring experience in premium retail and disciplined execution.'],
  ['Hospitality group', 'Create a house presence within a hotel, resort or destination.'],
  ['Property owner', 'Offer a considered location for an approved outlet format.'],
  ['Regional partner', 'Develop a territory with the capability to protect the standard.'],
]

const outletFormats = [
  ['Shamim House', 'Full luxury flagship'],
  ['Shamim Boutique', 'Premium retail location'],
  ['Shamim Fragrance', 'Specialised fragrance house'],
  ['Shamim Jewellery', 'Fine jewellery and collectibles'],
  ['Shamim Private', 'Appointment-only private salon'],
  ['Shamim Lounge', 'Luxury hospitality and client experience'],
  ['Shamim Pop-up', 'Temporary experiential retail'],
  ['Shamim Digital House', 'Technology-led client experience'],
]

const hiringSteps = [
  ['01', 'Application', 'Tell us what you have made, learned or built.'],
  ['02', 'Portfolio / CV review', 'We look for evidence of judgement, not a perfect template.'],
  ['03', 'Initial conversation', 'A direct conversation about the work and the life around it.'],
  ['04', 'Technical or creative assessment', 'A proportionate exercise connected to the actual scope.'],
  ['05', 'Leadership / cultural interview', 'Meet the people responsible for the standard.'],
  ['06', 'Reference and verification', 'A careful final step for a house built on trust.'],
  ['07', 'Offer', 'The scope, location, arrangement and terms are made clear.'],
  ['08', 'Onboarding and house training', 'Learn the language, standards and systems of Shamim Forever.'],
]

const faqs = [
  {
    question: 'Are there open positions at Shamim Forever right now?',
    answer:
      'There are no publicly approved openings at this time. We will publish a role only when its scope, location, working arrangement and application route have been confirmed. We do not use placeholder vacancies.',
  },
  {
    question: 'Can I still introduce myself to the house?',
    answer:
      'Yes. You can send a concise introduction and relevant portfolio or work history to careers@shamimforever.com. This is a future-intake route, not an application for an open role and not a promise of response or employment.',
  },
  {
    question: 'What is the Shamim Forever Academy?',
    answer:
      'The Academy is a planned learning system for apprentices and future talent across fragrance, jewellery, product, digital, AI, blockchain, retail, concierge, hospitality and operations.',
  },
  {
    question: 'How does the partner outlet model work?',
    answer:
      'A licensed partner may provide local investment, an approved location, an operating team and market execution. Shamim Forever may provide the brand, products, training, standards, technology and central governance under a written agreement.',
  },
  {
    question: 'Does Shamim Forever promise zero tax for partners?',
    answer:
      'No. Tax treatment depends on the country, structure and applicable law. Any incentives, exemptions or reduced rates must be assessed by qualified local legal and tax professionals, alongside VAT/GST, employment, customs, AML/KYC and licensing requirements.',
  },
]

function SectionIntro({
  number,
  eyebrow,
  title,
  copy,
}: {
  number: string
  eyebrow: string
  title: string
  copy: string
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-16">
      <p className="sf-kicker pt-2">
        {number} / {eyebrow}
      </p>
      <div>
        <h2 className="sf-heading max-w-4xl text-4xl sm:text-5xl lg:text-[4.7rem]">
          {title}
        </h2>
        <p className="mt-7 max-w-2xl text-sm font-light leading-8 text-zinc-400">
          {copy}
        </p>
      </div>
    </div>
  )
}

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 border-b border-[#c9a054]/60 pb-3 text-[10px] uppercase tracking-[0.28em] text-[#d8b46b] transition-colors duration-500 hover:border-[#f3efe7] hover:text-[#f3efe7]"
    >
      <span>{children}</span>
      <span className="text-base leading-none transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
    </Link>
  )
}

const careerJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/careers#webpage`,
      url: `${siteUrl}/careers`,
      name: 'Careers at Shamim Forever',
      description:
        'The talent, apprenticeship and partner pathways of Shamim Forever, a sovereign luxury house.',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/careers#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Careers', item: `${siteUrl}/careers` },
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Shamim Forever',
      url: siteUrl,
      description:
        'A multidisciplinary sovereign luxury house spanning fragrance, fine jewellery, fashion, digital experiences, private membership, hospitality, retail, technology, research and partnerships.',
      department: departments.map((department) => ({
        '@type': 'Organization',
        name: `Shamim Forever — ${department.title}`,
        description: department.description,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/careers#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
}

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careerJsonLd) }}
      />

      <main className="overflow-hidden bg-[#050505] text-[#f3efe7]">
        <section className="relative flex min-h-[780px] items-end border-b border-[#c9a054]/20 px-6 pb-20 pt-40 sm:min-h-[860px] sm:px-10 lg:px-20">
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_74%_15%,rgba(201,160,84,0.13),transparent_30%),radial-gradient(ellipse_at_12%_85%,rgba(98,46,27,0.10),transparent_27%)]" />
          <div className="absolute bottom-10 right-6 hidden h-64 w-64 rounded-full border border-[#c9a054]/10 sm:block lg:right-20">
            <div className="absolute inset-8 rounded-full border border-[#c9a054]/10" />
            <div className="absolute inset-16 rounded-full border border-[#c9a054]/10" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px]">
            <div className="mb-12 flex items-center justify-between gap-6 text-[9px] uppercase tracking-[0.45em] text-[#c9a054]">
              <span>Shamim Forever / Careers</span>
              <span className="hidden text-zinc-500 sm:block">A house for the long term</span>
            </div>
            <p className="sf-kicker mb-8">The invitation</p>
            <h1 className="sf-display max-w-5xl text-[4.8rem] sm:text-[8rem] lg:text-[11.5rem]">
              Build a legacy.
              <br />
              <em className="text-[#d8b46b]">Create the extraordinary.</em>
            </h1>
            <div className="mt-14 grid max-w-4xl gap-10 lg:grid-cols-[1fr_310px] lg:items-end">
              <p className="max-w-2xl text-base font-light leading-8 text-zinc-300 sm:text-lg">
                Shamim Forever is building a new generation of sovereign luxury. We are looking
                for designers, engineers, artisans, strategists, operators, researchers, creators
                and ambitious builders who want to work on something larger than a conventional
                luxury brand.
              </p>
              <div className="border-l border-[#c9a054]/50 pl-5 text-xs leading-6 text-zinc-500">
                <span className="mb-3 block text-[#d8b46b]">The current position</span>
                No approved public vacancies at this time. The next opening will carry its real
                scope, place and pathway.
              </div>
            </div>
            <div className="mt-14 flex flex-wrap gap-x-8 gap-y-4">
              <ArrowLink href="#life-at-the-house">Enter the house</ArrowLink>
              <ArrowLink href="#current-opportunities">View opportunity framework</ArrowLink>
            </div>
          </div>
        </section>

        <section id="life-at-the-house" className="border-b border-[#c9a054]/15 px-6 py-28 sm:px-10 lg:px-20 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <SectionIntro
              number="01"
              eyebrow="Life at the house"
              title="Built from love. Forged into legacy."
              copy="A multidisciplinary house is not a collection of departments. It is a shared standard. Our teams move between design, technology, craftsmanship, commerce and human experience to create objects, systems and relationships that can survive generations."
            />
            <div className="mt-20 grid gap-px bg-[#c9a054]/20 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['01', 'Objects', 'Fragrance, jewellery, fashion and considered things made to be kept.'],
                ['02', 'Experiences', 'Private membership, concierge, hospitality and retail with a human pulse.'],
                ['03', 'Infrastructure', 'Digital ownership, technology, research and systems that make trust tangible.'],
                ['04', 'Relationships', 'Clients, craftspeople and partners treated as part of the long story.'],
              ].map(([number, title, body]) => (
                <article key={title} className="min-h-[220px] bg-[#090909] p-7 sm:p-9">
                  <span className="text-[10px] tracking-[0.35em] text-[#c9a054]">{number}</span>
                  <h3 className="mt-14 font-[Cormorant_Garamond] text-3xl font-light tracking-wide text-[#f3efe7]">
                    {title}
                  </h3>
                  <p className="mt-4 text-xs leading-6 text-zinc-500">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="principles" className="bg-[#0a0a0a] px-6 py-28 sm:px-10 lg:px-20 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <SectionIntro
              number="02"
              eyebrow="Our principles"
              title="The standard is the culture."
              copy="Luxury is detail repeated consistently. We value character as much as capability, and the patience to do important work before anyone is applauding."
            />
            <div className="mt-20 grid gap-x-12 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
              {principles.map((principle) => (
                <article key={principle.index} className="border-t border-[#c9a054]/25 py-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-[Cormorant_Garamond] text-3xl font-light text-[#f3efe7]">
                      {principle.title}
                    </h3>
                    <span className="pt-2 text-[10px] tracking-[0.3em] text-[#c9a054]">
                      {principle.index}
                    </span>
                  </div>
                  <p className="mt-5 max-w-xs text-xs leading-6 text-zinc-500">{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="departments" className="px-6 py-28 sm:px-10 lg:px-20 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <SectionIntro
              number="03"
              eyebrow="Career departments"
              title="Find the work behind the wonder."
              copy="The house is intentionally porous. A product designer may sit with a perfumer; an engineer may shape a private client journey. Choose a discipline, then stay curious about the whole."
            />
            <div className="mt-20 border-t border-[#c9a054]/30">
              {departments.map((department) => (
                <article
                  key={department.number}
                  className="group grid gap-6 border-b border-[#c9a054]/20 py-9 transition-colors duration-500 hover:bg-[#0b0b0b] md:grid-cols-[72px_1fr_1.1fr] md:gap-10 md:px-5"
                >
                  <span className="text-[10px] tracking-[0.35em] text-[#c9a054]">
                    {department.number}
                  </span>
                  <div>
                    <h3 className="font-[Cormorant_Garamond] text-3xl font-light tracking-wide text-[#f3efe7] transition-colors duration-500 group-hover:text-[#d8b46b] sm:text-4xl">
                      {department.title}
                    </h3>
                    <p className="mt-4 max-w-md text-xs leading-6 text-zinc-500">
                      {department.roles}
                    </p>
                  </div>
                  <p className="max-w-lg text-sm font-light leading-7 text-zinc-400">
                    {department.description}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-xs leading-6 text-zinc-600">
              These are capability areas, not current vacancies. Approved roles will appear in the
              opportunity register below.
            </p>
          </div>
        </section>

        <section id="current-opportunities" className="border-y border-[#c9a054]/15 bg-[#0a0a0a] px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28">
              <div>
                <p className="sf-kicker">04 / Current opportunities</p>
                <h2 className="sf-heading mt-7 text-5xl sm:text-6xl">A quiet register is better than a false promise.</h2>
                <p className="mt-7 max-w-lg text-sm font-light leading-8 text-zinc-400">
                  There are no approved public openings at this time. Shamim Forever will never
                  present an imagined vacancy as an open role. When a position is ready, this
                  register will state the department, position, location, working arrangement,
                  scope and exact application route.
                </p>
                <div className="mt-10">
                  <a
                    href="mailto:careers@shamimforever.com?subject=Future%20career%20introduction"
                    className="luxury-btn"
                  >
                    Introduce yourself for future intake
                  </a>
                </div>
              </div>
              <div className="border border-[#c9a054]/30 bg-[#080808]">
                <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#c9a054]/20 px-5 py-4 text-[9px] uppercase tracking-[0.3em] text-zinc-600 sm:px-8">
                  <span>Opportunity register</span>
                  <span>Status</span>
                </div>
                <div className="flex min-h-[270px] flex-col items-center justify-center px-8 text-center">
                  <div className="mb-6 h-2 w-2 rounded-full bg-[#c9a054]" />
                  <p className="font-[Cormorant_Garamond] text-3xl font-light text-[#f3efe7]">
                    No approved openings
                  </p>
                  <p className="mt-4 max-w-sm text-xs leading-6 text-zinc-600">
                    Future openings will be published here only after internal approval and
                    operational readiness.
                  </p>
                </div>
                <div className="border-t border-[#c9a054]/20 px-5 py-5 text-[10px] uppercase tracking-[0.2em] text-[#c9a054] sm:px-8">
                  Planned framework / not a job listing
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="career-levels" className="px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <SectionIntro
              number="05"
              eyebrow="Career levels"
              title="Room to become more useful."
              copy="A career at the house is not a race through titles. It is a widening circle of judgement, responsibility and care."
            />
            <div className="mt-20 grid gap-0 sm:grid-cols-3 lg:grid-cols-9">
              {careerLevels.map(([level, description], index) => (
                <div key={level} className="relative border-l border-t border-[#c9a054]/25 p-5 last:border-r sm:min-h-[218px] lg:border-t-0 lg:border-l lg:p-4">
                  <span className="text-[10px] tracking-[0.3em] text-[#c9a054]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-8 font-[Cormorant_Garamond] text-2xl font-light text-[#f3efe7]">
                    {level}
                  </h3>
                  <p className="mt-4 text-xs leading-5 text-zinc-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="academy" className="border-y border-[#c9a054]/15 bg-[#0a0a0a] px-6 py-28 sm:px-10 lg:px-20 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-28">
              <div>
                <p className="sf-kicker">06 / Academy & apprenticeships</p>
                <h2 className="sf-heading mt-7 text-5xl sm:text-7xl">Talent can be trained. Character is harder to manufacture.</h2>
                <p className="mt-8 max-w-xl text-sm font-light leading-8 text-zinc-400">
                  Shamim Forever Academy is a planned learning system for future talent. It is
                  designed for people who bring seriousness, curiosity and a willingness to begin
                  with the foundations, whether or not their CV looks conventional.
                </p>
                <p className="mt-5 max-w-xl text-sm font-light leading-8 text-zinc-500">
                  Academy and apprenticeship intakes are future programmes, not currently open
                  applications. Announcements will include eligibility, duration, location,
                  supervision and any compensation or stipend terms.
                </p>
              </div>
              <div>
                <div className="border-t border-[#c9a054]/30">
                  {academyTracks.map((track, index) => (
                    <div key={track} className="flex items-center justify-between border-b border-[#c9a054]/20 py-5">
                      <span className="text-sm text-zinc-300">{track}</span>
                      <span className="text-[10px] tracking-[0.3em] text-[#c9a054]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-9 border-l border-[#c9a054] pl-5">
                  <p className="text-xs leading-6 text-zinc-500">
                    The strongest candidates do not necessarily come with the fanciest CV. Show us
                    how you learn, how you finish and what you notice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="global-careers" className="px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <SectionIntro
              number="07"
              eyebrow="Global careers"
              title="One house, many points of view."
              copy="Our future footprint will be shaped by local intelligence. The right person may be near a craft tradition, a technology ecosystem, a private client community or a new market still finding its voice."
            />
            <div className="mt-20 grid gap-px bg-[#c9a054]/20 sm:grid-cols-2 lg:grid-cols-3">
              {globalMarkets.map(([market, description], index) => (
                <article key={market} className="bg-[#050505] p-7 sm:p-9">
                  <div className="flex justify-between">
                    <span className="font-[Cormorant_Garamond] text-3xl font-light text-[#f3efe7]">
                      {market}
                    </span>
                    <span className="text-[10px] tracking-[0.3em] text-[#c9a054]">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-12 max-w-xs text-xs leading-6 text-zinc-500">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="partner-model" className="border-y border-[#c9a054]/15 bg-[#0a0a0a] px-6 py-28 sm:px-10 lg:px-20 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <SectionIntro
              number="08"
              eyebrow="Licensed partner outlet model"
              title="A house can travel without losing its name."
              copy="We are exploring a licensed partner ecosystem for selected locations and markets. The model is designed around shared standards, local operating strength and a written relationship that protects the client experience."
            />
            <div className="mt-20 grid gap-6 lg:grid-cols-2">
              <div className="border border-[#c9a054]/30 p-7 sm:p-10">
                <p className="sf-kicker">The partner provides</p>
                <ul className="mt-8 space-y-4 text-sm font-light text-zinc-300">
                  {['Local investment', 'Approved location', 'Local operating team', 'Market execution', 'Required permits', 'Local operating expenses'].map((item) => (
                    <li key={item} className="flex gap-4 border-b border-[#c9a054]/15 pb-4">
                      <span className="text-[#c9a054]">/</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-[#c9a054]/30 p-7 sm:p-10">
                <p className="sf-kicker">The house provides</p>
                <ul className="mt-8 space-y-4 text-sm font-light text-zinc-300">
                  {['Brand and product ecosystem', 'Approved design and packaging', 'Product supply and authentication', 'Training and SOPs', 'Technology and digital systems', 'Central brand governance'].map((item) => (
                    <li key={item} className="flex gap-4 border-b border-[#c9a054]/15 pb-4">
                      <span className="text-[#c9a054]">/</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="border border-[#c9a054]/20 p-7 sm:p-10">
                <p className="sf-kicker">Possible commercial structures</p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {[
                    ['A / Product supply', 'The partner purchases approved products and sells them through the outlet.'],
                    ['B / Revenue share', 'Eligible revenue is divided according to the contractual arrangement.'],
                    ['C / Management agreement', 'The house manages brand and experience while the local partner retains the property or investment.'],
                    ['D / Hybrid', 'A considered combination of product margin, licensing, revenue share and service fees.'],
                  ].map(([title, body]) => (
                    <div key={title}>
                      <h3 className="text-xs uppercase tracking-[0.2em] text-[#d8b46b]">{title}</h3>
                      <p className="mt-3 text-xs leading-6 text-zinc-500">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-[#c9a054]/30 bg-[#14110c] p-7 sm:p-10">
                <p className="sf-kicker">Legal principle</p>
                <h3 className="mt-7 font-[Cormorant_Garamond] text-4xl font-light text-[#f3efe7]">
                  Commercially efficient. Legally compliant.
                </h3>
                <p className="mt-5 text-xs leading-7 text-zinc-400">
                  Exact structures are determined country by country by qualified legal and tax
                  professionals. We respect local tax, VAT/GST, employment, customs, consumer
                  protection, intellectual-property, AML/KYC, licensing and transfer-pricing
                  requirements where applicable.
                </p>
                <p className="mt-5 text-xs leading-7 text-zinc-600">
                  Any incentives, exemptions, special-zone benefits or reduced rates must be
                  available under applicable law. No promise of zero tax is made.
                </p>
              </div>
            </div>
            <div className="mt-16">
              <p className="sf-kicker">Future outlet formats</p>
              <div className="mt-8 grid gap-px bg-[#c9a054]/20 sm:grid-cols-2 lg:grid-cols-4">
                {outletFormats.map(([name, description]) => (
                  <div key={name} className="bg-[#0a0a0a] p-6">
                    <p className="text-sm uppercase tracking-[0.12em] text-[#f3efe7]">{name}</p>
                    <p className="mt-3 text-xs text-zinc-600">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="become-a-partner" className="px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
              <div>
                <p className="sf-kicker">09 / Partner pathway</p>
                <h2 className="sf-heading mt-7 text-5xl sm:text-7xl">Bring the house to a place with a point of view.</h2>
                <p className="mt-8 max-w-lg text-sm font-light leading-8 text-zinc-400">
                  We welcome serious conversations with investors, entrepreneurs, property owners,
                  retail operators, hospitality groups and regional partners who understand that a
                  luxury name is a responsibility before it is an asset.
                </p>
                <div className="mt-10">
                  <a
                    href="mailto:partnerships@shamimforever.com?subject=Shamim%20Forever%20partner%20introduction"
                    className="luxury-btn"
                  >
                    Discuss a partner pathway
                  </a>
                </div>
                <p className="mt-5 max-w-sm text-[10px] leading-5 text-zinc-600">
                  All conversations are subject to commercial, legal, financial and brand due
                  diligence. This page is not an offer, franchise disclosure or binding commitment.
                </p>
              </div>
              <div className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
                {partnerPathways.map(([title, description], index) => (
                  <div key={title} className="border-t border-[#c9a054]/25 py-7">
                    <span className="text-[10px] tracking-[0.3em] text-[#c9a054]">0{index + 1}</span>
                    <h3 className="mt-5 font-[Cormorant_Garamond] text-3xl font-light text-[#f3efe7]">{title}</h3>
                    <p className="mt-3 text-xs leading-6 text-zinc-500">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="how-we-hire" className="border-y border-[#c9a054]/15 bg-[#0a0a0a] px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <SectionIntro
              number="10"
              eyebrow="How we hire"
              title="A clear process is a form of respect."
              copy="The process will change with the role, but never at the expense of clarity. We will tell you what the work is, what the decision requires and where you stand."
            />
            <div className="mt-20 grid gap-px bg-[#c9a054]/20 sm:grid-cols-2 lg:grid-cols-4">
              {hiringSteps.map(([number, title, description]) => (
                <article key={number} className="min-h-[220px] bg-[#0a0a0a] p-7">
                  <span className="text-[10px] tracking-[0.35em] text-[#c9a054]">{number}</span>
                  <h3 className="mt-12 font-[Cormorant_Garamond] text-3xl font-light text-[#f3efe7]">{title}</h3>
                  <p className="mt-4 text-xs leading-6 text-zinc-500">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="offer" className="px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-28">
              <div>
                <p className="sf-kicker">11 / What we expect</p>
                <h2 className="sf-heading mt-7 text-5xl sm:text-6xl">Bring precision. Keep your word.</h2>
                <div className="mt-12 border-t border-[#c9a054]/30">
                  {[
                    ['Precision', 'Do the small things correctly.'],
                    ['Confidentiality', 'Private client information stays private.'],
                    ['Professionalism', 'Represent the house properly.'],
                    ['Accountability', 'Own your decisions and their consequences.'],
                    ['Respect', 'For clients, colleagues, craftspeople and partners.'],
                    ['Continuous learning', 'The world changes. Pretending otherwise is not a strategy.'],
                  ].map(([title, body]) => (
                    <div key={title} className="flex gap-6 border-b border-[#c9a054]/15 py-5">
                      <span className="min-w-32 text-sm text-[#f3efe7]">{title}</span>
                      <span className="text-xs leading-6 text-zinc-500">{body}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="sf-kicker">12 / What we offer</p>
                <h2 className="sf-heading mt-7 text-5xl sm:text-6xl">Work worth staying for.</h2>
                <p className="mt-8 text-sm font-light leading-8 text-zinc-400">
                  Depending on location, role and employment contract, future team members may find
                  access to:
                </p>
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {['Competitive compensation', 'Performance incentives', 'Professional development', 'Mentorship', 'International opportunities', 'Leadership development', 'Creative freedom', 'Project ownership', 'Employee recognition', 'Internal mobility'].map((item) => (
                    <div key={item} className="border border-[#c9a054]/20 px-4 py-4 text-xs text-zinc-400">
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-[10px] leading-5 text-zinc-600">
                  Specific benefits vary by jurisdiction, employment contract and the stage of the
                  relevant team. We will state them plainly for each approved role.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="founders-builders" className="border-y border-[#c9a054]/15 bg-[#14110c] px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-24">
              <div>
                <p className="sf-kicker">13 / Founders & builders programme</p>
                <h2 className="sf-heading mt-7 text-5xl sm:text-7xl">Do not wait for a job description to tell you what is possible.</h2>
              </div>
              <div>
                <p className="text-sm font-light leading-8 text-zinc-300">
                  The Founders & Builders pathway is for ambitious people who want to propose new
                  verticals inside Shamim Forever. A strong proposal can become an internal venture
                  or a strategic business unit.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.2em] text-[#d8b46b]">
                  <span>New products</span>
                  <span>New markets</span>
                  <span>New technology</span>
                  <span>New services</span>
                  <span>New outlet concepts</span>
                  <span>New partnerships</span>
                </div>
                <div className="mt-10">
                  <a
                    href="mailto:careers@shamimforever.com?subject=Founders%20and%20builders%20proposal"
                    className="luxury-btn"
                  >
                    Share a builder proposal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="join-the-house" className="px-6 py-28 sm:px-10 lg:px-20 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <p className="sf-kicker">14 / Find your place in the house</p>
            <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
              <h2 className="sf-heading max-w-3xl text-5xl sm:text-7xl">The future is made by people who choose to begin.</h2>
              <p className="max-w-xl text-sm font-light leading-8 text-zinc-400">
                We do not accept pretend applications to pretend vacancies. If your work belongs
                in this story, send a concise introduction and the most useful evidence of your
                ability. For partnership conversations, use the separate route.
              </p>
            </div>
            <div className="mt-16 grid gap-5 lg:grid-cols-2">
              <div className="border border-[#c9a054]/40 bg-[#0b0b0b] p-8 sm:p-12">
                <p className="sf-kicker">For future employees</p>
                <h3 className="mt-7 font-[Cormorant_Garamond] text-4xl font-light text-[#f3efe7]">Join the house.</h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-zinc-500">
                  Share your name, country, discipline, experience, portfolio or CV and a short
                  note about the work you want to do. This is a future-intake mailbox, not a live
                  role submission.
                </p>
                <a
                  href="mailto:careers@shamimforever.com?subject=Future%20intake%20-%20Shamim%20Forever"
                  className="mt-10 inline-flex border-b border-[#c9a054] pb-3 text-[10px] uppercase tracking-[0.28em] text-[#d8b46b]"
                >
                  careers@shamimforever.com
                </a>
              </div>
              <div className="border border-[#c9a054]/20 p-8 sm:p-12">
                <p className="sf-kicker">For future partners</p>
                <h3 className="mt-7 font-[Cormorant_Garamond] text-4xl font-light text-[#f3efe7]">Build a local expression.</h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-zinc-500">
                  Include your company, country, city, business experience, proposed location,
                  existing business, preferred format and a thoughtful partnership proposal.
                </p>
                <a
                  href="mailto:partnerships@shamimforever.com?subject=Future%20partner%20intake%20-%20Shamim%20Forever"
                  className="mt-10 inline-flex border-b border-[#c9a054] pb-3 text-[10px] uppercase tracking-[0.28em] text-[#d8b46b]"
                >
                  partnerships@shamimforever.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="manifesto" className="relative border-y border-[#c9a054]/20 bg-[#0a0a0a] px-6 py-32 sm:px-10 lg:px-20 lg:py-48">
          <div className="mx-auto max-w-5xl text-center">
            <p className="sf-kicker">The careers manifesto</p>
            <p className="mt-10 font-[Cormorant_Garamond] text-5xl font-light leading-[0.95] text-[#f3efe7] sm:text-7xl lg:text-[8rem]">
              We are not looking for people who simply want a job.
            </p>
            <p className="mx-auto mt-12 max-w-2xl text-sm font-light leading-8 text-zinc-400">
              We are looking for people who want to build products, technology, relationships,
              experiences, systems and institutions. Shamim Forever belongs to those who believe
              extraordinary work requires patience, discipline and imagination.
            </p>
            <p className="mt-12 font-[Cormorant_Garamond] text-2xl italic font-light tracking-wide text-[#d8b46b] sm:text-3xl">
              Built from love. Forged into legacy.
            </p>
          </div>
        </section>

        <section id="faq" className="px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
          <div className="mx-auto max-w-[1000px]">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="sf-kicker">Questions, answered carefully</p>
                <h2 className="sf-heading mt-7 text-5xl sm:text-7xl">Before you write.</h2>
              </div>
              <a href="mailto:relations@shamimforever.com?subject=Careers%20enquiry" className="text-[10px] uppercase tracking-[0.28em] text-[#d8b46b] hover:text-[#f3efe7]">
                General contact →
              </a>
            </div>
            <div className="mt-16 border-t border-[#c9a054]/30">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group border-b border-[#c9a054]/20 py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-left">
                    <span className="flex gap-5 text-lg font-light text-[#f3efe7] sm:text-xl">
                      <span className="pt-1 text-[10px] tracking-[0.3em] text-[#c9a054]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {faq.question}
                    </span>
                    <span className="pt-1 text-xl font-light text-[#c9a054] transition-transform duration-500 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="ml-9 mt-5 max-w-2xl text-sm leading-7 text-zinc-500">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#c9a054]/20 bg-[#14110c] px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <div>
              <p className="sf-kicker">The next chapter</p>
              <h2 className="sf-heading mt-7 max-w-4xl text-6xl sm:text-8xl">Build the future of the house.</h2>
            </div>
            <div className="flex max-w-xs flex-col gap-6">
              <ArrowLink href="#join-the-house">Choose your pathway</ArrowLink>
              <Link href="/corporate-information" className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 transition-colors hover:text-[#f3efe7]">
                About the institution →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}