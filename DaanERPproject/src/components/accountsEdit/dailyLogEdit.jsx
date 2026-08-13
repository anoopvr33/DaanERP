import React, { useEffect, useMemo, useState } from "react";
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
  category,
  sub_category: sub_cat,
  receipts: receipt,
  payments: payment,
  balance,
  hotel,
  description: desc,
  bank,
});
  const dispatch = useDispatch();

  const [subCat, setSubCat] = useState([{ sub_category: sub_cat }]);
  const { category: statecate } = useSelector((state) => state.dailylog);

  // input value
  const onChange = (e) => {
    if (!e) return;

    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // submit edited values
  const onSubmit = async () => {
    await Edit_DailyLog(form)
      .then((res) => {
        alert(res?.data?.message);
      })
      .catch((err) => alert(err));
  };

  // category input value
  const CatChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      category: value,
      sub_category: "", // reset only when category changes
    }));
  };

  // category & sub_category select options
  const CatOption = [
    { name: "Select Category", value: "" },
    ...statecate.map((i) => ({
      name: i.category,
      value: i.category,
    })),
  ];

  const SubCatOption = [
    { name: "Select SubCategory", value: "" },
    ...subCat.map((i) => ({
      name: i.sub_category,
      value: i.sub_category,
    })),
  ];

  const subId = useMemo(() => {
    if (!statecate) return;
    return statecate.find((i) => i.category === form.category)?.id;
  }, [form.category, statecate]);

  useEffect(() => {
    if (!subId) return;

    const load = async () => {
      const res = await API.post("/daybook/get_subcategories/", {
        category_id: subId,
      });

      setSubCat(res.data.data);

      // Keep current subcategory if it exists
      if (!res.data.data.some((i) => i.sub_category === form.sub_category)) {
        setForm((prev) => ({
          ...prev,
          sub_category: "",
        }));
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subId]);

  useEffect(() => {
    dispatch(getDailyLogCategory());
  }, [dispatch]);

  return (
    <div className="account-edit">
      <i
        onClick={() => setEdit(null)}
        style={{ margin: "auto", marginRight: "0px" }}
        class="fa-regular fa-circle-xmark"
      ></i>
      {<h2>Edit DailyLog</h2>}
      <p> ID : {_id}</p> <br />
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
            setForm((prev) => ({
              ...prev,
              sub_category: e.target.value,
            }))
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
