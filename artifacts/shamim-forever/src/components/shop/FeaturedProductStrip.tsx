import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  badge: string;
  category: string;
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "1",
    name: "Midnight Oud Essence",
    price: 45000,
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=300&h=400&fit=crop",
    badge: "Best Seller",
    category: "Fragrances",
  },
  {
    id: "2",
    name: "Sovereign Diamond Ring",
    price: 250000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=400&fit=crop",
    badge: "Limited Edition",
    category: "Jewelry",
  },
  {
    id: "3",
    name: "Golden Radiance Serum",
    price: 8500,
    image: "https://images.unsplash.com/photo-1596462502278-af407713571d?w=300&h=400&fit=crop",
    badge: "Chairman Pick",
    category: "Cosmetics",
  },
  {
    id: "4",
    name: "Eternal Love Perfume",
    price: 38000,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=400&fit=crop",
    badge: "New Arrival",
    category: "Fragrances",
  },
  {
    id: "5",
    name: "Platinum Luxury Watch",
    price: 180000,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&h=400&fit=crop",
    badge: "Exclusive",
    category: "Jewelry",
  },
];

export function FeaturedProductStrip() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_PRODUCTS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURED_PRODUCTS.length);
    setIsAutoPlay(false);
  };

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
            Featured Masterpieces
          </h2>
          <p className="text-muted-foreground text-lg">
            Handpicked selections that capture the essence of luxury
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Products carousel */}
          <motion.div
            className="relative h-96 md:h-[500px] overflow-hidden rounded-sm"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {FEATURED_PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  scale: index === currentIndex ? 1 : 1.1,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                pointerEvents={index === currentIndex ? "auto" : "none"}
              >
                {/* Background image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
                  {/* Badge */}
                  <motion.div
                    className="w-fit px-4 py-2 bg-primary/20 backdrop-blur-md border border-primary/40 rounded-sm"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="text-xs uppercase tracking-widest text-primary font-medium">
                      {product.badge}
                    </span>
                  </motion.div>

                  {/* Product info */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                        {product.category}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-serif text-white">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-2xl md:text-3xl font-medium text-primary">
                        Rs {product.price.toLocaleString()}
                      </span>
                      <motion.a
                        href="#"
                        className="px-6 py-2 border border-primary text-primary uppercase tracking-widest text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors rounded-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 pointer-events-none">
            <motion.button
              onClick={handlePrev}
              className="pointer-events-auto p-2 md:p-3 bg-primary/20 hover:bg-primary/40 border border-primary/40 hover:border-primary/60 rounded-sm transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="pointer-events-auto p-2 md:p-3 bg-primary/20 hover:bg-primary/40 border border-primary/40 hover:border-primary/60 rounded-sm transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {FEATURED_PRODUCTS.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlay(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-primary/30 w-2 hover:bg-primary/50"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
