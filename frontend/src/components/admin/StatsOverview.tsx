"use client";

import { StatsData } from "@/types/pre-registration";
import { Users, BookOpen, Monitor, Award, TrendingUp, CheckCircle2 } from "lucide-react";

interface StatsOverviewProps {
  stats: StatsData;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="space-y-6">
      
      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Total Candidates */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Pré-inscrits</span>
            <Users className="w-4 h-4 text-brand-cyan" />
          </div>
          <span className="text-3xl font-black text-white block">{stats.total}</span>
          <span className="text-[10px] text-emerald-400 font-mono">100% Candidats uniques</span>
        </div>

        {/* Nouveaux / A Traiter */}
        <div className="glass-card p-5 rounded-2xl border border-blue-500/30 space-y-1 bg-blue-500/5">
          <div className="flex items-center justify-between text-blue-300">
            <span className="text-xs font-bold uppercase tracking-wider">Nouveaux (NEW)</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-3xl font-black text-blue-300 block">{stats.by_status.NEW || 0}</span>
          <span className="text-[10px] text-slate-400 font-mono">À contacter sur WhatsApp</span>
        </div>

        {/* Qualifiés & Confirmés */}
        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 space-y-1 bg-emerald-500/5">
          <div className="flex items-center justify-between text-emerald-300">
            <span className="text-xs font-bold uppercase tracking-wider">Confirmés & Inscrits</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-3xl font-black text-emerald-300 block">
            {(stats.by_status.CONFIRMED || 0) + (stats.by_status.ENROLLED || 0)}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">Prêts pour la rentrée</span>
        </div>

        {/* Bootcamp Principal */}
        <div className="glass-card p-5 rounded-2xl border border-purple-500/30 space-y-1 bg-purple-500/5">
          <div className="flex items-center justify-between text-purple-300">
            <span className="text-xs font-bold uppercase tracking-wider">Demandes Bootcamp</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-3xl font-black text-purple-300 block">{stats.by_training.BOOTCAMP || 0}</span>
          <span className="text-[10px] text-slate-400 font-mono">Formule la plus demandée</span>
        </div>

      </div>

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Intérêt par Formation */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-cyan" /> Intérêt par Formation
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-200">Bootcamp (40,000 F)</span>
              <span className="font-bold text-brand-cyan px-2 py-0.5 rounded bg-brand-cyan/10">
                {stats.by_training.BOOTCAMP || 0} candidats
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-200">Masterclass (10,000 F)</span>
              <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800">
                {stats.by_training.MASTERCLASS || 0} candidats
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-200">Premium (100,000 F)</span>
              <span className="font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10">
                {stats.by_training.PREMIUM || 0} candidats
              </span>
            </div>
          </div>
        </div>

        {/* Niveaux Techniques */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Monitor className="w-4 h-4 text-purple-400" /> Répartition des Niveaux
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-200">Débutants absolus</span>
              <span className="font-bold text-blue-400">{stats.by_level.débutant || 0} candidats</span>
            </div>

            <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-200">Intermédiaires</span>
              <span className="font-bold text-purple-400">{stats.by_level.intermédiaire || 0} candidats</span>
            </div>

            <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-slate-200">Avancés</span>
              <span className="font-bold text-emerald-400">{stats.by_level.avancé || 0} candidats</span>
            </div>
          </div>
        </div>

        {/* Top App Types */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" /> Types d'Apps Populaires
          </h4>

          <div className="space-y-2 text-xs">
            {(stats.top_app_types || []).map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-slate-200">{item.type}</span>
                <span className="font-bold text-slate-300 font-mono">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
