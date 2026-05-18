import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    category: "Fine Fragrances",
    questions: [
      {
        q: "What makes Shamim Forever fragrances unique?",
        a: "Our signature scents are compiled using ultra-high concentration Parfum Extraits and pure oud distillates. This premium grading ensures an institutional oil concentration level that guarantees deep projection and an enduring sillage surpassing industrial standard blends."
      },
      {
        q: "Can I sample a scent before purchasing a full flagship flacon?",
        a: "Yes. We highly recommend utilizing our Artisanal Discovery Sets. These curation vials allow connoisseurs to experience our evolving top notes and raw oriental textures on their skin configuration before acquiring a signature master bottle."
      }
    ]
  },
  {
    category: "High Jewelry Bespoke Orders",
    questions: [
      {
        q: "How long does a custom bespoke ring or chain allocation take?",
        a: "Bespoke commissions require meticulous design rendering, metallurgical smelting, and expert hand-setting of stones. The production framework spans 10 to 14 business days following deposit settlement and dimensional confirmation."
      },
      {
        q: "Can I request modifications to my custom design after confirmation?",
        a: "We enforce a strict 24-hour lock window. Once an order passes verification, materials are allocated and metallurgical manufacturing initiates immediately. Beyond this period, structural alterations are completely locked."
      }
    ]
  },
  {
    category: "Logistics, Vault Pickups & Verification",
    questions: [
      {
        q: "Can I collect my online order directly from a physical flagship boutique?",
        a: "Absolutely. Select the 'Boutique Vault Pickup' terminal during checkout. You can securely retrieve your physical parcels directly from our authorized luxury flagships: Dolmen Mall (Karachi/Lahore), Giga Mall (Islamabad), and HBK Hyper Market (Peshawar)."
      },
      {
        q: "What are the security requirements for high-value shipments?",
        a: "To preserve absolute asset security, high-jewelry shipments require physical presentation of an official CNIC or Passport matching the verified purchase invoice profile upon courier handover."
      }
    ]
  }
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4 md:px-8 font-serif">
      <div className="max-w-4xl mx-auto border border-border bg-secondary/10 p-8 md:p-16 backdrop-blur-sm">
        
        <div className="text-center mb-16 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl text-gold-gradient tracking-wide mb-4">
            Conscious Concierge FAQ
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            SHAMIM FOREVER • REPUTATION & STANDARDS PROTOCOL
          </p>
        </div>

        <div className="space-y-12">
          {faqData.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl text-primary uppercase tracking-widest border-b border-border/40 pb-2">
                {section.category}
              </h2>
              
              <div className="space-y-3 pl-2">
                {section.questions.map((item, qIdx) => {
                  const key = `${idx}-${qIdx}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={qIdx} className="border border-border/40 overflow-hidden">
                      <button
                        onClick={() => setOpenItem(isOpen ? null : key)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-secondary/20 transition-colors"
                      >
                        <span className="text-sm md:text-base font-medium text-foreground/90 flex items-start gap-2">
                          <span className="text-primary font-sans shrink-0">Q.</span> {item.q}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-primary shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed px-4 pb-4 pt-0 border-t border-border/30 ml-6">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground tracking-widest uppercase">
          FURTHER ENQUIRIES: CONCIERGE@SHAMIMFOREVER.COM
        </div>

      </div>
    </div>
  );
}
