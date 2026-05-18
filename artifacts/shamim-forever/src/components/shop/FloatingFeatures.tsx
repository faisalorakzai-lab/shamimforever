import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, Sparkles, ShoppingBag } from "lucide-react";

interface FloatingFeaturesProps {
  cartItemCount: number;
}

export function FloatingFeatures({ cartItemCount }: FloatingFeaturesProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary/30 z-40"
        style={{ width: `${scrollProgress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Features Container */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
        {/* WhatsApp Concierge */}
        <motion.a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="p-4 bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl hover:shadow-green-500/20">
            <MessageCircle className="w-6 h-6 text-green-400" />
          </div>
          <motion.div
            className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-card border border-border rounded-sm text-xs uppercase tracking-widest text-foreground whitespace-nowrap shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            WhatsApp Concierge
          </motion.div>
        </motion.a>

        {/* AI Assistant Orb */}
        <motion.button
          className="group relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="p-4 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20"
            animate={{
              boxShadow: [
                "0 0 20px rgba(212, 175, 55, 0.2)",
                "0 0 40px rgba(212, 175, 55, 0.4)",
                "0 0 20px rgba(212, 175, 55, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-card border border-border rounded-sm text-xs uppercase tracking-widest text-foreground whitespace-nowrap shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            AI Assistant
          </motion.div>
        </motion.button>

        {/* Shopping Cart Button */}
        <motion.a
          href="/checkout"
          className="group relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="p-4 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20 relative">
            <ShoppingBag className="w-6 h-6 text-primary" />
            {cartItemCount > 0 && (
              <motion.span
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {cartItemCount}
              </motion.span>
            )}
          </div>
          <motion.div
            className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-card border border-border rounded-sm text-xs uppercase tracking-widest text-foreground whitespace-nowrap shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            Shopping Bag
          </motion.div>
        </motion.a>

        {/* Scroll to Top Button */}
        {isVisible && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-4 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <motion.div
              className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-card border border-border rounded-sm text-xs uppercase tracking-widest text-foreground whitespace-nowrap shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              Back to Top
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* Mobile Floating Cart */}
      {cartItemCount > 0 && (
        <motion.div
          className="fixed bottom-8 left-8 md:hidden z-40 p-4 bg-card border border-border rounded-sm shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {cartItemCount} item{cartItemCount !== 1 ? "s" : ""}
              </span>
              <a href="/checkout" className="text-sm font-medium text-primary hover:text-primary/80">
                View Bag →
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
