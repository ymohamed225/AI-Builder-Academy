"use client";

import { AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export function ProjectsShowcase() {
  return (
    <section id="projects" className="py-20 md:py-28 relative bg-slate-900/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-brand-cyan uppercase px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            PRODUITS RÉELS & CAS PRATIQUES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Exemples de <span className="gradient-text">projets possibles</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Découvre les cas d'usages concrets que tu seras capable de développer de A à Z.
          </p>
        </div>

        {/* 8 Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {SITE_CONFIG.projects.map((project, idx) => {
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-700/50 overflow-hidden flex flex-col justify-between hover:border-brand-cyan/60 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  {/* Top Real Image Header Container */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    {/* Category Badge Pill on Image Top Right */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-cyan bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-brand-cyan/30 shadow-md">
                        {project.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-brand-cyan transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-normal line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer Badge */}
                <div className="px-5 pb-5 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Front + Back + BDD</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Prêt prod
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real MVP Disclaimer Notice */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 max-w-4xl mx-auto flex items-start gap-4 text-amber-200/90 text-xs sm:text-sm leading-relaxed shadow-sm">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-200 font-bold block mb-1">
              ⚠️ Précision importante sur la méthode pédagogique :
            </strong>
            Tous les projets présentés sont construits sous forme de <strong>MVP (Minimum Viable Product) réalistes, fonctionnels et évolutifs</strong>. L'objectif est d'obtenir une première version directement utilisable en production sur laquelle tu pourras ensuite ajouter des fonctionnalités à l'infini.
          </div>
        </div>

      </div>
    </section>
  );
}
