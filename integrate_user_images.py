#!/usr/bin/env python3
"""
Intégrer les 5 images utilisateur dans products.js
Script ultra-rapide - attend que les images soient copiées
"""
import re
import os

# Images attendues
images_dir = 'frontend/public/images/products'
user_images = {
    'steampunk-round.jpg': 'Lunettes rondes steampunk avec protections',
    'clubmaster-classic.jpg': 'Clubmaster tortoise + gold',
    'aviator-orange.jpg': 'Aviator verres orange gradient',
    'lifestyle-aviator.jpg': 'Photo lifestyle avec lunettes',
    'aviators-premium.jpg': '3 aviators sur fond noir'
}

print("🔍 Vérification des images utilisateur...")
found_images = []
missing_images = []

for img, desc in user_images.items():
    img_path = os.path.join(images_dir, img)
    if os.path.exists(img_path):
        size = os.path.getsize(img_path)
        print(f"   ✅ {img} ({size} bytes) - {desc}")
        found_images.append(img)
    else:
        print(f"   ❌ {img} MANQUANTE - {desc}")
        missing_images.append(img)

if len(found_images) == 0:
    print("\n⚠️  AUCUNE image trouvée!")
    print("📝 Consulte COPIE_TES_5_IMAGES_ICI.md")
    print("\n💡 Copie tes 5 images et relance ce script")
    exit(1)

if missing_images:
    print(f"\n⚠️  {len(missing_images)} image(s) manquante(s)")
    print(f"✅ {len(found_images)} image(s) trouvée(s) - Je continue avec celles-ci\n")
else:
    print(f"\n✅ Toutes les 5 images sont présentes! 🎉\n")

# Lire products.js
with open('frontend/src/shared/data/products.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Mapping produits -> images utilisateur
product_mapping = {
    # Steampunk round - style vintage/rond unique
    "GG0225S": '/images/products/steampunk-round.jpg',
    "Round Metal RB3447": '/images/products/steampunk-round.jpg',
    "PO0714 Steve McQueen": '/images/products/steampunk-round.jpg',
    "DiorEssential": '/images/products/steampunk-round.jpg',
    "Carrera 5003": '/images/products/steampunk-round.jpg',
    
    # Clubmaster/Browline - style classique
    "Clubmaster RB3016": '/images/products/clubmaster-classic.jpg',
    "Clubmaster Classic": '/images/products/clubmaster-classic.jpg',
    "PR 01OS": '/images/products/clubmaster-classic.jpg',
    "FT0237 Snowdon": '/images/products/clubmaster-classic.jpg',
    "PO3019S": '/images/products/clubmaster-classic.jpg',
    
    # Aviator orange gradient - style vintage/classique
    "Aviator RB3025": '/images/products/aviator-orange.jpg',
    "Aviator Gradient": '/images/products/aviator-orange.jpg',
    "GG0061S": '/images/products/aviator-orange.jpg',
    "GG0062S": '/images/products/aviator-orange.jpg',
    "PR 56VS": '/images/products/aviator-orange.jpg',
    "DiorBlackSuit": '/images/products/aviator-orange.jpg',
    "VE2150Q": '/images/products/aviator-orange.jpg',
    "PO0649": '/images/products/aviator-orange.jpg',
    "CH4244": '/images/products/aviator-orange.jpg',
    "AR6048": '/images/products/aviator-orange.jpg',
    "Carrera 1001/S": '/images/products/aviator-orange.jpg',
    "DiorSoStellaire1": '/images/products/aviator-orange.jpg',
    
    # Aviators premium (3 paires) - pour produits haut de gamme
    "GG0396S": '/images/products/aviators-premium.jpg',
    "DiorSoReal": '/images/products/aviators-premium.jpg',
    "FT0821 Gerrard": '/images/products/aviators-premium.jpg',
    "VE4361": '/images/products/aviators-premium.jpg',
    "Medusa Biggie": '/images/products/aviators-premium.jpg',
    "FT0009 Whitney": '/images/products/aviators-premium.jpg',
    
    # Lifestyle (avec personnes) - pour homepage/marketing
    # Note: Image avec visages, à utiliser avec parcimonie
    
    # Wayfarer/Square styles - distribution sur autres images
    "Wayfarer RB2140": '/images/products/clubmaster-classic.jpg',
    "New Wayfarer": '/images/products/clubmaster-classic.jpg',
    "Holbrook": '/images/products/clubmaster-classic.jpg',
    "Frogskins": '/images/products/clubmaster-classic.jpg',
    
    # Cat-eye/Oversize - utilise aviators premium
    "GG0516S": '/images/products/aviators-premium.jpg',
    "VE4394": '/images/products/aviators-premium.jpg',
    "CH5408": '/images/products/aviators-premium.jpg',
    "SL 181 Lor": '/images/products/aviators-premium.jpg',
    "FT0871 Gia": '/images/products/aviators-premium.jpg',
    "Cat Eye Vintage": '/images/products/aviators-premium.jpg',
    
    # Sport/Moderne - utilise steampunk pour le côté technique
    "GG0435S": '/images/products/steampunk-round.jpg',
    "Radar EV Path": '/images/products/steampunk-round.jpg',
    "Sutro": '/images/products/steampunk-round.jpg',
    "Jawbreaker": '/images/products/steampunk-round.jpg',
    "PS 01TS": '/images/products/steampunk-round.jpg',
    "PS 05VS": '/images/products/steampunk-round.jpg',
    "Flight Jacket": '/images/products/steampunk-round.jpg',
    
    # Optical/Business - clubmaster classic
    "GG0341O": '/images/products/clubmaster-classic.jpg',
    "PR 08YV": '/images/products/clubmaster-classic.jpg',
    "DiorSignature": '/images/products/clubmaster-classic.jpg',
    "FT5178": '/images/products/clubmaster-classic.jpg',
    "VE3264B": '/images/products/clubmaster-classic.jpg',
    "PO3152V": '/images/products/clubmaster-classic.jpg',
    "AR7125": '/images/products/clubmaster-classic.jpg',
    
    # Autres produits - distribution intelligente
    "PR 17WS": '/images/products/aviators-premium.jpg',
    "PR 14WS": '/images/products/aviators-premium.jpg',
    "DiorMidnight": '/images/products/aviators-premium.jpg',
    "DiorClub": '/images/products/steampunk-round.jpg',
    "SL 1": '/images/products/steampunk-round.jpg',
    "SL 28": '/images/products/clubmaster-classic.jpg',
    "AR8090": '/images/products/clubmaster-classic.jpg',
    "Justin Classic": '/images/products/clubmaster-classic.jpg',
    "Erika Metal": '/images/products/steampunk-round.jpg',
    "GG0584O": '/images/products/steampunk-round.jpg',
    "CH5414": '/images/products/aviators-premium.jpg',
    "Carrera 8035/S": '/images/products/steampunk-round.jpg',
    "Champion Racing": '/images/products/steampunk-round.jpg',
    
    # Ray-Ban officiels - garder certaines URLs CDN
    "Erika RB4171": 'https://images.ray-ban.com/is/image/RayBan/805289742463__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    "Hexagonal Flat": 'https://images.ray-ban.com/is/image/RayBan/8056597177730__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    "Round Metal": 'https://images.ray-ban.com/is/image/RayBan/8053672357004__STD__shad__qt.png?impolicy=RB_Product&width=1200',
}

# Filtrer seulement les images qui existent
active_mapping = {}
for product, img_path in product_mapping.items():
    if img_path.startswith('http'):
        active_mapping[product] = img_path
    else:
        img_name = img_path.split('/')[-1]
        if img_name in found_images:
            active_mapping[product] = img_path

# Remplacer les images
updated_count = 0
for product_name, image_url in active_mapping.items():
    pattern = rf"(name: '{product_name}'.*?images: \[)'[^']*'(\])"
    if re.search(pattern, content, flags=re.DOTALL):
        replacement = rf"\1'{image_url}'\2"
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        updated_count += 1

# Sauvegarder
with open('frontend/src/shared/data/products.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ {updated_count} produits mis à jour avec TES images!")
print(f"✅ {len(found_images)}/5 images intégrées")
print("\n🎉 TES VRAIES PHOTOS sont maintenant sur le site!")
print("🔄 Le serveur va automatiquement recharger")
print("\n💡 Ouvre http://localhost:3006 et fais Cmd+Shift+R")
