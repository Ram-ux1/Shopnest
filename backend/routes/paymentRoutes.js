const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const {createdOrder,verifyPayment} = require("../controller/paymentController")

router.post("/create-order",protect,createdOrder);
router.post("/verify-payment",protect,verifyPayment);


module.exports = router;