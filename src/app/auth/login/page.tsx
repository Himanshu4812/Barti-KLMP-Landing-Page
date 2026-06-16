"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, WifiOff, LogIn } from "lucide-react";
import { useAuthStore, isSupabaseConfigured } from "@/lib/stores/auth-store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [supabaseReady, setSupabaseReady] = useState(true);
  const router = useRouter();
  const setDemoUser = useAuthStore((s) => s.setDemoUser);

  useEffect(() => {
    setSupabaseReady(isSupabaseConfigured());
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Unable to connect to authentication server. Check your Supabase configuration.");
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setDemoUser();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {!supabaseReady && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <WifiOff className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800">Demo Mode</p>
              <p className="text-xs text-amber-700">
                Supabase not configured. Add <code className="bg-amber-100 px-1 rounded">.env</code> file for real auth.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-7 h-7 text-navy" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">BARTI KLMP</h1>
            <p className="text-sm text-gray-500 mt-1">
              {supabaseReady ? "Sign in to your account" : "Enter the demo dashboard"}
            </p>
          </div>

          {!supabaseReady && (
            <button
              onClick={handleDemoLogin}
              className="w-full py-3 text-sm font-medium text-white bg-navy rounded-xl hover:bg-navy-light transition-colors flex items-center justify-center gap-2 mb-6"
            >
              <LogIn className="w-4 h-4" />
              Enter Demo Dashboard
            </button>
          )}

          {supabaseReady && (
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                  placeholder="admin@barti.in"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
