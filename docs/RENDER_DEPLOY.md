# 🚀 Guide de Déploiement Backend sur Render

Ce guide explique comment déployer le backend Express.js d'Optic Glass sur Render et le connecter au frontend Vercel.

---

## 📋 Prérequis

- ✅ Compte Render (gratuit : [render.com/register](https://render.com/register))
- ✅ Base de données MongoDB Atlas configurée
- ✅ Repository GitHub avec le code backend
- ✅ Node.js 18+ (pour tests locaux)

---

## 🔧 Étape 1 : Créer le Web Service sur Render

### Via l'interface Render Dashboard

1. Aller sur [dashboard.render.com](https://dashboard.render.com/)
2. Cliquer sur **"New +"** → **"Web Service"**
3. Connecter le repository GitHub **Optic Glass**
4. Configurer les paramètres :

| Paramètre | Valeur |
|-----------|--------|
| **Name** | `optic-glass-backend` |
| **Root Directory** | `backend` |
| **Environment** | `Node` |
| **Region** | `Frankfurt (EU Central)` |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` (ou `Starter` pour production) |

---

## 🔐 Étape 2 : Variables d'Environnement

Dans **Render Dashboard → Environment**, ajouter :

### Variables obligatoires

```env
NODE_ENV=production
PORT=3005
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/optic_glass?retryWrites=true&w=majority
JWT_SECRET=<votre_secret_jwt_complexe_32_caracteres_min>
FRONTEND_URL=https://optic-glass.vercel.app
```

### Détails des variables

#### `NODE_ENV`
- **Value** : `production`
- Active le mode production (logs optimisés, sécurité renforcée)

#### `PORT`
- **Value** : `3005` (ou laisser vide pour port auto Render)
- Port d'écoute du serveur

#### `MONGO_URI`
- **Value** : Chaîne de connexion MongoDB Atlas
- Format : `mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority`
- ⚠️ Remplacer `<username>`, `<password>`, `<cluster>`, `<db>`

#### `JWT_SECRET`
- **Value** : Clé secrète pour les tokens JWT (min 32 caractères)
- Générer avec : `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Exemple : `a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456`

#### `FRONTEND_URL`
- **Value** : `https://optic-glass.vercel.app`
- URL du frontend Vercel (pour CORS)
- ⚠️ Mettre à jour après le déploiement Vercel

---

## 🌐 Étape 3 : Configuration CORS (Déjà fait ✅)

Le fichier `server.js` a été mis à jour pour accepter automatiquement :

```javascript
// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        process.env.FRONTEND_URL,
        'http://localhost:5173',
        'http://localhost:3006'
      ].filter(Boolean);
      
      if (!origin) return callback(null, true);
      if (allowed.includes(origin)) return callback(null, true);
      
      // Allow Vercel preview deployments
      if (origin && origin.match(/^https:\/\/.*\.vercel\.app$/)) {
        return callback(null, true);
      }
      
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
```

**Avantages** :
- ✅ Accepte l'URL production Vercel
- ✅ Accepte les preview deployments (`*.vercel.app`)
- ✅ Accepte localhost pour développement

---

## 🗄️ Étape 4 : Initialiser la Base de Données

Une fois le backend déployé, seeder la base de données avec les produits :

### Option 1 : Via Render Shell

1. Render Dashboard → Service → **Shell**
2. Exécuter :

```bash
npm run seed
```

### Option 2 : En local connecté à MongoDB Atlas

```bash
cd backend
# S'assurer que .env pointe vers MongoDB Atlas (production)
npm run seed
```

**Résultat attendu** :
```
✅ Users créés : 2 (admin + user)
✅ Products créés : 70+ (Ray-Ban, Gucci, Prada, etc.)
✅ Brands créés : 50+
```

---

## 🧪 Étape 5 : Tests Post-Déploiement

### Tester l'API publiquement

```bash
# Test endpoint root
curl https://optic-glass-backend.onrender.com/

# Test products
curl https://optic-glass-backend.onrender.com/api/products

# Test specific product
curl https://optic-glass-backend.onrender.com/api/products/<product_id>

# Test brands
curl https://optic-glass-backend.onrender.com/api/brands
```

**Réponse attendue** :
```json
{
  "success": true,
  "message": "API Optic Glass - Backend opérationnel",
  "version": "1.0.0"
}
```

### Tester l'authentification

```bash
# Register
curl -X POST https://optic-glass-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com","password":"Test123456"}'

# Login
curl -X POST https://optic-glass-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123456"}'
```

---

## 🔄 Étape 6 : Lier avec le Frontend Vercel

### Mettre à jour la variable Vercel

1. Vercel Dashboard → Project **Optic Glass**
2. Settings → **Environment Variables**
3. Modifier `VITE_API_URL` :

```
VITE_API_URL=https://optic-glass-backend.onrender.com/api
```

4. Redéployer le frontend :

```bash
vercel --prod
```

### Vérifier la connexion

Ouvrir le frontend Vercel et :
- ✅ Les produits s'affichent (API `/products` fonctionne)
- ✅ Login/Register fonctionnels (API `/auth` fonctionne)
- ✅ Favoris synchronisés (API `/favorites` fonctionne)
- ✅ Aucune erreur CORS dans la console

---

## 📊 Monitoring sur Render

### Logs en temps réel

Render Dashboard → Service → **Logs**

**Logs normaux** :
```
🚀 Serveur démarré sur le port 3005
📍 Environnement: production
✅ MongoDB connecté avec succès
```

**Erreurs courantes** :
```
❌ MongooseServerSelectionError → Vérifier MONGO_URI
❌ JWT malformed → Vérifier JWT_SECRET
❌ CORS blocked → Vérifier FRONTEND_URL
```

### Métriques

Render affiche automatiquement :
- **CPU Usage**
- **Memory Usage**
- **Request Count**
- **Response Times**

---

## 🐛 Dépannage

### Le backend ne démarre pas

**Vérifier** :
1. Build Command : `npm install`
2. Start Command : `npm start`
3. Root Directory : `backend`
4. Toutes les variables d'environnement présentes

### MongoDB connection failed

**Solutions** :
1. Vérifier `MONGO_URI` (username, password, cluster)
2. MongoDB Atlas → Network Access → Ajouter `0.0.0.0/0` (Allow all)
3. Vérifier que le cluster est actif

### CORS errors depuis Vercel

**Solutions** :
1. Vérifier `FRONTEND_URL` dans Render
2. Vérifier que le code CORS est à jour (`server.js`)
3. Redémarrer le service Render

### JWT token errors

**Solutions** :
1. Générer un nouveau `JWT_SECRET` (32+ caractères)
2. Redéployer backend et frontend
3. Effacer localStorage du navigateur

---

## 🔒 Sécurité Production

### Checklist

- [x] `NODE_ENV=production`
- [x] `JWT_SECRET` complexe (32+ caractères)
- [x] MongoDB : IP Whitelist configuré
- [x] CORS : Only Vercel URLs autorisées
- [x] Rate Limiting activé (100 req/15min)
- [x] Helmet.js activé (headers sécurité)
- [x] Morgan logs activés
- [x] Sanitization des inputs activée

---

## 🚀 Déploiement Automatique

Render redéploie automatiquement à chaque **push** sur `main`.

### Désactiver l'auto-deploy

Render Dashboard → Settings → **Build & Deploy** → Toggle OFF

### Déployer manuellement

Render Dashboard → **Manual Deploy** → Deploy latest commit

---

## 📧 Notifications

### Configurer les alertes

Render Dashboard → Settings → **Notifications**

Activer :
- ✅ Deploy Started
- ✅ Deploy Failed
- ✅ Service Down

---

## 💰 Plans Render

| Plan | Prix | Specs |
|------|------|-------|
| **Free** | $0/mois | 512MB RAM, Sleep après 15min inactivité |
| **Starter** | $7/mois | 512MB RAM, Toujours actif |
| **Standard** | $25/mois | 2GB RAM, Auto-scaling |

**Recommandation** : **Starter** pour production (évite le sleep)

---

## ✅ Validation Finale

- [ ] Backend déployé sur Render
- [ ] URL publique accessible : `https://optic-glass-backend.onrender.com`
- [ ] Variables d'environnement configurées
- [ ] MongoDB connecté et seedé
- [ ] CORS configuré pour Vercel
- [ ] Tests API réussis (products, auth, brands)
- [ ] Frontend Vercel connecté avec succès
- [ ] Aucune erreur dans les logs Render
- [ ] Monitoring actif
- [ ] Prêt pour production ! 🎉

---

**Date de déploiement** : ___________

**URL Backend** : ___________

**MongoDB Cluster** : ___________
