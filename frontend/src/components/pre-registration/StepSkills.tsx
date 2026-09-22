"use client";

import { PreRegistrationFormData, SkillLevel } from "@/types/pre-registration";
import { Monitor, Cpu, Code2, Database, GitBranch, Layers, FileSpreadsheet, Globe } from "lucide-react";

interface StepSkillsProps {
  formData: PreRegistrationFormData;
  updateData: (fields: Partial<PreRegistrationFormData>) => void;
}

const skillItems: Array<{ key: keyof PreRegistrationFormData; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "computer_level", label: "Utilisation générale de l'ordinateur", icon: Monitor },
  { key: "internet_level", label: "Internet & outils web", icon: Globe },
  { key: "excel_level", label: "Excel / Tableurs", icon: FileSpreadsheet },
  { key: "ai_level", label: "Intelligence artificielle", icon: Cpu },
  { key: "programming_level", label: "Programmation / Code", icon: Code2 },
  { key: "database_level", label: "Base de données", icon: Database },
  { key: "github_level", label: "Git / GitHub", icon: GitBranch },
  { key: "nocode_level", label: "Outils no-code / low-code", icon: Layers },
];

const levels: SkillLevel[] = ["débutant", "intermédiaire", "avancé"];

export function StepSkills({ formData, updateData }: StepSkillsProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Monitor className="w-5 h-5 text-brand-cyan" />
          <span>Étape 2 — Auto-évaluation Informatique</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Évalue en toute transparence ton niveau actuel. Il n'y a pas de mauvaise réponse, cela nous permet de personnaliser la formation.
        </p>
      </div>

      <div className="space-y-4">
        {skillItems.map((item) => {
          const IconComp = item.icon;
          const currentVal = formData[item.key] as SkillLevel;

          return (
            <div
              key={item.key}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-500/10 text-brand-cyan border border-brand-500/20">
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-200">{item.label}</span>
              </div>

              {/* 3 Level Buttons */}
              <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
                {levels.map((lvl) => {
                  const isSelected = currentVal === lvl;
                  return (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => updateData({ [item.key]: lvl })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        isSelected
                          ? lvl === "débutant"
                            ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                            : lvl === "intermédiaire"
                            ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                            : "bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/30"
                          : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60"
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
