const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT and extract user information
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided, authorization denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: 'Token is not valid' });
    req.user = user; // Add user data to request
    next();
  });
};

// Create a new order
const CreateOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { pickupLocation, dropoffLocation, packageDetails, deliveryTime, courieruserId = null } = req.body;

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const newOrder = await Order.create({
      userId,
      pickupLocation,
      dropoffLocation,
      packageDetails,
      deliveryTime,
      courieruserId
    });

    res.status(201).json({ msg: 'Order created successfully', data: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ msg: 'Error creating order', error: error.message });
  }
};

// Get orders for a user
const GetUserOrders = async (req, res) => {
  try {
    const { userId } = req.user;
    const orders = await Order.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ msg: 'No orders found' });
    }

    res.status(200).json({ data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ msg: 'Error fetching orders', error: error.message });
  }
};

// Get specific order by ID for a user
const getOrderBYid = async (req, res) => {
  try {
    // Log the incoming request and user ID
    console.log('Request Params:', req.params);
    console.log('Authenticated User ID:', req.user.userId);

    const { id } = req.params; // Order ID from URL parameter
    const { userId } = req.user; // User ID from authenticated user

    // Log the ID and userId to ensure they are correct
    console.log('Looking for order with ID:', id, 'for user with userId:', userId);

    // Query to find the order for the authenticated user
    const order = await Order.findOne({ _id: id, userId });

    // Log the result of the order query
    console.log('Order found:', order);

    if (!order) {
      console.log('No order found with the given ID and userId');
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Log the courier information if populated
    const courierId = order.courieruserId;
    if (!courierId) {
      return res.status(200).json({ data: order });
    }
    const courier = await User.findOne({userId:courierId});
    const { name, email, phone } = courier;
    console.log(courier);

    // Respond with the order and courier data
    res.status(200).json({ data: order, courier });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ msg: 'Error fetching order details', error: error.message });
  }
};


// Cancel an order if status is pending
const CancelOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    const order = await Order.findOne({ _id: id, userId });
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    if (order.status === 'pending') {
      order.status = 'canceled';
      await order.save();
      res.status(200).json({ msg: 'Order canceled successfully', data: order });
    } else {
      res.status(400).json({ msg: 'Order cannot be canceled', data: order });
    }
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(400).json({ msg: 'Error canceling order', error: error.message });
  }
};

module.exports = {
  CreateOrder,
  GetUserOrders,
  getOrderBYid,
  CancelOrder
};
