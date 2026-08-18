const express = require('express');
const {protect} = require('../middleware/auth.middleware');
const {admin} = require('../middleware/admin.middleware');
const multer = require('multer');
upload = multer({ dest: 'uploads/' });
const {getProducts, createProduct, getProductById, updateProduct, deleteProduct} = require('../controllers/product.controller');

const router = express.Router();

router.route('/').get(getProducts).post(protect,admin, upload.single('image'), createProduct);
//single product routes
router.route('/:id').get(getProductById).put(protect,admin, upload.single('image'), updateProduct).delete(protect,admin, deleteProduct);

module.exports = router;