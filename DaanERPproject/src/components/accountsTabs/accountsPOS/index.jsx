import "./style.css";
import "../style.css";
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
import {
  Export_Budget_Excel,
  Get_Budget_CatSub,
} from "../../../api/accountsServices";
import CustomParagraph from "../../Elements/customParagraph";
import { IsStaff, IsSuper } from "../../../utils";
import BudgetCategoryList from "../budgetCategory";
import ListBudgetCategory from "../listBudgetCategory";

const AccPOS = ({ dateset, trigger, hotels, prevMonth }) => {
  const [open, setOpen] = useState(null);
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

  const CatOption = [
    { name: "select category", value: "" },
    ...category.map((i) => ({ name: i.category, value: i.id })),
  ];

  useEffect(() => {
    Get_Budget_CatSub().then((res) => {
      if (res.data) setCatSub(res.data);
    });
  }, []);

  useEffect(() => {
    if (hotels?.length === 0) return;
    dispatch(
      getBudgetData({ from_date: prevMonth, to_date: dateset, hotel: hotels }),
    );
    dispatch(getBudgetCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, hotels, dispatch]);

  return (
    <div className="acc-pos">
      <div>
        <div className="flex-1">
          <Button
            className={open === 1 && "active-btn"}
            onClick={() => setOpen(open === 1 ? null : 1)}
            style={{
              display: `${IsSuper() === false || IsStaff() === true ? "none" : ""}`,
            }}
            child={"New Category +"}
          ></Button>
          <Button
            style={{
              display: `${IsSuper() === false || IsStaff() === true ? "none" : ""}`,
            }}
            className={open === 2 && "active-btn"}
            onClick={() => setOpen(open === 2 ? null : 2)}
            child={"New Subcategory +"}
          ></Button>
          <Button
            className={open === 5 && "active-btn"}
            onClick={() => setOpen(open === 5 ? null : 5)}
            child={
              <>
                List Categories
                <i class="fa fa-angle-down" aria-hidden="true"></i>{" "}
              </>
            }
          />
          <Button
            className={open === 3 && "active-btn"}
            onClick={() => setOpen(open === 3 ? null : 3)}
            child={
              <>
                List Sub_categories
                <i class="fa fa-angle-down" aria-hidden="true"></i>{" "}
              </>
            }
          />
          <Button
            className={"add-dailylog"}
            onClick={() =>
              Export_Budget_Excel({
                from_date: prevMonth || "",
                to_date: dateset || "",
                hotel: hotels || [],
              })
            }
            child={"Export Excel"}
          ></Button>{" "}
          <Button
            onClick={() => setOpen(open === 4 ? null : 4)}
            className={"add-budget"}
            child={"New Budget +"}
          />
        </div>
        {open === 4 && <AccountsPosAdd setOpen={setOpen} formdate={dateset} />}
        {open === 1 && (
          <div style={{ width: "fit-content" }} className="add-account-main">
            <h4>
              Add new category
              <i
                onClick={() => setOpen(null)}
                class="fa-regular fa-circle-xmark"
              ></i>
            </h4>
            <form action="">
              <FormItems
                onChange={(e) => setNewCat(e.target.value)}
                placeholder={"Enter Category"}
              ></FormItems>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addBudgetCategoryThunk({ budget_category: newCat }));
                }}
                child={"Add"}
              ></Button>
            </form>
          </div>
        )}
        {open === 2 && (
          <div style={{ width: "fit-content" }} className="add-account-main">
            <h4>
              Add new subcategory
              <i
                onClick={() => setOpen(null)}
                class="fa-regular fa-circle-xmark"
              ></i>
            </h4>
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
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addBudgetSub_CategoryThunk(newSub));
                }}
                child={"Add"}
              ></Button>
            </form>
          </div>
        )}

        {open === 5 && (
          <ListBudgetCategory categories={CatOption}></ListBudgetCategory>
        )}
        {open === 3 && (
          <BudgetCategoryList catsub={catSub}></BudgetCategoryList>
        )}

        <br />
        <CustomParagraph
          child={
            <>
              <b>Date</b>: {dateset}
            </>
          }
        ></CustomParagraph>
        {/* <span style={{height:"2px"}}>_</span> */}
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
