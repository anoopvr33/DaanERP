import React from "react";
import Input from "../input";
import Select from "../select";

const FormItems = ({
  element = "input",
  label,
  placeholder,
  icon,
  type = "text",
  onChange,
  value,
  className,
  option,
  name,
  disabled,
  multiple,
  defualt,
  max,
  min,
  labelData,
  readOnly,
}) => {
  let component = <></>;

  if (element == "input") {
    return (component = (
      <Input
        value={value}
        onChange={onChange}
        type={type}
        readOnly={readOnly}
        max={max}
        min={min}
        disabled={disabled}
        name={name}
        labelData={labelData}
        className={className}
        defualt={defualt}
        icon={icon}
        placeholder={placeholder}
        label={label}
      ></Input>
    ));
  }

  if (element == "select") {
    return (component = (
      <Select
        value={value}
        name={name}
        disabled={disabled}
        className={className}
        onChange={onChange}
        labelData={labelData}
        multiple={multiple}
        option={option}
      ></Select>
    ));
  }

  return { component };
};

export default FormItems;
