import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Globe,
  Sparkles,
  Lock,
  Award,
  Truck,
  RefreshCw,
} from "lucide-react";

interface TrustElement {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function LuxuryTrustSection() {
  const trustElements: TrustElement[] = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Authenticity Guaranteed",
      description: "100% certified genuine products with blockchain verification",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Secure Payment",
      description: "Military-grade encryption for all transactions",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Worldwide Shipping",
      description: "Insured delivery to over 150 countries",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Luxury Certification",
      description: "Authenticated by international luxury authorities",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Express Delivery",
      description: "Premium packaging with white-glove service",
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "30-Day Returns",
      description: "Hassle-free return policy for complete peace of mind",
    },
  ];

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
    <section className="py-24 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
            Luxury & Trust
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every purchase is backed by our commitment to excellence,
            authenticity, and customer satisfaction.
          </p>
        </motion.div>

        {/* Trust Elements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {trustElements.map((element, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="luxury-card p-8 rounded-lg group"
            >
              {/* Icon Container */}
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary/20 transition-colors"
              >
                {element.icon}
              </motion.div>

              {/* Content */}
              <h3 className="text-lg font-serif text-foreground mb-2">
                {element.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {element.description}
              </p>

              {/* Accent Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="h-1 bg-gradient-to-r from-primary to-transparent mt-4 origin-left"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Blockchain Certificate Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="luxury-card p-12 rounded-lg border-primary/30 bg-primary/5 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6"
          >
            <Sparkles className="w-10 h-10 text-primary" />
          </motion.div>

          <h3 className="text-2xl font-serif text-foreground mb-3">
            Blockchain Certificate
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Every SHAMIM FOREVER piece comes with a unique blockchain-verified
            certificate of authenticity. This immutable digital record ensures
            complete provenance tracking and lifetime authenticity verification.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-serif text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            View Certificate
          </motion.button>
        </motion.div>

        {/* Bottom Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-border/30 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "50K+", label: "Satisfied Customers" },
            { number: "100%", label: "Authentic Products" },
            { number: "150+", label: "Countries Served" },
            { number: "24/7", label: "Customer Support" },
          ].map((stat, idx) => (
            <motion.div key={idx} whileHover={{ y: -5 }}>
              <p className="text-3xl font-serif text-gold-gradient mb-2">
                {stat.number}
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
