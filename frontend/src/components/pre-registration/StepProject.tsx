"use client";

import { PreRegistrationFormData } from "@/types/pre-registration";
import { Lightbulb, Layers, Target, CheckSquare, Square } from "lucide-react";

interface StepProjectProps {
  formData: PreRegistrationFormData;
  updateData: (fields: Partial<PreRegistrationFormData>) => void;
}

const ideaChoices = ["Oui", "Non", "J'ai plusieurs idées"] as const;

const projectObjectives = [
  "Business",
  "Automatisation de mon activité",
  "Projet personnel",
  "Études",
  "Startup",
  "Freelance",
  "Autre",
];

const appTypeChoices = [
  "Application Web",
  "Application Mobile",
  "SaaS",
  "CRM",
  "ERP",
  "E-commerce",
  "Dashboard",
  "Application de réservation",
  "Application de livraison",
  "Outil métier",
  "Automatisation",
  "Autre",
  "Je ne sais pas encore",
];

export function StepProject({ formData, updateData }: StepProjectProps) {
  const toggleAppType = (type: string) => {
    const current = formData.application_types || [];
    if (current.includes(type)) {
      updateData({ application_types: current.filter((t) => t !== type) });
    } else {
      updateData({ application_types: [...current, type] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>Étape 4 — Projet & Type d'application</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Parle-nous de ton idée ou de l'application que tu souhaites créer pendant la formation.
        </p>
      </div>

      {/* Q1: Avez-vous une idée ? */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-200 block">
          As-tu déjà une idée d'application ? <span className="text-red-400">*</span>
        </label>

        <div className="grid grid-cols-3 gap-3">
          {ideaChoices.map((choice) => {
            const isSelected = formData.has_project_idea === choice;
            return (
              <button
                type="button"
                key={choice}
                onClick={() => updateData({ has_project_idea: choice })}
                className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  isSelected
                    ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10"
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {isSelected ? "✓ " : ""}{choice}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conditional Fields if Has Idea */}
      {formData.has_project_idea !== "Non" && (
        <div className="space-y-4 pt-2 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                Quel problème souhaites-tu résoudre ?
              </label>
              <textarea
                rows={2}
                value={formData.problem_description}
                onChange={(e) => updateData({ problem_description: e.target.value })}
                placeholder="Ex: La perte de temps avec les fichiers Excel et les erreurs de caisse..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                Qui utiliserait ton application ?
              </label>
              <textarea
                rows={2}
                value={formData.target_users}
                onChange={(e) => updateData({ target_users: e.target.value })}
                placeholder="Ex: Mes employés, mes clients, des restaurateurs d'Abidjan..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-all"
              />
            </div>
          </div>
        </div>
      )}

      {/* Q2: Objectif du projet */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
          <Target className="w-4 h-4 text-brand-cyan" />
          <span>Quel est ton objectif avec ce projet ? <span className="text-red-400">*</span></span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {projectObjectives.map((obj) => {
            const isSelected = formData.project_objective === obj;
            return (
              <button
                type="button"
                key={obj}
                onClick={() => updateData({ project_objective: obj })}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  isSelected
                    ? "bg-brand-500/20 border-brand-cyan text-brand-cyan shadow-md"
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {isSelected ? "✓ " : ""}{obj}
              </button>
            );
          })}
        </div>
      </div>

      {/* Q3: Type d'application (Choix multiples) */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Quel type d'application souhaites-tu construire ? <span className="text-slate-400 font-normal">(Choix multiples)</span></span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {appTypeChoices.map((type) => {
            const isChecked = (formData.application_types || []).includes(type);
            return (
              <button
                type="button"
                key={type}
                onClick={() => toggleAppType(type)}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                  isChecked
                    ? "bg-slate-900 border-emerald-400 text-white shadow-md"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span>{type}</span>
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
