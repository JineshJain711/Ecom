const Order = require("../models/Order.js");

const sendEmail = require("../utils/sendmail.js");

const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress, paymentId } = req.body;
    if (!items || !totalPrice || !shippingAddress || !paymentId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log(req.body);
    const order = new Order({
      user: req.user._id,
      items,
      totalPrice,
      shippingAddress,
      paymentId,
    });
    await order.save();
    await sendEmail({
      to: req.user.email,
      subject: "Order Confirmation",
      text: `Your order with ID ${order._id} has been placed successfully. Total Price: ${totalPrice}. Thank you for shopping with us!`,
    });
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product",
      "name price",
    );
    res.json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("items.product", "name price")
      .sort("-createdAt");
    res.json({
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product", "name price"); 

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order fetched successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }   
}

module.exports = {
  createOrder,
  myOrders,
  getOrders,
  updateOrderStatus,
  getOrderById,
};
