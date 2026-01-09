# 🕶️ Optic Glass - Site E-Commerce de Lunettes de Luxe

Site e-commerce moderne pour la vente de lunettes de luxe, développé avec React + Vite (frontend) et Express.js (backend).

[![GitHub](https://img.shields.io/badge/GitHub-Sy2force%2FOpticGlass-blue)](https://github.com/Sy2force/OpticGlass)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![Render](https://img.shields.io/badge/API-Render-46E3B7)](https://render.com)

---

## 📋 Table des Matières

- [Aperçu](#aperçu)
- [Technologies](#technologies)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Configuration](#configuration)
- [Déploiement](#déploiement)
- [Structure du Projet](#structure-du-projet)
- [API](#api)
- [Tests](#tests)
- [Contributing](#contributing)

---

## 🎯 Aperçu

**Optic Glass** est une plateforme e-commerce complète dédiée aux lunettes de luxe. Le site offre une expérience utilisateur premium avec un design moderne et élégant inspiré du glassmorphism.

### Caractéristiques Principales

- 🛒 **E-Commerce Complet** : Catalogue produits, panier, checkout
- 👤 **Authentification JWT** : Inscription, connexion, profil utilisateur
- 🔐 **Espace Admin** : Dashboard, analytics, gestion produits
- 💎 **70+ Produits de Luxe** : Ray-Ban, Gucci, Prada, Dior, Tom Ford
- 🎨 **Design Premium** : Glassmorphism, animations Framer Motion
- 📱 **100% Responsive** : Mobile-first design
- ⚡ **Performance Optimisée** : Vite build, lazy loading, code splitting
- 🔍 **SEO Optimisé** : Meta tags, Open Graph, sitemap

---

## 🚀 Technologies

### Frontend
- **React 18** - Bibliothèque UI
- **Vite 5** - Build tool ultra-rapide
- **TailwindCSS** - Framework CSS utility-first
- **Framer Motion** - Animations fluides
- **React Router v6** - Routing SPA
- **Axios** - HTTP client
- **Recharts** - Graphiques analytics
- **Lucide React** - Icônes modernes

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM MongoDB
- **JWT** - Authentification
- **Helmet** - Sécurité HTTP headers
- **Morgan** - Logger HTTP
- **Bcrypt** - Hash passwords

### DevOps & Tools
- **Vercel** - Hébergement frontend
- **Render** - Hébergement backend
- **MongoDB Atlas** - Base de données cloud
- **GitHub** - Versioning
- **ESLint** - Linter JavaScript

---

## ✨ Fonctionnalités

### Pour les Visiteurs
- ✅ Navigation intuitive par catégorie (Optique / Solaire)
- ✅ Filtres avancés (marque, prix, couleur, forme)
- ✅ Recherche en temps réel
- ✅ Comparateur de produits
- ✅ Liste de favoris
- ✅ Détail produit complet avec images 3D
- ✅ Panier avec gestion des quantités
- ✅ Checkout sécurisé

### Pour les Utilisateurs Connectés
- ✅ Profil utilisateur éditable
- ✅ Historique des commandes
- ✅ Gestion des favoris synchronisée
- ✅ Adresses de livraison sauvegardées
- ✅ Wishlist persistante

### Pour les Administrateurs
- ✅ Dashboard avec statistiques
- ✅ Analytics avancés (graphiques recharts)
- ✅ Gestion des produits (CRUD)
- ✅ Gestion des commandes
- ✅ Gestion des utilisateurs
- ✅ Gestion des marques

### Pages Disponibles (19)
1. **Home** (`/`) - Page d'accueil premium
2. **Glasses** (`/glasses`) - Catalogue lunettes de vue
3. **Sunglasses** (`/sunglasses`) - Catalogue lunettes de soleil
4. **Product Detail** (`/product/:id`) - Détail produit
5. **Login** (`/login`) - Connexion
6. **Register** (`/register`) - Inscription
7. **Profile** (`/profile`) - Profil utilisateur
8. **Cart** (`/cart`) - Panier
9. **Checkout** (`/checkout`) - Tunnel d'achat
10. **Favorites** (`/favorites`) - Favoris
11. **Compare** (`/compare`) - Comparateur
12. **Brands** (`/brands`) - Liste des marques
13. **Contact** (`/contact`) - Formulaire de contact
14. **Stores** (`/stores`) - Localisation magasins
15. **FAQ** (`/faq`) - Questions fréquentes
16. **Gift Card** (`/giftcard`) - Cartes cadeaux
17. **Reviews** (`/reviews`) - Avis clients
18. **Admin Dashboard** (`/admin/dashboard`) - Tableau de bord admin
19. **Admin Analytics** (`/admin/analytics`) - Statistiques avancées

---

## 📦 Installation

### Prérequis
- Node.js 18+ et npm
- MongoDB Atlas compte (gratuit)
- Git

### 1. Cloner le Repository

```bash
git clone https://github.com/Sy2force/OpticGlass.git
cd OpticGlass
```

### 2. Installation Backend

```bash
cd backend
npm install
```

Créer `.env` dans `backend/` :

```env
NODE_ENV=development
PORT=3005
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/optic_glass?retryWrites=true&w=majority
JWT_SECRET=votre_secret_jwt_minimum_32_caracteres
FRONTEND_URL=http://localhost:3006
```

Seeding de la base de données :

```bash
npm run seed
```

Démarrer le serveur :

```bash
npm start
# ou en dev
npm run dev
```

Backend accessible sur `http://localhost:3005`

### 3. Installation Frontend

```bash
cd frontend
npm install
```

Créer `.env` dans `frontend/` :

```env
VITE_API_URL=http://localhost:3005/api
```

Démarrer le dev server :

```bash
npm run dev
```

Frontend accessible sur `http://localhost:3006`

---

## ⚙️ Configuration

### Variables d'Environnement

#### Backend (`backend/.env`)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `NODE_ENV` | Environnement d'exécution | `development` ou `production` |
| `PORT` | Port du serveur | `3005` |
| `MONGO_URI` | Connexion MongoDB | `mongodb+srv://...` |
| `JWT_SECRET` | Clé secrète JWT (32+ chars) | `abc123...` |
| `FRONTEND_URL` | URL frontend pour CORS | `http://localhost:3006` |

#### Frontend (`frontend/.env`)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `VITE_API_URL` | URL de l'API backend | `http://localhost:3005/api` |

---

## 🚀 Déploiement

Le projet est configuré pour un déploiement sur **Vercel** (frontend) et **Render** (backend).

### Déploiement Frontend sur Vercel

**Guides détaillés disponibles dans `/docs/`**

#### Étapes Rapides

1. Push le code sur GitHub
2. Aller sur [vercel.com/import](https://vercel.com/import)
3. Importer le repository **Sy2force/OpticGlass**
4. Configuration :
   - **Root Directory** : `frontend`
   - **Framework** : `Vite`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
5. Ajouter variable d'environnement :
   - `VITE_API_URL` = `https://votre-backend.onrender.com/api`
6. Deploy

**Fichiers de configuration** :
- `frontend/vercel.json` - Configuration Vercel (SPA routing, cache, headers)
- `frontend/verify-deploy.sh` - Script de vérification pré-déploiement

### Déploiement Backend sur Render

#### Étapes Rapides

1. Aller sur [dashboard.render.com](https://dashboard.render.com/)
2. **New +** → **Web Service**
3. Connecter GitHub → **Sy2force/OpticGlass**
4. Configuration :
   - **Name** : `optic-glass-backend`
   - **Root Directory** : `backend`
   - **Environment** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
5. Ajouter variables d'environnement (voir section Configuration)
6. Deploy
7. Seeder la base : `npm run seed` (via Render Shell)

### 📚 Guides Complets

Consultez `/docs/` pour les guides détaillés :
- `VERCEL_DEPLOY.md` - Guide complet Vercel
- `RENDER_DEPLOY.md` - Guide complet Render
- `DEPLOY_CHECKLIST.md` - Checklist interactive

---

## 📁 Structure du Projet

```
OpticGlass/
├── backend/                 # API Express.js
│   ├── config/             # Configuration DB
│   ├── controllers/        # Logique métier
│   ├── data/              # Données produits
│   ├── middlewares/       # Auth, erreurs, validation
│   ├── models/            # Schémas Mongoose
│   ├── routes/            # Routes API
│   ├── utils/             # Utilitaires
│   ├── .env.example       # Template variables env
│   ├── package.json
│   └── server.js          # Point d'entrée
│
├── frontend/              # Application React
│   ├── public/           # Assets statiques
│   │   ├── brands/      # 50+ logos SVG
│   │   └── favicon.svg
│   ├── src/
│   │   ├── app/         # Configuration app
│   │   │   ├── providers/  # Contexts (Auth, Cart)
│   │   │   └── routers/    # Routing
│   │   ├── entities/    # Composants entités
│   │   ├── features/    # Fonctionnalités
│   │   ├── pages/       # 19 pages
│   │   ├── shared/      # Utilitaires partagés
│   │   ├── widgets/     # Composants layout
│   │   └── main.jsx     # Point d'entrée
│   ├── .env.example
│   ├── index.html       # HTML + meta tags SEO
│   ├── package.json
│   ├── vercel.json      # Config Vercel
│   ├── vite.config.js
│   └── verify-deploy.sh # Script vérification
│
├── docs/                # Documentation déploiement
│   ├── VERCEL_DEPLOY.md
│   ├── RENDER_DEPLOY.md
│   └── DEPLOY_CHECKLIST.md
│
├── .gitignore
├── package.json         # Scripts workspace (optionnel)
└── README.md           # Ce fichier
```

---

## 🔌 API

### Endpoints Backend

Base URL : `http://localhost:3005/api` (dev) ou `https://votre-backend.onrender.com/api` (prod)

#### Authentification
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `GET /auth/me` - Profil utilisateur (protégé)

#### Produits
- `GET /products` - Liste produits (filtres, pagination, recherche)
- `GET /products/:id` - Détail produit
- `POST /products` - Créer produit (admin)
- `PUT /products/:id` - Modifier produit (admin)
- `DELETE /products/:id` - Supprimer produit (admin)

#### Favoris
- `GET /favorites` - Liste favoris (protégé)
- `POST /favorites/:productId` - Ajouter favori (protégé)
- `DELETE /favorites/:productId` - Retirer favori (protégé)

#### Panier
- `GET /cart` - Panier utilisateur (protégé)
- `POST /cart` - Ajouter au panier (protégé)
- `PUT /cart/:itemId` - Modifier quantité (protégé)
- `DELETE /cart/:itemId` - Retirer du panier (protégé)

#### Commandes
- `GET /orders` - Historique commandes (protégé)
- `POST /orders` - Créer commande (protégé)
- `GET /orders/:id` - Détail commande (protégé)

#### Marques
- `GET /brands` - Liste marques
- `GET /brands/:id` - Détail marque

#### Admin
- `GET /admin/analytics` - Statistiques (admin)
- `GET /admin/users` - Liste utilisateurs (admin)
- `GET /admin/orders` - Toutes les commandes (admin)

#### Contact
- `POST /contact` - Envoyer message
- `GET /contact` - Liste messages (admin)

---

## 🧪 Tests

### Frontend

```bash
cd frontend

# Linter
npm run lint

# Build de production
npm run build

# Preview du build
npm run preview

# Script de vérification déploiement
./verify-deploy.sh
```

### Backend

```bash
cd backend

# Tests (si configurés)
npm test

# Linter
npm run lint

# Seeding DB
npm run seed
```

---

## 🛡️ Sécurité

### Mesures Implémentées

- ✅ **JWT Authentication** - Tokens sécurisés
- ✅ **Bcrypt** - Hash passwords (10 rounds)
- ✅ **Helmet.js** - Headers HTTP sécurisés
- ✅ **Rate Limiting** - 100 req/15min par IP
- ✅ **CORS** - Origines restreintes
- ✅ **Input Sanitization** - Protection XSS
- ✅ **MongoDB Injection Protection** - Validation Mongoose
- ✅ **HTTPS** - Certificats Let's Encrypt (Vercel/Render)
- ✅ **Environment Variables** - Secrets non versionnés

---

## 📊 Performance

### Frontend Build

```
✓ 2482 modules transformed in 2.32s
dist/index.html                     0.62 kB (0.37 kB gzip)
dist/assets/index-V3f_sq18.css    112.52 kB (16.39 kB gzip)
dist/assets/index-Bc31KL2v.js   1,112.78 kB (309.33 kB gzip)
```

### Optimisations

- ⚡ Code splitting automatique (Vite)
- ⚡ Lazy loading des routes (React)
- ⚡ Assets minifiés et gzippés
- ⚡ Cache long terme (1 an pour assets)
- ⚡ Preconnect fonts Google
- ⚡ Images optimisées (CDN externe)

---

## 🤝 Contributing

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 👨‍💻 Auteur

**Sy2force**
- GitHub : [@Sy2force](https://github.com/Sy2force)
- Repository : [OpticGlass](https://github.com/Sy2force/OpticGlass)

---

## 🙏 Remerciements

- **Marques de Luxe** : Ray-Ban, Gucci, Prada, Dior, Tom Ford (logos utilisés à titre éducatif)
- **Icônes** : Lucide React
- **Fonts** : Google Fonts
- **Inspiration** : Sites e-commerce modernes

---

## 📞 Support

Pour toute question ou problème :
- Ouvrir une [Issue](https://github.com/Sy2force/OpticGlass/issues)
- Consulter la [Documentation](https://github.com/Sy2force/OpticGlass/tree/main/docs)
- Contacter via GitHub

---

**Made with ❤️ by Sy2force**

*Optic Glass - Premium Eyewear E-Commerce Platform*
