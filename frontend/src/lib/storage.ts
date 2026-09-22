import { PreRegistrationFormData } from "@/types/pre-registration";

const STORAGE_KEY = "aibuilder_preregistration_draft";

export const initialFormData: PreRegistrationFormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  profession: "",
  status_category: "Entrepreneur",

  computer_level: "débutant",
  internet_level: "intermédiaire",
  excel_level: "débutant",
  ai_level: "débutant",
  programming_level: "débutant",
  database_level: "débutant",
  github_level: "débutant",
  nocode_level: "débutant",

  ai_usage_frequency: "Occasionnellement",
  ai_tools: ["ChatGPT"],
  ai_primary_use: "Recherche",

  has_project_idea: "Oui",
  project_description: "",
  problem_description: "",
  target_users: "",
  project_objective: "Business",
  application_types: ["Application Web"],

  desired_training: "BOOTCAMP",
  weekly_availability: "4 à 6 heures",
  expected_result: "",
  website_hp: "",
};

export function saveFormDraft(data: PreRegistrationFormData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Erreur de sauvegarde locale:", err);
  }
}

export function loadFormDraft(): PreRegistrationFormData {
  if (typeof window === "undefined") return initialFormData;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...initialFormData, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.error("Erreur de chargement de la sauvegarde locale:", err);
  }
  return initialFormData;
}

export function clearFormDraft(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Erreur d'effacement du brouillon local:", err);
  }
}
