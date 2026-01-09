# 🎨 Guide - Génération d'Images AI Premium pour Optic Glass

## 📋 Vue d'ensemble

Ce guide contient tous les prompts AI pour générer des images de lunettes **premium qualité marque de luxe** pour votre site Optic Glass.

---

## 🕶️ PROMPTS PAR CATÉGORIE

### 1. Lunettes de Soleil Premium (Dark Luxury)

**Utilisation** : Homepage, Cards produits, Catalogue principal

```
Luxury sunglasses product photography,
high-end fashion eyewear,
modern elegant frame design,
premium materials (acetate, metal),
studio lighting setup,
soft reflections,
black or dark gradient background,
ultra realistic,
professional product shot,
centered composition,
sharp focus,
high detail,
clean aesthetic,
minimalist style,
commercial e-commerce quality,
4k resolution,
no logo,
no brand,
no text,
no watermark,
no people,
no face,
no hands
```

**Variante - Oversized Luxury** :
```
High-end luxury sunglasses,
designer eyewear style,
oversized fashionable frame,
glossy black finish,
cinematic studio lighting,
subtle shadows,
dark luxury background,
realistic product photography,
premium e-commerce shot,
ultra detailed,
clean composition,
isolated product,
4k,
no logo,
no brand name,
no watermark,
no text
```

---

### 2. Lunettes Modernes / Futuristes (Optic Glass Style)

**Utilisation** : Try-On page, Produits sport/tech

```
Futuristic luxury sunglasses,
modern high-fashion eyewear design,
sleek minimal frame,
glass and metal materials,
studio product photography,
soft neon reflections,
dark premium background,
ultra realistic,
high contrast lighting,
e-commerce product image,
4k resolution,
no logo,
no branding,
no text,
no watermark
```

---

### 3. Lunettes Optiques (Vue / Optical)

**Utilisation** : Page lunettes de vue, Business collection

```
Luxury optical glasses,
modern elegant eyewear frame,
thin metal structure,
premium acetate details,
studio lighting,
white or light gray background,
minimalist product photography,
clean commercial look,
ultra realistic,
sharp focus,
high detail,
4k,
no logo,
no brand,
no text,
no watermark
```

---

### 4. Variantes par Style de Monture

#### Aviator Style
```
Classic aviator sunglasses,
premium metal frame,
double bridge design,
teardrop lens shape,
studio product photography,
dark background,
professional lighting,
ultra realistic,
4k,
no logo,
no brand,
no text
```

#### Wayfarer/Carré
```
Classic square frame sunglasses,
premium acetate material,
bold design,
modern luxury eyewear,
studio photography,
dark background,
sharp focus,
4k,
no logo,
no text
```

#### Round/Vintage
```
Vintage round frame sunglasses,
premium metal construction,
circular lens design,
retro elegant style,
studio product shot,
minimalist background,
4k,
no logo,
no text
```

#### Cat-Eye
```
Luxury cat-eye sunglasses,
feminine elegant design,
premium acetate frame,
upswept corners,
fashion photography,
studio lighting,
dark background,
4k,
no logo,
no text
```

#### Sport/Performance
```
High-performance sport sunglasses,
wraparound design,
modern athletic eyewear,
lightweight frame,
dynamic studio shot,
dark background,
4k,
no logo,
no text
```

---

## 🚫 PROMPT NÉGATIF (Crucial)

**À TOUJOURS inclure** :

```
logo, brand name, ray-ban, gucci, dior, prada, oakley, versace,
text, watermark, signature, face, person, model wearing glasses,
hands, reflection of people, blurry, low quality, distorted,
realistic human, photorealistic person, sunlight, outdoor
```

---

## ⚙️ PARAMÈTRES RECOMMANDÉS

### Pour Midjourney
```
--ar 1:1
--v 6
--style raw
--quality 2
--s 250
```

### Pour DALL-E 3
- **Size** : 1024x1024 ou 1792x1792
- **Quality** : HD
- **Style** : Natural (pour produits)

### Pour Stable Diffusion
- **Resolution** : 1024x1024
- **Steps** : 50+
- **CFG Scale** : 7-8
- **Sampler** : DPM++ 2M Karras

---

## 🎯 UTILISATION PAR PAGE

| Page | Style d'Image | Background |
|------|---------------|------------|
| Homepage | Dark Luxury | Noir/Gradient |
| Catalogue Soleil | Premium Dark | Noir mat |
| Catalogue Vue | Clean Minimal | Blanc/Gris clair |
| Try-On | Futuriste | Dark premium |
| Détail Produit | Ultra Clean | Blanc pur |

---

## 📝 WORKFLOW DE GÉNÉRATION

### Étape 1 : Préparer les prompts
1. Choisir le style (Soleil/Vue/Sport)
2. Adapter la couleur de fond
3. Ajouter le prompt négatif

### Étape 2 : Générer les images
1. Utiliser Midjourney, DALL-E ou Stable Diffusion
2. Générer 2-3 variantes par produit
3. Sélectionner la meilleure

### Étape 3 : Post-traitement (optionnel)
1. Upscale à 2048x2048 si besoin
2. Optimiser pour web (compression)
3. Format : JPG ou WebP

### Étape 4 : Upload et intégration
1. Upload sur un CDN (Cloudinary, Imgur, etc.)
2. Récupérer les URLs
3. Mettre à jour `products.js`

---

## 🔗 SERVICES AI AVEC URLs PUBLIQUES

### Option 1 : Pollinations.ai (Gratuit)
```
https://image.pollinations.ai/prompt/{votre-prompt-encodé}?width=1200&height=1200&seed=42&nologo=true
```

### Option 2 : Lexica.art
- Rechercher images similaires
- Copier URLs directes

### Option 3 : Replicate.com
- API pour Stable Diffusion
- URLs publiques disponibles

---

## 💡 TIPS POUR DE MEILLEURES IMAGES

1. **Consistance** : Utiliser le même seed pour une série
2. **Variété** : Changer légèrement les prompts entre produits
3. **Qualité** : Toujours demander "4k, ultra realistic, professional"
4. **Simplicité** : Fond uni = meilleur résultat
5. **Testing** : Générer plusieurs variantes, choisir la meilleure

---

## 🎨 EXEMPLES DE PROMPTS SPÉCIFIQUES PAR MARQUE

### Style Gucci (Luxury Oversize)
```
Oversized luxury sunglasses, dramatic frame design, premium tortoiseshell acetate,
gold metal accents, high-fashion editorial style, studio photography,
dark elegant background, 4k, no logo, no text
```

### Style Ray-Ban (Classic American)
```
Classic aviator sunglasses, timeless design, premium metal construction,
American heritage style, professional product shot, clean composition,
dark background, 4k, no logo, no text
```

### Style Prada (Modern Geometric)
```
Modern geometric sunglasses, architectural frame design, premium materials,
Italian luxury eyewear, minimalist aesthetic, studio photography,
dark background, 4k, no logo, no text
```

### Style Oakley (Sport Performance)
```
High-performance sport sunglasses, aerodynamic design, wraparound frame,
athletic eyewear, technical precision, dynamic studio shot,
dark background, 4k, no logo, no text
```

---

## ✅ CHECKLIST AVANT UPLOAD

- [ ] Résolution minimum 1200x1200
- [ ] Fond approprié (noir pour soleil, blanc pour vue)
- [ ] Aucun logo visible
- [ ] Aucun texte/watermark
- [ ] Composition centrée
- [ ] Focus net sur le produit
- [ ] Format optimisé (JPG/WebP)
- [ ] URL publique testée

---

## 🚀 PROCHAINES ÉTAPES

1. Générer 10-15 images de test
2. Intégrer dans products.js
3. Tester affichage sur site
4. Générer images pour tous les produits restants
5. Optimiser temps de chargement

---

**Note** : Ce guide garantit des images **qualité marque de luxe** sans risque légal, parfaites pour ton site Optic Glass ! 🎉
