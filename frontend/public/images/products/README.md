# Images de Produits Optic Glass

## 📸 Images Premium Uploadées

Ce dossier contient les images premium de lunettes pour le site Optic Glass.

### 5 Images à Uploader

**Les 5 images que tu as uploadées doivent être placées ici** :

1. **round-gold.jpg** - Lunettes rondes gold/rose gold avec lentilles noires (style vintage)
2. **oversize-black.jpg** - Lunettes oversize noires (style glamour)
3. **square-chain.jpg** - Lunettes carrées avec chaîne luxury
4. **modern-blue.jpg** - Lunettes semi-rimless noires/bleues (style moderne)
5. **aviator-black.jpg** - Lunettes aviator noires (style classique)

---

## 📁 Comment Ajouter les Images

### Méthode 1 : Copier manuellement
```bash
# Les images sont temporairement dans ton système
# Copie-les dans ce dossier:
cp /path/to/image1.jpg /Users/shayacoca/Optic\ Glass/frontend/public/images/products/round-gold.jpg
cp /path/to/image2.jpg /Users/shayacoca/Optic\ Glass/frontend/public/images/products/oversize-black.jpg
cp /path/to/image3.jpg /Users/shayacoca/Optic\ Glass/frontend/public/images/products/square-chain.jpg
cp /path/to/image4.jpg /Users/shayacoca/Optic\ Glass/frontend/public/images/products/modern-blue.jpg
cp /path/to/image5.jpg /Users/shayacoca/Optic\ Glass/frontend/public/images/products/aviator-black.jpg
```

### Méthode 2 : Drag & Drop
1. Ouvre le dossier `frontend/public/images/products` dans Finder
2. Glisse-dépose les 5 images depuis ton Desktop/Downloads
3. Renomme-les selon les noms ci-dessus

---

## 🎨 Utilisation dans le Code

Les images seront accessibles via:
```javascript
images: ['/images/products/round-gold.jpg']
```

---

## ✅ Vérification

Après avoir copié les images, vérifie qu'elles sont présentes:
```bash
ls -la frontend/public/images/products/
```

Tu devrais voir:
- round-gold.jpg
- oversize-black.jpg
- square-chain.jpg
- modern-blue.jpg
- aviator-black.jpg
