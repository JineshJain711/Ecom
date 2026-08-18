const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth.middleware');
const {admin} = require('../middleware/admin.middleware');

const { createOrder, verifyPayment } = require('../controllers/payment.controller');

router.post('/order', createOrder);
router.post('/verify', verifyPayment);

module.exports = router;