import { useGetAdminStats } from "@workspace/api-client-react";
import { Package, TrendingUp, Users, Clock, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useGetAdminStats();

  if (isLoading) {
    return <div className="animate-pulse space-y-8">
      <div className="h-10 bg-secondary w-64 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-secondary rounded"></div>)}
      </div>
    </div>;
  }

  if (!stats) return null;

  const kpis = [
    { label: "Total Revenue", value: `Rs ${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-primary" },
    { label: "Total Orders", value: stats.totalOrders, icon: Package, color: "text-blue-400" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: Clock, color: "text-orange-400" },
    { label: "Low Stock Items", value: stats.lowStockProducts, icon: AlertTriangle, color: "text-destructive" },
  ];

  return (
    <div className="space-y-12 max-w-7xl">
      <header>
        <h1 className="text-3xl font-serif text-foreground mb-2">Command Center Overview</h1>
        <p className="text-muted-foreground">Monitor your empire's performance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-secondary/30 border border-border p-6 flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">{kpi.label}</p>
              <p className="text-3xl font-serif text-foreground">{kpi.value}</p>
            </div>
            <div className={`p-3 bg-background rounded border border-border ${kpi.color}`}>
              <kpi.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-secondary/30 border border-border p-6">
          <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
            <h2 className="text-xl font-serif text-foreground">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase tracking-widest text-muted-foreground bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-normal">Order ID</th>
                  <th className="px-4 py-3 font-normal">Date</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                  <th className="px-4 py-3 font-normal text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.recentOrders?.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-4 font-medium text-foreground">#{order.id}</td>
                    <td className="px-4 py-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-background border border-border text-[10px] uppercase tracking-widest">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-primary font-medium">
                      Rs {order.totalAmount.toLocaleString()}
                    </td>
                  </tr>
                ))}
                {(!stats.recentOrders || stats.recentOrders.length === 0) && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No recent orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-secondary/30 border border-border p-6">
          <h2 className="text-xl font-serif text-foreground mb-6 border-b border-border pb-4">Top Products</h2>
          <div className="space-y-6">
            {stats.topProducts?.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="w-12 h-16 bg-secondary shrink-0 border border-border">
                  {product.images?.[0] && <img src={product.images[0]} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{product.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm text-primary">Rs {product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
