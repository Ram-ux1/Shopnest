const express = require("express")
const { regsisterUser, loginUser, logoutUser } = require("../controllers/authControllers")

const router = express.Router()

router.post("/register" ,regsisterUser)
router.post("/login" ,loginUser)
router.post("/logout" ,logoutUser)

