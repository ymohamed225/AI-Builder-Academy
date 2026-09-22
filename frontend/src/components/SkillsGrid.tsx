"use client";

import { CheckCircle2, Sparkles, Code2, Database, Shield, Layout, GitBranch, Terminal } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export function SkillsGrid() {
  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-brand-cyan uppercase px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            COMPÉTENCES OPÉRATIONNELLES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ce que tu vas <span className="gradient-text">apprendre</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Un programme structuré couvrant l'ensemble de la chaîne de valeur du produit numérique moderne.
          </p>
        </div>

        {/* Competencies Grid (17 Skills) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {SITE_CONFIG.skills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-card p-4 rounded-xl border border-slate-700/50 flex items-center gap-3 hover:border-brand-cyan/40 hover:bg-slate-800/80 transition-all duration-200 group"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                {skill}
              </span>
            </div>
          ))}
        </div>

        {/* Key Message Callout Box */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="gradient-border shadow-xl shadow-brand-500/10">
            <div className="gradient-border-inner p-6 sm:p-8 text-center space-y-3 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-cyan/10 blur-3xl pointer-events-none rounded-full" />
              <div className="inline-flex items-center gap-2 text-brand-cyan font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-brand-cyan" />
                <span>Philosophie AI Builder Academy</span>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
                « Nous ne t'apprenons pas seulement à utiliser une IA. <br className="hidden sm:block" />
                <span className="gradient-text">Nous t'apprenons à piloter l'IA pour construire correctement un produit.</span> »
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
