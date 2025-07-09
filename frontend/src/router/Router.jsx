import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/home/Home';
import ShopPage from '../pages/shop/ShopPage';
import Search from '../pages/search/Search';
import Login from '../components/Login';
import Register from '../components/Register';
import SingleProducts from '../pages/shop/productDetails/SingleProducts';
import PaymentSuccess from '../components/PaymentSuccess';
import PrivateRoute from "./PrivateRoute.jsx";
import DashBoardLayout from '../pages/dashboard/DashBoardLayout.jsx';
import UserDMain from '../pages/dashboard/user/dashboard/userDMain.jsx';
import AdminDMain from '../pages/dashboard/admin/dashboard/AdminDMain.jsx';
import AddProduct from '../pages/dashboard/admin/addProduct/AddProduct.jsx';







const Router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {path:'/',element:<Home/>},
            {path:'/shop',element:<ShopPage/>},
            {path:'/search', element:<Search/>},
            {path:'/shop/:id', element:<SingleProducts/>},
            {
              path: '/success',
              element: <PaymentSuccess/>
            }
            
        ]
    },
    {
        path: "/login",
        element:<Login/>
      },
      {
        path: "/register",
        element:<Register/>
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
            {path: 'reviews',element: <div>reviews</div>},
    
            // admin Routes (only for admin)
            {path: 'admin',element: <PrivateRoute role="admin"><AdminDMain/></PrivateRoute>},
            {path: 'add-product',element: <PrivateRoute role="admin"><AddProduct/></PrivateRoute>},
            {path: 'manage-products',element: <PrivateRoute role="admin"><div>manage-products</div></PrivateRoute>},
            {path: 'update-products/:id',element: <PrivateRoute role="admin"><div>update-products/:id</div></PrivateRoute>},
            {path: 'users',element: <PrivateRoute role="admin"><div>users</div></PrivateRoute>},
            {path: 'manage-orders',element:<PrivateRoute role="admin"><div>manage-orders</div></PrivateRoute> },
    
        ]
      }
]);

export default Router
