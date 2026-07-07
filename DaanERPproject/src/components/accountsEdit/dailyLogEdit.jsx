import React, { useEffect, useState } from "react";
import FormItems from "../Elements/formItems";
import "./style.css";
import Button from "../Elements/button";
import { Edit_DailyLog } from "../../api/accountsServices";
import { Hotels, IsSuper } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../utils/axios";
import { getDailyLogCategory } from "../../redux/dailyLogSlice";

const DailyLogEdit = ({
  setEdit,
  _id,
  category,
  sub_cat,
  receipt,
  payment,
  balance,
  hotel,
  desc,
  bank,
}) => {
  const [form, setForm] = useState({
    id: _id,
    // date: "2026-06-15",
    category: category,
    sub_category: sub_cat,
    receipts: receipt,
    payments: payment,
    balance: balance,
    hotel: hotel,
    description: desc,
    bank: bank,
  });
  const [selectedCat, setSelectedCat] = useState({});
  const [selectedSub, setSelectedSub] = useState("");

  const [subCat, setSubCat] = useState([{ sub_category: sub_cat }]);

  const dispatch = useDispatch();

  const onChange = (e) => {
    if (!e) return;

    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const {
    items,
    category: statecate,
    catsub,
  } = useSelector((state) => state.dailylog);

  const selecteded = statecate.find((i) => i.category === category)?.id;

  const [subId, setSubId] = useState(selecteded);

  const CatOption = [
    // { name: category, value: "" },
    { name: "Select Category", value: "" },
    ...statecate.map((i) => ({
      name: i.category,
      value: i.category,
    })),
  ];

  const SubCatOption = [
    // { name: sub_cat, value: "" },
    { name: "Select SubCategory", value: "" },
    ...subCat.map((i) => ({
      name: i.sub_category,
      value: i.sub_category,
    })),
  ];
  const GetSubCat = async () => {
    if (subId === null) return;

    const res = await API.post("/daybook/get_subcategories/", {
      category_id: subId,
    });
  
    setSubCat(res.data.data);
  };

  const onSubmit = async () => {
    // console.log("my form", form);
    await Edit_DailyLog(form)
      .then((res) => {
        alert(res?.data?.message);
      })
      .catch((err) => alert(err));
  };

  const CatChange = (e) => {
    const selected = statecate.find((i) => i.category === e.target.value);

    setSelectedCat(selected);
    setSubId(selected?.id);
  };

  useEffect(() => {
    dispatch(getDailyLogCategory());
  }, [dispatch]);

  useEffect(() => {
    setForm({ ...form, category: selectedCat?.category });
  }, [selectedCat]);

  useEffect(() => {
    setForm({ ...form, sub_category: selectedSub?.sub_category });
  }, [selectedSub]);

  useEffect(() => {
    GetSubCat();
  }, [subId]);

  return (
    <div className="account-edit">
      <i
        onClick={() => setEdit(null)}
        style={{ margin: "auto", marginRight: "0px" }}
        class="fa-regular fa-circle-xmark"
      ></i>
      {<h2>Edit DailyLog</h2>}
      {/* <p>Customer : {customer}</p> */}
      <p> ID : {_id}</p> <br />
      {/* <select value={form.category}  name="" id="">
        <option value="">aa</option>
        <option value="">avva</option>
      </select> */}
      <div>
        <FormItems
          type="text"
          labelData={"category"}
          name="category"
          element="select"
          option={CatOption}
          onChange={CatChange}
          value={form.category}
        ></FormItems>
        <FormItems
          onChange={(e) =>
            setSelectedSub(subCat.find((i) => i.sub_category == e.target.value))
          }
          element="select"
          labelData={"sub_category"}
          option={SubCatOption}
          value={form?.sub_category}
          name={"sub_category"}
          required
        ></FormItems>
        <FormItems
          type="number"
          labelData={"receipts"}
          name="receipts"
          onChange={onChange}
          value={form.receipts}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"payments"}
          name="payments"
          onChange={onChange}
          value={form.payments}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
        ></FormItems>
        <FormItems
          type="number"
          labelData={"balance"}
          name="balance"
          onChange={onChange}
          value={form.balance}
          readOnly={IsSuper() === false}
          className={`${IsSuper() === false ? "normal-user" : ""}`}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"hotel"}
          name="hotel"
          element="select"
          onChange={(e) => setForm({ ...form, hotel: e.target.value })}
          option={["Select Hotel", ...Hotels()]}
          value={form.hotel}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"description"}
          name="description"
          onChange={onChange}
          value={form.description}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"bank"}
          name="bank"
          onChange={onChange}
          value={form.bank}
        ></FormItems>
        <Button onClick={onSubmit} child={"submit"}></Button>
      </div>
    </div>
  );
};

export default DailyLogEdit;
