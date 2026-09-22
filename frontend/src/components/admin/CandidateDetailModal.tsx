"use client";

import { useState } from "react";
import { PreRegistrationRecord, CandidateStatus } from "@/types/pre-registration";
import { updateCandidateStatus, updateCandidateNotes } from "@/lib/api";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { X, MessageSquare, Save, User, Monitor, Sparkles, Lightbulb, BookOpen, Clock, ShieldCheck, Tag } from "lucide-react";

interface CandidateDetailModalProps {
  candidate: PreRegistrationRecord;
  onClose: () => void;
  onUpdate: () => void;
}

const statusBadgeColors: Record<CandidateStatus, string> = {
  NEW: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  CONTACTED: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  QUALIFIED: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  WAITING_CONFIRMATION: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  CONFIRMED: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  ENROLLED: "bg-teal-500/20 text-teal-300 border-teal-500/40",
  REJECTED: "bg-red-500/20 text-red-300 border-red-500/40",
  CANCELLED: "bg-slate-700/50 text-slate-400 border-slate-600",
};

const statusList: CandidateStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "WAITING_CONFIRMATION",
  "CONFIRMED",
  "ENROLLED",
  "REJECTED",
  "CANCELLED",
];

export function CandidateDetailModal({ candidate, onClose, onUpdate }: CandidateDetailModalProps) {
  const [currentStatus, setCurrentStatus] = useState<CandidateStatus>(candidate.status);
  const [adminNotes, setAdminNotes] = useState<string>(candidate.admin_notes || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleStatusChange = async (newStatus: CandidateStatus) => {
    setCurrentStatus(newStatus);
    await updateCandidateStatus(candidate.id, newStatus);
    onUpdate();
  };

  const handleSaveNotes = async () => {
    setIsSaving(true);
    await updateCandidateNotes(candidate.id, adminNotes);
    setIsSaving(false);
    onUpdate();
  };

  // WhatsApp Messages Templates
  const firstContactMsg = `Bonjour ${candidate.first_name}, merci pour ta pré-inscription à AI Builder Academy CI (Réf: ${candidate.registration_reference}). Nous avons bien reçu ton profil et souhaitons échanger avec toi concernant ton projet.`;
  const confirmationMsg = `Bonjour ${candidate.first_name}, nous avons étudié ta pré-inscription (Réf: ${candidate.registration_reference}) et souhaitons confirmer avec toi les prochaines étapes de ton inscription à AI Builder Academy CI.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-card rounded-3xl border border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6 my-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-cyan bg-brand-cyan/10 px-2.5 py-0.5 rounded border border-brand-cyan/20">
                {candidate.registration_reference}
              </span>
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded border ${statusBadgeColors[currentStatus]}`}>
                {currentStatus}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {candidate.first_name} {candidate.last_name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Status Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">Changer Statut:</span>
            <select
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value as CandidateStatus)}
              className="bg-slate-950 border border-slate-700 rounded-lg text-xs font-bold text-white px-3 py-1.5 focus:outline-none focus:border-brand-cyan"
            >
              {statusList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* WhatsApp Direct Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={getWhatsAppLink(firstContactMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40 hover:bg-emerald-500/30 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>1er Contact</span>
            </a>

            <a
              href={getWhatsAppLink(confirmationMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-brand-500/20 text-brand-cyan font-bold text-xs border border-brand-cyan/40 hover:bg-brand-500/30 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Confirmation</span>
            </a>
          </div>
        </div>

        {/* Candidate Dossier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* Profil Personnel */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-brand-cyan uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4" /> Profil & Contact
            </h4>
            <div className="space-y-1.5">
              <p><span className="text-slate-400">Email:</span> <strong className="text-white ml-1">{candidate.email}</strong></p>
              <p><span className="text-slate-400">WhatsApp:</span> <strong className="text-emerald-400 font-mono ml-1">{candidate.phone}</strong></p>
              <p><span className="text-slate-400">Profession:</span> <strong className="text-white ml-1">{candidate.profession}</strong></p>
              <p><span className="text-slate-400">Statut:</span> <strong className="text-brand-cyan ml-1">{candidate.status_category}</strong></p>
              <p><span className="text-slate-400">Date pré-inscription:</span> <strong className="text-slate-300 ml-1">{new Date(candidate.created_at).toLocaleDateString("fr-FR")}</strong></p>
            </div>
          </div>

          {/* Formation & Disponibilité */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Formation & Tempo
            </h4>
            <div className="space-y-1.5">
              <p><span className="text-slate-400">Formation Visée:</span> <strong className="text-brand-cyan text-sm ml-1">{candidate.desired_training}</strong></p>
              <p><span className="text-slate-400">Disponibilité Hebdo:</span> <strong className="text-white ml-1">{candidate.weekly_availability}</strong></p>
              {candidate.expected_result && (
                <p><span className="text-slate-400">Résultat espéré:</span> <span className="text-slate-200 ml-1 block mt-0.5">{candidate.expected_result}</span></p>
              )}
            </div>
          </div>

          {/* Niveaux Tech */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Monitor className="w-4 h-4" /> Compétences Tech
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              <p><span className="text-slate-400">Code:</span> <strong className="text-white capitalize ml-1">{candidate.programming_level}</strong></p>
              <p><span className="text-slate-400">IA:</span> <strong className="text-purple-400 capitalize ml-1">{candidate.ai_level}</strong></p>
              <p><span className="text-slate-400">BDD:</span> <strong className="text-white capitalize ml-1">{candidate.database_level}</strong></p>
              <p><span className="text-slate-400">GitHub:</span> <strong className="text-white capitalize ml-1">{candidate.github_level}</strong></p>
              <p><span className="text-slate-400">Excel:</span> <strong className="text-white capitalize ml-1">{candidate.excel_level}</strong></p>
              <p><span className="text-slate-400">No-Code:</span> <strong className="text-white capitalize ml-1">{candidate.nocode_level}</strong></p>
            </div>
          </div>

          {/* Projet */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" /> Idée & Projet
            </h4>
            <div className="space-y-1.5">
              <p><span className="text-slate-400">A une idée ?</span> <strong className="text-white ml-1">{candidate.has_project_idea}</strong></p>
              {candidate.project_description && (
                <p><span className="text-slate-400">Description:</span> <span className="text-slate-200 block mt-0.5">{candidate.project_description}</span></p>
              )}
              <p><span className="text-slate-400">Types d'apps:</span> <strong className="text-emerald-400 ml-1">{(candidate.application_types || []).join(", ")}</strong></p>
            </div>
          </div>

        </div>

        {/* Section Notes Administrateur */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-white uppercase tracking-wider">
              📝 Notes Administrateur Internes
            </label>
            <button
              onClick={handleSaveNotes}
              disabled={isSaving}
              className="px-3 py-1.5 rounded-lg bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Enregistrement..." : "Sauvegarder"}</span>
            </button>
          </div>
          <textarea
            rows={3}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Écris des remarques ou commentaires internes sur ce candidat..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>

      </div>
    </div>
  );
}
