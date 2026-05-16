import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCreateConciergeBooking } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export default function Concierge() {
  const createBooking = useCreateConciergeBooking();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "virtual_consultation",
    preferredDate: "",
    preferredTime: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBooking.mutate({ data: formData }, {
      onSuccess: () => {
        toast({
          title: "Request Submitted",
          description: "Our concierge will contact you shortly to confirm your appointment.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "virtual_consultation",
          preferredDate: "",
          preferredTime: "",
          notes: ""
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background pt-12 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-12"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-gold-gradient mb-6 leading-tight">Private Concierge</h1>
            <div className="space-y-6 text-muted-foreground font-serif text-lg leading-relaxed mb-12">
              <p>
                Experience Shamim Forever with personalized guidance from our master consultants.
              </p>
              <p>
                Whether you seek a signature fragrance consultation, require assistance with a bespoke jewelry commission, or wish to arrange a private viewing in one of our boutiques, our concierge team is at your disposal.
              </p>
            </div>
            
            <div className="space-y-8 border-t border-border pt-8">
              <div>
                <h3 className="text-xl font-serif text-foreground mb-2">Virtual Consultation</h3>
                <p className="text-muted-foreground text-sm">A 45-minute video session to discover your signature scent from the comfort of your home.</p>
              </div>
              <div>
                <h3 className="text-xl font-serif text-foreground mb-2">Bespoke Commission</h3>
                <p className="text-muted-foreground text-sm">Initiate the process for a custom jewelry piece or engraved artifact.</p>
              </div>
              <div>
                <h3 className="text-xl font-serif text-foreground mb-2">Private Viewing</h3>
                <p className="text-muted-foreground text-sm">Arrange a closed-door viewing at your nearest Shamim Forever boutique.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-secondary/30 border border-border p-8 md:p-12"
          >
            <h2 className="text-2xl font-serif text-foreground mb-8">Request an Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Full Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Email *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Service Required *</label>
                <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif cursor-pointer">
                  <option className="bg-background text-foreground" value="virtual_consultation">Virtual Consultation</option>
                  <option className="bg-background text-foreground" value="bespoke_commission">Bespoke Commission</option>
                  <option className="bg-background text-foreground" value="private_viewing">Private Viewing</option>
                  <option className="bg-background text-foreground" value="gifting_advice">Gifting Advice</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Preferred Date *</label>
                  <input required type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" style={{ colorScheme: 'dark' }} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Preferred Time</label>
                  <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" style={{ colorScheme: 'dark' }} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Additional Notes</label>
                <textarea rows={3} name="notes" value={formData.notes} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif resize-none" placeholder="Please share any specific interests or requirements..." />
              </div>

              <Button type="submit" disabled={createBooking.isPending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif tracking-widest uppercase py-6 mt-8">
                {createBooking.isPending ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
