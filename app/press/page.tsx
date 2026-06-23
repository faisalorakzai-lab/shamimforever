import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shamim Forever — Press & Media Coverage | Faisal Orakzai',
  description: 'Press coverage, media recognition, and industry features for Shamim Forever and founder Faisal Orakzai. Wikidata verified, ORCID indexed, GEN Global member.',
  alternates: { canonical: 'https://www.shamimforever.com/press' },
  openGraph: {
    title: 'Shamim Forever Press & Media',
    description: 'Media coverage and recognition for Shamim Forever — global luxury digital house founded by Faisal Orakzai.',
    url: 'https://www.shamimforever.com/press',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.shamimforever.com/press#webpage",
      "name": "Shamim Forever Press & Media",
      "url": "https://www.shamimforever.com/press",
      "description": "Press coverage, media mentions, and industry recognition for Shamim Forever and its founder Faisal Orakzai.",
      "about": { "@type": "Person", "@id": "https://www.shamimforever.com/faisal-orakzai#person", "name": "Faisal Orakzai" }
    },
    {
      "@type": "Organization",
      "@id": "https://www.shamimforever.com/#organization",
      "name": "Shamim Forever",
      "url": "https://www.shamimforever.com",
      "foundingDate": "2023",
      "founder": { "@type": "Person", "name": "Faisal Orakzai" },
      "award": [
        "NUST Pakistan 50 Under 50 Entrepreneurship Award (Founder Faisal Orakzai)",
        "GEN Global Entrepreneurship Network — Featured Founder",
        "Wikidata Verified Public Figure (Q140264666)",
        "Y Combinator Startup School",
        "Crunchbase Verified Startup Profile"
      ],
      "sameAs": [
        "https://www.wikidata.org/wiki/Q140264666",
        "https://www.crunchbase.com/organization/shamim-forever",
        "https://hackernoon.com/u/faisalorakzai",
        "https://theorg.com/org/shamim-forever",
        "https://orcid.org/0009-0000-0915-7272",
        "https://www.genglobal.org/user/faisal1"
      ]
    },
    {
      "@type": "Article",
      "headline": "Faisal Orakzai Founds Shamim Forever — Pakistan First Global Luxury Digital House",
      "url": "https://hackernoon.com/u/faisalorakzai",
      "author": { "@type": "Person", "name": "Faisal Orakzai" },
      "publisher": { "@type": "Organization", "name": "HackerNoon" },
      "datePublished": "2026-06-01",
      "about": "Shamim Forever luxury brand Pakistan blockchain NFT Faisal Orakzai"
    },
    {
      "@type": "Article",
      "headline": "Shamim Forever — Blockchain-Verified Luxury from Pakistan to the World",
      "url": "https://www.genglobal.org/user/faisal1",
      "author": { "@type": "Person", "name": "Faisal Orakzai" },
      "publisher": { "@type": "Organization", "name": "GEN Global" },
      "datePublished": "2026-01-01",
      "about": "Shamim Forever GEN Global luxury brand recognition Pakistan"
    }
  ]
}

const COVERAGE = [
  {
    outlet: "HackerNoon",
    type: "Published Author",
    headline: "Faisal Orakzai on Shamim Forever — Building Pakistan First Global Luxury Digital House",
    excerpt: "Faisal Orakzai writes on the intersection of luxury commerce, blockchain authentication, and brand sovereignty — published and indexed on HackerNoon, one of the world's largest technology publishing platforms.",
    url: "https://hackernoon.com/u/faisalorakzai",
    date: "2026",
    tag: "Luxury / Blockchain",
  },
  {
    outlet: "GEN Global",
    type: "Member Recognition",
    headline: "Faisal Orakzai (Founder, Shamim Forever) — Member of Global Entrepreneurship Network",
    excerpt: "Shamim Forever founder Faisal Orakzai is recognized as a member of the Global Entrepreneurship Network (GEN), spanning 170+ countries and tens of thousands of entrepreneurs, investors, and institutions.",
    url: "https://www.genglobal.org/user/faisal1",
    date: "2026",
    tag: "Entrepreneurship",
  },
  {
    outlet: "Y Combinator",
    type: "Startup School",
    headline: "Faisal Orakzai in Y Combinator Co-Founder Matching Program",
    excerpt: "Featured in Y Combinator Startup School — connecting Shamim Forever and Orakzai Bond with global technical co-founders and early-stage investors in Silicon Valley's most respected accelerator ecosystem.",
    url: "https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2",
    date: "2026",
    tag: "Startup / VC",
  },
  {
    outlet: "Wikidata",
    type: "Verified Encyclopedia",
    headline: "Faisal Orakzai (Founder, Shamim Forever) — Wikidata Q140264666",
    excerpt: "Faisal Orakzai is documented in Wikidata (Q140264666) — the knowledge graph that powers Google Knowledge Panels, Bing entities, and Wikipedia info boxes. The entry confirms his role as Founder of Shamim Forever.",
    url: "https://www.wikidata.org/wiki/Q140264666",
    date: "2025",
    tag: "Verification",
  },
  {
    outlet: "Crunchbase",
    type: "Startup Profile",
    headline: "Shamim Forever on Crunchbase — Luxury E-Commerce, Pakistan",
    excerpt: "Verified Crunchbase profile documenting Shamim Forever's founding, focus on blockchain-verified luxury goods, and Pakistan headquarters under founder Faisal Orakzai.",
    url: "https://www.crunchbase.com/person/faisal-orakzai",
    date: "2023",
    tag: "Startup Data",
  },
  {
    outlet: "ORCID",
    type: "Academic Research",
    headline: "Faisal Orakzai (Founder, Shamim Forever) — Academic Researcher ORCID 0009-0000-0915-7272",
    excerpt: "Shamim Forever founder maintains an ORCID academic profile (0009-0000-0915-7272) with 67+ indexed citations — bridging the worlds of blockchain research and luxury commerce innovation.",
    url: "https://orcid.org/0009-0000-0915-7272",
    date: "2024",
    tag: "Academic",
  },
  {
    outlet: "NUST Pakistan",
    type: "National Award",
    headline: "50 Under 50 — NUST Pakistan Entrepreneurship Award (Faisal Orakzai)",
    excerpt: "Faisal Orakzai, founder of Shamim Forever, was recognized in NUST Pakistan 50 Under 50 programme — honouring Pakistan most impactful young entrepreneurs and innovators.",
    url: null,
    date: "2026",
    tag: "Award",
  },
  {
    outlet: "The Org",
    type: "Organization Chart",
    headline: "Shamim Forever Leadership — Publicly Documented on The Org",
    excerpt: "Shamim Forever organizational structure — from Faisal Orakzai (Founder Chairman) through its creative, digital, brand, and client divisions — is publicly documented on The Org for global transparency.",
    url: "https://theorg.com/org/shamim-forever",
    date: "2026",
    tag: "Organization",
  },
]

const STATS = [
  { n: "8+",   l: "Media & Platform Features" },
  { n: "67+",  l: "Academic Citations (Founder)" },
  { n: "24+",  l: "Verified Online Profiles" },
  { n: "2023", l: "Year Founded" },
]

export default function SFPressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: "#030303", color: "#e4e4e7", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>

        {/* HEADER */}
        <div style={{ padding: "80px 24px 52px", textAlign: "center", borderBottom: "1px solid #111" }}>
          <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 10, marginTop: 0 }}>Press & Media</p>
          <h1 style={{ fontSize: 34, fontWeight: 200, letterSpacing: "-0.02em", margin: "0 0 14px" }}>Coverage & Recognition</h1>
          <p style={{ color: "#71717a", fontSize: 14, maxWidth: 520, margin: "0 auto 28px", lineHeight: 1.8 }}>
            Shamim Forever and its founder Faisal Orakzai are recognized across 24+ global platforms,
            academic indices, and entrepreneurship networks.
          </p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {STATS.map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <p style={{ color: "#c9a054", fontSize: 22, fontWeight: 300, margin: 0 }}>{s.n}</p>
                <p style={{ color: "#3f3f46", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", margin: "4px 0 0" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* COVERAGE */}
        <section style={{ padding: "60px 24px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {COVERAGE.map(item => (
              <div key={item.outlet} style={{ padding: "24px 28px", border: "1px solid #111", background: "rgba(255,255,255,0.01)" }}>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div style={{ flexShrink: 0, textAlign: "center", minWidth: 80 }}>
                    <p style={{ color: "#c9a054", fontSize: 12, fontWeight: 600, margin: 0 }}>{item.outlet}</p>
                    <span style={{ display: "inline-block", marginTop: 5, padding: "2px 7px", border: "1px solid #1a1a1a", color: "#52525b", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.tag}</span>
                    <p style={{ color: "#3f3f46", fontSize: 10, margin: "6px 0 0" }}>{item.date}</p>
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ color: "#c9a054", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 6px" }}>{item.type}</p>
                    <h3 style={{ color: "#e4e4e7", fontSize: 14, fontWeight: 400, margin: "0 0 8px", lineHeight: 1.5 }}>{item.headline}</h3>
                    <p style={{ color: "#52525b", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{item.excerpt}</p>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-block", marginTop: 10, color: "#c9a054", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MEDIA CONTACT */}
        <section style={{ padding: "60px 24px", background: "#060606", borderTop: "1px solid #111" }}>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 10, marginTop: 0 }}>Media Enquiries</p>
            <h2 style={{ color: "#e4e4e7", fontSize: 24, fontWeight: 300, marginTop: 0, marginBottom: 16 }}>Press Contact</h2>
            <p style={{ color: "#71717a", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              For press coverage, interview requests, or brand assets — contact us through our official channels.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/concierge" style={{ padding: "10px 22px", border: "1px solid rgba(201,160,84,0.5)", color: "#c9a054", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                Contact
              </Link>
              <Link href="/faisal-orakzai" style={{ padding: "10px 22px", border: "1px solid #222", color: "#71717a", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                Founder Profile
              </Link>
              <a href="https://orakzaibond.com/press" target="_blank" rel="noopener noreferrer"
                style={{ padding: "10px 22px", border: "1px solid #222", color: "#71717a", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                Orakzai Bond Press
              </a>
            </div>
          </div>
        </section>

        <div style={{ padding: "28px 24px", borderTop: "1px solid #111", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
          <p style={{ color: "#c9a054", fontSize: 12, margin: 0 }}>Shamim Forever</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Home</Link>
            <Link href="/faisal-orakzai" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Founder</Link>
            <Link href="/team" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Team</Link>
            <a href="https://orakzaibond.com" target="_blank" rel="noopener noreferrer" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Orakzai Bond</a>
          </div>
        </div>
      </div>
    </>
  )
}
