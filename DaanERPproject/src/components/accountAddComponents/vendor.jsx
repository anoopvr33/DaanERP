import React, {  useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch } from "react-redux";
import { API } from "../../utils/axios";
import { Hotels } from "../../utils";
import { add_vendor_thunk } from "../../redux/vendorSlice";

const AccountsVendorAdd = ({ setOpen }) => {
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

    formData.append("amount", data.amount);
    formData.append("bill_no", data.bill_no);
    formData.append("date", data.date);
    formData.append("due_date", data.due_date);
    formData.append("file_path", data.file_path); // important
    formData.append("name", data.name);
    formData.append("payment_date", data.payment_date);
    formData.append("remarks", data.remarks);
    formData.append("hotel", data.hotel);
  
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    dispatch(add_vendor_thunk(formData));
  };


  return (
    <div className="add-account-main">
      <h4>
        Add new Vendor
        <i
          onClick={() => setOpen(false)}
          class="fa-regular fa-circle-xmark"
        ></i>
      </h4>
      <form action="" onSubmit={OnSubmit}>
        <FormItems
          labelData={"Name"}
          onChange={OnInput}
          name={"name"}
        ></FormItems>

        <FormItems
          labelData={"date"}
          onChange={OnInput}
          type="date"
          name={"date"}
        ></FormItems>

        <FormItems
          labelData={"bill_no"}
          onChange={OnInput}
          type="text"
          name={"bill_no"}
          required
        ></FormItems>

        <FormItems
          labelData={"amount"}
          onChange={OnInput}
          type="text"
          name={"amount"}
          required
        ></FormItems>

        <FormItems
          labelData={"remarks"}
          onChange={OnInput}
          type="text"
          name={"remarks"}
          required
        ></FormItems>

        <FormItems
          labelData={"payment_date"}
          onChange={OnInput}
          type="date"
          name={"payment_date"}
          required
        ></FormItems>

        <FormItems
          labelData={"due_date"}
          onChange={OnInput}
          type="date"
          name={"due_date"}
          required
        ></FormItems>

        <FormItems
          labelData={"file_path"}
          onChange={OnInput}
          type="file"
          name={"file_path"}
          required
        ></FormItems>

        <FormItems
          labelData={"Select Hotel"}
          onChange={OnInput}
          element="select"
          option={["select hotel", ...Hotels()]}
          name={"hotel"}
          required
        ></FormItems>

        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default AccountsVendorAdd;
