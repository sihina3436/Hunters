import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetOrderByIdQuery } from '../../../../redux/features/order/orderApi';
import { useParams } from 'react-router-dom';
import TimelineStep from '../../../../components/TimelineStep';
import Invoice from '../../../../components/Invoice';

const OrderDetails = () => {
    const {user} = useSelector((state) => state.auth);
    const {orderId} = useParams();
    const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId);
    const [showInvoice, setShowInvoice] = useState(false);


    console.log(order);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching order details!</div>

    const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
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
      <p className="text-gray-600">Order ID: <span className="font-medium">{order?.orderId}</span></p>
      <p className="text-gray-600">Status: <span className="font-medium">{order?.status}</span></p>
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
      {showInvoice ? 'Hide Invoice' : 'View Invoice'}
    </button>
  </div>


{/* Invoice Display */}
{showInvoice && (
  <div className="mt-10 max-w-4xl mx-auto">
    <Invoice order={order} />
  </div>
)}

  </section>
  )
}

export default OrderDetails
