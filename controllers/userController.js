const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//@desc Register a user
//@route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    // Validate required fields
    if (!name || !username || !email || !password) {
        res.status(400);
        throw new Error("Please include all fields");
    }

    // Check if the user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created: ${user}`);
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc Login a user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Validate required fields
    if (!email || !password) {
        res.status(400);
        throw new Error("Please include all fields");
    }
    // Check if the user exists
    const user
    = await User
        .findOne({ email });  
    //compare password with hashedpassword
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user._id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.status(200).json({ accessToken});
    }
    else {
        res.status(401);
        throw new Error("Invalid credentials");
    }  
    //res.json({ message: 'Login user' });
});

//@desc Current user info
//@route POST /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
    //res.json({ message: 'Current user info' });
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
};