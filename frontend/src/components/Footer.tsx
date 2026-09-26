"use client";

import { SITE_CONFIG } from "@/config/site";
import { MessageSquare, ShieldCheck, Heart } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-500 flex items-center justify-center p-0.5 shadow-sm">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-brand-cyan text-lg">
                  A
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white text-base">AI BUILDER ACADEMY</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
                    CI 🇨🇮
                  </span>
                </div>
                <span className="text-[10px] text-brand-cyan font-mono">{SITE_CONFIG.slogan}</span>
              </div>
            </div>
            
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Formation pratique et accompagnement pour entrepreneurs, étudiants et professionnels en Côte d'Ivoire. Apprends à concevoir, développer et mettre en production tes applications grâce à l'IA.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#why-us" className="hover:text-brand-cyan transition-colors">Pourquoi cette formation ?</a></li>
              <li><a href="#skills" className="hover:text-brand-cyan transition-colors">Ce que tu vas apprendre</a></li>
              <li><a href="#projects" className="hover:text-brand-cyan transition-colors">Exemples de projets</a></li>
              <li><a href="#program" className="hover:text-brand-cyan transition-colors">Programme 4 semaines</a></li>
              <li><a href="#pricing" className="hover:text-brand-cyan transition-colors">Tarifs & Offres</a></li>
              <li><a href="#faq" className="hover:text-brand-cyan transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact & Inscription */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact Direct</h4>
            <p className="text-xs text-slate-400">
              Assistance & Inscriptions sur WhatsApp :
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contacter l'équipe pédagogique</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p suppressHydrationWarning>© {new Date().getFullYear()} {SITE_CONFIG.name}. Tous droits réservés. Abidjan, Côte d'Ivoire 🇨🇮</p>
          <div className="flex items-center gap-1">
            <span>Conçu avec passion pour l'innovation en Afrique</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
