/* eslint-disable react-hooks/exhaustive-deps */
import "./style.css";
import { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import { useDispatch, useSelector } from "react-redux";
import { Hotels } from "../../utils";
import {
  addDailyLogThunk,
  getDailyLogCategory,
} from "../../redux/dailyLogSlice";
import { Get_DailyLog_SubCategory } from "../../api/accountsServices";

const AccountsDailyAdd = ({ setOpen }) => {
  // const [selectedCat, setSelectedCat] = useState({});
  // const [selectedSub, setSelectedSub] = useState("");
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
  const [subCat, setSubCat] = useState([]);
  const dispatch = useDispatch();

  // getting category from redux store
  const { category } = useSelector((state) => state.dailylog);

  // getting subcategory based on selected category
  const GetSubCat = async (categoryId) => {
    const res = await Get_DailyLog_SubCategory(categoryId);
    setSubCat(res.data.data);
  };

  // input change handler
  const OnInput = (e) => {
    if (!e) return;
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  // category options for select input
  const CatOption = [
    { name: "Select Category", value: "" },
    ...category.map((i) => ({
      name: i.category,
      value: i.id,
    })),
  ];

  // subcategory options for select input
  const SubCatOption = [
    { name: "Select SubCategory", value: "" },
    ...subCat.map((i) => ({
      name: i.sub_category,
      value: i.id,
    })),
  ];

  // handle category change and set selected category in state
  const handleCategoryChange = (e) => {
    const selectedCategory = category.find((i) => i.id == e.target.value);
    setData({ ...data, category: selectedCategory.category });
    GetSubCat(e.target.value);
  };

  // handle subcategory change and set selected subcategory in state
  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = subCat.find((i) => i.id == e.target.value);
    setData({ ...data, sub_category: selectedSubCategory.sub_category });
  };

  // fetching category from redux store
  useEffect(() => {
    dispatch(getDailyLogCategory());
  }, [dispatch]);

  return (
    <div className="add-account-main">
      <h4>
        Add new DailyLog
        <i onClick={() => setOpen(null)} class="fa-regular fa-circle-xmark"></i>
      </h4>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addDailyLogThunk(data));
        }}
      >
        <FormItems
          labelData={"Date"}
          type="date"
          onChange={OnInput}
          name={"date"}
        ></FormItems>

        <FormItems
          onChange={(e) => setData({ ...data, receipts: e.target.value })}
          labelData={"receipts"}
          type="text"
          name={"receipts"}
          required
        ></FormItems>

        <FormItems
          onChange={(e) =>
            setData({ ...data, payments: Number(e.target.value) })
          }
          labelData={"payments"}
          type="number"
          name={"payments"}
          required
        ></FormItems>

        <FormItems
          onChange={(e) =>
            setData({ ...data, balance: Number(e.target.value) })
          }
          labelData={"Balance"}
          type="number"
          name={"balance"}
          required
        ></FormItems>

        <FormItems
          onChange={handleCategoryChange}
          labelData={"category"}
          element="select"
          option={CatOption}
          name={"category"}
          required
        ></FormItems>

        <FormItems
          onChange={handleSubCategoryChange}
          element="select"
          labelData={"sub_category"}
          option={SubCatOption}
          name={"sub_category"}
          required
        ></FormItems>

        <FormItems
          onChange={OnInput}
          labelData={"description"}
          type="text"
          name={"description"}
          required
        ></FormItems>

        <FormItems
          element="select"
          option={[
            "Select Mode",
            "Cash",
            "UPI Company",
            "UPI Current",
            "Bank Transfer",
            "Credit",
          ]}
          onChange={OnInput}
          labelData={"Payment Mode"}
          type="text"
          name={"bank"}
          required
        ></FormItems>

        <FormItems
          onChange={(e) => setData({ ...data, hotel: e.target.value })}
          option={["Select Hotel", ...Hotels()]}
          element="select"
          labelData={"Hotel"}
          type="text"
          name={"hotel"}
          required
        ></FormItems>
        <Button type={"submit"} child={"Add Details"}></Button>
      </form>
    </div>
  );
};

export default AccountsDailyAdd;
