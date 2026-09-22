import { SITE_CONFIG } from "@/config/site";
import { PreRegistrationFormData, PreRegistrationRecord, StatsData, CandidateStatus } from "@/types/pre-registration";

export async function submitPreRegistration(data: PreRegistrationFormData): Promise<{ success: boolean; data?: PreRegistrationRecord; message?: string }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/pre-registrations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok && result.status === "success") {
      return { success: true, data: result.data };
    }
    return { success: false, message: result.message || "Erreur de soumission." };
  } catch (error) {
    console.error("API pre-registration submit error:", error);
    return { success: false, message: "Erreur réseau. Veuillez vérifier votre connexion." };
  }
}

export async function fetchPreRegistrations(params?: { search?: string; status?: string; training?: string; page?: number }): Promise<{ success: boolean; data?: PreRegistrationRecord[]; total?: number }> {
  try {
    const query = new URLSearchParams();
    if (params?.search) query.append("search", params.search);
    if (params?.status) query.append("status", params.status);
    if (params?.training) query.append("training", params.training);
    if (params?.page) query.append("page", params.page.toString());

    const res = await fetch(`${SITE_CONFIG.apiUrl}/pre-registrations?${query.toString()}`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    const result = await res.json();
    if (res.ok && result.status === "success") {
      return { success: true, data: result.data, total: result.total };
    }
    return { success: false, data: [] };
  } catch (error) {
    console.error("API pre-registrations list fetch error:", error);
    return { success: false, data: [] };
  }
}

export async function fetchStats(): Promise<{ success: boolean; stats?: StatsData }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/pre-registrations/stats`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    const result = await res.json();
    if (res.ok && result.status === "success") {
      return { success: true, stats: result.stats };
    }
    return { success: false };
  } catch (error) {
    console.error("API stats fetch error:", error);
    return { success: false };
  }
}

export async function updateCandidateStatus(id: number, status: CandidateStatus): Promise<{ success: boolean }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/pre-registrations/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    return { success: res.ok && result.status === "success" };
  } catch (error) {
    console.error("API update status error:", error);
    return { success: false };
  }
}

export async function updateCandidateNotes(id: number, admin_notes: string): Promise<{ success: boolean }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/pre-registrations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ admin_notes }),
    });

    const result = await res.json();
    return { success: res.ok && result.status === "success" };
  } catch (error) {
    console.error("API update notes error:", error);
    return { success: false };
  }
}

// ----------------------------------------------------------------------
// Messaging & Campaigns API Helpers
// ----------------------------------------------------------------------

export async function sendCampaign(payload: {
  title: string;
  channel: "WHATSAPP" | "EMAIL" | "BOTH";
  recipient_type: "ALL" | "STATUS" | "TRAINING" | "CUSTOM";
  status_filter?: string;
  training_filter?: string;
  candidate_ids?: number[];
  subject?: string;
  body_template: string;
  attachment_url?: string;
  attachment_name?: string;
  is_scheduled?: boolean;
  scheduled_at?: string;
}): Promise<{ success: boolean; campaign?: any; recipients?: any[]; message?: string }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/admin/campaigns/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok && result.success) {
      return { success: true, campaign: result.campaign, recipients: result.recipients, message: result.message };
    }
    return { success: false, message: result.message || "Impossible de créer la campagne." };
  } catch (error) {
    console.error("API send campaign error:", error);
    return { success: false, message: "Erreur réseau." };
  }
}

export async function uploadCampaignAttachment(file: File): Promise<{ success: boolean; file_url?: string; file_name?: string; message?: string }> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${SITE_CONFIG.apiUrl}/admin/campaigns/upload-attachment`, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: formData,
    });

    const result = await res.json();
    if (res.ok && result.success) {
      return { success: true, file_url: result.file_url, file_name: result.file_name };
    }
    return { success: false, message: result.message || "Échec de l'envoi du fichier." };
  } catch (error) {
    console.error("API upload attachment error:", error);
    return { success: false, message: "Erreur lors du téléversement." };
  }
}

export async function fetchCampaigns(): Promise<{ success: boolean; data?: any[] }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/admin/campaigns`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    const result = await res.json();
    return { success: res.ok && result.success, data: result.data || [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}

// ----------------------------------------------------------------------
// Surveys & Form Builder API Helpers
// ----------------------------------------------------------------------

export async function createSurvey(payload: {
  title: string;
  description?: string;
  fields: any[];
  is_active?: boolean;
}): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/admin/surveys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok && result.success) {
      return { success: true, data: result.data, message: result.message };
    }
    return { success: false, message: result.message || "Erreur lors de la création du formulaire." };
  } catch (error) {
    return { success: false, message: "Erreur réseau." };
  }
}

export async function fetchSurveys(): Promise<{ success: boolean; data?: any[] }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/admin/surveys`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    const result = await res.json();
    return { success: res.ok && result.success, data: result.data || [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function fetchSurveyByIdOrSlug(idOrSlug: string): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/surveys/${idOrSlug}`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    const result = await res.json();
    if (res.ok && result.success) {
      return { success: true, data: result.data };
    }
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: "Erreur réseau." };
  }
}

export async function submitSurveyResponse(idOrSlug: string, payload: {
  respondent_name?: string;
  respondent_email?: string;
  answers: Record<string, any>;
}): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/surveys/${idOrSlug}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return { success: res.ok && result.success, message: result.message };
  } catch (error) {
    return { success: false, message: "Erreur de soumission." };
  }
}

export async function fetchSurveyResponses(surveyId: number): Promise<{ success: boolean; survey?: any; data?: any[] }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/admin/surveys/${surveyId}/responses`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    const result = await res.json();
    return { success: res.ok && result.success, survey: result.survey, data: result.data || [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function deleteSurvey(surveyId: number): Promise<{ success: boolean }> {
  try {
    const res = await fetch(`${SITE_CONFIG.apiUrl}/admin/surveys/${surveyId}`, {
      method: "DELETE",
      headers: { "Accept": "application/json" },
    });
    const result = await res.json();
    return { success: res.ok && result.success };
  } catch (error) {
    return { success: false };
  }
}
