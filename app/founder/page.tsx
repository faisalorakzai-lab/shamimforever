import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Faisal Orakzai — Founder & Chairman | Shamim Forever',
  description: 'Faisal Orakzai, Founder & Chairman of Shamim Forever, Orakzai Group, and Orakzai Bond. Entrepreneur specializing in blockchain architecture, luxury commerce, and decentralized finance. Based in Pakistan, building global luxury brands.',
  keywords: [
    'Faisal Orakzai', 'founder', 'entrepreneur', 'blockchain', 'luxury commerce',
    'Orakzai Group', 'Orakzai Bond', 'Shamim Forever founder', 'Pakistani entrepreneur',
    'fintech', 'decentralized finance', 'luxury brands', 'chairman',
  ],
  authors: [{ name: 'Shamim Forever', url: 'https://shamimforever.com' }],
  openGraph: {
    title: 'Faisal Orakzai — Founder & Chairman | Shamim Forever',
    description: 'Entrepreneur specializing in blockchain architecture, luxury commerce, and decentralized finance.',
    type: 'profile',
    url: 'https://shamimforever.com/founder',
    images: [{ url: '/founder-3.png', width: 512, height: 512, alt: 'Faisal Orakzai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faisal Orakzai — Founder & Chairman',
    description: 'Entrepreneur & Visionary. Blockchain • Luxury Commerce • DeFi',
    images: ['/founder-3.png'],
  },
}

const founderJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.shamimforever.com/founder#faisal-orakzai',
  name: 'Faisal Orakzai',
  alternateName: ['Chairman Faisal Orakzai', 'Malak Faisal Orakzai', 'Faisal Moeen Orakzai'],
  description: 'Founder & Chairman of Shamim Forever, Orakzai Group, and Orakzai Bond. Entrepreneur specializing in blockchain architecture, luxury commerce, and decentralized finance.',
  url: 'https://www.shamimforever.com/founder',
  image: 'https://www.shamimforever.com/founder-3.png',
  birthDate: '2006-04-30',
  birthPlace: {
    '@type': 'Place',
    name: 'Pakistan',
  },
  jobTitle: ['Founder & Chairman', 'Entrepreneur', 'Blockchain Architect'],
  worksFor: [
    {
      '@type': 'Organization',
      '@id': 'https://www.shamimforever.com/#organization',
      name: 'Shamim Forever',
      url: 'https://www.shamimforever.com',
    },
    {
      '@type': 'Organization',
      name: 'Orakzai Group',
    },
    {
      '@type': 'Organization',
      name: 'Orakzai Bond',
    },
  ],
  knowsAbout: [
    'Blockchain Architecture',
    'Quantitative Fintech',
    'Decentralized Finance',
    'Asset Management',
    'Luxury Commerce',
    'Luxury Fragrances',
    'Digital Fashion',
    'NFT Technology',
    'Cryptocurrency',
    'Entrepreneurship',
  ],
  sameAs: [
    'https://www.wikidata.org/wiki/Q140264666',
    'https://www.crunchbase.com/person/faisal-orakzai',
    'https://x.com/faisalorakzaii',
    'https://www.linkedin.com/in/faisalorakzaii',
    'https://www.instagram.com/faisalorakzaii',
    'https://web.facebook.com/faisalorakzaii',
    'https://tiktok.com/@chairmanorakzai',
    'https://github.com/faisalorakzai-lab',
    'https://scholar.google.com/citations?user=ER8h90UAAAAJ',
    'https://linktr.ee/faisalorakzaiofficial',
  ],
  award: [
    'NUST 50 Under 50 — Entrepreneurship',
    'Emerging Entrepreneur Award',
  ],
  affiliation: [
    {
      '@type': 'Organization',
      name: 'NUST (National University of Sciences & Technology)',
    },
    {
      '@type': 'Organization',
      name: 'Ziauddin University Karachi',
    },
  ],
}

export default function FounderPage() {
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderJsonLd) }}
      />

      <main className="min-h-screen bg-[#050505] text-zinc-200">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-5 md:px-12 lg:px-20">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="flex justify-center md:justify-start">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a054]/20 to-transparent rounded-lg blur-3xl" />
                  <img
                    src="/founder-3.png"
                    alt="Faisal Orakzai — Founder & Chairman"
                    className="relative w-full h-auto rounded-lg shadow-2xl"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <p className="text-[#c9a054] text-sm tracking-[0.3em] uppercase mb-3">
                    Founder & Chairman
                  </p>
                  <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
                    Faisal Orakzai
                  </h1>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Visionary entrepreneur specializing in blockchain architecture, luxury commerce, and decentralized finance. Building sovereign digital houses that redefine luxury for the next generation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 py-6 border-y border-[#1a1a1a]">
                  <div>
                    <p className="text-[#c9a054] text-sm tracking-[0.2em] uppercase mb-1">
                      Born
                    </p>
                    <p className="text-zinc-300">April 30, 2006</p>
                  </div>
                  <div>
                    <p className="text-[#c9a054] text-sm tracking-[0.2em] uppercase mb-1">
                      Based
                    </p>
                    <p className="text-zinc-300">Pakistan • Global</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link
                    href="https://www.linkedin.com/in/faisalorakzaii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 border border-[#c9a054]/50 text-[#c9a054] hover:bg-[#c9a054] hover:text-[#050505] transition-all duration-300 text-sm tracking-[0.2em] uppercase"
                  >
                    LinkedIn
                  </Link>
                  <Link
                    href="https://x.com/faisalorakzaii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 border border-[#c9a054]/50 text-[#c9a054] hover:bg-[#c9a054] hover:text-[#050505] transition-all duration-300 text-sm tracking-[0.2em] uppercase"
                  >
                    X (Twitter)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-5 md:px-12 lg:px-20 bg-[#0a0a0a]">
          <div className="max-w-[1000px] mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-light tracking-tight mb-6">
                About Faisal
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Faisal Orakzai is a visionary entrepreneur and blockchain architect who has dedicated his career to building innovative digital solutions that bridge luxury commerce with decentralized finance. Born in 2006, he represents a new generation of Pakistani entrepreneurs reshaping global luxury markets.
                </p>
                <p>
                  As the Founder & Chairman of Shamim Forever, Faisal has created a sovereign digital luxury house that combines heritage craftsmanship with cutting-edge blockchain technology. His vision extends beyond traditional e-commerce, establishing new paradigms for luxury authentication, ownership, and community engagement through NFTs and tokenomics.
                </p>
                <p>
                  Beyond Shamim Forever, Faisal leads Orakzai Group and Orakzai Bond, ventures focused on quantitative fintech and decentralized asset management. His work in blockchain architecture has earned recognition from leading institutions and been cited in academic research on tokenomics and DeFi protocols.
                </p>
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h3 className="text-2xl font-light tracking-tight mb-6">
                Areas of Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Blockchain Architecture',
                  'Decentralized Finance (DeFi)',
                  'Luxury Commerce',
                  'Tokenomics & Asset Design',
                  'Quantitative Fintech',
                  'NFT Technology',
                  'Digital Fashion',
                  'Entrepreneurship',
                ].map(expertise => (
                  <div
                    key={expertise}
                    className="p-4 border border-[#1a1a1a] rounded hover:border-[#c9a054]/30 transition-colors"
                  >
                    <p className="text-zinc-300">{expertise}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ventures */}
            <div>
              <h3 className="text-2xl font-light tracking-tight mb-6">
                Ventures & Organizations
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: 'Shamim Forever',
                    description: 'Sovereign digital luxury house. Bespoke fragrances, high jewellery, and blockchain-verified couture collections.',
                    url: 'https://shamimforever.com',
                  },
                  {
                    name: 'Orakzai Group',
                    description: 'Strategic holding company focused on digital innovation and luxury commerce ventures.',
                  },
                  {
                    name: 'Orakzai Bond',
                    description: 'Decentralized finance platform specializing in asset tokenization and quantitative trading.',
                  },
                ].map(venture => (
                  <div key={venture.name} className="p-6 border border-[#1a1a1a] rounded">
                    <h4 className="text-lg font-medium text-zinc-100 mb-2">
                      {venture.url ? (
                        <Link href={venture.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a054] transition-colors">
                          {venture.name}
                        </Link>
                      ) : (
                        venture.name
                      )}
                    </h4>
                    <p className="text-zinc-400">{venture.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recognition */}
            <div>
              <h3 className="text-2xl font-light tracking-tight mb-6">
                Recognition & Affiliations
              </h3>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a054] mt-1">→</span>
                  <span>NUST 50 Under 50 — Entrepreneurship Award</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a054] mt-1">→</span>
                  <span>Ziauddin University Karachi — Blockchain Research</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a054] mt-1">→</span>
                  <span>Google Scholar — Cited in 67+ Academic Publications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a054] mt-1">→</span>
                  <span>Crunchbase Profile — Emerging Entrepreneur</span>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="pt-8 border-t border-[#1a1a1a]">
              <h3 className="text-2xl font-light tracking-tight mb-6">
                Connect with Faisal
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/faisalorakzaii' },
                  { label: 'X (Twitter)', url: 'https://x.com/faisalorakzaii' },
                  { label: 'Instagram', url: 'https://www.instagram.com/faisalorakzaii' },
                  { label: 'GitHub', url: 'https://github.com/faisalorakzai-lab' },
                ].map(social => (
                  <Link
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-[#1a1a1a] rounded text-center text-sm text-zinc-400 hover:text-[#c9a054] hover:border-[#c9a054]/30 transition-colors"
                  >
                    {social.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
