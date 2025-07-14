import React, { useState, useEffect } from 'react';
import { useUpdateOrderStatusMutation } from '../../../../redux/features/order/orderApi';

const UpdateOrder = ({ order, isOpen, onClose }) => {
  const [status, setStatus] = useState(order?.status || '');
  const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

  useEffect(() => {
    if (order?.status) {
      setStatus(order.status);
    }
  }, [order]);

  const handleUpdateOrderStatus = async () => {
    if (!status) return alert("Status is required");

    try {
      await updateOrderStatus({ id: order?._id, status }).unwrap();
      alert("Order status updated");
      onClose(); // Close modal and trigger refetch
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert(err?.data?.message || 'Failed to update order');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <i className="ri-edit-box-line text-primary text-2xl"></i> Update Order Status
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Select New Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 text-gray-700"
          >
            <option value="pending">🕒 Pending</option>
            <option value="processing">🔧 Processing</option>
            <option value="shipped">📦 Shipped</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-2 flex items-center gap-1">
            <i className="ri-error-warning-line"></i> Failed to update order.
          </p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
          >
            <i className="ri-close-circle-line mr-1"></i> Cancel
          </button>
          <button
            onClick={handleUpdateOrderStatus}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition disabled:opacity-60"
          >
            <i className="ri-upload-cloud-line mr-1"></i>
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
