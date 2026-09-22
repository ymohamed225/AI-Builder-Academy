"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative bg-slate-900/60 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-brand-cyan uppercase px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            QUESTIONS FRÉQUENTES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Foire aux <span className="gradient-text">questions</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Retrouve les réponses aux questions les plus posées avant de t'inscrire.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 space-y-4">
          {SITE_CONFIG.faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-white flex items-center gap-3">
                    <span className="text-brand-cyan font-mono text-sm">Q.</span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-cyan" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-700/40 text-slate-300 text-sm sm:text-base leading-relaxed font-normal bg-slate-950/40">
                    {item.answer}
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
