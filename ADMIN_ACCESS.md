# 🔐 Accès Admin - Optic Glass

## 👤 Compte Administrateur

**Email** : `shayaco@gmail.com`  
**Mot de passe** : `Qwerty2121@`

---

## 🛡️ Pages Protégées Admin

Les pages suivantes nécessitent une connexion en tant qu'administrateur :

### `/admin` - Dashboard Principal
- Vue d'ensemble des statistiques
- Gestion utilisateurs, commandes, produits
- Analytics

### `/admin/analytics` - Analytics Avancées
- Graphiques de performance
- Statistiques détaillées

### `/admin/images` - Gestion des Images
- **Upload manuel d'images produits**
- Liste de tous les produits sans images
- Bouton "Télécharger Image" pour chaque produit
- Stats en temps réel

---

## 🚀 Comment Accéder

### Étape 1 : Se Connecter

1. Va sur : `http://localhost:3006/auth`
2. Entre l'email : `shayaco@gmail.com`
3. Entre le mot de passe : `Qwerty2121@`
4. Clique sur "Se connecter"

### Étape 2 : Accéder à la Gestion des Images

**Option A** : Via le Dashboard
1. Va sur : `http://localhost:3006/admin`
2. Clique sur le bouton doré **"📸 Gérer les Images"** dans le menu latéral

**Option B** : Direct
- Va directement sur : `http://localhost:3006/admin/images`

---

## 🔒 Sécurité

### Protection Active

✅ **ProtectedRoute** : Vérifie l'authentification  
✅ **adminOnly** : Vérifie le rôle administrateur  
✅ **Redirection automatique** : Si non-admin → page d'accueil

### Tentative d'Accès Non-Autorisé

Si un utilisateur normal essaie d'accéder à `/admin/images` :
- ❌ Redirection vers `/` (homepage)
- ❌ Aucun accès aux fonctionnalités admin

---

## 📝 Notes Importantes

1. **Seul le compte admin peut uploader des images**
2. **Les utilisateurs normaux ne voient même pas le menu admin**
3. **La protection est appliquée côté frontend ET backend**
4. **Session persistante** : Reste connecté tant que tu ne te déconnectes pas

---

## ✅ Résumé Rapide

**Pour uploader des images** :
1. Connecte-toi avec `shayaco@gmail.com` / `Qwerty2121@`
2. Va sur `http://localhost:3006/admin/images`
3. Clique sur "Télécharger Image" pour chaque produit
4. Sélectionne l'image depuis ton ordinateur

**C'est tout !** 🎉

---

## 🔧 En Cas de Problème

**Erreur "Non autorisé"** :
- Vérifie que tu es connecté avec le bon email
- Vérifie que le compte a le rôle `admin` dans la base de données

**Page blanche** :
- Ouvre la console du navigateur (F12)
- Vérifie les erreurs éventuelles

**Upload ne fonctionne pas** :
- C'est normal, c'est en mode simulation pour l'instant
- Il faudrait un backend d'upload pour la version production
