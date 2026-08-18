const express = require('express');
const { createOrder, myOrders, getOrders, updateOrderStatus } = require('../controllers/order.controller');
const { protect } = require('../middleware/auth.middleware');
const { admin } = require('../middleware/admin.middleware');

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.route('/myorders').get(protect, myOrders);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;