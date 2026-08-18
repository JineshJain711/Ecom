const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getUser} =require('../controllers/auth.controller.js')
const { protect } = require('../middleware/auth.middleware.js');
const { admin } = require('../middleware/admin.middleware.js');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect,admin, getUser);


module.exports = router;