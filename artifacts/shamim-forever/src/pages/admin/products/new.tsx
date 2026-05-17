import { useState, useRef } from "react";
import { useCreateProduct } from "@workspace/api-client-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { getListProductsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

async function uploadToCloudinary(file: File): Promise<string> {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ file: base64 }),
  });

  if (!res.ok) throw new Error("Image upload failed");
  const data = (await res.json()) as { url: string };
  return data.url;
}

export default function NewProduct() {
  const [, setLocation] = useLocation();
  const createProduct = useCreateProduct();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

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
    usageInstructions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else if (type === "number") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary));
      setImages((prev) => [...prev, ...urls]);
      toast({ title: "Images Uploaded", description: `${urls.length} image(s) added successfully.` });
    } catch {
      toast({ title: "Upload Failed", description: "Could not upload image. Check Cloudinary configuration.", variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProduct.mutate(
      {
        data: {
          ...formData,
          originalPrice: formData.originalPrice > 0 ? formData.originalPrice : undefined,
          images,
        },
      },
      {
        onSuccess: () => {
          toast({ title: "Product Created", description: "The masterpiece has been added to the catalog." });
          queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
          setLocation("/admin/products");
        },
      },
    );
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
        {/* Images */}
        <div className="bg-secondary/30 border border-border p-6 space-y-4">
          <h2 className="text-xl font-serif text-foreground border-b border-border pb-2">
            Product Images
          </h2>
          <div className="flex flex-wrap gap-4">
            {images.map((url, i) => (
              <div key={i} className="relative w-24 h-28 border border-border overflow-hidden group">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-background/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-destructive" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-[9px] text-center py-0.5 uppercase tracking-widest">
                    Primary
                  </span>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-24 h-28 border border-dashed border-border hover:border-primary flex flex-col items-center justify-center gap-2 transition-colors text-muted-foreground hover:text-primary disabled:opacity-50"
            >
              {uploading ? (
                <div className="w-4 h-4 border-t-2 border-primary rounded-full animate-spin" />
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest">Add Image</span>
                </>
              )}
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
          {images.length === 0 && (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <ImageIcon className="w-3 h-3" /> Upload product images via Cloudinary
            </p>
          )}
        </div>

        {/* Basic Info */}
        <div className="bg-secondary/30 border border-border p-6 space-y-6">
          <h2 className="text-xl font-serif text-foreground border-b border-border pb-2">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Product Name *
              </label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Description
              </label>
              <textarea rows={4} name="description" value={formData.description} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Price (Rs) *</label>
              <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Original Price (Rs) — For Sales
              </label>
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

        {/* Details */}
        <div className="bg-secondary/30 border border-border p-6 space-y-6">
          <h2 className="text-xl font-serif text-foreground border-b border-border pb-2">
            Details & Specifications
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Scent Notes</label>
              <textarea rows={2} name="scentNotes" value={formData.scentNotes} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif resize-none" placeholder="e.g. Top: Bergamot, Middle: Rose, Base: Oud" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Ingredients</label>
              <textarea rows={2} name="ingredients" value={formData.ingredients} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif resize-none" />
            </div>
          </div>
        </div>

        {/* Flags */}
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
          <Button type="submit" disabled={createProduct.isPending || uploading} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif tracking-widest uppercase px-8">
            {createProduct.isPending ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
