# 📸 Comment Ajouter Tes 5 Images Premium

## ⚠️ Information Importante

Les images que tu as uploadées via l'interface sont **temporaires** et je ne peux pas les copier automatiquement.

**Voici comment les ajouter manuellement** (très simple, 2 minutes) :

---

## 🎯 Méthode Simple (Recommandée)

### Étape 1 : Prépare tes 5 images

Tes 5 images sont probablement dans :
- **Downloads** : `~/Downloads/`
- **Desktop** : `~/Desktop/`
- **Screenshots** : Elles apparaissent temporairement quand tu les upload

### Étape 2 : Renomme-les

Renomme tes 5 images comme ceci :

| Ta Photo | Nouveau Nom |
|----------|-------------|
| 🟡 Lunettes rondes gold | `round-gold.jpg` |
| ⬛ Lunettes oversize noires | `oversize-black.jpg` |
| ⛓️ Lunettes carrées avec chaîne | `square-chain.jpg` |
| 🔵 Lunettes semi-rimless bleues | `modern-blue.jpg` |
| ✈️ Lunettes aviator noires | `aviator-black.jpg` |

### Étape 3 : Copie dans le dossier

**Via Terminal** :
```bash
# Va dans le dossier images
cd "/Users/shayacoca/Optic Glass/frontend/public/images/products/"

# Copie tes images depuis où elles sont
# (Change ~/Downloads/ par le bon chemin)
cp ~/Downloads/image1.jpg round-gold.jpg
cp ~/Downloads/image2.jpg oversize-black.jpg
cp ~/Downloads/image3.jpg square-chain.jpg
cp ~/Downloads/image4.jpg modern-blue.jpg
cp ~/Downloads/image5.jpg aviator-black.jpg
```

**Via Finder (plus simple)** :
1. Ouvre Finder
2. Va dans : `Optic Glass/frontend/public/images/products/`
3. **Glisse-dépose** tes 5 images
4. **Renomme-les** selon le tableau ci-dessus

### Étape 4 : Lance le script d'intégration

```bash
cd "/Users/shayacoca/Optic Glass"
python3 use_local_images.py
```

### Étape 5 : Vérifie le résultat

Le serveur va automatiquement recharger.
Ouvre : `http://localhost:3006`

**Hard refresh** : `Cmd + Shift + R`

---

## ✅ Vérification Rapide

Pour vérifier que les images sont bien copiées :

```bash
ls -la frontend/public/images/products/
```

Tu dois voir :
```
round-gold.jpg
oversize-black.jpg
square-chain.jpg
modern-blue.jpg
aviator-black.jpg
```

---

## 🎨 Ce Qui Va Se Passer

Le script `use_local_images.py` va :

1. **Détecter** les 5 images dans le dossier
2. **Distribuer** intelligemment sur 60+ produits :
   - `round-gold.jpg` → Produits rond/vintage (Persol, Prada round)
   - `oversize-black.jpg` → Produits oversize (Gucci, Versace)
   - `square-chain.jpg` → Produits luxury détaillés (Chanel, Dior)
   - `modern-blue.jpg` → Produits sport/moderne (Oakley, sport)
   - `aviator-black.jpg` → Produits aviator (Dior, Tom Ford)
3. **Garder** les URLs officielles Ray-Ban

---

## 🚀 Résultat Final

**70 produits** avec images :
- **5 images premium** (tes vraies photos) → 60 produits
- **10 images Ray-Ban** (URLs officielles CDN) → 10 produits

**Qualité** : TES vraies images de lunettes ! 🎉

---

## ❓ Problème ?

**Les images ne s'affichent pas** :
```bash
# Vérifie les permissions
chmod 644 frontend/public/images/products/*.jpg

# Relance le serveur
pkill -9 -f "vite"
cd frontend && npm run dev
```

**Tu ne trouves pas tes images** :
```bash
# Cherche les images récentes
find ~/Downloads ~/Desktop -name "*.jpg" -o -name "*.png" | head -20
```

---

## 💡 Alternative Rapide

Si tu ne trouves plus les images, **re-upload-les** via Cascade et je trouverai une autre solution !
