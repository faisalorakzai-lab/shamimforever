import type { ReactNode } from 'react'

  const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.shamimforever.com/faisal-orakzai#profilepage",
      "url": "https://www.shamimforever.com/faisal-orakzai",
      "name": "Faisal Orakzai — Founder & Chairman, Shamim Forever",
      "description": "Official profile of Faisal Orakzai, Founder & Chairman of Shamim Forever and Orakzai Bond (OKBOND). Pakistani blockchain entrepreneur born 30 April 2006.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://shamimforever.com/#website"
      },
      "about": {
        "@id": "https://www.wikidata.org/wiki/Q140264666"
      },
      "mainEntity": {
        "@id": "https://www.wikidata.org/wiki/Q140264666"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.shamimforever.com/founder-faisal-orakzai.jpg",
        "width": 800,
        "height": 800,
        "caption": "Faisal Orakzai — Founder, Shamim Forever"
      },
      "datePublished": "2024-01-01",
      "dateModified": "2026-06-25",
      "inLanguage": "en",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.shamimforever.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Faisal Orakzai",
            "item": "https://www.shamimforever.com/faisal-orakzai"
          }
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
        "Faisal Moeen Orakzai",
        "faisalorakzaii"
      ],
      "description": "Faisal Orakzai (born 30 April 2006) is a Pakistani entrepreneur, blockchain architect, and the Founder & Chairman of Shamim Forever luxury house and Orakzai Bond (OKBOND) DeFi protocol. He specialises in luxury commerce, decentralised finance, and quantitative fintech.",
      "url": "https://www.shamimforever.com/faisal-orakzai",
      "mainEntityOfPage": "https://www.shamimforever.com/faisal-orakzai",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.shamimforever.com/founder-faisal-orakzai.jpg",
        "width": 800,
        "height": 800,
        "caption": "Faisal Orakzai — Founder & Chairman, Shamim Forever & Orakzai Bond"
      },
      "birthDate": "2006-04-30",
      "birthPlace": {
        "@type": "Place",
        "name": "Pakistan",
        "addressCountry": "PK"
      },
      "nationality": {
        "@type": "Country",
        "name": "Pakistan"
      },
      "jobTitle": [
        "Founder & Chairman",
        "Blockchain Architect",
        "Quantitative Fintech Engineer",
        "CEO"
      ],
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "National University of Sciences and Technology (NUST)",
        "url": "https://nust.edu.pk"
      },
      "award": "NUST 50 Under 50 — Entrepreneurship",
      "knowsAbout": [
        "Blockchain Architecture",
        "Quantitative Fintech",
        "Decentralized Finance",
        "Luxury Commerce",
        "NFT Technology",
        "Polygon Blockchain",
        "DeFi Protocol Design",
        "Smart Contracts"
      ],
      "worksFor": [
        {
          "@type": "Organization",
          "@id": "https://www.shamimforever.com/#organization",
          "name": "Shamim Forever"
        },
        {
          "@type": "Organization",
          "@id": "https://orakzaibond.com/#organization",
          "name": "Orakzai Bond"
        }
      ],
      "owns": [
        {
          "@type": "Organization",
          "name": "Shamim Forever",
          "url": "https://www.shamimforever.com"
        },
        {
          "@type": "Organization",
          "name": "Orakzai Bond (OKBOND)",
          "url": "https://orakzaibond.com"
        }
      ],
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
      "sameAs": [
        "https://www.wikidata.org/wiki/Q140264666",
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
        "https://orakzaibond.com/founder",
        "https://www.shamimforever.com/faisal-orakzai",
        "https://www.shamimforever.com/founder"
      ]
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
        {children}
      </>
    )
  }
  