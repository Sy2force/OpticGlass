#!/bin/bash

# 🔍 Script de vérification pré-déploiement Vercel - Optic Glass
# Ce script vérifie que tout est prêt pour le déploiement

echo "🔍 Vérification du déploiement Optic Glass..."
echo ""

# Couleurs pour affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# 1. Vérifier que nous sommes dans le bon dossier
echo "📁 Vérification du dossier..."
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: package.json non trouvé. Êtes-vous dans le dossier frontend/?${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dossier frontend détecté${NC}"
echo ""

# 2. Vérifier les dépendances
echo "📦 Vérification des dépendances..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules manquant. Installation en cours...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur lors de l'installation des dépendances${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✅ Dépendances installées${NC}"
echo ""

# 3. Vérifier que recharts est installé
echo "📊 Vérification de recharts..."
if ! grep -q '"recharts"' package.json; then
    echo -e "${RED}❌ recharts manquant dans package.json${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ recharts présent${NC}"
fi
echo ""

# 4. Vérifier vercel.json
echo "⚙️  Vérification de vercel.json..."
if [ ! -f "vercel.json" ]; then
    echo -e "${RED}❌ vercel.json manquant${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ vercel.json présent${NC}"
    # Vérifier le contenu
    if grep -q "rewrites" vercel.json && grep -q "headers" vercel.json; then
        echo -e "${GREEN}✅ Configuration rewrites et headers OK${NC}"
    else
        echo -e "${YELLOW}⚠️  vercel.json incomplet${NC}"
    fi
fi
echo ""

# 5. Vérifier .env.example
echo "🔐 Vérification des variables d'environnement..."
if [ ! -f ".env.example" ]; then
    echo -e "${RED}❌ .env.example manquant${NC}"
    ERRORS=$((ERRORS + 1))
else
    if grep -q "VITE_API_URL" .env.example; then
        echo -e "${GREEN}✅ .env.example avec VITE_API_URL${NC}"
    else
        echo -e "${RED}❌ VITE_API_URL manquant dans .env.example${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi
echo ""

# 6. Vérifier index.html
echo "📄 Vérification de index.html..."
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ index.html manquant${NC}"
    ERRORS=$((ERRORS + 1))
else
    # Vérifier les meta tags
    if grep -q "og:title" index.html && grep -q "twitter:card" index.html; then
        echo -e "${GREEN}✅ Meta tags SEO présents${NC}"
    else
        echo -e "${YELLOW}⚠️  Meta tags SEO incomplets${NC}"
    fi
fi
echo ""

# 7. Vérifier favicon
echo "🎨 Vérification du favicon..."
if [ -f "public/favicon.svg" ]; then
    echo -e "${GREEN}✅ favicon.svg présent${NC}"
else
    echo -e "${YELLOW}⚠️  favicon.svg manquant${NC}"
fi
echo ""

# 8. Test du build
echo "🏗️  Test du build de production..."
npm run build > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erreur lors du build${NC}"
    echo "Lancement du build avec logs pour diagnostic..."
    npm run build
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ Build réussi${NC}"
    
    # Vérifier dist/
    if [ -d "dist" ]; then
        echo -e "${GREEN}✅ Dossier dist/ créé${NC}"
        
        # Vérifier les fichiers générés
        if [ -f "dist/index.html" ]; then
            echo -e "${GREEN}✅ dist/index.html présent${NC}"
        fi
        
        if [ -d "dist/assets" ]; then
            ASSET_COUNT=$(ls -1 dist/assets | wc -l)
            echo -e "${GREEN}✅ Assets générés ($ASSET_COUNT fichiers)${NC}"
        fi
    fi
fi
echo ""

# 9. Vérifier la documentation
echo "📚 Vérification de la documentation..."
DOCS=("README.md" "VERCEL_DEPLOY.md" "DEPLOY_CHECKLIST.md")
for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✅ $doc présent${NC}"
    else
        echo -e "${YELLOW}⚠️  $doc manquant${NC}"
    fi
done
echo ""

# 10. Résumé
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Toutes les vérifications sont passées!${NC}"
    echo ""
    echo "🚀 Vous êtes prêt pour le déploiement Vercel!"
    echo ""
    echo "Prochaines étapes:"
    echo "  1. Pusher le code sur GitHub"
    echo "  2. Aller sur https://vercel.com/import"
    echo "  3. Importer le repository"
    echo "  4. Root Directory: frontend"
    echo "  5. Ajouter VITE_API_URL dans les variables d'environnement"
    echo "  6. Deploy!"
    echo ""
    exit 0
else
    echo -e "${RED}❌ $ERRORS erreur(s) détectée(s)${NC}"
    echo ""
    echo "Veuillez corriger les erreurs avant de déployer."
    echo ""
    exit 1
fi
