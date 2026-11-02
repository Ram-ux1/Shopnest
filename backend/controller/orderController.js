const Order = require("../model/order.model");
const sendEmail = require("../utils/sendEmail");

const createOrder = async (req, res) => {
  try {
    const { user, items, totalAmount, address, paymentId } = req.body;
    const order = new Order({ user, items, totalAmount, address, paymentId });
    await order.save();
    
    sendEmail({
      to: req.user.email,
      subject: "Order Confirmation",
      text: `Thank you for your order! Your order ID is ${order._id}.`,
    });

    console.log("Order created:", order);
    res.status(201).json(order);
  } catch (error) {
    console.log("Error creating order:", error);
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user authentication and the user ID is available in req.user
    const orders = await Order.find({ user: userId }).populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}


const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("user", "name email");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { createOrder, getOrders, getMyOrders, getOrderById, updateOrderStatus }