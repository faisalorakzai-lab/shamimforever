import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface RecommendedProductsProps {
  products: Product[];
  onProductClick: (productId: string) => void;
}

export function RecommendedProducts({
  products,
  onProductClick,
}: RecommendedProductsProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (!autoScroll || products.length === 0) return;

    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoScroll, products.length]);

  const handleScroll = (direction: "left" | "right") => {
    setAutoScroll(false);
    if (direction === "left") {
      setScrollPosition((prev) =>
        prev === 0 ? products.length - 1 : prev - 1
      );
    } else {
      setScrollPosition((prev) => (prev + 1) % products.length);
    }
  };

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

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
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
            You May Also Like
          </h2>
          <p className="text-muted-foreground">
            Discover other masterpieces from our collection
          </p>
        </motion.div>

        {/* Horizontal Scroll Gallery */}
        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Products Container */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${scrollPosition * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex gap-6"
            >
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -10 }}
                  onClick={() => onProductClick(product.id)}
                  className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4 cursor-pointer"
                >
                  <div className="luxury-card rounded-lg overflow-hidden group">
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                      <motion.img
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-serif text-sm tracking-widest uppercase"
                        >
                          View
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 space-y-3">
                      <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                        {product.category}
                      </p>
                      <h3 className="text-lg font-serif text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xl font-serif text-primary">
                        Rs {product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2 mt-12"
        >
          {products.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setAutoScroll(false);
                setScrollPosition(idx);
              }}
              animate={{
                width: scrollPosition === idx ? 32 : 8,
                backgroundColor:
                  scrollPosition === idx
                    ? "hsl(43 74% 52%)"
                    : "hsl(43 10% 18%)",
              }}
              className="h-2 rounded-full transition-all"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
