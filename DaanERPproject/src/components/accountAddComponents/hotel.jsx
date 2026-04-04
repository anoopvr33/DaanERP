import { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch } from "react-redux";
import { addBookingThunk } from "../../redux/bookingSlice";
import axios from "axios";
import { API } from "../../utils/axios";

const AccountsHotelAdd = ({ formdate }) => {
  const [data, setData] = useState({
    amount: "",
    date: formdate,
    details: "",
    remarks: "",
  });
  const dispatch = useDispatch();

  const OnInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnSubmit = async (e) => {
    e.preventDefault();

    console.log("hotel data", data);

    const response = await API.post("/daybook/add_hotelops/", data);
    console.log("add res", response);
    if (response.data.msg) {
      alert("success");
    }
  };

  useEffect(() => {
    console.log("my data", data);
  }, [data]);

  return (
    <div className="add-account-main">
      <form action="" onSubmit={OnSubmit}>
        <label htmlFor="">
          <p>Date</p>
          <FormItems type="date" onChange={OnInput} name={"date"}></FormItems>
        </label>
        <label htmlFor="">
          <p>receipts</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"receipts"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>payments</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"payments"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>balance</p>
          <FormItems
            onChange={OnInput}
            type="number"
            name={"balance"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>category</p>
          <FormItems
            onChange={OnInput}
            type="text"
            element="select"
            option={[
              { name: "particular", value: "particular" },
              { name: "expense", value: "expense" },
            ]}
            name={"category"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>sub_category</p>
          <FormItems
            onChange={OnInput}
            type="text"
            element="select"
            option={[
              { name: "particular", value: "particular" },
              { name: "expense", value: "expense" },
            ]}
            name={"sub_category"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>description</p>
          <FormItems
            onChange={OnInput}
            type="text"
            name={"description"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>bank</p>
          <FormItems
            onChange={OnInput}
            type="text"
            name={"bank"}
            required
          ></FormItems>
        </label>

        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default AccountsHotelAdd;
