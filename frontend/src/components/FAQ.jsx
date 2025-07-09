import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const FAQ = () => {
const faqs = [
{
question: 'How do I place an order?',
answer:
'Browse our products and click “Add to Cart.” Once you’re ready, go to your cart and proceed to checkout. Enter your delivery details and payment info to complete the order.',
},
{
question: 'How can I track my order?',
answer:
'After placing your order, you’ll receive a confirmation email with a tracking link. You can also check order status under “My Orders” after logging into your account.',
},
{
question: 'What payment methods do you accept?',
answer:
'We accept credit/debit cards, PayHere payments, and cash on delivery (COD) across Sri Lanka.',
},
{
question: 'Do you offer international shipping?',
answer:
'Currently, we only ship within Sri Lanka. We hope to expand internationally in the near future!',
},
{
question: 'How do I return an item?',
answer:
'Go to your account and select the order you want to return. Click “Request Return” and follow the instructions. We accept returns within 7 days of delivery.',
},
{
question: 'Can I cancel or modify an order?',
answer:
'Orders can only be canceled or changed before they are shipped. Contact our support team immediately for assistance.',
},
{
question: 'How can I contact customer support?',
answer: (
<span>
You can reach us via our{' '}
<a href="/contactus" className="text-pink-600 hover:text-pink-800 transition" >Contact Us </a>{' '} or send an email directly to{' '}
<a href="mailto:zerozclothes@gmail.com " className="text-pink-600 hover:text-pink-800 transition" > zerozclothes@gmail.com </a>.</span>
),},
{
question: 'Are my payment details secure?',
answer:
'Absolutely. We use SSL encryption and PCI-compliant payment gateways to ensure all transactions are secure.',
},
];

return (
<div className="text-gray-800 bg-white min-h-screen">
<Navbar />
<div className="bg-white text-gray-800 px-6 py-16 mt-2 max-w-5xl mx-auto">
<h1 className="text-4xl font-bold text-pink-700 text-center mb-10">Frequently Asked Questions</h1>
<div className="space-y-6">
{faqs.map((faq, index) => (
<div key={index} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
<h3 className="text-lg font-semibold text-pink-700 mb-2">{faq.question}</h3>
<p className="text-gray-700">{faq.answer}</p>
</div>
))}
</div>
</div>
<Footer />
</div>
);
};

export default FAQ;