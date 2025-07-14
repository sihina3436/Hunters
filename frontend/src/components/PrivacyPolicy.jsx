import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PrivacyPolicy = () => {
return (
<div className="text-gray-800 bg-white min-h-screen">
  <Navbar />
<div className="bg-white text-gray-800 px-6 py-16 mt-2 max-w-5xl mx-auto">
<h3 className="text-3xl font-bold text-pink-700 mb-6 text-center">Privacy Policy</h3>

  <p className="mb-6">
    At ZeroZ Cloths, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and protect your data when you use our website and services.
  </p>

  <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-2">1. Information We Collect</h2>
  <ul className="list-disc pl-6 space-y-2">
    <li>Personal details such as your name, email, shipping address, and phone number.</li>
    <li>Payment information via secure gateways (we do not store card details).</li>
    <li>Account credentials and user preferences.</li>
    <li>Order history and communication records.</li>
    <li>Browsing behavior and device information (via cookies and analytics tools).</li>
  </ul>

  <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-2">2. How We Use Your Information</h2>
  <ul className="list-disc pl-6 space-y-2">
    <li>To process and fulfill your orders efficiently.</li>
    <li>To communicate with you about your orders or inquiries.</li>
    <li>To send promotional emails (only if you've subscribed).</li>
    <li>To improve website functionality, user experience, and security.</li>
    <li>To comply with legal obligations.</li>
  </ul>

  <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-2">3. Data Sharing</h2>
  <p className="mb-4">
    We do not sell or rent your personal information. We only share your data with:
  </p>
  <ul className="list-disc pl-6 space-y-2">
    <li>Payment gateways (e.g., PayHere or Stripe) to process secure payments.</li>
    <li>Shipping providers to deliver your orders.</li>
    <li>Third-party tools for analytics or customer communication (under confidentiality agreements).</li>
  </ul>

  <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-2">4. Data Security</h2>
  <p className="mb-4">
    We use SSL encryption, secure authentication, and data protection protocols to keep your information safe. However, no method is 100% secure, so we recommend using strong passwords and logging out after use.
  </p>

  <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-2">5. Your Rights</h2>
  <ul className="list-disc pl-6 space-y-2">
    <li>You can access, update, or delete your personal data anytime from your profile.</li>
    <li>You can opt out of promotional emails using the unsubscribe link.</li>
    <li>You can contact us to request data removal or raise privacy concerns.</li>
  </ul>

  <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-2">6. Cookies</h2>
  <p className="mb-4">
    Our website uses cookies to enhance user experience. You can disable cookies in your browser settings, but some features may not function properly.
  </p>

  <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-2">7. Updates to This Policy</h2>
  <p className="mb-4">
    We may update this policy occasionally. Changes will be posted on this page with an updated revision date.
  </p>

  <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-2">8. Contact Us</h2>
  <p className="mb-4">
    If you have any questions or concerns about our privacy practices, please <a href='/contactus' className='text-pink-700 hover:text-pink-400'>contact us</a>
  </p>

  <p className="text-sm text-gray-500 mt-10">Last updated: July 2025</p>
  
</div>
<Footer />
</div>
);
};
export default PrivacyPolicy;