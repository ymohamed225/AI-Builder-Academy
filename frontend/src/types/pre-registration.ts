export type CandidateStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "WAITING_CONFIRMATION"
  | "CONFIRMED"
  | "ENROLLED"
  | "REJECTED"
  | "CANCELLED";

export type SkillLevel = "débutant" | "intermédiaire" | "avancé";

export interface PreRegistrationFormData {
  // Step 1: Personal Info
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  profession: string;
  status_category: string; // Étudiant, Entrepreneur, Salarié, Freelance, Porteur de projet, Demandeur d'emploi, Autre

  // Step 2: Computer & Tech Levels
  computer_level: SkillLevel;
  internet_level: SkillLevel;
  excel_level: SkillLevel;
  ai_level: SkillLevel;
  programming_level: SkillLevel;
  database_level: SkillLevel;
  github_level: SkillLevel;
  nocode_level: SkillLevel;

  // Step 3: AI Experience
  ai_usage_frequency: "Jamais" | "Occasionnellement" | "Régulièrement" | "Très régulièrement";
  ai_tools: string[]; // ChatGPT, Claude, Gemini, Copilot, Cursor, Lovable, Bolt, Replit, Autre
  ai_primary_use: string; // Recherche, Rédaction, Analyse, Programmation, Automatisation, Création de contenu, Je ne sais pas encore

  // Step 4: Project Idea & App Types
  has_project_idea: "Oui" | "Non" | "J'ai plusieurs idées";
  project_description: string;
  problem_description: string;
  target_users: string;
  project_objective: string; // Business, Automatisation, Projet personnel, Études, Startup, Freelance, Autre
  application_types: string[]; // Application Web, Application Mobile, SaaS, CRM, ERP, E-commerce, Dashboard, Réservation, Livraison, Outil métier, Automatisation, Autre, Je ne sais pas encore

  // Step 5: Training Offer & Availability
  desired_training: "MASTERCLASS" | "BOOTCAMP" | "PREMIUM" | "Je ne sais pas encore";
  weekly_availability: "2 à 4 heures" | "4 à 6 heures" | "6 à 10 heures" | "Plus de 10 heures";
  expected_result: string;

  // Anti-spam Honeypot (must remain empty)
  website_hp?: string;
}

export interface PreRegistrationRecord extends PreRegistrationFormData {
  id: number;
  registration_reference: string;
  status: CandidateStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface StatsData {
  total: number;
  by_status: Record<CandidateStatus, number>;
  by_training: Record<string, number>;
  by_level: {
    débutant: number;
    intermédiaire: number;
    avancé: number;
  };
  top_app_types: Array<{ type: string; count: number }>;
}
