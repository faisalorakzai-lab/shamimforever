import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Shamim Forever — Sovereign Luxury House',
  description: 'Shamim Forever is a global luxury digital house offering bespoke fragrances, sovereign jewellery, and blockchain-verified couture collections. Founded in 2024 by Faisal Orakzai. Based in Pakistan, serving worldwide.',
  keywords: [
    'about shamim forever', 'luxury brand', 'bespoke fragrances', 'luxury jewellery',
    'blockchain luxury', 'sovereign luxury', 'luxury house', 'couture',
    'shamim forever story', 'luxury brand pakistan',
  ],
  openGraph: {
    title: 'About Shamim Forever — Sovereign Luxury House',
    description: 'A global luxury digital house offering bespoke fragrances, sovereign jewellery, and blockchain-verified couture collections.',
    type: 'website',
    url: 'https://www.shamimforever.com/about',
    images: [{ url: '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Shamim Forever',
    description: 'Sovereign Luxury. Eternally Remembered.',
    images: ['/logo-sf.png'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.shamimforever.com/about#organization',
  name: 'Shamim Forever',
  alternateName: ['Shamim Forever House', 'SF Luxury', 'Shamim Forever — Sovereign Luxury House'],
  url: 'https://www.shamimforever.com',
  logo: 'https://www.shamimforever.com/logo-sf.png',
  image: 'https://www.shamimforever.com/logo-sf.png',
  description: 'Shamim Forever is a sovereign luxury digital house offering bespoke fragrances, high jewellery, and couture collections. Blockchain-verified authenticity. Based in Pakistan, shipping worldwide.',
  foundingDate: '2024',
  foundingLocation: {
    '@type': 'Place',
    name: 'Karachi, Pakistan',
  },
  founder: {
    '@type': 'Person',
    '@id': 'https://www.shamimforever.com/founder#faisal-orakzai',
    name: 'Faisal Orakzai',
    url: 'https://www.shamimforever.com/founder',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
    addressLocality: 'Karachi',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'concierge@shamimf.com',
    url: 'https://www.shamimforever.com/concierge',
    availableLanguage: ['English', 'Urdu'],
  },
  sameAs: [
    'https://www.instagram.com/shamimforever',
    'https://x.com/shamimforever',
    'https://www.facebook.com/shamimforever',
    'https://tiktok.com/@shamimforever',
  ],
  knowsAbout: [
    'Bespoke Fragrances',
    'Luxury Jewellery',
    'Couture Fashion',
    'Blockchain Technology',
    'NFT Collectibles',
    'Luxury Authentication',
    'Oud Perfumery',
    'Taif Rose',
  ],
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  brand: {
    '@type': 'Brand',
    name: 'Shamim Forever',
    slogan: 'Sovereign Luxury. Eternally Remembered.',
  },
}

export default function AboutPage() {
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <main className="min-h-screen bg-[#050505] text-zinc-200">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-5 md:px-12 lg:px-20">
          <div className="max-w-[1000px] mx-auto text-center space-y-6">
            <p className="text-[#c9a054] text-sm tracking-[0.3em] uppercase">
              Our Story
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              Shamim Forever
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              A sovereign digital luxury house. Built from love. Forged into legacy.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-5 md:px-12 lg:px-20 bg-[#0a0a0a]">
          <div className="max-w-[1000px] mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-light tracking-tight mb-6">
                Our Mission
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Shamim Forever exists to architect identity through luxury. We do not make products. We create cultural sovereignty—distillations of heritage, ambition, and quiet power. Each creation carries the weight of intention, the precision of craft, and the permanence of legacy.
              </p>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-2xl font-light tracking-tight mb-8">
                Our Values
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Sovereignty',
                    description: 'We celebrate cultural independence and individual expression. Every creation is an act of personal sovereignty.',
                  },
                  {
                    title: 'Authenticity',
                    description: 'Blockchain-verified. Cryptographically immutable. Every piece carries proof of its truth and provenance.',
                  },
                  {
                    title: 'Heritage',
                    description: 'We honor centuries of craftsmanship—from Taif roses to Assam oud—while embracing the future.',
                  },
                  {
                    title: 'Legacy',
                    description: 'Built to last generations. Designed for heirlooms. Engineered for permanence, not trend.',
                  },
                ].map(value => (
                  <div key={value.title} className="p-6 border border-[#1a1a1a] rounded">
                    <h4 className="text-lg font-medium text-[#c9a054] mb-3">
                      {value.title}
                    </h4>
                    <p className="text-zinc-400">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section className="py-20 px-5 md:px-12 lg:px-20">
          <div className="max-w-[1000px] mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-light tracking-tight mb-6">
                What We Create
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Bespoke Fragrances',
                    description: 'Extrait de Parfum. Taif rose absolute. Assam oud. Each scent is engineered for permanence.',
                    icon: '🌹',
                  },
                  {
                    title: 'Sovereign Jewellery',
                    description: 'High jewellery and couture pieces. Blockchain-verified authenticity. Designed for heirlooms.',
                    icon: '💎',
                  },
                  {
                    title: 'Couture Collections',
                    description: 'Rare cosmetics and luxury fashion. Limited editions. Bespoke commissions. Inner Circle exclusives.',
                    icon: '✨',
                  },
                ].map(item => (
                  <div key={item.title} className="space-y-3">
                    <p className="text-3xl">{item.icon}</p>
                    <h4 className="text-lg font-medium text-zinc-100">
                      {item.title}
                    </h4>
                    <p className="text-zinc-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-20 px-5 md:px-12 lg:px-20 bg-[#0a0a0a]">
          <div className="max-w-[1000px] mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-light tracking-tight mb-6">
                Global Presence
              </h2>
              <p className="text-zinc-400 mb-8">
                Based in Pakistan. Serving the world. With boutiques and concierge services across 10 global locations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { city: 'Karachi', locations: ['Tariq Road', 'Clifton'] },
                  { city: 'Lahore', locations: ['DHA Phase 6'] },
                  { city: 'Islamabad', locations: ['DHA Phase II'] },
                  { city: 'Peshawar', locations: ['Ring Road'] },
                  { city: 'Dubai', locations: ['The Dubai Mall'] },
                  { city: 'London', locations: ['New Bond Street'] },
                  { city: 'Paris', locations: ['Place Vendôme'] },
                  { city: 'New York', locations: ['Fifth Avenue'] },
                  { city: 'Riyadh', locations: ['VIA District'] },
                ].map(location => (
                  <div key={location.city} className="p-4 border border-[#1a1a1a] rounded">
                    <p className="font-medium text-zinc-100 mb-2">{location.city}</p>
                    <ul className="space-y-1 text-sm text-zinc-400">
                      {location.locations.map(loc => (
                        <li key={loc}>• {loc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 px-5 md:px-12 lg:px-20">
          <div className="max-w-[1000px] mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-light tracking-tight mb-6">
                Technology & Innovation
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Blockchain Verified',
                    description: 'Each creation carries a unique cryptographic signature—immutable proof of authenticity and provenance.',
                  },
                  {
                    title: 'NFT Collectibles',
                    description: 'Exclusive digital collectibles. Ownership verified on blockchain. Tradeable across Web3 ecosystems.',
                  },
                  {
                    title: 'OKBOND Protocol',
                    description: 'Our proprietary loyalty currency. Pay with OKBOND and receive automatic 10% sovereign discount.',
                  },
                  {
                    title: 'Sovereign Vault',
                    description: 'Inner Circle members gain access to exclusive drops, private viewings, and bespoke commissions.',
                  },
                ].map(tech => (
                  <div key={tech.title} className="p-6 border border-[#1a1a1a] rounded">
                    <h4 className="text-lg font-medium text-[#c9a054] mb-3">
                      {tech.title}
                    </h4>
                    <p className="text-zinc-400">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-5 md:px-12 lg:px-20 bg-[#0a0a0a]">
          <div className="max-w-[1000px] mx-auto text-center space-y-8">
            <h2 className="text-3xl font-light tracking-tight">
              Join the Inner Circle
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Gain sovereign access to limited editions, boutique opening invitations, private viewings, and bespoke concierge service across 10 global locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inner-circle"
                className="px-8 py-3 bg-[#c9a054] text-[#050505] font-medium tracking-[0.2em] uppercase hover:bg-[#d4b86b] transition-colors"
              >
                Request Access
              </Link>
              <Link
                href="/concierge"
                className="px-8 py-3 border border-[#c9a054] text-[#c9a054] font-medium tracking-[0.2em] uppercase hover:bg-[#c9a054] hover:text-[#050505] transition-colors"
              >
                Contact Concierge
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
