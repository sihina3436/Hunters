import React from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-200 p-8 rounded-3xl shadow-lg w-96 lg:w-1/3 m-5">
        <h2 className="text-2xl font-bold text-center text-gray-800 ">Sign Up</h2>
        
        <form className='space-y-3 action="#" method="POST" '>
          <div className="mb-4">
            <label className="font-medium">First Name</label>
            <input type="text" placeholder="Johone" className="w-full px-4 py-2 border rounded-full focus:ring-1 focus:ring-pink-500" />
          </div>

          <div className="mb-4">
            <label className="font-medium">Last Name</label>
            <input type="text" placeholder="Perera" className="w-full px-4 py-2 border rounded-full focus:ring-1 focus:ring-pink-500" />
          </div>

          
          <div className="mb-4">
            <label className=" font-medium ">Email Address</label>
            <input type="email" placeholder="Johone@email.com" className="w-full px-4 py-2 border rounded-full focus:ring-1 focus:ring-pink-500" />
          </div>
          
          <div className="mb-4">
            <label className="font-medium">Password</label>
            <input type="password" placeholder="Enter 8 characters or more" className="w-full px-4 py-2 border rounded-full focus:ring-1 focus:ring-pink-500" />
          </div>
          
          <div className="mb-4">
            <label className="font-medium">Re-enter Password</label>
            <input type="password" placeholder="Re-enter password" className="w-full px-4 py-2 border rounded-full focus:ring-1 focus:ring-pink-500" />
          </div>
          
          <p className="text-red-500 text-sm mb-2">Invalid password</p>
          
          <button className="w-full bg-primaryColor text-white py-2 rounded-full hover:bg-pink-500 ">Sign Up</button>
        </form>

        <div className="text-center mt-4 text-gray-600">Continue with Goole account</div>
        
      </div>
    </div>
  )
}

export default Signup
