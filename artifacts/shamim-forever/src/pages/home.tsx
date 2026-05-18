import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@assets/1778923850516_1778940312156.png";
import bagImage from "@assets/2f410110-510d-11f1-8e10-7b4ee314b28a_1778940312197.png";
import darkSmokePerfume from "@assets/5913b5a0-5130-11f1-88d3-35f5ffca1d4c_1778940393133.png";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════
// 1. CINEMATIC INTRO LOADER
// ═══════════════════════════════════════════════════════
function CinematicLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center"
    >
      {/* Floating gold particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold-gradient rounded-full"
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * 800 - 400,
            y: Math.random() * 800 - 400,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Logo reveal */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="text-center z-10"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-serif text-gold-gradient mb-4 tracking-widest"
          initial={{ letterSpacing: "0.5em", opacity: 0 }}
          animate={{ letterSpacing: "0.2em", opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          SHAMIM
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-white/80 font-light tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          A Sovereign Luxury House
        </motion.p>
      </motion.div>

      {/* Fade transition line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-gradient to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════
// 2. HERO SECTION WITH THREE.JS OBJECT
// ═══════════════════════════════════════════════════════
function HeroSection() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Floating animation for the 3D object placeholder
    const animate = () => {
      if (canvasRef.current) {
        gsap.to(canvasRef.current, {
          y: Math.sin(Date.now() / 1000) * 20,
          rotation: (Date.now() / 50) % 360,
          duration: 0,
        });
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <section className="relative h-[90vh] md:h-[100vh] w-full overflow-hidden flex items-center justify-center pt-20">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-background z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroImage}
          alt="Shamim Forever Signature Collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* 3D Object Placeholder (luxury ring/perfume bottle) */}
      <motion.div
        ref={canvasRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 z-5"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-gold-gradient via-white/10 to-transparent blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-primary font-medium tracking-[0.3em] uppercase text-sm md:text-base mb-6"
        >
          The New Era of Luxury
        </motion.p>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-8 leading-tight text-gold-gradient"
        >
          Built From Love.
          <br />
          Forged Into Legacy.
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground mb-12 font-light"
        >
          Pakistan's First Sovereign Luxury House.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/shop" className="inline-block">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-none font-serif text-lg tracking-widest uppercase"
            >
              Explore Collection
            </Button>
          </Link>
          <Link href="/atelier" className="inline-block">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 rounded-none font-serif text-lg tracking-widest uppercase bg-transparent"
            >
              The Chairman
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// 3. LEGACY STORY SECTION
// ═══════════════════════════════════════════════════════
function LegacyStorySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Luxury portrait placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="aspect-[3/4] rounded-lg overflow-hidden"
          >
            <img
              src={heroImage}
              alt="Shamim Forever Founder"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right: Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-6">
              The Shamim Story
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6">
              Born from a vision of timeless elegance, Shamim Forever represents the pinnacle of
              Pakistani luxury craftsmanship. Each piece is a testament to heritage, artistry, and
              an unwavering commitment to perfection.
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
              We do not create products. We distill memories, dreams, and pure gold into vessels of
              eternity.
            </p>

            {/* Gold light sweep effect */}
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-gold-gradient to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// 4. COLLECTIONS SHOWCASE
// ═══════════════════════════════════════════════════════
function CollectionsShowcase() {
  const collections = [
    { name: "Sovereign Collection", image: heroImage },
    { name: "Midnight Oud", image: bagImage },
    { name: "Eternal Love", image: darkSmokePerfume },
    { name: "Chairman's Selection", image: heroImage },
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-gold-gradient"
          >
            Curated Collections
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {collections.map((collection, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />

              {/* Gold glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "inset 0 0 40px rgba(212, 175, 55, 0.2)",
                }}
              />

              <div className="absolute bottom-8 left-8 right-8 text-center border border-primary/30 p-6 backdrop-blur-sm rounded">
                <h3 className="text-2xl md:text-3xl font-serif text-primary mb-2">
                  {collection.name}
                </h3>
                <span className="text-foreground text-sm uppercase tracking-widest font-medium">
                  Discover
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// 5. FEATURED PRODUCT SECTION
// ═══════════════════════════════════════════════════════
function FeaturedProductSection() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Product Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square rounded-lg overflow-hidden"
          >
            <img
              src={bagImage}
              alt="Featured Product"
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-gold-gradient/20 to-transparent"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Right: Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
              Limited Edition
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-6">
              Sovereign Ring
            </h2>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
                  Article Number
                </p>
                <p className="text-lg font-serif">SF-SR-001</p>
              </div>

              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
                  Materials
                </p>
                <p className="text-lg font-serif">18K Gold, Royal Blue Sapphire, Diamonds</p>
              </div>

              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
                  Description
                </p>
                <p className="text-lg font-serif text-muted-foreground leading-relaxed">
                  A masterpiece of craftsmanship, this sovereign ring embodies the essence of luxury
                  and heritage. Each stone is hand-selected and set by master artisans.
                </p>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-none font-serif text-lg tracking-widest uppercase w-full"
              >
                Acquire Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// 6. FRAGRANCE EXPERIENCE SECTION
// ═══════════════════════════════════════════════════════
function FragranceExperienceSection() {
  const fragranceNotes = [
    { title: "Top Notes", description: "Bergamot, Pink Pepper, Saffron" },
    { title: "Heart Notes", description: "Oud, Rose, Jasmine" },
    { title: "Base Notes", description: "Sandalwood, Amber, Musk" },
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary border-t border-border/50 relative overflow-hidden">
      {/* Smoke animation background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 bg-gradient-to-t from-primary/20 to-transparent rounded-full blur-3xl"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4"
          >
            Fragrance Experience
          </motion.h2>
          <p className="text-muted-foreground text-lg font-light">
            A journey through scent and memory
          </p>
        </div>

        {/* Fragrance Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {fragranceNotes.map((note, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="text-center p-8 border border-primary/20 rounded-lg backdrop-blur-sm hover:border-primary/40 transition-colors"
            >
              <h3 className="text-2xl font-serif text-primary mb-4">{note.title}</h3>
              <p className="text-muted-foreground font-light">{note.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/shop?category=fragrances" className="inline-block">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-none font-serif text-lg tracking-widest uppercase"
            >
              Discover Fragrance
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// 7. INNER CIRCLE SECTION
// ═══════════════════════════════════════════════════════
function InnerCircleSection() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative p-12 md:p-16 border border-primary/30 rounded-lg backdrop-blur-sm bg-secondary/50"
        >
          {/* Gold edge lighting */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: "inset 0 0 60px rgba(212, 175, 55, 0.15)",
            }}
          />

          <div className="relative z-10 text-center">
            <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6">
              Exclusive Access
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-6">
              Access Reserved For The Few
            </h2>
            <p className="text-lg text-muted-foreground font-light mb-12 leading-relaxed">
              Join an elite circle of connoisseurs and gain exclusive access to limited editions,
              private events, and personalized concierge services.
            </p>

            <Link href="/inner-circle" className="inline-block">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-none font-serif text-lg tracking-widest uppercase"
              >
                Join The Inner Circle
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// 8. DIGITAL AUTHENTICITY SECTION
// ═══════════════════════════════════════════════════════
function DigitalAuthenticitySection() {
  return (
    <section className="py-24 md:py-32 bg-secondary border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4"
          >
            Digital Authenticity
          </motion.h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Every item carries a sovereign ownership certificate verified on the blockchain.
          </p>
        </div>

        {/* Animated blockchain nodes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "NFT Ownership", icon: "🔐" },
            { title: "Blockchain Verified", icon: "⛓️" },
            { title: "QR Authenticity", icon: "✓" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="p-8 border border-primary/20 rounded-lg text-center hover:border-primary/40 transition-colors"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-serif text-primary">{item.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/blockchain-authenticity" className="inline-block">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 rounded-none font-serif text-lg tracking-widest uppercase"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// 9. PRESTIGE SECTION (Editorial/Testimonials)
// ═══════════════════════════════════════════════════════
function PrestigeSection() {
  const testimonials = [
    {
      quote: "Shamim Forever is not just a brand; it's a philosophy of timeless elegance.",
      author: "Connoisseur of Fine Arts",
    },
    {
      quote: "Each piece tells a story of heritage, craftsmanship, and uncompromising quality.",
      author: "Luxury Curator",
    },
    {
      quote: "A sovereign expression of Pakistan's artistic and cultural excellence.",
      author: "International Collector",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-gold-gradient"
          >
            Prestige & Recognition
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="p-8 border border-primary/20 rounded-lg backdrop-blur-sm hover:border-primary/40 transition-colors"
            >
              <p className="text-lg font-serif text-foreground mb-6 italic">
                "{testimonial.quote}"
              </p>
              <p className="text-primary font-medium tracking-widest uppercase text-sm">
                — {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// 10. CONCIERGE FOOTER
// ═══════════════════════════════════════════════════════
function ConciergeFooter() {
  return (
    <footer className="py-16 md:py-24 bg-secondary border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* WhatsApp Concierge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-lg font-serif text-primary mb-4">WhatsApp Concierge</h3>
            <p className="text-muted-foreground font-light mb-4">
              Personal assistance available 24/7
            </p>
            <a
              href="https://wa.me/923001234567"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              +92 300 1234567
            </a>
          </motion.div>

          {/* VIP Consultation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-lg font-serif text-primary mb-4">VIP Consultation</h3>
            <p className="text-muted-foreground font-light mb-4">
              Schedule a private appointment
            </p>
            <Link href="/concierge" className="text-primary hover:text-primary/80 transition-colors font-medium">
              Book Now
            </Link>
          </motion.div>

          {/* Boutique Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-lg font-serif text-primary mb-4">Boutique Locations</h3>
            <p className="text-muted-foreground font-light mb-4">
              Visit our flagship stores
            </p>
            <Link href="/boutiques" className="text-primary hover:text-primary/80 transition-colors font-medium">
              Find Boutiques
            </Link>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-lg font-serif text-primary mb-4">Payment Methods</h3>
            <p className="text-muted-foreground font-light mb-4">
              Multiple secure payment options
            </p>
            <p className="text-sm text-muted-foreground">Card • Wallet • Crypto</p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-muted-foreground text-sm font-light text-center md:text-left">
            © 2026 Shamim Forever. All rights reserved. Crafted with luxury and precision.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {["Instagram", "LinkedIn", "Twitter", "Facebook"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium uppercase tracking-widest"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN HOME PAGE COMPONENT
// ═══════════════════════════════════════════════════════
export default function Home() {
  return (
    <div className="w-full">
      <AnimatePresence>
        <CinematicLoader />
      </AnimatePresence>

      <HeroSection />
      <LegacyStorySection />
      <CollectionsShowcase />
      <FeaturedProductSection />
      <FragranceExperienceSection />
      <InnerCircleSection />
      <DigitalAuthenticitySection />
      <PrestigeSection />
      <ConciergeFooter />
    </div>
  );
}
