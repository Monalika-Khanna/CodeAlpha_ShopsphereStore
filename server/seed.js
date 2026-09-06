import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';
dotenv.config();
await connectDB();
await User.findOneAndUpdate({ email: process.env.ADMIN_EMAIL || 'admin@shopsphere.dev' }, { name: 'ShopSphere Admin', email: process.env.ADMIN_EMAIL || 'admin@shopsphere.dev', password: process.env.ADMIN_PASSWORD || 'ChangeMe123!', role: 'admin' }, { upsert: true, new: true, setDefaultsOnInsert: true });
if (!await Product.countDocuments()) await Product.insertMany([
 { name: 'Aero Wireless Headphones', description: 'Immersive sound, adaptive noise control, and all-day comfort.', price: 129, category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80', stock: 24, rating: 4.8 },
 { name: 'Arc Minimal Watch', description: 'A considered everyday timepiece with a brushed steel case.', price: 189, category: 'Accessories', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80', stock: 11, rating: 4.6 },
 { name: 'Cloud Knit Runner', description: 'Lightweight movement with a responsive sole and soft knit upper.', price: 96, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', stock: 38, rating: 4.7 }
]);
if (!await Product.exists({ category: 'Fashion' })) await Product.insertMany([
 { name: 'Linen Day Dress', description: 'A breathable, relaxed silhouette for warm days and slow mornings.', price: 118, category: 'Fashion', image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=900', stock: 16, rating: 4.7 },
 { name: 'Heritage Woven Shawl', description: 'A richly textured traditional layer made for meaningful occasions.', price: 84, category: 'Traditional', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80', stock: 12, rating: 4.8 },
 { name: 'Rosewater Face Mist', description: 'A light botanical mist for a fresh, comfortable finish.', price: 24, category: 'Cosmetics', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80', stock: 30, rating: 4.6 },
 { name: 'Everyday Cotton Kurta', description: 'Soft cotton tailoring with an easy fit and timeless detail.', price: 72, category: 'Traditional', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80', stock: 20, rating: 4.7 }
]);
await Product.updateOne({ name: 'Heritage Woven Shawl' }, { image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80' });
await Product.updateOne({ name: 'Linen Day Dress' }, { image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=900' });
console.log('Seed complete'); process.exit(0);
