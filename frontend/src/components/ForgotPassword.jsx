import React, { useState } from 'react';
import { useSendOtpMutation } from '../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendOtp({ email }).unwrap();
      alert('OTP sent successfully!');
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      console.error(err);
      setMessage(err?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center">
          <i className="ri-lock-password-line text-4xl text-primary"></i>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">Forgot Password</h2>
          <p className="text-sm text-gray-500">We’ll send you an OTP to reset your password</p>
        </div>

        <form className="space-y-5 mt-8" onSubmit={handleSubmit}>
          <div className="relative">
            <i className="ri-mail-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border-primary bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
            />
          </div>

          {message && <p className="text-red-500 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-dark 0 transition text-white font-medium py-3 rounded-lg"
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
