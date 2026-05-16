import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/1778923850516_1778940312156.png";
import bagImage from "@assets/2f410110-510d-11f1-8e10-7b4ee314b28a_1778940312197.png";
import darkSmokePerfume from "@assets/5913b5a0-5130-11f1-88d3-35f5ffca1d4c_1778940393133.png";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-[100vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-background z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={heroImage} 
            alt="Shamim Forever Signature Collection" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-sm md:text-base mb-6"
          >
            The New Era of Luxury
          </motion.p>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-8 leading-tight text-gold-gradient"
          >
            Eternity in a Bottle
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/shop" className="inline-block">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-none font-serif text-lg tracking-widest uppercase">
                Explore Collection
              </Button>
            </Link>
            <Link href="/atelier" className="inline-block">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 rounded-none font-serif text-lg tracking-widest uppercase bg-transparent">
                Discover The Atelier
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 md:py-32 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-serif text-foreground text-gold-gradient">The House of Shamim</h2>
            <p className="mt-4 text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
              Curated expressions of absolute beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <Link href="/shop?category=perfumes" className="group relative aspect-[4/5] overflow-hidden bg-secondary">
              <img 
                src={darkSmokePerfume} 
                alt="Fine Fragrances" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
              <div className="absolute bottom-8 left-8 right-8 text-center border border-primary/30 p-6 backdrop-blur-sm">
                <h3 className="text-2xl md:text-3xl font-serif text-primary mb-2">Fine Fragrances</h3>
                <span className="text-foreground text-sm uppercase tracking-widest font-medium">Discover</span>
              </div>
            </Link>
            
            <Link href="/shop?category=jewelry" className="group relative aspect-[4/5] overflow-hidden bg-secondary">
              <img 
                src={bagImage} 
                alt="High Jewelry" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
              <div className="absolute bottom-8 left-8 right-8 text-center border border-primary/30 p-6 backdrop-blur-sm">
                <h3 className="text-2xl md:text-3xl font-serif text-primary mb-2">Exclusive Artifacts</h3>
                <span className="text-foreground text-sm uppercase tracking-widest font-medium">Discover</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 md:py-32 bg-secondary text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-primary font-medium tracking-[0.3em] uppercase text-sm md:text-base mb-6">Our Philosophy</h2>
          <p className="text-2xl md:text-4xl font-serif text-foreground leading-relaxed text-gold-gradient mb-12">
            "We do not create products. We distill memories, dreams, and pure gold into vessels of eternity."
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors uppercase tracking-widest text-sm font-medium">
            Read Our Story <span className="text-lg">→</span>
          </Link>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <h2 className="text-3xl font-serif text-foreground mb-4">Join The Inner Circle</h2>
          <p className="text-muted-foreground mb-8 font-serif text-lg">
            Subscribe to receive exclusive access to limited editions and private events.
          </p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-transparent border-b border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-serif text-lg"
            />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 font-serif tracking-widest uppercase">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
