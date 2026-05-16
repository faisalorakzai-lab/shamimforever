import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useListBoutiques } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function Boutiques() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { data: boutiques, isLoading } = useListBoutiques();
  const [activeBoutique, setActiveBoutique] = useState<number | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !boutiques || boutiques.length === 0) return;
    
    // Using a public demo token if env var is missing for preview purposes
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "pk.eyJ1IjoiZGVtbyIsImEiOiJjbGlubzc0bzkwMW92M2pwZmVpY3V1MThkIn0.d-YQ1W6g5zZqW7xQ2oG_hQ";
    
    const style = import.meta.env.VITE_MAPBOX_STYLE || "mapbox://styles/mapbox/dark-v11";

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: style,
        center: [boutiques[0].lng, boutiques[0].lat],
        zoom: 11,
        pitch: 45,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      // Add markers
      boutiques.forEach((boutique) => {
        const el = document.createElement('div');
        el.className = 'w-6 h-6 bg-primary rounded-full border-2 border-background shadow-[0_0_15px_rgba(212,175,55,0.5)] cursor-pointer hover:scale-110 transition-transform';
        
        el.addEventListener('click', () => {
          setActiveBoutique(boutique.id);
          map.current?.flyTo({
            center: [boutique.lng, boutique.lat],
            zoom: 15,
            essential: true
          });
        });

        new mapboxgl.Marker(el)
          .setLngLat([boutique.lng, boutique.lat])
          .addTo(map.current!);
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [boutiques]);

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-[90vh] bg-background flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-[450px] bg-secondary/30 border-r border-border flex flex-col h-auto lg:h-[calc(100vh-80px)] shrink-0 z-10 overflow-y-auto">
        <div className="p-8 border-b border-border">
          <h1 className="text-4xl font-serif text-gold-gradient mb-2">Our Boutiques</h1>
          <p className="text-muted-foreground font-serif">Discover the House of Shamim in person.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {boutiques?.map((boutique) => (
            <div 
              key={boutique.id} 
              className={`p-8 cursor-pointer transition-colors hover:bg-secondary/50 ${activeBoutique === boutique.id ? 'bg-secondary/50 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
              onClick={() => {
                setActiveBoutique(boutique.id);
                map.current?.flyTo({
                  center: [boutique.lng, boutique.lat],
                  zoom: 15,
                  essential: true
                });
              }}
            >
              <h3 className="text-2xl font-serif text-foreground mb-4">{boutique.name}</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{boutique.address}<br/>{boutique.city}, {boutique.country}</span>
                </p>
                {boutique.phone && (
                  <p className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>{boutique.phone}</span>
                  </p>
                )}
                {boutique.email && (
                  <p className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span>{boutique.email}</span>
                  </p>
                )}
                {boutique.openingHours && (
                  <p className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="whitespace-pre-line">{boutique.openingHours}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative min-h-[500px] lg:h-[calc(100vh-80px)] border-t lg:border-t-0 border-border">
        <div ref={mapContainer} className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(10,10,10,1)] z-10" />
      </div>
    </div>
  );
}
