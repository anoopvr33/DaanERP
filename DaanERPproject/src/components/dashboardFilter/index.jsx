import React, { useState } from "react";
import Button from "../Elements/button";
import FormItems from "../Elements/formItems";
import "./style.css";

const DashboardFilter = ({
  yesterday,
  lastmonth,
  setYesterdayDate,
  setPrevMonthDate,
}) => {
  return (
    <div className="dashboard-filter">
      <div className="sub-1">
        <label htmlFor="">From</label>
        <FormItems
          value={lastmonth}
          onChange={(e) => setPrevMonthDate(e.target.value)}
          type="date"
        />
        <span> </span>
        <label htmlFor="">to</label>
        <FormItems
          value={yesterday}
          onChange={(e) => setYesterdayDate(e.target.value)}
          type="date"
        />
        {/* <FormItems type="date"></FormItems> */}

        <Button child={"FIlter"}></Button>
      </div>
    </div>
  );
};

export default DashboardFilter;
