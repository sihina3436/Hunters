import React from 'react';
import OrderSummary from './OrderSummary';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/features/cart/CartReducer.js';

const Cart = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();
  
  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, id }));
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className={`fixed z-[1000] inset-0 bg-black bg-opacity-60 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ transition: 'opacity 0.3s' }}>
      <div className={`fixed right-0 top-0 md:w-2/5 w-full bg-white h-full overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ transition: 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)' }}>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h4 className='text-2xl font-bold'>Your Cart</h4>
            <button className='text-gray-600 hover:text-gray-900 text-2xl' onClick={onClose}>&times;</button>
          </div>
    
          {/* Cart Items */}
          <div className='cart-items space-y-4'>
            {products.length === 0 ? (
              <div className='text-center text-gray-600'>Your Cart is Empty</div>
            ) : (
              products.map((item, index) => (
                <div key={index} className='flex items-center justify-between p-4 border-b'>
                  <div className='flex items-center'>
                    <img src={item.image} alt='' className='w-16 h-16 object-cover mr-4'/>
                    <div>
                      <h5 className='text-lg font-medium'>{item.name}</h5>
                      {item.size && <p className='text-sm text-gray-500'>Size: {item.size}</p>}
                      <p className='text-gray-600 text-sm'>LKR{Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <button className='px-3 py-1 border rounded-full text-gray-700 bg-gray-200 hover:bg-primary hover:text-white' onClick={() => handleQuantity('dec', item._id)}>-</button>
                    <span className='mx-3'>{item.quantity}</span>
                    <button className='px-3 py-1 border rounded-full text-gray-700 bg-gray-200 hover:bg-primary hover:text-white' onClick={() => handleQuantity('inc', item._id)}>+</button>
                    <button className='ml-4 text-red-500 hover:text-red-800' onClick={(e) => handleRemove(e, item._id)}>Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          {products.length > 0 && (
            <div className='bg-gray-100 p-6 mt-6 rounded-lg'>
                <OrderSummary />  
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
