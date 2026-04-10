import React from 'react';

const Dropdown = ({ id, options, value, onChange, placeholder, disabled }) => {
  return (
    <div className="custom-select-wrapper">
      <select 
        id={id}
        className="custom-select" 
        value={value} 
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label.charAt(0).toUpperCase() + opt.label.slice(1)}
          </option>
        ))}
      </select>
      <div className="custom-select-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
