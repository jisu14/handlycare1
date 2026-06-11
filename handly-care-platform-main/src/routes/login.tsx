import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Successfully signed in!");
      navigate({ to: "/" });
    } catch (err: any) {
      toast.error(err.message || "Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Form Section */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 bg-background relative z-10">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 font-semibold tracking-tight hover:opacity-80 transition">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-glow">
            <HeartPulse className="h-4 w-4" />
          </span>
          <span className="text-base text-foreground">Handly Care</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access your organization's dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground/80">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition"
                placeholder="you@organization.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground/80">Password</label>
                <a href="#" className="text-xs font-medium text-[color:var(--brand)] hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-4 py-3 text-sm font-medium shadow-elegant hover:opacity-90 transition disabled:opacity-60 mt-6"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign in <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button onClick={() => window.dispatchEvent(new CustomEvent("handly:open-book-demo"))} className="font-medium text-foreground hover:underline">
              Request a demo
            </button>
          </p>
        </motion.div>
      </div>

      {/* Decorative Brand Section */}
      <div className="hidden lg:flex relative bg-[color:var(--brand)] flex-col justify-between p-12 overflow-hidden border-l border-border/10">
        <div className="absolute inset-0 bg-brand-gradient opacity-80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 dot-bg opacity-30" />
        
        <div className="relative z-10" />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 text-brand-foreground max-w-lg"
        >
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-md mb-6">
            Enterprise Security
          </div>
          <h2 className="text-4xl font-semibold tracking-tight mb-4">
            The operating system for modern home care.
          </h2>
          <p className="text-lg text-brand-foreground/80 font-medium">
            Join thousands of providers delivering better care outcomes with Handly.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
