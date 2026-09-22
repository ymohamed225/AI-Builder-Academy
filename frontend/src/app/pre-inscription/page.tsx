"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProgressBar } from "@/components/pre-registration/ProgressBar";
import { StepPersonalInfo } from "@/components/pre-registration/StepPersonalInfo";
import { StepSkills } from "@/components/pre-registration/StepSkills";
import { StepAIExperience } from "@/components/pre-registration/StepAIExperience";
import { StepProject } from "@/components/pre-registration/StepProject";
import { StepTrainingOffer } from "@/components/pre-registration/StepTrainingOffer";
import { StepSummary } from "@/components/pre-registration/StepSummary";
import { PreRegistrationFormData } from "@/types/pre-registration";
import { loadFormDraft, saveFormDraft, clearFormDraft } from "@/lib/storage";
import { submitPreRegistration } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { ArrowLeft, ArrowRight, Loader2, Sparkles, ShieldCheck } from "lucide-react";

const stepsTitles = [
  "Informations",
  "Niveau Tech",
  "Expérience IA",
  "Ton Projet",
  "Formation",
  "Récapitulatif",
];

function PreRegistrationFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const offerParam = searchParams.get("offer");

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<PreRegistrationFormData>(loadFormDraft());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();

  // Pre-fill offer if passed in URL query param ?offer=masterclass|bootcamp|premium
  useEffect(() => {
    if (offerParam) {
      const offerUpper = offerParam.toUpperCase();
      if (offerUpper === "MASTERCLASS" || offerUpper === "BOOTCAMP" || offerUpper === "PREMIUM") {
        setFormData((prev) => ({ ...prev, desired_training: offerUpper as any }));
      }
    }
  }, [offerParam]);

  // Persistance automatique
  useEffect(() => {
    saveFormDraft(formData);
  }, [formData]);

  useEffect(() => {
    trackEvent("form_started");
  }, []);

  const updateData = (fields: Partial<PreRegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const validateCurrentStep = (): boolean => {
    if (currentStep === 1) {
      if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.profession.trim()) {
        alert("Veuillez remplir tous les champs obligatoires de l'étape 1.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    trackEvent("form_step_completed", { step: currentStep });
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);
    setSubmitError(undefined);

    const res = await submitPreRegistration(formData);

    if (res.success && res.data) {
      trackEvent("form_submitted", { ref: res.data.registration_reference });
      clearFormDraft();
      router.push(`/pre-inscription/succes?ref=${encodeURIComponent(res.data.registration_reference)}&name=${encodeURIComponent(formData.first_name)}`);
    } else {
      setIsSubmitting(false);
      setSubmitError(res.message || "Impossible de soumettre la pré-inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex-grow">
      {/* Page Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs font-bold text-brand-cyan">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRÉ-INSCRIPTION AI BUILDER ACADEMY CI</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Fais ta <span className="gradient-text">pré-inscription</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          Quelques informations nous permettront de mieux comprendre ton niveau, ton objectif et le projet que tu souhaites construire.
        </p>

        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 shadow-md">
          <ShieldCheck className="w-4 h-4" />
          <span>La pré-inscription est 100% gratuite (0 FCFA) — aucun paiement demandé à cette étape.</span>
        </div>
      </div>

      {/* Card Container Form */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-8 relative">
        {/* Progress Bar */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={6}
          stepsTitles={stepsTitles}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* Form Step Body */}
        <div className="pt-2">
          {currentStep === 1 && <StepPersonalInfo formData={formData} updateData={updateData} />}
          {currentStep === 2 && <StepSkills formData={formData} updateData={updateData} />}
          {currentStep === 3 && <StepAIExperience formData={formData} updateData={updateData} />}
          {currentStep === 4 && <StepProject formData={formData} updateData={updateData} />}
          {currentStep === 5 && <StepTrainingOffer formData={formData} updateData={updateData} />}
          {currentStep === 6 && (
            <StepSummary
              formData={formData}
              onGoToStep={(step) => setCurrentStep(step)}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          )}
        </div>

        {/* Navigation Control Buttons */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-800 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>
          ) : <div />}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-cyan text-white font-extrabold text-xs shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Suivant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <span>🚀 Envoyer ma pré-inscription gratuite</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PreRegistrationPage() {
  return (
    <main className="min-h-screen bg-brand-dark text-slate-100 flex flex-col justify-between">
      <Navbar />
      <Suspense fallback={
        <div className="pt-36 pb-20 text-center flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-brand-cyan animate-spin" />
          <p className="text-slate-400 text-sm">Chargement du formulaire de pré-inscription...</p>
        </div>
      }>
        <PreRegistrationFormContent />
      </Suspense>
      <Footer />
    </main>
  );
}
