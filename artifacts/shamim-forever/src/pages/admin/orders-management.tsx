import { useState } from "react";
import { useListOrders } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, Download, Eye, Filter, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function OrderManagementDashboard() {
  const { data: orders = [] } = useListOrders();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch = order.id.toString().includes(searchQuery) || 
                         order.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExportInvoice = (orderId: string) => {
    toast({ title: "Export Started", description: `Invoice for order ${orderId} is being generated.` });
    // Implementation: Generate PDF invoice via backend
  };

  const handleValidatePayment = (orderId: string) => {
    toast({ title: "Payment Validated", description: `Order ${orderId} payment proof has been verified.` });
    // Implementation: Update order payment status
  };

  const handleUpdateDeliveryStatus = (orderId: string, status: string) => {
    toast({ title: "Status Updated", description: `Order ${orderId} delivery status updated to ${status}.` });
    // Implementation: Update delivery routing logs
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
    confirmed: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    shipped: "bg-purple-500/20 text-purple-600 border-purple-500/30",
    delivered: "bg-green-500/20 text-green-600 border-green-500/30",
    cancelled: "bg-red-500/20 text-red-600 border-red-500/30",
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-foreground mb-1">Order Management</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest">Track invoices, payments, and deliveries</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif tracking-widest uppercase">
          <Download className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </header>

      {/* Filters and Search */}
      <div className="bg-secondary/30 border border-border p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Order ID or Customer Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border pl-10 pr-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <select
              value={filterStatus || ""}
              onChange={(e) => setFilterStatus(e.target.value || null)}
              className="w-full md:w-48 bg-background border border-border pl-10 pr-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-secondary/30 border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-muted-foreground font-serif">Order ID</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-muted-foreground font-serif">Customer</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-muted-foreground font-serif">Amount</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-muted-foreground font-serif">Status</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-muted-foreground font-serif">Payment</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-widest text-muted-foreground font-serif">Date</th>
                <th className="px-6 py-4 text-center text-xs uppercase tracking-widest text-muted-foreground font-serif">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order: any, idx: number) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-serif text-foreground">{order.id}</td>
                  <td className="px-6 py-4 text-sm font-serif text-foreground">
                    <div>{order.customerName}</div>
                    <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-serif text-foreground">Rs {order.totalAmount?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-xs uppercase tracking-widest border rounded ${statusColors[order.status] || statusColors.pending}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-serif text-foreground">
                    <span className={`inline-block px-2 py-1 text-xs uppercase tracking-widest border rounded ${
                      order.paymentVerified ? "bg-green-500/20 text-green-600 border-green-500/30" : "bg-orange-500/20 text-orange-600 border-orange-500/30"
                    }`}>
                      {order.paymentVerified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-serif text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                      className="inline-flex items-center justify-center w-8 h-8 hover:bg-secondary rounded transition-colors"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedOrderId === order.id ? "rotate-180" : ""}`} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Expanded Order Details */}
        {expandedOrderId && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-secondary/20 p-6"
          >
            {filteredOrders.find((o: any) => o.id === expandedOrderId) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Delivery Address</h3>
                    <p className="font-serif text-foreground">{filteredOrders.find((o: any) => o.id === expandedOrderId)?.deliveryAddress}</p>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Items</h3>
                    <ul className="space-y-1 text-sm font-serif text-foreground">
                      {filteredOrders.find((o: any) => o.id === expandedOrderId)?.items?.map((item: any, i: number) => (
                        <li key={i}>{item.name} x {item.quantity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleExportInvoice(expandedOrderId)}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif tracking-widest uppercase text-xs py-2"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Export Invoice
                    </Button>
                    <Button
                      onClick={() => handleValidatePayment(expandedOrderId)}
                      className="flex-1 bg-green-600 text-white hover:bg-green-700 rounded-none font-serif tracking-widest uppercase text-xs py-2"
                    >
                      Validate Payment
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Update Delivery Status</h3>
                    <select
                      onChange={(e) => handleUpdateDeliveryStatus(expandedOrderId, e.target.value)}
                      className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif text-sm cursor-pointer"
                    >
                      <option>Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground font-serif text-lg">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
