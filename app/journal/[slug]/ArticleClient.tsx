'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface JournalPost {
  id: string; title: string; slug: string; excerpt: string | null
  content: string | null; cover_image: string | null; category: string | null
  published: boolean; created_at: string
}

const ease = [0.16, 1, 0.3, 1] as const

type Block = { type: 'p' | 'h2' | 'subh2' | 'quote' | 'list'; text: string }
type ArticleData = JournalPost & {
  heroImage?: string
  body: Block[]
  pullQuote: string
  secondImage: string
  secondImageCaption?: string
  secondImageStyle?: 'ecosystem' | 'standard' | 'infographic'
  nextSlug: string; nextTitle: string; nextImage: string; nextCategory: string
}

const STATIC: Record<string, ArticleData> = {
  'founders-vision': {
    id: '0', slug: 'founders-vision', published: true, content: null,
    title: "The Founder's Vision: Why Shamim Forever Was Created",
    excerpt: "In every generation, a handful of brands emerge that aspire to do more than sell products — they seek to create a lasting legacy.",
    cover_image: '/founders-vision.png',
    heroImage: '/founders-portrait.jpg',
    secondImage: '/founders-ecosystem.jpg',
    secondImageCaption: 'The Orakzai Ecosystem — a sovereign network of brands built for the future.',
    secondImageStyle: 'ecosystem',
    category: `VISION`, created_at: '2025-06-01T00:00:00Z',
    pullQuote: "True luxury is never rushed. It is patiently built, thoughtfully curated, and responsibly preserved for future generations.",
    nextSlug: 'blockchain-digital-passports', nextTitle: "Blockchain Digital Passports", nextImage: '/blockchain-passport.png', nextCategory: "INNOVATION",
    body: [
      { type: 'p', text: "In every generation, a handful of brands emerge that aspire to do more than sell products — they seek to create a lasting legacy. Shamim Forever was founded with that ambition: to build a luxury house where craftsmanship, innovation, authenticity, and timeless design come together under one vision." },
      { type: 'p', text: "The inspiration behind the House was simple yet powerful. Luxury should not be measured only by price or exclusivity; it should represent meaning, permanence, and the ability to be appreciated across generations. Every fragrance, every jewelry piece, every curated object, and every digital innovation introduced by Shamim Forever reflects this philosophy." },
      { type: 'h2', text: "A Vision Rooted in Long-Term Thinking" },
      { type: 'p', text: "From the beginning, the objective was never to become another online retailer or trend-driven lifestyle brand. The goal was to establish an ecosystem where carefully selected creations could be appreciated not only for their beauty but also for their authenticity, provenance, and enduring value. The founder envisioned a brand that would stand confidently between traditional luxury craftsmanship and the possibilities offered by modern technology." },
      { type: 'h2', text: "Luxury Built on Curation" },
      { type: 'p', text: "The modern luxury market is filled with countless products competing for attention. Shamim Forever follows a different path. The House believes that exceptional quality deserves careful selection — reflected in its own exclusive creations as well as the Guest Curation Series, where internationally respected fragrances and luxury objects are recognized for their craftsmanship. The focus remains on excellence rather than volume." },
      { type: 'quote', text: "True luxury is never rushed. It is patiently built, thoughtfully curated, and responsibly preserved for future generations." },
      { type: 'h2', text: "The Importance of Authenticity" },
      { type: 'p', text: "Trust is one of the most valuable assets in luxury. Collectors increasingly expect transparent documentation and confidence in the origin of the products they acquire. For this reason, Shamim Forever embraces modern verification concepts through Digital Passports designed to strengthen authenticity and preserve provenance for eligible creations. Technology is used not to replace craftsmanship, but to reinforce it." },
      { type: 'h2', text: "A New Ownership Experience" },
      { type: 'p', text: "The OKBOND Lifetime Loyalty Program was created to reward long-term engagement through meaningful benefits. Eligible participants enjoy lifetime advantages such as continued savings on qualifying purchases, priority access to selected releases, and opportunities to participate more deeply in the evolving Shamim Forever ecosystem." },
      { type: 'h2', text: "A Legacy in Progress" },
      { type: 'p', text: "For Shamim Forever, that vision is not limited to fragrances or jewelry. It is the pursuit of a modern luxury house where timeless craftsmanship, careful curation, verified authenticity, and meaningful relationships come together to create lasting value. Luxury may capture attention for a moment. Legacy earns its place forever." },
    ],
  },

  'blockchain-digital-passports': {
    id: '1', slug: 'blockchain-digital-passports', published: true, content: null,
    title: `The Future of Luxury: How Blockchain Digital Passports Are Redefining Authenticity`,
    excerpt: "How NFT-backed Digital Passports are transforming luxury ownership — providing bulletproof counterfeit protection, verified provenance, and lifelong collector confidence.",
    cover_image: '/blockchain-passport.png',
    heroImage: '/blockchain-passport.png',
    secondImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1800&q=90',
    secondImageCaption: 'Blockchain infrastructure enables a new standard of verified ownership for luxury collectors worldwide.',
    secondImageStyle: 'standard',
    category: `INNOVATION`, created_at: '2025-07-01T00:00:00Z',
    pullQuote: "Authenticity is no longer merely claimed — it is verifiable. Legacy is not just remembered — it is permanently documented.",
    nextSlug: 'verified-digital-identity', nextTitle: "Why Every Luxury Collector Needs a Verified Digital Identity", nextImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=85', nextCategory: "INNOVATION",
    body: [
      { type: 'p', text: "For centuries, luxury has been built on three foundations: craftsmanship, rarity, and trust. Whether purchasing a handcrafted watch, a fine fragrance, a high-jewelry creation, or a collectible artwork, buyers have always wanted certainty that what they own is genuine." },
      { type: 'p', text: "Today, that certainty faces unprecedented challenges. Global counterfeiting has become a multi-billion-dollar industry, supply chains have grown increasingly complex, and secondary markets have expanded beyond traditional auction houses into digital platforms that operate around the clock. In this environment, authenticity is no longer a marketing advantage — it is a necessity." },
      { type: 'p', text: "Blockchain-powered Digital Passports represent one of the most significant innovations in modern luxury. They provide a secure, verifiable, and transparent method of proving ownership, preserving provenance, and strengthening confidence between brands and collectors." },
      { type: 'p', text: "At Shamim Forever, this philosophy aligns naturally with our vision of combining timeless craftsmanship with responsible digital innovation. Rather than replacing physical luxury, blockchain technology can enhance its credibility and long-term value." },

      { type: 'h2', text: "The Traditional Problem of Authenticity" },
      { type: 'p', text: "Historically, luxury brands have relied on physical certificates, serial numbers, engraved markings, invoices, and paper documentation to verify authenticity. While effective in many cases, these systems have significant limitations:" },
      { type: 'list', text: "Paper certificates can be lost or forged." },
      { type: 'list', text: "Receipts may disappear over time." },
      { type: 'list', text: "Serial numbers can be copied by sophisticated counterfeiters." },
      { type: 'list', text: "Ownership history is often fragmented across multiple handovers." },
      { type: 'list', text: "Buyers in secondary markets may struggle to verify provenance." },
      { type: 'p', text: "As resale markets continue to grow globally, collectors increasingly expect stronger verification systems before committing significant capital to a luxury acquisition." },

      { type: 'h2', text: "What Is a Digital Passport?" },
      { type: 'p', text: "A Digital Passport is a secure digital identity linked to a specific luxury item. It acts as a permanent record containing important information about that product throughout its entire lifecycle. Depending on implementation, it may include:" },
      { type: 'list', text: "Product identification and unique reference codes" },
      { type: 'list', text: "Manufacturing details and artisan records" },
      { type: 'list', text: "Material specifications and certification" },
      { type: 'list', text: "Authentication records and verification events" },
      { type: 'list', text: "Ownership history and transfer documentation" },
      { type: 'list', text: "Service, repair, and maintenance logs" },
      { type: 'list', text: "Warranty information and after-sales records" },
      { type: 'list', text: "Limited edition status and collectible metadata" },
      { type: 'p', text: "When anchored to blockchain infrastructure, the information becomes significantly more resistant to unauthorized alteration, creating an immutable historical record that travels with the object for its lifetime." },

      { type: 'h2', text: "Why Blockchain Matters" },
      { type: 'p', text: "Blockchain functions as a distributed ledger maintained across multiple participants rather than a single centralized database. Its core characteristics make it uniquely suited to luxury provenance." },
      { type: 'subh2', text: "Immutability" },
      { type: 'p', text: "Once records are confirmed and stored, altering historical data becomes extremely difficult without consensus mechanisms. This helps preserve trustworthy provenance records that cannot be quietly edited by any single party." },
      { type: 'subh2', text: "Transparency" },
      { type: 'p', text: "Authorized participants can verify key information without relying solely on private documentation held by any single entity. This creates verifiable truth accessible to all legitimate parties." },
      { type: 'subh2', text: "Security" },
      { type: 'p', text: "Cryptographic methods protect the integrity of recorded information and reduce opportunities for tampering. The mathematics underlying blockchain make unauthorized modification computationally prohibitive." },
      { type: 'subh2', text: "Traceability" },
      { type: 'p', text: "Ownership transfers and important lifecycle events can be documented in chronological order, creating a continuous historical timeline from creation through every subsequent owner." },

      { type: 'h2', text: "Counterfeit Protection in Modern Luxury" },
      { type: 'p', text: "Counterfeit products affect nearly every premium sector — fragrances, jewelry, watches, designer fashion, handbags, cosmetics, sneakers, collectibles, and limited editions. Even experienced buyers can struggle to distinguish authentic products from sophisticated replicas." },
      { type: 'p', text: "Digital Passports strengthen anti-counterfeit efforts by allowing purchasers to verify whether an item corresponds with official records maintained through secure authentication systems. Instead of relying solely on visual inspection, buyers gain access to structured provenance information that cannot be replicated by counterfeiters." },

      { type: 'quote', text: "Authenticity is no longer merely claimed — it is verifiable. Legacy is not just remembered — it is permanently documented." },

      { type: 'h2', text: "Creating Confidence for Collectors" },
      { type: 'p', text: "Luxury purchases are often emotional decisions, but they are increasingly influenced by confidence and transparency. A verified Digital Passport can reassure buyers by providing documented information about authenticity and product history. For collectors, this may offer several advantages:" },
      { type: 'list', text: "Increased confidence when purchasing from any marketplace." },
      { type: 'list', text: "Better documentation for insurance purposes and valuation." },
      { type: 'list', text: "Easier verification during resale or estate transfer." },
      { type: 'list', text: "Enhanced recordkeeping for long-term collection management." },
      { type: 'list', text: "Improved transparency across secondary market platforms." },
      { type: 'p', text: "Trust becomes part of the product experience itself — not an afterthought, but a fundamental feature of the ownership journey." },

      { type: 'h2', text: "Provenance as a Valuable Asset" },
      { type: 'p', text: "In the art world, provenance has long influenced desirability and valuation. A documented ownership history can significantly enhance confidence in a collectible's authenticity and increase its market value." },
      { type: 'p', text: "Digital Passports extend similar principles to modern luxury categories by preserving structured records throughout an item's lifecycle. For future generations, a verifiable history may become as important as the object itself — the story of where something has been adding to the richness of what it is." },

      { type: 'h2', text: "NFT-Backed Ownership: Separating Hype from Utility" },
      { type: 'p', text: "The term \"NFT\" gained widespread attention through digital art speculation, but its underlying technology has broader and more practical potential. When thoughtfully implemented, an NFT can function as a blockchain-based certificate associated with a physical luxury item rather than existing solely as a standalone digital collectible." },
      { type: 'p', text: "Potential applications with genuine utility include:" },
      { type: 'list', text: "Proof of ownership with cryptographic verification" },
      { type: 'list', text: "Transfer documentation across ownership changes" },
      { type: 'list', text: "Authentication support for secondary market transactions" },
      { type: 'list', text: "Membership access to exclusive brand experiences" },
      { type: 'list', text: "Event eligibility and priority allocation rights" },
      { type: 'list', text: "Loyalty benefits tied to verified ownership history" },
      { type: 'p', text: "The long-term value lies less in speculation and more in trusted verification and interoperability — making the physical luxury object smarter and more connected to its collector." },

      { type: 'h2', text: "Digital Passports for Fragrance Collectors" },
      { type: 'p', text: "Prestige fragrances increasingly attract enthusiasts who collect rare editions, discontinued releases, and limited allocations. A blockchain-backed passport could preserve original release information, batch identification, limited edition status, purchase chronology, collector transfers, and authentication events." },
      { type: 'p', text: "Such records simplify future verification while helping collectors document the history of significant acquisitions — transforming a bottle of fragrance into a verifiable object of cultural and commercial importance." },

      { type: 'h2', text: "High Jewelry and Immutable Records" },
      { type: 'p', text: "Jewelry combines artistic craftsmanship with intrinsic material value, making provenance especially important. Digital records can complement traditional certification by documenting metal composition, gemstone details, design references, manufacturing information, ownership transfers, and maintenance history." },
      { type: 'p', text: "This approach strengthens confidence among collectors and institutions that prioritize documented authenticity — particularly for significant pieces intended to become family heirlooms." },

      { type: 'h2', text: "Building Long-Term Collector Relationships" },
      { type: 'p', text: "Traditional loyalty programs often focus on short-term promotions. Blockchain infrastructure allows brands to explore more persistent forms of recognition tied to verified ownership. Within concepts such as the OKBOND Lifetime Loyalty Program, authenticated ownership may unlock ongoing benefits:" },
      { type: 'list', text: "Lifetime benefits on qualifying purchases." },
      { type: 'list', text: "Priority access to selected new releases and limited editions." },
      { type: 'list', text: "Recognition within collector communities." },
      { type: 'list', text: "Access to exclusive experiences and invitation-only events." },
      { type: 'list', text: "Enhanced digital records linked to ownership history." },
      { type: 'p', text: "Such systems reward sustained engagement rather than isolated transactions — building genuine long-term relationships between the House and its collectors." },

      { type: 'h2', text: "Sustainability Through Product Longevity" },
      { type: 'p', text: "Verified documentation may encourage repair, restoration, and long-term preservation instead of replacement. As products maintain documented histories across decades, consumers may be more inclined to preserve significant items, supporting circular ownership models and extending product lifecycles." },
      { type: 'p', text: "In this sense, Digital Passports serve sustainability goals without requiring compromise on quality or desirability — the luxury object becomes more valuable, not less, with the passage of time." },

      { type: 'h2', text: "Institutional Interest in Verified Assets" },
      { type: 'p', text: "Family offices, wealth advisors, and sophisticated collectors increasingly recognize certain luxury categories as alternative assets. Reliable documentation and provenance can contribute to portfolio recordkeeping, insurance documentation, estate planning, collection management, and due diligence processes." },
      { type: 'p', text: "While future appreciation is never guaranteed, transparent records improve confidence in ownership documentation and provide a foundation for professional asset management." },

      { type: 'h2', text: "Data Privacy Considerations" },
      { type: 'p', text: "Responsible Digital Passport systems must balance transparency with user privacy. Best practices include protecting personally identifiable information, allowing owners to control public visibility, limiting exposed transaction details where appropriate, using secure cryptographic verification methods, and following applicable data protection standards." },
      { type: 'p', text: "Ownership verification should not require compromising personal privacy. The two objectives are complementary, not contradictory, when systems are designed with care." },

      { type: 'h2', text: "The Vision for Shamim Forever" },
      { type: 'p', text: "Shamim Forever embraces a philosophy where exceptional physical creations are supported by modern digital verification. In this vision, signature fragrances may be accompanied by verifiable Digital Passports. Select collectible archive objects can include blockchain-backed provenance. Eligible high-jewelry creations may benefit from enhanced authentication records." },
      { type: 'p', text: "Verified collectors can participate in loyalty initiatives such as the OKBOND ecosystem, including lifetime benefits and curated experiences. Technology serves craftsmanship rather than replacing it. The objective is simple: increase trust, preserve authenticity, and strengthen long-term relationships between the House and its collectors." },

      { type: 'h2', text: "Looking Ahead" },
      { type: 'p', text: "Luxury is evolving from ownership alone toward verified ownership. As global commerce becomes increasingly digital and resale markets continue to expand, confidence in provenance will likely become one of the defining characteristics of premium brands." },
      { type: 'p', text: "Blockchain Digital Passports offer a practical framework for documenting authenticity, supporting transparency, and preserving the history of exceptional creations. They are not a substitute for craftsmanship, artistry, or heritage, but a tool that can reinforce those qualities in a connected world." },
      { type: 'p', text: "For collectors, this means greater confidence. For brands, it offers new ways to engage loyal communities. And for the future of luxury, it signals a shift toward an ecosystem where every remarkable object carries a trusted digital identity alongside its physical presence." },
      { type: 'p', text: "In that future, authenticity is no longer just claimed — it is verifiable. Legacy is not merely remembered — it is documented. And ownership extends beyond possession into a transparent record that can endure for generations." },
    ],
  },
  'verified-digital-identity': {
    id: '2', slug: 'verified-digital-identity', published: true, content: null,
    title: `Why Every Luxury Collector Needs a Verified Digital Identity`,
    excerpt: "Verified digital identity creates permanent ownership records that protect your investment, simplify resale, and enable legacy planning for the next generation of luxury collectors.",
    cover_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=90',
    secondImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1800&q=90',
    secondImageCaption: 'Organized digital documentation preserves the story of every significant acquisition for generations to come.',
    secondImageStyle: 'standard' as const,
    category: `INNOVATION`, created_at: '2025-07-08T00:00:00Z',
    pullQuote: "Collectors are no longer simply owning an object — they are preserving its documented narrative for future generations.",
    nextSlug: 'okbond-lifetime-loyalty', nextTitle: "The Story Behind OKBOND", nextImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85', nextCategory: "INNOVATION",
    body: [
      { type: 'p' as const, text: "Luxury collecting has evolved far beyond simply acquiring beautiful objects. Today"s discerning collectors seek provenance, transparency, and long-term confidence alongside craftsmanship and rarity. Whether purchasing an exceptional fragrance, a limited-edition jewelry piece, or a collectible archive object, ownership is becoming as important as the object itself.' },
      { type: 'p' as const, text: "In this new era, a Verified Digital Identity for luxury assets is emerging as a powerful tool that helps document authenticity, establish ownership history, simplify resale, and preserve a collector"s legacy. Rather than replacing physical craftsmanship, digital verification strengthens trust and creates a more transparent ecosystem for collectors around the world.' },
      { type: 'p' as const, text: "This shift is particularly relevant as luxury markets become increasingly global and digital-first. Collectors now buy and sell across borders, participate in online marketplaces, and expect secure ways to prove authenticity without relying solely on paper certificates or invoices." },

      { type: 'h2' as const, text: "Beyond Ownership: Owning the Story" },
      { type: 'p' as const, text: "Every valuable collectible has a story. The materials used, the craftsmanship involved, the edition number, the original acquisition date, and the ownership journey all contribute to its significance. Traditionally, much of this information has been scattered across receipts, certificates, emails, and physical documentation that can be misplaced or damaged over time." },
      { type: 'p' as const, text: "A Verified Digital Identity consolidates these records into a structured and secure profile linked to the collectible itself, helping preserve its history for years to come. For collectors, this means they are not simply owning an object — they are preserving its documented narrative." },

      { type: 'h2' as const, text: "Authentication in a Changing Marketplace" },
      { type: 'p' as const, text: "One of the biggest challenges facing luxury industries today is counterfeiting. Sophisticated replicas have become increasingly difficult to distinguish from authentic products through visual inspection alone — affecting fragrances, jewelry, fashion, accessories, and collectibles across every major market." },
      { type: 'p' as const, text: "Digital verification provides an additional layer of confidence by allowing authorized records to confirm important information such as product identity, provenance, and authenticity. Rather than depending entirely on external opinions, buyers can rely on verifiable documentation associated with the collectible." },

      { type: 'h2' as const, text: "Why Ownership Records Matter" },
      { type: 'p' as const, text: "Clear ownership records create confidence for everyone involved in the lifecycle of a luxury item. A documented chain of ownership may include:" },
      { type: 'list' as const, text: "Original acquisition date and purchase documentation." },
      { type: 'list' as const, text: "Edition or allocation details and serial references." },
      { type: 'list' as const, text: "Authentication milestones and verification events." },
      { type: 'list' as const, text: "Authorized transfers and ownership changes." },
      { type: 'list' as const, text: "Maintenance history and service records." },
      { type: 'list' as const, text: "Warranty information and restoration records." },
      { type: 'list' as const, text: "Historical provenance spanning multiple owners." },
      { type: 'p' as const, text: "This information helps preserve continuity as collectibles change hands over time. For family collections and institutional archives, organized ownership documentation becomes increasingly valuable as portfolios grow." },

      { type: 'h2' as const, text: "Building Collector Confidence" },
      { type: 'p' as const, text: "Confidence is often the deciding factor in high-value purchases. When collectors know that important information has been securely documented and can be independently verified, purchasing decisions become easier and more informed." },
      { type: 'p' as const, text: "Verified Digital Identity systems support this confidence by reducing uncertainty around provenance and creating greater transparency between buyers and sellers. In competitive markets, trust itself becomes part of the luxury experience." },

      { type: 'quote' as const, text: "Collectors are no longer simply owning an object — they are preserving its documented narrative for future generations." },

      { type: 'h2' as const, text: "The Rise of Blockchain-Based Verification" },
      { type: 'p' as const, text: "Blockchain technology has attracted attention for its ability to maintain tamper-resistant records distributed across decentralized systems. When applied thoughtfully to luxury authentication, blockchain can help preserve:" },
      { type: 'list' as const, text: "Immutable transaction histories that cannot be quietly altered." },
      { type: 'list' as const, text: "Authentication records linked to specific products." },
      { type: 'list' as const, text: "Ownership changes documented in chronological order." },
      { type: 'list' as const, text: "Product metadata including edition and specification details." },
      { type: 'list' as const, text: "Provenance documentation from creation through every transfer." },
      { type: 'p' as const, text: "The objective is not speculation but trust — creating digital records that complement physical craftsmanship and reinforce it." },

      { type: 'h2' as const, text: "NFTs as Certificates Rather Than Speculation" },
      { type: 'p' as const, text: "Public discussion around NFTs often focuses on digital art speculation, yet the underlying technology has practical applications for luxury authentication. When linked responsibly to physical products, NFT-based records may function as digital certificates representing documented ownership or provenance rather than standalone investments." },
      { type: 'p' as const, text: "In this role, they become tools for verification, transfer, and recordkeeping instead of speculative assets — a meaningful distinction that separates genuine utility from market noise." },

      { type: 'h2' as const, text: "Simplifying the Secondary Market" },
      { type: 'p' as const, text: "Luxury resale continues to expand as collectors seek rare editions and limited releases. Without structured documentation, verifying authenticity during resale can be challenging. Verified Digital Identities help streamline this process by providing documented information that may include:" },
      { type: 'list' as const, text: "Original allocation records and purchase documentation." },
      { type: 'list' as const, text: "Product specifications and material certifications." },
      { type: 'list' as const, text: "Verified ownership history across all previous holders." },
      { type: 'list' as const, text: "Authentication checkpoints and verification events." },
      { type: 'list' as const, text: "Limited edition identifiers and collectible metadata." },
      { type: 'p' as const, text: "This transparency benefits both buyers and sellers by reducing uncertainty — turning the secondary market into a more confident, trustworthy environment for everyone." },

      { type: 'h2' as const, text: "Preserving Generational Wealth" },
      { type: 'p' as const, text: "Many collectors acquire luxury objects with future generations in mind. High jewelry, heritage fragrances, watches, and archive pieces often become family heirlooms that carry emotional as well as monetary significance." },
      { type: 'p' as const, text: "Verified ownership records simplify intergenerational transfer by documenting provenance and helping successors understand the history of inherited collections. Instead of passing down only physical objects, families pass down verified histories — the story behind every significant acquisition preserved for those who come next." },

      { type: 'h2' as const, text: "Legacy Planning in the Digital Age" },
      { type: 'p' as const, text: "Estate planning increasingly includes valuable collectibles alongside traditional assets. Organized digital documentation can assist heirs, advisors, and estate administrators by providing structured information about ownership and provenance. Potential benefits include:" },
      { type: 'list' as const, text: "Easier inventory management for complex collections." },
      { type: 'list' as const, text: "Better insurance documentation and valuation support." },
      { type: 'list' as const, text: "Simplified identification of individual pieces." },
      { type: 'list' as const, text: "Preservation of historical records across ownership transitions." },
      { type: 'list' as const, text: "Improved continuity and clarity across generations." },
      { type: 'p' as const, text: "Digital identity becomes part of responsible legacy planning rather than merely a technological feature — a practical tool with genuine human value." },

      { type: 'h2' as const, text: "Insurance and Documentation" },
      { type: 'p' as const, text: "Insurance providers often require evidence of ownership and valuation when covering high-value assets. Verified Digital Identities may complement existing documentation by maintaining organized records that support ownership verification and historical tracking." },
      { type: 'p' as const, text: "Although specific insurer requirements vary, comprehensive and well-organized documentation generally strengthens administrative processes and may support more accurate coverage assessments." },

      { type: 'h2' as const, text: "Luxury as an Ecosystem" },
      { type: 'p' as const, text: "Modern luxury increasingly extends beyond the product itself. Collectors now expect personalized experiences, concierge services, exclusive events, loyalty programs, and digital engagement. A Verified Digital Identity can serve as the foundation for these experiences by securely connecting collectors with authorized services associated with their acquisitions." },
      { type: 'p' as const, text: "The object becomes part of a broader ecosystem built around trust and long-term relationships — one where ownership unlocks access rather than simply marking a transaction." },

      { type: 'h2' as const, text: "Exclusive Access Through Verification" },
      { type: 'p' as const, text: "Brands may choose to reward verified owners with experiences unavailable through conventional retail channels:" },
      { type: 'list' as const, text: "Early access to limited releases and new collections." },
      { type: 'list' as const, text: "Invitation-only events and private previews." },
      { type: 'list' as const, text: "Personalized concierge support and advisory services." },
      { type: 'list' as const, text: "Access to collector communities and exclusive content." },
      { type: 'list' as const, text: "Loyalty program participation and lifetime benefit accumulation." },
      { type: 'p' as const, text: "Verification ensures that these benefits reach genuine owners rather than unauthorized parties — making exclusivity meaningful rather than merely claimed." },

      { type: 'h2' as const, text: "Supporting Programs Like OKBOND" },
      { type: 'p' as const, text: "Within ecosystems inspired by programs such as the OKBOND Lifetime Loyalty Program at Shamim Forever, verified ownership can help administer benefits fairly and transparently. Authenticated collectors may become eligible for:" },
      { type: 'list' as const, text: "Lifetime purchase incentives on qualifying acquisitions." },
      { type: 'list' as const, text: "Priority allocations for new and limited releases." },
      { type: 'list' as const, text: "Exclusive releases and invitation-only experiences." },
      { type: 'list' as const, text: "Member recognition within the collector community." },
      { type: 'list' as const, text: "Digital collector privileges and future ecosystem integrations." },
      { type: 'p' as const, text: "Technology helps ensure that long-term loyalty is accurately recognized and consistently applied — rewarding genuine engagement rather than isolated transactions." },

      { type: 'h2' as const, text: "The Shamim Forever Perspective" },
      { type: 'p' as const, text: "At Shamim Forever, the concept of a Verified Digital Identity reflects a broader commitment to authenticity, transparency, and collector confidence. The vision is not simply to create exceptional fragrances, high jewelry, or curated archive objects, but to pair those creations with secure documentation that reinforces trust throughout their lifecycle." },
      { type: 'p' as const, text: "Digital Passports and blockchain-backed verification help collectors document provenance, simplify ownership records, and participate in long-term ecosystems such as the OKBOND Lifetime Loyalty Program, where verified engagement may unlock ongoing benefits and exclusive opportunities." },
      { type: 'p' as const, text: "The philosophy remains rooted in craftsmanship first and technology second. Innovation serves heritage — not the other way around." },

      { type: 'h2' as const, text: "Looking Toward the Future" },
      { type: 'p' as const, text: "Luxury is increasingly defined not only by what people own but by how confidently they can prove its authenticity and preserve its history. A Verified Digital Identity strengthens ownership records, supports authentication, facilitates informed resale, and contributes to thoughtful legacy planning." },
      { type: 'p' as const, text: "As the luxury industry continues embracing digital innovation, secure verification systems are likely to become a defining feature of premium collecting. In that future, authenticity is easier to demonstrate, ownership is easier to document, and legacy becomes something that can be preserved with clarity as well as craftsmanship." },
    ],
  },

  'okbond-lifetime-loyalty': {
    id: '3', slug: 'okbond-lifetime-loyalty', published: true, content: null,
    title: `The Story Behind OKBOND: A Lifetime Loyalty Program Designed for Collectors`,
    excerpt: "OKBOND redefines luxury loyalty — permanent benefits, exclusive allocations, and a structured collector ecosystem built on lifelong relationships rather than transactional points.",
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=90',
    secondImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=90',
    secondImageCaption: 'OKBOND transforms luxury from a static experience into a living relationship system built on permanence and trust.',
    secondImageStyle: 'standard' as const,
    category: `INNOVATION`, created_at: '2025-07-15T00:00:00Z',
    pullQuote: "True luxury relationships are not seasonal — they are lifelong. Loyalty is not rewarded occasionally — it is continuously acknowledged.",
    nextSlug: 'fragrance-as-investment', nextTitle: "Fragrance as Investment", nextImage: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=85', nextCategory: "COLLECTIBLES",
    body: [
      { type: 'p' as const, text: "Luxury has always been about more than products. It is about relationships, identity, and long-term trust between a House and its collectors. In traditional systems, loyalty programs are often transactional — points, discounts, seasonal rewards, and short-term incentives that expire with time." },
      { type: 'p' as const, text: "The OKBOND Lifetime Loyalty Program changes this foundation completely. Instead of temporary benefits, it introduces a permanent relationship model where collectors are recognized not just for what they buy today, but for their long-term association with the House." },
      { type: 'p' as const, text: "At its core, OKBOND is not a marketing tool. It is a collector ecosystem designed to reward continuity, trust, and loyalty over a lifetime." },

      { type: 'h2' as const, text: "The Philosophy Behind OKBOND" },
      { type: 'p' as const, text: "The philosophy of OKBOND is built on a simple idea: true luxury relationships are not seasonal — they are lifelong. Rather than focusing on one-time purchases, the system recognizes the collector as part of an evolving luxury journey. Each interaction with the House contributes to a long-term identity that grows stronger over time." },
      { type: 'p' as const, text: "This transforms the relationship from a simple buyer-and-seller dynamic into something far more meaningful — a Collector and House Partnership where loyalty itself becomes an asset that compounds with every interaction." },

      { type: 'quote' as const, text: "True luxury relationships are not seasonal — they are lifelong. Loyalty is not rewarded occasionally — it is continuously acknowledged." },

      { type: 'h2' as const, text: "Lifetime Benefits: A Permanent Value Structure" },
      { type: 'p' as const, text: "One of the most defining features of OKBOND is its Lifetime Benefit Program. Unlike traditional discounts that expire or require repeated qualification, OKBOND establishes a permanent advantage for verified members:" },
      { type: 'list' as const, text: "Lifetime benefits on eligible collections — no expiry or seasonal limitation." },
      { type: 'list' as const, text: "Applies across selected product categories throughout the House." },
      { type: 'list' as const, text: "Designed for long-term collector retention rather than short-term sales incentives." },
      { type: 'list' as const, text: "Creates a unique psychological and financial advantage for verified members." },
      { type: 'p' as const, text: "Instead of constantly searching for new offers, the collector builds value within a single trusted House — a relationship that grows more rewarding with each passing year." },

      { type: 'h2' as const, text: "Exclusive Allocations: Access Before Availability" },
      { type: 'p' as const, text: "In the world of high luxury, access is often more valuable than price. OKBOND introduces Exclusive Allocation Privileges, where members receive priority access to selected releases before they become publicly available:" },
      { type: 'list' as const, text: "Limited edition fragrances and seasonal vault releases." },
      { type: 'list' as const, text: "High jewelry drops and signature collection previews." },
      { type: 'list' as const, text: "Archive collectible objects and private curation selections." },
      { type: 'list' as const, text: "Releases not available through any standard retail channel." },
      { type: 'p' as const, text: "This system creates controlled scarcity while rewarding loyalty with early access. Collectors are not just buyers — they become first-access participants in the House"s creative cycle.' },

      { type: 'h2' as const, text: "VIP Ecosystem: A Structured Collector Hierarchy" },
      { type: 'p' as const, text: "The OKBOND program establishes a VIP ecosystem designed to recognize different levels of engagement and long-term value contribution. Rather than being purely status-based, this ecosystem reflects consistency of engagement, historical purchase behavior, and collector commitment over time." },
      { type: 'p' as const, text: "VIP ecosystem benefits may include:" },
      { type: 'list' as const, text: "Dedicated concierge support and private communication channels." },
      { type: 'list' as const, text: "Early product previews before any public announcement." },
      { type: 'list' as const, text: "Invitation-only events and private House experiences." },
      { type: 'list' as const, text: "Priority allocation queues for the most sought-after releases." },
      { type: 'p' as const, text: "This transforms luxury from a static experience into a living relationship system — one that evolves alongside the collector"s own journey.' },

      { type: 'h2' as const, text: "Why OKBOND Is Different from Traditional Loyalty Programs" },
      { type: 'p' as const, text: "Traditional loyalty systems operate on points systems, seasonal discounts, tier resets, and expiring benefits that place the burden of re-qualification on the collector. OKBOND removes these limitations through four foundational principles:" },
      { type: 'subh2' as const, text: "Permanence" },
      { type: 'p' as const, text: "Benefits do not expire. Once earned, collector status and advantages remain for life — not subject to annual renewal or periodic requalification cycles." },
      { type: 'subh2' as const, text: "Identity-Based Recognition" },
      { type: 'p' as const, text: "Collectors are recognized as part of a long-term ecosystem, not merely as repeat purchasers. Their history with the House becomes part of their collector identity." },
      { type: 'subh2' as const, text: "Allocation Access" },
      { type: 'p' as const, text: "Scarcity is managed through curated access, not mass distribution. This protects the exclusivity of limited releases and ensures verified members receive first consideration." },
      { type: 'subh2' as const, text: "Relationship Continuity" },
      { type: 'p' as const, text: "Every interaction strengthens collector status rather than resetting it. The program compounds value over time, not perpetual re-qualification cycles." },

      { type: 'h2' as const, text: "Psychological Value of Lifetime Membership" },
      { type: 'p' as const, text: "Luxury is deeply emotional. The idea of belonging plays a critical role in collector behavior. OKBOND creates a sense of permanence, emotional connection to the House, long-term identity association, and prestige through continuity." },
      { type: 'p' as const, text: "Collectors are not just purchasing products — they are entering a structured legacy system where their relationship with the House becomes as valuable as any individual acquisition." },

      { type: 'h2' as const, text: "Integration with Digital Identity Systems" },
      { type: 'p' as const, text: "In modern luxury ecosystems, loyalty and verification increasingly work together. OKBOND integrates naturally with digital ownership records, blockchain-based authenticity systems, collector identity verification, and NFT-backed certificates where applicable." },
      { type: 'p' as const, text: "This allows the loyalty program to become more than a marketing layer — it becomes part of the collector"s digital luxury identity, linking verified ownership to ongoing benefits in a transparent and secure way.' },

      { type: 'h2' as const, text: "Strategic Value for the House" },
      { type: 'p' as const, text: "From a business perspective, OKBOND is not only a loyalty program — it is a long-term value engine. It helps the House retain high-value collectors, reduce customer churn, increase lifetime value per collector, strengthen brand loyalty, and build predictable demand for limited releases." },
      { type: 'p' as const, text: "Instead of focusing on short-term sales cycles, the system focuses on collector lifetime engagement economics — a fundamentally different approach to building a luxury brand." },

      { type: 'h2' as const, text: "Emotional Ownership vs Transactional Buying" },
      { type: 'p' as const, text: "OKBOND shifts the psychology of luxury ownership. Instead of simply saying \"I bought this product,\" collectors begin to feel \"I am part of this House.\" This emotional transformation is what creates long-term brand strength in modern luxury markets." },
      { type: 'p' as const, text: "The difference between transactional buying and emotional ownership is the difference between a one-time customer and a lifelong collector — and OKBOND is designed specifically to cultivate the latter." },

      { type: 'h2' as const, text: "Future Vision of OKBOND" },
      { type: 'p' as const, text: "The future of OKBOND extends far beyond discounts or allocations. The program is designed to evolve into:" },
      { type: 'list' as const, text: "A global collector network connecting verified members across markets." },
      { type: 'list' as const, text: "Blockchain-linked membership identity with permanent verification." },
      { type: 'list' as const, text: "Cross-category luxury privileges spanning fragrance, jewelry, and archive objects." },
      { type: 'list' as const, text: "Intergenerational membership transfer for family collector dynasties." },
      { type: 'list' as const, text: "Integrated digital passport ecosystem linking verification to loyalty." },
      { type: 'list' as const, text: "AI-driven personalized luxury curation tailored to individual collector profiles." },
      { type: 'p' as const, text: "This positions OKBOND as a next-generation luxury operating system for collectors — one that grows in sophistication and value alongside the House itself." },

      { type: 'h2' as const, text: "Final Perspective" },
      { type: 'p' as const, text: "The OKBOND Lifetime Loyalty Program is built on a simple but powerful principle: luxury is not a transaction. It is a relationship that compounds over time. By combining lifetime benefits, exclusive allocations, and a structured VIP ecosystem, OKBOND transforms how collectors engage with luxury houses." },
      { type: 'p' as const, text: "It creates permanence in a world of temporary incentives, depth in a world of fast consumption, and identity in a world of transactional commerce. For collectors, it is not just a program — it is a long-term membership into a curated luxury universe where loyalty itself becomes value." },
    ],
  },

}

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState('')
  useEffect(() => { setUrl(window.location.href) }, [])
  const copyLink = () => { navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }
  const shareX = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
  const shareWA = () => window.open(`https://wa.me/?text=${encodeURIComponent(title + ' — ' + url)}`, '_blank')
  return (
    <div style={{ borderTop: '1px solid #1a1d2e', borderBottom: '1px solid #1a1d2e', padding: '24px 0', margin: '48px 0', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '8px', letterSpacing: '3px', color: '#555', marginRight: '8px' }}>SHARE</span>
      <button onClick={copyLink} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px', background: 'transparent', border: '1px solid #1a1d2e', color: copied ? '#d4af37' : '#666', fontSize: '9px', letterSpacing: '2px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4af37'; e.currentTarget.style.color = '#d4af37' }} onMouseLeave={e => { if (!copied) { e.currentTarget.style.borderColor = '#1a1d2e'; e.currentTarget.style.color = '#666' } }}>
        {copied ? '✓ COPIED' : '⎘ COPY LINK'}
      </button>
      <button onClick={shareX} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px', background: 'transparent', border: '1px solid #1a1d2e', color: '#666', fontSize: '9px', letterSpacing: '2px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4af37'; e.currentTarget.style.color = '#d4af37' }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1d2e'; e.currentTarget.style.color = '#666' }}>
        𝕏 &nbsp;POST
      </button>
      <button onClick={shareWA} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px', background: 'transparent', border: '1px solid #1a1d2e', color: '#666', fontSize: '9px', letterSpacing: '2px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4af37'; e.currentTarget.style.color = '#d4af37' }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1d2e'; e.currentTarget.style.color = '#666' }}>
        ✉ WHATSAPP
      </button>
    </div>
  )
}

export default function ArticleClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<ArticleData | null>(STATIC[slug] ?? null)
  const [loading, setLoading] = useState(!STATIC[slug])
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '-18%'])

  useEffect(() => {
    if (STATIC[slug]) return
    supabase.from('journal_posts').select('*').eq('slug', slug).single()
      .then(({ data }) => {
        if (data) setPost({ ...data, body: [{ type: 'p', text: data.content ?? data.excerpt ?? '' }], pullQuote: "", secondImage: '', nextSlug: '', nextTitle: "", nextImage: '', nextCategory: "" })
        setLoading(false)
      })
  }, [slug])

  if (loading) return (
    <div style={{ background: '#06070f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#d4af37' }}>LOADING</span>
    </div>
  )
  if (!post) return (
    <div style={{ background: '#06070f', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
      <span style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#555' }}>DISPATCH NOT FOUND</span>
      <Link href="/journal" style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#d4af37', border: '1px solid #d4af3740', padding: '10px 20px' }}>RETURN TO JOURNAL</Link>
    </div>
  )

  const readTime = Math.max(5, Math.ceil(post.body.filter(b => b.type === 'p').length * 1.4))
  const heroSrc = post.heroImage ?? post.cover_image ?? ''
  const isPortrait = post.heroImage === '/founders-portrait.jpg'
  const isInfograhic = heroSrc.includes('blockchain-passport')

  return (
    <div style={{ background: '#06070f', color: '#e0e0e8', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
      <motion.div className="fixed top-0 left-0 h-[2px] z-[100] origin-left" style={{ scaleX: scrollYProgress, background: '#d4af37' }} />

      {/* NAV */}
      <div className="sticky top-0 z-50 border-b" style={{ background: 'rgba(6,7,15,0.97)', backdropFilter: 'blur(16px)', borderColor: '#1a1d2e' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
          <Link href="/journal" className="flex items-center gap-3">
            <span style={{ color: '#d4af37', fontSize: '14px' }}>←</span>
            <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#666' }}>JOURNAL</span>
          </Link>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', color: '#d4af37', letterSpacing: '3px', fontWeight: 700 }}>SF</div>
          <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#444' }}>{post.category}</span>
        </div>
      </div>

      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', height: isInfograhic ? 'clamp(380px, 60vw, 700px)' : 'clamp(520px, 80vh, 860px)', overflow: 'hidden' }}>
        <motion.img
          src={heroSrc} alt={post.title}
          style={{
            y: heroY, position: 'absolute', top: 0, left: 0, right: 0,
            width: '100%', height: '115%',
            objectFit: isInfograhic ? 'contain' : 'cover',
            objectPosition: isPortrait ? '50% 12%' : isInfograhic ? 'center center' : 'center 20%',
            background: isInfograhic ? '#06070f' : undefined,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: isInfograhic ? 'linear-gradient(to bottom, rgba(6,7,15,0) 0%, rgba(6,7,15,0) 55%, rgba(6,7,15,0.85) 80%, #06070f 100%)' : 'linear-gradient(to bottom, rgba(6,7,15,0.05) 0%, rgba(6,7,15,0.1) 30%, rgba(6,7,15,0.75) 68%, #06070f 100%)' }} />
        {!isInfograhic && <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,7,15,0.12)' }} />}

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(28px,6vw,68px)' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37' }}>{post.category}</span>
              <div style={{ width: '1px', height: '10px', background: '#333' }} />
              <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#555' }}>
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
              </span>
              <div style={{ width: '1px', height: '10px', background: '#333' }} />
              <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#555' }}>{readTime} MIN READ</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 68px)', fontWeight: 700, lineHeight: 1.05, color: '#ffffff', letterSpacing: '-0.02em', maxWidth: '780px', marginBottom: '14px' }}>
              {post.title}
            </h1>
            <p style={{ fontSize: 'clamp(12px, 1.3vw, 16px)', color: '#aaa', lineHeight: 1.65, maxWidth: '580px', fontWeight: 300 }}>
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article style={{ maxWidth: '700px', margin: '0 auto', padding: 'clamp(36px,6vw,72px) clamp(20px,5vw,40px)' }}>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, ease }}
          style={{ width: '48px', height: '2px', background: '#d4af37', marginBottom: '44px', transformOrigin: 'left' }} />

        {post.body.map((block, i) => {
          if (block.type === 'h2') return (
            <motion.h2 key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px, 2.2vw, 26px)', fontWeight: 700, color: '#f0f0f0', lineHeight: 1.25, marginTop: '52px', marginBottom: '18px', letterSpacing: '-0.01em' }}>
              {block.text}
            </motion.h2>
          )
          if (block.type === 'subh2') return (
            <motion.h3 key={i}
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              style={{ fontSize: 'clamp(13px, 1.5vw, 17px)', fontWeight: 600, color: '#d4af37', lineHeight: 1.3, marginTop: '28px', marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
              {block.text}
            </motion.h3>
          )
          if (block.type === 'quote') return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              style={{ margin: '48px 0', padding: '26px 30px', borderLeft: '3px solid #d4af37', background: 'rgba(212,175,55,0.05)' }}>
              <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px, 1.9vw, 22px)', fontStyle: 'italic', color: '#d4c87a', lineHeight: 1.6 }}>
                "{block.text}"
              </blockquote>
            </motion.div>
          )
          if (block.type === 'list') return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '10px', paddingLeft: '8px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#d4af37', flexShrink: 0, marginTop: '8px' }} />
              <p style={{ fontSize: 'clamp(13px, 1.25vw, 16px)', fontWeight: 300, color: '#8a8aa8', lineHeight: 1.75, margin: 0 }}>
                {block.text}
              </p>
            </motion.div>
          )
          return (
            <motion.p key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              style={{ fontSize: i === 0 ? 'clamp(15px, 1.55vw, 19px)' : 'clamp(13px, 1.25vw, 16px)', fontWeight: i === 0 ? 400 : 300, color: i === 0 ? '#ccc' : '#8a8aa8', lineHeight: 1.95, marginBottom: '26px' }}>
              {block.text}
            </motion.p>
          )
        })}

        {/* SECOND IMAGE */}
        {post.secondImage && (
          post.secondImageStyle === 'ecosystem' ? (
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1, ease }} style={{ margin: '60px -20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #d4af3770)' }} />
                  <span style={{ fontSize: '9px', letterSpacing: '4px', color: '#d4af37', fontFamily: "'Inter', sans-serif" }}>THE ECOSYSTEM</span>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #d4af3770)' }} />
                </div>
              </div>
              <div style={{ position: 'relative', padding: '2px', background: 'linear-gradient(135deg, #d4af37 0%, #8a6914 35%, #d4af37 65%, #5a4008 100%)' }}>
                <div style={{ position: 'relative', background: '#06070f' }}>
                  <img src={post.secondImage} alt="Orakzai Ecosystem" style={{ width: '100%', display: 'block', aspectRatio: '1 / 1', objectFit: 'cover', opacity: 0.95 }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 55%, rgba(6,7,15,0.55) 100%)' }} />
                </div>
              </div>
              {post.secondImageCaption && <p style={{ textAlign: 'center', padding: '14px 16px', fontSize: '10px', color: '#666', letterSpacing: '0.05em', lineHeight: 1.6, fontStyle: 'italic' }}>{post.secondImageCaption}</p>}
            </motion.div>
          ) : (
            <motion.figure initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }} style={{ margin: '52px -20px' }}>
              <img src={post.secondImage} alt="" style={{ width: '100%', aspectRatio: '16/7', objectFit: 'cover', display: 'block' }} />
              {post.secondImageCaption && <figcaption style={{ padding: '10px 4px 14px', fontSize: '10px', color: '#555', letterSpacing: '0.05em', lineHeight: 1.5, borderBottom: '1px solid #1a1d2e' }}>{post.secondImageCaption}</figcaption>}
            </motion.figure>
          )
        )}

        <ShareButtons title={post.title} />

        <div style={{ paddingTop: '24px', borderTop: '1px solid #1a1d2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#d4af37' }}>{post.category}</span>
          <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#444' }}>
            {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </span>
        </div>
      </article>

      {/* NEXT ARTICLE */}
      {post.nextSlug && (
        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} style={{ borderTop: '1px solid #1a1d2e' }}>
          <Link href={`/journal/${post.nextSlug}`} className="grid grid-cols-1 md:grid-cols-2 group">
            <div style={{ padding: 'clamp(36px,5vw,64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '1px solid #1a1d2e' }} className="md:border-b-0 md:border-r border-[#1a1d2e]">
              <span style={{ fontSize: '8px', letterSpacing: '3px', color: '#555', marginBottom: '10px', display: 'block' }}>NEXT DISPATCH</span>
              <span style={{ fontSize: '8px', letterSpacing: '3px', color: '#d4af37', marginBottom: '14px', display: 'block' }}>{post.nextCategory}</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 2.6vw, 36px)', fontWeight: 700, color: '#f0f0f0', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.01em' }} className="group-hover:text-[#d4af37] transition-colors duration-500">
                {post.nextTitle}
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-5 h-px group-hover:w-10 transition-all duration-500" style={{ background: '#d4af37' }} />
                <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#d4af37' }}>READ ARTICLE →</span>
              </div>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '240px' }}>
              <img src={post.nextImage} alt={post.nextTitle} className="w-full h-full group-hover:scale-[1.05] transition-transform duration-[2000ms]" style={{ objectFit: 'cover', transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,7,15,0.3)' }} />
            </div>
          </Link>
        </motion.section>
      )}

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid #1a1d2e', padding: '24px clamp(20px,5vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/journal" style={{ fontSize: '9px', letterSpacing: '3px', color: '#555', display: 'flex', alignItems: 'center', gap: '10px' }} className="hover:text-[#d4af37] transition-colors">
          <span style={{ color: '#d4af37' }}>←</span> JOURNAL
        </Link>
        <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', color: '#d4af37', letterSpacing: '2px' }}>SHAMIM FOREVER</Link>
        <Link href="/shop" style={{ fontSize: '9px', letterSpacing: '3px', color: '#555' }} className="hover:text-[#d4af37] transition-colors">SHOP →</Link>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #06070f; }
        ::-webkit-scrollbar-thumb { background: #d4af3770; }
      `}</style>
    </div>
  )
}

