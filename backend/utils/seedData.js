import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Brand from '../models/Brand.js';
import connectDB from '../config/db.js';
import { products } from '../data/products.js';
import { brandsData } from '../data/brandsData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Suppression des données existantes...');
    await Product.deleteMany();
    await User.deleteMany();
    await Brand.deleteMany();

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

    console.log(`🏷️  Création de ${brandsData.length} marques...`);
    await Brand.insertMany(brandsData);

    console.log(`👓 Création de ${products.length} produits...`);
    await Product.insertMany(products);

    console.log('✅ Base de données initialisée avec succès!');
    console.log(`📊 ${products.length} produits créés`);
    console.log(`🏷️  ${brandsData.length} marques créées`);
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
