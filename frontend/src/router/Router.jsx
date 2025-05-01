import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home';
import PaymentSuccess from '../components/PaymentSuccess';
import DashBoardLayout from '../pages/dashboard/DashBoardLayout.jsx';
import UserDMain from '../pages/dashboard/user/dashboard/userDMain.jsx';
import AdminDMain from '../pages/dashboard/admin/dashboard/AdminDMain.jsx';


const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            {path: '/', element: <Home/>},
            

        ]
    }
]);



export default Router
