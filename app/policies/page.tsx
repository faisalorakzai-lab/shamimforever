import type { Metadata } from 'next'
import SeoJsonLd from '@/components/SeoJsonLd'
import { breadcrumbSchema, metadataImage, pageSchema } from '@/lib/seo'

const SITE_URL = 'https://www.shamimforever.com'

export const metadata: Metadata = {
  title: 'Policies & Legal | The Legal Foundation of Shamim Forever',
  description:
    'The legal foundation of Shamim Forever: terms, privacy, intellectual property, authenticity, compliance, responsible business, technology, corporate governance and risk disclosures.',
  keywords: [
    'Shamim Forever policies',
    'Shamim Forever legal',
    'Shamim Forever privacy policy',
    'luxury house terms and conditions',
    'authenticity and provenance policy',
    'responsible luxury compliance',
    'Puteaux France legal notices',
  ],
  alternates: { canonical: `${SITE_URL}/policies` },
  openGraph: {
    title: 'Policies & Legal — The Legal Foundation of Shamim Forever',
    description:
      'Transparency. Responsibility. Protection. Accountability. Explore the legal architecture governing the House.',
    url: `${SITE_URL}/policies`,
    siteName: 'Shamim Forever',
    type: 'website',
    locale: 'en_US',
    images: [metadataImage('/logo-sf.png', 'Shamim Forever — Policies & Legal')],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Policies & Legal | Shamim Forever',
    description: 'The framework behind the House.',
    images: ['/logo-sf.png'],
  },
  robots: { index: true, follow: true },
}

type LegalSection = {
  id: string
  number: string
  title: string
  summary: string
  documents: Array<[string, string]>
}

const legalSections: LegalSection[] = [
  {
    id: 'core-legal',
    number: '01',
    title: 'Core Legal',
    summary:
      'The terms that govern access to the House, its website, products, services, membership and private client relationships.',
    documents: [
      ['Terms of Use', 'Rules for visiting, browsing and using official digital experiences.'],
      ['Terms & Conditions', 'General terms for orders, services, communications and House relationships.'],
      ['Website Terms', 'Content, availability, security and permitted digital use.'],
      ['Client Terms', 'The framework for private client engagements and appointments.'],
      ['Membership Terms', 'Access, eligibility, benefits, responsibilities and programme changes.'],
      ['Concierge Terms', 'Boundaries for concierge requests, sourcing, introductions and private assistance.'],
      ['Bespoke Services Terms', 'Commissioned work, approvals, deposits, timelines and acceptance.'],
      ['Boutique & Purchase Terms', 'Availability, pricing, payment, ownership and transaction conditions.'],
      ['Delivery, Returns & Aftercare', 'Duties, insurance, cancellation, warranty and care expectations.'],
      ['Third-Party & Digital Platform Terms', 'The relationship between House content and external platforms.'],
    ],
  },
  {
    id: 'privacy-data',
    number: '02',
    title: 'Privacy & Data',
    summary:
      'Privacy is part of luxury. This domain covers responsible collection, use, protection, retention and rights relating to personal information.',
    documents: [
      ['Privacy Policy', 'Information collected, purposes, lawful bases and privacy responsibilities.'],
      ['Cookie Policy', 'Essential, preference, analytics and marketing technologies with consent expectations.'],
      ['Data Protection Policy', 'Collection, classification, storage, access, transfer, retention and deletion.'],
      ['Data Retention Policy', 'Retention principles, records management and deletion for legitimate purposes.'],
      ['Data Subject Rights', 'Access, correction, deletion, restriction, portability and objection where applicable.'],
      ['Consent & Communications', 'Consent management, marketing communications and email preferences.'],
      ['Data Security Framework', 'Need to know. Need to use. Need to protect.'],
      ['Third-Party Processing & International Transfers', 'Processors, partners, safeguards and cross-border data movement.'],
      ["Children's Privacy & Breach Response", 'Protection of children and personal-data incident response.'],
    ],
  },
  {
    id: 'intellectual-property',
    number: '03',
    title: 'Intellectual Property',
    summary:
      'The House is more than a logo. Names, marks, images, words, designs, interfaces, research and creative works are protected assets.',
    documents: [
      ['Intellectual Property Policy', 'Rights framework for the identity, content, creations and digital experiences.'],
      ['Trademark Policy', 'Correct use of the House name, marks, symbols and identifiers.'],
      ['Copyright Policy', 'Protection of writing, imagery, film, editorial, software and research.'],
      ['Brand Usage Guidelines', 'Authorised use by partners, press, editorial and commercial collaborators.'],
      ['Photography & Media Rights', 'Permissions, crediting, publication rights and visual-media restrictions.'],
      ['User-Generated & AI-Generated Content', 'Rights, permissions, disclosure, oversight and responsible use.'],
      ['Digital Asset & Creative Rights', 'Interfaces, databases, methodologies, publications and digital assets.'],
    ],
  },
  {
    id: 'authenticity-provenance',
    number: '04',
    title: 'Authenticity & Provenance',
    summary:
      'Authenticity describes the experience. Policies & Legal establishes the rules protecting identity, verification, provenance and ownership.',
    documents: [
      ['Authenticity Policy', 'Principles for genuine House products, services and representations.'],
      ['Product Verification Policy', 'Serial numbers, certificates, documentation and authorised records.'],
      ['Anti-Counterfeit Policy', 'Measures against unauthorised manufacture, distribution and representation.'],
      ['Provenance & Heritage Documentation', 'Origin, history, ownership records and supporting documentation.'],
      ['Certificate & Serialisation Policy', 'Certificates, digital records, serialised identity and ownership transfer.'],
      ['Resale & Unauthorised Dealer Policy', 'Resale, dealer status and protection of client trust.'],
    ],
  },
  {
    id: 'compliance-ethics',
    number: '05',
    title: 'Compliance & Ethics',
    summary:
      'No commercial objective justifies unlawful conduct. The House expects integrity, respect, confidentiality, transparency and accountability.',
    documents: [
      ['Compliance Framework', 'Applicable laws, regulations, internal controls, review and escalation.'],
      ['Code of Conduct', 'Expected standards for representatives, partners, suppliers and stakeholders.'],
      ['Anti-Bribery & Anti-Corruption', 'Zero tolerance for improper payments, kickbacks and unlawful influence.'],
      ['Conflict of Interest Policy', 'Disclosure, review, mitigation and escalation for conflicts.'],
      ['Anti-Fraud & Sanctions Compliance', 'Protection against deception, fraud and prohibited dealings where applicable.'],
      ['Supplier Compliance & Partner Due Diligence', 'Employment, human rights, quality, confidentiality and sourcing standards.'],
      ['Whistleblowing & Reporting', 'Responsible reporting, escalation, non-retaliation and review principles.'],
    ],
  },
  {
    id: 'responsible-business',
    number: '06',
    title: 'Sustainability & Responsibility',
    summary:
      'Luxury should never exist without responsibility. Public claims should be accurate, supportable, documented, qualified and not misleading.',
    documents: [
      ['Environmental Responsibility', 'Environmental impact, evidence, improvement and responsible communication.'],
      ['Sustainable Sourcing & Responsible Materials', 'Sourcing, materials, suppliers, quality and traceability.'],
      ['Human Rights & Supplier Standards', 'Lawful employment, safety, dignity and responsible production.'],
      ['Modern Slavery Statement', 'A jurisdiction-aware framework where legally applicable, subject to review.'],
      ['Waste, Packaging & Circularity', 'Packaging, waste reduction, reuse and end-of-life considerations.'],
      ['Climate & Environmental Claims', 'Evidence-led rules for sustainability language and statements.'],
      ['Social Responsibility', 'Responsible relationships with communities and stakeholders.'],
    ],
  },
  {
    id: 'corporate-governance',
    number: '07',
    title: 'Corporate & Governance',
    summary:
      'Institutional information about the House, its legal identity, governance, communications, records and notices.',
    documents: [
      ['Corporate Information', 'The official factual profile of Shamim Forever and its public identity.'],
      ['Legal Entity Information', 'Entity, publisher, registered-office and jurisdiction information as applicable.'],
      ['Corporate Governance', 'Decision-making, accountability, oversight and governance principles.'],
      ['Directors, Officers & Representatives', 'Roles, authorised representatives and boundaries of authority.'],
      ['Subsidiary & Affiliate Framework', 'How affiliated entities and related initiatives should be understood.'],
      ['Corporate Communications & Records', 'Regulatory communications, records management and document governance.'],
      ['Legal Notices', 'Publisher, hosting, intellectual-property, trademark and regulatory notices.'],
    ],
  },
  {
    id: 'technology-digital',
    number: '08',
    title: 'Technology, AI & Digital',
    summary:
      'Innovation requires boundaries. This domain addresses digital platforms, AI-assisted content, cybersecurity, availability and responsible disclosure.',
    documents: [
      ['Digital Platform Terms', 'Accounts, digital experiences, platform access, content and availability.'],
      ['AI & Automated Systems Policy', 'Human oversight, accuracy limits, data use and third-party providers.'],
      ['Technology Disclaimer', 'Limits on relying on digital, technical, automated or experimental information.'],
      ['Cybersecurity & Responsible Disclosure', 'Account security, phishing, impersonation, incidents and reporting.'],
      ['Digital Data Security', 'Systems, credentials, access, processing and third-party platform safeguards.'],
      ['Website Availability Disclaimer', 'Maintenance, external dependencies, interruptions and continuity.'],
      ['Blockchain & Digital Asset Disclaimer', 'Jurisdiction-aware boundaries for tokenised assets and digital ownership.'],
    ],
  },
  {
    id: 'risk-disclosures',
    number: '09',
    title: 'Risk, Disclosures & Dispute Resolution',
    summary:
      'The legal meaning of information matters. This domain explains what published information does and does not promise.',
    documents: [
      ['General Disclaimer', 'Information is presented according to its section and may not be a contract.'],
      ['Investment & Financial Disclaimer', 'Investments, securities, returns and digital assets are not automatically advice or an offer.'],
      ['Third-Party Risk Disclosure', 'External websites, suppliers and services are not automatically endorsed or warranted.'],
      ['Market Risk Disclosure', 'Uncertainty, volatility, future performance and market-dependent statements.'],
      ['Forward-Looking Statements', 'Responsible treatment of future initiatives, plans and expectations.'],
      ['Force Majeure & Limitation of Liability', 'The legally reviewed boundaries of responsibility and exceptional events.'],
      ['Dispute Resolution', 'Law, escalation, mediation, arbitration, courts and statutory protections.'],
      ['Accessibility Statement', 'Keyboard access, alternatives, captions, contrast and reduced motion.'],
    ],
  },
]

const principles = [
  ['Transparency', 'Information should be clear, qualified and honest about what it can and cannot promise.'],
  ['Accountability', 'Every relationship, decision, representation and record should have a responsible standard.'],
  ['Privacy', 'Personal information represents identity, preferences and private interactions with the House.'],
  ['Authenticity', 'Products, services, communications and creative works should be represented truthfully.'],
  ['Responsibility', 'Luxury should never be pursued at the cost of dignity, safety, law or evidence.'],
  ['Protection', 'Clients, partners, suppliers and the House deserve considered safeguards.'],
]

const totalDocuments = legalSections.reduce((total, section) => total + section.documents.length, 0)

const schemas = [
  pageSchema({
    type: 'CollectionPage',
    path: '/policies',
    name: 'Policies & Legal — The Legal Foundation of Shamim Forever',
    description: 'The structured legal library governing the rights, responsibilities, protections and standards of Shamim Forever.',
    image: '/logo-sf.png',
    mainEntity: {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/policies#legal-library`,
      name: 'Shamim Forever Legal Library',
      numberOfItems: totalDocuments,
      itemListElement: legalSections.map((section, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: section.title,
        url: `${SITE_URL}/policies#${section.id}`,
      })),
    },
  }),
  breadcrumbSchema('/policies', 'Policies & Legal', [{ name: 'Corporate', path: '/corporate' }]),
]

export default function PoliciesPage() {
  return (
    <SeoJsonLd schemas={schemas}>
      <main className="min-h-screen bg-[#050505] text-zinc-200">
        <header className="border-b border-[#151515] px-5 pb-20 pt-36 md:px-12 md:pb-28 md:pt-48 lg:px-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="mb-7 text-[10px] uppercase tracking-[0.55em] text-[#c9a054]">Corporate &amp; Legal / 01</p>
                <h1 className="max-w-4xl font-serif text-5xl font-light leading-[0.95] tracking-[-0.03em] text-zinc-100 md:text-7xl lg:text-8xl">Policies <span className="text-[#c9a054]">&amp;</span> Legal</h1>
                <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-zinc-400 md:text-2xl">The framework behind the House.</p>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500 md:text-base">Transparency. Responsibility. Protection. Accountability. A structured legal library for the relationships, products, services, communications, intellectual creations and digital experiences associated with Shamim Forever.</p>
              </div>
              <div className="border-l border-[#2a2115] pl-6 lg:justify-self-end lg:max-w-sm">
                <p className="text-[9px] uppercase tracking-[0.45em] text-[#c9a054]">Sovereign Luxury House</p>
                <p className="mt-5 font-serif text-2xl font-light italic leading-relaxed text-zinc-400">Built from love. Forged into legacy.</p>
                <p className="mt-6 text-xs leading-6 text-zinc-600">This library is distinct from Investor Relations. Investor Relations communicates with investors and stakeholders; Policies &amp; Legal defines the rules, rights, obligations and protections governing the wider House.</p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1280px] gap-16 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[220px_1fr] lg:px-20">
          <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Policies and Legal navigation">
            <p className="text-[9px] uppercase tracking-[0.45em] text-[#c9a054]">In this library</p>
            <nav className="mt-6 border-l border-[#1d1d1d] pl-4">
              <a href="#legal-foundation" className="block py-2 text-xs uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-[#c9a054]">Legal foundation</a>
              <a href="#legal-library" className="block py-2 text-xs uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-[#c9a054]">Legal library</a>
              {legalSections.map((section) => <a key={section.id} href={`#${section.id}`} className="block py-2 text-xs uppercase tracking-[0.18em] text-zinc-600 transition-colors hover:text-[#c9a054]">{section.number} {section.title}</a>)}
              <a href="#document-control" className="block py-2 text-xs uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-[#c9a054]">Document control</a>
              <a href="#legal-change-log" className="block py-2 text-xs uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-[#c9a054]">Change log</a>
            </nav>
          </aside>

          <div className="min-w-0">
            <section id="legal-foundation" className="scroll-mt-24 border-b border-[#151515] pb-20 md:pb-28">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">01 / Legal foundation</p>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-tight text-zinc-100 md:text-6xl">Luxury should never exist without responsibility.</h2>
              <p className="mt-7 max-w-3xl text-base leading-8 text-zinc-400">Shamim Forever is built around a simple principle: every relationship, product, service, transaction, communication, digital experience and physical interaction should operate within a framework of transparency, accountability, privacy, authenticity and lawful conduct.</p>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-600">This page is the public architecture of that framework. It is designed as a living library rather than a single undifferentiated document, so each subject can be reviewed, maintained and expanded with the right level of detail.</p>
              <div className="mt-12 grid gap-px overflow-hidden border border-[#1a1a1a] bg-[#1a1a1a] sm:grid-cols-2 lg:grid-cols-3">
                {principles.map(([title, text]) => <article key={title} className="bg-[#080808] p-6 md:p-8"><h3 className="font-serif text-2xl font-light text-[#c9a054]">{title}</h3><p className="mt-4 text-sm leading-7 text-zinc-500">{text}</p></article>)}
              </div>
            </section>

            <section id="legal-library" className="scroll-mt-24 pt-20 md:pt-28">
              <div className="flex flex-col justify-between gap-5 border-b border-[#151515] pb-8 md:flex-row md:items-end"><div><p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">02 / Master legal library</p><h2 className="mt-4 font-serif text-4xl font-light text-zinc-100 md:text-6xl">The House, in full.</h2></div><p className="max-w-xs text-xs leading-6 text-zinc-600">{legalSections.length} domains / {totalDocuments} policy subjects / one governing framework</p></div>
              <p className="mt-8 max-w-3xl text-base leading-8 text-zinc-400">The library keeps legal obligations separate from brand storytelling, education, research and investor communications. Each subject below is a distinct shelf in the legal architecture of the House.</p>
              <div className="mt-14 space-y-5">
                {legalSections.map((section) => <section key={section.id} id={section.id} className="scroll-mt-24 border border-[#1a1a1a] bg-[#080808] p-6 md:p-9">
                  <div className="flex flex-col gap-5 border-b border-[#171717] pb-7 md:flex-row md:items-start md:justify-between"><div><p className="text-[10px] tracking-[0.45em] text-[#c9a054]">{section.number}</p><h3 className="mt-3 font-serif text-3xl font-light text-zinc-100 md:text-4xl">{section.title}</h3></div><p className="max-w-md text-sm leading-7 text-zinc-500">{section.summary}</p></div>
                  <div className="mt-7 grid gap-x-8 gap-y-3 md:grid-cols-2">{section.documents.map(([name, description]) => <article key={name} className="border-b border-[#141414] py-4"><h4 className="text-sm font-normal tracking-[0.08em] text-zinc-300">{name}</h4><p className="mt-2 text-xs leading-6 text-zinc-600">{description}</p></article>)}</div>
                </section>)}
              </div>
            </section>

            <section id="document-control" className="scroll-mt-24 mt-24 border-t border-[#151515] pt-20 md:mt-32 md:pt-28">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">03 / Document control</p>
              <h2 className="mt-5 font-serif text-4xl font-light text-zinc-100 md:text-6xl">Every policy has a provenance.</h2>
              <p className="mt-7 max-w-3xl text-base leading-8 text-zinc-400">A serious legal library must make its own governance visible. Each formal document should identify its name, version, effective date, last update, responsible department, review cycle, applicable jurisdiction and document status.</p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[['Library status', 'Public framework'], ['Version', '1.0'], ['Effective', '09 September 2026'], ['Review cycle', 'Annual or material change']].map(([label, value]) => <div key={label} className="border border-[#1a1a1a] p-5"><p className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">{label}</p><p className="mt-3 text-sm text-[#c9a054]">{value}</p></div>)}</div>
              <div className="mt-8 border-l border-[#c9a054] pl-6"><p className="text-sm leading-7 text-zinc-400">The House references Puteaux, France. Final terms should be reviewed for applicable French and European Union requirements, as well as the laws relevant to the client, product, service or transaction concerned.</p></div>
            </section>

            <section id="legal-change-log" className="scroll-mt-24 mt-24 border-t border-[#151515] pt-20 md:mt-32 md:pt-28">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">04 / Legal change log</p>
              <h2 className="mt-5 font-serif text-4xl font-light text-zinc-100 md:text-6xl">A library that remembers.</h2>
              <div className="mt-10 overflow-x-auto border border-[#1a1a1a]"><table className="w-full min-w-[620px] text-left text-sm"><thead className="border-b border-[#1a1a1a] text-[9px] uppercase tracking-[0.35em] text-[#c9a054]"><tr><th className="px-5 py-4 font-normal">Date</th><th className="px-5 py-4 font-normal">Document</th><th className="px-5 py-4 font-normal">Version</th><th className="px-5 py-4 font-normal">Change</th></tr></thead><tbody className="divide-y divide-[#141414] text-zinc-500"><tr><td className="px-5 py-5">2026-09-09</td><td className="px-5 py-5 text-zinc-300">Policies &amp; Legal library</td><td className="px-5 py-5">1.0</td><td className="px-5 py-5">Published the structured legal architecture of the House.</td></tr></tbody></table></div>
            </section>

            <section className="mt-24 border-t border-[#151515] pt-12 md:mt-32 md:pt-16">
              <p className="text-[9px] uppercase tracking-[0.45em] text-[#c9a054]">Important notice</p>
              <p className="mt-5 max-w-4xl text-xs leading-7 text-zinc-600">This public library is an institutional framework and a navigation point, not a substitute for a final legally reviewed document, a signed agreement, professional legal advice or mandatory consumer protections. Product-specific terms, formal notices and applicable law may take precedence where stated. Information relating to investments, securities, financial products, returns, digital assets or future initiatives should receive appropriate jurisdiction-specific review before reliance.</p>
            </section>
          </div>
        </div>
      </main>
    </SeoJsonLd>
  )
}