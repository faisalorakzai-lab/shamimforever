import Link from 'next/link'
    import { LUXURY_CHAPTERS } from '@/lib/luxury-content'
    import LuxuryChapter from './LuxuryChapter'

    export default function LuxuryPage() {
    return (
      <main className="min-h-screen bg-[#050505] text-zinc-200">
        <header className="relative overflow-hidden border-b border-[#15120f] px-5 py-28 md:px-12 md:py-40">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a054]/[0.07] blur-[130px]" />
          <div className="relative mx-auto max-w-[1100px]">
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">LEARN · LUXURY</p>
            <h1 className="mt-7 max-w-5xl font-serif text-5xl font-light leading-[0.95] text-[#f3efe7] md:text-8xl">What does luxury<br /><span className="text-[#c9a054]">truly mean?</span></h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">The philosophy, principles, craftsmanship, value, rarity, privacy, bespoke creation, and future systems behind Sovereign Luxury.</p>
            <div className="mt-10 flex flex-wrap gap-3 text-[9px] uppercase tracking-[0.28em] text-zinc-600"><span className="border border-[#211b14] px-3 py-2">50 chapters</span><span className="border border-[#211b14] px-3 py-2">Luxury pillar</span><span className="border border-[#211b14] px-3 py-2">Built beyond price</span></div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1280px] gap-14 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[220px_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#c9a054]">Contents</p>
            <nav className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">{LUXURY_CHAPTERS.map((chapter) => <a key={chapter.slug} href={'#' + chapter.slug} className="text-[9px] uppercase tracking-[0.16em] text-zinc-600 transition-colors hover:text-[#c9a054]"><span className="mr-2 text-[#c9a054]/70">{chapter.number}</span>{chapter.title}</a>)}</nav>
            <div className="mt-10 hidden border-t border-[#1b1814] pt-5 lg:block"><p className="text-[8px] uppercase tracking-[0.3em] text-zinc-700">The knowledge system</p><p className="mt-3 text-xs leading-6 text-zinc-600">1 pillar page<br />50 foundational chapters<br />Deeper paths to come</p></div>
          </aside>

          <section>
            <div className="max-w-3xl border-b border-[#1b1814] pb-12">
              <p className="text-[9px] uppercase tracking-[0.42em] text-[#c9a054]">Luxury, beyond price</p>
              <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-[#f3efe7] md:text-5xl">A standard of time, mastery, and meaning.</h2>
              <p className="mt-6 text-sm leading-8 text-zinc-400">Luxury is often confused with price, logos, exclusivity, or things that are simply expensive. These definitions are incomplete. A higher price does not automatically create luxury, and exclusivity without substance is simply a locked door.</p>
              <p className="mt-5 text-sm leading-8 text-zinc-500">Shamim Forever explores luxury as a system of human values: time, craftsmanship, quality, rarity, knowledge, identity, trust, and experience. Read this page as a map for a deeper Luxury Knowledge System.</p>
            </div>
            {LUXURY_CHAPTERS.map((chapter) => <LuxuryChapter key={chapter.slug} chapter={chapter} />)}
            <div className="border-t border-[#1b1814] py-16">
              <p className="text-[9px] uppercase tracking-[0.42em] text-[#c9a054]">Shamim Forever · Sovereign Luxury</p>
              <h2 className="mt-4 max-w-2xl font-serif text-3xl font-light leading-tight text-[#f3efe7] md:text-5xl">Luxury is a standard.<br /><span className="text-[#c9a054]">Not merely a price.</span></h2>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-zinc-500">Create with care. Maintain standards. Develop mastery. Understand culture. Protect trust. Build something capable of outliving the present.</p>
              <div className="mt-9 flex flex-wrap gap-3"><Link href="/learn" className="bg-[#c9a054] px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-[#050505]">Back to Learn</Link><Link href="/learn/the-house" className="border border-[#c9a054]/50 px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-[#c9a054]">Enter The House</Link><Link href="/atelier" className="border border-[#262019] px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-zinc-500">Enter the Atelier</Link></div>
            </div>
          </section>
        </div>
      </main>
    )
    }
    