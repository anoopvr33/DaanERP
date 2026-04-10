import { useState } from "react";
import Button from "../../components/Elements/button";
import FormItems from "../../components/Elements/formItems";
import Navbar from "../../components/Elements/navbar";
import "./style.css";
import SidebarTwo from "../../components/Elements/sidebartwo";
import ReportTabs from "../../components/reportTabs";
import { Hotels } from "../../utils";

const Accounts = () => {
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState(Hotels());

  const today = new Date();

  // Yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Same date previous month
  const prevMonth = new Date(today);
  prevMonth.setMonth(today.getMonth() - 1);

  // Format function
  const formatDate = (d) => d.toISOString().split("T")[0];

  const formattedYesterday = formatDate(yesterday);
  const formattedPrevMonth = formatDate(prevMonth);

  // React state example
  const [yesterdayDate, setYesterdayDate] = useState(formattedYesterday);
  const [prevMonthDate, setPrevMonthDate] = useState(formattedPrevMonth);
  const Select = ["Hotel", "Daan Lux", "Daan Ambalath", "Regency"];
  const Count = ["Sort", "By Date", "More Count", "Less Count", ""];

  return (
    <div className="accounts">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>
          <div className="h2-sub">
            <h2>Reports</h2>
            <div className="element-sub">
              {/* <Filter /> */}
              <FormItems
                element={"select"}
                option={["All Hotels", ...(Hotels() ? Hotels() : "")]}
                onChange={(e) =>
                  setHotel(
                    e.target.value === "All Hotels"
                      ? Hotels()
                      : [e.target.value],
                  )
                }
                type="date"
              />
              <span> </span>
              <p>From</p>
              <FormItems
                value={prevMonthDate}
                onChange={(e) => setPrevMonthDate(e.target.value)}
                type="date"
              />
              <span> </span>
              <p>to</p>
              <FormItems
                value={yesterdayDate}
                onChange={(e) => setYesterdayDate(e.target.value)}
                type="date"
              />
              <Button onClick={() => setOpen(!open)} child={"Submit"}></Button>
            </div>
          </div>

          <ReportTabs
            hotel={hotel}
            yesterday={yesterdayDate}
            prevmonth={prevMonthDate}
          ></ReportTabs>
          {/* <AccountsTabs></AccountsTabs> */}
          {/* <CustomerTable></CustomerTable> */}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
