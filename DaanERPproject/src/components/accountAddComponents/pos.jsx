import React, { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch } from "react-redux";
import { addBookingThunk } from "../../redux/bookingSlice";
import axios from "axios";
import { API, getCookie } from "../../utils/axios";
import { Hotels } from "../../utils";
import { addBudgetThunk } from "../../redux/budgetActualSlice";

const AccountsPosAdd = ({ formdate, type }) => {
  const [category, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState({});
  const [selectedSub, setSelectedSub] = useState("");
  const [subId, setSubId] = useState(1);
  const [subCat, setSubCat] = useState([]);

  const [data, setData] = useState({
    date: formdate,
    category: "",
    sub_category: "New Sub Food",
    budget_amount: null,
    actual_amount: null,
    hotel: "",
  });
  const dispatch = useDispatch();

  const OnInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const OnSubmit = async (e) => {
    e.preventDefault();
    console.log("posss", data);
    dispatch(addBudgetThunk(data));
  };

  const GetCategory = async () => {
    const res = await API.get("/daybook/get_budget_categories/");
    if (res.data.data) {
      setCategory(res.data.data);
    }
  };

  const GetSubCat = async () => {
    console.log("sub id", subId);
    if (!subId) return;
    const res = await API.post("/daybook/get_budget_subcategories/", {
      budget_category_id: subId,
    });
    console.log("sub cat", res);
    setSubCat(res.data.data);
    // console.log("sub arr", res);
  };

  const CatOption = [
    { name: "select Category", value: "" },
    ...category.map((i) => ({ name: i.category, value: i.id })),
  ];

  const SubCatOption = [
    { name: "Select SubCategory", value: "" },
    ...subCat.map((i) => ({
      name: i.sub_category,
      value: i.id,
    })),
  ];

  useEffect(() => {
    console.log("laala", selectedCat);
    setData({
      ...data,
      category: selectedCat?.category ? selectedCat.category : "",
    });
  }, [selectedCat]);

  useEffect(() => {
    console.log("laala", selectedSub);
    setData({
      ...data,
      sub_category: selectedSub?.sub_category ? selectedSub.sub_category : "",
    });
  }, [selectedSub]);

  useEffect(() => {
    GetCategory();
  }, []);

  useEffect(() => {
    GetSubCat();
  }, [subId]);

  useEffect(() => {
    console.log("my data", data);
  }, [data]);

  return (
    <div className="add-account-main">
      <form action="" onSubmit={OnSubmit}>
        <label htmlFor="">
          <p>Date</p>
          <FormItems
            onChange={OnInput}
            type="date"
            value={formdate}
            name={"date"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Category</p>
          <FormItems
            element="select"
            onChange={(e) => {
              (setSelectedCat(category.find((i) => i.id == e.target.value)),
                setSubId(e.target.value));
            }}
            option={CatOption}
            name={"category"}
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Sub-Category</p>
          <FormItems
            onChange={(e) =>
              setSelectedSub(subCat.find((i) => i.id == e.target.value))
            }
            type="text"
            name={"sub_category"}
            element="select"
            option={SubCatOption}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Budget</p>
          <FormItems
            onChange={(e) =>
              setData({ ...data, budget_amount: Number(e.target.value) })
            }
            type="number"
            name={"budget_amount"}
            required
          ></FormItems>
        </label>
        <label htmlFor="">
          <p>Actual Expense</p>
          <FormItems
            onChange={(e) =>
              setData({ ...data, actual_amount: Number(e.target.value) })
            }
            type="number"
            name={"actual_amount"}
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

export default AccountsPosAdd;
