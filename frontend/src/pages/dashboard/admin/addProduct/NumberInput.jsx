import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const NumberInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = null,
  icon = null,
  min,
  max,
  step,
}) => {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={name}
        className={clsx(
          "mb-1 block text-sm font-medium",
          error ? "text-red-600" : "text-gray-700"
        )}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <i
            className={clsx(
              icon,
              "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none",
              disabled && "text-gray-300"
            )}
          />
        )}

        <input
          id={name}
          name={name}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          step={step}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={clsx(
            "w-full border-0 border-b-2 bg-transparent py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 transition",
            icon ? "pl-10" : "pl-3",
            disabled && "bg-gray-100 text-gray-500 cursor-not-allowed",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-primary"
          )}
        />
      </div>

      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  icon: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

export default NumberInput;
