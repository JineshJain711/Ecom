const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv").config();

const createOrder = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.ROZARPAY_KEY_ID,
            key_secret: process.env.ROZARPAY_KEY_SECRET,
        });

        const options = {
            amount: Number(req.body.amount) * 100, // Amount in paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        const order = await instance.orders.create(options);
        if (!order) {
            return res.status(500).json({ message: "Some error occurred" });
        }

        res.status(200).json({
            key: process.env.ROZARPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            id: order.id,
            receipt: order.receipt,
            message: "Order created successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const {
            order_id,
            razorpay_order_id,
            payment_id,
            razorpay_payment_id,
            signature,
            razorpay_signature,
        } = req.body;

        const actualOrderId = order_id || razorpay_order_id;
        const actualPaymentId = payment_id || razorpay_payment_id;
        const actualSignature = signature || razorpay_signature;

        if (!actualOrderId || !actualPaymentId || !actualSignature) {
            return res.status(400).json({ message: "Missing Razorpay payment details" });
        }

        const generated_signature = crypto
            .createHmac("sha256", process.env.ROZARPAY_KEY_SECRET)
            .update(actualOrderId + "|" + actualPaymentId)
            .digest("hex");

        if (generated_signature === actualSignature) {
            res.status(200).json({ message: "Payment verified successfully" });
        } else {
            res.status(400).json({ message: "Invalid signature. Payment verification failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    verifyPayment,
};
