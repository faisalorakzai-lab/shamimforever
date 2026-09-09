import type { Metadata } from 'next'
    import Link from 'next/link'
    import Script from 'next/script'

    export const metadata: Metadata = {
    title: 'Sustainability | The Art of Creating What Deserves to Last',
    description: 'Shamim Forever sustainability doctrine: permanence, responsible materials, craftsmanship, repair, restoration, preservation, circularity, digital responsibility, people, and future stewardship.',
    keywords: [
      'Shamim Forever sustainability',
      'responsible luxury',
      'luxury craftsmanship and longevity',
      'repair and restoration luxury',
      'sustainable luxury materials',
      'Shamim Forever Sustainability Doctrine',
      'heritage preservation',
      'circular luxury',
      'digital responsibility',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/sustainability' },
    openGraph: {
      title: 'Sustainability | The Art of Creating What Deserves to Last',
      description: 'A permanence-first sustainability doctrine for Shamim Forever.',
      url: 'https://www.shamimforever.com/sustainability',
      type: 'website',
      siteName: 'Shamim Forever',
      images: [{ url: '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sustainability | Shamim Forever',
      description: 'Luxury should leave a legacy, not a burden.',
      images: ['/logo-sf.png'],
    },
    robots: { index: true, follow: true },
    }

    const pillars = [
    ['I', 'Material responsibility', 'Responsible material selection, relevant provenance, durability, maintenance, repairability, reuse, and transparent information where available.'],
    ['II', 'Craftsmanship', 'Quality, skill, precision, finishing, and the human knowledge required to make something worth keeping.'],
    ['III', 'Longevity', 'Designing for extended useful life instead of rapid replacement or seasonal disposability.'],
    ['IV', 'Repair', 'Maintaining and repairing eligible creations before treating replacement as the default answer.'],
    ['V', 'Restoration', 'Returning existing creations to functional and aesthetic life while preserving their character and history.'],
    ['VI', 'Preservation', 'Protecting heritage, archives, cultural techniques, design knowledge, and memory against unnecessary loss.'],
    ['VII', 'Circularity', 'Avoiding unnecessary creation, extending life, maintaining, repairing, restoring, reusing, repurposing, recycling, and disposing responsibly.'],
    ['VIII', 'Packaging', 'Balancing presentation and protection with material demand, reuse, recovery, and end-of-life responsibility.'],
    ['IX', 'Logistics', 'More thoughtful shipment planning, consolidation, storage, delivery methods, and inventory decisions where practical.'],
    ['X', 'Digital responsibility', 'Long-lived, efficient, secure, and responsibly designed digital infrastructure without unnecessary duplication.'],
    ['XI', 'People & craft', 'Protecting dignity, knowledge transfer, professional development, safety, fair treatment, and continuity of specialist skills.'],
    ['XII', 'Future stewardship', 'Building systems that remain responsible as Shamim Forever grows, learns, measures, and discloses.'],
    ]

    const lifecycle = [
    ['01', 'Conceive', 'Should this be created at all, and what reason does it serve?'],
    ['02', 'Source', 'Where do materials, skills, energy, and relevant information come from?'],
    ['03', 'Create', 'Can quality and craftsmanship make the creation worth keeping?'],
    ['04', 'Present', 'Does packaging protect the work without becoming waste for no reason?'],
    ['05', 'Deliver', 'Can movement, storage, and timing be planned with less excess?'],
    ['06', 'Own', 'Is the client given a relationship of care rather than a one-time transaction?'],
    ['07', 'Maintain', 'Can the creation be inspected, diagnosed, maintained, and supported?'],
    ['08', 'Repair', 'Can damage be repaired before replacement is considered?'],
    ['09', 'Restore', 'Can age and material history remain part of the object’s identity?'],
    ['10', 'Preserve', 'Can value, provenance, knowledge, and memory continue beyond first ownership?'],
    ]

    const commitmentRegister = [
    ['Current philosophy', 'Longevity over disposability', 'A permanent principle of the House: make fewer things that matter more.'],
    ['Current philosophy', 'Repair before replacement', 'Inspect → Diagnose → Repair → Restore → Preserve where technically and commercially appropriate.'],
    ['Developing', 'Material and supplier information', 'More specific provenance and sourcing detail will be published when it can be substantiated.'],
    ['Developing', 'Packaging responsibility', 'Presentation, protection, material use, reuse, and responsible recovery are being considered together.'],
    ['Developing', 'Digital infrastructure', 'Long-lived architecture, efficient systems, responsible hosting choices, and lifecycle management remain part of the doctrine.'],
    ['Planned', 'Measurement framework', 'Relevant metrics, disclosures, targets, and evidence will be added only when the underlying method is documented.'],
    ['Not claimed', 'Unverified certification or percentages', 'No unsupported carbon, net-zero, recycled-content, zero-waste, or certification claim is made on this page.'],
    ]

    const doctrineChapters = [
    ['Philosophy of permanence', 'What responsible luxury means when time is treated as part of value.'],
    ['Materials and craftsmanship', 'Material stewardship, skill, quality, durability, and useful life.'],
    ['Product lifecycle', 'From conception and sourcing to ownership, care, repair, and preservation.'],
    ['Repair and restoration', 'The architecture and principles for maintaining existing value.'],
    ['Heritage and preservation', 'Objects, archives, cultural techniques, places, stories, and knowledge.'],
    ['Circularity', 'Avoidance, extension, maintenance, repair, reuse, repurposing, recycling, and responsible disposal.'],
    ['Packaging and logistics', 'Presentation, protection, movement, storage, and delivery.'],
    ['Buildings and infrastructure', 'The physical environments and systems that support the House.'],
    ['Digital and technology', 'Data infrastructure, AI, security, archives, and digital responsibility.'],
    ['People and craft', 'Dignity, development, safety, fair treatment, and knowledge continuity.'],
    ['Governance and measurement', 'Disclosure principles, evidence, risks, targets, and accountability interfaces.'],
    ['Future stewardship', 'Long-term commitments and the discipline of responsible growth.'],
    ]

    const faq = [
    ['What does sustainability mean at Shamim Forever?', 'Sustainability is treated as a philosophy of permanence: longevity over disposability, preservation over replacement, craftsmanship over excess, responsibility over convenience, and legacy over consumption.'],
    ['Does Shamim Forever claim to be carbon neutral or net zero?', 'No unsupported carbon, net-zero, zero-waste, recycled-content, renewable-energy, or certification claim is made on this page. Evidence comes before claims.'],
    ['Does the House offer repair or restoration?', 'The House philosophy prioritizes inspection, diagnosis, repair, restoration, and preservation where technically and commercially appropriate. Availability is confirmed for the specific creation and circumstance.'],
    ['How is digital infrastructure part of sustainability?', 'Websites, archives, cloud systems, client platforms, security, AI, and commerce infrastructure all rely on physical resources. Responsible digital sustainability considers efficiency, longevity, duplication, hosting, security, scalability, and lifecycle management.'],
    ]

    const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://www.shamimforever.com/sustainability#page',
        url: 'https://www.shamimforever.com/sustainability',
        name: 'Sustainability | The Art of Creating What Deserves to Last',
        description: 'The Shamim Forever Sustainability Doctrine overview.',
        about: { '@id': 'https://www.shamimforever.com/#organization' },
        breadcrumb: { '@id': 'https://www.shamimforever.com/sustainability#breadcrumb' },
        mainEntity: { '@id': 'https://www.shamimforever.com/sustainability#doctrine' },
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.shamimforever.com/#organization',
        name: 'Shamim Forever',
        url: 'https://www.shamimforever.com',
        logo: 'https://www.shamimforever.com/logo-sf.png',
        subjectOf: { '@id': 'https://www.shamimforever.com/sustainability#page' },
      },
      {
        '@type': 'DefinedTermSet',
        '@id': 'https://www.shamimforever.com/sustainability#doctrine',
        name: 'The Shamim Forever Sustainability Doctrine',
        description: 'A permanence-first reference framework for responsible materials, craftsmanship, longevity, repair, restoration, preservation, circularity, logistics, digital infrastructure, people, and future stewardship.',
        url: 'https://www.shamimforever.com/sustainability',
        hasDefinedTerm: pillars.map(([name, title, description]) => ({ '@type': 'DefinedTerm', name: title, description })),
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.shamimforever.com/sustainability#faq',
        mainEntity: faq.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.shamimforever.com/sustainability#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shamimforever.com/' },
          { '@type': 'ListItem', position: 2, name: 'Sustainability', item: 'https://www.shamimforever.com/sustainability' },
        ],
      },
    ],
    }

    const statusClass: Record<string, string> = {
    'Current philosophy': 'border-[#c9a054]/35 bg-[#c9a054]/[0.06] text-[#c9a054]',
    Developing: 'border-sky-400/25 bg-sky-400/[0.04] text-sky-200/80',
    Planned: 'border-violet-400/25 bg-violet-400/[0.04] text-violet-200/80',
    'Not claimed': 'border-zinc-600/40 bg-zinc-700/[0.08] text-zinc-500',
    }

    export default function SustainabilityPage() {
    return (
      <>
        <Script id="sustainability-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <main className="min-h-screen overflow-hidden bg-[#050505] text-zinc-200">
          <section className="relative border-b border-[#151515] px-5 pb-24 pt-32 md:px-12 md:pb-32 lg:px-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_15%,rgba(201,160,84,0.1),transparent_30%),linear-gradient(115deg,rgba(255,255,255,0.025),transparent_40%)]" />
            <div className="relative mx-auto max-w-[1180px]">
              <div className="mb-16 flex items-center gap-4 text-[9px] uppercase tracking-[0.42em] text-zinc-600"><Link href="/" className="transition-colors hover:text-[#c9a054]">Home</Link><span className="text-[#c9a054]">/</span><span>Corporate &amp; Legal</span></div>
              <p className="text-[10px] uppercase tracking-[0.52em] text-[#c9a054]">The House · Responsibility · Doctrine 001</p>
              <h1 className="mt-7 max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.05em] text-zinc-100 sm:text-7xl lg:text-[8.5rem]">Sustainability <span className="font-serif italic font-normal text-[#c9a054]">&amp; Responsibility</span></h1>
              <div className="mt-12 grid gap-8 md:grid-cols-[1fr_320px] md:items-end"><p className="max-w-2xl text-2xl font-light leading-relaxed text-zinc-200 md:text-3xl">The Art of Creating What Deserves to Last.</p><p className="text-sm leading-7 text-zinc-500">A permanence-first framework for materials, craftsmanship, care, repair, restoration, preservation, people, infrastructure, and long-term stewardship.</p></div>
              <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#1c1c1c] pt-6 text-[9px] uppercase tracking-[0.34em] text-zinc-600"><span>Permanence</span><span className="h-px w-10 bg-[#c9a054]/60" /><span>Craft</span><span>Care</span><span>Preservation</span><span>Stewardship</span></div>
            </div>
          </section>

          <section className="border-b border-[#151515] px-5 py-16 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[0.75fr_1.25fr]"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">The position</p><h2 className="mt-5 max-w-sm text-3xl font-light leading-tight text-zinc-100">Luxury should leave a legacy, not a burden.</h2></div><div className="space-y-6 text-base leading-8 text-zinc-400"><p>Sustainability at Shamim Forever is not a marketing campaign. It is a philosophy of permanence.</p><p>True luxury should not be defined by how quickly something can be produced, replaced, or forgotten. It should be defined by how carefully it is conceived, how responsibly it is made, how beautifully it ages, how intelligently it can be maintained, and whether it deserves to exist for generations.</p><p className="font-serif text-2xl italic text-zinc-200">What is made with meaning should be made to last.</p></div></div></section>

          <section id="philosophy" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="01" eyebrow="Our sustainability philosophy" title="Responsibility begins before production" description="Every meaningful creation carries a footprint: materials are extracted, people contribute expertise, energy is consumed, products travel, packaging is produced, and digital systems operate. Responsible luxury considers the full lifecycle." /><div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{['Longevity over disposability', 'Preservation over replacement', 'Craftsmanship over excess', 'Responsibility over convenience', 'Legacy over consumption'].map((item, index) => <div key={item} className="border border-[#1b1b1b] bg-[#070707] p-6"><span className="text-[10px] text-[#c9a054]">0{index + 1}</span><p className="mt-10 text-lg font-light leading-snug text-zinc-100">{item}</p></div>)}</div></div></section>

          <section id="permanence" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-2"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">02 · The principle of permanence</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100">Make fewer things that matter more.</h2><p className="mt-6 text-sm leading-7 text-zinc-500">A product designed for years of use has a fundamentally different relationship with resources than something designed for rapid replacement. The objective is not only to extend physical life, but cultural, emotional, functional, and economic life.</p></div><div className="grid gap-3 sm:grid-cols-2">{['Durability', 'Timeless design', 'Material integrity', 'Maintenance', 'Repairability', 'Restoration', 'Preservation', 'Lifecycle awareness'].map((item, index) => <div key={item} className="border-t border-[#c9a054]/35 pt-4"><span className="text-[10px] text-[#c9a054]">0{index + 1}</span><p className="mt-5 text-lg font-light text-zinc-200">{item}</p></div>)}</div></div></section>

          <section id="lifecycle" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="03" eyebrow="From consumption to stewardship" title="An ownership lifecycle, not a single transaction" description="Ownership can create a relationship between the client and the creation: acquisition, care, maintenance, repair, restoration, preservation, and legacy." /><div className="mt-14 grid gap-px bg-[#1b1b1b] sm:grid-cols-2 lg:grid-cols-5">{lifecycle.map(([number, title, copy]) => <div key={title} className="bg-[#050505] p-6"><span className="text-[10px] text-[#c9a054]">{number}</span><h3 className="mt-8 text-lg font-light text-zinc-100">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{copy}</p></div>)}</div></div></section>

          <section id="materials" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="04" eyebrow="Responsible materials" title="Materials are the physical language of every creation" description="This framework encourages responsible decisions without reducing sustainability to a single label, certification, or numerical claim." /><div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-4">{[['Origin', 'Where does the material come from?'], ['Quality', 'Is it capable of lasting?'], ['Durability', 'Can it withstand years of use?'], ['Maintenance', 'Can it be properly cared for?'], ['Repair', 'Can damaged components be repaired?'], ['Restoration', 'Can value survive significant wear?'], ['Reuse', 'Can components be responsibly repurposed?'], ['Transparency', 'Can relevant information be documented?']].map(([title, copy], index) => <div key={title} className="border border-[#1b1b1b] p-6"><span className="text-[10px] text-[#c9a054]">0{index + 1}</span><h3 className="mt-8 text-xl font-light text-zinc-100">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{copy}</p></div>)}</div></div></section>

          <section id="craft-repair" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-[0.85fr_1.15fr]"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">05 · Craftsmanship and care</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100">Craftsmanship is a sustainability mechanism.</h2><p className="mt-6 text-sm leading-7 text-zinc-500">Poor craftsmanship accelerates replacement. Exceptional craftsmanship can extend useful life. A timeless design can remain relevant long after seasonal trends disappear.</p><p className="mt-8 border-l border-[#c9a054] pl-5 font-serif text-2xl italic text-zinc-200">Making something beautiful also means making something worth keeping.</p></div><div className="space-y-3"><div className="border border-[#c9a054]/35 bg-[#0a0907] p-7"><p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a054]">Repair before replacement</p><p className="mt-6 font-serif text-3xl italic text-zinc-100">Inspect → Diagnose → Repair → Restore → Preserve</p><p className="mt-5 text-sm leading-7 text-zinc-500">Where technically and commercially appropriate, repair is not an admission of failure. It is evidence that an object has been designed with a future.</p></div><div className="grid gap-3 sm:grid-cols-2"><div className="border border-[#1b1b1b] p-6"><p className="text-lg font-light text-zinc-100">Restoration</p><p className="mt-3 text-sm leading-6 text-zinc-600">Preserve original character, craftsmanship, material history, provenance, functional integrity, and aesthetic identity.</p></div><div className="border border-[#1b1b1b] p-6"><p className="text-lg font-light text-zinc-100">Preservation</p><p className="mt-3 text-sm leading-6 text-zinc-600">Protect objects, architecture, techniques, histories, archives, stories, knowledge, places, and artistic practices.</p></div></div></div></div></section>

          <section id="circularity" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-2"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">06 · Circularity</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100">Keep the valuable thing valuable for longer.</h2><p className="mt-6 text-sm leading-7 text-zinc-500">Recycling matters, but it should not become an excuse for designing disposable products in the first place. The strongest circular strategy is often to extend the life of what is already valuable.</p></div><div className="flex flex-wrap content-start gap-2">{['Avoid unnecessary creation', 'Extend useful life', 'Maintain', 'Repair', 'Restore', 'Reuse', 'Repurpose', 'Recycle', 'Responsible disposal'].map((item, index) => <div key={item} className="flex items-center gap-3 border border-[#1b1b1b] px-4 py-3"><span className="text-[10px] text-[#c9a054]">{index + 1}</span><span className="text-sm text-zinc-300">{item}</span></div>)}</div></div></section>

          <section id="packaging-logistics" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="07" eyebrow="Packaging and logistics" title="Beauty should not become waste for no reason" description="Presentation and protection matter. So do material demand, reuse, recovery, shipment planning, consolidation, storage, delivery methods, and inventory decisions." /><div className="mt-14 grid gap-3 md:grid-cols-2"><div className="border border-[#1b1b1b] p-7"><p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a054]">Packaging questions</p><div className="mt-7 space-y-4">{['Is it necessary?', 'Does it protect the creation?', 'Can it be reused?', 'Can it be responsibly recovered?'].map(item => <p key={item} className="border-b border-[#1b1b1b] pb-4 text-xl font-light text-zinc-200">{item}</p>)}</div></div><div className="border border-[#1b1b1b] bg-[#080808] p-7"><p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a054]">Responsible logistics can consider</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{['Shipment consolidation', 'Packaging efficiency', 'Delivery planning', 'Unnecessary transport', 'Storage requirements', 'Local sourcing where practical', 'Appropriate delivery methods', 'Inventory planning'].map(item => <p key={item} className="text-sm leading-6 text-zinc-500">· {item}</p>)}</div></div></div></div></section>

          <section id="digital" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-2"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">08 · Energy and digital infrastructure</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100">The digital world may feel weightless. The servers politely disagree.</h2><p className="mt-6 text-sm leading-7 text-zinc-500">Websites, cloud infrastructure, digital archives, client systems, security, AI, commerce platforms, and communication networks all depend on physical infrastructure somewhere.</p></div><div className="grid gap-3 sm:grid-cols-2">{['Efficient digital architecture', 'Responsible infrastructure planning', 'System longevity', 'Avoiding unnecessary data duplication', 'Responsible hosting choices', 'Scalable architecture', 'Security without excessive complexity', 'Lifecycle management'].map((item, index) => <div key={item} className="border-t border-[#c9a054]/35 pt-4"><span className="text-[10px] text-[#c9a054]">0{index + 1}</span><p className="mt-5 text-base font-light text-zinc-200">{item}</p></div>)}</div></div></section>

          <section id="people" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-2"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">09 · People and craft</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100">Sustainability is human.</h2></div><div className="space-y-6 text-sm leading-7 text-zinc-500"><p>A luxury ecosystem cannot claim permanence while treating the people who create it as disposable.</p><p>Responsible development includes craftsmanship, knowledge transfer, professional development, workplace dignity, safety, fair treatment, continuity of expertise, and preservation of specialist skills.</p><p className="font-serif text-2xl italic text-zinc-200">A craft disappears when the knowledge required to perform it disappears.</p></div></div></section>

          <section id="pillars" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="10" eyebrow="The sustainability framework" title="Twelve pillars of responsibility" description="The framework is designed to grow with the House. Each pillar can become a deeper doctrine chapter as evidence, operations, and documented practice develop." /><div className="mt-14 grid gap-px bg-[#1b1b1b] sm:grid-cols-2 lg:grid-cols-3">{pillars.map(([number, title, copy]) => <div key={number} className="bg-[#050505] p-7"><span className="text-[10px] tracking-[0.25em] text-[#c9a054]">{number}</span><h3 className="mt-9 text-xl font-light text-zinc-100">{title}</h3><p className="mt-3 text-sm leading-7 text-zinc-600">{copy}</p></div>)}</div></div></section>

          <section id="commitments" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><SectionHeading number="11" eyebrow="Evidence before claims" title="A transparent commitment register" description="Current practice, developing work, planned measurement, and future commitments should never be presented as if they are the same thing." /><div className="mt-14 divide-y divide-[#1b1b1b] border-y border-[#1b1b1b]">{commitmentRegister.map(([status, title, copy]) => <div key={title} className="grid gap-5 py-6 md:grid-cols-[180px_1fr_1.4fr] md:items-start"><span className={'inline-flex w-fit border px-2 py-1 text-[8px] uppercase tracking-[0.2em] ' + statusClass[status]}>{status}</span><h3 className="text-lg font-light text-zinc-100">{title}</h3><p className="text-sm leading-7 text-zinc-600">{copy}</p></div>)}</div><div className="mt-10 border-l border-[#c9a054] pl-6 text-sm leading-7 text-zinc-500">No unsupported claim of “100% sustainable”, “zero carbon”, “carbon neutral”, “net zero”, “100% ethical sourcing”, “100% recycled”, “zero waste”, “fully renewable”, or “certified sustainable” is made here.</div></div></section>

          <section id="doctrine" className="scroll-mt-24 border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[1180px]"><div className="grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:items-end"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">12 · The master book</p><h2 className="mt-6 text-4xl font-light leading-tight text-zinc-100">The Shamim Forever Sustainability Doctrine</h2></div><div><p className="text-sm leading-7 text-zinc-500">The 100,000+ word edition should become a living reference book, not a wall of text. The website remains the executive overview; the doctrine can grow into detailed chapters, reports, policies, case studies, metrics, and archive material as they are documented.</p></div></div><div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{doctrineChapters.map(([title, copy], index) => <div key={title} className="border border-[#1b1b1b] p-6"><span className="text-[10px] text-[#c9a054]">PART {String(index + 1).padStart(2, '0')}</span><h3 className="mt-8 text-lg font-light text-zinc-100">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{copy}</p></div>)}</div><div className="mt-12 grid gap-3 sm:grid-cols-3"><Link href="/brand-facts" className="border border-[#1b1b1b] p-5 text-[9px] uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:border-[#c9a054] hover:text-[#c9a054]">Brand Facts →</Link><Link href="/corporate/leadership-governance" className="border border-[#1b1b1b] p-5 text-[9px] uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:border-[#c9a054] hover:text-[#c9a054]">Leadership &amp; Governance →</Link><Link href="/policies" className="border border-[#1b1b1b] p-5 text-[9px] uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:border-[#c9a054] hover:text-[#c9a054]">Policies &amp; Legal →</Link></div></div></section>

          <section id="faq" className="scroll-mt-24 px-5 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[980px]"><SectionHeading number="13" eyebrow="Frequently asked questions" title="Clear answers, carefully stated" description="The sustainability page should build trust through precision rather than inflated certainty." /><div className="mt-12 divide-y divide-[#1b1b1b] border-y border-[#1b1b1b]">{faq.map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-light text-zinc-200"><span>{question}</span><span className="text-[#c9a054] transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-5 text-sm leading-7 text-zinc-500">{answer}</p></details>)}</div></div></section>

          <section className="border-t border-[#151515] bg-[#080808] px-5 py-24 text-center md:px-12 lg:px-20"><div className="mx-auto max-w-3xl"><p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">Built for tomorrow. Designed to remain.</p><div className="mt-10 space-y-3 font-serif text-2xl italic leading-relaxed text-zinc-200 md:text-4xl"><p>The future does not need more disposable luxury.</p><p>It needs better reasons to create.</p><p>Better materials. Better craftsmanship. Better stewardship.</p></div><p className="mt-12 text-sm leading-7 text-zinc-600">Not perfection. Not empty promises. Not sustainability as decoration. A continuing discipline of asking: can this last longer, be repaired, be preserved, and deserve to exist tomorrow?</p><p className="mt-10 text-[10px] uppercase tracking-[0.45em] text-[#c9a054]">Shamim Forever · Built From Love · Forged Into Legacy</p></div></section>

          <section className="px-5 py-14 md:px-12 lg:px-20"><div className="mx-auto flex max-w-[1180px] flex-wrap gap-x-8 gap-y-4 border-t border-[#1b1b1b] pt-8 text-[9px] uppercase tracking-[0.28em] text-zinc-600">{[['Brand Facts', '/brand-facts'], ['Leadership & Governance', '/corporate/leadership-governance'], ['The House', '/learn/the-house'], ['Authenticity', '/learn/authenticity'], ['Care & repair', '/care'], ['Policies & Legal', '/policies']].map(([label, href]) => <Link key={href} href={href} className="transition-colors hover:text-[#c9a054]">{label} ↗</Link>)}</div></section>
        </main>
      </>
    )
    }

    function SectionHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description: string }) {
    return <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-end"><div><p className="text-[10px] uppercase tracking-[0.44em] text-[#c9a054]">{number} · {eyebrow}</p></div><div><h2 className="max-w-3xl text-4xl font-light leading-tight text-zinc-100 md:text-5xl">{title}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500">{description}</p></div></div>
    }
    