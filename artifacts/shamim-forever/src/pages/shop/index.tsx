import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { ShoppingBag, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const categoryParam = searchParams.get("category") || undefined;
  
  const [activeCategory, setActiveCategory] = useState<string | undefined>(categoryParam);
  const [sortBy, setSortBy] = useState<string>("featured");

  const { data: productsData, isLoading } = useListProducts({ 
    category: activeCategory, 
    sort: sortBy,
    limit: 20
  });
  
  const { data: categories } = useListCategories();
  const { addItem } = useCart();

  const products = productsData?.products || [];

  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">The Collection</h1>
          <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
            Discover our masterfully crafted selection of fine fragrances, high jewelry, and premium cosmetics.
          </p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-y border-border py-4">
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <button 
              className={`text-sm font-medium tracking-widest uppercase transition-colors ${!activeCategory ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveCategory(undefined)}
            >
              All
            </button>
            {categories?.map(cat => (
              <button 
                key={cat.id}
                className={`text-sm font-medium tracking-widest uppercase transition-colors ${activeCategory === cat.slug ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-widest">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-foreground focus:ring-0 cursor-pointer font-serif"
            >
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-secondary aspect-[4/5] mb-6"></div>
                <div className="h-4 bg-secondary w-2/3 mb-2"></div>
                <div className="h-4 bg-secondary w-1/3 mb-4"></div>
                <div className="h-8 bg-secondary w-full"></div>
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-serif">No Image</div>
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
            <p className="text-2xl font-serif text-muted-foreground">No masterpieces found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
