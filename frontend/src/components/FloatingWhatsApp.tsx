"use client";

import { MessageSquare } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function FloatingWhatsApp() {
  const handleClick = () => {
    trackEvent("click_whatsapp", { source: "floating_button" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Discuter sur WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing Aura Effect */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30 pointer-events-none" />

        <MessageSquare className="w-7 h-7" />

        {/* Hover Tooltip Label */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold whitespace-nowrap border border-slate-800 shadow-xl">
          Discuter sur WhatsApp 💬
        </span>
      </a>
    </div>
  );
}
