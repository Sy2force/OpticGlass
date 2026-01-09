import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Recommendation from '../models/Recommendation.js';
import Brand from '../models/Brand.js';
import { brandsData } from '../data/brandsData.js';
import { allProducts } from '../data/products/index.js';

dotenv.config();

const recommendationsData = [
  {
    title: 'Tendances Hiver 2026 : Les Lunettes Incontournables',
    description: 'Découvrez les modèles qui feront sensation cet hiver. Formes oversize, couleurs chaudes et matériaux nobles sont au rendez-vous.',
    category: 'saison',
    imageUrl: '/images/recommendations/winter-2026.jpg',
    tags: ['hiver', 'tendance', 'oversize', '2026'],
    priority: 10,
    isActive: true
  },
  {
    title: 'Les 5 Formes Qui Flattent Votre Visage',
    description: 'Guide complet pour choisir la forme de lunettes parfaite selon votre morphologie. Visage rond, carré, ovale ou en cœur : trouvez votre style idéal.',
    category: 'conseil',
    imageUrl: '/images/recommendations/face-shapes.jpg',
    tags: ['conseil', 'morphologie', 'guide', 'style'],
    priority: 9,
    isActive: true
  },
  {
    title: 'Nouveautés de la Semaine : Tom Ford & Gucci',
    description: 'Les dernières collections des maisons de luxe viennent d\'arriver. Découvrez les modèles exclusifs Tom Ford et Gucci disponibles dès maintenant.',
    category: 'nouveauté',
    imageUrl: '/images/recommendations/new-arrivals.jpg',
    tags: ['nouveauté', 'tom ford', 'gucci', 'luxe'],
    priority: 10,
    isActive: true
  },
  {
    title: 'Aviateurs : Le Grand Retour d\'un Classique',
    description: 'Les lunettes aviateur reviennent en force avec des designs modernisés. Ray-Ban, Persol et Tom Ford revisitent ce grand classique.',
    category: 'tendance',
    imageUrl: '/images/recommendations/aviators-trend.jpg',
    tags: ['aviateur', 'classique', 'tendance', 'intemporel'],
    priority: 8,
    isActive: true
  },
  {
    title: 'Sport & Style : Les Meilleures Lunettes Oakley',
    description: 'Performance et esthétique ne font qu\'un avec la nouvelle collection Oakley. Technologie Prizm et designs audacieux pour les sportifs exigeants.',
    category: 'tendance',
    imageUrl: '/images/recommendations/oakley-sport.jpg',
    tags: ['sport', 'oakley', 'performance', 'prizm'],
    priority: 7,
    isActive: true
  },
  {
    title: 'Lunettes Vintage : L\'Élégance Rétro',
    description: 'Le vintage est plus que jamais d\'actualité. Persol, Ray-Ban Clubmaster et modèles ronds : voyagez dans le temps avec style.',
    category: 'style',
    imageUrl: '/images/recommendations/vintage-style.jpg',
    tags: ['vintage', 'rétro', 'persol', 'années 60'],
    priority: 6,
    isActive: true
  },
  {
    title: 'Luxe Italien : Prada, Gucci & Versace',
    description: 'L\'excellence italienne à l\'honneur. Découvrez les créations des plus grandes maisons milanaises et romaines.',
    category: 'tendance',
    imageUrl: '/images/recommendations/italian-luxury.jpg',
    tags: ['luxe', 'italien', 'prada', 'gucci', 'versace'],
    priority: 9,
    isActive: true
  },
  {
    title: 'Printemps 2026 : Couleurs Vives & Formes Audacieuses',
    description: 'Le printemps arrive avec son lot de nouveautés colorées. Osez les verres teintés et les montures éclatantes.',
    category: 'saison',
    imageUrl: '/images/recommendations/spring-2026.jpg',
    tags: ['printemps', 'couleurs', 'audacieux', '2026'],
    priority: 8,
    isActive: true
  },
  {
    title: 'Lunettes de Vue : Allier Style et Confort',
    description: 'Nos conseils pour choisir des lunettes de vue qui allient esthétique et confort au quotidien. Matériaux, formes et technologies.',
    category: 'conseil',
    imageUrl: '/images/recommendations/eyeglasses-guide.jpg',
    tags: ['vue', 'conseil', 'confort', 'quotidien'],
    priority: 7,
    isActive: true
  },
  {
    title: 'Chanel & Dior : L\'Élégance Parisienne',
    description: 'Le chic à la française incarné par les deux plus grandes maisons parisiennes. Découvrez leurs dernières créations haute couture.',
    category: 'tendance',
    imageUrl: '/images/recommendations/french-elegance.jpg',
    tags: ['chanel', 'dior', 'paris', 'haute couture'],
    priority: 9,
    isActive: true
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté');
  } catch (error) {
    console.error('❌ Erreur MongoDB:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Suppression des données existantes...');
    await Product.deleteMany({});
    await Recommendation.deleteMany({});
    await Brand.deleteMany({});
    console.log('✅ Données supprimées');

    // Créer un utilisateur admin si n'existe pas
    let adminUser = await User.findOne({ email: 'admin@opticglass.com' });
    if (!adminUser) {
      adminUser = await User.create({
        firstName: 'Admin',
        lastName: 'Optic Glass',
        email: 'admin@opticglass.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Utilisateur admin créé');
    }

    // Insérer les marques
    console.log('🏷️  Insertion des marques...');
    const insertedBrands = await Brand.insertMany(brandsData);
    console.log(`✅ ${insertedBrands.length} marques insérées`);

    // Insérer les produits
    console.log('📦 Insertion des produits...');
    const insertedProducts = await Product.insertMany(allProducts);
    console.log(`✅ ${insertedProducts.length} produits insérés`);

    // Insérer les recommandations avec l'ID admin
    console.log('💡 Insertion des recommandations...');
    const recommendationsWithAdmin = recommendationsData.map(rec => ({
      ...rec,
      createdBy: adminUser._id
    }));
    const insertedRecommendations = await Recommendation.insertMany(recommendationsWithAdmin);
    console.log(`✅ ${insertedRecommendations.length} recommandations insérées`);

    // Statistiques
    console.log('\n📊 STATISTIQUES:');
    console.log(`   Produits: ${insertedProducts.length}`);
    console.log(`   Marques: ${brandsData.length}`);
    console.log(`   Recommandations: ${insertedRecommendations.length}`);
    
    const categories = [...new Set(allProducts.map(p => p.category))];
    console.log(`   Catégories: ${categories.join(', ')}`);
    
    const types = [...new Set(allProducts.map(p => p.type))];
    console.log(`   Types: ${types.join(', ')}`);

    console.log('\n✨ Base de données complètement remplie!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  }
};

seedDatabase();
