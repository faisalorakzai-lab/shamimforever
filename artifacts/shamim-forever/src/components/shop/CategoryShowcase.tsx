import { motion } from "framer-motion";
import { Link } from "wouter";

interface Category {
  slug: string;
  label: string;
  description: string;
  image: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  {
    slug: "fine-fragrances",
    label: "Perfume & Fragrances",
    description: "Exquisite scents curated for the discerning",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&h=1000&fit=crop",
    icon: "🌸",
  },
  {
    slug: "high-jewelry",
    label: "High Jewelry",
    description: "Timeless pieces of unparalleled elegance",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop",
    icon: "💎",
  },
  {
    slug: "cosmetics",
    label: "Cosmetics & Grooming",
    description: "Premium beauty crafted to perfection",
    image: "https://images.unsplash.com/photo-1596462502278-af407713571d?w=800&h=1000&fit=crop",
    icon: "✨",
  },
];

export function CategoryShowcase() {
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="collections" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gold-gradient mb-4">
            The Sovereign Collections
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three pillars of luxury, each representing the pinnacle of craftsmanship
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CATEGORIES.map((category, index) => (
            <motion.div key={category.slug} variants={itemVariants}>
              <Link href={`/shop?category=${category.slug}`}>
                <div className="group relative h-96 md:h-[500px] overflow-hidden cursor-pointer">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={category.image}
                      alt={category.label}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/30 transition-all duration-700" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                    {/* Icon */}
                    <div className="text-4xl md:text-5xl opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                      {category.icon}
                    </div>

                    {/* Text content at bottom */}
                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-primary transition-colors duration-500">
                        {category.label}
                      </h3>
                      <p className="text-sm md:text-base text-gray-300 group-hover:text-gray-100 transition-colors duration-500">
                        {category.description}
                      </p>

                      {/* Glassmorphism label with hover effect */}
                      <motion.div
                        className="inline-block mt-4 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-xs uppercase tracking-widest text-white group-hover:text-primary transition-colors duration-500">
                          Explore →
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Gold border animation on hover */}
                  <motion.div
                    className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 transition-colors duration-700"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
