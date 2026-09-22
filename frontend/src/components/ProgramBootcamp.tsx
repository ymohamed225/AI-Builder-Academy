"use client";

import { useState } from "react";
import { Clock, Calendar, Video, CheckCircle2, Sparkles, ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export function ProgramBootcamp() {
  const [openWeek, setOpenWeek] = useState<number>(1);

  return (
    <section id="program" className="py-20 md:py-28 relative bg-slate-900/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-brand-cyan uppercase px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            CURRICULUM DÉTAILLÉ
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Programme du <span className="gradient-text">Bootcamp</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            4 semaines intensives pour passer de l'idée brute au déploiement en ligne.
          </p>
        </div>

        {/* 4 Stats Highlights Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
          <div className="glass-card p-4 rounded-xl border border-slate-700/50 text-center space-y-1">
            <span className="text-2xl font-black text-brand-cyan">4</span>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">SEMAINES</span>
          </div>
          <div className="glass-card p-4 rounded-xl border border-slate-700/50 text-center space-y-1">
            <span className="text-2xl font-black text-brand-cyan">8</span>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">SESSIONS LIVE</span>
          </div>
          <div className="glass-card p-4 rounded-xl border border-slate-700/50 text-center space-y-1">
            <span className="text-2xl font-black text-brand-cyan">2H</span>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">PAR SESSION</span>
          </div>
          <div className="glass-card p-4 rounded-xl border border-slate-700/50 text-center space-y-1">
            <span className="text-2xl font-black text-emerald-400">100%</span>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">PRATIQUE</span>
          </div>
        </div>

        {/* Accordion / Weeks Detail List */}
        <div className="mt-12 max-w-4xl mx-auto space-y-4">
          {SITE_CONFIG.curriculum.map((week) => {
            const isOpen = openWeek === week.weekNumber;
            return (
              <div
                key={week.weekNumber}
                className="glass-card rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-300"
              >
                {/* Accordion Header Button */}
                <button
                  onClick={() => setOpenWeek(isOpen ? 0 : week.weekNumber)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-500 text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-md">
                      S{week.weekNumber}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider block">
                        Semaine {week.weekNumber}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {week.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-normal">
                        {week.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-cyan" : ""
                    }`}
                  />
                </button>

                {/* Accordion Body Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-700/40 bg-slate-950/40">
                    <ul className="space-y-3">
                      {week.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-3 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
