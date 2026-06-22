import { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch } from "react-redux";
import { API } from "../../utils/axios";
import { Hotels } from "../../utils";
import { addBudgetThunk } from "../../redux/budgetActualSlice";
import {
  AddBudgetSub_CategoryAPI,
  GetBudget_CategoryAPI,
  GetBudgetSub_Category,
} from "../../api/accountsServices";

const AccountsPosAdd = ({ formdate, setOpen }) => {
  const [category, setCategory] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    date: formdate,
    category: "",
    sub_category: "",
    budget_amount: null,
    actual_amount: null,
    hotel: "",
  });

  // input data catch
  const OnInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // assign category and fetch subcategory
  const setCategoryValue = async (e) => {
    if (!e) return;
    const catValue = category.find((i) => i.id == e.target.value || {});
    setData({
      ...data,
      category: catValue?.category ? catValue.category : "",
    });

    await GetBudgetSub_Category(e.target.value).then((res) =>
      setSubCat(res?.data?.data),
    );
  };

  // assign subcategory
  const setSubcategoryValue = (e) => {
    const subValue = subCat?.find((i) => i.id == e.target.value);
    setData({
      ...data,
      sub_category: subValue?.sub_category ? subValue.sub_category : "",
    });
  };

  // assign category and subcategory options
  const categoryOptions = [
    { name: "select Category", value: "" },
    ...category.map((i) => ({ name: i.category, value: i.id })),
  ];

  const subcategoryOptions = [
    { name: "Select subcategory", value: "" },
    ...subCat.map((i) => ({
      name: i.sub_category,
      value: i.id,
    })),
  ];

  // get category
  useEffect(() => {
    GetBudget_CategoryAPI().then((res) => setCategory(res?.data?.data));
  }, []);

  return (
    <div className="add-account-main">
      <h4>
        Add new Budget
        <i onClick={() => setOpen(null)} class="fa-regular fa-circle-xmark"></i>
      </h4>
      <form action="" onSubmit={() => dispatch(addBudgetThunk(data))}>
        <FormItems
          labelData={"Date"}
          onChange={OnInput}
          type="date"
          value={data.formdate}
          name={"date"}
          required
        ></FormItems>

        <FormItems
          labelData={"Category"}
          required
          element="select"
          onChange={(e) => setCategoryValue(e)}
          option={categoryOptions}
          name={"category"}
        ></FormItems>

        <FormItems
          labelData={"Sub-Category"}
          onChange={(e) => setSubcategoryValue(e)}
          type="text"
          name={"sub_category"}
          element="select"
          option={subcategoryOptions}
          required
        ></FormItems>

        <FormItems
          labelData={"Budget"}
          onChange={(e) =>
            setData({ ...data, budget_amount: Number(e.target.value) })
          }
          type="number"
          name={"budget_amount"}
          required
        ></FormItems>

        <FormItems
          labelData={"Actual Expense"}
          onChange={(e) =>
            setData({ ...data, actual_amount: Number(e.target.value) })
          }
          type="number"
          name={"actual_amount"}
          required
        ></FormItems>

        <FormItems
          labelData={"Hotel"}
          onChange={(e) => setData({ ...data, hotel: e.target.value })}
          option={["Select Hotel", ...Hotels()]}
          element="select"
          type="text"
          name={"hotel"}
          required
        ></FormItems>

        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default AccountsPosAdd;
