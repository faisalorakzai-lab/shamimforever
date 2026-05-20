'use client'

import { useEffect, useRef } from 'react'
import type { Boutique } from '@/types'

interface Props {
  boutiques: Boutique[]
  selected: Boutique | null
  onSelect: (b: Boutique) => void
}

export default function BoutiqueMap({ boutiques, selected, onSelect }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    async function initMap() {
      const mapboxgl = (await import('mapbox-gl')).default
      await import('mapbox-gl/dist/mapbox-gl.css')

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

      const map = new mapboxgl.Map({
        container: mapRef.current!,
        style: process.env.NEXT_PUBLIC_MAPBOX_STYLE || 'mapbox://styles/mapbox/dark-v11',
        center: [67, 30],
        zoom: 4,
        attributionControl: false,
      })

      mapInstance.current = map

      map.on('load', () => {
        boutiques.forEach((boutique) => {
          const el = document.createElement('div')
          el.style.cssText = `
            width: 12px; height: 12px;
            background: #c9a054;
            border: 1px solid #050505;
            cursor: pointer;
            transition: transform 0.3s ease;
          `
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => onSelect(boutique))

          const marker = new mapboxgl.Marker(el)
            .setLngLat([boutique.coordinates.lng, boutique.coordinates.lat])
            .addTo(map)

          markersRef.current.push({ marker, id: boutique.id, el })
        })
      })
    }

    initMap()

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [boutiques])

  useEffect(() => {
    if (!selected || !mapInstance.current) return
    mapInstance.current.flyTo({
      center: [selected.coordinates.lng, selected.coordinates.lat],
      zoom: 12,
      duration: 2000,
      essential: true,
    })
  }, [selected])

  return <div ref={mapRef} className="w-full h-full" />
}
