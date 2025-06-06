import React, { useEffect, useState } from "react";

import ProductData from "../../data/products.json";

import ShopFiltering from "./ShopFiltering";
import ProductGrid from "./ProductGrid";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: [
    "all",
    "black",
    "white",
    "red",
    "blue",
    "gold",
    "silver",
    "green",
    "beige",
  ],
  priceRange: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 to $100", min: 50, max: 100 },
    { label: "$100 to $200", min: 100, max: 200 },
    { label: "$200 to above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  //const [products, setProducts] = useState(ProductData);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });
  console.log("product is" + products);

  // // Filtering Function
  // const applyFilters = () => {
  //     let filterdProducts = ProductData;

  
  //     //Filter by Category
  //     if(filtersState.category && filtersState.category !== 'all'){
  //         filterdProducts = filterdProducts.filter(product => product.category === filtersState.category);
  //     }

  //     //Filter by Color
  //     if(filtersState.color && filtersState.color !== 'all'){
  //         filterdProducts = filterdProducts.filter(product => product.color.includes(filtersState.color));
  //     }

  //     //Filter by Price Range
  //     if(filtersState.priceRange){
  //         filterdProducts = filterdProducts.filter(product => product.price >= filtersState.priceRange.min && product.price <= filtersState.priceRange.max);
  //     }

  //     setProducts(filterdProducts);
  // }

  // useEffect(() => {
  //     applyFilters();
  // }, [filtersState]);

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) {
    return <div className="text-center text-2xl font-medium">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center text-2xl font-medium">
        Error loading Products {error?.message || "Unknown error occurred"}
      </div>
    );
  }

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      {/* Shop Page Header */}
      <section className="max-w-[1400px] mt-8 ml-auto mr-auto mb-3 py-20 px-4 ">
        <h2 className="relative mb-1 text-[30px] font-semibold font-custom text-text-dark text-center after:content-[''] after:block after:w-28 after:h-1 after:bg-primary after:mx-auto after:mt-2">
          Shop Page
        </h2>
        {/* filter and cart section */}
      </section>
      <section className="max-w-[1400px] m-auto py-20 px-4">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* left side */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* right side */}
          <div>
            <h3 className="text-xl font-medium mb-4">
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <ProductGrid products={products} />

            <div className="mt-6 flex justify-center">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-gray-300 text-gray-700"
                  } rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage; // do not add aditional things
