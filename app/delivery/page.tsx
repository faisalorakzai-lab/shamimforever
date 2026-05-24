'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAccount, useWriteContract, useSendTransaction } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseEther, parseUnits } from 'viem'
import Map, { Marker, Source, Layer } from 'react-map-gl'

const ease = [0.16, 1, 0.3, 1] as const
const fv = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease, delay: d },
})

const VAULT_ADDRESS = '0x3Cb45d2022e2E15AFa8C4822647B89935a2ceD08' as `0x${string}`
const OKBOND_ADDRESS = '0x7BB2458740c4F491277973212309d831385Ab9D7' as `0x${string}`
// Polygon Mainnet token addresses
const USDT_POLYGON = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as `0x${string}`
const USDC_POLYGON = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' as `0x${string}`

const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

const STATUS_ORDER = [
  'vault_prepared',
  'identity_verified',
  'route_secured',
  'chauffeur_assigned',
  'transit_active',
  'arrival_confirmed',
]

const STATUS_LABELS: Record<string, string> = {
  vault_prepared: 'Vault Prepared',
  identity_verified: 'Identity Verified',
  route_secured: 'Route Secured',
  chauffeur_assigned: 'Chauffeur Assigned',
  transit_active: 'Transit Active',
  arrival_confirmed: 'Arrival Confirmed',
}

interface Shipment {
  tracking_id: string
  customer_name: string
  status: string
  status_index: number
  current_location: string
  destination: string
  chauffeur_name: string
  vehicle: string
  eta: string
  latitude: number
  longitude: number
  is_active: boolean
}

interface DeliveryForm {
  name: string
  region: string
  window: string
  notes: string
}

const TIERS = [
  {
    code: 'ST', name: 'Standard', sub: 'Secure Global Luxury Shipping',
    price: 'Complimentary above PKR 50,000',
    features: ['Insured global courier', 'Tracking dashboard', 'Black archival packaging', 'Sovereign receipt'],
  },
  {
    code: 'WG', name: 'White Glove', sub: 'Private Courier · Scheduled Handoff',
    price: 'PKR 5,000',
    features: ['Dedicated white-glove courier', 'Pre-scheduled delivery window', 'Caller ID verification', 'Identity-confirmed handoff', 'Unboxing ceremony kit'],
    featured: true,
  },
  {
    code: 'SA', name: 'Sovereign Arrival', sub: 'Ultra-Exclusive Personal Protocol',
    price: 'By arrangement',
    features: ['Armoured chauffeur vehicle', 'Real-time GPS escort', 'Climate-controlled vault case', 'Two-operative delivery team', 'Same-day available in Karachi'],
  },
]

const NODES = [
  { city: 'Karachi', coords: '24.8607° N, 67.0011° E', status: 'Primary Hub · Active' },
  { city: 'Lahore', coords: '31.5204° N, 74.3587° E', status: 'Active Node' },
  { city: 'Islamabad', coords: '33.6844° N, 73.0479° E', status: 'Active Node' },
  { city: 'Dubai', coords: '25.2048° N, 55.2708° E', status: 'Gulf Hub · Active' },
  { city: 'London', coords: '51.5074° N, 0.1278° W', status: 'Europe Node · Active' },
  { city: 'Riyadh', coords: '24.7136° N, 46.6753° E', status: 'KSA Node · Active' },
]

const CLIMATE_METRICS = [
  { label: 'Temperature', value: '19°C', pct: 60 },
  { label: 'Humidity', value: '42%', pct: 42 },
  { label: 'Vibration Shield', value: 'Active', pct: 100 },
  { label: 'UV Protection', value: '100%', pct: 100 },
]

const PROTOCOL_STEPS = [
  { n: '01', title: 'Vault Preparation', img: '/delivery-vault.png', desc: 'Each creation is inspected by white-gloved hands, wax-sealed, and prepared in our sovereign vault before departure. No exceptions.' },
  { n: '02', title: 'Chauffeur Assignment', img: '/delivery-chauffeur.png', desc: 'A dedicated delivery operative is personally assigned before departure. Identity confirmed. Route briefed. Creation transferred under direct custody.' },
  { n: '03', title: 'Climate Transit', img: '/delivery-transit.png', desc: 'Temperature maintained at 18–22°C throughout the journey. Fragrances sealed in climate-controlled aluminium cases — never exposed to heat, light, or shock.' },
  { n: '04', title: 'Arrival Ceremony', img: '/delivery-arrival.png', desc: 'Luxury presentation at your door. Identity confirmation. Hand-signed receipt. NFC activation. The delivery is not complete until the sovereign seal is transferred.' },
]

export default function DeliveryPage() {
  const [trackCode, setTrackCode] = useState('')
  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [tracking, setTracking] = useState(false)
  const [trackError, setTrackError] = useState('')
  const [form, setForm] = useState<DeliveryForm>({ name: '', region: '', window: '', notes: '' })
  const [sent, setSent] = useState(false)
  const [selectedTier, setSelectedTier] = useState('WG')
  const [payMethod, setPayMethod] = useState<'MATIC' | 'USDT' | 'USDC' | 'OKBOND' | null>(null)
  const [payAmount, setPayAmount] = useState('')
  const [payStatus, setPayStatus] = useState('')
  const [paying, setPaying] = useState(false)
  const mapRef = useRef<unknown>(null)

  const { address, isConnected } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const { sendTransactionAsync } = useSendTransaction()

  async function handleTrack(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!trackCode.trim()) return
    setTracking(true)
    setTrackError('')
    setShipment(null)

    const res = await fetch(`/api/track/${encodeURIComponent(trackCode.trim().toUpperCase())}`)
    const data = await res.json()
    setTracking(false)

    if (!res.ok || data.error) {
      setTrackError('Shipment not found in Sovereign Ledger.')
    } else {
      setShipment(data as Shipment)
    }
  }

  async function handleConcierge(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { error } = await supabase
      .from('private_deliveries')
      .insert([{
        customer_name: form.name,
        current_city: form.region,
        estimated_arrival: form.window,
        delivery_status: 'Vault Prepared',
        tracking_code: `REQ-${Date.now()}`,
      }])
    if (!error) setSent(true)
  }

  async function handlePayment() {
    if (!isConnected || !payMethod || !payAmount) return
    setPaying(true)
    setPayStatus('Initiating transaction on Polygon…')
    try {
      let hash: string
      if (payMethod === 'MATIC') {
        const tx = await sendTransactionAsync({
          to: VAULT_ADDRESS,
          value: parseEther(payAmount),
        })
        hash = tx
      } else {
        const contractAddress = payMethod === 'USDT' ? USDT_POLYGON : payMethod === 'USDC' ? USDC_POLYGON : OKBOND_ADDRESS
        const decimals = 6
        hash = await writeContractAsync({
          address: contractAddress,
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [VAULT_ADDRESS, parseUnits(payAmount, decimals)],
        })
      }
      setPayStatus(`Payment sent. TX: ${hash.slice(0, 20)}…`)
    } catch (err: unknown) {
      const e = err as { message?: string }
      setPayStatus('Transaction failed: ' + (e?.message?.slice(0, 60) ?? 'Unknown error'))
    }
    setPaying(false)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('track')
    if (t) setTrackCode(t.toUpperCase())
  }, [])

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden border-b border-[#0a0a0a]">
        <div className="absolute inset-0">
          <img src="/delivery-chauffeur.png" alt="Private Delivery" className="w-full h-full object-cover object-center" style={{ filter: 'brightness(0.22) contrast(1.15) saturate(0.6)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />
        </div>
        {([0, 1, 2] as const).map((i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#c9a054]/15 to-transparent"
            style={{ top: `${35 + i * 15}%`, width: '100%' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 8 + i * 2, delay: i * 2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        <div className="relative z-10 px-5 md:px-12 lg:px-20 max-w-[1400px] mx-auto w-full pt-28">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease }}>
            <p className="text-[9px] tracking-[0.7em] uppercase text-[#c9a054] mb-6 md:mb-8">White Glove Logistics Protocol</p>
            <h1 className="font-serif font-light text-6xl md:text-8xl lg:text-[9rem] tracking-[0.06em] text-zinc-100 leading-[0.88] mb-6 md:mb-8">
              Private<br /><span className="italic text-zinc-400">Delivery</span>
            </h1>
            <p className="text-zinc-500 font-light text-sm md:text-base leading-relaxed max-w-md mb-10">
              Every creation travels through a sovereign chain of custody.<br className="hidden md:block" />
              It is not shipped. <span className="italic text-zinc-400">It is escorted.</span>
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#concierge" className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Request Concierge</span>
              </a>
              <a href="#tracking" className="text-[9px] tracking-[0.5em] uppercase text-zinc-500 border border-[#111] px-8 py-4 hover:text-zinc-300 hover:border-[#222] transition-all duration-500">
                Track Shipment
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHITE GLOVE PROTOCOL ── */}
      <section className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-12">
          <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">The Protocol</p>
          <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.08em] text-zinc-200">
            Four Acts of<br /><span className="italic text-zinc-500">White-Glove Delivery</span>
          </h2>
        </motion.div>
        <div className="space-y-0 divide-y divide-[#0a0a0a]">
          {PROTOCOL_STEPS.map((step, i) => (
            <motion.div key={step.n} {...fv(i * 0.09)} className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-12 py-10 md:py-14 group">
              <span className="font-serif font-light text-4xl text-[#c9a054]/15 group-hover:text-[#c9a054]/30 transition-colors duration-700">{step.n}</span>
              <div>
                <h3 className="font-serif font-light text-2xl md:text-3xl tracking-[0.08em] text-zinc-200 mb-4">{step.title}</h3>
                <p className="text-zinc-600 text-sm font-light leading-relaxed max-w-sm">{step.desc}</p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={step.img} alt={step.title} className="w-full h-full object-cover object-center transition-transform duration-[1400ms] group-hover:scale-105" style={{ filter: 'brightness(0.55) contrast(1.1) saturate(0.7)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── REAL TRACKING ── */}
      <section id="tracking" className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          <motion.div {...fv()}>
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-5">Sovereign Tracking</p>
            <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.08em] text-zinc-200 mb-8">
              Track Your<br /><span className="italic text-zinc-500">Escorted Creation</span>
            </h2>
            <form onSubmit={handleTrack}>
              <div className="border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500 mb-5">
                <input
                  value={trackCode}
                  onChange={(e) => setTrackCode(e.target.value.toUpperCase())}
                  placeholder="SF-TRK-2025-00001"
                  className="w-full py-4 bg-transparent text-zinc-300 text-sm font-light tracking-[0.15em] placeholder:text-zinc-800 outline-none"
                />
              </div>
              <button type="submit" disabled={tracking} className="group relative inline-flex items-center justify-center px-8 py-3.5 border border-[#c9a054]/50 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden disabled:opacity-50">
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                  {tracking ? 'Locating…' : 'Track Shipment'}
                </span>
              </button>
            </form>

            {trackError && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border border-red-900/30 p-4 mt-6">
                <p className="text-[8px] tracking-[0.4em] uppercase text-red-800">{trackError}</p>
              </motion.div>
            )}

            <AnimatePresence>
              {shipment && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }} className="border border-[#0d0d0d] p-6 mt-8">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-[8px] tracking-[0.5em] uppercase text-[#c9a054]">Live Status</p>
                    <div className="flex items-center gap-2">
                      <motion.div className="w-1.5 h-1.5 rounded-full bg-[#c9a054]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                      <span className="text-[7px] tracking-[0.35em] uppercase text-zinc-700">{shipment.current_location}</span>
                    </div>
                  </div>

                  {shipment.chauffeur_name && (
                    <div className="mb-4 p-3 border border-[#111]">
                      <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-0.5">Assigned Operative</p>
                      <p className="text-zinc-400 text-xs font-light">{shipment.chauffeur_name}</p>
                      {shipment.vehicle && <p className="text-zinc-600 text-[9px]">{shipment.vehicle}</p>}
                    </div>
                  )}

                  {shipment.eta && (
                    <div className="mb-4">
                      <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-0.5">ETA</p>
                      <p className="text-zinc-400 text-xs font-light">{new Date(shipment.eta).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {STATUS_ORDER.map((s, i) => (
                      <div key={s} className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-500 ${i <= shipment.status_index ? 'bg-[#c9a054]' : 'bg-[#111]'}`} />
                        <span className={`text-xs font-light transition-colors duration-500 ${i === shipment.status_index ? 'text-zinc-200' : i < shipment.status_index ? 'text-zinc-600' : 'text-zinc-800'}`}>
                          {STATUS_LABELS[s]}
                        </span>
                        {i === shipment.status_index && <span className="ml-auto text-[7px] tracking-[0.35em] uppercase text-[#c9a054]">Active</span>}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mapbox Map */}
          <motion.div {...fv(0.15)}>
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-5">Live Route</p>
            <h2 className="font-serif font-light text-3xl tracking-[0.08em] text-zinc-200 mb-8">
              Sovereign<br /><span className="italic text-zinc-500">GPS Escort</span>
            </h2>
            <div className="border border-[#0d0d0d] overflow-hidden" style={{ height: '380px' }}>
              {mapboxToken ? (
                <Map
                  mapboxAccessToken={mapboxToken}
                  initialViewState={{
                    longitude: shipment?.longitude ?? 67.0011,
                    latitude: shipment?.latitude ?? 24.8607,
                    zoom: shipment ? 12 : 5,
                  }}
                  mapStyle="mapbox://styles/mapbox/dark-v11"
                  style={{ width: '100%', height: '100%' }}
                >
                  {shipment && shipment.latitude && (
                    <Marker longitude={shipment.longitude} latitude={shipment.latitude} anchor="center">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-4 h-4 rounded-full bg-[#c9a054] border-2 border-[#050505] shadow-lg"
                        style={{ boxShadow: '0 0 12px rgba(201,160,84,0.6)' }}
                      />
                    </Marker>
                  )}
                </Map>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#080808] relative">
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="absolute border-[#c9a054]/10 border" style={{ left: `${i * 12.5}%`, top: 0, bottom: 0, width: '1px' }} />
                    ))}
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="absolute border-[#c9a054]/10 border" style={{ top: `${i * 16.66}%`, left: 0, right: 0, height: '1px' }} />
                    ))}
                  </div>
                  <div className="text-center relative z-10">
                    {shipment ? (
                      <>
                        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-4 rounded-full bg-[#c9a054] mx-auto mb-4" style={{ boxShadow: '0 0 20px rgba(201,160,84,0.5)' }} />
                        <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054] mb-1">Active Location</p>
                        <p className="text-zinc-500 text-xs font-light">{shipment.current_location}</p>
                        <p className="text-zinc-700 text-[8px] mt-1">→ {shipment.destination}</p>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 rounded-full bg-[#c9a054]/30 mx-auto mb-4" />
                        <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Enter tracking ID</p>
                        <p className="text-zinc-800 text-xs mt-1">to see live location</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Climate Metrics */}
            <div className="border border-[#0d0d0d] p-6 mt-6">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-700">Climate Integrity</p>
                <motion.span className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054]" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>Stable</motion.span>
              </div>
              <div className="space-y-4">
                {CLIMATE_METRICS.map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[8px] tracking-[0.35em] uppercase text-zinc-700">{m.label}</span>
                      <span className="text-[8px] text-zinc-500 font-light">{m.value}</span>
                    </div>
                    <div className="h-px bg-[#111] relative">
                      <motion.div className="absolute top-0 left-0 h-full bg-[#c9a054]" initial={{ width: 0 }} whileInView={{ width: `${m.pct}%` }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3, ease }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DELIVERY TIERS ── */}
      <section className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-12">
          <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Sovereign Protocols</p>
          <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.08em] text-zinc-200">
            Three Tiers of<br /><span className="italic text-zinc-500">Private Delivery</span>
          </h2>
        </motion.div>
        <div className="space-y-0 divide-y divide-[#0a0a0a]">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.code}
              {...fv(i * 0.1)}
              onClick={() => setSelectedTier(tier.code)}
              className={`grid grid-cols-1 md:grid-cols-[120px_1fr_280px] gap-6 md:gap-10 py-8 md:py-10 cursor-pointer group transition-colors duration-500 ${selectedTier === tier.code ? 'bg-[#080808]' : 'hover:bg-[#080808]'}`}
            >
              <div>
                <span className={`font-serif font-light text-4xl transition-colors duration-500 ${selectedTier === tier.code ? 'text-[#c9a054]' : 'text-[#c9a054]/20 group-hover:text-[#c9a054]/40'}`}>{tier.code}</span>
              </div>
              <div>
                <h3 className="font-serif font-light text-2xl tracking-[0.08em] text-zinc-200 mb-1">{tier.name}</h3>
                <p className="text-[9px] tracking-[0.35em] uppercase text-zinc-600 mb-4">{tier.sub}</p>
                <ul className="space-y-1.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs text-zinc-600 font-light">
                      <span className="text-[#c9a054]/40 text-xs">—</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between md:text-right">
                <p className="text-sm font-light text-zinc-400">{tier.price}</p>
                {tier.featured && (
                  <span className="inline-block mt-3 md:ml-auto text-[7px] tracking-[0.4em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-3 py-1.5 self-start md:self-end">Recommended</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── REAL PAYMENT ── */}
      <section className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-10">
          <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Sovereign Payment</p>
          <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.08em] text-zinc-200">
            Crypto<br /><span className="italic text-zinc-500">Settlement</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="border border-[#0d0d0d] p-8">
            <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-6">Select Currency</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {(['MATIC', 'USDT', 'USDC', 'OKBOND'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setPayMethod(m)}
                  className={`py-3 text-[8px] tracking-[0.4em] uppercase border transition-all duration-300 ${payMethod === m ? 'border-[#c9a054] text-[#c9a054] bg-[#c9a054]/5' : 'border-[#111] text-zinc-700 hover:border-[#222] hover:text-zinc-500'}`}
                >
                  {m}
                </button>
              ))}
            </div>

            {payMethod && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="border-b border-[#111] focus-within:border-[#c9a054]/30 transition-colors mb-4">
                  <label className="block pt-3 pb-1 text-[7px] tracking-[0.4em] uppercase text-zinc-700">Amount ({payMethod})</label>
                  <input type="number" step="0.01" value={payAmount} onChange={e => setPayAmount(e.target.value)} placeholder="0.00" className="w-full pb-3 bg-transparent text-zinc-300 text-sm font-light outline-none" />
                </div>
                <div className="mb-4 p-3 border border-[#111]">
                  <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-0.5">Vault Address</p>
                  <p className="font-mono text-[9px] text-zinc-600 break-all">{VAULT_ADDRESS}</p>
                </div>

                {!isConnected ? (
                  <ConnectButton label="Connect Polygon Wallet" chainStatus="none" showBalance={false} accountStatus="address" />
                ) : (
                  <button onClick={handlePayment} disabled={paying || !payAmount} className="group relative inline-flex items-center justify-center px-8 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.4em] uppercase text-[#c9a054] overflow-hidden disabled:opacity-50 w-full">
                    <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                    <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                      {paying ? 'Processing…' : `Pay ${payAmount || '0'} ${payMethod}`}
                    </span>
                  </button>
                )}
                {payStatus && <p className="mt-4 text-[8px] tracking-[0.3em] uppercase text-[#c9a054] break-all">{payStatus}</p>}
              </motion.div>
            )}
          </div>

          <div className="border border-[#0d0d0d] p-8 flex flex-col justify-between">
            <div>
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 mb-4">OKBOND Protocol</p>
              <p className="font-serif font-light text-2xl text-zinc-200 mb-3">10% Sovereign Discount</p>
              <p className="text-zinc-600 text-sm font-light leading-relaxed mb-4">
                OKBOND holders unlock a permanent 10% discount across all Shamim Forever acquisitions.
              </p>
              <div className="mb-4 p-3 border border-[#111]">
                <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 mb-0.5">OKBOND Contract · Polygon</p>
                <p className="font-mono text-[9px] text-zinc-600 break-all">{OKBOND_ADDRESS}</p>
              </div>
            </div>
            {isConnected ? (
              <div className="flex items-center gap-2 border border-[#c9a054]/20 px-4 py-3">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-[#c9a054]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="font-mono text-xs text-zinc-500">{address?.slice(0, 20)}…</span>
              </div>
            ) : (
              <ConnectButton label="Connect to Activate Discount" chainStatus="none" showBalance={false} accountStatus="address" />
            )}
          </div>
        </div>
      </section>

      {/* ── CONCIERGE FORM ── */}
      <section id="concierge" className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[700px]">
        <motion.div {...fv()} className="mb-8">
          <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Private Request</p>
          <h2 className="font-serif font-light text-2xl md:text-3xl tracking-[0.08em] text-zinc-200">
            Request Private<br /><span className="italic text-zinc-500">Delivery</span>
          </h2>
        </motion.div>
        {sent ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="border border-[#c9a054]/20 p-10 text-center">
            <div className="w-px h-10 bg-gradient-to-b from-[#c9a054] to-transparent mx-auto mb-6" />
            <p className="text-[9px] tracking-[0.5em] uppercase text-[#c9a054] mb-4">Concierge Notified</p>
            <p className="font-serif font-light text-2xl text-zinc-300 mb-3">Your escort is being arranged.</p>
            <p className="text-zinc-700 text-xs font-light">Our sovereign team responds within 2 hours.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleConcierge} className="space-y-0">
            {[
              { key: 'name' as const, label: 'Full Name', type: 'text' },
              { key: 'region' as const, label: 'City / Region', type: 'text' },
              { key: 'window' as const, label: 'Preferred Delivery Window', type: 'text' },
            ].map((f) => (
              <div key={f.key} className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
                <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700 group-focus-within:text-[#c9a054] transition-colors">
                  {f.label}
                </label>
                <input type={f.type} required value={form[f.key]} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))} className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light outline-none" />
              </div>
            ))}
            <div className="group border-b border-[#0d0d0d] focus-within:border-[#c9a054]/30 transition-colors duration-500">
              <label className="block pt-5 pb-1 text-[7px] tracking-[0.45em] uppercase text-zinc-700">Concierge Notes</label>
              <textarea rows={3} value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} className="w-full pb-4 bg-transparent text-zinc-300 text-sm font-light outline-none resize-none" />
            </div>
            <div className="pt-8 flex gap-4 flex-wrap">
              <button type="submit" className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
                <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Request Private Delivery</span>
              </button>
              <a href="https://wa.me/923119447572?text=I%20would%20like%20to%20arrange%20a%20private%20delivery" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-4 text-[9px] tracking-[0.4em] uppercase text-zinc-600 border border-[#111] hover:text-[#c9a054] hover:border-[#c9a054]/30 transition-all duration-500">
                WhatsApp →
              </a>
            </div>
          </form>
        )}
      </section>

      {/* ── GLOBAL NODES ── */}
      <section className="border-b border-[#0a0a0a] px-5 md:px-12 lg:px-20 py-14 md:py-20 max-w-[1400px] mx-auto">
        <motion.div {...fv()} className="mb-10">
          <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-700 mb-3">Global Coverage</p>
          <h2 className="font-serif font-light text-3xl md:text-4xl tracking-[0.08em] text-zinc-200">
            Sovereign<br /><span className="italic text-zinc-500">Delivery Nodes</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#0a0a0a]">
          {NODES.map((node, i) => (
            <motion.div key={node.city} {...fv(i * 0.07)} className="bg-[#050505] px-5 md:px-8 py-7 hover:bg-[#080808] transition-colors duration-500 group">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-serif font-light text-xl md:text-2xl tracking-[0.08em] text-zinc-300 group-hover:text-zinc-100 transition-colors duration-500">{node.city}</h3>
                <motion.div className="w-1.5 h-1.5 rounded-full bg-[#c9a054] mt-2 flex-shrink-0" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} />
              </div>
              <p className="font-mono text-[8px] text-zinc-700 mb-1">{node.coords}</p>
              <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-700">{node.status}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CINEMATIC FOOTER ── */}
      <section className="relative px-5 md:px-12 lg:px-20 py-24 md:py-36 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/delivery-vault.png" alt="Delivery" className="w-full h-full object-cover object-top" style={{ filter: 'brightness(0.1) contrast(1.2) saturate(0.4)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/80" />
        </div>
        <motion.div {...fv()} className="relative z-10">
          <p className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-zinc-500 max-w-2xl mx-auto leading-snug mb-10">
            &ldquo;Luxury is not transported.<br /><span className="text-zinc-400">It is escorted.&rdquo;</span>
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#concierge" className="group relative inline-flex items-center justify-center px-10 py-4 border border-[#c9a054]/60 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] overflow-hidden">
              <span className="absolute inset-0 bg-[#c9a054] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">Contact Concierge</span>
            </a>
            <Link href="/heirloom-vault" className="text-[9px] tracking-[0.5em] uppercase text-zinc-600 border border-[#111] px-10 py-4 hover:text-zinc-300 hover:border-[#222] transition-all duration-500">
              Enter Sovereign Vault
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
