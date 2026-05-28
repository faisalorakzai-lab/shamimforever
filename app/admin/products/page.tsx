'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { Product, MainCategory } from '@/types'
import { Plus, Pencil, Trash2, X, Upload, Search, Pin, PinOff, Eye, EyeOff } from 'lucide-react'

interface SubCategory { id: string; name: string; main_category_id: string; slug: string }

const EMPTY: Record<string, any> = {
  name: '', description: '', story: '',
  price_pkr: '', price_usd: '', inventory: '',
  main_category_id: '', sub_category_id: '',
  is_featured: false, is_active: true, is_pinned: false, sort_order: 0,
  images: [],
}

export default function AdminProductsPage() {
  const [products, setProducts]       = useState<Product[]>([])
  const [categories, setCategories]   = useState<MainCategory[]>([])
  const [subCats, setSubCats]         = useState<SubCategory[]>([])
  const [loading, setLoading]         = useState(true)
  const [modalOpen, setModalOpen]     = useState(false)
  const [editing, setEditing]         = useState<Product | null>(null)
  const [form, setForm]               = useState({ ...EMPTY })
  const [saving, setSaving]           = useState(false)
  const [uploading, setUploading]     = useState(false)
  const [filterCat, setFilterCat]     = useState('all')
  const [filterSub, setFilterSub]     = useState('all')
  const [search, setSearch]           = useState('')
  const [saveMsg, setSaveMsg]         = useState('')
  const [tab, setTab]                 = useState<'all'|'pinned'>('all')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    setLoading(true)
    const [{ data: prods }, { data: cats }, { data: subs }] = await Promise.all([
      supabase.from('products')
        .select('*, main_category:main_categories(id,name,slug), sub_category:sub_categories(id,name)')
        .order('is_pinned', { ascending: false })
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false }),
      supabase.from('main_categories').select('*').order('name'),
      supabase.from('sub_categories').select('*').order('name'),
    ])
    setProducts(prods || [])
    setCategories(cats || [])
    setSubCats(subs || [])
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...EMPTY, images: [] })
    setSaveMsg('')
    setModalOpen(true)
  }

  function openEdit(p: Product) {
    setEditing(p)
    setForm({
      name: p.name,
      description: p.description || '',
      story: p.story || '',
      price_pkr: String(p.price_pkr),
      price_usd: String(p.price_usd),
      inventory: String(p.inventory),
      main_category_id: (p as any).main_category_id || '',
      sub_category_id: (p as any).sub_category_id || '',
      is_featured: p.is_featured,
      is_active: p.is_active,
      is_pinned: (p as any).is_pinned || false,
      sort_order: (p as any).sort_order || 0,
      images: p.images || [],
    })
    setSaveMsg('')
    setModalOpen(true)
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const reader = new FileReader()
    reader.onload = async (ev) => {
      try {
        const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageStr: ev.target?.result }) })
        const data = await res.json()
        if (data.url) setForm(f => ({ ...f, images: [...f.images, data.url] }))
      } catch {}
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  async function handleSave() {
    if (!form.name) return
    setSaving(true)
    setSaveMsg('')
    const payload: any = {
      name: form.name,
      description: form.description,
      story: form.story,
      price_pkr: Number(form.price_pkr),
      price_usd: Number(form.price_usd),
      inventory: Number(form.inventory),
      main_category_id: form.main_category_id || null,
      sub_category_id: form.sub_category_id || null,
      is_featured: form.is_featured,
      is_active: form.is_active,
      is_pinned: form.is_pinned,
      sort_order: Number(form.sort_order) || 0,
      images: form.images,
    }
    if (editing) {
      const { error } = await supabase.from('products').update(payload).eq('id', editing.id)
      if (error) { setSaveMsg('❌ ' + error.message); setSaving(false); return }
      setSaveMsg('✅ Updated!')
    } else {
      payload.slug = form.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') + '-' + Date.now()
      const { error } = await supabase.from('products').insert([payload])
      if (error) { setSaveMsg('❌ ' + error.message); setSaving(false); return }
      setSaveMsg('✅ Created!')
    }
    setSaving(false)
    fetchAll()
    setTimeout(() => { setModalOpen(false); setSaveMsg('') }, 1000)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product? Cannot be undone.')) return
    await supabase.from('products').delete().eq('id', id)
    fetchAll()
  }

  async function quickUpdate(id: string, patch: Record<string, any>) {
    await supabase.from('products').update(patch).eq('id', id)
    fetchAll()
  }

  // Pin product to top of category (sets is_pinned=true, sort_order=0 → 14)
  async function pinToTop(p: Product, position: number) {
    await supabase.from('products').update({ is_pinned: true, sort_order: position }).eq('id', p.id)
    fetchAll()
  }

  const filteredSubs = form.main_category_id
    ? subCats.filter(s => s.main_category_id === form.main_category_id)
    : subCats

  const displayed = products.filter(p => {
    if (tab === 'pinned' && !(p as any).is_pinned) return false
    if (filterCat !== 'all' && (p as any).main_category_id !== filterCat) return false
    if (filterSub !== 'all' && (p as any).sub_category_id !== filterSub) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const pinnedCount = products.filter(p => (p as any).is_pinned).length

  function catLabel(p: Product) {
    const mc = (p as any).main_category?.name || ''
    const sc = (p as any).sub_category?.name || ''
    return [mc, sc].filter(Boolean).join(' · ')
  }

  return (
    <div className="min-h-screen bg-[#050505] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light tracking-[0.2em] uppercase text-zinc-100">Products</h1>
          <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 mt-1">
            {products.length} total · {pinnedCount} pinned to top
          </p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3 border border-[#c9a054]/40 text-[9px] tracking-[0.4em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all">
          <Plus size={12} /> New Creation
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-[#111]">
        {(['all', 'pinned'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 text-[8px] tracking-[0.4em] uppercase transition-colors ${tab === t ? 'text-[#c9a054] border-b border-[#c9a054]' : 'text-zinc-600 hover:text-zinc-400'}`}>
            {t === 'all' ? `All (${products.length})` : `Pinned to Top (${pinnedCount})`}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 border border-[#1a1a1a] px-3 py-2 flex-1 max-w-xs">
          <Search size={11} className="text-zinc-600" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name..."
            className="bg-transparent text-[10px] text-zinc-300 placeholder:text-zinc-700 focus:outline-none flex-1" />
        </div>
        <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setFilterSub('all') }}
          className="bg-[#0a0a0a] border border-[#1a1a1a] px-3 py-2 text-[9px] tracking-[0.2em] uppercase text-zinc-400 focus:outline-none">
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={filterSub} onChange={e => setFilterSub(e.target.value)}
          className="bg-[#0a0a0a] border border-[#1a1a1a] px-3 py-2 text-[9px] tracking-[0.2em] uppercase text-zinc-400 focus:outline-none">
          <option value="all">All Sub-Categories</option>
          {(filterCat !== 'all' ? subCats.filter(s => s.main_category_id === filterCat) : subCats).map(s =>
            <option key={s.id} value={s.id}>{s.name}</option>
          )}
        </select>
      </div>

      {/* Pin Guide Banner */}
      {tab === 'all' && (
        <div className="mb-5 p-4 border border-[#c9a054]/20 bg-[#c9a054]/5">
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#c9a054]/70">
            📌 Pinning Guide — Hover a product row and click the pin icon (📌) to pin it to the top of its category page. Each category can have up to 15 pinned products.
          </p>
        </div>
      )}

      {/* Product Table */}
      {loading ? (
        <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-700 py-20 text-center">Loading sovereign inventory...</p>
      ) : displayed.length === 0 ? (
        <p className="text-zinc-700 text-center py-20 font-serif text-xl">No products found</p>
      ) : (
        <div className="border border-[#111] divide-y divide-[#111]">
          <div className="grid grid-cols-[3rem_2rem_1fr_auto_auto_auto_auto] gap-3 px-5 py-3 bg-[#080808]">
            {['', 'Pin', 'Product', 'Category', 'PKR', 'Stock', 'Actions'].map((h, i) => (
              <p key={i} className="text-[7px] tracking-[0.4em] uppercase text-zinc-700">{h}</p>
            ))}
          </div>
          {displayed.map(product => {
            const isPinned = !!(product as any).is_pinned
            const sortPos = (product as any).sort_order ?? 99
            return (
              <div key={product.id}
                className={`grid grid-cols-[3rem_2rem_1fr_auto_auto_auto_auto] gap-3 items-center px-5 py-3.5 transition-colors group ${isPinned ? 'bg-[#c9a054]/5 hover:bg-[#c9a054]/8' : 'hover:bg-[#080808]'}`}>
                {/* Thumbnail */}
                <div className="w-10 h-10 bg-[#0a0a0a] overflow-hidden shrink-0">
                  {product.images?.[0]
                    ? <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-zinc-800 text-xs font-serif">SF</div>
                  }
                </div>
                {/* Pin indicator */}
                <div className="flex items-center justify-center">
                  {isPinned
                    ? <span title={`Pinned at position ${sortPos + 1}`} className="text-[#c9a054] text-[10px]">📌</span>
                    : <span className="text-zinc-800 text-[10px] opacity-0 group-hover:opacity-100">·</span>
                  }
                </div>
                {/* Name + badges */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-zinc-100 text-xs font-light truncate max-w-[180px]">{product.name}</p>
                    {product.is_featured && <span className="text-[6px] tracking-[0.2em] text-[#c9a054] border border-[#c9a054]/30 px-1.5 py-0.5 uppercase">Featured</span>}
                    {!product.is_active && <span className="text-[6px] tracking-[0.2em] text-zinc-600 bg-[#1a1a1a] px-1.5 py-0.5 uppercase">Hidden</span>}
                    {isPinned && <span className="text-[6px] tracking-[0.2em] text-amber-400 border border-amber-400/30 px-1.5 py-0.5 uppercase">Top {sortPos + 1}</span>}
                  </div>
                </div>
                <span className="text-[8px] tracking-[0.1em] text-zinc-600 whitespace-nowrap">{catLabel(product)}</span>
                <span className="text-zinc-300 text-xs font-light">{product.price_pkr?.toLocaleString()}</span>
                <span className={`text-xs ${product.inventory <= 5 ? 'text-red-400' : 'text-zinc-500'}`}>{product.inventory}</span>
                {/* Actions */}
                <div className="flex items-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isPinned ? (
                    <button onClick={() => quickUpdate(product.id, { is_pinned: false, sort_order: 99 })}
                      title="Unpin from top" className="text-amber-400 hover:text-zinc-500 transition-colors">
                      <PinOff size={11} />
                    </button>
                  ) : (
                    <button onClick={() => {
                      const catProds = products.filter(p => (p as any).main_category_id === (product as any).main_category_id && (p as any).is_pinned)
                      pinToTop(product, catProds.length)
                    }}
                      title="Pin to top of category" className="text-zinc-600 hover:text-[#c9a054] transition-colors">
                      <Pin size={11} />
                    </button>
                  )}
                  <button onClick={() => quickUpdate(product.id, { is_active: !product.is_active })}
                    title={product.is_active ? 'Hide' : 'Show'} className="text-zinc-600 hover:text-zinc-300 transition-colors">
                    {product.is_active ? <EyeOff size={11} /> : <Eye size={11} />}
                  </button>
                  <button onClick={() => openEdit(product)} className="text-zinc-600 hover:text-[#c9a054] transition-colors">
                    <Pencil size={11} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-zinc-600 hover:text-red-500/70 transition-colors">
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50" onClick={() => setModalOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-[#0a0a0a] border-l border-[#1a1a1a] overflow-y-auto">
              <div className="p-7 border-b border-[#1a1a1a] flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-10">
                <h2 className="font-serif text-xl font-light tracking-[0.2em] uppercase text-zinc-100">
                  {editing ? 'Edit Creation' : 'New Creation'}
                </h2>
                <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-[#c9a054] transition-colors"><X size={15} /></button>
              </div>

              <div className="p-7 space-y-6">
                {/* Images */}
                <div>
                  <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-3">Images</p>
                  <div className="flex flex-wrap gap-3">
                    {form.images.map((img: string, i: number) => (
                      <div key={i} className="relative w-16 h-16">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => setForm((f: any) => ({ ...f, images: f.images.filter((_: any, j: number) => j !== i) }))}
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white flex items-center justify-center">
                          <X size={8} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => fileRef.current?.click()} disabled={uploading}
                      className="w-16 h-16 border border-[#c9a054]/30 flex flex-col items-center justify-center gap-1 hover:border-[#c9a054] transition-colors text-zinc-600 hover:text-[#c9a054]">
                      <Upload size={12} />
                      <span className="text-[7px] tracking-[0.2em]">{uploading ? '...' : 'ADD'}</span>
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-2">Product Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border border-[#1a1a1a] px-4 py-2.5 text-[10px] text-zinc-300 focus:border-[#c9a054]/40 focus:outline-none placeholder:text-zinc-700" placeholder="Product name" />
                </div>

                {/* Main Category */}
                <div>
                  <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-2">Main Category</label>
                  <select value={form.main_category_id} onChange={e => setForm({ ...form, main_category_id: e.target.value, sub_category_id: '' })}
                    className="w-full bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-2.5 text-[10px] text-zinc-300 focus:border-[#c9a054]/40 focus:outline-none">
                    <option value="" className="bg-[#0a0a0a]">Select category</option>
                    {categories.map(c => <option key={c.id} value={c.id} className="bg-[#0a0a0a]">{c.name}</option>)}
                  </select>
                </div>

                {/* Sub Category */}
                <div>
                  <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-2">Sub-Category (Gender)</label>
                  <select value={form.sub_category_id} onChange={e => setForm({ ...form, sub_category_id: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-2.5 text-[10px] text-zinc-300 focus:border-[#c9a054]/40 focus:outline-none">
                    <option value="" className="bg-[#0a0a0a]">All / Unspecified</option>
                    {filteredSubs.map(s => <option key={s.id} value={s.id} className="bg-[#0a0a0a]">{s.name}</option>)}
                  </select>
                </div>

                {/* Price */}
                <div className="grid grid-cols-2 gap-4">
                  {[['price_pkr','Price (PKR)','0'],['price_usd','Price (USD)','0.00']].map(([k,l,ph]) => (
                    <div key={k}>
                      <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-2">{l}</label>
                      <input type="number" value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}
                        className="w-full bg-transparent border border-[#1a1a1a] px-4 py-2.5 text-[10px] text-zinc-300 focus:border-[#c9a054]/40 focus:outline-none" placeholder={ph} />
                    </div>
                  ))}
                </div>

                {/* Inventory + Sort Order */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-2">Inventory (Stock)</label>
                    <input type="number" value={form.inventory} onChange={e => setForm({ ...form, inventory: e.target.value })}
                      className="w-full bg-transparent border border-[#1a1a1a] px-4 py-2.5 text-[10px] text-zinc-300 focus:border-[#c9a054]/40 focus:outline-none" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-2">Sort Order (0 = first)</label>
                    <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: e.target.value })}
                      className="w-full bg-transparent border border-[#1a1a1a] px-4 py-2.5 text-[10px] text-zinc-300 focus:border-[#c9a054]/40 focus:outline-none" placeholder="0–14" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-2">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-transparent border border-[#1a1a1a] px-4 py-2.5 text-[10px] text-zinc-300 focus:border-[#c9a054]/40 focus:outline-none resize-none"
                    rows={3} placeholder="Product description..." />
                </div>

                {/* Story */}
                <div>
                  <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-1">Story / Specs (JSON or plain text)</label>
                  <textarea value={form.story} onChange={e => setForm({ ...form, story: e.target.value })}
                    className="w-full bg-transparent border border-[#1a1a1a] px-4 py-2.5 text-[10px] text-zinc-300 focus:border-[#c9a054]/40 focus:outline-none resize-none font-mono"
                    rows={5} placeholder='{"tagline":"...","scentPyramid":{"top":"...","heart":"...","base":"..."},"specs":{}}' />
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-6">
                  {[
                    ['is_featured', 'Featured'],
                    ['is_active', 'Active / Visible'],
                    ['is_pinned', '📌 Pin to Top of Category'],
                  ].map(([k, l]) => (
                    <label key={k} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="checkbox" checked={!!form[k]} onChange={e => setForm({ ...form, [k]: e.target.checked })}
                        className="w-3.5 h-3.5 border border-[#c9a054] bg-transparent accent-[#c9a054]" />
                      <span className="text-[8px] tracking-[0.25em] uppercase text-zinc-500">{l}</span>
                    </label>
                  ))}
                </div>

                {/* Pin tip */}
                {form.is_pinned && (
                  <p className="text-[7px] tracking-[0.2em] text-amber-400/70 border border-amber-400/20 p-3">
                    📌 This product will appear at position {Number(form.sort_order) + 1} in its category. Set Sort Order 0–14 to control which of the 15 top slots it occupies.
                  </p>
                )}

                {saveMsg && <p className={`text-[9px] tracking-[0.2em] ${saveMsg.startsWith('✅') ? 'text-emerald-400' : 'text-red-400'}`}>{saveMsg}</p>}

                <motion.button onClick={handleSave} disabled={saving || !form.name} whileTap={{ scale: 0.98 }}
                  className="w-full py-4 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all disabled:opacity-50">
                  {saving ? 'Saving...' : editing ? '✓ Update Creation' : '+ Create Creation'}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
