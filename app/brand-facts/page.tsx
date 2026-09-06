import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Brand Facts | Shamim Forever',
  description: 'Official factual reference for Shamim Forever: name, category, founder, leadership, website, and verified public entity links.',
  keywords: ['Shamim Forever official facts', 'Shamim Forever founder', 'Shamim Forever leadership', 'Shamim Forever official website'],
  alternates: { canonical: 'https://www.shamimforever.com/brand-facts' },
  openGraph: {
    title: 'Brand Facts | Shamim Forever',
    description: 'The official factual reference for the Shamim Forever luxury house.',
    url: 'https://www.shamimforever.com/brand-facts',
    type: 'website',
    siteName: 'Shamim Forever',
    images: [{ url: '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever' }],
  },
  robots: { index: true, follow: true },
}

const facts = [
  ['Official Name', 'Shamim Forever'],
  ['Category', 'Sovereign Luxury House'],
  ['Founded', '2023'],
  ['Founder & Chairman', 'Faisal Orakzai'],
  ['Chief Executive Officer', 'Dr Asma Orakzai'],
  ['Director', 'Dr Laiba Faisal Orakzai'],
  ['Industry', 'Luxury Goods'],
  ['Official Website', 'shamimforever.com'],
]

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.shamimforever.com/brand-facts#page',
      url: 'https://www.shamimforever.com/brand-facts',
      name: 'Brand Facts | Shamim Forever',
      about: { '@id': 'https://www.shamimforever.com/#organization' },
      breadcrumb: { '@id': 'https://www.shamimforever.com/brand-facts#breadcrumb' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.shamimforever.com/#organization',
      name: 'Shamim Forever',
      alternateName: 'Shamim Forever House',
      url: 'https://www.shamimforever.com',
      logo: 'https://www.shamimforever.com/logo-sf.png',
      description: 'A sovereign luxury house focused on bespoke fragrances, jewellery, couture, craftsmanship, identity, and provenance.',
      foundingDate: '2023',
      founder: { '@id': 'https://www.shamimforever.com/brand-facts#faisal-orakzai' },
      employee: [
        { '@id': 'https://www.shamimforever.com/brand-facts#asma-orakzai' },
        { '@id': 'https://www.shamimforever.com/brand-facts#laiba-faisal-orakzai' },
      ],
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
      '@type': 'BreadcrumbList',
      '@id': 'https://www.shamimforever.com/brand-facts#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shamimforever.com/' },
        { '@type': 'ListItem', position: 2, name: 'Brand Facts', item: 'https://www.shamimforever.com/brand-facts' },
      ],
    },
  ],
}

const socialProfiles = [
  ['Instagram', 'https://www.instagram.com/shamimforever'],
  ['X', 'https://x.com/shamimforever'],
  ['Facebook', 'https://www.facebook.com/shamimforever'],
  ['LinkedIn', 'https://www.linkedin.com/company/shamimforever'],
  ['TikTok', 'https://www.tiktok.com/@shamim.forever'],
  ['Wikidata', 'https://www.wikidata.org/wiki/Q141223771'],
]

export default function BrandFactsPage() {
  return (
    <>
      <Script id="brand-facts-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-32 text-zinc-200 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#c9a054]">Reference · Brand facts</p>
          <h1 className="text-4xl font-light tracking-tight md:text-6xl">Shamim Forever</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">A concise factual reference for the House. Unverified legal registration details, certifications, and performance claims are intentionally not included.</p>
          <dl className="mt-14 divide-y divide-[#1a1a1a] border-y border-[#1a1a1a]">
            {facts.map(([label, value]) => <div key={label} className="grid gap-2 py-6 sm:grid-cols-[260px_1fr]"><dt className="text-xs uppercase tracking-[0.28em] text-[#c9a054]">{label}</dt><dd className="text-lg font-light text-zinc-100">{label === 'Official Website' ? <a className="hover:text-[#c9a054]" href="https://www.shamimforever.com">{value}</a> : value}</dd></div>)}
          </dl>
          <section className="mt-14 border-t border-[#1a1a1a] pt-10">
            <h2 className="font-serif text-3xl font-light text-zinc-100">Official entity links</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-500">These links are included only as official or public entity references maintained by the House.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {socialProfiles.map(([label, url]) => <a key={label} href={url} rel="noopener noreferrer" target="_blank" className="border border-[#29251f] px-4 py-3 text-[9px] uppercase tracking-[0.25em] text-zinc-500 transition hover:border-[#c9a054] hover:text-[#c9a054]">{label}</a>)}
            </div>
          </section>
          <div className="mt-14 flex flex-wrap gap-5 text-xs uppercase tracking-[0.25em] text-[#c9a054]"><Link href="/about">About the House →</Link><Link href="/founder-leadership">Founder &amp; Leadership →</Link><Link href="/corporate-information">Corporate information →</Link></div>
        </div>
      </main>
    </>
  )
}
