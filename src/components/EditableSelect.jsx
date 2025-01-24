import React from 'react';

const EditableSelect = ({ value, options, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded w-full p-1"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default EditableSelect;
