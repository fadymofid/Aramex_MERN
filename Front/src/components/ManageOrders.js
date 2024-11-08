import React from 'react';

const ManageOrders = ({ orders, updateOrderStatus, deleteOrder }) => {
  return (
    <div className="manage-orders">
      <h2>Manage Orders</h2>
      {orders.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderName}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => updateOrderStatus(order.id, 'Completed')}
                  >
                    Mark as Completed
                  </button>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => updateOrderStatus(order.id, 'In Progress')}
                  >
                    Set In Progress
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default ManageOrders;
