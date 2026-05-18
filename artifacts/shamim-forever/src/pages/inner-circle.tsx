import { useState } from "react";
import { motion } from "framer-motion";
import { useCreateConciergeBooking, useSubscribeNewsletter } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Crown, Star, Lock, Gift, Mail, Phone, Zap, Diamond } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  })
};

const tiers = [
  {
    name: "Inner Circle",
    subtitle: "The Entry",
    price: "Free",
    color: "from-zinc-800 to-zinc-900",
    border: "border-zinc-700",
    accent: "text-zinc-300",
    features: [
      "Early access to new collections",
      "Exclusive member pricing (5% off)",
      "Monthly newsletter — Chairman's Notes",
      "Birthday gift from Shamim Forever",
    ],
    cta: "Join Free"
  },
  {
    name: "Sovereign",
    subtitle: "The Elite",
    price: "PKR 4,999/yr",
    color: "from-yellow-950 to-zinc-900",
    border: "border-primary/60",
    accent: "text-primary",
    featured: true,
    features: [
      "Everything in Inner Circle",
      "10% lifetime discount on all orders",
      "Private drops — 48hr before public",
      "Quarterly Chairman's letter (physical)",
      "Dedicated concierge line",
      "VIP boutique appointments",
    ],
    cta: "Become Sovereign"
  },
  {
    name: "Eternity",
    subtitle: "The Legacy",
    price: "By Invitation",
    color: "from-zinc-900 to-black",
    border: "border-white/10",
    accent: "text-white",
    features: [
      "Everything in Sovereign",
      "Personal styling consultation",
      "First access to bespoke commissions",
      "Named in Annual Legacy Archive",
      "Exclusive Eternity Edition pieces",
      "Direct line to Chairman Faisal",
    ],
    cta: "Request Invitation"
  }
];

const perks = [
  { icon: Crown, title: "Exclusive Drops", desc: "Private access to limited-edition pieces before they go public. Some pieces never do." },
  { icon: Diamond, title: "Blockchain Certificates", desc: "Every purchase comes with a digital certificate of authenticity on the blockchain." },
  { icon: Gift, title: "Chairman's Selections", desc: "Curated gift recommendations personally chosen by Chairman Faisal Orakzai." },
  { icon: Mail, title: "Private Letters", desc: "Quarterly physical letters on luxury stationery — thoughts on life, luxury, and legacy." },
  { icon: Phone, title: "Concierge Access", desc: "A dedicated advisor available via WhatsApp for styling, gifting, and consultations." },
  { icon: Zap, title: "OKBOND Benefits", desc: "Hold $OKBOND token and receive automatic 10% discount on every order." },
];

export default function InnerCircle() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const subscribe = useSubscribeNewsletter();
  const { toast } = useToast();

  const handleJoin = (tier: string) => {
    if (!email) { toast({ title: "Please enter your email first." }); return; }
    subscribe.mutate({ data: { email } }, {
      onSuccess: () => {
        toast({
          title: `Welcome to ${tier}`,
          description: "You're now part of Pakistan's most exclusive luxury circle.",
        });
        setEmail("");
        setName("");
      }
    });
  };

  return (
    <div className="bg-background min-h-screen">

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-yellow-950/20" />
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/40"
              style={{ left: `${10 + i * 7}%`, top: `${15 + (i % 4) * 20}%` }}
              animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          {/* Decorative ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-primary/50" />
            <span className="text-primary tracking-[0.5em] uppercase text-xs font-medium">Shamim Forever</span>
            <div className="h-px w-16 bg-primary/50" />
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-6xl md:text-8xl font-serif text-gold-gradient mb-6 leading-none">
            The Inner Circle
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-xl md:text-2xl font-serif text-muted-foreground italic mb-4">
            "Not everyone wears a crown. But everyone deserves to know if they should."
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            An exclusive membership for those who understand that luxury is not about price — it's about belonging to something rare. Pakistan's first sovereign luxury membership.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => document.getElementById('tiers')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm tracking-widest uppercase px-10 py-6 font-medium"
            >
              Explore Membership
            </Button>
            <Button
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/10 text-sm tracking-widest uppercase px-10 py-6"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <p className="text-primary tracking-[0.4em] uppercase text-xs mb-4">What You Receive</p>
          <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient">Member Privileges</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
              className="luxury-card p-8 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <perk.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-3">{perk.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Membership Tiers */}
      <section id="tiers" className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <p className="text-primary tracking-[0.4em] uppercase text-xs mb-4">Choose Your Place</p>
            <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">Membership Tiers</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three levels of belonging. Each more exclusive than the last.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
                className={`relative border ${tier.border} rounded-sm overflow-hidden ${tier.featured ? 'scale-[1.03] shadow-2xl' : ''}`}
              >
                {tier.featured && (
                  <div className="absolute top-0 left-0 right-0 bg-primary py-1 text-center">
                    <span className="text-primary-foreground text-xs tracking-widest uppercase font-medium">Most Sought After</span>
                  </div>
                )}
                <div className={`bg-gradient-to-b ${tier.color} p-8 ${tier.featured ? 'pt-10' : ''}`}>
                  <p className={`text-xs tracking-widest uppercase mb-2 ${tier.accent}`}>{tier.subtitle}</p>
                  <h3 className="text-2xl font-serif text-foreground mb-1">{tier.name}</h3>
                  <p className={`text-xl font-serif mb-8 ${tier.accent}`}>{tier.price}</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Star className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${tier.accent}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleJoin(tier.name)}
                    className={`w-full text-sm tracking-widest uppercase py-5 ${
                      tier.featured
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-transparent border border-current hover:bg-white/5'
                    } ${tier.accent}`}
                    variant={tier.featured ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Form */}
      <section className="py-24 container mx-auto px-6 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center">
          <p className="text-primary tracking-[0.4em] uppercase text-xs mb-4">Reserve Your Place</p>
          <h2 className="text-4xl font-serif text-gold-gradient mb-4">Join the Circle</h2>
          <p className="text-muted-foreground mb-10">Enter your details and we will reach out personally to welcome you.</p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-card border border-border px-6 py-4 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-card border border-border px-6 py-4 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
            />
            <Button
              onClick={() => handleJoin("Inner Circle")}
              disabled={subscribe.isPending}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm tracking-widest uppercase py-6"
            >
              {subscribe.isPending ? "Sending..." : "Request Membership"}
            </Button>
          </div>

          <div className="flex items-center gap-2 justify-center mt-6 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            <span>Your information is kept strictly confidential.</span>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
