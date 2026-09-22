"use client";

import Link from "next/link";
import { Check, Star, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export function Pricing() {
  const handleOfferClick = (offerId: string, offerName: string) => {
    trackEvent(`click_${offerId}` as any, { offer: offerName });
  };

  return (
    <section id="pricing" className="py-20 md:py-28 relative">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-brand-cyan uppercase px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
            TARIFS DE LANCEMENT ACCESSIBLES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Choisissez votre <span className="gradient-text">formule</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Rejoignez la prochaine promotion AI Builder Academy CI et donnez vie à vos idées.
          </p>

          {/* 100% Free Pre-registration Badge Notice */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm font-bold text-emerald-300 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>La pré-inscription est 100% gratuite (0 FCFA) • Aucun paiement requis à cette étape</span>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 items-stretch">
          {SITE_CONFIG.offers.map((offer) => {
            const isPopular = offer.isPopular;

            return (
              <div
                key={offer.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "bg-gradient-to-b from-slate-900 to-slate-800/90 border-2 border-brand-cyan shadow-2xl shadow-brand-cyan/20 md:-translate-y-4"
                    : "glass-card border border-slate-700/50 hover:border-slate-600"
                }`}
              >
                {/* Popular Badge Tag */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>{offer.badge}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Offer Header */}
                  <div>
                    {!isPopular && offer.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-full border border-brand-cyan/20 mb-2 inline-block">
                        {offer.badge}
                      </span>
                    )}
                    <h3 className="text-2xl font-black text-white">
                      {offer.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-normal">
                      {offer.subtitle}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="pt-2 border-t border-slate-700/50">
                    <span className="text-xs text-slate-400 line-through font-mono block">
                      {offer.originalPrice}
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        {offer.launchPrice}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-1 block">
                      Prix spécial lancement
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 pt-4 border-t border-slate-700/50 text-xs sm:text-sm text-slate-300">
                    {offer.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action Link Button to Pre-registration */}
                <div className="pt-8 mt-6">
                  <Link
                    href={`/pre-inscription?offer=${offer.id}`}
                    onClick={() => handleOfferClick(offer.id, offer.name)}
                    className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      isPopular
                        ? "bg-gradient-to-r from-brand-500 via-blue-600 to-brand-cyan text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 shadow-md"
                    }`}
                  >
                    <span>🚀 PRÉ-INSCRIPTION GRATUITE</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-[10px] text-center text-slate-400 block mt-2 font-mono">
                    Pré-inscription 100% gratuite (0 FCFA)
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mandatory IA Subscription Disclaimer Notice */}
        <div className="mt-14 max-w-4xl mx-auto p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs sm:text-sm text-amber-200/90 leading-relaxed shadow-sm">
          <div className="flex items-center gap-2 text-amber-200 font-bold text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
            <span>Information transparente concernant les outils IA :</span>
          </div>
          <p className="text-amber-200/90">
            ⚠️ L'abonnement à l'outil IA utilisé pendant la formation n'est pas inclus dans les frais de formation. Prévoir environ <strong>3 000 FCFA</strong> selon l'outil choisi. Chaque participant crée et conserve son propre compte afin d'en garder le contrôle total.
          </p>
        </div>

      </div>
    </section>
  );
}
