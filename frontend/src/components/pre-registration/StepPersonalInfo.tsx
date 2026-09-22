"use client";

import { PreRegistrationFormData } from "@/types/pre-registration";
import { User, Mail, Phone, Briefcase, Tag } from "lucide-react";

interface StepPersonalInfoProps {
  formData: PreRegistrationFormData;
  updateData: (fields: Partial<PreRegistrationFormData>) => void;
}

const statusOptions = [
  "Entrepreneur",
  "Porteur de projet",
  "Étudiant",
  "Freelance",
  "Salarié",
  "Demandeur d'emploi",
  "Autre",
];

export function StepPersonalInfo({ formData, updateData }: StepPersonalInfoProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-brand-cyan" />
          <span>Étape 1 — Informations Personnelles</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Renseigne tes coordonnées pour nous permettre de te contacter et suivre ta candidature.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Prénom */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">
            Prénom <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={formData.first_name}
              onChange={(e) => updateData({ first_name: e.target.value })}
              placeholder="Ex: Mohamed"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
            />
          </div>
        </div>

        {/* Nom */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">
            Nom de famille <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={formData.last_name}
              onChange={(e) => updateData({ last_name: e.target.value })}
              placeholder="Ex: Kouadio"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">
            Adresse Email <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => updateData({ email: e.target.value })}
              placeholder="Ex: nom@domaine.ci"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">
            Numéro WhatsApp <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              placeholder="Ex: +225 0700000000"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Profession / Activité */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-200 block">
          Profession / Activité actuelle <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={formData.profession}
            onChange={(e) => updateData({ profession: e.target.value })}
            placeholder="Ex: Chef d'entreprise, CM, Designer UX/UI..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
          />
        </div>
      </div>

      {/* Statut Category Select Radio Cards */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-brand-cyan" />
          <span>Quel est ton statut principal actuellement ? <span className="text-red-400">*</span></span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statusOptions.map((status) => {
            const isSelected = formData.status_category === status;
            return (
              <button
                type="button"
                key={status}
                onClick={() => updateData({ status_category: status })}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  isSelected
                    ? "bg-brand-500/20 border-brand-cyan text-brand-cyan shadow-md shadow-brand-cyan/10"
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {isSelected ? "✓ " : ""}{status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Anti-Spam Honeypot Hidden Input */}
      <input
        type="text"
        name="website_hp"
        value={formData.website_hp || ""}
        onChange={(e) => updateData({ website_hp: e.target.value })}
        className="hidden opacity-0 pointer-events-none absolute -left-[9999px]"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
