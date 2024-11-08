
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExists = await User.findOne({ username });

        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        const token = generateToken(newUser._id);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user._id);
            return res.json({ token });
        }

        res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};
