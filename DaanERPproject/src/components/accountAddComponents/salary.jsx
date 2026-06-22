import React, { useState } from "react";
import { API, getCookie } from "../../utils/axios";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import { Hotels } from "../../utils/index";

const AddSalary = ({ setOpen }) => {
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

  const OnInput = async (e) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    console.log("salary from", form);
    try {
      const response = await API.post("/daybook/add_salary/", form, {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
          // "Content-Type": "multipart/form-data", // 👈 add this
        },
      });
      if (response.data) {
        alert("success");
      } else alert("something went wrong");
    } catch (error) {
      alert("error occured");
    }
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

        <FormItems
          labelData={"department"}
          onChange={OnInput}
          option={["select Department", "Housekeeping"]}
          element="select"
          name={"department"}
          required
        ></FormItems>

        <FormItems
          labelData={"hotel"}
          onChange={OnInput}
          element="select"
          option={["select hotel", ...Hotels()]}
          name={"hotel"}
          required
        ></FormItems>

        <FormItems
          labelData={"doj"}
          onChange={OnInput}
          type="date"
          name={"doj"}
          required
        ></FormItems>

        <FormItems
          labelData={"basic_salary"}
          onChange={OnInput}
          type="number"
          name={"basic_salary"}
          required
        ></FormItems>

        <FormItems
          labelData={"month_days"}
          onChange={OnInput}
          type="number"
          name={"month_days"}
          required
        ></FormItems>

        <FormItems
          labelData={"working_days"}
          onChange={OnInput}
          type="number"
          name={"working_days"}
          required
        ></FormItems>

        <FormItems
          labelData={"earning_salary"}
          onChange={OnInput}
          type="number"
          name={"earning_salary"}
          required
        ></FormItems>

        <FormItems
          labelData={"salary_advance"}
          onChange={OnInput}
          type="number"
          name={"salary_advance"}
          required
        ></FormItems>

        <FormItems
          labelData={"net_salary"}
          onChange={OnInput}
          type="number"
          name={"net_salary"}
          required
        ></FormItems>

        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default AddSalary;
