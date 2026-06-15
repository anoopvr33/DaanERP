import "./style.css";
import { useState } from "react";
import AccPOS from "./accountsPOS";
import AccDailyLog from "./accountDailyLog";
import AccHotelExpense from "./accountsHotelExpense";
import AccVendor from "./accountsVendor";
import AccSalary from "./accountSalary";
import { IsStaff } from "../../utils";

const AccountsTabs = ({ dateset, trigger, hotels, prevMonth }) => {
  const [tab, setTab] = useState(IsStaff() ? 1 : 0);
  const [open, setOpen] = useState(false);

  const POS = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 0 && "    hsl(0, 0%, 100%)",
    color: tab == 0 && "#004e5d",
    borderBottomRightRadius: tab - 1 == 0 && "20px",
    borderBottomLeftRadius: tab + 1 == 0 && "20px",
  };

  const Daily = {
    borderRadius: "20px 20px 0px 0px",

    background: tab == 1 && "    hsl(0, 0%, 100%)",
    color: tab == 1 && "#004e5d",
    borderBottomLeftRadius: tab + 1 == 1 && "20px",
    borderBottomRightRadius: tab - 1 == 1 && "20px",
  };

  const Hotel = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 2 && "   hsl(0, 0%, 100%)",
    color: tab == 2 && "#004e5d",
    borderBottomLeftRadius: tab + 1 == 2 && "20px",
    borderBottomRightRadius: tab - 1 == 2 && "20px",
  };

  const Vendor = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 3 && "  hsl(0, 0%, 100%)",
    color: tab == 3 && "#004e5d",
    borderBottomLeftRadius: tab + 1 == 3 && "20px",
    borderBottomRightRadius: tab - 1 == 3 && "20px",
  };

  const Salary = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 4 && "  hsl(0, 0%, 100%)",
    color: tab == 4 && "#004e5d",
    borderBottomLeftRadius: tab + 1 == 4 && "20px",
    borderBottomRightRadius: tab - 1 == 4 && "20px",
  };

  const None = {
    borderRadius: "20px 20px 0px 0px",
    background: "transparent",
    borderBottomLeftRadius: tab + 1 == 5 && "20px",
    borderBottomRightRadius: tab - 1 == 5 && "20px",
  };

  const TabArray = [
    {
      id: 0,
      name: !IsStaff() && " Budget Actual",
      link: "pos",
      style: POS,
    },
    {
      id: 1,
      name: "Daily Log Book",
      link: "daily",
      style: Daily,
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
              borderBottomLeftRadius: tab + 1 === index ? "20px" : "0px",
              borderBottomRightRadius: tab - 1 === index ? "20px" : "0px",
            }}
            onClick={() => IsStaff() || setTab(index)}
          >
            <text style={item?.style}>{item?.name}</text>
          </p>
        ))}
      </div>
      <div
        style={{ borderRadius: tab === 0 && "0px 20px 20px 20px" }}
        className="acc-tabs-container"
      >
        {tab === 0 && !IsStaff() && (
          <AccPOS
            trigger={trigger}
            prevMonth={prevMonth}
            dateset={dateset}
            hotels={hotels}
          ></AccPOS>
        )}
        {tab === 1 && (
          <AccDailyLog
            trigger={trigger}
            dateset={dateset}
            prevMonth={prevMonth}
            hotels={hotels}
          ></AccDailyLog>
        )}
        {tab === 2 && !IsStaff() && (
          <AccHotelExpense
            trigger={trigger}
            dateset={dateset}
            prevMonth={prevMonth}
          ></AccHotelExpense>
        )}
        {tab === 3 && !IsStaff() && (
          <AccVendor
            prevMonth={prevMonth}
            dateset={dateset}
            trigger={trigger}
            yesterdate={dateset}
            hotels={hotels}
          ></AccVendor>
        )}
        {tab === 4 && !IsStaff() && (
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
