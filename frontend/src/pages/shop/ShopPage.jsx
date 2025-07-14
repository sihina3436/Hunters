
import React, {useEffect, useState}from 'react'

// import ProductData from '../../data/products.json'

import ShopFiltering from './ShopFiltering';
import ProductGrid from './ProductGrid';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const  filters = {
    categories: ['all','accessories','dress','jewellery','cosmetics'],
    colors: ['all','black','white','red','blue','gold','silver','green','beige'],
    priceRange:[
        {label: "Under LKR 500",min:0,max:500},
        {label: "LKR 500 to LKR 1000",min:500,max:1000},
        {label: "LKR 1000 to LKR 5000",min:1000,max:5000},
        {label: "LKR 5000 to above",min:5000,max:Infinity}
    ]

}

const ShopPage = () => {
    //const [products, setProducts] = useState(ProductData);
    const[filtersState,setFiltersState] = useState({
        category:'all',
        color:'all',
        priceRange: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(8);
    const {category, color, priceRange} = filtersState;
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);

    const {data :{products = [], totalPages, totalProducts } = {}, error, isLoading} = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice ,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: productsPerPage,
        
    });
    
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: ''
        });
    }

     // handle page change
     const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if(isLoading) {
        return <div className='text-center text-2xl font-medium'>Loading...</div>
    }
    if(error) {
        return <div className='text-center text-2xl font-medium'>Error loading Products {error?.message || "Unknown error occurred"}</div>
    }

    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

  return (
    <>
    {/* Shop Page Header */}
    <section className='max-w-[1400px] mt-8 ml-auto mr-auto mb-3 py-20 px-4 '>
    <h2 className="relative mb-4 text-[42px] font-semibold font-custom text-text-dark text-center after:content-[''] after:block after:w-28 after:h-1 after:bg-primary after:mx-auto after:mt-2">
            Discover What's New
        </h2>
       {/* filter and cart section */}
    </section>
    <section className='max-w-[1400px] m-auto py-20 px-4'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
            {/* left side */}
            <ShopFiltering filters={filters} filtersState={filtersState} setFiltersState={setFiltersState} clearFilters={clearFilters}/>

            {/* right side */}
            <div>
                <h3 className='text-xl font-medium mb-4'> Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
                
                <ProductGrid products={products} />

                 {/* pagination controls */}

                 <div className='mt-6 flex justify-center'>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}>
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'>
                                Next
                            </button>
                        </div>
                               
            </div>
        </div>

    </section>

</>  // reduce the margin between first section adn second section
  )
}

export default ShopPage  // do not add aditional things 
