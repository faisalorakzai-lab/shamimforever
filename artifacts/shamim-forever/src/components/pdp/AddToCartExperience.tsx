import { motion } from "framer-motion";
import { useState } from "react";
import { ShoppingBag, Heart, Zap } from "lucide-react";

interface AddToCartExperienceProps {
  onAddToCart: (quantity: number) => void;
  onBuyNow: (quantity: number) => void;
  onAddToWishlist: () => void;
  isInWishlist: boolean;
  isLoading?: boolean;
}

export function AddToCartExperience({
  onAddToCart,
  onBuyNow,
  onAddToWishlist,
  isInWishlist,
  isLoading = false,
}: AddToCartExperienceProps) {
  const [quantity, setQuantity] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState<
    "cart" | "buy" | null
  >(null);

  const handleAddToCart = () => {
    setConfirmationType("cart");
    setShowConfirmation(true);
    onAddToCart(quantity);
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  const handleBuyNow = () => {
    setConfirmationType("buy");
    setShowConfirmation(true);
    onBuyNow(quantity);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-8"
        >
          {/* Quantity Selector */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="text-sm font-medium tracking-widest uppercase text-foreground">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-lg border border-border hover:border-primary/50 flex items-center justify-center transition-colors"
              >
                −
              </motion.button>

              <div className="flex-1 text-center">
                <motion.span
                  key={quantity}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl font-serif text-foreground"
                >
                  {quantity}
                </motion.span>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 rounded-lg border border-border hover:border-primary/50 flex items-center justify-center transition-colors"
              >
                +
              </motion.button>
            </div>
          </motion.div>

          {/* Main CTA Buttons */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Add to Bag Button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-lg font-serif text-lg tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              <ShoppingBag className="w-5 h-5" />
              {isLoading ? "Adding..." : "Add to Bag"}
            </motion.button>

            {/* Buy Now Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyNow}
              disabled={isLoading}
              className="w-full py-4 px-6 bg-secondary border-2 border-primary text-foreground rounded-lg font-serif text-lg tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-primary/10 transition-all disabled:opacity-50"
            >
              <Zap className="w-5 h-5" />
              {isLoading ? "Processing..." : "Buy Now"}
            </motion.button>

            {/* Save to Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAddToWishlist}
              className={`w-full py-3 px-6 rounded-lg font-serif text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all ${
                isInWishlist
                  ? "bg-primary/10 text-primary border border-primary"
                  : "bg-secondary border border-border hover:border-primary/50 text-foreground"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
              />
              {isInWishlist ? "In Wishlist" : "Save to Wishlist"}
            </motion.button>
          </motion.div>

          {/* Confirmation Message */}
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-center font-serif"
            >
              {confirmationType === "cart"
                ? "✓ Added to bag successfully"
                : "✓ Proceeding to checkout..."}
            </motion.div>
          )}

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pt-8 border-t border-border/30"
          >
            {[
              { icon: "🔒", label: "Secure Checkout" },
              { icon: "🚚", label: "Fast Shipping" },
              { icon: "↩️", label: "Easy Returns" },
            ].map((indicator, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div className="text-2xl mb-2">{indicator.icon}</div>
                <p className="text-xs text-muted-foreground font-medium">
                  {indicator.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
