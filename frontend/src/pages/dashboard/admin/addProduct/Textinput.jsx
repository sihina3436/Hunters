// TextInput.jsx
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx"; // Optional, but clean — npm i clsx

const TextInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  error = null,
  icon = null,
}) => {
  return (
    <div className="mb-6 w-full">
      {/* Label */}
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

      {/* Input wrapper */}
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
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
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

      {/* Error message */}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["text", "number", "email", "password", "tel", "url"]),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  icon: PropTypes.string,
};

TextInput.defaultProps = {
  type: "text",
  placeholder: "",
  required: false,
  disabled: false,
  error: null,
  icon: null,
};

export default TextInput;
