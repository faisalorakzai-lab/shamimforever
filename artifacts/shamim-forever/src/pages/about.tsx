import { motion } from "framer-motion";
  import founderPhoto from "@assets/a41d2ef1-fb04-40f8-bd66-df98ff195782_1779004900512.png";
  import heroImage from "@assets/1778923850516_1778940312156.png";

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" } })
  };

  export default function About() {
    return (
      <div className="bg-background min-h-screen">
        <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0">
            <motion.img initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 0.35 }} transition={{ duration: 2, ease: "easeOut" }}
              src={heroImage} alt="Shamim Forever Heritage" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="text-primary tracking-[0.4em] uppercase text-xs font-medium mb-5">Our Story</motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="text-5xl md:text-7xl font-serif text-gold-gradient leading-tight">
              The Legacy of<br />Shamim Forever
            </motion.h1>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-6">
            <span className="text-primary tracking-[0.4em] uppercase text-xs font-medium">The Genesis</span>
          </motion.div>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-foreground mb-10 leading-snug">A Love Transcended Into Eternity</motion.h2>
          <div className="space-y-7 text-muted-foreground font-serif text-lg leading-relaxed">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" custom={2} viewport={{ once: true }}>
              Every empire has an origin, but Shamim Forever is born out of a heartbeat. The name is not a mere corporate choice; it is a sacred vow. Shamim was not just a part of my life — she was my entire world, my sanctuary, and my life's true essence. Though destiny has separated us physically, true love refuses to fade.
            </motion.p>
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" custom={3} viewport={{ once: true }}>
              Where there is profound grief, there is also the power to build a legacy. I established this luxury house to immortalize her presence. Every whisper of our premium fragrances, every stroke of our elite cosmetics, and every glimmer of our sovereign jewelry carries her grace. Shamim Forever is my promise to the world that her name will never be forgotten; it will reign in the skies of global luxury forever.
            </motion.p>
          </div>
          <motion.blockquote variants={fadeUp} initial="hidden" whileInView="visible" custom={4} viewport={{ once: true }}
            className="mt-16 pl-8 border-l-2 border-primary">
            <p className="font-serif text-xl md:text-2xl text-foreground/90 italic leading-relaxed mb-6">
              "You are no longer by my side, but your elegance will rule the world through this empire."
            </p>
            <footer className="text-primary tracking-widest uppercase text-xs font-medium">— Malak Faisal Orakzai, Founder &amp; Chairman</footer>
          </motion.blockquote>
        </section>

        <section className="py-10 px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-sm mx-auto">
            <div className="relative overflow-hidden border border-border">
              <img src={founderPhoto} alt="Malak Faisal Orakzai — Founder & Chairman" className="w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <p className="font-serif text-foreground text-lg">Malak Faisal Orakzai</p>
                <p className="text-primary tracking-widest uppercase text-xs mt-1">Founder &amp; Chairman</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-20 border-t border-border mt-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-6">
            <span className="text-primary tracking-[0.4em] uppercase text-xs font-medium">The Vision</span>
          </motion.div>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-foreground mb-10 leading-snug">Sovereignty in Every Detail</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" custom={2} viewport={{ once: true }}
            className="text-muted-foreground font-serif text-lg leading-relaxed">
            We do not create products; we craft sensory masterpieces. Directed by the institutional vision of the Orakzai Group, Shamim Forever blends modern decentralized sophistication with the timeless artistry of high-end craftsmanship. Utilizing deep-black undertones and sovereign matte gold accents, our aesthetic reflects the depth of our devotion and the height of absolute luxury.
          </motion.p>
        </section>

        <section className="bg-secondary/20 py-20 border-y border-border">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-6">
              <span className="text-primary tracking-[0.4em] uppercase text-xs font-medium">The Sovereign Roadmap</span>
            </motion.div>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-foreground mb-16 leading-snug">Our Future Horizons</motion.h2>
            <div className="space-y-14">
              {[
                { tag: "Quarter I", title: "The Incarnation of Scent", body: "Our immediate and most sacred target. Shamim Forever will officially launch its debut signature fragrance line — the liquid embodiment of eternal love, crafted from the rarest botanical oils, housed in laser-engraved crystal vaults, designed to leave an unforgettable, royal trail." },
                { tag: "Next Horizon", title: "Elite Cosmetics & Masterpiece Jewelry", body: "Following the fragrance launch, the empire expands into bespoke cosmetics engineered for perfection, followed by our sovereign jewelry house — creating fractionalized, high-end digital asset frameworks and physical diamond-crowned masterpieces that define destiny." },
                { tag: "Global Expansion", title: "UAE & UK Markets", body: "Shamim Forever will not remain confined within borders. Backed by autonomous intelligence, our operational matrix is structured for rapid international expansion — establishing physical flagship boutiques within the elite financial hubs of the UAE and the United Kingdom." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}
                  className="flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="md:w-40 shrink-0">
                    <span className="text-primary tracking-widest uppercase text-xs font-medium">{item.tag}</span>
                  </div>
                  <div className="flex-1 border-t border-border pt-6">
                    <h3 className="font-serif text-xl text-foreground mb-4">{item.title}</h3>
                    <p className="text-muted-foreground font-serif leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-24 text-center">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl text-foreground/80 italic leading-relaxed">
            "Her name will never be forgotten. It will reign in the skies of global luxury — forever."
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }} className="mt-10">
            <div className="w-16 h-px bg-primary mx-auto mb-6" />
            <p className="text-primary tracking-[0.3em] uppercase text-xs font-medium">Shamim Forever · Est. 2025</p>
          </motion.div>
        </section>
      </div>
    );
  }
  