"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Database,
  ShieldCheck,
  Zap,
  TrendingUp,
  Activity,
  Terminal as TerminalIcon,
  Code2,
  Sparkles,
  Utensils,
  CheckCircle2,
  Server,
  Layers,
  Flame,
  BarChart3,
  ArrowUpRight,
  PieChart,
  Globe,
  DollarSign,
  Users as UsersIcon
} from "lucide-react";

export function HeroDashboard() {
  const [activeTab, setActiveTab] = useState<"saas" | "vibe" | "restaurant">("saas");
  const [typedPrompt, setTypedPrompt] = useState("");
  const [salesCount, setSalesCount] = useState(3464399);
  const [userCount, setUserCount] = useState(1253);

  // Prompt typing effect for Vibe Coding tab
  const fullPrompt = "Crée un dashboard SaaS moderne pour gérer les ventes et abonnements avec base de données et API sécurisée...";

  useEffect(() => {
    if (activeTab === "vibe") {
      setTypedPrompt("");
      let i = 0;
      const interval = setInterval(() => {
        if (i <= fullPrompt.length) {
          setTypedPrompt(fullPrompt.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // Subtle live counter effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSalesCount((prev) => prev + Math.floor(Math.random() * 5000));
      setUserCount((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="gradient-border max-w-5xl mx-auto shadow-2xl shadow-brand-500/30 relative group">
      
      {/* Outer Floating Neon Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan via-brand-500 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 pointer-events-none" />

      <div className="gradient-border-inner p-4 sm:p-7 overflow-hidden relative z-10 bg-slate-950/95 rounded-2xl">
        
        {/* Top Browser Window Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800/80">
          
          {/* Controls & URL */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-400">https://</span>
              <span className="text-brand-cyan font-bold">app.aibuilderacademy.ci</span>
            </div>
          </div>

          {/* Interactive Demo Mode Selector Tabs */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveTab("saas")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "saas"
                  ? "bg-gradient-to-r from-brand-500 to-blue-600 text-white shadow-md shadow-brand-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>SaaS Live</span>
            </button>

            <button
              onClick={() => setActiveTab("vibe")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "vibe"
                  ? "bg-gradient-to-r from-purple-600 to-brand-cyan text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Vibe Coding IA</span>
            </button>

            <button
              onClick={() => setActiveTab("restaurant")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "restaurant"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>MVP Restaurant</span>
            </button>
          </div>

          {/* Live Production Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mise en production active</span>
          </div>

        </div>

        {/* Main Content Grid: Left Dashboard & Right Smartphone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Main Screen (8 Columns) */}
          <div className="lg:col-span-8 space-y-5">
            
            <AnimatePresence mode="wait">
              
              {/* TAB 1: SAAS DASHBOARD */}
              {activeTab === "saas" && (
                <motion.div
                  key="saas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Section Title & Tag */}
                  <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-cyan">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white">Tableau de bord Business Intelligence - Produit Réel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                        ⚡ LATENCE: 12ms
                      </span>
                      <span className="text-[10px] font-mono text-brand-cyan bg-brand-500/20 px-2 py-0.5 rounded font-bold">
                        MVP Vibe Code
                      </span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-900/90 p-3 sm:p-4 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-brand-cyan/40 transition-colors">
                      <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs">
                        <span>Utilisateurs</span>
                        <UsersIcon className="w-3.5 h-3.5 text-brand-cyan" />
                      </div>
                      <span className="text-base sm:text-2xl font-black text-white mt-1 block">
                        {userCount.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-emerald-400 font-mono mt-1 block flex items-center gap-0.5 font-bold">
                        <TrendingUp className="w-2.5 h-2.5 inline" /> +12% ce mois
                      </span>
                    </div>

                    <div className="bg-slate-900/90 p-3 sm:p-4 rounded-xl border border-brand-cyan/40 relative overflow-hidden group shadow-lg shadow-brand-500/10">
                      <div className="absolute top-0 right-0 w-12 h-12 bg-brand-cyan/10 blur-xl pointer-events-none" />
                      <div className="flex items-center justify-between text-slate-300 text-[10px] sm:text-xs">
                        <span>Ventes (FCFA)</span>
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-base sm:text-2xl font-black text-emerald-400 mt-1 block tracking-tight">
                        {salesCount.toLocaleString()} F
                      </span>
                      <span className="text-[9px] text-brand-cyan font-mono mt-1 block flex items-center gap-0.5 font-bold">
                        <Flame className="w-2.5 h-2.5 inline text-amber-400" /> En direct (PostgreSQL)
                      </span>
                    </div>

                    <div className="bg-slate-900/90 p-3 sm:p-4 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
                      <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs">
                        <span>API Status</span>
                        <Server className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                      <span className="text-base sm:text-2xl font-black text-brand-cyan mt-1 block">
                        100% OK
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono mt-1 block font-semibold">
                        Uptime 99.9% • SSL
                      </span>
                    </div>
                  </div>

                  {/* Power BI Style Interactive Analytics Chart */}
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3 relative overflow-hidden">
                    
                    {/* BI Header & Legend */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-brand-cyan/10 text-brand-cyan">
                          <PieChart className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-white">Analyse BI — Revenue & Traffic Flow</span>
                      </div>

                      {/* Legend Items */}
                      <div className="flex items-center gap-3 text-[10px] font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-sm bg-brand-cyan shadow-sm shadow-brand-cyan/50" />
                          <span className="text-slate-300 font-semibold">Chiffre d'Affaires</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-sm bg-purple-400 shadow-sm shadow-purple-400/50" />
                          <span className="text-slate-300 font-semibold">Requêtes API</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400 font-bold">
                          <span className="text-brand-cyan">2026</span>
                        </div>
                      </div>
                    </div>

                    {/* SVG BI Multi-Series Chart */}
                    <div className="h-32 w-full relative pt-1">
                      
                      {/* Y-Axis Grid Lines & Values */}
                      <div className="absolute inset-0 flex flex-col justify-between text-[9px] font-mono text-slate-500 pointer-events-none pb-5">
                        <div className="border-b border-slate-800/60 w-full flex justify-between">
                          <span>3.5M FCFA</span>
                          <span className="text-[8px] text-emerald-400 bg-emerald-500/10 px-1.5 rounded font-extrabold border border-emerald-500/20">
                            ★ MAX 3.46M F
                          </span>
                        </div>
                        <div className="border-b border-slate-800/40 w-full"><span>2.5M FCFA</span></div>
                        <div className="border-b border-slate-800/40 w-full"><span>1.5M FCFA</span></div>
                        <div className="border-b border-slate-800/40 w-full"><span>0.5M FCFA</span></div>
                        <div className="border-b border-slate-800/80 w-full"><span>0 FCFA</span></div>
                      </div>

                      {/* SVG Elements */}
                      <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 400 80" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="biRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.45" />
                            <stop offset="80%" stopColor="#0066FF" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="#0066FF" stopOpacity="0.0" />
                          </linearGradient>

                          <linearGradient id="biBarGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.15" />
                          </linearGradient>
                        </defs>

                        {/* BI Histogram Columns / Bars */}
                        <rect x="25" y="45" width="14" height="35" rx="2" fill="url(#biBarGrad)" opacity="0.5" />
                        <rect x="80" y="35" width="14" height="45" rx="2" fill="url(#biBarGrad)" opacity="0.6" />
                        <rect x="135" y="50" width="14" height="30" rx="2" fill="url(#biBarGrad)" opacity="0.5" />
                        <rect x="190" y="28" width="14" height="52" rx="2" fill="url(#biBarGrad)" opacity="0.7" />
                        <rect x="245" y="20" width="14" height="60" rx="2" fill="url(#biBarGrad)" opacity="0.8" />
                        <rect x="300" y="15" width="14" height="65" rx="2" fill="url(#biBarGrad)" opacity="0.85" />
                        <rect x="355" y="8" width="14" height="72" rx="2" fill="url(#biBarGrad)" opacity="0.9" />

                        {/* Area Fill for Revenue Curve */}
                        <path
                          d="M 10 65 Q 65 42 120 52 T 225 25 T 325 15 T 395 6 L 395 80 L 10 80 Z"
                          fill="url(#biRevenueGrad)"
                        />

                        {/* Primary Line: Revenue Curve (Cyan Glowing) */}
                        <path
                          d="M 10 65 Q 65 42 120 52 T 225 25 T 325 15 T 395 6"
                          fill="none"
                          stroke="#00F0FF"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />

                        {/* Secondary Line: API Request Volume (Purple Dashed) */}
                        <path
                          d="M 10 72 Q 65 58 120 62 T 225 38 T 325 25 T 395 12"
                          fill="none"
                          stroke="#C084FC"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          strokeLinecap="round"
                        />

                        {/* Data Points */}
                        <circle cx="120" cy="52" r="3" fill="#00F0FF" />
                        <circle cx="225" cy="25" r="3" fill="#00F0FF" />
                        <circle cx="325" cy="15" r="3" fill="#00F0FF" />

                        {/* Active Live Pulse Pointer */}
                        <circle cx="395" cy="6" r="5" fill="#00F0FF" className="animate-ping opacity-80" />
                        <circle cx="395" cy="6" r="4" fill="#FFFFFF" stroke="#00F0FF" strokeWidth="2" />
                      </svg>

                      {/* X-Axis Month Labels */}
                      <div className="flex justify-between text-[9px] font-mono text-slate-400 pt-1 px-1 border-t border-slate-800/80">
                        <span>Jan</span>
                        <span>Fév</span>
                        <span>Mar</span>
                        <span>Avr</span>
                        <span>Mai</span>
                        <span>Juin</span>
                        <span className="text-brand-cyan font-bold">Juil (Direct)</span>
                      </div>

                    </div>

                    {/* BI Stats Summary Footer */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/90 border border-slate-800 text-[10px] font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-slate-300">Croissance BI : <strong className="text-emerald-400 font-bold">+34.8% ce trimestre</strong></span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <span>Moy. jour: <strong className="text-white">115 400 F</strong></span>
                        <span>Transactions: <strong className="text-brand-cyan font-bold">1 482</strong></span>
                      </div>
                    </div>

                  </div>

                  {/* Live Database & Security Status */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Database className="w-4 h-4 text-brand-cyan animate-pulse" />
                      <span className="font-medium">Base de données PostgreSQL & API Connectées</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Sécurisé (SSL / JWT)</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: VIBE CODING & IA LIVE */}
              {activeTab === "vibe" && (
                <motion.div
                  key="vibe"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Prompt Box */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        Prompt IA & Vibe Coding Assistant
                      </span>
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
                        Génération IA en cours...
                      </span>
                    </div>

                    <div className="font-mono text-xs text-slate-200 min-h-[48px] bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <span className="text-brand-cyan font-bold mr-2">&gt;</span>
                      {typedPrompt}
                      <span className="inline-block w-2 h-4 bg-brand-cyan ml-1 animate-pulse" />
                    </div>
                  </div>

                  {/* Live Generated Code Snippet */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-2 text-slate-300">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                      <span className="flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5 text-brand-cyan" /> src/app/dashboard/page.tsx
                      </span>
                      <span className="text-emerald-400 font-bold">✓ Code compilé sans erreurs</span>
                    </div>

                    <pre className="text-slate-300 overflow-x-auto leading-relaxed">
                      <code>
                        <span className="text-purple-400">export default function</span> <span className="text-yellow-300">Dashboard</span>() &#123;<br />
                        {"  "}<span className="text-purple-400">const</span> &#123; user, data &#125; = <span className="text-brand-cyan">useAIBuilderData</span>();<br />
                        {"  "}<span className="text-purple-400">return</span> (<br />
                        {"    "}&lt;<span className="text-blue-400">DashboardLayout</span> user=&#123;user&#125;&gt;<br />
                        {"      "}&lt;<span className="text-blue-400">MetricsGrid</span> stats=&#123;data.stats&#125; /&gt;<br />
                        {"      "}&lt;<span className="text-blue-400">WhatsAppNotificationSystem</span> /&gt;<br />
                        {"    "}&lt;/<span className="text-blue-400">DashboardLayout</span>&gt;<br />
                        {"  "});<br />
                        &#125;
                      </code>
                    </pre>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: MVP RESTAURANT */}
              {activeTab === "restaurant" && (
                <motion.div
                  key="restaurant"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">Gestion de Restaurant & Menus en Ligne</span>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded font-bold">
                      MVP Métier 100% Fonctionnel
                    </span>
                  </div>

                  {/* Orders Live List */}
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white block">Commande #104 — Table 4</span>
                        <span className="text-[10px] text-slate-400">2x Attieké Poisson Grillé + Boisson</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                        Servi (15,000 F)
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white block">Commande #105 — Livraison Cocody</span>
                        <span className="text-[10px] text-slate-400">1x Poulet Braisé XL + Aloko</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] animate-pulse">
                        En cuisine...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

          {/* Right Smartphone Screen Mockup (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative pt-2 lg:pt-0">
            
            {/* Phone Frame */}
            <div className="w-full max-w-[230px] rounded-[36px] bg-slate-900 border-4 border-slate-800 p-3 shadow-2xl relative overflow-hidden group-hover:border-brand-cyan/40 transition-colors">
              
              {/* Speaker Notch */}
              <div className="w-16 h-4 bg-slate-950 rounded-b-xl mx-auto mb-3 flex items-center justify-center">
                <div className="w-8 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Screen Inner Content */}
              <div className="bg-slate-950 rounded-[24px] p-4 text-center space-y-4 border border-slate-800/80 min-h-[260px] flex flex-col justify-between">
                
                {/* App Brand Header */}
                <div className="space-y-2 pt-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-500 mx-auto flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-brand-500/30">
                    AI
                  </div>
                  <span className="text-xs font-black text-white block">AI Builder App</span>
                  <span className="text-[10px] text-slate-400 font-mono block">iOS & Android Ready</span>
                </div>

                {/* Dynamic Screen View Based on Active Tab */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-left">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Statut App</span>
                    <span className="text-emerald-400 font-bold">● En ligne</span>
                  </div>
                  <div className="w-full h-2 bg-brand-cyan/30 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-gradient-to-r from-brand-cyan to-brand-500 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Bottom Verification Seal */}
                <div className="pt-2 border-t border-slate-900 flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Responsive 100% Mobile</span>
                </div>

              </div>

            </div>

            {/* Floating Pill Badges around Smartphone */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-[10px] font-extrabold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/30 px-2.5 py-1 rounded-full shadow-sm">
                ⚡ Vibe Coding
              </span>
              <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full shadow-sm">
                📱 Touch Optimized
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
