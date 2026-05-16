import { useState } from "react";
import { useCreateProduct } from "@workspace/api-client-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { getListProductsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewProduct() {
  const [, setLocation] = useLocation();
  const createProduct = useCreateProduct();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "perfumes",
    stock: 0,
    sku: "",
    isFeatured: false,
    isNewArrival: false,
    hasEngravingOption: false,
    scentNotes: "",
    ingredients: "",
    usageInstructions: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (type === "number") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProduct.mutate({
      data: {
        ...formData,
        originalPrice: formData.originalPrice > 0 ? formData.originalPrice : undefined,
        images: [] // Assuming image upload is handled separately or later
      }
    }, {
      onSuccess: () => {
        toast({ title: "Product Created", description: "The masterpiece has been added to the catalog." });
        queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
        setLocation("/admin/products");
      }
    });
  };

  return (
    <div className="max-w-4xl space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/admin/products" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif text-foreground mb-1">New Masterpiece</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest">Add to Inventory</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-secondary/30 border border-border p-6 space-y-6">
          <h2 className="text-xl font-serif text-foreground border-b border-border pb-2">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Product Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Description</label>
              <textarea rows={4} name="description" value={formData.description} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif resize-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Price (Rs) *</label>
              <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Original Price (Rs) - For Sales</label>
              <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Category *</label>
              <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif cursor-pointer">
                <option value="perfumes">Fine Fragrances</option>
                <option value="jewelry">High Jewelry</option>
                <option value="cosmetics">Cosmetics</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Stock *</label>
              <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">SKU</label>
              <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 border border-border p-6 space-y-6">
          <h2 className="text-xl font-serif text-foreground border-b border-border pb-2">Details & Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Scent Notes</label>
              <textarea rows={2} name="scentNotes" value={formData.scentNotes} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif resize-none" placeholder="e.g. Top: Bergamot, Middle: Rose, Base: Oud" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Ingredients</label>
              <textarea rows={2} name="ingredients" value={formData.ingredients} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif resize-none" />
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 border border-border p-6 space-y-6">
          <h2 className="text-xl font-serif text-foreground border-b border-border pb-2">Flags</h2>
          
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-4 h-4 accent-primary" />
              <span className="text-sm font-medium text-foreground">Featured Product</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="isNewArrival" checked={formData.isNewArrival} onChange={handleChange} className="w-4 h-4 accent-primary" />
              <span className="text-sm font-medium text-foreground">New Arrival</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="hasEngravingOption" checked={formData.hasEngravingOption} onChange={handleChange} className="w-4 h-4 accent-primary" />
              <span className="text-sm font-medium text-foreground">Enable Engraving Option</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/products">
            <Button variant="outline" type="button" className="border-border text-foreground hover:bg-secondary rounded-none font-serif tracking-widest uppercase">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={createProduct.isPending} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif tracking-widest uppercase px-8">
            {createProduct.isPending ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
