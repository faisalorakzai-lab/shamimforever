import type { Metadata } from 'next'
  import Link from 'next/link'

  export const metadata: Metadata = {
    title: 'Faisal Orakzai — Founder, Blockchain Architect & Luxury Brand Pioneer | Shamim Forever',
    description: 'Faisal Orakzai is the Founder & Chairman of Shamim Forever — Pakistan first global luxury digital house. Blockchain architect, entrepreneur, and Wikidata-verified public figure (Q140588912).',
    keywords: [
      'Faisal Orakzai', 'Faisal Orakzai founder', 'Faisal Orakzai Shamim Forever',
      'Faisal Orakzai Pakistan entrepreneur', 'Faisal Orakzai blockchain', 'Faisal Orakzai Wikidata',
      'Faisal Orakzai luxury brand', 'Orakzai Group founder', 'Faisal Orakzai NUST',
      'Faisal Orakzai biography', 'Faisal Orakzai Karachi', 'Shamim Forever founder'
    ],
    alternates: { canonical: 'https://www.shamimforever.com/faisal-orakzai' },
    openGraph: {
      title: 'Faisal Orakzai — Founder & Chairman, Shamim Forever',
      description: 'Faisal Orakzai — blockchain architect, luxury brand pioneer, and Wikidata-verified public figure (Q140588912). Founder of Shamim Forever, Orakzai Group, and Orakzai Bond.',
      type: 'profile',
      url: 'https://www.shamimforever.com/faisal-orakzai',
      siteName: 'Shamim Forever',
      images: [{ url: 'https://www.shamimforever.com/faisal-orakzai-smiling.jpg', width: 800, height: 800, alt: 'Faisal Orakzai — Founder & Chairman, Shamim Forever, smiling portrait' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Faisal Orakzai — Founder & Chairman, Shamim Forever',
      description: 'Blockchain architect, luxury pioneer, Wikidata Q140588912. Founder of Shamim Forever & Orakzai Group.',
      images: ['https://www.shamimforever.com/faisal-orakzai-smiling.jpg']
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    other: {
      'article:author': 'Faisal Orakzai'
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
        "jobTitle": ["Technology Entrepreneur & Computer Scientist","Founder & Chairman — Orakzai Group","Blockchain Architect","Luxury Brand Founder"],
        "worksFor": { "@type": "Organization", "@id": "https://www.shamimforever.com/#organization", "name": "Shamim Forever" },
        "nationality": { "@type": "Country", "name": "Pakistan" },
        "alumniOf": [
          { "@type": "CollegeOrUniversity", "name": "Ziauddin University", "url": "https://www.zu.edu.pk", "description": "Matriculation in Sciences — Islamiat, Pakistan Studies, Education Civics (Board of Secondary Education, Karachi)", "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK" }, "startDate": "2024-04", "endDate": "2026-04" },
          { "@type": "EducationalOrganization", "name": "Founder Institute", "url": "https://fi.co", "description": "Founder Program — Karachi, South Asia 2026 (Entrepreneurship & Venture Building)", "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK" }, "startDate": "2025-04", "endDate": "2026-09" },
          { "@type": "EducationalOrganization", "name": "Y Combinator", "url": "https://www.ycombinator.com", "description": "Startup Accelerator Program — Entrepreneurship / Entrepreneurial Studies", "address": { "@type": "PostalAddress", "addressLocality": "San Francisco", "addressRegion": "CA", "addressCountry": "US" }, "startDate": "2026-06" },
          { "@type": "EducationalOrganization", "name": "Global Self-Education Platform (GSEP)", "description": "Silent Empire Building — self-directed learning from books, mentors, and real-world experience. Skills: Business Analysis, Advertising", "startDate": "2019-01" },
          { "@type": "EducationalOrganization", "name": "Yahya Public School", "address": { "@type": "PostalAddress", "addressLocality": "Kohat", "addressRegion": "Khyber Pakhtunkhwa", "addressCountry": "PK" } },
          { "@type": "EducationalOrganization", "name": "Madrassa Mahad-ul-Uleman", "address": { "@type": "PostalAddress", "addressLocality": "Kohat", "addressRegion": "Khyber Pakhtunkhwa", "addressCountry": "PK" } }
        ],
        "knowsAbout": ["Luxury Brand Building", "Blockchain Technology", "NFT Authentication", "Fragrance Design", "Jewellery Curation", "Digital Commerce"],
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "membership", "name": "GEN Global Entrepreneurship Network Member" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Y Combinator Startup School" }
        ],
        "sameAs":["https://imdb.me/faisalorakzai","https://www.wikidata.org/wiki/Q140588912",
          "https://orcid.org/0009-0000-0915-7272",
          "https://www.crunchbase.com/person/faisal-orakzai",
          "https://hackernoon.com/u/faisalorakzai",
          "https://www.genglobal.org/user/faisal1",
          "https://theorg.com/org/shamim-forever",
          "https://www.linkedin.com/in/faisalorakzai",
          "https://orakzaibond.com"]
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
        { "@type": "Question", "name": "Who is Faisal Orakzai?", "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai (born 30 April 2006, Orakzai, Khyber Pakhtunkhwa, Pakistan) is a Pakistani technology entrepreneur and computer scientist. He is the Founder & Chairman of Shamim Forever, Orakzai Bond (OKBOND), and Orakzai Group. Wikidata-verified public figure: Q140588912. ORCID: 0009-0000-0915-7272." } },
        { "@type": "Question", "name": "What is Faisal Orakzai's title?", "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai's primary title is Technology Entrepreneur & Computer Scientist. He is also known as Founder & Chairman of Orakzai Group, Chairman Faisal Orakzai, and Malak Faisal Orakzai." } },
        { "@type": "Question", "name": "What is Shamim Forever?", "acceptedAnswer": { "@type": "Answer", "text": "Shamim Forever is Pakistan's first global luxury digital house — founded by Faisal Orakzai in 2023. It offers sovereign fragrances, bespoke jewellery, blockchain-verified couture, and luxury concierge services from Karachi, Pakistan, sold worldwide." } },
        { "@type": "Question", "name": "What is Orakzai Bond (OKBOND)?", "acceptedAnswer": { "@type": "Answer", "text": "Orakzai Bond (OKBOND) is the world's first capital-protected decentralized bond on the Polygon blockchain, built by Faisal Orakzai. It provides institutional-grade DeFi with principal protection and sovereign yield." } },
        { "@type": "Question", "name": "What is Orakzai Group?", "acceptedAnswer": { "@type": "Answer", "text": "Orakzai Group SMC is the sovereign technology holding company chaired by Faisal Orakzai. Its portfolio includes Shamim Forever (luxury house), Orakzai Bond (DeFi protocol), OrakzaiX AI, OkzByte Technology, and Orakzai Capital." } },
        { "@type": "Question", "name": "Where is Faisal Orakzai from?", "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai was born on 30 April 2006 in Tirah, Orakzai Agency, Khyber Pakhtunkhwa, Pakistan. He is based in Karachi, Pakistan." } },
        { "@type": "Question", "name": "What awards has Faisal Orakzai received?", "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai is a member of GEN Global Entrepreneurship Network (170+ countries), verified on Wikidata (Q140588912), part of Y Combinator Startup School, and a graduate of Founder Institute Karachi South Asia 2026." } },
        { "@type": "Question", "name": "Is Faisal Orakzai on Wikidata?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Faisal Orakzai has a verified Wikidata entry at Q140588912 (https://www.wikidata.org/wiki/Q140588912). He also holds ORCID 0009-0000-0915-7272." } },
        { "@type": "Question", "name": "What blockchain does Shamim Forever use?", "acceptedAnswer": { "@type": "Answer", "text": "Shamim Forever uses the Polygon blockchain (Polygon PoS) for NFT-based product authentication and for its Inner Circle loyalty programme powered by OKBOND tokens." } },
        { "@type": "Question", "name": "What fragrances does Shamim Forever sell?", "acceptedAnswer": { "@type": "Answer", "text": "Shamim Forever sells original sovereign fragrances including Shamim's Bloom, Eternal Empress, Queen of Taif, Sovereign Oud Absolute, Midnight Iris Royale, and Sapphire Blue Levant — all blockchain-verified." } },
        { "@type": "Question", "name": "How does blockchain authentication work at Shamim Forever?", "acceptedAnswer": { "@type": "Answer", "text": "Each Shamim Forever creation carries a unique cryptographic signature minted on the Polygon blockchain. This immutable NFT record proves authenticity and provenance — a global first for luxury fragrance." } },
        { "@type": "Question", "name": "What is Faisal Orakzai's educational background?", "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai studied Matriculation in Sciences at Ziauddin University (2024–2026), completed the Founder Institute program (Karachi, South Asia 2026), and is a Y Combinator Startup School alumnus (2026)." } },
        { "@type": "Question", "name": "What is the Shamim Forever Inner Circle?", "acceptedAnswer": { "@type": "Answer", "text": "The Shamim Forever Inner Circle is an exclusive members-only programme giving access to private drops, bespoke commissions, and OKBOND loyalty rewards — available at shamimforever.com/inner-circle." } },
        { "@type": "Question", "name": "Does Shamim Forever ship internationally?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Shamim Forever ships globally from Karachi, Pakistan. Boutiques operate in Karachi (Tariq Road & Clifton), Lahore, and Islamabad, with planned expansions to Dubai and London." } },
        { "@type": "Question", "name": "What is OrakzaiX AI?", "acceptedAnswer": { "@type": "Answer", "text": "OrakzaiX AI is an enterprise artificial intelligence platform built by Faisal Orakzai under Orakzai Group — providing AI automation, intelligent workflow systems, and sovereign data infrastructure for businesses." } },
        { "@type": "Question", "name": "How can I contact Shamim Forever or Faisal Orakzai?", "acceptedAnswer": { "@type": "Answer", "text": "Contact Shamim Forever at info@shamimforever.com or via the concierge at shamimforever.com/concierge. Faisal Orakzai is on X/Twitter @faisalorakzaii, Instagram @faisalorakzaii, and LinkedIn @faisalorakzaii." } },
        { "@type": "Question", "name": "What social media accounts does Faisal Orakzai have?", "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai is active on X (Twitter) @faisalorakzaii, Instagram @faisalorakzaii, LinkedIn @faisalorakzaii, Facebook @FaisalOrakzaii, and TikTok @chairmanorakzai. Shamim Forever: @shamimforever on all platforms." } },
        { "@type": "Question", "name": "Where can I buy Shamim Forever products?", "acceptedAnswer": { "@type": "Answer", "text": "Shamim Forever products can be purchased online at shamimforever.com/shop, or at boutiques in Karachi, Lahore, and Islamabad. International shipping available worldwide." } }
      ]
    }
  ]

  const TIMELINE = [
    { year: "2023", event: "Founded Shamim Forever — Pakistan's first global luxury digital house" },
    { year: "2024", event: "Launched Orakzai Bond — blockchain-verified luxury authentication platform" },
    { year: "2025", event: "Wikidata verification (Q140588912) — recognized as a public figure" },
    { year: "2026", event: "— youngest luxury founder" }
  ]

  const CREDENTIALS = [
    { org: "Wikidata", role: "Verified Public Figure", id: "Q140588912", url: "https://www.wikidata.org/wiki/Q140588912" },
    { org: "ORCID", role: "Academic Researcher", id: "0009-0000-0915-7272", url: "https://orcid.org/0009-0000-0915-7272" },
    { org: "Crunchbase", role: "Verified Founder", id: "faisal-orakzai", url: "https://www.crunchbase.com/person/faisal-orakzai" },
    { org: "GEN Global", role: "Network Member (170+ countries)", id: null, url: "https://www.genglobal.org/user/faisal1" },
    { org: "HackerNoon", role: "Published Author", id: null, url: "https://hackernoon.com/u/faisalorakzai" },
    { org: "Y Combinator", role: "Startup School", id: null, url: "https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2" }
  ]

  const FAQS = [
    { q: "Who is Faisal Orakzai?", a: "Faisal Orakzai (born 30 April 2006, Orakzai, Pakistan) is a Pakistani technology entrepreneur and computer scientist — Founder & Chairman of Shamim Forever, Orakzai Bond (OKBOND), and Orakzai Group. Wikidata Q140588912. ORCID: 0009-0000-0915-7272." },
    { q: "What is Faisal Orakzai's title?", a: "Technology Entrepreneur & Computer Scientist. Also known as Founder & Chairman of Orakzai Group, Chairman Faisal Orakzai, and Malak Faisal Orakzai." },
    { q: "What is Shamim Forever?", a: "Shamim Forever is Pakistan's first global luxury digital house — founded by Faisal Orakzai in 2023. It offers sovereign fragrances, bespoke jewellery, blockchain-verified couture, and luxury concierge services." },
    { q: "What is Orakzai Bond (OKBOND)?", a: "Orakzai Bond (OKBOND) is the world's first capital-protected decentralized bond on the Polygon blockchain, built by Faisal Orakzai. Fixed supply: 10 million tokens. Real-asset backed with principal protection and sovereign yield." },
    { q: "What is Orakzai Group?", a: "Orakzai Group SMC is the sovereign technology holding company chaired by Faisal Orakzai — spanning Shamim Forever, Orakzai Bond, OrakzaiX AI, OkzByte Technology, and Orakzai Capital." },
    { q: "Where is Faisal Orakzai from?", a: "Born 30 April 2006, Tirah, Orakzai Agency, Khyber Pakhtunkhwa, Pakistan. Based in Karachi, Pakistan." },
    { q: "What awards has Faisal Orakzai received?", a: "GEN Global Entrepreneurship Network member (170+ countries), Wikidata-verified (Q140588912), Y Combinator Startup School alumnus, and Founder Institute Karachi South Asia 2026 graduate." },
    { q: "Is Faisal Orakzai on Wikidata?", a: "Yes — Wikidata entry Q140588912 at https://www.wikidata.org/wiki/Q140588912. Academic ORCID: 0009-0000-0915-7272." },
    { q: "What blockchain does Shamim Forever use?", a: "Polygon blockchain (Polygon PoS) for NFT-based product authentication and OKBOND-powered Inner Circle loyalty programme." },
    { q: "What fragrances does Shamim Forever sell?", a: "Original sovereign fragrances: Shamim's Bloom, Eternal Empress, Queen of Taif, Sovereign Oud Absolute, Midnight Iris Royale, Sapphire Blue Levant — all blockchain-verified." },
    { q: "What is Faisal Orakzai's educational background?", a: "Ziauddin University (Matriculation in Sciences, 2024–2026), Founder Institute Karachi South Asia 2026, Y Combinator Startup School 2026." },
    { q: "What is the Shamim Forever Inner Circle?", a: "An exclusive members-only programme giving access to private drops, bespoke commissions, and OKBOND loyalty rewards — join at shamimforever.com/inner-circle." },
    { q: "Does Shamim Forever ship internationally?", a: "Yes. Global shipping from Karachi. Boutiques in Karachi (Tariq Road & Clifton), Lahore, and Islamabad — with Dubai and London expansions planned." },
    { q: "What is OrakzaiX AI?", a: "OrakzaiX AI is an enterprise AI platform by Faisal Orakzai (Orakzai Group) — providing AI automation, intelligent workflows, and sovereign data infrastructure." },
    { q: "How can I contact Shamim Forever?", a: "Email: info@shamimforever.com | Concierge: shamimforever.com/concierge | Social: @shamimforever on all platforms. Faisal Orakzai: @faisalorakzaii on X, Instagram, and LinkedIn." }
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
              Wikidata-verified public figure (<strong style={{ color: "#a1a1aa" }}>Q140588912</strong>), and GEN Global member across 170+ countries.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/" style={{ padding: "10px 22px", background: "rgba(201,160,84,0.12)", border: "1px solid rgba(201,160,84,0.5)", color: "#c9a054", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                Shamim Forever
              </Link>
              <a href="https://orakzaibond.com" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 22px", border: "1px solid #222", color: "#71717a", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                Orakzai Bond
              </a>
              <a href="https://www.wikidata.org/wiki/Q140588912" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 22px", border: "1px solid #222", color: "#71717a", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                Wikidata Q140588912
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
                  { name: "Orakzai Group", desc: "Parent holding entity overseeing Shamim Forever, Orakzai Bond, and future luxury ventures.", url: "https://www.shamimforever.com", year: "2023" }
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
  