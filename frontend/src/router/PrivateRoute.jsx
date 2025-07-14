import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children, role}) => {
    const {user} = useSelector((state) => state.auth);
    console.log(user)
    const location = useLocation();

    if(!user){
        alert("You are not logged in");
        return <Navigate to="/login" state={{from: location}} replace/>
    }
    if(role && user?.role !== role){  
        alert("You are not authorized to access this page");
        return <Navigate to="/login" state={{from: location}} replace/>
    }

  return children;
}

export default PrivateRoute
