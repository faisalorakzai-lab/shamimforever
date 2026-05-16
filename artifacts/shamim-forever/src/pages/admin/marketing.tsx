import { useState } from "react";
import { useListDiscounts, useCreateDiscount, getListDiscountsQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Plus, Tag } from "lucide-react";

export default function AdminMarketing() {
  const { data: discounts, isLoading } = useListDiscounts();
  const createDiscount = useCreateDiscount();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    value: 0,
    minOrderAmount: 0,
    maxUses: 0,
    expiresAt: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDiscount.mutate({
      data: {
        ...formData,
        minOrderAmount: formData.minOrderAmount > 0 ? formData.minOrderAmount : undefined,
        maxUses: formData.maxUses > 0 ? formData.maxUses : undefined,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt).toISOString() : undefined,
      }
    }, {
      onSuccess: () => {
        toast({ title: "Discount Created", description: "The new discount code is now active." });
        queryClient.invalidateQueries({ queryKey: getListDiscountsQueryKey() });
        setIsCreating(false);
        setFormData({ code: "", type: "percentage", value: 0, minOrderAmount: 0, maxUses: 0, expiresAt: "" });
      }
    });
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-foreground mb-2">Marketing & Promotions</h1>
          <p className="text-muted-foreground">Manage discount codes and promotional campaigns.</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)} className="bg-primary text-primary-foreground hover:bg-primary/90 font-serif tracking-widest uppercase rounded-none flex items-center gap-2">
          {isCreating ? "Cancel" : <><Plus className="w-4 h-4" /> New Code</>}
        </Button>
      </header>

      {isCreating && (
        <div className="bg-secondary/30 border border-border p-6 mb-8">
          <h2 className="text-xl font-serif text-foreground mb-6">Create Discount Code</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Code (e.g. VIP20) *</label>
                <input required type="text" name="code" value={formData.code} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary font-serif uppercase" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Discount Type *</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary font-serif">
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (Rs)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Value *</label>
                <input required type="number" name="value" value={formData.value} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary font-serif" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Minimum Order Amount (Rs)</label>
                <input type="number" name="minOrderAmount" value={formData.minOrderAmount} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary font-serif" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Max Uses (0 for unlimited)</label>
                <input type="number" name="maxUses" value={formData.maxUses} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary font-serif" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Expiry Date</label>
                <input type="date" name="expiresAt" value={formData.expiresAt} onChange={handleChange} className="w-full bg-background border border-border px-4 py-2 text-foreground focus:outline-none focus:border-primary font-serif" style={{ colorScheme: 'dark' }} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={createDiscount.isPending} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif tracking-widest uppercase px-8">
                {createDiscount.isPending ? "Creating..." : "Save Discount"}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-secondary/30 border border-border p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase tracking-widest text-muted-foreground bg-secondary/50 border-y border-border">
              <tr>
                <th className="px-4 py-4 font-normal">Code</th>
                <th className="px-4 py-4 font-normal">Discount</th>
                <th className="px-4 py-4 font-normal">Rules</th>
                <th className="px-4 py-4 font-normal">Usage</th>
                <th className="px-4 py-4 font-normal">Expiry</th>
                <th className="px-4 py-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground animate-pulse">Loading campaigns...</td></tr>
              ) : discounts && discounts.length > 0 ? (
                discounts.map((discount) => (
                  <tr key={discount.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground uppercase tracking-widest">{discount.code}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-primary font-medium">
                      {discount.type === 'percentage' ? `${discount.value}% OFF` : `Rs ${discount.value.toLocaleString()} OFF`}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {discount.minOrderAmount ? `Min: Rs ${discount.minOrderAmount.toLocaleString()}` : 'No minimum'}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {discount.usedCount || 0} {discount.maxUses ? `/ ${discount.maxUses}` : 'uses'}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {discount.expiresAt ? new Date(discount.expiresAt).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-widest ${discount.isActive ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {discount.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No active discount campaigns.
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
