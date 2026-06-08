import React, { useState } from "react";
import { API, getCookie } from "../../utils/axios";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import { Hotels } from "../../utils/index";

const AddSalary = () => {
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
      console.log("salary", response);
      if (response.data) {
        alert("success");
      } else alert("something went wrong");
    } catch (error) {
      alert("error occured");
    }
  };

  return (
    <div className="add-account-main">
      <form action="" onSubmit={OnSubmit}>
        <label htmlFor="">
          <p>date</p>
          <FormItems
            // element="select"
            // option={["select", "IN", "EX"]}
            onChange={OnInput}
            type="date"
            name={"date"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Name</p>
          <FormItems required onChange={OnInput} name={"name"}></FormItems>
        </label>
        <label htmlFor="">
          <p>department</p>
          <FormItems
            onChange={OnInput}
            option={["select Department", "Housekeeping"]}
            element="select"
            name={"department"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>hotel</p>
          <FormItems
            onChange={OnInput}
            element="select"
            option={["select hotel", ...Hotels()]}
            name={"hotel"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>doj</p>
          <FormItems
            onChange={OnInput}
            type="date"
            name={"doj"}
            required
          ></FormItems>
        </label>{" "}
        <label htmlFor="">
          <p>basic_salary</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"basic_salary"}
            required
          ></FormItems>
        </label>{" "}
        <label htmlFor="">
          <p>month_days</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"month_days"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>working_days</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"working_days"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>earning_salary</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"earning_salary"}
            required
          ></FormItems>
        </label>{" "}
        <label htmlFor="">
          <p>salary_advance</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"salary_advance"}
            required
          ></FormItems>
        </label>{" "}
        <label htmlFor="">
          <p>net_salary</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"net_salary"}
            required
          ></FormItems>
        </label>
        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default AddSalary;
