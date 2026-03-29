const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'username, email and password are required' });
        }

        const exists = await userModel.findOne({ $or: [{ username }, { email }] });
        if (exists) return res.status(409).json({ message: 'User already exists' });

        const user = await userModel.create({ username, email, password: await bcrypt.hash(password, 10) });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        return res.status(201).json({ message: 'Registered', token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function login(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!password || (!username && !email)) {
            return res.status(400).json({ message: 'Provide (username or email) and password' });
        }

        const user = await userModel.findOne({ $or: [{ username }, { email }] });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({ message: 'Login successful', token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function me(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { register, login, logout, me };
