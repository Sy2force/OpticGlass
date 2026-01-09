# ✅ Checklist Déploiement Vercel - Optic Glass

## 🚀 Avant le déploiement

### Configuration locale
- [ ] `npm run build` fonctionne sans erreur
- [ ] `.env.example` existe avec `VITE_API_URL`
- [ ] `vercel.json` présent à la racine de `frontend/`
- [ ] Backend déployé sur Render avec URL publique
- [ ] Code poussé sur GitHub (branche `main`)

### Tests locaux
- [ ] Toutes les pages s'affichent correctement
- [ ] Connexion/Inscription fonctionnelle
- [ ] Appels API vers le backend réussis
- [ ] Console navigateur sans erreur critique
- [ ] Responsive testé (mobile/tablet/desktop)

---

## 🌐 Déploiement Vercel

### Configuration initiale
- [ ] Compte Vercel créé ([vercel.com/signup](https://vercel.com/signup))
- [ ] Repository GitHub connecté à Vercel
- [ ] **Root Directory** défini sur `frontend`
- [ ] Framework détecté : `Vite`

### Variables d'environnement
- [ ] `VITE_API_URL` ajoutée dans Vercel Settings
- [ ] Value : `https://[votre-backend].onrender.com/api`
- [ ] Appliquée aux 3 environnements (Production, Preview, Development)

### Build Settings
- [ ] Build Command : `npm run build` (auto)
- [ ] Output Directory : `dist` (auto)
- [ ] Install Command : `npm install` (auto)

---

## 🧪 Post-déploiement

### Tests fonctionnels
- [ ] **Home** (`/`) : Hero et sections visibles
- [ ] **Glasses** (`/glasses`) : Produits affichés avec images
- [ ] **Sunglasses** (`/sunglasses`) : Produits affichés
- [ ] **Product Detail** (`/product/:id`) : Détails complets
- [ ] **Login** (`/login`) : Authentification OK
- [ ] **Register** (`/register`) : Inscription OK
- [ ] **Profile** (`/profile`) : Données utilisateur
- [ ] **Cart** (`/cart`) : Panier fonctionnel
- [ ] **Checkout** (`/checkout`) : Formulaire validé
- [ ] **Favorites** (`/favorites`) : Favoris synchronisés
- [ ] **Admin Dashboard** (`/admin/dashboard`) : Stats visibles
- [ ] **Admin Analytics** (`/admin/analytics`) : Graphiques recharts

### Tests techniques
- [ ] Console : **0 erreur critique**
- [ ] Network : Appels API vers Render réussis (200/201)
- [ ] CORS : Pas d'erreur Cross-Origin
- [ ] JWT : Token stocké et envoyé dans headers
- [ ] Images : Chargées depuis CDN externe
- [ ] Animations : Framer Motion fluides
- [ ] Favicon : Visible dans l'onglet

### Performance
- [ ] Lighthouse Performance : > 85
- [ ] Lighthouse SEO : > 90
- [ ] First Contentful Paint : < 2s
- [ ] Time to Interactive : < 4s

### Responsive
- [ ] Mobile (375px) : Navigation et layout OK
- [ ] Tablet (768px) : Layout adapté
- [ ] Desktop (1920px) : Pleine largeur

---

## 🔐 Sécurité

### Headers
- [ ] `X-Content-Type-Options: nosniff` présent
- [ ] `X-Frame-Options: DENY` présent
- [ ] `X-XSS-Protection: 1; mode=block` présent
- [ ] HTTPS actif (certificat Let's Encrypt)

### Backend CORS
- [ ] URL Vercel ajoutée dans backend CORS
- [ ] Exemple : `https://optic-glass.vercel.app`
- [ ] Preview URLs autorisées : `https://*.vercel.app`

---

## 📊 Monitoring

### Vercel Dashboard
- [ ] Build logs vérifiés (aucune erreur)
- [ ] Deployment time : < 3 min
- [ ] Analytics activé (optionnel)
- [ ] Domaine custom configuré (optionnel)

### Tests API backend
```bash
# Vérifier depuis la console navigateur
GET https://[backend-url]/api/products → 200
GET https://[backend-url]/api/products/:id → 200
POST https://[backend-url]/api/auth/login → 200 (avec body)
POST https://[backend-url]/api/auth/register → 201 (avec body)
```

---

## 🐛 Dépannage

### Build échoue
- [ ] Vérifier `npm run build` en local
- [ ] Vérifier les logs Vercel
- [ ] Vérifier que toutes les dépendances sont dans `package.json`
- [ ] Vérifier Node version (18+)

### API calls fail
- [ ] Vérifier `VITE_API_URL` dans Vercel Environment Variables
- [ ] Vérifier CORS backend (inclut URL Vercel)
- [ ] Vérifier backend accessible publiquement
- [ ] Tester appel API direct dans Postman

### Page 404 sur refresh
- [ ] Vérifier `vercel.json` avec rewrites
- [ ] Redéployer si nécessaire

### Erreur "recharts not found"
- [ ] Vérifier `recharts` dans `dependencies` (pas `devDependencies`)
- [ ] Exécuter `npm install recharts --save`
- [ ] Push et redéployer

---

## ✅ Validation finale

- [ ] URL publique accessible : `https://[projet].vercel.app`
- [ ] Toutes les pages fonctionnelles
- [ ] Backend connecté
- [ ] Authentification opérationnelle
- [ ] Design Glassmorphism intact
- [ ] Responsive sur tous devices
- [ ] Performance optimale
- [ ] Sécurité configurée
- [ ] Prêt pour production ! 🎉

---

**Date de déploiement** : ___________

**URL Production** : ___________

**URL Backend** : ___________
