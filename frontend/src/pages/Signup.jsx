import React,{useState} from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { VscEye,VscEyeClosed } from "react-icons/vsc";


const Signup = () => {
  const [showPassword,setOpen]= useState(false)
  const toggle=()=>{
    setOpen(!showPassword)
  }

  return (
    
      <div className="flex justify-center items-center h-screen"> 
        <div className=" px-5 py-15  bg-zinc-200 w-full mx-3 md:w-1/2 rounded-3xl">
          <h1 className='text-center font-bold text-3xl p-2 py-6'>Sign Up</h1>
            <form className='space-y-6 action="#" method="POST" '>
          
              <div >
                <Label value='Enter Username'></Label>
                <TextInput type="text" placeholder='Username' id='username' className='mt-2'></TextInput>
                
              </div>

              <div>
                <Label value='Enter Email Address'></Label>
                <TextInput type="email" placeholder='email' id='email' className='  mt-2'></TextInput>
              </div>


              <div className="relative">
                <Label value='Enter Password'></Label>
                  <TextInput type={(showPassword===false) ? 'password' : password} placeholder='Enter 8 characters or more' id='password' className=' mt-2'></TextInput>
                  <div className='text-2xl absolute top-10 right-5'>
                  {
                    (showPassword===false)?<VscEye onClick={toggle} />:
                    <VscEyeClosed onClick={toggle}/>
                  }
                  </div>
              </div>

              <div >
                <Label value='Re Enter Password'></Label>
                <TextInput type="password" placeholder='Re Enter Password' id='password2' className='mt-2'></TextInput>
              </div>

              <div>
                <Label className=' text-red-600'>Invalid password </Label>
                
                
              </div>
              <button type="submit" 
              class="items-center min-w-full text-white bg-fuchsia-300 outline-5 
               font-bold rounded-full  px-5 py-2.5 text-center ">Sign Up</button>

            </form>
              <div className="other-obtion my-3">
                <p className='text-center '>Or Continue with other ways</p>
                <div className="icons flex justify-center gap-10 py-5">

                  <div className="1 bg-black w-20 h-20" ></div>
                  <div className="2  bg-black w-20 h-20"></div>
                  <div className="3  bg-black w-20 h-20"></div>
                </div>
              </div>


          </div>
      </div>
    
  
  )
}

export default Signup
