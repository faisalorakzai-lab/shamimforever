import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — Shamim Forever Luxury House',
  description: 'Find answers about Shamim Forever fragrances, jewellery, authenticity, shipping, bespoke commissions, and private concierge services.',
  alternates: { canonical: 'https://www.shamimforever.com/faq' },
  openGraph: { title: 'FAQ — Shamim Forever Luxury House', description: 'Answers about Shamim Forever fragrances, jewellery, authenticity, shipping, bespoke commissions, and concierge services.', type: 'website', url: 'https://www.shamimforever.com/faq', images: [{ url: '/logo-sf.png', width: 512, height: 512, alt: 'Shamim Forever' }] },
  twitter: { card: 'summary_large_image', title: 'FAQ — Shamim Forever', description: 'Answers for collectors and clients of Shamim Forever.', images: ['/logo-sf.png'] },
}

type FAQItem = { question: string; answer: string }
type FAQSection = { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  { title: 'The House', items: [
    { question: 'What is Shamim Forever?', answer: 'Shamim Forever is a global luxury house creating fine fragrances, high jewellery, rare cosmetics, and couture experiences for collectors who value craft, identity, and provenance.' },
    { question: 'Where is Shamim Forever headquartered?', answer: 'The global headquarters is at 77 Espl. du Général de Gaulle, 92800 Puteaux, France. The house also serves clients through its international boutique network and private concierge.' },
  ] },
  { title: 'Collections & Authenticity', items: [
    { question: 'What products does Shamim Forever offer?', answer: 'The house offers bespoke and extrait fragrances, oud compositions, high jewellery, rare cosmetics, couture pieces, and limited-edition collector releases.' },
    { question: 'How is authenticity verified?', answer: 'Eligible pieces are issued with a product record and authenticity documentation. Selected digital and physical assets may also include blockchain-anchored provenance details for long-term verification.' },
    { question: 'Can I request a bespoke commission?', answer: 'Yes. Contact the private concierge with your brief, preferred materials, budget range, and timing. The concierge team will confirm availability and the next consultation step.' },
  ] },
  { title: 'Orders & Delivery', items: [
    { question: 'Does Shamim Forever ship internationally?', answer: 'International delivery is available for eligible products. Shipping method, insurance, duties, and timing are confirmed at checkout or during a private concierge consultation.' },
    { question: 'How can I arrange a private visit?', answer: 'Use the Concierge page to request a private visit, boutique appointment, or virtual consultation. The team will respond with available times and location details.' },
    { question: 'How can I contact the house?', answer: 'For general questions, bespoke commissions, or boutique support, contact concierge@shamimforever.com or use the official Concierge page.' },
  ] },
]

const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', '@id': 'https://www.shamimforever.com/faq#faq', mainEntity: sections.flatMap(section => section.items).map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-zinc-200 px-5 py-28 md:px-12 lg:px-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-4xl">
        <header className="mb-16 max-w-2xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-[#c9a054]">Client Care</p>
          <h1 className="mb-6 font-serif text-5xl font-light tracking-[0.04em] text-zinc-100 md:text-7xl">Frequently Asked Questions</h1>
          <p className="text-base leading-relaxed text-zinc-500 md:text-lg">Clear answers for collectors, clients, and private members of the Shamim Forever house.</p>
        </header>
        <div className="space-y-12">
          {sections.map(section => { const sectionId = section.title.toLowerCase().replace(/\s+/g, '-'); return (
            <section key={section.title} aria-labelledby={sectionId}>
              <h2 id={sectionId} className="mb-4 text-[10px] uppercase tracking-[0.45em] text-[#c9a054]">{section.title}</h2>
              <div className="divide-y divide-[#181818] border-y border-[#181818]">
                {section.items.map(item => (
                  <details key={item.question} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-base text-zinc-200 transition-colors hover:text-[#c9a054] [&::-webkit-details-marker]:hidden md:text-lg"><span>{item.question}</span><span aria-hidden="true" className="shrink-0 text-xl font-light text-[#c9a054] transition-transform duration-300 group-open:rotate-45">+</span></summary>
                    <p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-zinc-500 md:text-base">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) })}
        </div>
        <div className="mt-16 border-t border-[#181818] pt-8 text-sm text-zinc-600">Still need help? <a href="/concierge" className="text-[#c9a054] transition-colors hover:text-[#e4c27a]">Speak with the private concierge →</a></div>
      </div>
    </main>
  )
}
