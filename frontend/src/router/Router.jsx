import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home';

<<<<<<< HEAD
=======
import PaymentSuccess from '../components/PaymentSuccess';
import PrivateRoute from "./PrivateRoute.jsx";
import DashBoardLayout from '../pages/dashboard/DashBoardLayout.jsx';
import UserDMain from '../pages/dashboard/user/dashboard/userDMain.jsx';
import AdminDMain from '../pages/dashboard/admin/dashboard/AdminDMain.jsx';


>>>>>>> 5846a438eb2ce1e664571b84ad40780c2cd0bee0

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            {path: '/', element: <Home/>},
<<<<<<< HEAD
        ]
    }
=======
            

        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashBoardLayout/></PrivateRoute>, // user Private Routes
        children:[
            // user Routes
            {path: '',element: <UserDMain/>},
            {path: 'orders',element: <div>User orders</div>},
            {path: 'payments',element: <div>User payments</div>},
            {path: 'profile',element: <div>User profile</div>},
            {path: 'reviews',element: <div>User reviews</div>},
    
            // admin Routes (only for admin)
            {path: 'admin',element: <PrivateRoute role="admin"><AdminDMain/></PrivateRoute>},
            {path: 'add-new-post',element: <PrivateRoute role="admin"><div>Add Product</div></PrivateRoute>},
            {path: 'manage-products',element: <PrivateRoute role="admin"><div>manage-products</div></PrivateRoute>},
            {path: 'update-products/:id',element: <PrivateRoute role="admin"><div>update-products/:id</div></PrivateRoute>},
            {path: 'users',element: <PrivateRoute role="admin"><div>users</div></PrivateRoute>},
            {path: 'manage-orders',element:<PrivateRoute role="admin"><div>manage-orders</div></PrivateRoute> },
    
        ]
      }

      

>>>>>>> 5846a438eb2ce1e664571b84ad40780c2cd0bee0
]);



export default Router
