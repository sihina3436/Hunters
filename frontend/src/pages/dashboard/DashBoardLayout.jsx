import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';


const DashBoardLayout = () => {

  const {user} = useSelector((state) => state.auth);
  console.log("dashboard Layout");
  console.log(user);
  if(!user) {
    return <Navigate to="/login" replace/>
  }

  const renderDashboard = () =>{
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard/>;
      case 'user': 
        return <UserDashboard/>;
        
    
      default:
        return <Navigate to="/login" replace/>;
    }
  }


  return (
    <div className='mx-auto flex  flex-col md:flex-row gap-4 items-start justify-start'>
      <header className='lg:w-1/5 sm:w-2/5 w-full border bg-white'>{renderDashboard()}</header>
          <main className='p-8 bg-white w-full border mt-5'>
              <Outlet />
          </main>
    </div>
  )
}

export default DashBoardLayout // change UI as modern. no need seperate block 
