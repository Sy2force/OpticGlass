import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const brands = [
  'Ray-Ban', 'Oakley', 'Gucci', 'Prada', 'Dior', 'Tom Ford', 'Persol', 
  'Cartier', 'Chanel', 'Versace', 'Burberry', 'Dolce & Gabbana', 
  'Saint Laurent', 'Fendi', 'Armani', 'Maui Jim', 'Oliver Peoples',
  'Moscot', 'Warby Parker', 'Gentle Monster', 'Linda Farrow', 'Mykita',
  'Cutler and Gross', 'Jacques Marie Mage', 'Garrett Leight', 'Barton Perreira',
  'Thom Browne', 'Celine', 'Balenciaga', 'Bottega Veneta', 'Givenchy',
  'Valentino', 'Miu Miu', 'Alexander McQueen', 'Stella McCartney', 'Bulgari',
  'Chopard', 'Montblanc', 'Tiffany & Co', 'David Beckham', 'Police',
  'Carrera', 'Polaroid', 'Vogue', 'Ralph Lauren', 'Michael Kors',
  'Coach', 'Kate Spade', 'Marc Jacobs', 'Jimmy Choo', 'Salvatore Ferragamo'
];

const glassesImages = [
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
  'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800',
  'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800',
  'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800',
  'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800',
  'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800',
  'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800',
  'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800',
  'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=800',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
  'https://images.unsplash.com/photo-1619859515117-f1dd8c0e5b3c?w=800',
  'https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=800',
  'https://images.unsplash.com/photo-1625591340248-f8b1f7f0e3a5?w=800',
  'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=800',
  'https://images.unsplash.com/photo-1533139143976-30918502365b?w=800',
  'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800',
  'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800',
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800',
];

const generateProducts = () => {
  const products = [];
  const categories = ['vue', 'soleil', 'sport', 'vintage'];
  const seasons = ['printemps', 'été', 'automne', 'hiver', 'toutes-saisons'];
  const colors = ['noir', 'écaille', 'doré', 'argenté', 'bleu', 'rouge', 'vert', 'rose', 'blanc', 'havane', 'marron', 'gris'];
  const materials = ['acétate', 'métal', 'titane', 'acétate italien', 'acétate japonais', 'or 18k', 'aluminium', 'carbone'];

  const productNames = [
    'Aviator Classic', 'Wayfarer Original', 'Clubmaster', 'Round Metal', 'Hexagonal',
    'Caravan', 'Erika', 'Justin', 'Meteor', 'Nomad', 'Olympian', 'Outdoorsman',
    'State Street', 'Blaze', 'Chromance', 'Ferrari Edition', 'Scuderia', 'Polarized Sport',
    'Cat Eye Deluxe', 'Oversized Glam', 'Vintage Square', 'Retro Round', 'Pilot Elite',
    'Navigator Pro', 'Wrap Around', 'Shield Sport', 'Butterfly Luxe', 'Rectangle Classic',
    'Geometric Modern', 'Rimless Elegant', 'Half Rim Pro', 'Browline Vintage', 'Panto Classic',
    'Clubround Elite', 'Octagonal Gold', 'Oval Vintage', 'Square Bold', 'D-Frame Luxe',
    'Keyhole Bridge', 'Double Bridge Pro', 'Flat Top', 'Flip Up Sport', 'Folding Travel',
    'Clip On Pro', 'Magnetic Elite', 'Photochromic Pro', 'Gradient Lens', 'Mirror Lens Sport',
    'Polarized Pro Max', 'UV Protection Elite', 'Blue Light Shield', 'Transition Pro', 'Sport Wrap Elite',
    'Signature Collection', 'Limited Edition', 'Heritage Classic', 'Modern Icon', 'Timeless Elegance',
    'Urban Style', 'Beach Vibes', 'Mountain Sport', 'City Chic', 'Runway Collection',
    'Artisan Craft', 'Precision Fit', 'Comfort Plus', 'Ultra Light', 'Bold Statement',
    'Minimalist Design', 'Retro Revival', 'Future Vision', 'Classic Noir', 'Golden Hour',
    'Sunset Drive', 'Ocean Blue', 'Forest Green', 'Desert Sand', 'Midnight Black',
    'Crystal Clear', 'Rose Gold', 'Silver Moon', 'Bronze Age', 'Copper Tone',
    'Platinum Elite', 'Diamond Cut', 'Pearl Finish', 'Matte Black', 'Glossy Tortoise',
    'Transparent Frame', 'Two-Tone Design', 'Gradient Frame', 'Textured Finish', 'Smooth Acetate',
    'Titanium Pro', 'Carbon Fiber', 'Wood Accent', 'Leather Detail', 'Metal Mesh',
    'Vintage Inspired', 'Contemporary Art', 'Geometric Pattern', 'Abstract Design', 'Nature Collection'
  ];

  const descriptions = [
    'Lunettes de luxe avec finitions haut de gamme. Verres de qualité optique supérieure.',
    'Design iconique revisité avec des matériaux premium. Confort exceptionnel.',
    'Collection exclusive alliant tradition et modernité. Fabrication artisanale.',
    'Style intemporel avec une touche contemporaine. Protection UV maximale.',
    'Élégance raffinée pour un look sophistiqué. Légèreté et durabilité.',
    'Performance et style réunis. Idéal pour un usage quotidien.',
    'Création unique inspirée des tendances actuelles. Qualité irréprochable.',
    'Monture ergonomique pour un confort optimal. Design avant-gardiste.',
  ];

  for (let i = 0; i < 100; i++) {
    const brand = brands[i % brands.length];
    const category = categories[i % categories.length];
    const season = seasons[i % seasons.length];
    const name = `${productNames[i % productNames.length]}`;
    
    const basePrice = Math.floor(Math.random() * 800) + 150;
    const stock = Math.floor(Math.random() * 50) + 5;
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
    const reviewsCount = Math.floor(Math.random() * 500) + 20;

    products.push({
      name,
      brand,
      price: basePrice,
      category,
      season,
      description: `${descriptions[i % descriptions.length]} ${brand} - Collection ${season === 'toutes-saisons' ? 'intemporelle' : season}.`,
      images: [glassesImages[i % glassesImages.length], glassesImages[(i + 1) % glassesImages.length]],
      colors: [colors[i % colors.length], colors[(i + 3) % colors.length]],
      materials: [materials[i % materials.length]],
      stock,
      isNewArrival: i < 15,
      isFeatured: i % 4 === 0,
      isLimitedEdition: i % 7 === 0,
      rating: parseFloat(rating),
      reviewsCount
    });
  }

  return products;
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Suppression des données existantes...');
    await Product.deleteMany();
    await User.deleteMany();

    console.log('👤 Création utilisateur admin...');
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'Optic Glass',
      email: 'admin@opticglass.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('👤 Création utilisateur test...');
    await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'user@test.com',
      password: 'user123',
      role: 'user'
    });

    console.log('👓 Création de 100 produits...');
    const products = generateProducts();
    await Product.insertMany(products);

    console.log('✅ Base de données initialisée avec succès!');
    console.log(`📊 ${products.length} produits créés`);
    console.log(`👥 2 utilisateurs créés`);
    console.log(`\n🔐 Identifiants admin:`);
    console.log(`   Email: admin@opticglass.com`);
    console.log(`   Password: admin123`);
    console.log(`\n🔐 Identifiants user:`);
    console.log(`   Email: user@test.com`);
    console.log(`   Password: user123`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

seedDatabase();
