import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Welcome to Shamim Forever | Learn",
  description: "A deep introduction to Shamim Forever: a sovereign luxury house built around craftsmanship, identity, provenance, heritage, technology, and legacy.",
  keywords: [
    "Shamim Forever",
    "sovereign luxury",
    "luxury house",
    "luxury craftsmanship",
    "product provenance",
    "digital identity",
    "luxury authentication",
    "heritage and legacy",
  ],
  alternates: { canonical: "https://www.shamimforever.com/learn" },
  openGraph: {
    title: "Welcome to Shamim Forever | Learn",
    description: "Understand the House, its philosophy, craftsmanship, provenance, digital identity, and approach to sovereign luxury.",
    url: "https://www.shamimforever.com/learn",
    type: "article",
    siteName: "Shamim Forever",
    images: [{ url: "/og-faisal-orakzai.jpg", width: 1200, height: 630, alt: "Shamim Forever knowledge library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to Shamim Forever | Learn",
    description: "The canonical knowledge page for Shamim Forever.",
    images: ["/og-faisal-orakzai.jpg"],
  },
  robots: { index: true, follow: true },
}

const navigation = [
  ["Start here", "start-here"],
  ["The House", "the-house"],
  ["Luxury", "luxury"],
  ["Our World", "our-world"],
  ["Authenticity", "authenticity"],
  ["Innovation", "innovation"],
  ["Sovereign Infrastructure", "sovereign-infrastructure"],
  ["Guides", "guides"],
  ["Glossary", "glossary"],
  ["FAQ", "faq"],
] as const

const chapterDirectory = [
  ["START HERE", "start-here", ["Welcome to Shamim Forever", "What is Shamim Forever?", "Our Philosophy"]],
  ["THE HOUSE", "the-house", ["Our Story", "Heritage & Legacy", "Vision & Mission", "Founders & Leadership"]],
  ["LUXURY", "luxury", ["The Art of Luxury", "Craftsmanship", "Atelier", "Bespoke"]],
  ["OUR WORLD", "our-world", ["Fragrance", "High Jewelry", "Beauty"]],
  ["AUTHENTICITY", "authenticity", ["Product Authentication", "Digital Identity", "Provenance", "Certificates"]],
  ["INNOVATION", "innovation", ["Technology & Luxury", "Blockchain", "AI Experiences", "Digital Ownership"]],
  ["SOVEREIGN INFRASTRUCTURE", "sovereign-infrastructure", ["Authenticate", "DNA Identity", "Heritage Gallery", "Heirloom Vault", "Sovereign Vault", "Time Archive"]],
  ["GUIDES", "guides", ["Shopping Guides", "Product Care", "Bespoke Orders", "Private Clients"]],
  ["GLOSSARY", "glossary", ["Shamim Forever Glossary"]],
  ["FAQ", "faq", ["Frequently Asked Questions"]],
] as const

const mapCards = [
  {
    number: "01",
    mark: "The House",
    title: "The world behind the name",
    text: "Learn about Shamim Forever, its philosophy, heritage, vision, and the idea of a sovereign luxury house.",
    topics: "Story · Values · Vision · Legacy",
    href: "/learn#start-here",
  },
  {
    number: "02",
    mark: "Luxury",
    title: "The art of lasting value",
    text: "Understand how intention, craftsmanship, scarcity, discretion, and meaning shape exceptional luxury.",
    topics: "Craft · Materials · Bespoke · Exclusivity",
    href: "/learn#luxury",
  },
  {
    number: "03",
    mark: "Craft & Atelier",
    title: "Where ideas become creations",
    text: "Follow the movement from creative brief to material study, prototype, refinement, and final presentation.",
    topics: "Atelier · Design · Materials · Making",
    href: "/learn#luxury",
  },
  {
    number: "04",
    mark: "Authenticity",
    title: "The architecture of trust",
    text: "Explore identity, provenance, certificates, verification, and the systems that protect a meaningful object.",
    topics: "Identity · Provenance · Verification · Care",
    href: "/learn#authenticity",
  },
  {
    number: "05",
    mark: "Technology",
    title: "The quiet intelligence behind luxury",
    text: "Discover how digital identity, blockchain concepts, AI, and future systems can strengthen the human experience.",
    topics: "Digital identity · Records · AI · Future",
    href: "/learn#innovation",
  },
  {
    number: "06",
    mark: "Glossary",
    title: "The language of the House",
    text: "Build fluency in the words that shape Shamim Forever: atelier, bespoke, provenance, heirloom, and sovereign luxury.",
    topics: "Definitions · Concepts · Principles · Terms",
    href: "/learn#glossary",
  },
]

const essentials = [
  ["01", "What is Shamim Forever?", "A sovereign luxury house built around heritage, craftsmanship, identity, and lasting value.", "5 min read", "/learn#start-here"],
  ["02", "What is Sovereign Luxury?", "A philosophy where luxury represents independence, identity, authenticity, and legacy.", "7 min read", "/learn#luxury"],
  ["03", "Built From Love. Forged Into Legacy.", "Discover the philosophy behind the Shamim Forever identity and the meaning of forever.", "6 min read", "/learn#the-house"],
  ["04", "Why does authenticity matter?", "Understand trust, provenance, and the protection of valuable creations.", "8 min read", "/learn#authenticity"],
]

const levels = [
  ["Beginner", "For first-time visitors", "What is Shamim Forever? · What is luxury? · What is an atelier? · What is bespoke? · What is authenticity?"],
  ["Intermediate", "Go deeper", "Product provenance · Digital identity · Heritage preservation · Luxury craftsmanship · Authentication systems"],
  ["Advanced", "Explore complex concepts", "Digital provenance architecture · Distributed identity · Blockchain & luxury · AI & authentication"],
]

const algorithmSteps = ["Idea", "Design", "Craft", "Identity", "Authentication", "Ownership", "Preservation", "Heritage", "Legacy"]

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[9px] uppercase tracking-[0.45em] text-[#c9a054]">
      <span className="mr-3 text-zinc-700">{number}</span>{children}
    </p>
  )
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-[#292218] bg-[#0a0907] px-5 py-6 font-mono text-sm leading-8 text-[#d5b477] md:px-8 md:text-base">
      {children}
    </div>
  )
}

export default function LearnPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-zinc-200">
      <section className="relative border-b border-[#1b1814] px-5 pb-24 pt-36 md:px-12 md:pb-32 md:pt-48 lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(200,169,107,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,107,0.05)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="pointer-events-none absolute right-[-12rem] top-24 h-[34rem] w-[34rem] rounded-full bg-[#8d7348]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="mb-7 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Learn → Start Here → Welcome to Shamim Forever</p>
              <h1 className="max-w-5xl font-serif text-6xl font-light leading-[0.88] tracking-[0.035em] text-[#f3efe7] md:text-[8.5rem]">
                Welcome to
                <span className="block text-[#c9a054]">Shamim Forever.</span>
              </h1>
              <p className="mt-7 font-serif text-2xl font-light text-zinc-300 md:text-4xl">Where Legacy Becomes Luxury.</p>
              <p className="mt-10 max-w-2xl text-sm font-light leading-8 tracking-wide text-zinc-400 md:text-base">
                Shamim Forever is a sovereign luxury house built around the idea that meaningful objects should outlive trends.
              </p>
              <p className="mt-5 max-w-2xl text-sm font-light leading-8 tracking-wide text-zinc-600">
                We explore luxury through craftsmanship, identity, provenance, heritage, technology, and long-term cultural value.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#start-here" className="border border-[#c9a054] bg-[#c9a054] px-6 py-4 text-[9px] uppercase tracking-[0.32em] text-[#090806] transition-colors hover:bg-[#e4c98f]">
                  Begin learning
                </a>
                <Link href="/about" className="border border-[#3c3223] px-6 py-4 text-[9px] uppercase tracking-[0.32em] text-[#c9a054] transition-colors hover:border-[#c9a054]">
                  Explore the House →
                </Link>
              </div>
            </div>
            <div className="relative lg:pb-3">
              <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full opacity-80 [background:conic-gradient(from_180deg_at_50%_50%,#c9a05433,#7dd3fc22,#d946ef22,#c9a05433)] blur-[1px] [mask-image:radial-gradient(circle,black_35%,transparent_70%)]" />
              <div className="pointer-events-none absolute right-8 top-5 h-28 w-28 rounded-full border border-[#c9a054]/30 shadow-[0_0_35px_rgba(201,160,84,0.18)]">
                <span className="absolute inset-3 rounded-full border border-cyan-200/20" />
                <span className="absolute inset-7 rounded-full border border-fuchsia-300/20" />
              </div>
              <div className="absolute -right-5 -top-8 font-serif text-8xl font-light text-[#c9a054]/10 md:text-[11rem]">∑</div>
              <div className="relative border border-[#3a3022] bg-[#080807]/90 p-6 backdrop-blur-sm md:p-8">
                <p className="text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">The Shamim Forever Value Framework</p>
                <div className="mt-10 space-y-2 font-mono text-sm text-zinc-300 md:text-base">
                  <p><span className="text-[#c9a054]">L</span> = <span className="text-zinc-500">f</span>(<span className="text-[#c9a054]">H</span>, <span className="text-[#c9a054]">C</span>, <span className="text-[#c9a054]">I</span>, <span className="text-[#c9a054]">T</span>)</p>
                  <p className="pl-6 text-xs leading-7 text-zinc-600 md:text-sm">Luxury value is considered through<br />heritage, craft, identity, and trust.</p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-3 border-t border-[#292218] pt-5 text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                  <span><b className="mr-2 text-[#c9a054]">H</b> Heritage</span>
                  <span><b className="mr-2 text-[#c9a054]">C</b> Craftsmanship</span>
                  <span><b className="mr-2 text-[#c9a054]">I</b> Identity</span>
                  <span><b className="mr-2 text-[#c9a054]">T</b> Trust</span>
                </div>
                <div className="mt-7 border-t border-[#292218] pt-5 font-mono text-[9px] leading-5 text-zinc-700">
                  <p className="text-[#c9a054]">CONCEPTUAL CRYPTOGRAPHIC SEAL</p>
                  <p>H = SHA-256(Creation ID | Origin | Time)</p>
                  <p>Identity → Provenance → Verification</p>
                </div>
              </div>
              <p className="mt-4 text-right text-[8px] uppercase tracking-[0.28em] text-zinc-700">Conceptual model · not a live cryptographic certificate or financial formula</p>
            </div>
          </div>
          <div className="mt-20 grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-3">
            {[
              ["01", "Understand", "The House, its language, and its point of view."],
              ["02", "Go deeper", "Craft, fragrance, provenance, and digital identity."],
              ["03", "Carry forward", "Glossary, care, access, and legacy."],
            ].map(([number, title, text]) => (
              <div key={number} className="bg-[#080808] p-6 md:p-8">
                <p className="text-[9px] tracking-[0.4em] text-[#c9a054]">{number}</p>
                <h2 className="mt-8 font-serif text-2xl font-light text-zinc-200">{title}</h2>
                <p className="mt-3 text-xs leading-6 text-zinc-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1b1814] px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="mb-4 text-[9px] uppercase tracking-[0.45em] text-[#c9a054]">The single Learn page</p>
              <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">One library. Ten chapters.</h2>
            </div>
            <p className="max-w-sm text-xs leading-6 text-zinc-600">Everything begins here. We will add deep slugs later, one chapter at a time, without copying the same knowledge into multiple pages.</p>
          </div>
          <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2 lg:grid-cols-5">
            {chapterDirectory.map(([title, id, topics], index) => (
              <a key={id} href={`#${id}`} className="group bg-[#080808] p-6 transition-colors hover:bg-[#0d0c0a]">
                <div className="flex items-start justify-between">
                  <span className="text-[9px] tracking-[0.3em] text-[#c9a054]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-zinc-800 transition-colors group-hover:text-[#c9a054]">↘</span>
                </div>
                <h3 className="mt-8 min-h-10 font-serif text-xl font-light leading-tight text-zinc-200 transition-colors group-hover:text-[#c9a054]">{title}</h3>
                <ul className="mt-5 space-y-2 border-t border-[#1b1814] pt-4">
                  {topics.map((topic) => <li key={topic} className="text-[10px] leading-4 text-zinc-600">{topic}</li>)}
                </ul>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[210px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <p className="mb-5 text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">On this page</p>
            <nav className="grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">
              {navigation.map(([label, id], index) => (
                <a key={id} href={`#${id}`} className="text-[10px] leading-5 text-zinc-600 transition-colors hover:text-[#c9a054]">
                  <span className="mr-2 text-[8px] text-zinc-800">{String(index + 1).padStart(2, "0")}</span>{label}
                </a>
              ))}
            </nav>
            <div className="mt-10 hidden border-t border-[#1b1814] pt-5 lg:block">
              <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-700">The library</p>
              <p className="mt-3 text-xs leading-6 text-zinc-600">1 canonical page<br />20 knowledge sections<br />One living point of view</p>
            </div>
          </aside>

          <div className="min-w-0 space-y-28">
            <section id="start-here" className="scroll-mt-24">
              <SectionLabel number="01">Start Here</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h2 className="max-w-3xl font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-6xl">A House built from love.<br /><span className="text-[#c9a054]">Forged into legacy.</span></h2>
                  <p className="mt-8 max-w-2xl text-sm leading-8 text-zinc-400">Shamim Forever is a sovereign luxury house exploring the intersection of heritage, craftsmanship, beauty, identity, and emerging technology.</p>
                  <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-600">Our world brings together the principles of traditional luxury with new approaches to authenticity, provenance, and digital identity. Luxury is not simply defined by price. It is defined by meaning.</p>
                </div>
                <div className="border-l border-[#292218] pl-6">
                  <p className="text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">The core principle</p>
                  <p className="mt-5 font-serif text-3xl font-light leading-tight text-zinc-200">Meaning is the beginning of value.</p>
                  <div className="mt-8 space-y-4">
                    {[
                      ["Meaning", "Every creation should carry a story."],
                      ["Craft", "Luxury begins with attention to detail."],
                      ["Scarcity", "Exclusivity creates distinction."],
                      ["Trust", "Authenticity protects legacy."],
                    ].map(([title, text]) => (
                      <div key={title} className="border-t border-[#1b1814] pt-4">
                        <p className="text-[9px] uppercase tracking-[0.25em] text-[#c9a054]">{title}</p>
                        <p className="mt-2 text-xs text-zinc-600">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="why-shamim-forever-exists" className="scroll-mt-24">
              <SectionLabel number="02">Why does Shamim Forever exist?</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Because luxury has become too temporary.</h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">The modern world produces more products, collections, advertising, and consumption than ever. When everything is constantly replaced, very little feels permanent.</p>
                  <p className="mt-5 text-sm leading-8 text-zinc-600">Shamim Forever explores another model: continuity over disposability, memory over noise, identity over transaction, and legacy beyond the current moment.</p>
                </div>
                <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2">
                  {[
                    ["The temporary cycle", "Launch → Trend → Purchase → Disappear → Replace", "text-zinc-600"],
                    ["The continuity model", "Create → Identify → Preserve → Remember → Carry forward", "text-[#c9a054]"],
                    ["Continuity", "Creating things designed to remain meaningful.", "text-zinc-400"],
                    ["Provenance", "Understanding where something came from and how it came into existence.", "text-zinc-400"],
                  ].map(([title, text, color]) => (
                    <div key={title} className="bg-[#080808] p-6 md:p-7">
                      <p className={`text-[8px] uppercase tracking-[0.35em] ${color}`}>{title}</p>
                      <p className="mt-5 font-mono text-xs leading-7 text-zinc-500">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="the-house" className="scroll-mt-24">
              <SectionLabel number="02">The House</SectionLabel>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
                <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">Where would you like to begin?</h2>
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700">Six ways into the House</p>
              </div>
              <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] md:grid-cols-2">
                {mapCards.map((card) => (
                  <Link key={card.number} href={card.href} className="group bg-[#080808] p-7 transition-colors hover:bg-[#0d0c0a] md:p-9">
                    <div className="flex items-start justify-between">
                      <span className="text-[9px] tracking-[0.3em] text-[#c9a054]">{card.number}</span>
                      <span className="text-xl text-zinc-800 transition-colors group-hover:text-[#c9a054]">↗</span>
                    </div>
                    <p className="mt-10 text-[8px] uppercase tracking-[0.4em] text-zinc-600">{card.mark}</p>
                    <h3 className="mt-4 font-serif text-3xl font-light text-zinc-200 transition-colors group-hover:text-[#c9a054]">{card.title}</h3>
                    <p className="mt-5 text-xs leading-7 text-zinc-500">{card.text}</p>
                    <p className="mt-8 border-t border-[#1b1814] pt-4 text-[8px] uppercase tracking-[0.22em] text-zinc-700">{card.topics}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section id="essentials" className="scroll-mt-24">
              <SectionLabel number="03">Start with the essentials</SectionLabel>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">New to the House? Start here.</h2>
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700">A guided first reading</p>
              </div>
              <div className="divide-y divide-[#1b1814] border-y border-[#1b1814]">
                {essentials.map(([number, title, text, time, href]) => (
                  <Link key={number} href={href} className="group grid gap-5 py-7 transition-colors hover:bg-[#080808] md:grid-cols-[48px_1fr_1.2fr_90px_auto] md:items-center md:px-5">
                    <span className="text-[9px] tracking-[0.3em] text-[#c9a054]">{number}</span>
                    <h3 className="font-serif text-2xl font-light text-zinc-200 transition-colors group-hover:text-[#c9a054]">{title}</h3>
                    <p className="text-xs leading-6 text-zinc-600">{text}</p>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-700">{time}</span>
                    <span className="text-[#c9a054]">→</span>
                  </Link>
                ))}
              </div>
            </section>

            <section id="luxury" className="scroll-mt-24">
              <SectionLabel number="04">Luxury</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">A model for<br /><span className="text-[#c9a054]">lasting value.</span></h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">We use a conceptual framework to think about luxury that remains meaningful over time.</p>
                </div>
                <div>
                  <Formula>
                    <p><span className="text-[#f3efe7]">SL</span> ≈ <span className="text-[#c9a054]">H</span> × <span className="text-[#c9a054]">C</span> × <span className="text-[#c9a054]">I</span> × <span className="text-[#c9a054]">T</span></p>
                    <p className="mt-5 text-xs leading-7 text-zinc-600">SL = Sovereign Luxury<br />H = Heritage · C = Craftsmanship<br />I = Identity · T = Trust</p>
                  </Formula>
                  <div className="mt-6 border-l border-[#c9a054] pl-5">
                    <p className="text-sm leading-7 text-zinc-300">If heritage exists without craftsmanship, value may weaken. If craftsmanship exists without identity, distinction may disappear. If identity exists without trust, authenticity becomes difficult to establish.</p>
                    <p className="mt-4 text-xs leading-6 text-zinc-600">Therefore, the strongest luxury ecosystem balances all four elements.</p>
                  </div>
                  <p className="mt-6 text-[9px] uppercase tracking-[0.22em] text-zinc-700">Conceptual brand framework · not scientific or financial advice</p>
                </div>
              </div>
            </section>

            <section id="legacy-vs-trend" className="scroll-mt-24">
              <SectionLabel number="05">What makes something luxury?</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Luxury is not just price.</h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">Price may indicate material cost, labour, scarcity, or positioning. It cannot automatically create meaning. A more complete conceptual model considers quality, craftsmanship, scarcity, meaning, and heritage.</p>
                  <Formula>
                    <p>LV ≈ Q × C × S × M × H</p>
                    <p className="mt-4 text-xs leading-7 text-zinc-600">LV = Luxury value · Q = Quality · C = Craftsmanship<br />S = Scarcity · M = Meaning · H = Heritage</p>
                  </Formula>
                </div>
                <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2">
                  {[
                    ["Quality", "Materials, construction, durability, finishing, and consistency."],
                    ["Craftsmanship", "Human knowledge, patience, precision, and design intelligence."],
                    ["Scarcity", "Meaningful limits created by materials, production, complexity, or time."],
                    ["Meaning", "The memories, relationships, celebrations, and stories attached to an object."],
                  ].map(([title, text]) => (
                    <div key={title} className="bg-[#080808] p-6">
                      <h3 className="font-serif text-2xl font-light text-zinc-200">{title}</h3>
                      <p className="mt-3 text-xs leading-6 text-zinc-600">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 overflow-hidden border border-[#1b1814]">
                <div className="grid grid-cols-2 bg-[#0b0a08] text-[9px] uppercase tracking-[0.35em] text-[#c9a054]">
                  <span className="p-4">Trend</span><span className="border-l border-[#1b1814] p-4">Legacy</span>
                </div>
                {[
                  ["Immediate", "Long-term"],
                  ["Fast", "Patient"],
                  ["Seasonal", "Continuous"],
                  ["Attention", "Meaning"],
                  ["Consumption", "Preservation"],
                  ["Popularity", "Memory"],
                ].map(([trend, legacy]) => (
                  <div key={trend} className="grid grid-cols-2 border-t border-[#1b1814] text-xs text-zinc-600">
                    <span className="p-4">{trend}</span><span className="border-l border-[#1b1814] p-4 text-zinc-300">{legacy}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="legacy-algorithm" className="scroll-mt-24">
              <SectionLabel number="06">The Legacy Algorithm</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">How does a legacy grow?</h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">A product can be created in a moment. A legacy requires time, care, preservation, and the transfer of meaning.</p>
                  <Formula>
                    <p>L(t) = f(V, T, P)</p>
                    <p className="mt-4 text-xs leading-7 text-zinc-600">L(t) = Legacy over time<br />V = Values · T = Time · P = Preservation</p>
                  </Formula>
                </div>
                <div className="border border-[#1b1814] bg-[#080808] p-6 md:p-8">
                  <p className="mb-7 text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">A conceptual sequence</p>
                  <div className="space-y-0">
                    {["Create something meaningful", "Define its identity", "Protect its authenticity", "Preserve its history", "Transfer its story", "Build trust over time", "Legacy"].map((step, index, items) => (
                      <div key={step} className="relative flex items-center gap-5">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[9px] ${index === items.length - 1 ? "border-[#c9a054] text-[#c9a054]" : "border-[#3c3223] text-zinc-600"}`}>{index + 1}</span>
                        <span className={`py-3 text-sm ${index === items.length - 1 ? "font-serif text-2xl text-[#c9a054]" : "text-zinc-400"}`}>{step}</span>
                        {index < items.length - 1 && <span className="absolute ml-[15px] mt-16 h-3 border-l border-[#292218]" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="authenticity" className="scroll-mt-24">
              <SectionLabel number="06">The Authenticity Framework</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">How trust is built.</h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">Shamim Forever explores authenticity as a layered relationship between a physical creation and the information that gives it context.</p>
                  <Formula>
                    <p>A ≈ I + P + V</p>
                    <p className="mt-4 text-xs leading-7 text-zinc-600">A = Authenticity confidence<br />I = Identity · P = Provenance · V = Verification</p>
                  </Formula>
                </div>
                <div className="space-y-4">
                  {[
                    ["Layer 01", "Identity", "What is this creation? Every item should have a distinguishable identity."],
                    ["Layer 02", "Provenance", "Where did it come from? Provenance represents the history and journey of a creation."],
                    ["Layer 03", "Verification", "Can its information be verified? Verification creates confidence between the House and its clients."],
                  ].map(([layer, title, text]) => (
                    <div key={layer} className="border border-[#1b1814] bg-[#080808] p-6">
                      <p className="text-[8px] uppercase tracking-[0.35em] text-[#c9a054]">{layer}</p>
                      <h3 className="mt-4 font-serif text-2xl font-light text-zinc-200">{title}</h3>
                      <p className="mt-3 text-xs leading-6 text-zinc-600">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="provenance" className="scroll-mt-24">
              <SectionLabel number="07">Provenance & cryptographic trust</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Understanding origin.</h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">Provenance describes the history and origin of an object. It can include creation date, collection, product identity, material information, ownership history, authentication data, and restoration history.</p>
                  <Formula>
                    <p>P = H(O, C, T, R)</p>
                    <p className="mt-4 text-xs leading-7 text-zinc-600">P = Provenance record · O = Origin · C = Creation<br />T = Timeline · R = Historical record</p>
                  </Formula>
                </div>
                <div className="relative overflow-hidden border border-[#3a3022] bg-[#080807] p-7">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full [background:conic-gradient(#c9a05433,#67e8f933,#e879f933,#c9a05433)] blur-2xl" />
                  <p className="relative text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">Provenance record / conceptual</p>
                  <div className="relative mt-8 space-y-4 font-mono text-xs text-zinc-500">
                    {["ORIGIN / Karachi Sovereign Atelier", "CREATION / SF-COLLECTION-0001", "TIMELINE / 2026 → ∞", "STATUS / VERIFIED BY HOUSE"].map((line) => (
                      <p key={line} className="border-b border-[#1b1814] pb-3">{line}</p>
                    ))}
                    <p className="pt-3 text-[#c9a054]">SHA-256(ORIGIN | CREATION | TIME)</p>
                  </div>
                  <p className="relative mt-8 text-[9px] leading-5 text-zinc-700">The visual seal is an educational representation. It is not a live certificate, blockchain proof, or claim that this page itself performs cryptographic verification.</p>
                </div>
              </div>
            </section>

            <section id="dna-identity" className="scroll-mt-24">
              <SectionLabel number="08">The Digital DNA Identity Model</SectionLabel>
              <div className="border border-[#292218] bg-[#080807] p-7 md:p-10">
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                  <div>
                    <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Every creation<br /><span className="text-[#c9a054]">has a story.</span></h2>
                    <p className="mt-6 text-sm leading-8 text-zinc-500">DNA Identity is a conceptual system for connecting a creation with the information that helps it remain understood, verified, and cared for.</p>
                  </div>
                  <div className="font-mono text-xs leading-8 text-zinc-500 md:text-sm">
                    <p><span className="text-[#c9a054]">SF</span></p>
                    <p>│</p>
                    <p>├── <span className="text-zinc-300">COLLECTION</span></p>
                    <p>├── <span className="text-zinc-300">CREATION ID</span></p>
                    <p>├── <span className="text-zinc-300">MATERIAL DATA</span></p>
                    <p>├── <span className="text-zinc-300">CRAFT HISTORY</span></p>
                    <p>├── <span className="text-zinc-300">OWNERSHIP RECORD</span></p>
                    <p>└── <span className="text-[#c9a054]">AUTHENTICATION STATUS</span></p>
                  </div>
                </div>
                <div className="mt-10 border-t border-[#292218] pt-6 font-mono text-xs text-zinc-600">
                  <span className="text-[#c9a054]">DNA</span> = Brand Information + Creation Information + History + Verification
                </div>
              </div>
            </section>

            <section id="heirloom" className="scroll-mt-24">
              <SectionLabel number="08">From object to heirloom</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Not everything valuable<br /><span className="text-[#c9a054]">becomes an heirloom.</span></h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">An object becomes more meaningful when it carries history, is preserved, represents relationships, and allows its story to continue.</p>
                </div>
                <div>
                  <Formula>
                    <p>Hₑ = f(O, M, T)</p>
                    <p className="mt-4 text-xs leading-7 text-zinc-600">Hₑ = Heirloom value<br />O = Object · M = Meaning · T = Time</p>
                  </Formula>
                  <p className="mt-6 border-l border-[#c9a054] pl-5 text-sm leading-7 text-zinc-300">An heirloom is not simply something expensive. It is something worth remembering.</p>
                </div>
              </div>
            </section>

            <section id="our-world" className="scroll-mt-24">
              <SectionLabel number="09">Our World</SectionLabel>
              <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">The Shamim Forever universe.</h2>
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700">Three expressions · one identity</p>
              </div>
              <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] md:grid-cols-3">
                {[
                  ["01", "Fragrance", "The art, science, and emotion of fine fragrance.", "Perfume notes · Fragrance families · Signature scents · Preservation", "/collections"],
                  ["02", "High Jewelry", "Craftsmanship, materials, and lasting beauty.", "Jewelry design · Materials · Care · Authenticity", "/collections"],
                  ["03", "Beauty", "Beauty through detail, ritual, and refinement.", "Beauty philosophy · Ingredients · Care · Rituals", "/collections"],
                ].map(([number, title, text, topics, href]) => (
                  <Link key={title} href={href} className="group bg-[#080808] p-7 transition-colors hover:bg-[#0d0c0a] md:p-9">
                    <p className="text-[9px] tracking-[0.3em] text-[#c9a054]">{number}</p>
                    <h3 className="mt-12 font-serif text-3xl font-light text-zinc-200 transition-colors group-hover:text-[#c9a054]">{title}</h3>
                    <p className="mt-5 text-xs leading-7 text-zinc-500">{text}</p>
                    <p className="mt-8 border-t border-[#1b1814] pt-4 text-[8px] uppercase leading-5 tracking-[0.18em] text-zinc-700">{topics}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section id="innovation" className="scroll-mt-24">
              <SectionLabel number="10">Innovation</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Technology should not replace craftsmanship.<br /><span className="text-[#c9a054]">It should strengthen trust.</span></h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">The best luxury technology disappears into the experience while making identity, service, and ownership clearer.</p>
                  <Formula>
                    <p>Tᵥ = Hₚ + Dᵢ + Aᵤ</p>
                    <p className="mt-4 text-xs leading-7 text-zinc-600">Tᵥ = Technology value<br />Hₚ = Human preservation · Dᵢ = Digital identity · Aᵤ = Authentication utility</p>
                  </Formula>
                </div>
                <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2">
                  {[
                    ["Digital Identity", "How physical creations can be associated with useful digital information.", "/learn#authenticity"],
                    ["Blockchain Concepts", "Understanding distributed records and provenance technology.", "/learn#innovation"],
                    ["AI & Luxury", "How artificial intelligence may improve experiences and services.", "/learn#innovation"],
                    ["Future Authentication", "Exploring new methods of establishing trust.", "/learn#authenticity"],
                  ].map(([title, text, href]) => (
                    <Link key={title} href={href} className="group bg-[#080808] p-6 transition-colors hover:bg-[#0d0c0a]">
                      <p className="text-lg text-[#c9a054]">◈</p>
                      <h3 className="mt-7 font-serif text-xl font-light text-zinc-200 transition-colors group-hover:text-[#c9a054]">{title}</h3>
                      <p className="mt-3 text-xs leading-6 text-zinc-600">{text}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section id="sovereign-infrastructure" className="scroll-mt-24">
              <SectionLabel number="11">Sovereign Infrastructure</SectionLabel>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">The systems behind the experience.</h2>
                  <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-500">A premium world needs more than beautiful objects. It needs a quiet infrastructure of identity, care, access, and memory.</p>
                </div>
                <Link href="/authenticate" className="text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Enter the infrastructure →</Link>
              </div>
              <div className="mt-10 grid gap-px border border-[#1b1814] bg-[#1b1814] sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Authenticate", "/authenticate"],
                  ["DNA Identity", "/dna-identity"],
                  ["Heritage Gallery", "/gallery"],
                  ["Heirloom Vault", "/heirloom-vault"],
                  ["Sovereign Vault", "/vault"],
                  ["Time Archive", "/time-archive"],
                ].map(([title, href], index) => (
                  <Link key={title} href={href} className="group bg-[#080808] p-6 transition-colors hover:bg-[#0d0c0a]">
                    <span className="text-[9px] tracking-[0.3em] text-zinc-700">0{index + 1}</span>
                    <h3 className="mt-10 font-serif text-2xl font-light text-zinc-200 transition-colors group-hover:text-[#c9a054]">{title}</h3>
                    <span className="mt-6 block text-[#c9a054]">↗</span>
                  </Link>
                ))}
              </div>
            </section>

            <section id="signature-algorithm" className="scroll-mt-24">
              <SectionLabel number="12">The Shamim Forever Algorithm</SectionLabel>
              <div className="border border-[#292218] bg-[#080807] p-7 md:p-10">
                <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">The journey of a creation.</h2>
                <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-4">
                  {algorithmSteps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className={`border px-4 py-3 text-[9px] uppercase tracking-[0.18em] ${index === algorithmSteps.length - 1 ? "border-[#c9a054] bg-[#c9a054]/10 text-[#c9a054]" : "border-[#3c3223] text-zinc-500"}`}>{step}</span>
                      {index < algorithmSteps.length - 1 && <span className="text-[#c9a054]/50">→</span>}
                    </div>
                  ))}
                </div>
                <p className="mt-10 font-mono text-xs leading-7 text-zinc-600">Creation = Idea → Design → Craft → Identity → Authentication → Ownership → Preservation → Heritage → Legacy</p>
              </div>
            </section>

            <section id="guides" className="scroll-mt-24">
              <SectionLabel number="13">Guides</SectionLabel>
              <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">Choose your depth.</h2>
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700">Like a living knowledge protocol</p>
              </div>
              <p className="mb-8 max-w-3xl text-sm leading-7 text-zinc-500">Shopping Guides · Product Care · Bespoke Orders · Private Clients — practical knowledge for choosing, commissioning, caring for, and living with a creation.</p>
              <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] md:grid-cols-3">
                {levels.map(([title, subtitle, topics], index) => (
                  <div key={title} className="bg-[#080808] p-7 md:p-9">
                    <p className="text-[9px] tracking-[0.3em] text-[#c9a054]">0{index + 1}</p>
                    <h3 className="mt-10 font-serif text-3xl font-light text-zinc-200">{title}</h3>
                    <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-zinc-600">{subtitle}</p>
                    <p className="mt-8 border-t border-[#1b1814] pt-5 text-xs leading-7 text-zinc-500">{topics}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="people" className="scroll-mt-24">
              <SectionLabel number="14">Meet the people</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Leadership behind the House.</h2>
                  <p className="mt-6 text-sm leading-8 text-zinc-500">A luxury house is made by people: founders, makers, advisors, curators, and clients who turn a point of view into a living culture.</p>
                  <Link href="/team" className="mt-8 inline-flex text-[9px] uppercase tracking-[0.3em] text-[#c9a054]">Meet our leadership →</Link>
                </div>
                <div className="divide-y divide-[#1b1814] border-y border-[#1b1814]">
                  {[
                    ["Faisal Orakzai", "Founder & Chairman", "Technology entrepreneur, computer scientist, systems architect, researcher, and author.", "/faisal-orakzai"],
                    ["Dr Asma Orakzai", "Chief Executive Officer", "Leading the executive vision and development of Shamim Forever.", "/team"],
                    ["Dr Laiba Faisal Orakzai", "Director", "Supporting the strategic direction and long-term development of the House.", "/team"],
                  ].map(([name, role, text, href]) => (
                    <Link key={name} href={href} className="group block py-6">
                      <p className="text-[8px] uppercase tracking-[0.3em] text-[#c9a054]">{role}</p>
                      <h3 className="mt-3 font-serif text-2xl font-light text-zinc-200 transition-colors group-hover:text-[#c9a054]">{name}</h3>
                      <p className="mt-2 max-w-xl text-xs leading-6 text-zinc-600">{text}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section id="house-standard" className="scroll-mt-24">
              <SectionLabel number="15">The Shamim Forever standard</SectionLabel>
              <div className="grid gap-px border border-[#1b1814] bg-[#1b1814] md:grid-cols-5">
                {[
                  ["01", "Create with purpose", "Meaningful creation begins with intention."],
                  ["02", "Protect identity", "Visual, cultural, product, and historical identity matter."],
                  ["03", "Respect time", "Build for more than immediate attention."],
                  ["04", "Document history", "Archives preserve continuity."],
                  ["05", "Build for the future", "Respect origins while remaining capable of evolution."],
                ].map(([number, title, text]) => (
                  <div key={number} className="bg-[#080808] p-6">
                    <p className="text-[9px] tracking-[0.3em] text-[#c9a054]">{number}</p>
                    <h3 className="mt-8 font-serif text-xl font-light text-zinc-200">{title}</h3>
                    <p className="mt-4 text-xs leading-6 text-zinc-600">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="evolving-house" className="scroll-mt-24">
              <SectionLabel number="16">A House built for generations</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Can this institution remain meaningful across generations?</h2>
                  <p className="mt-7 text-sm leading-8 text-zinc-500">Shamim Forever is not intended to be a static project. It is an evolving ecosystem across collections, atelier, concierge, heritage archives, digital identity, authentication, and the Sovereign Vault.</p>
                  <p className="mt-5 text-sm leading-8 text-zinc-600">Heritage does not necessarily require hundreds of years. Heritage begins when an institution takes responsibility for its history. Today becomes tomorrow’s archive.</p>
                </div>
                <div className="relative border border-[#292218] bg-[#080807] p-7">
                  <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_20%,rgba(201,160,84,0.18),transparent_28%),linear-gradient(120deg,transparent_45%,rgba(103,232,249,0.08),transparent_58%)]" />
                  <div className="relative space-y-5 font-mono text-xs leading-6 text-zinc-500">
                    <p className="text-[#c9a054]">SHAMIM FOREVER / EVOLUTION MAP</p>
                    <p>COLLECTIONS → ATELIER → CONCIERGE</p>
                    <p>HERITAGE GALLERY → DIGITAL IDENTITY</p>
                    <p>AUTHENTICATION → SOVEREIGN VAULT</p>
                    <p className="border-t border-[#292218] pt-5 text-zinc-300">TIME + DOCUMENTATION = CONTINUITY</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="what-shamim-forever-is-not" className="scroll-mt-24">
              <SectionLabel number="17">What Shamim Forever is not</SectionLabel>
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">A coherent identity needs boundaries.</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "A temporary trend project",
                    "A generic luxury marketplace",
                    "A technology company disguised as luxury",
                    "A mass-consumption brand",
                    "A collection of random expensive products",
                    "A world without memory or responsibility",
                  ].map((item) => (
                    <div key={item} className="border border-[#1b1814] bg-[#080808] p-5 text-sm text-zinc-500">
                      <span className="mr-3 text-[#c9a054]">×</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="glossary" className="scroll-mt-24">
              <SectionLabel number="18">Glossary</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">The language of the House.</h2>
                  <p className="mt-6 text-sm leading-8 text-zinc-500">A shared vocabulary makes a world easier to enter. These working definitions will grow as the Learn library grows.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Atelier", "A creative workshop where ideas, materials, and specialist craft come together."],
                    ["Bespoke", "Made for a particular person or purpose through a private creative process."],
                    ["Provenance", "The documented history and origin of a creation."],
                    ["Heirloom", "A meaningful object preserved and passed through generations."],
                    ["Digital Identity", "A persistent record that helps identify, verify, and care for a creation."],
                    ["Sovereign Luxury", "Luxury guided by independence, intention, responsibility, and a distinct point of view."],
                  ].map(([term, definition]) => (
                    <div key={term} className="border border-[#1b1814] bg-[#080808] p-5">
                      <h3 className="font-serif text-xl font-light text-zinc-200">{term}</h3>
                      <p className="mt-3 text-xs leading-6 text-zinc-600">{definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="faq" className="scroll-mt-24">
              <SectionLabel number="19">Frequently Asked Questions</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <h2 className="font-serif text-4xl font-light leading-tight text-[#f3efe7] md:text-5xl">Questions, answered clearly.</h2>
                  <p className="mt-6 text-sm leading-8 text-zinc-500">The FAQ is part of this single page for now. Later, individual answers can become dedicated slugs without duplicating the source material.</p>
                </div>
                <div className="divide-y divide-[#1b1814] border-y border-[#1b1814]">
                  {[
                    ["What is Shamim Forever?", "A sovereign luxury house built around heritage, craftsmanship, identity, authenticity, and lasting value."],
                    ["What does Sovereign Luxury mean?", "Creating with independence, intention, responsibility, and a distinct cultural point of view."],
                    ["How does product authentication work?", "Authentication connects a creation’s physical details with its identity, provenance, certificate, and verification record."],
                    ["Does Shamim Forever offer bespoke services?", "Yes. Bespoke services create a private path for tailored creations, commissions, and design conversations."],
                  ].map(([question, answer]) => (
                    <details key={question} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl font-light text-zinc-200">
                        {question}
                        <span className="text-[#c9a054] transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-4 max-w-2xl text-xs leading-7 text-zinc-600">{answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            <section id="final-invitation" className="scroll-mt-24 border-t border-[#292218] pt-16 text-center md:pt-24">
              <p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Shamim Forever Knowledge</p>
              <h2 className="mx-auto mt-7 max-w-4xl font-serif text-5xl font-light leading-[0.95] text-[#f3efe7] md:text-8xl">Knowledge is part<br /><span className="text-[#c9a054]">of legacy.</span></h2>
              <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-zinc-500">Understanding where something comes from gives it greater meaning. Understanding how it is created creates appreciation. Understanding how it is preserved creates legacy.</p>
              <Link href="/about" className="mt-10 inline-flex border border-[#c9a054] px-7 py-4 text-[9px] uppercase tracking-[0.32em] text-[#c9a054] transition-colors hover:bg-[#c9a054] hover:text-[#090806]">Enter the world of Shamim Forever</Link>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}