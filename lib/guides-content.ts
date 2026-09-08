export type GuideFormat = 'Guide' | 'Research' | 'Framework' | 'Essay'

export type KnowledgeUniverse = {
  number: string
  slug: string
  title: string
  strapline: string
  description: string
  topics: string[]
  formats: GuideFormat[]
  href: string
}

export const knowledgeUniverses: KnowledgeUniverse[] = [
  {
    number: '01',
    slug: 'start-here',
    title: 'Start Here',
    strapline: 'An introduction to Shamim Forever knowledge',
    description: 'A considered beginning for readers discovering the House, its language, and the principles behind lasting value.',
    topics: ['Welcome to Shamim Forever', 'What is sovereign luxury?', 'The philosophy of lasting value', 'Understanding the House', 'Luxury beyond price'],
    formats: ['Guide', 'Essay'],
    href: '/learn#start-here',
  },
  {
    number: '02',
    slug: 'the-house',
    title: 'The House',
    strapline: 'The architecture of a luxury house',
    description: 'Explore what a serious house represents beyond a name, a store, or a collection: philosophy, continuity, governance, and institutional memory.',
    topics: ['House philosophy', 'Founding principles', 'The role of the atelier', 'Private client relationships', 'Brand governance', 'Long-term stewardship'],
    formats: ['Guide', 'Framework'],
    href: '/learn/the-house',
  },
  {
    number: '03',
    slug: 'luxury',
    title: 'Luxury',
    strapline: 'The deep study of lasting value',
    description: 'An evolving study of quality, rarity, craftsmanship, meaning, scarcity, heritage, collector markets, and the economics of attention.',
    topics: ['Philosophy of luxury', 'Scarcity economics', 'Perceived and intrinsic value', 'Collector markets', 'The value model'],
    formats: ['Guide', 'Research', 'Framework'],
    href: '/learn/luxury',
  },
  {
    number: '04',
    slug: 'our-world',
    title: 'Our World',
    strapline: 'Culture, geography, and the global luxury ecosystem',
    description: 'A global view of the cultural landscapes that shape taste, craft, identity, and the future of the luxury house.',
    topics: ['Paris and luxury', 'Milan and fashion', 'Swiss precision', 'Japanese craft philosophy', 'Middle Eastern luxury', 'South Asian heritage'],
    formats: ['Guide', 'Essay'],
    href: '/learn/our-world',
  },
  {
    number: '05',
    slug: 'authenticity',
    title: 'Authenticity',
    strapline: 'Trust, provenance, and identity',
    description: 'Educational research into why authenticity depends on evidence, documentation, material verification, history, and more than one signal.',
    topics: ['What is authenticity?', 'Provenance', 'Physical authentication', 'Digital identity', 'Supply-chain traceability', 'AI and counterfeit detection'],
    formats: ['Guide', 'Research', 'Framework'],
    href: '/learn/authenticity',
  },
  {
    number: '06',
    slug: 'innovation',
    title: 'Innovation',
    strapline: 'Technology and the future of luxury',
    description: 'A clear-eyed exploration of artificial intelligence, blockchain, digital provenance, extended reality, advanced materials, and generative design.',
    topics: ['AI in design', 'Computer vision', 'Digital certificates', 'Virtual ateliers', 'Digital twins', 'Future technologies'],
    formats: ['Guide', 'Research'],
    href: '/learn/innovation',
  },
  {
    number: '07',
    slug: 'sovereign-infrastructure',
    title: 'Sovereign Infrastructure',
    strapline: 'Understanding institutional systems',
    description: 'Guides explain the systems behind resilience, governance, data architecture, archives, security, and the continuity of a modern house.',
    topics: ['Organizational architecture', 'Digital infrastructure', 'Data architecture', 'Security systems', 'Governance', 'Operational resilience'],
    formats: ['Guide', 'Research', 'Framework'],
    href: '/learn/sovereign-infrastructure',
  },
  {
    number: '08',
    slug: 'craft-atelier',
    title: 'Craft & Atelier',
    strapline: 'The intelligence of human hands',
    description: 'The materials, decisions, skills, patience, and refinement that turn an idea into a creation with a life beyond launch.',
    topics: ['Materials', 'Fragrance', 'Jewelry', 'Leather', 'Embroidery', 'Tailoring', 'Object design'],
    formats: ['Guide', 'Essay', 'Framework'],
    href: '/atelier',
  },
  {
    number: '09',
    slug: 'heritage',
    title: 'Heritage',
    strapline: 'Memory, culture, and continuity',
    description: 'Luxury without memory can become temporary decoration. Heritage introduces the archives, stories, and knowledge that create continuity.',
    topics: ['Cultural memory', 'Family archives', 'House archives', 'Traditional craft', 'Oral histories', 'Preservation technology'],
    formats: ['Guide', 'Essay', 'Research'],
    href: '/our-story',
  },
  {
    number: '10',
    slug: 'ownership-stewardship',
    title: 'Ownership & Stewardship',
    strapline: 'Beyond buying',
    description: 'A responsible collection is cared for, documented, preserved, restored, and carried forward with intention.',
    topics: ['Responsible ownership', 'Object preservation', 'Maintenance', 'Collection management', 'Restoration', 'Intergenerational transfer'],
    formats: ['Guide', 'Framework'],
    href: '/care',
  },
]

export const learningPaths = [
  {
    number: 'PATH 01',
    title: 'The Beginner',
    subtitle: 'Understanding luxury',
    description: 'A first passage through luxury, quality, craftsmanship, rarity, heritage, provenance, and lasting value.',
    topics: ['What is luxury?', 'Luxury vs premium', 'Quality', 'Craftsmanship', 'Rarity', 'Heritage', 'Provenance'],
    time: '2 hours',
    href: '/guides#luxury',
  },
  {
    number: 'PATH 02',
    title: 'The Collector',
    subtitle: 'Understanding ownership',
    description: 'A path for those who want to understand authenticity, records, preservation, archives, restoration, and care.',
    topics: ['Authenticity', 'Provenance', 'Documentation', 'Preservation', 'Archives', 'Collection management'],
    time: '3 hours',
    href: '/guides#authenticity',
  },
  {
    number: 'PATH 03',
    title: 'The Creator',
    subtitle: 'Understanding craft',
    description: 'Follow materials, design, atelier practice, production, quality, craftsmanship, and innovation.',
    topics: ['Materials', 'Design', 'Atelier', 'Production', 'Quality', 'Craftsmanship'],
    time: '2.5 hours',
    href: '/guides#craft-atelier',
  },
  {
    number: 'PATH 04',
    title: 'The Technologist',
    subtitle: 'Luxury × technology',
    description: 'A route through artificial intelligence, digital identity, blockchain, digital twins, and virtual experiences.',
    topics: ['Artificial intelligence', 'Blockchain', 'Digital identity', 'Digital twins', 'Computer vision'],
    time: '3 hours',
    href: '/guides#innovation',
  },
  {
    number: 'PATH 05',
    title: 'The Researcher',
    subtitle: 'Deep research',
    description: 'A research-oriented route through white papers, mathematical models, system architecture, and institutional research.',
    topics: ['White papers', 'Research frameworks', 'Mathematical models', 'System architecture', 'Institutional research'],
    time: '4 hours',
    href: '/whitepapers',
  },
]

export const glossaryTerms = [
  {
    term: 'Authenticity',
    definition: 'The degree to which an object, identity, record, or claim can be verified as genuine according to relevant evidence and verification systems.',
  },
  {
    term: 'Provenance',
    definition: 'The documented history of an object’s origin, ownership, movement, or development.',
  },
  {
    term: 'Sovereign Luxury',
    definition: 'A conceptual framework describing luxury designed around long-term independence, identity, standards, stewardship, and institutional continuity.',
  },
  {
    term: 'Atelier',
    definition: 'A place and practice where material knowledge, design direction, skilled making, refinement, and approval meet.',
  },
  {
    term: 'Heritage',
    definition: 'The memory, knowledge, culture, and continuity carried forward by a person, family, craft, collection, or house.',
  },
  {
    term: 'Stewardship',
    definition: 'The responsibility to care for, document, preserve, and thoughtfully carry something of value into the future.',
  },
]