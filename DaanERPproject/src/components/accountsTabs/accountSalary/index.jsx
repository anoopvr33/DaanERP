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
import DepartmentList from "../departmentList";
import { Export_Salary_Excel } from "../../../api/accountsServices";

const AccSalary = ({ yesterdate, trigger, prevMonth, hotels }) => {
  const [open, setOpen] = useState(null);
  const [department, setDepartment] = useState("Housekeeping");

  return (
    <div>
      <div className="flex-1">
        <Button
          onClick={() => setOpen(open == 3 ? null : 3)}
          child={"List Departments"}
          // className={"add-dailylog"}
        ></Button>
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
        <Button
          className={"add-dailylog"}
          onClick={() =>
            Export_Salary_Excel({
              from_date: prevMonth || "",
              to_date: yesterdate || "",
              hotel: hotels || [],
              department: department,
            })
          }
          child={"Export Excel"}
        ></Button>{" "}
        <span style={{ margin: "auto", marginRight: "0px" }}>
          <Button
            onClick={() => setOpen(open == 1 ? null : 1)}
            child={"New Salary +"}
            className={"add-dailylog"}
          ></Button>
        </span>
      </div>

      {open == 1 && <AddSalary setOpen={setOpen}></AddSalary>}
      {open == 3 && <DepartmentList setOpen={setOpen}></DepartmentList>}
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
            <FormItems placeholder={"Enter department"}></FormItems>
            <Button
              onClick={(e) => {
                e.preventDefault();
                alert("currently unavailable");
              }}
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
