import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/CartReducer.js';
import authApi from './features/auth/authApi.js';
import authReducer from './features/auth/authSlice.js';
import productsApi from './features/products/productsApi.js';
import reviewApi from './features/reviews/reviewApi.js';
import statsApi from './features/stats/statsApi.js';
import orderApi from './features/order/orderApi.js';
import { contactApi } from './features/contact/contactApi.js';  // <-- here changed to named import

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      reviewApi.middleware,
      statsApi.middleware,
      orderApi.middleware,
      contactApi.middleware
    ),
});
