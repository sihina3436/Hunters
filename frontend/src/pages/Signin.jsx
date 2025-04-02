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
    
    console.log("Sending request:", data); // 

    if (!email || !password) {
      setMessage("Please enter email and password.");
    } else {

        try {
        const response = await loginUser(data).unwrap();
        console.log("Server Response:", response);
        const {token,user} = response;
        dispatch(setUser({user})); // Store user in Redux state
        alert('Login successful!');
        navigate('/'); // 
      } catch (error) {
        console.error("Error:", error);
        setMessage(error?.data?.message || 'Please provide a valid email and password');
      }

    }

 
  };
  return (
    <section className="h-screen flex items-center justify-center ">
      <div className="max-w-sm border shadow bg-white mx-auto p-8 rounded-3xl">
        <h2 className="text-2xl font-semibold text-center ">Please Login</h2>
        <form className="space-y-5 max-w-sm mx-auto pt-8" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
            className="w-full px-2 border rounded-full bg-gray-100 focus:ring-1 focus:ring-pink-500"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
             className="w-full px-2 border rounded-full bg-gray-100 focus:ring-1 focus:ring-pink-500"
          />
          {message && <p className="text-red-500 text-sm">{message}</p>} {/* Display error message */}

          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-pink-500 font-medium py-3 rounded-full"
          >
Login
          </button>
        </form>
        <p className="my-2 italic text-sm text-center">
        <Link to="" className="text-red-700 px-1 underline">
        Forget password
          </Link>{' '}
        </p>

        <p className="my-3 italic text-sm text-center">
          Don't have an account?
          <Link to="/Register" className="text-red-700 px-1 underline">
            Register
          </Link>{' '}
          here.
        </p>
      </div>
    </section>
  );
};

export default Login;