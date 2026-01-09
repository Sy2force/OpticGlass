#!/usr/bin/env python3
"""
Mettre à jour products.js pour utiliser les images locales uploadées
Les 5 images premium de l'utilisateur
"""
import re
import os

# Vérifier que les images existent
images_dir = 'frontend/public/images/products'
required_images = [
    'round-gold.jpg',
    'oversize-black.jpg',
    'square-chain.jpg',
    'modern-blue.jpg',
    'aviator-black.jpg',
]

print("🔍 Vérification des images...")
missing_images = []
for img in required_images:
    img_path = os.path.join(images_dir, img)
    if os.path.exists(img_path):
        print(f"   ✅ {img} trouvée")
    else:
        print(f"   ❌ {img} MANQUANTE")
        missing_images.append(img)

if missing_images:
    print(f"\n⚠️  {len(missing_images)} image(s) manquante(s)!")
    print("📝 Consulte UPLOAD_IMAGES_INSTRUCTIONS.md pour les uploader")
    print("\nContinue quand même avec les images disponibles...")

# Lire le fichier
with open('frontend/src/shared/data/products.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Mapping produits -> images locales
# Utilise les 5 images pour différents styles
product_images = {
    # Round style - utilise round-gold.jpg
    "GG0225S": '/images/products/round-gold.jpg',
    "GG0584O": '/images/products/round-gold.jpg',
    "Round Metal RB3447": 'https://images.ray-ban.com/is/image/RayBan/805289439899__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    "Round Metal": 'https://images.ray-ban.com/is/image/RayBan/8053672357004__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    "DiorEssential": '/images/products/round-gold.jpg',
    "PO0714 Steve McQueen": '/images/products/round-gold.jpg',
    "Erika Metal": '/images/products/round-gold.jpg',
    
    # Oversize style - utilise oversize-black.jpg
    "GG0396S": '/images/products/oversize-black.jpg',
    "VE4361": '/images/products/oversize-black.jpg',
    "FT0009 Whitney": '/images/products/oversize-black.jpg',
    "CH5414": '/images/products/oversize-black.jpg',
    "Medusa Biggie": '/images/products/oversize-black.jpg',
    
    # Luxury avec détails - utilise square-chain.jpg
    "PR 17WS": '/images/products/square-chain.jpg',
    "DiorSoStellaire1": '/images/products/square-chain.jpg',
    "CH5408": '/images/products/square-chain.jpg',
    "SL 181 Lor": '/images/products/square-chain.jpg',
    "VE4394": '/images/products/square-chain.jpg',
    "GG0516S": '/images/products/square-chain.jpg',
    "FT0871 Gia": '/images/products/square-chain.jpg',
    "Cat Eye Vintage": '/images/products/square-chain.jpg',
    
    # Sport/Moderne - utilise modern-blue.jpg
    "GG0435S": '/images/products/modern-blue.jpg',
    "Radar EV Path": '/images/products/modern-blue.jpg',
    "Sutro": '/images/products/modern-blue.jpg',
    "Jawbreaker": '/images/products/modern-blue.jpg',
    "PS 01TS": '/images/products/modern-blue.jpg',
    "PS 05VS": '/images/products/modern-blue.jpg',
    "Flight Jacket": '/images/products/modern-blue.jpg',
    "DiorClub": '/images/products/modern-blue.jpg',
    "SL 1": '/images/products/modern-blue.jpg',
    "Carrera 8035/S": '/images/products/modern-blue.jpg',
    "Champion Racing": '/images/products/modern-blue.jpg',
    
    # Aviator style - utilise aviator-black.jpg
    "GG0061S": '/images/products/aviator-black.jpg',
    "GG0062S": '/images/products/aviator-black.jpg',
    "PR 56VS": '/images/products/aviator-black.jpg',
    "DiorBlackSuit": '/images/products/aviator-black.jpg',
    "DiorSoReal": '/images/products/aviator-black.jpg',
    "FT0821 Gerrard": '/images/products/aviator-black.jpg',
    "VE2150Q": '/images/products/aviator-black.jpg',
    "PO0649": '/images/products/aviator-black.jpg',
    "CH4244": '/images/products/aviator-black.jpg',
    "AR6048": '/images/products/aviator-black.jpg',
    "Carrera 1001/S": '/images/products/aviator-black.jpg',
    "DiorSoStellaire1": '/images/products/aviator-black.jpg',
    
    # Ray-Ban officiels - garder URLs CDN
    "Aviator RB3025": 'https://images.ray-ban.com/is/image/RayBan/805289602057__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    "Wayfarer RB2140": 'https://images.ray-ban.com/is/image/RayBan/805289126577__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    "Clubmaster RB3016": 'https://images.ray-ban.com/is/image/RayBan/805289653653__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    "Erika RB4171": 'https://images.ray-ban.com/is/image/RayBan/805289742463__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    "Clubmaster Classic": 'https://images.ray-ban.com/is/image/RayBan/8056597177887__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    "New Wayfarer": 'https://images.ray-ban.com/is/image/RayBan/805289048527__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    "Hexagonal Flat": 'https://images.ray-ban.com/is/image/RayBan/8056597177730__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    "Aviator Gradient": 'https://images.ray-ban.com/is/image/RayBan/805289305033__STD__shad__qt.png?impolicy=RB_Product&width=1200',
    
    # Wayfarer/Square style - mix des images
    "PR 01OS": '/images/products/aviator-black.jpg',
    "FT0237 Snowdon": '/images/products/oversize-black.jpg',
    "FT0058 Cary": '/images/products/oversize-black.jpg',
    "Holbrook": '/images/products/modern-blue.jpg',
    "Frogskins": '/images/products/modern-blue.jpg',
    "PO3019S": '/images/products/round-gold.jpg',
    "AR8090": '/images/products/oversize-black.jpg',
    "SL 28": '/images/products/oversize-black.jpg',
    "Justin Classic": '/images/products/modern-blue.jpg',
    
    # Optical/Business
    "GG0341O": '/images/products/round-gold.jpg',
    "PR 08YV": '/images/products/oversize-black.jpg',
    "DiorSignature": '/images/products/square-chain.jpg',
    "FT5178": '/images/products/round-gold.jpg',
    "VE3264B": '/images/products/oversize-black.jpg',
    "PO3152V": '/images/products/round-gold.jpg',
    "AR7125": '/images/products/oversize-black.jpg',
    
    # Autres styles
    "PR 14WS": '/images/products/square-chain.jpg',
    "DiorMidnight": '/images/products/square-chain.jpg',
    "Carrera 5003": '/images/products/round-gold.jpg',
}

# Remplacer les images pour chaque produit
updated_count = 0
for product_name, image_url in product_images.items():
    pattern = rf"(name: '{product_name}'.*?images: \[)'[^']*'(\])"
    if re.search(pattern, content, flags=re.DOTALL):
        replacement = rf"\1'{image_url}'\2"
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        updated_count += 1

# Sauvegarder
with open('frontend/src/shared/data/products.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✅ {updated_count} produits mis à jour avec images locales")
print("✅ Ray-Ban : URLs officielles conservées")
print("✅ 5 images premium distribuées sur tous les produits")
print("\n🎉 Tes vraies images sont maintenant intégrées !")
print("🔄 Le serveur va automatiquement les charger")
print("\n💡 Hard refresh recommandé : Cmd + Shift + R")
