"use client";

import { useState, useEffect, useMemo } from "react";
import { MessageSquare, Mail, Send, Paperclip, Clock, CheckCircle2, AlertCircle, FileText, Users, Sparkles, ExternalLink, Loader2, Search, UserCheck, Plus, X } from "lucide-react";
import { sendCampaign, uploadCampaignAttachment, fetchCampaigns, fetchPreRegistrations } from "@/lib/api";
import { PreRegistrationRecord } from "@/types/pre-registration";

const PRESET_TEMPLATES = [
  {
    id: "REMINDER_PRE_REG",
    title: "🔔 Rappel de confirmation d'admission",
    channel: "BOTH" as const,
    subject: "AI Builder Academy CI — Confirmation de votre dossier",
    body: "Bonjour {first_name},\n\nNous avons bien reçu votre pré-inscription (Réf: {ref}) pour la formation AI Builder Academy CI.\n\nNotre équipe pédagogique a analysé votre profil pour le parcours {training}. Nous vous invitons à confirmer votre disponibilité pour la session à venir.\n\nDes questions ? Répondez directement à ce message ou contactez notre équipe.",
  },
  {
    id: "SEND_BROCHURE",
    title: "📄 Envoi de Brochure & Curriculum",
    channel: "BOTH" as const,
    subject: "Programme complet AI Builder Academy CI",
    body: "Bonjour {first_name},\n\nRetrouvez en pièce jointe la brochure détaillée ainsi que le programme complet des 4 semaines de formation AI Builder Academy CI.\n\nConsultez le document et préparez vos questions pour notre prochain échange !\n\nCordialement,\nL'équipe AI Builder Academy CI",
  },
  {
    id: "WELCOME_ONBOARDING",
    title: "🎓 Message de Bienvenue & Accès",
    channel: "BOTH" as const,
    subject: "Bienvenue dans la promotion AI Builder Academy CI 🚀",
    body: "Félicitations {first_name} ! 🎉\n\nVotre admission pour la formation {training} a été validée.\n\nVous trouverez les accès à l'espace de cours ainsi que le calendrier des sessions live. Préparez votre ordinateur et votre créativité, nous allons construire de superbes applications ensemble !\n\nÀ très vite !",
  },
  {
    id: "SURVEY_INVITATION",
    title: "📋 Invitation Enquête de Besoin / Avis",
    channel: "BOTH" as const,
    subject: "AI Builder Academy CI — Votre avis compte pour nous",
    body: "Bonjour {first_name},\n\nAfin de vous proposer le meilleur accompagnement personnalisé, nous vous invitons à remplir notre rapide questionnaire (2 minutes chrono).\n\nMerci pour votre participation !",
  },
];

export function MessagingCenter() {
  const [channel, setChannel] = useState<"WHATSAPP" | "EMAIL" | "BOTH">("WHATSAPP");
  const [recipientType, setRecipientType] = useState<"ALL" | "STATUS" | "TRAINING" | "CUSTOM" | "SELECT">("ALL");
  const [statusFilter, setStatusFilter] = useState("NEW");
  const [trainingFilter, setTrainingFilter] = useState("BOOTCAMP");
  
  // Custom manual input recipients
  const [customRecipientsInput, setCustomRecipientsInput] = useState("");
  
  // Select candidate IDs
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<number[]>([]);
  const [candidateSearch, setCandidateSearch] = useState("");

  const [allCandidates, setAllCandidates] = useState<PreRegistrationRecord[]>([]);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(false);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [bodyTemplate, setBodyTemplate] = useState("");
  
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [sentResult, setSentResult] = useState<{ campaign?: any; recipients?: any[]; message?: string } | null>(null);
  const [pastCampaigns, setPastCampaigns] = useState<any[]>([]);
  const [showRecipientListModal, setShowRecipientListModal] = useState(false);

  const loadInitialData = async () => {
    setIsLoadingCandidates(true);
    const [campsRes, candsRes] = await Promise.all([
      fetchCampaigns(),
      fetchPreRegistrations()
    ]);

    if (campsRes.success && campsRes.data) setPastCampaigns(campsRes.data);
    if (candsRes.success && candsRes.data) setAllCandidates(candsRes.data);
    setIsLoadingCandidates(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Compute live list of target recipient emails & details
  const liveTargetRecipients = useMemo(() => {
    if (recipientType === "ALL") {
      return allCandidates.map(c => ({
        id: c.id,
        name: `${c.first_name} ${c.last_name}`,
        email: c.email,
        phone: c.phone,
        type: "Candidat inscrit",
        training: c.desired_training
      }));
    }

    if (recipientType === "STATUS") {
      return allCandidates
        .filter(c => c.status === statusFilter)
        .map(c => ({
          id: c.id,
          name: `${c.first_name} ${c.last_name}`,
          email: c.email,
          phone: c.phone,
          type: `Statut: ${c.status}`,
          training: c.desired_training
        }));
    }

    if (recipientType === "TRAINING") {
      return allCandidates
        .filter(c => c.desired_training === trainingFilter)
        .map(c => ({
          id: c.id,
          name: `${c.first_name} ${c.last_name}`,
          email: c.email,
          phone: c.phone,
          type: `Formule: ${c.desired_training}`,
          training: c.desired_training
        }));
    }

    if (recipientType === "SELECT") {
      return allCandidates
        .filter(c => selectedCandidateIds.includes(c.id))
        .map(c => ({
          id: c.id,
          name: `${c.first_name} ${c.last_name}`,
          email: c.email,
          phone: c.phone,
          type: "Sélectionné manuellement",
          training: c.desired_training
        }));
    }

    if (recipientType === "CUSTOM") {
      const parsed = customRecipientsInput
        .split(/[\n,;]+/)
        .map(s => s.trim())
        .filter(Boolean);

      return parsed.map((entry, idx) => ({
        id: `custom_${idx}`,
        name: entry.includes("@") ? entry.split("@")[0] : "Saisie manuelle",
        email: entry.includes("@") ? entry : "Email non précisé",
        phone: !entry.includes("@") ? entry : "N/A",
        type: "Saisie directe",
        training: "Manuel"
      }));
    }

    return [];
  }, [recipientType, statusFilter, trainingFilter, selectedCandidateIds, customRecipientsInput, allCandidates]);

  // Candidates filtered by search input in SELECT mode
  const filteredCandidatesForSelect = useMemo(() => {
    if (!candidateSearch.trim()) return allCandidates;
    const q = candidateSearch.toLowerCase();
    return allCandidates.filter(
      c =>
        c.first_name?.toLowerCase().includes(q) ||
        c.last_name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.includes(q)
    );
  }, [allCandidates, candidateSearch]);

  const handleSelectTemplate = (template: typeof PRESET_TEMPLATES[0]) => {
    setTitle(template.title);
    setSubject(template.subject);
    setBodyTemplate(template.body);
    if (template.channel) setChannel(template.channel);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachmentFile(file);
    setIsUploading(true);

    const res = await uploadCampaignAttachment(file);
    setIsUploading(false);

    if (res.success && res.file_url) {
      setAttachmentUrl(res.file_url);
      setAttachmentName(res.file_name || file.name);
    } else {
      alert(res.message || "Erreur lors de l'envoi de la pièce jointe.");
    }
  };

  const handleToggleCandidateSelect = (id: number) => {
    setSelectedCandidateIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAllFilteredCandidates = () => {
    const filteredIds = filteredCandidatesForSelect.map(c => c.id);
    const allSelected = filteredIds.every(id => selectedCandidateIds.includes(id));
    if (allSelected) {
      setSelectedCandidateIds(prev => prev.filter(id => !filteredIds.includes(id)));
    } else {
      setSelectedCandidateIds(prev => Array.from(new Set([...prev, ...filteredIds])));
    }
  };

  const handleSendCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !bodyTemplate.trim()) {
      alert("Veuillez remplir le titre et le corps du message.");
      return;
    }

    if (liveTargetRecipients.length === 0) {
      alert("Aucun destinataire cible sélectionné. Veuillez vérifier vos filtres ou saisir des adresses email.");
      return;
    }

    setIsSending(true);
    setSentResult(null);

    const backendRecipientType = (recipientType === "SELECT" || recipientType === "CUSTOM") ? "CUSTOM" : recipientType;

    const res = await sendCampaign({
      title,
      channel,
      recipient_type: backendRecipientType,
      status_filter: recipientType === "STATUS" ? statusFilter : undefined,
      training_filter: recipientType === "TRAINING" ? trainingFilter : undefined,
      candidate_ids: recipientType === "SELECT" ? selectedCandidateIds : undefined,
      custom_recipients: recipientType === "CUSTOM" ? customRecipientsInput : undefined,
      subject: channel !== "WHATSAPP" ? subject : undefined,
      body_template: bodyTemplate,
      attachment_url: attachmentUrl || undefined,
      attachment_name: attachmentName || undefined,
      is_scheduled: isScheduled,
      scheduled_at: isScheduled ? scheduledAt : undefined,
    });

    setIsSending(false);

    if (res.success) {
      setSentResult(res);
      const campsRes = await fetchCampaigns();
      if (campsRes.success && campsRes.data) setPastCampaigns(campsRes.data);
    } else {
      alert(res.message || "Erreur lors de l'envoi.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MESSAGERIE UNIFIÉE & RAPPELS AUTOMATIQUES</span>
          </div>
          <h2 className="text-2xl font-black text-white">Centre de Communication Groupée</h2>
          <p className="text-xs text-slate-300">
            Envoyez des WhatsApp et emails ciblés, programmes avec pièces jointes et relances automatiques à vos candidats.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Campaign Builder Form */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-brand-cyan" />
            <span>Créer & Envoyer un Message</span>
          </h3>

          {/* Quick Presets Selectors */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-300 block uppercase tracking-wider">
              Modèles Pré-enregistrés
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl)}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs font-bold text-slate-200 hover:border-brand-cyan hover:text-white transition-all flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{tmpl.title}</span>
                  <Sparkles className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-cyan shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendCampaign} className="space-y-5 pt-2 border-t border-slate-800">
            {/* Title */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Nom de la Campagne / Sujet interne *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Rappel D-2 Relance Candidats Bootcamp"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                required
              />
            </div>

            {/* Channels & Recipients */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Canal de diffusion *</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setChannel("WHATSAPP")}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 border transition-all ${
                      channel === "WHATSAPP"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel("EMAIL")}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 border transition-all ${
                      channel === "EMAIL"
                        ? "bg-blue-500/20 text-blue-400 border-blue-500"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel("BOTH")}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 border transition-all ${
                      channel === "BOTH"
                        ? "bg-purple-500/20 text-purple-400 border-purple-500"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                    }`}
                  >
                    <span>Tous les 2</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Mode de sélection des Destinataires *</label>
                <select
                  value={recipientType}
                  onChange={(e) => setRecipientType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan"
                >
                  <option value="ALL">👥 Tous les candidats inscrits ({allCandidates.length})</option>
                  <option value="STATUS">📊 Filtrer par Statut d&apos;inscription</option>
                  <option value="TRAINING">🎓 Filtrer par Formule de formation</option>
                  <option value="CUSTOM">✍️ Saisir manuellement des emails / téléphones</option>
                  <option value="SELECT">☑️ Sélectionner spécifiquement dans la liste</option>
                </select>
              </div>
            </div>

            {/* Sub-selector: STATUS */}
            {recipientType === "STATUS" && (
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Statut cible</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                >
                  <option value="NEW">Nouveaux (En attente)</option>
                  <option value="CONTACTED">Déjà Contactés</option>
                  <option value="QUALIFIED">Qualifiés</option>
                  <option value="CONFIRMED">Confirmés</option>
                </select>
              </div>
            )}

            {/* Sub-selector: TRAINING */}
            {recipientType === "TRAINING" && (
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Formule cible</label>
                <select
                  value={trainingFilter}
                  onChange={(e) => setTrainingFilter(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                >
                  <option value="MASTERCLASS">Masterclass</option>
                  <option value="BOOTCAMP">Bootcamp</option>
                  <option value="PREMIUM">Premium</option>
                </select>
              </div>
            )}

            {/* Sub-selector: CUSTOM MANUAL INPUT */}
            {recipientType === "CUSTOM" && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Saisir les adresses email (ou téléphones) des destinataires *
                </label>
                <textarea
                  rows={4}
                  value={customRecipientsInput}
                  onChange={(e) => setCustomRecipientsInput(e.target.value)}
                  placeholder="Entrez les adresses email séparées par des virgules ou des sauts de ligne :&#10;jean.dupont@gmail.com, alain.kouassi@yahoo.fr&#10;fatou.diop@company.ci"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan leading-relaxed font-mono"
                  required
                />
                <p className="text-[11px] text-slate-400">
                  {liveTargetRecipients.length} adresse(s) email détectée(s) et prêtes pour l&apos;envoi.
                </p>
              </div>
            )}

            {/* Sub-selector: SELECT CANDIDATES LIST */}
            {recipientType === "SELECT" && (
              <div className="space-y-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-brand-cyan" />
                    <span>Cocher les candidats destinataires ({selectedCandidateIds.length} sélectionné(s))</span>
                  </span>

                  <button
                    type="button"
                    onClick={handleSelectAllFilteredCandidates}
                    className="text-[11px] font-bold text-brand-cyan hover:underline self-start sm:self-auto"
                  >
                    {filteredCandidatesForSelect.every(c => selectedCandidateIds.includes(c.id))
                      ? "Tout décocher"
                      : "Tout cocher dans la liste"}
                  </button>
                </div>

                {/* Search in candidates */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                    placeholder="Filtrer par nom, email ou téléphone..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                {/* Candidates selection checkboxes */}
                <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 border border-slate-800 rounded-xl p-2 bg-slate-950">
                  {filteredCandidatesForSelect.length === 0 ? (
                    <p className="text-xs text-slate-500 italic p-2 text-center">Aucun candidat trouvé.</p>
                  ) : (
                    filteredCandidatesForSelect.map(c => {
                      const isSelected = selectedCandidateIds.includes(c.id);
                      return (
                        <label
                          key={c.id}
                          className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                            isSelected
                              ? "bg-brand-500/10 border-brand-cyan/50 text-white"
                              : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleCandidateSelect(c.id)}
                              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-brand-cyan focus:ring-0 cursor-pointer"
                            />
                            <div>
                              <span className="font-bold text-white block">{c.first_name} {c.last_name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{c.email} • {c.phone}</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {c.desired_training}
                          </span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* LIVE RECIPIENT EMAILS DISPLAY PREVIEW BOX */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    Adresses Email Destinataires ({liveTargetRecipients.length} destinataire(s))
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowRecipientListModal(!showRecipientListModal)}
                  className="text-[11px] font-bold text-blue-400 hover:text-white underline"
                >
                  {showRecipientListModal ? "Masquer le détail" : "Afficher la liste complète"}
                </button>
              </div>

              {/* Badge Preview Chips */}
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {liveTargetRecipients.length === 0 ? (
                  <span className="text-xs text-amber-400 italic flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Aucun destinataire cible. Veuillez saisir une adresse email ou sélectionner un filtre.
                  </span>
                ) : (
                  liveTargetRecipients.slice(0, 15).map((rec, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-300"
                    >
                      <Mail className="w-3 h-3 text-blue-400" />
                      <span>{rec.email || rec.name}</span>
                    </span>
                  ))
                )}
                {liveTargetRecipients.length > 15 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-lg bg-slate-800 text-xs font-bold text-slate-300">
                    +{liveTargetRecipients.length - 15} autres...
                  </span>
                )}
              </div>

              {/* Full Detailed List when expanded */}
              {showRecipientListModal && liveTargetRecipients.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 max-h-60 overflow-y-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                        <th className="pb-2">Nom / Référence</th>
                        <th className="pb-2">Adresse Email</th>
                        <th className="pb-2">Téléphone</th>
                        <th className="pb-2">Type / Formule</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {liveTargetRecipients.map((rec, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/50">
                          <td className="py-2 font-sans font-bold text-white">{rec.name}</td>
                          <td className="py-2 text-blue-400">{rec.email || "Non renseigné"}</td>
                          <td className="py-2 text-slate-400">{rec.phone || "Non renseigné"}</td>
                          <td className="py-2 font-sans text-slate-400">{rec.training || rec.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Email Subject if channel includes EMAIL */}
            {channel !== "WHATSAPP" && (
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Objet de l&apos;Email *</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Sujet lisible et attractif pour le candidat"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                  required
                />
              </div>
            )}

            {/* Message Body Template */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">Contenu du Message *</label>
                <span className="text-[10px] text-slate-400 font-mono">Variables: {"{first_name}"}, {"{last_name}"}, {"{ref}"}, {"{training}"}</span>
              </div>
              <textarea
                rows={6}
                value={bodyTemplate}
                onChange={(e) => setBodyTemplate(e.target.value)}
                placeholder="Ex: Bonjour {first_name}, votre référence d'inscription est {ref}..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan leading-relaxed font-sans"
                required
              />
            </div>

            {/* Attachment File Upload (Brochures / PDF / Documents) */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-brand-cyan" />
                  <span>Ajouter une pièce jointe (PDF, Document, Image)</span>
                </span>
                {attachmentUrl && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Fichier prêt
                  </span>
                )}
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                />
                {isUploading && <Loader2 className="w-5 h-5 text-brand-cyan animate-spin" />}
              </div>

              {attachmentUrl && (
                <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="truncate max-w-xs">{attachmentName}</span>
                  <a href={attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-brand-cyan font-bold hover:underline flex items-center gap-1">
                    <span>Voir</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Scheduling Option */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="is_scheduled"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-brand-cyan focus:ring-0 cursor-pointer"
              />
              <label htmlFor="is_scheduled" className="text-xs font-bold text-slate-300 cursor-pointer flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Programmer cet envoi à une date ultérieure (Message automatique / Rappel)</span>
              </label>
            </div>

            {isScheduled && (
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Date et heure de programmation</label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSending || liveTargetRecipients.length === 0}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-blue-600 to-brand-cyan text-white font-extrabold text-sm shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Traitement de l&apos;envoi...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>
                    {isScheduled
                      ? "⏰ Programmer le Rappel Automatique"
                      : `🚀 Envoyer à (${liveTargetRecipients.length}) Destinataire(s)`}
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Generated WhatsApp & Email Dispatcher Links Modal/Result Section */}
          {sentResult && sentResult.recipients && (
            <div className="mt-8 p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Campagne générée avec succès ({sentResult.recipients.length} destinataire(s) ciblés) !</span>
              </div>

              <p className="text-xs text-slate-300">
                Adresses email et liens de contacts générés :
              </p>

              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {sentResult.recipients.map((rec: any) => (
                  <div key={rec.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-extrabold text-white block">{rec.name}</span>
                      <span className="text-[11px] text-blue-400 font-mono">{rec.email || "Email non renseigné"}</span>
                      {rec.phone && <span className="text-[10px] text-slate-400 font-mono block">{rec.phone}</span>}
                    </div>

                    <div className="flex items-center gap-2">
                      {rec.email && (
                        <a
                          href={`mailto:${rec.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(rec.personalized_body)}`}
                          className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/40 font-bold text-xs hover:bg-blue-500 hover:text-white transition-all flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Envoyer Email</span>
                        </a>
                      )}

                      {rec.whatsapp_link && (
                        <a
                          href={rec.whatsapp_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-xs hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Campaign History Log */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>Historique des Campagnes</span>
          </h3>

          {pastCampaigns.length === 0 ? (
            <p className="text-xs text-slate-500 italic">Aucune campagne envoyée pour le moment.</p>
          ) : (
            <div className="space-y-3">
              {pastCampaigns.map((camp: any) => (
                <div key={camp.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white line-clamp-1">{camp.title}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                      camp.channel === "WHATSAPP" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                    }`}>
                      {camp.channel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{camp.body_template}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-mono">
                    <span>{camp.sent_count} destinataire(s)</span>
                    <span>{new Date(camp.created_at).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
