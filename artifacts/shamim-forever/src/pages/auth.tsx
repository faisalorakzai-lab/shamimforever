import { useState } from "react";
import { useLocation } from "wouter";
import { useLoginUser, useRegisterUser } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { getGetProfileQueryKey } from "@workspace/api-client-react";
import { signInWithFirebase, registerWithFirebase } from "@/lib/firebase";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useLoginUser();
  const register = useRegisterUser();

  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        signInWithFirebase(formData.email, formData.password);
        await new Promise<void>((resolve, reject) => {
          login.mutate(
            { data: { email: formData.email, password: formData.password } },
            {
              onSuccess: (data) => {
                localStorage.setItem("token", data.token);
                queryClient.invalidateQueries({ queryKey: getGetProfileQueryKey() });
                setLocation("/account");
                resolve();
              },
              onError: (err: Error) => reject(err),
            },
          );
        });
      } else {
        registerWithFirebase(formData.email, formData.password, formData.name);
        await new Promise<void>((resolve, reject) => {
          register.mutate(
            { data: formData },
            {
              onSuccess: (data) => {
                localStorage.setItem("token", data.token);
                queryClient.invalidateQueries({ queryKey: getGetProfileQueryKey() });
                setLocation("/account");
                resolve();
              },
              onError: (err: Error) => reject(err),
            },
          );
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed. Please try again.";
      setError(msg.replace("HTTP 401 Unauthorized: ", "").replace("HTTP 400 Bad Request: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-secondary/30 border border-border p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-gold-gradient mb-2">
            {isLogin ? "Welcome Back" : "Join The Inner Circle"}
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest">
            {isLogin ? "Enter your vault" : "Begin your journey"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif"
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
            <input
              required
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-transparent border-b border-border px-0 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-serif"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm font-serif border border-destructive/30 bg-destructive/10 px-4 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif tracking-widest uppercase py-6 mt-4"
          >
            {loading ? "Authenticating..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-border pt-6">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
          >
            {isLogin ? "Create an account instead" : "Already have an account?"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
