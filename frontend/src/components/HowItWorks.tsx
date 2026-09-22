"use client";

import { MessageSquare, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { openWhatsApp } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function HowItWorks() {
  const handleTalkToTrainerClick = () => {
    trackEvent("click_whatsapp", { source: "how_it_works_trainer" });
    openWhatsApp(SITE_CONFIG.whatsappMessages.general);
  };

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-brand-cyan uppercase px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            TRANSPARENCE & PROCESSUS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Comment <span className="gradient-text">ça marche ?</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Un parcours simple et sécurisé de la première prise de contact au démarrage du cours.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {SITE_CONFIG.howItWorksSteps.map((item) => (
            <div
              key={item.step}
              className="glass-card p-6 rounded-2xl border border-slate-700/50 space-y-3 relative overflow-hidden group hover:border-brand-cyan/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan font-black text-sm flex items-center justify-center border border-brand-cyan/20">
                  0{item.step}
                </div>
                <span className="text-xs font-mono text-slate-400">Étape {item.step}/6</span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Question Box CTA */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="gradient-border shadow-xl shadow-brand-500/10">
            <div className="gradient-border-inner p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan mx-auto flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-black text-white">
                Une question avant de t'inscrire ?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                Notre équipe pédagogique est disponible en direct sur WhatsApp pour échanger avec toi et t'orienter vers la formule la plus adaptée.
              </p>

              <div className="pt-2">
                <button
                  onClick={handleTalkToTrainerClick}
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  <span>💬 Parler à un formateur</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
