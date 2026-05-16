import { useState, useEffect } from "react";
import { useGetProduct, useUpdateProduct } from "@workspace/api-client-react";
import { Link, useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { getGetProductQueryKey, getListProductsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EditProduct() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: product, isLoading } = useGetProduct(slug!, {
    query: {
      enabled: !!slug,
      queryKey: getGetProductQueryKey(slug!)
    }
  });

  const updateProduct = useUpdateProduct();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "perfumes",
    stock: 0,
    isFeatured: false,
    isNewArrival: false,
    hasEngravingOption: false,
    scentNotes: ""
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price,
        originalPrice: product.originalPrice || 0,
        category: product.category,
        stock: product.stock,
        isFeatured: product.isFeatured || false,
        isNewArrival: product.isNewArrival || false,
        hasEngravingOption: product.hasEngravingOption || false,
        scentNotes: product.scentNotes || ""
      });
    }
  }, [product]);

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
    updateProduct.mutate({
      slug: slug!,
      data: {
        ...formData,
        originalPrice: formData.originalPrice > 0 ? formData.originalPrice : undefined,
      }
    }, {
      onSuccess: () => {
        toast({ title: "Product Updated", description: "Changes have been saved successfully." });
        queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetProductQueryKey(slug!) });
        setLocation("/admin/products");
      }
    });
  };

  if (isLoading) {
    return <div className="animate-pulse h-96 bg-secondary/30 rounded"></div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="max-w-4xl space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/admin/products" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif text-foreground mb-1">Edit Masterpiece</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest">{product.name}</p>
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
          <Button type="submit" disabled={updateProduct.isPending} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif tracking-widest uppercase px-8">
            {updateProduct.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
