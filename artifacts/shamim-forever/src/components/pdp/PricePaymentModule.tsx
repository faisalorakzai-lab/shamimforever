import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

interface PricePaymentModuleProps {
  priceInPKR: number;
  priceInUSD: number;
  priceInUSDT: number;
  priceInUSDC: number;
  onPaymentMethodChange: (method: string) => void;
}

export function PricePaymentModule({
  priceInPKR,
  priceInUSD,
  priceInUSDT,
  priceInUSDC,
  onPaymentMethodChange,
}: PricePaymentModuleProps) {
  const [selectedPayment, setSelectedPayment] = useState("PKR");
  const [showOKBondDiscount, setShowOKBondDiscount] = useState(false);

  const paymentMethods = [
    { id: "PKR", label: "PKR", price: priceInPKR, flag: "🇵🇰" },
    { id: "USD", label: "USD", price: priceInUSD, flag: "🇺🇸" },
    { id: "USDT", label: "USDT", price: priceInUSDT, flag: "⛓️" },
    { id: "USDC", label: "USDC", price: priceInUSDC, flag: "⛓️" },
  ];

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPayment(method);
    onPaymentMethodChange(method);
  };

  const okbondDiscount = Math.floor(priceInPKR * 0.1);
  const priceAfterDiscount = priceInPKR - okbondDiscount;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-12"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
              Pricing & Payment
            </h2>
            <p className="text-muted-foreground">
              Flexible payment options for your luxury purchase
            </p>
          </motion.div>

          {/* Currency Selection */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="text-sm font-medium tracking-widest uppercase text-foreground">
              Select Currency
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {paymentMethods.map((method) => (
                <motion.button
                  key={method.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePaymentMethodChange(method.id)}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedPayment === method.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-secondary hover:border-primary/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{method.flag}</span>
                    <span className="font-serif text-sm text-foreground">
                      {method.label}
                    </span>
                  </div>

                  {selectedPayment === method.id && (
                    <motion.div
                      layoutId="currencyCheck"
                      className="absolute top-2 right-2"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Price Display */}
          <motion.div
            variants={itemVariants}
            className="luxury-card p-8 rounded-lg"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price</span>
                <span className="text-2xl font-serif text-primary">
                  {selectedPayment === "PKR"
                    ? `Rs ${priceInPKR.toLocaleString()}`
                    : selectedPayment === "USD"
                      ? `$${priceInUSD.toLocaleString()}`
                      : `${selectedPayment} ${(selectedPayment === "USDT" ? priceInUSDT : priceInUSDC).toLocaleString()}`}
                </span>
              </div>

              <div className="h-px bg-border/30" />

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Taxes & Duties</span>
                <span className="text-foreground">Included</span>
              </div>
            </div>
          </motion.div>

          {/* OKBOND Payment Option */}
          <motion.div
            variants={itemVariants}
            className="luxury-card p-8 rounded-lg border-primary/30 bg-primary/5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg">💳</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-foreground">
                      Pay with OKBOND
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Instant 10% discount
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowOKBondDiscount(!showOKBondDiscount)}
                  className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  {showOKBondDiscount ? "Hide" : "Show"}
                </motion.button>
              </div>

              {showOKBondDiscount && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 pt-4 border-t border-primary/20"
                >
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Original Price</span>
                    <span className="font-serif">Rs {priceInPKR.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-400">
                    <span className="text-muted-foreground">OKBOND Discount (10%)</span>
                    <span className="font-serif">-Rs {okbondDiscount.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-border/30" />
                  <div className="flex justify-between">
                    <span className="font-serif text-foreground">Final Price</span>
                    <span className="text-xl font-serif text-primary">
                      Rs {priceAfterDiscount.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Payment Info */}
          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-muted-foreground space-y-2"
          >
            <p>✓ Secure payment processing</p>
            <p>✓ Multiple payment gateway support</p>
            <p>✓ Cryptocurrency accepted</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
