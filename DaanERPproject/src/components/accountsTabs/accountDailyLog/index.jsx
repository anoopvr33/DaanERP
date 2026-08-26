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
import "../style.css";
import CategoryList from "../category";
import ListDailyCategory from "../listDailyCategory";
import { Export_Daily_Excel } from "../../../api/accountsServices";

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
          className={open === 5 && "active-btn"}
          onClick={() => {
            setOpen(open === 5 ? null : 5);
            dispatch(getDailyLogCategory());
          }}
          child={
            <>
              List Categories
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </>
          }
        />
        <Button
          className={open === 3 && "active-btn"}
          onClick={() => {
            setOpen(open === 3 ? null : 3);
            dispatch(getDailyLogCate_Sub());
          }}
          child={
            <>
              List Sub_categories
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </>
          }
        />
        <Button
          className={"add-dailylog"}
          onClick={() =>
            Export_Daily_Excel({
              from_date: prevMonth || "",
              to_date: dateset || "",
              hotel: hotels || [],
            })
          }
          child={"Export Excel"}
        ></Button>{" "}
        <Button
          onClick={() => setOpen(open === 4 ? null : 4)}
          child={"New Daily Log +"}
          className={"add-dailylog"}
        />
      </div>
      {open === 5 && (
        <ListDailyCategory
          categories={categoryOption}
          // setOpen={setOpen}
          // formdate={dateset}
        ></ListDailyCategory>
      )}

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
              onClick={(e) => {
                e.preventDefault();
                dispatch(addDailyLog_CategoryThunk(newcat));
              }}
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
              onClick={(e) => {
                e.preventDefault();
                dispatch(addDailySub_CategoryThunk(subcat));
              }}
            ></Button>
          </form>
        </div>
      )}

      {open === 3 && (
        // <div className="category-manager">
        //   <div className="category-manager-header">
        //     <div>
        //       <h3>Category & Subcategory</h3>
        //       <p>Manage your categories and subcategories</p>
        //     </div>

        //     {/* <button className="add-category-btn" onClick={"handleAddCategory"}>
        //       + Category
        //     </button> */}
        //   </div>

        //   <div className="category-list">
        //     {Object.entries(catsub).length === 0 ? (
        //       <div className="empty-category">No categories available</div>
        //     ) : (
        //       Object.entries(catsub).map(([key, values]) => (
        //         <div className="category-card" key={key}>
        //           {/* Category Header */}
        //           <div className="category-header">
        //             <div className="category-info">
        //               <div className="category-icon">
        //                 {key.charAt(0).toUpperCase()}
        //               </div>

        //               <div>
        //                 <h4>{key}</h4>
        //                 <span>
        //                   {values.length}{" "}
        //                   {values.length === 1
        //                     ? "subcategory"
        //                     : "subcategories"}
        //                 </span>
        //               </div>
        //             </div>

        //             <div className="category-actions">
        //               <i
        //                 // onClick={() => setEdit(index)}
        //                 style={{
        //                   display: `${IsStaff() === true ? "none" : ""}`,
        //                 }}
        //                 class="fa fa-edit"
        //                 aria-hidden="true"
        //               ></i>{" "}
        //               <br />
        //               <i
        //                 // onClick={() =>
        //                 //   deleteAccount("/daybook/delete_daybook_log/", item.id)
        //                 // }
        //                 style={{
        //                   display: `${IsSuper() === false || IsStaff() === true ? "none" : ""}`,
        //                 }}
        //                 class="fa fa-trash"
        //                 aria-hidden="true"
        //               ></i>
        //             </div>
        //           </div>

        //           {/* Subcategories */}
        //           <div className="subcategory-container">
        //             {values.length === 0 ? (
        //               <div className="no-subcategory">No subcategories</div>
        //             ) : (
        //               values.map((sub) => (
        //                 <div className="subcategory-item" key={sub.id}>
        //                   <div className="subcategory-name">
        //                     <span className="subcategory-dot"></span>

        //                     <span>{sub.sub}</span>
        //                   </div>

        //                   <div className="subcategory-actions">
        //                     <i
        //                       // onClick={() => setEdit(index)}
        //                       style={{
        //                         display: `${IsStaff() === true ? "none" : ""}`,
        //                       }}
        //                       class="fa fa-edit"
        //                       aria-hidden="true"
        //                     ></i>{" "}
        //                     <br />
        //                     <i
        //                       // onClick={() =>
        //                       //   deleteAccount(
        //                       //     "/daybook/delete_daybook_log/",
        //                       //     item.id,
        //                       //   )
        //                       // }
        //                       style={{
        //                         display: `${IsSuper() === false || IsStaff() === true ? "none" : ""}`,
        //                       }}
        //                       class="fa fa-trash"
        //                       aria-hidden="true"
        //                     ></i>
        //                   </div>
        //                 </div>
        //               ))
        //             )}

        //             {/* Add Subcategory */}
        //           </div>
        //         </div>
        //       ))
        //     )}
        //   </div>
        // </div>
        <CategoryList catsub={catsub}></CategoryList>
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
