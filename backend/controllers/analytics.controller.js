const Order = require("../models/Order.js");
const User = require("../models/User.js");
const Product = require("../models/Product.js");

const getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const orders = await Order.find({})
            .populate("user", "name email")
            .populate("items.product", "name price")
            .sort("-createdAt");

        const totalRevenueResult = await Order.aggregate([
            {
                $group: { _id: null, total: { $sum: "$totalPrice" } }
            }
        ]);

        const totalRevenue = totalRevenueResult[0]?.total || 0;

        res.status(200).json({
            totalUsers,
            totalOrders,
            totalRevenue,
            totalProducts,
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAnalytics,
};