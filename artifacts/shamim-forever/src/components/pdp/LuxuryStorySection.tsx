import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface LuxuryStorySectionProps {
  craftsmanshipStory: string;
  materialOrigin: string;
  inspiration: string;
}

export function LuxuryStorySection({
  craftsmanshipStory,
  materialOrigin,
  inspiration,
}: LuxuryStorySectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto space-y-16"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
              The Story Behind
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </motion.div>

          {/* Craftsmanship Story */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-serif text-foreground tracking-wide">
              Craftsmanship
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed font-serif">
              {craftsmanshipStory}
            </p>
            <p className="text-sm text-primary font-medium italic">
              "This piece is not manufactured. It is crafted."
            </p>
          </motion.div>

          {/* Material Origin */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-serif text-foreground tracking-wide">
              Material Origin
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed font-serif">
              {materialOrigin}
            </p>
          </motion.div>

          {/* Inspiration */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-serif text-foreground tracking-wide">
              Inspiration
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed font-serif">
              {inspiration}
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-12"
          />

          {/* Cinematic Quote */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4 py-12"
          >
            <p className="text-2xl md:text-3xl font-serif text-gold-gradient italic leading-relaxed">
              "A masterpiece is not just seen. It is felt, experienced, and
              cherished for generations."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Hook for intersection observer
function useInView(options: any) {
  const [ref, setRef] = React.useState(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.triggerOnce) {
          observer.unobserve(entry.target);
        }
      }
    }, options);

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return { ref: setRef, inView };
}

import React from "react";
