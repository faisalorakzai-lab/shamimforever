import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductHeroShowcaseProps {
  productName: string;
  category: string;
  price: number;
  originalPrice?: number;
  articleNumber: string;
  availability: string;
  images: string[];
}

export function ProductHeroShowcase({
  productName,
  category,
  price,
  originalPrice,
  articleNumber,
  availability,
  images,
}: ProductHeroShowcaseProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="min-h-screen bg-background pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* LEFT: Massive Product Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Main Product Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-lg">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                src={images[activeImage]}
                alt={productName}
                className="w-full h-full object-cover"
              />

              {/* Gold Light Reflection */}
              <motion.div
                animate={isHovering ? { opacity: 0.3 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent pointer-events-none"
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === idx
                        ? "border-primary shadow-lg shadow-primary/50"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT: Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col space-y-8"
          >
            {/* Category */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground">
                {category}
              </span>
            </motion.div>

            {/* Product Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-6xl font-serif text-gold-gradient leading-tight"
            >
              {productName}
            </motion.h1>

            {/* Price Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="border-t border-b border-border/50 py-6 space-y-2"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl font-serif text-primary">
                  Rs {price.toLocaleString()}
                </span>
                {originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    Rs {originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Inclusive of all taxes
              </p>
            </motion.div>

            {/* Article Number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-2"
            >
              <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                Article Number
              </p>
              <p className="text-lg font-serif text-foreground">{articleNumber}</p>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  availability === "In Stock"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              />
              <span className="text-sm font-medium text-foreground">
                {availability}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
