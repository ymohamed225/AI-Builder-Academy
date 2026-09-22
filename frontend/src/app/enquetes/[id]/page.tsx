"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { fetchSurveyByIdOrSlug, submitSurveyResponse } from "@/lib/api";
import { Sparkles, CheckCircle2, Star, Send, Loader2, FileText, AlertCircle } from "lucide-react";

function PublicSurveyFormContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const surveyIdOrSlug = (params?.id as string) || "";
  const initialName = searchParams.get("name") || "";
  const initialEmail = searchParams.get("email") || "";

  const [survey, setSurvey] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [respondentName, setRespondentName] = useState(initialName);
  const [respondentEmail, setRespondentEmail] = useState(initialEmail);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!surveyIdOrSlug) return;
      setIsLoading(true);
      const res = await fetchSurveyByIdOrSlug(surveyIdOrSlug);
      setIsLoading(false);

      if (res.success && res.data) {
        setSurvey(res.data);
      } else {
        setErrorMessage(res.message || "Formulaire d'enquête introuvable.");
      }
    };
    load();
  }, [surveyIdOrSlug]);

  const handleAnswerChange = (fieldId: string, val: any) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: val }));
  };

  const handleCheckboxToggle = (fieldId: string, option: string) => {
    const current: string[] = answers[fieldId] || [];
    if (current.includes(option)) {
      setAnswers((prev) => ({ ...prev, [fieldId]: current.filter((o) => o !== option) }));
    } else {
      setAnswers((prev) => ({ ...prev, [fieldId]: [...current, option] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await submitSurveyResponse(surveyIdOrSlug, {
      respondent_name: respondentName,
      respondent_email: respondentEmail,
      answers,
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
    } else {
      alert(res.message || "Erreur de soumission. Veuillez réessayer.");
    }
  };

  if (isLoading) {
    return (
      <div className="pt-36 pb-20 text-center space-y-4">
        <Loader2 className="w-8 h-8 text-brand-cyan animate-spin mx-auto" />
        <p className="text-slate-400 text-sm">Chargement du questionnaire...</p>
      </div>
    );
  }

  if (errorMessage || !survey) {
    return (
      <div className="pt-36 pb-20 max-w-lg mx-auto px-4 text-center space-y-4">
        <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h2 className="text-xl font-black text-white">Formulaire introuvable</h2>
          <p className="text-xs text-slate-400">{errorMessage || "Ce questionnaire n'est plus disponible."}</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="pt-36 pb-20 max-w-xl mx-auto px-4 text-center">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/40 space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white">Merci pour votre réponse !</h2>
            <p className="text-slate-300 text-sm">
              Vos retours ont bien été enregistrés et transmis à l'équipe pédagogique AI Builder Academy CI.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 font-mono">
            AI BUILDER ACADEMY CI • Apprendre • Créer • Déployer
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full flex-grow">
      {/* Page Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-xs font-bold text-brand-cyan">
          <Sparkles className="w-3.5 h-3.5" />
          <span>QUESTIONNAIRE AI BUILDER ACADEMY CI</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {survey.title}
        </h1>

        {survey.description && (
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            {survey.description}
          </p>
        )}
      </div>

      {/* Main Survey Card Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
        
        {/* Respondent Info Section */}
        <div className="space-y-4 pb-6 border-b border-slate-800">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Vos Coordonnées (Optionnel)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Votre Nom & Prénom</label>
              <input
                type="text"
                value={respondentName}
                onChange={(e) => setRespondentName(e.target.value)}
                placeholder="Ex: Jean Koffi"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Votre Email / Téléphone</label>
              <input
                type="text"
                value={respondentEmail}
                onChange={(e) => setRespondentEmail(e.target.value)}
                placeholder="Ex: jean.koffi@gmail.com"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>
        </div>

        {/* Form Dynamic Fields */}
        <div className="space-y-6">
          {survey.fields && Array.isArray(survey.fields) && survey.fields.map((field: any, idx: number) => (
            <div key={field.id} className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <label className="text-xs font-bold text-white block">
                {idx + 1}. {field.label} {field.required && <span className="text-red-400">*</span>}
              </label>

              {/* RATING 1-5 Stars */}
              {field.type === "RATING" && (
                <div className="flex items-center gap-3 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleAnswerChange(field.id, star)}
                      className={`p-3 rounded-xl border transition-all ${
                        answers[field.id] >= star
                          ? "bg-amber-500/20 border-amber-400 text-amber-400 shadow-md scale-105"
                          : "bg-slate-950 border-slate-800 text-slate-600 hover:text-slate-400"
                      }`}
                    >
                      <Star className={`w-6 h-6 ${answers[field.id] >= star ? "fill-amber-400" : ""}`} />
                    </button>
                  ))}
                </div>
              )}

              {/* TEXT Short */}
              {field.type === "TEXT" && (
                <input
                  type="text"
                  value={answers[field.id] || ""}
                  onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                  placeholder="Votre réponse..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  required={field.required}
                />
              )}

              {/* TEXTAREA Long */}
              {field.type === "TEXTAREA" && (
                <textarea
                  rows={3}
                  value={answers[field.id] || ""}
                  onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                  placeholder="Développez votre réponse ici..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  required={field.required}
                />
              )}

              {/* RADIO Single choice */}
              {field.type === "RADIO" && (
                <div className="space-y-2 pt-1">
                  {field.options?.map((opt: string) => (
                    <label key={opt} className="flex items-center gap-3 text-xs text-slate-200 cursor-pointer p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700">
                      <input
                        type="radio"
                        name={field.id}
                        value={opt}
                        checked={answers[field.id] === opt}
                        onChange={() => handleAnswerChange(field.id, opt)}
                        className="w-4 h-4 text-brand-cyan bg-slate-900 border-slate-700"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* CHECKBOX Multiple choice */}
              {field.type === "CHECKBOX" && (
                <div className="space-y-2 pt-1">
                  {field.options?.map((opt: string) => {
                    const isChecked = (answers[field.id] || []).includes(opt);
                    return (
                      <label key={opt} className="flex items-center gap-3 text-xs text-slate-200 cursor-pointer p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxToggle(field.id, opt)}
                          className="w-4 h-4 rounded text-brand-cyan bg-slate-900 border-slate-700"
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* YES_NO */}
              {field.type === "YES_NO" && (
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => handleAnswerChange(field.id, "Oui")}
                    className={`flex-1 py-3 rounded-xl font-extrabold text-xs border transition-all ${
                      answers[field.id] === "Oui"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    }`}
                  >
                    👍 Oui
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAnswerChange(field.id, "Non")}
                    className={`flex-1 py-3 rounded-xl font-extrabold text-xs border transition-all ${
                      answers[field.id] === "Non"
                        ? "bg-red-500/20 text-red-400 border-red-500"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                    }`}
                  >
                    👎 Non
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-blue-600 to-brand-cyan text-white font-extrabold text-sm shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Envoi de votre réponse...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Soumettre mes réponses</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

export default function PublicSurveyPage() {
  return (
    <main className="min-h-screen bg-brand-dark text-slate-100 flex flex-col justify-between">
      <Navbar />
      <Suspense fallback={
        <div className="pt-36 pb-20 text-center">
          <Loader2 className="w-8 h-8 text-brand-cyan animate-spin mx-auto" />
        </div>
      }>
        <PublicSurveyFormContent />
      </Suspense>
      <Footer />
    </main>
  );
}
