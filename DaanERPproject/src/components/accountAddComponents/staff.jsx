import { useMemo, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import { formatHotel } from "../../utils/index";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#ffffff", // main input background
    border: "1px solid #b1d2d7",

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

const AddStaff = ({ setOpen }) => {
  const [form, setForm] = useState({
    date: "",
    name: "",
    department: "",
    hotel: "",
    doj: "",
    basic_salary: 0,
    month_days: 0,
    working_days: 0,
    earning_salary: 0,
    salary_advance: 0,
    net_salary: 0,
  });

  const formattedHotels = useMemo(() => formatHotel() || [], []);

  const OnInput = async (e) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const OnSubmit = async (e) => {
    e.preventDefault();

    //create a new api for new staff member with the form data

    // try {
    //   const response = await Add_Salary(form);
    //   if (response.data) {
    //     alert("success");
    //   } else alert("something went wrong");
    // } catch (err) {
    //   alert("error occured");
    // }
  };

  return (
    <div className="add-account-main">
      <h4>
        Add new Budget
        <i onClick={() => setOpen(null)} class="fa-regular fa-circle-xmark"></i>
      </h4>
      <form action="" onSubmit={OnSubmit}>
        <FormItems
          labelData={"date"}
          onChange={OnInput}
          type="date"
          name={"date"}
          required
        ></FormItems>

        <FormItems
          required
          labelData={"Name"}
          onChange={OnInput}
          name={"name"}
        ></FormItems>

        {/* department api is not available currently so i will use a select input with hardcoded values for now */}
        <FormItems
          labelData={"department"}
          onChange={OnInput}
          option={["select Department", "Housekeeping"]}
          element="select"
          name={"department"}
          required
        ></FormItems>

        <label className="custom-label" htmlFor="">
          <p className="label-p" style={{ zIndex: "1" }}>
            Select Hotels
          </p>
          <Select
            styles={customStyles}
            onChange={OnInput}
            isMulti
            className={` custom-multi-select`}
            options={formattedHotels}
            // options={["fd", "fd", "fd"]}
            placeholder={"All Hotels"}
            classNamePrefix={`custom-select-two`}
          ></Select>
        </label>

        <FormItems
          labelData={"End Date"}
          onChange={OnInput}
          type="date"
          name={"end_date"}
          required
        ></FormItems>

        <FormItems
          labelData={"basic_salary"}
          onChange={OnInput}
          type="number"
          name={"basic_salary"}
          required
        ></FormItems>

        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default AddStaff;
