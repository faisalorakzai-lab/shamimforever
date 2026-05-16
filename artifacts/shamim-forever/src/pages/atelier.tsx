import { motion } from "framer-motion";
import e3Image from "@assets/e3e13d10-510d-11f1-8e10-7b4ee314b28a_1778940393161.png";
import bagImage from "@assets/2f410110-510d-11f1-8e10-7b4ee314b28a_1778940312197.png";

export default function Atelier() {
  return (
    <div className="bg-background min-h-screen">
      <section className="py-24 md:py-32 container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-gold-gradient mb-6"
          >
            The Atelier
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto"
          >
            Where time slows down and perfection is coaxed into existence.
          </motion.p>
        </div>

        <div className="space-y-32">
          {/* Section 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] overflow-hidden"
            >
              <img src={e3Image} alt="The Craft" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:pl-12"
            >
              <span className="text-primary tracking-[0.3em] uppercase text-sm mb-4 block">The Process</span>
              <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6 leading-tight">Sourcing the Rare</h2>
              <p className="text-muted-foreground font-serif text-lg leading-relaxed mb-6">
                Our ingredients are sourced from the furthest reaches of the globe. From the misty valleys of Grasse to the deep forests of Southeast Asia, we only accept the top 1% of harvests.
              </p>
              <p className="text-muted-foreground font-serif text-lg leading-relaxed">
                Many of our absolutes take years to age properly. We wait. Perfection cannot be rushed.
              </p>
            </motion.div>
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:pr-12 order-2 lg:order-1"
            >
              <span className="text-primary tracking-[0.3em] uppercase text-sm mb-4 block">The Vessel</span>
              <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6 leading-tight">Master Enamelers</h2>
              <p className="text-muted-foreground font-serif text-lg leading-relaxed mb-6">
                A fragrance of such magnitude demands a vessel worthy of its contents. Our bottles are hand-blown by master glassmakers and finished with real gold detailing.
              </p>
              <p className="text-muted-foreground font-serif text-lg leading-relaxed">
                Each Shamim Forever piece is hand-polished and inspected under magnification before it is allowed to bear our mark.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] overflow-hidden order-1 lg:order-2"
            >
              <img src={bagImage} alt="The Vessel" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
