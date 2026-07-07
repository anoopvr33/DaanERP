import React, { useState } from "react";
import FormItems from "../Elements/formItems";
import "./style.css";
import { Edit_Vendor } from "../../api/accountsServices";
import Button from "../Elements/button";
import { Hotels, IsSuper } from "../../utils";

const VendorEdit = ({
  setEdit,
  _id,
  name,
  bill_no,
  amount,
  remarks,
  payment_date,
  due_date,
  hotel,
}) => {
  const [form, setForm] = useState({
    id: _id,
    name: name,
    // date: "2026-06-15",
    bill_no: bill_no,
    amount: amount,
    remarks: remarks,
    payment_date: payment_date,
    due_date: due_date,
    hotel: hotel,
  });
  const onChange = (e) => {
    if (!e) return;

    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async () => {
    await Edit_Vendor(form)
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
      {<h2>Edit Vendor</h2>}
      {/* <p>Customer : {customer}</p> */}
      <p> ID :{_id}</p> <br />
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
          labelData={"bill_no"}
          name="bill_no"
          value={form.bill_no}
          onChange={onChange}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"amount"}
          name="amount"
          value={form.amount}
          onChange={onChange}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"remarks"}
          name="remarks"
          value={form.remarks}
          onChange={onChange}
        ></FormItems>
        <FormItems
          type="date"
          labelData={"payment_date"}
          name="payment_date"
          value={form.payment_date}
          onChange={onChange}
        ></FormItems>
        <FormItems
          type="date"
          labelData={"due_date"}
          name="due_date"
          value={form.due_date}
          onChange={onChange}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"hotel"}
          name="hotel"
          element="select"
          option={["select hotel", ...Hotels()]}
          value={form.hotel}
          onChange={onChange}
        ></FormItems>
        <Button onClick={onSubmit} child={"submit"}></Button>
      </div>
    </div>
  );
};

export default VendorEdit;
