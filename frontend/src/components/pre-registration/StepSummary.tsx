"use client";

import { PreRegistrationFormData } from "@/types/pre-registration";
import { CheckCircle2, Edit2, User, Monitor, Sparkles, Lightbulb, BookOpen, Clock, ShieldCheck } from "lucide-react";

interface StepSummaryProps {
  formData: PreRegistrationFormData;
  onGoToStep: (stepNumber: number) => void;
  isSubmitting: boolean;
  submitError?: string;
}

export function StepSummary({ formData, onGoToStep, isSubmitting, submitError }: StepSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Étape 6 — Récapitulatif & Validation</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Vérifie les informations saisies avant d'envoyer ta pré-inscription gratuite.
        </p>
      </div>

      {submitError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold">
          ⚠️ {submitError}
        </div>
      )}

      {/* Summary Section Cards */}
      <div className="space-y-4">
        
        {/* Section 1: Infos Personnelles */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2 relative">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="text-xs font-extrabold text-brand-cyan flex items-center gap-1.5 uppercase tracking-wider">
              <User className="w-4 h-4" /> 1. Informations Personnelles
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(1)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
            >
              <Edit2 className="w-3.5 h-3.5" /> Modifier
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div><span className="text-slate-400 block">Nom & Prénom:</span> <strong className="text-white">{formData.first_name} {formData.last_name}</strong></div>
            <div><span className="text-slate-400 block">Email:</span> <strong className="text-white">{formData.email}</strong></div>
            <div><span className="text-slate-400 block">WhatsApp:</span> <strong className="text-emerald-400 font-mono">{formData.phone}</strong></div>
            <div><span className="text-slate-400 block">Profession:</span> <strong className="text-white">{formData.profession}</strong></div>
            <div><span className="text-slate-400 block">Statut:</span> <strong className="text-brand-cyan">{formData.status_category}</strong></div>
          </div>
        </div>

        {/* Section 2: Niveau Informatique */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2 relative">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="text-xs font-extrabold text-brand-cyan flex items-center gap-1.5 uppercase tracking-wider">
              <Monitor className="w-4 h-4" /> 2. Auto-évaluation Informatique
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(2)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
            >
              <Edit2 className="w-3.5 h-3.5" /> Modifier
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div><span className="text-slate-400 block">Programmation:</span> <strong className="text-brand-cyan capitalize">{formData.programming_level}</strong></div>
            <div><span className="text-slate-400 block">Intelligence Artificielle:</span> <strong className="text-purple-400 capitalize">{formData.ai_level}</strong></div>
            <div><span className="text-slate-400 block">Base de données:</span> <strong className="text-white capitalize">{formData.database_level}</strong></div>
            <div><span className="text-slate-400 block">Git & GitHub:</span> <strong className="text-white capitalize">{formData.github_level}</strong></div>
          </div>
        </div>

        {/* Section 3: Expérience IA */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2 relative">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="text-xs font-extrabold text-purple-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> 3. Expérience IA
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(3)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
            >
              <Edit2 className="w-3.5 h-3.5" /> Modifier
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div><span className="text-slate-400 block">Fréquence d'usage:</span> <strong className="text-white">{formData.ai_usage_frequency}</strong></div>
            <div><span className="text-slate-400 block">Outils connus:</span> <strong className="text-brand-cyan">{(formData.ai_tools || []).join(", ") || "Aucun"}</strong></div>
            <div><span className="text-slate-400 block">Usage principal:</span> <strong className="text-white">{formData.ai_primary_use}</strong></div>
          </div>
        </div>

        {/* Section 4: Projet */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2 relative">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" /> 4. Projet & Types d'App
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(4)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
            >
              <Edit2 className="w-3.5 h-3.5" /> Modifier
            </button>
          </div>

          <div className="space-y-1 text-xs">
            <div><span className="text-slate-400">Idée de projet:</span> <strong className="text-white ml-1">{formData.has_project_idea}</strong></div>
            {formData.project_description && (
              <div><span className="text-slate-400">Description:</span> <p className="text-slate-200 mt-0.5">{formData.project_description}</p></div>
            )}
            <div><span className="text-slate-400">Types d'apps souhaités:</span> <strong className="text-emerald-400 ml-1">{(formData.application_types || []).join(", ")}</strong></div>
          </div>
        </div>

        {/* Section 5: Formation */}
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-2 relative">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> 5. Formation & Disponibilité
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(5)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
            >
              <Edit2 className="w-3.5 h-3.5" /> Modifier
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div><span className="text-slate-400 block">Formation visée:</span> <strong className="text-brand-cyan text-sm">{formData.desired_training}</strong></div>
            <div><span className="text-slate-400 block">Disponibilité hebdo:</span> <strong className="text-white">{formData.weekly_availability}</strong></div>
          </div>
        </div>

      </div>

      {/* Free Disclaimer Notice */}
      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>
          <strong>Pré-inscription 100% gratuite.</strong> Aucun paiement ne sera demandé lors de cette étape.
        </span>
      </div>
    </div>
  );
}
