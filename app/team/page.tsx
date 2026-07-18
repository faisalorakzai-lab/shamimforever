import type { Metadata } from 'next'
  import Link from 'next/link'

  export const metadata: Metadata = {
    title: 'Shamim Forever — Team & Leadership | Faisal Orakzai Founder Chairman',
    description: 'Meet the leadership and creative team behind Shamim Forever — founded by Faisal Orakzai, spanning creative, digital, brand, and client experience divisions.',
    keywords: [
      'Shamim Forever team', 'Shamim Forever leadership', 'Faisal Orakzai founder chairman',
      'luxury brand team Pakistan', 'Orakzai Group team', 'sovereign luxury leadership',
      'shamim forever management', 'Shamim Forever org chart', 'blockchain luxury team Pakistan',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/team' },
    openGraph: {
      title: 'Shamim Forever Team & Leadership | Faisal Orakzai',
      description: 'Meet the leadership and creative team behind Shamim Forever — founded by Faisal Orakzai, spanning creative, digital, brand, and client experience divisions.',
      type: 'website',
      url: 'https://www.shamimforever.com/team',
      siteName: 'Shamim Forever',
      images: [{ url: 'https://www.shamimforever.com/og-team.jpg', width: 1200, height: 630, alt: 'Shamim Forever Team & Leadership' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shamim Forever Team & Leadership',
      description: 'Founded by Faisal Orakzai — creative, digital, brand, and client experience.',
      images: ['https://www.shamimforever.com/og-team.jpg'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
          { "@type": "ListItem", "position": 2, "name": "Team", "item": "https://www.shamimforever.com/team" }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.shamimforever.com/#organization",
        "name": "Shamim Forever",
        "legalName": "Shamim Forever — Sovereign Luxury Digital House",
        "url": "https://www.shamimforever.com",
        "logo": "https://www.shamimforever.com/logo.png",
        "foundingDate": "2023",
        "description": "Global luxury digital house — bespoke fragrances, sovereign jewellery, and blockchain-verified couture. Founded by Faisal Orakzai, Pakistan, 2023.",
        "founder": {
          "@type": "Person",
          "@id": "https://www.shamimforever.com/faisal-orakzai#person",
          "name": "Faisal Orakzai",
          "jobTitle": "Founder & Chairman"
        },
        "employee": [
          { "@type": "Person", "name": "Faisal Orakzai",       "jobTitle": "Founder & Chairman" },
          { "@type": "Person", "name": "Creative Director",    "jobTitle": "Creative Director" },
          { "@type": "Person", "name": "Fragrance Director",   "jobTitle": "Master Perfumer & Fragrance Director" },
          { "@type": "Person", "name": "Digital Director",     "jobTitle": "Digital Commerce Director" },
          { "@type": "Person", "name": "Web3 Lead",            "jobTitle": "Blockchain & NFT Lead" },
          { "@type": "Person", "name": "Brand Director",       "jobTitle": "Global Brand Director" },
          { "@type": "Person", "name": "Client Director",      "jobTitle": "Head of Client Experience" },
          { "@type": "Person", "name": "Concierge Director",   "jobTitle": "Head of Luxury Concierge" }
        ],
        "award": [
          "NUST Pakistan 50 Under 50 Entrepreneurship Award (Founder)",
          "GEN Global Entrepreneurship Network — Featured Luxury Brand",
          "Wikidata Verified Brand Q140588912 (Founder)"
        ],
        "sameAs": [
          "https://www.instagram.com/shamimforeverofficial",
          "https://www.linkedin.com/company/shamim-forever",
          "https://www.crunchbase.com/organization/shamim-forever",
          "https://theorg.com/org/shamim-forever",
          "https://www.wikidata.org/wiki/Q140588912",
          "https://orakzaibond.com"
        ]
      }
    ]
  }

  const DEPT_DATA = [
    {
      title: "Creative Studio",
      lead: "Creative Director",
      desc: "Governs the visual language, couture direction, and aesthetic identity of all Shamim Forever collections.",
      roles: ["Master Perfumer & Fragrance Director", "Couture & Textile Director", "Art Director", "Visual Design Lead"],
    },
    {
      title: "Digital Commerce",
      lead: "Digital Commerce Director",
      desc: "Oversees the global e-commerce platform, blockchain-verified product authentication, and Web3 innovation.",
      roles: ["Blockchain & NFT Lead", "E-Commerce Manager", "UX Director", "Tech Infrastructure Lead"],
    },
    {
      title: "Brand & Marketing",
      lead: "Global Brand Director",
      desc: "Manages global brand positioning, PR, influencer relationships, and multi-market marketing strategy.",
      roles: ["PR & Media Director", "Social Media Lead", "Content Director", "Influencer Relations"],
    },
    {
      title: "Client Experience",
      lead: "Head of Client Experience",
      desc: "Delivers the sovereign luxury client journey — from bespoke consultations to white-glove delivery.",
      roles: ["Head of Luxury Concierge", "Bespoke Consultation Lead", "Client Relations", "Global Delivery Ops"],
    },
  ]

  const TEAMS_DATA = [
    { name: "Fragrance & Couture",    n: "Creative" },
    { name: "Blockchain & Web3",      n: "Technical" },
    { name: "Digital Commerce",       n: "Platform" },
    { name: "Brand & PR",             n: "Marketing" },
    { name: "Client Experience",      n: "Client" },
    { name: "Global Operations",      n: "Operations" },
  ]

  export default function SFTeamPage() {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div style={{ background: "#030303", color: "#e4e4e7", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
          <style dangerouslySetInnerHTML={{ __html: [
            ".sf-team-grid { display:grid; grid-template-columns:1fr; gap:18px; }",
            "@media(min-width:700px){ .sf-team-grid{ grid-template-columns:repeat(2,1fr); } }",
            ".sf-dept-card { padding:24px; border:1px solid #111; background:rgba(255,255,255,0.01); }",
          ].join(" ") }} />

          <div style={{ padding: "80px 24px 52px", textAlign: "center", borderBottom: "1px solid #111" }}>
            <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 10, marginTop: 0 }}>Organisation</p>
            <h1 style={{ fontSize: 34, fontWeight: 200, letterSpacing: "-0.02em", margin: "0 0 14px" }}>Team & Leadership</h1>
            <p style={{ color: "#71717a", fontSize: 14, maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.8 }}>
              Shamim Forever is led by Founder &amp; Chairman{" "}
              <strong style={{ color: "#a1a1aa" }}>Faisal Orakzai</strong> — built by a global team across creative, digital, brand, and client experience.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://theorg.com/org/shamim-forever" target="_blank" rel="noopener noreferrer"
                style={{ padding: "8px 16px", border: "1px solid rgba(201,160,84,0.4)", color: "#c9a054", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                The Org
              </a>
              <Link href="/faisal-orakzai" style={{ padding: "8px 16px", border: "1px solid #222", color: "#71717a", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                Founder Profile
              </Link>
            </div>
          </div>

          <div style={{ padding: "52px 24px", display: "flex", justifyContent: "center", borderBottom: "1px solid #111" }}>
            <div style={{ textAlign: "center", padding: "28px 36px", border: "1px solid rgba(201,160,84,0.5)", background: "rgba(201,160,84,0.06)", maxWidth: 320 }}>
              <p style={{ color: "#c9a054", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", margin: "0 0 6px" }}>Founder & Chairman</p>
              <h2 style={{ color: "#c9a054", fontSize: 20, fontWeight: 300, margin: "0 0 6px" }}>Faisal Orakzai</h2>
              <p style={{ color: "#52525b", fontSize: 12, margin: 0 }}>Founder of Shamim Forever, Orakzai Group, and Orakzai Bond</p>
              <Link href="/faisal-orakzai" style={{ display: "inline-block", marginTop: 14, padding: "6px 14px", border: "1px solid rgba(201,160,84,0.3)", color: "#c9a054", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
                Full Bio
              </Link>
            </div>
          </div>

          <section style={{ padding: "60px 24px" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 8, marginTop: 0 }}>Structure</p>
              <h2 style={{ color: "#e4e4e7", fontSize: 26, fontWeight: 300, letterSpacing: "-0.01em", marginTop: 0, marginBottom: 28 }}>Leadership by Division</h2>
              <div className="sf-team-grid">
                {DEPT_DATA.map(d => (
                  <div key={d.title} className="sf-dept-card">
                    <p style={{ color: "#c9a054", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 4px" }}>{d.title}</p>
                    <h3 style={{ color: "#e4e4e7", fontSize: 15, fontWeight: 400, margin: "0 0 10px" }}>{d.lead}</h3>
                    <p style={{ color: "#52525b", fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>{d.desc}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 12, borderTop: "1px solid #111" }}>
                      {d.roles.map(r => (
                        <div key={r} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{ color: "rgba(201,160,84,0.35)", fontSize: 10 }}>→</span>
                          <p style={{ color: "#3f3f46", fontSize: 12, margin: 0 }}>{r}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding: "60px 24px", background: "#060606", borderTop: "1px solid #111" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 8, marginTop: 0 }}>Divisions</p>
              <h2 style={{ color: "#e4e4e7", fontSize: 26, fontWeight: 300, letterSpacing: "-0.01em", marginTop: 0, marginBottom: 24 }}>Teams</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
                {TEAMS_DATA.map(t => (
                  <div key={t.name} style={{ padding: "16px 20px", border: "1px solid #111", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ color: "#71717a", fontSize: 13, margin: 0 }}>{t.name}</p>
                    <span style={{ color: "#c9a054", fontSize: 10, padding: "2px 8px", border: "1px solid #1a1a1a" }}>{t.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div style={{ padding: "28px 24px", borderTop: "1px solid #111", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <p style={{ color: "#c9a054", fontSize: 12, margin: 0 }}>Shamim Forever</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Home</Link>
              <Link href="/faisal-orakzai" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Founder</Link>
              <Link href="/press" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Press</Link>
              <a href="https://orakzaibond.com/team" target="_blank" rel="noopener noreferrer" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Orakzai Bond</a>
            </div>
          </div>
        </div>
      </>
    )
  }
  