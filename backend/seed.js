require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'password123',
    role: 'admin',
  },
  {
    name: 'John Manager',
    email: 'manager@demo.com',
    password: 'password123',
    role: 'manager',
  },
  {
    name: 'Jane Doe',
    email: 'user@demo.com',
    password: 'password123',
    role: 'user',
  },
];

const seed = async () => {
  await connectDB();
  try {
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    for (const userData of seedUsers) {
      await User.create(userData);
    }

    console.log('✅ Seed data inserted successfully!');
    console.log('\nDemo accounts:');
    seedUsers.forEach(u => console.log(`  📧 ${u.email}  🔑 ${u.password}`));
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    mongoose.connection.close();
  }
};

seed();
