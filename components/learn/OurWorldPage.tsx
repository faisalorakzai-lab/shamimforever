import Link from 'next/link'
import { OUR_WORLD_CHAPTERS } from '@/lib/our-world-content'
import { OUR_WORLD_FAQS } from '@/lib/our-world-faq'
import OurWorldChapter from './OurWorldChapter'

export default function OurWorldPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200">
      <header aria-labelledby="our-world-title" className="relative overflow-hidden border-b border-[#15120f] px-5 py-28 md:px-12 md:py-40">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a054]/[0.07] blur-[130px]" />
        <div className="relative mx-auto max-w-[1100px]">
          <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a054]">LEARN · OUR WORLD</p>
          <h1 id="our-world-title" className="mt-7 max-w-5xl font-serif text-5xl font-light leading-[0.95] text-[#f3efe7] md:text-8xl">Beyond a House.<br /><span className="text-[#c9a054]">Into a World.</span></h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">The places, people, culture, heritage, private experiences, digital systems, and future possibilities that shape the global universe of Shamim Forever.</p>
          <div className="mt-10 flex flex-wrap gap-3 text-[9px] uppercase tracking-[0.28em] text-zinc-600"><span className="border border-[#211b14] px-3 py-2">32 chapters</span><span className="border border-[#211b14] px-3 py-2">Global universe</span><span className="border border-[#211b14] px-3 py-2">Growing world · measured progress</span></div>
          <div className="mt-10 flex flex-wrap gap-3"><a href="#the-world-of-shamim-forever" className="bg-[#c9a054] px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-[#050505]">Enter the World</a><Link href="/learn/the-house" className="border border-[#c9a054]/50 px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-[#c9a054]">Explore The House</Link></div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[220px_1fr] lg:gap-20">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <p className="text-[9px] uppercase tracking-[0.4em] text-[#c9a054]">In this world</p>
          <nav aria-label="Our World chapters" className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 lg:grid-cols-1">{OUR_WORLD_CHAPTERS.map((chapter) => <a key={chapter.slug} href={'#' + chapter.slug} className="text-[9px] uppercase tracking-[0.16em] text-zinc-600 transition-colors hover:text-[#c9a054]"><span className="mr-2 text-[#c9a054]/70">{chapter.number}</span>{chapter.title}</a>)}</nav>
          <div className="mt-10 hidden border-t border-[#1b1814] pt-5 lg:block"><p className="text-[8px] uppercase tracking-[0.3em] text-zinc-700">The global universe</p><p className="mt-3 text-xs leading-6 text-zinc-600">1 world pillar<br />32 foundational chapters<br />Future destinations clearly marked</p></div>
        </aside>

        <section aria-labelledby="the-world-of-shamim-forever">
          <div className="max-w-3xl border-b border-[#1b1814] pb-12">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#c9a054]">Our World, beyond the House</p>
            <h2 id="the-world-of-shamim-forever" className="mt-4 font-serif text-3xl font-light leading-tight text-[#f3efe7] md:text-5xl">True luxury is an ecosystem.</h2>
            <p className="mt-6 text-sm leading-8 text-zinc-400">Shamim Forever exists beyond a collection, a boutique, or a single definition of luxury. It is a world shaped by people, places, craftsmanship, memory, culture, private experiences, and the belief that the objects and environments surrounding a life should possess meaning beyond immediate function.</p>
            <p className="mt-5 text-sm leading-8 text-zinc-500">Our World explores where the House exists, what influences it, how its different worlds connect, and why luxury cannot be understood only through price, rarity, or appearance.</p>
          </div>
          {OUR_WORLD_CHAPTERS.map((chapter) => <OurWorldChapter key={chapter.slug} chapter={chapter} />)}

          <section id="faq" aria-labelledby="our-world-faq-title" className="border-t border-[#1b1814] py-16">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#c9a054]">Knowledge, clearly stated</p>
            <h2 id="our-world-faq-title" className="mt-4 max-w-2xl font-serif text-3xl font-light leading-tight text-[#f3efe7] md:text-5xl">Questions about Our World.</h2>
            <dl className="mt-10 max-w-3xl divide-y divide-[#1b1814] border-y border-[#1b1814]">{OUR_WORLD_FAQS.map((faq) => <div key={faq.question} className="py-7"><dt className="font-serif text-xl font-light text-[#f3efe7] md:text-2xl">{faq.question}</dt><dd className="mt-3 text-sm leading-8 text-zinc-500">{faq.answer}</dd></div>)}</dl>
          </section>

          <div className="border-t border-[#1b1814] py-16">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#c9a054]">The world continues</p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-light leading-tight text-[#f3efe7] md:text-5xl">A world must be entered.<br /><span className="text-[#c9a054]">Not merely observed.</span></h2>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-zinc-500">Not every place has been reached. Not every chapter has been written. That is precisely the point. The world is alive, and every meaningful connection becomes part of its larger story.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link href="/learn/the-house" className="border border-[#c9a054]/50 px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-[#c9a054]">Understand The House</Link><Link href="/learn/luxury" className="border border-[#262019] px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-zinc-500">Explore Luxury</Link><Link href="/learn" className="bg-[#c9a054] px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-[#050505]">Return to Learn</Link></div>
          </div>
        </section>
      </div>
    </div>
  )
}
