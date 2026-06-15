import React, { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch } from "react-redux";
import { addBookingThunk } from "../../redux/bookingSlice";
import axios from "axios";
import { API, getCookie } from "../../utils/axios";
import { Hotels } from "../../utils";
import { add_vendor_thunk } from "../../redux/vendorSlice";

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
    hotel: "",
  });
  const dispatch = useDispatch();

  const OnInput = (e) => {
    const { name, files, value } = e.target;

    if (name === "file_path") {
      console.log("files:", files);
      console.log("file[0]:", files?.[0]);
      setData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const OnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });

    formData.append("amount", data.amount);
    formData.append("bill_no", data.bill_no);
    formData.append("date", data.date);
    formData.append("due_date", data.due_date);
    formData.append("file_path", data.file_path); // important
    formData.append("name", data.name);
    formData.append("payment_date", data.payment_date);
    formData.append("remarks", data.remarks);
    formData.append("hotel", data.hotel);
    console.log("FINAL file:", data.file_path);
    console.log("isFile:", data.file_path instanceof File);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    dispatch(add_vendor_thunk(formData));
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
            type="file"
            name={"file_path"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Select Hotel</p>
          <FormItems
            onChange={OnInput}
            element="select"
            option={["select hotel", ...Hotels()]}
            name={"hotel"}
            required
          ></FormItems>
        </label>
        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default AccountsVendorAdd;
