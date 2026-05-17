import { Link, useLocation } from "wouter";
  import { LayoutDashboard, ShoppingBag, Users, Tag, Package, BarChart2 } from "lucide-react";

  export function AdminLayout({ children }: { children: React.ReactNode }) {
    const [location] = useLocation();
    const navItems = [
      { icon: LayoutDashboard, label: "Command Center", href: "/admin" },
      { icon: Package, label: "Inventory", href: "/admin/products" },
      { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
      { icon: Users, label: "Customers", href: "/admin/customers" },
      { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
      { icon: Tag, label: "Marketing", href: "/admin/marketing" },
    ];
    return (
      <div className="min-h-screen bg-background flex flex-col lg:flex-row">
        <aside className="w-full lg:w-64 bg-secondary/30 border-r border-border flex flex-col shrink-0 lg:min-h-screen sticky top-0 z-40">
          <div className="p-6 border-b border-border">
            <Link href="/"><h1 className="text-xl font-serif text-primary mb-1 cursor-pointer hover:opacity-80 transition-opacity">SF Admin</h1></Link>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Command Center</p>
          </div>
          <nav className="flex-1 py-6 flex flex-row lg:flex-col overflow-x-auto gap-1 px-4 lg:px-6">
            {navItems.map((item) => {
              const isActive = location === item.href || location.startsWith(item.href + "/");
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors whitespace-nowrap ${isActive ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                  <item.icon className="w-4 h-4 shrink-0" />{item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-6 border-t border-border">
            <p className="text-xs text-muted-foreground">Shamim Forever Admin</p>
            <p className="text-xs text-primary/60 mt-1">Orakzai Group</p>
          </div>
        </aside>
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full min-h-screen">{children}</main>
      </div>
    );
  }
  