import type { Metadata } from 'next'
  import Link from 'next/link'

  export const metadata: Metadata = {
    title: 'Faisal Orakzai — Founder, Blockchain Architect & Luxury Brand Pioneer | Shamim Forever',
    description: 'Faisal Orakzai is the Founder & Chairman of Shamim Forever — Pakistan first global luxury digital house. Blockchain architect, entrepreneur, and Wikidata-verified public figure (Q140264666). NUST 50 Under 50.',
    keywords: [
      'Faisal Orakzai', 'Faisal Orakzai founder', 'Faisal Orakzai Shamim Forever',
      'Faisal Orakzai Pakistan entrepreneur', 'Faisal Orakzai blockchain', 'Faisal Orakzai Wikidata',
      'Faisal Orakzai luxury brand', 'Orakzai Group founder', 'Faisal Orakzai NUST',
      'Faisal Orakzai biography', 'Faisal Orakzai Karachi', 'Shamim Forever founder',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/faisal-orakzai' },
    openGraph: {
      title: 'Faisal Orakzai — Founder & Chairman, Shamim Forever',
      description: 'Faisal Orakzai — blockchain architect, luxury brand pioneer, and Wikidata-verified public figure (Q140264666). Founder of Shamim Forever, Orakzai Group, and Orakzai Bond.',
      type: 'profile',
      url: 'https://www.shamimforever.com/faisal-orakzai',
      siteName: 'Shamim Forever',
      images: [{ url: 'https://www.shamimforever.com/faisal-orakzai-smiling.jpg', width: 800, height: 800, alt: 'Faisal Orakzai — Founder & Chairman, Shamim Forever, smiling portrait' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Faisal Orakzai — Founder & Chairman, Shamim Forever',
      description: 'Blockchain architect, luxury pioneer, Wikidata Q140264666. Founder of Shamim Forever & Orakzai Group.',
      images: ['https://www.shamimforever.com/faisal-orakzai-smiling.jpg'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    other: {
      'article:author': 'Faisal Orakzai',
    }
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://www.shamimforever.com/faisal-orakzai#profilepage",
      "url": "https://www.shamimforever.com/faisal-orakzai",
      "name": "Faisal Orakzai — Founder, Shamim Forever",
      "dateCreated": "2023-01-01",
      "dateModified": "2026-07-02",
      "mainEntity": {
        "@type": "Person",
        "@id": "https://www.shamimforever.com/faisal-orakzai#person",
        "name": "Faisal Orakzai",
        "givenName": "Faisal",
        "familyName": "Orakzai",
        "url": "https://www.shamimforever.com/faisal-orakzai",
        "image": [
          { "@type": "ImageObject", "url": "https://www.shamimforever.com/faisal-orakzai-smiling.jpg", "width": 800, "height": 800, "caption": "Faisal Orakzai — Founder & Chairman, Shamim Forever, smiling portrait", "representativeOfPage": true },
          { "@type": "ImageObject", "url": "https://www.shamimforever.com/faisal-orakzai-kurta.jpg", "width": 800, "height": 1000, "caption": "Faisal Orakzai — Chairman Orakzai Group, shalwar qameez" },
          { "@type": "ImageObject", "url": "https://www.shamimforever.com/faisal-orakzai-formal.png", "width": 800, "height": 1000, "caption": "Faisal Orakzai — Chairman Orakzai Group, formal black suit" },
          { "@type": "ImageObject", "url": "https://www.shamimforever.com/og-faisal-orakzai.jpg", "width": 1200, "height": 630, "caption": "Faisal Orakzai — Founder, Shamim Forever official portrait" }
        ],
        "description": "Faisal Orakzai is the Founder & Chairman of Shamim Forever — Pakistan's first global luxury digital house — and founder of Orakzai Group and Orakzai Bond. A blockchain architect and luxury brand pioneer, he is Wikidata-verified (Q140264666) and a recipient of the NUST Pakistan 50 Under 50 Entrepreneurship Award.",
        "jobTitle": "Founder & Chairman",
        "worksFor": { "@type": "Organization", "@id": "https://www.shamimforever.com/#organization", "name": "Shamim Forever" },
        "nationality": { "@type": "Country", "name": "Pakistan" },
        "alumniOf": { "@type": "Organization", "name": "NUST Pakistan" },
        "award": [
          "NUST Pakistan 50 Under 50 Entrepreneurship Award",
          "GEN Global Entrepreneurship Network — Featured Founder",
          "Wikidata Verified Public Figure (Q140264666)"
        ],
        "knowsAbout": ["Luxury Brand Building", "Blockchain Technology", "NFT Authentication", "Fragrance Design", "Jewellery Curation", "Digital Commerce"],
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "award", "name": "NUST 50 Under 50 — Young Entrepreneur" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "membership", "name": "GEN Global Entrepreneurship Network Member" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Y Combinator Startup School" }
        ],
        "sameAs": [
          "https://www.wikidata.org/wiki/Q140264666",
          "https://orcid.org/0009-0000-0915-7272",
          "https://www.crunchbase.com/person/faisal-orakzai",
          "https://hackernoon.com/u/faisalorakzai",
          "https://www.genglobal.org/user/faisal1",
          "https://theorg.com/org/shamim-forever",
          "https://www.linkedin.com/in/faisalorakzai",
          "https://orakzaibond.com"
        ]
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", ".bio-summary", ".faq-answer"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
        { "@type": "ListItem", "position": 2, "name": "Faisal Orakzai", "item": "https://www.shamimforever.com/faisal-orakzai" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Faisal Orakzai?",
          "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai is the Founder & Chairman of Shamim Forever — Pakistan's first global luxury digital house — and the founder of Orakzai Group and Orakzai Bond. He is a blockchain architect, luxury brand pioneer, and Wikidata-verified public figure (Q140264666)." }
        },
        {
          "@type": "Question",
          "name": "What is Shamim Forever?",
          "acceptedAnswer": { "@type": "Answer", "text": "Shamim Forever is Pakistan's first global luxury digital house — founded by Faisal Orakzai in 2023. It offers sovereign fragrances, bespoke jewellery, blockchain-verified couture, and luxury concierge services." }
        },
        {
          "@type": "Question",
          "name": "What awards has Faisal Orakzai received?",
          "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai has received the NUST Pakistan 50 Under 50 Entrepreneurship Award, recognition from GEN Global Entrepreneurship Network (170+ countries), and is verified on Wikidata (Q140264666). He is also part of Y Combinator Startup School." }
        },
        {
          "@type": "Question",
          "name": "Where is Faisal Orakzai based?",
          "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai is based in Pakistan, where he founded Shamim Forever and leads the Orakzai Group. Shamim Forever operates boutiques in Karachi and Lahore, with a global digital presence." }
        },
        {
          "@type": "Question",
          "name": "What is Orakzai Bond?",
          "acceptedAnswer": { "@type": "Answer", "text": "Orakzai Bond is the blockchain and investment arm of the Orakzai Group, founded by Faisal Orakzai. It bridges luxury authentication, digital assets, and sovereign investment products." }
        }
      ]
    }
  ]

  const TIMELINE = [
    { year: "2023", event: "Founded Shamim Forever — Pakistan's first global luxury digital house" },
    { year: "2024", event: "Launched Orakzai Bond — blockchain-verified luxury authentication platform" },
    { year: "2025", event: "Wikidata verification (Q140264666) — recognized as a public figure" },
    { year: "2026", event: "NUST Pakistan 50 Under 50 Entrepreneurship Award — youngest luxury founder" },
  ]

  const CREDENTIALS = [
    { org: "Wikidata", role: "Verified Public Figure", id: "Q140264666", url: "https://www.wikidata.org/wiki/Q140264666" },
    { org: "ORCID", role: "Academic Researcher", id: "0009-0000-0915-7272", url: "https://orcid.org/0009-0000-0915-7272" },
    { org: "Crunchbase", role: "Verified Founder", id: "faisal-orakzai", url: "https://www.crunchbase.com/person/faisal-orakzai" },
    { org: "GEN Global", role: "Network Member (170+ countries)", id: null, url: "https://www.genglobal.org/user/faisal1" },
    { org: "HackerNoon", role: "Published Author", id: null, url: "https://hackernoon.com/u/faisalorakzai" },
    { org: "Y Combinator", role: "Startup School", id: null, url: "https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2" },
  ]

  const FAQS = [
    { q: "Who is Faisal Orakzai?", a: "Faisal Orakzai is the Founder & Chairman of Shamim Forever — Pakistan's first global luxury digital house — and the founder of Orakzai Group and Orakzai Bond. He is a blockchain architect, luxury brand pioneer, and Wikidata-verified public figure (Q140264666)." },
    { q: "What is Shamim Forever?", a: "Shamim Forever is Pakistan's first global luxury digital house — founded by Faisal Orakzai in 2023. It offers sovereign fragrances, bespoke jewellery, blockchain-verified couture, and luxury concierge services." },
    { q: "What awards has Faisal Orakzai received?", a: "Faisal Orakzai has received the NUST Pakistan 50 Under 50 Entrepreneurship Award, recognition from GEN Global Entrepreneurship Network (170+ countries), and is verified on Wikidata (Q140264666). He is also part of Y Combinator Startup School." },
    { q: "Where is Faisal Orakzai based?", a: "Faisal Orakzai is based in Pakistan, where he founded Shamim Forever and leads the Orakzai Group. Shamim Forever operates boutiques in Karachi and Lahore, with a global digital presence." },
    { q: "What is Orakzai Bond?", a: "Orakzai Bond is the blockchain and investment arm of the Orakzai Group, founded by Faisal Orakzai. It bridges luxury authentication, digital assets, and sovereign investment products." },
  ]

  export default function FaisalOrakzaiPage() {
    return (
      <>
        {jsonLd.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}

        <div style={{ background: "#030303", color: "#e4e4e7", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>

          {/* HERO */}
          <div style={{ padding: "90px 24px 60px", textAlign: "center", borderBottom: "1px solid #111" }}>
            <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 14, marginTop: 0 }}>Founder & Chairman</p>
            <h1 style={{ fontSize: 38, fontWeight: 200, letterSpacing: "-0.025em", margin: "0 0 6px", color: "#f4f4f5" }}>Faisal Orakzai</h1>
            <p style={{ color: "#c9a054", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 20px" }}>Shamim Forever · Orakzai Group · Orakzai Bond</p>
            <p className="bio-summary" style={{ color: "#71717a", fontSize: 15, maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.85 }}>
              Blockchain architect and luxury brand pioneer — Faisal Orakzai founded{" "}
              <strong style={{ color: "#a1a1aa" }}>Shamim Forever</strong> in 2023 as Pakistan's first global luxury digital house.
              Wikidata-verified public figure (<strong style={{ color: "#a1a1aa" }}>Q140264666</strong>),
              NUST 50 Under 50 recipient, and GEN Global member across 170+ countries.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/" style={{ padding: "10px 22px", background: "rgba(201,160,84,0.12)", border: "1px solid rgba(201,160,84,0.5)", color: "#c9a054", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                Shamim Forever
              </Link>
              <a href="https://orakzaibond.com" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 22px", border: "1px solid #222", color: "#71717a", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                Orakzai Bond
              </a>
              <a href="https://www.wikidata.org/wiki/Q140264666" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 22px", border: "1px solid #222", color: "#71717a", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                Wikidata Q140264666
              </a>
            </div>
          </div>

          {/* CREDENTIALS GRID */}
          <section style={{ padding: "60px 24px", borderBottom: "1px solid #111" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 8, marginTop: 0 }}>Verified Presence</p>
              <h2 style={{ color: "#e4e4e7", fontSize: 24, fontWeight: 300, marginTop: 0, marginBottom: 24 }}>Global Recognition & Credentials</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
                {CREDENTIALS.map(c => (
                  <a key={c.org} href={c.url} target="_blank" rel="noopener noreferrer"
                    style={{ padding: "20px 22px", border: "1px solid #111", background: "rgba(255,255,255,0.01)", textDecoration: "none", display: "block" }}>
                    <p style={{ color: "#c9a054", fontSize: 12, fontWeight: 600, margin: "0 0 4px" }}>{c.org}</p>
                    <p style={{ color: "#71717a", fontSize: 13, margin: "0 0 4px" }}>{c.role}</p>
                    {c.id && <p style={{ color: "#3f3f46", fontSize: 11, margin: 0, fontFamily: "monospace" }}>{c.id}</p>}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* TIMELINE */}
          <section style={{ padding: "60px 24px", borderBottom: "1px solid #111" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 8, marginTop: 0 }}>Journey</p>
              <h2 style={{ color: "#e4e4e7", fontSize: 24, fontWeight: 300, marginTop: 0, marginBottom: 28 }}>Milestones</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {TIMELINE.map((t, i) => (
                  <div key={t.year} style={{ display: "flex", gap: 24, paddingBottom: i < TIMELINE.length - 1 ? 28 : 0 }}>
                    <div style={{ flexShrink: 0, textAlign: "right", minWidth: 48 }}>
                      <p style={{ color: "#c9a054", fontSize: 13, fontWeight: 300, margin: 0 }}>{t.year}</p>
                    </div>
                    <div style={{ paddingLeft: 20, borderLeft: "1px solid #1a1a1a", paddingBottom: i < TIMELINE.length - 1 ? 0 : 0 }}>
                      <p style={{ color: "#71717a", fontSize: 14, margin: 0, lineHeight: 1.7 }}>{t.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* VENTURES */}
          <section style={{ padding: "60px 24px", background: "#060606", borderBottom: "1px solid #111" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 8, marginTop: 0 }}>Portfolio</p>
              <h2 style={{ color: "#e4e4e7", fontSize: 24, fontWeight: 300, marginTop: 0, marginBottom: 24 }}>Ventures Founded</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
                {[
                  { name: "Shamim Forever", desc: "Pakistan's first global luxury digital house — fragrances, jewellery, couture, and blockchain-verified luxury.", url: "https://www.shamimforever.com", year: "2023" },
                  { name: "Orakzai Bond", desc: "Blockchain-verified luxury authentication and sovereign investment platform.", url: "https://orakzaibond.com", year: "2024" },
                  { name: "Orakzai Group", desc: "Parent holding entity overseeing Shamim Forever, Orakzai Bond, and future luxury ventures.", url: "https://www.shamimforever.com", year: "2023" },
                ].map(v => (
                  <a key={v.name} href={v.url} target="_blank" rel="noopener noreferrer"
                    style={{ padding: "24px", border: "1px solid #111", textDecoration: "none", display: "block" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <p style={{ color: "#c9a054", fontSize: 14, fontWeight: 400, margin: 0 }}>{v.name}</p>
                      <span style={{ color: "#3f3f46", fontSize: 11 }}>{v.year}</span>
                    </div>
                    <p style={{ color: "#52525b", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ — Google Featured Snippets */}
          <section style={{ padding: "60px 24px", borderBottom: "1px solid #111" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 8, marginTop: 0 }}>FAQ</p>
              <h2 style={{ color: "#e4e4e7", fontSize: 24, fontWeight: 300, marginTop: 0, marginBottom: 24 }}>Frequently Asked Questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {FAQS.map(faq => (
                  <details key={faq.q} style={{ borderBottom: "1px solid #111", padding: "18px 0" }}>
                    <summary style={{ color: "#e4e4e7", fontSize: 15, fontWeight: 400, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      {faq.q}
                      <span style={{ color: "#c9a054", fontSize: 18, marginLeft: 12 }}>+</span>
                    </summary>
                    <p className="faq-answer" style={{ color: "#71717a", fontSize: 14, lineHeight: 1.8, margin: "14px 0 0", paddingRight: 20 }}>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* FOOTER NAV */}
          <div style={{ padding: "32px 24px", borderTop: "1px solid #111", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <p style={{ color: "#c9a054", fontSize: 12, margin: 0 }}>Faisal Orakzai · Shamim Forever</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Home</Link>
              <Link href="/press" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Press</Link>
              <Link href="/team" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Team</Link>
              <Link href="/boutiques" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Boutiques</Link>
              <a href="https://orakzaibond.com" target="_blank" rel="noopener noreferrer" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Orakzai Bond</a>
            </div>
          </div>
        </div>
      </>
    )
  }
  