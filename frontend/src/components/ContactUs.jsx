import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactUs = () => {
return (
<div className="text-gray-800 bg-white">
<Navbar/>
{/* Hero Section */}
<div className="bg-gray-100">
<div className="text-center py-16 px-6">
<h1 className="text-4xl font-extrabold text-pink-700 mb-4">Get in Touch</h1>
<p className="text-lg text-gray-700">
We’d love to hear from you. Reach out with any questions, feedback, or suggesions. We are happy to help!
</p>
</div>
</div>


  {/* Contact Form & Info */}
  <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Form */}
    <div className="bg-pink-50 p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">Send Us a Message</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            rows="5"
            placeholder="Write your message..."
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Send Message
        </button>
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
        <h3 className="text-xl font-semibold text-pink-700 mb-2"> <i className="ri-mail-line text-2xl text-pink-600"></i> Email</h3>
        <a href="mailto:support@zerozcloths.lk" className='hover:text-pink-700'> support@zerozcloths.lk</a>
      </div>
      {/* <div>
        <h3 className="text-xl font-semibold text-pink-700 mb-2">🕒 Working Hours</h3>
        <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
      </div> */}
      <div>
        <h3 className="text-xl font-semibold text-pink-700 mb-4">Follow Us On</h3>
          <div className="flex space-x-3 text-gray-600">
            <a href="https://www.instagram.com/zerozclothes?igsh=MTJuN2JrMGozMHk1eg==" target="_blank" rel="noopener noreferrer"><i className="ri-instagram-line text-3xl hover:text-primary cursor-pointer"></i></a>
            <a href='https://www.facebook.com/profile.php?id=100057668610444' target="_blank" rel="noopener noreferrer"><i className="ri-facebook-fill text-3xl hover:text-primary cursor-pointer"></i></a>
            <a href='https://www.tiktok.com/@zeroz141?_t=ZS-8xpVIg1fneM&_r=1' target="_blank" rel="noopener noreferrer"><i className="ri-tiktok-line text-3xl hover:text-primary cursor-pointer"></i></a>
          </div>
      </div>
    </div>
  </section>
  {/* <div className="px-4 sm:px-6 pb-10">
  <h2 className="text-xl font-bold text-pink-700 text-center mb-4">Find Us on the Map</h2>
  <div className="w-1/2 h-64 sm:h-72 rounded-lg overflow-hidden shadow justify-center mx-auto">
    <iframe
      title="ZeroZ Cloths Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63313.05520331272!2d79.83020409999999!3d6.9103916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595c1e28c771%3A0x1f60e3e3c5e1f0ff!2s142%2F17B%20Thimbirigasyaya%20Rd%2C%20Colombo%2000500!5e0!3m2!1sen!2slk!4v1713096964871!5m2!1sen!2slk"
      width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
  </div>
</div> */}
  <Footer/>
</div>
);
};

export default ContactUs;