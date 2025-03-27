import React from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from "react";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const RegistrationSubmit=async(e)=>{
    e.preventDefault();
    
    const firstName= e.target.firstName.value;
    const lastName=e.target.lastName.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
    const rePassword=e.target.rePassword.value;
    const contactNo =e.target.contactNo.value;

    const letterRegex = /^[A-Za-z]+$/;
    const numberRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

    if(!firstName || !lastName || !email || !password || !rePassword){
      return setErrorMessage("Please fill all fields.");
    }else if(!letterRegex.test(firstName)){
      return setErrorMessage("First name must contain only letters.");
    }else if(!letterRegex.test(lastName)){
      return setErrorMessage("Last name must contain only letters.");
    }else if(!numberRegex.test(contactNo)){
      return setErrorMessage("check your contact number,only numbers can be aded");
    }else if(!passwordRegex.test(password)){
      return setErrorMessage("Check At least one lette,one number,one special character and Minimum 8 character");
    }else if(password !== rePassword){
      return setErrorMessage("Passwors are not match");
    }else
    {
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            firstName,
            lastName,
            email,
            password,
            rePassword,
            contactNo,
           }),
          }
        
        )

      const data = await response.json();
      // console.log("Server Response:", data);
      setErrorMessage(data);
      } catch (e) {
        console.error("Error:", e);
        setMessage("Something went wrong!");
      }

    }


  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-200 p-8 rounded-3xl shadow-lg w-96 lg:w-1/2 m-5">
        <h2 className="text-2xl font-bold text-center text-gray-800 ">Sign Up</h2>
        
        <form className='space-y-3 ' onSubmit={RegistrationSubmit} >
          <div className="mb-4">
            <label className="font-medium">First Name</label>
            <input type="text" 
            placeholder="Johone" 
            name='firstName' 
            className="w-full px-4 py-2 border rounded-full focus:ring-1 focus:ring-pink-500 " />
            
          </div>

          <div className="mb-4">
            <label className="font-medium">Last Name</label>
            <input type="text" 
            name="lastName" 
            placeholder="Perera" 
            className="w-full px-4 py-2 border rounded-full focus:ring-1 focus:ring-pink-500" />
          </div>

          
          <div className="mb-4">
            <label className=" font-medium ">Email Address</label>
            <input type="email" 
            name='email' 
            placeholder="Johone@email.com" 
            className="w-full px-4 py-2 border rounded-full focus:ring-1 focus:ring-pink-500" />
          </div>

          <div className="mb-4">
            <label className=" font-medium ">Contact number</label>
            <input type="text" 
            name='contactNo' 
            placeholder="0112345678" 
            className="w-full px-4 py-2 border rounded-full focus:ring-1 focus:ring-pink-500" />
          </div>
          
          <div className="mb-4">
            <label className="font-medium">Password</label>
            <input type="password" 
            name='password' 
            placeholder="Enter 8 characters or more" 
            className="w-full px-4 py-2 border rounded-full focus:ring-1 focus:ring-pink-500" />
          </div>
          
          <div className="mb-4">
            <label className="font-medium">Re-enter Password</label>
            <input type="password" 
            name='rePassword' 
            placeholder="Re-enter password" 
            className="w-full px-4 py-2 border rounded-full focus:ring-1 focus:ring-pink-500" />
          </div>
          
          {/* <p className="text-red-500 text-sm mb-2" >Invalid password</p> */}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-2" > {errorMessage} </p>
          )}
          
          <button type="submit" className="w-full bg-primaryColor text-white py-2 rounded-full hover:bg-pink-500 ">Sign Up</button>
        </form>

        <div className="text-center mt-4 text-gray-600">Continue with <a href='#'>Google account</a></div>
        
      </div>
    </div>
  )
}

export default Signup
