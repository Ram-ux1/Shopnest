
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
  // ================= ELECTRONICS (1-15) =================
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
  {
    name: "Wireless Headphones",
    description: "Premium wireless headphones with deep bass",
    price: 1999,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 50,
    rating: 4.6,
    numReviews: 25,
  },
  {
    name: "Smart Watch",
    description: "Smartwatch with fitness and heart rate tracking",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 45,
    rating: 4.4,
    numReviews: 18,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with powerful sound",
    price: 1499,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 60,
    rating: 4.3,
    numReviews: 22,
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard for gaming and typing",
    price: 1899,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 35,
    rating: 4.7,
    numReviews: 30,
  },
  {
    name: "Wireless Earbuds",
    description: "Compact wireless earbuds with clear audio",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 70,
    rating: 4.2,
    numReviews: 19,
  },
  {
    name: "Gaming Controller",
    description: "Ergonomic wireless controller for gaming",
    price: 1599,
    imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 40,
    rating: 4.4,
    numReviews: 16,
  },
  {
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 90,
    rating: 4.3,
    numReviews: 12,
  },
  {
    name: "Power Bank",
    description: "20000mAh fast charging portable power bank",
    price: 1799,
    imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 55,
    rating: 4.5,
    numReviews: 28,
  },
  {
    name: "Webcam",
    description: "Full HD webcam for online meetings and streaming",
    price: 1199,
    imageUrl: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 30,
    rating: 4.1,
    numReviews: 10,
  },
  {
    name: "USB Flash Drive",
    description: "64GB high speed USB flash drive",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1618410320928-25228d811631?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 100,
    rating: 4.2,
    numReviews: 15,
  },
  {
    name: "Tablet",
    description: "Lightweight tablet for entertainment and productivity",
    price: 11999,
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 20,
    rating: 4.6,
    numReviews: 35,
  },
  {
    name: "Wireless Charger",
    description: "Fast wireless charging pad for compatible devices",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1591290619762-c5888c3a9fef?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 65,
    rating: 4.3,
    numReviews: 11,
  },
  {
    name: "Digital Camera",
    description: "Compact digital camera for photography enthusiasts",
    price: 15999,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 15,
    rating: 4.8,
    numReviews: 42,
  },
  {
    name: "Gaming Monitor",
    description: "24-inch Full HD monitor with smooth refresh rate",
    price: 8999,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop",
    category: "Electronics",
    stock: 18,
    rating: 4.7,
    numReviews: 32,
  },

  // ================= FASHION (16-25) =================
  {
    name: "Men Casual T-Shirt",
    description: "Comfortable cotton casual t-shirt",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 100,
    rating: 4.3,
    numReviews: 20,
  },
  {
    name: "Denim Jeans",
    description: "Classic slim fit denim jeans for men",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 60,
    rating: 4.5,
    numReviews: 27,
  },
  {
    name: "Women Summer Dress",
    description: "Stylish floral summer dress for women",
    price: 1499,
    imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 45,
    rating: 4.6,
    numReviews: 31,
  },
  {
    name: "Men Hoodie",
    description: "Warm and comfortable casual hoodie",
    price: 999,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 55,
    rating: 4.4,
    numReviews: 18,
  },
  {
    name: "Leather Jacket",
    description: "Premium stylish leather jacket",
    price: 2999,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 25,
    rating: 4.7,
    numReviews: 24,
  },
  {
    name: "Women Handbag",
    description: "Elegant everyday handbag with spacious storage",
    price: 1799,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 35,
    rating: 4.5,
    numReviews: 29,
  },
  {
    name: "Men Formal Shirt",
    description: "Premium slim fit formal shirt",
    price: 899,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 70,
    rating: 4.2,
    numReviews: 16,
  },
  {
    name: "Women Denim Jacket",
    description: "Trendy denim jacket for casual outfits",
    price: 1599,
    imageUrl: "https://images.unsplash.com/photo-1548624149-f0e7c8b3d3c4?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 30,
    rating: 4.4,
    numReviews: 14,
  },
  {
    name: "Cotton Kurta",
    description: "Traditional cotton kurta with modern design",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1583391733956-6c78276477e7?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 50,
    rating: 4.3,
    numReviews: 19,
  },
  {
    name: "Winter Sweater",
    description: "Soft knitted sweater for winter season",
    price: 1199,
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
    category: "Fashion",
    stock: 40,
    rating: 4.6,
    numReviews: 21,
  },

  // ================= FOOTWEAR (26-35) =================
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioned sole",
    price: 1999,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    category: "Footwear",
    stock: 50,
    rating: 4.6,
    numReviews: 35,
  },
  {
    name: "Casual Sneakers",
    description: "Stylish everyday sneakers for men",
    price: 1599,
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop",
    category: "Footwear",
    stock: 65,
    rating: 4.4,
    numReviews: 28,
  },
  {
    name: "Sports Shoes",
    description: "Durable sports shoes for outdoor activities",
    price: 2299,
    imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=600&fit=crop",
    category: "Footwear",
    stock: 35,
    rating: 4.5,
    numReviews: 22,
  },
  {
    name: "Women's Heels",
    description: "Elegant high heels for parties and occasions",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop",
    category: "Footwear",
    stock: 25,
    rating: 4.3,
    numReviews: 15,
  },
  {
    name: "Leather Formal Shoes",
    description: "Premium leather shoes for office wear",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=600&fit=crop",
    category: "Footwear",
    stock: 30,
    rating: 4.7,
    numReviews: 26,
  },
  {
    name: "Flip Flops",
    description: "Comfortable lightweight flip flops",
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop",
    category: "Footwear",
    stock: 100,
    rating: 4.1,
    numReviews: 12,
  },
  {
    name: "Women's Flats",
    description: "Comfortable daily wear flat footwear",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=600&h=600&fit=crop",
    category: "Footwear",
    stock: 45,
    rating: 4.4,
    numReviews: 17,
  },
  {
    name: "Hiking Boots",
    description: "Strong outdoor boots with anti-slip sole",
    price: 3199,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    category: "Footwear",
    stock: 20,
    rating: 4.6,
    numReviews: 19,
  },
  {
    name: "Canvas Shoes",
    description: "Classic canvas shoes for casual styling",
    price: 899,
    imageUrl: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=600&h=600&fit=crop",
    category: "Footwear",
    stock: 60,
    rating: 4.2,
    numReviews: 13,
  },
  {
    name: "Sports Sandals",
    description: "Comfortable adjustable sports sandals",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=600&h=600&fit=crop",
    category: "Footwear",
    stock: 40,
    rating: 4.3,
    numReviews: 16,
  },

  // ================= HOME & KITCHEN (36-45) =================
  {
    name: "Coffee Maker",
    description: "Automatic coffee maker for fresh morning coffee",
    price: 2999,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop",
    category: "Home & Kitchen",
    stock: 25,
    rating: 4.5,
    numReviews: 23,
  },
  {
    name: "Electric Kettle",
    description: "1.5 litre stainless steel electric kettle",
    price: 999,
    imageUrl: "https://images.unsplash.com/photo-1594213114663-d94db9b171e2?w=600&h=600&fit=crop",
    category: "Home & Kitchen",
    stock: 40,
    rating: 4.4,
    numReviews: 18,
  },
  {
    name: "Non Stick Cookware",
    description: "Non-stick cookware set for everyday cooking",
    price: 1999,
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&h=600&fit=crop",
    category: "Home & Kitchen",
    stock: 30,
    rating: 4.6,
    numReviews: 20,
  },
  {
    name: "Table Lamp",
    description: "Modern decorative table lamp for bedroom",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop",
    category: "Home & Kitchen",
    stock: 50,
    rating: 4.3,
    numReviews: 14,
  },
  {
    name: "Wall Clock",
    description: "Minimalist wall clock for home decoration",
    price: 599,
    imageUrl: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&h=600&fit=crop",
    category: "Home & Kitchen",
    stock: 45,
    rating: 4.2,
    numReviews: 11,
  },
  {
    name: "Bedsheet Set",
    description: "Soft cotton double bedsheet with pillow covers",
    price: 1199,
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop",
    category: "Home & Kitchen",
    stock: 60,
    rating: 4.5,
    numReviews: 27,
  },
  {
    name: "Water Bottle",
    description: "Insulated stainless steel water bottle",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
    category: "Home & Kitchen",
    stock: 100,
    rating: 4.4,
    numReviews: 32,
  },
  {
    name: "Storage Organizer",
    description: "Multi-purpose home storage organizer",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=600&fit=crop",
    category: "Home & Kitchen",
    stock: 35,
    rating: 4.1,
    numReviews: 9,
  },
  {
    name: "Ceramic Dinner Set",
    description: "Elegant ceramic dinner set for family dining",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=600&h=600&fit=crop",
    category: "Home & Kitchen",
    stock: 20,
    rating: 4.7,
    numReviews: 24,
  },
  {
    name: "Decorative Vase",
    description: "Modern ceramic flower vase for living room",
    price: 899,
    imageUrl: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=600&fit=crop",
    category: "Home & Kitchen",
    stock: 28,
    rating: 4.3,
    numReviews: 13,
  },

  // ================= BEAUTY (46-55) =================
  {
    name: "Face Wash",
    description: "Gentle daily face wash for clean and fresh skin",
    price: 249,
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 80,
    rating: 4.3,
    numReviews: 25,
  },
  {
    name: "Moisturizing Cream",
    description: "Hydrating moisturizer for soft and smooth skin",
    price: 399,
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 65,
    rating: 4.5,
    numReviews: 28,
  },
  {
    name: "Perfume",
    description: "Long lasting premium fragrance for daily use",
    price: 999,
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 40,
    rating: 4.6,
    numReviews: 33,
  },
  {
    name: "Lipstick Set",
    description: "Collection of stylish matte lipstick shades",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 50,
    rating: 4.4,
    numReviews: 21,
  },
  {
    name: "Makeup Brush Set",
    description: "Professional makeup brush set for beauty routines",
    price: 599,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 35,
    rating: 4.2,
    numReviews: 15,
  },
  {
    name: "Sunscreen SPF 50",
    description: "Daily sunscreen lotion with SPF 50 protection",
    price: 349,
    imageUrl: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 90,
    rating: 4.5,
    numReviews: 40,
  },
  {
    name: "Hair Shampoo",
    description: "Nourishing shampoo for healthy and shiny hair",
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 75,
    rating: 4.1,
    numReviews: 17,
  },
  {
    name: "Hair Dryer",
    description: "Compact hair dryer with multiple heat settings",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 30,
    rating: 4.4,
    numReviews: 19,
  },
  {
    name: "Makeup Kit",
    description: "Complete makeup kit for everyday beauty looks",
    price: 1499,
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 25,
    rating: 4.6,
    numReviews: 26,
  },
  {
    name: "Body Lotion",
    description: "Refreshing body lotion for daily skin hydration",
    price: 449,
    imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&h=600&fit=crop",
    category: "Beauty",
    stock: 55,
    rating: 4.3,
    numReviews: 18,
  },

  // ================= SPORTS (56-65) =================
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat for comfortable workouts",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&h=600&fit=crop",
    category: "Sports",
    stock: 60,
    rating: 4.5,
    numReviews: 24,
  },
  {
    name: "Dumbbell Set",
    description: "Adjustable dumbbell set for home workouts",
    price: 1999,
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop",
    category: "Sports",
    stock: 30,
    rating: 4.6,
    numReviews: 29,
  },
  {
    name: "Football",
    description: "Durable football for training and outdoor matches",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0e6d?w=600&h=600&fit=crop",
    category: "Sports",
    stock: 45,
    rating: 4.4,
    numReviews: 16,
  },
  {
    name: "Cricket Bat",
    description: "Quality cricket bat for practice and matches",
    price: 1799,
    imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=600&fit=crop",
    category: "Sports",
    stock: 20,
    rating: 4.7,
    numReviews: 31,
  },
  {
    name: "Badminton Racket",
    description: "Lightweight badminton racket for beginners",
    price: 899,
    imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&h=600&fit=crop",
    category: "Sports",
    stock: 40,
    rating: 4.3,
    numReviews: 14,
  },
  {
    name: "Skipping Rope",
    description: "Adjustable skipping rope for cardio exercise",
    price: 199,
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=600&fit=crop",
    category: "Sports",
    stock: 100,
    rating: 4.2,
    numReviews: 20,
  },
  {
    name: "Gym Gloves",
    description: "Comfortable anti-slip gym gloves",
    price: 399,
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=600&fit=crop",
    category: "Sports",
    stock: 55,
    rating: 4.1,
    numReviews: 12,
  },
  {
    name: "Resistance Bands",
    description: "Set of resistance bands for strength training",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&h=600&fit=crop",
    category: "Sports",
    stock: 70,
    rating: 4.5,
    numReviews: 23,
  },
  {
    name: "Tennis Ball Set",
    description: "Pack of durable tennis balls for practice",
    price: 349,
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&h=600&fit=crop",
    category: "Sports",
    stock: 80,
    rating: 4.3,
    numReviews: 11,
  },
  {
    name: "Sports Water Bottle",
    description: "Leak-proof sports bottle for gym and outdoor use",
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&h=600&fit=crop",
    category: "Sports",
    stock: 90,
    rating: 4.4,
    numReviews: 18,
  },

  // ================= BOOKS (66-75) =================
  {
    name: "Atomic Habits",
    description: "A practical book about building good habits",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop",
    category: "Books",
    stock: 45,
    rating: 4.8,
    numReviews: 50,
  },
  {
    name: "Rich Dad Poor Dad",
    description: "Personal finance and financial education book",
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop",
    category: "Books",
    stock: 60,
    rating: 4.6,
    numReviews: 42,
  },
  {
    name: "The Psychology of Money",
    description: "Learn how people think about money and investing",
    price: 399,
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=600&fit=crop",
    category: "Books",
    stock: 35,
    rating: 4.7,
    numReviews: 37,
  },
  {
    name: "Deep Work",
    description: "A guide to focused and productive working",
    price: 349,
    imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=600&fit=crop",
    category: "Books",
    stock: 30,
    rating: 4.5,
    numReviews: 29,
  },
  {
    name: "Think and Grow Rich",
    description: "Classic book about success and personal growth",
    price: 249,
    imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&h=600&fit=crop",
    category: "Books",
    stock: 50,
    rating: 4.4,
    numReviews: 22,
  },
  {
    name: "Java Programming Guide",
    description: "Beginner-friendly guide to Java programming",
    price: 599,
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=600&fit=crop",
    category: "Books",
    stock: 25,
    rating: 4.6,
    numReviews: 31,
  },
  {
    name: "Clean Code",
    description: "Programming principles for writing better software",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=600&fit=crop",
    category: "Books",
    stock: 20,
    rating: 4.8,
    numReviews: 45,
  },
  {
    name: "The Alchemist",
    description: "Inspirational novel about dreams and destiny",
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=600&fit=crop",
    category: "Books",
    stock: 55,
    rating: 4.7,
    numReviews: 39,
  },
  {
    name: "Ikigai",
    description: "Discover the Japanese philosophy of living",
    price: 349,
    imageUrl: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=600&h=600&fit=crop",
    category: "Books",
    stock: 40,
    rating: 4.5,
    numReviews: 26,
  },
  {
    name: "Introduction to Algorithms",
    description: "Comprehensive textbook on computer algorithms",
    price: 999,
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=600&fit=crop",
    category: "Books",
    stock: 15,
    rating: 4.9,
    numReviews: 48,
  },

  // ================= ACCESSORIES (76-85) =================
  {
    name: "Leather Wallet",
    description: "Premium leather wallet with multiple card slots",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop",
    category: "Accessories",
    stock: 45,
    rating: 4.4,
    numReviews: 20,
  },
  {
    name: "Sunglasses",
    description: "Stylish UV protection sunglasses",
    price: 899,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop",
    category: "Accessories",
    stock: 50,
    rating: 4.5,
    numReviews: 25,
  },
  {
    name: "Analog Wrist Watch",
    description: "Classic analog wrist watch with premium design",
    price: 1599,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop",
    category: "Accessories",
    stock: 30,
    rating: 4.6,
    numReviews: 32,
  },
  {
    name: "Leather Belt",
    description: "Classic adjustable leather belt for men",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb8f3f3a7?w=600&h=600&fit=crop",
    category: "Accessories",
    stock: 70,
    rating: 4.2,
    numReviews: 14,
  },
  {
    name: "Travel Backpack",
    description: "Spacious backpack for travel and everyday use",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    category: "Accessories",
    stock: 40,
    rating: 4.7,
    numReviews: 36,
  },
  {
    name: "Baseball Cap",
    description: "Adjustable casual baseball cap",
    price: 349,
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop",
    category: "Accessories",
    stock: 60,
    rating: 4.3,
    numReviews: 17,
  },
  {
    name: "Travel Duffle Bag",
    description: "Durable duffle bag for gym and weekend trips",
    price: 1499,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    category: "Accessories",
    stock: 25,
    rating: 4.5,
    numReviews: 22,
  },
  {
    name: "Silver Bracelet",
    description: "Minimalist bracelet for everyday styling",
    price: 599,
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop",
    category: "Accessories",
    stock: 35,
    rating: 4.4,
    numReviews: 19,
  },
  {
    name: "Leather Card Holder",
    description: "Compact leather card holder with slim design",
    price: 399,
    imageUrl: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&h=600&fit=crop",
    category: "Accessories",
    stock: 80,
    rating: 4.2,
    numReviews: 13,
  },
  {
    name: "Travel Suitcase",
    description: "Hard-shell trolley suitcase with smooth wheels",
    price: 3499,
    imageUrl: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&h=600&fit=crop",
    category: "Accessories",
    stock: 18,
    rating: 4.7,
    numReviews: 28,
  },

  // ================= FURNITURE (86-95) =================
  {
    name: "Modern Office Chair",
    description: "Ergonomic office chair with adjustable height",
    price: 4999,
    imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600&h=600&fit=crop",
    category: "Furniture",
    stock: 15,
    rating: 4.6,
    numReviews: 35,
  },
  {
    name: "Wooden Study Table",
    description: "Modern wooden study table for home office",
    price: 3499,
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=600&fit=crop",
    category: "Furniture",
    stock: 20,
    rating: 4.5,
    numReviews: 24,
  },
  {
    name: "Bookshelf",
    description: "Multi-layer wooden bookshelf for home storage",
    price: 2999,
    imageUrl: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&h=600&fit=crop",
    category: "Furniture",
    stock: 12,
    rating: 4.4,
    numReviews: 18,
  },
  {
    name: "Sofa Set",
    description: "Comfortable modern sofa for living room",
    price: 18999,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
    category: "Furniture",
    stock: 8,
    rating: 4.8,
    numReviews: 42,
  },
  {
    name: "Bedside Table",
    description: "Compact wooden bedside table with drawer",
    price: 1799,
    imageUrl: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=600&h=600&fit=crop",
    category: "Furniture",
    stock: 22,
    rating: 4.3,
    numReviews: 15,
  },
  {
    name: "Dining Table",
    description: "Elegant wooden dining table for family meals",
    price: 8999,
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=600&fit=crop",
    category: "Furniture",
    stock: 10,
    rating: 4.7,
    numReviews: 29,
  },
  {
    name: "Comfortable Bean Bag",
    description: "Soft and relaxing bean bag for home seating",
    price: 1999,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
    category: "Furniture",
    stock: 25,
    rating: 4.4,
    numReviews: 17,
  },
  {
    name: "Wall Shelf",
    description: "Minimalist floating wall shelf for decoration",
    price: 899,
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=600&fit=crop",
    category: "Furniture",
    stock: 35,
    rating: 4.2,
    numReviews: 12,
  },
  {
    name: "Coffee Table",
    description: "Modern coffee table for living room interiors",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1532372320572-cda25653a694?w=600&h=600&fit=crop",
    category: "Furniture",
    stock: 14,
    rating: 4.5,
    numReviews: 21,
  },
  {
    name: "Wooden Dining Chair",
    description: "Stylish wooden chair with comfortable seating",
    price: 1499,
    imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=600&fit=crop",
    category: "Furniture",
    stock: 30,
    rating: 4.3,
    numReviews: 16,
  },

  // ================= TOYS (96-100) =================
  {
    name: "Remote Control Car",
    description: "High speed remote control racing car for kids",
    price: 999,
    imageUrl: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&h=600&fit=crop",
    category: "Toys",
    stock: 35,
    rating: 4.5,
    numReviews: 22,
  },
  {
    name: "Building Blocks Set",
    description: "Creative colorful building blocks for children",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop",
    category: "Toys",
    stock: 50,
    rating: 4.6,
    numReviews: 31,
  },
  {
    name: "Teddy Bear",
    description: "Soft and cuddly teddy bear plush toy",
    price: 599,
    imageUrl: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&h=600&fit=crop",
    category: "Toys",
    stock: 40,
    rating: 4.7,
    numReviews: 27,
  },
  {
    name: "Puzzle Game",
    description: "Educational puzzle game for kids and families",
    price: 399,
    imageUrl: "https://images.unsplash.com/photo-1606503153255-59d8b8b821b0?w=600&h=600&fit=crop",
    category: "Toys",
    stock: 60,
    rating: 4.3,
    numReviews: 18,
  },
  {
    name: "Toy Train Set",
    description: "Colorful toy train set with tracks for children",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=600&fit=crop",
    category: "Toys",
    stock: 20,
    rating: 4.5,
    numReviews: 15,
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
