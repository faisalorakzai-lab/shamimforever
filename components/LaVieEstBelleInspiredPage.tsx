'use client'

    import { useState } from 'react'
    import Link from 'next/link'
    import { useCart } from '@/lib/cart-context'
    import type { Product } from '@/types'

    const POSTER = '/products/la-vie-est-belle-inspired/hero.png'
    const USD_PRICE = 35
    const PKR_PRICE = 9800

    const notes = [
    ['Top notes', 'Blackcurrant · Pear', 'A bright, juicy opening with a polished fruity lift.'],
    ['Heart notes', 'Iris · Jasmine · Orange Blossom', 'A soft floral heart with powdery elegance and feminine light.'],
    ['Base notes', 'Praline · Vanilla · Patchouli · Tonka Bean', 'A warm gourmand foundation with sweetness, depth and comfort.'],
    ]

    const details = [
    ['Product', 'La Vie Est Belle Inspired'],
    ['House', 'Shamim Forever'],
    ['Category', 'Perfume'],
    ['Fragrance family', 'Floral · Fruity · Gourmand'],
    ['Positioning', 'Feminine'],
    ['Price', '$35 USD'],
    ['Local price', 'Rs 9,800'],
    ['Availability', 'In stock'],
    ]

    const faqs = [
    ['Is this the original La Vie Est Belle fragrance?', 'No. This is a Shamim Forever interpretation inspired by a recognizable fragrance style. It is not presented as the original designer fragrance or as affiliated with its trademark owner.'],
    ['What type of fragrance is it?', 'A floral, fruity and gourmand fragrance with a bright opening, soft floral heart and warm praline-vanilla dry-down.'],
    ['What are the main notes?', 'Blackcurrant and pear; iris, jasmine and orange blossom; praline, vanilla, patchouli and tonka bean.'],
    ['When can it be worn?', 'It is designed for daytime elegance, evening occasions, celebrations, gifting and any moment that calls for a warm feminine signature.'],
    ['Does it have an NFT or digital passport?', 'No blockchain or digital passport claim is made on this page because a product-specific record has not been verified.'],
    ]

    export default function LaVieEstBelleInspiredPage({ product }: { product: Product }) {
    const { addItem } = useCart()
    const [added, setAdded] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    function addToBag() {
      addItem({
        product_id: product.id,
        product_name: 'La Vie Est Belle Inspired',
        slug: 'la-vie-est-belle-inspired',
        price_usd: USD_PRICE,
        quantity: 1,
        image: POSTER,
        custom_message: '',
      })
      setAdded(true)
    }

    return (
      <main className="min-h-screen bg-[#050505] text-zinc-100">
        <section className="relative overflow-hidden border-b border-[#151515] px-5 pb-16 pt-24 md:px-12 md:pb-24 lg:px-20">
          <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="order-2 lg:order-1">
              <p className="mb-5 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">House of Shamim · Inspired Fragrance</p>
              <h1 className="max-w-3xl font-serif text-5xl font-light leading-[0.95] tracking-[0.04em] text-zinc-100 md:text-7xl">La Vie Est Belle <span className="italic text-zinc-500">Inspired</span></h1>
              <p className="mt-7 max-w-xl text-base font-light leading-[1.9] text-zinc-400">The beauty of joy, interpreted by the House. A refined gourmand-floral fragrance for sweetness, confidence and personal expression.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button onClick={addToBag} className="border border-[#c9a054]/70 bg-[#c9a054] px-7 py-4 text-[9px] uppercase tracking-[0.35em] text-[#080808] transition hover:bg-transparent hover:text-[#c9a054]">{added ? 'Added to Bag' : 'Acquire Your Creation'}</button>
                <a href="#creation" className="px-3 py-3 text-[9px] uppercase tracking-[0.35em] text-zinc-500 transition hover:text-zinc-200">Explore the creation ↓</a>
              </div>
              <div className="mt-12 grid max-w-md grid-cols-2 gap-5 border-t border-[#1a1a1a] pt-6 sm:grid-cols-4">
                {[['$35', 'USD'], ['Rs 9,800', 'Pakistan'], ['50ml', 'Format'], ['In stock', 'Availability']].map(([value, label]) => <div key={label}><p className="font-serif text-xl text-zinc-200">{value}</p><p className="mt-1 text-[8px] uppercase tracking-[0.28em] text-zinc-600">{label}</p></div>)}
              </div>
            </div>
            <div className="order-1 mx-auto w-full max-w-[520px] lg:order-2">
              <div className="relative overflow-hidden border border-[#c9a054]/25 bg-[#111] shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
                <img src={POSTER} alt="La Vie Est Belle Inspired perfume by Shamim Forever" className="aspect-[4/5] w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-white/5" />
                <p className="absolute bottom-5 left-5 text-[8px] uppercase tracking-[0.4em] text-white/70">Shamim Forever · Perfume</p>
              </div>
            </div>
          </div>
        </section>

        <section id="creation" className="mx-auto max-w-[1200px] px-5 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-3xl text-center"><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The Creation</p><h2 className="mt-5 font-serif text-4xl font-light tracking-[0.08em] text-zinc-100 md:text-6xl">Beauty, interpreted through the House</h2><p className="mt-7 text-sm font-light leading-[2] text-zinc-500">La Vie Est Belle Inspired is a gourmand-floral interpretation created around the idea of joyful elegance. A luminous fruity opening moves into a soft floral heart before settling into a warm, indulgent foundation.</p></div>
          <div className="mt-16 grid gap-px bg-[#171717] md:grid-cols-3">{notes.map(([label, title, copy]) => <article key={label} className="bg-[#080808] p-8 md:p-10"><p className="text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">{label}</p><h3 className="mt-5 font-serif text-2xl font-light tracking-[0.06em] text-zinc-200">{title}</h3><p className="mt-5 text-sm font-light leading-[1.9] text-zinc-600">{copy}</p></article>)}</div>
        </section>

        <section className="border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 md:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The Olfactive Concept</p><h2 className="mt-5 font-serif text-4xl font-light tracking-[0.08em] text-zinc-100 md:text-6xl">The Architecture of Joy</h2><p className="mt-7 max-w-md text-sm font-light leading-[2] text-zinc-500">The journey moves from brightness to floral softness and finally into a warm, enveloping dry-down. Each movement is designed to feel radiant, feminine and comforting.</p></div><div className="space-y-8">{[['01', 'Radiance', 'Bright fruity freshness introduces the composition.'], ['02', 'Bloom', 'Iris and floral accords create a soft, elegant heart.'], ['03', 'Indulgence', 'Praline, vanilla and warm base materials create the gourmand character.']].map(([number, title, copy]) => <div key={number} className="grid grid-cols-[48px_1fr] gap-5 border-b border-[#1b1b1b] pb-8"><span className="font-serif text-2xl text-[#c9a054]">{number}</span><div><h3 className="font-serif text-2xl font-light text-zinc-200">{title}</h3><p className="mt-3 text-sm font-light leading-[1.8] text-zinc-600">{copy}</p></div></div>)}</div></div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 py-20 md:px-12 md:py-28"><div className="grid gap-14 lg:grid-cols-[1fr_0.9fr]"><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Product Facts</p><h2 className="mt-5 font-serif text-4xl font-light tracking-[0.08em] md:text-5xl">The fragrance profile</h2><div className="mt-10 divide-y divide-[#191919] border-y border-[#191919]">{details.map(([label, value]) => <div key={label} className="grid grid-cols-[0.85fr_1.15fr] gap-5 py-4 text-sm"><span className="text-zinc-600">{label}</span><span className="text-zinc-300">{value}</span></div>)}</div></div><div className="lg:pt-20"><div className="border border-[#c9a054]/20 bg-[#0a0a0a] p-8 md:p-10"><p className="text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">The Shamim Interpretation</p><h3 className="mt-5 font-serif text-3xl font-light text-zinc-100">Reference is not identity.</h3><p className="mt-5 text-sm font-light leading-[2] text-zinc-500">This is a Shamim Forever creation inspired by a recognizable fragrance style. It is presented as its own House interpretation, not as the original designer fragrance.</p><p className="mt-6 text-sm font-light leading-[2] text-zinc-500">Digital passport, blockchain and NFT claims are intentionally not included until a product-specific record is verified.</p></div></div></div></section>

        <section className="border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 md:py-28"><div className="mx-auto grid max-w-[1200px] gap-16 md:grid-cols-2"><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">When to Wear</p><h2 className="mt-5 font-serif text-4xl font-light md:text-5xl">A warm signature for joyful moments</h2><div className="mt-8 flex flex-wrap gap-2">{['Daytime elegance', 'Evening occasions', 'Dinner & celebrations', 'Formal gatherings', 'Romantic occasions', 'Gifting'].map(item => <span key={item} className="border border-[#242424] px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-zinc-500">{item}</span>)}</div></div><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Application Ritual</p><h2 className="mt-5 font-serif text-4xl font-light md:text-5xl">Wear with intention</h2><p className="mt-7 text-sm font-light leading-[2] text-zinc-500">Apply lightly to pulse points such as wrists, neck, behind the ears and inner elbows. Avoid excessive rubbing and allow the fragrance to develop naturally from opening to dry-down.</p><p className="mt-5 text-sm font-light leading-[2] text-zinc-500">Keep away from direct sunlight and prolonged heat. Store in a cool, dry environment with the bottle securely closed.</p></div></div></section>

        <section className="mx-auto max-w-[900px] px-5 py-20 md:px-12 md:py-28"><div className="text-center"><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Frequently Asked Questions</p><h2 className="mt-5 font-serif text-4xl font-light md:text-5xl">Before you acquire</h2></div><div className="mt-12 divide-y divide-[#1a1a1a] border-y border-[#1a1a1a]">{faqs.map(([question, answer], index) => <div key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left"><span className="font-serif text-xl font-light text-zinc-200">{question}</span><span className="text-xl font-light text-[#c9a054]">{openFaq === index ? '−' : '+'}</span></button>{openFaq === index && <p className="max-w-3xl pb-6 pr-10 text-sm font-light leading-[1.9] text-zinc-500">{answer}</p>}</div>)}</div></section>

        <section className="border-t border-[#151515] px-5 py-20 text-center md:px-12 md:py-28"><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Final Acquisition</p><h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-light tracking-[0.06em] md:text-6xl">The beauty of joy, interpreted by the House.</h2><p className="mx-auto mt-6 max-w-xl text-sm font-light leading-[2] text-zinc-500">Shamim Forever — Built From Love. Forged Into Legacy.</p><div className="mt-9 flex flex-wrap justify-center gap-4"><button onClick={addToBag} className="border border-[#c9a054]/70 bg-[#c9a054] px-8 py-4 text-[9px] uppercase tracking-[0.35em] text-[#080808] transition hover:bg-transparent hover:text-[#c9a054]">{added ? 'Added to Bag' : 'Acquire for $35'}</button><Link href="/shop" className="border border-[#292929] px-8 py-4 text-[9px] uppercase tracking-[0.35em] text-zinc-500 transition hover:border-[#c9a054]/50 hover:text-zinc-200">Return to Shop</Link></div></section>
      </main>
    )
    }
    