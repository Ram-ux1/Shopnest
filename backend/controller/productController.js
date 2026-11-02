 const Product = require("../model/product.model");

 const cloudinary = require("../config/cloudinary");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
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
    const { name, description, price, category, stock } = req.body;
    const image = req.file; // Assuming you're using multer for file uploads
    
    if(image) {
      // Upload the image to Cloudinary
      try {
        const result = await cloudinary.uploader.upload(image.path, {
          folder: "products", // Optional: specify a folder in Cloudinary
        });
        imageUrl = result.secure_url; // Get the secure URL of the uploaded image
      } catch (error) {
        return res.status(500).json({ message: "Image upload failed", error: error.message });
      }
    } else {
      return res.status(400).json({ message: "Image is required" });
    }
    
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const image = req.file; // Assuming you're using multer for file uploads
    let imageUrl = ""; // Initialize the image URL

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }


    // Update the product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock; 
    product.imageUrl = imageUrl || product.imageUrl;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.remove(); 
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
  deleteProduct
};
