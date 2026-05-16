import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSubmitPaymentProof } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutSuccess() {
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get("id");
  const [transactionId, setTransactionId] = useState("");
  const submitProof = useSubmitPaymentProof();
  const { toast } = useToast();
  const [proofSubmitted, setProofSubmitted] = useState(false);

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    submitProof.mutate({
      data: {
        orderId: parseInt(orderId),
        paymentMethod: "manual_bank",
        amount: 0, // In a real app we'd fetch the actual order amount
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

  return (
    <div className="min-h-[80vh] bg-background flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full bg-secondary/30 border border-border p-8 md:p-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-6">Reservation Confirmed</h1>
        
        {orderId && (
          <p className="text-xl font-serif text-foreground mb-8">
            Order Reference: <span className="text-primary">#{orderId}</span>
          </p>
        )}

        <div className="space-y-6 text-muted-foreground font-serif leading-relaxed mb-12">
          <p>
            Your masterpiece has been reserved. To complete your acquisition, please transfer the total amount using one of the methods below.
          </p>
          <div className="bg-background border border-border p-6 text-left inline-block w-full max-w-md mx-auto">
            <h3 className="text-foreground uppercase tracking-widest text-sm mb-4 border-b border-border pb-2">Payment Details</h3>
            <div className="space-y-4 text-sm">
              <p><strong className="text-primary font-sans uppercase">EasyPaisa</strong><br/>03367970004<br/>(Muhammad Faisal)</p>
              <p><strong className="text-primary font-sans uppercase">Bank UBL</strong><br/>IBAN: PK13UNIL0109000318870498<br/>Title: Shamim Forever</p>
            </div>
          </div>
        </div>

        {!proofSubmitted ? (
          <form onSubmit={handleSubmitProof} className="max-w-md mx-auto mb-12 border-t border-border pt-8">
            <h3 className="text-foreground font-serif text-xl mb-4">Submit Payment Proof</h3>
            <p className="text-muted-foreground text-sm mb-4">Once you have made the transfer, please provide the transaction ID below.</p>
            <div className="flex gap-4">
              <input 
                required
                type="text" 
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Transaction ID / Reference" 
                className="flex-1 bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary font-sans text-sm"
              />
              <Button type="submit" disabled={submitProof.isPending} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest text-xs">
                {submitProof.isPending ? "..." : "Submit"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="mb-12 border-t border-border pt-8">
            <p className="text-primary font-serif text-lg">Thank you. Your payment proof is being verified.</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/account">
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary rounded-none uppercase tracking-widest px-8">
              View Order Status
            </Button>
          </Link>
          <Link href="/shop">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest px-8">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
