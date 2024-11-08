import React, { useState } from 'react';

const OrderStatusUpdate = ({ acceptedOrders, updateOrderStatus, onClose }) => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const handleStatusChange = (e) => setNewStatus(e.target.value);

  const handleUpdateStatus = () => {
    if (selectedOrderId && newStatus) {
      updateOrderStatus(selectedOrderId, newStatus);
      setSelectedOrderId(null);
      setNewStatus('');
    }
  };

  return (
    <div className="order-status-update">
      <h3>Update Status for Accepted Orders</h3>
      {acceptedOrders.length > 0 ? (
        <div>
          <select
            className="form-select"
            value={selectedOrderId || ''}
            onChange={(e) => setSelectedOrderId(Number(e.target.value))}
          >
            <option value="" disabled>Select an order</option>
            {acceptedOrders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.orderName}
              </option>
            ))}
          </select>
          <div className="form-group mt-3">
            <label htmlFor="status">New Status</label>
            <select
              id="status"
              className="form-control"
              value={newStatus}
              onChange={handleStatusChange}
            >
              <option value="">Select Status</option>
              <option value="Picked Up">Picked Up</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <button className="btn btn-primary mt-3" onClick={handleUpdateStatus}>
            Update Status
          </button>
        </div>
      ) : (
        <p>No accepted orders available for update.</p>
      )}
      <button className="btn btn-secondary mt-3" onClick={onClose}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default OrderStatusUpdate;
