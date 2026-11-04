const fs = require("node:fs/promises");
const Product = require("../model/product.model");
const cloudinary = require("../config/cloudinary");

const removeUpload = async (file) => {
  if (!file?.path) return;
  await fs.rm(file.path, { force: true });
};

const uploadImage = async (file) => {
  if (!file) return undefined;
  try {
    const result = await cloudinary.uploader.upload(file.path, { folder: "products" });
    return result.secure_url;
  } finally {
    await removeUpload(file);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    if (!/^[\da-f]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.file);
    if (!imageUrl) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const product = await Product.create({ ...req.body, imageUrl });
    res.status(201).json(product);
  } catch (error) {
    res.status(error.name === "ValidationError" ? 400 : 500).json({ message: error.message });
  } finally {
    await removeUpload(req.file);
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!/^[\da-f]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const allowedFields = ["name", "description", "price", "oldPrice", "category", "stock"];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) product[field] = req.body[field];
    }
    const imageUrl = await uploadImage(req.file);
    if (imageUrl) product.imageUrl = imageUrl;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(error.name === "ValidationError" ? 400 : 500).json({ message: error.message });
  } finally {
    await removeUpload(req.file);
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!/^[\da-f]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
