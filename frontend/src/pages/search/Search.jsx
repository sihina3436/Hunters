import React, { useState } from 'react';
import ProductGrid from '../shop/ProductGrid';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import Spinner from '../../components/Spinner';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Optional filter states 
    const [category] = useState('all');
    const [color] = useState('all');
    const [minPrice] = useState('');
    const [maxPrice] = useState('');
    const [currentPage] = useState(1);
    const [productsPerPage] = useState(100);

    // Fetch products from API
    const { data = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: productsPerPage,
    });

    const { products = [] } = data;

    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className='py-20'>
                <h2 className="relative text-[30px] font-semibold font-custom text-text-dark text-center after:content-[''] after:block after:w-28 after:h-1 after:bg-primary after:mx-auto after:mt-2">
                   Here’s What We Found for "<span className="text-primary">{searchQuery}</span>"
               </h2>
            </div>

            <section className='max-w-[1400px] m-auto py-20 px-4'>
                <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search for Products...'
                        className='w-full max-w-4xl p-2 border rounded'
                    />
                </div>

                {/* Render based on state */}
                {isLoading ? (
                    <Spinner/>
                ) : error ? (
                    <p className="text-center text-red-500">Error fetching products</p>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center text-lg font-medium text-primary">
                        No products found matching "<span className="text-gray-500 font-semibold">{searchQuery}</span>"
                    </div>
                ) : (
                    <ProductGrid products={filteredProducts} />
                )}
            </section>
        </>
    );
};

export default Search;
