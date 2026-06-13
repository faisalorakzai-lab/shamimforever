'use client'

  import { useState, useEffect, useRef, useCallback } from 'react'
  import { supabase } from '@/lib/supabase'
  import { Search, Upload, CheckCircle, XCircle, RefreshCw, ImageIcon, Filter } from 'lucide-react'

  interface Product {
    id: string
    slug: string
    name: string
    images: string[] | null
    main_category: { name: string } | null
    sub_category: { name: string } | null
  }

  export default function AdminImageManagerPage() {
    const [products, setProducts]     = useState<Product[]>([])
    const [filtered, setFiltered]     = useState<Product[]>([])
    const [loading, setLoading]       = useState(true)
    const [search, setSearch]         = useState('')
    const [catFilter, setCatFilter]   = useState('all')
    const [categories, setCategories] = useState<string[]>([])
    const [uploading, setUploading]   = useState<string | null>(null)
    const [statuses, setStatuses]     = useState<Record<string, 'success' | 'error'>>({})
    const [rebuilding, setRebuilding] = useState(false)
    const [rebuildMsg, setRebuildMsg] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const activeSlug   = useRef<string | null>(null)

    useEffect(() => { fetchProducts() }, [])

    useEffect(() => {
      let list = products
      if (search.trim()) {
        const q = search.toLowerCase()
        list = list.filter(p => p.name.toLowerCase().includes(q) || p.slug.includes(q))
      }
      if (catFilter !== 'all') {
        list = list.filter(p => p.main_category?.name === catFilter)
      }
      setFiltered(list)
    }, [products, search, catFilter])

    async function fetchProducts() {
      setLoading(true)
      const { data } = await supabase
        .from('products')
        .select('id, slug, name, images, main_category:main_categories(name), sub_category:sub_categories(name)')
        .eq('is_active', true)
        .order('name')
      if (data) {
        setProducts(data as unknown as Product[])
        const cats = [...new Set(data.map((p: Product) => p.main_category?.name).filter(Boolean) as string[])]
        setCategories(cats.sort())
      }
      setLoading(false)
    }

    function openFilePicker(slug: string) {
      activeSlug.current = slug
      fileInputRef.current?.click()
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0]
      const slug = activeSlug.current
      if (!file || !slug) return
      e.target.value = ''

      setUploading(slug)
      try {
        const base64 = await toBase64(file)
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageStr: base64 }),
        })
        const json = await res.json()
        if (!json.url) throw new Error(json.error || 'Upload failed')

        // Save URL to product DB
        const product = products.find(p => p.slug === slug)
        if (!product) throw new Error('Product not found')
        const newImages = [json.url, ...(product.images?.filter(i => i !== product.images?.[0]) ?? [])]
        const { error } = await supabase
          .from('products')
          .update({ images: newImages })
          .eq('id', product.id)
        if (error) throw error

        // Update local state
        setProducts(prev => prev.map(p =>
          p.slug === slug ? { ...p, images: newImages } : p
        ))
        setStatuses(prev => ({ ...prev, [slug]: 'success' }))
        setTimeout(() => setStatuses(prev => { const n = { ...prev }; delete n[slug]; return n }), 3000)
      } catch (err: any) {
        console.error(err)
        setStatuses(prev => ({ ...prev, [slug]: 'error' }))
        setTimeout(() => setStatuses(prev => { const n = { ...prev }; delete n[slug]; return n }), 4000)
      } finally {
        setUploading(null)
      }
    }

    async function triggerRebuild() {
      setRebuilding(true)
      setRebuildMsg('')
      try {
        const res = await fetch('/api/admin/trigger-rebuild', { method: 'POST' })
        const json = await res.json()
        setRebuildMsg(json.success ? '✅ Rebuild started! ~3-5 min mein live ho ga.' : '❌ ' + json.error)
      } catch {
        setRebuildMsg('❌ Rebuild failed')
      } finally {
        setRebuilding(false)
      }
    }

    function toBase64(file: File): Promise<string> {
      return new Promise((res, rej) => {
        const r = new FileReader()
        r.onload = () => res(r.result as string)
        r.onerror = rej
        r.readAsDataURL(file)
      })
    }

    return (
      <div className="min-h-screen bg-black text-white p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-amber-400">Image Manager</h1>
            <p className="text-zinc-400 text-sm mt-1">
              {products.length} products — kisi bhi product ki image change karein
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchProducts}
              className="p-2 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition"
              title="Refresh"
            >
              <RefreshCw size={16} className="text-zinc-400" />
            </button>
            <button
              onClick={triggerRebuild}
              disabled={rebuilding}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black font-semibold px-4 py-2 rounded-lg transition text-sm"
            >
              {rebuilding ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              {rebuilding ? 'Rebuilding...' : 'Live Site Rebuild'}
            </button>
          </div>
        </div>

        {rebuildMsg && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${rebuildMsg.startsWith('✅') ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
            {rebuildMsg}
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Product name ya slug..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <select
              value={catFilter}
              onChange={e => setCatFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-900 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map(product => {
              const img = product.images?.[0]
              const isUploading = uploading === product.slug
              const status = statuses[product.slug]
              return (
                <div
                  key={product.id}
                  className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-all duration-200"
                >
                  {/* Image */}
                  <div className="aspect-square relative bg-zinc-800">
                    {img ? (
                      <img
                        src={img}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={32} className="text-zinc-600" />
                      </div>
                    )}

                    {/* Status overlay */}
                    {status && (
                      <div className={`absolute inset-0 flex items-center justify-center ${status === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {status === 'success'
                          ? <CheckCircle size={40} className="text-green-400" />
                          : <XCircle size={40} className="text-red-400" />}
                      </div>
                    )}

                    {/* Upload overlay on hover */}
                    <div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 cursor-pointer"
                      onClick={() => openFilePicker(product.slug)}
                    >
                      {isUploading ? (
                        <RefreshCw size={28} className="text-amber-400 animate-spin" />
                      ) : (
                        <>
                          <Upload size={28} className="text-amber-400" />
                          <span className="text-xs text-white font-medium">Upload</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-2">
                    <p className="text-xs text-white font-medium truncate leading-tight">{product.name}</p>
                    <p className="text-xs text-zinc-500 truncate mt-0.5">{product.main_category?.name}</p>
                  </div>

                  {/* Upload button */}
                  <button
                    onClick={() => openFilePicker(product.slug)}
                    disabled={isUploading}
                    className="w-full text-xs py-1.5 bg-zinc-800 hover:bg-amber-500/20 hover:text-amber-400 text-zinc-400 transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <><RefreshCw size={12} className="animate-spin" /> Uploading...</>
                    ) : (
                      <><Upload size={12} /> New Image</>
                    )}
                  </button>
                </div>
              )
            })}

            {filtered.length === 0 && (
              <div className="col-span-full text-center py-20 text-zinc-500">
                Koi product nahi mila "{search}"
              </div>
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Footer info */}
        <p className="mt-6 text-xs text-zinc-600 text-center">
          Image upload ke baad "Live Site Rebuild" zaroor dabaein — warna changes 3-5 min mein automatically live ho jaenge
        </p>
      </div>
    )
  }
  