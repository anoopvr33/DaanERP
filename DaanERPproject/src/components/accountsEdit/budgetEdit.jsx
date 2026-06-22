import React, { useState } from "react";
import FormItems from "../Elements/formItems";
import "./style.css";
import { Edit_Budget } from "../../api/accountsServices";
import Button from "../Elements/button";
import { IsSuper } from "../../utils";

const BudgetEdit = ({
  setEdit,
  _id,
  hotel,
  category,
  sub_cat,
  budget,
  actual,
}) => {
  const [form, setForm] = useState({
    id: _id,
    // date: "2026-06-15",
    hotel: hotel,
    category: category,
    sub_category: sub_cat,
    budget_amount: budget,
    actual_amount: actual,
  });

  const onChange = (e) => {
    if (!e) return;

    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async () => {
    await Edit_Budget(form)
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
      <h2>Edit Budget</h2>
      <p> ID :{_id}</p> <br />
      <div>
        <FormItems
          type="text"
          labelData={"Category"}
          onChange={onChange}
          name="category"
          value={form.category}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"Subcategory"}
          onChange={onChange}
          name="sub_category"
          value={form.sub_category}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"Hotel"}
          name="hotel"
          onChange={onChange}
          value={form.hotel}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"Budget Amt"}
          name="budget_amount"
          onChange={onChange}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
          value={form.budget_amount}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"Actual Amt"}
          name="actual_amount"
          onChange={onChange}
          value={form.actual_amount}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
          readOnly={IsSuper() === false}
        ></FormItems>
        <Button onClick={onSubmit} child={"Submit"}></Button>
      </div>
    </div>
  );
};

export default BudgetEdit;
