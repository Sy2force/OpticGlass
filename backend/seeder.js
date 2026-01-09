import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'shayaco@gmail.com',
        password: 'Qwerty2121@', // sera hashé par le hook pre-save si on passait par create, mais ici insertMany ne trigger pas save middleware.
        // Wait, insertMany DOES NOT trigger pre('save') hooks in Mongoose by default unless specified or loop used.
        // Actually, seeders usually use create or need hashed passwords directly.
        // Let's fix this logic to use a loop or provide hashed password if we knew it, 
        // OR better: use user.create inside a loop.
        role: 'admin',
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'user@example.com',
        password: 'password123',
        role: 'user',
      },
    ]);

    // NB: InsertMany with mongoose documents bypasses middleware? 
    // Mongoose docs: "Note that save() middleware is not executed on insertMany()"
    // So passwords won't be hashed! 
    // We should use create or manually hash.
    // Let's rewrite to use loop with create/save.
    
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  // Better implementation for hashing
  const seedUsers = async () => {
    try {
      await User.deleteMany();
      
      console.log('Users cleared...');

      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'shayaco@gmail.com',
        password: 'Qwerty2121@',
        role: 'admin',
      });
      
      console.log('Admin created: shayaco@gmail.com / Qwerty2121@');

      await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'user@example.com',
        password: 'password123',
        role: 'user',
      });

      console.log('User created: user@example.com / password123');
      
      console.log('Data Imported!'.green.inverse);
      process.exit();
    } catch (error) {
      console.error(`${error}`.red.inverse);
      process.exit(1);
    }
  }
  
  seedUsers();
}
