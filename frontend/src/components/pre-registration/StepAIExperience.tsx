"use client";

import { PreRegistrationFormData } from "@/types/pre-registration";
import { Sparkles, CheckSquare, Square, Target, Clock } from "lucide-react";

interface StepAIExperienceProps {
  formData: PreRegistrationFormData;
  updateData: (fields: Partial<PreRegistrationFormData>) => void;
}

const frequencyOptions = ["Jamais", "Occasionnellement", "Régulièrement", "Très régulièrement"] as const;

const availableTools = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Copilot",
  "Cursor",
  "Lovable",
  "Bolt",
  "Replit",
  "Autre",
];

const primaryUseCases = [
  "Recherche",
  "Rédaction",
  "Analyse",
  "Programmation",
  "Automatisation",
  "Création de contenu",
  "Je ne sais pas encore",
];

export function StepAIExperience({ formData, updateData }: StepAIExperienceProps) {
  const toggleTool = (tool: string) => {
    const current = formData.ai_tools || [];
    if (current.includes(tool)) {
      updateData({ ai_tools: current.filter((t) => t !== tool) });
    } else {
      updateData({ ai_tools: [...current, tool] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-cyan" />
          <span>Étape 3 — Expérience avec l'IA</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Dis-nous comment tu utilises déjà l'intelligence artificielle au quotidien.
        </p>
      </div>

      {/* Q1: Fréquence d'utilisation */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-cyan" />
          <span>As-tu déjà utilisé des outils d'intelligence artificielle ? <span className="text-red-400">*</span></span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {frequencyOptions.map((freq) => {
            const isSelected = formData.ai_usage_frequency === freq;
            return (
              <button
                type="button"
                key={freq}
                onClick={() => updateData({ ai_usage_frequency: freq })}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  isSelected
                    ? "bg-brand-500/20 border-brand-cyan text-brand-cyan shadow-md shadow-brand-cyan/10"
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {isSelected ? "✓ " : ""}{freq}
              </button>
            );
          })}
        </div>
      </div>

      {/* Q2: Outils utilisés (Choix multiples) */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold text-slate-200 block">
          Quels outils d'IA utilises-tu ? <span className="text-slate-400 font-normal">(Choix multiples)</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {availableTools.map((tool) => {
            const isChecked = (formData.ai_tools || []).includes(tool);
            return (
              <button
                type="button"
                key={tool}
                onClick={() => toggleTool(tool)}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                  isChecked
                    ? "bg-slate-900 border-brand-cyan text-white shadow-md"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span>{tool}</span>
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-brand-cyan shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Q3: Usage principal */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-400" />
          <span>Pour quoi utilises-tu principalement l'IA ? <span className="text-red-400">*</span></span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {primaryUseCases.map((useCase) => {
            const isSelected = formData.ai_primary_use === useCase;
            return (
              <button
                type="button"
                key={useCase}
                onClick={() => updateData({ ai_primary_use: useCase })}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  isSelected
                    ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-md shadow-purple-500/10"
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {isSelected ? "✓ " : ""}{useCase}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
