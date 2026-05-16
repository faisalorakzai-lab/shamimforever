import { useState } from "react";
import { useListCustomers } from "@workspace/api-client-react";
import { Search, User } from "lucide-react";

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const { data: customersData, isLoading } = useListCustomers({ search: search || undefined });

  const customers = (customersData as unknown as { id: number; name: string; email: string; phone?: string | null; orderCount: number; totalSpent: number; createdAt: string }[] | undefined) || [];

  return (
    <div className="space-y-8 max-w-7xl">
      <header>
        <h1 className="text-3xl font-serif text-foreground mb-2">Clientele</h1>
        <p className="text-muted-foreground">Manage your most valued clients.</p>
      </header>

      <div className="bg-secondary/30 border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
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
                <th className="px-4 py-4 font-normal">Client</th>
                <th className="px-4 py-4 font-normal">Email</th>
                <th className="px-4 py-4 font-normal">Phone</th>
                <th className="px-4 py-4 font-normal">Orders</th>
                <th className="px-4 py-4 font-normal">Total Spent</th>
                <th className="px-4 py-4 font-normal">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground animate-pulse">Loading clientele data...</td></tr>
              ) : customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-foreground">{customer.name}</span>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{customer.email}</td>
                    <td className="px-4 py-4 text-muted-foreground">{customer.phone || '-'}</td>
                    <td className="px-4 py-4 font-medium">{customer.orderCount}</td>
                    <td className="px-4 py-4 text-primary font-medium">
                      Rs {(customer.totalSpent || 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{new Date(customer.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No clients found.
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
