import React from "react";
import "./style.css";

const Select = ({ value, name, option, onChange, multiple }) => {
  return (
    <select
      value={value}
      name={name}
      onChange={onChange}
      className="custom_select"
      id=""
      multiple={multiple}
    >
      {option?.map((i, idx) =>
        i.name ? (
          <option value={i.value}>{i.name}</option>
        ) : (
          <option value={i}>{i}</option>
        ),
      )}
    </select>
  );
};

export default Select;
