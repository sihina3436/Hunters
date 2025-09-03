import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TermsAndConditions = () => {

  return (
    <div className="text-gray-800 bg-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="bg-gray-50 py-16 px-6 text-center">
        <h1 className="text-3xl font-bold text-pink-800 mb-4">Terms & Conditions</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          These Terms and Conditions govern your use of our website and
          any purchase made on our platform. By accessing or using the site, you agree to these terms.
        </p>
      </div>

      {/* Body */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        {/* Use of the Website */}
        <div className="flex items-start gap-4">
          <i className="ri-global-line text-2xl text-pink-600 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Use of the Website</h2>
            <ol className="list-[lower-alpha] pl-5 space-y-2">
              <li>You must be at least 14 years old to use our website or make purchases.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You agree to provide accurate, current information during registration and checkout.</li>
              <li>You must not use the website for any unlawful or unauthorized purposes.</li>
            </ol>
          </div>
        </div>

        {/* Product Information and Pricing */}
        <div className="flex items-start gap-4">
          <i className="ri-price-tag-3-line text-2xl text-pink-600 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Product Information & Pricing</h2>
            <ol className="list-[lower-alpha] pl-5 space-y-2">
              <li>We strive for accuracy in descriptions, images, and pricing but do not guarantee completeness.</li>
              <li>Prices may change without notice. Promotions/discounts are time-limited and may carry extra terms.</li>
            </ol>
          </div>
        </div>

        {/* Orders and Payments */}
        <div className="flex items-start gap-4">
          <i className="ri-shopping-bag-3-line text-2xl text-pink-600 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Orders & Payments</h2>
            <ol className="list-[lower-alpha] pl-5 space-y-2">
              <li>Placing an order constitutes an offer to purchase selected products.</li>
              <li>We may refuse or cancel orders for reasons including availability, pricing/errors, or suspected fraud.</li>
              <li>You authorize charges of the total amount (including taxes/shipping) to your chosen method.</li>
              <li>Payments are processed by trusted third-party processors; we do not store full payment details.</li>
            </ol>
          </div>
        </div>

        {/* Shipping and Delivery */}
        <div className="flex items-start gap-4">
          <i className="ri-truck-line text-2xl text-pink-600 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Shipping & Delivery</h2>
            <ol className="list-[lower-alpha] pl-5 space-y-2">
              <li>We make reasonable efforts to ship and deliver orders promptly.</li>
              <li>Delivery timeframes are estimates and may vary by location and other factors.</li>
            </ol>
          </div>
        </div>

        {/* Returns and Refunds */}
        <div className="flex items-start gap-4">
          <i className="ri-loop-right-line text-2xl text-pink-600 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Returns & Refunds</h2>
            <p>
              Returns and refunds are governed by our <a href='/returns' className='text-pink-700 hover:text-pink-400'>Returns</a> & <a href='/refund' className='text-pink-700 hover:text-pink-400'>Refund</a> Policy. Please refer those for more details.
            </p>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="flex items-start gap-4">
          <i className="ri-copyright-line text-2xl text-pink-600 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Intellectual Property</h2>
            <ol className="list-[lower-alpha] pl-5 space-y-2">
              <li>All site content (text, images, logos, graphics) is owned by Zeroz Cloths or its licensors.</li>
              <li>Reproduction, distribution, or modification of any content is prohibited without prior written consent.</li>
            </ol>
          </div>
        </div>

        {/* Amendments and Termination */}
        <div className="flex items-start gap-4">
          <i className="ri-edit-line text-2xl text-pink-600 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-pink-700 mb-2">Amendments & Termination</h2>
            <p>
              We may modify, update, or terminate these Terms at any time without prior notice. Please review them periodically.
            </p>
            <p>
              For more inquiries, contact our support team via <a href='/contactus' className='text-pink-700 hover:text-pink-400'>contact us</a>.
            </p>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
