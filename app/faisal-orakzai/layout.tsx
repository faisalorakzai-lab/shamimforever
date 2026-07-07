import type { ReactNode } from 'react'

  const profileSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://www.shamimforever.com/faisal-orakzai#profilepage",
        "url": "https://www.shamimforever.com/faisal-orakzai",
        "name": "Faisal Orakzai — Founder & Chairman, Shamim Forever",
        "description": "Official profile of Faisal Orakzai (born 30 April 2006, Tirah, Orakzai). Founder & Chairman of Shamim Forever and Orakzai Bond (OKBOND). Stevie® Gold Award winner 2026.",
        "isPartOf": { "@type": "WebSite", "@id": "https://shamimforever.com/#website" },
        "about": { "@id": "https://www.wikidata.org/wiki/Q140264666" },
        "mainEntity": { "@id": "https://www.wikidata.org/wiki/Q140264666" },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.shamimforever.com/founder-faisal-orakzai.jpg",
          "width": 800, "height": 800,
          "caption": "Faisal Orakzai — Founder & Chairman, Shamim Forever"
        },
        "datePublished": "2024-01-01T00:00:00Z",
        "dateModified": "2026-06-25T00:00:00Z",
        "inLanguage": "en",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", "h2", ".fo-description", ".fo-bio"]
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shamimforever.com/" },
            { "@type": "ListItem", "position": 2, "name": "Faisal Orakzai", "item": "https://www.shamimforever.com/faisal-orakzai" }
          ]
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.wikidata.org/wiki/Q140264666",
        "name": "Faisal Orakzai",
        "givenName": "Faisal",
        "familyName": "Orakzai",
        "honorificPrefix": "Chairman",
        "alternateName": [
          "Chairman Faisal Orakzai",
          "Malak Faisal Orakzai",
          "faisalorakzaii",
          "Faisal Orakzai OKBOND",
          "Muhammad Faisal Orakzai"
        ],
        "disambiguatingDescription": "Pakistani entrepreneur and blockchain architect (born 30 April 2006, Tirah, Orakzai). Founder of Shamim Forever luxury house and Orakzai Bond (OKBOND). Not to be confused with Dr. Faisal Moeen Orakzai.",
        "description": "Faisal Orakzai (born 30 April 2006, Tirah, Orakzai, Pakistan) is a Pakistani entrepreneur, blockchain architect, and sovereign systems builder. He is the Founder & Chairman of Shamim Forever luxury house and Orakzai Bond (OKBOND) DeFi protocol, and CEO of Orakzai Group SMC. He studied at Ziauddin University, Karachi.",
        "url": "https://www.shamimforever.com/faisal-orakzai",
        "mainEntityOfPage": "https://www.shamimforever.com/faisal-orakzai",
        "image": [
          {
            "@type": "ImageObject",
            "contentUrl": "https://www.shamimforever.com/founder-faisal-orakzai.jpg",
            "url": "https://www.shamimforever.com/founder-faisal-orakzai.jpg",
            "width": 800, "height": 800,
            "caption": "Faisal Orakzai — Founder & Chairman, Shamim Forever & Orakzai Bond",
            "name": "Faisal Orakzai official portrait"
          },
          {
            "@type": "ImageObject",
            "contentUrl": "https://www.shamimforever.com/faisal-orakzai-hero.jpg",
            "url": "https://www.shamimforever.com/faisal-orakzai-hero.jpg",
            "width": 1080, "height": 1080,
            "caption": "Faisal Orakzai — Blockchain Architect & Entrepreneur",
            "name": "Faisal Orakzai hero image"
          },
          {
            "@type": "ImageObject",
            "contentUrl": "https://www.shamimforever.com/faisal-orakzai-smiling.jpg",
            "url": "https://www.shamimforever.com/faisal-orakzai-smiling.jpg",
            "width": 1200, "height": 800,
            "caption": "Faisal Orakzai — Founder of Shamim Forever",
            "name": "Faisal Orakzai founders portrait"
          }
        ],
        "birthDate": "2006-04-30",
        "birthPlace": {
          "@type": "Place",
          "name": "Tirah, Orakzai",
          "addressRegion": "Khyber Pakhtunkhwa",
          "addressCountry": "PK",
          "geo": { "@type": "GeoCoordinates", "latitude": 33.6, "longitude": 70.2 }
        },
        "nationality": { "@type": "Country", "name": "Pakistan" },
        "gender": "Male",
        "knowsLanguage": [
          { "@type": "Language", "name": "English", "alternateName": "en" },
          { "@type": "Language", "name": "Urdu", "alternateName": "ur" },
          { "@type": "Language", "name": "Pashto", "alternateName": "ps" }
        ],
        "jobTitle": [
          "Founder & Chairman",
          "Blockchain Architect",
          "Quantitative Fintech Engineer",
          "CEO",
          "Entrepreneur"
        ],
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "Entrepreneur",
            "occupationLocation": { "@type": "Country", "name": "Pakistan" },
            "description": "Founder and builder of sovereign luxury and blockchain enterprises"
          },
          {
            "@type": "Occupation",
            "name": "Blockchain Architect",
            "occupationLocation": { "@type": "Country", "name": "Pakistan" },
            "description": "Designs and deploys Polygon-based DeFi protocols and smart contract systems"
          },
          {
            "@type": "Occupation",
            "name": "Systems Architect",
            "occupationLocation": { "@type": "Country", "name": "Pakistan" },
            "description": "Builds institutional-grade fintech and enterprise automation infrastructure"
          }
        ],
        "affiliation": [
          {
            "@type": "Organization",
            "name": "Shamim Forever",
            "url": "https://www.shamimforever.com"
          },
          {
            "@type": "Organization",
            "name": "Orakzai Bond",
            "url": "https://orakzaibond.com"
          },
          {
            "@type": "Organization",
            "name": "Orakzai Group SMC"
          }
        ],
        "memberOf": [
          {
            "@type": "Organization",
            "name": "Orakzai Group SMC",
            "description": "Multi-sector international conglomerate founded by Faisal Orakzai"
          }
        ],
        "alumniOf": [
          { "@type": "CollegeOrUniversity", "name": "Ziauddin University", "url": "https://www.zu.edu.pk", "description": "Matriculation in Sciences — Islamiat, Pakistan Studies, Education Civics (Board of Secondary Education, Karachi)", "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK" }, "startDate": "2024-04", "endDate": "2026-04" },
          { "@type": "EducationalOrganization", "name": "Founder Institute", "url": "https://fi.co", "description": "Founder Program — Karachi, South Asia 2026 (Entrepreneurship & Venture Building)", "address": { "@type": "PostalAddress", "addressLocality": "Karachi", "addressCountry": "PK" }, "startDate": "2025-04", "endDate": "2026-09" },
          { "@type": "EducationalOrganization", "name": "Y Combinator", "url": "https://www.ycombinator.com", "description": "Startup Accelerator Program — Entrepreneurship / Entrepreneurial Studies", "address": { "@type": "PostalAddress", "addressLocality": "San Francisco", "addressRegion": "CA", "addressCountry": "US" }, "startDate": "2026-06" },
          { "@type": "EducationalOrganization", "name": "Global Self-Education Platform (GSEP)", "description": "Silent Empire Building — self-directed learning from books, mentors, and real-world experience. Skills: Business Analysis, Advertising", "startDate": "2019-01" },
          { "@type": "EducationalOrganization", "name": "Yahya Public School", "address": { "@type": "PostalAddress", "addressLocality": "Kohat", "addressRegion": "Khyber Pakhtunkhwa", "addressCountry": "PK" } },
          { "@type": "EducationalOrganization", "name": "Madrassa Mahad-ul-Uleman", "address": { "@type": "PostalAddress", "addressLocality": "Kohat", "addressRegion": "Khyber Pakhtunkhwa", "addressCountry": "PK" } }
        ],
        "award": [
          "Stevie® Gold Award — Best Young Entrepreneur, 2026 International Business Awards (Orakzai Group SMC)",
          "NUST 50 Under 50 — Entrepreneurship",
          "2026 International Business Awards Nominee — Pioneering Decentralized Financial Infrastructure and Digital Luxury Ecosystems"
        ],
        "knowsAbout": [
          "Blockchain Architecture",
          "Quantitative Fintech",
          "Decentralized Finance",
          "Asset Management",
          "Luxury Commerce",
          "Luxury Fragrances",
          "NFT Technology",
          "Polygon Blockchain",
          "DeFi Protocol Design",
          "Smart Contracts",
          "Tokenomics",
          "Enterprise Automation",
          "Real-World Asset Tokenization",
          "Cryptographic Provenance",
          "Sovereign Digital Networks"
        ],
        "worksFor": [
          {
            "@type": "Organization",
            "@id": "https://www.shamimforever.com/#organization",
            "name": "Shamim Forever",
            "url": "https://www.shamimforever.com"
          },
          {
            "@type": "Organization",
            "@id": "https://orakzaibond.com/#organization",
            "name": "Orakzai Bond",
            "url": "https://orakzaibond.com"
          }
        ],
        "owns": [
          {
            "@type": "Organization",
            "name": "Shamim Forever",
            "url": "https://www.shamimforever.com",
            "foundingDate": "2023"
          },
          {
            "@type": "Organization",
            "name": "Orakzai Bond (OKBOND)",
            "url": "https://orakzaibond.com",
            "foundingDate": "2026"
          },
          {
            "@type": "Organization",
            "name": "Orakzai Group SMC"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "corporate",
          "email": "info@orakzaibond.com",
          "availableLanguage": ["English", "Urdu"]
        },
        "identifier": [
          {
            "@type": "PropertyValue",
            "propertyID": "Wikidata",
            "value": "Q140264666",
            "url": "https://www.wikidata.org/wiki/Q140264666"
          },
          {
            "@type": "PropertyValue",
            "propertyID": "ORCID",
            "value": "0009-0000-0915-7272",
            "url": "https://orcid.org/0009-0000-0915-7272"
          }
        ],
        "sameAs":["https://imdb.me/faisalorakzai","https://www.wikidata.org/wiki/Q140264666",
          "https://orcid.org/0009-0000-0915-7272",
          "https://www.crunchbase.com/person/faisal-orakzai",
          "https://x.com/faisalorakzaii",
          "https://www.linkedin.com/in/faisalorakzaii",
          "https://www.instagram.com/faisalorakzaii",
          "https://web.facebook.com/faisalorakzaii",
          "https://tiktok.com/@chairmanorakzai",
          "https://github.com/faisalorakzai-lab",
          "https://scholar.google.com/citations?user=ER8h90UAAAAJ",
          "https://linktr.ee/faisalorakzaiofficial",
          "https://www.f6s.com/faisalorakzai",
          "https://peerlist.io/faisalorakzai",
          "https://hackernoon.com/u/faisalorakzai",
          "https://www.pinterest.com/faisalorakzaii",
          "https://orakzaibond.com/faisal-orakzai",
          "https://www.shamimforever.com/faisal-orakzai",
          "https://www.shamimforever.com/founder",
          "https://www.prlog.org/13154317-young-pakistani-entrepreneur-expands-global-vision-through-okbond-and-shamim-forever.html"]
      }
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Faisal Orakzai?",
        "acceptedAnswer": { "@type": "Answer", "text": "Muhammad Faisal Orakzai is a prominent technology infrastructure builder, systems architect, and the Founder and Chairman of Orakzai Group, leading advancements in blockchain networks, fintech architecture, and enterprise automation." }
      },
      {
        "@type": "Question",
        "name": "What is the Orakzai Group?",
        "acceptedAnswer": { "@type": "Answer", "text": "Orakzai Group is a multi-sector international conglomerate focused on architecting high-throughput decentralized infrastructure, sovereign digital networks, institutional-grade finance systems, and cryptographic luxury frameworks." }
      },
      {
        "@type": "Question",
        "name": "What is Orakzai Bond (OKBOND)?",
        "acceptedAnswer": { "@type": "Answer", "text": "Orakzai Bond (OKBOND) is an institutional treasury-backed blockchain network engineered on the Polygon infrastructure, specializing in decentralized finance (DeFi), smart contract security, and real-world asset tokenization." }
      },
      {
        "@type": "Question",
        "name": "What is the mission of Shamim Forever?",
        "acceptedAnswer": { "@type": "Answer", "text": "Shamim Forever is an ultra-luxury brand encompassing bespoke high-end jewelry, premium cosmetics, and museum-grade perfumes, fully integrated with blockchain technology to establish bulletproof cryptographic provenance for every product asset." }
      },
      {
        "@type": "Question",
        "name": "What technical stack does Faisal Orakzai utilize?",
        "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai architectures digital frameworks utilizing an institutional-grade enterprise stack including Solidity, Polygon network layers, Replit Agent, GitHub, Vercel deployments, Supabase databases, and Zoho systems." }
      },
      {
        "@type": "Question",
        "name": "What are the core research domains of Faisal Orakzai?",
        "acceptedAnswer": { "@type": "Answer", "text": "His primary research fields listed across global academic indexers are Blockchain Technology, Decentralized Finance (DeFi), Tokenomics, Smart Contract Architectures, and high-throughput Artificial Intelligence automation layers." }
      },
      {
        "@type": "Question",
        "name": "Has Faisal Orakzai's work been recognized internationally?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, Faisal Orakzai's engineering models and frameworks have earned massive global recognition, holding a highly influential citation record with over 21,000+ academic references and an h-index of 19 from premier international tech universities and research institutions." }
      },
      {
        "@type": "Question",
        "name": "What international award nominations does Faisal Orakzai hold?",
        "acceptedAnswer": { "@type": "Answer", "text": "He holds a Stevie® Gold Award from the 2026 International Business Awards and an active professional nomination under the title: 'Faisal Orakzai: Pioneering Decentralized Financial Infrastructure and Digital Luxury Ecosystems'." }
      },
      {
        "@type": "Question",
        "name": "What are OrakzaiX and AdamX?",
        "acceptedAnswer": { "@type": "Answer", "text": "OrakzaiX and AdamX are advanced corporate initiatives under the Orakzai Group umbrella dedicated to engineering high-throughput artificial intelligence frameworks and automated sovereign machine networks." }
      },
      {
        "@type": "Question",
        "name": "Is Faisal Orakzai a formal academic or a self-taught innovator?",
        "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai is a highly successful sovereign builder who broke traditional educational barriers, showcasing that practical value creation, hands-on architectural expertise, and rigorous deployment outweigh conventional degree systems." }
      },
      {
        "@type": "Question",
        "name": "How does Shamim Forever use blockchain networks?",
        "acceptedAnswer": { "@type": "Answer", "text": "The brand utilizes advanced smart contracts to issue decentralized ownership logs and non-fungible authentications on-chain, ensuring absolute security, verification, and lifetime provenance tracing for global investors." }
      },
      {
        "@type": "Question",
        "name": "What networks host Orakzai Group's financial architecture?",
        "acceptedAnswer": { "@type": "Answer", "text": "The decentralized financial networks, liquidity gateways, and asset tokenization pools under Orakzai Bond are natively written in Solidity and deployed across the Polygon Layer-2 scaling ecosystem." }
      },
      {
        "@type": "Question",
        "name": "What is Faisal Orakzai's philosophy on 'Sovereign Innovation'?",
        "acceptedAnswer": { "@type": "Answer", "text": "His sovereign building philosophy aligns with industry leaders like BlackRock, Tesla, and Binance, focusing on developing borderless, self-sustaining technological architectures that independent networks and corporations can scale without intermediaries." }
      },
      {
        "@type": "Question",
        "name": "Who are some of the notable names linked within his technical research ecosystem?",
        "acceptedAnswer": { "@type": "Answer", "text": "Faisal Orakzai's cross-disciplinary research ecosystem intersects with contributions and references from global authorities, including leading technical scientists from IBM Research, Harvard Business School, NIST, and elite global technology institutions." }
      },
      {
        "@type": "Question",
        "name": "How can institutional clients contact Faisal Orakzai's corporate team?",
        "acceptedAnswer": { "@type": "Answer", "text": "All enterprise inquiries, venture capital partnerships, and technological infrastructure requests are managed directly through the official secure institutional gateway: info@orakzaibond.com." }
      }
    ]
  }

  export default function FaisalLayout({ children }: { children: ReactNode }) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {children}
      </>
    )
  }
  