import { Link, useLocation } from "wouter";
import { useGetProfile, useLogoutUser } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import logoPath from "@assets/ChatGPT_Image_May_16,_2026,_12_56_29_PM_1778940328239.png";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { data: profile } = useGetProfile();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/shop", label: "Collections" },
    { href: "/shop/scent-finder", label: "Scent Finder" },
    { href: "/atelier", label: "The Atelier" },
    { href: "/inner-circle", label: "Inner Circle" },
    { href: "/journal", label: "Journal" },
    { href: "/boutiques", label: "Boutiques" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 border-b ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-border" : "bg-transparent border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-foreground hover:text-primary transition-colors"
            data-testid="button-mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/" className="flex items-center justify-center flex-1 lg:flex-none">
          <img src={logoPath} alt="Shamim Forever" className="h-8 md:h-10 object-contain invert brightness-0 dark:invert-0 dark:brightness-100 sepia hue-rotate-[40deg] saturate-[40%] contrast-[200%]" />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(3).map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {profile?.role === "admin" && (
            <Link href="/admin" className="hidden md:block text-xs font-medium tracking-widest uppercase hover:text-primary transition-colors">
              Admin
            </Link>
          )}
          <Link href={profile ? "/account" : "/login"} className="text-foreground hover:text-primary transition-colors" data-testid="link-account">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/checkout" className="relative text-foreground hover:text-primary transition-colors" data-testid="link-cart">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-background z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border h-20">
              <img src={logoPath} alt="Shamim Forever" className="h-8 object-contain invert brightness-0 dark:invert-0 dark:brightness-100 sepia hue-rotate-[40deg] saturate-[40%] contrast-[200%]" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:text-primary"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col p-8 gap-6 flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-serif text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8 pt-8 border-t border-border flex flex-col gap-6">
                 {profile?.role === "admin" && (
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif text-foreground hover:text-primary transition-colors">
                      Admin Panel
                    </Link>
                 )}
                <Link href={profile ? "/account" : "/login"} onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif text-foreground hover:text-primary transition-colors">
                  {profile ? "My Vault" : "Sign In"}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
