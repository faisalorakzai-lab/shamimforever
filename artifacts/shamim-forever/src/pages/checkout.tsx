import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Lock, ShieldCheck, Globe, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { useCreateOrder } from "@workspace/api-client-react";

type PaymentMethod = "pkr_jazzcash" | "pkr_easypaisa" | "pkr_bank" | "usd_stripe" | "usdt_crypto" | "usdc_crypto" | "okbond";
type Currency = "PKR" | "USD" | "USDT" | "USDC" | "OKBOND";

interface CurrencyRate {
  symbol: string;
  rate: number;
  decimals: number;
}

const CURRENCY_RATES: Record<Currency, CurrencyRate> = {
  PKR: { symbol: "Rs", rate: 1, decimals: 0 },
  USD: { symbol: "$", rate: 0.0036, decimals: 2 },
  USDT: { symbol: "USDT", rate: 0.0036, decimals: 2 },
  USDC: { symbol: "USDC", rate: 0.0036, decimals: 2 },
  OKBOND: { symbol: "OKBOND", rate: 0.0036, decimals: 2 }
};

const PAYMENT_METHODS = {
  pkr_jazzcash: { label: "JazzCash", category: "PKR", icon: "💳" },
  pkr_easypaisa: { label: "EasyPaisa", category: "PKR", icon: "📱" },
  pkr_bank: { label: "Bank Transfer", category: "PKR", icon: "🏦" },
  usd_stripe: { label: "Stripe Checkout", category: "USD", icon: "💳" },
  usdt_crypto: { label: "USDT (Crypto)", category: "USDT", icon: "₿" },
  usdc_crypto: { label: "USDC (Crypto)", category: "USDC", icon: "₿" },
  okbond: { label: "OKBOND (10% OFF)", category: "OKBOND", icon: "⭐" }
};

export default function Checkout() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const [location, setLocation] = useLocation();
  const createOrder = useCreateOrder();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("PKR");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("pkr_jazzcash");
  const [showAISuggestion, setShowAISuggestion] = useState(true);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const shipping = 500;
  const baseTotal = subtotal + (items.length > 0 ? shipping : 0);
  
  // Calculate discount for OKBOND
  const discount = selectedCurrency === "OKBOND" ? baseTotal * 0.10 : 0;
  const finalTotal = baseTotal - discount;
  
  // Convert to selected currency
  const rate = CURRENCY_RATES[selectedCurrency].rate;
  const convertedTotal = selectedCurrency === "PKR" ? finalTotal : Math.round(finalTotal * rate * 100) / 100;
  const convertedSubtotal = selectedCurrency === "PKR" ? subtotal : Math.round(subtotal * rate * 100) / 100;
  const convertedShipping = selectedCurrency === "PKR" ? shipping : Math.round(shipping * rate * 100) / 100;
  const convertedDiscount = selectedCurrency === "PKR" ? discount : Math.round(discount * rate * 100) / 100;

  const formatCurrency = (amount: number, currency: Currency) => {
    const currencyInfo = CURRENCY_RATES[currency];
    if (currencyInfo.decimals === 0) {
      return `${currencyInfo.symbol} ${Math.round(amount).toLocaleString()}`;
    }
    return `${currencyInfo.symbol} ${amount.toFixed(currencyInfo.decimals)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      setStep(3);
      window.scrollTo(0, 0);
    } else {
      createOrder.mutate({
        data: {
          items: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            engravingText: item.engravingText || undefined
          })),
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
            phone: formData.phone
          },
          paymentMethod: selectedPaymentMethod,
          guestEmail: formData.email
        }
      }, {
        onSuccess: (order) => {
          clearCart();
          setLocation(`/order-success?id=${order.id}`);
        }
      });
    }
  };

  if (items.length === 0 && step === 1) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif text-gold-gradient mb-6">Your Vault is Empty</h2>
        <p className="text-muted-foreground mb-8">Begin your journey to absolute luxury.</p>
        <Link href="/shop">
          <Button className="bg-primary text-primary-foreground font-serif tracking-widest uppercase rounded-none px-8">
            Explore Collections
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold transition-all ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
                animate={{ scale: step === s ? 1.1 : 1 }}
              >
                {s}
              </motion.div>
              {s < 3 && <div className={`w-12 h-1 transition-colors ${step > s ? "bg-primary" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Main Form Area */}
          <div className="flex-1 order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Step 1: Shipping Details */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h2 className="text-3xl font-serif text-foreground mb-2">Shipping Details</h2>
                    <p className="text-muted-foreground">Provide your delivery information</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif text-foreground mb-6">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">First Name</label>
                        <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-transparent border-b-2 border-border px-0 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Last Name</label>
                        <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-transparent border-b-2 border-border px-0 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b-2 border-border px-0 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone Number</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b-2 border-border px-0 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif text-foreground mb-6">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Street Address</label>
                        <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-transparent border-b-2 border-border px-0 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">City</label>
                        <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-transparent border-b-2 border-border px-0 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Postal Code</label>
                        <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full bg-transparent border-b-2 border-border px-0 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Country</label>
                        <select disabled name="country" value={formData.country} className="w-full bg-transparent border-b-2 border-border px-0 py-3 text-foreground focus:outline-none focus:border-primary transition-colors opacity-70">
                          <option>Pakistan</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif text-lg tracking-widest uppercase mt-8 py-6 shadow-lg hover:shadow-xl transition-all">
                    Continue to Payment
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Currency & Payment Selection */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h2 className="text-3xl font-serif text-foreground mb-2">Payment Method</h2>
                    <p className="text-muted-foreground">Select your preferred currency and payment option</p>
                  </div>

                  {/* Currency Selection */}
                  <div>
                    <h3 className="text-lg font-serif text-foreground mb-6">Select Currency</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {(["PKR", "USD", "USDT", "USDC", "OKBOND"] as Currency[]).map((currency) => (
                        <motion.button
                          key={currency}
                          type="button"
                          onClick={() => setSelectedCurrency(currency)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-4 rounded-lg border-2 transition-all text-center font-serif ${
                            selectedCurrency === currency
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-secondary/30 text-foreground hover:border-primary/50"
                          }`}
                        >
                          <div className="text-lg font-bold mb-1">{currency}</div>
                          {currency === "OKBOND" && <div className="text-xs text-primary">-10%</div>}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h3 className="text-lg font-serif text-foreground mb-6">Payment Options</h3>
                    <div className="space-y-4">
                      {(Object.entries(PAYMENT_METHODS) as [PaymentMethod, typeof PAYMENT_METHODS[PaymentMethod]][]).map(([method, details]) => (
                        <motion.label
                          key={method}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-start gap-4 p-6 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedPaymentMethod === method
                              ? "border-primary bg-primary/5"
                              : "border-border bg-secondary/30 hover:border-primary/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={selectedPaymentMethod === method}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                            className="mt-1 accent-primary w-5 h-5"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">{details.icon}</span>
                              <span className="font-serif text-lg text-foreground">{details.label}</span>
                            </div>
                            {method === "okbond" && (
                              <p className="text-sm text-primary font-medium mb-2">✨ Exclusive 10% discount with OKBOND loyalty token</p>
                            )}
                            {method.startsWith("pkr_") && (
                              <p className="text-sm text-muted-foreground">Local payment method for Pakistan</p>
                            )}
                            {method === "usd_stripe" && (
                              <p className="text-sm text-muted-foreground">Secure global card payments via Stripe</p>
                            )}
                            {method.includes("crypto") && (
                              <p className="text-sm text-muted-foreground">Blockchain-verified cryptocurrency payment</p>
                            )}
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Luxury Trust Section */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/30 rounded-lg p-6 space-y-4">
                    <h3 className="font-serif text-lg text-foreground flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      Luxury Trust Guarantee
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Secure encrypted checkout with SSL/TLS</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Authenticity guaranteed on all items</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Blockchain verification ready</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Worldwide insured shipping included</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 border-2 border-primary text-primary hover:bg-primary/10 rounded-none font-serif tracking-widest uppercase py-6 bg-transparent">
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif text-lg tracking-widest uppercase py-6 shadow-lg hover:shadow-xl transition-all">
                      Review Order
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Order Confirmation */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h2 className="text-3xl font-serif text-foreground mb-2">Confirm Luxury Order</h2>
                    <p className="text-muted-foreground">Review your order details before completing purchase</p>
                  </div>

                  {/* Order Summary in Step 3 */}
                  <div className="bg-secondary/30 border-2 border-border rounded-lg p-8 space-y-6">
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-4">Shipping Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <p><span className="text-foreground font-medium">{formData.firstName} {formData.lastName}</span></p>
                        <p><span className="text-foreground font-medium">{formData.email}</span></p>
                        <p><span className="text-foreground font-medium">{formData.phone}</span></p>
                        <p><span className="text-foreground font-medium">{formData.address}</span></p>
                        <p><span className="text-foreground font-medium">{formData.city}, {formData.postalCode}</span></p>
                        <p><span className="text-foreground font-medium">{formData.country}</span></p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="font-serif text-lg text-foreground mb-4">Payment Method</h3>
                      <div className="text-sm">
                        <p className="text-muted-foreground mb-2">Currency: <span className="text-foreground font-medium">{selectedCurrency}</span></p>
                        <p className="text-muted-foreground">Method: <span className="text-foreground font-medium">{PAYMENT_METHODS[selectedPaymentMethod].label}</span></p>
                      </div>
                    </div>
                  </div>

                  {/* AI Suggestion */}
                  {showAISuggestion && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border-2 border-amber-500/30 rounded-lg p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-2xl">✨</span>
                          <div>
                            <h4 className="font-serif text-foreground mb-1">AI Recommendation</h4>
                            <p className="text-sm text-muted-foreground">You qualify for free express shipping! Your order will arrive in 2-3 business days.</p>
                          </div>
                        </div>
                        <button onClick={() => setShowAISuggestion(false)} className="text-muted-foreground hover:text-foreground">✕</button>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 border-2 border-primary text-primary hover:bg-primary/10 rounded-none font-serif tracking-widest uppercase py-6 bg-transparent">
                      Back
                    </Button>
                    <Button type="submit" disabled={createOrder.isPending} size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif text-lg tracking-widest uppercase py-6 shadow-lg hover:shadow-xl transition-all">
                      {createOrder.isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⏳</span> Processing...
                        </span>
                      ) : (
                        "CONFIRM LUXURY ORDER"
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[420px] order-1 lg:order-2 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-2 border-primary/30 rounded-lg p-6 md:p-8 sticky top-28 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-serif text-foreground mb-6 border-b-2 border-primary/30 pb-4">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item, index) => (
                  <div key={`${item.productId}-${index}`} className="flex gap-4">
                    <div className="w-20 h-24 bg-secondary/50 rounded-lg shrink-0 overflow-hidden">
                      {item.product?.images?.[0] && <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm leading-tight text-foreground pr-4">{item.product?.name}</h4>
                        {step === 1 && (
                          <button onClick={() => removeItem(item.productId)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {item.engravingText && (
                        <p className="text-xs text-primary mt-1">Engraving: {item.engravingText}</p>
                      )}
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium tracking-wider">{formatCurrency((item.product?.price || 0) * item.quantity * (selectedCurrency === "PKR" ? 1 : CURRENCY_RATES[selectedCurrency].rate), selectedCurrency)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t-2 border-primary/30 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-widest">Subtotal</span>
                  <span className="tracking-wider font-medium">{formatCurrency(convertedSubtotal, selectedCurrency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-widest">Shipping</span>
                  <span className="tracking-wider font-medium">{formatCurrency(convertedShipping, selectedCurrency)}</span>
                </div>
                {convertedDiscount > 0 && (
                  <div className="flex justify-between text-sm bg-primary/10 -mx-4 px-4 py-2 rounded">
                    <span className="text-primary uppercase tracking-widest font-medium">OKBOND Discount</span>
                    <span className="text-primary font-bold">-{formatCurrency(convertedDiscount, selectedCurrency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-serif border-t-2 border-primary/30 pt-4 mt-4 text-primary">
                  <span>Total</span>
                  <span className="text-xl">{formatCurrency(convertedTotal, selectedCurrency)}</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
                  <Lock className="w-3 h-3" /> Secure Encrypted Checkout
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-primary text-center">
                  <Globe className="w-3 h-3" /> Multi-Currency Support
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-primary text-center">
                  <Zap className="w-3 h-3" /> Instant Confirmation
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
