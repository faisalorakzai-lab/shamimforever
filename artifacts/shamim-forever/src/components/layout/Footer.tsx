import { Link } from "wouter";
import logoPath from "@assets/ChatGPT_Image_May_16,_2026,_12_59_33_PM_1778940328211.png";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col items-start space-y-6">
            <img src={logoPath} alt="Shamim Forever Logo" className="h-16 object-contain invert brightness-0 dark:invert-0 dark:brightness-100 sepia hue-rotate-[40deg] saturate-[40%] contrast-[200%]" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-serif">
              An opulent digital atelier where every scent whispers gold. Crafted for eternity.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium text-foreground mb-6 uppercase tracking-widest">Collections</h4>
            <ul className="space-y-4">
              <li><Link href="/shop?category=fine-fragrances" className="text-muted-foreground hover:text-primary transition-colors text-sm">Fine Fragrances</Link></li>
              <li><Link href="/shop?category=high-jewelry" className="text-muted-foreground hover:text-primary transition-colors text-sm">High Jewelry</Link></li>
              <li><Link href="/shop?category=cosmetics" className="text-muted-foreground hover:text-primary transition-colors text-sm">Cosmetics</Link></li>
              <li><Link href="/shop?sort=new" className="text-muted-foreground hover:text-primary transition-colors text-sm">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium text-foreground mb-6 uppercase tracking-widest">The House</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Heritage</Link></li>
              <li><Link href="/atelier" className="text-muted-foreground hover:text-primary transition-colors text-sm">The Atelier</Link></li>
              <li><Link href="/boutiques" className="text-muted-foreground hover:text-primary transition-colors text-sm">Boutiques</Link></li>
              <li><Link href="/concierge" className="text-muted-foreground hover:text-primary transition-colors text-sm">Private Concierge</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium text-foreground mb-6 uppercase tracking-widest">Client Care</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/shipping-returns" className="text-muted-foreground hover:text-primary transition-colors text-sm">Shipping & Returns</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Shamim Forever. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6 text-muted-foreground text-xs uppercase tracking-widest">
            <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
