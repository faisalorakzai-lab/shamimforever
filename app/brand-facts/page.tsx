import type { Metadata } from 'next'
    import Link from 'next/link'
    import Script from 'next/script'
    import BrandFactsLibrary from './BrandFactsLibrary'

    export const metadata: Metadata = {
    title: 'Brand Facts | The Definitive Record of the House',
    description: 'The definitive factual record of Shamim Forever: identity, philosophy, brand DNA, architecture, visual language, craftsmanship, client experience, heritage, innovation, ethics, and legacy.',
    keywords: [
      'Shamim Forever brand facts',
      'Shamim Forever brand identity',
      'Sovereign Luxury House',
      'Shamim Forever philosophy',
      'Shamim Forever brand architecture',
      'luxury house craftsmanship',
      'Shamim Forever heritage',
      'Shamim Forever authenticity',
      'Shamim Forever founder',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/brand-facts' },
    openGraph: {
      title: 'Brand Facts | The Definitive Record of the House',
      description: 'The official Brand Intelligence and factual reference layer for Shamim Forever.',
      url: 'https://www.shamimforever.com/brand-facts',
      type: 'website',
      siteName: 'Shamim Forever',
      images: [{ url: '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Brand Facts | Shamim Forever',
      description: 'The definitive record of the House.',
      images: ['/logo-sf.png'],
    },
    robots: { index: true, follow: true },
    }

    const identityFacts = [
    ['Official name', 'Shamim Forever', 'OFFICIAL'],
    ['Brand designation', 'Sovereign Luxury House', 'OFFICIAL'],
    ['Core philosophy', 'Built From Love. Forged Into Legacy.', 'OFFICIAL'],
    ['Founded', '2023', 'VERIFIED'],
    ['Founder & Chairman', 'Faisal Orakzai', 'OFFICIAL'],
    ['Chief Executive Officer', 'Dr Asma Orakzai', 'OFFICIAL'],
    ['Director', 'Dr Laiba Faisal Orakzai', 'OFFICIAL'],
    ['Primary domain', 'shamimforever.com', 'OFFICIAL'],
    ]

    const dna = [
    ['01', 'Emotional Permanence', 'Objects and experiences should carry meaning beyond the moment.'],
    ['02', 'Sovereign Identity', 'The House maintains a distinctive point of view rather than following temporary trends.'],
    ['03', 'Quiet Excellence', 'Luxury does not require visual noise, volume, or unnecessary exposure.'],
    ['04', 'Human Craft', 'Technology may enhance craftsmanship, but should never erase the human element.'],
    ['05', 'Authenticity', 'Meaningful claims should be supported by information that can be responsibly understood.'],
    ['06', 'Personalization', 'The relationship with a client should feel individual rather than mass-produced.'],
    ['07', 'Heritage', 'Past knowledge should inform future creation without becoming a museum of the past.'],
    ['08', 'Innovation', 'Innovation exists to improve experience, quality, access, and preservation.'],
    ['09', 'Responsibility', 'Luxury carries responsibility toward people, materials, culture, and the future.'],
    ['10', 'Legacy', 'The ultimate objective is not consumption. It is continuity.'],
    ]

    const principles = [
    ['Permanence', 'Create for meaning beyond the moment.'],
    ['Authenticity', 'Never compromise the truth of an object or experience.'],
    ['Craft', 'Respect the people and processes behind creation.'],
    ['Discretion', 'Luxury does not require unnecessary exposure.'],
    ['Individuality', 'The client should not feel mass-produced.'],
    ['Heritage', 'Preserve what deserves preservation.'],
    ['Innovation', 'Build the future without destroying the past.'],
    ['Precision', 'Details are not decoration. They are the standard.'],
    ['Responsibility', 'Every creation exists within a wider world.'],
    ['Continuity', 'A House must think beyond one collection.'],
    ['Experience', 'The relationship matters as much as the object.'],
    ['Legacy', 'The final measure is what remains.'],
    ]

    const architecture = [
    ['The House', 'The central institutional identity of Shamim Forever.', '/learn/the-house'],
    ['Luxury', 'The philosophy and expression of luxury within the House.', '/learn/luxury'],
    ['Our World', 'The cultural, creative, and experiential universe surrounding the House.', '/learn/our-world'],
    ['Authenticity', 'The trust, provenance, and verification layer.', '/learn/authenticity'],
    ['Innovation', 'The technological and creative future of the House.', '/learn/innovation'],
    ['Sovereign Infrastructure', 'The architecture supporting access, care, delivery, preservation, and long-term operations.', '/learn/sovereign-infrastructure'],
    ['Brand Facts', 'The factual reference layer explaining the identity and architecture of Shamim Forever.', '/brand-facts'],
    ]

    const chapters = [
    ['01', 'Brand identity', 'The official name, designation, philosophy, and defining facts.', '#identity'],
    ['02', 'The name', 'The meaning of Shamim and the House relationship with Forever.', '#name'],
    ['03', 'The House', 'What Shamim Forever is and the ecosystem it is building.', '#the-house'],
    ['04', 'Brand philosophy', 'Luxury as meaning, craft, authenticity, experience, and time.', '#philosophy'],
    ['05', 'Brand DNA', 'Ten permanent principles that guide future expression.', '#dna'],
    ['06', 'House principles', 'The twelve standards behind creation and continuity.', '#principles'],
    ['07', 'Brand architecture', 'The layers that make the House legible without duplication.', '#architecture'],
    ['08', 'Visual identity', 'Black, gold, restraint, negative space, and cinematic direction.', '#visual-identity'],
    ['09', 'Craft and materials', 'The House standard from concept through archive.', '#craft'],
    ['10', 'Client experience', 'Discovery, curation, bespoke creation, care, and legacy.', '#client-experience'],
    ['11', 'Heritage and archive', 'Past, present, future, and the preservation of meaning.', '#heritage'],
    ['12', 'Innovation and technology', 'Technology that serves authenticity, access, and preservation.', '#technology'],
    ['13', 'Culture and global identity', 'Heritage with contemporary design and cultural respect.', '#culture'],
    ['14', 'Sustainability and ethics', 'Longevity, repair, privacy, honesty, and responsibility.', '#responsibility'],
    ['15', 'Reference library', 'Searchable, status-aware facts and links to deeper House pages.', '#fact-library'],
    ]

    const factLibraryEntries = [
    { category: 'Identity', term: 'Official name', description: 'Shamim Forever.', status: 'OFFICIAL' },
    { category: 'Identity', term: 'Brand designation', description: 'Sovereign Luxury House.', status: 'OFFICIAL' },
    { category: 'Identity', term: 'House philosophy', description: 'Built From Love. Forged Into Legacy.', status: 'OFFICIAL' },
    { category: 'Identity', term: 'Core idea', description: 'Luxury becomes more meaningful with time, not less.', status: 'OFFICIAL' },
    { category: 'Identity', term: 'Brand language', description: 'House, sovereign, legacy, heritage, atelier, archive, heirloom, private, bespoke, authenticity, provenance, concierge, craft, continuity, identity, experience, and preservation.', status: 'OFFICIAL' },
    { category: 'Design', term: 'Primary visual language', description: 'Deep black, warm metallic gold, restrained typography, negative space, architectural layouts, editorial photography, and cinematic imagery.', status: 'OFFICIAL' },
    { category: 'Design', term: 'Visual principle', description: 'Quiet authority rather than loud wealth.', status: 'OFFICIAL' },
    { category: 'Design', term: 'Symbol system', description: 'Primary mark, monogram, House signature, digital signature, and collection signatures.', status: 'DEVELOPING' },
    { category: 'Design', term: 'Material philosophy', description: 'Durability, provenance, craftsmanship, tactile quality, visual aging, repairability, and emotional value.', status: 'OFFICIAL' },
    { category: 'Experience', term: 'House relationship', description: 'Identity → Discovery → Creation → Authentication → Experience → Care → Preservation → Legacy.', status: 'OFFICIAL' },
    { category: 'Experience', term: 'Private client philosophy', description: 'Discovery, consultation, curation, bespoke development where applicable, authentication, delivery, aftercare, and legacy services where offered.', status: 'OFFICIAL' },
    { category: 'Experience', term: 'Client principle', description: 'The client is not simply a buyer. The client becomes part of the House story.', status: 'OFFICIAL' },
    { category: 'Heritage', term: 'Time model', description: 'Past as heritage and memory; present as craftsmanship and experience; future as innovation and legacy.', status: 'OFFICIAL' },
    { category: 'Heritage', term: 'Archive layers', description: 'Product, collection, design, material, client, heritage, digital, and time archives.', status: 'DEVELOPING' },
    { category: 'Heritage', term: 'Heirloom philosophy', description: 'Create things worthy of being remembered and cared for across time.', status: 'OFFICIAL' },
    { category: 'Technology', term: 'Technology principle', description: 'Technology should disappear into the experience; the client should feel the elegance, not the database.', status: 'OFFICIAL' },
    { category: 'Technology', term: 'Potential systems', description: 'Digital product passports, secure ownership records, authentication, provenance, digital certificates, private rooms, archives, appointments, and concierge infrastructure.', status: 'CONCEPT' },
    { category: 'Technology', term: 'Innovation test', description: 'Does it improve quality, authenticity, personalization, preservation, accessibility, protection, or long-term identity?', status: 'OFFICIAL' },
    { category: 'Corporate', term: 'Leadership and governance', description: 'Leadership, accountability, ethics, decision-making, oversight, risk, succession, and stewardship are documented separately.', status: 'OFFICIAL', href: '/corporate/leadership-governance' },
    { category: 'Corporate', term: 'Corporate information', description: 'Institutional and public company information belongs in the Corporate destination.', status: 'OFFICIAL', href: '/corporate' },
    { category: 'Corporate', term: 'Authenticity', description: 'Authenticity is a core House principle; the separate Authenticity destination explains verification and provenance in depth.', status: 'OFFICIAL', href: '/learn/authenticity' },
    { category: 'Corporate', term: 'Sustainability', description: 'Longevity, repair, restoration, responsible material selection, reduced waste, and transparent sourcing where information is available.', status: 'OFFICIAL', href: '/sustainability' },
    ]

    const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://www.shamimforever.com/brand-facts#page',
        url: 'https://www.shamimforever.com/brand-facts',
        name: 'Brand Facts | The Definitive Record of the House',
        description: 'The definitive factual record and Brand Intelligence reference for Shamim Forever.',
        about: { '@id': 'https://www.shamimforever.com/#organization' },
        breadcrumb: { '@id': 'https://www.shamimforever.com/brand-facts#breadcrumb' },
        mainEntity: { '@id': 'https://www.shamimforever.com/brand-facts#fact-set' },
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.shamimforever.com/#organization',
        name: 'Shamim Forever',
        alternateName: 'Shamim Forever House',
        url: 'https://www.shamimforever.com',
        logo: 'https://www.shamimforever.com/logo-sf.png',
        description: 'A sovereign luxury house built around identity, craftsmanship, heritage, experience, authenticity, technology, and legacy.',
        foundingDate: '2023',
        founder: { '@id': 'https://www.shamimforever.com/brand-facts#faisal-orakzai' },
        employee: [
          { '@id': 'https://www.shamimforever.com/brand-facts#asma-orakzai' },
          { '@id': 'https://www.shamimforever.com/brand-facts#laiba-faisal-orakzai' },
        ],
        knowsAbout: ['Luxury', 'Craftsmanship', 'Heritage', 'Authenticity', 'Provenance', 'Private client experience', 'Digital luxury', 'Legacy preservation'],
        sameAs: [
          'https://www.wikidata.org/wiki/Q141223771',
          'https://www.instagram.com/shamimforever',
          'https://x.com/shamimforever',
          'https://www.facebook.com/shamimforever',
          'https://www.linkedin.com/company/shamimforever',
          'https://www.tiktok.com/@shamim.forever',
        ],
      },
      {
        '@type': 'Person',
        '@id': 'https://www.shamimforever.com/brand-facts#faisal-orakzai',
        name: 'Faisal Orakzai',
        jobTitle: 'Founder & Chairman',
        url: 'https://www.shamimforever.com/faisal-orakzai',
        worksFor: { '@id': 'https://www.shamimforever.com/#organization' },
      },
      {
        '@type': 'Person',
        '@id': 'https://www.shamimforever.com/brand-facts#asma-orakzai',
        name: 'Dr Asma Orakzai',
        jobTitle: 'Chief Executive Officer',
        worksFor: { '@id': 'https://www.shamimforever.com/#organization' },
      },
      {
        '@type': 'Person',
        '@id': 'https://www.shamimforever.com/brand-facts#laiba-faisal-orakzai',
        name: 'Dr Laiba Faisal Orakzai',
        jobTitle: 'Director',
        worksFor: { '@id': 'https://www.shamimforever.com/#organization' },
      },
      {
        '@type': 'DefinedTermSet',
        '@id': 'https://www.shamimforever.com/brand-facts#fact-set',
        name: 'Shamim Forever Brand Facts',
        description: 'A structured reference set describing the identity, philosophy, architecture, standards, and defining characteristics of Shamim Forever.',
        url: 'https://www.shamimforever.com/brand-facts',
        hasDefinedTerm: [
          { '@type': 'DefinedTerm', name: 'Sovereign Luxury House', description: 'Independent identity, control over standards, long-term thinking, protection of heritage, disciplined creation, private client experience, and institutional continuity.' },
          { '@type': 'DefinedTerm', name: 'Brand DNA', description: 'Emotional permanence, sovereign identity, quiet excellence, human craft, authenticity, personalization, heritage, innovation, responsibility, and legacy.' },
          { '@type': 'DefinedTerm', name: 'Built From Love. Forged Into Legacy.', description: 'The House philosophy of meaningful creation, craftsmanship, and continuity.' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.shamimforever.com/brand-facts#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shamimforever.com/' },
          { '@type': 'ListItem', position: 2, name: 'Brand Facts', item: 'https://www.shamimforever.com/brand-facts' },
        ],
      },
    ],
    }

    const statusClass: Record<string, string> = {
    OFFICIAL: 'border-[#c9a054]/35 bg-[#c9a054]/[0.06] text-[#c9a054]',
    VERIFIED: 'border-emerald-500/25 bg-emerald-500/[0.04] text-emerald-300/80',
    DEVELOPING: 'border-sky-400/25 bg-sky-400/[0.04] text-sky-200/80',
    CONCEPT: 'border-violet-400/25 bg-violet-400/[0.04] text-violet-200/80',
    }

    export default function BrandFactsPage() {
    return (
      <>
        <Script id="brand-facts-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <main className="min-h-screen overflow-hidden bg-[#050505] text-zinc-200">
          <section className="relative border-b border-[#151515] px-5 pb-24 pt-32 md:px-12 md:pb-32 lg:px-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(201,160,84,0.1),transparent_28%),linear-gradient(115deg,rgba(255,255,255,0.025),transparent_38%)]" />
            <div className="relative mx-auto max-w-[1180px]">
              <div className="mb-16 flex items-center gap-4 text-[9px] uppercase tracking-[0.42em] text-zinc-600">
                <Link href="/" className="transition-colors hover:text-[#c9a054]">Home</Link>
                <span className="text-[#c9a054]">/</span>
                <span>Brand Intelligence</span>
              </div>
              <div className="max-w-4xl">
                <p className="mb-6 text-[10px] uppercase tracking-[0.52em] text-[#c9a054]">The House · Brand Reference · 001</p>
                <h1 className="text-6xl font-light leading-[0.92] tracking-[-0.055em] text-zinc-100 sm:text-8xl lg:text-[9.5rem]">
                  Brand <span className="font-serif italic font-normal text-[#c9a054]">Facts</span>
                </h1>
                <div className="mt-10 grid gap-8 md:grid-cols-[1fr_320px] md:items-end">
                  <p className="max-w-2xl text-xl font-light leading-relaxed text-zinc-300 md:text-2xl">The Definitive Record of the House.</p>
                  <p className="text-sm leading-7 text-zinc-500">A factual reference for what Shamim Forever is, what it represents, how it is built, and the principles that should endure.</p>
                </div>
              </div>
              <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#1c1c1c] pt-6 text-[9px] uppercase tracking-[0.34em] text-zinc-600">
                <span>Identity</span><span className="h-px w-10 bg-[#c9a054]/60" /><span>Philosophy</span><span>Architecture</span><span>Craft</span><span>Legacy</span>
              </div>
            </div>
          </section>

          <section className="border-b border-[#151515] px-5 py-16 md:px-12 lg:px-20">
            <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">How to read this record</p>
                <h2 className="mt-5 max-w-sm text-3xl font-light leading-tight text-zinc-100">Reference before rhetoric.</h2>
              </div>
              <div className="grid gap-7 text-sm leading-7 text-zinc-500 md:grid-cols-2">
                <p>Brand Facts is the factual and intellectual layer of the House. It explains identity, language, architecture, standards, and defining characteristics without pretending that every future ambition is already operational.</p>
                <div className="space-y-3 border-l border-[#222] pl-5">
                  <p><span className="text-[#c9a054]">OFFICIAL</span> · House-approved language and current reference points.</p>
                  <p><span className="text-emerald-300/80">VERIFIED</span> · Confirmed public fact or documented milestone.</p>
                  <p><span className="text-sky-200/80">DEVELOPING</span> · In development or subject to future implementation.</p>
                  <p><span className="text-violet-200/80">CONCEPT</span> · A considered direction, not a claim of current operation.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="identity" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20">
            <div className="mx-auto max-w-[1180px]">
              <SectionHeading number="01" eyebrow="Brand identity" title="The House at a glance" description="The reference points that define Shamim Forever without reducing it to a product label." />
              <div className="mt-14 grid border-y border-[#1b1b1b] md:grid-cols-2 lg:grid-cols-4">
                {identityFacts.map(([label, value, status]) => <div key={label} className="border-b border-[#1b1b1b] p-6 last:border-b-0 md:nth-[odd]:border-r lg:border-r lg:nth-[4n]:border-r-0"><p className="text-[9px] uppercase tracking-[0.28em] text-zinc-600">{label}</p><p className="mt-4 min-h-12 text-lg font-light leading-snug text-zinc-100">{value}</p><span className={'mt-5 inline-flex border px-2 py-1 text-[8px] uppercase tracking-[0.22em] ' + statusClass[status]}>{status}</span></div>)}
              </div>
            </div>
          </section>

          <section id="the-house" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20">
            <div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-[0.8fr_1.2fr]">
              <div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">02 · The House</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100 md:text-5xl">What is Shamim Forever?</h2></div>
              <div className="space-y-6 text-base leading-8 text-zinc-400"><p>Shamim Forever is a sovereign luxury house built around the idea that true luxury should transcend possession.</p><p>It is an ecosystem of identity, craftsmanship, experience, heritage, technology, hospitality, private access, and enduring legacy. The House is designed not simply to sell objects, but to create a relationship between people, places, memory, craftsmanship, and time.</p><p className="font-serif text-2xl italic leading-relaxed text-zinc-200">Luxury should become more meaningful with time, not less.</p></div>
            </div>
          </section>

          <section id="name" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20">
            <div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-2">
              <div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">03 · The name</p><h2 className="mt-6 text-4xl font-light text-zinc-100">An identity, not merely a label.</h2></div>
              <div className="grid gap-8 sm:grid-cols-2"><div className="border-t border-[#c9a054]/50 pt-5"><p className="font-serif text-4xl italic text-[#c9a054]">SHAMIM</p><p className="mt-4 text-sm leading-7 text-zinc-500">Presence, essence, fragrance, memory, and emotional permanence. The name carries an emotional and cultural dimension within the House philosophy.</p></div><div className="border-t border-[#c9a054]/50 pt-5"><p className="font-serif text-4xl italic text-[#c9a054]">FOREVER</p><p className="mt-4 text-sm leading-7 text-zinc-500">A relationship with time: memories that endure, craftsmanship that survives, relationships that outlast transactions, and heritage kept alive.</p></div></div>
            </div>
            <div className="mx-auto mt-14 max-w-[1180px] border-l border-[#c9a054] pl-6 text-lg leading-8 text-zinc-300">Shamim Forever is not a promise that everything lasts forever. It is a philosophy of creating things worthy of being remembered.</div>
          </section>

          <section id="philosophy" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20">
            <div className="mx-auto max-w-[1180px]"><SectionHeading number="04" eyebrow="The core idea" title="Luxury as a multidimensional system" description="A product can be expensive and still be meaningless. A rare object can still be poorly made. A famous name can still lack authenticity." /><div className="mt-12 border-y border-[#27231c] py-10 text-center"><p className="text-[10px] uppercase tracking-[0.45em] text-zinc-600">The House proposition</p><p className="mt-5 font-serif text-3xl italic text-[#c9a054] md:text-5xl">Meaning × Craftsmanship × Authenticity × Experience × Time</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{['Meaning', 'Craftsmanship', 'Authenticity', 'Experience', 'Legacy'].map((item, index) => <div key={item} className="border border-[#1c1c1c] p-5"><span className="text-[10px] text-[#c9a054]">0{index + 1}</span><p className="mt-8 text-lg font-light text-zinc-100">{item}</p></div>)}</div></div>
          </section>

          <section id="dna" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="05" eyebrow="Brand DNA" title="Ten permanent principles" description="These principles are intended to influence every future category introduced by the House." /><div className="mt-14 grid gap-px bg-[#1b1b1b] sm:grid-cols-2 lg:grid-cols-5">{dna.map(([number, title, copy]) => <div key={number} className="bg-[#050505] p-6"><span className="text-[10px] tracking-[0.2em] text-[#c9a054]">{number}</span><h3 className="mt-8 text-lg font-light text-zinc-100">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{copy}</p></div>)}</div></div></section>

          <section id="principles" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="06" eyebrow="House principles" title="The twelve House standards" description="A House thinks beyond one collection. These standards keep creation, service, and continuity connected." /><div className="mt-14 grid gap-x-12 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">{principles.map(([title, copy], index) => <div key={title} className="flex gap-4 border-t border-[#1d1d1d] pt-5"><span className="text-[10px] text-[#c9a054]">{String(index + 1).padStart(2, '0')}</span><div><h3 className="text-lg font-light text-zinc-100">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-600">{copy}</p></div></div>)}</div></div></section>

          <section id="architecture" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="07" eyebrow="Brand architecture" title="One House, distinct layers" description="Each destination has a primary purpose. The ecosystem should cross-reference, not duplicate itself." /><div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{architecture.map(([title, copy, href], index) => <Link key={title} href={href} className="group border border-[#1b1b1b] bg-[#070707] p-7 transition-colors hover:border-[#c9a054]/50"><div className="flex items-start justify-between"><span className="text-[10px] text-[#c9a054]">0{index + 1}</span><span className="text-zinc-700 transition-colors group-hover:text-[#c9a054]">↗</span></div><h3 className="mt-12 text-xl font-light text-zinc-100 transition-colors group-hover:text-[#c9a054]">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{copy}</p></Link>)}</div></div></section>

          <section id="visual-identity" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-2"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">08 · Visual identity</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100">Quiet authority, not loud wealth.</h2><p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">The visual system uses deep black, warm metallic gold, restrained typography, negative space, architectural layouts, editorial photography, cinematic imagery, subtle motion, premium materials, and minimal interface elements.</p></div><div className="grid grid-cols-2 gap-px bg-[#1b1b1b]"><div className="min-h-32 bg-[#050505] p-6"><div className="h-6 w-6 rounded-full bg-[#050505] ring-1 ring-[#c9a054]/50" /><p className="mt-10 text-[9px] uppercase tracking-[0.28em] text-zinc-600">Deep black</p></div><div className="min-h-32 bg-[#c9a054] p-6"><div className="h-6 w-6 rounded-full bg-[#e0bd73]" /><p className="mt-10 text-[9px] uppercase tracking-[0.28em] text-[#050505]/70">Warm gold</p></div><div className="min-h-32 bg-[#050505] p-6"><p className="font-serif text-4xl italic text-zinc-100">Aa</p><p className="mt-5 text-[9px] uppercase tracking-[0.28em] text-zinc-600">Editorial type</p></div><div className="min-h-32 bg-[#050505] p-6"><div className="h-px w-16 bg-[#c9a054]" /><p className="mt-10 text-[9px] uppercase tracking-[0.28em] text-zinc-600">Negative space</p></div></div></div></section>

          <section id="craft" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="09" eyebrow="Craft and materials" title="The House standard" description="Luxury is also physical. A material should be judged by how it carries time, not merely by what it costs." /><div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{['Concept', 'Design', 'Material selection', 'Craft', 'Inspection', 'Authentication', 'Presentation', 'Delivery', 'Aftercare', 'Archive'].map((step, index) => <div key={step} className="relative border border-[#1b1b1b] p-5"><span className="text-[10px] text-[#c9a054]">{String(index + 1).padStart(2, '0')}</span><p className="mt-8 text-base font-light text-zinc-200">{step}</p>{index < 9 && <span className="absolute -right-2 top-1/2 hidden text-[#c9a054] lg:block">→</span>}</div>)}</div><div className="mt-12 grid gap-8 border-t border-[#1b1b1b] pt-10 text-sm leading-7 text-zinc-500 md:grid-cols-3"><p><span className="text-zinc-200">Material hierarchy:</span> durability, provenance, craftsmanship, tactile quality, visual aging, repairability, emotional value, and responsible sourcing where applicable.</p><p><span className="text-zinc-200">Craft includes:</span> handcraft, precision, finishing, preparation, construction, inspection, quality control, bespoke modification, restoration, and preservation.</p><p><span className="text-zinc-200">The question:</span> will this material become more meaningful as it ages?</p></div></div></section>

          <section id="client-experience" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="10" eyebrow="Client experience" title="The relationship is larger than the transaction" description="The client is not defined purely by wealth. The House is intended for people who value craftsmanship, individuality, cultural meaning, discretion, design, heritage, rarity, personal service, long-term value, and meaningful experiences." /><div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-4">{[['Discovery', 'Understanding requirements and intention.'], ['Consultation', 'Developing the appropriate direction.'], ['Curation', 'Selecting or creating an appropriate piece.'], ['Bespoke development', 'Personalized design where applicable.'], ['Authentication', 'Documenting identity and provenance.'], ['Delivery', 'Controlled presentation and delivery.'], ['Aftercare', 'Maintenance, support, and continuing care.'], ['Legacy', 'Archival and preservation services where offered.']].map(([title, copy], index) => <div key={title} className="border-t border-[#c9a054]/35 pt-5"><span className="text-[10px] text-[#c9a054]">0{index + 1}</span><h3 className="mt-7 text-xl font-light text-zinc-100">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{copy}</p></div>)}</div></div></section>

          <section id="heritage" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-[1fr_1.15fr]"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">11 · Heritage and archive</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100">Shamim Forever exists between memory and possibility.</h2><div className="mt-10 grid grid-cols-3 gap-4 border-y border-[#1b1b1b] py-6"><div><p className="text-[9px] uppercase tracking-[0.22em] text-[#c9a054]">Past</p><p className="mt-3 text-sm text-zinc-500">Heritage and memory.</p></div><div><p className="text-[9px] uppercase tracking-[0.22em] text-[#c9a054]">Present</p><p className="mt-3 text-sm text-zinc-500">Craftsmanship and experience.</p></div><div><p className="text-[9px] uppercase tracking-[0.22em] text-[#c9a054]">Future</p><p className="mt-3 text-sm text-zinc-500">Innovation and legacy.</p></div></div></div><div><p className="text-sm leading-7 text-zinc-500">A structured archive may include product, collection, design, material, client, heritage, digital, and time layers. These are not promises that every system is currently operational; they are the preservation logic through which a House can protect what deserves to endure.</p><div className="mt-10 grid gap-3 sm:grid-cols-2">{['Product archive', 'Collection archive', 'Design archive', 'Material archive', 'Heritage archive', 'Digital archive'].map((item, index) => <div key={item} className="border border-[#1b1b1b] px-5 py-4 text-sm text-zinc-300"><span className="mr-3 text-[#c9a054]">0{index + 1}</span>{item}</div>)}</div></div></div></section>

          <section id="technology" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-2"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">12 · Innovation and technology</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100">Technology should disappear into the experience.</h2><p className="mt-6 text-sm leading-7 text-zinc-500">The client should feel the elegance, not the database. Digital systems belong when they improve authenticity, personalization, preservation, accessibility, or protection.</p></div><div className="space-y-3">{['Does it improve quality?', 'Does it improve authenticity?', 'Does it improve personalization?', 'Does it improve preservation?', 'Does it protect the client?', 'Does it strengthen long-term identity?'].map((question, index) => <div key={question} className="flex items-center gap-5 border-b border-[#1b1b1b] pb-4 pt-2"><span className="text-[10px] text-[#c9a054]">0{index + 1}</span><p className="text-lg font-light text-zinc-200">{question}</p></div>)}</div></div></section>

          <section id="culture" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-2"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">13 · Cultural intelligence</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100">Heritage with a contemporary point of view.</h2></div><div className="space-y-6 text-sm leading-7 text-zinc-500"><p>The House can draw from South Asian heritage, Islamic architectural traditions, European craftsmanship, contemporary design, global art, modern technology, historical textile traditions, and international hospitality.</p><p>The objective is not to copy cultures. It is to understand them respectfully and create something contemporary.</p><p className="font-serif text-2xl italic text-zinc-200">Heritage + Contemporary Design + Technology + Personal Service + Legacy</p></div></div></section>

          <section id="responsibility" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="14" eyebrow="Sustainability and ethics" title="Responsibility should be factual, not decorative" description="The House should make claims that can be responsibly understood. Longevity, repair, restoration, durable design, transparent sourcing where available, privacy, cultural respect, intellectual property, and honest communication all belong here." /><div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{['Longevity', 'Repair and restoration', 'Responsible materials', 'Reduced waste', 'Client privacy', 'Fair representation', 'Cultural respect', 'Data protection'].map((item, index) => <div key={item} className="border border-[#1b1b1b] p-6"><span className="text-[10px] text-[#c9a054]">0{index + 1}</span><p className="mt-10 text-lg font-light text-zinc-100">{item}</p></div>)}</div><p className="mt-12 max-w-3xl border-l border-[#c9a054] pl-6 text-sm leading-7 text-zinc-500">Certifications, environmental achievements, legal registrations, or operational capabilities should only be added when they are confirmed and documented.</p></div></section>

          <section id="not" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-2"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">15 · House declaration</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100">What Shamim Forever is not.</h2><div className="mt-8 space-y-3 text-sm text-zinc-600">{['A discount luxury marketplace.', 'A trend-chasing label.', 'A mass-production identity.', 'A logo-first business.', 'A disposable fashion concept.', 'A promise machine.'].map(item => <p key={item} className="border-b border-[#1b1b1b] pb-3">{item}</p>)}</div></div><div className="border border-[#c9a054]/25 bg-[#0a0907] p-8 md:p-10"><p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a054]">The House is</p><div className="mt-8 space-y-4 text-2xl font-light text-zinc-100"><p>A House.</p><p>An identity.</p><p>A creative ecosystem.</p><p>A private experience.</p><p>A heritage framework.</p><p>A long-term institution in development.</p></div></div></div></section>

          <section id="index" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="16" eyebrow="Master index" title="The Brand Facts library" description="The main page is an index into the House reference system. Deeper chapters should expand only when the underlying information is ready to be published." /><div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{chapters.map(([number, title, copy, href]) => <a key={href} href={href} className="group border border-[#1b1b1b] p-6 transition-colors hover:border-[#c9a054]/50"><span className="text-[10px] text-[#c9a054]">{number}</span><h3 className="mt-8 text-lg font-light text-zinc-100 group-hover:text-[#c9a054]">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{copy}</p></a>)}</div></div></section>

          <section id="fact-library" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="17" eyebrow="Reference database" title="Search the facts" description="Search by category or term. Status labels keep current facts distinct from developing systems and future concepts." /><div className="mt-12"><BrandFactsLibrary entries={factLibraryEntries} /></div></div></section>

          <section className="border-t border-[#151515] bg-[#080808] px-5 py-24 text-center md:px-12 lg:px-20"><div className="mx-auto max-w-3xl"><p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">The Shamim Forever Standard</p><div className="mt-10 space-y-3 font-serif text-2xl italic leading-relaxed text-zinc-200 md:text-4xl"><p>We believe luxury should be felt before it is displayed.</p><p>We believe craftsmanship deserves time.</p><p>We believe authenticity is a responsibility.</p><p>We believe the finest creations are defined by the memories they accumulate.</p></div><p className="mt-12 text-sm leading-7 text-zinc-600">The true measure of a House is not what it launches today, but what remains worthy of remembering tomorrow.</p><p className="mt-10 text-[10px] uppercase tracking-[0.45em] text-[#c9a054]">Built From Love · Forged Into Legacy</p></div></section>

          <section className="px-5 py-14 md:px-12 lg:px-20"><div className="mx-auto flex max-w-[1180px] flex-wrap gap-x-8 gap-y-4 border-t border-[#1b1b1b] pt-8 text-[9px] uppercase tracking-[0.28em] text-zinc-600">{[['The House', '/learn/the-house'], ['Luxury', '/learn/luxury'], ['Our World', '/learn/our-world'], ['Authenticity', '/learn/authenticity'], ['Innovation', '/learn/innovation'], ['Sovereign Infrastructure', '/learn/sovereign-infrastructure'], ['Leadership & Governance', '/corporate/leadership-governance'], ['Corporate', '/corporate']].map(([label, href]) => <Link key={href} href={href} className="transition-colors hover:text-[#c9a054]">{label} ↗</Link>)}</div></section>
        </main>
      </>
    )
    }

    function SectionHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description: string }) {
    return <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-end"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">{number} · {eyebrow}</p></div><div><h2 className="max-w-3xl text-4xl font-light leading-tight text-zinc-100 md:text-5xl">{title}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500">{description}</p></div></div>
    }
    