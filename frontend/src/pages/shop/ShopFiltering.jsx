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

  const toggleAllSections = () => {
    const allOpen = Object.values(openSections).every(Boolean);
    setOpenSections({
      category: !allOpen,
      color: !allOpen,
      priceRange: !allOpen,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 w-full sm:w-80 mx-auto sm:mx-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold border-b pb-2">Filters</h3>
        <button
          onClick={toggleAllSections}
          className="text-sm text-primary hover:underline"
        >
          {Object.values(openSections).every(Boolean) ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => toggleSection('category')}
        >
          <h4 className="font-medium text-lg">Category</h4>
          {openSections.category ? <RiArrowUpSLine size={22} /> : <RiArrowDownSLine size={22} />}
        </div>
        {openSections.category && (
          <div className="flex flex-col space-y-2 mt-2">
            {filters.categories.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-2 hover:text-primary transition"
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filtersState.category === category}
                  onChange={(e) =>
                    setFiltersState({ ...filtersState, category: e.target.value })
                  }
                  className="w-4 h-4 accent-primary"
                />
                <span className="capitalize">{category}</span>
              </label>
            ))}
          </div>
        )}
        <hr className="mt-3" />
      </div>

      {/* Colors Filter */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => toggleSection('color')}
        >
          <h4 className="font-medium text-lg">Colors</h4>
          {openSections.color ? <RiArrowUpSLine size={22} /> : <RiArrowDownSLine size={22} />}
        </div>
        {openSections.color && (
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.colors.map((color) => (
              <label
                key={color}
                className="flex items-center space-x-2 p-1 border rounded-md cursor-pointer hover:border-primary transition"
              >
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={filtersState.color === color}
                  onChange={(e) =>
                    setFiltersState({ ...filtersState, color: e.target.value })
                  }
                  className="w-4 h-4 accent-primary"
                />
                <span className="capitalize text-sm">{color}</span>
              </label>
            ))}
          </div>
        )}
        <hr className="mt-3" />
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => toggleSection('priceRange')}
        >
          <h4 className="font-medium text-lg">Price Range</h4>
          {openSections.priceRange ? <RiArrowUpSLine size={22} /> : <RiArrowDownSLine size={22} />}
        </div>
        {openSections.priceRange && (
          <div className="flex flex-col space-y-2 mt-2">
            {filters.priceRange.map((price) => (
              <label
                key={price.label}
                className="flex items-center space-x-2 hover:text-primary transition"
              >
                <input
                  type="radio"
                  name="priceRange"
                  value={`${price.min}-${price.max}`}
                  checked={filtersState.priceRange === `${price.min}-${price.max}`}
                  onChange={(e) =>
                    setFiltersState({ ...filtersState, priceRange: e.target.value })
                  }
                  className="w-4 h-4 accent-primary"
                />
                <span>{price.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={clearFilters}
        className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition mt-4"
      >
        Clear Filters
      </button>
    </div>
  );
}

export default ShopFiltering;
