import type { Metadata } from 'next'
import Link from 'next/link'

const SITE_URL = 'https://www.shamimforever.com'

export const metadata: Metadata = {
  title: {
    absolute: 'Shamim Forever Newsroom — The Official House Record',
  },
  description:
    'Shamim Forever newsroom for verified announcements, House Journal stories, research, milestones and independent coverage for clients and journalists worldwide.',
  alternates: {
    canonical: `${SITE_URL}/newsroom`,
  },
  openGraph: {
    title: 'Shamim Forever Newsroom — The Official House Record',
    description:
      'The living official record of Shamim Forever: announcements, ideas, research, milestones and clearly labelled independent coverage.',
    url: `${SITE_URL}/newsroom`,
    siteName: 'Shamim Forever',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/logo-sf.png`,
        width: 512,
        height: 512,
        alt: 'Shamim Forever monogram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shamim Forever Newsroom — The Official House Record',
    description:
      'Verified announcements, House Journal stories, research and milestones from Shamim Forever.',
    images: [`${SITE_URL}/logo-sf.png`],
  },
}

const journalCategories = [
  ['Heritage', 'History, culture, craftsmanship and the references that inform the House.'],
  ['Craft', 'Materials, artisans, techniques, design processes and quality.'],
  ['Scent', 'Perfumery, fragrance architecture, ingredients and olfactory philosophy.'],
  ['Jewelry', 'Design, symbolism, materials and collectible pieces.'],
  ['Sovereign Luxury', 'The principles behind identity, privacy, authenticity and enduring value.'],
  ['Technology', 'Digital identity, authentication and the infrastructure supporting the ecosystem.'],
  ['The Future', 'Long-term projects, new categories and the questions shaping what comes next.'],
  ['People', 'Founders, designers, artisans, researchers and the wider House.'],
] as const

const latestStreams = [
  'House announcements',
  'New collections',
  'Maison & boutique developments',
  'Technology & innovation',
  'Founder & leadership',
  'Research & publications',
  'Events & experiences',
  'Partnerships',
  'Sustainability',
  'Community & cultural initiatives',
] as const

const researchStreams = [
  'Luxury industry research',
  'Consumer & cultural research',
  'Fragrance research',
  'Materials research',
  'Digital luxury',
  'Blockchain & authentication',
  'AI & luxury',
  'Digital identity',
  'Web3 infrastructure',
  'Sovereign infrastructure',
  'Sustainability research',
  'Future of retail and ownership',
] as const

const milestones = [
  'Foundation',
  'First collection',
  'First maison or boutique',
  'Technology development',
  'International expansion',
  'Major collections',
  'Research milestones',
  'Future',
] as const

const newsroomStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/newsroom#webpage`,
      url: `${SITE_URL}/newsroom`,
      name: 'Shamim Forever Newsroom — The Official House Record',
      description:
        'The living official record of Shamim Forever: verified announcements, stories, research, milestones and independent coverage.',
      inLanguage: 'en',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${SITE_URL}/newsroom#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/newsroom#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Shamim Forever',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Newsroom',
          item: `${SITE_URL}/newsroom`,
        },
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Shamim Forever',
      url: SITE_URL,
      logo: `${SITE_URL}/logo-sf.png`,
      description:
        'Shamim Forever is a sovereign luxury house built around identity, craftsmanship, heritage, innovation and enduring value.',
      publishingPrinciples: `${SITE_URL}/newsroom#editorial-policy`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'media relations',
          email: 'media@shamimforever.com',
          url: `${SITE_URL}/newsroom#media-contact`,
        },
        {
          '@type': 'ContactPoint',
          contactType: 'corporate relations',
          email: 'relations@shamimforever.com',
          url: `${SITE_URL}/newsroom#media-contact`,
        },
      ],
      subjectOf: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/newsroom#webpage`,
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/newsroom#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How is the Newsroom different from Press & Media?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Press & Media is a resource centre for journalists. The Newsroom is the public, official record of announcements, stories, research, milestones and clearly labelled independent coverage.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are all Newsroom items published by Shamim Forever?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. House communications and editorial stories are published by the House, while independent coverage is identified separately with its original publisher and source.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I request verification or a correction?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Contact media@shamimforever.com with the relevant Newsroom item, the point requiring review and supporting information.',
          },
        },
      ],
    },
  ],
}

function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: string
  eyebrow: string
  title: string
  intro: string
}) {
  return (
    <div className="mb-12 grid gap-7 border-t border-[#2a261f] pt-5 md:grid-cols-[90px_minmax(0,1fr)_minmax(240px,360px)] md:gap-10">
      <span className="font-sans text-[10px] tracking-[0.38em] text-[#9b7947]">{index}</span>
      <div>
        <p className="mb-4 font-sans text-[9px] uppercase tracking-[0.32em] text-[#6f604a]">{eyebrow}</p>
        <h2 className="font-serif text-4xl font-light leading-[0.93] tracking-[0.04em] text-[#f0ece3] sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </div>
      <p className="max-w-sm font-sans text-xs font-light leading-7 tracking-[0.08em] text-[#8c8880]">
        {intro}
      </p>
    </div>
  )
}

function EmptyState({
  label = 'No public items published yet',
  detail = 'This space will be updated when a verified item enters the House record.',
}: {
  label?: string
  detail?: string
}) {
  return (
    <div className="border border-dashed border-[#4a3d29] bg-[#0c0b09] px-6 py-10 sm:px-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[#b08b51]" />
        <span className="font-sans text-[9px] uppercase tracking-[0.34em] text-[#b08b51]">Record status</span>
      </div>
      <p className="font-serif text-3xl font-light tracking-[0.02em] text-[#ece7dc]">{label}</p>
      <p className="mt-4 max-w-xl font-sans text-xs font-light leading-7 tracking-[0.06em] text-[#77736c]">{detail}</p>
    </div>
  )
}

function PlannedStream({
  title,
  detail,
}: {
  title: string
  detail: string
}) {
  return (
    <div className="group border-b border-[#25231f] py-5 transition-colors duration-500 hover:border-[#8f6f40]">
      <div className="flex items-start justify-between gap-8">
        <h3 className="font-serif text-xl font-light tracking-[0.03em] text-[#e4dfd5] transition-colors duration-500 group-hover:text-[#c9a054]">
          {title}
        </h3>
        <span className="shrink-0 pt-1 font-sans text-[8px] uppercase tracking-[0.28em] text-[#665e52]">Planned</span>
      </div>
      <p className="mt-2 max-w-2xl font-sans text-[11px] font-light leading-6 tracking-[0.04em] text-[#77736c]">{detail}</p>
    </div>
  )
}

function ContactLine({ label, email }: { label: string; email: string }) {
  return (
    <div className="flex flex-col gap-2 border-b border-[#292720] py-5 sm:flex-row sm:items-center sm:justify-between">
      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8b857b]">{label}</span>
      <a className="font-serif text-2xl font-light tracking-[0.02em] text-[#d4ad69] transition-colors duration-300 hover:text-[#f0ece3]" href={`mailto:${email}`}>
        {email}
      </a>
    </div>
  )
}

export default function NewsroomPage() {
  return (
    <article className="overflow-hidden bg-[#050505] text-[#e4e4e7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsroomStructuredData) }}
      />

      <header className="relative border-b border-[#1d1b18] px-6 pb-24 pt-24 sm:px-10 sm:pb-32 sm:pt-32 lg:px-20">
        <div className="pointer-events-none absolute right-[-8rem] top-[-5rem] h-[30rem] w-[30rem] rounded-full border border-[#6f5835]/20" />
        <div className="pointer-events-none absolute right-[-2rem] top-1/4 h-[18rem] w-[18rem] rounded-full border border-[#6f5835]/10" />
        <div className="relative mx-auto max-w-[1320px]">
          <div className="mb-20 flex items-center gap-4 font-sans text-[9px] uppercase tracking-[0.4em] text-[#9b7947]">
            <span>Shamim Forever</span>
            <span className="h-px w-10 bg-[#9b7947]/50" />
            <span>Official record</span>
          </div>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end lg:gap-24">
            <div>
              <p className="mb-7 font-sans text-[10px] uppercase tracking-[0.48em] text-[#b8955b]">Newsroom</p>
              <h1 className="max-w-5xl font-serif text-6xl font-light leading-[0.86] tracking-[-0.01em] text-[#f3efe7] sm:text-8xl lg:text-[8.6rem]">
                The Official
                <br />
                <em className="text-[#c9a054]">Record</em> of
                <br />
                Shamim Forever
              </h1>
              <p className="mt-10 max-w-xl font-sans text-sm font-light leading-8 tracking-[0.08em] text-[#9a958b]">
                News, ideas, milestones and stories from the House. A permanent public record for the people who follow, study and build alongside Shamim Forever.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a className="inline-flex border border-[#c9a054] px-6 py-3 font-sans text-[9px] uppercase tracking-[0.32em] text-[#c9a054] transition-colors duration-500 hover:bg-[#c9a054] hover:text-[#050505]" href="#latest">
                  Latest from the House
                </a>
                <a className="inline-flex border border-[#39342b] px-6 py-3 font-sans text-[9px] uppercase tracking-[0.32em] text-[#aaa398] transition-colors duration-500 hover:border-[#9b7947] hover:text-[#e9e1d2]" href="#journal">
                  House Journal
                </a>
              </div>
            </div>
            <aside className="border-l border-[#4b3d2a] pl-7 lg:mb-2">
              <p className="font-sans text-[9px] uppercase tracking-[0.38em] text-[#b8955b]">A distinction worth making</p>
              <h2 className="mt-6 font-serif text-3xl font-light leading-tight text-[#ede8de]">Record, not resource centre.</h2>
              <p className="mt-5 font-sans text-xs font-light leading-7 tracking-[0.05em] text-[#858078]">
                Press &amp; Media is where journalists find assets, biographies and media guidance. The Newsroom is where the House records what has happened, what has been studied and what is officially on record.
              </p>
              <Link className="mt-7 inline-flex border-b border-[#9b7947] pb-2 font-sans text-[9px] uppercase tracking-[0.32em] text-[#c9a054] transition-colors duration-300 hover:text-[#f1ece3]" href="/press-media">
                Visit Press &amp; Media
              </Link>
            </aside>
          </div>
          <div className="mt-20 flex flex-wrap gap-x-10 gap-y-3 border-t border-[#24211d] pt-5 font-sans text-[9px] uppercase tracking-[0.28em] text-[#625c53]">
            <span>Verified</span>
            <span>Precise</span>
            <span>Official</span>
            <span>Permanent</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-20">
        <section className="grid gap-10 border-b border-[#1d1b18] py-20 md:grid-cols-[1fr_1.35fr] md:gap-24 md:py-28">
          <div>
            <p className="font-sans text-[9px] uppercase tracking-[0.42em] text-[#9b7947]">The newsroom promise</p>
            <h2 className="mt-7 max-w-md font-serif text-4xl font-light leading-[0.98] tracking-[0.02em] text-[#eee8dc] sm:text-5xl">A House that keeps its own record.</h2>
          </div>
          <div className="max-w-2xl space-y-6 font-sans text-sm font-light leading-8 tracking-[0.04em] text-[#8f8a81]">
            <p>Welcome to the official newsroom of Shamim Forever, a sovereign luxury house built around craftsmanship, identity, technology, heritage and long-term vision.</p>
            <p>The Newsroom is the living public record of the House: its announcements, launches, milestones, people, ideas, research, collaborations, developments and stories. Each publication will provide a clear account of what Shamim Forever is building, where the House is going and the principles guiding its evolution.</p>
          </div>
        </section>

        <section className="py-24 sm:py-32" id="latest">
          <SectionHeading index="01" eyebrow="Latest" title="The House, in motion." intro="The latest developments from Shamim Forever, presented chronologically when verified items enter the public record." />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.55fr)]">
            <EmptyState detail="The latest stream is ready for official announcements, launches, stories, research and milestones. No placeholder headlines are used here." />
            <div className="border border-[#25231f] px-6 py-7 sm:px-8">
              <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-[#9b7947]">Planned streams</p>
              <ul className="mt-5 divide-y divide-[#25231f]">
                {latestStreams.map((stream, index) => (
                  <li className="flex gap-4 py-3 font-sans text-[10px] uppercase tracking-[0.14em] text-[#777269]" key={stream}>
                    <span className="text-[#524a3e]">{String(index + 1).padStart(2, '0')}</span>
                    <span>{stream}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-[#1d1b18] py-24 sm:py-32" id="announcements">
          <SectionHeading index="02" eyebrow="Official communications" title="House announcements." intro="Material issued directly by Shamim Forever concerning corporate developments, ventures, boutiques, products, leadership, initiatives and institutional progress." />
          <EmptyState label="No public announcements published yet" detail="When an announcement is issued, this section will carry its date, factual introduction, official statement, House boilerplate and media contact." />
        </section>

        <section className="border-t border-[#1d1b18] py-24 sm:py-32" id="journal">
          <SectionHeading index="03" eyebrow="Editorial publication" title="The House Journal." intro="A long-form editorial layer exploring the world behind Shamim Forever. These are planned categories, not a claim of published articles." />
          <div className="grid gap-x-12 gap-y-0 sm:grid-cols-2">
            {journalCategories.map(([title, detail]) => (
              <PlannedStream detail={detail} key={title} title={title} />
            ))}
          </div>
          <div className="mt-10">
            <EmptyState label="No House Journal stories published yet" detail="The Journal will become a considered publication of craft, culture, scent, technology and the people of the House. No Article schema is used until real stories exist." />
          </div>
        </section>

        <section className="grid gap-16 border-t border-[#1d1b18] py-24 sm:py-32 lg:grid-cols-2 lg:gap-24" id="founder">
          <div>
            <SectionHeading index="04" eyebrow="From the founder" title="Founder’s Desk." intro="A deliberate home for founder letters, founder notes, leadership perspectives and an annual statement." />
            <EmptyState label="No Founder’s Desk items published yet" detail="The desk will not be used as a stream of passing thoughts. It will open when an approved founder communication belongs in the permanent record." />
          </div>
          <div>
            <SectionHeading index="05" eyebrow="Research from the House" title="Research & intelligence." intro="A future library for serious intellectual work across luxury, culture, materials, digital identity, technology and ownership." />
            <div className="border border-[#25231f] px-6 py-5 sm:px-8">
              {researchStreams.map((stream) => (
                <div className="flex items-center justify-between border-b border-[#25231f] py-3 last:border-b-0" key={stream}>
                  <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#898277]">{stream}</span>
                  <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#5e574c]">Planned</span>
                </div>
              ))}
            </div>
            <p className="mt-5 font-sans text-[10px] leading-6 tracking-[0.06em] text-[#6f6a61]">Each future publication will identify its author, date, category, abstract, version history, citation information and download where applicable.</p>
          </div>
        </section>

        <section className="grid gap-16 border-t border-[#1d1b18] py-24 sm:py-32 lg:grid-cols-2 lg:gap-24" id="collections">
          <div>
            <SectionHeading index="06" eyebrow="The collections" title="Product & collection news." intro="A record of genuine collection news, from creative direction and materials to availability and authenticity information." />
            <div className="grid grid-cols-2 gap-px border border-[#25231f] bg-[#25231f]">
              {['New fragrances', 'Bespoke fragrances', 'Jewelry', 'Collectibles', 'Luxury objects', 'Limited editions', 'Digital products', 'Membership products', 'Future categories'].map((item) => (
                <div className="bg-[#090909] px-4 py-5 font-sans text-[9px] uppercase leading-5 tracking-[0.18em] text-[#837d72]" key={item}>{item}</div>
              ))}
            </div>
            <p className="mt-5 font-sans text-[10px] leading-6 tracking-[0.06em] text-[#6f6a61]">Planned archive. No launch, collection or availability claim is published here until it is officially confirmed.</p>
          </div>
          <div id="maison">
            <SectionHeading index="07" eyebrow="From the maison" title="Maison & boutique developments." intro="Location profiles for boutiques, private client spaces, atelier developments and the experiences around them." />
            <EmptyState label="No public maison developments published yet" detail="A future profile will identify a location, its status, the experience it offers and the official imagery associated with it." />
          </div>
        </section>

        <section className="border-t border-[#1d1b18] py-24 sm:py-32" id="technology">
          <SectionHeading index="08" eyebrow="Engineering the future of luxury" title="Technology & innovation." intro="A clear explanation of digital identity, authentication, product passports, privacy and security—only where the underlying work genuinely exists." />
          <div className="grid gap-px border border-[#25231f] bg-[#25231f] sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Digital identity', 'How products and clients may receive secure digital identities.'],
              ['Authentication', 'Methods used to verify authenticity, when formally documented.'],
              ['Digital product passports', 'Product-level provenance and ownership records, when available.'],
              ['Blockchain infrastructure', 'Architecture explained without turning plans into present-tense claims.'],
              ['AI', 'AI-assisted services, personalisation and operational intelligence, when verified.'],
              ['Sovereign Vault', 'Private digital infrastructure and long-term stewardship, when formally documented.'],
              ['Inner Circle', 'Membership and private-client technology, when available and verified.'],
              ['Privacy & security', 'Protection, authentication, access control and infrastructure principles.'],
            ].map(([title, detail]) => (
              <div className="bg-[#090909] p-6 sm:p-8" key={title}>
                <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#9b7947]">Planned stream</span>
                <h3 className="mt-5 font-serif text-2xl font-light text-[#e5dfd3]">{title}</h3>
                <p className="mt-3 font-sans text-[11px] leading-6 tracking-[0.04em] text-[#777269]">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-16 border-t border-[#1d1b18] py-24 sm:py-32 lg:grid-cols-2 lg:gap-24" id="sustainability">
          <div>
            <SectionHeading index="09" eyebrow="Building with long-term responsibility" title="Sustainability." intro="A place for evidence-led reporting on materials, packaging, manufacturing, longevity, repair, reuse, sourcing, energy and community initiatives." />
            <EmptyState label="No public sustainability updates published yet" detail="Quantitative claims will only appear alongside supporting evidence. The planned stream is not a substitute for a progress report." />
          </div>
          <div>
            <SectionHeading index="10" eyebrow="The Shamim Forever calendar" title="Events & experiences." intro="An official calendar and archive for presentations, fragrance experiences, exhibitions, cultural events, investor events and Maison gatherings." />
            <EmptyState label="No public events published yet" detail="Dates, locations, participants and highlights will be added only for confirmed events with an official record." />
          </div>
        </section>

        <section className="grid gap-16 border-t border-[#1d1b18] py-24 sm:py-32 lg:grid-cols-2 lg:gap-24" id="partnerships">
          <div>
            <SectionHeading index="11" eyebrow="In good company" title="Partnerships & collaborations." intro="A transparent archive of genuine creative, technology, hospitality, retail, cultural, research, strategic and community relationships." />
            <EmptyState label="No public partnerships published yet" detail="Future entries will distinguish the partner, nature of relationship, scope, dates, duration and official statement." />
          </div>
          <div id="media-coverage">
            <SectionHeading index="12" eyebrow="In the press" title="Independent media coverage." intro="Independent reporting belongs in the record, but never in the same category as a House announcement or paid and commissioned content." />
            <EmptyState label="No independent coverage listed yet" detail="When verified, each item will name the publication, headline, date, topic and original article. Paid or commissioned content will not be presented as independent editorial coverage." />
          </div>
        </section>

        <section className="grid gap-16 border-t border-[#1d1b18] py-24 sm:py-32 lg:grid-cols-2 lg:gap-24" id="recognition">
          <div>
            <SectionHeading index="13" eyebrow="Evidence before distinction" title="Recognition." intro="Only independently verifiable awards and recognition belong here. The absence of a list is preferable to an unsupported accolade." />
            <EmptyState label="No verified recognition published yet" detail="Each future entry will include the organisation, category, year, recipient and a source that can be independently checked." />
          </div>
          <div id="timeline">
            <SectionHeading index="14" eyebrow="The House timeline" title="Corporate milestones." intro="A framework for the House timeline. It will be populated as actual milestones occur and are formally recorded." />
            <ol className="border-l border-[#6d5734] pl-6">
              {milestones.map((milestone, index) => (
                <li className="relative border-b border-[#25231f] py-4 last:border-b-0" key={milestone}>
                  <span className="absolute -left-[1.73rem] top-5 h-2 w-2 rounded-full border border-[#a27d47] bg-[#050505]" />
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-serif text-xl font-light text-[#ddd6c9]">{milestone}</span>
                    <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#625b50]">{String(index + 1).padStart(2, '0')} / planned</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-[#1d1b18] py-24 sm:py-32" id="archive">
          <SectionHeading index="15" eyebrow="The archive" title="Find the record." intro="Every future article will have a permanent URL. The interface below establishes the archive language without pretending that an unpublished database already exists." />
          <div className="border border-[#332b20] bg-[#0b0a08] p-6 sm:p-10">
            <div className="grid gap-5 md:grid-cols-[1.35fr_repeat(3,minmax(0,0.8fr))_auto] md:items-end">
              <label className="block">
                <span className="mb-3 block font-sans text-[9px] uppercase tracking-[0.3em] text-[#9b7947]">Search</span>
                <input aria-label="Search the Shamim Forever Newsroom" className="w-full border-b border-[#695333] bg-transparent px-0 py-3 font-serif text-xl font-light text-[#a39c91] outline-none placeholder:text-[#5e584e]" disabled placeholder="Search the Shamim Forever Newsroom" />
              </label>
              <label className="block">
                <span className="mb-3 block font-sans text-[9px] uppercase tracking-[0.3em] text-[#9b7947]">Year</span>
                <select aria-label="Filter by year" className="w-full border-b border-[#695333] bg-[#0b0a08] py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#777269]" disabled defaultValue="all">
                  <option value="all">All years</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-3 block font-sans text-[9px] uppercase tracking-[0.3em] text-[#9b7947]">Type</span>
                <select aria-label="Filter by type" className="w-full border-b border-[#695333] bg-[#0b0a08] py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#777269]" disabled defaultValue="all">
                  <option value="all">All records</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-3 block font-sans text-[9px] uppercase tracking-[0.3em] text-[#9b7947]">Region</span>
                <select aria-label="Filter by region" className="w-full border-b border-[#695333] bg-[#0b0a08] py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#777269]" disabled defaultValue="all">
                  <option value="all">Global record</option>
                </select>
              </label>
              <span className="border border-[#3c3325] px-5 py-3 text-center font-sans text-[9px] uppercase tracking-[0.26em] text-[#6d665b]">Archive planned</span>
            </div>
            <div className="mt-10 border-t border-[#25231f] pt-7">
              <div className="flex flex-wrap gap-x-7 gap-y-3 font-sans text-[9px] uppercase tracking-[0.16em] text-[#655e53]">
                {['Announcement', 'Journal', 'Research', 'Founder', 'Collection', 'Technology', 'Sustainability', 'Event', 'Partnership', 'Media coverage'].map((type) => <span key={type}>{type}</span>)}
              </div>
              <p className="mt-8 font-serif text-2xl font-light text-[#d5cec1]">The planned archive is quiet by design.</p>
              <p className="mt-3 max-w-xl font-sans text-xs leading-6 tracking-[0.05em] text-[#736d63]">Filters will activate as verified publications are added. Until then, this page will not manufacture a chronology to create the appearance of activity.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-16 border-t border-[#1d1b18] py-24 sm:py-32 lg:grid-cols-2 lg:gap-24" id="editorial-policy">
          <div>
            <SectionHeading index="16" eyebrow="For editors & journalists" title="Media resources." intro="Press & Media remains the resource centre for logos, biographies, imagery, documents, interview requests and media guidance." />
            <div className="border border-[#25231f] p-7 sm:p-9">
              <p className="font-serif text-3xl font-light leading-tight text-[#e8e1d5]">Need the working materials?</p>
              <p className="mt-5 font-sans text-xs leading-7 tracking-[0.05em] text-[#7f796e]">The media asset library belongs with the Press & Media service. It is not duplicated here as a second, disconnected download centre.</p>
              <Link className="mt-8 inline-flex border border-[#c9a054] px-6 py-3 font-sans text-[9px] uppercase tracking-[0.3em] text-[#c9a054] transition-colors duration-500 hover:bg-[#c9a054] hover:text-[#050505]" href="/press-media">Open Press &amp; Media resources</Link>
            </div>
          </div>
          <div>
            <SectionHeading index="17" eyebrow="Our editorial standard" title="Clear categories. Clean record." intro="Material claims should be checked against primary evidence. AI may assist workflow, but human verification remains responsible for the published record." />
            <div className="space-y-4">
              {[
                ['Official communications', 'Published by the House.'],
                ['Editorial stories', 'Produced for the House Journal.'],
                ['Independent media coverage', 'Published by external media organisations.'],
                ['Partner content', 'Created collaboratively or commercially.'],
              ].map(([title, detail]) => (
                <div className="border-l border-[#9b7947] bg-[#0b0a08] px-6 py-5" key={title}>
                  <h3 className="font-serif text-2xl font-light text-[#e4ddd1]">{title}</h3>
                  <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.12em] text-[#777066]">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-16 border-t border-[#1d1b18] py-24 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24" id="corrections">
          <div>
            <p className="font-sans text-[9px] uppercase tracking-[0.42em] text-[#9b7947]">18 / Setting the record straight</p>
            <h2 className="mt-7 font-serif text-5xl font-light leading-[0.95] text-[#eee8dc]">Corrections &amp; updates.</h2>
          </div>
          <div className="space-y-6 font-sans text-sm font-light leading-8 tracking-[0.04em] text-[#858078]">
            <p>Accuracy matters to the House. If a published newsroom item contains a factual error, material omission or outdated information, Shamim Forever will review the matter and, where appropriate, update the publication.</p>
            <p>Material corrections should be identified clearly rather than silently rewriting the historical record. For a correction, verification request or update, contact the media desk.</p>
            <a className="inline-flex border-b border-[#9b7947] pb-2 font-serif text-xl font-light text-[#c9a054] transition-colors duration-300 hover:text-[#f1ece3]" href="mailto:media@shamimforever.com">media@shamimforever.com</a>
          </div>
        </section>

        <section className="border-t border-[#1d1b18] py-24 sm:py-32" id="subscription">
          <div className="grid gap-12 border border-[#463723] bg-[#0c0a07] p-7 sm:p-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="font-sans text-[9px] uppercase tracking-[0.42em] text-[#b8955b]">19 / Stay informed</p>
              <h2 className="mt-6 max-w-2xl font-serif text-5xl font-light leading-[0.93] text-[#f0e9dc] sm:text-6xl">A considered signal from the House.</h2>
              <p className="mt-7 max-w-xl font-sans text-xs leading-7 tracking-[0.06em] text-[#898176]">A subscription service will open when the Newsroom has a published record to send. Until then, media and corporate enquiries can be directed to the appropriate desk.</p>
            </div>
            <div className="lg:border-l lg:border-[#403322] lg:pl-10">
              <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#736b5d]">Subscription status</p>
              <p className="mt-4 font-serif text-3xl font-light text-[#d8d0c1]">Not yet active.</p>
              <a className="mt-7 inline-flex border border-[#c9a054] px-6 py-3 font-sans text-[9px] uppercase tracking-[0.3em] text-[#c9a054] transition-colors duration-500 hover:bg-[#c9a054] hover:text-[#050505]" href="mailto:media@shamimforever.com?subject=Newsroom%20updates">Request newsroom updates</a>
            </div>
          </div>
        </section>

        <section className="grid gap-16 border-t border-[#1d1b18] py-24 sm:py-32 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24" id="media-contact">
          <div>
            <p className="font-sans text-[9px] uppercase tracking-[0.42em] text-[#9b7947]">20 / The press office</p>
            <h2 className="mt-7 font-serif text-5xl font-light leading-[0.95] text-[#eee8dc]">Speak to the right desk.</h2>
            <p className="mt-6 max-w-sm font-sans text-xs leading-7 tracking-[0.05em] text-[#777269]">For interview requests, editorial enquiries, image requests, official statements or verification of published information, contact the appropriate desk.</p>
          </div>
          <div>
            <ContactLine email="media@shamimforever.com" label="General media" />
            <ContactLine email="relations@shamimforever.com" label="Corporate relations" />
            <ContactLine email="maisons@shamimforever.com" label="Maison & boutique" />
            <ContactLine email="bespoke@shamimforever.com" label="Bespoke" />
          </div>
        </section>

        <section className="border-t border-[#1d1b18] py-24 sm:py-32" id="boilerplate">
          <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr] md:gap-24">
            <div>
              <p className="font-sans text-[9px] uppercase tracking-[0.42em] text-[#9b7947]">21 / Official boilerplate</p>
              <h2 className="mt-7 font-serif text-5xl font-light leading-[0.95] text-[#eee8dc]">About Shamim Forever.</h2>
            </div>
            <div className="max-w-3xl border-l border-[#9b7947] pl-7 font-serif text-2xl font-light leading-[1.45] text-[#c9c1b3] sm:pl-10 sm:text-3xl">
              <p>Shamim Forever is a sovereign luxury house built around the principles of identity, craftsmanship, heritage, innovation and enduring value.</p>
              <p className="mt-7">The House brings together luxury products, bespoke experiences, technology, private-client services and emerging forms of digital identity within a unified ecosystem.</p>
              <p className="mt-7">Shamim Forever&apos;s philosophy is rooted in the belief that luxury should not be defined solely by material rarity, but also by authenticity, craftsmanship, privacy, personalisation and lasting cultural and personal significance.</p>
            </div>
          </div>
        </section>

        <section className="border-t border-[#1d1b18] py-24 sm:py-32" id="faq">
          <div className="mb-12">
            <p className="font-sans text-[9px] uppercase tracking-[0.42em] text-[#9b7947]">Questions of record</p>
            <h2 className="mt-6 font-serif text-5xl font-light text-[#eee8dc]">Newsroom, clarified.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['How is the Newsroom different from Press & Media?', 'Press & Media is a resource centre for journalists. The Newsroom is the public, official record of announcements, stories, research, milestones and clearly labelled independent coverage.'],
              ['Are all items published by Shamim Forever?', 'No. House communications and editorial stories are published by the House. Independent coverage is identified separately with its original publisher and source.'],
              ['How can I request a correction?', 'Contact media@shamimforever.com with the relevant item, the point requiring review and supporting information.'],
            ].map(([question, answer]) => (
              <div className="border-t border-[#8f6f40] pt-5" key={question}>
                <h3 className="font-serif text-2xl font-light leading-tight text-[#ded7ca]">{question}</h3>
                <p className="mt-4 font-sans text-[11px] leading-6 tracking-[0.04em] text-[#797268]">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[#1d1b18] py-24 sm:py-32">
          <div className="flex flex-col justify-between gap-10 border border-[#4c3d28] p-7 sm:p-12 md:flex-row md:items-end">
            <div>
              <p className="font-sans text-[9px] uppercase tracking-[0.42em] text-[#b8955b]">The record continues</p>
              <h2 className="mt-6 max-w-2xl font-serif text-5xl font-light leading-[0.94] text-[#f0e9dc] sm:text-7xl">When it is true, it belongs here.</h2>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a className="inline-flex border border-[#c9a054] px-6 py-3 font-sans text-[9px] uppercase tracking-[0.3em] text-[#c9a054] transition-colors duration-500 hover:bg-[#c9a054] hover:text-[#050505]" href="#archive">Browse the archive</a>
              <Link className="inline-flex border border-[#39342b] px-6 py-3 font-sans text-[9px] uppercase tracking-[0.3em] text-[#aaa398] transition-colors duration-500 hover:border-[#9b7947] hover:text-[#e9e1d2]" href="/press-media">Press resources</Link>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-sans text-[9px] uppercase tracking-[0.2em] text-[#625d54]">
            <Link className="transition-colors hover:text-[#c9a054]" href="/corporate-information">Corporate information</Link>
            <Link className="transition-colors hover:text-[#c9a054]" href="/founder-leadership">Founder &amp; leadership</Link>
            <Link className="transition-colors hover:text-[#c9a054]" href="/sustainability">Sustainability</Link>
            <Link className="transition-colors hover:text-[#c9a054]" href="/policies">Policies</Link>
          </div>
        </section>
      </main>
    </article>
  )
}