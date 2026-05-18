import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useListProducts } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { slug: "fine-fragrances", label: "Fine Fragrances" },
  { slug: "high-jewelry", label: "High Jewelry" },
  { slug: "cosmetics", label: "Cosmetics" },
];

const SEGMENTS = ["All", "Men", "Women", "Unisex"];

const SUB_CATEGORIES: Record<string, Record<string, string[]>> = {
  "fine-fragrances": {
    Men: ["Eau de Parfum (EDP)", "Eau de Toilette (EDT)", "Body Sprays & Deodorants", "Fragrance Gift Sets"],
    Women: ["Eau de Parfum (EDP)", "Eau de Toilette (EDT)", "Body Mists & Sprays", "Perfume Gift Sets"],
    Unisex: ["Luxury Oud & Musk", "Attars & Concentrated Oils", "Signature Blends"],
  },
  "high-jewelry": {
    Men: ["Rings & Bands", "Chains & Necklaces", "Bracelets & Kadas", "Cufflinks & Accessories"],
    Women: ["Necklaces & Pendants", "Earrings & Studs", "Rings (Luxury & Casual)", "Bracelets & Bangles", "Jewelry Sets"],
    Unisex: ["Minimalist Bands", "Premium Watches", "Statement Pieces"],
  },
  cosmetics: {
    Men: ["Beard & Shave Care", "Hair Styling", "Skincare for Men"],
    Women: ["Face Makeup", "Eye Makeup", "Lip Products", "Nail Polish & Care", "Beauty Sets"],
    Unisex: ["Cleansers & Face Washes", "Moisturizers & Serums", "Sun Protection (SPF)", "Body Care"],
  },
};

export default function Shop() {
  const searchParams = new URLSearchParams(window.location.search);
  const categoryParam = searchParams.get("category") || undefined;

  const [activeCategory, setActiveCategory] = useState<string | undefined>(categoryParam);
  const [activeSegment, setActiveSegment] = useState<string>("All");
  const [activeSub, setActiveSub] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>("featured");

  useEffect(() => {
    setActiveSegment("All");
    setActiveSub(undefined);
  }, [activeCategory]);

  const { data: productsData, isLoading } = useListProducts({
    category: activeCategory,
    sort: sortBy,
    limit: 40,
  });

  const { addItem } = useCart();

  const allProducts = productsData?.products || [];

  const products = allProducts.filter((p) => {
    const tags: string[] = (p as Record<string, unknown>).tags as string[] || [];
    if (activeSegment !== "All" && !tags.includes(activeSegment)) return false;
    if (activeSub && !tags.includes(activeSub)) return false;
    return true;
  });

  const availableSubs = activeCategory && activeSegment !== "All"
    ? SUB_CATEGORIES[activeCategory]?.[activeSegment] || []
    : [];

  const btnCls = (active: boolean) =>
    `text-xs font-medium tracking-widest uppercase transition-colors px-3 py-1.5 border ${
      active
        ? "border-primary text-primary bg-primary/10"
        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
    }`;

  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">The Collection</h1>
          <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
            Masterfully crafted fine fragrances, high jewelry, and premium cosmetics.
          </p>
        </header>

        {/* Tier 1: Main Category */}
        <div className="border-b border-border pb-4 mb-4">
          <div className="flex flex-wrap items-center gap-2 md:gap-6">
            <button className={btnCls(!activeCategory)} onClick={() => setActiveCategory(undefined)}>All</button>
            {CATEGORIES.map((cat) => (
              <button key={cat.slug} className={btnCls(activeCategory === cat.slug)} onClick={() => setActiveCategory(cat.slug)}>
                {cat.label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-foreground focus:ring-0 cursor-pointer font-serif text-xs"
              >
                <option value="featured">Featured</option>
                <option value="new">Newest</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tier 2: Segment (gender) */}
        {activeCategory && (
          <div className="border-b border-border/40 pb-3 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-widest mr-2">Segment:</span>
              {SEGMENTS.map((seg) => (
                <button
                  key={seg}
                  className={btnCls(activeSegment === seg)}
                  onClick={() => { setActiveSegment(seg); setActiveSub(undefined); }}
                >
                  {seg}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tier 3: Sub-category */}
        {availableSubs.length > 0 && (
          <div className="border-b border-border/30 pb-3 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-widest mr-2">Type:</span>
              <button className={btnCls(!activeSub)} onClick={() => setActiveSub(undefined)}>All</button>
              {availableSubs.map((sub) => (
                <button key={sub} className={btnCls(activeSub === sub)} onClick={() => setActiveSub(sub)}>
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {!activeCategory && <div className="mb-8" />}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-secondary aspect-[4/5] mb-6" />
                <div className="h-4 bg-secondary w-2/3 mb-2" />
                <div className="h-4 bg-secondary w-1/3 mb-4" />
                <div className="h-8 bg-secondary w-full" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group flex flex-col"
              >
                <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] bg-secondary mb-6 overflow-hidden block">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-serif text-sm">
                      No Image
                    </div>
                  )}
                  {product.isNewArrival && (
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur border border-primary/30 px-3 py-1 text-xs uppercase tracking-widest text-primary">
                      New
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-serif uppercase tracking-widest"
                      onClick={(e) => {
                        e.preventDefault();
                        addItem({ productId: product.id, quantity: 1, product });
                      }}
                    >
                      Add to Bag
                    </Button>
                  </div>
                </Link>
                <div className="flex flex-col flex-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{product.category}</span>
                  <Link href={`/product/${product.slug}`} className="text-lg font-serif text-foreground hover:text-primary transition-colors mb-2 line-clamp-2">
                    {product.name}
                  </Link>
                  <div className="mt-auto flex items-center gap-3">
                    <span className="text-primary font-medium tracking-wider">Rs {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm tracking-wider">
                        Rs {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-2xl font-serif text-muted-foreground mb-4">No masterpieces found.</p>
            <button
              onClick={() => { setActiveCategory(undefined); setActiveSegment("All"); setActiveSub(undefined); }}
              className="text-xs uppercase tracking-widest text-primary border border-primary/40 px-6 py-2 hover:bg-primary/10 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
