import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';
import products from './data/products.js';

// Configurer dotenv pour lire le fichier .env dans le dossier courant (backend)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// Fallback si .env n'est pas lu correctement
if (!process.env.MONGO_URI) {
  process.env.MONGO_URI = 'mongodb://localhost:27017/optic-glass';
}

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create users one by one to trigger password hashing
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@opticglass.com',
      password: 'Admin123!', 
      role: 'admin',
    });

    const regularUser = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@example.com',
      password: 'User123!',
      role: 'user',
    });

    console.log('✅ Admin créé: admin@opticglass.com / Admin123!');
    console.log('✅ User créé: user@example.com / User123!');

    // S'assurer que les produits ont l'utilisateur admin associé
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
