import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Start Here | Learn",
  description: "Enter the knowledge world behind Shamim Forever: heritage, craftsmanship, authenticity, technology, and lasting luxury.",
}

const navigation = [
  ["What is Shamim Forever?", "what-is-shamim-forever"],
  ["Knowledge map", "knowledge-map"],
  ["Start with the essentials", "essentials"],
  ["Sovereign Luxury model", "sovereign-luxury"],
  ["Legacy algorithm", "legacy-algorithm"],
  ["Authenticity framework", "authenticity"],
  ["DNA Identity", "dna-identity"],
  ["From object to heirloom", "heirloom"],
  ["Explore the world", "the-world"],
  ["Technology of trust", "technology"],
  ["Learn by level", "levels"],
  ["Meet the people", "people"],
] as const

const mapCards = [
  {
    number: "01",
    mark: "The House",
    title: "The world behind the name",
    text: "Learn about Shamim Forever, its philosophy, heritage, vision, and the idea of a sovereign luxury house.",
    topics: "Story · Values · Vision · Legacy",
    href: "/about",
  },
  {
    number: "02",
    mark: "Luxury",
    title: "The art of lasting value",
    text: "Understand how intention, craftsmanship, scarcity, discretion, and meaning shape exceptional luxury.",
    topics: "Craft · Materials · Bespoke · Exclusivity",
    href: "/learn/what-defines-true-luxury",
  },
  {
    number: "03",
    mark: "Craft & Atelier",
    title: "Where ideas become creations",
    text: "Follow the movement from creative brief to material study, prototype, refinement, and final presentation.",
    topics: "Atelier · Design · Materials · Making",
    href: "/learn/from-concept-to-creation",
  },
  {
    number: "04",
    mark: "Authenticity",
    title: "The architecture of trust",
    text: "Explore identity, provenance, certificates, verification, and the systems that protect a meaningful object.",
    topics: "Identity · Provenance · Verification · Care",
    href: "/learn/what-is-product-provenance",
  },
  {
    number: "05",
    mark: "Technology",
    title: "The quiet intelligence behind luxury",
    text: "Discover how digital identity, blockchain concepts, AI, and future systems can strengthen the human experience.",
    topics: "Digital identity · Records · AI · Future",
    href: "/learn/technology-behind-shamim-forever",
  },
  {
    number: "06",
    mark: "Glossary",
    title: "The language of the House",
    text: "Build fluency in the words that shape Shamim Forever: atelier, bespoke, provenance, heirloom, and sovereign luxury.",
    topics: "Definitions · Concepts · Principles · Terms",
    href: "/learn/glossary-sovereign-luxury",
  },
]

const essentials = [
  ["01", "What is Shamim Forever?", "A sovereign luxury house built around heritage, craftsmanship, identity, and lasting value.", "5 min read", "/about"],
  ["02", "What is Sovereign Luxury?", "A philosophy where luxury represents independence, identity, authenticity, and legacy.", "7 min read", "/about"],
  ["03", "Built From Love. Forged Into Legacy.", "Discover the philosophy behind the Shamim Forever identity and the meaning of forever.", "6 min read", "/learn/from-love-to-legacy"],
  ["04", "Why does authenticity matter?", "Understand trust, provenance, and the protection of valuable creations.", "8 min read", "/learn/what-is-product-provenance"],
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
              <p className="mb-7 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Shamim Forever · Knowledge · Start here</p>
              <h1 className="max-w-5xl font-serif text-6xl font-light leading-[0.88] tracking-[0.035em] text-[#f3efe7] md:text-[8.5rem]">
                Learn the
                <span className="block text-[#c9a054]">world behind</span>
                the House.
              </h1>
              <p className="mt-10 max-w-2xl text-sm font-light leading-8 tracking-wide text-zinc-400 md:text-base">
                Shamim Forever is more than a luxury house. It is a world built around heritage, craftsmanship, identity, authenticity, and the technologies shaping the future of luxury.
              </p>
              <p className="mt-5 max-w-2xl text-sm font-light leading-8 tracking-wide text-zinc-600">
                Explore the ideas, systems, and principles behind Sovereign Luxury.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#what-is-shamim-forever" className="border border-[#c9a054] bg-[#c9a054] px-6 py-4 text-[9px] uppercase tracking-[0.32em] text-[#090806] transition-colors hover:bg-[#e4c98f]">
                  Start learning
                </a>
                <Link href="/about" className="border border-[#3c3223] px-6 py-4 text-[9px] uppercase tracking-[0.32em] text-[#c9a054] transition-colors hover:border-[#c9a054]">
                  Explore the House
                </Link>
              </div>
            </div>
            <div className="relative lg:pb-3">
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
              </div>
              <p className="mt-4 text-right text-[8px] uppercase tracking-[0.28em] text-zinc-700">A conceptual brand framework · not a scientific or financial formula</p>
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
              <p className="mt-3 text-xs leading-6 text-zinc-600">16 chapters<br />100+ entries<br />One living point of view</p>
            </div>
          </aside>

          <div className="min-w-0 space-y-28">
            <section id="what-is-shamim-forever" className="scroll-mt-24">
              <SectionLabel number="01">What is Shamim Forever?</SectionLabel>
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

            <section id="knowledge-map" className="scroll-mt-24">
              <SectionLabel number="02">The Shamim Forever Knowledge Map</SectionLabel>
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

            <section id="sovereign-luxury" className="scroll-mt-24">
              <SectionLabel number="04">The Sovereign Luxury Model</SectionLabel>
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

            <section id="legacy-algorithm" className="scroll-mt-24">
              <SectionLabel number="05">The Legacy Algorithm</SectionLabel>
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

            <section id="dna-identity" className="scroll-mt-24">
              <SectionLabel number="07">The DNA Identity Model</SectionLabel>
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

            <section id="the-world" className="scroll-mt-24">
              <SectionLabel number="09">Explore the world</SectionLabel>
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

            <section id="technology" className="scroll-mt-24">
              <SectionLabel number="10">The technology of trust</SectionLabel>
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
                    ["Digital Identity", "How physical creations can be associated with useful digital information.", "/learn/digital-identity"],
                    ["Blockchain Concepts", "Understanding distributed records and provenance technology.", "/learn/blockchain-and-luxury"],
                    ["AI & Luxury", "How artificial intelligence may improve experiences and services.", "/learn/ai-and-luxury-experiences"],
                    ["Future Authentication", "Exploring new methods of establishing trust.", "/learn/the-future-of-luxury-authentication"],
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

            <section id="infrastructure" className="scroll-mt-24">
              <SectionLabel number="11">Sovereign infrastructure</SectionLabel>
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

            <section id="levels" className="scroll-mt-24">
              <SectionLabel number="13">Learn by level</SectionLabel>
              <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                <h2 className="font-serif text-4xl font-light text-[#f3efe7] md:text-5xl">Choose your depth.</h2>
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-700">Like a living knowledge protocol</p>
              </div>
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