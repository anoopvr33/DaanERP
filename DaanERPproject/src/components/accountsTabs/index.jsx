import "./style.css";
import { useState } from "react";
import AccPOS from "./accountsPOS";
import AccDailyLog from "./accountDailyLog";
import AccHotelExpense from "./accountsHotelExpense";
import AccVendor from "./accountsVendor";
import AccSalary from "./accountSalary";
import { IsStaff } from "../../utils";
import { useLocation } from "react-router-dom";

const AccountsTabs = ({ dateset, trigger, hotels, prevMonth }) => {
  const { hash } = useLocation();
  // const hash = location.hash ? location.hash.slice(1) : null;
  const loc = hash ? Number(hash.replace("#tab", "")) : 0;

  const Daily = {
    borderRadius: "20px 20px 0px 0px",
    background: (loc == 0 || !loc) && "    hsl(0, 0%, 100%)",
    color: (loc == 0 || !loc) && "#004e5d",
    borderBottomRightRadius: loc - 1 == 0 && "20px",
    borderBottomLeftRadius: loc + 1 == 0 && "20px",
  };

  const POS = {
    borderRadius: "20px 20px 0px 0px",

    background: loc == 1 && "    hsl(0, 0%, 100%)",
    color: loc == 1 && "#004e5d",
    borderBottomLeftRadius: loc + 1 == 1 && "20px",
    borderBottomRightRadius: loc - 1 == 1 && "20px",
  };

  const Hotel = {
    borderRadius: "20px 20px 0px 0px",
    background: loc == 2 && "   hsl(0, 0%, 100%)",
    color: loc == 2 && "#004e5d",
    borderBottomLeftRadius: loc + 1 == 2 && "20px",
    borderBottomRightRadius: loc - 1 == 2 && "20px",
  };

  const Vendor = {
    borderRadius: "20px 20px 0px 0px",
    background: loc == 3 && "  hsl(0, 0%, 100%)",
    color: loc == 3 && "#004e5d",
    borderBottomLeftRadius: loc + 1 == 3 && "20px",
    borderBottomRightRadius: loc - 1 == 3 && "20px",
  };

  const Salary = {
    borderRadius: "20px 20px 0px 0px",
    background: loc == 4 && "  hsl(0, 0%, 100%)",
    color: loc == 4 && "#004e5d",
    borderBottomLeftRadius: loc + 1 == 4 && "20px",
    borderBottomRightRadius: loc - 1 == 4 && "20px",
  };

  const None = {
    borderRadius: "20px 20px 0px 0px",
    background: "transparent",
    borderBottomLeftRadius: loc + 1 == 5 && "20px",
    borderBottomRightRadius: loc - 1 == 5 && "20px",
  };

  const TabArray = [
    {
      id: 0,
      name: "Daily Log Book",
      link: "daily",
      style: Daily,
    },
    {
      id: 1,
      name: !IsStaff() && " Budget Actual",
      link: "pos",
      style: POS,
    },

    {
      id: 2,
      name: !IsStaff() && "Hotel Ops Expense",
      link: "hotel",
      style: Hotel,
    },
    {
      id: 3,
      name: !IsStaff() && "Vendor Payout",
      link: "vendor",
      style: Vendor,
    },
    {
      id: 4,
      name: !IsStaff() && "Salary ",
      link: "salary",
      style: Salary,
    },
    {
      id: 5,
      name: null,
      link: null,
      style: None,
    },
  ];

  return (
    <div className="acc-tabs">
      <div className="acc-tabs-flex">
        {TabArray.map((item, index) => (
          <p
            style={{
              userSelect: "none",
              borderBottomLeftRadius: loc + 1 === index ? "20px" : "0px",
              borderBottomRightRadius: loc - 1 === index ? "20px" : "0px",
            }}
            aria-disabled
            onClick={() => {
              IsStaff() === true ? "" : (window.location.href = `#tab${index}`);
            }}
          >
            <text style={item?.style}>{item?.name}</text>
          </p>
        ))}
      </div>
      <div
        style={{ borderRadius: (loc === 0 || !loc) && "0px 20px 20px 20px" }}
        className="acc-tabs-container"
      >
        {(loc === 0 || !loc) && (
          <AccDailyLog
            trigger={trigger}
            dateset={dateset}
            prevMonth={prevMonth}
            hotels={hotels}
          ></AccDailyLog>
        )}
        {loc === 1 && !IsStaff() && (
          <AccPOS
            trigger={trigger}
            prevMonth={prevMonth}
            dateset={dateset}
            hotels={hotels}
          />
        )}
        {loc === 2 && !IsStaff() && (
          <AccHotelExpense
            trigger={trigger}
            dateset={dateset}
            prevMonth={prevMonth}
          ></AccHotelExpense>
        )}
        {loc === 3 && !IsStaff() && (
          <AccVendor
            prevMonth={prevMonth}
            dateset={dateset}
            trigger={trigger}
            yesterdate={dateset}
            hotels={hotels}
          ></AccVendor>
        )}
        {loc === 4 && !IsStaff() && (
          <AccSalary
            trigger={trigger}
            yesterdate={dateset}
            prevMonth={prevMonth}
            hotels={hotels}
          ></AccSalary>
        )}
      </div>
    </div>
  );
};

export default AccountsTabs;
