import { useState } from "react";
import Navbar from "../../components/Elements/navbar";
import "./style.css";
import SidebarTwo from "../../components/Elements/sidebartwo";
import AccountsTabs from "../../components/accountsTabs";
import FormItems from "../../components/Elements/formItems";
import Button from "../../components/Elements/button";
import { Hotels } from "../../utils";

const Accounts = () => {
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState(false);

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
  // const [formattedDate2, setDate2] = useState(date.toISOString().split("T")[0]);
  const Select = ["Hotel", "Daan Lux", "Daan Ambalath", "Regency"];
  const Count = ["Sort", "By Date", "More Count", "Less Count", ""];

  return (
    <div className="accounts">
      <div className="flex common-flex">
        <SidebarTwo></SidebarTwo>
        <div className="elements common-element">
          <Navbar></Navbar>
          <h2>
            Accounts Management
            <div className="flex-1">
              <FormItems
                element={"select"}
                option={["All Hotels", ...(Hotels() ? Hotels() : "")]}
                onChange={(e) => setHotel(e.target.value)}
                type="date"
              />
              <span> </span>
              <p htmlFor="">from</p>
              <FormItems
                value={prevMonthDate}
                onChange={(e) => setPrevMonthDate(e.target.value)}
                type="date"
              />
              <span> </span>
              <p htmlFor="">to </p>
              <FormItems
                value={yesterdayDate}
                onChange={(e) => setYesterdayDate(e.target.value)}
                type="date"
              />
              <Button child={"Submit"}></Button>
            </div>
          </h2>
          <AccountsTabs
            prevMonth={prevMonthDate}
            dateset={yesterdayDate}
          ></AccountsTabs>

          {/* <CustomerTable></CustomerTable> */}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
