import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // ✅ Import from Redux
import { getBaseURL } from '../utils/baseURL';
import Spinner from './Spinner';
import TimelineStep from './TimelineStep';
import Invoice from './Invoice';

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  const cartProducts = useSelector((state) => state.cart.products); // ✅ Get cart products

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');

    if (sessionId) {
      fetch(`${getBaseURL()}/api/orders/confirm-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          products: cartProducts, // ✅ Pass products to backend
        }),
      })
        .then((res) => res.json())
        .then((data) => setOrder(data.order))
        .catch((err) => console.error('Error confirming payment', err));
    }
  }, []);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const isCompleted = (status) => {
    const statuses = ['pending', 'processing', 'shipped', 'completed'];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;

  const steps = [
    {
      status: 'pending',
      label: 'Pending',
      description: 'Your order has been created and is awaiting processing.',
      icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
    },
    {
      status: 'processing',
      label: 'Processing',
      description: 'Your order is currently being processed.',
      icon: { iconName: 'loader-line', bgColor: 'yellow-800', textColor: 'yellow-800' },
    },
    {
      status: 'shipped',
      label: 'Shipped',
      description: 'Your order has been shipped.',
      icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-800' },
    },
    {
      status: 'completed',
      label: 'Completed',
      description: 'Your order has been successfully completed.',
      icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'green-900' },
    },
  ];

  return (
    <section className="max-w-6xl mx-auto mt-8 mb-8 px-6 py-16 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment {order?.status}</h2>
        <p className="text-gray-600">
          Order ID: <span className="font-medium">{order?.orderId}</span>
        </p>
        <p className="text-gray-600">
          Status: <span className="font-medium">{order?.status}</span>
        </p>
      </div>

      <ol className="flex flex-col sm:flex-row justify-center items-center gap-10 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <TimelineStep
            key={index}
            step={step}
            order={order}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1}
            icon={step.icon}
            description={step.description}
          />
        ))}
      </ol>

      {/* Show Invoice Button */}
      <div className="text-center mt-10">
        <button
          onClick={() => setShowInvoice((prev) => !prev)}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
        >
          View Invoice
        </button>
      </div>

      {/* Invoice Display */}
      {showInvoice && (
        <div className="mt-10 max-w-4xl mx-auto">
          <Invoice order={order} />
        </div>
      )}
    </section>
  );
};

export default PaymentSuccess;
