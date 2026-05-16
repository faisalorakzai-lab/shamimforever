import { Link } from "wouter";
import { User, LogOut, LayoutDashboard, ShoppingBag, Users, Tag, Package } from "lucide-react";
import { useGetProfile, useLogoutUser } from "@workspace/api-client-react";
import { getGetProfileQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading } = useGetProfile();
  const logout = useLogoutUser();
  const queryClient = useQueryClient();

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div></div>;
  }

  if (profile?.role !== "admin") {
    return <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-3xl font-serif text-destructive mb-4">Access Denied</h1>
      <p className="text-muted-foreground mb-8">You do not have permission to view the command center.</p>
      <Link href="/"><button className="text-primary hover:underline">Return to Store</button></Link>
    </div>;
  }

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("token");
        queryClient.invalidateQueries({ queryKey: getGetProfileQueryKey() });
        window.location.href = "/";
      }
    });
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Command Center", href: "/admin" },
    { icon: Package, label: "Inventory", href: "/admin/products" },
    { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
    { icon: Users, label: "Customers", href: "/admin/customers" },
    { icon: Tag, label: "Marketing", href: "/admin/marketing" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-secondary/30 border-r border-border flex flex-col shrink-0 lg:min-h-screen sticky top-0">
        <div className="p-6 border-b border-border flex items-center justify-between lg:block">
          <div>
            <h1 className="text-xl font-serif text-primary mb-1">SF Admin</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Command Center</p>
          </div>
        </div>
        
        <nav className="flex-1 py-6 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 px-4 lg:px-6">
          {navItems.map((item) => {
            const isActive = window.location.pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors whitespace-nowrap ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border mt-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-primary">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-foreground">{profile.name}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-muted-foreground hover:text-destructive transition-colors p-2">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
