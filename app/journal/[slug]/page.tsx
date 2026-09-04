import { Metadata } from 'next'
import ArticleClient from './ArticleClient'

const BASE = 'https://www.shamimforever.com'

type ArticleMeta = {
  title: string; description: string; image: string
  category: string; date: string; keywords: string[]
  faq: { q: string; a: string }[]
}

const ARTICLE_META: Record<string, ArticleMeta> = {
  'founders-vision': {
    title: "The Founder's Vision: Why Shamim Forever Was Created",
    description: "Discover the story behind Shamim Forever — a luxury house built on timeless craftsmanship, authentic curation, and a founder's vision to create a lasting legacy beyond products.",
    image: `${BASE}/faisal-orakzai-smiling.jpg`,
    category: 'Vision', date: '2025-06-01',
    keywords: ['Shamim Forever founder', 'Shamim Forever vision', 'Orakzai founder', 'OKBOND loyalty', 'luxury house legacy', 'Shamim Forever story', 'luxury brand Pakistan'],
    faq: [
      { q: 'What is Shamim Forever?', a: 'Shamim Forever is a luxury house that combines timeless craftsmanship, curated fragrances, fine jewelry, and digital innovation to create lasting luxury experiences and generational value.' },
      { q: 'What is the OKBOND Lifetime Loyalty Program?', a: 'OKBOND is a lifetime loyalty program by Shamim Forever offering members ongoing benefits, exclusive collection access, VIP ecosystem privileges, and a deepening relationship with the House over time.' },
      { q: 'Does Shamim Forever ship internationally?', a: 'Yes. Shamim Forever is built for a global audience, offering curated luxury collections to discerning collectors worldwide through its digital platform at shamimforever.com.' },
    ],
  },
  'blockchain-digital-passports': {
    title: 'The Future of Luxury: How Blockchain Digital Passports Are Redefining Authenticity',
    description: 'How NFT-backed Digital Passports are transforming luxury ownership — providing bulletproof counterfeit protection, verified provenance, and lifelong collector confidence.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=85',
    category: 'Innovation', date: '2025-07-01',
    keywords: ['blockchain luxury', 'Digital Passport luxury', 'NFT luxury ownership', 'counterfeit protection luxury', 'Shamim Forever Digital Passport', 'luxury authentication blockchain'],
    faq: [
      { q: 'What is a Digital Passport for luxury goods?', a: 'A Digital Passport is a blockchain-verified record that documents the authenticity, provenance, and ownership history of a luxury item — making it impossible to counterfeit or misrepresent at resale.' },
      { q: 'How does NFT-backed ownership work for luxury items?', a: 'NFT-backed ownership means your luxury piece has a unique digital token on the blockchain permanently recording your ownership, enabling secure transfer and verifiable authenticity for future resale.' },
      { q: 'How does Shamim Forever use Digital Passports?', a: 'Eligible Shamim Forever pieces come with Digital Passports that verify authenticity, record provenance, and protect collectors from counterfeits — giving every acquisition a permanent, trusted ownership record.' },
      { q: 'Can a Digital Passport increase the resale value of a luxury item?', a: 'Yes. Verified provenance and authenticated ownership history through a Digital Passport significantly increases buyer confidence and resale value, especially for limited-edition luxury pieces.' },
    ],
  },
  'verified-digital-identity': {
    title: 'Why Every Luxury Collector Needs a Verified Digital Identity',
    description: 'Verified digital identity creates permanent ownership records that protect your investment, simplify resale, and enable legacy planning for the next generation of luxury collectors.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=85',
    category: 'Innovation', date: '2025-07-08',
    keywords: ['luxury collector identity', 'luxury ownership records', 'luxury authentication', 'luxury resale benefits', 'legacy planning luxury', 'Shamim Forever collector'],
    faq: [
      { q: 'Why do luxury collectors need a verified digital identity?', a: 'A verified digital identity creates a permanent, authenticated record of ownership that protects your investment, increases resale value, and enables participation in exclusive collector ecosystems.' },
      { q: 'What are the benefits of verified ownership records in luxury?', a: 'Verified ownership records provide certified provenance documentation, facilitate insurance valuation, increase resale value, and enable legitimate legacy planning for future generations.' },
      { q: 'How does Shamim Forever verify collector identity?', a: 'Through the OKBOND ecosystem, Shamim Forever provides eligible collectors with verified ownership records and authentication certificates for qualifying purchases.' },
    ],
  },
  'okbond-lifetime-loyalty': {
    title: 'The Story Behind OKBOND: A Lifetime Loyalty Program Designed for Collectors',
    description: 'How Shamim Forever created OKBOND — a lifetime 10% loyalty benefit, VIP ecosystem, exclusive allocations, and long-term collector value unlike any traditional loyalty program.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85',
    category: 'Innovation', date: '2025-07-15',
    keywords: ['OKBOND loyalty program', 'Shamim Forever OKBOND', 'lifetime luxury loyalty', 'luxury collector program', 'Orakzai Bond', 'luxury 10% benefit', 'VIP luxury program'],
    faq: [
      { q: 'What is OKBOND?', a: 'OKBOND is Shamim Forever\'s lifetime loyalty program that provides eligible members with a lifetime 10% benefit on qualifying purchases, exclusive collection allocations, and VIP access to the Shamim Forever ecosystem.' },
      { q: 'How do I join the OKBOND program?', a: 'OKBOND membership is available through the Shamim Forever platform. Eligible collectors who qualify receive lifetime benefits that grow with their engagement with the House.' },
      { q: 'What is the long-term value of OKBOND membership?', a: 'OKBOND membership compounds in value over time — the more you collect, the deeper your relationship with the House, unlocking priority access to limited editions and exclusive Shamim Forever experiences.' },
    ],
  },
  'fragrance-as-investment': {
    title: 'From Perfume to Investment: Can Luxury Fragrances Become Collectible Assets?',
    description: 'Examining the growing market for collectible luxury fragrances — how limited editions, rarity, market demand, and preservation value are transforming perfume into investable assets.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=85',
    category: 'Collectibles', date: '2025-07-22',
    keywords: ['luxury fragrance investment', 'collectible perfume', 'limited edition fragrance', 'perfume rarity value', 'luxury fragrance market', 'Shamim Forever collectible fragrance'],
    faq: [
      { q: 'Can luxury fragrances be investment assets?', a: 'Yes. Limited edition luxury fragrances from heritage houses and niche perfumers have shown significant appreciation in secondary markets, driven by rarity, discontinued formulations, and collector demand.' },
      { q: 'What makes a luxury fragrance collectible?', a: 'Limited production runs, rare ingredients, discontinued formulas, designer collaborations, and exceptional presentation all contribute to a fragrance\'s collectibility and long-term value retention.' },
      { q: 'How does Shamim Forever approach limited edition fragrances?', a: 'Shamim Forever designs limited editions with collector value in mind — controlled production runs, rare materials, and Digital Passport authentication that document authenticity and preserve long-term value.' },
    ],
  },
  'high-jewelry-legacy': {
    title: 'High Jewelry as a Legacy Asset: Beyond Fashion and Into Generational Wealth',
    description: 'How precious metals, certified gemstones, and master craftsmanship transform high jewelry into heirloom-quality assets that build generational wealth and lasting family legacy.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85',
    category: 'Heritage', date: '2025-07-29',
    keywords: ['high jewelry investment', 'luxury jewelry legacy', 'generational wealth jewelry', 'heirloom jewelry value', 'precious gemstone investment', 'Shamim Forever jewelry'],
    faq: [
      { q: 'Is high jewelry a good long-term investment?', a: 'High jewelry from prestigious houses has historically retained and appreciated in value over decades, driven by precious metal prices, gemstone rarity, and the enduring reputation of master craftsmen.' },
      { q: 'What makes jewelry a generational wealth asset?', a: 'Certified precious gemstones, hallmarked precious metals, and exceptional craftsmanship combine to create jewelry pieces that maintain intrinsic value and can be passed down through generations as heirlooms.' },
      { q: 'How does Shamim Forever approach jewelry as legacy?', a: 'Shamim Forever selects and creates jewelry with long-term ownership in mind — using certified precious materials, exceptional craftsmanship, and authenticated provenance records to ensure pieces hold value across generations.' },
    ],
  },
  'art-of-curation': {
    title: 'The Art of Curation: Why Shamim Forever Selects Only Exceptional Global Masterpieces',
    description: 'Inside the Guest Curation philosophy of Shamim Forever — the rigorous selection standards that ensure only exceptional global masterpieces are presented to the discerning collector.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    category: 'Craft', date: '2025-08-05',
    keywords: ['luxury curation', 'Shamim Forever curation', 'Guest Curation Series', 'luxury selection standards', 'collector mindset luxury', 'curated luxury Pakistan'],
    faq: [
      { q: 'What is the Shamim Forever Guest Curation Series?', a: 'The Guest Curation Series recognizes internationally respected fragrances and luxury objects for their exceptional craftsmanship, presenting a carefully selected range of global masterpieces to the Shamim Forever collector community.' },
      { q: 'How does Shamim Forever select products for curation?', a: 'Every piece in the Shamim Forever collection — both exclusive creations and curated selections — is evaluated against strict standards of material quality, craftsmanship, authenticity, and long-term collector value.' },
      { q: 'Why does Shamim Forever prioritize quality over quantity?', a: 'The House believes exceptional quality deserves careful selection. A smaller collection of masterpieces curated with integrity creates more enduring value than a vast catalogue of average offerings.' },
    ],
  },
  'rise-of-digital-luxury': {
    title: 'The Rise of Digital Luxury: Physical Products with Blockchain Verification',
    description: 'How the fusion of physical luxury craftsmanship with blockchain verification is creating a new paradigm — products that are simultaneously tangible heirlooms and provably authenticated digital assets.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85',
    category: 'Innovation', date: '2025-08-12',
    keywords: ['digital luxury', 'blockchain luxury verification', 'physical digital luxury', 'luxury provenance blockchain', 'future luxury ownership', 'Shamim Forever digital luxury'],
    faq: [
      { q: 'What is digital luxury?', a: 'Digital luxury is the integration of physical luxury craftsmanship with blockchain-based authentication — creating products that offer the tactile beauty of traditional craftsmanship alongside the security of permanent digital ownership records.' },
      { q: 'How does blockchain verification benefit luxury buyers?', a: 'Blockchain verification creates an immutable record of authenticity and ownership that protects buyers from counterfeits, simplifies resale, and provides certified provenance documentation for insurance and legacy purposes.' },
      { q: 'Is Shamim Forever a digital-first luxury brand?', a: 'Shamim Forever is a future-ready luxury house that embraces digital verification while maintaining the primacy of physical craftsmanship — using technology to reinforce authenticity, not replace it.' },
    ],
  },
  'luxury-house-pakistan': {
    title: 'Building a Modern Luxury House from Pakistan for a Global Audience',
    description: 'How Shamim Forever is building a world-class luxury house with international standards, sophisticated design philosophy, and genuine global ambition from Pakistan.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85',
    category: 'Vision', date: '2025-08-19',
    keywords: ['luxury brand Pakistan', 'Shamim Forever Pakistan', 'Pakistani luxury house', 'global luxury brand Pakistan', 'luxury design Pakistan', 'Orakzai luxury Pakistan'],
    faq: [
      { q: 'Is Shamim Forever a Pakistani luxury brand?', a: 'Shamim Forever is a luxury house founded by a Pakistani entrepreneur with a genuinely global vision — combining international standards of craftsmanship, curation, and design to serve discerning collectors worldwide.' },
      { q: 'What makes Shamim Forever different from other luxury brands?', a: 'Shamim Forever combines traditional luxury values — craftsmanship, curation, authenticity — with modern digital innovation including OKBOND loyalty, Digital Passports, and blockchain verification, creating a uniquely forward-looking luxury house.' },
      { q: 'Does Shamim Forever ship to international customers?', a: 'Yes. Shamim Forever is designed for global collectors, with international shipping and a digital-first platform that serves customers across regions and time zones.' },
    ],
  },
  'authenticity-future-luxury': {
    title: 'How Authenticity Shapes the Future of the Luxury Industry',
    description: "In a market flooded with counterfeits, authenticity has become luxury's most valuable commodity. How certification, transparency, and trust are defining the next era of luxury.",
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85',
    category: 'Culture', date: '2025-08-26',
    keywords: ['luxury authenticity', 'counterfeit luxury', 'luxury certification', 'luxury transparency', 'future of luxury', 'Shamim Forever authenticity'],
    faq: [
      { q: 'How serious is the counterfeit problem in luxury?', a: 'Counterfeiting costs the global luxury industry hundreds of billions annually and erodes consumer trust. Authentication technologies like Digital Passports are becoming essential infrastructure for legitimate luxury brands.' },
      { q: 'How does Shamim Forever ensure product authenticity?', a: 'Shamim Forever uses a combination of expert curation standards, supplier relationships, and Digital Passport blockchain authentication to ensure every eligible product is genuinely what it claims to be.' },
      { q: 'Why is transparency important in luxury?', a: 'Modern collectors increasingly demand transparent sourcing, authentic provenance, and honest communication from luxury brands. Transparency builds the long-term trust that separates genuine luxury houses from imitations.' },
    ],
  },
  'fragrance-layering': {
    title: 'Fragrance Layering: Creating a Signature Identity Through Scent',
    description: 'Master the art of fragrance layering — luxury techniques for building a signature personal scent identity through thoughtful seasonal combinations and expert styling.',
    image: 'https://images.unsplash.com/photo-1547887538-047f40564bc3?w=1200&q=85',
    category: 'Style', date: '2025-09-02',
    keywords: ['fragrance layering', 'how to layer perfume', 'signature scent luxury', 'perfume combinations', 'luxury fragrance styling', 'Shamim Forever fragrance guide'],
    faq: [
      { q: 'What is fragrance layering?', a: 'Fragrance layering is the art of combining multiple perfumes, scented body products, or complementary fragrances to create a unique, multi-dimensional scent that expresses your personal identity.' },
      { q: 'How do I create a signature scent through layering?', a: 'Start with a base fragrance that resonates with your personality, then layer a complementary top note to add complexity. Apply heavier base notes first, lighter florals or citrus on top for the best projection and longevity.' },
      { q: 'Which Shamim Forever fragrances layer well together?', a: 'Shamim Forever fragrances are designed with complementary accords that layer beautifully. The House recommends beginning with a rich base note fragrance and layering a lighter floral or citrus composition on top for a sophisticated signature combination.' },
    ],
  },
  'limited-editions-value': {
    title: 'Why Limited Editions Create Lasting Value in Luxury Markets',
    description: "The psychology and economics of luxury limited editions — how scarcity, exclusivity, collector psychology, and premium positioning create enduring value that appreciates over time.",
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=85',
    category: 'Collectibles', date: '2025-09-09',
    keywords: ['limited edition luxury value', 'luxury scarcity', 'exclusivity luxury', 'collector luxury psychology', 'luxury limited edition investment', 'Shamim Forever limited edition'],
    faq: [
      { q: 'Why do limited edition luxury products hold more value?', a: 'Limited editions create genuine scarcity — when supply is permanently restricted and demand remains consistent or grows, value naturally appreciates. This is why limited luxury releases consistently outperform open-edition products at resale.' },
      { q: 'What is the psychology behind luxury exclusivity?', a: 'Exclusivity activates a powerful psychological response — the desire to belong to a select group, the emotional satisfaction of ownership, and the status signal that comes from possessing something most people cannot access.' },
      { q: 'How does Shamim Forever approach limited editions?', a: 'Shamim Forever designs limited editions with genuine collector value in mind — controlled production runs, rare materials, and Digital Passport authentication to ensure every limited piece holds its authenticity and value over time.' },
    ],
  },
  'psychology-of-luxury-objects': {
    title: 'The Psychology of Luxury: Why People Invest in Timeless Objects',
    description: 'Understanding the deep emotional, social, and psychological forces that drive investment in timeless luxury objects — from emotional value and status to craftsmanship and legacy.',
    image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1200&q=85',
    category: 'Culture', date: '2025-09-16',
    keywords: ['psychology of luxury', 'why people buy luxury', 'luxury emotional value', 'luxury status symbols', 'luxury craftsmanship psychology', 'Shamim Forever luxury philosophy'],
    faq: [
      { q: 'Why do people invest in luxury objects?', a: 'Investment in luxury objects is driven by a complex combination of emotional resonance, social identity signaling, genuine craftsmanship appreciation, long-term value preservation, and the desire to create meaningful personal legacy.' },
      { q: 'Is luxury purely about status?', a: 'No. While status plays a role, deep luxury investment is fundamentally about personal meaning — the emotional satisfaction of owning something extraordinarily well-made, the identity it expresses, and the legacy it can become for future generations.' },
      { q: 'What distinguishes a timeless luxury object from a trend-driven purchase?', a: 'A timeless luxury object is defined by exceptional craftsmanship, premium materials, and design that transcends seasonal trends — it appreciates in meaning and often in monetary value over decades, unlike trend-driven items that depreciate quickly.' },
    ],
  },
  'sovereign-collection-making': {
    title: 'The Making of a Sovereign Collection: From Design Concept to Final Archive',
    description: 'An inside view of how Shamim Forever builds a sovereign luxury collection — from initial inspiration and material selection through rigorous quality control to final archival presentation.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=85',
    category: 'Craft', date: '2025-09-23',
    keywords: ['luxury collection making', 'Shamim Forever design process', 'luxury craftsmanship process', 'luxury quality control', 'sovereign collection', 'luxury material selection'],
    faq: [
      { q: 'How does Shamim Forever design a new collection?', a: 'The Shamim Forever design process begins with a creative brief rooted in cultural heritage and modern luxury values, followed by rigorous material sourcing, prototype development, quality control, and archival documentation before any piece is released.' },
      { q: 'What does material selection mean at Shamim Forever?', a: 'Material selection at Shamim Forever means sourcing only exceptional raw materials — rare fragrance ingredients, precious gemstones, noble metals — from verified suppliers with whom the House maintains long-term relationships.' },
      { q: 'What is the final archive process at Shamim Forever?', a: 'Every Shamim Forever collection is archived — each piece documented with provenance records, material certifications, and Digital Passport authentication before being presented to collectors.' },
    ],
  },
  'sustainable-luxury': {
    title: 'Sustainable Luxury: Responsible Craftsmanship for the Next Generation',
    description: 'How ethical sourcing, durable product design, long-term ownership culture, and conscious collecting are shaping a new era of sustainable luxury at Shamim Forever.',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=85',
    category: 'Heritage', date: '2025-09-30',
    keywords: ['sustainable luxury', 'ethical luxury sourcing', 'conscious luxury collecting', 'durable luxury products', 'Shamim Forever sustainability', 'responsible luxury Pakistan'],
    faq: [
      { q: 'Is luxury sustainable?', a: "True luxury and sustainability are naturally aligned — a genuinely luxury item is made to last lifetimes, not seasons. Exceptional craftsmanship, durable materials, and long-term ownership culture are inherently more sustainable than fast fashion." },
      { q: 'How does Shamim Forever approach ethical sourcing?', a: 'Shamim Forever sources materials through verified supplier relationships, prioritizes traceable ingredients and certified gemstones, and designs products intended for long-term ownership rather than disposable consumption.' },
      { q: 'What is conscious collecting?', a: 'Conscious collecting means choosing quality over quantity, investing in objects of lasting value, supporting responsible producers, and building a collection that can be meaningfully passed to future generations.' },
    ],
  },
  'shamim-forever-vision-heritage': {
    title: 'Inside the Shamim Forever Vision: Heritage, Innovation, and the Next Era of Luxury',
    description: 'A comprehensive look at the Shamim Forever brand philosophy — how the Digital Passport ecosystem, OKBOND integration, and a passionate community of collectors define the next era of luxury.',
    image: 'https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=1200&q=85',
    category: 'Vision', date: '2025-10-07',
    keywords: ['Shamim Forever brand philosophy', 'Shamim Forever vision', 'Digital Passport ecosystem', 'OKBOND integration', 'future of luxury', 'Shamim Forever community', 'luxury brand roadmap'],
    faq: [
      { q: 'What is the core philosophy of Shamim Forever?', a: "Shamim Forever's philosophy is built on three pillars: timeless craftsmanship that endures beyond trends, verified authenticity through Digital Passports, and a genuine community of collectors united by a love of exceptional luxury." },
      { q: 'How does the Digital Passport ecosystem work at Shamim Forever?', a: "The Shamim Forever Digital Passport ecosystem uses blockchain technology to create permanent, verifiable records of product authenticity and ownership — connecting physical luxury pieces to their digital provenance across the collector's lifetime." },
      { q: 'What is the future roadmap for Shamim Forever?', a: 'Shamim Forever is building toward a complete luxury ecosystem — expanding collections across fragrance, jewelry, and exclusive collaborations, deepening OKBOND program benefits, and growing a global community of collectors who value authenticity and legacy.' },
    ],
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = ARTICLE_META[params.slug]
  if (!a) return { title: 'Article | Shamim Forever Journal' }
  const url = `${BASE}/journal/${params.slug}`
  return {
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    authors: [{ name: 'Shamim Forever', url: BASE }],
    openGraph: {
      title: a.title, description: a.description, url,
      type: 'article', siteName: 'Shamim Forever', locale: 'en_US',
      publishedTime: a.date, authors: ['Shamim Forever'], section: a.category,
      images: [{ url: a.image, width: 1200, height: 630, alt: a.title }],
    },
    twitter: {
      card: 'summary_large_image', title: a.title, description: a.description,
      images: [a.image], site: '@shamimforever', creator: '@shamimforever',
    },
    alternates: { canonical: url },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(ARTICLE_META).map(slug => ({ slug }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = ARTICLE_META[params.slug]

  const jsonLd = a ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${BASE}/journal/${params.slug}#article`,
        headline: a.title,
        description: a.description,
        image: { '@type': 'ImageObject', url: a.image, width: 1200, height: 630 },
        datePublished: a.date,
        dateModified: a.date,
        inLanguage: 'en-US',
        articleSection: a.category,
        keywords: a.keywords.join(', '),
        url: `${BASE}/journal/${params.slug}`,
        isPartOf: { '@type': 'Blog', '@id': `${BASE}/journal`, name: 'Shamim Forever Journal' },
        author: { '@type': 'Organization', name: 'Shamim Forever', url: BASE },
        publisher: { '@type': 'Organization', name: 'Shamim Forever', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/logo-sf.png` } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/journal/${params.slug}` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE}/journal/${params.slug}#faq`,
        mainEntity: a.faq.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE}/journal/${params.slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Journal', item: `${BASE}/journal` },
          { '@type': 'ListItem', position: 3, name: a.title, item: `${BASE}/journal/${params.slug}` },
        ],
      },
    ],
  } : null

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <ArticleClient slug={params.slug} />
    </>
  )
}
