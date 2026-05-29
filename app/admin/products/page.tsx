'use client'

  import { useState, useEffect, useRef } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  import { supabase } from '@/lib/supabase'
  import type { Product, MainCategory } from '@/types'
  import { Plus, Pencil, Trash2, X, Upload, Search, Eye, EyeOff, Star } from 'lucide-react'

  interface SubCategory { id: string; name: string; main_category_id: string; slug: string }

  const EMPTY = {
    name: '', description: '', story: '',
    price_pkr: '', price_usd: '', inventory: '',
    main_category_id: '', sub_category_id: '',
    is_featured: false, is_active: true, images: [] as string[],
  }

  export default function AdminProductsPage() {
    const [products, setProducts]     = useState<Product[]>([])
    const [categories, setCategories] = useState<MainCategory[]>([])
    const [subCats, setSubCats]       = useState<SubCategory[]>([])
    const [loading, setLoading]       = useState(true)
    const [modalOpen, setModalOpen]   = useState(false)
    const [editing, setEditing]       = useState<Product | null>(null)
    const [form, setForm]             = useState({ ...EMPTY })
    const [saving, setSaving]         = useState(false)
    const [uploading, setUploading]   = useState(false)
    const [filterCat, setFilterCat]   = useState('all')
    const [filterSub, setFilterSub]   = useState('all')
    const [search, setSearch]         = useState('')
    const [saveMsg, setSaveMsg]       = useState('')
    const fileRef = useRef<HTMLInputElement>(null)

    useEffect(() => { fetchAll() }, [])

    async function fetchAll() {
      setLoading(true)
      const [{ data: prods }, { data: cats }, { data: subs }] = await Promise.all([
        supabase.from('products')
          .select('*, main_category:main_categories(id,name,slug), sub_category:sub_categories(id,name)')
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
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageStr: ev.target?.result })
          })
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
        price_pkr: Number(form.price_pkr) || 0,
        price_usd: Number(form.price_usd) || Math.round((Number(form.price_pkr) || 0) / 278),
        inventory: Number(form.inventory) || 0,
        main_category_id: form.main_category_id || null,
        sub_category_id: form.sub_category_id || null,
        is_featured: form.is_featured,
        is_active: form.is_active,
        images: form.images,
      }
      if (editing) {
        const { error } = await supabase.from('products').update(payload).eq('id', editing.id)
        if (error) { setSaveMsg('Error: ' + error.message); setSaving(false); return }
        setSaveMsg('Saved!')
      } else {
        payload.slug = form.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') + '-' + Date.now()
        const { error } = await supabase.from('products').insert([payload])
        if (error) { setSaveMsg('Error: ' + error.message); setSaving(false); return }
        setSaveMsg('Created!')
      }
      setSaving(false)
      fetchAll()
      setTimeout(() => { setModalOpen(false); setSaveMsg('') }, 900)
    }

    async function handleDelete(id: string) {
      if (!confirm('Delete this product? This cannot be undone.')) return
      await supabase.from('products').delete().eq('id', id)
      fetchAll()
    }

    async function toggleVisibility(p: Product) {
      await supabase.from('products').update({ is_active: !p.is_active }).eq('id', p.id)
      fetchAll()
    }

    async function toggleFeatured(p: Product) {
      await supabase.from('products').update({ is_featured: !p.is_featured }).eq('id', p.id)
      fetchAll()
    }

    const filteredSubs = form.main_category_id
      ? subCats.filter(s => s.main_category_id === form.main_category_id)
      : subCats

    const displayed = products.filter(p => {
      if (filterCat !== 'all' && (p as any).main_category_id !== filterCat) return false
      if (filterSub !== 'all' && (p as any).sub_category_id !== filterSub) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })

    function catLabel(p: Product) {
      const mc = (p as any).main_category?.name || ''
      const sc = (p as any).sub_category?.name || ''
      return [mc, sc].filter(Boolean).join(' · ')
    }

    const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
      <div>
        <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-2">{label}</label>
        {children}
      </div>
    )

    const inputCls = "w-full bg-transparent border border-[#1a1a1a] px-4 py-2.5 text-[10px] text-zinc-300 focus:border-[#c9a054]/40 focus:outline-none"

    return (
      <div className="min-h-screen bg-[#050505] p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-light tracking-[0.2em] uppercase text-zinc-100">Products</h1>
            <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 mt-1">
              {products.length} total · {products.filter(p => p.is_featured).length} featured
            </p>
          </div>
          <button onClick={openCreate}
            className="flex items-center gap-2 px-6 py-3 border border-[#c9a054]/40 text-[9px] tracking-[0.4em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all">
            <Plus size={12} /> New Product
          </button>
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

        {/* Product Table */}
        {loading ? (
          <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-700 py-20 text-center">Loading...</p>
        ) : displayed.length === 0 ? (
          <p className="text-zinc-700 text-center py-20 font-serif text-xl">No products found</p>
        ) : (
          <div className="border border-[#111] divide-y divide-[#111]">
            <div className="grid grid-cols-[3rem_1fr_auto_auto_auto_auto] gap-3 px-5 py-3 bg-[#080808]">
              {['IMG', 'Product', 'Category', 'PKR', 'Stock', 'Actions'].map((h, i) => (
                <p key={i} className="text-[7px] tracking-[0.4em] uppercase text-zinc-700">{h}</p>
              ))}
            </div>
            {displayed.map(product => (
              <div key={product.id}
                className="grid grid-cols-[3rem_1fr_auto_auto_auto_auto] gap-3 items-center px-5 py-3.5 hover:bg-[#080808] transition-colors group">
                <div className="w-10 h-10 bg-[#0a0a0a] overflow-hidden shrink-0">
                  {product.images?.[0]
                    ? <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-zinc-800 text-xs font-serif">SF</div>
                  }
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-zinc-100 text-xs font-light truncate max-w-[200px]">{product.name}</p>
                    {product.is_featured && <span className="text-[6px] tracking-[0.2em] text-[#c9a054] border border-[#c9a054]/30 px-1.5 py-0.5 uppercase">Featured</span>}
                    {!product.is_active && <span className="text-[6px] tracking-[0.2em] text-zinc-600 bg-[#1a1a1a] px-1.5 py-0.5 uppercase">Hidden</span>}
                  </div>
                  <p className="text-[8px] text-zinc-600 mt-0.5 truncate max-w-[200px]">{product.description?.slice(0, 60)}...</p>
                </div>
                <span className="text-[8px] tracking-[0.1em] text-zinc-600 whitespace-nowrap">{catLabel(product)}</span>
                <span className="text-zinc-300 text-xs font-light whitespace-nowrap">Rs {product.price_pkr?.toLocaleString()}</span>
                <span className={`text-xs ${product.inventory <= 5 ? 'text-red-400' : 'text-zinc-500'}`}>{product.inventory}</span>
                <div className="flex items-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => toggleFeatured(product)} title={product.is_featured ? 'Remove featured' : 'Mark featured'}
                    className={`transition-colors ${product.is_featured ? 'text-[#c9a054]' : 'text-zinc-700 hover:text-[#c9a054]'}`}>
                    <Star size={11} />
                  </button>
                  <button onClick={() => toggleVisibility(product)} title={product.is_active ? 'Hide' : 'Show'}
                    className="text-zinc-600 hover:text-zinc-300 transition-colors">
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
            ))}
          </div>
        )}

        {/* Edit / Create Modal */}
        <AnimatePresence>
          {modalOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 z-50" onClick={() => setModalOpen(false)} />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-[#0a0a0a] border-l border-[#1a1a1a] overflow-y-auto">

                {/* Modal Header */}
                <div className="p-7 border-b border-[#1a1a1a] flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-10">
                  <h2 className="font-serif text-xl font-light tracking-[0.2em] uppercase text-zinc-100">
                    {editing ? 'Edit Product' : 'New Product'}
                  </h2>
                  <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-[#c9a054] transition-colors">
                    <X size={15} />
                  </button>
                </div>

                <div className="p-7 space-y-6">

                  {/* Images */}
                  <Field label="Product Images">
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
                  </Field>

                  {/* Name */}
                  <Field label="Product Name *">
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className={inputCls} placeholder="e.g. SF Ocean Veil" />
                  </Field>

                  {/* Description */}
                  <Field label="Short Description">
                    <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                      className={inputCls + ' resize-none'} rows={3} placeholder="One line product tagline..." />
                  </Field>

                  {/* Story */}
                  <Field label="Product Story / Full Details">
                    <textarea value={form.story} onChange={e => setForm({ ...form, story: e.target.value })}
                      className={inputCls + ' resize-none'} rows={5} placeholder="Full product story, notes, ingredients, NFT details..." />
                  </Field>

                  {/* Prices */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Price (PKR)">
                      <input type="number" value={form.price_pkr}
                        onChange={e => setForm({ ...form, price_pkr: e.target.value, price_usd: String(Math.round(Number(e.target.value)/278)) })}
                        className={inputCls} placeholder="12000" />
                    </Field>
                    <Field label="Price (USD)">
                      <input type="number" value={form.price_usd} onChange={e => setForm({ ...form, price_usd: e.target.value })}
                        className={inputCls} placeholder="Auto-calculated" />
                    </Field>
                  </div>

                  {/* Inventory */}
                  <Field label="Inventory / Stock">
                    <input type="number" value={form.inventory} onChange={e => setForm({ ...form, inventory: e.target.value })}
                      className={inputCls} placeholder="50" />
                  </Field>

                  {/* Category */}
                  <Field label="Category">
                    <select value={form.main_category_id}
                      onChange={e => setForm({ ...form, main_category_id: e.target.value, sub_category_id: '' })}
                      className={inputCls}>
                      <option value="">Select category...</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </Field>

                  {/* Sub-Category */}
                  <Field label="Sub-Category (For Him / For Her / Unisex)">
                    <select value={form.sub_category_id} onChange={e => setForm({ ...form, sub_category_id: e.target.value })}
                      className={inputCls}>
                      <option value="">Select sub-category...</option>
                      {filteredSubs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </Field>

                  {/* Toggles */}
                  <div className="flex gap-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div onClick={() => setForm({ ...form, is_featured: !form.is_featured })}
                        className={`w-8 h-4 rounded-full transition-colors ${form.is_featured ? 'bg-[#c9a054]' : 'bg-[#1a1a1a]'} relative`}>
                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${form.is_featured ? 'left-4.5' : 'left-0.5'}`} />
                      </div>
                      <span className="text-[8px] tracking-[0.3em] uppercase text-zinc-400">Featured</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div onClick={() => setForm({ ...form, is_active: !form.is_active })}
                        className={`w-8 h-4 rounded-full transition-colors ${form.is_active ? 'bg-green-600' : 'bg-[#1a1a1a]'} relative`}>
                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${form.is_active ? 'left-4.5' : 'left-0.5'}`} />
                      </div>
                      <span className="text-[8px] tracking-[0.3em] uppercase text-zinc-400">Visible on site</span>
                    </label>
                  </div>

                  {/* Save */}
                  {saveMsg && (
                    <p className={`text-[9px] tracking-[0.3em] uppercase ${saveMsg.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                      {saveMsg}
                    </p>
                  )}
                  <button onClick={handleSave} disabled={saving || !form.name}
                    className="w-full py-4 bg-[#c9a054] text-black text-[9px] tracking-[0.4em] uppercase font-medium hover:bg-[#d4aa5f] transition-colors disabled:opacity-40">
                    {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    )
  }
  