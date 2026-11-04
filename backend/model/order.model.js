const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  subtotal: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  shippingAmount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  discountAmount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  paymentMethod: {
    type: String,
    enum: ["cod", "razorpay"],
    default: "cod",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  razorpayOrderId: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
  address: {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
