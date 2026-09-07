import type { LuxuryChapter as LuxuryChapterData } from '@/lib/luxury-content'

    export default function LuxuryChapter({ chapter }: { chapter: LuxuryChapterData }) {
    return (
      <article id={chapter.slug} className="scroll-mt-28 border-t border-[#1b1814] py-12 md:py-16">
        <div className="grid gap-7 md:grid-cols-[80px_1fr]">
          <p className="text-xs tracking-[0.35em] text-[#c9a054]">{chapter.number}</p>
          <div>
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#c9a054]">{chapter.kicker}</p>
            <h2 className="mt-3 font-serif text-3xl font-light leading-tight text-[#f3efe7] md:text-5xl">{chapter.title}</h2>
            <div className="mt-7 max-w-3xl space-y-5 text-sm leading-8 text-zinc-400">
              {chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {chapter.formula && <div className="mt-8 max-w-3xl border-y border-[#2a2116] bg-[#0a0908] px-5 py-6 text-center"><p className="font-serif text-xl font-light tracking-wide text-[#c9a054] md:text-2xl">{chapter.formula}</p><p className="mt-3 text-[8px] uppercase tracking-[0.28em] text-zinc-700">Conceptual luxury framework · not financial or scientific advice</p></div>}
            {chapter.bullets && <ul className="mt-8 grid max-w-3xl gap-x-8 gap-y-3 border-l border-[#c9a054]/50 pl-5 text-sm leading-7 text-zinc-500 md:grid-cols-2">{chapter.bullets.map((bullet) => <li key={bullet}><span className="mr-2 text-[#c9a054]">—</span>{bullet}</li>)}</ul>}
          </div>
        </div>
      </article>
    )
    }
    