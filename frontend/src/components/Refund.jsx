import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Refund = () => {
  return (
    <div className="text-gray-800 bg-white min-h-screen">
        <Navbar />
      <div className="bg-gray-50 py-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-pink-800 mb-4">Refund Policy</h3>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Once your return is received and approved, you’ll be eligible for a refund under the following terms.
        </p>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div className="flex items-start gap-4">
          <i className="ri-exchange-dollar-line text-2xl text-pink-600 mt-1"></i>
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Refund Processing</h2>
            <p>
              Approved refunds will be processed within <strong>5–7 business days</strong> via the original payment method.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="ri-error-warning-line text-2xl text-pink-600 mt-1"></i>
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Deductions</h2>
            <p>
              Shipping and handling charges are non-refundable unless your item was defective or damaged.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="ri-information-line text-2xl text-pink-600 mt-1"></i>
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Refund Status</h2>
            <p>
              You'll receive a confirmation email once your refund has been processed. If delays occur, please contact zerozclothes@gmail.com.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Refund;
