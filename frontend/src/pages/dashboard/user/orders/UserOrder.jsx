import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useGetOrdersByEmailQuery } from '../../../../redux/features/order/orderApi';

const UserOrder = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: orderdata, error, isLoading } = useGetOrdersByEmailQuery(user?.email);
  const orders = orderdata?.orders;
  console.log(orders);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>No order found!</div>

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Your Orders</h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                    #
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                    Order ID
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                    Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                    Status
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                    Total
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                    View Order
                  </th>
                </tr>
              </thead>

              <tbody>
                {
                  orders && orders.map((order, index) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle text-sm whitespace-nowrap p-4 text-left text-blueGray-700">
                        {index + 1}
                      </th>

                      {/* Order ID with copy button and tooltip */}
                      <td className="border-t-0 px-6 align-middle text-sm whitespace-nowrap p-4 text-left text-blueGray-700 flex items-center gap-2">
                        <span>{order?.orderId}</span>
                        <div className="relative group">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(order?.orderId);
                              alert("Order ID copied!");
                            }}
                            className="text-gray-500 hover:text-indigo-600 transition"
                          >
                            <i className="ri-file-copy-line text-lg"></i>
                          </button>
                          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2 pointer-events-none transition duration-200">
                            Copy
                          </div>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-middle text-sm whitespace-nowrap p-4 text-left text-blueGray-700">
                        {new Date(order?.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle text-sm whitespace-nowrap p-4">
                        <span className={`p-1 rounded 
                          ${order?.status === 'completed' ? 'bg-green-100 text-green-700' :
                            order?.status === 'pending' ? 'bg-red-100 text-red-700' :
                              order?.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                                'bg-indigo-100 text-indigo-600'}`}>
                          {order?.status}
                        </span>
                      </td>
                      <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                        {order?.amount}
                      </td>
                      <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                        <Link to={`/orders/${order?._id}`}>
                          <button className='inline-flex items-center gap-2 rounded-lg border border-primary bg-white px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                            View Order
                            <i className="ri-eye-line text-base"></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="relative pt-8 pb-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Made with ZeroZCloths.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default UserOrder;
