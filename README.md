# 🚀 AI Builder Academy CI

Plateforme web d'apprentissage et de pré-inscription pour **AI Builder Academy CI** — La première académie pratique de création d'applications avec l'IA en Côte d'Ivoire.

## 🛠️ Stack Technique

- **Frontend** : Next.js 14 (App Router), React, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend API** : Node.js, Express.js, Multer (gestion des pièces jointes).
- **Base de données** : PostgreSQL (Supabase / Render / Aiven) ou MySQL local (XAMPP).

## 📁 Structure du Projet

```
IA_Academy/
├── frontend/             # Application Next.js 14 (Port 3000)
├── backend-nodejs/       # API REST Node.js & Express (Port 8000)
│   ├── src/
│   │   ├── config/       # Connexion BDD PostgreSQL / MySQL
│   │   ├── controllers/  # Logique métier (Candidats, Sondages, Campagnes, Leads)
│   │   ├── routes/       # Routes API REST Express
│   │   └── server.js     # Serveur HTTP Express
│   └── database/         # Schemas SQL (init_pgsql.sql, init_mysql.sql)
└── GUIDE_DEPLOIEMENT.md  # Guide pas à pas (Vercel, Render, Supabase)
```

## 🚀 Démarrage Rapide

### 1. Démarrer le Backend Node.js

```bash
cd backend-nodejs
npm install
npm start
```
> Le serveur API écoute sur `http://localhost:8000/api`

### 2. Démarrer le Frontend Next.js

```bash
cd frontend
npm install
npm run dev
```
> L'application frontend s'ouvre sur `http://localhost:3000`

## 📖 Déploiement Cloud
Pour héberger le projet gratuitement sur Vercel, Render et Supabase, suivez le guide : [GUIDE_DEPLOIEMENT.md](GUIDE_DEPLOIEMENT.md).
