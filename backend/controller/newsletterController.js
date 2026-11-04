const Subscriber = require("../model/subscriber.model");
const { normalizeSubscriberEmail } = require("../utils/subscriberUtils");

const subscribe = async (req, res) => {
  const email = normalizeSubscriberEmail(req.body?.email);
  if (!email) {
    return res.status(400).json({ message: "Enter a valid email address" });
  }
  try {
    await Subscriber.create({ email });
    res.status(201).json({ message: "You are subscribed to the Shopnest newsletter" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This email is already subscribed" });
    }
    console.error("Newsletter subscription failed:", error.message);
    res.status(500).json({ message: "Unable to subscribe right now" });
  }
};

module.exports = { subscribe };
