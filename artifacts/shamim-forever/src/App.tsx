import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import NotFound from "@/pages/not-found";
import { MainLayout } from "@/components/layout/MainLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

// Lazy load Customer Pages
const Home = lazy(() => import("@/pages/home"));
const Shop = lazy(() => import("@/pages/shop"));
const ScentFinder = lazy(() => import("@/pages/shop/scent-finder"));
const ProductDetail = lazy(() => import("@/pages/product/[slug]"));
const Checkout = lazy(() => import("@/pages/checkout"));
const CheckoutSuccess = lazy(() => import("@/pages/checkout-success"));
const Auth = lazy(() => import("@/pages/auth"));
const Account = lazy(() => import("@/pages/account"));
const About = lazy(() => import("@/pages/about"));
const Atelier = lazy(() => import("@/pages/atelier"));
const Concierge = lazy(() => import("@/pages/concierge"));
const Boutiques = lazy(() => import("@/pages/boutiques"));
const Contact = lazy(() => import("@/pages/contact"));
const Terms = lazy(() => import("@/pages/terms"));
const ShippingReturns = lazy(() => import("@/pages/shipping-returns"));
const FAQ = lazy(() => import("@/pages/faq"));
const InnerCircle = lazy(() => import("@/pages/inner-circle"));
const Journal = lazy(() => import("@/pages/journal"));
const Blockchain = lazy(() => import("@/pages/blockchain"));
const OrderSuccess = lazy(() => import("@/pages/order-success"));

// Lazy load Admin Pages
const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const AdminProducts = lazy(() => import("@/pages/admin/products/index"));
const NewProduct = lazy(() => import("@/pages/admin/products/new"));
const EditProduct = lazy(() => import("@/pages/admin/products/[slug]"));
const AdminOrders = lazy(() => import("@/pages/admin/orders"));
const AdminCustomers = lazy(() => import("@/pages/admin/customers"));
const AdminAnalytics = lazy(() => import("@/pages/admin/analytics"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-primary font-serif tracking-widest text-sm uppercase opacity-60">Loading...</div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
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
      <Route path="/order-success">
        <MainLayout><OrderSuccess /></MainLayout>
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
      <Route path="/terms">
        <MainLayout><Terms /></MainLayout>
      </Route>
      <Route path="/shipping-returns">
        <MainLayout><ShippingReturns /></MainLayout>
      </Route>
      <Route path="/faq">
        <MainLayout><FAQ /></MainLayout>
      </Route>
      <Route path="/inner-circle">
        <MainLayout><InnerCircle /></MainLayout>
      </Route>
      <Route path="/journal">
        <MainLayout><Journal /></MainLayout>
      </Route>
      <Route path="/blockchain-authenticity">
        <MainLayout><Blockchain /></MainLayout>
      </Route>

      <Route>
        <MainLayout><NotFound /></MainLayout>
      </Route>
    </Switch>
    </Suspense>
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
