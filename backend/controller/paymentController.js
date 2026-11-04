const crypto = require("node:crypto");
const Razorpay = require("razorpay");
const Order = require("../model/order.model");

const isValidPaymentSignature = (orderId, paymentId, signature, secret) => {
  if (![orderId, paymentId, signature, secret].every((value) => typeof value === "string" && value)) {
    return false;
  }
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest();
  let actual;
  try {
    actual = Buffer.from(signature, "hex");
  } catch {
    return false;
  }
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
};

const getRazorpayInstance = () => {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return null;
  }
  return new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
};

const createdOrder = async (req, res) => {
  const orderId = req.body?.orderId;
  const instance = getRazorpayInstance();
  if (!instance) {
    return res.status(503).json({ message: "Online payment is not configured" });
  }
  if (!/^[\da-f]{24}$/i.test(orderId || "")) {
    return res.status(400).json({ message: "A valid Shopnest order ID is required" });
  }

  try {
    const shopOrder = await Order.findById(orderId);
    if (!shopOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (String(shopOrder.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "You cannot pay for this order" });
    }
    if (shopOrder.paymentStatus === "paid") {
      return res.status(409).json({ message: "This order is already paid" });
    }
    const order = await instance.orders.create({
      amount: Math.round(shopOrder.totalAmount * 100),
      currency: "INR",
      receipt: `shopnest-${shopOrder._id}`,
    });
    shopOrder.razorpayOrderId = order.id;
    shopOrder.paymentMethod = "razorpay";
    await shopOrder.save();
    res.status(201).json({ ...order, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({ message: "Unable to create payment order" });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  if (!isValidPaymentSignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    process.env.RAZORPAY_KEY_SECRET,
  )) {
    return res.status(400).json({ message: "Invalid payment signature" });
  }

  const instance = getRazorpayInstance();
  if (!instance) {
    return res.status(503).json({ message: "Online payment is not configured" });
  }
  try {
    const payment = await instance.payments.fetch(razorpay_payment_id);
    const shopOrder = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (
      !shopOrder ||
      String(shopOrder.user) !== String(req.user._id) ||
      payment.order_id !== razorpay_order_id ||
      payment.amount !== Math.round(shopOrder.totalAmount * 100) ||
      payment.currency !== "INR" ||
      payment.status !== "captured"
    ) {
      return res.status(400).json({ message: "Payment does not match the order or is incomplete" });
    }
    shopOrder.paymentId = payment.id;
    shopOrder.paymentStatus = "paid";
    shopOrder.status = "processing";
    await shopOrder.save();
    res.json({
      id: payment.id,
      orderId: payment.order_id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      shopOrderId: shopOrder._id,
    });
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error.message);
    res.status(500).json({ message: "Unable to verify payment" });
  }
};

module.exports = { createdOrder, verifyPayment, isValidPaymentSignature };
