const express = require("express")

const { protect } = require("../middleware/authMiddleware")
const { admin } = require("../middleware/adminMiddleware")
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productControllers")
const multer = rquire("multer")
const upload = multer({dest: 'uploads/'})
const router = express.Router()

router.route("/").get(getProducts).post(protect,admin,upload.single('image'),createProduct)
router.route("/:id").get(getProductById).put(protect,admin,upload.single('image'),updateProduct).delete(protect,admin,deleteProduct)

module.exports = router 