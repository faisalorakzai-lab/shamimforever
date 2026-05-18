import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Truck, Home, Crown, MessageCircle, Download, Headphones, ArrowRight } from "lucide-react";

interface OrderData {
  id: string;
  status: string;
  paymentMethod: string;
  currency: string;
  total: number;
  discount: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  estimatedDelivery: string;
  usingOKBond: boolean;
}

export default function OrderSuccess() {
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get("id");
  const [showVIPUpsell, setShowVIPUpsell] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Mock order data - in production, this would come from API
  const orderData: OrderData = {
    id: orderId || "SF-2026-001",
    status: "CONFIRMED",
    paymentMethod: "OKBOND",
    currency: "PKR",
    total: 125000,
    discount: 12500,
    items: [
      {
        name: "Sovereign Essence Fragrance",
        quantity: 1,
        price: 125000,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop"
      }
    ],
    estimatedDelivery: "3-7 Days",
    usingOKBond: true
  };

  useEffect(() => {
    // Trigger page load animation
    setPageLoaded(true);

    // Trigger email and WhatsApp notifications (in production)
    triggerNotifications();
  }, []);

  const triggerNotifications = () => {
    // In production, this would call your backend API
    console.log("Triggering order confirmation email and WhatsApp...");
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, I just received my order confirmation #${orderData.id}. Please provide tracking details.`;
    const whatsappUrl = `https://wa.me/923367970004?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDownloadInvoice = () => {
    // In production, this would generate and download a PDF invoice
    console.log("Downloading invoice for order:", orderData.id);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ opacity: 0, y: "100vh", x: Math.random() * window.innerWidth }}
            animate={{ opacity: [0, 1, 0], y: "-100vh" }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: pageLoaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          {/* Cinematic Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: pageLoaded ? 1 : 0, y: pageLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: pageLoaded ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
              className="mb-6"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center border-2 border-primary/50">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: pageLoaded ? 1 : 0, y: pageLoaded ? 0 : 10 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl md:text-6xl font-serif text-gold-gradient mb-4"
            >
              Order Confirmed
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: pageLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl text-muted-foreground font-serif"
            >
              Welcome to SHAMIM FOREVER
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: pageLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-sm text-muted-foreground mt-2"
            >
              Your entry into the sovereign luxury ecosystem
            </motion.p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: pageLoaded ? 1 : 0, y: pageLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-2 border-primary/40 rounded-lg p-8 md:p-10 mb-8 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Order ID</p>
                <p className="text-2xl font-serif text-primary">#{orderData.id}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <p className="text-2xl font-serif text-foreground">{orderData.status}</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Payment Method</p>
                <p className="text-lg font-serif text-foreground">{orderData.paymentMethod}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Estimated Delivery</p>
                <p className="text-lg font-serif text-foreground">{orderData.estimatedDelivery}</p>
              </div>
            </div>

            {/* OKBOND Benefit Display */}
            {orderData.usingOKBond && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="bg-primary/10 border border-primary/30 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-lg text-primary">OKBOND Sovereign Discount Applied</h3>
                </div>
                <p className="text-muted-foreground mb-3">You saved with your loyalty token:</p>
                <p className="text-3xl font-serif text-primary">PKR {orderData.discount.toLocaleString()}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Product Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: pageLoaded ? 1 : 0, y: pageLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="bg-secondary/30 border border-border rounded-lg p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-serif text-foreground mb-6">Order Summary</h2>
            <div className="space-y-6">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex gap-6">
                  {item.image && (
                    <div className="w-24 h-24 bg-secondary rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-foreground mb-2">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Qty: {item.quantity}</span>
                      <span className="text-lg font-serif text-primary">PKR {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border mt-6 pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>PKR {orderData.total.toLocaleString()}</span>
              </div>
              {orderData.discount > 0 && (
                <div className="flex justify-between text-sm text-primary">
                  <span>Discount (OKBOND)</span>
                  <span>-PKR {orderData.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-serif border-t border-border pt-3">
                <span>Total</span>
                <span className="text-primary">PKR {(orderData.total - orderData.discount).toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Delivery Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: pageLoaded ? 1 : 0, y: pageLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="bg-secondary/30 border border-border rounded-lg p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-serif text-foreground mb-8">Delivery Timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: CheckCircle2, label: "Confirmed", active: true },
                { icon: Package, label: "Packed", active: false },
                { icon: Truck, label: "Shipped", active: false },
                { icon: Home, label: "Delivered", active: false }
              ].map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 border-2 transition-all ${
                      stage.active
                        ? "bg-primary/20 border-primary"
                        : "bg-secondary border-border"
                    }`}
                  >
                    <stage.icon className={`w-6 h-6 ${stage.active ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <p className={`text-sm font-serif text-center ${stage.active ? "text-primary" : "text-muted-foreground"}`}>
                    {stage.label}
                  </p>
                  {index < 3 && (
                    <div className={`h-1 w-full mt-4 ${stage.active ? "bg-primary" : "bg-border"}`} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Personal Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: pageLoaded ? 1 : 0, y: pageLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-lg p-8 mb-8 text-center"
          >
            <p className="text-lg font-serif text-foreground mb-4">
              Thank you for choosing Sovereign Luxury.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Your order is being prepared with precision craftsmanship and utmost attention to detail. 
              We are committed to delivering an experience that transcends expectations.
            </p>
          </motion.div>

          {/* Luxury Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: pageLoaded ? 1 : 0, y: pageLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            <Button
              onClick={() => window.location.href = "/account"}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-6 font-serif tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <Truck className="w-5 h-5" />
              Track Order
            </Button>
            <Button
              onClick={handleDownloadInvoice}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 rounded-lg py-6 font-serif tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Invoice
            </Button>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-600 text-white hover:bg-green-700 rounded-lg py-6 font-serif tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Support
            </Button>
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 rounded-lg py-6 font-serif tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <Headphones className="w-5 h-5" />
              Contact Concierge
            </Button>
          </motion.div>

          {/* VIP Upsell System */}
          {showVIPUpsell && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-2 border-amber-500/40 rounded-lg p-8 mb-8 relative overflow-hidden"
            >
              <button
                onClick={() => setShowVIPUpsell(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>

              <div className="flex items-start gap-4 mb-6">
                <Crown className="w-8 h-8 text-amber-500 mt-1 shrink-0" />
                <div>
                  <h3 className="text-2xl font-serif text-foreground mb-2">
                    Upgrade to Inner Circle Membership
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Exclusive VIP benefits await. Join our most privileged clientele.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <p className="text-sm font-serif text-primary mb-2">✨ Benefit 1</p>
                      <p className="text-xs text-muted-foreground">Priority shipping & concierge service</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <p className="text-sm font-serif text-primary mb-2">✨ Benefit 2</p>
                      <p className="text-xs text-muted-foreground">Exclusive early access to collections</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <p className="text-sm font-serif text-primary mb-2">✨ Benefit 3</p>
                      <p className="text-xs text-muted-foreground">15% lifetime discount on all purchases</p>
                    </div>
                  </div>

                  <Link href="/inner-circle">
                    <Button className="bg-amber-600 text-white hover:bg-amber-700 rounded-lg px-8 py-3 font-serif tracking-widest uppercase flex items-center gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Continue Shopping */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: pageLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="text-center"
          >
            <Link href="/shop">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-12 py-4 font-serif tracking-widest uppercase">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
