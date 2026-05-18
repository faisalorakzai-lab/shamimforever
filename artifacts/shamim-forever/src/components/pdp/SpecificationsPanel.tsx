import { motion } from "framer-motion";
import { useState } from "react";

interface Specification {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SpecificationsPanelProps {
  specifications: Specification[];
}

export function SpecificationsPanel({
  specifications,
}: SpecificationsPanelProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-24 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
              Technical Specifications
            </h2>
            <p className="text-muted-foreground text-lg">
              Crafted with precision. Engineered for eternity.
            </p>
          </div>

          {/* Specifications Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {specifications.map((spec, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div
                  className="luxury-card p-8 cursor-pointer hover:shadow-lg transition-all duration-300 rounded-lg"
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                >
                  {/* Spec Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      {spec.icon && (
                        <div className="text-primary text-2xl mt-1">
                          {spec.icon}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-serif text-foreground group-hover:text-primary transition-colors">
                          {spec.label}
                        </h3>
                      </div>
                    </div>
                    <div className="w-1 h-8 bg-gradient-to-b from-primary to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Spec Value */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: expandedIndex === index ? 1 : 0.7,
                      height: "auto",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed font-serif">
                      {spec.value}
                    </p>
                  </motion.div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-primary/20 via-primary/5 to-transparent mt-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 pt-16 border-t border-border/30"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Certified", value: "100% Authentic" },
                { label: "Warranty", value: "Lifetime Guarantee" },
                { label: "Shipping", value: "Worldwide" },
                { label: "Returns", value: "30-Day Policy" },
              ].map((badge, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
                    {badge.label}
                  </p>
                  <p className="text-sm text-foreground font-serif">
                    {badge.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
