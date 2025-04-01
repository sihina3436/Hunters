import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import Router from './router/Router'
import './index.css'
import "remixicon/fonts/remixicon.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={Router} />
  </Provider>
)
