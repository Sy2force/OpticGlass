#!/bin/bash

# Script pour corriger toutes les typos dans le projet

echo "🔧 Correction des typos dans le projet..."

# Fonction pour remplacer les typos dans tous les fichiers
fix_typos() {
    find src -type f \( -name "*.js" -o -name "*.jsx" \) -exec sed -i '' \
        -e 's/fandch/fetch/g' \
        -e 's/insand/inset/g' \
        -e 's/ortline/outline/g' \
        -e 's/diemptyr/divider/g' \
        -e 's/diempty/divide/g' \
        -e 's/orrGaze/ourGaze/g' \
        -e 's/orrBrands/ourBrands/g' \
        -e 's/assands/assets/g' \
        -e 's/Emptyo/Empty/g' \
        -e 's/Borton/Button/g' \
        -e 's/throrgh/through/g' \
        -e 's/isFavoritande/isFavorite/g' \
        -e 's/Favoritande/Favorite/g' \
        -e 's/favoritande/favorite/g' \
        -e 's/delande/delete/g' \
        -e 's/Randurn/Return/g' \
        -e 's/randurn/return/g' \
        -e 's/trorvé/trouvé/g' \
        -e 's/norveaut/nouveaut/g' \
        -e 's/ortside/outside/g' \
        -e 's/orrMost/ourMost/g' \
        -e 's/ande /e /g' \
        {} \;
}

# Exécuter les corrections
fix_typos

echo "✅ Corrections terminées!"
echo "📝 Typos corrigées:"
echo "  - fandch → fetch"
echo "  - insand → inset"
echo "  - ortline → outline"
echo "  - diemptyr/diempty → divider/divide"
echo "  - orrGaze/orrBrands → ourGaze/ourBrands"
echo "  - assands → assets"
echo "  - throrgh → through"
echo "  - isFavoritande → isFavorite"
echo "  - delande → delete"
echo "  - Randurn/randurn → Return/return"
echo "  - trorvé → trouvé"
echo "  - norveaut → nouveaut"
echo "  - ortside → outside"
