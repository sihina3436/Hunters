import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const ShippingInfo = () => {
return (
<div>
<Navbar />
<div className="bg-white text-gray-800 px-6 py-10 mt-2 max-w-5xl mx-auto">
<h1 className="text-4xl font-bold text-pink-700 mb-8 text-center">
Shipping Information
</h1>

    <section className="mb-10">
      <h2 className="text-xl font-semibold text-pink-600 mb-2 flex items-center">
        <i className="ri-truck-line text-pink-500 mr-2"></i> Delivery Coverage
      </h2>
      <p>
        We currently deliver to all major cities and towns across Sri Lanka via trusted courier partners. We’re working to expand our network to cover even more regions.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-semibold text-pink-600 mb-2 flex items-center">
        <i className="ri-time-line text-pink-500 mr-2"></i> Delivery Timeframes
      </h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Colombo & suburbs: 1–2 business days</li>
        <li>Other Western Province areas: 2–3 business days</li>
        <li>Outstation deliveries: 3–5 business days</li>
      </ul>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-semibold text-pink-600 mb-2 flex items-center">
        <i className="ri-wallet-3-line text-pink-500 mr-2"></i> Shipping Fees
      </h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Orders below Rs. 5,000: Rs. 350 flat fee</li>
        <li>Orders above Rs. 15,000: Free shipping</li>
      </ul>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-semibold text-pink-600 mb-2 flex items-center">
        <i className="ri-map-pin-line text-pink-500 mr-2"></i> Order Tracking
      </h2>
      <p>
        Once your order is shipped, you’ll receive a tracking number via email. You can also track your order anytime under <strong>My Orders</strong> after logging into your account.
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-semibold text-pink-600 mb-2 flex items-center">
        <i className="ri-shopping-bag-line text-pink-500 mr-2"></i> Same-Day Delivery (Colombo Only)
      </h2>
      <p>
        For select items and addresses within Colombo, we offer same-day delivery if your order is placed before 12 PM. Extra charges may apply.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-pink-600 mb-2 flex items-center">
        <i className="ri-error-warning-line text-pink-500 mr-2"></i> Important Notes
      </h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Delivery delays may occur during public holidays or weather disruptions.</li>
        <li>Cash on Delivery is available only for orders under Rs. 15,000.</li>
        <li>Please ensure your shipping address and phone number are accurate to avoid delays.</li>
      </ul>
    </section>

    <p className="text-sm text-gray-500 mt-10">Last updated: July 2025</p>
  </div>
  <Footer />
</div>
);
};

export default ShippingInfo;