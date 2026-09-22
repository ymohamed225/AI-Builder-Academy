# 🚀 AI BUILDER ACADEMY CI - Landing Page & Backend API

> « *De l’idée à l’application en production avec l’IA.* » 🇨🇮

Plateforme web de conversion marketing, landing page responsive premium et API Backend Laravel pour la formation **AI BUILDER ACADEMY CI**.

---

## 🏗️ Architecture du Projet

```text
IA_Academy/
├── frontend/                  # App Next.js 14+ / TypeScript / Tailwind CSS / Framer Motion
│   ├── src/app/               # App Router (page.tsx, layout.tsx, globals.css)
│   ├── src/components/        # 14 Composants SaaS UI Glassmorphism (avec HeroDashboard 3D/animé)
│   ├── src/config/site.ts     # Configuration centralisée (WhatsApp, Curriculums, Tarifs)
│   └── src/lib/               # Utilitaires WhatsApp & Tracking Analytics
│
└── backend-laravel/           # Moteur API PHP Laravel 11
    ├── app/Http/Controllers/  # LeadController
    ├── app/Models/            # Lead & Registration
    ├── database/migrations/   # Tables SQL (leads, registrations)
    └── routes/api.php         # Endpoints REST API (/api/leads/track, /api/health)
```

---

## 🎯 Conversion Funnel & WhatsApp Integration

```text
AFFICHE / QR CODE
   ↓
LANDING PAGE (http://localhost:3000)
   ↓
CLIC CTA WHATSAPP (Message prérempli spécifique par offre)
   ↓
ÉCHANGE WHATSAPP & ORIENTATION
   ↓
VALIDATION & INSCRIPTION
   ↓
ONBOARDING & ACCÈS FORMATION
```

---

## ⚡ Démarrage Rapide

### 1. Frontend Next.js
```bash
cd frontend
npm install
npm run dev
```
La landing page est accessible sur `http://localhost:3000`.

### 2. Backend Laravel
```bash
cd backend-laravel
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
L'API REST fonctionnera sur `http://localhost:8000/api`.

---

## ⚙️ Personnalisation des Liens & Numéros

Toutes les variables sont centralisées et modifiables dans `frontend/src/config/site.ts` ou via les variables d'environnement `.env.local` :

- **Numéro WhatsApp** : `NEXT_PUBLIC_WHATSAPP_NUMBER="2250700000000"`

---

## 📊 Évènements Analytics Préparés

- `page_view`
- `click_whatsapp`
- `click_program`
- `click_masterclass`
- `click_bootcamp`
- `click_premium`
