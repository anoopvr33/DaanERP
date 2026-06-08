import React from "react";
import "./style.css";

const Select = ({
  value,
  name,
  option,
  onChange,
  multiple,
  labelData,
  required,
  disabled,
  className,
}) => {
  return (
    <label className="custom-select-label" htmlFor="">
      <p>{labelData}</p>
      <select
        value={value}
        name={name}
        required={required}
        onChange={onChange}
        className={`custom_select ${className}`}
        id=""
        multiple={multiple}
        disabled={disabled}
        // readOnly={readOnly}
      >
        {option?.map((i, idx) =>
          i.name === "" || i.name ? (
            <option value={i.value}>{i.name}</option>
          ) : (
            <option value={i}>{i}</option>
          ),
        )}
      </select>
    </label>
  );
};

export default Select;
