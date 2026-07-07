import React, { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import "./style.css";
import {
  Edit_Budget,
  GetBudget_CategoryAPI,
  GetBudgetSub_Category,
} from "../../api/accountsServices";
import Button from "../Elements/button";
import { Hotels, IsSuper } from "../../utils";

const BudgetEdit = ({
  setEdit,
  _id,
  hotel,
  category,
  sub_cat,
  budget,
  actual,
}) => {
  const [categoryyy, setCategory] = useState([]);
  const [form, setForm] = useState({
    id: _id,
    // date: "2026-06-15",
    hotel: hotel,
    category: category,
    sub_category: sub_cat,
    budget_amount: budget,
    actual_amount: actual,
  });
  const [subCat, setSubCat] = useState([{ sub_category: sub_cat }]);

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

  const setCategoryValue = async (e) => {

    if (!e) return;
    if (e.target.value === "") return;
    const catValue = categoryyy.find((i) => i.category == e.target.value);
    setForm({
      ...form,
      category: catValue?.category ? catValue.category : "",
    });

    if (!catValue) return;
    getSubcat(catValue.id);
  };

  const getSubcat = async (catValue) => {
    await GetBudgetSub_Category(catValue).then((res) =>
      setSubCat(res?.data?.data),
    );
  };

  const setSubcategoryValue = (e) => {
    const subValue = subCat?.find((i) => i.sub_category == e.target.value);
    setForm({
      ...form,
      sub_category: subValue?.sub_category ? subValue.sub_category : "",
    });
  };

  const subcategoryOptions = [
    // { name: sub_cat, value: "" },
    { name: "Select subcategory", value: "" },
    ...subCat.map((i) => ({
      name: i.sub_category,
      value: i.sub_category,
    })),
  ];
  const categoryOptions = [
    // { name: category, value: "" },
    { name: "select Category", value: "" },
    ...categoryyy.map((i) => ({ name: i.category, value: i.category })),
  ];

  useEffect(() => {
    const selecteded = categoryyy.find((i) => i.category === category)?.id;
    if (!selecteded) return;
    getSubcat(selecteded);
  }, [categoryyy]);

  useEffect(() => {
    GetBudget_CategoryAPI().then((res) => setCategory(res?.data?.data));
  }, []);

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
          labelData={"Category"}
          required
          element="select"
          onChange={(e) => setCategoryValue(e)}
          option={categoryOptions}
          value={form.category}
          // value={form?.category?form.category:"none"}
          name={"category"}
        ></FormItems>
        <FormItems
          labelData={"Sub-Category"}
          onChange={(e) => setSubcategoryValue(e)}
          type="text"
          name={"sub_category"}
          element="select"
          option={subcategoryOptions}
          value={form.sub_category}
          required
        ></FormItems>
        <FormItems
          labelData={"Hotel"}
          onChange={(e) => setForm({ ...form, hotel: e.target.value })}
          option={["Select Hotel", ...Hotels()]}
          value={form.hotel}
          element="select"
          type="text"
          name={"hotel"}
          required
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
