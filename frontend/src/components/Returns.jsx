import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Returns = () => {
  return (
    <div className="text-gray-800 bg-white min-h-screen">
        <Navbar />
      <div className="bg-gray-50 py-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-pink-800 mb-4">Return Policy</h3>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          We want you to love what you wear! Please read our return terms carefully before requesting a return.
        </p>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div className="flex items-start gap-4">
          <i className="ri-arrow-go-back-line text-2xl text-pink-600 mt-1"></i>
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Return Timeframe</h2>
            <p>
              Items can be returned within <strong>7 days</strong> of delivery. Return requests made after this period will not be accepted.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="ri-checkbox-circle-line text-2xl text-pink-600 mt-1"></i>
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Eligibility</h2>
            <p>
              ZeroZ Cloths gladly accepts returns for items due to a change of mind. Returned products must be unused, unwashed, and in original condition with tags and packaging intact in a condition suitable for resale.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="ri-truck-line text-2xl text-pink-600 mt-1"></i>
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Return Shipping</h2>
            <p className="mb-2">
              <strong>If the delivered items are incorrect, damaged, or faulty.</strong>
            </p>
            <p> 
                Please send us an email or send us a WhatsApp message at +94 72 403 6056 with the details regarding your order, including the order number, invoice number, and the reason for return. We will investigate the matter and get back to you promptly. we will arrange for the courier to collect the product free of charge.
            </p>
            <p className='mt-2 mb-2'><strong>Change of Mind</strong> 
            </p>
            <p>
                Return/Exchange shipping will be paid at the customer’s expense. 
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="ri-close-line text-2xl text-pink-600 mt-1"></i>
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Non-Returnable Items</h2>
            <p>
              Clearance items, lingerie, swimwear, and accessories cannot be returned due to hygiene concerns.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Returns;
