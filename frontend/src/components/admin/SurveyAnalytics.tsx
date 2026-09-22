"use client";

import { useState, useEffect } from "react";
import { BarChart2, ArrowLeft, Star, Users, Calendar, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";
import { fetchSurveyResponses } from "@/lib/api";

interface SurveyAnalyticsProps {
  surveyId: number;
  onBack: () => void;
}

export function SurveyAnalytics({ surveyId, onBack }: SurveyAnalyticsProps) {
  const [survey, setSurvey] = useState<any | null>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const res = await fetchSurveyResponses(surveyId);
      if (res.success) {
        setSurvey(res.survey);
        setResponses(res.data || []);
      }
      setIsLoading(false);
    };
    load();
  }, [surveyId]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-400 space-y-3">
        <Loader2 className="w-8 h-8 text-brand-cyan animate-spin mx-auto" />
        <p className="text-sm font-bold">Chargement des données du sondage...</p>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="py-12 text-center text-slate-400 space-y-4">
        <p>Sondage introuvable.</p>
        <button onClick={onBack} className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs">
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs hover:text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux formulaires</span>
        </button>

        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
          Enquête #{survey.id}
        </span>
      </div>

      {/* Survey Title & Summary Stats */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wider">Analyse des Réponses</span>
          <h2 className="text-2xl font-black text-white">{survey.title}</h2>
          {survey.description && <p className="text-xs text-slate-300">{survey.description}</p>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-3xl font-black text-brand-cyan">{responses.length}</span>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
              Réponses totales
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-3xl font-black text-emerald-400">
              {Array.isArray(survey.fields) ? survey.fields.length : 0}
            </span>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
              Questions posées
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center col-span-2 sm:col-span-1">
            <span className="text-3xl font-black text-amber-400 flex items-center justify-center gap-1">
              <Star className="w-6 h-6 fill-amber-400" />
              <span>100%</span>
            </span>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
              Taux de complétion
            </span>
          </div>
        </div>
      </div>

      {/* Individual Response Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white flex items-center justify-between">
          <span>Détail des Réponses Soumises ({responses.length})</span>
        </h3>

        {responses.length === 0 ? (
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs italic">
            Aucune réponse enregistrée pour le moment. Partagez le lien du formulaire à vos candidats pour collecter des retours !
          </div>
        ) : (
          <div className="space-y-4">
            {responses.map((resp, idx) => (
              <div key={resp.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-cyan/20 text-brand-cyan font-black text-xs flex items-center justify-center">
                      #{responses.length - idx}
                    </div>
                    <div>
                      <span className="font-extrabold text-sm text-white block">
                        {resp.respondent_name || "Anonyme"}
                      </span>
                      {resp.respondent_email && (
                        <span className="text-[10px] text-slate-400 font-mono">{resp.respondent_email}</span>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500">
                    {new Date(resp.created_at).toLocaleString("fr-FR")}
                  </span>
                </div>

                {/* Answers Breakdown */}
                <div className="space-y-3">
                  {survey.fields && Array.isArray(survey.fields) && survey.fields.map((f: any) => {
                    const ans = resp.answers ? resp.answers[f.id] : undefined;
                    return (
                      <div key={f.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                        <span className="text-xs font-bold text-slate-400 block">{f.label}</span>
                        <div className="text-xs font-extrabold text-white">
                          {f.type === "RATING" ? (
                            <div className="flex items-center gap-1 text-amber-400">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`w-4 h-4 ${s <= Number(ans) ? "fill-amber-400 text-amber-400" : "text-slate-700"}`}
                                />
                              ))}
                              <span className="ml-2 text-xs font-mono text-slate-300">({ans}/5)</span>
                            </div>
                          ) : Array.isArray(ans) ? (
                            ans.join(", ")
                          ) : (
                            ans || <span className="text-slate-600 italic">Sans réponse</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
