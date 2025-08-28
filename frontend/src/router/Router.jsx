import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import ShopPage from '../pages/shop/ShopPage';
import Search from '../pages/search/Search';
import Login from '../components/Login';
import Register from '../components/Register';
import SingleProducts from '../pages/shop/productDetails/SingleProducts';
import PaymentSuccess from '../components/PaymentSuccess';
import PrivateRoute from './PrivateRoute.jsx';
import DashBoardLayout from '../pages/dashboard/DashBoardLayout.jsx';
import UserDMain from '../pages/dashboard/user/dashboard/userDMain.jsx';
import AdminDMain from '../pages/dashboard/admin/dashboard/AdminDMain.jsx';
import About from '../components/About.jsx';
import ContactUs from '../components/ContactUs.jsx';
import Returns from '../components/Returns.jsx';
import Refund from '../components/Refund.jsx';
import Careers from '../components/Careers.jsx';
import PrivacyPolicy from '../components/PrivacyPolicy.jsx';
import FAQ from '../components/FAQ.jsx';
import ShippingInfo from '../components/ShippingInfo.jsx';
import AdminChat from '../pages/chat/AdminChat.jsx';
import UserChat from '../pages/chat/UserChat.jsx';
import AddProduct from '../pages/dashboard/admin/addProduct/AddProduct.jsx';
import ManageProducts from '../pages/dashboard/admin/manageProduct/ManageProducts.jsx';
import UpdateProduct from '../pages/dashboard/admin/manageProduct/UpdateProduct.jsx';
import ManageUsers from '../pages/dashboard/admin/users/manageUsers.jsx';
import UserProfile from '../pages/dashboard/user/profile/UserProfile.jsx';
import UserOrder from '../pages/dashboard/user/orders/UserOrder.jsx';
import OrderDetails from '../pages/dashboard/user/orders/OrderDetails.jsx';
import ManageOrder from '../pages/dashboard/admin/ManageOrders/ManageOrder.jsx';
import ViewOrder from '../pages/dashboard/admin/ManageOrders/ViewOrder.jsx';
import ViewContacts from '../pages/dashboard/admin/contact/ViewContacts.jsx';
import ForgotPassword from '../components/ForgotPassword.jsx';
import ResetPassword from '../components/ResetPassword.jsx';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/search', element: <Search /> },
      { path: '/shop/:id', element: <SingleProducts /> },
      { path: '/success', element: <PaymentSuccess /> },
      {path: '/orders/:orderId', element: <OrderDetails/>},
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element:<ForgotPassword/> },
  { path: '/reset-password', element: <ResetPassword/> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      /* ---------- user routes ---------- */
      { path: '', element: <UserDMain /> },
      { path: 'orders', element: <UserOrder/> },
      { path: 'profile', element: <UserProfile/> },
      { path: 'seller-support', element: <UserChat/> },

      /* ---------- admin routes ---------- */ 
      {
        path: 'admin',
        element: (
          <PrivateRoute role="admin">
            <AdminDMain />
          </PrivateRoute>
        )
      },
      {
        path: 'add-product',
        element: (
          <PrivateRoute role="admin">
            <AddProduct/>
          </PrivateRoute>
        )
      },
      {
        path: 'manage-products',
        element: (
          <PrivateRoute role="admin">
            <ManageProducts/>
          </PrivateRoute>
        )
      },
      {
        path: 'update-products/:id',
        element: (
          <PrivateRoute role="admin">
            <UpdateProduct/>
          </PrivateRoute>
        )
      },
      {
        path: 'users',
        element: (
          <PrivateRoute role="admin">
            <ManageUsers/>
          </PrivateRoute>
        )
      },
      {
        path: 'manage-orders',
        element: (
          <PrivateRoute role="admin">
            <ManageOrder/>
          </PrivateRoute>
        )
      },
       {
        path: 'chat-inbox',
        element: (
          <PrivateRoute role="admin">
            <AdminChat/>
          </PrivateRoute>
        )
      },
        {
        path: 'admin/orders/:orderId',
        element: (
          <PrivateRoute role="admin">
            <ViewOrder/>
          </PrivateRoute>
        )
      },
        {
        path: 'view-contacts',
        element: (
          <PrivateRoute role="admin">
            <ViewContacts/>
          </PrivateRoute>
        )
      }

    ]
  },
  {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contactus",
        element: <ContactUs/>
      },
      {
        path: "/returns",
        element: <Returns/>
      },
      {
        path: "/refund",
        element: <Refund/>
      },
      {
        path: "/careers",
        element: <Careers/>
      },
      {
        path: "/privacypolicy",
        element: <PrivacyPolicy/>
      },
      {
        path: "/faq",
        element: <FAQ/>
      },
      {
        path: "/shippinginfo",
        element: <ShippingInfo/>
      }
]);

export default Router;
