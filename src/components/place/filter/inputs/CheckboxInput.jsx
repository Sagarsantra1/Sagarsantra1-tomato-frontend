import React from "react";
import "./CheckboxInput.css";

function CheckboxInput({ value, onChange, checked }) {
  return (
    <label htmlFor={value} className="checkbox-label">
      <input
        name={value}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {value}
    </label>
  );
}

export default CheckboxInput;
