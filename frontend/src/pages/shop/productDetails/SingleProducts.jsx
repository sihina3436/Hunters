import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi.js";
import RatingStars from "../../../components/RatingStars";
import { addToCart } from "../../../redux/features/cart/CartReducer.js";
import ReviewsCart from "../reviews/ReviewsCart.jsx";
import RelatedProducts from "./RelatedProducts.jsx";

const SingleProducts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    dispatch(addToCart(singleProduct));
  };

  if (isLoading)
    return <div className="text-center py-20 text-lg">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">Error loading product.</div>;

  const images =
    Array.isArray(singleProduct.images) && singleProduct.images.length > 0
      ? singleProduct.images
      : [singleProduct.image || "https://via.placeholder.com/400"];

  return (
    <>
      {/* Product Section */}
      <section className="max-w-[1400px] mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image Gallery */}
          <div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src={images[mainImageIndex]}
                alt={singleProduct.name}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${singleProduct.name} thumbnail ${idx + 1}`}
                  className={`h-20 w-20 rounded-md cursor-pointer object-cover border-2 transition-transform duration-300 hover:scale-105 ${
                    idx === mainImageIndex
                      ? "border-primary shadow-md"
                      : "border-gray-200"
                  }`}
                  onClick={() => setMainImageIndex(idx)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-3xl font-bold mb-3 text-gray-800">
              {singleProduct.name}
            </h3>
            <p className="text-2xl text-primary font-semibold mb-4">
              LKR {singleProduct.price}
              {singleProduct.oldPrice && (
                <s className="ml-3 text-gray-400 text-lg">
                  LKR {singleProduct.oldPrice}
                </s>
              )}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {singleProduct.description}
            </p>

            {/* Size Selector */}
            {singleProduct.sizes?.length > 0 && (
              <div className="mb-6">
                <label className="font-semibold text-gray-700">Size:</label>
                <select
                  className="ml-3 px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Select size</option>
                  {singleProduct.sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Additional Info */}
            <div className="space-y-2 mb-6 text-gray-700">
              <p>
                <strong>Category:</strong> {singleProduct.category}
              </p>
              <p>
                <strong>Color:</strong> {singleProduct.color?.join(", ")}
              </p>
              <div className="flex items-center gap-2">
                <strong>Rating:</strong>
                <RatingStars rating={singleProduct.rating} />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-md hover:bg-primary-dark hover:shadow-lg transition-transform transform hover:scale-[1.02]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="max-w-[1400px] mx-auto px-4 mt-12">
        <ReviewsCart ProductRevies={productReviews} />
      </section>

      {/* Related Products */}
      <section className="max-w-[1400px] mx-auto px-4 mt-12">
        <RelatedProducts productId={id} />
      </section>
    </>
  );
};

export default SingleProducts;
