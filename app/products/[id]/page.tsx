'use client'

  import { useState, useEffect } from 'react'
  import Link from 'next/link'
  import { supabase } from '@/lib/supabase'
  import type { Product } from '@/types'
  import SovereignProductPage from '@/components/SovereignProductPage'
  import LuxuryGenericProductPage from '@/components/LuxuryGenericProductPage'
  import EternalEmpressPage from '@/components/EternalEmpressPage'

  const ETERNAL_EMPRESS_SLUGS = [
    'eternal-empress',
    'sf-eternal-empress',
  ]

  const SOVEREIGN_SLUGS = [
    'shamims-bloom',
    'queen-of-taif',
    'her-legacy-vault',
    'shamim-bloom-the-sovereign-grace',
    'shamim-bloom-sovereign-grace',
  ]

  const SERIF = "'Cormorant Garamond', Georgia, serif"

  export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const slug = params.id
      supabase
        .from('products')
        .select('*, main_category:main_categories(*)')
        .eq('slug', slug)
        .single()
        .then(({ data }) => {
          if (data) {
            setProduct(data)
            setLoading(false)
          } else {
            supabase
              .from('products')
              .select('*, main_category:main_categories(*)')
              .eq('id', slug)
              .single()
              .then(({ data: d2 }) => {
                setProduct(d2)
                setLoading(false)
              })
          }
        })
    }, [params.id])

    if (loading) {
      return (
        <div style={{ minHeight: '100vh', background: '#030303', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.25)' }}>
            Accessing Sovereign Vault...
          </p>
        </div>
      )
    }

    if (!product) {
      return (
        <div style={{ minHeight: '100vh', background: '#030303', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
          <p style={{ fontFamily: SERIF, fontSize: 42, fontWeight: 300, color: 'rgba(255,255,255,0.15)' }}>
            Creation Not Found
          </p>
          <Link
            href="/shop"
            style={{ fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,160,84,0.5)', border: '1px solid rgba(201,160,84,0.15)', padding: '14px 32px', textDecoration: 'none' }}
          >
            Return to Archive
          </Link>
        </div>
      )
    }

    if (ETERNAL_EMPRESS_SLUGS.includes(product.slug)) {
      return <EternalEmpressPage product={product} />
    }

    if (SOVEREIGN_SLUGS.includes(product.slug)) {
      return <SovereignProductPage product={product} />
    }

    return <LuxuryGenericProductPage product={product} />
  }
  