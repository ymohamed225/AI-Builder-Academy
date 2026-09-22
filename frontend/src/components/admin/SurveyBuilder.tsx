"use client";

import { useState, useEffect } from "react";
import { FileText, Plus, Trash2, Share2, Copy, Eye, Sparkles, CheckCircle2, MessageSquare, BarChart2, Star, Loader2 } from "lucide-react";
import { createSurvey, fetchSurveys, deleteSurvey } from "@/lib/api";

interface FieldDefinition {
  id: string;
  label: string;
  type: "TEXT" | "TEXTAREA" | "RATING" | "RADIO" | "CHECKBOX" | "YES_NO";
  options?: string[]; // for RADIO / CHECKBOX
  required: boolean;
}

export function SurveyBuilder({ onSelectSurvey }: { onSelectSurvey: (surveyId: number) => void }) {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form Builder state
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<FieldDefinition[]>([
    { id: "q1", label: "Comment évaluez-vous la présentation de la formation ?", type: "RATING", required: true },
    { id: "q2", label: "Quels sont vos besoins prioritaires pour votre projet ?", type: "TEXTAREA", required: true },
  ]);

  const loadSurveysList = async () => {
    setIsLoading(true);
    const res = await fetchSurveys();
    if (res.success && res.data) setSurveys(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSurveysList();
  }, []);

  const handleAddField = (type: FieldDefinition["type"]) => {
    const newField: FieldDefinition = {
      id: "q_" + Date.now(),
      label: type === "RATING" ? "Note de satisfaction" : "Nouvelle question",
      type,
      options: type === "RADIO" || type === "CHECKBOX" ? ["Option 1", "Option 2"] : undefined,
      required: true,
    };
    setFields([...fields, newField]);
  };

  const handleUpdateField = (index: number, key: keyof FieldDefinition, value: any) => {
    const updated = [...fields];
    updated[index] = { ...updated[index], [key]: value };
    setFields(updated);
  };

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, idx) => idx !== index));
  };

  const handleSaveSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || fields.length === 0) {
      alert("Veuillez renseigner un titre et au moins une question.");
      return;
    }

    const res = await createSurvey({
      title,
      description,
      fields,
      is_active: true,
    });

    if (res.success) {
      alert("Formulaire d'enquête créé avec succès !");
      setIsCreating(false);
      setTitle("");
      setDescription("");
      loadSurveysList();
    } else {
      alert(res.message || "Erreur lors de la création.");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer ce formulaire ?")) {
      const res = await deleteSurvey(id);
      if (res.success) loadSurveysList();
    }
  };

  const copySurveyUrl = (slugOrId: string) => {
    const url = `${window.location.origin}/enquetes/${slugOrId}`;
    navigator.clipboard.writeText(url);
    alert("Lien du formulaire copié : " + url);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CRÉATEUR DE FORMULAIRES DE COLLECTE & SONDAGES</span>
          </div>
          <h2 className="text-2xl font-black text-white">Générateur d'Enquêtes Rapides (Google Forms Style)</h2>
          <p className="text-xs text-slate-300">
            Concevez des mini-formulaires personnalisés pour collecter l'avis des candidats, leurs besoins ou l'évaluation des sessions.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-500 via-blue-600 to-brand-cyan text-white font-black text-xs shadow-lg shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isCreating ? "Fermer l'éditeur" : "+ Nouveau Formulaire"}</span>
        </button>
      </div>

      {/* Form Creator Editor Interface */}
      {isCreating && (
        <form onSubmit={handleSaveSurvey} className="glass-card p-6 sm:p-8 rounded-3xl border border-brand-cyan/40 space-y-6 shadow-2xl">
          <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-4">
            <FileText className="w-5 h-5 text-brand-cyan" />
            <span>Nouveau Formulaire d'Enquête</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Titre de l'enquête / du sondage *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Enquête de satisfaction Masterclass Février"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Description / Instruction pour le candidat</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Merci de répondre à ces 3 questions pour nous aider à améliorer la formation."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>

          {/* List of Questions */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider block">
              Questions du formulaire ({fields.length})
            </label>

            {fields.map((field, idx) => (
              <div key={field.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-extrabold text-brand-cyan">Question #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveField(idx)}
                    className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => handleUpdateField(idx, "label", e.target.value)}
                      placeholder="Intitulé de la question..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <select
                      value={field.type}
                      onChange={(e) => handleUpdateField(idx, "type", e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="RATING">⭐ Évaluation Star (1-5)</option>
                      <option value="TEXT">📝 Texte Court</option>
                      <option value="TEXTAREA">💬 Paragraphe Long</option>
                      <option value="RADIO">🔘 Choix Unique (Radio)</option>
                      <option value="CHECKBOX">☑️ Choix Multiples</option>
                      <option value="YES_NO">👍 Oui / Non</option>
                    </select>
                  </div>
                </div>

                {(field.type === "RADIO" || field.type === "CHECKBOX") && (
                  <div className="pl-2 space-y-2">
                    <label className="text-[10px] text-slate-400 font-bold block">Options (séparées par une virgule)</label>
                    <input
                      type="text"
                      value={field.options?.join(", ") || ""}
                      onChange={(e) => handleUpdateField(idx, "options", e.target.value.split(",").map(s => s.trim()))}
                      placeholder="Option 1, Option 2, Option 3"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Add Question Toolbar */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold text-slate-400 mr-2">+ Ajouter question :</span>
              <button
                type="button"
                onClick={() => handleAddField("RATING")}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-amber-400 hover:bg-slate-800"
              >
                ⭐ Note 1-5
              </button>
              <button
                type="button"
                onClick={() => handleAddField("TEXT")}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-800"
              >
                📝 Texte Court
              </button>
              <button
                type="button"
                onClick={() => handleAddField("TEXTAREA")}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-800"
              >
                💬 Paragraphe
              </button>
              <button
                type="button"
                onClick={() => handleAddField("RADIO")}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-800"
              >
                🔘 Choix Unique
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              🚀 Enregistrer et Publier le Formulaire
            </button>
          </div>
        </form>
      )}

      {/* List of Existing Surveys */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white flex items-center justify-between">
          <span>Formulaires d'Enquête Actifs ({surveys.length})</span>
        </h3>

        {isLoading ? (
          <div className="text-center py-12 text-slate-500">
            <Loader2 className="w-6 h-6 text-brand-cyan animate-spin mx-auto mb-2" />
            <span>Chargement des sondages...</span>
          </div>
        ) : surveys.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-3xl border border-slate-800 text-slate-400 space-y-2">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-white">Aucun formulaire créé pour le moment</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Cliquez sur "+ Nouveau Formulaire" en haut pour générer votre premier sondage rapide et collecter les retours candidats.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {surveys.map((survey) => (
              <div
                key={survey.id}
                className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-full border border-brand-cyan/20">
                      {survey.responses_count} réponse(s) collectée(s)
                    </span>
                    <button
                      onClick={() => handleDelete(survey.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-lg font-black text-white">{survey.title}</h4>
                  {survey.description && (
                    <p className="text-xs text-slate-400 line-clamp-2">{survey.description}</p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Questions: {Array.isArray(survey.fields) ? survey.fields.length : 0}</span>
                    <span className="font-mono text-[10px]">Slug: {survey.slug}</span>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => copySurveyUrl(survey.slug)}
                      className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-200 hover:text-white flex items-center justify-center gap-1 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier Lien</span>
                    </button>

                    <a
                      href={`/enquetes/${survey.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-bold text-brand-cyan hover:bg-slate-800 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Tester</span>
                    </a>

                    <button
                      onClick={() => onSelectSurvey(survey.id)}
                      className="py-2 px-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[11px] font-bold hover:bg-purple-500 hover:text-white flex items-center justify-center gap-1 transition-all"
                    >
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span>Voir Retours</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
