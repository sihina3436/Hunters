import React, { useState } from 'react';
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/order/orderApi';
import { formatDate } from '../../../../utils/formateDate';
import { Link } from 'react-router-dom';
import UpdateOrder from './UpdateOrder';

const ManageOrder = () => {
  const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
    refetch();
  };

  const handleDeleteOrder = async (orderID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await deleteOrder(orderID).unwrap();
      alert("Order deleted successfully");
      refetch();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete order");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-pending text-white';
      case 'processing': return 'bg-processing text-white';
      case 'shipped': return 'bg-shipped text-white';
      case 'completed': return 'bg-completed text-white';
      default: return 'bg-gray-100 text-white';
    }
  };

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading orders...</div>;
  if (error) return <div className="text-center text-red-500 py-20">Failed to load orders</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        <i className="ri-clipboard-line text-primary text-2xl"></i> Manage Orders
      </h2>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
            <tr>
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {orders?.map((order) => (
              <tr key={order._id} className="border-t hover:bg-gray-50 transition duration-150">
                <td className="py-3 px-6 font-medium">{order?.orderId}</td>
                <td className="py-3 px-6">{order?.email}</td>
                <td className="py-3 px-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order?.status)}`}>
                    {order?.status}
                  </span>
                </td>
                <td className="py-3 px-6">{formatDate(order?.updatedAt)}</td>
                <td className="py-3 px-6 flex gap-2 items-center whitespace-nowrap">
                  <Link to={`/dashboard/admin/orders/${order._id}`} className="flex items-center gap-1 text-primary hover:text-primary-dark transition">
                    <i className="ri-eye-line"></i> View
                  </Link>
                  <button
                    onClick={() => handleEditOrder(order)}
                    className="inline-flex items-center gap-3 rounded-lg border border-primary ml-2 bg-white px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <i className="ri-edit-line"></i> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="inline-flex items-center gap-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <i className="ri-delete-bin-6-line"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
        <UpdateOrder
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ManageOrder;
