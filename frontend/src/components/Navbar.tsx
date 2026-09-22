"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Menu, X, Rocket, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    trackEvent("click_whatsapp", { source: "navbar" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan via-brand-500 to-purple-600 flex items-center justify-center p-0.5 shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-brand-darker rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-500 text-xl tracking-tighter">
                  A
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-wider text-white">
                  AI BUILDER
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
                  ACADEMY CI 🇨🇮
                </span>
              </div>
              <span className="text-[10px] font-semibold text-brand-cyan tracking-widest uppercase">
                {SITE_CONFIG.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#why-us" className="hover:text-brand-cyan transition-colors">Pourquoi nous</a>
            <a href="#skills" className="hover:text-brand-cyan transition-colors">Compétences</a>
            <a href="#projects" className="hover:text-brand-cyan transition-colors">Projets</a>
            <a href="#program" className="hover:text-brand-cyan transition-colors">Programme</a>
            <a href="#pricing" className="hover:text-brand-cyan transition-colors">Offres</a>
            <a href="#faq" className="hover:text-brand-cyan transition-colors">FAQ</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/pre-inscription"
              className="relative inline-flex items-center justify-center px-4 py-2.5 text-xs font-black text-white transition-all bg-gradient-to-r from-brand-500 via-blue-600 to-brand-cyan rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>🚀 Pré-inscription Gratuite</span>
            </Link>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="relative inline-flex items-center justify-center px-3.5 py-2.5 text-xs font-bold text-slate-200 transition-all bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 hover:text-white"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-slate-800 px-4 pt-4 pb-6 space-y-4">
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-brand-cyan"
          >
            Pourquoi nous
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-brand-cyan"
          >
            Compétences
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-brand-cyan"
          >
            Projets
          </a>
          <a
            href="#program"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-brand-cyan"
          >
            Programme
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-brand-cyan"
          >
            Offres & Tarifs
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-brand-cyan"
          >
            FAQ
          </a>

          <div className="pt-2 space-y-2">
            <Link
              href="/pre-inscription"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center px-5 py-3 text-sm font-black text-white bg-gradient-to-r from-brand-500 via-blue-600 to-brand-cyan rounded-xl shadow-lg shadow-brand-500/30"
            >
              <Rocket className="w-4 h-4 mr-2" />
              🚀 Pré-inscription Gratuite (0 FCFA)
            </Link>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                handleWhatsAppClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center px-5 py-2.5 text-xs font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-xl"
            >
              <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" />
              Contact WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
