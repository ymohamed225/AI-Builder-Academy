"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatsOverview } from "@/components/admin/StatsOverview";
import { CandidateTable } from "@/components/admin/CandidateTable";
import { CandidateDetailModal } from "@/components/admin/CandidateDetailModal";
import { MessagingCenter } from "@/components/admin/MessagingCenter";
import { SurveyBuilder } from "@/components/admin/SurveyBuilder";
import { SurveyAnalytics } from "@/components/admin/SurveyAnalytics";
import { AdminLoginPage, useAdminAuth } from "@/components/admin/AdminLogin";
import { PreRegistrationRecord, StatsData } from "@/types/pre-registration";
import { fetchPreRegistrations, fetchStats } from "@/lib/api";
import { ShieldCheck, RefreshCw, Users, Send, FileText, LogOut } from "lucide-react";

export default function AdminDashboardPage() {
  const { isAuthenticated, logout } = useAdminAuth();
  const [authReady, setAuthReady] = useState(false);
  const [manualAuth, setManualAuth] = useState(false);

  const [activeTab, setActiveTab] = useState<"CANDIDATES" | "MESSAGING" | "SURVEYS">("CANDIDATES");
  const [selectedSurveyId, setSelectedSurveyId] = useState<number | null>(null);

  const [candidates, setCandidates] = useState<PreRegistrationRecord[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<PreRegistrationRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "", training: "" });

  // Wait for client-side auth check to complete
  useEffect(() => {
    if (isAuthenticated !== null) {
      setAuthReady(true);
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setIsLoading(true);
    const [candRes, statsRes] = await Promise.all([
      fetchPreRegistrations(filters),
      fetchStats(),
    ]);

    if (candRes.success && candRes.data) setCandidates(candRes.data);
    if (statsRes.success && statsRes.stats) setStats(statsRes.stats);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [filters, isAuthenticated]);

  // Show nothing while checking auth (prevents hydration flash)
  if (!authReady) {
    return (
      <main className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-700 border-t-brand-cyan rounded-full animate-spin" />
      </main>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated && !manualAuth) {
    return <AdminLoginPage onLoginSuccess={() => setManualAuth(true)} />;
  }

  return (
    <main className="min-h-screen bg-brand-dark text-slate-100 flex flex-col justify-between">
      <Navbar />

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow space-y-8">
        
        {/* Admin Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-400">
              <ShieldCheck className="w-4 h-4" />
              <span>ESPACE ADMINISTRATION PROTÉGÉ</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Tableau de bord <span className="gradient-text">AI Builder Academy CI</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-brand-cyan" : ""}`} />
              <span>Actualiser</span>
            </button>

            <button
              onClick={() => { logout(); setManualAuth(false); }}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 hover:bg-red-500/20 flex items-center gap-2 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 overflow-x-auto">
          <button
            onClick={() => { setActiveTab("CANDIDATES"); setSelectedSurveyId(null); }}
            className={`px-5 py-3 rounded-2xl font-extrabold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "CANDIDATES"
                ? "bg-gradient-to-r from-brand-500 to-brand-cyan text-white shadow-lg shadow-brand-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>📊 Candidats & Statistiques</span>
          </button>

          <button
            onClick={() => { setActiveTab("MESSAGING"); setSelectedSurveyId(null); }}
            className={`px-5 py-3 rounded-2xl font-extrabold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "MESSAGING"
                ? "bg-gradient-to-r from-brand-500 to-brand-cyan text-white shadow-lg shadow-brand-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Send className="w-4 h-4 text-emerald-400" />
            <span>📢 Messagerie, WhatsApp & Rappels</span>
          </button>

          <button
            onClick={() => { setActiveTab("SURVEYS"); setSelectedSurveyId(null); }}
            className={`px-5 py-3 rounded-2xl font-extrabold text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === "SURVEYS"
                ? "bg-gradient-to-r from-brand-500 to-brand-cyan text-white shadow-lg shadow-brand-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>📝 Formulaires & Sondages (Google Forms)</span>
          </button>
        </div>

        {/* TAB 1: Candidates & Stats */}
        {activeTab === "CANDIDATES" && (
          <div className="space-y-8">
            {stats && <StatsOverview stats={stats} />}

            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <span>Liste Globale des Candidats</span>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {candidates.length} affichés
                </span>
              </h3>

              <CandidateTable
                candidates={candidates}
                onSelectCandidate={(cand) => setSelectedCandidate(cand)}
                onFilterChange={(newFilters) => setFilters(newFilters)}
              />
            </div>
          </div>
        )}

        {/* TAB 2: Messaging & Automated Reminders */}
        {activeTab === "MESSAGING" && <MessagingCenter />}

        {/* TAB 3: Surveys & Form Builder */}
        {activeTab === "SURVEYS" && (
          selectedSurveyId ? (
            <SurveyAnalytics surveyId={selectedSurveyId} onBack={() => setSelectedSurveyId(null)} />
          ) : (
            <SurveyBuilder onSelectSurvey={(id) => setSelectedSurveyId(id)} />
          )
        )}

      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <CandidateDetailModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onUpdate={() => loadData()}
        />
      )}

      <Footer />
    </main>
  );
}

