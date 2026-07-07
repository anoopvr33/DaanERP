import React, { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import Button from "../Elements/button";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../utils/axios";
import { Hotels } from "../../utils";
import {
  addDailyLogThunk,
  getDailyLogCategory,
} from "../../redux/dailyLogSlice";

const AccountsDailyAdd = ({ setOpen }) => {
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
  const [subCat, setSubCat] = useState([]);
  const [subId, setSubId] = useState(1);
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.dailylog);

  const GetSubCat = async () => {
    const res = await API.post("/daybook/get_subcategories/", {
      category_id: subId,
    });
    setSubCat(res.data.data);
  };

  const OnInput = (e) => {
    if (!e) return;
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    dispatch(getDailyLogCategory());
  }, [dispatch]);

  useEffect(() => {
    setData({ ...data, category: selectedCat.category });
  }, [selectedCat]);

  useEffect(() => {
    setData({ ...data, sub_category: selectedSub.sub_category });
  }, [selectedSub]);

  useEffect(() => {
    GetSubCat();
  }, [subId]);

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
          onChange={(e) => {
            setSelectedCat(category.find((i) => i.id == e.target.value));
            setSubId(e.target.value);
          }}
          labelData={"category"}
          element="select"
          option={CatOption}
          name={"category"}
          required
        ></FormItems>

        <FormItems
          onChange={(e) =>
            setSelectedSub(subCat.find((i) => i.id == e.target.value))
          }
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
