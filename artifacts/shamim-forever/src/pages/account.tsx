import { useGetProfile, useLogoutUser, useListOrders } from "@workspace/api-client-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getGetProfileQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export default function Account() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: ordersData, isLoading: ordersLoading } = useListOrders();
  const logout = useLogoutUser();

  if (profileLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div></div>;
  }

  if (!profile) {
    setLocation("/login");
    return null;
  }

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("token");
        queryClient.invalidateQueries({ queryKey: getGetProfileQueryKey() });
        setLocation("/");
      }
    });
  };

  const orders = (ordersData as unknown as { id: number; status: string; createdAt: string; totalAmount: number; items: unknown[]; paymentStatus?: string }[] | undefined) || [];

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <h1 className="text-4xl font-serif text-gold-gradient mb-2">My Vault</h1>
            <p className="text-muted-foreground font-serif">Welcome back, {profile.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-primary text-primary hover:bg-primary/10 rounded-none uppercase tracking-widest font-serif bg-transparent">
            Sign Out
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Profile Details */}
          <div className="md:col-span-1 space-y-8">
            <div className="bg-secondary/30 border border-border p-6">
              <h3 className="font-serif text-xl text-foreground mb-6 uppercase tracking-widest border-b border-border pb-2">Profile</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Name</span>
                  <span className="text-foreground">{profile.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Email</span>
                  <span className="text-foreground">{profile.email}</span>
                </div>
                {profile.phone && (
                  <div>
                    <span className="text-muted-foreground block mb-1">Phone</span>
                    <span className="text-foreground">{profile.phone}</span>
                  </div>
                )}
              </div>
              {profile.role === "admin" && (
                <Link href="/admin">
                  <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest font-serif">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Orders */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-xl text-foreground mb-6 uppercase tracking-widest border-b border-border pb-2">Order History</h3>
            
            {ordersLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => <div key={i} className="h-24 bg-secondary animate-pulse"></div>)}
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-border p-6 bg-secondary/10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors hover:bg-secondary/30">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-serif text-lg text-primary">Order #{order.id}</span>
                        <span className="px-2 py-1 bg-background border border-border text-xs uppercase tracking-widest text-muted-foreground">{order.status}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm text-foreground">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="font-serif text-xl text-foreground mb-2">Rs {order.totalAmount.toLocaleString()}</p>
                      <Link href={`/account/orders/${order.id}`} className="text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-border bg-secondary/10">
                <p className="text-muted-foreground font-serif mb-4">You haven't placed any orders yet.</p>
                <Link href="/shop">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none uppercase tracking-widest font-serif px-8">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
