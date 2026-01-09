import mongoose from 'mongoose';
import dotenv from 'dotenv';
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
        password: 'Qwerty2121@', 
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
    
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
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
      
      console.log('Data Imported!');
      process.exit();
    } catch (error) {
      console.error(`${error}`);
      process.exit(1);
    }
  }
  
  seedUsers();
}
