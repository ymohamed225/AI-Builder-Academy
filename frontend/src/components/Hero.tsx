"use client";

import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { HeroDashboard } from "./HeroDashboard";

export function Hero() {
  const handlePrimaryCTAClick = () => {
    trackEvent("click_pre_registration", { source: "hero_primary" });
  };

  const handleProgramCTAClick = () => {
    trackEvent("click_program", { source: "hero_secondary" });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-hero-gradient">
      {/* Glow Effects Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-brand-cyan/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges & Accroche */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-brand-cyan/30 text-xs sm:text-sm font-semibold text-brand-cyan shadow-lg shadow-brand-cyan/10 animate-pulse-slow">
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            <span>AI BUILDER ACADEMY CI</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">{SITE_CONFIG.tagline}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.1]">
            Crée ton application <br className="hidden sm:block" />
            <span className="gradient-text">avec l'IA.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl font-normal leading-relaxed">
            De l'idée à la mise en production, apprends à concevoir, développer, tester et déployer des applications modernes grâce à l'intelligence artificielle et au <span className="text-brand-cyan font-bold">vibe coding</span>.
          </p>

          {/* Badges Pill Categories */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
            {SITE_CONFIG.heroBadges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-slate-800/80 text-brand-cyan text-xs font-bold border border-slate-700 shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col items-center gap-3 pt-6 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/pre-inscription"
                onClick={handlePrimaryCTAClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-extrabold text-white bg-gradient-to-r from-brand-500 via-blue-600 to-cyan-500 rounded-2xl shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span className="mr-2">🚀</span>
                <span>Faire ma pré-inscription gratuite</span>
              </Link>

              <a
                href="#program"
                onClick={handleProgramCTAClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white glass-card border border-slate-700/60 rounded-2xl hover:border-brand-cyan/40 hover:bg-slate-800/80 transition-all shadow-sm"
              >
                <BookOpen className="w-5 h-5 mr-2 text-brand-cyan" />
                <span>Voir le programme</span>
              </a>
            </div>

            {/* 100% Free Sub-Badge */}
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
              ✨ La pré-inscription est 100% gratuite (0 FCFA) • Aucun paiement requis
            </span>
          </div>
        </div>

        {/* Visual Element: Process Flow Stepper + Interactive Epic Hero Dashboard */}
        <div className="mt-16 sm:mt-20">
          
          {/* Flow Stepper Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
            {SITE_CONFIG.ibtlSteps.map((step, idx) => (
              <div
                key={idx}
                className="glass-card p-4 rounded-xl border border-slate-800 flex items-center gap-3 relative overflow-hidden group hover:border-brand-cyan/40 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-cyan font-bold text-xs flex items-center justify-center border border-brand-cyan/30">
                  {step.step}
                </div>
                <div>
                  <span className="block text-xs font-black tracking-widest text-brand-cyan uppercase">
                    {step.code}
                  </span>
                  <span className="text-xs font-medium text-slate-300 line-clamp-1">
                    {step.title.split("&")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Breathtaking Hero Dashboard */}
          <HeroDashboard />

        </div>

      </div>
    </section>
  );
}
