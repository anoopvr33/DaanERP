import React, { useEffect, useState } from "react";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";
// import AccountsAdd
import AccountsTable from "../../accoutsTable";
import AccountsHotel from "../../accoutsTable/hotel";
import AccountsHotelAdd from "../../accountAddComponents/hotel";
import { API } from "../../../utils/axios";

const AccHotelExpense = ({ dateset, trigger }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [form, setForm] = useState({
    date: dateset,
    category: "",
    sub_category: "",
  });
  const [subcat, setSubCat] = useState([]);
  const [data1, setData1] = useState([]);

  const GetHotel = async () => {
    console.log("ops form", form);
    const response = await API.post("/daybook/get_hotelexpense/", form);
    console.log("hotel res", response);
    setData1(response.data);
  };

  const GetCategory = async () => {
    const res = await API.get("/daybook/get_categories/");
    console.log("my hotelsops", res.data.data);
    setCategory(res?.data?.data);
  };

  const GetSubCat = async (id) => {
    if (!id) return;
    console.log("my id", id);
    const res = await API.post("/daybook/get_subcategories/", {
      category_id: id,
    });
    setSubCat(res.data.data);
    console.log("sub arr", res);
  };

  useEffect(() => {
    GetHotel();
    console.log("my date", dateset);
    // eslint(react-hooks/set-state-in-effect)
  }, [trigger]);

  useEffect(() => {
    GetCategory();
    GetSubCat();
  }, []);

  // useEffect(() => {}, [subcat]);

  return (
    <div>
      <div className="flex-1">
        {/* <FormItems option={Count} element="select"></FormItems>{" "} */}
        {/* <Button onClick={() => setOpen(!open)} child={"create +"}></Button> */}
      </div>
      {open && <AccountsHotelAdd formdate={dateset}></AccountsHotelAdd>}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <FormItems
          option={[
            { value: "", name: "select category" },
            ...category.map((i) => ({
              value: i.id,
              name: i.category,
            })),
          ]}
          onChange={(e) => {
            const selected = category.find(
              (i) => i.id === Number(e.target.value),
            );
            (setForm({ ...form, category: selected?.category }),
              GetSubCat(e.target.value));
          }}
          element="select"
        ></FormItems>
        <FormItems
          option={[
            { value: "", name: "select sub-category" },
            ...subcat.map((i) => ({ value: i.id, name: i.sub_category })),
          ]}
          onChange={(e) => {
            const selected = subcat.find(
              (i) => i.id === Number(e.target.value),
            );

            setForm({
              ...form,
              sub_category: selected?.sub_category, // 👈 name
              sub_category_id: selected?.id, // optional
            });
          }}
          element="select"
        ></FormItems>
        <Button onClick={GetHotel} child={"Filter"}></Button>
      </div>

      <AccountsHotel data={data1} />
    </div>
  );
};

export default AccHotelExpense;
