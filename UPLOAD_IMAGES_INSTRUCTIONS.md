# 📸 Instructions - Upload des 5 Images Premium

## 🎯 Objectif

Tu as uploadé 5 images premium de lunettes. Ce guide explique comment les intégrer dans le site.

---

## 📋 Étapes Rapides

### 1. Localiser les Images Uploadées

Les images sont probablement dans:
- **macOS**: `~/Desktop/` ou `~/Downloads/` ou dans le dossier de screenshots temporaires
- Cherche les 5 images récentes (lunettes rondes gold, oversize noires, etc.)

### 2. Copier les Images dans le Projet

**Destination** : `/Users/shayacoca/Optic Glass/frontend/public/images/products/`

**Noms à donner** :
1. Image lunettes rondes gold → `round-gold.jpg`
2. Image lunettes oversize noires → `oversize-black.jpg`
3. Image lunettes carrées avec chaîne → `square-chain.jpg`
4. Image lunettes modernes bleues → `modern-blue.jpg`
5. Image lunettes aviator noires → `aviator-black.jpg`

**Commandes Terminal** :
```bash
# Aller dans le dossier images
cd /Users/shayacoca/Optic\ Glass/frontend/public/images/products/

# Exemple si tes images sont sur le Desktop
cp ~/Desktop/image1.jpg round-gold.jpg
cp ~/Desktop/image2.jpg oversize-black.jpg
cp ~/Desktop/image3.jpg square-chain.jpg
cp ~/Desktop/image4.jpg modern-blue.jpg
cp ~/Desktop/image5.jpg aviator-black.jpg
```

**Ou via Finder** :
1. Ouvre le Finder
2. Va dans `Optic Glass/frontend/public/images/products/`
3. Glisse-dépose les 5 images
4. Renomme-les selon les noms ci-dessus

### 3. Vérifier les Images

```bash
ls -la frontend/public/images/products/
```

Tu devrais voir les 5 fichiers.

### 4. Mettre à Jour products.js

Je vais créer un script qui met à jour automatiquement `products.js` pour utiliser ces images locales.

```bash
python3 use_local_images.py
```

### 5. Redémarrer le Serveur

Le serveur va automatiquement détecter les nouvelles images.

---

## 🎨 Mapping Images → Produits

| Image | Nom Fichier | Utilisé Pour |
|-------|-------------|--------------|
| Rondes gold | round-gold.jpg | Produits rond/vintage style Persol, Prada |
| Oversize noires | oversize-black.jpg | Produits oversize style Gucci, Versace |
| Carrées chaîne | square-chain.jpg | Produits luxury avec détails style Chanel |
| Modernes bleues | modern-blue.jpg | Produits sport/moderne style Oakley |
| Aviator noires | aviator-black.jpg | Produits aviator style Ray-Ban, Dior |

---

## ⚡ Script Automatique (je vais créer)

Je vais créer `use_local_images.py` qui:
1. Détecte les 5 images dans `frontend/public/images/products/`
2. Met à jour `products.js` pour les utiliser
3. Assign les bonnes images aux bons produits selon leur style

---

## 🔧 Dépannage

**Images ne s'affichent pas** :
- Vérifie que les noms sont exacts (pas d'espaces, minuscules)
- Vérifie que les images sont bien dans `frontend/public/images/products/`
- Hard refresh : `Cmd + Shift + R`

**Permissions** :
```bash
chmod 644 frontend/public/images/products/*.jpg
```

---

## ✅ Résultat Final

Après ces étapes, ton site utilisera **TES VRAIES IMAGES** au lieu des images génériques ! 🎉
