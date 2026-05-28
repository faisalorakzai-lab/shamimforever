'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { Product, MainCategory } from '@/types'
import { Plus, Pencil, Trash2, X, Upload, Search, Filter } from 'lucide-react'

interface SubCategory { id: string; name: string; main_category_id: string; slug: string }

const EMPTY_PRODUCT = {
  name: '', description: '', story: '',
  price_pkr: '', price_usd: '', inventory: '',
  main_category_id: '', sub_category_id: '',
  is_featured: false, is_active: true,
  images: [] as string[],
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState(EMPTY_PRODUCT)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterSub, setFilterSub] = useState('all')
  const [search, setSearch] = useState('')
  const [saveMsg, setSaveMsg] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
    fetchSubCategories()
  }, [])

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*, main_category:main_categories(id, name, slug), sub_category:sub_categories(id, name)')
      .order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  async function fetchCategories() {
    const { data } = await supabase.from('main_categories').select('*').order('name')
    setCategories(data || [])
  }

  async function fetchSubCategories() {
    const { data } = await supabase.from('sub_categories').select('*').order('name')
    setSubCategories(data || [])
  }

  function openCreate() {
    setEditingProduct(null)
    setForm(EMPTY_PRODUCT)
    setSaveMsg('')
    setModalOpen(true)
  }

  function openEdit(product: Product) {
    setEditingProduct(product)
    setForm({
      name: product.name,
      description: product.description || '',
      story: product.story || '',
      price_pkr: String(product.price_pkr),
      price_usd: String(product.price_usd),
      inventory: String(product.inventory),
      main_category_id: (product as any).main_category_id || '',
      sub_category_id: (product as any).sub_category_id || '',
      is_featured: product.is_featured,
      is_active: product.is_active,
      images: product.images || [],
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
          body: JSON.stringify({ imageStr: ev.target?.result }),
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
    const baseSlug = form.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
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
      images: form.images,
    }

    if (editingProduct) {
      const { error } = await supabase.from('products').update(payload).eq('id', editingProduct.id)
      if (error) { setSaveMsg('❌ ' + error.message); setSaving(false); return }
      setSaveMsg('✅ Product updated successfully')
    } else {
      payload.slug = baseSlug + '-' + Date.now()
      const { error } = await supabase.from('products').insert([payload])
      if (error) { setSaveMsg('❌ ' + error.message); setSaving(false); return }
      setSaveMsg('✅ Product created successfully')
    }
    setSaving(false)
    fetchProducts()
    setTimeout(() => { setModalOpen(false); setSaveMsg('') }, 1200)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product? This cannot be undone.')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  async function toggleActive(product: Product) {
    await supabase.from('products').update({ is_active: !product.is_active }).eq('id', product.id)
    fetchProducts()
  }

  // Filtered sub-categories based on selected main category
  const filteredSubs = form.main_category_id
    ? subCategories.filter(s => s.main_category_id === form.main_category_id)
    : subCategories

  const filteredProducts = products.filter(p => {
    const catMatch = filterCategory === 'all' || (p as any).main_category_id === filterCategory
    const subMatch = filterSub === 'all' || (p as any).sub_category_id === filterSub
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase())
    return catMatch && subMatch && searchMatch
  })

  function categoryLabel(product: Product) {
    const mc = (product as any).main_category?.name || ''
    const sc = (product as any).sub_category?.name || ''
    return [mc, sc].filter(Boolean).join(' · ')
  }

  return (
    <div className="min-h-screen bg-[#050505] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl font-light tracking-[0.2em] uppercase text-zinc-100">Products</h1>
          <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 mt-1">
            {filteredProducts.length} creation{filteredProducts.length !== 1 ? 's' : ''} · Shamim Forever
          </p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3 border border-[#c9a054]/40 text-[9px] tracking-[0.4em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all">
          <Plus size={12} /> New Creation
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex items-center gap-2 border border-[#1a1a1a] px-3 py-2 flex-1 max-w-xs">
          <Search size={11} className="text-zinc-600" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            className="bg-transparent text-[10px] text-zinc-300 placeholder:text-zinc-700 focus:outline-none flex-1" />
        </div>
        <select value={filterCategory} onChange={e => { setFilterCategory(e.target.value); setFilterSub('all') }}
          className="bg-[#0a0a0a] border border-[#1a1a1a] px-3 py-2 text-[9px] tracking-[0.2em] uppercase text-zinc-400 focus:outline-none focus:border-[#c9a054]/30">
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={filterSub} onChange={e => setFilterSub(e.target.value)}
          className="bg-[#0a0a0a] border border-[#1a1a1a] px-3 py-2 text-[9px] tracking-[0.2em] uppercase text-zinc-400 focus:outline-none focus:border-[#c9a054]/30">
          <option value="all">All Sub-Categories</option>
          {(filterCategory !== 'all' ? subCategories.filter(s => s.main_category_id === filterCategory) : subCategories).map(s =>
            <option key={s.id} value={s.id}>{s.name}</option>
          )}
        </select>
      </div>

      {/* Product grid */}
      {loading ? (
        <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-700">Loading sovereign inventory...</p>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-2xl text-zinc-700 mb-4">No products found</p>
          <button onClick={openCreate} className="text-[9px] tracking-[0.4em] uppercase text-[#c9a054]">Add First Product</button>
        </div>
      ) : (
        <div className="border border-[#111] divide-y divide-[#111]">
          {/* Table header */}
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-6 py-3 bg-[#080808]">
            <div className="w-12" />
            {['Product', 'Category', 'Price PKR', 'Stock', 'Actions'].map(h => (
              <p key={h} className="text-[7px] tracking-[0.4em] uppercase text-zinc-600">{h}</p>
            ))}
          </div>
          {filteredProducts.map(product => (
            <div key={product.id} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 items-center px-6 py-4 hover:bg-[#080808] transition-colors group">
              <div className="w-12 h-12 bg-[#0a0a0a] overflow-hidden shrink-0">
                {product.images?.[0]
                  ? <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><p className="font-serif text-zinc-700 text-xs">SF</p></div>
                }
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-zinc-100 text-sm font-light truncate">{product.name}</p>
                  {product.is_featured && (
                    <span className="text-[7px] tracking-[0.2em] uppercase text-[#c9a054] border border-[#c9a054]/30 px-1.5 py-0.5">Featured</span>
                  )}
                  {!product.is_active && (
                    <span className="text-[7px] tracking-[0.2em] uppercase text-zinc-600 bg-[#1a1a1a] px-1.5 py-0.5">Hidden</span>
                  )}
                </div>
              </div>
              <span className="text-[8px] tracking-[0.15em] text-zinc-600 whitespace-nowrap">{categoryLabel(product)}</span>
              <span className="text-zinc-300 text-xs font-light whitespace-nowrap">
                Rs {product.price_pkr?.toLocaleString()}
              </span>
              <span className={`text-xs font-light ${product.inventory <= 5 ? 'text-red-500/70' : 'text-zinc-400'}`}>
                {product.inventory}
              </span>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => toggleActive(product)} title={product.is_active ? 'Hide' : 'Show'}
                  className={`text-[7px] tracking-[0.2em] uppercase transition-colors ${product.is_active ? 'text-zinc-600 hover:text-amber-500' : 'text-zinc-700 hover:text-emerald-500'}`}>
                  {product.is_active ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => openEdit(product)} className="text-zinc-500 hover:text-[#c9a054] transition-colors">
                  <Pencil size={12} />
                </button>
                <button onClick={() => handleDelete(product.id)} className="text-zinc-500 hover:text-red-500/70 transition-colors">
                  <Trash2 size={12} />
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
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-[#0a0a0a] border-l border-[#1a1a1a] overflow-y-auto">
              <div className="p-8 border-b border-[#1a1a1a] flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-10">
                <h2 className="font-serif text-xl font-light tracking-[0.2em] uppercase text-zinc-100">
                  {editingProduct ? 'Edit Creation' : 'New Creation'}
                </h2>
                <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-[#c9a054] transition-colors">
                  <X size={16} strokeWidth={1} />
                </button>
              </div>

              <div className="p-8 space-y-7">
                {/* Images */}
                <div>
                  <p className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 mb-4">Product Images</p>
                  <div className="flex flex-wrap gap-3 mb-2">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative w-20 h-20">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white flex items-center justify-center">
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
                      className="w-20 h-20 border border-[#c9a054]/30 flex flex-col items-center justify-center gap-2 hover:border-[#c9a054] transition-colors text-zinc-600 hover:text-[#c9a054]">
                      <Upload size={14} />
                      <span className="text-[8px] tracking-[0.2em]">{uploading ? '...' : 'ADD'}</span>
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-3">Product Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none placeholder:text-zinc-700"
                    placeholder="Creation name" />
                </div>

                {/* Main Category */}
                <div>
                  <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-3">Main Category</label>
                  <select value={form.main_category_id}
                    onChange={e => setForm({ ...form, main_category_id: e.target.value, sub_category_id: '' })}
                    className="w-full bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none cursor-pointer">
                    <option value="" className="bg-[#0a0a0a]">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id} className="bg-[#0a0a0a]">{c.name}</option>)}
                  </select>
                </div>

                {/* Sub Category */}
                <div>
                  <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-3">Sub Category (Gender)</label>
                  <select value={form.sub_category_id}
                    onChange={e => setForm({ ...form, sub_category_id: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none cursor-pointer">
                    <option value="" className="bg-[#0a0a0a]">All / Unspecified</option>
                    {filteredSubs.map(s => <option key={s.id} value={s.id} className="bg-[#0a0a0a]">{s.name}</option>)}
                  </select>
                </div>

                {/* Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-3">Price (PKR)</label>
                    <input type="number" value={form.price_pkr} onChange={e => setForm({ ...form, price_pkr: e.target.value })}
                      className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-3">Price (USD)</label>
                    <input type="number" value={form.price_usd} onChange={e => setForm({ ...form, price_usd: e.target.value })}
                      className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none" placeholder="0.00" />
                  </div>
                </div>

                {/* Inventory */}
                <div>
                  <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-3">Stock / Inventory</label>
                  <input type="number" value={form.inventory} onChange={e => setForm({ ...form, inventory: e.target.value })}
                    className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none" placeholder="0" />
                </div>

                {/* Description */}
                <div>
                  <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-3">Short Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none resize-none"
                    rows={3} placeholder="Brief product description..." />
                </div>

                {/* Story */}
                <div>
                  <label className="text-[7px] tracking-[0.4em] uppercase text-zinc-600 block mb-1">Story / Specs</label>
                  <p className="text-[7px] text-zinc-700 mb-3">Plain text or JSON with tagline, olfactory, scentPyramid, specs fields</p>
                  <textarea value={form.story} onChange={e => setForm({ ...form, story: e.target.value })}
                    className="w-full bg-transparent border border-[#1a1a1a] px-4 py-3 text-[10px] text-zinc-300 focus:border-[#c9a054]/30 focus:outline-none resize-none font-mono"
                    rows={6} placeholder='{"tagline": "...", "olfactory": "...", "scentPyramid": {"top":"...","heart":"...","base":"..."}, "specs": {"volume":"100ML","price":"Rs. 15,000"}}' />
                </div>

                {/* Flags */}
                <div className="flex items-center gap-8">
                  {[
                    { key: 'is_featured', label: 'Featured' },
                    { key: 'is_active', label: 'Active / Visible' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={(form as any)[key]}
                        onChange={e => setForm({ ...form, [key]: e.target.checked })}
                        className="w-4 h-4 border border-[#c9a054] bg-transparent accent-[#c9a054]" />
                      <span className="text-[8px] tracking-[0.3em] uppercase text-zinc-500">{label}</span>
                    </label>
                  ))}
                </div>

                {saveMsg && (
                  <p className={`text-[9px] tracking-[0.2em] ${saveMsg.startsWith('✅') ? 'text-emerald-400' : 'text-red-400'}`}>{saveMsg}</p>
                )}

                <motion.button onClick={handleSave} disabled={saving || !form.name} whileTap={{ scale: 0.98 }}
                  className="w-full py-4 border border-[#c9a054]/40 text-[9px] tracking-[0.5em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all duration-500 disabled:opacity-50">
                  {saving ? 'Saving...' : editingProduct ? '✓ Update Creation' : '+ Create Creation'}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
