"use client";

import { CheckCircle2, UserCheck, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export function Audience() {
  return (
    <section className="py-20 md:py-28 relative bg-slate-900/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-brand-cyan uppercase px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            PUBLIC CIBLE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Cette formation est <span className="gradient-text">faite pour :</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Peut importe ton profil d'origine, si tu as une idée et la volonté de créer, tu as ta place.
          </p>
        </div>

        {/* Target Audience 10 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {SITE_CONFIG.targetAudience.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-2xl border border-slate-700/50 flex flex-col justify-between hover:border-brand-cyan/40 hover:bg-slate-800/80 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-white group-hover:text-brand-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Callout Box */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-center flex items-center justify-center gap-3 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <span className="text-sm sm:text-base font-bold text-emerald-300">
              « Aucun parcours de développeur professionnel n'est requis pour commencer. »
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
