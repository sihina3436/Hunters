import React, { useState } from 'react';
import { usePostContactMutation } from '../redux/features/contact/contactApi';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactUs = () => {
  const [postContact, { isLoading, error, isSuccess }] = usePostContactMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postContact(formData).unwrap();
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      alert('Failed to send message.');
    }
  };

  return (
    <div className="text-gray-800 bg-white">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gray-100">
        <div className="text-center py-16 px-6">
          <h1 className="text-4xl font-extrabold text-pink-700 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-700">
            We’d love to hear from you. Reach out with any questions, feedback, or suggestions.
          </p>
        </div>
      </div>

      {/* Contact Form & Info */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-pink-50 p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-pink-700 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Your name"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message..."
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
            {error && <p className="text-red-500 mt-2">Failed to send message. Try again.</p>}
            {isSuccess && <p className="text-green-600 mt-2">Message sent successfully!</p>}
          </form>
        </div>

        {/* Info Panel */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-pink-700 mb-2"><i className="ri-map-pin-line text-2xl text-pink-600"></i> Our Store</h3>
            <p>ZeroZ Cloths - 142/17 B, Thimbirigasyaya road</p>
            <p>Colombo 05, Sri Lanka</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-pink-700 mb-2"><i className="ri-phone-line text-2xl text-pink-600"></i> Phone</h3>
            <p>+94 72 403 6056 </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-pink-700 mb-2"><i className="ri-mail-line text-2xl text-pink-600"></i> Email</h3>
            <a href="mailto:support@zerozcloths.lk" className='hover:text-pink-700'>zerozclothes@gmail.com</a>
          </div>
          {/* Add social icons if you want */}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
