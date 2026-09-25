const express = require("express")
const { loginUser,  registerUser, getUser } = require("../controllers/authControllers")
const { protect } = require("../middleware/authMiddleware")
const { admin } = require("../middleware/adminMiddleware")

const router = express.Router()

router.post("/register" ,registerUser)
router.post("/login" ,loginUser)
router.get("/getUser" ,protect,admin ,getUser)

