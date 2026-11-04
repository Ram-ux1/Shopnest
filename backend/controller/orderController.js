const Order = require("../model/order.model");
const Product = require("../model/product.model");
const sendEmail = require("../utils/sendEmail");
const { normalizeOrderItems, priceOrderItems } = require("../utils/orderUtils");

const createOrder = async (req, res) => {
  try {
    const { address, couponCode } = req.body || {};
    const requiredAddressFields = ["fullName", "street", "city", "postalCode", "country"];
    if (
      !address ||
      requiredAddressFields.some(
        (field) => typeof address[field] !== "string" || !address[field].trim(),
      )
    ) {
      return res.status(400).json({ message: "A complete shipping address is required" });
    }

    const items = normalizeOrderItems(req.body?.items);
    const productIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    const pricing = priceOrderItems(items, products, couponCode);
    const order = new Order({
      user: req.user._id,
      items: pricing.items,
      subtotal: pricing.subtotal,
      shippingAmount: pricing.shippingAmount,
      discountAmount: pricing.discountAmount,
      totalAmount: pricing.totalAmount,
      address: Object.fromEntries(
        requiredAddressFields.map((field) => [field, address[field].trim()]),
      ),
    });

    const decrementedIds = [];
    try {
      for (const item of pricing.items) {
        const result = await Product.updateOne(
          { _id: item.product, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } },
        );
        if (result.modifiedCount !== 1) {
          const error = new Error("Product stock changed. Please review your cart.");
          error.status = 409;
          throw error;
        }
        decrementedIds.push(item);
      }
      await order.save();
    } catch (error) {
      await Promise.all(
        decrementedIds.map(({ product, quantity }) =>
          Product.updateOne({ _id: product }, { $inc: { stock: quantity } }),
        ),
      );
      throw error;
    }

    sendEmail(
      req.user.email,
      "Order Confirmation",
      `Thank you for your order! Your order ID is ${order._id}.`,
    ).catch((error) => console.error("Order confirmation email failed:", error.message));
    res.status(201).json(order);
  } catch (error) {
    const status = error.status || (error.name === "ValidationError" || error.name === "CastError" ? 400 : 500);
    res.status(status).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name imageUrl");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user authentication and the user ID is available in req.user
    const orders = await Order.find({ user: userId })
      .populate("user", "name email")
      .populate("items.product", "name imageUrl");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}


const getOrderById = async (req, res) => {
  try {
    if (!/^[\da-f]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name imageUrl");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (req.user.role !== "admin" && String(order.user?._id) !== String(req.user._id)) {
      return res.status(403).json({ message: "You cannot access this order" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    if (!/^[\da-f]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    const allowedStatuses = ["pending", "processing", "shipped", "delivered"];
    if (!allowedStatuses.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("user", "name email").populate("items.product", "name imageUrl");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { createOrder, getOrders, getMyOrders, getOrderById, updateOrderStatus }