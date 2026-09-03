import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Food from './models/Food.js';
import User from './models/User.js';
import Order from './models/Order.js';
import Contact from './models/Contact.js';
import { initialFoods } from './config/store.js';

dotenv.config();

const seedData = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/brindha_cloud_kitchen';
    console.log(`Connecting to MongoDB at: ${uri}...`);
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully for seeding.');

    // Clear existing data
    await Food.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await Contact.deleteMany({});
    console.log('Existing collections cleared.');

    // Seed foods
    const foodsToInsert = initialFoods.map(({ _id, ...rest }) => rest);
    const createdFoods = await Food.insertMany(foodsToInsert);
    console.log(`Seeded ${createdFoods.length} authentic dishes successfully.`);

    // Seed Admin & Customer
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const customerPassword = await bcrypt.hash('Customer@123', 10);

    const adminUser = await User.create({
      name: 'Brindha Admin',
      email: 'admin@brindhacloudkitchen.com',
      phone: '9876543210',
      password: adminPassword,
      role: 'admin',
    });

    const customerUser = await User.create({
      name: 'Priya Raman',
      email: 'customer@example.com',
      phone: '9845012345',
      password: customerPassword,
      role: 'customer',
    });

    console.log(`Seeded admin: ${adminUser.email}`);
    console.log(`Seeded customer: ${customerUser.email}`);

    // Seed a sample order
    await Order.create({
      user: customerUser._id,
      userId: customerUser._id.toString(),
      customerName: customerUser.name,
      phone: customerUser.phone,
      deliveryAddress: 'Flat 402, Royal Palms Apartment, Anna Nagar West, Chennai - 600040',
      items: [
        {
          food: createdFoods[0]._id.toString(),
          name: createdFoods[0].name,
          price: createdFoods[0].price,
          quantity: 2,
          image: createdFoods[0].image,
        },
        {
          food: createdFoods[9]._id.toString(),
          name: createdFoods[9].name,
          price: createdFoods[9].price,
          quantity: 2,
          image: createdFoods[9].image,
        },
      ],
      subtotal: 560,
      deliveryCharge: 40,
      totalAmount: 600,
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      orderStatus: 'Preparing',
    });

    console.log('Seeded sample order successfully.');
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error with data import:', error.message);
    process.exit(1);
  }
};

seedData();
