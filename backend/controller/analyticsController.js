const Order = require("../model/order.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");

const getAdminStats = async (req, res) => {
  try {
    const orders = await Order.find({});
    const totalIncome = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const totalProducts = await Product.countDocuments({});
    const totalUsers = await User.countDocuments({role: "user"});
    const totalOrders = orders.length;

  

    res.status(200).json({
      totalIncome,
      totalProducts,
      totalUsers,
      totalOrders 
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Error fetching admin stats", error: error.message });
  }
};

module.exports = { getAdminStats };
