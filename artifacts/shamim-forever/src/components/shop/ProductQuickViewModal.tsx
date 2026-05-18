import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Truck, Shield } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  story: string;
  category: string;
}

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
}

export function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductQuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-card border border-border rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 hover:bg-primary/10 rounded-sm transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
                {/* Image section */}
                <div className="space-y-4">
                  {/* Main image */}
                  <motion.div
                    className="relative bg-secondary aspect-square overflow-hidden rounded-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={product.images[selectedImage] || product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {discount > 0 && (
                      <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest">
                        -{discount}%
                      </div>
                    )}
                  </motion.div>

                  {/* Thumbnail images */}
                  {product.images.length > 1 && (
                    <div className="flex gap-2">
                      {product.images.map((img, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`w-16 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                            selectedImage === idx
                              ? "border-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content section */}
                <div className="flex flex-col justify-between space-y-6">
                  {/* Product info */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest">
                        {product.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-serif text-foreground mt-2">
                        {product.name}
                      </h2>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl md:text-3xl font-medium text-primary">
                        Rs {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          Rs {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {product.description}
                    </p>

                    {/* Story */}
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-sm">
                      <h4 className="text-sm font-serif text-primary mb-2">The Story</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {product.story}
                      </p>
                    </div>

                    {/* OKBOND Discount Badge */}
                    <motion.div
                      className="p-4 bg-primary/10 border border-primary/30 rounded-sm"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">💳</span>
                        <div>
                          <p className="text-sm font-medium text-primary">OKBOND Privilege</p>
                          <p className="text-xs text-muted-foreground">
                            Pay with OKBOND and receive 10% privilege discount
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4 pt-6 border-t border-border">
                    {/* Quantity selector */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground uppercase tracking-widest">
                        Quantity
                      </span>
                      <div className="flex items-center border border-border rounded-sm">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-2 hover:bg-primary/10 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 text-center min-w-12">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-2 hover:bg-primary/10 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Add to cart button */}
                    <motion.button
                      onClick={() => {
                        onAddToCart(product.id, quantity);
                        onClose();
                      }}
                      className="w-full py-3 bg-primary text-primary-foreground uppercase tracking-widest font-medium rounded-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag
                    </motion.button>

                    {/* Wishlist button */}
                    <motion.button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`w-full py-3 border rounded-sm uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 ${
                        isWishlisted
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : "border-border text-foreground hover:border-primary/40"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                      {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                    </motion.button>

                    {/* Info badges */}
                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <div className="flex items-center gap-2 p-3 bg-secondary rounded-sm">
                        <Truck className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Free Shipping</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-secondary rounded-sm">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Authentic</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
