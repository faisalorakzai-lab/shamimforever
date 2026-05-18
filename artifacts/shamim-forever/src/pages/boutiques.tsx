import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useListBoutiques } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";



export default function Boutiques() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { data: apiBoutiques } = useListBoutiques();
  const [activeBoutique, setActiveBoutique] = useState<number | null>(null);

  const boutiques = apiBoutiques || [];

  useEffect(() => {
    if (!mapContainer.current || !boutiques || boutiques.length === 0) return;

    mapboxgl.accessToken =
      import.meta.env.VITE_MAPBOX_TOKEN;

    const style =
      import.meta.env.VITE_MAPBOX_STYLE || "mapbox://styles/mapbox/dark-v11";

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style,
        center: [boutiques[0].lng, boutiques[0].lat],
        zoom: 5.5,
        pitch: 30,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      boutiques.forEach((boutique) => {
        const el = document.createElement("div");
        el.style.cssText =
          "width:14px;height:14px;background:#D4AF37;border-radius:50%;border:2px solid #0a0a0a;box-shadow:0 0 16px rgba(212,175,55,0.7);cursor:pointer;transition:transform 0.2s";
        el.addEventListener("mouseenter", () => (el.style.transform = "scale(1.5)"));
        el.addEventListener("mouseleave", () => (el.style.transform = "scale(1)"));
        el.addEventListener("click", () => {
          setActiveBoutique(boutique.id);
          map.current?.flyTo({ center: [boutique.lng, boutique.lat], zoom: 14, essential: true });
        });

        const popup = new mapboxgl.Popup({ offset: 20, className: "boutique-popup", closeButton: false })
          .setHTML(
            `<div style="background:#0f0f0f;border:1px solid #2a2a1a;padding:12px 16px;color:#d4b45a;font-family:'Cormorant Garamond',serif">
              <p style="font-size:14px;font-weight:600;margin:0 0 4px">${boutique.name}</p>
              <p style="font-size:11px;opacity:0.7;margin:0;letter-spacing:0.05em">${boutique.city}, ${boutique.country}</p>
            </div>`,
          );

        new mapboxgl.Marker(el)
          .setLngLat([boutique.lng, boutique.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [boutiques.length]);

  const handleSelectBoutique = (boutique: (typeof boutiques)[0]) => {
    setActiveBoutique(boutique.id);
    map.current?.flyTo({ center: [boutique.lng, boutique.lat], zoom: 14, essential: true });
  };

  return (
    <div className="min-h-[90vh] bg-background flex flex-col lg:flex-row">
      <div className="w-full lg:w-[420px] bg-secondary/20 border-r border-border flex flex-col shrink-0 z-10 overflow-y-auto lg:h-[calc(100vh-80px)]">
        <div className="p-8 border-b border-border">
          <p className="text-primary tracking-[0.4em] uppercase text-xs font-medium mb-3">Sovereign Footprint</p>
          <h1 className="text-4xl font-serif text-gold-gradient mb-2">Our Boutiques</h1>
          <p className="text-muted-foreground font-serif text-sm">
            Four flagship houses of luxury across Pakistan.
          </p>
        </div>

        <div className="flex-1 divide-y divide-border">
          {boutiques.map((boutique) => (
            <motion.div
              key={boutique.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: boutique.id * 0.08 }}
              className={`p-6 cursor-pointer transition-all hover:bg-secondary/40 ${
                activeBoutique === boutique.id
                  ? "bg-secondary/50 border-l-2 border-l-primary pl-5"
                  : "border-l-2 border-l-transparent"
              }`}
              onClick={() => handleSelectBoutique(boutique)}
            >
              <h3 className="text-lg font-serif text-foreground mb-3">{boutique.name}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {boutique.address}
                    <br />
                    {boutique.city}, {boutique.country}
                  </span>
                </p>
                {boutique.email && (
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    <a href={`mailto:${boutique.email}`} className="hover:text-primary transition-colors">
                      {boutique.email}
                    </a>
                  </p>
                )}
                {boutique.phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{boutique.phone}</span>
                  </p>
                )}
                {boutique.openingHours && (
                  <p className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{boutique.openingHours}</span>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative min-h-[500px] lg:h-[calc(100vh-80px)]">
        <div ref={mapContainer} className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(5,5,5,0.9)] z-10" />
      </div>
    </div>
  );
}
