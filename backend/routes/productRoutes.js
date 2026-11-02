const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controller/productController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Configure multer to store uploaded files in the "uploads" directory

// Configure multer for file uploads
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, upload.single("image"), createProduct);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;