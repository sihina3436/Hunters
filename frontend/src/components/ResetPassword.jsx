import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../redux/features/auth/authApi';

const ResetPassword = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email || '';
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value entered
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    try {
      await resetPassword({ email, otp: fullOtp, newPassword }).unwrap();
      alert('Password reset successful. You can now login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setMessage(err?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center">
          <i className="ri-shield-check-line text-4xl text-primary"></i>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">Verification Code</h2>
          <p className="text-sm text-gray-500">Enter the 6-digit code sent to your email</p>
        </div>

        <form className="space-y-5 mt-8" onSubmit={handleReset}>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className="w-12 h-12 text-center text-lg border border-gray-300 ring-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ))}
          </div>

          <div className="relative">
            <i className="ri-lock-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border-primary bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
            />
          </div>

          {message && <p className="text-red-500 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-dark transition text-white font-medium py-3 rounded-lg"
          >
            {isLoading ? 'Resetting...' : 'Verify Code'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
