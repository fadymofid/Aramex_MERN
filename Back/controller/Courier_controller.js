const express = require('express'); // Express is imported as express, not app.
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure you have the User model imported

const AssignedOrders = async (req, res) => {
  try {
    const { userId } = req.user;
    const orders = await Order.find({ courieruserId: userId });
    res.status(200).json({ data: orders });
}

    catch (error) {
        res.status(400).json({ msg: "Error fetching orders", error: error.message });
      }

    };

const UpdateOrderStatus = async (req ,res) => {

    try {
        const { userId } = req.user;
        const orders = await Order.find({ courieruserId: userId });
        const { OrderId ,status } = req.body;
        const order = await orders.find(order => order.OrderId == OrderId);
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ msg: "Order status updated successfully", data: order });

    }
    catch (error) {
        res.status(400).json({ msg: "Error updating order status", error: error.message });
    }
}


    module.exports = { AssignedOrders, UpdateOrderStatus }; // Export the functions as an object