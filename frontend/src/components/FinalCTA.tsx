"use client";

import Link from "next/link";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function FinalCTA() {
  const handleFinalCTAClick = () => {
    trackEvent("click_pre_registration", { source: "final_cta" });
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-hero-gradient">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-brand-cyan/30 text-xs sm:text-sm font-semibold text-brand-cyan shadow-lg">
          <Sparkles className="w-4 h-4 text-brand-cyan" />
          <span>PRÉ-INSCRIPTION 100% GRATUITE • PROCHAINE SESSION</span>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Ton idée mérite peut-être plus <br className="hidden sm:block" />
            qu'un simple cahier.
          </h2>

          <p className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-500 to-purple-600">
            Transforme-la en produit numérique avec l'IA.
          </p>
        </div>

        <div className="pt-4 flex flex-col items-center gap-3">
          <Link
            href="/pre-inscription"
            onClick={handleFinalCTAClick}
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-black text-white bg-gradient-to-r from-brand-500 via-blue-600 to-brand-cyan rounded-2xl shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all gap-2"
          >
            <span className="text-xl">🚀</span>
            <span>JE VEUX FAIRE MA PRÉ-INSCRIPTION</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>

          <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>La pré-inscription est 100% gratuite (0 FCFA) • Réponses sous 24h</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-mono">
          Analyse de dossier rapide • Réponse WhatsApp • Places limitées par promotion
        </p>

      </div>
    </section>
  );
}
