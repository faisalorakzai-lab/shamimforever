import type { Metadata } from 'next'
    import Link from 'next/link'

    export const metadata: Metadata = {
    title: 'Leadership & Governance | Governance Framework, Ethics & Stewardship | Shamim Forever',
    description: 'Explore the leadership and governance framework of Shamim Forever, including executive leadership, accountability, ethics, decision-making, risk management, corporate responsibility and institutional stewardship.',
    keywords: [
      'Shamim Forever leadership',
      'Shamim Forever governance',
      'luxury house governance',
      'leadership stewardship ethics',
      'institutional governance framework',
      'luxury brand accountability',
      'responsible AI governance',
      'client protection luxury house',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/corporate/leadership-governance' },
    openGraph: {
      title: 'Leadership & Governance | Shamim Forever',
      description: 'Leadership with purpose. Governance with discipline. Stewardship with permanence.',
      url: 'https://www.shamimforever.com/corporate/leadership-governance',
      type: 'article',
      siteName: 'Shamim Forever',
      images: [{ url: '/og-our-story.jpg', width: 1200, height: 630, alt: 'Shamim Forever — Leadership & Governance' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Leadership & Governance | Shamim Forever',
      description: 'Leadership with purpose. Governance with discipline. Stewardship with permanence.',
      images: ['/og-our-story.jpg'],
    },
    }

    const principles = [
    ['01', 'Vision', 'Leaders establish long-term direction without confusing personal preference with institutional purpose.'],
    ['02', 'Responsibility', 'Authority is meaningful only when it is paired with accountability, review and a clear record of decisions.'],
    ['03', 'Integrity', 'Commercial objectives do not override fundamental ethical standards, client dignity or responsible conduct.'],
    ['04', 'Excellence', 'Leadership protects craft, quality, service and the details through which the House earns trust.'],
    ['05', 'Continuity', 'Important knowledge, standards and principles should survive changes in personnel and circumstance.'],
    ]

    const responsibilities = [
    ['Founder / Chairman', 'Long-term vision, institutional stewardship, strategic direction, brand integrity and major strategic decisions.'],
    ['Executive leadership', 'Operational execution, organisational performance, resource allocation and implementation of approved direction.'],
    ['Creative leadership', 'Design direction, artistic standards, collection philosophy and consistency of House expression.'],
    ['Operations leadership', 'Supply chain, retail, client operations, logistics, service standards and quality systems.'],
    ['Finance leadership', 'Financial controls, budgeting, reporting, capital discipline and financial risk management.'],
    ['Legal & compliance', 'Legal review, regulatory compliance, contractual standards, risk assessment and policy implementation.'],
    ]

    const chapters = [
    ['Leadership philosophy', 'How purpose becomes direction, and direction becomes responsible action.', '#philosophy'],
    ['Governance framework', 'The distinction between strategic, operational and reserved decisions.', '#governance-model'],
    ['Accountability', 'Who decides, executes, reviews, approves, records and remains accountable.', '#accountability'],
    ['Ethics & conduct', 'The standard behind the signature: integrity, confidentiality and fair dealing.', '#ethics'],
    ['Risk governance', 'A practical sequence for identifying, assessing, escalating and reviewing risk.', '#risk'],
    ['Succession & continuity', 'Protecting institutional memory, archives, craft and identity beyond one generation.', '#continuity'],
    ['People, suppliers & clients', 'The standards that extend beyond the House into every relationship.', '#relationships'],
    ['Data, AI & intellectual property', 'Responsible technology, information stewardship and protection of creative assets.', '#technology'],
    ]

    const faqs = [
    ['What is governance at Shamim Forever?', 'Governance is the system through which the House sets direction, assigns responsibility, reviews decisions, manages risk and protects continuity. It is the discipline that allows a luxury institution to grow without losing its meaning.'],
    ['Who leads Shamim Forever?', 'Shamim Forever identifies Faisal Orakzai as Founder and Chairman. The page names only leadership responsibilities that are publicly established and avoids inventing boards, committees or appointments.'],
    ['What is the role of the Founder?', 'The Founder establishes the original vision and protects the long-term identity of the House. Governance exists to translate that vision into durable principles, systems and responsibilities rather than concentrating every decision in one individual.'],
    ['Does Shamim Forever have a formal board or governance committees?', 'This page describes a proposed governance architecture for institutional development. Future boards or committees will be published only when they are formally constituted and publicly confirmed.'],
    ['How does Shamim Forever manage conflicts of interest?', 'The intended control sequence is disclosure, review, mitigation, decision and record. A personal interest that could influence, or appear to influence, professional judgment must be surfaced and handled transparently.'],
    ['How is AI governed?', 'Significant AI systems should have a human owner and move through purpose, data, model, testing, deployment, monitoring, review and retirement. Human oversight, privacy, security, fairness and accountability remain essential.'],
    ['How can governance documents be found?', 'The Governance Library below is the public index for future HTML and PDF policy documents. Each published document should carry a version, effective date, owner, review date and change history.'],
    ]

    const governanceJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.shamimforever.com/#organization',
        name: 'Shamim Forever',
        url: 'https://www.shamimforever.com',
        logo: 'https://www.shamimforever.com/logo-sf.png',
        foundingDate: '2023',
        founder: { '@type': 'Person', name: 'Faisal Orakzai', jobTitle: 'Founder & Chairman' },
        sameAs: ['https://www.shamimforever.com'],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.shamimforever.com/corporate/leadership-governance#page',
        url: 'https://www.shamimforever.com/corporate/leadership-governance',
        name: 'Shamim Forever Leadership & Governance',
        description: 'Leadership with purpose. Governance with discipline. Stewardship with permanence.',
        isPartOf: { '@id': 'https://www.shamimforever.com/#website' },
        about: { '@id': 'https://www.shamimforever.com/#organization' },
        inLanguage: 'en',
        dateModified: '2026-09-09',
        breadcrumb: { '@id': 'https://www.shamimforever.com/corporate/leadership-governance#breadcrumb' },
        mainEntity: { '@id': 'https://www.shamimforever.com/corporate/leadership-governance#framework' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.shamimforever.com/corporate/leadership-governance#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shamimforever.com/' },
          { '@type': 'ListItem', position: 2, name: 'Corporate', item: 'https://www.shamimforever.com/corporate' },
          { '@type': 'ListItem', position: 3, name: 'Leadership & Governance', item: 'https://www.shamimforever.com/corporate/leadership-governance' },
        ],
      },
      {
        '@type': 'DefinedTermSet',
        '@id': 'https://www.shamimforever.com/corporate/leadership-governance#framework',
        name: 'Shamim Forever Governance Framework',
        description: 'Institutional principles for leadership, accountability, ethics, risk, continuity and stewardship.',
        hasDefinedTerm: [
          { '@type': 'DefinedTerm', name: 'Leadership', description: 'Creates direction and protects long-term purpose.' },
          { '@type': 'DefinedTerm', name: 'Governance', description: 'Creates discipline through responsibility, oversight and accountable decision-making.' },
          { '@type': 'DefinedTerm', name: 'Stewardship', description: 'Protects continuity, identity, trust and institutional memory.' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.shamimforever.com/corporate/leadership-governance#faq',
        mainEntity: faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
    }

    function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
    return <p className="mb-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-[#c9a054]"><span className="text-zinc-600">{number}</span><span className="h-px w-10 bg-[#c9a054]/40" />{children}</p>
    }

    export default function LeadershipGovernancePage() {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(governanceJsonLd) }} />
        <main className="min-h-screen overflow-hidden bg-[#050505] text-zinc-200">
          <section className="relative flex min-h-[92vh] items-end overflow-hidden border-b border-white/[0.06] px-5 pb-16 pt-32 md:min-h-screen md:px-12 md:pb-24 lg:px-20">
            <video className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale" autoPlay muted loop playsInline poster="/founders-vision.png" aria-hidden="true">
              <source src="/videos/our-story-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_30%,rgba(201,160,84,0.13),transparent_32%),linear-gradient(90deg,#050505_8%,rgba(5,5,5,0.78)_48%,rgba(5,5,5,0.32)),linear-gradient(0deg,#050505_0%,transparent_60%)]" />
            <div className="relative z-10 mx-auto w-full max-w-[1400px]">
              <div className="max-w-5xl animate-[fadeIn_1.4s_ease-out_both]">
                <p className="mb-8 text-[10px] uppercase tracking-[0.55em] text-[#c9a054]">The House · Corporate · Institutional Stewardship</p>
                <h1 className="max-w-5xl text-5xl font-light leading-[0.98] tracking-[-0.04em] text-zinc-100 sm:text-7xl md:text-8xl lg:text-[9rem]">Leadership<br /><span className="font-serif italic text-[#c9a054]">&amp; Governance</span></h1>
                <p className="mt-10 max-w-2xl text-base font-light leading-8 text-zinc-300 md:text-xl md:leading-9">Leadership with purpose. Governance with discipline. Stewardship with permanence.</p>
                <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-[9px] uppercase tracking-[0.3em] text-zinc-500"><span>Shamim Forever</span><span className="h-px w-12 bg-[#c9a054]/50" /><span>Governance Framework</span></div>
              </div>
            </div>
            <div className="absolute bottom-7 right-5 hidden text-[8px] uppercase tracking-[0.4em] text-zinc-600 md:right-12 md:block lg:right-20">Scroll to enter the framework ↓</div>
          </section>

          <section className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
            <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-28">
              <div><SectionLabel number="00">The premise</SectionLabel><h2 className="max-w-md text-4xl font-light leading-tight tracking-tight text-zinc-100 md:text-6xl">A House built to outlast individuals.</h2></div>
              <div className="space-y-7 text-base font-light leading-8 text-zinc-400 md:text-lg md:leading-9"><p>Shamim Forever is designed to be more than a luxury house. Its long-term identity depends on how decisions are made, how responsibility is assigned, how standards are protected and how the institution remains accountable to the people and communities connected to it.</p><p className="text-zinc-200">Leadership creates direction. Governance creates discipline. Stewardship protects continuity.</p><p>The House should not depend entirely upon the personality, preferences or decisions of any single individual. Its institutional architecture must be capable of preserving its principles while allowing responsible leadership to evolve.</p></div>
            </div>
          </section>

          <section className="border-y border-white/[0.06] bg-[#080808] px-5 py-24 md:px-12 md:py-32 lg:px-20">
            <div className="mx-auto max-w-[1400px]"><SectionLabel number="01">Leadership architecture</SectionLabel><div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"><div><h2 className="text-4xl font-light leading-tight md:text-6xl">Vision at the top.<br /><span className="font-serif italic text-[#c9a054]">Responsibility all the way down.</span></h2><p className="mt-8 max-w-md text-sm leading-7 text-zinc-500">The structure below distinguishes confirmed leadership from a proposed future architecture. It is a design principle, not a claim that every future role or committee already exists.</p></div><div className="relative border border-[#c9a054]/25 bg-[#050505] p-6 md:p-12"><div className="mx-auto max-w-2xl text-center"><div className="border border-[#c9a054]/55 px-5 py-5 text-xs uppercase tracking-[0.35em] text-[#c9a054]">Shamim Forever</div><div className="mx-auto h-10 w-px bg-[#c9a054]/45" /><div className="border border-[#c9a054]/45 px-5 py-5 text-sm uppercase tracking-[0.22em] text-zinc-200">Founder / Chairman<br /><span className="mt-2 block text-[10px] tracking-[0.3em] text-[#c9a054]">Faisal Orakzai</span></div><div className="mx-auto h-10 w-px bg-[#c9a054]/45" /><div className="grid gap-3 sm:grid-cols-2"><div className="border border-white/10 px-4 py-5 text-[10px] uppercase tracking-[0.25em] text-zinc-300">Governance<br />Oversight</div><div className="border border-white/10 px-4 py-5 text-[10px] uppercase tracking-[0.25em] text-zinc-300">Executive<br />Leadership</div></div><div className="mx-auto h-10 w-px bg-[#c9a054]/45" /><div className="border border-white/10 px-4 py-5 text-[10px] uppercase tracking-[0.25em] text-zinc-400">Business divisions<br /><span className="mt-2 block text-[9px] tracking-[0.22em] text-zinc-600">Creative · Operations · Corporate</span></div><p className="mt-6 text-[9px] uppercase tracking-[0.28em] text-zinc-700">Proposed institutional architecture — subject to formal constitution</p></div></div></div></div>
          </section>

          <section id="philosophy" className="scroll-mt-24 px-5 py-24 md:px-12 md:py-36 lg:px-20"><div className="mx-auto max-w-[1400px]"><SectionLabel number="02">Leadership philosophy</SectionLabel><div className="mb-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><h2 className="text-4xl font-light md:text-6xl">Leadership is <span className="font-serif italic text-[#c9a054]">stewardship.</span></h2><p className="max-w-xl text-base leading-8 text-zinc-400 md:text-lg">A title can describe authority. It cannot, by itself, create trust. Leadership at Shamim Forever is presented as a responsibility to protect quality, culture, client experience and the future meaning of the House.</p></div><div className="grid border-t border-white/[0.08] md:grid-cols-5">{principles.map(([number, title, text]) => <article key={number} className="border-b border-white/[0.08] px-0 py-8 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"><p className="text-[10px] tracking-[0.35em] text-[#c9a054]">{number}</p><h3 className="mt-8 text-lg font-light text-zinc-100">{title}</h3><p className="mt-4 text-sm leading-7 text-zinc-500">{text}</p></article>)}</div></div></section>

          <section id="governance-model" className="scroll-mt-24 border-y border-white/[0.06] bg-[#080808] px-5 py-24 md:px-12 md:py-32 lg:px-20"><div className="mx-auto max-w-[1400px]"><SectionLabel number="03">Governance model</SectionLabel><div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-28"><div><h2 className="text-4xl font-light leading-tight md:text-6xl">How decisions are<br /><span className="font-serif italic text-[#c9a054]">governed.</span></h2><p className="mt-8 max-w-md text-sm leading-7 text-zinc-500">Decision rights should be clear before scale makes them complicated. The categories below provide a disciplined language for direction, execution and oversight.</p></div><div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">{[['Strategic decisions','Long-term choices affecting the brand, capital, expansion, major partnerships, acquisitions, new markets, technology and intellectual property.'],['Operational decisions','Day-to-day choices involving inventory, retail, client service, marketing, procurement, staffing and logistics.'],['Reserved decisions','Material commitments that should require higher-level review, including significant capital, ownership changes, regulated activities, restructuring or legal exposure.']].map(([title, text], i) => <article key={title} className="grid gap-4 py-8 md:grid-cols-[0.35fr_0.65fr] md:gap-10"><p className="text-xs uppercase tracking-[0.24em] text-[#c9a054]">0{i + 1} · {title}</p><p className="text-sm leading-7 text-zinc-400">{text}</p></article>)}</div></div></div></section>

          <section id="accountability" className="scroll-mt-24 px-5 py-24 md:px-12 md:py-36 lg:px-20"><div className="mx-auto max-w-[1400px]"><SectionLabel number="04">Roles &amp; accountability</SectionLabel><div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"><h2 className="max-w-2xl text-4xl font-light leading-tight md:text-6xl">Authority must have<br /><span className="font-serif italic text-[#c9a054]">a counterweight.</span></h2><p className="max-w-sm text-sm leading-7 text-zinc-500">Every major responsibility should answer six questions: who decides, executes, reviews, approves, records and remains accountable?</p></div><div className="overflow-x-auto border-y border-white/[0.08]"><table className="w-full min-w-[720px] text-left"><thead><tr className="border-b border-white/[0.08] text-[9px] uppercase tracking-[0.28em] text-[#c9a054]"><th className="px-4 py-5 font-normal">Leadership role</th><th className="px-4 py-5 font-normal">Primary responsibility</th></tr></thead><tbody>{responsibilities.map(([role, text]) => <tr key={role} className="border-b border-white/[0.06] last:border-0"><td className="px-4 py-5 text-sm text-zinc-200">{role}</td><td className="px-4 py-5 text-sm leading-7 text-zinc-500">{text}</td></tr>)}</tbody></table></div><p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-zinc-700">Published roles are distinguished from future appointments. No fictional board, committee or qualification is presented.</p></div></section>

          <section id="ethics" className="scroll-mt-24 border-y border-white/[0.06] bg-[#080808] px-5 py-24 md:px-12 md:py-32 lg:px-20"><div className="mx-auto max-w-[1400px]"><SectionLabel number="05">Ethics &amp; conduct</SectionLabel><div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28"><div><h2 className="text-4xl font-light leading-tight md:text-6xl">The standard behind<br /><span className="font-serif italic text-[#c9a054]">the signature.</span></h2><p className="mt-8 text-sm leading-7 text-zinc-500">Integrity is not a line in a footer. It is a mechanism that makes difficult decisions visible, reviewable and defensible.</p></div><div><div className="grid gap-3 sm:grid-cols-2">{['Integrity','Honesty','Fair dealing','Respect','Confidentiality','Anti-corruption','Client dignity','Responsible technology'].map((item) => <div key={item} className="border border-white/[0.08] px-5 py-5 text-sm text-zinc-300">{item}</div>)}</div><div className="mt-8 border border-[#c9a054]/25 bg-[#050505] p-6 md:p-8"><p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a054]">Conflict of interest control</p><p className="mt-5 text-xl font-light text-zinc-200 md:text-2xl">Disclosure <span className="text-[#c9a054]">→</span> Review <span className="text-[#c9a054]">→</span> Mitigation <span className="text-[#c9a054]">→</span> Decision <span className="text-[#c9a054]">→</span> Record</p></div></div></div></div></section>

          <section id="risk" className="scroll-mt-24 px-5 py-24 md:px-12 md:py-36 lg:px-20"><div className="mx-auto max-w-[1400px]"><SectionLabel number="06">Risk governance</SectionLabel><div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-28"><div><h2 className="text-4xl font-light leading-tight md:text-6xl">Protecting<br /><span className="font-serif italic text-[#c9a054]">the House.</span></h2><p className="mt-8 max-w-md text-sm leading-7 text-zinc-500">A risk framework gives the House a calm response to uncertainty without pretending uncertainty can be removed.</p></div><div className="grid gap-px bg-white/[0.08] sm:grid-cols-2">{[['Strategic risk','Market change, expansion and competition.'],['Financial risk','Liquidity, capital allocation, fraud and controls.'],['Operational risk','Supply chain, inventory, logistics and service continuity.'],['Legal & regulatory','Applicable law, contracts and regulatory requirements.'],['Cybersecurity risk','Data protection, access controls, monitoring and response.'],['Reputation risk','Brand misuse, misrepresentation and client experience.'],['Technology risk','AI systems, digital platforms, integrity and third parties.'],['Crisis management','Identify, assess, escalate, contain, communicate, recover, review.']].map(([title, text]) => <article key={title} className="bg-[#050505] p-6 md:p-8"><h3 className="text-sm text-zinc-200">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p></article>)}</div></div></div></section>

          <section id="continuity" className="scroll-mt-24 border-y border-white/[0.06] bg-[#080808] px-5 py-24 md:px-12 md:py-32 lg:px-20"><div className="mx-auto max-w-[1400px]"><SectionLabel number="07">Succession &amp; continuity</SectionLabel><div className="grid gap-12 lg:grid-cols-3">{[['Beyond one generation','Leadership must be capable of transitioning responsibly while preserving the identity that made the House worth inheriting.'],['Institutional memory','Archives, designs, documentation, processes, intellectual property and brand history must remain discoverable and protected.'],['Emergency continuity','Critical knowledge should not live in one inbox, one device or one person. Continuity is designed before it is needed.']].map(([title, text]) => <article key={title} className="border-t border-[#c9a054]/40 pt-7"><h2 className="text-2xl font-light text-zinc-100">{title}</h2><p className="mt-5 text-sm leading-7 text-zinc-500">{text}</p></article>)}</div><div className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/[0.08] pt-8 text-[10px] uppercase tracking-[0.25em] text-zinc-600"><Link href="/time-archive" className="hover:text-[#c9a054]">Time Archive →</Link><Link href="/heirloom-vault" className="hover:text-[#c9a054]">Heirloom Vault →</Link><Link href="/gallery" className="hover:text-[#c9a054]">Heritage Gallery →</Link></div></div></section>

          <section id="relationships" className="scroll-mt-24 px-5 py-24 md:px-12 md:py-36 lg:px-20"><div className="mx-auto max-w-[1400px]"><SectionLabel number="08">People, suppliers &amp; clients</SectionLabel><div className="grid gap-5 md:grid-cols-3">{[['People governance','Recruitment, workplace standards, professional development, apprenticeship, equal opportunity, privacy, grievance mechanisms and safety.'],['Supplier governance','Qualification, quality, ethical sourcing, labour standards, traceability, documentation, auditing and corrective action.'],['Client governance','Privacy, confidentiality, transparency, fair dealing, secure transactions, authenticity, bespoke expectations and complaint resolution.']].map(([title, text]) => <article key={title} className="group border border-white/[0.08] p-7 transition-colors duration-500 hover:border-[#c9a054]/45 md:p-9"><p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a054]">The standard beyond the House</p><h2 className="mt-7 text-2xl font-light text-zinc-100">{title}</h2><p className="mt-5 text-sm leading-7 text-zinc-500">{text}</p></article>)}</div></div></section>

          <section id="technology" className="scroll-mt-24 border-y border-white/[0.06] bg-[#080808] px-5 py-24 md:px-12 md:py-32 lg:px-20"><div className="mx-auto max-w-[1400px]"><SectionLabel number="09">Data, AI &amp; intellectual property</SectionLabel><div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-28"><div><h2 className="text-4xl font-light leading-tight md:text-6xl">Responsible<br /><span className="font-serif italic text-[#c9a054]">intelligence.</span></h2><p className="mt-8 text-sm leading-7 text-zinc-500">A modern luxury house must protect both its human relationships and its digital systems. Data should be collected responsibly, used transparently, protected securely, retained appropriately and deleted responsibly.</p></div><div className="space-y-4">{[['AI governance','Human oversight, transparency, privacy, security, bias evaluation and a clearly identifiable human owner for important systems.'],['Data governance','Customer, employee, website and analytics data managed through access control, security, retention and incident response.'],['IP governance','Trademarks, logos, designs, names, photography, film, research, software, digital assets, packaging and domain names protected through a documented lifecycle.'],['Brand & communication','Logo use, collaborations, campaigns, partnerships, naming, media statements, investor communications and crisis communications require clear authority.']].map(([title, text]) => <article key={title} className="border-l border-[#c9a054]/35 py-2 pl-6 md:pl-8"><h3 className="text-lg font-light text-zinc-100">{title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{text}</p></article>)}</div></div></div></section>

          <section id="library" className="scroll-mt-24 px-5 py-24 md:px-12 md:py-36 lg:px-20"><div className="mx-auto max-w-[1400px]"><SectionLabel number="10">Governance library</SectionLabel><div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end"><h2 className="max-w-2xl text-4xl font-light leading-tight md:text-6xl">A public record of<br /><span className="font-serif italic text-[#c9a054]">how the House thinks.</span></h2><p className="max-w-sm text-sm leading-7 text-zinc-500">The library is designed to grow into a durable institutional knowledge system. Documents will be published as they are approved, never as fictional reports or invented metrics.</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{['Governance Framework','Code of Conduct','Risk Framework','Supplier Standards','AI Governance Principles','Data Governance Principles','Sustainability Governance','Conflict of Interest Policy'].map((title, i) => <div key={title} className="flex min-h-36 flex-col justify-between border border-white/[0.08] p-6"><div><p className="text-[9px] uppercase tracking-[0.25em] text-[#c9a054]">Document 0{i + 1}</p><h3 className="mt-5 text-base font-light text-zinc-200">{title}</h3></div><p className="mt-6 text-[9px] uppercase tracking-[0.2em] text-zinc-700">Planned publication</p></div>)}</div><p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-zinc-700">Each future document should show version · effective date · owner · review date · status · HTML · PDF · change history.</p></div></section>

          <section className="border-y border-[#c9a054]/20 bg-[#0b0a08] px-5 py-24 md:px-12 md:py-32 lg:px-20"><div className="mx-auto max-w-[1200px] text-center"><p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">The permanent principle</p><h2 className="mx-auto mt-8 max-w-5xl text-4xl font-light leading-tight text-zinc-100 md:text-7xl">Leadership is temporary.<br /><span className="font-serif italic text-[#c9a054]">Stewardship is permanent.</span></h2><p className="mx-auto mt-10 max-w-2xl text-base leading-8 text-zinc-400">Leadership provides direction. Governance provides accountability. Stewardship protects what must endure. The House therefore treats governance not as an administrative requirement, but as part of its architecture.</p><div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.25em] text-[#c9a054]"><Link href="/corporate" className="hover:text-zinc-100">Corporate information →</Link><Link href="/policies" className="hover:text-zinc-100">Policies &amp; legal →</Link><Link href="#library" className="hover:text-zinc-100">Governance documents →</Link></div></div></section>

          <section id="faq" className="scroll-mt-24 px-5 py-24 md:px-12 md:py-36 lg:px-20"><div className="mx-auto max-w-[1000px]"><SectionLabel number="11">Governance FAQ</SectionLabel><h2 className="mb-12 text-4xl font-light md:text-6xl">The House, <span className="font-serif italic text-[#c9a054]">clearly governed.</span></h2><div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">{faqs.map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-light text-zinc-200 marker:content-none md:text-lg"><span>{question}</span><span className="text-xl font-thin text-[#c9a054] transition-transform duration-300 group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-5 text-sm leading-7 text-zinc-500">{answer}</p></details>)}</div></div></section>

          <section className="px-5 pb-28 pt-4 md:px-12 lg:px-20"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 border-t border-white/[0.08] pt-10 md:flex-row md:items-center"><p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">Leadership &amp; Governance · Shamim Forever</p><div className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] uppercase tracking-[0.2em] text-zinc-600"><Link href="/founder-leadership" className="hover:text-[#c9a054]">Founder &amp; leadership</Link><Link href="/press" className="hover:text-[#c9a054]">Press &amp; media</Link><Link href="/corporate" className="hover:text-[#c9a054]">Corporate directory</Link></div></div></section>
        </main>
      </>
    )
    }
    