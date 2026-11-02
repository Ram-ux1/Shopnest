const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { createOrder, getOrders,getMyOrders, getOrderById, updateOrderStatus } = require("../controller/orderController");

router.post("/", protect, createOrder);
router.get("/", protect, admin, getOrders);
router.get("/my-orders", protect, getMyOrders); // Route to get orders for the logged-in user
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;