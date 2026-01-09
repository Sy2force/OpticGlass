# 🎯 Plan de Refonte Optic Glass - Site E-commerce Luxe

## Phase 1: Nettoyage et Structure ✅ EN COURS

### Étape 1.1: Supprimer le Multilingue ✅
- [x] Supprimer LanguageContext.jsx
- [x] Retirer tous les imports useLanguage
- [x] Remplacer {t('key')} par texte anglais direct
- [x] Tout en anglais uniquement

### Étape 1.2: Nettoyer les Fichiers Obsolètes
- [ ] Supprimer AudiencePage.jsx (non utilisé)
- [ ] Supprimer NewsPage.jsx (non utilisé)
- [ ] Supprimer NewsletterPage.jsx (redondant)
- [ ] Supprimer ReviewsPage.jsx (intégrer dans GlassDetail)
- [ ] Nettoyer les anciens fichiers de documentation (.md)

### Étape 1.3: Restructurer les Composants
- [ ] Centraliser tous les UI dans components/ui/
- [ ] Créer components/layout/ (Navbar, Footer, etc.)
- [ ] Créer components/product/ (Glass3DCard, ProductGrid, etc.)
- [ ] Créer components/features/ (ChatBot, MessageBox, etc.)

## Phase 2: Design Apple-Luxe

### Étape 2.1: Système de Design
- [ ] Créer design-tokens.js avec palette complète
- [ ] Configurer Tailwind avec tokens luxe
- [ ] Ajouter fonts Playfair Display + Inter
- [ ] Créer composants UI réutilisables (Button, Card, Input, Badge, etc.)

### Étape 2.2: Animations Framer Motion
- [ ] Créer animations.js avec variants réutilisables
- [ ] Page transitions fluides
- [ ] Hover effects cohérents
- [ ] Loading skeletons animés

## Phase 3: Pages à Compléter

### Priorité Haute
- [ ] GlassesPage.jsx - Comme Sunglasses mais pour vue optique
- [ ] GlassDetailPage.jsx - Zoom, specs, AI compare, suggestions
- [ ] BrandsPage.jsx - Pages dédiées par marque avec produits
- [ ] Collections.jsx - Filtres par collection

### Priorité Moyenne
- [ ] Profile.jsx - Historique commandes, favoris, settings
- [ ] Compare.jsx - Comparer 2-3 lunettes côte à côte
- [ ] GiftCard.jsx - Page interactive avec montants
- [ ] Stores.jsx - Google Maps + adresses magasins

### Priorité Basse
- [ ] TryOn.jsx - Webcam + overlay SVG lunettes
- [ ] AdminDashboard.jsx - KPIs + charts propres
- [ ] AdminAnalytics.jsx - Statistiques avancées
- [ ] NotFoundPage.jsx - 404 luxe

## Phase 4: Produits et Images

### Étape 4.1: Base de Données Produits
- [ ] Créer 70 produits complets (35 sun + 35 vue)
- [ ] Noms descriptifs (ex: "GG Oversized Square – Gold Edition")
- [ ] Prix luxe (499₪ - 2499₪)
- [ ] Descriptions détaillées
- [ ] Specs techniques (UV, polarisé, matériau, etc.)
- [ ] Ratings et reviews

### Étape 4.2: Images Produits
Options:
1. Utiliser API Unsplash avec recherche par marque
2. Générer avec DALL-E/Midjourney
3. Utiliser Cloudinary avec collection
4. Créer SVG stylisés par marque

## Phase 5: Backend

### Étape 5.1: Validation
- [ ] Installer Joi
- [ ] Créer validation/auth.js
- [ ] Créer validation/product.js
- [ ] Créer validation/order.js

### Étape 5.2: Middlewares
- [ ] logger.js avec Morgan
- [ ] Améliorer isAdmin middleware
- [ ] Upload avatar avec Multer
- [ ] Rate limiting

### Étape 5.3: Endpoints
- [ ] Documenter toutes les routes
- [ ] Ajouter pagination partout
- [ ] Améliorer error handling
- [ ] Préparer Stripe integration

## Phase 6: Tests et Déploiement

### Étape 6.1: Tests
- [ ] Garder 11 tests Playwright
- [ ] Ajouter tests Jest (auth, products, cart)
- [ ] Script de seed MongoDB
- [ ] Tests E2E complets

### Étape 6.2: Déploiement
- [ ] README.md complet
- [ ] Variables d'environnement
- [ ] Scripts de build
- [ ] CI/CD avec GitHub Actions
- [ ] Preview sur Vercel/Render

## Phase 7: Finalisation

- [ ] Supprimer tous les console.log
- [ ] Optimiser les images
- [ ] Minifier le code
- [ ] SEO (meta tags, sitemap)
- [ ] Cookies policy
- [ ] CGU et Privacy Policy
- [ ] Footer complet avec liens

---

## 🎯 Prochaines Actions Immédiates

1. ✅ Supprimer multilingue
2. Nettoyer fichiers obsolètes
3. Créer système de design tokens
4. Compléter GlassesPage.jsx
5. Améliorer GlassDetailPage.jsx
6. Générer vraies images produits

---

**Status**: Phase 1 en cours - Nettoyage et structure
**Progression**: 15% complété
