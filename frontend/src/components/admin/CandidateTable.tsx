"use client";

import { useState } from "react";
import { PreRegistrationRecord, CandidateStatus } from "@/types/pre-registration";
import { Search, Filter, Eye, MessageSquare, Phone, Mail, ChevronRight } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface CandidateTableProps {
  candidates: PreRegistrationRecord[];
  onSelectCandidate: (candidate: PreRegistrationRecord) => void;
  onFilterChange: (filters: { search: string; status: string; training: string }) => void;
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

export function CandidateTable({ candidates, onSelectCandidate, onFilterChange }: CandidateTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [training, setTraining] = useState("");

  const handleSearchChange = (val: string) => {
    setSearch(val);
    onFilterChange({ search: val, status, training });
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    onFilterChange({ search, status: val, training });
  };

  const handleTrainingChange = (val: string) => {
    setTraining(val);
    onFilterChange({ search, status, training: val });
  };

  return (
    <div className="space-y-4">
      
      {/* Search & Filter Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Rechercher par nom, email, tél, réf..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-4 h-4 text-brand-cyan" />
            <span>Filtres:</span>
          </div>

          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white px-3 py-2 focus:outline-none focus:border-brand-cyan"
          >
            <option value="">Tous les statuts</option>
            <option value="NEW">NEW (Nouveau)</option>
            <option value="CONTACTED">CONTACTED (Contacté)</option>
            <option value="QUALIFIED">QUALIFIED (Qualifié)</option>
            <option value="WAITING_CONFIRMATION">WAITING_CONFIRMATION</option>
            <option value="CONFIRMED">CONFIRMED (Confirmé)</option>
            <option value="ENROLLED">ENROLLED (Inscrit)</option>
            <option value="REJECTED">REJECTED (Refusé)</option>
            <option value="CANCELLED">CANCELLED (Annulé)</option>
          </select>

          <select
            value={training}
            onChange={(e) => handleTrainingChange(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white px-3 py-2 focus:outline-none focus:border-brand-cyan"
          >
            <option value="">Toutes les offres</option>
            <option value="BOOTCAMP">BOOTCAMP</option>
            <option value="MASTERCLASS">MASTERCLASS</option>
            <option value="PREMIUM">PREMIUM</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/90 text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-800 font-mono tracking-wider">
              <th className="p-4">Réf & Nom</th>
              <th className="p-4">WhatsApp & Email</th>
              <th className="p-4">Profession</th>
              <th className="p-4">Formation Visée</th>
              <th className="p-4">Statut</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs font-normal">
            {candidates.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  Aucun candidat ne correspond à vos critères de recherche.
                </td>
              </tr>
            ) : (
              candidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-900/60 transition-colors group">
                  
                  {/* Réf & Nom */}
                  <td className="p-4">
                    <span className="font-mono text-[10px] text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded font-bold block w-fit mb-1">
                      {cand.registration_reference}
                    </span>
                    <span className="font-bold text-white text-sm block">
                      {cand.first_name} {cand.last_name}
                    </span>
                  </td>

                  {/* WhatsApp & Email */}
                  <td className="p-4 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{cand.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{cand.email}</span>
                    </div>
                  </td>

                  {/* Profession */}
                  <td className="p-4 text-slate-300">
                    <span className="font-medium text-white block">{cand.profession}</span>
                    <span className="text-[10px] text-slate-400">{cand.status_category}</span>
                  </td>

                  {/* Formation */}
                  <td className="p-4">
                    <span className="font-extrabold text-brand-cyan">{cand.desired_training}</span>
                  </td>

                  {/* Statut Badge */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border uppercase ${statusBadgeColors[cand.status]}`}>
                      {cand.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onSelectCandidate(cand)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-1 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Fiche</span>
                      </button>

                      <a
                        href={getWhatsAppLink(`Bonjour ${cand.first_name}, concernant ta pré-inscription AI Builder Academy CI (Réf: ${cand.registration_reference})...`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 transition-all"
                        title="Ouvrir WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive Cards View */}
      <div className="md:hidden space-y-3">
        {candidates.map((cand) => (
          <div
            key={cand.id}
            onClick={() => onSelectCandidate(cand)}
            className="glass-card p-4 rounded-2xl border border-slate-800 space-y-3 active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded font-bold">
                {cand.registration_reference}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border uppercase ${statusBadgeColors[cand.status]}`}>
                {cand.status}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-white text-base">
                {cand.first_name} {cand.last_name}
              </h4>
              <p className="text-xs text-slate-400">{cand.profession} ({cand.status_category})</p>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
              <span className="font-bold text-brand-cyan">{cand.desired_training}</span>
              <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                <Phone className="w-3 h-3" /> {cand.phone}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
