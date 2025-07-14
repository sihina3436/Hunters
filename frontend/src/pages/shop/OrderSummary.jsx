import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cart/CartReducer.js';
import { loadStripe } from '@stripe/stripe-js';
import { getBaseURL } from '../../utils/baseURL.js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const OrderSummary = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { products, discount, discountRate, totalPrice, grandTotal, selectedItems } = useSelector((store) => store.cart);

  const handleClearCart = (e) => {
    e.stopPropagation();
    dispatch(clearCart());
  };

  const makePayment = async (e) => {
    e.stopPropagation();

    const stripe = await stripePromise;

    const response = await fetch(`${getBaseURL()}/api/orders/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products,
        userId: user?._id,
      }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log('Stripe redirect error:', result.error.message);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-text-dark">Summary</h3>
      <div className="space-y-2">
        <p className="text-text-dark">Selected Items: {selectedItems}</p>
        <div className="flex justify-between text-gray-700">
          <span>Total Price</span>
          <span>LKR{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Discount ({(discountRate * 100).toFixed(0)}%)</span>
          <span>LKR{discount.toFixed(2)}</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-xl font-semibold">
          <span>Grand Total</span>
          <span>LKR{grandTotal.toFixed(2)}</span>
        </div>
        <div className="mt-4 space-y-3">
          <button
            onClick={handleClearCart}
            className="bg-[#F72C5B] px-3 py-1.5 text-white w-full rounded-md flex justify-center items-center gap-2"
          >
            <span>Clear Cart</span> <i className="ri-delete-bin-7-line"></i>
          </button>
          <button
            onClick={makePayment}
            className="bg-green-600 px-3 py-1.5 text-white w-full rounded-md flex justify-center items-center gap-2"
          >
            <span>Checkout</span> <i className="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
