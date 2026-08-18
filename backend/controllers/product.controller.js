const Product = require('../models/Product')

const cloudinary = require('../config/cloudinary');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ 
            message: 'Server Error' });
    }           
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const {name, description, price, category, stock} = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
             image_url: result.secure_url
        });
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const {name, description, price, category, stock} = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            product.image_url = result.secure_url;
        }
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};