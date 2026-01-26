import React from "react";
import "./style.css";

const Select = ({ value, name, option, onChange }) => {
  return (
    <select
      value={value}
      name={name}
      onChange={onChange}
      className="custom_select"
      id=""
    >
      {option?.map((i, idx) => (
        <option value={i}>{i}</option>
      ))}
    </select>
  );
};

export default Select;
