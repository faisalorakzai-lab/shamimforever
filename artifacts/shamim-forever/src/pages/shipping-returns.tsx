import { motion } from "framer-motion";

export default function ShippingAndReturns() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4 md:px-8 font-serif">
      <div className="max-w-4xl mx-auto border border-border bg-secondary/10 p-8 md:p-16 backdrop-blur-sm">
        
        {/* Header Section */}
        <div className="text-center mb-16 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl text-gold-gradient tracking-wide mb-4">
            Shipping & Returns
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            SHAMIM FOREVER LOGISTICS • SECURE TRANSIT PROTOCOL
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm md:text-base leading-relaxed tracking-wide text-foreground/90">
          
          <section className="space-y-3">
            <h2 className="text-xl text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
              1. Premium Insured Shipping
            </h2>
            <p>
              Every fine fragrance dispatch, jewelry asset, and cosmetic order is wrapped in signature climate-controlled tamper-evident packaging. We offer complimentary, fully-insured priority shipping across Pakistan for all premium tier purchases.
            </p>
            <p className="text-sm text-muted-foreground">
              Standard secure transit takes 2 to 4 business days following biometric fulfillment and dispatch registration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
              2. Boutique Vault Pickups
            </h2>
            <p>
              For immediate fulfillment and high-value physical inspection, clients can select the "Boutique Vault Pickup" option during checkout. Orders can be securely collected directly from our official flagship luxury hubs:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2 text-sm text-foreground/80">
              <li>Karachi: Dolmen Mall, Tariq Road Hub</li>
              <li>Lahore: Dolmen Mall, DHA Phase 6 Flagship</li>
              <li>Islamabad: Giga Mall Executive Vault</li>
              <li>Peshawar: HBK Hyper Market, Main Ring Road Suite</li>
            </ul>
            <p className="text-xs italic text-muted-foreground">
              Note: Original CNIC/Passport matching the order profile is strictly mandatory for jewelry asset handovers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
              3. Fragrances & Cosmetics Return Exception
            </h2>
            <p>
              In accordance with global luxury cosmetics and safe hygienic handling standards, Fine Fragrances (EDP, Attars, Oud Blends) and Cosmetic products that have been unsealed, unboxed, or tested are strictly ineligible for returns, refunds, or exchanges.
            </p>
            <p>
              If an item arrives damaged due to courier transit, it must be reported to our concierge within 12 hours of delivery receipt alongside unboxing video verification for a fresh batch swap.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
              4. High Jewelry Exchange Policies
            </h2>
            <p>
              Our High Jewelry pieces are subject to elite quality-assurance testing before delivery. Non-custom catalog inventory may be eligible for a private size exchange or vault credit within 7 days of purchase, provided that:
            </p>
            <ul className="list-decimal list-inside pl-4 space-y-1 text-sm text-foreground/80">
              <li>The specialized security seal tag remains entirely untampered and intact.</li>
              <li>The piece shows absolute zero wear, microscopic abrasions, or metallurgical stress signs.</li>
              <li>Bespoke commissioned designs or custom-sized luxury bands are strictly final sale.</li>
            </ul>
          </section>

        </div>

        {/* Footer Accent */}
        <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground tracking-widest uppercase">
          CONCIERGE DESK: SUPPORT@SHAMIMFOREVER.COM • SOVEREIGN STANDARDS APPLIED
        </div>

      </div>
    </div>
  );
}
