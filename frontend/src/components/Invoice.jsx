import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = ({ order }) => {
const invoiceRef = useRef();

const downloadInvoice = async () => {
const canvas = await html2canvas(invoiceRef.current);
const imgData = canvas.toDataURL('image/png');
const pdf = new jsPDF();
const imgProps = pdf.getImageProperties(imgData);
const pdfWidth = pdf.internal.pageSize.getWidth();
const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;


pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
pdf.save(`invoice-${order.orderId}.pdf`);
};

return (
<div className="p-6 md:p-10 font-sans bg-gray-50 min-h-screen">
<div ref={invoiceRef} className="bg-white max-w-3xl mx-auto p-8 rounded-lg shadow-lg">
{/* Header */}
<div className="flex justify-between items-center border-b pb-4 mb-6">
<div>
<h1 className="text-2xl font-bold text-gray-800">ZeroZcloths<span className="text-primary">.</span></h1>
<p className="text-sm text-gray-500">www.zerozcloths.lk | +94 72 403 6056</p>
<p className="text-sm text-gray-500">142/17 B, Thimbirigasyaya road, Colombo 05, Sri Lanka</p>
</div>
<div className="text-right">
<h2 className="text-3xl font-semibold text-gray-800">INVOICE</h2>

</div>
</div>

  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6"> 
  {/* Left Column: Invoice Details */} 
    <div> <p className="text-sm text-gray-600"><b>Invoice No: </b> {order.orderId}</p> <p className="text-sm text-gray-600"><b>Date: </b> {new Date(order.createdAt).toLocaleDateString()}</p> </div>
{/* Right Column: Billing Details */}

<div> <h3 className="text-md font-semibold text-gray-700 mb-1">Billed To:</h3> <p className="text-sm text-gray-700">{order.User?.username}</p> <p className="text-sm text-gray-600">{order.email}</p> </div> </div>

    {/* Payment Info */}
    <div className="mb-6">
      <h3 className="text-md font-semibold text-gray-700 mb-2">Payment Details:</h3>
      <p className="text-sm text-gray-600">Payment Method: {order.paymentMethod || 'Online (Stripe)'}</p>
      <p className="text-sm text-gray-600">Status: <span className="font-semibold capitalize">{order.status}</span></p>
    </div>

    {/* Items Table */}
    <div className="mb-6">
      <table className="w-full text-sm text-left border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b p-2">Item</th>
            <th className="border-b p-2">Quantity</th>
            <th className="border-b p-2">Unit Price (Rs.)</th>
            <th className="border-b p-2">Total (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">{item.price}</td>
              <td className="p-2">{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Total Summary */}
    <div className="overflow-x-auto max-w-md ml-auto"> 
      <table className="min-w-full text-sm text-right border border-gray-200 bg-white rounded-md shadow-md"> 
        <tbody> 
          <tr className="border-b"> 
          <td className="px-4 py-2 font-medium text-gray-700 text-left">Subtotal</td> 
          <td className="px-4 py-2 text-gray-700">Rs. {order.amount}</td> 
          </tr> 
          {order.discount && ( <tr className="border-b"> <td className="px-4 py-2 font-medium text-gray-700 text-left">Discount</td> 
          <td className="px-4 py-2 text-red-500">-Rs. {order.discount}</td> </tr> )} 
          <tr className="bg-gray-100"> 
            <td className="px-4 py-3 font-semibold text-gray-900 text-left">Total</td>
           <td className="px-4 py-3 font-bold text-gray-900"> Rs. {order.amount - (order.discount || 0)} </td> 
           </tr> 
           </tbody> 
           </table> 
           </div>

    {/* Footer */}
    <div className="mt-10 text-center text-xs text-gray-500 border-t pt-4">
      <p>Thank you for shopping with ZeroZ Clothes!</p>
      <p>This is a computer-generated invoice and does not require a signature.</p>
    </div>
  </div>

  {/* Download Button */}
  <div className="text-center mt-8">
    <button
      onClick={downloadInvoice}
      className="bg-primary hover:bg-pink-700 text-white py-2 px-6 rounded transition"
    >
      Download Invoice
    </button>
  </div>
</div>
);
};

export default Invoice;