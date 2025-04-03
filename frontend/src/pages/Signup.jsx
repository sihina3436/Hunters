import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi.js'

const Register = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password
        }

        const letterRegex = /^[A-Za-z]+$/;
        // const numberRegex = /^\d{10}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

        if(!username || !email || !password){
            setMessage("Please fill all fields..");
        }else if(!username.match(letterRegex)){
            setMessage("Username should contain only letters");
        } else if(!password.match(passwordRegex)){
            setMessage("Check At least one lette,one number,one special character and Minimum 8 character");
        }else{
            try {
                await registerUser(data).unwrap();
                alert("Registration successful!")
                navigate('/login')
            } catch (error) {
                setMessage("Registration failed")
            }

        } 
    }

    return (
        <section className='h-screen flex items-center justify-center'>
            <div className='shadow bg-white p-8 rounded-3xl max-w-sm border mx-auto'>
                
            <h2 className="text-2xl font-semibold text-center ">Please Register</h2>
                <form onSubmit={handleRegister} className='space-y-5 max-w-sm mx-auto pt-8'>
                    <input type="text" name="username" id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='username' required
                        className="w-full px-4 py-2 border rounded-full  focus:ring-1 focus:ring-pink-500 bg-gray-100"
                    />
                    <input type="email" name="email" id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email Address' required
                        className="w-full px-4 py-2 border rounded-full  focus:ring-1 focus:ring-pink-500 bg-gray-100"
                    />
                    <input type="password" name="password" id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password' required
                        className="w-full px-4 py-2 border rounded-full  focus:ring-1 focus:ring-pink-500 bg-gray-100"
                    />
                    {
                        message && <p className='text-red-500 text-sm'>{message}</p>
                    }

                    <button type='submit'
                        className='w-full bg-primary text-white py-2 rounded-full hover:bg-pink-500'
                    >Register</button>
                </form>

                <p className='my-5 italic text-sm text-center'>Have an account? Please
                    <Link to="/login" className='text-red-700 px-1 underline'>Login</Link>.
                </p>
            </div>
        </section>
    )
}

export default Register