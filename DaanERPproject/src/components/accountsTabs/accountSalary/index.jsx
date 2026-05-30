import React, { useState } from "react";
import AccountsVendorAdd from "../../accountAddComponents/vendor";
// import AccountsTable from "../../accoutsTable";
import AccountsVendor from "../../accoutsTable/vendor";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";
import AccountsSalary from "../../accoutsTable/salary";
import AddSalary from "../../accountAddComponents/salary";

const AccSalary = ({ yesterdate, trigger, prevMonth, hotels }) => {
  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState("Housekeeping");

  return (
    <div>
      <div className="flex-1">
        <FormItems
          element="select"
          onChange={(e) => setDepartment(e.target.value)}
          option={["select department", "Housekeeping"]}
        ></FormItems>{" "}
        <span style={{ margin: "auto", marginRight: "0px" }}>
          <Button
            onClick={() => setOpen(!open)}
            child={"New Salary +"}
            className={"add-salary"}
          ></Button>
        </span>
      </div>
      {open && <AddSalary></AddSalary>}
      <p>
        <br />
        <b>Date : </b> {yesterdate}
      </p>
      <br />
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
