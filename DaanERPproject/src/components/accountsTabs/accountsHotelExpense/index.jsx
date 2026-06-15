import { useEffect, useState } from "react";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";
import AccountsHotel from "../../accoutsTable/hotel";
import { useDispatch, useSelector } from "react-redux";
import {
  gethotelOpsCategory,
  gethotelOpsData,
  gethotelOpsSub_Category,
} from "../../../redux/hotelOpsExpenseSlice";
import LoadingItem from "../../Elements/Loading";
import ErrorPage from "../../Elements/Error";

const AccHotelExpense = ({ dateset, trigger, prevMonth }) => {
  const [form, setForm] = useState({
    from_date: prevMonth,
    to_date: dateset,
    category: "",
    sub_category: "",
  });

  const dispatch = useDispatch();

  const { items, loading, error, category, sub_category } = useSelector(
    (state) => state.hotelOps,
  );

  const onCategoryChange = (e) => {
    const selected = category.find((i) => i.id === Number(e.target.value));
    setForm({ ...form, category: selected?.category });
    dispatch(gethotelOpsSub_Category(e.target.value));
  };

  const onSubCategoryChange = (e) => {
    const selected = sub_category.find((i) => i.id === Number(e.target.value));
    setForm({
      ...form,
      sub_category: selected?.sub_category,
    });
  };

  const categoryOptions = [
    { value: "", name: "select category" },
    ...category.map((i) => ({
      value: i.id,
      name: i.category,
    })),
  ];

  const subCategoryOptions = [
    { value: "", name: "select sub-category" },
    ...sub_category.map((i) => ({ value: i.id, name: i.sub_category })),
  ];

  useEffect(() => {
    dispatch(gethotelOpsData(form));
    dispatch(gethotelOpsCategory());
  }, [form, trigger, dispatch]);

  if (loading) {
    return <LoadingItem></LoadingItem>;
  }

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <FormItems
          option={categoryOptions}
          onChange={onCategoryChange}
          element="select"
        ></FormItems>
        <FormItems
          option={subCategoryOptions}
          onChange={onSubCategoryChange}
          element="select"
        ></FormItems>
        <Button
          onClick={() => dispatch(gethotelOpsData(form))}
          child={"Filter"}
        ></Button>
      </div>
      <br />
      <AccountsHotel data={items} />
    </div>
  );
};

export default AccHotelExpense;
