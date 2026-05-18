import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSubmitPaymentProof } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, MessageCircle, Mail, Clock } from "lucide-react";

export default function CheckoutSuccess() {
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get("id");
  const [transactionId, setTransactionId] = useState("");
  const submitProof = useSubmitPaymentProof();
  const { toast } = useToast();
  const [proofSubmitted, setProofSubmitted] = useState(false);
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(true);

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    submitProof.mutate({
      data: {
        orderId: parseInt(orderId),
        paymentMethod: "manual_bank",
        amount: 0,
        senderName: "Customer",
        transactionId
      }
    }, {
      onSuccess: () => {
        toast({ title: "Proof Submitted", description: "Your transaction ID has been recorded." });
        setProofSubmitted(true);
      }
    });
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, I just placed order #${orderId}. Please confirm receipt and provide order updates.`;
    const whatsappUrl = `https://wa.me/923367970004?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setShowWhatsAppPrompt(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full"
      >
        {/* Main Success Card */}
        <div className="bg-gradient-to-br from-secondary/40 to-secondary/20 border-2 border-primary/30 rounded-lg p-8 md:p-12 text-center backdrop-blur-sm mb-8">
          
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-serif text-gold-gradient mb-2"
          >
            Reservation Confirmed
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg mb-8"
          >
            Your masterpiece has been reserved
          </motion.p>

          {orderId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-primary/10 border-2 border-primary/30 rounded-lg p-6 mb-8 inline-block"
            >
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Order Reference</p>
              <p className="text-3xl font-serif text-primary">#{orderId}</p>
            </motion.div>
          )}

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-secondary/30 border border-border rounded-lg p-6">
                <div className="flex justify-center mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-foreground mb-2">Step 1: Payment</h3>
                <p className="text-sm text-muted-foreground">Complete the payment transfer within 24 hours</p>
              </div>
              <div className="bg-secondary/30 border border-border rounded-lg p-6">
                <div className="flex justify-center mb-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-foreground mb-2">Step 2: Verification</h3>
                <p className="text-sm text-muted-foreground">We verify your transaction and confirm receipt</p>
              </div>
              <div className="bg-secondary/30 border border-border rounded-lg p-6">
                <div className="flex justify-center mb-3">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-foreground mb-2">Step 3: Fulfillment</h3>
                <p className="text-sm text-muted-foreground">Your order ships with tracking details</p>
              </div>
            </div>
          </motion.div>

          {/* Payment Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-background border-2 border-primary/30 rounded-lg p-8 mb-8 text-left"
          >
            <h3 className="text-foreground uppercase tracking-widest text-sm mb-6 border-b border-primary/30 pb-4 font-serif">Payment Methods</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Local Payment</p>
                  <p className="font-serif text-foreground mb-3">EasyPaisa / JazzCash</p>
                  <p className="text-lg font-bold text-primary mb-1">03367970004</p>
                  <p className="text-sm text-muted-foreground">Muhammad Faisal</p>
                </div>
                <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Bank Transfer</p>
                  <p className="font-serif text-foreground mb-3">UBL Bank</p>
                  <p className="text-sm font-mono text-primary mb-1">PK13UNIL0109000318870498</p>
                  <p className="text-sm text-muted-foreground">Shamim Forever</p>
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary font-medium">💡 Tip:</span> Keep your transaction ID handy. You'll need it to submit payment proof below.
                </p>
              </div>
            </div>
          </motion.div>

          {/* WhatsApp Prompt */}
          {showWhatsAppPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-green-500/10 to-green-600/5 border-2 border-green-500/30 rounded-lg p-6 mb-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div className="text-left">
                    <h4 className="font-serif text-foreground mb-1">Get Order Updates on WhatsApp</h4>
                    <p className="text-sm text-muted-foreground">Receive real-time notifications about your order status</p>
                  </div>
                </div>
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 text-white hover:bg-green-700 rounded-lg px-6 whitespace-nowrap"
                >
                  Open WhatsApp
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Payment Proof Submission */}
        {!proofSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-secondary/30 border-2 border-border rounded-lg p-8 mb-8"
          >
            <h3 className="text-foreground font-serif text-2xl mb-2">Submit Payment Proof</h3>
            <p className="text-muted-foreground text-sm mb-6">Once you have completed the transfer, provide your transaction ID below for verification.</p>
            
            <form onSubmit={handleSubmitProof} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Transaction ID / Reference</label>
                <input 
                  required
                  type="text" 
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g., TXN123456789" 
                  className="w-full bg-background border-2 border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary rounded-lg font-sans text-sm transition-colors"
                />
              </div>
              <Button 
                type="submit" 
                disabled={submitProof.isPending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg uppercase tracking-widest py-3 font-serif"
              >
                {submitProof.isPending ? "Verifying..." : "Submit Payment Proof"}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 border-2 border-primary/30 rounded-lg p-8 mb-8 text-center"
          >
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-primary font-serif text-lg">Payment proof submitted successfully</p>
            <p className="text-muted-foreground text-sm mt-2">Our team is verifying your transaction. You'll receive a confirmation email shortly.</p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/account">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/10 rounded-lg uppercase tracking-widest px-8 py-3 font-serif"
            >
              View Order Status
            </Button>
          </Link>
          <Link href="/shop">
            <Button 
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg uppercase tracking-widest px-8 py-3 font-serif"
            >
              Continue Shopping
            </Button>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 pt-8 border-t border-border text-center"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Secured by</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Verified Authenticity</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Insured Shipping</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
