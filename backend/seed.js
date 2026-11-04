
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./model/user.model");
const Product = require("./model/product.model");
const Order = require("./model/order.model");

// ========================================
// SEED USERS
// ========================================

const seedUsers = async () => {
  const userData = [
    {
      name: "Admin User",
      email: "admin@shopnest.com",
      password: "admin123",
      role: "admin",
      verified: true,
    },
    {
      name: "John Doe",
      email: "john@example.com",
      password: "john123",
      role: "user",
      verified: true,
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "jane123",
      role: "user",
      verified: true,
    },
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      password: "rahul123",
      role: "user",
      verified: true,
    },
    {
      name: "Priya Verma",
      email: "priya@example.com",
      password: "priya123",
      role: "user",
      verified: true,
    },
  ];

  for (const user of userData) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await User.updateOne(
      { email: user.email },
      {
        $setOnInsert: {
          ...user,
          password: hashedPassword,
        },
      },
      { upsert: true }
    );
  }

  console.log("Users seeded successfully");
};

// ========================================
// SEED PRODUCTS
// ========================================

const seedProducts = async () => {
 

const products = [
  // FASHION
  {
    name: "Premium Men's Jacket",
    description: "Stylish and comfortable premium winter jacket",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 50,
    rating: 4.5,
    numReviews: 10,
  },
  {
    name: "Casual Cotton T-Shirt",
    description: "Premium quality everyday cotton T-shirt",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 200,
    rating: 4.0,
    numReviews: 5,
  },
  {
    name: "Running Shoes",
    description: "Lightweight and comfortable running shoes",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 100,
    rating: 4.7,
    numReviews: 15,
  },
  {
    name: "Stylish Sunglasses",
    description: "Premium UV protection fashionable sunglasses",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 75,
    rating: 4.2,
    numReviews: 6,
  },

  // ELECTRONICS
  {
    name: "Wireless Headphones",
    description: "Premium noise cancelling wireless headphones",
    price: 1999,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 50,
    rating: 4.5,
    numReviews: 10,
  },
  {
    name: "Smart Watch",
    description: "Advanced smartwatch with fitness tracking",
    price: 3499,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 30,
    rating: 4.2,
    numReviews: 8,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable wireless Bluetooth speaker",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 40,
    rating: 4.4,
    numReviews: 12,
  },
  {
    name: "Gaming Mouse",
    description: "High precision RGB gaming mouse",
    price: 899,
    imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 80,
    rating: 4.5,
    numReviews: 14,
  },

  // BEAUTY
  {
    name: "Makeup Brush Set",
    description: "Professional makeup brushes for flawless application",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 60,
    rating: 4.6,
    numReviews: 20,
  },
  {
    name: "Premium Makeup Kit",
    description: "Complete makeup essentials for everyday beauty",
    price: 1499,
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 45,
    rating: 4.5,
    numReviews: 18,
  },
  {
    name: "Skincare Products",
    description: "Daily skincare essentials for healthy glowing skin",
    price: 999,
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 70,
    rating: 4.4,
    numReviews: 12,
  },

  // HOME & LIVING
  {
    name: "Coffee Maker",
    description: "Automatic drip coffee maker for your home",
    price: 1599,
    imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&h=600&fit=crop",
    category: "Home & Living",
    stock: 25,
    rating: 4.3,
    numReviews: 7,
  },
  {
    name: "Ergonomic Office Chair",
    description: "Comfortable modern chair for home and office",
    price: 5499,
    imageUrl: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&h=600&fit=crop",
    category: "Home & Living",
    stock: 15,
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: "Modern Home Decor",
    description: "Beautiful decorative accessories for your living room",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=600&fit=crop",
    category: "Home & Living",
    stock: 35,
    rating: 4.5,
    numReviews: 11,
  },
];




  for (const product of products) {
    await Product.updateOne(
      { name: product.name },
      { $setOnInsert: product },
      { upsert: true }
    );
  }

  console.log("Products seeded successfully");
};

// ========================================
// SEED ORDERS
// ========================================

const seedOrders = async () => {
  const users = await User.find({
    email: {
      $in: [
        "john@example.com",
        "jane@example.com",
        "rahul@example.com",
        "priya@example.com",
      ],
    },
  });

  const products = await Product.find();

  const userMap = new Map(
    users.map((user) => [user.email, user])
  );

  const productMap = new Map(
    products.map((product) => [product.name, product])
  );

  const orders = [
    {
      email: "john@example.com",
      status: "delivered",
      items: [
        { name: "Wireless Headphones", quantity: 1 },
        { name: "Cotton T-Shirt", quantity: 2 },
      ],
      postalCode: "201003",
    },
    {
      email: "jane@example.com",
      status: "pending",
      items: [
        { name: "Smart Watch", quantity: 1 },
      ],
      postalCode: "201010",
    },
    {
      email: "rahul@example.com",
      status: "shipped",
      items: [
        { name: "Running Shoes", quantity: 1 },
        { name: "Gaming Mouse", quantity: 1 },
      ],
      postalCode: "110001",
    },
    {
      email: "priya@example.com",
      status: "delivered",
      items: [
        { name: "Coffee Maker", quantity: 1 },
        { name: "Sunglasses", quantity: 1 },
      ],
      postalCode: "110002",
    },
  ];

  for (const data of orders) {
    const user = userMap.get(data.email);

    if (!user) {
      throw new Error(`User not found: ${data.email}`);
    }

    const items = data.items.map((item) => {
      const product = productMap.get(item.name);

      if (!product) {
        throw new Error(`Product not found: ${item.name}`);
      }

      return {
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const totalAmount = items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    const address = {
      fullName: user.name,
      street: "Main Market",
      city: "Ghaziabad",
      postalCode: data.postalCode,
      country: "India",
    };

    // Prevent duplicate seed orders
    await Order.updateOne(
      {
        user: user._id,
        status: data.status,
        "address.postalCode": data.postalCode,
      },
      {
        $setOnInsert: {
          user: user._id,
          items,
          totalAmount,
          status: data.status,
          address,
        },
      },
      { upsert: true }
    );
  }

  console.log("Orders seeded successfully");
};

// ========================================
// DATABASE STATISTICS
// ========================================

const showDatabaseStats = async () => {
  const totalUsers = await User.countDocuments();
  const totalAdmins = await User.countDocuments({ role: "admin" });
  const totalCustomers = await User.countDocuments({ role: "user" });

  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

  const totalStock = await Product.aggregate([
    {
      $group: {
        _id: null,
        stock: { $sum: "$stock" },
        inventoryValue: {
          $sum: { $multiply: ["$price", "$stock"] },
        },
        avgPrice: { $avg: "$price" },
      },
    },
  ]);

  const categories = await Product.distinct("category");

  const orderStats = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        amount: { $sum: "$totalAmount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const deliveredRevenue = await Order.aggregate([
    { $match: { status: "delivered" } },
    {
      $group: {
        _id: null,
        revenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const inventory = totalStock[0] || {};

  console.log("\n");
  console.log("==========================================");
  console.log("          SHOPNEST DATABASE REPORT");
  console.log("==========================================");

  console.log("\n USERS");
  console.table([
    { Type: "Total Users", Count: totalUsers },
    { Type: "Admin Users", Count: totalAdmins },
    { Type: "Customers", Count: totalCustomers },
  ]);

  console.log("\n PRODUCTS");
  console.table([
    { Type: "Total Products", Count: totalProducts },
    { Type: "Categories", Count: categories.length },
    { Type: "Available Stock", Count: inventory.stock || 0 },
    {
      Type: "Average Product Price",
      Count: `₹${(inventory.avgPrice || 0).toFixed(2)}`,
    },
    {
      Type: "Inventory Value",
      Count: `₹${(inventory.inventoryValue || 0).toFixed(2)}`,
    },
  ]);

  console.log("\n CATEGORY BREAKDOWN");
  console.table(
    await Product.aggregate([
      {
        $group: {
          _id: "$category",
          products: { $sum: 1 },
          stock: { $sum: "$stock" },
        },
      },
      { $sort: { products: -1 } },
    ])
  );

  console.log("\n ORDERS");
  console.table(
    orderStats.map((order) => ({
      Status: order._id,
      Orders: order.count,
      Amount: `₹${order.amount.toFixed(2)}`,
    }))
  );

  console.log("\n REVENUE");
  console.table([
    {
      Type: "Total Orders",
      Value: totalOrders,
    },
    {
      Type: "Delivered Revenue",
      Value: `₹${deliveredRevenue[0]?.revenue || 0}`,
    },
  ]);

  console.log("\n==========================================");
  console.log("       DATABASE REPORT COMPLETED");
  console.log("==========================================\n");
};

// ========================================
// MAIN SEED FUNCTION
// ========================================

const seed = async () => {
  try {
    console.log("\nConnecting to MongoDB...");

    await connectDB();

    console.log("MongoDB connected successfully!\n");
    console.log("Starting Shopnest database seeding...\n");

    await seedUsers();
    await seedProducts();
    await seedOrders();

    await showDatabaseStats();

    console.log("Shopnest database seeded successfully!");
  } catch (error) {
    console.error("\nSEEDING FAILED:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
};

seed();
