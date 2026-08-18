const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const ProductRoutes = require('./routes/product.routes');
const ordersRoutes = require('./routes/orders.routes');
const paymentRoutes = require('./routes/payment.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Backend is running on http://localhost:${PORT}`);
})
app.use('/api/auth', authRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/analytics',analyticsRoutes);
app.get("/", (req,res)=>{
    res.send("<h1>Backend is Running succesfully</h1>")
})