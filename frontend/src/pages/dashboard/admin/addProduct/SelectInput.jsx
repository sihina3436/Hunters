import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({ label, name, value, onChange, options }) => {
    return (
        <div className="mb-4">
            <label 
                htmlFor={name} 
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
            </label>
            <select 
                name={name} 
                id={name}
                value={value}
                onChange={onChange}
                className="add-product-InputCSS w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
                {options.map((option) => (
                    <option 
                        key={option.value} 
                        value={option.value}
                        disabled={option.value === ''} // Disable empty default option
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

SelectInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default SelectInput;