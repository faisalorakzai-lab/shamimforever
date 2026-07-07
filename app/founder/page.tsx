import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'Faisal Orakzai — Founder & Chairman | Shamim Forever',
    description: 'Muhammad Faisal Orakzai (فیصل اورکزئی) — Born 30 April 2006, Orakzai Agency, Tirah, KPK, Pakistan. Founder & Chairman of Shamim Forever, Orakzai Group & Orakzai Bond (OKBOND) on Polygon blockchain. Pakistan youngest blockchain architect and luxury brand founder.',
    keywords: [
      'Faisal Orakzai', 'Muhammad Faisal Orakzai', 'فیصل اورکزئی', 'Faisal Orakzai founder', 'Faisal Orakzai blockchain', 'OKBOND', 'Orakzai Bond founder', 'Faisal Orakzai born 2006',
      'Faisal Orakzai Pakistan', 'Malak Faisal Orakzai', 'Chairman Faisal Orakzai',
      'Shamim Forever founder', 'Orakzai Group', 'Orakzai Bond',
      'Pakistani entrepreneur', 'blockchain architect Pakistan', 'luxury brand founder Pakistan',
      'faisalorakzaii', 'Faisal Moeen Orakzai', 'entrepreneur Peshawar Pakistan',
    ],
    authors: [{ name: 'Faisal Orakzai', url: 'https://www.shamimforever.com/founder' }],
    creator: 'Faisal Orakzai',
    alternates: { canonical: 'https://www.shamimforever.com/founder' },
    openGraph: {
      title: 'Faisal Orakzai — Founder & Chairman | Shamim Forever',
      description: 'Pakistani entrepreneur specializing in blockchain architecture, luxury commerce, and decentralized finance. Founder of Shamim Forever, Orakzai Group, and Orakzai Bond.',
      type: 'profile',
      url: 'https://www.shamimforever.com/founder',
      siteName: 'Shamim Forever',
      images: [
        {
          url: 'https://www.shamimforever.com/faisal-orakzai-smiling.jpg',
          width: 800,
          height: 800,
          alt: 'Faisal Orakzai — Founder & Chairman of Shamim Forever, smiling portrait',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Faisal Orakzai — Founder & Chairman',
      description: 'Pakistani entrepreneur. Blockchain • Luxury Commerce • DeFi. Founder of Shamim Forever.',
      images: ['https://www.shamimforever.com/faisal-orakzai-smiling.jpg'],
      creator: '@faisalorakzaii',
      site: '@faisalorakzaii',
    },
}

const founderJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://faisalorakzai.com/#person',
        name: 'Faisal Orakzai',
        givenName: 'Faisal',
        familyName: 'Orakzai',
        alternateName: [
          'Muhammad Faisal Orakzai',
          'Chairman Faisal Orakzai',
          'Malak Faisal Orakzai',
          'Faisal Moeen Orakzai',
          'faisalorakzaii',
        ],
        description: 'Founder & Chairman of Shamim Forever, Orakzai Group, and Orakzai Bond. Pakistani entrepreneur specializing in blockchain architecture, luxury commerce, and decentralized finance.',
        url: 'https://www.shamimforever.com/founder',
        mainEntityOfPage: 'https://www.shamimforever.com/founder',
        image: [
          { '@type': 'ImageObject', url: 'https://www.shamimforever.com/faisal-orakzai-smiling.jpg', width: 800, height: 800, caption: 'Faisal Orakzai — Founder & Chairman, Shamim Forever, smiling portrait', representativeOfPage: true },
          { '@type': 'ImageObject', url: 'https://www.shamimforever.com/faisal-orakzai-kurta.jpg', width: 800, height: 1000, caption: 'Faisal Orakzai — Chairman Orakzai Group, shalwar qameez' },
          { '@type': 'ImageObject', url: 'https://www.shamimforever.com/faisal-orakzai-formal.png', width: 800, height: 1000, caption: 'Faisal Orakzai — Chairman Orakzai Group, formal black suit' },
          { '@type': 'ImageObject', url: 'https://www.shamimforever.com/founder-faisal-orakzai.jpg', width: 650, height: 1024, caption: 'Faisal Orakzai — Founder & Chairman, Shamim Forever official portrait' },
        ],
        birthDate: '2006-04-30',
        birthPlace: { '@type': 'Place', name: 'Orakzai Agency, Tirah, Khyber Pakhtunkhwa, Pakistan', addressCountry: 'PK' },
        nationality: { '@type': 'Country', name: 'Pakistan' },
        jobTitle: ['Founder & Chairman', 'Entrepreneur', 'Blockchain Architect', 'CEO'],
        worksFor: [
          {
            '@type': 'Organization',
            '@id': 'https://www.shamimforever.com/#organization',
            name: 'Shamim Forever',
            url: 'https://www.shamimforever.com',
            description: 'Sovereign luxury digital house — bespoke fragrances, jewellery, and blockchain-verified couture.',
          },
          {
            '@type': 'Organization',
            name: 'Orakzai Group',
            description: 'Strategic holding company focused on digital innovation and luxury commerce.',
          },
          {
            '@type': 'Organization',
            name: 'Orakzai Bond',
            url: 'http://orakzaibond.com',
            description: 'Decentralized finance platform specializing in asset tokenization and quantitative trading.',
          },
        ],
        knowsAbout: [
          'Blockchain Architecture',
          'Decentralized Finance (DeFi)',
          'Luxury Commerce',
          'Tokenomics & Asset Design',
          'Quantitative Fintech',
          'NFT Technology',
          'Digital Fashion',
          'Luxury Fragrances',
          'Cryptocurrency',
          'Entrepreneurship',
          'Asset Management',
          'Startup Ecosystems',
        ],
        award: [
          'NUST 50 Under 50 — Entrepreneurship',
          'Emerging Entrepreneur Award',
        ],
        affiliation: [
          { '@type': 'Organization', name: 'NUST (National University of Sciences & Technology)' },
          { '@type': 'Organization', name: 'Ziauddin University Karachi' },
          { '@type': 'Organization', name: 'GEN Global Entrepreneurship Network', url: 'https://www.genglobal.org/user/faisal1' },
          { '@type': 'Organization', name: 'Y Combinator Startup School', url: 'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2' },
        ],
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'Ziauddin University', url: 'https://www.zu.edu.pk', description: 'Matriculation in Sciences — Islamiat, Pakistan Studies, Education Civics (Board of Secondary Education, Karachi)', address: { '@type': 'PostalAddress', addressLocality: 'Karachi', addressCountry: 'PK' }, startDate: '2024-04', endDate: '2026-04' },
          { '@type': 'EducationalOrganization', name: 'Founder Institute', url: 'https://fi.co', description: 'Founder Program — Karachi, South Asia 2026 (Entrepreneurship & Venture Building)', address: { '@type': 'PostalAddress', addressLocality: 'Karachi', addressCountry: 'PK' }, startDate: '2025-04', endDate: '2026-09' },
          { '@type': 'EducationalOrganization', name: 'Y Combinator', url: 'https://www.ycombinator.com', description: 'Startup Accelerator Program — Entrepreneurship / Entrepreneurial Studies', address: { '@type': 'PostalAddress', addressLocality: 'San Francisco', addressRegion: 'CA', addressCountry: 'US' }, startDate: '2026-06' },
          { '@type': 'EducationalOrganization', name: 'Global Self-Education Platform (GSEP)', description: 'Silent Empire Building — self-directed learning from books, mentors, and real-world experience. Skills: Business Analysis, Advertising', startDate: '2019-01' },
          { '@type': 'EducationalOrganization', name: 'Yahya Public School', address: { '@type': 'PostalAddress', addressLocality: 'Kohat', addressRegion: 'Khyber Pakhtunkhwa', addressCountry: 'PK' } },
          { '@type': 'EducationalOrganization', name: 'Madrassa Mahad-ul-Uleman', address: { '@type': 'PostalAddress', addressLocality: 'Kohat', addressRegion: 'Khyber Pakhtunkhwa', addressCountry: 'PK' } },
        ],
        identifier: [
          { '@type': 'PropertyValue', propertyID: 'ORCID', value: '0009-0000-0915-7272', url: 'https://orcid.org/0009-0000-0915-7272' },
          { '@type': 'PropertyValue', propertyID: 'Wikidata', value: 'Q140264666', url: 'https://www.wikidata.org/wiki/Q140264666' },
          { '@type': 'PropertyValue', propertyID: 'Crunchbase', value: 'faisal-orakzai', url: 'https://www.crunchbase.com/person/faisal-orakzai' },
        ],
        sameAs: [
          "https://imdb.me/faisalorakzai",
          'https://faisalorakzai.com',
                    'https://www.wikidata.org/wiki/Q140264666',
                    'https://orcid.org/0009-0000-0915-7272',
                    'https://www.crunchbase.com/person/faisal-orakzai',
                    'https://www.linkedin.com/in/faisalorakzaii',
                    'https://x.com/faisalorakzaii',
                    'https://www.instagram.com/faisalorakzaii',
                    'https://web.facebook.com/faisalorakzaii',
                    'https://tiktok.com/@chairmanorakzai',
                    'https://github.com/faisalorakzai-lab',
                    'https://www.pinterest.com/faisalorakzaii',
                    'https://linktr.ee/faisalorakzaiofficial',
                    'https://peerlist.io/faisalorakzai',
                    'https://hackernoon.com/u/faisalorakzai',
                    'https://www.f6s.com/faisalorakzai',
                    'https://theorg.com/org/orakzai-bond?person=faisal-orakzai',
                    'https://gust.com/user/014bee5e-1c09-4f2d-b5ae-f5c937bbcc0e',
                    'https://bebee.com/pk/people/faisalorakzai',
                    'https://pa.bio/faisalorakzaii',
                    'https://bio.site/faisalorakzai',
                    'https://www.genglobal.org/user/faisal1',
                    'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2',
                    'https://leetcode.com/u/faisalorakzai/',
                    'http://orakzaibond.com',
                    'https://www.shamimforever.com'
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.shamimforever.com/founder',
        url: 'https://www.shamimforever.com/founder',
        name: 'Faisal Orakzai — Founder & Chairman | Shamim Forever',
        description: 'Official profile of Faisal Orakzai, Founder & Chairman of Shamim Forever.',
        about: { '@id': 'https://www.shamimforever.com/founder#faisal-orakzai' },
        author: { '@id': 'https://www.shamimforever.com/founder#faisal-orakzai' },
        publisher: { '@id': 'https://www.shamimforever.com/#organization' },
        inLanguage: 'en',
        isPartOf: { '@id': 'https://www.shamimforever.com/#website' },
      },
    ],
}

const SOCIAL_LINKS = [
    { label: 'LinkedIn',    url: 'https://www.linkedin.com/in/faisalorakzaii',     icon: 'Li' },
    { label: 'X / Twitter', url: 'https://x.com/faisalorakzaii',                   icon: '𝕏'  },
    { label: 'Instagram',   url: 'https://www.instagram.com/faisalorakzaii',        icon: 'In' },
    { label: 'TikTok',      url: 'https://tiktok.com/@chairmanorakzai',             icon: 'Tk' },
    { label: 'GitHub',      url: 'https://github.com/faisalorakzai-lab',            icon: 'Gh' },
    { label: 'Facebook',    url: 'https://web.facebook.com/faisalorakzaii',         icon: 'Fb' },
    { label: 'Pinterest',   url: 'https://www.pinterest.com/faisalorakzaii',        icon: 'Pi' },
    { label: 'Linktree',    url: 'https://linktr.ee/faisalorakzaiofficial',         icon: 'Lt' },
    { label: 'Crunchbase',  url: 'https://www.crunchbase.com/person/faisal-orakzai', icon: 'Cb' },
    { label: 'Peerlist',    url: 'https://peerlist.io/faisalorakzai',               icon: 'Pl' },
    { label: 'HackerNoon',  url: 'https://hackernoon.com/u/faisalorakzai',          icon: 'Hn' },
    { label: 'F6S',         url: 'https://www.f6s.com/faisalorakzai',               icon: 'F6' },
    { label: 'Gust',        url: 'https://gust.com/user/014bee5e-1c09-4f2d-b5ae-f5c937bbcc0e', icon: 'Gu' },
    { label: 'GEN Global',  url: 'https://www.genglobal.org/user/faisal1',          icon: 'GE' },
    { label: 'ORCID',       url: 'https://orcid.org/0009-0000-0915-7272',           icon: 'OR' },
    { label: 'Wikidata',    url: 'https://www.wikidata.org/wiki/Q140264666',        icon: 'Wd' },
    { label: 'LeetCode',    url: 'https://leetcode.com/u/faisalorakzai/',           icon: 'Lc' },
    { label: 'Orakzai Bond', url: 'http://orakzaibond.com',                         icon: 'OB' },
]

export default function FounderPage() {
    return (
      <>
        <Script
          id="founder-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(founderJsonLd) }}
        />

        <main className="min-h-screen bg-[#050505] text-zinc-200 overflow-x-hidden">

          {/* ── HERO ── */}
          <section className="relative pt-28 pb-24 px-5 md:px-12 lg:px-20">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#c9a054]/5 blur-[120px] pointer-events-none" />

            <div className="relative max-w-[1100px] mx-auto flex flex-col md:flex-row items-center gap-16">

              {/* ── CIRCULAR PORTRAIT ── */}
              <div className="flex-shrink-0 flex flex-col items-center gap-6">
                {/* Outer ring */}
                <div className="relative">
                  {/* Rotating gold ring */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, #c9a054, #f0d070, #c9a054, #8a6a20, #c9a054)',
                      padding: '3px',
                      borderRadius: '50%',
                    }}
                  />
                  {/* Middle ring gap */}
                  <div className="absolute inset-[3px] rounded-full bg-[#050505]" />
                  {/* Thin inner accent ring */}
                  <div className="absolute inset-[8px] rounded-full border border-[#c9a054]/30" />

                  {/* Portrait */}
                  <div className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden m-[11px]">
                    <Image
                      src="/faisal-orakzai-smiling.jpg"
                      alt="Faisal Orakzai — Founder & Chairman, Shamim Forever"
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 768px) 240px, 300px"
                    />
                  </div>
                </div>

                {/* Gold monogram under circle */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-px bg-[#c9a054]/60" />
                  <p className="text-[#c9a054] text-xs tracking-[0.4em] uppercase">Orakzai Group</p>
                  <div className="w-8 h-px bg-[#c9a054]/60" />
                </div>
              </div>

              {/* ── IDENTITY ── */}
              <div className="flex-1 text-center md:text-left space-y-7">
                <div>
                  <p className="text-[#c9a054] text-xs tracking-[0.4em] uppercase mb-3">
                    Founder & Chairman
                  </p>
                  <h1 className="text-5xl md:text-6xl font-extralight tracking-tight leading-none mb-2">
                    Faisal
                  </h1>
                  <h1 className="text-5xl md:text-6xl font-light tracking-tight leading-none text-[#c9a054]">
                    Orakzai
                  </h1>
                </div>

                <p className="text-zinc-400 text-base leading-relaxed max-w-xl">
                  Visionary entrepreneur born in Pakistan, 2006. Building sovereign digital
                  luxury houses at the intersection of blockchain architecture, heritage craft,
                  and decentralized finance. Founder of Shamim Forever, Orakzai Group &amp; Orakzai Bond.
                </p>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {['Blockchain Architect', 'Luxury Commerce', 'DeFi', 'NFT', 'Entrepreneur'].map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 border border-[#c9a054]/30 text-[#c9a054] text-xs tracking-[0.2em] uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quick facts */}
                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#1a1a1a] max-w-md mx-auto md:mx-0">
                  {[
                    { label: 'Born', value: 'Apr 30, 2006' },
                    { label: 'Based', value: 'Pakistan' },
                    { label: 'Ventures', value: '3+' },
                  ].map(f => (
                    <div key={f.label}>
                      <p className="text-[#c9a054] text-[10px] tracking-[0.3em] uppercase mb-1">{f.label}</p>
                      <p className="text-zinc-300 text-sm">{f.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── BIOGRAPHY ── */}
          <section className="py-20 px-5 md:px-12 lg:px-20 bg-[#080808]">
            <div className="max-w-[860px] mx-auto">
              <p className="text-[#c9a054] text-xs tracking-[0.4em] uppercase mb-4">Biography</p>
              <h2 className="text-3xl font-light tracking-tight mb-10">About Faisal Orakzai</h2>
              <div className="space-y-5 text-zinc-400 leading-relaxed text-[15px]">
                <p>
                  Faisal Orakzai is a Pakistani entrepreneur and blockchain architect who has dedicated
                  his career to building innovative digital solutions that bridge luxury commerce with
                  decentralized finance. Born on April 30, 2006, he represents a new generation of
                  Pakistani entrepreneurs reshaping global luxury markets.
                </p>
                <p>
                  As the Founder &amp; Chairman of <strong className="text-zinc-200">Shamim Forever</strong>,
                  Faisal has created a sovereign digital luxury house combining heritage craftsmanship
                  with cutting-edge blockchain technology. His vision establishes new paradigms for
                  luxury authentication, ownership, and community engagement through NFTs and tokenomics.
                </p>
                <p>
                  Beyond Shamim Forever, Faisal leads <strong className="text-zinc-200">Orakzai Group</strong>
                  {' '}and <strong className="text-zinc-200">Orakzai Bond</strong> — ventures focused on
                  quantitative fintech and decentralized asset management. His academic contributions,
                  indexed on ORCID and cited across 67+ publications, bridge theoretical blockchain
                  research with real-world luxury applications.
                </p>
                <p>
                  Recognized by GEN Global Entrepreneurship Network and featured in Y Combinator&apos;s
                  Startup School, Faisal is building Pakistan&apos;s first globally recognized sovereign
                  luxury brand — positioning the country as a destination for high-end digital commerce.
                </p>
              </div>
            </div>
          </section>

          {/* ── VENTURES ── */}
          <section className="py-20 px-5 md:px-12 lg:px-20">
            <div className="max-w-[1100px] mx-auto">
              <p className="text-[#c9a054] text-xs tracking-[0.4em] uppercase mb-4">Portfolio</p>
              <h2 className="text-3xl font-light tracking-tight mb-10">Ventures &amp; Organizations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Shamim Forever',
                    role: 'Founder & Chairman',
                    desc: 'Sovereign digital luxury house — bespoke fragrances, high jewellery, and blockchain-verified couture collections sold worldwide.',
                    url: 'https://www.shamimforever.com',
                    year: '2023',
                  },
                  {
                    name: 'Orakzai Group',
                    role: 'Chairman',
                    desc: 'Strategic holding company focused on digital innovation, luxury commerce, and emerging market ventures across Pakistan.',
                    url: null,
                    year: '2023',
                  },
                  {
                    name: 'Orakzai Bond',
                    role: 'Founder & CEO',
                    desc: 'Decentralized finance platform specializing in asset tokenization, quantitative trading, and blockchain-native financial instruments.',
                    url: 'http://orakzaibond.com',
                    year: '2024',
                  },
                ].map(v => (
                  <div
                    key={v.name}
                    className="p-7 border border-[#1a1a1a] hover:border-[#c9a054]/40 transition-colors duration-500 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-[#c9a054] text-[10px] tracking-[0.3em] uppercase mb-1">{v.role}</p>
                        <h3 className="text-xl font-light text-zinc-100">
                          {v.url ? (
                            <Link href={v.url} target="_blank" rel="noopener noreferrer"
                              className="hover:text-[#c9a054] transition-colors">{v.name}</Link>
                          ) : v.name}
                        </h3>
                      </div>
                      <span className="text-[#c9a054]/40 text-xs">{v.year}</span>
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── EXPERTISE GRID ── */}
          <section className="py-20 px-5 md:px-12 lg:px-20 bg-[#080808]">
            <div className="max-w-[1100px] mx-auto">
              <p className="text-[#c9a054] text-xs tracking-[0.4em] uppercase mb-4">Expertise</p>
              <h2 className="text-3xl font-light tracking-tight mb-10">Areas of Mastery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: 'Blockchain Architecture', icon: '◈' },
                  { title: 'Decentralized Finance', icon: '◇' },
                  { title: 'Luxury Commerce', icon: '◆' },
                  { title: 'NFT Technology', icon: '◉' },
                  { title: 'Tokenomics', icon: '◎' },
                  { title: 'Digital Fashion', icon: '◌' },
                  { title: 'Quantitative Fintech', icon: '◐' },
                  { title: 'Entrepreneurship', icon: '◑' },
                ].map(e => (
                  <div
                    key={e.title}
                    className="p-5 border border-[#1a1a1a] hover:border-[#c9a054]/30 transition-colors text-center group"
                  >
                    <p className="text-[#c9a054] text-xl mb-2 group-hover:scale-110 transition-transform inline-block">{e.icon}</p>
                    <p className="text-zinc-400 text-sm leading-snug">{e.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── EDUCATION ── */}
          <section className="py-20 px-5 md:px-12 lg:px-20 bg-[#080808]">
            <div className="max-w-[860px] mx-auto">
              <p className="text-[#c9a054] text-xs tracking-[0.4em] uppercase mb-4">Education</p>
              <h2 className="text-3xl font-light tracking-tight mb-10">Foundations of Learning</h2>
              <div className="space-y-4">
                {[
                  { org: 'Y Combinator', detail: 'Startup Accelerator — Entrepreneurship / Entrepreneurial Studies', period: 'Jun 2026 – Present' },
                  { org: 'Founder Institute', detail: 'Founder Program, Karachi (South Asia 2026) — Venture Building', period: 'Apr 2025 – Sep 2026' },
                  { org: 'Ziauddin University', detail: 'Matriculation in Sciences — Islamiat, Pakistan Studies, Civics (Board of Secondary Education)', period: 'Apr 2024 – Apr 2026' },
                  { org: 'Global Self-Education Platform (GSEP)', detail: 'Silent Empire Building — Business Analysis, Advertising', period: 'Jan 2019 – Present' },
                  { org: 'Yahya Public School, Kohat', detail: 'Early education', period: '' },
                  { org: 'Madrassa Mahad-ul-Uleman, Kohat', detail: 'Early education', period: '' },
                ].map(e => (
                  <div key={e.org} className="flex items-start justify-between gap-4 p-4 border border-[#1a1a1a] hover:border-[#c9a054]/20 transition-colors flex-wrap">
                    <div>
                      <p className="text-zinc-200 text-sm font-medium">{e.org}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">{e.detail}</p>
                    </div>
                    {e.period && <span className="text-[#c9a054]/70 text-xs whitespace-nowrap">{e.period}</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── RECOGNITION ── */}
          <section className="py-20 px-5 md:px-12 lg:px-20">
            <div className="max-w-[860px] mx-auto">
              <p className="text-[#c9a054] text-xs tracking-[0.4em] uppercase mb-4">Recognition</p>
              <h2 className="text-3xl font-light tracking-tight mb-10">Awards &amp; Affiliations</h2>
              <div className="space-y-4">
                {[
                  { org: 'Wikidata',                        detail: 'Q140264666 — Verified public profile', url: 'https://www.wikidata.org/wiki/Q140264666' },
                  { org: 'ORCID',                           detail: '0009-0000-0915-7272 — Academic researcher identifier', url: 'https://orcid.org/0009-0000-0915-7272' },
                  { org: 'GEN Global Entrepreneurship',     detail: 'Member — Global Entrepreneurship Network', url: 'https://www.genglobal.org/user/faisal1' },
                  { org: 'Y Combinator Startup School',     detail: 'Co-Founder Matching Candidate', url: 'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2' },
                  { org: 'Crunchbase',                      detail: 'Verified entrepreneur profile', url: 'https://www.crunchbase.com/person/faisal-orakzai' },
                  { org: 'NUST Pakistan',                   detail: '50 Under 50 — Entrepreneurship Award', url: null },
                  { org: 'Ziauddin University Karachi',     detail: 'Blockchain Research Affiliation', url: null },
                  { org: 'Google Scholar',                  detail: 'Cited in 67+ Academic Publications', url: null },
                ].map(r => (
                  <div key={r.org} className="flex items-start gap-4 p-4 border border-[#1a1a1a] hover:border-[#c9a054]/20 transition-colors">
                    <span className="text-[#c9a054] mt-0.5 text-sm flex-shrink-0">→</span>
                    <div>
                      <p className="text-zinc-200 text-sm font-medium">
                        {r.url ? (
                          <Link href={r.url} target="_blank" rel="noopener noreferrer"
                            className="hover:text-[#c9a054] transition-colors">{r.org}</Link>
                        ) : r.org}
                      </p>
                      <p className="text-zinc-500 text-xs mt-0.5">{r.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SOCIAL LINKS GRID ── */}
          <section className="py-20 px-5 md:px-12 lg:px-20 bg-[#080808]">
            <div className="max-w-[1100px] mx-auto">
              <p className="text-[#c9a054] text-xs tracking-[0.4em] uppercase mb-4">Connect</p>
              <h2 className="text-3xl font-light tracking-tight mb-4">Find Faisal Online</h2>
              <p className="text-zinc-500 text-sm mb-10 max-w-lg">
                Verified presence across social, professional, and academic platforms worldwide.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { label: 'LinkedIn',     url: 'https://www.linkedin.com/in/faisalorakzaii' },
                  { label: 'X / Twitter',  url: 'https://x.com/faisalorakzaii' },
                  { label: 'Instagram',    url: 'https://www.instagram.com/faisalorakzaii' },
                  { label: 'TikTok',       url: 'https://tiktok.com/@chairmanorakzai' },
                  { label: 'GitHub',       url: 'https://github.com/faisalorakzai-lab' },
                  { label: 'Facebook',     url: 'https://web.facebook.com/faisalorakzaii' },
                  { label: 'Pinterest',    url: 'https://www.pinterest.com/faisalorakzaii' },
                  { label: 'Linktree',     url: 'https://linktr.ee/faisalorakzaiofficial' },
                  { label: 'Crunchbase',   url: 'https://www.crunchbase.com/person/faisal-orakzai' },
                  { label: 'Peerlist',     url: 'https://peerlist.io/faisalorakzai' },
                  { label: 'HackerNoon',   url: 'https://hackernoon.com/u/faisalorakzai' },
                  { label: 'F6S',          url: 'https://www.f6s.com/faisalorakzai' },
                  { label: 'The Org',      url: 'https://theorg.com/org/orakzai-bond?person=faisal-orakzai' },
                  { label: 'Gust',         url: 'https://gust.com/user/014bee5e-1c09-4f2d-b5ae-f5c937bbcc0e' },
                  { label: 'BeBee',        url: 'https://bebee.com/pk/people/faisalorakzai' },
                  { label: 'GEN Global',   url: 'https://www.genglobal.org/user/faisal1' },
                  { label: 'ORCID',        url: 'https://orcid.org/0009-0000-0915-7272' },
                  { label: 'Wikidata',     url: 'https://www.wikidata.org/wiki/Q140264666' },
                  { label: 'LeetCode',     url: 'https://leetcode.com/u/faisalorakzai/' },
                  { label: 'pa.bio',       url: 'https://pa.bio/faisalorakzaii' },
                  { label: 'bio.site',     url: 'https://bio.site/faisalorakzai' },
                  { label: 'Startup School', url: 'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2' },
                  { label: 'Orakzai Bond', url: 'http://orakzaibond.com' },
                ].map(s => (
                  <Link
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-[#1a1a1a] text-center text-xs text-zinc-500 hover:text-[#c9a054] hover:border-[#c9a054]/40 transition-all duration-300"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ── FOOTER CTA ── */}
          <section className="py-16 px-5 text-center border-t border-[#1a1a1a]">
            <p className="text-[#c9a054] text-xs tracking-[0.4em] uppercase mb-3">Explore the House</p>
            <Link
              href="/"
              className="inline-block px-10 py-3 border border-[#c9a054]/50 text-[#c9a054] hover:bg-[#c9a054] hover:text-[#050505] transition-all duration-300 text-sm tracking-[0.3em] uppercase"
            >
              Shamim Forever
            </Link>
          </section>

        </main>
      </>
    )
}
