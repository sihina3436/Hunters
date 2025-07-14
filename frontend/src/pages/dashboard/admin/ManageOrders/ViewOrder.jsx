import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../../../redux/features/order/orderApi';
import { formatDate } from '../../../../utils/formateDate';
import { useGetUserByEmailQuery } from '../../../../redux/features/auth/authApi';

const ViewOrder = () => {
  const { orderId } = useParams();
  const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId);
  const { data: user } = useGetUserByEmailQuery(order?.email);

  if (isLoading) return <div className="text-center py-20 text-gray-500">Loading order details...</div>;
  if (error) return <div className="text-center text-red-500 py-20">Failed to load order details</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100 mt-10 space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <i className="ri-file-list-3-line text-blue-500"></i>
          Order Summary
        </h2>
        <div className="space-y-2 text-gray-700 text-base">
          <p><i className="ri-hashtag text-gray-500 mr-1"></i><strong>Order ID:</strong> {order?.orderId}</p>
          <p><i className="ri-mail-line text-gray-500 mr-1"></i><strong>Email:</strong> {order?.email}</p>
          <p><i className="ri-information-line text-gray-500 mr-1"></i><strong>Status:</strong> <span className="capitalize">{order?.status}</span></p>
          <p><i className="ri-money-dollar-circle-line text-gray-500 mr-1"></i><strong>Amount:</strong> ${order?.amount}</p>
          <p><i className="ri-calendar-line text-gray-500 mr-1"></i><strong>Updated At:</strong> {formatDate(order?.updatedAt)}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <i className="ri-shopping-cart-2-line text-green-500"></i> Products Ordered
        </h3>
        <ul className="divide-y divide-gray-200">
          {order?.products?.map((prod) => (
            <li key={prod.productId} className="py-2 flex justify-between text-sm text-gray-700">
              <span>📦 {prod.productId}</span>
              <span>Qty: {prod.quantity} × ${prod.price}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <i className="ri-map-pin-line text-rose-500"></i> Shipping Address
        </h3>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-1 text-gray-700 text-sm">
          {user?.address?.street ||
          user?.address?.city ||
          user?.address?.state ||
          user?.address?.postalCode ||
          user?.address?.country ? (
            <>
              <p><i className="ri-road-map-line text-gray-500 mr-1"></i> <strong>Street:</strong> {user.address.street || 'N/A'}</p>
              <p><i className="ri-community-line text-gray-500 mr-1"></i> <strong>City:</strong> {user.address.city || 'N/A'}</p>
              <p><i className="ri-government-line text-gray-500 mr-1"></i> <strong>State:</strong> {user.address.state || 'N/A'}</p>
              <p><i className="ri-mail-send-line text-gray-500 mr-1"></i> <strong>Postal Code:</strong> {user.address.postalCode || 'N/A'}</p>
              <p><i className="ri-global-line text-gray-500 mr-1"></i> <strong>Country:</strong> {user.address.country || 'N/A'}</p>
            </>
          ) : (
            <p className="text-gray-400 italic flex items-center gap-1">
              <i className="ri-alert-line text-yellow-500"></i> No shipping address provided by the user.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
