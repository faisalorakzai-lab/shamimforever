import { motion } from "framer-motion";
import { Link } from "wouter";

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  badge?: string;
}

const COLLECTIONS: Collection[] = [
  {
    id: "sovereign",
    name: "Sovereign Collection",
    description: "The epitome of luxury and power, curated for those who lead",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
    productCount: 24,
    badge: "Exclusive",
  },
  {
    id: "midnight-oud",
    name: "Midnight Oud",
    description: "Mysterious and intoxicating, the essence of the night",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop",
    productCount: 18,
    badge: "Limited",
  },
  {
    id: "eternal-love",
    name: "Eternal Love",
    description: "Timeless romance captured in every note",
    image: "https://images.unsplash.com/photo-1596462502278-af407713571d?w=600&h=600&fit=crop",
    productCount: 22,
  },
  {
    id: "chairmans",
    name: "Chairman's Selection",
    description: "Hand-picked masterpieces for the most discerning palate",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop",
    productCount: 15,
    badge: "VIP",
  },
];

export function FeaturedCollections() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gold-gradient mb-4">
            Featured Collections
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Curated masterpieces that define luxury
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {COLLECTIONS.map((collection) => (
            <motion.div key={collection.id} variants={itemVariants}>
              <Link href={`/shop?collection=${collection.id}`}>
                <div className="group relative h-64 md:h-80 overflow-hidden rounded-sm cursor-pointer">
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent group-hover:via-black/20 transition-all duration-700" />
                  </div>

                  {/* Badge */}
                  {collection.badge && (
                    <motion.div
                      className="absolute top-4 right-4 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/40 rounded-sm text-xs uppercase tracking-widest text-primary font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                    >
                      {collection.badge}
                    </motion.div>
                  )}

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-primary transition-colors duration-500">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-500 line-clamp-2">
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-muted-foreground">
                          {collection.productCount} Products
                        </span>
                        <motion.span
                          className="text-xs uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          Explore →
                        </motion.span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Gold border glow on hover */}
                  <motion.div
                    className="absolute inset-0 border border-primary/0 group-hover:border-primary/40 transition-colors duration-700 rounded-sm"
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
