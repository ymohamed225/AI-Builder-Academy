"use client";

import { PreRegistrationFormData } from "@/types/pre-registration";
import { BookOpen, Clock, Target, Info } from "lucide-react";

interface StepTrainingOfferProps {
  formData: PreRegistrationFormData;
  updateData: (fields: Partial<PreRegistrationFormData>) => void;
}

interface OfferChoice {
  id: "MASTERCLASS" | "BOOTCAMP" | "PREMIUM" | "Je ne sais pas encore";
  name: string;
  price: string;
  desc: string;
  badge?: string;
}

const trainingOffers: OfferChoice[] = [
  {
    id: "MASTERCLASS",
    name: "MASTERCLASS",
    price: "10 000 FCFA",
    desc: "Introduction au vibe coding & première application.",
  },
  {
    id: "BOOTCAMP",
    name: "BOOTCAMP",
    price: "40 000 FCFA",
    badge: "⭐ Formule Principale",
    desc: "4 semaines intensives, 8 lives, projet personnel & communauté.",
  },
  {
    id: "PREMIUM",
    name: "PREMIUM",
    price: "100 000 FCFA",
    desc: "Bootcamp + 4 séances individuelles & accompagnement sur-mesure.",
  },
  {
    id: "Je ne sais pas encore",
    name: "JE NE SAIS PAS ENCORE",
    price: "Orientation offerte",
    desc: "L'équipe t'aidera à choisir le meilleur parcours selon ton profil.",
  },
];

const timeChoices = ["2 à 4 heures", "4 à 6 heures", "6 à 10 heures", "Plus de 10 heures"] as const;

export function StepTrainingOffer({ formData, updateData }: StepTrainingOfferProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-cyan" />
          <span>Étape 5 — Formation & Disponibilité</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Sélectionne la formule qui t'intéresse et indique ton temps disponible.
        </p>
      </div>

      {/* Q1: Offre souhaitée */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-200 block">
          Quelle formation t'intéresse ? <span className="text-red-400">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trainingOffers.map((offer) => {
            const isSelected = formData.desired_training === offer.id;
            return (
              <button
                type="button"
                key={offer.id}
                onClick={() => updateData({ desired_training: offer.id })}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? "bg-slate-900 border-brand-cyan shadow-lg shadow-brand-cyan/20 ring-1 ring-brand-cyan"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-white">{offer.name}</span>
                    <span className="text-xs font-black text-brand-cyan">{offer.price}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-normal">{offer.desc}</p>
                </div>
                {offer.badge && (
                  <span className="mt-2 text-[10px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block w-fit">
                    {offer.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {formData.desired_training === "Je ne sais pas encore" && (
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
            <Info className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
            <span>
              <strong>Pas de problème.</strong> Nous analyserons ton profil lors de l'échange WhatsApp et pourrons t'orienter vers le parcours le plus adapté à tes objectifs.
            </span>
          </div>
        )}
      </div>

      {/* Q2: Disponibilité hebdomadaire */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-cyan" />
          <span>Combien de temps peux-tu consacrer à la formation chaque semaine ? <span className="text-red-400">*</span></span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {timeChoices.map((choice) => {
            const isSelected = formData.weekly_availability === choice;
            return (
              <button
                type="button"
                key={choice}
                onClick={() => updateData({ weekly_availability: choice })}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  isSelected
                    ? "bg-brand-500/20 border-brand-cyan text-brand-cyan shadow-md"
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {isSelected ? "✓ " : ""}{choice}
              </button>
            );
          })}
        </div>
      </div>

      {/* Q3: Résultat espéré */}
      <div className="space-y-2 pt-2">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-400" />
          <span>Quel résultat voudrais-tu obtenir à la fin de la formation ?</span>
        </label>
        <textarea
          rows={3}
          value={formData.expected_result}
          onChange={(e) => updateData({ expected_result: e.target.value })}
          placeholder="Ex: Avoir mon application déployée en ligne, pouvoir décrocher des clients en freelance..."
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-all"
        />
      </div>
    </div>
  );
}
