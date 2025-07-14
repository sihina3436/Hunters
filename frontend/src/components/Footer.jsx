import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
        
        {/* Left Section - Logo & Social Media */}
        <div className="flex flex-col items-start space-y-4">
          <div className="w-auto h-auto flex items-center justify-center text-text-dark text-2xl font-bold">
          <Link to="/" className="text-2xl font-custom font-extrabold text-text-dark">ZeroZcloths<span className="text-primary">.</span></Link>
          </div>
          <p className="text-primary font-semibold text-lg">let's socialize</p>
          <div className="flex space-x-4 text-gray-600">
            <a href="https://www.instagram.com/zerozclothes?igsh=MTJuN2JrMGozMHk1eg==" target="_blank" rel="noopener noreferrer"><i className="ri-instagram-line text-2xl hover:text-primary cursor-pointer"></i></a>
            <a href='https://www.facebook.com/profile.php?id=100057668610444' target="_blank" rel="noopener noreferrer"><i className="ri-facebook-fill text-2xl hover:text-primary cursor-pointer"></i></a>
            <a href='https://www.tiktok.com/@zeroz141?_t=ZS-8xpVIg1fneM&_r=1' target="_blank" rel="noopener noreferrer"><i className="ri-tiktok-line text-2xl hover:text-primary cursor-pointer"></i></a>
          </div>
        </div>

        {/* Middle Section - Shop & Explore / Info */}
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="text-primary-dark font-semibold">HELP & SUPPORT</h3>
            <ul className="mt-2 space-y-1">
              <li className="hover:text-primary cursor-pointer"><Link to = "/returns">Returns</Link></li>
              <li className="hover:text-primary cursor-pointer"><Link to = "/refund">Refund</Link></li>
              <li className="hover:text-primary cursor-pointer"><Link to = "/contactus">Contact us</Link></li>
              <li className="hover:text-primary cursor-pointer"><Link to = "/faq">FAQ</Link></li>
              <li className="hover:text-primary cursor-pointer"><Link to="/shippinginfo">Shipping Info</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary-dark font-semibold">COMPANY INFO</h3>
            <ul className="mt-2 space-y-1">
              <li className="hover:text-primary cursor-pointer"><Link to = "/about">About ZeroZclothes</Link> </li>
              <li className="hover:text-primary cursor-pointer"><Link to = "/privacypolicy">Privacy Policy</Link></li>
              <li className="hover:text-primary cursor-pointer"><Link to = "/careers">Careers </Link></li>
            </ul>
          </div>
        </div>

        {/* Right Section - Newsletter Signup */}
        <div className="w-full md:w-1/3">
          <h3 className="text-primary-dark font-semibold">refresh your inbox</h3>
          <p className="text-sm mt-2">
            Join our email list to get 10% off your first order, plus first dibs on exclusive offers + scent-illating news.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
