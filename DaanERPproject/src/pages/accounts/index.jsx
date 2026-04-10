import { useState } from "react";
import Navbar from "../../components/Elements/navbar";
import "./style.css";
import SidebarTwo from "../../components/Elements/sidebartwo";
import AccountsTabs from "../../components/accountsTabs";
import FormItems from "../../components/Elements/formItems";
import Button from "../../components/Elements/button";
import { Hotels } from "../../utils";
import Filter from "../../components/Elements/Filter";

const option2 = Hotels()? Hotels().map((i) => ({
  value: i,
  label: i.charAt(0).toUpperCase() + i.slice(1),
})):[];

const Accounts = () => {
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState(false);
  const [hotelData, setHotelData] = useState();

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
          <div className="h2-sub">
            <h2
              style={{
                margin: 0,
                marginTop: 0,
                padding: 0,
                paddingBottom: "0px",
              }}
            >
              Accounts Management
            </h2>
            <div className="flex-1">
              <Filter
                onChange={(selected) => {
                  if (!selected) return setHotelData([]);
                  if (!selected || selected.length === 0) {
                    setHotelData(option2);
                    return;
                  }
                  setHotelData(selected);
                }}
                isMulti
                options={option2}
                prevMonthDate={prevMonthDate}
                prevOnchange={(e) => setPrevMonthDate(e.target.value)}
                yesterday={yesterdayDate}
                yesOnchange={(e) => setYesterdayDate(e.target.value)}
                child={"Filter"}
              />
            </div>
          </div>
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
