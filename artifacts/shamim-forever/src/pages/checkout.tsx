import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Lock, ShieldCheck } from "lucide-react";
import { useCreateOrder } from "@workspace/api-client-react";

export default function Checkout() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const [location, setLocation] = useLocation();
  const createOrder = useCreateOrder();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    paymentMethod: "manual_bank"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const shipping = 500;
  const total = subtotal + (items.length > 0 ? shipping : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
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
          paymentMethod: formData.paymentMethod,
          guestEmail: formData.email
        }
      }, {
        onSuccess: (order) => {
          clearCart();
          setLocation(`/checkout/success?id=${order.id}`);
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
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          
          {/* Main Form Area */}
          <div className="flex-1 order-2 md:order-1">
            <div className="flex items-center gap-4 mb-12 border-b border-border pb-4">
              <span className={`text-sm font-medium tracking-widest uppercase transition-colors ${step === 1 ? 'text-primary' : 'text-muted-foreground'}`}>1. Details</span>
              <span className="text-border">/</span>
              <span className={`text-sm font-medium tracking-widest uppercase transition-colors ${step === 2 ? 'text-primary' : 'text-muted-foreground'}`}>2. Payment</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-serif text-foreground mb-6">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">First Name</label>
                        <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Last Name</label>
                        <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone Number</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif text-foreground mb-6">Shipping Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Street Address</label>
                        <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">City</label>
                        <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Postal Code</label>
                        <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Country</label>
                        <select disabled name="country" value={formData.country} className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors opacity-70">
                          <option>Pakistan</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif text-lg tracking-widest uppercase mt-8 py-6">
                    Continue to Payment
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-serif text-foreground mb-6">Payment Method</h2>
                    
                    <div className="space-y-4">
                      <label className="flex items-start gap-4 p-6 border border-primary bg-primary/5 cursor-pointer transition-colors">
                        <input type="radio" name="paymentMethod" value="manual_bank" checked={formData.paymentMethod === "manual_bank"} onChange={handleChange} className="mt-1 accent-primary" />
                        <div>
                          <span className="block font-serif text-lg text-foreground mb-2">Direct Bank Transfer / EasyPaisa</span>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            Please transfer the total amount to complete your reservation. Your order will not ship until the funds have cleared in our account.
                          </p>
                          <div className="bg-secondary/50 p-4 border border-border/50 text-sm space-y-2">
                            <p><strong className="text-primary">EasyPaisa:</strong> 03367970004 (Muhammad Faisal)</p>
                            <p><strong className="text-primary">Bank UBL IBAN:</strong> PK13UNIL0109000318870498</p>
                          </div>
                          <p className="text-xs text-primary mt-4 italic">
                            *After placing the order, you will be prompted to submit your transaction ID as proof.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 border-primary text-primary hover:bg-primary/10 rounded-none font-serif tracking-widest uppercase py-6 bg-transparent">
                      Back
                    </Button>
                    <Button type="submit" disabled={createOrder.isPending} size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif text-lg tracking-widest uppercase py-6">
                      {createOrder.isPending ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full md:w-[400px] order-1 md:order-2 shrink-0">
            <div className="bg-secondary/30 border border-border p-6 md:p-8 sticky top-28">
              <h2 className="text-2xl font-serif text-foreground mb-6 border-b border-border pb-4">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item, index) => (
                  <div key={`${item.productId}-${index}`} className="flex gap-4">
                    <div className="w-20 h-24 bg-secondary shrink-0">
                      {item.product?.images?.[0] && <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover opacity-80" />}
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
                        <span className="text-sm font-medium tracking-wider">Rs {((item.product?.price || 0) * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-widest">Subtotal</span>
                  <span className="tracking-wider">Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-widest">Shipping</span>
                  <span className="tracking-wider">Rs {shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-serif border-t border-border pt-4 mt-4 text-primary">
                  <span>Total</span>
                  <span>Rs {total.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
                <Lock className="w-3 h-3" /> Secure Encrypted Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
