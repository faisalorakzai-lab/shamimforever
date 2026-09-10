'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/types'

const USD_PRICE = 259
const PKR_PRICE = 72000
const CONTRACT = '0xCCFc11b22990a39cB5a58A1d1778A1d80FDC7640'
const PRODUCT_NAME = 'SF Himalayan Snow Musk'
const PRODUCT_IMAGE = 'https://uvgtgeauhjbdatrmmaob.supabase.co/storage/v1/object/public/products/perfumes/himalayan-snow-musk.png'

const notes = [
  ['Opening', 'Bergamot', 'Bright clarity with a cold, clean lift.'],
  ['Heart', 'White Florals', 'A translucent floral veil with quiet luminosity.'],
  ['Signature', 'Himalayan White Musk', 'The soft, high-altitude presence at the centre.'],
  ['Base', 'Translucent Sandalwood', 'A smooth, pale wood finish that stays close to the skin.'],
]

const privileges = [
  'Institutional Founder Status',
  'Sovereign Vault Access',
  'Future Founder Allocations',
  'Private House Ceremonies',
  'Restoration & Refill Privileges',
  'Blockchain-Linked Provenance',
  'Concierge Authentication',
  'Priority Restock Alerts',
]

const details = [
  ['Product', PRODUCT_NAME],
  ['House', 'Shamim Forever'],
  ['Category', 'Luxury Perfume'],
  ['Collection', 'House of Shamim'],
  ['Rarity', 'Heritage Archive'],
  ['Price', '$259 USD'],
  ['Local Price', 'Rs 72,000'],
  ['Fragrance Family', 'Musk / Woody / Floral'],
  ['Opening', 'Bergamot'],
  ['Heart', 'White Florals'],
  ['Signature', 'Himalayan White Musk'],
  ['Base', 'Translucent Sandalwood'],
  ['Digital Identity', 'Sovereign Passport'],
  ['Blockchain', 'Polygon Mainnet'],
  ['Token Standard', 'ERC-721'],
  ['Edition', 'House Allocation Reserve'],
]

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <p className="mb-4 text-[8px] uppercase tracking-[0.6em] text-[#c9a054]">{eyebrow}</p>
      <h2 className="font-serif text-3xl font-light tracking-[0.12em] text-zinc-100 md:text-5xl">{title}</h2>
      {children && <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-[2] text-zinc-500">{children}</p>}
    </div>
  )
}

export default function HimalayanSnowMuskPage({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('Pakistan')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)
  const [wallet, setWallet] = useState('')

  function addToWallet() {
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim() || !country.trim()) {
      setError('Please complete the delivery details before adding this creation to your wallet.')
      return
    }
    setError('')
    addItem({
      product_id: product.id,
      product_name: PRODUCT_NAME,
      slug: product.slug,
      price_usd: USD_PRICE,
      quantity: 1,
      image: product.images?.[0] || PRODUCT_IMAGE,
      custom_message: `${message}${wallet ? ` | Polygon wallet: ${wallet}` : ''}`,
    })
    setAdded(true)
  }

  return (
    <article className="min-h-screen overflow-hidden bg-[#030303] text-zinc-200">
      <nav aria-label="Breadcrumb" className="mx-auto flex max-w-[1400px] items-center gap-3 border-b border-white/[0.05] px-6 py-5 text-[8px] uppercase tracking-[0.35em] text-zinc-600 md:px-12 lg:px-20">
        <Link href="/" className="transition-colors hover:text-[#c9a054]">Home</Link>
        <span>/</span>
        <Link href="/shop" className="transition-colors hover:text-[#c9a054]">Shop</Link>
        <span>/</span>
        <span className="text-zinc-400">SF Himalayan Snow Musk</span>
      </nav>

      <section className="relative border-b border-[#c9a054]/10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(185,205,220,0.15),transparent_48%),radial-gradient(ellipse_at_50%_100%,rgba(201,160,84,0.12),transparent_55%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(125deg,transparent_0%,rgba(255,255,255,0.025)_50%,transparent_100%)]" />
        <div className="relative mx-auto grid min-h-[min(860px,calc(100svh-86px))] max-w-[1400px] items-center gap-10 px-6 py-14 md:grid-cols-[1.05fr_0.95fr] md:px-12 md:py-20 lg:px-20">
          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="mb-6 text-[8px] uppercase tracking-[0.65em] text-[#c9a054]">Perfume · House of Shamim</p>
            <h1 className="font-serif text-5xl font-light uppercase leading-[0.92] tracking-[0.12em] text-zinc-100 md:text-7xl lg:text-[6.5rem]">
              <span className="block text-3xl tracking-[0.35em] md:text-5xl">SF</span>
              <span className="block">Himalayan</span>
              <span className="block">Snow Musk</span>
            </h1>
            <div className="my-8 h-px w-20 bg-gradient-to-r from-[#c9a054] to-transparent md:mx-0 mx-auto" />
            <p className="font-serif text-lg italic tracking-[0.08em] text-zinc-500 md:text-xl">Love does not fade — it blooms into eternity</p>
            <div className="mt-9 flex items-baseline justify-center gap-5 md:justify-start">
              <span className="font-serif text-4xl font-light text-zinc-100">${USD_PRICE}</span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#c9a054]">USD</span>
              <span className="text-xs tracking-[0.15em] text-zinc-600">Rs {PKR_PRICE.toLocaleString()}</span>
            </div>
            <div className="mt-8 inline-flex items-center gap-3 border border-[#c9a054]/25 bg-[#c9a054]/[0.04] px-5 py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a054]" />
              <span className="text-[8px] uppercase tracking-[0.38em] text-[#c9a054]">NFT Sovereign Passport · Polygon Mainnet</span>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <button onClick={() => document.getElementById('acquire')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-[#c9a054] to-[#a77b26] px-10 py-4 text-[9px] uppercase tracking-[0.5em] text-black transition-opacity hover:opacity-90">Acquire Now</button>
              <a href="#archive" className="border border-[#c9a054]/35 px-10 py-4 text-[9px] uppercase tracking-[0.5em] text-[#c9a054] transition-colors hover:bg-[#c9a054]/10">Explore Archive</a>
            </div>
          </div>
          <div className="order-1 mx-auto w-full max-w-[620px] md:order-2">
            <div className="relative aspect-square overflow-hidden border border-[#c9a054]/20 bg-[#080b0d]">
              <img src={product.images?.[0] || PRODUCT_IMAGE} alt="SF Himalayan Snow Musk luxury white musk perfume by Shamim Forever" className="h-full w-full object-cover object-center opacity-90" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.7)_100%)]" />
              <div className="pointer-events-none absolute inset-4 border border-[#c9a054]/20" />
              <span className="absolute bottom-7 left-7 text-[8px] uppercase tracking-[0.5em] text-[#c9a054]/75">Heritage Archive</span>
            </div>
          </div>
        </div>
      </section>

      <section id="archive" className="mx-auto max-w-[1180px] px-6 py-24 md:px-12 md:py-36">
        <SectionIntro eyebrow="The Archive Object" title="A Fragrance From the High Mountains">
          SF Himalayan Snow Musk is an atmospheric interpretation of high-altitude purity, built around Himalayan white musk and illuminated with bergamot, white florals and translucent sandalwood.
        </SectionIntro>
        <div className="grid gap-px border border-[#c9a054]/15 bg-[#c9a054]/15 md:grid-cols-2">
          <div className="bg-[#080808] p-8 md:p-12">
            <p className="text-sm font-light leading-[2] text-zinc-500">There is a particular silence to snow-covered mountains. This composition translates that atmosphere into fragrance: bright at the opening, luminous at the heart, and softly musky as it settles.</p>
            <p className="mt-7 border-l border-[#c9a054]/40 pl-5 font-serif text-xl italic leading-relaxed text-zinc-400">Not loud. Not ordinary. Designed around purity, presence and quiet sophistication.</p>
          </div>
          <div className="bg-[#080808] p-8 md:p-12">
            <p className="mb-6 text-[8px] uppercase tracking-[0.5em] text-[#c9a054]">Fragrance Character</p>
            <p className="font-serif text-2xl font-light tracking-[0.12em] text-zinc-200">COLD · CLEAN · LUMINOUS · MUSKY · WOODY</p>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {['Mountain Air', 'Snowlight', 'White Musk', 'Translucent Woods'].map(item => <div key={item} className="border border-white/[0.07] px-4 py-4 text-[9px] uppercase tracking-[0.25em] text-zinc-500">{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#07090a] px-6 py-24 md:px-12 md:py-32">
        <SectionIntro eyebrow="The Olfactory Composition" title="The Sovereign Composition" />
        <div className="mx-auto grid max-w-[1180px] gap-px bg-[#c9a054]/15 md:grid-cols-4">
          {notes.map(([layer, note, description]) => (
            <div key={layer} className="bg-[#070707] p-7 md:p-8">
              <p className="text-[8px] uppercase tracking-[0.45em] text-[#c9a054]">{layer}</p>
              <h3 className="mt-6 font-serif text-2xl font-light text-zinc-100">{note}</h3>
              <p className="mt-4 text-xs leading-[1.8] text-zinc-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-24 md:px-12 md:py-32">
        <SectionIntro eyebrow="Digital Sovereign Passport" title="The Physical Creation. The Digital Identity.">
          Every eligible creation is paired with a digital provenance identity designed to establish a clear relationship between the physical object and its archive record. The passport supports authenticity and provenance; it does not automatically transfer intellectual property rights.
        </SectionIntro>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="border border-[#c9a054]/20 bg-[#080808] p-8 md:p-10">
            <p className="mb-8 text-[8px] uppercase tracking-[0.5em] text-[#c9a054]">Sovereign Traits</p>
            <div className="space-y-0">
              {[
                ['Name', PRODUCT_NAME],
                ['Category', 'Perfume'],
                ['Rarity', 'HERITAGE ARCHIVE'],
                ['Network', 'Polygon Mainnet'],
                ['Standard', 'ERC-721'],
                ['Edition', 'House Allocation Reserve'],
                ['Authentication', 'Polygon Verified / NFT Enabled'],
              ].map(([label, value]) => <div key={label} className="flex items-start justify-between gap-6 border-b border-white/[0.05] py-4"><span className="text-[8px] uppercase tracking-[0.3em] text-zinc-600">{label}</span><span className="text-right text-xs text-zinc-300">{value}</span></div>)}
            </div>
          </div>
          <div className="flex flex-col justify-between border border-white/[0.06] bg-gradient-to-br from-[#0d0d0d] to-[#050505] p-8 md:p-10">
            <div>
              <p className="mb-6 text-[8px] uppercase tracking-[0.5em] text-[#c9a054]">Blockchain Authentication</p>
              <h3 className="font-serif text-3xl font-light text-zinc-100">Verify the House Record</h3>
              <p className="mt-6 text-sm leading-[2] text-zinc-500">Confirm the complete network, contract and explorer record where applicable. Shamim Forever will never ask for a seed phrase, private key or wallet password.</p>
            </div>
            <div className="mt-10 border border-white/[0.06] p-5">
              <p className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">Verified contract reference</p>
              <p className="mt-3 break-all font-mono text-xs text-zinc-400">{CONTRACT}</p>
              <a href={`https://polygonscan.com/address/${CONTRACT}`} target="_blank" rel="noreferrer" className="mt-5 inline-block text-[8px] uppercase tracking-[0.35em] text-[#c9a054] hover:text-zinc-100">Open PolygonScan →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#070707] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1180px]">
          <SectionIntro eyebrow="Holder Privileges" title="The House Continues After Acquisition" />
          <div className="grid gap-px bg-[#c9a054]/15 sm:grid-cols-2 lg:grid-cols-4">
            {privileges.map((privilege, index) => <div key={privilege} className="bg-[#070707] p-7"><span className="text-[9px] text-[#c9a054]">0{index + 1}</span><p className="mt-5 text-[10px] uppercase tracking-[0.23em] leading-relaxed text-zinc-400">{privilege}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-14 md:grid-cols-2 md:items-start">
          <div>
            <p className="mb-5 text-[8px] uppercase tracking-[0.6em] text-[#c9a054]">Why This Creation Exists</p>
            <h2 className="font-serif text-4xl font-light tracking-[0.1em] text-zinc-100 md:text-5xl">The Colder, Quieter Side of the House</h2>
            <div className="mt-8 space-y-5 text-sm leading-[2] text-zinc-500"><p>Where rose speaks through romance and vanilla through warmth, Snow Musk speaks through clarity.</p><p>Its identity is deliberately restrained: a cool, clean and luminous signature for people who prefer presence without excess.</p></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['Mountain Air', 'White Musk', 'Snowlight', 'White Florals', 'Translucent Woods', 'Quiet Sophistication'].map(item => <div key={item} className="flex min-h-28 items-end border border-white/[0.07] bg-[#080808] p-5 text-[9px] uppercase tracking-[0.25em] text-zinc-500">{item}</div>)}
          </div>
        </div>
      </section>

      <section id="acquire" className="border-t border-[#c9a054]/15 bg-[#080706] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-5 text-[8px] uppercase tracking-[0.6em] text-[#c9a054]">Claim Your Sovereign</p>
            <h2 className="font-serif text-4xl font-light tracking-[0.1em] text-zinc-100">Reserve the Archive Object</h2>
            <div className="mt-8 flex items-baseline gap-4"><span className="font-serif text-4xl text-zinc-100">${USD_PRICE}</span><span className="text-[9px] uppercase tracking-[0.35em] text-[#c9a054]">USD</span></div>
            <p className="mt-4 text-xs tracking-[0.12em] text-zinc-600">Rs {PKR_PRICE.toLocaleString()} · House Allocation Reserve</p>
            <p className="mt-8 text-sm leading-[2] text-zinc-500">After acquisition, provide an eligible Polygon-compatible public wallet address for the corresponding Sovereign Passport process.</p>
            <Link href="/authenticate" className="mt-8 inline-block border border-[#c9a054]/35 px-7 py-3 text-[8px] uppercase tracking-[0.35em] text-[#c9a054] hover:bg-[#c9a054]/10">Passport Authentication</Link>
          </div>
          <div className="border border-[#c9a054]/20 bg-[#050505] p-6 md:p-10">
            <p className="mb-6 text-[8px] uppercase tracking-[0.5em] text-[#c9a054]">Delivery Information</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: name, set: setName, placeholder: 'Full Name *' },
                { value: phone, set: setPhone, placeholder: 'Phone Number *' },
                { value: address, set: setAddress, placeholder: 'Delivery Address *' },
                { value: city, set: setCity, placeholder: 'City *' },
                { value: country, set: setCountry, placeholder: 'Country *' },
              ].map(({ value, set, placeholder }, index) => <input key={placeholder} value={value} onChange={e => set(e.target.value)} placeholder={placeholder} className={`${index === 2 ? 'sm:col-span-2' : ''} border border-white/[0.09] bg-transparent px-4 py-3 text-xs text-zinc-300 outline-none placeholder:text-zinc-700 focus:border-[#c9a054]/40`} />)}
              <input value={wallet} onChange={e => setWallet(e.target.value)} placeholder="0x... Polygon Wallet Address (optional)" className="sm:col-span-2 border border-white/[0.09] bg-transparent px-4 py-3 font-mono text-xs text-zinc-300 outline-none placeholder:text-zinc-700 focus:border-[#c9a054]/40" />
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Custom message / special instructions (optional)" rows={3} className="sm:col-span-2 border border-white/[0.09] bg-transparent px-4 py-3 text-xs text-zinc-300 outline-none placeholder:text-zinc-700 focus:border-[#c9a054]/40" />
            </div>
            {error && <p className="mt-4 text-xs text-red-300/80">{error}</p>}
            {added ? <div className="mt-5 border border-[#c9a054]/25 bg-[#c9a054]/[0.05] p-5 text-center"><p className="text-[9px] uppercase tracking-[0.4em] text-[#c9a054]">Added to Wallet</p><Link href="/wallet" className="mt-3 inline-block text-[8px] uppercase tracking-[0.3em] text-zinc-500 hover:text-zinc-200">Open Wallet →</Link></div> : <button onClick={addToWallet} className="mt-5 w-full bg-gradient-to-r from-[#c9a054] to-[#a77b26] py-4 text-[9px] uppercase tracking-[0.5em] text-black hover:opacity-90">Add to Wallet</button>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-6 py-24 md:px-12 md:py-32">
        <SectionIntro eyebrow="Product Specifications" title="The Archive Record" />
        <div className="border-t border-white/[0.08]">
          {details.map(([label, value]) => <div key={label} className="flex flex-col gap-2 border-b border-white/[0.06] py-5 sm:flex-row sm:items-center sm:justify-between"><span className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">{label}</span><span className="text-sm text-zinc-300 sm:text-right">{value}</span></div>)}
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#070707] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1000px]">
          <SectionIntro eyebrow="Frequently Asked Questions" title="The Snow Musk Archive" />
          {[
            ['What is SF Himalayan Snow Musk?', 'SF Himalayan Snow Musk is a luxury white musk perfume by Shamim Forever, composed around bergamot, white florals, Himalayan white musk and translucent sandalwood.'],
            ['How much does SF Himalayan Snow Musk cost?', 'SF Himalayan Snow Musk is listed at $259 USD, with a local price of Rs 72,000.'],
            ['What does Himalayan Snow Musk smell like?', 'It is cool, clean and luminous, moving from citrus brightness through white florals into soft musk and pale sandalwood.'],
            ['What is the Sovereign Passport?', 'The Sovereign Passport is the digital identity associated with a Shamim Forever creation and its applicable provenance record.'],
            ['Which blockchain is used?', 'The product record references Polygon Mainnet and the ERC-721 token standard.'],
            ['Is this part of the House of Shamim?', 'Yes. The fragrance is presented as Perfume — House of Shamim within the Shamim Forever collection.'],
          ].map(([question, answer]) => <details key={question} className="border-b border-white/[0.08] py-5"><summary className="cursor-pointer font-serif text-xl font-light tracking-[0.04em] text-zinc-300">{question}</summary><p className="mt-4 max-w-3xl text-sm leading-[1.9] text-zinc-500">{answer}</p></details>)}
        </div>
      </section>

      <section className="px-6 py-24 text-center md:py-32">
        <p className="text-[8px] uppercase tracking-[0.65em] text-[#c9a054]">The House Signature</p>
        <h2 className="mt-8 font-serif text-4xl font-light tracking-[0.12em] text-zinc-100 md:text-6xl">Love Does Not Fade</h2>
        <p className="mt-4 font-serif text-xl italic text-zinc-500">It blooms into eternity.</p>
      </section>
    </article>
  )
}