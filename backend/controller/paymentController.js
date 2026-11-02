const Razorpay = require("razorpay");
const Order = require("../model/order.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");
const dotenv = require("dotenv");
dotenv.config();

const createdOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  }
  catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Error creating Razorpay order", error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const payment = await instance.payments.fetch(razorpay_payment_id);
    res.status(200).json(payment);
  }
  catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    res.status(500).json({ message: "Error verifying Razorpay payment", error: error.message });
  }
};

module.exports = { createdOrder, verifyPayment };
