import "./style.css";
import { useEffect, useState } from "react";
// import AccountsAdd from "../accountsAdd";
// import AccountsTable from "../../accoutsTable";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";
import axios from "axios";
import AccountsPos from "../../accoutsTable/pos";
import AccountsPosAdd from "../../accountAddComponents/pos";
import { API, getCookie } from "../../../utils/axios";
import LoadingItem from "../../Elements/Loading";
import ErrorPage from "../../Elements/Error";
import { Hotels } from "../../../utils";
import {
  addBudgetCategoryThunk,
  addBudgetSub_CategoryThunk,
  getBudgetData,
} from "../../../redux/budgetActualSlice";
import { useDispatch, useSelector } from "react-redux";

const AccPOS = ({ dateset, trigger, hotels, prevMonth }) => {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [openCatSub, setOpenCatSub] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [newSub, setNewSub] = useState({
    budget_category: null,
    budget_sub_category: "",
  });
  const [category, setCategory] = useState([]);
  const [data1, setData1] = useState([]);
  const dispatch = useDispatch();

  const { items, geterror, loading } = useSelector((state) => state.budget);

  const GetCategory = async () => {
    const res = await API.get("/daybook/get_budget_categories/");

    console.log("my category", res.data.data);
    if (res.data.data) {
      setCategory(res?.data?.data);
    } else alert("something wrong getting budget category");
  };

  const AddCategory = async (e) => {
    e.preventDefault();
    dispatch(addBudgetCategoryThunk({ budget_category: newCat }));
  };

  const AddSubCat = async (e) => {
    e.preventDefault();
    dispatch(addBudgetSub_CategoryThunk(newSub));
  };

  const CatOption = [
    { name: "select category", value: "" },
    ...category.map((i) => ({ name: i.category, value: i.id })),
  ];

  useEffect(() => {
    GetCategory();
  }, []);

  useEffect(() => {
    if (hotels.length === 0) return alert("Hotel is required");

    dispatch(
      getBudgetData({
        from_date: prevMonth,
        to_date: dateset,
        hotel: hotels,
      }),
    );
    // eslint(react-hooks/set-state-in-effect)
  }, [trigger, hotels]);

  return (
    <div className="acc-pos">
      <div>
        {/* <h3>Budget</h3> <br /> */}
        <div className="flex-1">
          <Button
            onClick={() => (
              setOpenCatSub(false),
              setOpen(false),
              setOpenCat(!openCat)
            )}
            child={"Add Category +"}
          ></Button>
          <Button
            onClick={() => (
              setOpen(false),
              setOpenCat(false),
              setOpenCatSub(!openCatSub)
            )}
            child={"Add Subcategory +"}
          ></Button>
          <Button
            onClick={() => (
              setOpenCat(false),
              setOpenCatSub(false),
              setOpen(!open)
            )}
            child={"Create +"}
          />
        </div>
        {open && <AccountsPosAdd type={"IN"} formdate={dateset} />}
        {openCat && (
          <div style={{ width: "fit-content" }} className="add-account-main">
            <form action="">
              <FormItems
                onChange={(e) => setNewCat(e.target.value)}
                placeholder={"Enter Category"}
              ></FormItems>
              <Button onClick={AddCategory} child={"Add"}></Button>
            </form>
          </div>
        )}
        {openCatSub && (
          <div style={{ width: "fit-content" }} className="add-account-main">
            <form action="">
              <FormItems
                onChange={(e) =>
                  setNewSub({
                    ...newSub,
                    budget_category: Number(e.target.value),
                  })
                }
                element="select"
                option={CatOption}
              ></FormItems>
              <FormItems
                onChange={(e) =>
                  setNewSub({ ...newSub, budget_sub_category: e.target.value })
                }
                placeholder={"Enter Subcategory"}
              ></FormItems>
              <Button onClick={AddSubCat} child={"Add"}></Button>
            </form>
          </div>
        )}
        <br />
        <p>
          <b>Date</b>: {dateset}
        </p>
        {items?.data?.length > 0 ? (
          items?.data?.map((i) => <AccountsPos data={i} />)
        ) : (
          <p style={{ textAlign: "center", margin: "10px 10px" }}>Empty Data</p>
        )}
      </div>
    </div>
  );
};

export default AccPOS;
