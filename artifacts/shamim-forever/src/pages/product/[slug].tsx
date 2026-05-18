import { useState } from "react";
import { useGetProduct } from "@workspace/api-client-react";
import { getGetProductQueryKey } from "@workspace/api-client-react";
import { useParams } from "wouter";
import { useCart } from "@/contexts/CartContext";
import {
  ProductHeroShowcase,
  LuxuryStorySection,
  SpecificationsPanel,
  VariantsSelector,
  PricePaymentModule,
  AddToCartExperience,
  LuxuryTrustSection,
  RecommendedProducts,
  PrestigeReviews,
  FloatingElements,
} from "@/components/pdp";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: product, isLoading } = useGetProduct(slug!, {
    query: {
      enabled: !!slug,
      queryKey: getGetProductQueryKey(slug!),
    },
  });

  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("PKR");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-serif text-2xl">
        Masterpiece not found.
      </div>
    );
  }

  const images = product.images?.length ? product.images : ["/placeholder.jpg"];

  // Mock data for specifications
  const specifications = [
    {
      label: "Material",
      value: product.material || "Premium crafted material",
      icon: "✨",
    },
    {
      label: "Weight",
      value: product.weight || "Precisely balanced",
      icon: "⚖️",
    },
    {
      label: "Dimensions",
      value: product.dimensions || "Expertly proportioned",
      icon: "📐",
    },
    {
      label: "Finish",
      value: product.finish || "Luxury hand-finished",
      icon: "🎨",
    },
  ];

  // Mock variants
  const variants = [
    { id: "v1", label: "Size", value: "Standard" },
    { id: "v2", label: "Size", value: "Large" },
    { id: "v3", label: "Size", value: "XL" },
  ];

  // Mock recommended products
  const recommendedProducts = [
    {
      id: "rec1",
      name: "Companion Piece",
      price: product.price ? product.price * 0.8 : 0,
      image: images[0],
      category: product.category || "Luxury",
    },
    {
      id: "rec2",
      name: "Matching Set",
      price: product.price ? product.price * 1.2 : 0,
      image: images[0],
      category: product.category || "Luxury",
    },
    {
      id: "rec3",
      name: "Premium Collection",
      price: product.price ? product.price * 0.9 : 0,
      image: images[0],
      category: product.category || "Luxury",
    },
  ];

  // Mock reviews
  const reviews = [
    {
      id: "r1",
      author: "Luxury Connoisseur",
      title: "A masterpiece of modern luxury craftsmanship",
      content:
        "Exceptional quality and attention to detail. This piece transcends typical product categories and becomes a statement of refined taste.",
      rating: 5,
      date: "2 weeks ago",
      isVIPBuyer: true,
    },
    {
      id: "r2",
      author: "Collector",
      title: "Investment-grade luxury",
      content:
        "Not just beautiful, but a true collector's item. The craftsmanship is evident in every detail.",
      rating: 5,
      date: "1 month ago",
      isVIPBuyer: true,
    },
    {
      id: "r3",
      author: "Enthusiast",
      title: "Exceeded all expectations",
      content:
        "The presentation, packaging, and product quality are all world-class. Highly recommended.",
      rating: 5,
      date: "6 weeks ago",
      isVIPBuyer: false,
    },
    {
      id: "r4",
      author: "Luxury Buyer",
      title: "Pure elegance",
      content:
        "This is what true luxury feels like. Every aspect from unboxing to the product itself is perfection.",
      rating: 5,
      date: "2 months ago",
      isVIPBuyer: true,
    },
  ];

  const handleAddToCart = (quantity: number) => {
    setCartLoading(true);
    setTimeout(() => {
      addItem({
        productId: product.id,
        quantity,
        engravingText: null,
        product,
      });
      setCartLoading(false);
    }, 500);
  };

  const handleBuyNow = (quantity: number) => {
    setCartLoading(true);
    setTimeout(() => {
      addItem({
        productId: product.id,
        quantity,
        engravingText: null,
        product,
      });
      // Redirect to checkout
      window.location.href = "/checkout";
      setCartLoading(false);
    }, 500);
  };

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleProductClick = (productId: string) => {
    window.location.href = `/product/${productId}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 1. PRODUCT HERO SHOWCASE */}
      <ProductHeroShowcase
        productName={product.name}
        category={product.category || "Luxury Collection"}
        price={product.price || 0}
        originalPrice={product.originalPrice}
        articleNumber={product.id}
        availability={product.stock > 0 ? "In Stock" : "Out of Stock"}
        images={images}
      />

      {/* 2. LUXURY STORY SECTION */}
      <LuxuryStorySection
        craftsmanshipStory={
          product.description ||
          "Each piece is meticulously crafted by master artisans with decades of experience. We believe in creating timeless pieces that transcend trends."
        }
        materialOrigin={
          product.material ||
          "Sourced from the finest suppliers worldwide, our materials are selected for their exceptional quality and ethical sourcing."
        }
        inspiration={
          product.inspiration ||
          "Inspired by the intersection of heritage and innovation, we create pieces that celebrate both tradition and contemporary design."
        }
      />

      {/* 3. SPECIFICATIONS PANEL */}
      <SpecificationsPanel specifications={specifications} />

      {/* 4. VARIANTS SELECTOR */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-serif text-gold-gradient mb-12">
              Customize Your Selection
            </h2>

            <VariantsSelector
              variants={variants}
              selectedVariant={selectedVariant || variants[0].id}
              onVariantChange={setSelectedVariant}
              label="Choose Size"
            />
          </div>
        </div>
      </section>

      {/* 5. PRICE & PAYMENT MODULE */}
      <PricePaymentModule
        priceInPKR={product.price || 0}
        priceInUSD={Math.floor((product.price || 0) / 280)}
        priceInUSDT={Math.floor((product.price || 0) / 280)}
        priceInUSDC={Math.floor((product.price || 0) / 280)}
        onPaymentMethodChange={setSelectedPaymentMethod}
      />

      {/* 6. ADD TO CART EXPERIENCE */}
      <AddToCartExperience
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onAddToWishlist={handleAddToWishlist}
        isInWishlist={isInWishlist}
        isLoading={cartLoading}
      />

      {/* 7. LUXURY TRUST SECTION */}
      <LuxuryTrustSection />

      {/* 8. RECOMMENDED PRODUCTS */}
      <RecommendedProducts
        products={recommendedProducts}
        onProductClick={handleProductClick}
      />

      {/* 9. PRESTIGE REVIEWS */}
      <PrestigeReviews reviews={reviews} />

      {/* 10. FLOATING ELEMENTS */}
      <FloatingElements
        onWhatsAppClick={() => window.open("https://wa.me/923001234567")}
        onAIAssistantClick={() => console.log("AI Assistant clicked")}
        cartItemCount={0}
      />
    </div>
  );
}
