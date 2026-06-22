import type { Metadata } from 'next'
  import Script from 'next/script'
  import Link from 'next/link'
  import Image from 'next/image'

  export const metadata: Metadata = {
    title: 'Faisal Orakzai — Entrepreneur, Blockchain Architect & Luxury Brand Founder',
    description: 'Faisal Orakzai is a Pakistani entrepreneur born April 30, 2006. Founder & Chairman of Shamim Forever, Orakzai Group, and Orakzai Bond. Specializing in blockchain architecture, decentralized finance, and sovereign luxury commerce.',
    keywords: [
      'Faisal Orakzai', 'Faisal Orakzai Pakistan', 'Faisal Orakzai entrepreneur',
      'Faisal Orakzai blockchain', 'Faisal Orakzai Shamim Forever',
      'Malak Faisal Orakzai', 'Chairman Faisal Orakzai', 'Faisal Moeen Orakzai',
      'faisalorakzaii', 'Orakzai Group founder', 'Orakzai Bond CEO',
      'Pakistani entrepreneur 2006', 'blockchain architect Pakistan',
      'luxury brand founder Pakistan', 'Faisal Orakzai biography',
      'Faisal Orakzai profile', 'Faisal Orakzai ventures',
    ],
    authors: [{ name: 'Faisal Orakzai', url: 'https://www.shamimforever.com/faisal-orakzai' }],
    creator: 'Faisal Orakzai',
    alternates: {
      canonical: 'https://www.shamimforever.com/faisal-orakzai',
    },
    openGraph: {
      title: 'Faisal Orakzai — Entrepreneur & Blockchain Architect',
      description: 'Pakistani entrepreneur. Founder of Shamim Forever, Orakzai Group & Orakzai Bond. Blockchain architect, luxury commerce innovator, DeFi builder.',
      type: 'profile',
      url: 'https://www.shamimforever.com/faisal-orakzai',
      siteName: 'Faisal Orakzai',
      images: [
        {
          url: 'https://www.shamimforever.com/founder-faisal-orakzai.jpg',
          width: 650,
          height: 1024,
          alt: 'Faisal Orakzai — Pakistani Entrepreneur & Founder',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Faisal Orakzai — Entrepreneur & Blockchain Architect',
      description: 'Founder of Shamim Forever, Orakzai Group & Orakzai Bond. Building Pakistan's global luxury and fintech brands.',
      images: ['https://www.shamimforever.com/founder-faisal-orakzai.jpg'],
      creator: '@faisalorakzaii',
      site: '@faisalorakzaii',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://www.shamimforever.com/faisal-orakzai#person',
        name: 'Faisal Orakzai',
        givenName: 'Faisal',
        familyName: 'Orakzai',
        additionalName: 'Moeen',
        alternateName: [
          'Chairman Faisal Orakzai',
          'Malak Faisal Orakzai',
          'Faisal Moeen Orakzai',
          'faisalorakzaii',
        ],
        description: 'Pakistani entrepreneur and blockchain architect. Founder & Chairman of Shamim Forever, Orakzai Group, and Orakzai Bond. Born April 30, 2006 in Pakistan. Specializing in blockchain architecture, decentralized finance, luxury commerce, and NFT technology.',
        url: 'https://www.shamimforever.com/faisal-orakzai',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.shamimforever.com/faisal-orakzai',
        },
        image: {
          '@type': 'ImageObject',
          url: 'https://www.shamimforever.com/founder-faisal-orakzai.jpg',
          width: 650,
          height: 1024,
          caption: 'Faisal Orakzai — Founder & Chairman, Shamim Forever',
        },
        birthDate: '2006-04-30',
        birthPlace: {
          '@type': 'Place',
          name: 'Pakistan',
          addressCountry: 'PK',
        },
        nationality: { '@type': 'Country', name: 'Pakistan' },
        gender: 'Male',
        jobTitle: ['Founder & Chairman', 'CEO', 'Entrepreneur', 'Blockchain Architect'],
        hasOccupation: [
          { '@type': 'Occupation', name: 'Entrepreneur' },
          { '@type': 'Occupation', name: 'Blockchain Architect' },
          { '@type': 'Occupation', name: 'Luxury Brand Founder' },
        ],
        worksFor: [
          {
            '@type': 'Organization',
            '@id': 'https://www.shamimforever.com/#organization',
            name: 'Shamim Forever',
            url: 'https://www.shamimforever.com',
            foundingDate: '2023',
            description: 'Sovereign digital luxury house — bespoke fragrances, jewellery, and blockchain-verified couture.',
          },
          {
            '@type': 'Organization',
            name: 'Orakzai Group',
            description: 'Strategic holding company for digital innovation and luxury commerce ventures.',
          },
          {
            '@type': 'Organization',
            name: 'Orakzai Bond',
            url: 'http://orakzaibond.com',
            foundingDate: '2024',
            description: 'Decentralized finance platform for asset tokenization and quantitative trading.',
          },
        ],
        founder: [
          { '@type': 'Organization', name: 'Shamim Forever', url: 'https://www.shamimforever.com' },
          { '@type': 'Organization', name: 'Orakzai Bond', url: 'http://orakzaibond.com' },
          { '@type': 'Organization', name: 'Orakzai Group' },
        ],
        knowsAbout: [
          'Blockchain Architecture', 'Decentralized Finance (DeFi)', 'Luxury Commerce',
          'Tokenomics', 'NFT Technology', 'Digital Fashion', 'Quantitative Fintech',
          'Asset Tokenization', 'Luxury Fragrances', 'Smart Contracts', 'Entrepreneurship',
          'Brand Building', 'Startup Ecosystems',
        ],
        award: [
          'NUST 50 Under 50 — Entrepreneurship',
          'Emerging Entrepreneur Award',
          'GEN Global Entrepreneurship Network Member',
        ],
        affiliation: [
          { '@type': 'Organization', name: 'GEN Global Entrepreneurship Network', url: 'https://www.genglobal.org/user/faisal1' },
          { '@type': 'Organization', name: 'Y Combinator Startup School', url: 'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2' },
          { '@type': 'Organization', name: 'NUST Pakistan' },
          { '@type': 'Organization', name: 'Ziauddin University Karachi' },
        ],
        identifier: [
          { '@type': 'PropertyValue', propertyID: 'ORCID',     value: '0009-0000-0915-7272',            url: 'https://orcid.org/0009-0000-0915-7272' },
          { '@type': 'PropertyValue', propertyID: 'Wikidata',  value: 'Q140264666',                    url: 'https://www.wikidata.org/wiki/Q140264666' },
          { '@type': 'PropertyValue', propertyID: 'Crunchbase',value: 'faisal-orakzai',                url: 'https://www.crunchbase.com/person/faisal-orakzai' },
          { '@type': 'PropertyValue', propertyID: 'LinkedIn',  value: 'faisalorakzaii',                url: 'https://www.linkedin.com/in/faisalorakzaii' },
          { '@type': 'PropertyValue', propertyID: 'Twitter',   value: '@faisalorakzaii',               url: 'https://x.com/faisalorakzaii' },
          { '@type': 'PropertyValue', propertyID: 'Instagram', value: '@faisalorakzaii',               url: 'https://www.instagram.com/faisalorakzaii' },
          { '@type': 'PropertyValue', propertyID: 'GitHub',    value: 'faisalorakzai-lab',             url: 'https://github.com/faisalorakzai-lab' },
          { '@type': 'PropertyValue', propertyID: 'TikTok',    value: '@chairmanorakzai',              url: 'https://tiktok.com/@chairmanorakzai' },
        ],
        sameAs: [
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
          'https://www.shamimforever.com/founder',
          'https://www.shamimforever.com',
        ],
      },
    ],
  }

  const SOCIAL = [
    { label: 'LinkedIn',       url: 'https://www.linkedin.com/in/faisalorakzaii',                            category: 'Professional' },
    { label: 'X / Twitter',    url: 'https://x.com/faisalorakzaii',                                          category: 'Social' },
    { label: 'Instagram',      url: 'https://www.instagram.com/faisalorakzaii',                               category: 'Social' },
    { label: 'TikTok',         url: 'https://tiktok.com/@chairmanorakzai',                                    category: 'Social' },
    { label: 'Facebook',       url: 'https://web.facebook.com/faisalorakzaii',                                category: 'Social' },
    { label: 'Pinterest',      url: 'https://www.pinterest.com/faisalorakzaii',                               category: 'Social' },
    { label: 'GitHub',         url: 'https://github.com/faisalorakzai-lab',                                   category: 'Technical' },
    { label: 'LeetCode',       url: 'https://leetcode.com/u/faisalorakzai/',                                  category: 'Technical' },
    { label: 'Linktree',       url: 'https://linktr.ee/faisalorakzaiofficial',                                category: 'Social' },
    { label: 'Crunchbase',     url: 'https://www.crunchbase.com/person/faisal-orakzai',                       category: 'Professional' },
    { label: 'Peerlist',       url: 'https://peerlist.io/faisalorakzai',                                      category: 'Professional' },
    { label: 'HackerNoon',     url: 'https://hackernoon.com/u/faisalorakzai',                                 category: 'Professional' },
    { label: 'F6S',            url: 'https://www.f6s.com/faisalorakzai',                                      category: 'Professional' },
    { label: 'The Org',        url: 'https://theorg.com/org/orakzai-bond?person=faisal-orakzai',              category: 'Professional' },
    { label: 'Gust',           url: 'https://gust.com/user/014bee5e-1c09-4f2d-b5ae-f5c937bbcc0e',            category: 'Professional' },
    { label: 'BeBee',          url: 'https://bebee.com/pk/people/faisalorakzai',                              category: 'Professional' },
    { label: 'GEN Global',     url: 'https://www.genglobal.org/user/faisal1',                                 category: 'Academic' },
    { label: 'Y Combinator',   url: 'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2',  category: 'Academic' },
    { label: 'ORCID',          url: 'https://orcid.org/0009-0000-0915-7272',                                  category: 'Academic' },
    { label: 'Wikidata',       url: 'https://www.wikidata.org/wiki/Q140264666',                               category: 'Academic' },
    { label: 'pa.bio',         url: 'https://pa.bio/faisalorakzaii',                                          category: 'Social' },
    { label: 'bio.site',       url: 'https://bio.site/faisalorakzai',                                         category: 'Social' },
    { label: 'Orakzai Bond',   url: 'http://orakzaibond.com',                                                 category: 'Ventures' },
    { label: 'Shamim Forever', url: 'https://www.shamimforever.com',                                          category: 'Ventures' },
  ]

  const CATEGORIES = ['Professional', 'Social', 'Technical', 'Academic', 'Ventures'] as const

  export default function FaisalOrakzaiPage() {
    return (
      <>
        <Script
          id="faisal-orakzai-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        <div style={{ background: '#030303', minHeight: '100vh', color: '#e4e4e7', fontFamily: "'system-ui', sans-serif" }}>

          {/* ─── NAV ─── */}
          <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #111', background: 'rgba(3,3,3,0.9)', backdropFilter: 'blur(12px)' }}>
            <Link href="https://www.shamimforever.com" style={{ color: '#c9a054', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Shamim Forever
            </Link>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#about"    style={navLink}>About</a>
              <a href="#ventures" style={navLink}>Ventures</a>
              <a href="#connect"  style={navLink}>Connect</a>
            </div>
          </nav>

          {/* ─── HERO ─── */}
          <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px', position: 'relative', overflow: 'hidden' }}>
            {/* Background glow blobs */}
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,160,84,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1100, width: '100%', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 64, alignItems: 'center' }}>

              {/* ── CIRCULAR PHOTO ── */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                {/* Triple ring system */}
                <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Outer glow ring */}
                  <div style={{
                    position: 'absolute', inset: -4,
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, #c9a054, #f0d070, #e8c060, #a07030, #c9a054, #f0d070, #c9a054)',
                    filter: 'blur(1px)',
                    opacity: 0.7,
                  }} />
                  {/* Ring gap */}
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#030303', margin: 3 }} />
                  {/* Inner accent ring */}
                  <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '1px solid rgba(201,160,84,0.2)' }} />
                  {/* Photo */}
                  <div style={{ position: 'relative', width: 280, height: 280, borderRadius: '50%', overflow: 'hidden', margin: 14 }}>
                    <Image
                      src="/founder-faisal-orakzai.jpg"
                      alt="Faisal Orakzai — Pakistani Entrepreneur, Founder of Shamim Forever"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'top center' }}
                      priority
                      sizes="280px"
                    />
                  </div>
                </div>

                {/* Verified badge row */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {[
                    { label: 'Wikidata', url: 'https://www.wikidata.org/wiki/Q140264666' },
                    { label: 'ORCID',    url: 'https://orcid.org/0009-0000-0915-7272' },
                  ].map(b => (
                    <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer"
                      style={{ padding: '4px 10px', border: '1px solid rgba(201,160,84,0.4)', color: '#c9a054', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>
                      ✓ {b.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* ── TEXT IDENTITY ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <p style={{ color: '#c9a054', fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
                    Founder & Chairman
                  </p>
                  <h1 style={{ fontSize: 72, fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1, margin: 0 }}>
                    Faisal
                  </h1>
                  <h1 style={{ fontSize: 72, fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, margin: 0, color: '#c9a054' }}>
                    Orakzai
                  </h1>
                </div>

                <p style={{ color: '#71717a', fontSize: 16, lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
                  Pakistani entrepreneur born April 30, 2006. Building sovereign digital brands
                  at the intersection of <strong style={{ color: '#a1a1aa' }}>blockchain architecture</strong>,
                  heritage luxury commerce, and <strong style={{ color: '#a1a1aa' }}>decentralized finance</strong>.
                </p>

                {/* Tag pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Blockchain', 'DeFi', 'Luxury Commerce', 'NFT', 'Entrepreneur', 'Pakistan'].map(t => (
                    <span key={t} style={{ padding: '4px 12px', border: '1px solid rgba(201,160,84,0.25)', color: '#c9a054', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Quick stats */}
                <div style={{ display: 'flex', gap: 32, paddingTop: 20, borderTop: '1px solid #111' }}>
                  {[
                    { n: '3+',     l: 'Ventures Founded' },
                    { n: '2023',   l: 'Shamim Forever Est.' },
                    { n: '23+',    l: 'Verified Profiles' },
                    { n: '67+',    l: 'Academic Citations' },
                  ].map(s => (
                    <div key={s.l}>
                      <p style={{ color: '#c9a054', fontSize: 22, fontWeight: 300, margin: 0 }}>{s.n}</p>
                      <p style={{ color: '#52525b', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '4px 0 0' }}>{s.l}</p>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <a href="https://www.linkedin.com/in/faisalorakzaii" target="_blank" rel="noopener noreferrer"
                    style={{ padding: '10px 24px', border: '1px solid #c9a054', color: '#c9a054', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    LinkedIn
                  </a>
                  <a href="https://www.shamimforever.com" target="_blank" rel="noopener noreferrer"
                    style={{ padding: '10px 24px', background: '#c9a054', color: '#030303', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600 }}>
                    Shamim Forever
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ─── ABOUT ─── */}
          <section id="about" style={{ padding: '80px 24px', background: '#060606', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <p style={sectionLabel}>Biography</p>
              <h2 style={sectionTitle}>About Faisal Orakzai</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, color: '#71717a', fontSize: 15, lineHeight: 1.8 }}>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: '#e4e4e7' }}>Faisal Orakzai</strong> (born April 30, 2006, Pakistan) is a visionary
                  entrepreneur and blockchain architect recognized globally for his work in digital luxury commerce
                  and decentralized finance. As the youngest founder of a sovereign luxury house in Pakistan, he has
                  redefined what it means to build a global brand from an emerging market.
                </p>
                <p style={{ margin: 0 }}>
                  He founded <strong style={{ color: '#e4e4e7' }}>Shamim Forever</strong> in 2023 — a global luxury
                  digital house offering bespoke fragrances, sovereign jewellery, and blockchain-verified couture
                  collections. The brand operates at the intersection of traditional luxury heritage and Web3 technology,
                  pioneering NFT-authenticated luxury assets for a new generation of discerning collectors worldwide.
                </p>
                <p style={{ margin: 0 }}>
                  Through <strong style={{ color: '#e4e4e7' }}>Orakzai Group</strong> and{' '}
                  <strong style={{ color: '#e4e4e7' }}>Orakzai Bond</strong>, Faisal is building Pakistan&apos;s
                  first blockchain-native asset management ecosystem — combining quantitative fintech with
                  decentralized asset tokenization. His academic research, indexed on ORCID and cited across
                  67+ publications, bridges theoretical blockchain science with real-world commercial application.
                </p>
                <p style={{ margin: 0 }}>
                  A member of the <strong style={{ color: '#e4e4e7' }}>GEN Global Entrepreneurship Network</strong> and
                  featured in <strong style={{ color: '#e4e4e7' }}>Y Combinator Startup School</strong>,
                  Faisal is widely regarded as one of Pakistan&apos;s most ambitious young entrepreneurs — building
                  institutions designed to last generations, not companies designed to exit.
                </p>
              </div>
            </div>
          </section>

          {/* ─── VENTURES ─── */}
          <section id="ventures" style={{ padding: '80px 24px', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <p style={sectionLabel}>Portfolio</p>
              <h2 style={sectionTitle}>Ventures &amp; Organizations</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                {[
                  {
                    name: 'Shamim Forever',
                    role: 'Founder & Chairman',
                    year: '2023',
                    desc: 'Sovereign digital luxury house — bespoke fragrances, high jewellery, couture cosmetics, and blockchain-verified collections. Live at shamimforever.com.',
                    url: 'https://www.shamimforever.com',
                    tags: ['Luxury', 'Blockchain', 'E-Commerce'],
                  },
                  {
                    name: 'Orakzai Group',
                    role: 'Chairman',
                    year: '2023',
                    desc: 'Strategic holding company overseeing digital innovation ventures, luxury commerce, and emerging market investments across Pakistan and globally.',
                    url: null,
                    tags: ['Holdings', 'Strategy', 'Investment'],
                  },
                  {
                    name: 'Orakzai Bond',
                    role: 'Founder & CEO',
                    year: '2024',
                    desc: 'Blockchain-native DeFi platform for quantitative asset management, tokenized instruments, and decentralized financial infrastructure.',
                    url: 'http://orakzaibond.com',
                    tags: ['DeFi', 'Fintech', 'Blockchain'],
                  },
                ].map(v => (
                  <div key={v.name} style={{ padding: 28, border: '1px solid #111', transition: 'border-color 0.3s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div>
                        <p style={{ color: '#c9a054', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 6px' }}>{v.role}</p>
                        <h3 style={{ color: '#e4e4e7', fontSize: 20, fontWeight: 300, margin: 0 }}>
                          {v.url
                            ? <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{v.name}</a>
                            : v.name}
                        </h3>
                      </div>
                      <span style={{ color: '#3f3f46', fontSize: 12 }}>{v.year}</span>
                    </div>
                    <p style={{ color: '#52525b', fontSize: 13, lineHeight: 1.7, margin: '0 0 16px' }}>{v.desc}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {v.tags.map(t => (
                        <span key={t} style={{ padding: '2px 8px', border: '1px solid #1a1a1a', color: '#52525b', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── EXPERTISE ─── */}
          <section style={{ padding: '80px 24px', background: '#060606', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <p style={sectionLabel}>Expertise</p>
              <h2 style={sectionTitle}>Areas of Mastery</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                {[
                  { icon: '◈', title: 'Blockchain Architecture' },
                  { icon: '◇', title: 'Decentralized Finance' },
                  { icon: '◆', title: 'Luxury Commerce' },
                  { icon: '◉', title: 'NFT Technology' },
                  { icon: '◎', title: 'Tokenomics' },
                  { icon: '◌', title: 'Digital Fashion' },
                  { icon: '◐', title: 'Quantitative Fintech' },
                  { icon: '◑', title: 'Smart Contracts' },
                  { icon: '◒', title: 'Brand Architecture' },
                  { icon: '◓', title: 'Startup Strategy' },
                  { icon: '●', title: 'Asset Tokenization' },
                  { icon: '○', title: 'Luxury Authentication' },
                ].map(e => (
                  <div key={e.title} style={{ padding: '20px 16px', border: '1px solid #111', textAlign: 'center' }}>
                    <p style={{ color: '#c9a054', fontSize: 20, margin: '0 0 8px' }}>{e.icon}</p>
                    <p style={{ color: '#71717a', fontSize: 12, margin: 0, lineHeight: 1.4 }}>{e.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── RECOGNITION ─── */}
          <section style={{ padding: '80px 24px', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <p style={sectionLabel}>Recognition</p>
              <h2 style={sectionTitle}>Awards, Affiliations &amp; Academic Presence</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { org: 'Wikidata',                   detail: 'Q140264666 — Publicly verified encyclopedia entry',          url: 'https://www.wikidata.org/wiki/Q140264666' },
                  { org: 'ORCID',                      detail: '0009-0000-0915-7272 — Academic researcher identifier',       url: 'https://orcid.org/0009-0000-0915-7272' },
                  { org: 'GEN Global Network',         detail: 'Member — Global Entrepreneurship Network',                   url: 'https://www.genglobal.org/user/faisal1' },
                  { org: 'Y Combinator Startup School',detail: 'Co-Founder Matching Candidate',                              url: 'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2' },
                  { org: 'Crunchbase',                 detail: 'Verified entrepreneur and startup founder profile',          url: 'https://www.crunchbase.com/person/faisal-orakzai' },
                  { org: 'HackerNoon',                 detail: 'Published author on blockchain and fintech',                 url: 'https://hackernoon.com/u/faisalorakzai' },
                  { org: 'NUST Pakistan',              detail: '50 Under 50 — Entrepreneurship Award',                       url: null },
                  { org: 'Google Scholar',             detail: '67+ academic citations across blockchain publications',      url: null },
                  { org: 'Ziauddin University',        detail: 'Blockchain & DeFi Research Affiliation',                    url: null },
                ].map(r => (
                  <div key={r.org} style={{ display: 'flex', gap: 16, padding: '16px 20px', border: '1px solid #111', alignItems: 'flex-start' }}>
                    <span style={{ color: '#c9a054', fontSize: 14, flexShrink: 0, marginTop: 2 }}>→</span>
                    <div>
                      <p style={{ color: '#e4e4e7', fontSize: 14, margin: 0, fontWeight: 500 }}>
                        {r.url
                          ? <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{r.org}</a>
                          : r.org}
                      </p>
                      <p style={{ color: '#52525b', fontSize: 12, margin: '4px 0 0' }}>{r.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── CONNECT ─── */}
          <section id="connect" style={{ padding: '80px 24px', background: '#060606', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <p style={sectionLabel}>Find Me Online</p>
              <h2 style={sectionTitle}>Verified Presence Across 24+ Platforms</h2>
              <p style={{ color: '#52525b', fontSize: 13, marginBottom: 40, maxWidth: 600 }}>
                Faisal Orakzai maintains verified profiles across social, professional, academic, and technical platforms worldwide.
              </p>
              {CATEGORIES.map(cat => {
                const links = SOCIAL.filter(s => s.category === cat)
                return (
                  <div key={cat} style={{ marginBottom: 40 }}>
                    <p style={{ color: '#c9a054', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 16, borderBottom: '1px solid #111', paddingBottom: 8 }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {links.map(s => (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                          style={{ padding: '8px 16px', border: '1px solid #1a1a1a', color: '#71717a', fontSize: 12, letterSpacing: '0.1em', textDecoration: 'none', transition: 'all 0.2s' }}>
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ─── FOOTER ─── */}
          <footer style={{ padding: '40px 24px', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ color: '#c9a054', fontSize: 14, margin: 0 }}>Faisal Orakzai</p>
              <p style={{ color: '#3f3f46', fontSize: 11, margin: '4px 0 0', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Founder & Chairman · Shamim Forever
              </p>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <Link href="https://www.shamimforever.com" style={{ color: '#52525b', fontSize: 12, textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Shamim Forever
              </Link>
              <a href="https://www.linkedin.com/in/faisalorakzaii" target="_blank" rel="noopener noreferrer"
                style={{ color: '#52525b', fontSize: 12, textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                LinkedIn
              </a>
            </div>
          </footer>

        </div>
      </>
    )
  }

  // ─── Style tokens ───
  const navLink: React.CSSProperties = {
    color: '#52525b',
    fontSize: 11,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    textDecoration: 'none',
  }
  const sectionLabel: React.CSSProperties = {
    color: '#c9a054',
    fontSize: 11,
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 0,
  }
  const sectionTitle: React.CSSProperties = {
    color: '#e4e4e7',
    fontSize: 32,
    fontWeight: 300,
    letterSpacing: '-0.01em',
    marginTop: 0,
    marginBottom: 40,
  }
  