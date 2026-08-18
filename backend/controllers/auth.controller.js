const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendmail');

// Generate JWT Token
const genrateToken = (id, role, verified) => {
    return jwt.sign({id, role, verified}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

 const registerUser = async (req,res)=>{
    try {
        const {name,email,password,role} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
        const user = await User.create({
            name,
            email,
            password: hashedpassword,
            role
        });
        if(user)
        {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            // Here you would typically send the OTP to the user's email or phone number
            const message = `Welcome ${name}, your OTP is ${otp}. Please use this to verify your account.`;

            await sendEmail(email, 'Account Verification', message); // Assuming sendEmail is a function you've defined to send emails
            res.status(201).json({
                message:"User registered successfully. Please check your email for the OTP to verify your account.",
                _id: user._id,
                name: user.name,
                userId: user._id,
                email: user.email,
                role: user.role,
                token: genrateToken(user._id,user.role,user.verified),
                });
        }
       
    } catch (error) {
        res.status(500).json({
            message:"Server error",
            error:error.message,
            
            });
    }
}
//login user
const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({message:"password is incorrect"});
        }
        res.status(200).json({
            message:"User logged in successfully",
            _id: user._id,
            name: user.name,
            userId: user._id,
            email: user.email,
            role: user.role,
            token: genrateToken(user._id,user.role,user.verified),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"Server error",
            error:error.message,
            });
    }
}

//get user
const getUser = async (req,res)=>{
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({
            message:"Users retrieved successfully",
            users
        });
    } catch (error) {
        res.status(500).json({
            message:"Server error",
            error:error.message,
            });
    }
}
module.exports = {registerUser,loginUser,getUser};