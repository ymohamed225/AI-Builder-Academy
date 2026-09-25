# 🚀 Guide Pratique de Déploiement Cloud (Node.js Backend)

Ce document décrit étape par étape la procédure pour publier et héberger en production la plateforme **AI Builder Academy CI** (Frontend Next.js, API Backend Node.js / Express et Base de données PostgreSQL Supabase).

---

## 🏗️ Architecture Globale en Production

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 14)                        │
│                 Hébergé gratuitement sur Vercel                 │
│         URL : https://ia-builder-academy.vercel.app             │
└────────────────────────────────┬────────────────────────────────┘
                                 │ Requêtes API (REST / JSON)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND API (Node.js / Express.js)                 │
│               Hébergé gratuitement sur Render.com               │
│         URL : https://ia-academy-api.onrender.com               │
└────────────────────────────────┬────────────────────────────────┘
                                 │ Connexion SSL (PostgreSQL Pool)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                 BASE DE DONNÉES (PostgreSQL)                    │
│               Hébergé gratuitement sur Supabase.com             │
│        Tables : pre_registrations, leads, surveys...            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ Étape 1 : Publier le projet sur GitHub

1. Connectez-vous sur **[GitHub](https://github.com)**.
2. Assurez-vous d'avoir poussé l'ensemble des branches et fichiers de `backend-nodejs`.
3. Dans votre terminal à la racine du projet (`IA_Academy`) :

```bash
git add .
git commit -m "Migration backend vers Node.js / Express.js"
git push -u origin main
```

---

## 2️⃣ Étape 2 : Créer la Base de Données sur Supabase (PostgreSQL)

1. Rendez-vous sur **[Supabase.com](https://supabase.com)** et créez un projet (ex: `ia-academy-db`).
2. Dans **SQL Editor**, exécutez le fichier SQL `backend-nodejs/database/init_pgsql.sql`.
3. Récupérez vos accès dans **Project Settings > Database** :
   - **Host** : `db.xxxxxxxxxxxx.supabase.co`
   - **Port** : `5432`
   - **Database** : `postgres`
   - **User** : `postgres`
   - **Password** : *(Votre mot de passe)*

---

## 3️⃣ Étape 3 : Héberger l'API Backend Node.js sur Render.com

1. Sur **[Render.com](https://render.com)**, créez un **New Web Service**.
2. Connectez le dépôt GitHub `AI-Builder-Academy`.
3. Remplissez les paramètres :
   - **Name** : `ia-academy-api`
   - **Root Directory** : `backend-nodejs`
   - **Environment** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
4. Dans **Environment Variables**, configurez :

| Clé | Valeur |
| --- | --- |
| `NODE_ENV` | `production` |
| `PORT` | `8000` |
| `DB_CONNECTION` | `pgsql` |
| `DB_HOST` | `db.xxxxxxxxxxxx.supabase.co` |
| `DB_PORT` | `5432` |
| `DB_DATABASE` | `postgres` |
| `DB_USERNAME` | `postgres` |
| `DB_PASSWORD` | *(Mot de passe Supabase)* |

5. Cliquez sur **Create Web Service**. URL générée : `https://ia-academy-api.onrender.com`.

---

## 4️⃣ Étape 4 : Héberger le Frontend Next.js sur Vercel

1. Connectez-vous sur **[Vercel.com](https://vercel.com)** avec votre compte GitHub.
2. Cliquez sur le bouton **"Add New..."** > **"Project"**.
3. Importez le dépôt GitHub `ymohamed225/AI-Builder-Academy`.
4. Dans la configuration du projet (**Configure Project**) :
   - **Framework Preset** : `Next.js` (détecté automatiquement).
   - **Root Directory** : Cliquez sur *Edit* et sélectionnez le dossier `frontend`.
   - **Build and Output Settings** : Conservez les valeurs par défaut (`npm run build`).
5. Dans la section **Environment Variables**, ajoutez les variables d'environnement suivantes :

| Nom de la variable | Valeur de production | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `https://ia-academy-api.onrender.com/api` | URL de votre backend Express sur Render |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `2250700000000` | Numéro WhatsApp officiel pour les inscriptions |

6. Cliquez sur **Deploy**. Vercel va compiler l'application Next.js et vous fournir un lien de production (ex: `https://ai-builder-academy-ci.vercel.app`).
7. Rendez-vous sur votre dashboard **Render.com** (Backend) et assurez-vous de mettre à jour la variable `CORS_ORIGIN` avec l'URL Vercel générée (`https://ai-builder-academy-ci.vercel.app`) afin d'autoriser les requêtes cross-origin.

