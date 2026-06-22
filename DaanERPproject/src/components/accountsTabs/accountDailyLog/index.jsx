import { useEffect, useState } from "react";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";
import AccountsTable from "../../accoutsTable";
import AccountsDailyAdd from "../../accountAddComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  addDailyLog_CategoryThunk,
  addDailySub_CategoryThunk,
  getDailyLogCate_Sub,
  getDailyLogCategory,
  getDailyLogData,
} from "../../../redux/dailyLogSlice";
import CustomParagraph from "../../Elements/customParagraph";
import { IsStaff, IsSuper } from "../../../utils";

const AccDailyLog = ({ dateset, trigger, hotels, prevMonth }) => {
  const [open, setOpen] = useState(null);
  const [newcat, setNewcat] = useState("");
  const [subcat, setSubcat] = useState({ category: null, sub_category: "" });

  const dispatch = useDispatch();

  const { items, category, catsub } = useSelector((state) => state.dailylog);

  const categoryOption = [
    { name: "select category", value: "" },
    ...category.map((i) => ({
      name: i.category,
      value: i.id,
    })),
  ];

  useEffect(() => {
    if (hotels.length === 0) return;
    dispatch(
      getDailyLogData({
        from_date: prevMonth,
        to_date: dateset,
        hotel: hotels,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, trigger]);

  return (
    <div>
      <div className="flex-1">
        <Button
          style={{
            display: `${IsSuper() === false || IsStaff() === true ? "none" : ""}`,
          }}
          className={open === 1 && "active-btn"}
          onClick={() => setOpen(open === 1 ? null : 1)}
          child={"New Category +"}
        ></Button>
        <Button
          className={open === 2 && "active-btn"}
          style={{
            display: `${IsSuper() === false || IsStaff() === true ? "none" : ""}`,
          }}
          onClick={() => {
            setOpen(open === 2 ? null : 2);
            dispatch(getDailyLogCategory());
          }}
          child={"New Subcategory +"}
        ></Button>

        <Button
          className={open === 3 && "active-btn"}
          onClick={() => {
            setOpen(open === 3 ? null : 3);
            dispatch(getDailyLogCate_Sub());
          }}
          child={
            <>
              List Categories
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </>
          }
        />
        <Button
          onClick={() => setOpen(open === 4 ? null : 4)}
          child={"New Daily Log +"}
          className={"add-dailylog"}
        />
      </div>
      {open === 4 && (
        <AccountsDailyAdd
          setOpen={setOpen}
          formdate={dateset}
        ></AccountsDailyAdd>
      )}
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
              onChange={(e) => setNewcat(e.target.value)}
              placeholder={"Enter Category"}
            ></FormItems>

            <Button
              child={"Add"}
              onClick={() => dispatch(addDailyLog_CategoryThunk(newcat))}
            >
              Add
            </Button>
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
              element="select"
              option={categoryOption}
              onChange={(e) =>
                setSubcat({ ...subcat, category: Number(e.target.value) })
              }
            ></FormItems>

            <FormItems
              placeholder={"Enter SubCategory"}
              onChange={(e) =>
                setSubcat({ ...subcat, sub_category: e.target.value })
              }
            ></FormItems>

            <Button
              child={"Add"}
              onClick={() => dispatch(addDailySub_CategoryThunk(subcat))}
            ></Button>
          </form>
        </div>
      )}

      {open === 3 && (
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
          <h3>Category & Subcategory</h3>
          <br />
          <div>
            {Object.entries(catsub).map(([key, values]) => (
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
        </div>
      )}
      <br />
      <CustomParagraph
        child={
          <>
            <b>Date: </b> {dateset}
          </>
        }
      ></CustomParagraph>

      <AccountsTable data={items}></AccountsTable>
    </div>
  );
};

export default AccDailyLog;
