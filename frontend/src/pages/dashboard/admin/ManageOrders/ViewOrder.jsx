import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../../redux/features/order/orderApi";
import { formatDate } from "../../../../utils/formateDate";
import { useGetUserByEmailQuery } from "../../../../redux/features/auth/authApi";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  completed: "bg-green-100 text-green-700 border-green-300",
  cancelled: "bg-red-100 text-red-700 border-red-300",
};

const ViewOrder = () => {
  const { orderId } = useParams();
  const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId);
  const { data: user } = useGetUserByEmailQuery(order?.email);

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-500">Loading order details...</div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load order details
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-xl border border-gray-200 mt-10 space-y-8">
      {/* Order Summary */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <i className="ri-file-list-3-line text-blue-500"></i>
          Order Summary
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-700 text-base">
          <p>
            <i className="ri-hashtag text-gray-500 mr-1"></i>
            <strong>Order ID:</strong> {order?.orderId}
          </p>
          <p>
            <i className="ri-mail-line text-gray-500 mr-1"></i>
            <strong>Email:</strong> {order?.email}
          </p>
          <p>
            <i className="ri-information-line text-gray-500 mr-1"></i>
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm border ${statusColors[order?.status] || "bg-gray-100 text-gray-700 border-gray-300"}`}
            >
              {order?.status}
            </span>
          </p>
          <p>
            <i className="ri-money-dollar-circle-line text-gray-500 mr-1"></i>
            <strong>Amount:</strong> ${order?.amount}
          </p>
          <p className="md:col-span-2">
            <i className="ri-calendar-line text-gray-500 mr-1"></i>
            <strong>Updated At:</strong> {formatDate(order?.updatedAt)}
          </p>
        </div>
      </div>

      {/* Products Ordered */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <i className="ri-shopping-cart-2-line text-green-500"></i> Products
          Ordered
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Product ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order?.products?.map((prod) => (
                <tr
                  key={prod.productId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    {prod.productId}
                  </td>
                  <td className="px-4 py-3">{prod.name}</td>
                  <td className="px-4 py-3">{prod.size}</td>
                  <td className="px-4 py-3">{prod.quantity}</td>
                  <td className="px-4 py-3">${prod.price}</td>
                  <td className="px-4 py-3 font-semibold">
                    ${prod.price * prod.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <i className="ri-map-pin-line text-rose-500"></i> Shipping Address
        </h3>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-2 text-gray-700 text-sm">
          {user?.address ? (
            <>
              <p>
                <strong>Street:</strong> {user.address.street || "N/A"}
              </p>
              <p>
                <strong>City:</strong> {user.address.city || "N/A"}
              </p>
              <p>
                <strong>State:</strong> {user.address.state || "N/A"}
              </p>
              <p>
                <strong>Postal Code:</strong> {user.address.postalCode || "N/A"}
              </p>
              <p>
                <strong>Country:</strong> {user.address.country || "N/A"}
              </p>
            </>
          ) : (
            <p className="text-gray-400 italic flex items-center gap-1">
              <i className="ri-alert-line text-yellow-500"></i> No shipping
              address provided.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
