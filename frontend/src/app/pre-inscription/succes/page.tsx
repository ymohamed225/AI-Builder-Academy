"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "AI-CI-2026-VALIDE";
  const name = searchParams.get("name") || "";

  const whatsappMessage = `Bonjour, je viens de faire ma pré-inscription à AI Builder Academy CI (Réf: ${ref}) et je souhaite connaître les prochaines étapes.`;

  const handleWhatsAppClick = () => {
    trackEvent("click_whatsapp", { source: "success_screen", ref });
  };

  return (
    <div className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-6 relative overflow-hidden">
      
      <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
          RÉFÉRENCE : {ref}
        </span>
        
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          🎉 Ta pré-inscription a bien été enregistrée {name ? `, ${name}` : ""} !
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Merci pour ton intérêt pour <strong>AI Builder Academy CI</strong>. <br />
          Nous allons étudier ton profil et te contacter directement sur WhatsApp afin de confirmer les prochaines étapes de ton inscription.
        </p>
      </div>

      <div className="pt-4 flex flex-col items-center gap-4">
        <a
          href={getWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          <span>💬 Continuer sur WhatsApp</span>
        </a>

        <a
          href="/"
          className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          Retour à l'accueil
        </a>
      </div>

    </div>
  );
}

export default function PreRegistrationSuccessPage() {
  return (
    <main className="min-h-screen bg-brand-dark text-slate-100 flex flex-col justify-between">
      <Navbar />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center my-auto">
        <Suspense fallback={
          <div className="p-12 text-center text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-brand-cyan" />
            <span>Chargement...</span>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
