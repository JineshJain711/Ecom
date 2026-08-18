const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth.middleware');
const {admin} = require('../middleware/admin.middleware');
const {getAnalytics} = require('../controllers/analytics.controller');

router.route('/').get(protect, admin, getAnalytics);





module.exports = router;