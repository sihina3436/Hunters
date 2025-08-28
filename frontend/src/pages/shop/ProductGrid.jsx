import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import RatingStars from "../../components/RatingStars";
import { addToCart } from "../../redux/features/cart/CartReducer";

const ProductGrid = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {/* Image Section */}
          <div className="relative">
            {product.oldPrice && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                Sale!
              </span>
            )}
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-md"
              />
            </Link>
          </div>

          {/* Product Info */}
          <h3 className="text-base sm:text-lg font-semibold mt-2 truncate">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm">{product.category}</p>

          {/* Pricing */}
          <div className="mt-2">
            {product.oldPrice ? (
              <>
                <span className="line-through text-gray-400 text-sm sm:text-base">
                  LKR {product.oldPrice}
                </span>
                <span className="text-red-500 font-bold ml-2 text-sm sm:text-base">
                  LKR {product.price}
                </span>
              </>
            ) : (
              <span className="font-bold text-sm sm:text-base">
                LKR {product.price}
              </span>
            )}
          </div>

          {/* Color */}
          <div className="mt-2 text-xs sm:text-sm text-gray-600">
            Color: {product.color}
          </div>

          {/* Rating */}
          <RatingStars rating={product.rating} />

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300 text-sm sm:text-base"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
