import { useState } from "react";
import { motion } from "framer-motion";

const boutiqueHubs = [
  { city: "Karachi", venue: "Dolmen Mall, Tariq Road Hub", timing: "11:00 AM — 11:00 PM", phone: "+92 21 3529 8686" },
  { city: "Lahore", venue: "Dolmen Mall, DHA Phase 6 Flagship", timing: "11:00 AM — 11:00 PM", phone: "+92 42 3576 8686" },
  { city: "Islamabad", venue: "Giga Mall, Executive Vault", timing: "11:00 AM — 10:00 PM", phone: "+92 51 2826 868" },
  { city: "Peshawar", venue: "HBK Hyper Market, Main Ring Road Suite", timing: "11:00 AM — 10:00 PM", phone: "+92 91 5700 868" },
];

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", nature: "fragrance", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4 md:px-8 font-serif">
      <div className="max-w-6xl mx-auto border border-border bg-secondary/10 p-8 md:p-16 backdrop-blur-sm">
        
        <div className="text-center mb-16 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl text-gold-gradient tracking-wide mb-4">
            Bespoke Concierge Desk
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            SHAMIM FOREVER • GLOBAL CLIENT RELATIONS & BOUTIQUE INQUIRIES
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Flagship Hubs */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl uppercase tracking-widest text-primary mb-2">Flagship Hubs</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Experience our raw oriental extracts, formulation elixirs, and master-crafted high jewelry assets firsthand at our official corporate lounges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {boutiqueHubs.map((hub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-border/40 p-4 bg-background/40 hover:border-primary/60 transition-colors"
                >
                  <h3 className="text-base text-primary uppercase tracking-wider mb-1">{hub.city}</h3>
                  <p className="text-sm font-medium mb-2">{hub.venue}</p>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <p>Hours: {hub.timing}</p>
                    <p>Direct: {hub.phone}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 border-t border-border/30 text-sm space-y-1 text-muted-foreground">
              <p>General Inquiries: <span className="text-foreground">concierge@shamimforever.com</span></p>
              <p>Jewelry Acquisitions: <span className="text-foreground">vault@shamimforever.com</span></p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-border/60 p-6 md:p-8 bg-background/60">
            <h2 className="text-xl uppercase tracking-widest text-primary mb-6">Submit Private Inquiry</h2>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mx-auto">
                  <span className="text-primary text-xl">✓</span>
                </div>
                <p className="text-primary font-serif text-lg">Request Transmitted</p>
                <p className="text-sm text-muted-foreground">Our concierge will respond within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Full Name *</label>
                    <input type="text" required value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-secondary/20 border border-border px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
                      placeholder="E.g., Faisal Orakzai" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Email Address *</label>
                    <input type="email" required value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full bg-secondary/20 border border-border px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
                      placeholder="client@domain.com" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Inquiry Nature *</label>
                  <select value={formData.nature} onChange={e => setFormData(p => ({ ...p, nature: e.target.value }))}
                    className="w-full bg-secondary/30 border border-border px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground font-serif">
                    <option value="fragrance">Fine Fragrances Private Allocation</option>
                    <option value="jewelry">High Jewelry Bespoke Commission</option>
                    <option value="corporate">Institutional Partnerships</option>
                    <option value="support">Order Logistics & Fulfillment</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Message / Custom Brief *</label>
                  <textarea rows={5} required value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full bg-secondary/20 border border-border px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground resize-none"
                    placeholder="Describe your corporate request or custom parameters..." />
                </div>

                <button type="submit"
                  className="w-full bg-primary text-primary-foreground uppercase text-xs tracking-widest py-3 hover:bg-primary/90 transition-colors font-serif font-bold">
                  Transmit Secure Request
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
