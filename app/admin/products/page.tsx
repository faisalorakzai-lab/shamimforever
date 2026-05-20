'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { Product, Collection } from '@/types'
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react'

const EMPTY_PRODUCT = {
  name: '',
  description: '',
  story: '',
  price_pkr: '',
  price_usd: '',
  inventory: '',
  collection_id: '',
  is_featured: false,
  is_active: true,
  images: [] as string[],
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState(EMPTY_PRODUCT)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchProducts()
    fetchCollections()
  }, [])

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*, collection:collections(name)')
      .order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  async function fetchCollections() {
    const { data } = await supabase.from('collections').select('*')
    setCollections(data || [])
  }

  function openCreate() {
    setEditingProduct(null)
    setForm(EMPTY_PRODUCT)
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
      collection_id: product.collection_id || '',
      is_featured: product.is_featured,
      is_active: product.is_active,
      images: product.images || [],
    })
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
        if (data.url) {
          setForm(f => ({ ...f, images: [...f.images, data.url] }))
        }
      } catch (err) {
        console.error(err)
      }
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  async function handleSave() {
    setSaving(true)
    const payload = {
      name: form.name,
      slug: form.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
      description: form.description,
      story: form.story,
      price_pkr: Number(form.price_pkr),
      price_usd: Number(form.price_usd),
      inventory: Number(form.inventory),
      collection_id: form.collection_id || null,
      is_featured: form.is_featured,
      is_active: form.is_active,
      images: form.images,
    }

    if (editingProduct) {
      await supabase.from('products').update(payload).eq('id', editingProduct.id)
    } else {
      await supabase.from('products').insert([payload])
    }

    await fetchProducts()
    setModalOpen(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this creation permanently?')) return
    await supabase.from('products').delete().eq('id', id)
    setProducts(p => p.filter(x => x.id !== id))
  }

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-[#1a1a1a] flex items-end justify-between">
        <div>
          <p className="luxury-meta mb-3">Sovereign Catalog</p>
          <h1 className="font-serif text-4xl font-light tracking-[0.2em] uppercase text-zinc-100">
            Products
          </h1>
        </div>
        <button onClick={openCreate} className="luxury-btn text-[9px] flex items-center gap-3">
          <Plus size={12} />
          Add Creation
        </button>
      </div>

      {/* Products Table */}
      <div className="border border-[#1a1a1a] bg-[#050505]">
        <div className="grid grid-cols-[1fr,auto,auto,auto,auto] text-[9px] tracking-[0.3em] uppercase text-zinc-600 px-6 py-4 border-b border-[#1a1a1a] gap-4">
          <span>Creation</span>
          <span>Collection</span>
          <span>Price (PKR)</span>
          <span>Stock</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <p className="luxury-meta">Loading Sovereign Vault...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-serif text-2xl font-light text-zinc-700 mb-4">No creations yet</p>
            <button onClick={openCreate} className="luxury-btn text-[9px]">Add First Product</button>
          </div>
        ) : (
          <div className="divide-y divide-[#1a1a1a]">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-[1fr,auto,auto,auto,auto] px-6 py-5 gap-4 items-center hover:bg-[#0a0a0a] transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#111111] overflow-hidden flex-shrink-0">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#c9a054]/30 text-xs">SF</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-zinc-200 text-xs font-light">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {product.is_featured && (
                        <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a054] bg-[#c9a054]/10 px-1.5 py-0.5">Featured</span>
                      )}
                      {!product.is_active && (
                        <span className="text-[8px] tracking-[0.2em] uppercase text-zinc-600 bg-[#1a1a1a] px-1.5 py-0.5">Hidden</span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="luxury-meta text-zinc-600">
                  {(product as any).collection?.name || '—'}
                </span>
                <span className="text-zinc-300 text-xs font-light">
                  {product.price_pkr?.toLocaleString()}
                </span>
                <span className={`text-xs font-light ${
                  product.inventory <= 5 ? 'text-red-500/70' : 'text-zinc-400'
                }`}>
                  {product.inventory}
                </span>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(product)}
                    className="text-zinc-500 hover:text-[#c9a054] transition-colors"
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-zinc-500 hover:text-red-500/70 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-[#0a0a0a] border-l border-[#1a1a1a] overflow-y-auto"
            >
              <div className="p-8 border-b border-[#1a1a1a] flex items-center justify-between">
                <h2 className="font-serif text-xl font-light tracking-[0.2em] uppercase text-zinc-100">
                  {editingProduct ? 'Edit Creation' : 'New Creation'}
                </h2>
                <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-[#c9a054] transition-colors">
                  <X size={16} strokeWidth={1} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Image Upload */}
                <div>
                  <p className="luxury-meta mb-4">Images</p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative w-20 h-20">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white flex items-center justify-center"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="w-20 h-20 border border-[#c9a054]/30 flex flex-col items-center justify-center gap-2 hover:border-[#c9a054] transition-colors text-zinc-600 hover:text-[#c9a054]"
                    >
                      <Upload size={14} />
                      <span className="text-[8px] tracking-[0.2em]">{uploading ? '...' : 'ADD'}</span>
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                  </div>
                </div>

                <div>
                  <label className="luxury-meta block mb-3">Product Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="luxury-input"
                    placeholder="Creation name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="luxury-meta block mb-3">Price (PKR)</label>
                    <input
                      type="number"
                      value={form.price_pkr}
                      onChange={(e) => setForm({ ...form, price_pkr: e.target.value })}
                      className="luxury-input"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="luxury-meta block mb-3">Price (USD)</label>
                    <input
                      type="number"
                      value={form.price_usd}
                      onChange={(e) => setForm({ ...form, price_usd: e.target.value })}
                      className="luxury-input"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="luxury-meta block mb-3">Inventory</label>
                  <input
                    type="number"
                    value={form.inventory}
                    onChange={(e) => setForm({ ...form, inventory: e.target.value })}
                    className="luxury-input"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="luxury-meta block mb-3">Collection</label>
                  <select
                    value={form.collection_id}
                    onChange={(e) => setForm({ ...form, collection_id: e.target.value })}
                    className="luxury-input bg-transparent cursor-pointer"
                  >
                    <option value="" className="bg-[#0a0a0a]">No Collection</option>
                    {collections.map(c => (
                      <option key={c.id} value={c.id} className="bg-[#0a0a0a]">{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="luxury-meta block mb-3">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="luxury-input resize-none"
                    rows={3}
                    placeholder="Brief description..."
                  />
                </div>

                <div>
                  <label className="luxury-meta block mb-3">Story</label>
                  <textarea
                    value={form.story}
                    onChange={(e) => setForm({ ...form, story: e.target.value })}
                    className="luxury-input resize-none"
                    rows={4}
                    placeholder="The creation's story..."
                  />
                </div>

                <div className="flex items-center gap-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_featured}
                      onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                      className="w-4 h-4 border border-[#c9a054] bg-transparent accent-[#c9a054]"
                    />
                    <span className="luxury-meta">Featured</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      className="w-4 h-4 border border-[#c9a054] bg-transparent accent-[#c9a054]"
                    />
                    <span className="luxury-meta">Active</span>
                  </label>
                </div>

                <motion.button
                  onClick={handleSave}
                  disabled={saving || !form.name}
                  whileTap={{ scale: 0.98 }}
                  className="luxury-btn w-full text-[10px] py-4 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingProduct ? 'Update Creation' : 'Create Creation'}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
