import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../redux/features/auth/authApi.js' // Import useLoginUserMutation
import { setUser } from '../redux/features/auth/authSlice.js'; // Import setUser action

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loggingLoading }] = useLoginUserMutation(); // Correct hook import
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    
    console.log("Sending request:", data); // ✅ Debugging Log

    try {
      const response = await loginUser(data).unwrap();
      console.log("Server Response:", response);
      const {token,user} = response;
      dispatch(setUser({user})); // Store user in Redux state
      alert('Login successful!');
      navigate('/'); // ✅ Redirect to home after login
    } catch (error) {
      console.error("Error:", error);
      setMessage(error?.data?.message || 'Please provide a valid email and password');
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
        <form className="space-y-5 max-w-sm mx-auto pt-8" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {message && <p className="text-red-500">{message}</p>} {/* Display error message */}

          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
          >
            Login
          </button>
        </form>

        <p className="my-5 italic text-sm text-center">
          Don't have an account?
          <Link to="/register" className="text-red-700 px-1 underline">
            Register
          </Link>{' '}
          here.
        </p>
      </div>
    </section>
  );
};

export default Login;
