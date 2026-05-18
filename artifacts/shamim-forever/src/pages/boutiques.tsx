import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail, ExternalLink } from "lucide-react";

const BOUTIQUES = [
  {
    id: 1,
    name: "Shamim Forever — Karachi",
    address: "Dolmen Mall, Shop No. 118, Ground Floor, Tariq Rd, Delhi CHS P.E.C.H.S.",
    city: "Karachi",
    country: "Pakistan",
    phone: "+92 21 3529 8686",
    email: "Team@shamimforever.com",
    openingHours: "Mon–Sun 11:00–22:00",
    mapUrl: "https://maps.google.com/?q=Dolmen+Mall+Tariq+Road+Karachi",
    accent: "from-amber-900/20 to-amber-800/10",
  },
  {
    id: 2,
    name: "Shamim Forever — Lahore",
    address: "Shop no G-32, Dolmen Mall, Sector A DHA Phase 6",
    city: "Lahore",
    country: "Pakistan",
    phone: "+92 42 3576 8686",
    email: "lahore@shamimforever.com",
    openingHours: "Mon–Sun 11:00–21:00",
    mapUrl: "https://maps.google.com/?q=Dolmen+Mall+DHA+Phase+6+Lahore",
    accent: "from-yellow-900/20 to-yellow-800/10",
  },
  {
    id: 3,
    name: "Shamim Forever — Islamabad",
    address: "Giga Mall, Sector F DHA Phase II",
    city: "Islamabad",
    country: "Pakistan",
    phone: "+92 51 2826 868",
    email: "Islamabad@shamimforever.com",
    openingHours: "Mon–Sun 11:00–21:00",
    mapUrl: "https://maps.google.com/?q=Giga+Mall+Islamabad",
    accent: "from-amber-900/20 to-amber-800/10",
  },
  {
    id: 4,
    name: "Shamim Forever — Peshawar",
    address: "HBK Hyper Market Main Ring Road Achini Road, Achini Payan",
    city: "Peshawar",
    country: "Pakistan",
    phone: "+92 91 5700 868",
    email: "peshawar@shamimforever.com",
    openingHours: "Mon–Sun 11:00–21:00",
    mapUrl: "https://maps.google.com/?q=HBK+Hyper+Market+Peshawar",
    accent: "from-yellow-900/20 to-yellow-800/10",
  },
];

export default function Boutiques() {
  const [activeBoutique, setActiveBoutique] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 px-4 md:px-8 text-center border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto"
        >
          <p className="text-primary tracking-[0.4em] uppercase text-xs font-medium mb-4">Sovereign Footprint</p>
          <h1 className="text-5xl md:text-6xl font-serif text-gold-gradient mb-6">Our Boutiques</h1>
          <p className="text-muted-foreground font-serif text-lg leading-relaxed">
            Four flagship houses of luxury across Pakistan — each a sanctuary of rare fragrances,
            high jewelry, and bespoke cosmetic artistry.
          </p>
        </motion.div>
      </section>

      {/* Boutique Cards */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {BOUTIQUES.map((boutique, idx) => (
            <motion.div
              key={boutique.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => setActiveBoutique(activeBoutique === boutique.id ? null : boutique.id)}
              className={`relative border cursor-pointer transition-all duration-300 bg-gradient-to-br ${boutique.accent} ${
                activeBoutique === boutique.id
                  ? "border-primary shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {/* City tag */}
              <div className="absolute top-4 right-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-medium bg-primary/5 px-2 py-1 border border-primary/20">
                  {boutique.city}
                </span>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-serif text-foreground mb-6 pr-20">{boutique.name}</h2>

                <div className="space-y-3 text-sm text-muted-foreground mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{boutique.address}<br />{boutique.city}, {boutique.country}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <a href={`tel:${boutique.phone}`} className="hover:text-primary transition-colors" onClick={e => e.stopPropagation()}>
                      {boutique.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <a href={`mailto:${boutique.email}`} className="hover:text-primary transition-colors" onClick={e => e.stopPropagation()}>
                      {boutique.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span>{boutique.openingHours}</span>
                  </div>
                </div>

                <a
                  href={boutique.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary border border-primary/40 px-4 py-2 hover:bg-primary/10 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  View on Map
                </a>
              </div>

              {/* Active indicator */}
              {activeBoutique === boutique.id && (
                <div className="h-0.5 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pakistan map decoration */}
      <section className="py-12 px-4 md:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {["Karachi", "Lahore", "Islamabad", "Peshawar"].map((city) => (
              <div key={city} className="bg-background p-6 text-center">
                <div className="w-2 h-2 rounded-full bg-primary mx-auto mb-3 shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
                <p className="text-sm font-serif text-foreground">{city}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Flagship Hub</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 md:px-8 text-center">
        <div className="max-w-2xl mx-auto border border-border p-10 bg-secondary/10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Bespoke Appointments</p>
          <h3 className="text-3xl font-serif text-gold-gradient mb-4">Visit Our Atelier</h3>
          <p className="text-muted-foreground font-serif mb-8">
            For private consultations, bespoke jewelry commissions, or exclusive fragrance appointments,
            contact our concierge team directly.
          </p>
          <a
            href="mailto:concierge@shamimforever.com"
            className="inline-block bg-primary text-primary-foreground px-10 py-3 text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors font-serif"
          >
            Contact Concierge
          </a>
        </div>
      </section>
    </div>
  );
}
