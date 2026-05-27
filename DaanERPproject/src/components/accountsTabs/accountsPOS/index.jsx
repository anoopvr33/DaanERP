import "./style.css";
import { useEffect, useState } from "react";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";
import AccountsPos from "../../accoutsTable/pos";
import AccountsPosAdd from "../../accountAddComponents/pos";
import LoadingItem from "../../Elements/Loading";
import ErrorPage from "../../Elements/Error";
import {
  addBudgetCategoryThunk,
  addBudgetSub_CategoryThunk,
  getBudgetCategory,
  getBudgetData,
} from "../../../redux/budgetActualSlice";
import { useDispatch, useSelector } from "react-redux";
import { Get_Budget_CatSub } from "../../../api/accountsServices";

const AccPOS = ({ dateset, trigger, hotels, prevMonth }) => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [openCatSub, setOpenCatSub] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [catSub, setCatSub] = useState({});
  const [newSub, setNewSub] = useState({
    budget_category: null,
    budget_sub_category: "",
  });
  const dispatch = useDispatch();

  const { items, geterror, loading, category } = useSelector(
    (state) => state.budget,
  );

  const AddCategory = async (e) => {
    e.preventDefault();
    dispatch(addBudgetCategoryThunk({ budget_category: newCat }));
  };

  const AddSubCat = async (e) => {
    e.preventDefault();
    dispatch(addBudgetSub_CategoryThunk(newSub));
  };

  const CatOption = [
    // { name: categoryLoading ? "loading" : "", value: "" },
    { name: "select category", value: "" },
    ...category.map((i) => ({ name: i.category, value: i.id })),
  ];

  useEffect(() => {
    dispatch(getBudgetCategory());
  }, [dispatch]);

  useEffect(() => {
    Get_Budget_CatSub().then((res) => {
      console.log("bud cat sub", res);
      if (res.data) setCatSub(res.data);
    });
  }, []);

  useEffect(() => {
    const data = { from_date: prevMonth, to_date: dateset, hotel: hotels };
    if (hotels?.length === 0) return;
    dispatch(getBudgetData(data));
  }, [trigger, hotels, dispatch]);

  return (
    <div className="acc-pos">
      <div>
        {/* <h3>Budget</h3> <br /> */}
        <div className="flex-1">
          <Button
            onClick={() => (
              setOpenCatSub(false),
              setOpen(false),
              setOpenCat(!openCat),
              setList(false)
            )}
            child={"New Category +"}
          ></Button>
          <Button
            onClick={() => (
              setOpen(false),
              setOpenCat(false),
              setOpenCatSub(!openCatSub),
              setList(false)
            )}
            child={"New Subcategory +"}
          ></Button>

          <Button
            onClick={() => (
              setOpenCat(false),
              setOpenCatSub(false),
              setOpen(false),
              setList(!list)
            )}
            child={
              <>
                List Categories
                <i class="fa fa-angle-down" aria-hidden="true"></i>{" "}
              </>
            }
          />

          <Button
            onClick={() => (
              setOpenCat(false),
              setOpenCatSub(false),
              setOpen(!open),
              setList(false)
            )}
            className={"add-budget"}
            child={"New Budget +"}
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

        {list && (
          <div
            style={{
              width: "500px",
              height: "fit-content",
              maxHeight: "300px",
              overflowY: "scroll",
              border: "1px solid #d9d9d9",
              borderRadius: "20px",
              padding: "15px",
            }}
            className="add-account-main"
          >
            <h2>Category and Subcategory</h2> <br />
            {Object.entries(catSub).map(([key, values]) => (
              <div key={key}>
                <h4 style={{ textDecoration: "underline" }}>{key}</h4>
                <ul style={{ padding: "10px 20px" }}>
                  {values.length === 0
                    ? "no data"
                    : values?.map((sub) => (
                        <li style={{ fontSize: "13px" }} key={sub.id}>
                          {sub.sub}
                        </li>
                      ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <br />
        <p>
          <b>Date</b>: {dateset}
        </p>
        {loading ? (
          <LoadingItem></LoadingItem>
        ) : geterror ? (
          <ErrorPage></ErrorPage>
        ) : items?.length > 0 ? (
          items?.map((i) => <AccountsPos data={i} />)
        ) : (
          <p style={{ textAlign: "center", margin: "10px 10px" }}>Empty Data</p>
        )}
      </div>
    </div>
  );
};

export default AccPOS;
