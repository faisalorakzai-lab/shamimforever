export type LearnEntry = {
  slug: string
  title: string
  category: string
  summary: string
  href?: string
}

export const LEARN_CATEGORIES = [
  "Start here",
  "The House",
  "Founders & Leadership",
  "The Art of Luxury",
  "Atelier",
  "Fragrance",
  "High Jewelry",
  "Beauty & Cosmetics",
  "Authenticity & Trust",
  "Technology & Innovation",
  "Sovereign Infrastructure",
  "Heritage & Legacy",
  "Shopping Guides",
  "Private Access",
  "Brand Glossary",
  "Learn FAQ",
] as const

export const LEARN_ENTRIES: LearnEntry[] = [
  // Start here
  { slug: "welcome", title: "Welcome to Shamim Forever", category: "Start here", summary: "An introduction to the House of Shamim Forever: a sovereign luxury house built around fragrance, high jewelry, couture, identity, and enduring legacy.", href: "/" },
  { slug: "what-is-shamim-forever", title: "What is Shamim Forever?", category: "Start here", summary: "Discover the House, its purpose, and the world of creations and services gathered under the Shamim Forever name.", href: "/about" },
  { slug: "meaning-behind-the-name", title: "The Meaning Behind the Name", category: "Start here", summary: "Shamim carries the idea of fragrance and presence; Forever expresses the House’s commitment to memory, permanence, and legacy.", },
  { slug: "our-philosophy", title: "Our Philosophy", category: "Start here", summary: "A philosophy of quiet power, intentional design, impeccable craft, and products made to become part of a personal story.", href: "/about" },
  { slug: "where-legacy-becomes-luxury", title: "Where Legacy Becomes Luxury", category: "Start here", summary: "Luxury becomes meaningful when it carries a story forward. This is the point where heritage, craft, and personal identity meet.", href: "/our-story" },

  // The House
  { slug: "our-story", title: "Our Story", category: "The House", summary: "The story of a digital-first luxury house connecting fragrance, jewelry, couture, and technology through one enduring identity.", href: "/our-story" },
  { slug: "our-heritage", title: "Our Heritage", category: "The House", summary: "Heritage at Shamim Forever is a living design language: the values, places, people, and memories that give each creation its point of view." },
  { slug: "vision-and-mission", title: "Vision & Mission", category: "The House", summary: "The House exists to create exceptional objects and experiences that preserve identity, reward intention, and remain meaningful across generations.", href: "/about" },
  { slug: "the-sovereign-luxury-house", title: "The Sovereign Luxury House", category: "The House", summary: "Sovereign luxury means creating with independence, responsibility, and a clear point of view rather than following the speed of the market.", href: "/about" },
  { slug: "our-values", title: "Our Values", category: "The House", summary: "Craft, discretion, authenticity, generosity, and long-term thinking shape how Shamim Forever designs, serves, and grows.", href: "/about" },
  { slug: "the-shamim-forever-standard", title: "The Shamim Forever Standard", category: "The House", summary: "The standard is simple: thoughtful design, premium materials, accountable provenance, and an experience worthy of the object.", },

  // Founders & Leadership
  { slug: "faisal-orakzai-founder-chairman", title: "Faisal Orakzai | Founder & Chairman", category: "Founders & Leadership", summary: "Meet Faisal Orakzai, Founder and Chairman of Shamim Forever, and learn how technology, identity, and luxury converge in the House.", href: "/faisal-orakzai" },
  { slug: "dr-asma-orakzai-chief-executive-officer", title: "Dr Asma Orakzai | Chief Executive Officer", category: "Founders & Leadership", summary: "Dr Asma Orakzai leads the House with a focus on service, standards, and the human experience behind every creation." },
  { slug: "dr-laiba-faisal-orakzai-director", title: "Dr Laiba Faisal Orakzai | Director", category: "Founders & Leadership", summary: "Dr Laiba Faisal Orakzai contributes to the House’s long-term direction, culture, and commitment to meaningful luxury." },
  { slug: "leadership-philosophy", title: "Leadership Philosophy", category: "Founders & Leadership", summary: "Shamim Forever is led with a long horizon: protect the identity, improve the craft, and make every decision worthy of the legacy it creates.", href: "/leadership-governance" },
  { slug: "the-people-behind-the-house", title: "The People Behind the House", category: "Founders & Leadership", summary: "A luxury house is made by people: designers, makers, curators, advisors, and clients who turn a point of view into a living culture.", href: "/team" },

  // The Art of Luxury
  { slug: "what-defines-true-luxury", title: "What Defines True Luxury?", category: "The Art of Luxury", summary: "True luxury is not only rarity or price. It is intention, material quality, precision, discretion, and the feeling that an object will outlast a season." },
  { slug: "craftsmanship-at-shamim-forever", title: "Craftsmanship at Shamim Forever", category: "The Art of Luxury", summary: "Craftsmanship is the discipline of turning a beautiful idea into a reliable, tactile, and lasting creation." },
  { slug: "premium-materials", title: "Premium Materials", category: "The Art of Luxury", summary: "Materials set the tone of an object. Their origin, finish, durability, and feel are considered as carefully as the silhouette." },
  { slug: "design-philosophy", title: "Design Philosophy", category: "The Art of Luxury", summary: "Shamim Forever design balances restraint and presence: fewer distractions, stronger forms, and details that reveal themselves over time." },
  { slug: "limited-creations", title: "Limited Creations", category: "The Art of Luxury", summary: "Limited creations protect the relationship between rarity, attention, and the people who collect a piece from the House." },
  { slug: "bespoke-creations", title: "Bespoke Creations", category: "The Art of Luxury", summary: "Bespoke work begins with listening and ends with a creation shaped around an individual story, preference, and occasion.", href: "/bespoke" },
  { slug: "the-value-of-exclusivity", title: "The Value of Exclusivity", category: "The Art of Luxury", summary: "Exclusivity is valuable when it preserves quality, privacy, and personal relevance—not when it creates empty distance." },

  // Atelier
  { slug: "what-is-an-atelier", title: "What is an Atelier?", category: "Atelier", summary: "An atelier is the creative and craft environment where ideas become finished objects through collaboration, patience, and expertise.", href: "/atelier" },
  { slug: "inside-the-shamim-forever-atelier", title: "Inside the Shamim Forever Atelier", category: "Atelier", summary: "Step inside a world of material studies, scent development, design decisions, finishing, and careful review before a creation reaches its collector." },
  { slug: "from-concept-to-creation", title: "From Concept to Creation", category: "Atelier", summary: "Every creation moves through a sequence of intention, research, prototyping, refinement, and final presentation." },
  { slug: "bespoke-design-process", title: "Bespoke Design Process", category: "Atelier", summary: "The bespoke process translates a client’s brief into a considered design through consultation, direction, revision, and approval.", href: "/bespoke" },
  { slug: "custom-orders", title: "Custom Orders", category: "Atelier", summary: "Custom orders are private commissions for clients who want a creation tailored to their preferences, story, or collection.", href: "/bespoke" },

  // Fragrance
  { slug: "the-art-of-fine-fragrance", title: "The Art of Fine Fragrance", category: "Fragrance", summary: "Fine fragrance is the art of composing materials into an atmosphere that moves with the wearer and stays in memory." },
  { slug: "understanding-perfume-notes", title: "Understanding Perfume Notes", category: "Fragrance", summary: "Top, heart, and base notes describe how a fragrance unfolds—from its first impression to the deeper character that remains." },
  { slug: "how-luxury-fragrances-are-created", title: "How Luxury Fragrances Are Created", category: "Fragrance", summary: "A luxury fragrance develops through a creative brief, material selection, trials, evaluation, and patient refinement." },
  { slug: "fragrance-collections", title: "Fragrance Collections", category: "Fragrance", summary: "Explore fragrance as a collection of distinct moods, materials, and stories rather than a single signature.", href: "/collections" },
  { slug: "how-to-choose-your-signature-scent", title: "How to Choose Your Signature Scent", category: "Fragrance", summary: "The right signature scent should feel natural on your skin, suit your world, and leave a memory that belongs to you." },
  { slug: "fragrance-care-and-storage", title: "Fragrance Care & Storage", category: "Fragrance", summary: "Protect fragrance from heat, direct sunlight, and unnecessary air exposure so its character remains stable and expressive." },

  // High Jewelry
  { slug: "the-world-of-high-jewelry", title: "The World of High Jewelry", category: "High Jewelry", summary: "High jewelry brings together exceptional materials, complex making, and a point of view strong enough to become part of a family story." },
  { slug: "precious-materials", title: "Precious Materials", category: "High Jewelry", summary: "Metals and gemstones are selected for their beauty, integrity, provenance, and ability to support the design." },
  { slug: "jewelry-craftsmanship", title: "Jewelry Craftsmanship", category: "High Jewelry", summary: "Jewelry craftsmanship is measured in proportion, setting, polish, structure, comfort, and the quiet precision of every finish." },
  { slug: "jewelry-care-guide", title: "Jewelry Care Guide", category: "High Jewelry", summary: "Simple care—separate storage, gentle cleaning, and professional inspection—helps preserve the brilliance and structure of a cherished piece." },
  { slug: "understanding-authenticity", title: "Understanding Authenticity", category: "High Jewelry", summary: "Authenticity connects the physical creation to its documentation, provenance, materials, and the House’s record of ownership.", href: "/authenticate" },

  // Beauty & Cosmetics
  { slug: "luxury-beauty-philosophy", title: "Luxury Beauty Philosophy", category: "Beauty & Cosmetics", summary: "Luxury beauty is a ritual of care, sensation, and confidence—designed with the same thoughtfulness as the House’s other creations." },
  { slug: "product-ingredients", title: "Product Ingredients", category: "Beauty & Cosmetics", summary: "Ingredients matter for their performance, compatibility, sensory quality, and the integrity of the overall formulation." },
  { slug: "beauty-product-care-and-storage", title: "Beauty Product Care & Storage", category: "Beauty & Cosmetics", summary: "Keep beauty products sealed, clean, and away from excessive heat to preserve their performance and finish." },

  // Authenticity & Trust
  { slug: "how-to-authenticate-shamim-forever-products", title: "How to Authenticate Shamim Forever Products", category: "Authenticity & Trust", summary: "Use the House’s product identity, certificate, serial details, and verification experience together when checking a creation.", href: "/authenticate" },
  { slug: "what-is-product-provenance", title: "What is Product Provenance?", category: "Authenticity & Trust", summary: "Product provenance is the documented history of a creation: where it came from, how it was made, and how it moved through its life." },
  { slug: "digital-product-identity", title: "Digital Product Identity", category: "Authenticity & Trust", summary: "A digital product identity gives a physical creation a persistent record that can support verification, care, and responsible ownership.", href: "/dna-identity" },
  { slug: "certificates-of-authenticity", title: "Certificates of Authenticity", category: "Authenticity & Trust", summary: "A certificate of authenticity connects the creation to its identifying information and provides a clear reference for the collector." },
  { slug: "anti-counterfeit-protection", title: "Anti-Counterfeit Protection", category: "Authenticity & Trust", summary: "Layered identity, documentation, and verification help protect collectors and preserve trust in the House." },
  { slug: "product-verification", title: "Product Verification", category: "Authenticity & Trust", summary: "Verification is a practical way to check that the physical product and its digital or documentary identity belong together.", href: "/authenticate" },
  { slug: "ownership-records", title: "Ownership Records", category: "Authenticity & Trust", summary: "Ownership records help preserve a creation’s story while respecting the privacy and discretion of its collector.", href: "/vault" },
  { slug: "the-future-of-luxury-authentication", title: "The Future of Luxury Authentication", category: "Authenticity & Trust", summary: "The future combines beautiful physical objects with secure, useful, and understandable digital records." },

  // Technology & Innovation
  { slug: "technology-behind-shamim-forever", title: "Technology Behind Shamim Forever", category: "Technology & Innovation", summary: "Technology supports the House quietly: identity, commerce, verification, service, and access should feel seamless to the client." },
  { slug: "digital-identity", title: "Digital Identity", category: "Technology & Innovation", summary: "Digital identity gives a creation and its owner a trusted layer of recognition across the life of the relationship.", href: "/dna-identity" },
  { slug: "blockchain-and-luxury", title: "Blockchain & Luxury", category: "Technology & Innovation", summary: "Blockchain can help luxury brands create durable, auditable records for provenance, authenticity, and ownership." },
  { slug: "product-provenance-technology", title: "Product Provenance Technology", category: "Technology & Innovation", summary: "Provenance technology links events in a product’s life into a record that can be checked without losing the meaning of the physical object." },
  { slug: "digital-certificates", title: "Digital Certificates", category: "Technology & Innovation", summary: "Digital certificates make important product information easier to preserve, access, and verify over time." },
  { slug: "future-of-luxury-technology", title: "Future of Luxury Technology", category: "Technology & Innovation", summary: "The best luxury technology disappears into the experience while making trust, service, and personal ownership stronger." },
  { slug: "ai-and-luxury-experiences", title: "AI & Luxury Experiences", category: "Technology & Innovation", summary: "AI can make discovery and service more personal, provided taste, privacy, and human judgment remain at the centre." },
  { slug: "digital-ownership", title: "Digital Ownership", category: "Technology & Innovation", summary: "Digital ownership adds a responsible record and a new way to care for, transfer, and experience a valuable creation.", href: "/vault" },

  // Sovereign Infrastructure
  { slug: "authenticate", title: "Authenticate", category: "Sovereign Infrastructure", summary: "The House’s verification experience helps collectors confirm a product’s identity and provenance.", href: "/authenticate" },
  { slug: "dna-identity", title: "DNA Identity", category: "Sovereign Infrastructure", summary: "DNA Identity is the House’s language for the unique digital and physical signature attached to a creation.", href: "/dna-identity" },
  { slug: "heritage-gallery", title: "Heritage Gallery", category: "Sovereign Infrastructure", summary: "The Heritage Gallery preserves the visual language, moments, and creations that build the House’s memory.", href: "/gallery" },
  { slug: "heirloom-vault", title: "Heirloom Vault", category: "Sovereign Infrastructure", summary: "The Heirloom Vault is a private-minded space for preserving the story, identity, and continuity of treasured creations.", href: "/heirloom-vault" },
  { slug: "sovereign-vault", title: "Sovereign Vault", category: "Sovereign Infrastructure", summary: "The Sovereign Vault brings ownership, identity, and access together around the long life of a creation.", href: "/vault" },
  { slug: "sovereign-aura", title: "Sovereign Aura", category: "Sovereign Infrastructure", summary: "Sovereign Aura is the emotional and experiential layer around a creation: presence, recognition, and a world of meaning.", href: "/sovereign-aura" },
  { slug: "time-archive", title: "Time Archive", category: "Sovereign Infrastructure", summary: "The Time Archive gives important moments, records, and milestones a place to remain connected to the House.", href: "/time-archive" },
  { slug: "concierge-and-care", title: "Concierge & Care", category: "Sovereign Infrastructure", summary: "Concierge and care extend the life of a creation through guidance, attention, and responsive service.", href: "/care" },
  { slug: "private-delivery", title: "Private Delivery", category: "Sovereign Infrastructure", summary: "Private delivery is a considered experience from dispatch to arrival, designed around discretion and the value of the object.", href: "/delivery" },
  { slug: "whitelist-access", title: "Whitelist Access", category: "Sovereign Infrastructure", summary: "Whitelist access creates a deliberate path to private invitations, collections, and House experiences." },

  // Heritage & Legacy
  { slug: "what-is-a-luxury-legacy", title: "What is a Luxury Legacy?", category: "Heritage & Legacy", summary: "A luxury legacy is what remains when an object carries values, memories, and meaning beyond its original moment." },
  { slug: "building-an-heirloom", title: "Building an Heirloom", category: "Heritage & Legacy", summary: "An heirloom is built through quality, care, story, and the decision to keep something meaningful in the family.", href: "/heirloom-vault" },
  { slug: "preserving-heritage", title: "Preserving Heritage", category: "Heritage & Legacy", summary: "Preserving heritage means recording what matters while allowing each generation to give it new life." },
  { slug: "the-meaning-of-forever", title: "The Meaning of Forever", category: "Heritage & Legacy", summary: "Forever is not a claim that time stands still; it is a commitment to make meaning durable as people and seasons change." },
  { slug: "from-love-to-legacy", title: "From Love to Legacy", category: "Heritage & Legacy", summary: "The most powerful luxury objects begin with care and become legacy when that care is carried forward.", },
  { slug: "the-shamim-forever-story", title: "The Shamim Forever Story", category: "Heritage & Legacy", summary: "Follow the House’s story from a vision of sovereign luxury to a living world of products, identity, and service.", href: "/our-story" },
  { slug: "legacy-through-generations", title: "Legacy Through Generations", category: "Heritage & Legacy", summary: "A creation earns its place across generations through durability, adaptability, provenance, and the stories people attach to it." },

  // Shopping Guides
  { slug: "how-to-shop-shamim-forever", title: "How to Shop Shamim Forever", category: "Shopping Guides", summary: "Begin with the collection or experience that speaks to you, then use the House’s guidance and concierge support to choose with confidence.", href: "/shop" },
  { slug: "understanding-our-collections", title: "Understanding Our Collections", category: "Shopping Guides", summary: "Collections bring related materials, moods, and stories together so you can navigate the House with a clearer point of view.", href: "/collections" },
  { slug: "how-bespoke-orders-work", title: "How Bespoke Orders Work", category: "Shopping Guides", summary: "A bespoke order moves from private conversation to creative direction, proposal, approval, making, and delivery.", href: "/bespoke" },
  { slug: "private-orders", title: "Private Orders", category: "Shopping Guides", summary: "Private orders are handled with discretion and a more personal path through availability, timing, and delivery." },
  { slug: "international-orders", title: "International Orders", category: "Shopping Guides", summary: "International clients can work with the House and concierge team to understand destination, timing, and delivery considerations." },
  { slug: "delivery-information", title: "Delivery Information", category: "Shopping Guides", summary: "Delivery information covers how a creation moves from the House to you with appropriate care and communication.", href: "/delivery" },
  { slug: "returns-and-policies", title: "Returns & Policies", category: "Shopping Guides", summary: "Review the House’s policies before ordering so expectations around returns, exchanges, and bespoke work remain clear.", href: "/policies" },
  { slug: "product-care", title: "Product Care", category: "Shopping Guides", summary: "Good care protects the materials, performance, and story of a creation throughout its life.", href: "/care" },

  // Private Access
  { slug: "what-is-the-inner-circle", title: "What is the Inner Circle?", category: "Private Access", summary: "The Inner Circle is a relationship-led layer of access for clients who want a closer connection to the House.", href: "/inner-circle" },
  { slug: "private-client-services", title: "Private Client Services", category: "Private Access", summary: "Private client services bring together personal guidance, early access, bespoke support, and a discreet relationship with the House.", href: "/concierge" },
  { slug: "concierge-services", title: "Concierge Services", category: "Private Access", summary: "Concierge services help clients discover, select, commission, care for, and live with Shamim Forever creations.", href: "/concierge" },
  { slug: "virtual-atelier", title: "Virtual Atelier", category: "Private Access", summary: "The Virtual Atelier brings the House’s creative conversation to clients wherever they are.", href: "/virtual-atelier" },
  { slug: "bespoke-access", title: "Bespoke Access", category: "Private Access", summary: "Bespoke access opens a more personal route into commissions, private collections, and House expertise.", href: "/bespoke" },
  { slug: "private-collections", title: "Private Collections", category: "Private Access", summary: "Private collections are carefully held expressions of the House for clients seeking rarity, continuity, and discretion." },

  // Brand Glossary
  { slug: "glossary-atelier", title: "Atelier", category: "Brand Glossary", summary: "A creative workshop or studio where ideas, materials, and specialist craft come together." },
  { slug: "glossary-bespoke", title: "Bespoke", category: "Brand Glossary", summary: "Made for a particular person or purpose, with the design shaped through a private creative process." },
  { slug: "glossary-provenance", title: "Provenance", category: "Brand Glossary", summary: "The documented history and origin of a creation, including the events that establish its identity." },
  { slug: "glossary-authentication", title: "Authentication", category: "Brand Glossary", summary: "The process of checking that a creation is genuine and connected to the identity recorded by the House." },
  { slug: "glossary-heritage", title: "Heritage", category: "Brand Glossary", summary: "The values, stories, places, and practices passed forward and reinterpreted by the House." },
  { slug: "glossary-heirloom", title: "Heirloom", category: "Brand Glossary", summary: "A meaningful object preserved and passed through generations." },
  { slug: "glossary-digital-identity", title: "Digital Identity", category: "Brand Glossary", summary: "The persistent digital record that helps identify, verify, and care for a physical creation." },
  { slug: "glossary-certificate-of-authenticity", title: "Certificate of Authenticity", category: "Brand Glossary", summary: "A document or digital record connecting a creation to its identifying information and origin." },
  { slug: "glossary-sovereign-luxury", title: "Sovereign Luxury", category: "Brand Glossary", summary: "Luxury guided by independence, intention, responsibility, and a distinct point of view." },
  { slug: "glossary-private-client", title: "Private Client", category: "Brand Glossary", summary: "A client who works with the House through a more personal, discreet, and relationship-led experience." },
  { slug: "glossary-concierge", title: "Concierge", category: "Brand Glossary", summary: "A dedicated service relationship that helps a client navigate discovery, purchase, care, and access." },
  { slug: "glossary-limited-creation", title: "Limited Creation", category: "Brand Glossary", summary: "A creation made in a deliberately limited quantity to protect its rarity and attention to detail." },

  // Learn FAQ
  { slug: "faq-what-is-shamim-forever", title: "What is Shamim Forever?", category: "Learn FAQ", summary: "Shamim Forever is a sovereign luxury house offering fragrances, high jewelry, couture, digital identity, and private client experiences.", href: "/faq" },
  { slug: "faq-who-founded-shamim-forever", title: "Who founded Shamim Forever?", category: "Learn FAQ", summary: "Shamim Forever was founded by Faisal Orakzai, who serves as Founder and Chairman of the House.", href: "/faq" },
  { slug: "faq-where-is-shamim-forever-based", title: "Where is Shamim Forever based?", category: "Learn FAQ", summary: "The House has a global digital presence and serves clients internationally, with its identity rooted in Pakistan and a stated HQ in Puteaux, France.", href: "/faq" },
  { slug: "faq-what-products-does-shamim-forever-offer", title: "What products does Shamim Forever offer?", category: "Learn FAQ", summary: "The House works across fine fragrance, jewelry, beauty, couture, limited creations, and bespoke commissions.", href: "/faq" },
  { slug: "faq-what-does-sovereign-luxury-mean", title: "What does Sovereign Luxury mean?", category: "Learn FAQ", summary: "Sovereign Luxury means creating with independence, intention, responsibility, and a distinct cultural point of view.", href: "/faq" },
  { slug: "faq-how-does-product-authentication-work", title: "How does product authentication work?", category: "Learn FAQ", summary: "Authentication brings together a product’s physical details, certificate, serial information, and digital identity.", href: "/faq" },
  { slug: "faq-what-is-a-digital-product-identity", title: "What is a digital product identity?", category: "Learn FAQ", summary: "It is a persistent digital record that helps connect a physical creation to its provenance, verification, care, and ownership.", href: "/faq" },
  { slug: "faq-does-shamim-forever-offer-bespoke-services", title: "Does Shamim Forever offer bespoke services?", category: "Learn FAQ", summary: "Yes. Bespoke services give clients a private path to tailored creations, commissions, and design conversations.", href: "/faq" },
]

export const LEARN_ARTICLES = LEARN_ENTRIES.filter((entry) => !entry.href)

export function getLearnEntry(slug: string) {
  return LEARN_ARTICLES.find((entry) => entry.slug === slug)
}