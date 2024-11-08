const app=require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const CreateUser = async (req, res) => {
  try {
    const { name, password, email, role, phone } = req.body;

    // Check if user already exists by email or name
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create the user with provided data
    const newUser = await User.create({ name, password, email, role, phone });

    res.status(201).json({ msg: "User created successfully", data: newUser });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ msg: errors });
    }
    res.status(500).json({ msg: "Error creating user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedinusers = await User.findOne({ email, password });
    if (!loggedinusers) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Use the correct field name for the user ID
    const token = jwt.sign({ userId: loggedinusers.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ user: loggedinusers, token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ msg: errors });
    }
    res.status(500).json({ msg: "Error logging in", error: error.message });
  }
};

module.exports = { CreateUser, loginUser };