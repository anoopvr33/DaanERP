import React, { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch } from "react-redux";
import { addBookingThunk } from "../../redux/bookingSlice";
import axios from "axios";
import { API, getCookie } from "../../utils/axios";
import { Hotels } from "../../utils";

const AccountsDailyAdd = ({ formdate }) => {
  const [selectedCat, setSelectedCat] = useState({});
  const [selectedSub, setSelectedSub] = useState("");
  const [data, setData] = useState({
    date: "",
    category: "",
    sub_category: "",
    receipts: Number(""),
    payments: Number(""),
    balance: Number(""),
    description: "",
    bank: "",
    hotel: "",
  });

  const [category, setCategory] = useState([]);
  // const [category, setCategory] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [subId, setSubId] = useState(1);

  const dispatch = useDispatch();

  const GetCategory = async () => {
    const res = await API.get("/daybook/get_categories/");
    console.log("my category", res.data.data);
    setCategory(res?.data?.data);
  };

  const GetSubCat = async () => {
    const res = await API.post("/daybook/get_subcategories/", {
      category_id: subId,
    });
    setSubCat(res.data.data);
    // console.log("sub arr", res);
  };

  const OnInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    const response = await API.post("/daybook/add_daybook_log/", data, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    });
    if (response.data.status === "success") {
      alert("added");
    }
    console.log("add daily", response);
  };

  const CatOption = [
    { name: "Select Category", value: "" },
    ...category.map((i) => ({
      name: i.category,
      value: i.id,
    })),
  ];
  const SubCatOption = [
    { name: "Select SubCategory", value: "" },
    ...subCat.map((i) => ({
      name: i.sub_category,
      value: i.id,
    })),
  ];

  useEffect(() => {
    GetCategory();
    // eslint(react-hooks/set-state-in-effect)
  }, []);

  useEffect(() => {
    console.log("laala", selectedCat);
    setData({ ...data, category: selectedCat.category });
  }, [selectedCat]);

  useEffect(() => {
    console.log("laala", selectedSub);
    setData({ ...data, sub_category: selectedSub.sub_category });
  }, [selectedSub]);

  useEffect(() => {
    console.log("my data", data);
  }, [data]);

  useEffect(() => {
    GetSubCat();
  }, [subId]);

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
            onChange={(e) =>
              setData({ ...data, receipts: Number(e.target.value) })
            }
            type="number"
            name={"receipts"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>payments</p>
          <FormItems
            onChange={(e) =>
              setData({ ...data, payments: Number(e.target.value) })
            }
            type="number"
            name={"payments"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Balance</p>
          <FormItems
            onChange={(e) =>
              setData({ ...data, balance: Number(e.target.value) })
            }
            type="number"
            name={"balance"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>category</p>
          <FormItems
            onChange={(e) => {
              (setSelectedCat(category.find((i) => i.id == e.target.value)),
                setSubId(e.target.value));
            }}
            type="text"
            element="select"
            option={CatOption}
            name={"category"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>sub_category</p>
          <FormItems
            onChange={(e) =>
              setSelectedSub(subCat.find((i) => i.id == e.target.value))
            }
            type="text"
            element="select"
            option={SubCatOption}
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

        <label htmlFor="">
          <p>Hotel</p>
          <FormItems
            onChange={(e) => setData({ ...data, hotel: e.target.value })}
            option={["Select Hotel", ...Hotels()]}
            element="select"
            type="text"
            name={"hotel"}
            required
          ></FormItems>
        </label>

        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default AccountsDailyAdd;
