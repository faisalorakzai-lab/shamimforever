import type { Metadata } from 'next'
  import Image from 'next/image'
  import Link from 'next/link'

  export const metadata: Metadata = {
    title: 'Faisal Orakzai — Founder, Blockchain Architect & Luxury Brand Pioneer',
    description: 'Faisal Orakzai is a Pakistani entrepreneur born April 30, 2006. Founder of Shamim Forever, Orakzai Bond & Orakzai Group. Blockchain architect, DeFi builder, luxury commerce innovator.',
    keywords: ['Faisal Orakzai', 'Faisal Orakzai Pakistan', 'Chairman Faisal Orakzai', 'faisalorakzaii', 'Orakzai Bond founder', 'Shamim Forever founder', 'Pakistani blockchain entrepreneur', 'DeFi Pakistan'],
    authors: [{ name: 'Faisal Orakzai', url: 'https://www.shamimforever.com/faisal-orakzai' }],
    creator: 'Faisal Orakzai',
    alternates: { canonical: 'https://www.shamimforever.com/faisal-orakzai' },
    openGraph: {
      title: 'Faisal Orakzai — Founder & Blockchain Architect',
      description: 'Pakistani entrepreneur. Founder of Shamim Forever, Orakzai Bond & Orakzai Group. Blockchain architect, luxury commerce innovator, DeFi builder.',
      type: 'profile',
      url: 'https://www.shamimforever.com/faisal-orakzai',
      siteName: 'Faisal Orakzai — Official',
      images: [{ url: 'https://www.shamimforever.com/faisal-orakzai-hero.jpg', width: 1080, height: 1080, alt: 'Faisal Orakzai' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Faisal Orakzai — Founder & Blockchain Architect',
      description: "Founder of Shamim Forever, Orakzai Bond & Orakzai Group. Building Pakistan's global brands.",
      images: ['https://www.shamimforever.com/faisal-orakzai-hero.jpg'],
      creator: '@faisalorakzaii',
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://www.shamimforever.com/faisal-orakzai#person',
        name: 'Faisal Orakzai',
        givenName: 'Faisal',
        familyName: 'Orakzai',
        additionalName: 'Moeen',
        alternateName: ['Chairman Faisal Orakzai', 'Malak Faisal Orakzai', 'faisalorakzaii'],
        description: 'Pakistani entrepreneur and blockchain architect. Founder of Shamim Forever, Orakzai Bond & Orakzai Group. Born April 30, 2006 in Pakistan.',
        url: 'https://www.shamimforever.com/faisal-orakzai',
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.shamimforever.com/faisal-orakzai' },
        image: {
          '@type': 'ImageObject',
          url: 'https://www.shamimforever.com/faisal-orakzai-hero.jpg',
          width: 1080,
          height: 1080,
          caption: 'Faisal Orakzai — Founder & Chairman, Shamim Forever',
        },
        birthDate: '2006-04-30',
        birthPlace: { '@type': 'Place', name: 'Pakistan', addressCountry: 'PK' },
        nationality: { '@type': 'Country', name: 'Pakistan' },
        gender: 'Male',
        jobTitle: ['Founder & Chairman', 'CEO', 'Entrepreneur', 'Blockchain Architect'],
        worksFor: [
          { '@type': 'Organization', name: 'Shamim Forever', url: 'https://www.shamimforever.com', foundingDate: '2023' },
          { '@type': 'Organization', name: 'Orakzai Group' },
          { '@type': 'Organization', name: 'Orakzai Bond', url: 'https://orakzaibond.com', foundingDate: '2026' },
        ],
        knowsAbout: ['Blockchain Architecture', 'Decentralized Finance', 'Luxury Commerce', 'NFT Technology', 'Tokenomics', 'Smart Contracts', 'Brand Building'],
        identifier: [
          { '@type': 'PropertyValue', propertyID: 'ORCID', value: '0009-0000-0915-7272', url: 'https://orcid.org/0009-0000-0915-7272' },
          { '@type': 'PropertyValue', propertyID: 'Wikidata', value: 'Q140264666', url: 'https://www.wikidata.org/wiki/Q140264666' },
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
          'https://www.genglobal.org/user/faisal1',
          'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2',
          'https://leetcode.com/u/faisalorakzai/',
          'https://orakzaibond.com/faisal-orakzai',
          'https://www.shamimforever.com/founder',
          'https://www.shamimforever.com',
        ],
      },
    ],
  }

  export default function FaisalOrakzaiPage() {
    return (
      <>
        {/* Official Next.js JSON-LD pattern (uses native <script>, not next/script) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div style={{ background: '#030303', color: '#e4e4e7', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', overflowX: 'hidden' }}>

          {/* ── NAV ── */}
          <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(3,3,3,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #111' }}>
            <Link href="/" style={{ color: '#c9a054', fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Shamim Forever
            </Link>
            <div style={{ display: 'flex', gap: 24 }}>
              {(['About', 'Ventures', 'Connect'] as const).map(label => (
                <a key={label} href={'#' + label.toLowerCase()} style={{ color: '#52525b', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>{label}</a>
              ))}
            </div>
          </nav>

          {/* ── HERO ── */}
          <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '110px 24px 60px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,160,84,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1100, width: '100%', position: 'relative' }}>
              {/* Mobile: stack, Desktop: side by side */}
              <style dangerouslySetInnerHTML={{ __html: `
                .fo-grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; text-align: center; }
                .fo-portrait { margin: 0 auto; }
                .fo-pills, .fo-stats, .fo-ctas { justify-content: center; }
                .fo-h1 { font-size: 52px; }
                @media (min-width: 768px) {
                  .fo-grid { grid-template-columns: 290px 1fr; text-align: left; gap: 60px; }
                  .fo-portrait { margin: 0; }
                  .fo-pills, .fo-stats, .fo-ctas { justify-content: flex-start; }
                  .fo-h1 { font-size: 68px; }
                }
              `}} />

              <div className="fo-grid">

                {/* PORTRAIT */}
                <div className="fo-portrait" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', background: 'conic-gradient(from 0deg,#c9a054,#f0d070,#e8c060,#a07030,#c9a054,#f0d070,#c9a054)', filter: 'blur(1.5px)', opacity: 0.85 }} />
                    <div style={{ position: 'absolute', inset: 4, borderRadius: '50%', background: '#030303' }} />
                    <div style={{ position: 'absolute', inset: 12, borderRadius: '50%', border: '1px solid rgba(201,160,84,0.2)' }} />
                    <div style={{ position: 'relative', width: 250, height: 250, borderRadius: '50%', overflow: 'hidden', margin: 14 }}>
                      <Image
                        src="/faisal-orakzai-hero.jpg"
                        alt="Faisal Orakzai — Pakistani Entrepreneur, Founder of Shamim Forever and Orakzai Bond"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top center' }}
                        priority
                        sizes="250px"
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[['✓ Wikidata', 'https://www.wikidata.org/wiki/Q140264666'], ['✓ ORCID', 'https://orcid.org/0009-0000-0915-7272']].map(([l, u]) => (
                      <a key={l} href={u} target="_blank" rel="noopener noreferrer" style={{ padding: '4px 10px', border: '1px solid rgba(201,160,84,0.4)', color: '#c9a054', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>{l}</a>
                    ))}
                  </div>
                </div>

                {/* TEXT */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <p style={{ color: '#c9a054', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 8, marginTop: 0 }}>Founder & Chairman</p>
                    <h1 className="fo-h1" style={{ fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0 }}>Faisal</h1>
                    <h1 className="fo-h1" style={{ fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0, color: '#c9a054' }}>Orakzai</h1>
                  </div>
                  <p style={{ color: '#71717a', fontSize: 15, lineHeight: 1.8, maxWidth: 500, margin: 0 }}>
                    Pakistani entrepreneur born April 30, 2006. Building sovereign digital brands at the intersection of{' '}
                    <strong style={{ color: '#a1a1aa' }}>blockchain architecture</strong>,{' '}
                    <strong style={{ color: '#a1a1aa' }}>heritage luxury commerce</strong>, and{' '}
                    <strong style={{ color: '#a1a1aa' }}>decentralized finance</strong>.
                  </p>
                  <div className="fo-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['Blockchain', 'DeFi', 'Luxury', 'NFT', 'Pakistan'].map(t => (
                      <span key={t} style={{ padding: '4px 12px', border: '1px solid rgba(201,160,84,0.25)', color: '#c9a054', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t}</span>
                    ))}
                  </div>
                  <div className="fo-stats" style={{ display: 'flex', gap: 32, paddingTop: 18, borderTop: '1px solid #111', flexWrap: 'wrap' }}>
                    {[{ n: '3+', l: 'Ventures' }, { n: '2023', l: 'SF Founded' }, { n: '2026', l: 'OKBOND Launch' }, { n: '67+', l: 'Citations' }].map(s => (
                      <div key={s.l}>
                        <p style={{ color: '#c9a054', fontSize: 20, fontWeight: 300, margin: 0 }}>{s.n}</p>
                        <p style={{ color: '#52525b', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '4px 0 0' }}>{s.l}</p>
                      </div>
                    ))}
                  </div>
                  <div className="fo-ctas" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <a href="https://www.linkedin.com/in/faisalorakzaii" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 22px', border: '1px solid rgba(201,160,84,0.6)', color: '#c9a054', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>LinkedIn</a>
                    <a href="https://orakzaibond.com" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 22px', background: '#c9a054', color: '#030303', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600 }}>Orakzai Bond</a>
                    <Link href="/founder" style={{ padding: '10px 22px', border: '1px solid #222', color: '#71717a', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>Founder Page</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── ABOUT ── */}
          <section id="about" style={{ padding: '80px 24px', background: '#060606', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <p style={{ color: '#c9a054', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 10, marginTop: 0 }}>Biography</p>
              <h2 style={{ color: '#e4e4e7', fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em', marginTop: 0, marginBottom: 32 }}>About Faisal Orakzai</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, color: '#71717a', fontSize: 14, lineHeight: 1.9 }}>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: '#e4e4e7' }}>Faisal Orakzai</strong> (born April 30, 2006, Pakistan) is a visionary entrepreneur and blockchain architect recognized globally for his work in digital luxury commerce and decentralized finance. As one of Pakistan&apos;s youngest global founders, he has redefined what it means to build a world-class brand from an emerging market.
                </p>
                <p style={{ margin: 0 }}>
                  He founded <strong style={{ color: '#e4e4e7' }}>Shamim Forever</strong> in 2023 — a global luxury digital house offering bespoke fragrances, sovereign jewellery, and blockchain-verified couture. The brand pioneers NFT-authenticated luxury assets for a new generation of collectors worldwide.
                </p>
                <p style={{ margin: 0 }}>
                  Through <strong style={{ color: '#e4e4e7' }}>Orakzai Group</strong> and <strong style={{ color: '#e4e4e7' }}>Orakzai Bond</strong> (launched 2026), Faisal is building the world&apos;s first capital-protected decentralized bond — combining quantitative fintech with blockchain-native asset management. His academic research, indexed on ORCID (67+ citations), bridges theoretical blockchain science with large-scale commercial implementation.
                </p>
                <p style={{ margin: 0 }}>
                  Member of the <strong style={{ color: '#e4e4e7' }}>GEN Global Entrepreneurship Network</strong>, featured in <strong style={{ color: '#e4e4e7' }}>Y Combinator Startup School</strong>, and recognized by NUST Pakistan&apos;s 50 Under 50 programme. Building institutions designed to outlast their founder.
                </p>
              </div>
            </div>
          </section>

          {/* ── VENTURES ── */}
          <section id="ventures" style={{ padding: '80px 24px', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <p style={{ color: '#c9a054', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 10, marginTop: 0 }}>Portfolio</p>
              <h2 style={{ color: '#e4e4e7', fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em', marginTop: 0, marginBottom: 32 }}>Ventures & Organizations</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
                {[
                  { name: 'Shamim Forever', role: 'Founder & Chairman', year: '2023', desc: 'Sovereign digital luxury house — bespoke fragrances, high jewellery, couture cosmetics, and blockchain-verified collections.', url: 'https://www.shamimforever.com', tags: ['Luxury', 'Blockchain', 'E-Commerce'] },
                  { name: 'Orakzai Group',  role: 'Chairman',           year: '2023', desc: 'Strategic holding company overseeing digital innovation ventures, luxury commerce, and emerging market investments globally.', url: null, tags: ['Holdings', 'Strategy', 'Investment'] },
                  { name: 'Orakzai Bond',   role: 'Founder & CEO',      year: '2026', desc: "World's first capital-protected decentralized bond on Polygon. Blockchain-native DeFi for quantitative asset management.", url: 'https://orakzaibond.com', tags: ['DeFi', 'Fintech', 'Blockchain'] },
                ].map(v => (
                  <div key={v.name} style={{ padding: 24, border: '1px solid #111', background: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                      <div>
                        <p style={{ color: '#c9a054', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 5px' }}>{v.role}</p>
                        <h3 style={{ color: '#e4e4e7', fontSize: 17, fontWeight: 300, margin: 0 }}>
                          {v.url
                            ? <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{v.name}</a>
                            : v.name}
                        </h3>
                      </div>
                      <span style={{ color: '#3f3f46', fontSize: 12 }}>{v.year}</span>
                    </div>
                    <p style={{ color: '#52525b', fontSize: 13, lineHeight: 1.7, margin: '0 0 14px' }}>{v.desc}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {v.tags.map(t => <span key={t} style={{ padding: '2px 8px', border: '1px solid #1a1a1a', color: '#52525b', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── RECOGNITION ── */}
          <section style={{ padding: '80px 24px', background: '#060606', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <p style={{ color: '#c9a054', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 10, marginTop: 0 }}>Recognition</p>
              <h2 style={{ color: '#e4e4e7', fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em', marginTop: 0, marginBottom: 32 }}>Awards & Affiliations</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { org: 'Wikidata',           detail: 'Q140264666 — Publicly verified encyclopedia entry',      url: 'https://www.wikidata.org/wiki/Q140264666' },
                  { org: 'ORCID',              detail: '0009-0000-0915-7272 — Academic researcher identifier',  url: 'https://orcid.org/0009-0000-0915-7272' },
                  { org: 'GEN Global Network', detail: 'Member — Global Entrepreneurship Network',              url: 'https://www.genglobal.org/user/faisal1' },
                  { org: 'Y Combinator',       detail: 'Startup School Co-Founder Matching Candidate',          url: 'https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2' },
                  { org: 'Crunchbase',         detail: 'Verified entrepreneur & startup founder profile',       url: 'https://www.crunchbase.com/person/faisal-orakzai' },
                  { org: 'HackerNoon',         detail: 'Published author on blockchain & DeFi',                 url: 'https://hackernoon.com/u/faisalorakzai' },
                  { org: 'NUST Pakistan',      detail: '50 Under 50 — Entrepreneurship Award',                  url: null },
                  { org: 'Google Scholar',     detail: '67+ academic citations across blockchain publications', url: null },
                ].map(r => (
                  <div key={r.org} style={{ display: 'flex', gap: 14, padding: '14px 18px', border: '1px solid #111', alignItems: 'flex-start' }}>
                    <span style={{ color: '#c9a054', fontSize: 12, flexShrink: 0, marginTop: 2 }}>→</span>
                    <div>
                      <p style={{ color: '#e4e4e7', fontSize: 13, margin: 0, fontWeight: 500 }}>
                        {r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{r.org}</a> : r.org}
                      </p>
                      <p style={{ color: '#52525b', fontSize: 12, margin: '3px 0 0' }}>{r.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CONNECT ── */}
          <section id="connect" style={{ padding: '80px 24px', borderTop: '1px solid #111' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <p style={{ color: '#c9a054', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 10, marginTop: 0 }}>Find Me Online</p>
              <h2 style={{ color: '#e4e4e7', fontSize: 28, fontWeight: 300, letterSpacing: '-0.01em', marginTop: 0, marginBottom: 32 }}>Verified Presence — 24+ Platforms</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[
                  ['LinkedIn',      'https://www.linkedin.com/in/faisalorakzaii'],
                  ['X / Twitter',   'https://x.com/faisalorakzaii'],
                  ['Instagram',     'https://www.instagram.com/faisalorakzaii'],
                  ['TikTok',        'https://tiktok.com/@chairmanorakzai'],
                  ['Facebook',      'https://web.facebook.com/faisalorakzaii'],
                  ['Pinterest',     'https://www.pinterest.com/faisalorakzaii'],
                  ['GitHub',        'https://github.com/faisalorakzai-lab'],
                  ['LeetCode',      'https://leetcode.com/u/faisalorakzai/'],
                  ['Crunchbase',    'https://www.crunchbase.com/person/faisal-orakzai'],
                  ['Peerlist',      'https://peerlist.io/faisalorakzai'],
                  ['HackerNoon',    'https://hackernoon.com/u/faisalorakzai'],
                  ['F6S',           'https://www.f6s.com/faisalorakzai'],
                  ['The Org',       'https://theorg.com/org/orakzai-bond?person=faisal-orakzai'],
                  ['GEN Global',    'https://www.genglobal.org/user/faisal1'],
                  ['ORCID',         'https://orcid.org/0009-0000-0915-7272'],
                  ['Wikidata',      'https://www.wikidata.org/wiki/Q140264666'],
                  ['Linktree',      'https://linktr.ee/faisalorakzaiofficial'],
                  ['Orakzai Bond',  'https://orakzaibond.com'],
                ].map(([label, url]) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '8px 15px', border: '1px solid #1a1a1a', color: '#71717a', fontSize: 12, letterSpacing: '0.1em', textDecoration: 'none' }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer style={{ padding: '32px 24px', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
            <div>
              <p style={{ color: '#c9a054', fontSize: 13, margin: 0 }}>Faisal Orakzai</p>
              <p style={{ color: '#3f3f46', fontSize: 10, margin: '3px 0 0', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Founder · Shamim Forever · Orakzai Bond</p>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <Link href="/" style={{ color: '#52525b', fontSize: 10, textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Shamim Forever</Link>
              <a href="https://orakzaibond.com" target="_blank" rel="noopener noreferrer" style={{ color: '#52525b', fontSize: 10, textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Orakzai Bond</a>
            </div>
          </footer>

        </div>
      </>
    )
  }
  