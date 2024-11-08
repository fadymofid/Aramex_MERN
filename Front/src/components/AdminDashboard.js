import React, { useState } from 'react';
import ManageOrders from './ManageOrders';
import AdminAssignedOrders from './AdminAssignedOrders';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([
    { id: 1, orderName: 'Order 1', status: 'Pending', courierName: 'John Doe' },
    { id: 2, orderName: 'Order 2', status: 'Assigned', courierName: 'Jane Smith' },
    { id: 3, orderName: 'Order 3', status: 'In Progress', courierName: null },
    // Add more initial orders as needed
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const assignedOrders = orders.filter((order) => order.status === 'Assigned' || order.courierName);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <ManageOrders orders={orders} updateOrderStatus={updateOrderStatus} deleteOrder={deleteOrder} />
      <AdminAssignedOrders assignedOrders={assignedOrders} />
    </div>
  );
};

export default AdminDashboard;
