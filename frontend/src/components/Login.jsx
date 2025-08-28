import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../redux/features/auth/authApi.js';
import { setUser } from '../redux/features/auth/authSlice.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loggingLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await loginUser(data).unwrap();
      const { token, user } = response;
      dispatch(setUser({ user }));
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error("Error:", error);
      setMessage(error?.data?.message || 'Please provide a valid email and password');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <i className="ri-login-box-line text-4xl text-primary"></i>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">Please Login</h2>
          <p className="text-gray-500 text-sm">Access your account securely</p>
        </div>

        <form className="space-y-6 mt-8" onSubmit={handleLogin}>
          <div className="relative">
            <i className="ri-mail-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="relative">
            <i className="ri-lock-password-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {message && <p className="text-red-500 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loggingLoading}
            className="w-full bg-primary hover:bg-primary-dark transition text-white font-medium py-3 rounded-lg"
          >
            {loggingLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary underline">Register here</Link>
        </p>

        <p className="mt-3 text-sm text-center">
          <Link to="/forgot-password" className="text-primary underline">Forgot Password?</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
