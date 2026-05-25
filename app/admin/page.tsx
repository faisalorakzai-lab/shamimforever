'use client'
import { useState, useEffect, useCallback } from 'react'

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'faisalorakzaiofficial@gmail.com'

interface Asset {
  id: string
  serial_number: string
  wallet_address: string | null
  nft_status: string
  rarity_tier: string
  tx_hash: string | null
  token_id: number | null
  physical_status: string
  ownership_cycle: number
  created_at: string
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'assets' | 'create'>('assets')
  const [form, setForm] = useState({
    serial: '', rarity: 'ELITE', product_name: '', category: 'Sovereign Luxury Assets'
  })
  const [message, setMessage] = useState('')

  const fetchAssets = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/assets')
      const data = await r.json()
      setAssets(data.assets || [])
    } catch { setMessage('Failed to load assets') }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authed) fetchAssets()
  }, [authed, fetchAssets])

  const handleLogin = () => {
    if (password === 'faisalorakzaiofficial@gmail.com' || password === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setAuthed(true)
    } else {
      setMessage('Incorrect password')
    }
  }

  const handleCreate = async () => {
    if (!form.serial) return setMessage('Serial number required')
    setLoading(true)
    try {
      const r = await fetch('/api/admin/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, secret: 'faisalorakzaiofficial@gmail.com' }),
      })
      const data = await r.json()
      if (data.success) {
        setMessage('✅ Asset created: ' + form.serial)
        setForm({ serial: '', rarity: 'ELITE', product_name: '', category: 'Sovereign Luxury Assets' })
        fetchAssets()
        setTab('assets')
      } else {
        setMessage('❌ ' + (data.error || 'Failed'))
      }
    } catch { setMessage('Network error') }
    setLoading(false)
  }

  const statusColor = (s: string) => {
    if (s === 'minted') return '#2d6a2d'
    if (s === 'minting') return '#6a4e2d'
    if (s === 'pending') return '#3a3a3a'
    return '#2a2a2a'
  }

  if (!authed) {
    return (
      <main style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif' }}>
        <div style={{ background: '#111', border: '1px solid #c9a054', borderRadius: 12, padding: 48, width: 360 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ color: '#c9a054', fontSize: 13, letterSpacing: 4, marginBottom: 8 }}>SHAMIM FOREVER</div>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 600 }}>Admin Vault</div>
            <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>Sovereign Asset Management</div>
          </div>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '12px 16px', borderRadius: 8, fontSize: 14, marginBottom: 12, boxSizing: 'border-box' }}
          />
          <button onClick={handleLogin} style={{ width: '100%', background: '#c9a054', color: '#000', border: 'none', borderRadius: 8, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer', letterSpacing: 2 }}>
            ENTER
          </button>
          {message && <div style={{ color: '#ff6b6b', marginTop: 12, textAlign: 'center', fontSize: 13 }}>{message}</div>}
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: '#050505', fontFamily: 'Georgia, serif', color: '#fff' }}>
      {/* Header */}
      <div style={{ background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ color: '#c9a054', fontSize: 12, letterSpacing: 4 }}>SHAMIM FOREVER</span>
          <span style={{ color: '#fff', marginLeft: 16, fontSize: 18 }}>Admin Panel</span>
        </div>
        <div style={{ color: '#555', fontSize: 12 }}>
          {assets.length} Sovereign Assets · Polygon Mainnet
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {(['assets', 'create'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? '#c9a054' : '#111',
              color: tab === t ? '#000' : '#888',
              border: '1px solid ' + (tab === t ? '#c9a054' : '#222'),
              borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontSize: 13, letterSpacing: 1, fontWeight: tab === t ? 700 : 400
            }}>
              {t === 'assets' ? '📦 Sovereign Assets' : '➕ Create Asset'}
            </button>
          ))}
        </div>

        {message && (
          <div style={{ background: message.includes('✅') ? '#1a2e1a' : '#2e1a1a', border: '1px solid ' + (message.includes('✅') ? '#2d6a2d' : '#6a2d2d'), borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13 }}>
            {message}
          </div>
        )}

        {tab === 'create' && (
          <div style={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 12, padding: 32, maxWidth: 500 }}>
            <h2 style={{ color: '#c9a054', fontSize: 16, letterSpacing: 2, marginBottom: 24 }}>CREATE SOVEREIGN ASSET</h2>
            {[
              { label: 'Serial Number *', key: 'serial', placeholder: 'SF-RO-2026-00001' },
              { label: 'Product Name', key: 'product_name', placeholder: 'Shamim Rose Parfum' },
              { label: 'Category', key: 'category', placeholder: 'Fragrance' },
            ].map(({ label, key, placeholder }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', color: '#888', fontSize: 11, letterSpacing: 1, marginBottom: 6 }}>{label}</label>
                <input
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '10px 14px', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', color: '#888', fontSize: 11, letterSpacing: 1, marginBottom: 6 }}>RARITY TIER</label>
              <select value={form.rarity} onChange={e => setForm(f => ({ ...f, rarity: e.target.value }))}
                style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '10px 14px', borderRadius: 8, fontSize: 14 }}>
                {['COMMON', 'ELITE', 'ROYAL', 'IMPERIAL', 'FOUNDERS', 'ONE-OF-ONE'].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <button onClick={handleCreate} disabled={loading} style={{
              width: '100%', background: loading ? '#555' : '#c9a054', color: '#000', border: 'none',
              borderRadius: 8, padding: 14, fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: 2
            }}>
              {loading ? 'CREATING...' : 'CREATE ASSET'}
            </button>
          </div>
        )}

        {tab === 'assets' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ color: '#c9a054', fontSize: 14, letterSpacing: 2, margin: 0 }}>ALL SOVEREIGN ASSETS ({assets.length})</h2>
              <button onClick={fetchAssets} disabled={loading} style={{ background: '#111', border: '1px solid #333', color: '#888', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 12 }}>
                {loading ? 'LOADING...' : '↻ REFRESH'}
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #222' }}>
                    {['Serial', 'Status', 'Rarity', 'Wallet', 'Token ID', 'TX Hash', 'Cycle', 'Created'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#555', letterSpacing: 1, fontSize: 11, fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assets.map(a => (
                    <tr key={a.id} style={{ borderBottom: '1px solid #111', transition: 'background 0.1s' }}>
                      <td style={{ padding: '10px 12px', color: '#c9a054', fontWeight: 600 }}>{a.serial_number}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ background: statusColor(a.nft_status), color: '#aaa', borderRadius: 4, padding: '2px 8px', fontSize: 11, letterSpacing: 1 }}>
                          {a.nft_status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', color: '#888' }}>{a.rarity_tier}</td>
                      <td style={{ padding: '10px 12px', color: '#555', fontSize: 11 }}>
                        {a.wallet_address ? a.wallet_address.slice(0, 6) + '...' + a.wallet_address.slice(-4) : '—'}
                      </td>
                      <td style={{ padding: '10px 12px', color: '#555' }}>{a.token_id ?? '—'}</td>
                      <td style={{ padding: '10px 12px' }}>
                        {a.tx_hash ? (
                          <a href={`https://polygonscan.com/tx/${a.tx_hash}`} target="_blank" rel="noreferrer"
                            style={{ color: '#4a7c59', fontSize: 11 }}>
                            {a.tx_hash.slice(0, 8)}...
                          </a>
                        ) : '—'}
                      </td>
                      <td style={{ padding: '10px 12px', color: '#555' }}>{a.ownership_cycle || 0}</td>
                      <td style={{ padding: '10px 12px', color: '#444', fontSize: 11 }}>
                        {new Date(a.created_at).toLocaleDateString('en-GB')}
                      </td>
                    </tr>
                  ))}
                  {assets.length === 0 && !loading && (
                    <tr><td colSpan={8} style={{ padding: 32, textAlign: 'center', color: '#444' }}>No assets yet. Create your first sovereign asset.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
