import React, { useState } from "react";
import FormItems from "../Elements/formItems";
import "./style.css";
import Button from "../Elements/button";
import { Edit_DailyLog } from "../../api/accountsServices";
import { IsSuper } from "../../utils";

const DailyLogEdit = ({
  setEdit,
  _id,
  category,
  sub_cat,
  receipt,
  payment,
  balance,
  hotel,
  desc,
  bank,
}) => {
  const [form, setForm] = useState({
    id: _id,
    // date: "2026-06-15",
    category: category,
    sub_category: sub_cat,
    receipts: receipt,
    payments: payment,
    balance: balance,
    hotel: hotel,
    description: desc,
    bank: bank,
  });
  const onChange = (e) => {
    if (!e) return;

    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async () => {
    await Edit_DailyLog(form)
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
      {<h2>Edit DailyLog</h2>}
      {/* <p>Customer : {customer}</p> */}
      <p> ID : {_id}</p> <br />
      <div>
        <FormItems
          type="text"
          labelData={"category"}
          name="category"
          onChange={onChange}
          value={form.category}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"sub_category"}
          name="sub_category"
          onChange={onChange}
          value={form.sub_category}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"receipts"}
          name="receipts"
          onChange={onChange}
          value={form.receipts}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"payments"}
          name="payments"
          onChange={onChange}
          value={form.payments}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"balance"}
          name="balance"
          onChange={onChange}
          value={form.balance}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"hotel"}
          name="hotel"
          onChange={onChange}
          value={form.hotel}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"description"}
          name="description"
          onChange={onChange}
          value={form.description}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"bank"}
          name="bank"
          onChange={onChange}
          value={form.bank}
        ></FormItems>
        <Button onClick={onSubmit} child={"submit"}></Button>
      </div>
    </div>
  );
};

export default DailyLogEdit;
