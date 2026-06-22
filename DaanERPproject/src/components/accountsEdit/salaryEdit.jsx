import React, { useState } from "react";
import FormItems from "../Elements/formItems";
import "./style.css";
import { Edit_Salary } from "../../api/accountsServices";
import Button from "../Elements/button";
import { IsSuper } from "../../utils";

const SalaryEdit = ({
  setEdit,
  name,
  _id,
  department,
  hotel,
  doj,
  basic_salary,
  month_days,
  working_days,
  earning_salary,
  salary_advance,
  net_salary,
}) => {
  const [form, setForm] = useState({
    id: _id,
    // date: "2026-06-15",
    name: name,
    department: department,
    hotel: hotel,
    doj: doj,
    basic_salary: basic_salary,
    month_days: month_days,
    working_days: working_days,
    earning_salary: earning_salary,
    salary_advance: salary_advance,
    net_salary: net_salary,
  });
  const onChange = (e) => {
    if (!e) return;

    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async () => {
    await Edit_Salary(form)
      .then((res) => {
        alert(res?.data?.message);
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="account-edit">
      <i
        onClick={() => setEdit(null)}
        style={{ margin: "auto", marginRight: "0px" }}
        class="fa-regular fa-circle-xmark"
      ></i>
      {<h2>Edit Salary</h2>}
      {/* <p>Customer : {customer}</p> */}
      <p>ID :{_id}</p> <br />
      <div>
        <FormItems
          type="text"
          labelData={"name"}
          name="name"
          value={form.name}
          onChange={onChange}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"department"}
          name="department"
          value={form.department}
          onChange={onChange}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"hotel"}
          name="hotel"
          value={form.hotel}
          onChange={onChange}
        ></FormItems>
        <FormItems
          type="date"
          labelData={"doj"}
          name="doj"
          value={form.doj}
          onChange={onChange}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"basic_salary"}
          name="basic_salary"
          value={form.basic_salary}
          onChange={onChange}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"month_days"}
          name="month_days"
          value={form.month_days}
          onChange={onChange}
        ></FormItems>

        <FormItems
          type="number"
          labelData={"working_days"}
          name="working_days"
          value={form.working_days}
          onChange={onChange}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"earning_salary"}
          name="earning_salary"
          value={form.earning_salary}
          onChange={onChange}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"salary_advance"}
          name="salary_advance"
          value={form.salary_advance}
          onChange={onChange}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
        ></FormItems>

        <FormItems
          type="number"
          labelData={"net_salary"}
          name="net_salary"
          value={form.net_salary}
          onChange={onChange}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
        ></FormItems>
        <Button onClick={onSubmit} child={"submit"}></Button>
      </div>
    </div>
  );
};

export default SalaryEdit;
