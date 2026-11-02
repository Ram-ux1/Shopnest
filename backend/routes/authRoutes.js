const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
  const { registerUser, loginUser, getUser } = require("../controller/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", protect, admin, getUser); // Admin only route


router.get("/hii",(req,res)=>{
  console.log("hii router")
  res.json({ message: "Hello from /hii" });
});
module.exports = router;