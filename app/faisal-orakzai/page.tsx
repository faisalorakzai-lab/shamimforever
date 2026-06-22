import type { Metadata } from 'next'
  import Script from 'next/script'
  import Link from 'next/link'
  import Image from 'next/image'
  import type { CSSProperties } from 'react'

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
    alternates: { canonical: 'https://www.shamimforever.com/faisal-orakzai' },
    openGraph: {
      title: 'Faisal Orakzai — Entrepreneur & Blockchain Architect',
      description: 'Pakistani entrepreneur. Founder of Shamim Forever, Orakzai Group & Orakzai Bond. Blockchain architect, luxury commerce innovator, DeFi builder.',
      type: 'profile',
      url: 'https://www.shamimforever.com/faisal-orakzai',
      siteName: 'Faisal Orakzai',
      images: [{ url: 'https://www.shamimforever.com/faisal-orakzai-hero.jpg', width: 1080, height: 1080, alt: 'Faisal Orakzai — Pakistani Entrepreneur & Founder' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Faisal Orakzai — Entrepreneur & Blockchain Architect',
      description: "Founder of Shamim Forever, Orakzai Group & Orakzai Bond. Building Pakistan's global luxury and fintech brands.",
      images: ['https://www.shamimforever.com/faisal-orakzai-hero.jpg'],
      creator: '@faisalorakzaii',
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://www.shamimforever.com/faisal-orakzai#person',
        name: 'Faisal Orakzai',
        givenName: 'Faisal', familyName: 'Orakzai', additionalName: 'Moeen',
        alternateName: ['Chairman Faisal Orakzai', 'Malak Faisal Orakzai', 'Faisal Moeen Orakzai', 'faisalorakzaii'],
        description: 'Pakistani entrepreneur and blockchain architect. Founder & Chairman of Shamim Forever, Orakzai Group, and Orakzai Bond. Born April 30, 2006 in Pakistan.',
        url: 'https://www.shamimforever.com/faisal-orakzai',
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.shamimforever.com/faisal-orakzai' },
        image: { '@type': 'ImageObject', url: 'https://www.shamimforever.com/faisal-orakzai-hero.jpg', width: 1080, height: 1080, caption: 'Faisal Orakzai — Founder & Chairman, Shamim Forever' },
        birthDate: '2006-04-30',
        birthPlace: { '@type': 'Place', name: 'Pakistan', addressCountry: 'PK' },
        nationality: { '@type': 'Country', name: 'Pakistan' },
        gender: 'Male',
        jobTitle: ['Founder & Chairman', 'CEO', 'Entrepreneur', 'Blockchain Architect'],
        worksFor: [
          { '@type': 'Organization', '@id': 'https://www.shamimforever.com/#organization', name: 'Shamim Forever', url: 'https://www.shamimforever.com', foundingDate: '2023' },
          { '@type': 'Organization', name: 'Orakzai Group' },
          { '@type': 'Organization', name: 'Orakzai Bond', url: 'http://orakzaibond.com', foundingDate: '2026' },
        ],
        founder: [
          { '@type': 'Organization', name: 'Shamim Forever', url: 'https://www.shamimforever.com' },
          { '@type': 'Organization', name: 'Orakzai Bond', url: 'http://orakzaibond.com' },
          { '@type': 'Organization', name: 'Orakzai Group' },
        ],
        knowsAbout: ['Blockchain Architecture', 'Decentralized Finance (DeFi)', 'Luxury Commerce', 'Tokenomics', 'NFT Technology', 'Digital Fashion', 'Quantitative Fintech', 'Asset Tokenization', 'Luxury Fragrances', 'Smart Contracts', 'Entrepreneurship', 'Brand Building'],
        identifier: [
          { '@type': 'PropertyValue', propertyID: 'ORCID',     value: '0009-0000-0915-7272', url: 'https://orcid.org/0009-0000-0915-7272' },
          { '@type': 'PropertyValue', propertyID: 'Wikidata',  value: 'Q140264666',           url: 'https://www.wikidata.org/wiki/Q140264666' },
          { '@type': 'PropertyValue', propertyID: 'Crunchbase',value: 'faisal-orakzai',        url: 'https://www.crunchbase.com/person/faisal-orakzai' },
          { '@type': 'PropertyValue', propertyID: 'Twitter',   value: '@faisalorakzaii',        url: 'https://x.com/faisalorakzaii' },
          { '@type': 'PropertyValue', propertyID: 'Instagram', value: '@faisalorakzaii',        url: 'https://www.instagram.com/faisalorakzaii' },
          { '@type': 'PropertyValue', propertyID: 'GitHub',    value: 'faisalorakzai-lab',      url: 'https://github.com/faisalorakzai-lab' },
        ],
        sameAs: [
          'https://www.wikidata.org/wiki/Q140264666', 'https://orcid.org/0009-0000-0915-7272',
          'https://www.crunchbase.com/person/faisal-orakzai', 'https://www.linkedin.com/in/faisalorakzaii',
          'https://x.com/faisalorakzaii', 'https://www.instagram.com/faisalorakzaii',
          'https://web.facebook.com/faisalorakzaii', 'https://tiktok.com/@chairmanorakzai',
          'https://github.com/faisalorakzai-lab', 'https://www.pinterest.com/faisalorakzaii',
          'https://linktr.ee/faisalorakzaiofficial', 'https://peerlist.io/faisalorakzai',
          'https://hackernoon.com/u/faisalorakzai', 'https://www.f6s.com/faisalorakzai',
          'https://theorg.com/org/orakzai-bond?person=faisal-orakzai',
          'https://gust.com/user/014bee5e-1c09-4f2d-b5ae-f5c937bbcc0e',
          'https://bebee.com/pk/people/faisalorakzai', 'https://pa.bio/faisalorakzaii',
          'https://bio.site/faisalorakzai', 'https://www.genglobal.org/user/faisal1',
          'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2',
          'https://leetcode.com/u/faisalorakzai/', 'http://orakzaibond.com',
          'https://www.shamimforever.com/founder', 'https://www.shamimforever.com',
        ],
      },
    ],
  }

  const SOCIAL: Array<{ label: string; url: string; category: string }> = [
    { label: 'LinkedIn',       url: 'https://www.linkedin.com/in/faisalorakzaii',                           category: 'Professional' },
    { label: 'X / Twitter',    url: 'https://x.com/faisalorakzaii',                                         category: 'Social' },
    { label: 'Instagram',      url: 'https://www.instagram.com/faisalorakzaii',                              category: 'Social' },
    { label: 'TikTok',         url: 'https://tiktok.com/@chairmanorakzai',                                   category: 'Social' },
    { label: 'Facebook',       url: 'https://web.facebook.com/faisalorakzaii',                               category: 'Social' },
    { label: 'Pinterest',      url: 'https://www.pinterest.com/faisalorakzaii',                              category: 'Social' },
    { label: 'GitHub',         url: 'https://github.com/faisalorakzai-lab',                                  category: 'Technical' },
    { label: 'LeetCode',       url: 'https://leetcode.com/u/faisalorakzai/',                                 category: 'Technical' },
    { label: 'Linktree',       url: 'https://linktr.ee/faisalorakzaiofficial',                               category: 'Social' },
    { label: 'Crunchbase',     url: 'https://www.crunchbase.com/person/faisal-orakzai',                      category: 'Professional' },
    { label: 'Peerlist',       url: 'https://peerlist.io/faisalorakzai',                                     category: 'Professional' },
    { label: 'HackerNoon',     url: 'https://hackernoon.com/u/faisalorakzai',                                category: 'Professional' },
    { label: 'F6S',            url: 'https://www.f6s.com/faisalorakzai',                                     category: 'Professional' },
    { label: 'The Org',        url: 'https://theorg.com/org/orakzai-bond?person=faisal-orakzai',             category: 'Professional' },
    { label: 'Gust',           url: 'https://gust.com/user/014bee5e-1c09-4f2d-b5ae-f5c937bbcc0e',           category: 'Professional' },
    { label: 'BeBee',          url: 'https://bebee.com/pk/people/faisalorakzai',                             category: 'Professional' },
    { label: 'GEN Global',     url: 'https://www.genglobal.org/user/faisal1',                                category: 'Academic' },
    { label: 'Y Combinator',   url: 'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2', category: 'Academic' },
    { label: 'ORCID',          url: 'https://orcid.org/0009-0000-0915-7272',                                 category: 'Academic' },
    { label: 'Wikidata',       url: 'https://www.wikidata.org/wiki/Q140264666',                              category: 'Academic' },
    { label: 'pa.bio',         url: 'https://pa.bio/faisalorakzaii',                                         category: 'Social' },
    { label: 'bio.site',       url: 'https://bio.site/faisalorakzai',                                        category: 'Social' },
    { label: 'Orakzai Bond',   url: 'http://orakzaibond.com',                                                category: 'Ventures' },
    { label: 'Shamim Forever', url: 'https://www.shamimforever.com',                                         category: 'Ventures' },
  ]

  const CATEGORIES = ['Professional', 'Social', 'Technical', 'Academic', 'Ventures']

  const navLink: CSSProperties = { color: '#52525b', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }
  const sLabel: CSSProperties  = { color: '#c9a054', fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12, marginTop: 0 }
  const sTitle: CSSProperties  = { color: '#e4e4e7', fontSize: 32, fontWeight: 300, letterSpacing: '-0.01em', marginTop: 0, marginBottom: 40 }

  export default function FaisalOrakzaiPage() {
    return (
      <>
        <Script id="faisal-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

        <div style={{ background: '#030303', color: '#e4e4e7', fontFamily: 'system-ui,sans-serif', overflowX: 'hidden' }}>

          {/* NAV */}
          <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #111', background: 'rgba(3,3,3,0.92)', backdropFilter: 'blur(16px)' }}>
            <Link href="https://www.shamimforever.com" style={{ color: '#c9a054', fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', textDecoration: 'none' }}>Shamim Forever</Link>
            <div style={{ display: 'flex', gap: 24 }}>
              <a href="#about"    style={navLink}>About</a>
              <a href="#ventures" style={navLink}>Ventures</a>
              <a href="#connect"  style={navLink}>Connect</a>
            </div>
          </nav>

          {/* HERO */}
          <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '110px 24px 60px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,160,84,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1100, width: '100%', display: 'grid', gridTemplateColumns: '320px 1fr', gap: 64, alignItems: 'center', position: 'relative' }}>

              {/* CIRCULAR PHOTO */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'conic-gradient(from 0deg,#c9a054,#f0d070,#e8c060,#a07030,#c9a054,#f0d070,#c9a054)', filter: 'blur(1.5px)', opacity: 0.8 }} />
                  <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: '#030303' }} />
                  <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '1px solid rgba(201,160,84,0.25)' }} />
                  <div style={{ position: 'relative', width: 270, height: 270, borderRadius: '50%', overflow: 'hidden', margin: 14 }}>
                    <Image src="/faisal-orakzai-hero.jpg" alt="Faisal Orakzai — Pakistani Entrepreneur, Founder of Shamim Forever and Orakzai Bond" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} priority sizes="270px" />
                  </div>
                </div>
                {/* Verified badges */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {[{ l: '✓ Wikidata', u: 'https://www.wikidata.org/wiki/Q140264666' }, { l: '✓ ORCID', u: 'https://orcid.org/0009-0000-0915-7272' }].map(b => (
                    <a key={b.l} href={b.u} target="_blank" rel="noopener noreferrer" style={{ padding: '4px 10px', border: '1px solid rgba(201,160,84,0.4)', color: '#c9a054', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>{b.l}</a>
                  ))}
                </div>
              </div>

              {/* TEXT */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <div>
                  <p style={{ color: '#c9a054', fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 10, marginTop: 0 }}>Founder & Chairman</p>
                  <h1 style={{ fontSize: 68, fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1, margin: 0 }}>Faisal</h1>
                  <h1 style={{ fontSize: 68, fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, margin: 0, color: '#c9a054' }}>Orakzai</h1>
                </div>
                <p style={{ color: '#71717a', fontSize: 15, lineHeight: 1.75, maxWidth: 500, margin: 0 }}>
                  Pakistani entrepreneur born April 30, 2006. Building sovereign digital brands at the intersection of{' '}
                  <strong style={{ color: '#a1a1aa' }}>blockchain architecture</strong>, heritage luxury commerce, and{' '}
                  <strong style={{ color: '#a1a1aa' }}>decentralized finance</strong>.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Blockchain', 'DeFi', 'Luxury Commerce', 'NFT', 'Pakistan'].map(t => (
                    <span key={t} style={{ padding: '4px 12px', border: '1px solid rgba(201,160,84,0.25)', color: '#c9a054', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 32, paddingTop: 20, borderTop: '1px solid #111' }}>
                  {[{ n: '3+', l: 'Ventures' }, { n: '2023', l: 'SF Founded' }, { n: '2026', l: 'OKBOND Launch' }, { n: '67+', l: 'Citations' }].map(s => (
                    <div key={s.l}>
                      <p style={{ color: '#c9a054', fontSize: 20, fontWeight: 300, margin: 0 }}>{s.n}</p>
                      <p style={{ color: '#52525b', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '4px 0 0' }}>{s.l}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <a href="https://www.linkedin.com/in/faisalorakzaii" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 24px', border: '1px solid #c9a054', color: '#c9a054', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>LinkedIn</a>
                  <a href="https://www.shamimforever.com" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 24px', background: '#c9a054', color: '#030303', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600 }}>Shamim Forever</a>
                  <a href="http://orakzaibond.com" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 24px', border: '1px solid #333', color: '#e4e4e7', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>Orakzai Bond</a>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about" style={{ padding: '80px 24px', background: '#060606', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <p style={sLabel}>Biography</p>
              <h2 style={sTitle}>About Faisal Orakzai</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, color: '#71717a', fontSize: 15, lineHeight: 1.8 }}>
                {[
                  'Faisal Orakzai (born April 30, 2006, Pakistan) is a visionary entrepreneur and blockchain architect recognized globally for his work in digital luxury commerce and decentralized finance. As one of Pakistan's youngest founders of a global luxury house, he has redefined what it means to build a world-class brand from an emerging market.',
                  'He founded Shamim Forever in 2023 — a global luxury digital house offering bespoke fragrances, sovereign jewellery, and blockchain-verified couture collections. The brand operates at the intersection of traditional luxury heritage and Web3 technology, pioneering NFT-authenticated luxury assets for a new generation of collectors worldwide.',
                  'Through Orakzai Group and Orakzai Bond (launched 2026), Faisal is building Pakistan's first blockchain-native asset management ecosystem — combining quantitative fintech with decentralized asset tokenization and capital-protected digital bonds. His academic research, indexed on ORCID, bridges theoretical blockchain science with real-world commercial application.',
                  'A member of the GEN Global Entrepreneurship Network and featured in Y Combinator Startup School, Faisal is building institutions designed to last generations, not companies designed to exit.',
                ].map((p, i) => <p key={i} style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: p.replace('Faisal Orakzai', '<strong style="color:#e4e4e7">Faisal Orakzai</strong>').replace('Shamim Forever', '<strong style="color:#e4e4e7">Shamim Forever</strong>').replace('Orakzai Bond', '<strong style="color:#e4e4e7">Orakzai Bond</strong>').replace('Orakzai Group', '<strong style="color:#e4e4e7">Orakzai Group</strong>') }} />)}
              </div>
            </div>
          </section>

          {/* VENTURES */}
          <section id="ventures" style={{ padding: '80px 24px', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <p style={sLabel}>Portfolio</p>
              <h2 style={sTitle}>Ventures & Organizations</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
                {[
                  { name: 'Shamim Forever', role: 'Founder & Chairman', year: '2023', desc: 'Sovereign digital luxury house — bespoke fragrances, high jewellery, blockchain-verified couture. Live at shamimforever.com.', url: 'https://www.shamimforever.com', tags: ['Luxury', 'Blockchain', 'E-Commerce'] },
                  { name: 'Orakzai Group',  role: 'Chairman',           year: '2023', desc: 'Strategic holding company overseeing digital innovation, luxury commerce, and emerging market investments across Pakistan and globally.', url: null, tags: ['Holdings', 'Strategy', 'Investment'] },
                  { name: 'Orakzai Bond',   role: 'Founder & CEO',      year: '2026', desc: 'World's first capital-protected decentralized bond — blockchain-native DeFi platform for quantitative asset management and tokenized instruments.', url: 'http://orakzaibond.com', tags: ['DeFi', 'Fintech', 'Blockchain'] },
                ].map(v => (
                  <div key={v.name} style={{ padding: 28, border: '1px solid #111' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div>
                        <p style={{ color: '#c9a054', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 6px' }}>{v.role}</p>
                        <h3 style={{ color: '#e4e4e7', fontSize: 20, fontWeight: 300, margin: 0 }}>{v.url ? <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{v.name}</a> : v.name}</h3>
                      </div>
                      <span style={{ color: '#3f3f46', fontSize: 12 }}>{v.year}</span>
                    </div>
                    <p style={{ color: '#52525b', fontSize: 13, lineHeight: 1.7, margin: '0 0 16px' }}>{v.desc}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{v.tags.map(t => <span key={t} style={{ padding: '2px 8px', border: '1px solid #1a1a1a', color: '#52525b', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* RECOGNITION */}
          <section style={{ padding: '80px 24px', background: '#060606', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <p style={sLabel}>Recognition</p>
              <h2 style={sTitle}>Awards, Affiliations & Academic Presence</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { org: 'Wikidata',            detail: 'Q140264666 — Publicly verified encyclopedia entry',       url: 'https://www.wikidata.org/wiki/Q140264666' },
                  { org: 'ORCID',               detail: '0009-0000-0915-7272 — Academic researcher identifier',   url: 'https://orcid.org/0009-0000-0915-7272' },
                  { org: 'GEN Global Network',  detail: 'Member — Global Entrepreneurship Network',               url: 'https://www.genglobal.org/user/faisal1' },
                  { org: 'Y Combinator',        detail: 'Startup School Co-Founder Matching Candidate',           url: 'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2' },
                  { org: 'Crunchbase',          detail: 'Verified entrepreneur and startup founder profile',      url: 'https://www.crunchbase.com/person/faisal-orakzai' },
                  { org: 'HackerNoon',          detail: 'Published author on blockchain & fintech',               url: 'https://hackernoon.com/u/faisalorakzai' },
                  { org: 'NUST Pakistan',       detail: '50 Under 50 — Entrepreneurship Award',                   url: null },
                  { org: 'Google Scholar',      detail: '67+ academic citations across blockchain publications',  url: null },
                ].map(r => (
                  <div key={r.org} style={{ display: 'flex', gap: 16, padding: '14px 18px', border: '1px solid #111', alignItems: 'flex-start' }}>
                    <span style={{ color: '#c9a054', fontSize: 13, flexShrink: 0, marginTop: 2 }}>→</span>
                    <div><p style={{ color: '#e4e4e7', fontSize: 13, margin: 0, fontWeight: 500 }}>{r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{r.org}</a> : r.org}</p><p style={{ color: '#52525b', fontSize: 12, margin: '3px 0 0' }}>{r.detail}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONNECT */}
          <section id="connect" style={{ padding: '80px 24px', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <p style={sLabel}>Find Me Online</p>
              <h2 style={sTitle}>Verified Presence Across 24+ Platforms</h2>
              {CATEGORIES.map(cat => {
                const links = SOCIAL.filter(s => s.category === cat)
                return (
                  <div key={cat} style={{ marginBottom: 36 }}>
                    <p style={{ color: '#c9a054', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 14, borderBottom: '1px solid #111', paddingBottom: 8, marginTop: 0 }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {links.map(s => <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ padding: '7px 14px', border: '1px solid #1a1a1a', color: '#71717a', fontSize: 12, letterSpacing: '0.1em', textDecoration: 'none' }}>{s.label}</a>)}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ padding: '36px 24px', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ color: '#c9a054', fontSize: 13, margin: 0 }}>Faisal Orakzai</p>
              <p style={{ color: '#3f3f46', fontSize: 10, margin: '3px 0 0', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Founder & Chairman · Shamim Forever · Orakzai Bond</p>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <Link href="https://www.shamimforever.com" style={{ color: '#52525b', fontSize: 11, textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Shamim Forever</Link>
              <a href="http://orakzaibond.com" target="_blank" rel="noopener noreferrer" style={{ color: '#52525b', fontSize: 11, textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Orakzai Bond</a>
            </div>
          </footer>

        </div>
      </>
    )
  }
  