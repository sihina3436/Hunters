import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
        
        {/* Left Section - Logo & Social Media */}
        <div className="flex flex-col items-start space-y-4">
          <div className="w-auto h-auto flex items-center justify-center text-text-dark text-2xl font-bold">
          ZeroZcloths<span className="text-primary">.</span>
          </div>
          <p className="text-primary font-semibold text-lg">let's socialize</p>
          <div className="flex space-x-4 text-gray-600">
            <i className="ri-instagram-line text-2xl hover:text-primary cursor-pointer"></i>
            <i className="ri-facebook-fill text-2xl hover:text-primary cursor-pointer"></i>
            <i className="ri-pinterest-line text-2xl hover:text-primary cursor-pointer"></i>
            <i className="ri-youtube-line text-2xl hover:text-primary cursor-pointer"></i>
            <i className="ri-tiktok-line text-2xl hover:text-primary cursor-pointer"></i>
          </div>
        </div>

        {/* Middle Section - Shop & Explore / Info */}
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="text-primary-dark font-semibold">HELP & SUPPORT</h3>
            <ul className="mt-2 space-y-1">
              <li className="hover:text-primary cursor-pointer">Returns</li>
              <li className="hover:text-primary cursor-pointer">Refund</li>
              <li className="hover:text-primary cursor-pointer">Contact us</li>
              <li className="hover:text-primary cursor-pointer">How To Order</li>
              <li className="hover:text-primary cursor-pointer">How To Track</li>
              <li className="hover:text-primary cursor-pointer">Shipping Info</li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary-dark font-semibold">COMPANY INFO</h3>
            <ul className="mt-2 space-y-1">
              <li className="hover:text-primary cursor-pointer">About ZeroZclothes</li>
              <li className="hover:text-primary cursor-pointer">Social Responsibility</li>
              <li className="hover:text-primary cursor-pointer">Fashion Blogger</li>
              <li className="hover:text-primary cursor-pointer">Careers</li>
            </ul>
          </div>
        </div>

        {/* Right Section - Newsletter Signup */}
        <div className="w-full md:w-1/3">
          <h3 className="text-primary-dark font-semibold">refresh your inbox</h3>
          <p className="text-sm mt-2">
            Join our email list to get 10% off your first order, plus first dibs on exclusive offers + scent-illating news.
          </p>
          <div className="mt-4 flex">
            <input
              type="email"
              placeholder="email address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark">
              sign up
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
