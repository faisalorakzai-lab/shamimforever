import type { Metadata } from 'next'
  import Link from 'next/link'

  export const metadata: Metadata = {
    title: 'Shamim Forever News — Latest Updates | Faisal Orakzai',
    description: 'Latest news, announcements, and updates from Shamim Forever — Pakistan first global luxury digital house, founded by Faisal Orakzai. New collections, partnerships, and brand milestones.',
    keywords: [
      'Shamim Forever news', 'Shamim Forever latest', 'Faisal Orakzai news',
      'Pakistan luxury brand news', 'Shamim Forever announcements', 'Orakzai Group news',
      'luxury brand Pakistan 2026', 'Shamim Forever launch', 'Faisal Orakzai updates',
    ],
    alternates: { canonical: 'https://www.shamimforever.com/news' },
    openGraph: {
      title: 'Shamim Forever News — Latest from Pakistan Luxury',
      description: 'Latest news and updates from Shamim Forever — Pakistan first global luxury digital house founded by Faisal Orakzai.',
      type: 'website',
      url: 'https://www.shamimforever.com/news',
      siteName: 'Shamim Forever',
      images: [{ url: 'https://www.shamimforever.com/og-news.jpg', width: 1200, height: 630, alt: 'Shamim Forever News' }],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }

  const ARTICLES = [
    {
      headline: "Shamim Forever Launches Blockchain-Verified Luxury Authentication via Orakzai Bond",
      description: "Shamim Forever becomes Pakistan first luxury house to offer blockchain-verified product authentication — every piece issued with an on-chain certificate of provenance through Orakzai Bond.",
      datePublished: "2026-06-01",
      dateModified: "2026-06-26",
      author: "Faisal Orakzai",
      image: "https://www.shamimforever.com/og-news-blockchain.jpg",
      url: "https://www.shamimforever.com/news",
      category: "Innovation",
      keywords: ["blockchain luxury", "NFT authentication", "Shamim Forever blockchain", "Faisal Orakzai blockchain", "luxury Pakistan"]
    },
    {
      headline: "Faisal Orakzai Receives NUST Pakistan 50 Under 50 Entrepreneurship Award",
      description: "Shamim Forever founder Faisal Orakzai is honoured among Pakistan most impactful young entrepreneurs in NUST 50 Under 50 — recognising his pioneering work in luxury commerce, blockchain, and sovereign brand building.",
      datePublished: "2026-05-15",
      dateModified: "2026-06-26",
      author: "Faisal Orakzai",
      image: "https://www.shamimforever.com/og-news-award.jpg",
      url: "https://www.shamimforever.com/news",
      category: "Award",
      keywords: ["NUST 50 Under 50", "Faisal Orakzai award", "Pakistan entrepreneur award", "Shamim Forever recognition"]
    },
    {
      headline: "Shamim Forever Opens Second Boutique — Expanding to Lahore",
      description: "Shamim Forever expands its physical presence with a new boutique in Lahore — bringing its sovereign luxury experience in fragrances, bespoke jewellery, and premium cosmetics to Punjab.",
      datePublished: "2026-04-10",
      dateModified: "2026-06-26",
      author: "Faisal Orakzai",
      image: "https://www.shamimforever.com/og-boutiques.jpg",
      url: "https://www.shamimforever.com/boutiques",
      category: "Expansion",
      keywords: ["Shamim Forever Lahore", "luxury boutique Lahore", "Shamim Forever expansion", "Pakistan luxury store"]
    },
    {
      headline: "Shamim Forever Listed on Wikidata — Founder Faisal Orakzai Verified as Public Figure (Q140588912)",
      description: "Shamim Forever founder Faisal Orakzai is now documented in Wikidata (Q140588912) — the knowledge graph powering Google Knowledge Panels and Wikipedia. This marks a milestone in the brand global credibility.",
      datePublished: "2025-12-01",
      dateModified: "2026-06-26",
      author: "Faisal Orakzai",
      image: "https://www.shamimforever.com/faisal-orakzai-smiling.jpg",
      url: "https://www.wikidata.org/wiki/Q140588912",
      category: "Verification",
      keywords: ["Faisal Orakzai Wikidata", "Q140588912", "Shamim Forever Wikidata", "luxury brand verification Pakistan"]
    },
    {
      headline: "Shamim Forever Featured on GEN Global — Luxury Brand Gains International Recognition",
      description: "Shamim Forever and its founder Faisal Orakzai are featured on GEN Global Entrepreneurship Network — a community spanning 170+ countries, connecting the world most impactful entrepreneurs and investors.",
      datePublished: "2026-01-20",
      dateModified: "2026-06-26",
      author: "Faisal Orakzai",
      image: "https://www.shamimforever.com/og-press.jpg",
      url: "https://www.genglobal.org/user/faisal1",
      category: "Recognition",
      keywords: ["Shamim Forever GEN Global", "Faisal Orakzai global", "Pakistan luxury international", "GEN entrepreneurship"]
    },
    {
      headline: "Heirloom Vault — Shamim Forever Launches Generational Luxury Custody Programme",
      description: "Shamim Forever unveils the Heirloom Vault — a first-of-its-kind programme for acquiring, authenticating, and preserving luxury artefacts for generational legacy. Available by private appointment.",
      datePublished: "2026-03-01",
      dateModified: "2026-06-26",
      author: "Faisal Orakzai",
      image: "https://www.shamimforever.com/og-heirloom.jpg",
      url: "https://www.shamimforever.com/heirloom-vault",
      category: "Launch",
      keywords: ["Shamim Forever Heirloom Vault", "luxury custody Pakistan", "generational luxury", "Faisal Orakzai heirloom"]
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
          { "@type": "ListItem", "position": 2, "name": "News", "item": "https://www.shamimforever.com/news" }
        ]
      },
      {
        "@type": "Blog",
        "@id": "https://www.shamimforever.com/news#blog",
        "name": "Shamim Forever News",
        "description": "Latest news and updates from Shamim Forever — Pakistan first global luxury digital house.",
        "url": "https://www.shamimforever.com/news",
        "publisher": {
          "@type": "Organization",
          "@id": "https://www.shamimforever.com/#organization",
          "name": "Shamim Forever",
          "logo": { "@type": "ImageObject", "url": "https://www.shamimforever.com/logo-sf.png" }
        }
      },
      ...ARTICLES.map(a => ({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": a.headline,
        "description": a.description,
        "datePublished": a.datePublished,
        "dateModified": a.dateModified,
        "author": { "@type": "Person", "@id": "https://www.shamimforever.com/faisal-orakzai#person", "name": a.author },
        "publisher": { "@type": "Organization", "@id": "https://www.shamimforever.com/#organization", "name": "Shamim Forever", "logo": { "@type": "ImageObject", "url": "https://www.shamimforever.com/logo-sf.png" } },
        "image": a.image,
        "url": a.url,
        "keywords": a.keywords.join(", "),
        "articleSection": a.category,
        "inLanguage": "en"
      }))
    ]
  }

  const CATS = ["All", "Innovation", "Award", "Expansion", "Verification", "Recognition", "Launch"]

  export default function SFNewsPage() {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <div style={{ background: "#030303", color: "#e4e4e7", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>

          {/* HEADER */}
          <div style={{ padding: "80px 24px 52px", textAlign: "center", borderBottom: "1px solid #111" }}>
            <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 10, marginTop: 0 }}>Latest</p>
            <h1 style={{ fontSize: 34, fontWeight: 200, letterSpacing: "-0.02em", margin: "0 0 14px" }}>News & Announcements</h1>
            <p style={{ color: "#71717a", fontSize: 14, maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>
              Milestones, launches, and recognition from Shamim Forever — Pakistan first global luxury digital house, founded by Faisal Orakzai.
            </p>
          </div>

          {/* ARTICLES */}
          <section style={{ padding: "60px 24px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 2 }}>
              {ARTICLES.map((a, i) => (
                <article key={i} style={{ padding: "28px 0", borderBottom: "1px solid #0e0e0e" }}>
                  <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                    <div style={{ flexShrink: 0 }}>
                      <span style={{ display: "inline-block", padding: "3px 10px", border: "1px solid #1a1a1a", color: "#c9a054", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" }}>{a.category}</span>
                      <p style={{ color: "#3f3f46", fontSize: 11, margin: "8px 0 0" }}>{new Date(a.datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <h2 style={{ color: "#e4e4e7", fontSize: 16, fontWeight: 400, margin: "0 0 10px", lineHeight: 1.5 }}>{a.headline}</h2>
                      <p style={{ color: "#52525b", fontSize: 13, lineHeight: 1.75, margin: "0 0 12px" }}>{a.description}</p>
                      <a href={a.url} target={a.url.startsWith('http') && !a.url.includes('shamimforever') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                        Read more →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: "60px 24px", background: "#060606", borderTop: "1px solid #111" }}>
            <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
              <p style={{ color: "#c9a054", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 10, marginTop: 0 }}>Stay Updated</p>
              <h2 style={{ color: "#e4e4e7", fontSize: 22, fontWeight: 300, marginTop: 0, marginBottom: 14 }}>Follow Shamim Forever</h2>
              <p style={{ color: "#71717a", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
                For press enquiries, media coverage, and brand updates — reach us directly.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/press" style={{ padding: "10px 22px", border: "1px solid rgba(201,160,84,0.5)", color: "#c9a054", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                  Press & Media
                </Link>
                <Link href="/faisal-orakzai" style={{ padding: "10px 22px", border: "1px solid #222", color: "#71717a", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                  Founder Profile
                </Link>
              </div>
            </div>
          </section>

          <div style={{ padding: "28px 24px", borderTop: "1px solid #111", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <p style={{ color: "#c9a054", fontSize: 12, margin: 0 }}>Shamim Forever</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Home</Link>
              <Link href="/faisal-orakzai" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Founder</Link>
              <Link href="/press" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Press</Link>
              <a href="https://orakzaibond.com" target="_blank" rel="noopener noreferrer" style={{ color: "#52525b", fontSize: 10, textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase" }}>Orakzai Bond</a>
            </div>
          </div>
        </div>
      </>
    )
  }
  