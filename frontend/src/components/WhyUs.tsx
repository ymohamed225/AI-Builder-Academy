"use client";

import { Lightbulb, Cpu, FlaskConical, Rocket } from "lucide-react";

export function WhyUs() {
  const cards = [
    {
      icon: Lightbulb,
      code: "💡 IDEA",
      title: "Clarifier & Valider",
      desc: "Transformer une idée brute en projet concret, structuré et prêt à être construit.",
      color: "from-amber-500/20 to-yellow-500/5",
      borderColor: "group-hover:border-amber-500/40",
      iconColor: "text-amber-400",
    },
    {
      icon: Cpu,
      code: "⚙️ BUILD",
      title: "Vibe Coding & IA",
      desc: "Construire l'application pas à pas avec l'IA et les meilleures méthodes modernes.",
      color: "from-blue-500/20 to-cyan-500/5",
      borderColor: "group-hover:border-brand-cyan/40",
      iconColor: "text-brand-cyan",
    },
    {
      icon: FlaskConical,
      code: "🧪 TEST",
      title: "Tester & Sécuriser",
      desc: "Tester les fonctionnalités, corriger les erreurs et vérifier les règles de sécurité.",
      color: "from-purple-500/20 to-indigo-500/5",
      borderColor: "group-hover:border-purple-500/40",
      iconColor: "text-purple-400",
    },
    {
      icon: Rocket,
      code: "🚀 LAUNCH",
      title: "Mise en Production",
      desc: "Mettre son application en ligne, accessible à ses utilisateurs et clients réels.",
      color: "from-emerald-500/20 to-teal-500/5",
      borderColor: "group-hover:border-emerald-500/40",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 relative bg-slate-900/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-brand-cyan uppercase px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            POURQUOI CETTE FORMATION ?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Tu as une idée ? <br className="hidden sm:block" />
            <span className="gradient-text">Transforme-la en application.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed pt-2 font-normal">
            Aujourd'hui, il n'est plus nécessaire d'être développeur pendant plusieurs années pour commencer à construire un produit numérique. Avec les bons outils, une bonne méthode et l'intelligence artificielle, tu peux passer de l'idée à un prototype puis à une application fonctionnelle.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className={`group glass-card p-6 rounded-2xl border border-slate-700/50 transition-all duration-300 ${card.borderColor} hover:-translate-y-1 relative overflow-hidden`}
              >
                {/* Accent Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b ${card.color} opacity-40 group-hover:opacity-80 transition-opacity`} />
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center shadow-sm">
                      <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <span className="text-xs font-black text-slate-400 tracking-wider font-mono">
                      {card.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
