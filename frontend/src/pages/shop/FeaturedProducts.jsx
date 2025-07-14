import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const FeaturedProducts = () => {
  const [category] = useState('all');
  const [color] = useState('all');
  const [minPrice] = useState('');
  const [maxPrice] = useState('');
  const [currentPage] = useState(1);
  const [productsPerPage] = useState(100); 

  const [visibleCount, setVisibleCount] = useState(9); // how many to show

  const { data = {}, error, isLoading } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  const { products = [] } = data;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 9); // load 11 more
  };

  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <h2 className="relative mb-4 text-[42px] font-semibold font-custom text-text-dark text-center after:content-[''] after:block after:w-28 after:h-1 after:bg-primary after:mx-auto after:mt-2">
        Featured Products
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load featured products</p>
      ) : (
        <>
          <ProductGrid products={products.slice(0, visibleCount)} />

          {visibleCount < products.length && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition duration-300 shadow-lg"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProducts;
