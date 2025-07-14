import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import RatingStars from "../../components/RatingStars";
import { addToCart } from "../../redux/features/cart/CartReducer";

const ProductGrid = ({products}) => {

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
      dispatch(addToCart(product));
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <div className="relative">
              {product.oldPrice && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sale!
                </span>
              )}
              <Link to={`/shop/${product._id}`}>
                <img
                  src={product.image} // Use public folder
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
              </Link>
            </div>
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.category}</p>
            <div className="mt-2">
              {product.oldPrice ? (
                <>
                  <span className="line-through text-gray-400">
                    LKR {product.oldPrice}
                  </span>
                  <span className="text-red-500 font-bold ml-2">
                    LKR {product.price}
                  </span>
                </>
              ) : (
                <span className="font-bold">LKR {product.price}</span>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-600">Color: {product.color}</div>
            {/* <div className="mt-2 text-sm text-gray-600">
              Rating: {product.rating} ⭐
            </div> */}
            <RatingStars rating={product.rating} />
            <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      </>
  );
};

export default ProductGrid;
