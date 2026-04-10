import React, { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch } from "react-redux";
import { addBookingThunk } from "../../redux/bookingSlice";
import axios from "axios";
import { API, getCookie } from "../../utils/axios";

const AccountsVendorAdd = ({ formdate }) => {
  const [data, setData] = useState({
    name: " ",
    date: "",
    bill_no: "",
    amount: "",
    remarks: "",
    payment_date: "",
    due_date: "",
    file_path: "",
  });
  const dispatch = useDispatch();

  const OnInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    console.log("vendor", data);
    const response = await API.post("/daybook/add_vendor_payout/", data, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    });
    if (response.data.status) {
      alert("addedd successfully");
    }
    console.log("add vemdor", response);
  };

  useEffect(() => {
    console.log("my data", data);
  }, [data]);

  return (
    <div className="add-account-main">
      <form action="" onSubmit={OnSubmit}>
        <label htmlFor="">
          <p>Name</p>
          <FormItems onChange={OnInput} name={"name"}></FormItems>
        </label>
        <label htmlFor="">
          <p>date</p>
          <FormItems
            // element="select"
            // option={["select", "IN", "EX"]}
            onChange={OnInput}
            type="date"
            name={"date"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>bill_no</p>
          <FormItems
            onChange={OnInput}
            type="text"
            name={"bill_no"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>amount</p>
          <FormItems
            onChange={OnInput}
            type="text"
            name={"amount"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>remarks</p>
          <FormItems
            onChange={OnInput}
            type="text"
            name={"remarks"}
            required
          ></FormItems>
        </label>{" "}
        <label htmlFor="">
          <p>payment_date</p>
          <FormItems
            onChange={OnInput}
            type="date"
            name={"payment_date"}
            required
          ></FormItems>
        </label>{" "}
        <label htmlFor="">
          <p>due_date</p>
          <FormItems
            onChange={OnInput}
            type="date"
            name={"due_date"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>file_path</p>
          <FormItems
            onChange={OnInput}
            type="text"
            name={"file_path"}
            required
          ></FormItems>
        </label>
        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default AccountsVendorAdd;
