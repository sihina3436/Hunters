<<<<<<< HEAD
<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import Router from './router/Router'
import './index.css'
=======
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Router from './router/Router';
import './index.css';
>>>>>>> admin-dashboard-and-more
import "remixicon/fonts/remixicon.css";
import { store } from "./redux/store.js";

createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
  <StrictMode>
      <RouterProvider router={Router} />
  </StrictMode>,
)
=======
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Router from './router/Router';
import './index.css';
import "remixicon/fonts/remixicon.css";
import { store } from "./redux/store.js";

createRoot(document.getElementById('root')).render(
=======
>>>>>>> admin-dashboard-and-more
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>
);
<<<<<<< HEAD
>>>>>>> 5846a438eb2ce1e664571b84ad40780c2cd0bee0
=======
>>>>>>> admin-dashboard-and-more
