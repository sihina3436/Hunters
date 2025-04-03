import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home';


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
