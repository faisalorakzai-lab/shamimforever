import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4 md:px-8 font-serif">
      <div className="max-w-4xl mx-auto border border-border bg-secondary/10 p-8 md:p-16 backdrop-blur-sm">
        
        {/* Header Section */}
        <div className="text-center mb-16 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl text-gold-gradient tracking-wide mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            SHAMIM FOREVER COUTURE • EFFECTIVE MAY 2026
          </p>
        </div>

        {/* Legal Body */}
        <div className="space-y-10 text-sm md:text-base leading-relaxed tracking-wide text-foreground/90">
          
          <section className="space-y-3">
            <h2 className="text-xl text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
              1. Corporate Framework & Scope
            </h2>
            <p>
              Welcome to Shamim Forever. By accessing our digital vault, premium e-store, or executing an order at our official boutique network (Karachi, Lahore, Islamabad, Peshawar), you unconditionally agree to comply with and be bound by the luxury standard operating protocols outlined herein.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
              2. Fine Fragrances & Cosmetics Regulations
            </h2>
            <p>
              All premium extraits, artisanal oud blends, and cosmetic elixirs are crafted using high-concentration raw materials. Due to strict sanitary and global luxury health regulations, opened, unsealed, or atomized items cannot be returned or exchanged under any circumstances.
            </p>
            <p className="text-muted-foreground text-xs italic">
              Note: Sample discovery sets are recommended prior to purchasing flagship Parfum Extraits.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
              3. High Jewelry Bespoke Contracts
            </h2>
            <p>
              Our sovereign and high jewelry assets are master-crafted with precious metals and ethically sourced certified stones.
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1 text-sm">
              <li>Bespoke Orders: Tailor-made sizing and custom designs require a mandatory non-refundable partial advance placement.</li>
              <li>Cancellations: Orders cannot be modified or revoked 24 hours after verification, as resource allocation and metallurgical smelting begin immediately.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
              4. Secured Logistics & Boutique Verification
            </h2>
            <p>
              High-value order dispatches undergo triple-layered biometric security inspection before shipment. Delivery of high jewelry demands active identification check upon receipt. For immediate fulfillment, physical validation and priority handovers are available at our flagship corporate hubs including Dolmen Mall (Karachi/Lahore), Giga Mall (Islamabad), and HBK Hyper Market (Peshawar).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
              5. Intellectual Property & Digital Ledger
            </h2>
            <p>
              The structural layout, signature fragrance formulas, custom jewelry mockups, and underlying asset frameworks are protected under sovereign copyright laws. Any unauthorized commercial simulation, reproduction, or deployment of the brand identity will meet immediate enforcement.
            </p>
          </section>

        </div>

        {/* Footer Accent */}
        <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground tracking-widest uppercase">
          © 2026 Shamim Forever. All Rights Reserved. Sovereignty Enforced.
        </div>

      </div>
    </div>
  );
}
