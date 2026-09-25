export interface Offer {
  id: string;
  name: string;
  subtitle: string;
  originalPrice: string;
  launchPrice: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  whatsappMessage: string;
}

export interface ProjectCard {
  icon: string;
  title: string;
  description: string;
  badge: string;
  imageUrl: string;
}

export interface ProgramWeek {
  weekNumber: number;
  title: string;
  subtitle: string;
  topics: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const SITE_CONFIG = {
  name: "AI BUILDER ACADEMY CI",
  slogan: "De l’idée à l’application en production avec l’IA.",
  tagline: "APPRENDRE • CRÉER • DÉPLOYER",
  country: "Côte d'Ivoire 🇨🇮",
  
  // Configuration Réseau & Funnel (WhatsApp direct)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2250700000000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",

  // SEO & OpenGraph
  seo: {
    title: "AI Builder Academy CI | Crée ton application avec l'IA",
    description: "De l'idée à la mise en production, apprends à concevoir, développer, tester et déployer des applications modernes grâce à l'intelligence artificielle et au vibe coding.",
    keywords: [
      "AI Builder Academy Côte d'Ivoire",
      "Formation IA Côte d'Ivoire",
      "Vibe Coding Côte d'Ivoire",
      "Formation développement avec IA",
      "Créer application avec IA",
      "Formation développement web Abidjan",
      "Formation intelligence artificielle Abidjan",
    ],
    url: "https://aibuilderacademy.ci",
  },

  // Badges Hero
  heroBadges: [
    "WEB",
    "MOBILE",
    "SAAS",
    "ERP",
    "CRM",
    "OUTILS MÉTIERS",
  ],

  // WhatsApp Default Messages
  whatsappMessages: {
    hero: "Bonjour, je suis intéressé(e) par la formation AI Builder Academy CI. Je voudrais avoir plus d'informations sur les prochaines sessions.",
    masterclass: "Bonjour, je souhaite m'inscrire à la Masterclass AI Builder Academy CI (10 000 FCFA). Pouvez-vous me guider pour l'inscription ?",
    bootcamp: "Bonjour, je souhaite rejoindre le Bootcamp AI Builder Academy CI (40 000 FCFA). Je suis prêt(e) à commencer !",
    premium: "Bonjour, je suis intéressé(e) par la formule PREMIUM AI Builder Academy CI (100 000 FCFA) avec accompagnement individuel. Pouvez-vous m'en dire plus ?",
    general: "Bonjour, j'ai une question concernant la formation AI Builder Academy CI avant de m'inscrire.",
    finalCTA: "Bonjour, je souhaite rejoindre AI Builder Academy CI. Je suis intéressé(e) par la formation.",
  },

  // Methodologie IBTL (4 étapes)
  ibtlSteps: [
    {
      step: "01",
      code: "IDEA",
      title: "Idée & Conduite de Projet",
      description: "Comprendre le problème, identifier les utilisateurs cibles et définir le périmètre du MVP.",
      icon: "Lightbulb",
    },
    {
      step: "02",
      code: "BUILD",
      title: "Construction Vibe Coding",
      description: "Concevoir puis développer l'application avec l'IA et le prompt engineering avancé.",
      icon: "Cpu",
    },
    {
      step: "03",
      code: "TEST",
      title: "Tests & QA Sécurité",
      description: "Tester les fonctionnalités, corriger les erreurs et vérifier la gestion des permissions.",
      icon: "FlaskConical",
    },
    {
      step: "04",
      code: "LAUNCH",
      title: "Mise en Production",
      description: "Déployer l'application et la rendre fonctionnelle et accessible en ligne.",
      icon: "Rocket",
    },
  ],

  // 17 Compétences de la section "Ce que tu vas apprendre"
  skills: [
    "Transformer une idée en produit numérique",
    "Cahier des charges simplifié",
    "User stories",
    "UX/UI",
    "Architecture d'application",
    "Base de données",
    "API",
    "Frontend",
    "Backend",
    "IA & Vibe Coding",
    "Authentification",
    "Gestion des rôles",
    "Tests & QA",
    "Sécurité de base",
    "Git & GitHub",
    "Déploiement",
    "Maintenance",
  ],

  // Exemples de projets possibles avec vraies images attractives
  projects: [
    {
      icon: "Utensils",
      title: "Application de gestion de restaurant",
      description: "Gestion des commandes, menus dynamiques, tables et statistiques des ventes.",
      badge: "Restauration",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
    },
    {
      icon: "Home",
      title: "Plateforme immobilière",
      description: "Catalogue de biens, recherche filtrée, demandes de visites et messagerie.",
      badge: "Immobilier",
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
    },
    {
      icon: "Package",
      title: "Mini-ERP commercial",
      description: "Gestion de stock, suivi des factures, clients et bons de commande.",
      badge: "Commerce",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    },
    {
      icon: "Users",
      title: "CRM entreprise",
      description: "Pipeline de vente, suivi des prospects et historique des interactions clients.",
      badge: "Gestion Client",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    },
    {
      icon: "Calendar",
      title: "Application de réservation",
      description: "Prise de rendez-vous en ligne, gestion d'agenda et rappels automatiques.",
      badge: "Services",
      imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80",
    },
    {
      icon: "Truck",
      title: "Application de livraison",
      description: "Suivi des livreurs, calcul des trajets et gestion des colis.",
      badge: "Logistique",
      imageUrl: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=600&auto=format&fit=crop&q=80",
    },
    {
      icon: "Hotel",
      title: "Solution de gestion hôtelière",
      description: "Réservation de chambres, planning de ménage et facturation automatique.",
      badge: "Hôtellerie",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
    },
    {
      icon: "Briefcase",
      title: "SaaS métier",
      description: "Outil sur-mesure pour automatiser les tâches spécifiques d'un secteur.",
      badge: "Business SaaS",
      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80",
    },
  ] as ProjectCard[],

  // Programme 4 semaines
  curriculum: [
    {
      weekNumber: 1,
      title: "De l'idée au produit",
      subtitle: "Cadrage, prototypage & architecture de ton produit",
      topics: [
        "Problem & User (Définir le besoin réel)",
        "Spécification du MVP (Minimum Viable Product)",
        "Rédaction des User Stories & cahier des charges",
        "Principes UX/UI pour interfaces modernes",
        "Architecture d'application & modèles de données",
      ],
    },
    {
      weekNumber: 2,
      title: "Construire avec l'IA",
      subtitle: "Vibe coding, Frontend & Interface dynamique",
      topics: [
        "Fondamentaux du Vibe Coding & Prompt Engineering",
        "Conception du Frontend & Composants",
        "Systèmes de Navigation & Routing",
        "Formulaires interactifs & validation de données",
        "Tableaux de bord (Dashboards) & visualisations",
      ],
    },
    {
      weekNumber: 3,
      title: "Backend & Données",
      subtitle: "Bases de données, API & Sécurité des accès",
      topics: [
        "Modélisation de Base de données (Relations & Tables)",
        "Création d'API et intégrations des données",
        "Opérations CRUD (Create, Read, Update, Delete)",
        "Authentification (Login, Register, Passwords)",
        "Gestion fine des Rôles & Permissions utilisateurs",
      ],
    },
    {
      weekNumber: 4,
      title: "QA & Production",
      subtitle: "Tests, Sécurité, Git & Déploiement en ligne",
      topics: [
        "Stratégies de Tests & Debugging assisté par IA",
        "Bonnes pratiques de Sécurité de base",
        "Versionning du code avec Git & GitHub",
        "Déploiement en ligne (Vercel / Netlify / VPS)",
        "Mise en production & maintenance continue",
      ],
    },
  ] as ProgramWeek[],

  // Offres & Tarifs
  offers: [
    {
      id: "masterclass",
      name: "MASTERCLASS",
      subtitle: "Découvrir le Vibe Coding",
      originalPrice: "50 000 FCFA",
      launchPrice: "10 000 FCFA",
      badge: "Formule Découverte",
      isPopular: false,
      features: [
        "Introduction au vibe coding & IA",
        "Méthode IDEA → BUILD → TEST → LAUNCH",
        "Démonstration complète en direct",
        "Création d'une première petite application",
        "Découverte des étapes du déploiement",
      ],
      ctaText: "Découvrir la Masterclass",
      whatsappMessage: "Bonjour, je souhaite m'inscrire à la Masterclass AI Builder Academy CI (10 000 FCFA).",
    },
    {
      id: "bootcamp",
      name: "BOOTCAMP",
      subtitle: "Construire ton application complète",
      originalPrice: "100 000 FCFA",
      launchPrice: "40 000 FCFA",
      badge: "⭐ FORMULE RECOMMANDÉE",
      isPopular: true,
      features: [
        "4 semaines de formation intensive",
        "8 sessions live interactives (16h)",
        "Exercices pratiques après chaque session",
        "Développement de ton propre projet personnel",
        "Accès à la communauté privée des élèves",
        "Ressources pédagogiques & modèles de prompts",
        "Accompagnement collectif par les formateurs",
        "Revue et validation de ton Projet Final",
      ],
      ctaText: "Je veux rejoindre le Bootcamp",
      whatsappMessage: "Bonjour, je souhaite rejoindre le Bootcamp AI Builder Academy CI (40 000 FCFA).",
    },
    {
      id: "premium",
      name: "PREMIUM",
      subtitle: "Accompagnement sur-mesure",
      originalPrice: "250 000 FCFA",
      launchPrice: "100 000 FCFA",
      badge: "Suivi Privé",
      isPopular: false,
      features: [
        "Tout le contenu du Bootcamp inclus",
        "Accompagnement individuel 1-on-1 sur ton projet",
        "4 séances individuelles privées avec un expert",
        "Revue complète de l'architecture de ton projet",
        "Session dédiée au Debugging & Résolution de bugs",
        "Support prioritaire Backend, API & Base de données",
        "Revue de Sécurité (QA) avant lancement",
        "Assistance directe lors du déploiement final",
        "Conseils personnalisés de mise sur le marché",
      ],
      ctaText: "Demander la formule Premium",
      whatsappMessage: "Bonjour, je suis intéressé(e) par la formule PREMIUM AI Builder Academy CI (100 000 FCFA).",
    },
  ] as Offer[],

  // Section "Pour qui ?"
  targetAudience: [
    { title: "Entrepreneurs", desc: "Qui veulent valider et lancer leur produit rapidement sans dev externe." },
    { title: "Étudiants", desc: "Désireux d'acquérir une compétence recherchée et de bâtir un portfolio fort." },
    { title: "Freelances", desc: "Qui souhaitent ajouter la création d'applications à leurs services." },
    { title: "Porteurs de projets", desc: "Qui possèdent une idée précise et veulent créer leur MVP eux-mêmes." },
    { title: "Community managers", desc: "Désireux de concevoir des outils internes ou d'automatisation." },
    { title: "Designers", desc: "Qui veulent donner vie à leurs maquettes UX/UI en applications fonctionnelles." },
    { title: "Professionnels", desc: "Souhaitant automatiser les tâches de leur quotidien en entreprise." },
    { title: "Chefs de projet", desc: "Qui veulent mieux piloter les projets digitaux et comprendre la technique." },
    { title: "PME", desc: "Cherchant à digitaliser leurs processus métier sans budget exorbitant." },
    { title: "Toute personne motivée", desc: "Souhaitant concrétiser une idée en produit numérique concret." },
  ],

  // 6 étapes du fonctionnement
  howItWorksSteps: [
    { step: 1, title: "Pré-inscription 100% Gratuite", desc: "Remplis le formulaire en 2 minutes pour soumettre ton profil et ton projet (0 FCFA)." },
    { step: 2, title: "Analyse de Profil", desc: "Notre équipe pédagogique étudie ton niveau, ton projet et l'offre la plus adaptée." },
    { step: 3, title: "Confirmation WhatsApp", desc: "Nous te recontactons sur WhatsApp avec ta référence d'inscription pour valider ton admission." },
    { step: 4, title: "Validation de ta Formule", desc: "Nous finalisons ensemble le choix de ta formule (Masterclass, Bootcamp ou Premium)." },
    { step: 5, title: "Onboarding & Accès Communauté", desc: "Tu intègres la promotion et reçois tes identifiants ainsi que l'accès aux ressources." },
    { step: 6, title: "Démarre la formation !", desc: "Tu commences à construire ton application pas à pas avec l'IA et le vibe coding." },
  ],

  // FAQ
  faq: [
    {
      question: "Dois-je savoir coder ?",
      answer: "Non. La formation est conçue pour apprendre à utiliser l'IA comme assistant de développement. Des notions de base en informatique sont utiles mais aucun niveau avancé en programmation n'est obligatoire.",
    },
    {
      question: "Est-ce que l'outil IA est inclus ?",
      answer: "Non. Chaque participant utilise son propre compte. Prévoir environ 3 000 FCFA pour l'abonnement à l'outil utilisé pendant la formation (chaque participant reste ainsi propriétaire absolu de ses comptes et crédits).",
    },
    {
      question: "Est-ce une formation uniquement théorique ?",
      answer: "Non. La méthode repose principalement sur la pratique : 20% théorie et 80% pratique tout au long du cursus.",
    },
    {
      question: "Est-ce que je vais créer une vraie application ?",
      answer: "Oui. Tu travailleras sur un projet concret sous forme de MVP fonctionnel et tu apprendras à le rendre accessible en ligne.",
    },
    {
      question: "La formation me permet-elle de lancer mon propre projet ?",
      answer: "Oui, particulièrement dans les formules Bootcamp et Premium où tu es guidé étape par étape pour concrétiser ton projet personnel.",
    },
    {
      question: "Comment s'inscrire ?",
      answer: "Clique sur 'Faire ma pré-inscription' pour remplir notre formulaire 100% gratuit (0 FCFA). Notre équipe analyse ton profil sous 24h et te recontacte sur WhatsApp avec ta référence d'inscription.",
    },
  ] as FAQItem[],
};
