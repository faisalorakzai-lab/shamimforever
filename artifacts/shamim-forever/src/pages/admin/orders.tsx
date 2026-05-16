import { useState } from "react";
import { useListOrders, useUpdateOrderStatus } from "@workspace/api-client-react";
import { getListOrdersQueryKey, getGetAdminStatsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { data: ordersData, isLoading } = useListOrders({ status: statusFilter || undefined });
  const updateStatus = useUpdateOrderStatus();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const orders = (ordersData as unknown as { id: number; status: string; createdAt: string; totalAmount: number; paymentStatus: string; shippingAddress: Record<string, string> }[] | undefined) || [];

  const handleStatusChange = (orderId: number, newStatus: string) => {
    updateStatus.mutate({
      id: orderId,
      data: {
        status: newStatus
      }
    }, {
      onSuccess: () => {
        toast({ title: "Status Updated", description: `Order #${orderId} status is now ${newStatus}.` });
        queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
      }
    });
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <header>
        <h1 className="text-3xl font-serif text-foreground mb-2">Order Management</h1>
        <p className="text-muted-foreground">Process and track customer orders.</p>
      </header>

      <div className="bg-secondary/30 border border-border p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-widest">
            <span>Filter:</span>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border border-border text-foreground focus:ring-0 cursor-pointer font-serif px-2 py-1"
            >
              <option value="">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase tracking-widest text-muted-foreground bg-secondary/50 border-y border-border">
              <tr>
                <th className="px-4 py-4 font-normal">Order ID</th>
                <th className="px-4 py-4 font-normal">Date</th>
                <th className="px-4 py-4 font-normal">Customer</th>
                <th className="px-4 py-4 font-normal">Total</th>
                <th className="px-4 py-4 font-normal">Payment</th>
                <th className="px-4 py-4 font-normal">Status</th>
                <th className="px-4 py-4 font-normal text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground animate-pulse">Loading orders...</td></tr>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-4 font-medium text-foreground">#{order.id}</td>
                    <td className="px-4 py-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                    </td>
                    <td className="px-4 py-4 text-primary font-medium">Rs {order.totalAmount.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-widest ${order.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-background border border-border text-[10px] uppercase tracking-widest">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="bg-transparent border border-border text-foreground text-xs uppercase tracking-widest px-2 py-1 cursor-pointer focus:outline-none focus:border-primary"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    No orders found.
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
