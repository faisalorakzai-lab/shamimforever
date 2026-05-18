import { motion } from "framer-motion";
import { MessageCircle, Zap, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

interface FloatingElementsProps {
  onWhatsAppClick: () => void;
  onAIAssistantClick: () => void;
  cartItemCount?: number;
}

export function FloatingElements({
  onWhatsAppClick,
  onAIAssistantClick,
  cartItemCount = 0,
}: FloatingElementsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const floatingVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const expandVariants = {
    collapsed: { width: 60, height: 60 },
    expanded: { width: "auto", height: "auto" },
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={floatingVariants}
        className="fixed bottom-8 right-8 z-50 flex flex-col gap-4"
      >
        {/* Main Floating Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/50 flex items-center justify-center hover:shadow-xl transition-all"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <Zap className="w-6 h-6" />
            )}
          </motion.div>
        </motion.button>

        {/* Expanded Menu */}
        <motion.div
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={expandVariants}
          className="flex flex-col gap-3"
        >
          {isExpanded && (
            <>
              {/* WhatsApp Concierge */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onWhatsAppClick();
                  setIsExpanded(false);
                }}
                className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-6 h-6" />
              </motion.button>

              {/* AI Assistant */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowAIChat(!showAIChat);
                  setIsExpanded(false);
                }}
                className="w-14 h-14 rounded-full bg-purple-500 text-white shadow-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                title="AI Assistant"
              >
                <Zap className="w-6 h-6" />
              </motion.button>

              {/* Mini Cart */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors relative"
                title="Cart"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* AI Chat Orb */}
      {showAIChat && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          className="fixed bottom-32 right-8 z-50 w-80 bg-secondary border border-border rounded-lg shadow-2xl overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 flex justify-between items-center">
            <h3 className="font-serif text-lg">SHAMIM AI Concierge</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowAIChat(false)}
              className="hover:bg-primary-foreground/20 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {/* AI Message */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">🤖</span>
              </div>
              <div className="bg-primary/10 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-foreground font-serif">
                  Welcome to SHAMIM FOREVER. How can I assist you today? I can
                  help with product details, sizing, or place your order.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Chat Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              opacity: 0,
            }}
            animate={{
              y: -20,
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            className="absolute w-1 h-1 bg-primary rounded-full"
          />
        ))}
      </div>
    </>
  );
}
