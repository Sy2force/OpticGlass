# 🚀 Guide de Déploiement Vercel - Optic Glass Frontend

Ce guide détaille le déploiement complet du frontend React + Vite sur Vercel, connecté au backend Express.js hébergé sur Render.

---

## 📋 Prérequis

- ✅ Build local fonctionnel (`npm run build` sans erreur)
- ✅ Compte Vercel (gratuit : [vercel.com/signup](https://vercel.com/signup))
- ✅ Repository GitHub avec le projet Optic Glass
- ✅ Backend déployé sur Render avec URL publique

---

## 🔧 Méthode 1 : Déploiement via Interface Web (Recommandé)

### Étape 1 : Importer le Projet

1. Aller sur [vercel.com/import](https://vercel.com/import)
2. Cliquer sur **"Import Git Repository"**
3. Sélectionner le repository **Optic Glass**
4. Autoriser l'accès à Vercel si demandé

### Étape 2 : Configuration du Projet

**Important** : Configurer le **Root Directory**

- **Root Directory** : `frontend`
- **Framework Preset** : `Vite` (auto-détecté)
- **Build Command** : `npm run build` (auto-détecté)
- **Output Directory** : `dist` (auto-détecté)

### Étape 3 : Variables d'Environnement

Ajouter la variable suivante dans **Environment Variables** :

| Variable | Value | Environnement |
|----------|-------|---------------|
| `VITE_API_URL` | `https://optic-glass-backend.onrender.com/api` | Production, Preview, Development |

**⚠️ IMPORTANT** : 
- Remplacer `optic-glass-backend.onrender.com` par l'URL réelle de ton backend Render
- Ne pas oublier le `/api` à la fin
- Cocher les 3 environnements (Production, Preview, Development)

### Étape 4 : Déployer

1. Cliquer sur **"Deploy"**
2. Attendre 2-3 minutes (première fois)
3. Récupérer l'URL publique (ex: `https://optic-glass.vercel.app`)

---

## 🔧 Méthode 2 : Déploiement via CLI (Avancé)

### Étape 1 : Installer Vercel CLI

```bash
npm install -g vercel
```

### Étape 2 : Se Connecter

```bash
vercel login
```

### Étape 3 : Déployer depuis `frontend/`

```bash
cd frontend
vercel
```

**Répondre aux questions** :

```
? Set up and deploy "~/Optic Glass/frontend"? [Y/n] Y
? Which scope do you want to deploy to? [Your Vercel Account]
? Link to existing project? [n] n
? What's your project's name? optic-glass
? In which directory is your code located? ./
? Want to override the settings? [y/N] y
? Build Command: npm run build
? Output Directory: dist
? Development Command: npm run dev
```

### Étape 4 : Ajouter les Variables d'Environnement

```bash
vercel env add VITE_API_URL
```

Coller la valeur :
```
https://optic-glass-backend.onrender.com/api
```

Choisir les environnements : **Production, Preview, Development**

### Étape 5 : Redéployer avec les Variables

```bash
vercel --prod
```

---

## 📁 Structure de Configuration

### `vercel.json`

Le fichier `vercel.json` a été optimisé avec :

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

**Avantages** :
- ✅ Rewrites pour SPA (pas de 404 sur refresh)
- ✅ Cache optimisé pour les assets (1 an)
- ✅ Headers de sécurité (XSS, clickjacking)

### `.env.example`

Fichier de référence pour les variables :

```env
# URL de l'API Backend
# Local: http://localhost:3005/api
# Production: https://optic-glass-backend.onrender.com/api
VITE_API_URL=http://localhost:3005/api
```

---

## 🧪 Checklist Post-Déploiement

### Tests Fonctionnels

| Page | URL | Statut |
|------|-----|--------|
| Home | `/` | ⬜ OK |
| Glasses | `/glasses` | ⬜ Produits visibles |
| Sunglasses | `/sunglasses` | ⬜ Produits visibles |
| Product Detail | `/product/:id` | ⬜ Images + Infos |
| Login | `/login` | ⬜ Authentification OK |
| Register | `/register` | ⬜ Inscription OK |
| Profile | `/profile` | ⬜ Données utilisateur |
| Cart | `/cart` | ⬜ Panier fonctionnel |
| Checkout | `/checkout` | ⬜ Formulaire OK |
| Favorites | `/favorites` | ⬜ Favoris persistants |
| Admin Dashboard | `/admin/dashboard` | ⬜ Stats visibles |
| Admin Analytics | `/admin/analytics` | ⬜ Graphiques recharts |

### Tests Techniques

- ⬜ Console navigateur : **0 erreur**
- ⬜ Network tab : appels API vers backend Render réussis
- ⬜ Responsive : Mobile (375px), Tablet (768px), Desktop (1920px)
- ⬜ Performance Lighthouse : **> 90**
- ⬜ SEO : Meta tags présents
- ⬜ Favicon visible
- ⬜ Animations Framer Motion fluides
- ⬜ Images des produits chargées (CDN externe OK)

### Tests API Backend

Vérifier dans la console Network :

```bash
# Exemple de requêtes qui doivent fonctionner
GET https://optic-glass-backend.onrender.com/api/products
GET https://optic-glass-backend.onrender.com/api/products/:id
POST https://optic-glass-backend.onrender.com/api/auth/login
POST https://optic-glass-backend.onrender.com/api/auth/register
GET https://optic-glass-backend.onrender.com/api/admin/analytics (avec JWT)
```

---

## 🔄 Redéploiement Automatique

Vercel redéploie automatiquement à chaque **push** sur la branche `main` (ou `master`).

### Configuration des Branches

- **Production** : `main` → `https://optic-glass.vercel.app`
- **Preview** : Autres branches → URL temporaire

Pour changer la branche de production :
1. Vercel Dashboard → Settings → Git
2. Modifier **Production Branch**

---

## 🐛 Dépannage

### Erreur : "Module not found: recharts"

**Solution** : Vérifier que `recharts` est dans `dependencies` (pas `devDependencies`)

```bash
cd frontend
npm install recharts --save
git add package.json package-lock.json
git commit -m "fix: add recharts to dependencies"
git push
```

### Erreur : API calls fail (CORS)

**Solution Backend** : Ajouter l'URL Vercel dans le CORS

```js
// backend/server.js
app.use(cors({
  origin: [
    'http://localhost:3006',
    'https://optic-glass.vercel.app',
    'https://*.vercel.app' // Pour les preview
  ],
  credentials: true
}));
```

### Erreur : "VITE_API_URL is undefined"

**Solution** : Vérifier que la variable est bien ajoutée dans Vercel Dashboard

1. Project Settings → Environment Variables
2. Ajouter `VITE_API_URL`
3. Redéployer : `vercel --prod`

### Build échoue sur Vercel

**Solution** : Vérifier les logs

```bash
vercel logs [deployment-url]
```

Causes fréquentes :
- Dépendance manquante dans `package.json`
- Import incorrect (casse fichier sur Linux)
- Memory limit (augmenter via Settings → General → Functions)

---

## 📊 Monitoring & Analytics

### Activer Vercel Analytics

1. Vercel Dashboard → Project → Analytics
2. Activer **Web Analytics** (gratuit)
3. Installer le package :

```bash
npm install @vercel/analytics
```

4. Ajouter dans `src/main.jsx` :

```jsx
import { inject } from '@vercel/analytics';

inject();
```

### Performance Monitoring

- **Lighthouse CI** : Intégré dans Vercel
- **Core Web Vitals** : Visible dans l'onglet Analytics

---

## 🔐 Sécurité

### Headers Configurés

- `X-Content-Type-Options: nosniff` → Empêche le MIME sniffing
- `X-Frame-Options: DENY` → Empêche le clickjacking
- `X-XSS-Protection: 1; mode=block` → Protection XSS navigateur

### HTTPS

- ✅ Automatique sur Vercel (Let's Encrypt)
- ✅ Certificat renouvelé automatiquement

---

## 🎉 Résultat Final

URL Publique : **`https://optic-glass.vercel.app`**

- ✅ Build Vite optimisé
- ✅ Connexion backend Render fonctionnelle
- ✅ Authentification JWT opérationnelle
- ✅ Design Glassmorphism intact
- ✅ Responsive et performant
- ✅ SEO ready
- ✅ Sécurisé (HTTPS + Headers)

---

**Support** : En cas de problème, consulter [Vercel Docs](https://vercel.com/docs) ou ouvrir un ticket.
