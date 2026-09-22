# 🚀 Guide Pratique de Déploiement Cloud

Ce document décrit étape par étape la procédure pour publier et héberger en production la plateforme **AI Builder Academy CI** (Frontend Next.js, API Backend et Base de données PostgreSQL).

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
│                   BACKEND (API PHP Engine)                      │
│               Hébergé gratuitement sur Render.com               │
│         URL : https://ia-academy-api.onrender.com               │
└────────────────────────────────┬────────────────────────────────┘
                                 │ Connexion SSL (PDO PostgreSQL)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                 BASE DE DONNÉES (PostgreSQL)                    │
│               Hébergé gratuitement sur Supabase.com             │
│        Tables : pre_registrations, leads, surveys...            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ Étape 1 : Publier le projet sur GitHub

Le dépôt Git local a été initialisé. Pour le pousser sur votre compte GitHub :

1. Connectez-vous sur **[GitHub](https://github.com)**.
2. Cliquez sur **New Repository** (Nouveau dépôt).
3. Nommez le dépôt : `ia-builder-academy`.
4. *Important :* Ne cochez ni "Add README", ni ".gitignore" (le projet contient déjà tous les fichiers requis).
5. Dans votre terminal, à la racine du projet (`IA_Academy`), exécutez les deux commandes suivantes :

```bash
git remote add origin https://github.com/VOTRE_IDENTIFIANT_GITHUB/ia-builder-academy.git
git push -u origin main
```

---

## 2️⃣ Étape 2 : Créer la Base de Données sur Supabase (PostgreSQL)

1. Rendez-vous sur **[Supabase.com](https://supabase.com)** et créez un compte gratuit.
2. Cliquez sur **New Project** et choisissez un nom (ex: `ia-academy-db`).
3. Définissez un **mot de passe sécurisé** pour la base de données et conservez-le précieusement.
4. Sélectionnez la région la plus proche (ex: *Frankfurt* ou *Paris*).
5. Une fois le projet initialisé :
   - Allez dans le menu latéral gauche **SQL Editor**.
   - Ouvrez le fichier local `backend-laravel/database/init_pgsql.sql`.
   - Copiez et collez l'intégralité du script SQL dans l'éditeur de Supabase.
   - Cliquez sur **Run** (Exécuter).
6. Allez dans **Project Settings > Database** pour récupérer vos clés de connexion :
   - **Host** : `db.xxxxxxxxxxxx.supabase.co`
   - **Port** : `5432`
   - **Database** : `postgres`
   - **User** : `postgres`
   - **Password** : *(Votre mot de passe défini)*

---

## 3️⃣ Étape 3 : Héberger l'API Backend sur Render.com

1. Rendez-vous sur **[Render.com](https://render.com)**.
2. Cliquez sur **New + > Web Service**.
3. Connectez votre compte GitHub et sélectionnez le dépôt `ia-builder-academy`.
4. Remplissez les paramètres du service :
   - **Name** : `ia-academy-api`
   - **Root Directory** : `backend-laravel`
   - **Environment** : `PHP`
   - **Start Command** : `php -S 0.0.0.0:$PORT -t public public/index.php`
5. Dans la section **Environment Variables** (Variables d'environnement), ajoutez les paires clé/valeur suivantes :

| Clé | Valeur |
| --- | --- |
| `DB_CONNECTION` | `pgsql` |
| `DB_HOST` | `db.xxxxxxxxxxxx.supabase.co` |
| `DB_PORT` | `5432` |
| `DB_DATABASE` | `postgres` |
| `DB_USERNAME` | `postgres` |
| `DB_PASSWORD` | *(Mot de passe Supabase)* |

6. Cliquez sur **Create Web Service**.
7. Une fois le déploiement terminé, copiez l'URL de votre API générée (ex: `https://ia-academy-api.onrender.com`).

---

## 4️⃣ Étape 4 : Héberger le Frontend Next.js sur Vercel

1. Rendez-vous sur **[Vercel.com](https://vercel.com)**.
2. Cliquez sur **Add New... > Project**.
3. Importez votre dépôt GitHub `ia-builder-academy`.
4. Dans les paramètres de configuration :
   - **Root Directory** : Cliquez sur *Edit* et sélectionnez le dossier `frontend`.
   - **Framework Preset** : `Next.js` (détecté automatiquement).
5. Dans la section **Environment Variables**, ajoutez :
   - **Clé** : `NEXT_PUBLIC_API_BASE_URL`
   - **Valeur** : `https://ia-academy-api.onrender.com/api` *(Remplacez par votre URL Render créée à l'étape 3)*
6. Cliquez sur **Deploy**.

---

## 🔍 Étape 5 : Vérification et Test de Production

Une fois le déploiement sur Vercel achevé :
1. Accédez à l'URL publique de votre site (ex: `https://ia-builder-academy.vercel.app`).
2. Réalisez un test complet du formulaire de pré-inscription.
3. Rendez-vous sur le panneau d'administration : `https://ia-builder-academy.vercel.app/admin`.
4. Vérifiez que la candidature s'affiche instantanément dans le tableau de bord administration et qu'elle est enregistrée dans votre base de données Supabase.
