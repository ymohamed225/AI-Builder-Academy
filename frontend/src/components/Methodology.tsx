"use client";

import { Lightbulb, Cpu, FlaskConical, Rocket, Target, Zap } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

const iconMap = [Lightbulb, Cpu, FlaskConical, Rocket];

export function Methodology() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-brand-cyan uppercase px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            CADRE MÉTHODOLOGIQUE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Notre méthode : <span className="gradient-text-cyan">I.B.T.L.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Un processus structuré et reproductible pour concrétiser n'importe quel projet d'application.
          </p>
        </div>

        {/* Timeline 4 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 relative">
          {SITE_CONFIG.ibtlSteps.map((step, idx) => {
            const IconComp = iconMap[idx] || Target;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between relative group hover:border-brand-cyan/50 hover:bg-slate-900/90 transition-all duration-300"
              >
                {/* Step Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-500 font-mono">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
                    {step.code}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                  Étape {idx + 1} / 4
                </div>
              </div>
            );
          })}
        </div>

        {/* 20% Théorie • 80% Pratique Highlight Banner */}
        <div className="mt-14 max-w-2xl mx-auto">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-500/20 via-blue-600/10 to-brand-cyan/20 border border-brand-cyan/40 text-center space-y-2 shadow-xl">
            <div className="inline-flex items-center gap-2 text-brand-cyan font-black text-sm uppercase tracking-wider">
              <Zap className="w-4 h-4 text-brand-cyan animate-bounce" />
              <span>APPROCHE HYPER PRATIQUE</span>
            </div>
            <div className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              ⚡ <span className="gradient-text">20% théorie • 80% pratique</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Pas de longs cours magistraux. Chaque notion est immédiatement mise en application sur ton produit.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
