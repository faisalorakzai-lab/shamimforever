import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-6">Client Relations</h1>
          <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
            Our advisors are available to assist you with inquiries regarding products, bespoke commissions, or existing orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-serif text-foreground mb-4 uppercase tracking-widest border-b border-border pb-2">Direct Inquiries</h3>
              <p className="text-muted-foreground mb-2">Email: <a href="mailto:concierge@shamimforever.com" className="text-primary hover:underline">concierge@shamimforever.com</a></p>
              <p className="text-muted-foreground">Phone: <a href="tel:+923367970004" className="text-primary hover:underline">+92 336 797 0004</a></p>
            </div>

            <div>
              <h3 className="text-xl font-serif text-foreground mb-4 uppercase tracking-widest border-b border-border pb-2">Operating Hours</h3>
              <p className="text-muted-foreground mb-2">Monday - Saturday</p>
              <p className="text-primary font-medium tracking-wider">10:00 AM - 8:00 PM (PKT)</p>
            </div>

            <div id="faq">
              <h3 className="text-xl font-serif text-foreground mb-4 uppercase tracking-widest border-b border-border pb-2">Frequently Asked</h3>
              <div className="space-y-4">
                <details className="group border border-border p-4 bg-secondary/10">
                  <summary className="font-serif text-foreground cursor-pointer list-none flex justify-between items-center">
                    Do you ship internationally?
                    <span className="transition group-open:rotate-180">↓</span>
                  </summary>
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                    Yes, we offer insured worldwide shipping via premium couriers. International delivery typically takes 5-7 business days.
                  </p>
                </details>
                <details className="group border border-border p-4 bg-secondary/10">
                  <summary className="font-serif text-foreground cursor-pointer list-none flex justify-between items-center">
                    What is your return policy?
                    <span className="transition group-open:rotate-180">↓</span>
                  </summary>
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                    Due to the delicate nature of our creations, returns are accepted within 14 days of delivery only if the tamper-evident seal remains unbroken. Engraved or bespoke items are final sale.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-secondary/30 border border-border p-8">
            <h2 className="text-2xl font-serif text-foreground mb-8">Send a Message</h2>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl font-serif">✓</div>
                <h3 className="text-xl font-serif text-foreground mb-2">Message Received</h3>
                <p className="text-muted-foreground">An advisor will respond to your inquiry within 24 hours.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-8 border-border text-foreground hover:bg-secondary rounded-none uppercase tracking-widest">
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Subject *</label>
                  <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Message *</label>
                  <textarea required rows={4} name="message" value={formData.message} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif resize-none" />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif tracking-widest uppercase py-6 mt-4">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
