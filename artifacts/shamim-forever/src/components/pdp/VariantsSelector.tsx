import { motion } from "framer-motion";
import { useState } from "react";

interface Variant {
  id: string;
  label: string;
  value: string;
  image?: string;
}

interface VariantsSelectorProps {
  variants: Variant[];
  selectedVariant: string;
  onVariantChange: (variantId: string) => void;
  label: string;
}

export function VariantsSelector({
  variants,
  selectedVariant,
  onVariantChange,
  label,
}: VariantsSelectorProps) {
  const [hoveredVariant, setHoveredVariant] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium tracking-widest uppercase text-foreground">
          {label}
        </label>
        <span className="text-xs text-muted-foreground">
          {variants.find((v) => v.id === selectedVariant)?.value}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isSelected = selectedVariant === variant.id;
          const isHovered = hoveredVariant === variant.id;

          return (
            <motion.button
              key={variant.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onVariantChange(variant.id)}
              onMouseEnter={() => setHoveredVariant(variant.id)}
              onMouseLeave={() => setHoveredVariant(null)}
              className={`relative px-6 py-3 rounded-full font-serif text-sm transition-all duration-300 ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                  : "bg-secondary text-foreground border border-border hover:border-primary/50"
              }`}
            >
              {/* Background Image for Color Variants */}
              {variant.image && (
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{
                    backgroundImage: `url(${variant.image})`,
                    backgroundSize: "cover",
                  }}
                />
              )}

              <span className="relative z-10">{variant.value}</span>

              {/* Gold Border Animation */}
              {isSelected && (
                <motion.div
                  layoutId="variantBorder"
                  className="absolute inset-0 rounded-full border-2 border-primary/30 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
