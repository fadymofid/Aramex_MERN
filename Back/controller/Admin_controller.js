const express = require('express'); // Express is imported as express, not app.
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure you have the User model imported


const AssignedOrders = async (req, res) => {
  try {
    console.log(req.body);
    const {OrderId ,courieruserId} = req.body;
    
    const order = await Order.findOne({ _id: OrderId });
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    const user = await User.findOne({ userId: courieruserId });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.role !== 'courier') {
        return res.status(400).json({ msg: "User is not a courier" });
    }
    order.courieruserId = courieruserId;
    await order.save();
    res.status(200).json({ msg: "Order assigned successfully", data: order });


}

catch (error) {
     res.status(400).json({ msg: "Error fetching orders", error: error.message });
}
    
    };

    const getAllOrders = async (req, res) => {
        try {
            const orders = await Order.find();
            res.status(200).json({ msg: "Orders retrieved successfully", data: orders });
        } catch (error) {
            res.status(400).json({ msg: "Error retrieving orders", error: error.message });
        }
    };

    const updateOrder = async (req, res) => {
        try {
            const { orderId, updateData } = req.body;
            const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
            if (!order) {
                return res.status(404).json({ msg: "Order not found" });
            }
            res.status(200).json({ msg: "Order updated successfully", data: order });
        } catch (error) {
            res.status(400).json({ msg: "Error updating order", error: error.message });
        }
    };

    const deleteOrder = async (req, res) => {
        try {
            const { OrderId } = req.body;
    
            // Check if the order exists before attempting to delete it
            const order = await Order.findOne({ _id: OrderId });
            if (!order) {
                return res.status(404).json({ msg: "Order not found" });
            }
    
            // Delete the order
            await Order.deleteOne({ _id: OrderId });
    
            res.status(200).json({ msg: "Order deleted successfully" });
        } catch (error) {
            res.status(400).json({ msg: "Error deleting order", error: error.message });
        }
    };
    

    module.exports = { AssignedOrders, updateOrder,getAllOrders, deleteOrder };

