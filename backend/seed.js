require('dotenv').config();

const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    const hashedPassword = await bcrypt.hash('123456', 10);

    const userSeedData = [
      { name: 'Admin User', email: 'admin@example.com', password: hashedPassword, role: 'admin', verified: true },
      { name: 'John Doe', email: 'john@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Jane Smith', email: 'jane@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Alice Johnson', email: 'alice@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Bob Brown', email: 'bob@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Charlie Davis', email: 'charlie@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Diana Evans', email: 'diana@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Ethan Foster', email: 'ethan@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Fiona Green', email: 'fiona@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'George Hill', email: 'george@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Hannah Irwin', email: 'hannah@example.com', password: hashedPassword, role: 'user', verified: true },
      { name: 'Ian Jones', email: 'ian@example.com', password: hashedPassword, role: 'user', verified: true },
    ];

    const users = await User.insertMany(userSeedData);

    const productSeedData = [
      { name: 'Wireless Headphones', description: 'Noise-cancelling over-ear headphones with rich bass.', price: 129.99, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', category: 'Electronics', stock: 20, rating: 4.7, numReviews: 15 },
      { name: 'Smart Watch', description: 'Fitness and health tracking smartwatch with AMOLED display.', price: 89.5, image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', category: 'Wearables', stock: 15, rating: 4.4, numReviews: 10 },
      { name: 'Laptop Backpack', description: 'Durable backpack with padded laptop sleeve and water resistance.', price: 49.99, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', category: 'Accessories', stock: 30, rating: 4.2, numReviews: 8 },
      { name: 'Mechanical Keyboard', description: 'Tactile mechanical keyboard for fast and accurate typing.', price: 79.99, image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', category: 'Electronics', stock: 25, rating: 4.6, numReviews: 12 },
      { name: '4K Monitor', description: 'Ultra-sharp 27-inch 4K monitor for productivity and gaming.', price: 249.99, image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80', category: 'Electronics', stock: 12, rating: 4.8, numReviews: 20 },
      { name: 'Running Shoes', description: 'Lightweight running shoes with breathable mesh upper.', price: 59.99, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', category: 'Footwear', stock: 18, rating: 4.3, numReviews: 9 },
      { name: 'Coffee Maker', description: 'Programmable coffee maker for daily brewing.', price: 69.99, image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', category: 'Home', stock: 14, rating: 4.1, numReviews: 7 },
      { name: 'Bluetooth Speaker', description: 'Portable speaker with deep bass and 12-hour battery life.', price: 39.99, image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80', category: 'Electronics', stock: 22, rating: 4.5, numReviews: 11 },
      { name: 'Gaming Mouse', description: 'High-precision wireless gaming mouse with RGB lighting.', price: 54.99, image_url: 'https://images.unsplash.com/photo-1615663245857-d2960f6c6d4b?auto=format&fit=crop&w=800&q=80', category: 'Electronics', stock: 16, rating: 4.7, numReviews: 13 },
      { name: 'Office Chair', description: 'Ergonomic office chair with lumbar support.', price: 149.99, image_url: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=800&q=80', category: 'Furniture', stock: 10, rating: 4.4, numReviews: 6 },
      { name: 'Travel Mug', description: 'Insulated travel mug for coffee and tea on the go.', price: 19.99, image_url: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=800&q=80', category: 'Accessories', stock: 28, rating: 4.2, numReviews: 5 },
      { name: 'Phone Stand', description: 'Adjustable aluminum phone stand for desks and beds.', price: 14.99, image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80', category: 'Accessories', stock: 35, rating: 4.0, numReviews: 4 },
    ];

    const products = await Product.insertMany(productSeedData);

    const orders = await Order.insertMany([
      {
        user: users[1]._id,
        items: [
          { product: products[0]._id, quantity: 1, price: 129.99 },
          { product: products[2]._id, quantity: 1, price: 49.99 },
        ],
        totalPrice: 179.98,
        shippingAddress: {
          fullName: 'John Doe',
          street: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'USA',
        },
        paymentId: 'pay_seed_001',
        status: 'delivered',
      },
      {
        user: users[2]._id,
        items: [
          { product: products[1]._id, quantity: 2, price: 89.5 },
        ],
        totalPrice: 179.0,
        shippingAddress: {
          fullName: 'Jane Smith',
          street: '456 Park Ave',
          city: 'Los Angeles',
          postalCode: '90001',
          country: 'USA',
        },
        paymentId: 'pay_seed_002',
        status: 'pending',
      },
      {
        user: users[3]._id,
        items: [
          { product: products[3]._id, quantity: 1, price: 79.99 },
          { product: products[8]._id, quantity: 1, price: 54.99 },
        ],
        totalPrice: 134.98,
        shippingAddress: {
          fullName: 'Alice Johnson',
          street: '789 Oak Road',
          city: 'Chicago',
          postalCode: '60601',
          country: 'USA',
        },
        paymentId: 'pay_seed_003',
        status: 'shipped',
      },
      {
        user: users[5]._id,
        items: [
          { product: products[4]._id, quantity: 1, price: 249.99 },
        ],
        totalPrice: 249.99,
        shippingAddress: {
          fullName: 'Charlie Davis',
          street: '101 Pine Street',
          city: 'Seattle',
          postalCode: '98101',
          country: 'USA',
        },
        paymentId: 'pay_seed_004',
        status: 'pending',
      },
    ]);

    console.log('Seed data inserted successfully');
    console.log({ users: users.length, products: products.length, orders: orders.length });
  } catch (error) {
    console.error('Seed error:', error.message);
  } finally {
    process.exit(0);
  }
};

seedData();
