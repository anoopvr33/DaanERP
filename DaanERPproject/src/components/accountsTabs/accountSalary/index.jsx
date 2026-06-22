import React, { useState } from "react";
import AccountsVendorAdd from "../../accountAddComponents/vendor";
// import AccountsTable from "../../accoutsTable";
import AccountsVendor from "../../accoutsTable/vendor";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";
import AccountsSalary from "../../accoutsTable/salary";
import AddSalary from "../../accountAddComponents/salary";
import CustomParagraph from "../../Elements/customParagraph";
import { IsStaff, IsSuper } from "../../../utils";

const AccSalary = ({ yesterdate, trigger, prevMonth, hotels }) => {
  const [open, setOpen] = useState(null);
  const [department, setDepartment] = useState("Housekeeping");

  return (
    <div>
      <div className="flex-1">
        <FormItems
          element="select"
          onChange={(e) => setDepartment(e.target.value)}
          option={["select department", "Housekeeping"]}
        ></FormItems>

        <i
         style={{
                              display: `${IsSuper() === false || IsStaff() === true ? "none" : ""}`,
                            }}
          onClick={() => setOpen(open == 2 ? null : 2)}
          class="fa fa-plus"
          aria-hidden="true"
        ></i>
        <span style={{ margin: "auto", marginRight: "0px" }}>
          <Button
            onClick={() => setOpen(open == 1 ? null : 1)}
            child={"New Salary +"}
            className={"add-dailylog"}
          ></Button>
        </span>
      </div>

      {open == 1 && <AddSalary setOpen={setOpen}></AddSalary>}

      {open === 2 && (
        <div style={{ width: "fit-content" }} className="add-account-main">
          <h4>
            Add new Department
            <i
              onClick={() => setOpen(null)}
              class="fa-regular fa-circle-xmark"
            ></i>
          </h4>
          <form action="">
            <FormItems
              // onChange={(e) => setNewCat(e.target.value)}
              placeholder={"Enter department"}
            ></FormItems>
            <Button
              onClick={
                () => ""
                // dispatch(addBudgetCategoryThunk({ budget_category: newCat }))
              }
              child={"Add"}
            ></Button>
          </form>
        </div>
      )}
      <br />
      <CustomParagraph
        child={
          <>
            <b>Date : </b> {yesterdate}
          </>
        }
      ></CustomParagraph>

      <AccountsSalary
        yesterdate={yesterdate}
        trigger={trigger}
        prevMonth={prevMonth}
        hotels={hotels}
        department={department}
      ></AccountsSalary>
    </div>
  );
};

export default AccSalary;
