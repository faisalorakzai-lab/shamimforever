'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/types'
import { LA_VIE_FAQS } from '@/lib/la-vie-est-belle'

const POSTER = '/products/la-vie-est-belle-inspired/hero.png'
const VIDEO_SRC: string | null = null

type RelatedProduct = Pick<Product, 'id' | 'name' | 'slug' | 'price_usd' | 'images'>

type AcquisitionForm = {
  name: string
  phone: string
  address: string
  city: string
  country: string
  message: string
}

const scentPyramid = [
  ['Top notes', 'Blackcurrant · Pear', 'Bright, fruity and radiant'],
  ['Heart notes', 'Iris · Jasmine · Orange Blossom', 'Floral, elegant and feminine'],
  ['Base notes', 'Praline · Vanilla · Patchouli · Tonka Bean', 'Warm, sweet, gourmand and deep'],
] as const

const journey = [
  ['01', 'First impression', 'Bright · Fruity · Radiant', 'A clear, joyful opening that feels luminous without becoming sharp.'],
  ['02', 'The heart', 'Floral · Elegant · Feminine', 'Iris, jasmine and orange blossom create the soft centre of the interpretation.'],
  ['03', 'The dry down', 'Warm · Sweet · Gourmand · Deep', 'Praline, vanilla, patchouli and tonka bean settle into a warm signature.'],
] as const

const careItems = [
  ['Sunlight protection', 'Keep the bottle away from direct sunlight to help preserve the fragrance and presentation.'],
  ['Heat protection', 'Avoid prolonged exposure to heat, vehicles, windowsills and humid bathrooms.'],
  ['Storage', 'Store upright in a cool, dry place with the cap or closure secured after use.'],
  ['Bottle care', 'Handle the bottle with clean, dry hands and wipe the exterior gently when needed.'],
  ['Packaging preservation', 'Keep the original packaging for gifting, storage and House archive reference.'],
  ['Archive information', 'Retain your order confirmation and product details for future Concierge support.'],
] as const

const services = [
  ['Private Concierge', 'Guidance for acquisition, gifting, product questions and House support.'],
  ['Care guidance', 'Practical preservation guidance for the fragrance and its presentation.'],
  ['Restock notices', 'Priority availability updates where the House makes them available.'],
] as const

function formatUsd(value: number) {
  return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function formatPkr(value: number) {
  return 'Rs ' + Math.round(value).toLocaleString('en-PK')
}

function FilmPanel({ poster }: { poster: string }) {
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)

  if (!VIDEO_SRC || failed) {
    return (
      <div className="relative overflow-hidden border border-[#c9a054]/20 bg-[#0a0a0a]">
        <img src={poster} alt="La Vie Est Belle Inspired perfume bottle by Shamim Forever" className="aspect-[16/8] w-full object-cover opacity-75" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <p className="text-[9px] uppercase tracking-[0.45em] text-[#c9a054]">Product film</p>
          <p className="mt-3 max-w-lg font-serif text-2xl font-light text-white md:text-4xl">The film will be issued when a verified product video is available.</p>
          <button type="button" disabled className="mt-6 cursor-not-allowed border border-white/15 px-5 py-3 text-[9px] uppercase tracking-[0.35em] text-white/35">Play film · coming soon</button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden border border-[#c9a054]/20 bg-black">
      <video
        className="aspect-[16/8] w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        poster={poster}
        onLoadedData={() => setReady(true)}
        onError={() => setFailed(true)}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      {!ready && <div className="absolute inset-0 grid place-items-center bg-black/40 text-[9px] uppercase tracking-[0.35em] text-[#c9a054]">Loading film</div>}
    </div>
  )
}

export default function LaVieEstBelleInspiredPage({ product, relatedProducts = [] }: { product: Product; relatedProducts?: RelatedProduct[] }) {
  const { addItem } = useCart()
  const priceUsd = Number(product.price_usd || 0)
  const pricePkr = Number(product.price_pkr || 0)
  const inventory = Number(product.inventory || 0)
  const inStock = inventory > 0
  const gallery = product.images?.length ? product.images : [POSTER]
  const [quantity, setQuantity] = useState(1)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState<AcquisitionForm>({ name: '', phone: '', address: '', city: '', country: '', message: '' })

  function updateForm(field: keyof AcquisitionForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function acquire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim() || !form.country.trim()) {
      setFormError('Please complete your name, phone, delivery address, city and country.')
      setSubmitted(false)
      return
    }
    setFormError('')
    addItem({
      product_id: product.id,
      product_name: product.name || 'La Vie Est Belle Inspired',
      slug: 'la-vie-est-belle-inspired',
      price_usd: priceUsd,
      quantity,
      image: gallery[0] || POSTER,
      custom_message: JSON.stringify(form),
    })
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100">
      <section className="relative overflow-hidden border-b border-[#171717] px-5 pb-20 pt-24 md:px-12 md:pb-28 lg:px-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(201,160,84,0.12),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(255,255,255,0.04),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="order-2 lg:order-1">
            <p className="mb-6 text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Perfume · House of Shamim</p>
            <h1 className="max-w-3xl font-serif text-5xl font-light leading-[0.92] tracking-[0.04em] text-zinc-100 md:text-7xl lg:text-[clamp(4rem,7vw,7rem)]">LA VIE EST BELLE <span className="italic text-zinc-500">INSPIRED</span></h1>
            <p className="mt-8 max-w-xl font-serif text-2xl font-light leading-[1.25] text-zinc-300 md:text-3xl">Love does not fade — it blooms into eternity</p>
            <p className="mt-6 max-w-xl text-sm font-light leading-[2] text-zinc-500">A Shamim Forever interpretation of a joyful floral-gourmand direction, composed for brightness, feminine elegance and a warm, memorable dry-down.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#acquisition" className="border border-[#c9a054]/80 bg-[#c9a054] px-7 py-4 text-[9px] uppercase tracking-[0.35em] text-[#080808] transition hover:bg-transparent hover:text-[#c9a054]">Acquire your creation</a>
              <a href="#creation" className="px-3 py-3 text-[9px] uppercase tracking-[0.35em] text-zinc-500 transition hover:text-zinc-200">Explore the creation ↓</a>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-2 gap-5 border-t border-[#1a1a1a] pt-6 sm:grid-cols-4">
              {[[formatUsd(priceUsd), 'USD'], [formatPkr(pricePkr), 'Pakistan'], ['Perfume', 'Category'], [inStock ? 'In stock' : 'Unavailable', 'Availability']].map(([value, label]) => <div key={label}><p className="font-serif text-xl text-zinc-200">{value}</p><p className="mt-1 text-[8px] uppercase tracking-[0.28em] text-zinc-600">{label}</p></div>)}
            </div>
          </div>
          <div className="order-1 mx-auto w-full max-w-[650px] lg:order-2">
            <div className="relative overflow-hidden border border-[#c9a054]/25 bg-[#111] shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
              <img src={gallery[0] || POSTER} alt="La Vie Est Belle Inspired perfume by Shamim Forever" className="aspect-[4/5] w-full object-cover" fetchPriority="high" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/75 via-transparent to-white/5" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4"><p className="text-[8px] uppercase tracking-[0.4em] text-white/70">Shamim Forever · Perfume</p><p className="text-[8px] uppercase tracking-[0.3em] text-[#c9a054]">House interpretation</p></div>
            </div>
          </div>
        </div>
        <a href="#creation" className="relative mx-auto mt-16 flex w-fit flex-col items-center gap-3 text-[8px] uppercase tracking-[0.45em] text-zinc-600"><span>Scroll to enter</span><span className="h-10 w-px bg-[#c9a054]/50" /></a>
      </section>

      <section id="acquisition" className="border-b border-[#171717] bg-[#080808] px-5 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Claim your creation</p><h2 className="mt-5 font-serif text-4xl font-light tracking-[0.06em] md:text-6xl">A private acquisition, prepared for you.</h2><p className="mt-7 max-w-md text-sm font-light leading-[2] text-zinc-500">Share your delivery details and the House will keep your request with the product in your cart. Final availability and delivery terms are confirmed by Concierge.</p><div className="mt-10 border-t border-[#1c1c1c] pt-6"><p className="font-serif text-4xl font-light text-white">{formatUsd(priceUsd)}</p><p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-zinc-600">{formatPkr(pricePkr)} · verified live product price</p></div></div>
          <form onSubmit={acquire} className="border border-[#c9a054]/20 bg-[#0b0b0b] p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between border-b border-[#1e1e1e] pb-5"><p className="text-[9px] uppercase tracking-[0.4em] text-[#c9a054]">Acquisition details</p><div className="flex items-center gap-3"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-8 w-8 border border-[#292929] text-zinc-400">−</button><span className="min-w-5 text-center font-serif text-lg text-white">{quantity}</span><button type="button" onClick={() => setQuantity(Math.min(9, quantity + 1))} className="h-8 w-8 border border-[#292929] text-zinc-400">+</button></div></div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-[9px] uppercase tracking-[0.22em] text-zinc-500">Full name<input required value={form.name} onChange={(event) => updateForm('name', event.target.value)} className="mt-2 w-full border-b border-[#2a2a2a] bg-transparent px-0 py-3 text-sm normal-case tracking-normal text-zinc-200 outline-none transition focus:border-[#c9a054]" /></label>
              <label className="text-[9px] uppercase tracking-[0.22em] text-zinc-500">Phone number<input required type="tel" value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} className="mt-2 w-full border-b border-[#2a2a2a] bg-transparent px-0 py-3 text-sm normal-case tracking-normal text-zinc-200 outline-none transition focus:border-[#c9a054]" /></label>
              <label className="text-[9px] uppercase tracking-[0.22em] text-zinc-500 md:col-span-2">Delivery address<input required value={form.address} onChange={(event) => updateForm('address', event.target.value)} className="mt-2 w-full border-b border-[#2a2a2a] bg-transparent px-0 py-3 text-sm normal-case tracking-normal text-zinc-200 outline-none transition focus:border-[#c9a054]" /></label>
              <label className="text-[9px] uppercase tracking-[0.22em] text-zinc-500">City<input required value={form.city} onChange={(event) => updateForm('city', event.target.value)} className="mt-2 w-full border-b border-[#2a2a2a] bg-transparent px-0 py-3 text-sm normal-case tracking-normal text-zinc-200 outline-none transition focus:border-[#c9a054]" /></label>
              <label className="text-[9px] uppercase tracking-[0.22em] text-zinc-500">Country<input required value={form.country} onChange={(event) => updateForm('country', event.target.value)} className="mt-2 w-full border-b border-[#2a2a2a] bg-transparent px-0 py-3 text-sm normal-case tracking-normal text-zinc-200 outline-none transition focus:border-[#c9a054]" /></label>
              <label className="text-[9px] uppercase tracking-[0.22em] text-zinc-500 md:col-span-2">Custom message / size<input value={form.message} onChange={(event) => updateForm('message', event.target.value)} className="mt-2 w-full border-b border-[#2a2a2a] bg-transparent px-0 py-3 text-sm normal-case tracking-normal text-zinc-200 outline-none transition focus:border-[#c9a054]" placeholder="Gifting, timing or Concierge note" /></label>
            </div>
            {formError && <p className="mt-6 border border-red-900/50 bg-red-950/20 p-4 text-xs leading-6 text-red-200">{formError}</p>}
            {submitted && <p className="mt-6 border border-[#c9a054]/30 bg-[#c9a054]/5 p-4 text-xs leading-6 text-[#d6bd82]">Your request is saved with this creation in the House Cart. Continue to checkout or contact Concierge for private assistance.</p>}
            <button type="submit" disabled={!inStock} className="mt-8 w-full border border-[#c9a054]/80 bg-[#c9a054] px-6 py-4 text-[9px] uppercase tracking-[0.35em] text-[#080808] transition hover:bg-transparent hover:text-[#c9a054] disabled:cursor-not-allowed disabled:border-[#333] disabled:bg-[#222] disabled:text-zinc-600">{inStock ? 'Acquire your creation' : 'Currently unavailable'}</button>
          </form>
        </div>
      </section>

      <section id="creation" className="mx-auto max-w-[1240px] px-5 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl text-center"><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The creation</p><h2 className="mt-5 font-serif text-4xl font-light tracking-[0.08em] text-zinc-100 md:text-6xl">A joyful signature, interpreted through the House</h2><p className="mt-7 text-sm font-light leading-[2] text-zinc-500">La Vie Est Belle Inspired is not an original designer fragrance. It is a Shamim Forever interpretation of a familiar floral-gourmand direction, shaped around radiance, feminine composure and a warm finish.</p></div>
        <div className="mt-16 grid gap-px bg-[#1a1a1a] md:grid-cols-3">{[['The inspiration', 'An expression of joy, confidence and soft radiance.'], ['The olfactive concept', 'A bright fruit-led opening, a floral heart and a gourmand dry-down.'], ['The Shamim interpretation', 'A House reading with its own identity, presentation and product record.']].map(([title, copy]) => <article key={title} className="bg-[#080808] p-8 md:p-10"><p className="text-[8px] uppercase tracking-[0.4em] text-[#c9a054]">La Vie Est Belle Inspired</p><h3 className="mt-5 font-serif text-2xl font-light tracking-[0.06em] text-zinc-200">{title}</h3><p className="mt-5 text-sm font-light leading-[1.9] text-zinc-600">{copy}</p></article>)}</div>
      </section>

      <section className="border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 md:py-28"><div className="mx-auto max-w-[1240px]"><div className="max-w-2xl"><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The fragrance journey</p><h2 className="mt-5 font-serif text-4xl font-light tracking-[0.08em] text-zinc-100 md:text-6xl">From radiance to warmth</h2></div><div className="mt-16 grid gap-px bg-[#1a1a1a] lg:grid-cols-3">{journey.map(([number, title, descriptor, copy]) => <article key={number} className="bg-[#080808] p-8 md:p-10"><span className="font-serif text-3xl text-[#c9a054]">{number}</span><h3 className="mt-10 font-serif text-3xl font-light text-white">{title}</h3><p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-[#c9a054]">{descriptor}</p><p className="mt-6 text-sm font-light leading-[1.9] text-zinc-600">{copy}</p></article>)}</div></div></section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 md:px-12 md:py-28"><div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The scent pyramid</p><h2 className="mt-5 font-serif text-4xl font-light tracking-[0.06em] md:text-6xl">Three movements of light</h2><p className="mt-7 max-w-md text-sm font-light leading-[2] text-zinc-500">Editorial fragrance information for the Shamim Forever interpretation. The notes below are the complete product profile supplied for this creation.</p></div><div className="divide-y divide-[#1b1b1b] border-y border-[#1b1b1b]">{scentPyramid.map(([level, title, descriptor]) => <div key={level} className="grid gap-5 py-8 md:grid-cols-[150px_1fr]"><p className="text-[9px] uppercase tracking-[0.35em] text-[#c9a054]">{level}</p><div><h3 className="font-serif text-2xl font-light text-zinc-200">{title}</h3><p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-zinc-600">{descriptor}</p></div></div>)}</div></div></section>

      <section className="border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 md:py-28"><div className="mx-auto max-w-[1240px] grid gap-14 lg:grid-cols-2"><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The character</p><h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">Feminine refinement without excess</h2><p className="mt-7 max-w-lg text-sm font-light leading-[2] text-zinc-500">The character is warm, polished and recognisable in its emotional direction while remaining clearly presented as its own Shamim Forever creation. It is made for presence that stays composed.</p><div className="mt-9 flex flex-wrap gap-2">{['Radiant', 'Floral', 'Feminine', 'Warm', 'Gourmand'].map((item) => <span key={item} className="border border-[#292929] px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-zinc-500">{item}</span>)}</div></div><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">When to wear</p><h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">For joyful moments</h2><p className="mt-7 max-w-lg text-sm font-light leading-[2] text-zinc-500">A versatile feminine signature for daytime elegance, evening occasions, celebrations, formal gatherings, romantic moments and gifting.</p><p className="mt-5 text-sm font-light leading-[2] text-zinc-500">Wear it as a personal ritual rather than a performance promise; fragrance develops differently across skin, climate and environment.</p></div></div></section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 md:px-12 md:py-28"><div className="grid gap-14 lg:grid-cols-[1fr_0.9fr]"><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Product facts</p><h2 className="mt-5 font-serif text-4xl font-light tracking-[0.06em] md:text-5xl">The House record</h2><div className="mt-10 divide-y divide-[#191919] border-y border-[#191919]">{[['Product', product.name || 'La Vie Est Belle Inspired'], ['House', 'Shamim Forever'], ['Category', 'Perfume'], ['Fragrance family', 'Floral · Fruity · Gourmand'], ['Top notes', 'Blackcurrant · Pear'], ['Heart notes', 'Iris · Jasmine · Orange Blossom'], ['Base notes', 'Praline · Vanilla · Patchouli · Tonka Bean'], ['Price', formatUsd(priceUsd)], ['Currency', 'USD'], ['Availability', inStock ? 'In stock' : 'Unavailable']].map(([label, value]) => <div key={label} className="grid grid-cols-[0.85fr_1.15fr] gap-5 py-4 text-sm"><span className="text-zinc-600">{label}</span><span className="text-zinc-300">{value}</span></div>)}</div></div><div className="lg:pt-20"><div className="border border-[#c9a054]/20 bg-[#0a0a0a] p-8 md:p-10"><p className="text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">Positioning</p><h3 className="mt-5 font-serif text-3xl font-light text-zinc-100">Reference is not identity.</h3><p className="mt-5 text-sm font-light leading-[2] text-zinc-500">La Vie Est Belle Inspired is a Shamim Forever product name and interpretation. It is not the original Lancôme product and is not affiliated with, endorsed by or owned by Lancôme.</p><p className="mt-6 text-sm font-light leading-[2] text-zinc-500">The product record, imagery and acquisition details on this page refer to Shamim Forever only.</p></div></div></div></section>

      <section className="border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 md:py-28"><div className="mx-auto max-w-[1240px]"><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The film</p><h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">A moving portrait of the creation</h2><p className="mt-6 max-w-xl text-sm font-light leading-[2] text-zinc-500">Only verified House media is loaded here. This keeps the page fast and avoids presenting a broken or unverified product film.</p><div className="mt-12"><FilmPanel poster={POSTER} /></div></div></section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 md:px-12 md:py-28"><div className="grid gap-14 lg:grid-cols-2"><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The archive object</p><h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">A creation with a clear identity</h2><div className="mt-10 divide-y divide-[#191919] border-y border-[#191919]">{[['Product name', product.name || 'La Vie Est Belle Inspired'], ['Category', 'Perfume'], ['House', 'Shamim Forever'], ['Edition', 'Current House catalogue'], ['Serial number', 'Not issued for this product record'], ['Creation status', inStock ? 'Available for acquisition' : 'Currently unavailable'], ['Digital passport', 'Coming soon · not yet issued'], ['Archive status', 'House product archive']].map(([label, value]) => <div key={label} className="grid grid-cols-[0.8fr_1.2fr] gap-5 py-4 text-sm"><span className="text-zinc-600">{label}</span><span className="text-zinc-300">{value}</span></div>)}</div></div><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Authenticity & provenance</p><h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">Three layers of identity</h2><div className="mt-10 space-y-8">{[['01', 'Physical product identity', 'The fragrance, bottle and presentation supplied by Shamim Forever.'], ['02', 'House archive identity', 'The product name, category, imagery and catalogue record maintained by the House.'], ['03', 'Digital identity', 'A future digital passport may associate the creation with a verifiable record. It is not yet issued for this product.']].map(([number, title, copy]) => <div key={number} className="grid grid-cols-[45px_1fr] gap-5 border-b border-[#1a1a1a] pb-8"><span className="font-serif text-2xl text-[#c9a054]">{number}</span><div><h3 className="font-serif text-2xl font-light text-zinc-200">{title}</h3><p className="mt-3 text-sm font-light leading-[1.9] text-zinc-600">{copy}</p></div></div>)}</div><div className="mt-9 flex flex-wrap gap-3"><Link href="/authenticate" className="border border-[#292929] px-5 py-3 text-[9px] uppercase tracking-[0.25em] text-zinc-400 transition hover:border-[#c9a054]/60 hover:text-[#c9a054]">Authenticate</Link><Link href="/gallery" className="border border-[#292929] px-5 py-3 text-[9px] uppercase tracking-[0.25em] text-zinc-400 transition hover:border-[#c9a054]/60 hover:text-[#c9a054]">Heritage gallery</Link></div></div></div></section>

      <section className="border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 md:py-28"><div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-2"><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Digital passport</p><h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">A record should be earned by evidence.</h2><div className="mt-8 border border-[#c9a054]/25 bg-[#0c0c0c] p-8 md:p-10"><p className="text-[9px] uppercase tracking-[0.4em] text-[#c9a054]">Coming soon · not yet issued</p><p className="mt-5 text-sm font-light leading-[2] text-zinc-500">This product does not currently have a verified serial number, smart contract, token ID, network record or mint status. No NFT or blockchain claim is made.</p><button type="button" disabled className="mt-7 cursor-not-allowed border border-[#333] px-5 py-3 text-[9px] uppercase tracking-[0.3em] text-zinc-600">Mint not available</button></div></div><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Blockchain-linked provenance record</p><h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">Clear language, no overclaiming.</h2><p className="mt-7 text-sm font-light leading-[2] text-zinc-500">If a digital passport is issued in the future, it is designed to associate the creation with a verifiable digital record for identification, provenance and authentication.</p><p className="mt-5 text-sm font-light leading-[2] text-zinc-500">NFT ownership does not automatically establish legal ownership of the physical fragrance unless applicable legal terms expressly establish that relationship.</p><p className="mt-5 text-sm font-light leading-[2] text-zinc-500">The House will never ask for a private key, seed phrase, recovery phrase or wallet password.</p></div></div></section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 md:px-12 md:py-28"><div className="grid gap-14 lg:grid-cols-2"><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Care & preservation</p><h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">Keep the ritual beautiful.</h2><div className="mt-10 grid gap-4 sm:grid-cols-2">{careItems.map(([title, copy]) => <article key={title} className="border border-[#1c1c1c] bg-[#080808] p-6"><h3 className="font-serif text-xl font-light text-zinc-200">{title}</h3><p className="mt-3 text-sm font-light leading-[1.8] text-zinc-600">{copy}</p></article>)}</div></div><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">The ritual</p><h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">Apply with intention.</h2><p className="mt-7 text-sm font-light leading-[2] text-zinc-500">Apply lightly to the wrists, neck, behind the ears and other pulse points. Allow the composition to develop naturally from its first impression into the dry-down.</p><p className="mt-5 text-sm font-light leading-[2] text-zinc-500">This is a fragrance ritual, not a medical or performance claim. Skin chemistry, climate and application change how every fragrance is experienced.</p><div className="mt-10 space-y-4">{services.map(([title, copy]) => <div key={title} className="border-b border-[#1b1b1b] pb-4"><h3 className="font-serif text-xl font-light text-zinc-200">{title}</h3><p className="mt-2 text-sm leading-[1.8] text-zinc-600">{copy}</p></div>)}</div></div></div></section>

      {relatedProducts.length > 0 && <section className="border-y border-[#151515] bg-[#080808] px-5 py-20 md:px-12 md:py-28"><div className="mx-auto max-w-[1240px]"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Complete the House</p><h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">Explore other available creations</h2></div><Link href="/shop" className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 hover:text-[#c9a054]">View the shop →</Link></div><div className="mt-12 grid gap-4 md:grid-cols-3">{relatedProducts.map((item) => <Link key={item.id} href={'/products/' + item.slug} className="group border border-[#1c1c1c] bg-[#0a0a0a] p-4 transition hover:border-[#c9a054]/50"><div className="overflow-hidden bg-[#111]"><img src={item.images?.[0] || POSTER} alt={item.name + ' by Shamim Forever'} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" /></div><p className="mt-5 text-[8px] uppercase tracking-[0.35em] text-[#c9a054]">Shamim Forever</p><h3 className="mt-2 font-serif text-2xl font-light text-zinc-200">{item.name}</h3><p className="mt-3 text-sm text-zinc-500">{formatUsd(Number(item.price_usd || 0))}</p></Link>)}</div></div></section>}

      <section className="mx-auto max-w-[900px] px-5 py-20 md:px-12 md:py-28"><div className="text-center"><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Frequently asked questions</p><h2 className="mt-5 font-serif text-4xl font-light md:text-5xl">Before you acquire</h2></div><div className="mt-12 divide-y divide-[#1a1a1a] border-y border-[#1a1a1a]">{LA_VIE_FAQS.map(([question, answer], index) => <div key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left"><span className="font-serif text-xl font-light text-zinc-200">{question}</span><span className="text-xl font-light text-[#c9a054]">{openFaq === index ? '−' : '+'}</span></button>{openFaq === index && <p className="max-w-3xl pb-6 pr-10 text-sm font-light leading-[1.9] text-zinc-500">{answer}</p>}</div>)}</div></section>

      <section className="border-t border-[#151515] px-5 py-20 text-center md:px-12 md:py-28"><p className="text-[9px] uppercase tracking-[0.55em] text-[#c9a054]">Private Concierge</p><h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-light tracking-[0.06em] md:text-6xl">A thoughtful answer is part of the House.</h2><p className="mx-auto mt-6 max-w-xl text-sm font-light leading-[2] text-zinc-500">For acquisition, gifting, bespoke requests, authentication and product questions.</p><div className="mt-9 flex flex-wrap justify-center gap-4"><a href="mailto:concierge@shamimforever.com" className="border border-[#c9a054]/70 bg-[#c9a054] px-8 py-4 text-[9px] uppercase tracking-[0.35em] text-[#080808] transition hover:bg-transparent hover:text-[#c9a054]">Contact Concierge</a><Link href="/shop" className="border border-[#292929] px-8 py-4 text-[9px] uppercase tracking-[0.35em] text-zinc-500 transition hover:border-[#c9a054]/50 hover:text-zinc-200">Return to shop</Link></div></section>
    </main>
  )
}
