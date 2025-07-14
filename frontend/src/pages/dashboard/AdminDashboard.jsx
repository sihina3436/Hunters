import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'



const navItems = [
  { path: '/dashboard/admin', label: 'Dashboard' },
  { path: '/dashboard/add-product', label: 'Add Product' },
  { path: '/dashboard/manage-products', label: 'Manage Products' },
  { path: '/dashboard/users', label: 'Users' },
  { path: '/dashboard/manage-orders', label: 'Manage Orders' },
  { path: '/dashboard/chat-inbox', label: 'Inbox' },
  { path: '/dashboard/view-contacts', label: 'contacts' }
];






const AdminDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout())
            alert("Logout successful");
            navigate('/')
        } catch (error) {
            console.error("Failed to log out", error);
        }
    }

  return (
     <div className='bg-white shadow-lg rounded-2xl p-6 md:h-screen w-full md:w-64 flex flex-col justify-between'>
         {/* Header */}
         <div>
           <div className='flex justify-center mb-4'>
             <Link to='/' className='text-3xl font-bold font-custom text-gray-800 tracking-tight'>
               ZeroZCloths<span className='text-primary'>.</span>
             </Link>
           </div>
           <p className='text-sm text-gray-500 italic text-center'>Admin Dashboard</p>
   
           <hr className='my-4 border-gray-300' />
   
           {/* Navigation */}
           <ul className='space-y-2'>
             {navItems.map((item) => (
               <li key={item.path}>
                 <NavLink
                   to={item.path}
                   end
                   className={({ isActive }) =>
                     `block px-4 py-2 rounded-lg transition-all duration-300 ${
                       isActive
                         ? 'bg-primary text-white font-semibold shadow'
                         : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                     }`
                   }
                 >
                   {item.label}
                 </NavLink>
               </li>
             ))}
           </ul>
         </div>
   
         {/* Logout */}
         <div className='mt-6'>
           <hr className='mb-4 border-gray-300' />
           <button
             onClick={handleLogout}
             className='w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-primary-dark transition-all duration-300'
           >
             Logout
           </button>
         </div>
       </div>
  )
}

export default AdminDashboard
