import { useState } from "react";
import { useGetProduct } from "@workspace/api-client-react";
import { getGetProductQueryKey } from "@workspace/api-client-react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Plus, Minus, Info } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: product, isLoading } = useGetProduct(slug!, {
    query: {
      enabled: !!slug,
      queryKey: getGetProductQueryKey(slug!)
    }
  });

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [engravingText, setEngravingText] = useState("");

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div></div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-serif text-2xl">Masterpiece not found.</div>;
  }

  const images = product.images?.length ? product.images : ["/placeholder.jpg"];

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Images */}
          <div className="flex flex-col-reverse md:flex-row gap-6">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-[4/5] shrink-0 w-20 md:w-full border transition-colors ${activeImage === idx ? 'border-primary' : 'border-transparent hover:border-border'}`}
                >
                  <img src={img} alt={`${product.name} - view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 aspect-[4/5] bg-secondary relative overflow-hidden">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col pt-8 lg:pt-0">
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-6 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8 border-b border-border pb-8">
              <span className="text-2xl font-serif text-primary">Rs {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">Rs {product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <div className="prose prose-invert prose-p:font-serif prose-p:text-muted-foreground prose-p:leading-relaxed mb-10 max-w-none">
              <p>{product.description}</p>
            </div>

            {product.hasEngravingOption && (
              <div className="mb-10 p-6 border border-border/50 bg-secondary/30">
                <h3 className="font-serif text-lg text-foreground mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" /> Personalized Engraving
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Add your initials or a short message to the bottle (Max 10 characters).</p>
                <input 
                  type="text" 
                  maxLength={10}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="e.g. S.F." 
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary font-serif"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center border border-border">
                <button 
                  className="px-4 py-4 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-serif text-lg">{quantity}</span>
                <button 
                  className="px-4 py-4 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button 
                size="lg"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-auto font-serif text-lg tracking-widest uppercase flex items-center gap-3"
                onClick={() => {
                  addItem({ productId: product.id, quantity, engravingText: engravingText || null, product });
                }}
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Bag
              </Button>
            </div>

            {/* Accordions for details */}
            <div className="border-t border-border divide-y divide-border">
              {product.scentNotes && (
                <details className="group py-6">
                  <summary className="flex justify-between items-center font-serif text-xl cursor-pointer list-none text-foreground group-open:text-primary transition-colors">
                    Scent Notes
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-muted-foreground mt-4 font-serif leading-relaxed">{product.scentNotes}</p>
                </details>
              )}
              {product.ingredients && (
                <details className="group py-6">
                  <summary className="flex justify-between items-center font-serif text-xl cursor-pointer list-none text-foreground group-open:text-primary transition-colors">
                    Ingredients
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-muted-foreground mt-4 font-serif leading-relaxed">{product.ingredients}</p>
                </details>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
