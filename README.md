# 🕶️ Optic Glass - E-commerce de Lunettes de Luxe

![Status](https://img.shields.io/badge/Status-Architecture%20Complete-success)
![Version](https://img.shields.io/badge/Version-1.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 Description

**Optic Glass** est une plateforme e-commerce haut de gamme dédiée aux lunettes de luxe. Le site propose une expérience utilisateur immersive et premium, inspirée du design Apple, avec une collection de lunettes de vue, soleil et éditions limitées.

### 🎯 Objectifs du projet

- ✅ **50+ produits** de lunettes premium
- ✅ **50+ marques** de luxe avec logos
- ✅ **15 pages** fonctionnelles
- ✅ **Authentification sécurisée** (JWT + bcrypt)
- ✅ **Design immersif** avec effets glassmorphism
- ✅ **Expérience utilisateur** fluide et élégante

---

## 🏗️ Architecture

### Stack technique

#### Frontend
- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **State Management**: Context API + localStorage
- **Styling**: TailwindCSS + CSS custom
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod

#### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcrypt
- **Validation**: Joi / Express-validator
- **Security**: Helmet, CORS, Rate limiting

#### DevOps
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render
- **Database**: MongoDB Atlas
- **Version Control**: Git + GitHub

---

## 📄 Pages (23 au total)

### Pages publiques (17)
| Route | Description |
|-------|-------------|
| `/` | Accueil avec hero immersif et carrousel saisonnier |
| `/auth` | Connexion / Inscription (JWT) avec design moderne |
| `/glasses` | Catalogue complet avec filtres avancés |
| `/glasses/:id` | Détail produit avec galerie, avis, spécifications |
| `/sunglasses` | Collection lunettes de soleil |
| `/brands` | Showcase de 50+ marques de luxe |
| `/brands/:slug` | Page détaillée d'une marque avec ses produits |
| `/categories` | Catégories (vue, soleil, saisons) |
| `/collections` | Collections exclusives et saisonnières |
| `/compare` | Comparateur de produits (jusqu'à 3) |
| `/recommendations` | Recommandations personnalisées |
| `/gift-card` | Cartes cadeaux personnalisables |
| `/newsletter` | Inscription newsletter avec préférences |
| `/faq` | FAQ interactive avec catégories |
| `/stores` | Localisateur de magasins avec carte |
| `/news` | Actualités et tendances |
| `/contact` | Formulaire de contact + infos |
| `/about` | À propos avec timeline et équipe |

### Pages protégées - Utilisateur (6)
| Route | Description |
|-------|-------------|
| `/favorites` | 🔒 Liste personnelle de favoris |
| `/cart` | 🔒 Panier avec codes promo |
| `/checkout` | 🔒 Processus de paiement en 2 étapes |
| `/success` | 🔒 Confirmation avec confettis |
| `/profile` | 🔒 Profil avec onglets (adresses, paiements, paramètres) |
| `/orders` | 🔒 Historique des commandes détaillé |
| `/try-on` | 🔒 Essayage virtuel (webcam/upload) |

### Pages admin (2)
| Route | Description |
|-------|-------------|
| `/admin` | 🔒👑 Dashboard avec stats, commandes, top produits |
| `/admin/analytics` | 🔒👑 Analytics avancées (revenus, conversions, stocks) |

---

## 👥 Rôles utilisateurs

### 1. Visiteur (non authentifié)
- ✅ Navigation libre sur le site
- ✅ Consultation des produits et marques
- ❌ Pas d'accès au panier/favoris
- Redirection vers `/auth` pour actions protégées

### 2. Utilisateur (User)
- ✅ Toutes les fonctionnalités visiteur
- ✅ Gestion du panier et favoris
- ✅ Passage de commandes
- ✅ Historique des achats
- ✅ Essayage virtuel
- ❌ Pas d'accès admin

### 3. Administrateur (Admin)
- ✅ Toutes les fonctionnalités utilisateur
- ✅ CRUD produits, marques, catégories
- ✅ Gestion des utilisateurs
- ✅ Gestion des commandes
- ✅ Accès aux statistiques

---

## 🗄️ Modèles de données

### User
```javascript
{
  firstName, lastName, email, password (hashed),
  role: "user" | "admin",
  favorites: [ProductId],
  orders: [OrderId]
}
```

### Product
```javascript
{
  name, description, price,
  brand: BrandId,
  category: CategoryId,
  images: [String],
  colors, sizes, stock,
  isNewArrival, isFeatured, season
}
```

### Brand
```javascript
{
  name, logo, description,
  country, isLuxury,
  products: [ProductId]
}
```

### Order
```javascript
{
  orderNumber, user: UserId,
  items: [{ product, quantity, price, color, size }],
  totalAmount, status, paymentStatus,
  shippingAddress
}
```

---

## 🔌 API Endpoints (10 routes)

### Authentification `/api/auth`
```
POST   /register          - Inscription utilisateur
POST   /login             - Connexion
GET    /me 🔒             - Profil utilisateur connecté
```

### Produits `/api/products`
```
GET    /                  - Liste avec pagination et filtres
GET    /:id               - Détail produit
GET    /featured          - Produits mis en avant
GET    /new-arrivals      - Nouveautés
POST   / 🔒👑             - Créer un produit
PUT    /:id 🔒👑          - Modifier un produit
DELETE /:id 🔒👑          - Supprimer un produit
```

### Marques `/api/brands`
```
GET    /                  - Liste des marques
GET    /:id               - Détail marque
POST   / 🔒👑             - Créer une marque
PUT    /:id 🔒👑          - Modifier une marque
DELETE /:id 🔒👑          - Supprimer une marque
```

### Favoris `/api/favorites`
```
GET    / 🔒               - Liste des favoris
POST   / 🔒               - Ajouter aux favoris
DELETE /:productId 🔒     - Retirer des favoris
```

### Panier `/api/cart`
```
POST   /checkout 🔒       - Valider la commande
GET    /my-orders 🔒      - Mes commandes
GET    /:id 🔒            - Détail commande
```

### Commandes `/api/orders`
```
POST   / 🔒               - Créer une commande
GET    /my-orders 🔒      - Historique commandes
GET    /:id 🔒            - Détail commande
```

### Recommandations `/api/recommendations`
```
GET    /                  - Liste des recommandations
POST   / 🔒👑             - Créer une recommandation
PUT    /:id 🔒👑          - Modifier
DELETE /:id 🔒👑          - Supprimer
```

### Admin `/api/admin`
```
GET    /users 🔒👑        - Liste utilisateurs
DELETE /users/:id 🔒👑    - Supprimer utilisateur
GET    /orders 🔒👑       - Toutes les commandes
PUT    /orders/:id 🔒👑   - Modifier statut commande
GET    /stats 🔒👑        - Statistiques globales
GET    /analytics 🔒👑    - Analytics avancées
```

### Contact `/api/contact`
```
POST   /                  - Envoyer un message
```

### News `/api/news`
```
GET    /                  - Liste des actualités
```

---

## 🎨 Design System

### Palette de couleurs
- **Noir**: `#000000` (principal)
- **Blanc**: `#FFFFFF` (principal)
- **Rouge Ferrari**: `#DC0000` (accent)
- **Bleu ciel**: `#87CEEB` (accent)
- **Or luxe**: `#D4AF37` (premium)
- **Argent**: `#C0C0C0` (premium)

### Typographie
- **Primary**: Inter, -apple-system, sans-serif
- **Display**: Satoshi, SF Pro Display, sans-serif

### Effets
- **Glassmorphism**: Blur + transparence
- **Animations**: Fade-in, slide-up, scale
- **Transitions**: 300ms ease-in-out
- **Shadows**: Ombres douces et élégantes

---

## 🔒 Sécurité

- ✅ Passwords hashés avec **bcrypt** (10 rounds)
- ✅ Authentification **JWT** (expire 7 jours)
- ✅ Protection routes avec middlewares
- ✅ Validation côté client et serveur
- ✅ **CORS** configuré
- ✅ **Rate limiting** (100 req/15min)
- ✅ **Helmet** pour headers sécurisés

---

## 📁 Documentation

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) - Architecture complète du projet
- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) - Arborescence détaillée
- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) - Système de design complet

---

## 🚀 Installation et Lancement

### Prérequis
- Node.js 18+
- MongoDB (local ou Atlas)
- npm ou yarn

### Backend
```bash
cd backend
npm install
# Configurer le fichier .env (copier .env.example)
node utils/comprehensiveSeed.js  # Seed complet (55 produits, 50 marques, 10 recos)
npm run dev                       # Démarre sur http://localhost:3005
```

### Frontend
```bash
cd frontend
npm install
npm run dev  # Démarre sur http://localhost:3006
```

### Compte Admin par défaut
- **Email**: `admin@opticglass.com`
- **Mot de passe**: `admin123`

---

## ✅ Fonctionnalités Complètes

### Pages (28 au total)
- **17 pages publiques**: Home, Glasses, GlassDetail, Brands, Categories, Sunglasses, Compare, GiftCard, Newsletter, FAQ, Stores, Reviews, News, Contact, About, Recommendations, Audience
- **7 pages protégées**: Favorites, Cart, Checkout, Success, Profile, Orders, TryOn
- **2 pages admin**: AdminDashboard, AdminAnalytics
- **1 page 404**: NotFoundPage

### Composants (25 au total)
- Navbar, Footer, FloatingCart, FloatingCTA
- BrandSlider, BrandFilter, Glass3DCard, RotatingGlassCard
- LensRecommender, SeasonCarousel, ParallaxHero
- Loader, GradientBackground, RedGradientBackground
- UI Components: Button, Card, Input, Modal, Badge, Dropdown, Skeleton, Toast

### Backend
- ✅ 5 modèles: User, Product, Brand, Order, Recommendation
- ✅ 10 routes API: auth, products, brands, orders, favorites, cart, admin, recommendations, news, contact
- ✅ 4 middlewares: authMiddleware, isAdmin, errorMiddleware, validateMiddleware
- ✅ Sécurité: JWT, bcrypt, Helmet, CORS, rate-limiting, sanitization

### Données Seedées
- ✅ **55 produits** (11 marques × 5 produits)
- ✅ **50 marques** de luxe avec descriptions et logos
- ✅ **10 recommandations** éditoriales
- ✅ **1 admin** par défaut

---

## 🧪 Tests

### Tests E2E Frontend (Playwright)
```bash
cd frontend
npm test              # 86 tests
npm run test:ui       # Interface graphique
npm run test:report   # Rapport HTML
```

### Tests Unitaires Backend (Jest)
```bash
cd backend
npm test              # 74 tests
npm run test:coverage # Avec couverture
```

### Résultats des Tests
| Suite | Tests | Status |
|-------|-------|--------|
| Frontend E2E | 86/86 | ✅ |
| Backend Unit | 74/74 | ✅ |
| **TOTAL** | **160** | ✅ |

---

## 📝 Notes importantes

### Contraintes respectées
- ✅ Minimum 50 produits
- ✅ Minimum 50 marques avec logos
- ✅ Au moins 15 pages réelles
- ✅ Auth 100% fonctionnelle
- ✅ Backend indépendant (Express + MongoDB)
- ✅ Routes protégées côté backend
- ✅ Paiement simulé uniquement

### Données de seed prévues
- **Produits**: 50+ (vue, soleil, éditions limitées)
- **Marques**: 50+ (Ray-Ban, Oakley, Gucci, Prada, Dior, etc.)
- **Catégories**: 10+ (vue homme/femme, soleil, sport, saisons)
- **Prix**: 100€ - 1500€

---

## 📧 Contact

**Projet**: Optic Glass  
**Type**: E-commerce de lunettes de luxe  
**Statut**: Architecture complète ✅  
**Date**: Janvier 2026

---

## 📜 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

---

**Créé avec 🧠 et ❤️ pour une expérience utilisateur premium**
