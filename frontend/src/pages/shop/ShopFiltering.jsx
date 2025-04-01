import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

function ShopFiltering({ filters, filtersState, setFiltersState, clearFilters }) {
  const [openSections, setOpenSections] = useState({
    category: true,
    color: true,
    priceRange: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className='space-y-5 p-6 bg-white rounded-xl shadow-lg w-1/5'>
      <h3 className='text-xl font-semibold'>Filters</h3>
      
      {/* Category Filter */}
      <div>
        <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('category')}>
          <h4 className='font-medium text-lg'>Category</h4>
          {openSections.category ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
        </div>
        <hr className='my-2' />
        {openSections.category && (
          <div className='flex flex-col space-y-2'>
            {filters.categories.map((category) => (
              <label key={category} className='capitalize flex items-center'>
                <input
                  type='radio'
                  name='category'
                  value={category}
                  checked={filtersState.category === category}
                  onChange={(e) => setFiltersState({ ...filtersState, category: e.target.value })}
                  className='mr-2'
                />
                {category}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Colors Filter */}
      <div>
        <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('color')}>
          <h4 className='font-medium text-lg'>Colors</h4>
          {openSections.color ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
        </div>
        <hr className='my-2' />
        {openSections.color && (
          <div className='flex flex-col space-y-2'>
            {filters.colors.map((color) => (
              <label key={color} className='capitalize flex items-center'>
                <input
                  type='radio'
                  name='color'
                  value={color}
                  checked={filtersState.color === color}
                  onChange={(e) => setFiltersState({ ...filtersState, color: e.target.value })}
                  className='mr-2'
                />
                {color}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div>
        <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('priceRange')}>
          <h4 className='font-medium text-lg'>Price Range</h4>
          {openSections.priceRange ? <RiArrowUpSLine size={20} /> : <RiArrowDownSLine size={20} />}
        </div>
        <hr className='my-2' />
        {openSections.priceRange && (
          <div className='flex flex-col space-y-2'>
            {filters.priceRange.map((price) => (
              <label key={price.label} className='capitalize flex items-center'>
                <input
                  type='radio'
                  name='priceRange'
                  value={`${price.min}-${price.max}`}
                  checked={filtersState.priceRange === `${price.min}-${price.max}`}
                  onChange={(e) => setFiltersState({ ...filtersState, priceRange: e.target.value })}
                  className='mr-2'
                />
                {price.label}
              </label>
            ))}
          </div>
        )}
      </div>

      <button onClick={clearFilters} className='bg-primary text-white py-2 px-4 rounded-md w-full mt-4'>Clear Filters</button>
    </div>
  );
}

export default ShopFiltering;
