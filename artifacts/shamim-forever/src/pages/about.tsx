import { Link } from "wouter";
import { motion } from "framer-motion";
import bagImage from "@assets/2f410110-510d-11f1-8e10-7b4ee314b28a_1778940312197.png";
import heroImage from "@assets/1778923850516_1778940312156.png";

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-background z-0">
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={heroImage} 
            alt="Shamim Forever Heritage" 
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-gold-gradient mb-6"
          >
            Our Heritage
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground font-serif tracking-wide"
          >
            A legacy forged in gold, crafted for eternity.
          </motion.p>
        </div>
      </section>

      <section className="py-24 md:py-32 container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight">
              The Genesis of <span className="text-primary text-gold-gradient">Shamim Forever</span>
            </h2>
            <div className="space-y-6 text-muted-foreground font-serif text-lg leading-relaxed">
              <p>
                Born from an obsession with absolute perfection, Shamim Forever began as a private atelier in the heart of Pakistan. What started as bespoke commissions for the elite evolved into a house of uncompromising luxury.
              </p>
              <p>
                We do not follow trends. We observe the timeless interplay of light, shadow, and scent, distilling these elements into masterpieces that transcend generations. Every bottle, every jewel, every compact is a testament to meticulous craftsmanship.
              </p>
              <p>
                Our artisans spend countless hours perfecting a single curve, a single note, ensuring that when you hold a Shamim Forever creation, you hold a fragment of eternity.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] bg-secondary relative overflow-hidden"
          >
            <img src={bagImage} alt="Shamim Forever Craftsmanship" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
