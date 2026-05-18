import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  options: string[];
}

const FILTERS: FilterOption[] = [
  {
    id: "category",
    label: "Category",
    options: ["Perfume", "Jewelry", "Cosmetics", "Grooming"],
  },
  {
    id: "collection",
    label: "Collection",
    options: ["Sovereign", "Midnight Oud", "Eternal Love", "Chairman's Selection"],
  },
  {
    id: "gender",
    label: "Gender",
    options: ["Men", "Women", "Unisex"],
  },
  {
    id: "price",
    label: "Price Range",
    options: ["Under Rs 5,000", "Rs 5,000 - 15,000", "Rs 15,000 - 50,000", "Above Rs 50,000"],
  },
  {
    id: "material",
    label: "Material",
    options: ["Gold", "Silver", "Platinum", "Leather", "Crystal"],
  },
  {
    id: "availability",
    label: "Availability",
    options: ["In Stock", "Pre-Order", "Limited Edition"],
  },
];

export function LuxuryFilterBar() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isSticky, setIsSticky] = useState(false);

  const handleSelectFilter = (filterId: string, option: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: prev[filterId]?.includes(option)
        ? prev[filterId].filter((o) => o !== option)
        : [...(prev[filterId] || []), option],
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const totalSelected = Object.values(selectedFilters).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <>
      {/* Sticky observer element */}
      <div
        className="h-px"
        onMouseEnter={() => setIsSticky(true)}
        onMouseLeave={() => setIsSticky(false)}
      />

      {/* Filter Bar */}
      <motion.div
        className={`${
          isSticky ? "fixed top-20 left-0 right-0 z-40 shadow-lg" : "relative"
        } bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0">
            {/* Filter chips */}
            <div className="flex gap-2 flex-nowrap">
              {FILTERS.map((filter) => (
                <motion.div key={filter.id} className="relative flex-shrink-0">
                  <button
                    onClick={() => setOpenFilter(openFilter === filter.id ? null : filter.id)}
                    className={`group relative px-4 py-2 border rounded-sm text-xs uppercase tracking-widest font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedFilters[filter.id]?.length > 0
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {filter.label}
                      {selectedFilters[filter.id]?.length > 0 && (
                        <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full">
                          {selectedFilters[filter.id].length}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-300 ${
                          openFilter === filter.id ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {openFilter === filter.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 bg-card border border-border rounded-sm shadow-xl z-50 min-w-48 overflow-hidden"
                      >
                        <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                          {filter.options.map((option) => (
                            <label
                              key={option}
                              className="flex items-center gap-3 p-2 hover:bg-primary/10 rounded cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={selectedFilters[filter.id]?.includes(option) || false}
                                onChange={() => handleSelectFilter(filter.id, option)}
                                className="w-4 h-4 accent-primary"
                              />
                              <span className="text-sm text-foreground">{option}</span>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Clear filters button */}
            {totalSelected > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearAllFilters}
                className="flex-shrink-0 ml-auto px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive border border-border/40 rounded-sm hover:border-destructive/40 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
              >
                <X className="w-3 h-3" />
                Clear ({totalSelected})
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
