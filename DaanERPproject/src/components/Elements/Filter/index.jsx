import React from "react";
import Select from "react-select";
import FormItems from "../formItems";
import "./style.css";
import Button from "../button";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#ffffff", // main input background
    border: "1px solid #69af99",

    borderRadius: "20px",
    paddingLeft: "15px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#ffffff", // dropdown background
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#007bff"
      : state.isFocused
        ? "#e6f0ff"
        : "#fff",
    color: state.isSelected ? "#fff" : "#000",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#d1e7dd", // selected chip background
  }),
};

const Filter = ({
  onChange,
  isMulti,
  className,
  options,
  placeholder,
  prevMonthDate,
  prevOnchange,
  prevType = "date",
  yesterday,
  yesOnchange,
  onClick,
  disableFrom,
  child,
  yesType = "date",
}) => {
  return (
    <div className="custom-filter" style={{ display: "flex", gap: "10px" }}>
      <label htmlFor="">
        <p className="label-p" style={{ zIndex: "1" }}>
          Select Hotels
        </p>
        <Select
          styles={customStyles}
          onChange={onChange}
          isMulti={isMulti}
          className={`${className} custom-multi-select`}
          options={options}
          placeholder={placeholder}
          classNamePrefix={`custom-select-two`}
        ></Select>
      </label>
      {disableFrom ? (
        ""
      ) : (
        <>
          <FormItems
            value={prevMonthDate}
            labelData={"From Date"}
            onChange={prevOnchange}
            type={prevType}
          ></FormItems>

          <FormItems
            value={yesterday}
            onChange={yesOnchange}
            type={yesType}
            labelData={"InTake Date"}
          ></FormItems>
        </>
      )}

      {child && <Button onClick={onClick} child={child}></Button>}
    </div>
  );
};

export default Filter;
