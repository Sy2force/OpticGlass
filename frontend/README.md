# 🕶️ Optic Glass - Frontend React

Frontend React + Vite pour le site e-commerce de lunettes de luxe Optic Glass.

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+
- npm ou yarn
- Backend démarré sur `http://localhost:5000`

### Installation

```bash
cd frontend
npm install
```

### Configuration

Créer un fichier `.env` à la racine du dossier frontend :

```env
VITE_API_URL=http://localhost:5000/api
```

### Démarrage

```bash
# Mode développement
npm run dev

# Build production
npm run build

# Preview production
npm run preview
```

Le frontend démarre sur `http://localhost:5173`

---

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── pages/              # 12 pages React
│   │   ├── Home.jsx
│   │   ├── Auth.jsx
│   │   ├── GlassesPage.jsx
│   │   ├── GlassDetailPage.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── SuccessPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── BrandsPage.jsx
│   │   ├── CategoriesPage.jsx
│   │   └── AdminDashboard.jsx
│   │
│   ├── components/         # Composants réutilisables
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Loader.jsx
│   │
│   ├── context/           # Context API
│   │   └── AuthContext.jsx
│   │
│   ├── router/            # Configuration routing
│   │   └── ProtectedRoute.jsx
│   │
│   ├── services/          # API calls
│   │   └── api.js
│   │
│   ├── App.jsx            # Composant principal
│   └── main.jsx           # Point d'entrée
│
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🗺️ Pages et routes

### Pages publiques (7)
- `/` - Accueil avec hero immersif
- `/auth` - Connexion / Inscription
- `/glasses` - Catalogue complet avec filtres
- `/glasses/:id` - Détail produit
- `/brands` - 50+ marques de luxe
- `/categories` - Catégories (vue, soleil, saisons)

### Pages protégées - Utilisateur (6)
- `/favorites` 🔒 - Liste des favoris
- `/cart` 🔒 - Panier d'achat
- `/checkout` 🔒 - Processus de paiement
- `/success` 🔒 - Confirmation de commande
- `/profile` 🔒 - Profil utilisateur
- `/orders` 🔒 - Historique des commandes

### Pages admin (1)
- `/admin` 🔒👑 - Dashboard administrateur

---

## 🔐 Authentification

### Connexion

L'authentification utilise JWT stocké dans `localStorage`.

```javascript
// Connexion
const { login } = useAuth();
const result = await login(email, password);

// Le token est automatiquement stocké
// et ajouté aux headers Axios
```

### Utilisation du hook useAuth

```javascript
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Bonjour {user.firstName}</p>
      ) : (
        <Link to="/auth">Connexion</Link>
      )}
    </div>
  );
}
```

### Protection des routes

```javascript
<Route
  path="/favorites"
  element={
    <ProtectedRoute>
      <FavoritesPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

---

## 🛒 Gestion du panier

Le panier est stocké dans `localStorage` et synchronisé avec le backend lors du checkout.

### Ajouter au panier

```javascript
const handleAddToCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  cart.push({
    productId: product._id,
    name: product.name,
    price: product.price,
    quantity: 1,
    color: selectedColor,
  });
  
  localStorage.setItem('cart', JSON.stringify(cart));
};
```

### Récupérer le panier

```javascript
const [cart, setCart] = useState([]);

useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
  setCart(savedCart);
}, []);
```

---

## ❤️ Gestion des favoris

Les favoris sont gérés côté backend et nécessitent une authentification.

### Ajouter aux favoris

```javascript
import api from '../services/api';

const handleAddToFavorites = async (productId) => {
  try {
    await api.post(`/favorites/${productId}`);
    // Succès
  } catch (error) {
    console.error('Erreur:', error);
  }
};
```

### Récupérer les favoris

```javascript
const [favorites, setFavorites] = useState([]);

useEffect(() => {
  const fetchFavorites = async () => {
    const response = await api.get('/favorites');
    setFavorites(response.data.data);
  };
  fetchFavorites();
}, []);
```

---

## 🔍 Filtres et recherche

### Filtres disponibles

```javascript
const [filters, setFilters] = useState({
  category: '',      // vue, soleil, sport, vintage
  season: '',        // printemps, été, automne, hiver
  brand: '',         // Ray-Ban, Gucci, etc.
  minPrice: '',      // Prix minimum
  maxPrice: '',      // Prix maximum
});
```

### Appel API avec filtres

```javascript
const fetchProducts = async () => {
  const params = new URLSearchParams({
    page: 1,
    limit: 12,
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '')
    ),
  });

  const response = await api.get(`/products?${params}`);
  setProducts(response.data.data);
};
```

---

## 📦 Processus de commande

### 1. Panier → Checkout

```javascript
// Dans CartPage.jsx
<Link to="/checkout">
  <button>Passer la commande</button>
</Link>
```

### 2. Formulaire de paiement

```javascript
// Dans CheckoutPage.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const items = cart.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    color: item.color,
  }));

  await api.post('/cart/checkout', {
    items,
    shippingAddress: formData,
  });

  localStorage.removeItem('cart');
  navigate('/success');
};
```

### 3. Confirmation

```javascript
// Dans SuccessPage.jsx
<div>
  <h1>✅ Paiement validé !</h1>
  <Link to="/orders">Voir mes commandes</Link>
</div>
```

---

## 🎨 Styling avec Tailwind CSS

### Couleurs personnalisées

```javascript
// tailwind.config.js
colors: {
  ferrari: '#DC0000',
  sky: '#87CEEB',
  luxury: {
    gold: '#D4AF37',
    silver: '#C0C0C0',
  },
}
```

### Classes utilitaires

```jsx
<div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
  <h2 className="text-2xl font-bold mb-4">Titre</h2>
  <p className="text-gray-600">Description</p>
</div>
```

---

## 🔄 Appels API

### Configuration Axios

Le fichier `src/services/api.js` configure automatiquement :
- Base URL : `http://localhost:5000/api`
- Headers avec JWT automatique
- Gestion des erreurs 401 (redirection `/auth`)

### Exemples d'appels

```javascript
import api from '../services/api';

// GET
const response = await api.get('/products');
const products = response.data.data;

// POST
await api.post('/favorites/123456');

// DELETE
await api.delete('/favorites/123456');

// PUT
await api.put('/products/123456', { price: 299 });
```

---

## 📱 Responsive Design

Le site est entièrement responsive avec Tailwind CSS :

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Mobile: 1 colonne */}
  {/* Tablette: 2 colonnes */}
  {/* Desktop: 4 colonnes */}
</div>
```

---

## 🧪 Tests (prévu)

### Test IDs disponibles

```jsx
<div data-testid="product-card">
<button data-testid="add-cart">
<button data-testid="add-fav">
<div data-testid="filter-panel">
<div data-testid="cart-page">
```

---

## 🚀 Déploiement

### Build production local

```bash
npm run build
```

Génère le dossier `dist/` prêt pour le déploiement.

### Déploiement sur Vercel (Recommandé)

**📖 Guide complet** : Voir `VERCEL_DEPLOY.md` pour instructions détaillées

#### Méthode rapide - Interface Web

1. Aller sur [vercel.com/import](https://vercel.com/import)
2. Importer le repository GitHub
3. **Root Directory** : `frontend`
4. **Framework** : `Vite` (auto-détecté)
5. Ajouter la variable d'environnement :
   - `VITE_API_URL` = `https://optic-glass-backend.onrender.com/api`
6. Cliquer sur **Deploy**

#### Méthode CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer depuis frontend/
cd frontend
vercel

# Ajouter variable d'environnement
vercel env add VITE_API_URL
# Entrer: https://optic-glass-backend.onrender.com/api

# Déployer en production
vercel --prod
```

### Variables d'environnement production

Sur Vercel Dashboard → Settings → Environment Variables :

| Variable | Value | Environnement |
|----------|-------|---------------|
| `VITE_API_URL` | `https://optic-glass-backend.onrender.com/api` | Production, Preview, Development |

### Configuration Vercel (`vercel.json`)

Le fichier `vercel.json` est déjà configuré avec :
- ✅ Rewrites pour SPA routing
- ✅ Cache optimisé (assets: 1 an)
- ✅ Headers de sécurité (XSS, clickjacking)

### Déploiement automatique

Vercel redéploie automatiquement à chaque **push** sur `main`.

---

## 🔧 Scripts disponibles

```bash
npm run dev        # Démarrer en développement
npm run build      # Build production
npm run preview    # Preview du build
npm run lint       # Linter ESLint
```

---

## 📝 Fonctionnalités implémentées

### ✅ Authentification
- Inscription / Connexion JWT
- Protection des routes
- Gestion des rôles (user / admin)
- Déconnexion

### ✅ Catalogue produits
- Liste avec pagination
- Filtres (catégorie, saison, marque, prix)
- Recherche
- Détail produit

### ✅ Favoris
- Ajouter / Retirer
- Liste personnelle
- Synchronisation backend

### ✅ Panier
- Ajouter / Modifier quantité
- Supprimer produit
- Calcul total dynamique
- Persistance localStorage

### ✅ Commandes
- Checkout avec formulaire
- Validation paiement simulé
- Historique des commandes
- Détails commande

### ✅ Profil utilisateur
- Affichage informations
- Déconnexion

### ✅ Admin
- Dashboard avec statistiques
- Gestion produits (prévu)
- Gestion utilisateurs (prévu)
- Gestion commandes

---

## 🐛 Résolution de problèmes

### Le frontend ne se connecte pas au backend

Vérifier que :
1. Le backend est démarré sur `http://localhost:5000`
2. Le fichier `.env` contient `VITE_API_URL=http://localhost:5000/api`
3. CORS est configuré dans le backend

### Erreur 401 Non autorisé

Le token JWT a expiré ou est invalide. Se reconnecter.

### Les images ne s'affichent pas

Les URLs d'images dans le seed sont des placeholders. Remplacer par de vraies URLs.

---

## 📚 Technologies utilisées

- **React 19** - Framework UI
- **Vite** - Build tool
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Framer Motion** - Animations (prévu)

---

## 🤝 Intégration avec le backend

Le frontend communique avec le backend via l'API REST :

| Frontend | Backend | Description |
|----------|---------|-------------|
| POST /auth | POST /api/auth/login | Connexion |
| GET /glasses | GET /api/products | Liste produits |
| POST /favorites | POST /api/favorites/:id | Ajouter favori |
| POST /checkout | POST /api/cart/checkout | Valider commande |

---

## 📧 Support

Pour toute question, consulter :
- `ARCHITECTURE.md` - Architecture complète
- `backend/README.md` - Documentation backend

---

**Frontend créé avec ❤️ pour Optic Glass**
