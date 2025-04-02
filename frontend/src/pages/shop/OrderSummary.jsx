import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/CartReducer';

const OrderSummary = () => {
    const dispatch = useDispatch();

    const handleClearCart = (e) => {
        e.stopPropagation();
        dispatch(clearCart());
    };

    const { discount, discountRate, totalPrice, grandTotal, selectedItems } = useSelector((store) => store.cart);

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-text-dark">Summary</h3>
        <div className="space-y-2">
            <p className="text-text-dark">Selected Items: {selectedItems}</p>
            <div className="flex justify-between text-gray-700">
                <span>Discount ({discountRate * 100}%)</span>
                <span>${discount.toFixed(2)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-semibold">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
            </div>
            <div className="mt-4 space-y-3">
            <button 
                className="bg-[#F72C5B] px-3 py-1.5 text-white w-full rounded-md flex justify-center items-center gap-2"
                onClick={handleClearCart}
            >
                <span>Clear Cart</span> <i className="ri-delete-bin-7-line"></i>
            </button>
            <button className="bg-green-600 px-3 py-1.5 text-white w-full rounded-md flex justify-center items-center gap-2">
                <span>Checkout</span> <i className="ri-bank-card-line"></i>
            </button>
            </div>
        </div>
        </div>
     );
};

export default OrderSummary
