"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

const SESSION_TOKEN_KEY = "aibuilder_admin_token";
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// ─── Hook d'authentification ────────────────────────────────────────────────

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Vérifie le token stocké au chargement de la page
  useEffect(() => {
    const token = typeof window !== "undefined"
      ? sessionStorage.getItem(SESSION_TOKEN_KEY)
      : null;

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    // Vérifie la validité du token auprès du backend
    fetch(`${API_URL}/auth/verify-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.valid === true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
    }
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
}

// ─── Page de connexion ────────────────────────────────────────────────────────

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export function AdminLoginPage({ onLoginSuccess }: AdminLoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        // Stocker le token (pas le mot de passe !)
        sessionStorage.setItem(SESSION_TOKEN_KEY, data.token);
        onLoginSuccess();
      } else {
        setError(data.message || "Identifiants incorrects. Veuillez réessayer.");
      }
    } catch {
      setError("Impossible de contacter le serveur. Vérifiez votre connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-brand-cyan flex items-center justify-center shadow-2xl shadow-purple-500/40 mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Espace Administration Sécurisé
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-slate-300">
              Connexion requise
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Identifiant
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Votre identifiant"
                  required
                  autoComplete="off"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  autoComplete="new-password"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-brand-cyan text-white font-black text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connexion en cours...
                </span>
              ) : (
                "🔐 Se connecter"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-6">
            Accès réservé à l&apos;équipe {SITE_CONFIG.name}
          </p>
        </div>
      </div>
    </main>
  );
}
