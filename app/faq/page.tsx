import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '50 Questions & Answers — Shamim Forever',
  description: 'Explore 50 official answers about Shamim Forever, including the House, craftsmanship, authenticity, Digital Passports, Inner Circle, OKBOND, concierge care, and the future of sovereign luxury.',
  alternates: { canonical: 'https://www.shamimforever.com/faq' },
  keywords: ['Shamim Forever FAQ', 'Sovereign Luxury House', 'Shamim Forever authenticity', 'Digital Passport', 'Inner Circle', 'OKBOND', 'luxury fragrances', 'luxury jewellery', 'bespoke luxury'],
  openGraph: {
    title: '50 Questions & Answers — Shamim Forever',
    description: 'Official answers about the Shamim Forever House, products, authenticity, technology, membership, care, and long-term luxury vision.',
    type: 'website',
    url: 'https://www.shamimforever.com/faq',
    images: [{ url: '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever' }],
  },
  twitter: { card: 'summary_large_image', title: '50 Questions & Answers — Shamim Forever', description: 'Official answers for Shamim Forever clients, collectors, and members.', images: ['/logo-sf.png'] },
}

type FAQItem = { number: number; question: string; answer: string }
type FAQSection = { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    "title": "THE HOUSE",
    "items": [
      {
        "number": 1,
        "question": "What is Shamim Forever?",
        "answer": "Shamim Forever is a Sovereign Luxury House focused on timeless craftsmanship, luxury fragrances, jewelry, cosmetics, couture, bespoke experiences, and emerging technologies."
      },
      {
        "number": 2,
        "question": "What is the official tagline of Shamim Forever?",
        "answer": "Built From Love. Forged Into Legacy."
      },
      {
        "number": 3,
        "question": "When was Shamim Forever founded?",
        "answer": "Shamim Forever was established in 2023."
      },
      {
        "number": 4,
        "question": "Who founded Shamim Forever?",
        "answer": "Shamim Forever was founded by Faisal Orakzai, the Founder and Chairman of the House."
      },
      {
        "number": 5,
        "question": "What is Shamim Forever's philosophy?",
        "answer": "Shamim Forever believes that true luxury should be built for permanence rather than temporary trends. The House focuses on craftsmanship, identity, heritage, authenticity, and enduring legacy."
      },
      {
        "number": 6,
        "question": "What products does Shamim Forever offer?",
        "answer": "The Shamim Forever ecosystem explores luxury fragrances, jewelry, cosmetics, couture, bespoke creations, and exclusive lifestyle experiences."
      },
      {
        "number": 7,
        "question": "What makes Shamim Forever different?",
        "answer": "Shamim Forever combines luxury craftsmanship with emerging technologies such as digital identity, blockchain-based provenance, authentication, and Digital Passports."
      },
      {
        "number": 8,
        "question": "What is a Sovereign Luxury House?",
        "answer": "A Sovereign Luxury House is a luxury brand built around independent identity, craftsmanship, heritage, ownership, authenticity, and long-term legacy."
      },
      {
        "number": 9,
        "question": "Does Shamim Forever create luxury fragrances?",
        "answer": "Yes. Shamim Forever explores premium fragrance creations designed around craftsmanship, materials, individuality, and lasting identity."
      },
      {
        "number": 10,
        "question": "What is the Shamim Forever Atelier?",
        "answer": "The Atelier represents the creative and craftsmanship environment where Shamim Forever concepts, materials, designs, and luxury creations are developed."
      }
    ]
  },
  {
    "title": "AUTHENTICITY & TECHNOLOGY",
    "items": [
      {
        "number": 11,
        "question": "Does Shamim Forever use blockchain technology?",
        "answer": "Shamim Forever explores blockchain technology for product provenance, digital identity, authentication, ownership records, and long-term archival systems. Shamim Forever +1"
      },
      {
        "number": 12,
        "question": "What is a Shamim Forever Digital Passport?",
        "answer": "A Digital Passport is a digital record designed to help document a creation's identity, provenance, authenticity, and ownership history."
      },
      {
        "number": 13,
        "question": "How can customers verify authenticity?",
        "answer": "Verification may involve unique product identifiers, Digital Passports, cryptographic records, NFC technology, and other authentication systems developed by the House."
      },
      {
        "number": 14,
        "question": "What is blockchain provenance?",
        "answer": "Blockchain provenance refers to using distributed ledger technology to create a verifiable record of a product's origin and history."
      },
      {
        "number": 15,
        "question": "Why does luxury need digital authentication?",
        "answer": "Digital authentication can help customers verify product identity, improve transparency, support provenance, and reduce the risks associated with counterfeit products."
      },
      {
        "number": 16,
        "question": "Can Shamim Forever products have a digital ownership record?",
        "answer": "Selected creations may be connected with digital records designed to document provenance and ownership history."
      },
      {
        "number": 17,
        "question": "What is the Digital Heritage Vault?",
        "answer": "The Digital Heritage Vault is Shamim Forever's concept for preserving and cataloguing the history, identity, and provenance of selected creations."
      },
      {
        "number": 18,
        "question": "Does Shamim Forever support product provenance?",
        "answer": "Yes. Product provenance and authenticity are central concepts within Shamim Forever's technology and luxury vision."
      },
      {
        "number": 19,
        "question": "What is a cryptographic signature?",
        "answer": "A cryptographic signature is a mathematical verification mechanism that can help confirm the integrity and authenticity of digital information."
      },
      {
        "number": 20,
        "question": "Can blockchain eliminate counterfeit products?",
        "answer": "No technology can guarantee the complete elimination of counterfeiting. However, strong authentication and provenance systems can make verification more transparent and significantly improve product traceability."
      }
    ]
  },
  {
    "title": "PRODUCTS & CRAFTSMANSHIP",
    "items": [
      {
        "number": 21,
        "question": "Are Shamim Forever products mass-produced?",
        "answer": "The House's philosophy emphasizes craftsmanship, controlled production, quality standards, and exclusivity rather than mass-market production."
      },
      {
        "number": 22,
        "question": "What materials inspire Shamim Forever creations?",
        "answer": "Shamim Forever's luxury philosophy includes premium materials associated with fragrance, precious metals, jewelry, couture, and high-end craftsmanship."
      },
      {
        "number": 23,
        "question": "Does Shamim Forever offer jewelry?",
        "answer": "Shamim Forever explores luxury jewelry and collectible creations designed around craftsmanship, identity, and long-term value."
      },
      {
        "number": 24,
        "question": "Does Shamim Forever offer cosmetics?",
        "answer": "Shamim Forever includes premium cosmetics and beauty concepts within its broader luxury ecosystem."
      },
      {
        "number": 25,
        "question": "Does Shamim Forever offer couture?",
        "answer": "The House explores haute couture and bespoke fashion concepts as part of its sovereign luxury vision."
      },
      {
        "number": 26,
        "question": "What is bespoke luxury?",
        "answer": "Bespoke luxury refers to a personalized creation designed or customized for an individual client."
      },
      {
        "number": 27,
        "question": "Can customers request bespoke creations?",
        "answer": "Selected clients and members may have access to bespoke commissions and personalized luxury experiences, subject to availability and approval."
      },
      {
        "number": 28,
        "question": "What does \"Forever\" represent?",
        "answer": "Forever represents the House's commitment to permanence, heritage, memory, identity, and creations designed to transcend temporary trends."
      }
    ]
  },
  {
    "title": "INNER CIRCLE",
    "items": [
      {
        "number": 29,
        "question": "What is the Shamim Forever Inner Circle?",
        "answer": "The Inner Circle is a private membership concept designed to provide selected members with access to exclusive experiences, private previews, limited releases, concierge services, and bespoke opportunities."
      },
      {
        "number": 30,
        "question": "How can I join the Inner Circle?",
        "answer": "Interested individuals may submit an application through the official Shamim Forever platform, subject to the House's membership process."
      },
      {
        "number": 31,
        "question": "What benefits does the Inner Circle offer?",
        "answer": "Benefits may include early access, private previews, concierge support, bespoke opportunities, exclusive releases, and access to selected House experiences."
      },
      {
        "number": 32,
        "question": "Is Inner Circle membership open to everyone?",
        "answer": "Applications may be available publicly, while access and membership may remain subject to review and approval."
      },
      {
        "number": 33,
        "question": "What is Sovereign Concierge?",
        "answer": "Sovereign Concierge is Shamim Forever's premium assistance concept for private appointments, bespoke requests, gifting, product inquiries, and luxury client services."
      }
    ]
  },
  {
    "title": "OKBOND",
    "items": [
      {
        "number": 34,
        "question": "What is OKBOND?",
        "answer": "OKBOND is a digital loyalty and technology concept associated with the broader sovereign ecosystem surrounding Shamim Forever."
      },
      {
        "number": 35,
        "question": "Can I pay with OKBOND?",
        "answer": "Availability of OKBOND payments depends on the relevant platform, product, jurisdiction, technical implementation, and applicable requirements."
      },
      {
        "number": 36,
        "question": "Is OKBOND an investment?",
        "answer": "Users should not assume that OKBOND or any digital asset is an investment without independently reviewing official documentation, risks, legal requirements, and applicable regulations."
      },
      {
        "number": 37,
        "question": "Is cryptocurrency accepted by Shamim Forever?",
        "answer": "Available payment methods may vary by location, platform, product, and applicable regulations. Customers should check official payment information before making a purchase."
      }
    ]
  },
  {
    "title": "BRAND & LEGACY",
    "items": [
      {
        "number": 38,
        "question": "What does \"Built From Love. Forged Into Legacy.\" mean?",
        "answer": "The statement represents the emotional foundation and long-term ambition of Shamim Forever: transforming meaning, memory, craftsmanship, and identity into an enduring legacy."
      },
      {
        "number": 39,
        "question": "Is Shamim Forever only a fragrance brand?",
        "answer": "No. Shamim Forever is positioned as a broader Sovereign Luxury House exploring fragrances, jewelry, cosmetics, couture, bespoke services, and technology-driven luxury experiences."
      },
      {
        "number": 40,
        "question": "What is the long-term vision of Shamim Forever?",
        "answer": "The long-term vision is to build an internationally recognized luxury house that connects craftsmanship, heritage, technology, authenticity, and enduring brand identity."
      },
      {
        "number": 41,
        "question": "Does Shamim Forever plan international expansion?",
        "answer": "The House presents a long-term international vision and explores future boutique and luxury experience opportunities across major markets. Planned locations and availability remain subject to development."
      },
      {
        "number": 42,
        "question": "Where can I find official Shamim Forever information?",
        "answer": "Official information is available through the Shamim Forever website and official communication channels. Shamim Forever Official Website⁠"
      }
    ]
  },
  {
    "title": "CUSTOMER SERVICE & CARE",
    "items": [
      {
        "number": 43,
        "question": "Does Shamim Forever offer product care?",
        "answer": "Shamim Forever presents a Sovereign Concierge and Care concept focused on preservation, restoration, refill services, and long-term product care."
      },
      {
        "number": 44,
        "question": "Can luxury fragrances be refilled?",
        "answer": "Refill availability depends on the specific product, collection, formulation, and service policies applicable to that creation."
      },
      {
        "number": 45,
        "question": "How do I contact Shamim Forever?",
        "answer": "Customers can contact Shamim Forever through the official website and designated House communication channels."
      },
      {
        "number": 46,
        "question": "Does Shamim Forever provide bespoke customer service?",
        "answer": "Yes. The brand's luxury model includes personalized and concierge-oriented service concepts for selected products and experiences."
      }
    ]
  },
  {
    "title": "FUTURE & INNOVATION",
    "items": [
      {
        "number": 47,
        "question": "How does Shamim Forever combine luxury and technology?",
        "answer": "Shamim Forever explores the intersection of traditional craftsmanship and modern technology through digital identity, authentication, provenance, blockchain, and digital archives."
      },
      {
        "number": 48,
        "question": "What is the future of luxury according to Shamim Forever?",
        "answer": "The House believes the future of luxury will increasingly combine physical craftsmanship with verifiable identity, provenance, personalization, technology, and long-term ownership."
      },
      {
        "number": 49,
        "question": "Is Shamim Forever building a digital luxury ecosystem?",
        "answer": "Shamim Forever is exploring a connected luxury ecosystem involving products, digital identity, authentication, provenance, membership, concierge experiences, and emerging technology."
      },
      {
        "number": 50,
        "question": "What is the ultimate mission of Shamim Forever?",
        "answer": "The ultimate mission of Shamim Forever is to build a lasting luxury legacy where craftsmanship, identity, heritage, technology, and human meaning come together under one enduring House."
      }
    ]
  }
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://www.shamimforever.com/faq#faq',
  name: 'Shamim Forever — 50 Questions & Answers',
  mainEntity: sections.flatMap((section) => section.items).map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-5 py-28 text-zinc-200 md:px-12 lg:px-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-5xl">
        <header className="mb-16 max-w-3xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">Client Care & House Knowledge</p>
          <h1 className="mb-6 font-serif text-5xl font-light tracking-[0.04em] text-zinc-100 md:text-7xl">50 Questions & Answers</h1>
          <p className="max-w-2xl text-base leading-8 text-zinc-500 md:text-lg">
            Official answers about Shamim Forever — a Sovereign Luxury House focused on craftsmanship, identity, authenticity, heritage, and enduring legacy.
          </p>
        </header>

        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.title} aria-labelledby={section.title.replaceAll(' ', '-').toLowerCase()}>
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#24201a] pb-3">
                <h2 id={section.title.replaceAll(' ', '-').toLowerCase()} className="text-xs uppercase tracking-[0.35em] text-[#c9a054]">{section.title}</h2>
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-700">{section.items.length} answers</span>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <details key={item.number} className="group border border-[#1d1b18] bg-[#080808] transition-colors open:border-[#594a2e]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-sm leading-6 text-zinc-300 marker:hidden md:px-6">
                      <span><span className="mr-3 text-[10px] tracking-[0.2em] text-[#806535]">{String(item.number).padStart(2, '0')}</span>{item.question}</span>
                      <span aria-hidden="true" className="shrink-0 text-xl font-light text-[#c9a054] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="border-t border-[#1d1b18] px-5 pb-6 pt-4 md:px-6">
                      <p className="max-w-3xl text-sm leading-8 text-zinc-500">{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-[#24201a] pt-8 text-center text-[10px] uppercase tracking-[0.25em] text-zinc-600">
          Further enquiries: concierge@shamimforever.com
        </footer>
      </div>
    </main>
  )
}
