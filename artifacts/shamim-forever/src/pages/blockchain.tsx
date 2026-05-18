import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, QrCode, Hash, CheckCircle, Globe, Lock, Gem, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  })
};

const steps = [
  {
    number: "01",
    title: "Item Created",
    desc: "Every Shamim Forever piece is crafted and assigned a unique Luxury ID at the point of creation.",
    icon: Gem,
  },
  {
    number: "02",
    title: "Blockchain Certificate",
    desc: "The item's identity, creator, timestamp, and specifications are written permanently to the blockchain.",
    icon: Hash,
  },
  {
    number: "03",
    title: "NFT Minted",
    desc: "A non-transferable NFT is minted representing ownership — it travels with the item forever.",
    icon: Shield,
  },
  {
    number: "04",
    title: "QR Verification",
    desc: "A tamper-proof QR code is applied to the physical item. Scan anywhere, anytime to verify instantly.",
    icon: QrCode,
  },
  {
    number: "05",
    title: "Transfer of Ownership",
    desc: "When resold or gifted, ownership transfers on the ledger — provenance is preserved permanently.",
    icon: Globe,
  },
];

const features = [
  {
    icon: Shield,
    title: "Immutable Proof",
    desc: "Once written to the blockchain, no certificate can be altered, faked, or destroyed. Your ownership is permanent.",
  },
  {
    icon: QrCode,
    title: "Instant QR Verification",
    desc: "Scan the QR on any Shamim Forever item with your phone. Full provenance, authentication, and ownership history appears instantly.",
  },
  {
    icon: Hash,
    title: "Serialized Luxury ID",
    desc: "Each item carries a unique 12-character alphanumeric identity — like a serial number but written into blockchain forever.",
  },
  {
    icon: Lock,
    title: "NFT Ownership",
    desc: "Your purchase comes with a digital twin — a non-fungible token that proves you are the rightful owner.",
  },
  {
    icon: Globe,
    title: "Global Recognition",
    desc: "Whether you're in Karachi, Dubai, or London — your Shamim Forever certificate is verified instantly, everywhere.",
  },
  {
    icon: CheckCircle,
    title: "Anti-Counterfeit Guarantee",
    desc: "The only genuine Shamim Forever pieces are those with a valid blockchain certificate. Anything else is fake.",
  },
];

const roadmap = [
  { phase: "Now", title: "QR Verification System", status: "live", desc: "Every piece ships with QR-linked blockchain certificate." },
  { phase: "Q3 2026", title: "NFT Ownership Tokens", status: "building", desc: "Non-transferable NFTs minted on Polygon for all orders." },
  { phase: "Q4 2026", title: "RWA Ownership Ledger", status: "planned", desc: "Real-World Asset registry for high-value jewelry pieces." },
  { phase: "2027", title: "$OKBOND Integration", status: "planned", desc: "Full token-gated verification and ownership marketplace." },
];

export default function BlockchainAuthenticity() {
  const [verifyId, setVerifyId] = useState("");
  const [verifyResult, setVerifyResult] = useState<null | "valid" | "invalid">(null);
  const { toast } = useToast();

  const handleVerify = () => {
    if (!verifyId.trim()) {
      toast({ title: "Please enter a Luxury ID or Order Number." });
      return;
    }
    // Demo verification
    setTimeout(() => {
      if (verifyId.length >= 6) {
        setVerifyResult("valid");
      } else {
        setVerifyResult("invalid");
      }
    }, 1200);
    setVerifyResult(null);
    toast({ title: "Verifying on blockchain...", description: "Please wait." });
  };

  return (
    <div className="bg-background min-h-screen">

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-background to-blue-950/10" />
          {/* Animated blockchain grid */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-primary/5 rounded-sm"
              style={{
                width: `${60 + i * 40}px`,
                height: `${60 + i * 40}px`,
                left: `${5 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{ opacity: [0.2, 0.5, 0.2], rotate: [0, 10, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-primary/50" />
            <span className="text-primary tracking-[0.5em] uppercase text-xs font-medium">Authenticity</span>
            <div className="h-px w-16 bg-primary/50" />
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-serif text-gold-gradient mb-6 leading-tight">
            Blockchain<br />Authenticity
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-xl md:text-2xl font-serif italic text-muted-foreground mb-6">
            "Every real thing deserves an immutable proof of its existence."
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Shamim Forever is the first Pakistani luxury house to certify every piece with blockchain technology.
            No fakes. No uncertainty. Just undeniable proof of authenticity — forever written into the ledger of truth.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => document.getElementById('verify')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-primary-foreground text-sm tracking-widest uppercase px-10 py-6"
            >
              Verify Your Item
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-primary/40 text-primary hover:bg-primary/10 text-sm tracking-widest uppercase px-10 py-6"
            >
              How It Works
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <p className="text-primary tracking-[0.4em] uppercase text-xs mb-4">The System</p>
          <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient">Why It's Different</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
              className="luxury-card p-8 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 bg-card/20 border-y border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <p className="text-primary tracking-[0.4em] uppercase text-xs mb-4">The Process</p>
            <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient">From Craft to Certificate</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
                  className="flex gap-8 items-start">
                  <div className="shrink-0 relative">
                    <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center z-10 relative">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 text-xs font-mono text-primary/60">{step.number}</div>
                  </div>
                  <div className="pt-3">
                    <h3 className="font-serif text-xl text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verification Tool */}
      <section id="verify" className="py-24 container mx-auto px-6 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-12">
          <p className="text-primary tracking-[0.4em] uppercase text-xs mb-4">Check Your Piece</p>
          <h2 className="text-4xl font-serif text-gold-gradient mb-4">Verify Authenticity</h2>
          <p className="text-muted-foreground">Enter the Luxury ID (found inside the packaging) or your order number to verify your item's authenticity on the blockchain.</p>
        </motion.div>

        <div className="luxury-card p-8">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Enter Luxury ID or Order Number"
              value={verifyId}
              onChange={e => { setVerifyId(e.target.value); setVerifyResult(null); }}
              className="flex-1 bg-background border border-border px-5 py-4 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors font-mono"
            />
            <Button
              onClick={handleVerify}
              className="bg-primary text-primary-foreground px-6 text-sm tracking-widest uppercase shrink-0"
            >
              Verify
            </Button>
          </div>

          {verifyResult === "valid" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4 p-5 bg-emerald-950/30 border border-emerald-800/40 rounded-sm mt-4">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-emerald-400 font-medium text-sm mb-1">Authentic Shamim Forever Piece</p>
                <p className="text-muted-foreground text-xs">This item's authenticity has been verified on the blockchain. Certificate is genuine and unaltered.</p>
              </div>
            </motion.div>
          )}

          {verifyResult === "invalid" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4 p-5 bg-red-950/30 border border-red-800/40 rounded-sm mt-4">
              <Shield className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium text-sm mb-1">Certificate Not Found</p>
                <p className="text-muted-foreground text-xs">No certificate found for this ID. This may be counterfeit. Contact concierge immediately.</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 bg-card/20 border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <p className="text-primary tracking-[0.4em] uppercase text-xs mb-4">Future Vision</p>
            <h2 className="text-4xl font-serif text-gold-gradient">Digital Authenticity Roadmap</h2>
          </motion.div>

          <div className="space-y-6">
            {roadmap.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
                className="flex items-start gap-6 luxury-card p-6">
                <div className="shrink-0 w-20 text-center">
                  <div className={`text-xs px-2 py-1 rounded-sm font-mono ${
                    item.status === 'live' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/40' :
                    item.status === 'building' ? 'bg-primary/10 text-primary border border-primary/30' :
                    'bg-zinc-900 text-muted-foreground border border-border'
                  }`}>
                    {item.status === 'live' ? 'LIVE' : item.status === 'building' ? 'BUILDING' : 'PLANNED'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{item.phase}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
