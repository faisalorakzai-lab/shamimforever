import { useState } from "react";
import { useListProducts, useDeleteProduct } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Search, Package } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListProductsQueryKey } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const { data: productsData, isLoading } = useListProducts({ search: search || undefined, limit: 50 });
  const deleteProduct = useDeleteProduct();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const products = productsData?.products || [];

  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      deleteProduct.mutate({ slug }, {
        onSuccess: () => {
          toast({ title: "Product Deleted", description: "The product has been removed from inventory." });
          queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
        }
      });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-foreground mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">Manage your product catalog.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-serif tracking-widest uppercase rounded-none flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </header>

      <div className="bg-secondary/30 border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products by name or SKU..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-border pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase tracking-widest text-muted-foreground bg-secondary/50 border-y border-border">
              <tr>
                <th className="px-4 py-4 font-normal">Product</th>
                <th className="px-4 py-4 font-normal">Category</th>
                <th className="px-4 py-4 font-normal">Price</th>
                <th className="px-4 py-4 font-normal">Stock</th>
                <th className="px-4 py-4 font-normal">Status</th>
                <th className="px-4 py-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground animate-pulse">Loading inventory...</td></tr>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-4 flex items-center gap-4">
                      <div className="w-10 h-12 bg-secondary shrink-0 border border-border flex items-center justify-center overflow-hidden">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        {product.sku && <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground capitalize">{product.category}</td>
                    <td className="px-4 py-4 text-primary">Rs {product.price.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs ${product.stock > 10 ? 'text-green-500 bg-green-500/10' : product.stock > 0 ? 'text-orange-500 bg-orange-500/10' : 'text-red-500 bg-red-500/10'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        {product.isFeatured && <span className="px-2 py-0.5 border border-primary/30 text-primary text-[10px] uppercase">Featured</span>}
                        {product.isNewArrival && <span className="px-2 py-0.5 border border-border text-muted-foreground text-[10px] uppercase">New</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/admin/products/${product.slug}/edit`} className="text-muted-foreground hover:text-foreground transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(product.slug)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No products found. Add your first masterpiece.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
