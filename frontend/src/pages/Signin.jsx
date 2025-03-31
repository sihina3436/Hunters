import React from 'react'
import { useState } from "react";

const Signin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const LoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log(email,password);

    if (!email || !password) {
      setErrorMessage("Please enter email and password.");
    } else {
      try {
        const response = await fetch("http://localhost:3000/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
        )

        const data = await response.json();
        setErrorMessage(data);
      } catch (e) {
        console.log("Something went wrong",e);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-gray-100 p-8 rounded-xl shadow-md w-96">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>

        <form onSubmit={LoginSubmit} method='POST' >
          <div className="mb-4">
            <label className="font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Johone@email.com"
              name="email"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500" />
          </div>

          <div className="mb-4">
            <label className="font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500" />
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm">Remember me</label>
          </div>

          <div className="flex justify-between text-sm text-red-500 mb-4">
            <div>
              {errorMessage && <p className="text-red-500  mb-4">{errorMessage}</p>}
            </div>
            <div>
              <a href="#" className="hover:underline">Forget password</a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primaryColor text-white py-2 rounded-md hover:bg-pink-600">
            Login
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Doesn't have an account yet? <a href="signup" className="text-blue-500 hover:underline">Create account</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signin
