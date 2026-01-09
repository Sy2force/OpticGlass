# 🌍 Guide de Déploiement - Optic Glass

Ce guide détaille les étapes pour déployer l'application Optic Glass en production.

## 1. Backend (API) - Sur Render ou Railway

### Pré-requis
- Un compte sur [Render](https://render.com/) ou [Railway](https://railway.app/)
- Une base de données MongoDB (ex: MongoDB Atlas)

### Configuration
1. **Créer un nouveau Web Service**
2. **Connecter le repository GitHub**
3. **Configurer les variables d'environnement** :
   - `NODE_ENV`: `production`
   - `PORT`: `3005` (ou laisser par défaut)
   - `MONGO_URI`: Votre chaîne de connexion MongoDB Atlas
   - `JWT_SECRET`: Une clé secrète longue et complexe
   - `FRONTEND_URL`: L'URL de votre frontend déployé (ex: `https://optic-glass.vercel.app`)

4. **Commande de build** : `npm install`
5. **Commande de start** : `npm start` (pointe vers `node server.js`)

## 2. Frontend (React) - Sur Vercel

### Pré-requis
- Un compte sur [Vercel](https://vercel.com/)

### Configuration
1. **Importer le projet** depuis GitHub
2. **Configurer le Framework Preset** : `Vite`
3. **Configurer les variables d'environnement** :
   - `VITE_API_URL`: L'URL de votre backend déployé (ex: `https://optic-glass-api.onrender.com/api`)
     *Attention : Ne pas oublier le `/api` à la fin !*

4. **Déployer**

### Note sur le Routing
Un fichier `vercel.json` a été ajouté pour gérer les redirections des routes React (SPA) afin d'éviter les erreurs 404 lors du rafraîchissement des pages.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 3. Base de Données (MongoDB)

Une fois le backend déployé, vous pouvez initialiser la base de données avec des produits de luxe réels :

1. Accédez à la console de votre serveur ou utilisez votre machine locale connectée à la base de production.
2. Exécutez le script de seed :
   ```bash
   npm run seed
   ```
   *Assurez-vous que votre `.env` pointe bien vers la base de production.*

## 4. Vérifications Finales

- [ ] Tester l'inscription et la connexion
- [ ] Vérifier que les images des produits s'affichent (domaines autorisés)
- [ ] Tester le tunnel de paiement (simulation)
- [ ] Vérifier le responsive sur mobile

---

**Support** : En cas de problème, consultez les logs du serveur backend via le dashboard de votre hébergeur.
