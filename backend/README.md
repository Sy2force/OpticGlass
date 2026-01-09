# 🕶️ Optic Glass - Backend API

Backend Node.js + Express pour le site e-commerce de lunettes de luxe Optic Glass.

## 🚀 Installation

### Prérequis
- Node.js 18+
- MongoDB (local ou Atlas)
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances**
```bash
cd backend
npm install
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Modifier le fichier `.env` avec vos valeurs :
```env
MONGO_URI=mongodb://localhost:27017/optic-glass
JWT_SECRET=votre_secret_jwt_securise
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

3. **Initialiser la base de données avec 52 produits**
```bash
npm run seed
```

4. **Démarrer le serveur**
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur `http://localhost:5000`

---

## 📁 Structure du projet

```
backend/
├── config/
│   └── db.js                    # Configuration MongoDB
├── models/
│   ├── User.js                  # Modèle utilisateur
│   ├── Product.js               # Modèle produit
│   └── Order.js                 # Modèle commande
├── controllers/
│   ├── authController.js        # Logique authentification
│   ├── productController.js     # Logique produits
│   ├── favoriteController.js    # Logique favoris
│   ├── cartController.js        # Logique panier/commandes
│   └── adminController.js       # Logique admin
├── routes/
│   ├── auth.routes.js           # Routes auth
│   ├── products.routes.js       # Routes produits
│   ├── favorites.routes.js      # Routes favoris
│   ├── cart.routes.js           # Routes panier
│   └── admin.routes.js          # Routes admin
├── middlewares/
│   ├── authMiddleware.js        # Protection JWT
│   ├── isAdmin.js               # Vérification admin
│   └── errorMiddleware.js       # Gestion erreurs
├── utils/
│   ├── generateToken.js         # Génération JWT
│   └── seedData.js              # Script seed DB
└── server.js                    # Point d'entrée
```

---

## 🔌 Routes API

### Authentification (`/api/auth`)

| Méthode | Route | Description | Accès |
|---------|-------|-------------|-------|
| POST | `/register` | Inscription | Public |
| POST | `/login` | Connexion | Public |
| GET | `/me` | Profil utilisateur | 🔒 User |

### Produits (`/api/products`)

| Méthode | Route | Description | Accès |
|---------|-------|-------------|-------|
| GET | `/` | Liste produits (pagination, filtres) | Public |
| GET | `/featured` | Produits vedettes | Public |
| GET | `/new-arrivals` | Nouveautés | Public |
| GET | `/:id` | Détail produit | Public |
| POST | `/` | Créer produit | 🔒👑 Admin |
| PUT | `/:id` | Modifier produit | 🔒👑 Admin |
| DELETE | `/:id` | Supprimer produit | 🔒👑 Admin |

**Filtres disponibles** :
- `?page=1&limit=10` - Pagination
- `?category=soleil` - Filtrer par catégorie
- `?season=été` - Filtrer par saison
- `?brand=Ray-Ban` - Filtrer par marque
- `?minPrice=100&maxPrice=500` - Filtrer par prix
- `?search=aviator` - Recherche textuelle

### Favoris (`/api/favorites`)

| Méthode | Route | Description | Accès |
|---------|-------|-------------|-------|
| GET | `/` | Mes favoris | 🔒 User |
| POST | `/:productId` | Ajouter aux favoris | 🔒 User |
| DELETE | `/:productId` | Retirer des favoris | 🔒 User |

### Panier & Commandes (`/api/cart`)

| Méthode | Route | Description | Accès |
|---------|-------|-------------|-------|
| POST | `/checkout` | Valider le panier | 🔒 User |
| GET | `/orders` | Mes commandes | 🔒 User |
| GET | `/orders/:id` | Détail commande | 🔒 User |

### Admin (`/api/admin`)

| Méthode | Route | Description | Accès |
|---------|-------|-------------|-------|
| GET | `/users` | Liste utilisateurs | 🔒👑 Admin |
| DELETE | `/users/:id` | Supprimer utilisateur | 🔒👑 Admin |
| GET | `/orders` | Toutes les commandes | 🔒👑 Admin |
| PUT | `/orders/:id` | Modifier statut commande | 🔒👑 Admin |
| GET | `/stats` | Statistiques globales | 🔒👑 Admin |

---

## 🔐 Authentification

### Inscription
```bash
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Réponse** :
```json
{
  "success": true,
  "message": "Inscription réussie",
  "data": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Connexion
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Utilisation du token
```bash
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 👓 Exemples d'utilisation

### Récupérer tous les produits
```bash
GET /api/products?page=1&limit=10
```

### Filtrer par catégorie et saison
```bash
GET /api/products?category=soleil&season=été
```

### Ajouter un produit aux favoris
```bash
POST /api/favorites/64a1b2c3d4e5f6g7h8i9j0k1
Authorization: Bearer <token>
```

### Valider une commande
```bash
POST /api/cart/checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "64a1b2c3d4e5f6g7h8i9j0k1",
      "quantity": 2,
      "color": "noir",
      "size": "M"
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "street": "123 Rue Example",
    "city": "Paris",
    "postalCode": "75001",
    "country": "France",
    "phone": "+33612345678"
  }
}
```

---

## 🗄️ Modèles de données

### User
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: "user" | "admin",
  favorites: [ProductId],
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  name: String,
  brand: String,
  price: Number,
  category: "vue" | "soleil" | "sport" | "vintage",
  season: "printemps" | "été" | "automne" | "hiver" | "toutes-saisons",
  description: String,
  images: [String],
  colors: [String],
  materials: [String],
  stock: Number,
  isNewArrival: Boolean,
  isFeatured: Boolean,
  isLimitedEdition: Boolean,
  rating: Number,
  reviewsCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  orderNumber: String (unique),
  user: UserId,
  items: [{
    product: ProductId,
    quantity: Number,
    price: Number,
    color: String,
    size: String
  }],
  totalAmount: Number,
  status: "pending" | "validated" | "shipped" | "delivered" | "cancelled",
  paymentStatus: "pending" | "paid" | "failed",
  shippingAddress: Object,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Sécurité

- ✅ Mots de passe hashés avec **bcrypt** (10 rounds)
- ✅ Authentification **JWT** (expire 7 jours)
- ✅ Protection routes avec middlewares
- ✅ **CORS** configuré
- ✅ **Helmet** pour headers sécurisés
- ✅ **Rate limiting** (100 req/15min)
- ✅ Validation des données

---

## 👤 Comptes de test

Après avoir exécuté `npm run seed`, vous aurez accès à :

### Admin
- **Email** : `admin@opticglass.com`
- **Password** : `admin123`
- **Rôle** : admin

### Utilisateur
- **Email** : `user@test.com`
- **Password** : `user123`
- **Rôle** : user

---

## 📊 Données seedées

Le script `npm run seed` crée :
- ✅ **52 produits** de lunettes
- ✅ **50+ marques** différentes
- ✅ **2 utilisateurs** (admin + user)
- ✅ Catégories : vue, soleil, sport, vintage
- ✅ Saisons : printemps, été, automne, hiver, toutes-saisons

---

## 🛠️ Scripts disponibles

```bash
npm start          # Démarrer en production
npm run dev        # Démarrer en développement (nodemon)
npm run seed       # Initialiser la base de données
```

---

## 🐛 Gestion des erreurs

Toutes les erreurs sont gérées de manière cohérente :

```json
{
  "success": false,
  "message": "Description de l'erreur",
  "stack": "..." // Uniquement en développement
}
```

---

## 🚀 Déploiement

### Render / Railway / Heroku

1. Créer un compte MongoDB Atlas
2. Configurer les variables d'environnement
3. Déployer le code
4. Exécuter `npm run seed` une fois

### Variables d'environnement production

```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/optic-glass
JWT_SECRET=secret_production_ultra_securise
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://optic-glass.vercel.app
```

---

## 📝 Notes importantes

- Le paiement est **simulé** (pas de vraie transaction)
- Les commandes sont automatiquement marquées comme "validated" et "paid"
- Le stock est décrémenté automatiquement lors d'une commande
- Les favoris sont liés au compte utilisateur

---

## 🤝 Support

Pour toute question ou problème, consultez la documentation complète dans `/docs/ARCHITECTURE.md`

---

**Backend créé avec ❤️ pour Optic Glass**
