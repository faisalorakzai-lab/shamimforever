import type { Metadata } from 'next'
import Link from 'next/link'

const siteUrl = 'https://www.shamimforever.com'
const pageUrl = `${siteUrl}/corporate/faq`

export const metadata: Metadata = {
  title: { absolute: 'Shamim Forever Corporate FAQ | Company, Leadership & Governance' },
  description:
    'Answers about Shamim Forever, its founder, leadership, Sovereign Luxury House identity, public information, investor relations, careers and corporate contact routes.',
  keywords: [
    'Shamim Forever corporate FAQ',
    'what is Shamim Forever',
    'Shamim Forever founder',
    'Shamim Forever company information',
    'Shamim Forever governance',
    'Shamim Forever investor relations',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Shamim Forever Corporate FAQ',
    description: 'Direct answers about the institution behind Shamim Forever.',
    url: pageUrl,
    siteName: 'Shamim Forever',
    type: 'website',
    images: [{ url: '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever' }],
  },
  twitter: { card: 'summary_large_image', title: 'Shamim Forever Corporate FAQ', description: 'Company, leadership and governance answers.', images: ['/logo-sf.png'] },
  robots: { index: true, follow: true },
}

const questions = [
  ['What is Shamim Forever?', 'Shamim Forever is a sovereign luxury house built around fragrance, jewellery, couture, bespoke craftsmanship, private client services and digital provenance.'],
  ['Who founded Shamim Forever?', 'Shamim Forever was founded by Faisal Orakzai, who is publicly identified as Founder & Chairman of the House.'],
  ['Where is Shamim Forever headquartered?', 'The House identifies its global headquarters in Puteaux, within the Paris La Défense region of France.'],
  ['What does “Sovereign Luxury House” mean?', 'It describes a luxury institution built around independent identity, deliberate craft, provenance, client care and long-term stewardship rather than short-term trend cycles.'],
  ['What are the principal business areas?', 'The House spans luxury and fashion, fragrance, jewellery, bespoke atelier work, private client services, boutiques, hospitality and digital experiences.'],
  ['How is Shamim Forever structured?', 'The Corporate hub connects the public record of the House: leadership, governance, corporate information, standards, media, careers, investor relations, policies and research.'],
  ['Does Shamim Forever accept investors?', 'Investor Relations is presented as a private information and strategic partnership resource. The House does not publish fabricated stock data or imply public listing where that has not been officially stated.'],
  ['How can journalists contact Shamim Forever?', 'Media enquiries can be directed to media@shamimforever.com. The Press & Media and Newsroom pages provide the relevant public resources.'],
  ['How can I apply for a position?', 'Career information and future opportunities are published through the Careers page. Roles should be treated as official only when they are listed through the House’s own channels.'],
  ['Where can I find corporate policies?', 'Public policy and legal resources are collected at /policies and linked from the Corporate directory.'],
  ['How can a business become a partner or supplier?', 'Partnership and institutional enquiries can begin through relations@shamimforever.com. Supplier and partnership programmes should be treated as subject to direct confirmation by the House.'],
  ['How can I contact the corporate office?', 'For institutional enquiries, contact relations@shamimforever.com. Private client questions can be directed to concierge@shamimforever.com.'],
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#page`,
      url: pageUrl,
      name: 'Shamim Forever Corporate FAQ',
      description: metadata.description,
      about: { '@id': `${siteUrl}/#organization` },
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      mainEntity: { '@id': `${pageUrl}#faq` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Corporate', item: `${siteUrl}/corporate` },
        { '@type': 'ListItem', position: 3, name: 'Corporate FAQ', item: pageUrl },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      url: pageUrl,
      name: 'Shamim Forever Corporate FAQ',
      mainEntity: questions.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    },
  ],
}

export default function CorporateFaqPage() {
  return (
    <>
      <script id="corporate-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-32 text-zinc-200 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1050px]">
          <Link href="/corporate" className="text-[9px] uppercase tracking-[0.45em] text-[#c9a054] hover:text-[#f1d28d]">Corporate / Public record</Link>
          <h1 className="mt-7 max-w-4xl font-serif text-5xl font-light leading-[0.95] text-[#eee9df] md:text-8xl">Corporate<br /><span className="text-[#c9a054]">FAQ</span></h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">Direct answers about the House, its leadership, public information, governance principles, opportunities and official contact routes.</p>
          <div className="mt-14 divide-y divide-[#211d17] border-y border-[#211d17]">
            {questions.map(([question, answer], index) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-light text-zinc-100 marker:hidden md:text-2xl">
                  <span><span className="mr-4 text-[10px] tracking-[0.25em] text-[#c9a054]">0{index + 1}</span>{question}</span>
                  <span className="text-[#c9a054] transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pl-9 pt-5 text-sm leading-8 text-zinc-500">{answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-5 text-[10px] uppercase tracking-[0.28em] text-[#c9a054]">
            <Link href="/corporate">Corporate hub →</Link>
            <Link href="/brand-facts">Brand facts →</Link>
            <Link href="/corporate-information">Corporate information →</Link>
            <Link href="/policies">Policies &amp; legal →</Link>
          </div>
        </div>
      </main>
    </>
  )
}