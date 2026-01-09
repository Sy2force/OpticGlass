# 🕶️ Optic Glass - E-commerce de Lunettes de Luxe

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Stack](https://img.shields.io/badge/Stack-MERN-purple)

> **Une expérience e-commerce immersive et premium pour l'achat de lunettes de luxe, alliant design glassmorphism, essayage virtuel et intelligence artificielle.**

---

## 📑 Table des Matières

- [📖 À propos](#-à-propos)
- [✨ Fonctionnalités](#-fonctionnalités)
- [📊 Statistiques du Projet](#-statistiques-du-projet)
- [🏗️ Architecture & Stack Technique](#-architecture--stack-technique)
- [📂 Structure du Projet](#-structure-du-projet)
- [🚀 Installation et Démarrage](#-installation-et-démarrage)
- [🔐 Variables d'Environnement](#-variables-denvironnement)
- [📡 Documentation API](#-documentation-api)
- [🧪 Tests](#-tests)
- [🎨 Design System & Refonte](#-design-system--refonte)
- [👥 Auteurs](#-auteurs)

---

## 📖 À propos

**Optic Glass** est une plateforme e-commerce full-stack (MERN) conçue pour offrir une expérience utilisateur haut de gamme. Le projet se distingue par son design soigné inspiré du "Glassmorphism", ses animations fluides et ses fonctionnalités avancées comme l'essayage virtuel par webcam et les recommandations personnalisées.

L'objectif est de simuler une véritable boutique de luxe en ligne, avec une gestion complète : du catalogue produits à l'administration, en passant par le panier, les favoris et le paiement sécurisé.

---

## ✨ Fonctionnalités

### 🛍️ E-commerce & Catalogue
- **Catalogue complet** : Filtrage avancé (marque, prix, forme, couleur, matériau, saison).
- **Recherche temps réel** : Barre de recherche intuitive avec debounce.
- **Détail Produit** : Galerie d'images, zoom, avis clients, produits similaires.
- **Essayage Virtuel** : Utilisation de la webcam pour tester les lunettes (Overlay AR).
- **Panier & Commande** : Gestion dynamique, codes promo (ex: `WELCOME10`), checkout en plusieurs étapes.
- **Paiement** : Simulation de paiement sécurisé.

### 👤 Espace Utilisateur
- **Authentification** : Inscription, Connexion (JWT), Mot de passe oublié.
- **Profil** : Gestion des informations personnelles et adresses.
- **Commandes** : Historique et suivi de statut (En cours, Expédié, Livré).
- **Favoris** : Liste de souhaits persistante.

### 👑 Espace Administrateur
- **Dashboard** : Vue d'ensemble des KPIs (Ventes, Utilisateurs, Commandes).
- **Gestion Produits** : CRUD complet (Ajout, Modif, Suppression).
- **Gestion Utilisateurs** : Liste, modification de rôle, bannissement.
- **Gestion Commandes** : Mise à jour des statuts de livraison.
- **Analytics** : Statistiques détaillées.

### 🌐 Contenu & Services
- **Blog / Actualités** : Articles sur les tendances.
- **Marques** : Pages dédiées par marque avec histoire et collections.
- **Contact** : Formulaire de contact fonctionnel.
- **Magasins** : Localisateur de boutiques physiques.
- **ChatBot** : Assistant virtuel intelligent pour le support.

---

## 📊 Statistiques du Projet

| Métrique | Valeur | Détails |
|----------|--------|---------|
| **Pages Frontend** | 28 | Publiques, Privées, Admin |
| **Composants React** | 47+ | UI, Layout, Métier |
| **Routes API** | 10 | RESTful endpoints |
| **Modèles DB** | 5 | User, Product, Order, Brand, Contact |
| **Produits** | 70+ | Lunettes de vue, soleil, sport |
| **Marques** | 30+ | Ray-Ban, Gucci, Prada, Dior... |
| **Tests** | 160 | 86 E2E (Playwright) + 74 Unit (Jest) |

---

## 🏗️ Architecture & Stack Technique

Le projet repose sur une architecture **MERN** avec une séparation claire entre le client et le serveur.

### 🎨 Frontend (Client)
- **Framework** : React 18
- **Build Tool** : Vite 5
- **Langage** : JavaScript (ES6+)
- **Styling** : TailwindCSS 3, Glassmorphism UI
- **Animations** : Framer Motion
- **Routing** : React Router v6
- **État Global** : React Context API (Auth, Cart, Favorites, Theme)
- **HTTP Client** : Axios
- **Icônes** : Lucide React

### ⚙️ Backend (Serveur)
- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : MongoDB (via Mongoose ODM)
- **Authentification** : JWT (JSON Web Tokens)
- **Sécurité** : Bcrypt (hashing), Helmet, CORS, Rate Limiting, Input Sanitization
- **Validation** : Express-validator / Joi

### 🛠️ DevOps & Outils
- **Tests E2E** : Playwright
- **Tests Unitaires** : Jest
- **Versionning** : Git
- **Qualité de code** : ESLint, Prettier

---

## 📂 Structure du Projet

```bash
Optic-Glass/
├── frontend/                # Application React (Vite)
│   ├── src/
│   │   ├── components/      # Composants UI réutilisables (Button, Card, etc.)
│   │   ├── context/         # Contextes (Auth, Cart, Favorites, Theme)
│   │   ├── hooks/           # Hooks personnalisés (useAuth, useCart...)
│   │   ├── pages/           # Pages de l'application (Home, GlassDetail...)
│   │   ├── services/        # Services API (authService, productService...)
│   │   └── utils/           # Utilitaires
│   └── public/              # Assets statiques
│
├── backend/                 # API Node.js (Express)
│   ├── config/              # Config DB et env
│   ├── controllers/         # Logique métier
│   ├── middlewares/         # Auth, Validation, Error handling
│   ├── models/              # Schémas Mongoose (User, Product, Order...)
│   ├── routes/              # Définition des endpoints API
│   └── utils/               # Scripts (Seeding, Helpers)
│
└── README.md                # Documentation unique
```

---

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v18+)
- MongoDB (Local ou Atlas)
- npm ou yarn

### 1. Installation des dépendances

À la racine du projet :

```bash
# Installation Backend
cd backend
npm install

# Installation Frontend
cd ../frontend
npm install
```

### 2. Configuration

Créez les fichiers `.env` dans les dossiers `backend` et `frontend` (voir section Variables d'Environnement).

### 3. Initialisation de la Base de Données

Pour remplir la base de données avec des produits, marques et utilisateurs de test :

```bash
cd backend
npm run seed
# Ou pour un seed complet :
node utils/comprehensiveSeed.js
```

### 4. Lancement

**Backend (Port 3005)**
```bash
cd backend
npm run dev
```

**Frontend (Port 3006)**
```bash
cd frontend
npm run dev
```

L'application sera accessible sur `http://localhost:3006`.

### Comptes de Démonstration

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| **Admin** | admin@opticglass.com | admin123 |
| **User** | user@test.com | user123 |

---

## 🔐 Variables d'Environnement

### Backend (`backend/.env`)

```env
PORT=3005
MONGO_URI=mongodb://localhost:27017/optic_glass
JWT_SECRET=votre_secret_jwt_tres_securise
NODE_ENV=development
CLIENT_URL=http://localhost:3006
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3005/api
```

---

## 📡 Documentation API

Quelques endpoints principaux disponibles :

| Méthode | Endpoint | Description | Accès |
|---------|----------|-------------|-------|
| **Auth** | | | |
| POST | `/api/auth/login` | Connexion utilisateur | Public |
| POST | `/api/auth/register` | Inscription | Public |
| GET | `/api/auth/me` | Profil utilisateur | Privé |
| **Produits** | | | |
| GET | `/api/products` | Liste produits (filtres, pagination) | Public |
| GET | `/api/products/:id` | Détail produit | Public |
| POST | `/api/products` | Créer produit | Admin |
| **Commandes** | | | |
| POST | `/api/orders` | Créer une commande | Privé |
| GET | `/api/orders/my-orders` | Mes commandes | Privé |

---

## 🧪 Tests

Le projet inclut une suite de tests complète (160 tests au total).

### Backend (Unitaires & Intégration)
Utilise **Jest** et Supertest.

```bash
cd backend
npm test
```

### Frontend (End-to-End)
Utilise **Playwright**.

```bash
cd frontend
npm test
# Ou pour l'interface visuelle
npm run test:ui
```

---

## 🎨 Design System & Refonte

Une refonte complète du Design System a été initiée pour aligner l'interface sur les standards "Luxe" & "Apple-style".

### Progression Refonte
- **Phase 1 (Design System)** : ✅ 100% Terminé
  - Tailwind Config Premium (Couleurs luxe, Typographie, Ombres)
  - Animations personnalisées
- **Phase 2 (Composants UI)** : 🔄 En cours
  - Composants réalisés : Button.jsx
  - À faire : Input, Card, Modal, Toast, Badge, Dropdown...

### Identité Visuelle
- **Couleurs** : Rouge Optic Glass (`#C4151C`), Noir Profond, Or Accent.
- **Effets** : Glassmorphism (`backdrop-blur-xl bg-white/10`), Dégradés subtils.
- **Typographie** : Playfair Display (Titres), Inter (Corps).

---

## 👥 Auteurs

Projet réalisé par **Optic Glass Team**.

- **Rôle** : Full Stack Developer
- **Stack** : MERN
- **Année** : 2026

---

*Fait avec ❤️ et beaucoup de ☕ pour une vision plus claire.*
