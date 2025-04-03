import React from 'react'
import products from "../../data/products.json";
import ProductGrid from './ProductGrid';

const FeaturedProducts = () => {
  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <h2 className="relative mb-4 text-[42px] font-semibold font-custom text-text-dark text-center after:content-[''] after:block after:w-28 after:h-1 after:bg-primary after:mx-auto after:mt-2">
          Featured Products
      </h2>
      <ProductGrid products={products}/>
    </div>

  )
}

export default FeaturedProducts
