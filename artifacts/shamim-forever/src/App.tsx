import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import NotFound from "@/pages/not-found";
import { MainLayout } from "@/components/layout/MainLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

// Import Customer Pages
import Home from "@/pages/home";
import Shop from "@/pages/shop";
import ScentFinder from "@/pages/shop/scent-finder";
import ProductDetail from "@/pages/product/[slug]";
import Checkout from "@/pages/checkout";
import CheckoutSuccess from "@/pages/checkout-success";
import Auth from "@/pages/auth";
import Account from "@/pages/account";
import About from "@/pages/about";
import Atelier from "@/pages/atelier";
import Concierge from "@/pages/concierge";
import Boutiques from "@/pages/boutiques";
import Contact from "@/pages/contact";

// Import Admin Pages
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProducts from "@/pages/admin/products/index";
import NewProduct from "@/pages/admin/products/new";
import EditProduct from "@/pages/admin/products/[slug]";
import AdminOrders from "@/pages/admin/orders";
import AdminCustomers from "@/pages/admin/customers";
import AdminAnalytics from "@/pages/admin/analytics";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Admin Routes */}
      <Route path="/admin">
        <AdminLayout><AdminDashboard /></AdminLayout>
      </Route>
      <Route path="/admin/products">
        <AdminLayout><AdminProducts /></AdminLayout>
      </Route>
      <Route path="/admin/products/new">
        <AdminLayout><NewProduct /></AdminLayout>
      </Route>
      <Route path="/admin/products/:slug/edit">
        <AdminLayout><EditProduct /></AdminLayout>
      </Route>
      <Route path="/admin/orders">
        <AdminLayout><AdminOrders /></AdminLayout>
      </Route>
      <Route path="/admin/customers">
        <AdminLayout><AdminCustomers /></AdminLayout>
      </Route>
      <Route path="/admin/analytics">
        <AdminLayout><AdminAnalytics /></AdminLayout>
      </Route>
      {/* Fallback for unimplemented admin routes */}
      <Route path="/admin/:rest*">
        <AdminLayout><div className="p-8 text-center text-muted-foreground font-serif text-xl">Module under construction</div></AdminLayout>
      </Route>

      {/* Customer Routes */}
      <Route path="/">
        <MainLayout><Home /></MainLayout>
      </Route>
      <Route path="/shop">
        <MainLayout><Shop /></MainLayout>
      </Route>
      <Route path="/shop/scent-finder">
        <MainLayout><ScentFinder /></MainLayout>
      </Route>
      <Route path="/product/:slug">
        <MainLayout><ProductDetail /></MainLayout>
      </Route>
      <Route path="/checkout">
        <MainLayout><Checkout /></MainLayout>
      </Route>
      <Route path="/checkout/success">
        <MainLayout><CheckoutSuccess /></MainLayout>
      </Route>
      <Route path="/login">
        <MainLayout><Auth /></MainLayout>
      </Route>
      <Route path="/account">
        <MainLayout><Account /></MainLayout>
      </Route>
      <Route path="/about">
        <MainLayout><About /></MainLayout>
      </Route>
      <Route path="/atelier">
        <MainLayout><Atelier /></MainLayout>
      </Route>
      <Route path="/concierge">
        <MainLayout><Concierge /></MainLayout>
      </Route>
      <Route path="/boutiques">
        <MainLayout><Boutiques /></MainLayout>
      </Route>
      <Route path="/contact">
        <MainLayout><Contact /></MainLayout>
      </Route>

      <Route>
        <MainLayout><NotFound /></MainLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
