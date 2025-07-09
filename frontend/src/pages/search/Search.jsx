import React, { useState, useEffect } from 'react';
import productsData from '../../data/products.json';
import ProductGrid from '../shop/ProductGrid';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(productsData);

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = productsData.filter(product =>
            product.name.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query)
        );

        setFilteredProducts(filtered);
    }, [searchQuery]); // ✅ Automatically updates when searchQuery changes

    return (
       <>
         <div className=' py-20'>
         <h2 className="relative  text-[30px] font-semibold font-custom text-text-dark text-center after:content-[''] after:block after:w-28 after:h-1 after:bg-primary after:mx-auto after:mt-2">
      Search Results
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
            <ProductGrid products={filteredProducts}/>
        </section>
       </>
    );
};

export default Search;
